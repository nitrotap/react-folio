"use client";

import { useCallback, useSyncExternalStore } from "react";
import { THEMES, DEFAULT_THEME, STORAGE_KEY, type ThemeId } from "@/lib/themes";

/**
 * The active theme is a `data-kj-theme` attribute on <html>, written by
 * ThemeScript before hydration. That makes the DOM the source of truth — an
 * external store — so it is read with useSyncExternalStore rather than mirrored
 * into component state. Anything else that changes the attribute keeps this
 * control in sync for free.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-kj-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): ThemeId {
  return (document.documentElement.getAttribute("data-kj-theme") as ThemeId) ?? DEFAULT_THEME;
}

/** Static export prerenders with no theme resolved; the script sets it on load. */
function getServerSnapshot(): ThemeId {
  return DEFAULT_THEME;
}

export default function ThemeSwitcher() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  /** Pin an explicit choice; this opts out of the per-visit randomisation. */
  const pick = useCallback((id: ThemeId) => {
    document.documentElement.setAttribute("data-kj-theme", id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
      sessionStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* storage unavailable — the theme still applies for this page */
    }
  }, []);

  /** Pick a different one at random and stop pinning. */
  const surprise = useCallback(() => {
    const current = document.documentElement.getAttribute("data-kj-theme");
    const pool = THEMES.filter((t) => t.id !== current);
    const next = pool[Math.floor(Math.random() * pool.length)].id;
    document.documentElement.setAttribute("data-kj-theme", next);
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* non-fatal */
    }
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="sr-only" id="theme-label">
        Colour theme
      </span>
      <div role="group" aria-labelledby="theme-label" className="flex flex-wrap gap-1.5">
        {THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => pick(t.id)}
            aria-pressed={theme === t.id}
            title={t.description}
            className="control px-2.5 py-1.5 text-xs"
            style={
              theme === t.id
                ? { boxShadow: "var(--surface-pressed-sm)", color: "var(--accent)" }
                : undefined
            }
          >
            {t.name}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={surprise}
        className="px-2 py-1.5 text-xs underline"
        style={{ color: "var(--muted)" }}
        title="Pick another at random"
      >
        Surprise me
      </button>
    </div>
  );
}
