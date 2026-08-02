"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useRouter } from "next/navigation";
import {
  CommandPalette,
  useCommandPaletteContext,
} from "@astryxdesign/core/CommandPalette";
import { Search } from "./Icons";
import {
  KIND_LABEL,
  KIND_ORDER,
  SEARCH_INDEX_URL,
  prepareIndex,
  search as runSearch,
  type PreparedIndex,
  type SearchDoc,
  type SearchIndex,
  type SearchKind,
} from "@/lib/search";

/**
 * Site search.
 *
 * Astryx's CommandPalette does the parts that are easy to get subtly wrong: it
 * is a real `<dialog>` with focus trapping and restore, keyboard navigation
 * comes from the same `useCombobox` every other Astryx combobox uses (arrows,
 * Home/End, Enter, Escape), and result counts are announced through a polite
 * live region. Its `searchSource` interface is allowed to be async, which is
 * exactly the hook the lazy index needs — no separate loading state to
 * coordinate.
 *
 * The two neighbours were considered and rejected. PowerSearch is a structured
 * field/operator/value token bar; its own guidance says not to use it for
 * keyword search, and there are no fields here to filter on. Typeahead is a
 * single-select form control — it writes a value into a field, has no result
 * grouping, and would have to be faked into a launcher.
 *
 * What is written by hand is the matcher (`src/lib/search.ts`) and the result
 * row, because a result has to say what kind of thing it is. A project and a
 * post answer different questions and a list that renders them identically
 * makes the reader open one to find out which they got.
 */

interface PaletteItem {
  id: string;
  label: string;
  auxiliaryData: { group: string; doc: SearchDoc };
}

function toItem(doc: SearchDoc): PaletteItem {
  return {
    id: doc.id,
    label: doc.title,
    auxiliaryData: { group: KIND_LABEL[doc.kind], doc },
  };
}

/**
 * One fetch per page load, shared by every caller.
 *
 * Module scope rather than component state so a remount (or a second trigger,
 * were one ever added) reuses the in-flight promise instead of starting a
 * second request. A failure clears the cache so the next open retries rather
 * than latching an empty index forever.
 */
let indexPromise: Promise<PreparedIndex> | null = null;

function loadIndex(): Promise<PreparedIndex> {
  if (!indexPromise) {
    indexPromise = fetch(SEARCH_INDEX_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`search index: HTTP ${res.status}`);
        return res.json() as Promise<SearchIndex>;
      })
      .then((data) => prepareIndex(data.docs))
      .catch((err) => {
        indexPromise = null;
        throw err;
      });
  }
  return indexPromise;
}

/**
 * One result row.
 *
 * Hand-rolled inside CommandPaletteItem rather than configured. `CommandPaletteItem`
 * takes `value` and arbitrary `children` — there are no `label` / `description`
 * / `meta` props to fill in, so a three-line row has to be built here. Its
 * children are inline `<span>`s by default, which is exactly how the first
 * version of this ran the four fields together into one paragraph; the stacking
 * is `.kj-hit`'s job in globals.css, and the fields are spans (not divs) because
 * the item is a `role="option"` whose accessible name is computed from its text.
 *
 * Shape matches a post card on /blog — metadata line, title, supporting copy —
 * so a result looks like a small version of the thing it points at.
 *
 * The kind is not repeated on the row. Astryx groups by `auxiliaryData.group`
 * and renders a heading per group, with a real `role="group"` and an
 * `aria-label`, so "Writing" already appears above the run of writing results
 * and is already announced. Printing it again on every row was noise both on
 * screen and in the a11y tree.
 *
 * The highlight is drawn here too, rather than left to Astryx's. Astryx's
 * highlighted state is a StyleX class with a generated name and a neutral-theme
 * background — the exact shape of the six contrast regressions already recorded
 * in globals.css, and one no CSS selector of ours can reach to correct. So the
 * item background is pinned to the theme ground in globals.css and the highlight
 * is expressed with `--surface-inset`: the site's own "pressed" treatment, which
 * changes the box and not the colours, so text contrast on a highlighted row is
 * identical to text contrast on every other row.
 *
 * Reading the highlight out of context is the only way to get it: the palette
 * publishes `highlightedIndex` against a flat `selectableItems` list, and
 * `renderItem` is a plain function that cannot call a hook — hence a component.
 */
function Hit({ doc }: { doc: SearchDoc }) {
  const ctx = useCommandPaletteContext();
  const isHighlighted =
    !!ctx &&
    ctx.highlightedIndex >= 0 &&
    ctx.selectableItems[ctx.highlightedIndex]?.value === doc.id;

  return (
    <span className="kj-hit" data-highlighted={isHighlighted ? "true" : undefined}>
      {doc.meta && <span className="kj-hit-meta">{doc.meta}</span>}
      <span className="kj-hit-title">{doc.title}</span>
      {doc.description && <span className="kj-hit-desc">{doc.description}</span>}
    </span>
  );
}

/**
 * The keyboard hint, read from the platform.
 *
 * `useSyncExternalStore` rather than an effect that calls `setState`: the
 * modifier key is a fact about the environment, not React state derived from
 * it, and the same pattern is already how `ThemeSwitcher` reads the theme off
 * the DOM. The server snapshot is `null`, so the hint is simply absent from the
 * prerendered HTML — there is no correct guess to make there, and a wrong one
 * is a hydration mismatch. Nothing subscribes: the platform does not change
 * mid-session.
 */
function subscribeToNothing() {
  return () => {};
}

function readShortcut(): string {
  const ua = navigator.userAgent;
  const platform = (navigator as Navigator & { platform?: string }).platform ?? "";
  return /mac|iphone|ipad/i.test(platform || ua) ? "⌘K" : "Ctrl K";
}

/** Ordering for the pre-typing suggestions, and for the group headings. */
const BOOTSTRAP_PER_KIND: Record<SearchKind, number> = {
  post: 3,
  project: 3,
  skill: 0,
  topic: 4,
};

export default function SiteSearch() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const shortcut = useSyncExternalStore(subscribeToNothing, readShortcut, () => null);

  // Selection hands back an id; the palette closes itself immediately after, so
  // the href has to be resolvable without re-reading React state.
  const hrefById = useRef(new Map<string, string>());
  const triggerRef = useRef<HTMLButtonElement>(null);
  const didSelect = useRef(false);

  /*
    Focus restore. The dialog returns focus to whatever had it before opening,
    which is correct when the trigger was clicked and wrong when the palette was
    opened with ⌘K or "/" from a page where nothing was focused — Escape then
    dropped focus onto <body> and a keyboard user had to tab in from the top of
    the document again. Sending it to the trigger is right in both cases: it is
    the control that owns this dialog.

    Not after a selection, though. That closes the palette *and* navigates, and
    yanking focus back to the header would undo the arrival at the new page.
  */
  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (open) {
      didSelect.current = false;
      return;
    }
    if (didSelect.current) return;
    // After the dialog has finished its own focus restore, not before.
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  /*
    Global shortcuts. Cmd/Ctrl-K is the convention users already have in their
    fingers; "/" is the other one, but only when the caret is not already in a
    field — otherwise it eats the character someone is typing.
  */
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const isPaletteKey = event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey);
      const target = event.target as HTMLElement | null;
      const isTyping =
        !!target &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
      const isSlash = event.key === "/" && !isTyping && !event.metaKey && !event.ctrlKey;

      if (!isPaletteKey && !isSlash) return;
      event.preventDefault();
      setIsOpen((open) => (isSlash ? true : !open));
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const remember = useCallback((docs: SearchDoc[]) => {
    for (const doc of docs) hrefById.current.set(doc.id, doc.href);
    return docs.map(toItem);
  }, []);

  const searchSource = useMemo(
    () => ({
      async search(query: string) {
        try {
          const index = await loadIndex();
          setFailed(false);
          return remember(runSearch(index, query).map((hit) => hit.doc));
        } catch {
          setFailed(true);
          return [];
        }
      },
      async bootstrap() {
        try {
          const index = await loadIndex();
          setFailed(false);
          const taken: SearchDoc[] = [];
          for (const kind of KIND_ORDER) {
            const limit = BOOTSTRAP_PER_KIND[kind];
            if (limit === 0) continue;
            taken.push(
              ...index
                .filter((p) => p.doc.kind === kind)
                .slice(0, limit)
                .map((p) => p.doc),
            );
          }
          return remember(taken);
        } catch {
          setFailed(true);
          return [];
        }
      },
    }),
    [remember],
  );

  const onValueChange = useCallback(
    (id: string) => {
      const href = hrefById.current.get(id);
      if (!href) return;
      didSelect.current = true;
      router.push(href);
    },
    [router],
  );

  const renderItem = useCallback(
    (item: PaletteItem) => <Hit doc={item.auxiliaryData.doc} />,
    [],
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className="control px-3 py-2 text-sm inline-flex items-center gap-2"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <Search size={15} />
        Search
        {shortcut && (
          <kbd
            className="kj-kbd"
            aria-hidden="true"
            style={{ fontFamily: "var(--font-code)" }}
          >
            {shortcut}
          </kbd>
        )}
      </button>

      <CommandPalette<PaletteItem>
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        searchSource={searchSource}
        onValueChange={onValueChange}
        renderItem={renderItem}
        label="Search this site"
        emptyBootstrapText={
          failed
            ? "Search is unavailable — the index could not be loaded."
            : "Search writing, projects, skills, and topics."
        }
        emptySearchText={
          failed
            ? "Search is unavailable — the index could not be loaded."
            : "No matches. Every word has to appear somewhere in the result."
        }
      />
    </>
  );
}
