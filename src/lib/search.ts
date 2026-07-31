/**
 * Site search: the document shape and the matcher.
 *
 * Everything in this file is pure and dependency-free so the same code can run
 * in the build (to assemble the index) and in the browser (to query it). It
 * must not import `node:fs` or anything that reaches for it — `src/lib/blog.ts`
 * does, which is why the index is assembled in the route handler rather than
 * here.
 *
 * The matcher is deliberately unclever. It tokenises the query, requires every
 * token to appear somewhere in the document, and ranks by *where* the tokens
 * landed. No fuzzy distance, no stemming, no inverted index: with well under a
 * hundred documents a linear scan over pre-lowercased strings finishes in well
 * under a frame, and a wrong-but-clever ranking is harder to explain to a
 * reader than a boring correct one.
 */

/** What a hit *is*. A project and a post are not the same kind of answer. */
export type SearchKind = "post" | "project" | "skill" | "topic";

export interface SearchDoc {
  /** Stable id, also the CommandPalette item value. `kind:slug`. */
  id: string;
  kind: SearchKind;
  /** Primary label. */
  title: string;
  /** One line of context under the title. */
  description: string;
  /** Where selecting this hit goes. */
  href: string;
  /** Topics, technologies, or list items — shown as chips on a result. */
  terms: string[];
  /** Long-form prose. Searched, never displayed. */
  body?: string;
  /** ISO date, posts only. Used for the recency tiebreak and the result meta. */
  date?: string;
  /** Free-form right-hand meta ("6 min read", "private", "12 skills"). */
  meta?: string;
}

export interface SearchIndex {
  /** Bumped when the document shape changes, so a stale cache is detectable. */
  version: number;
  docs: SearchDoc[];
}

export const SEARCH_INDEX_VERSION = 1;
export const SEARCH_INDEX_URL = "/search-index.json";

/** Human-readable name for a kind, used as the result group heading. */
export const KIND_LABEL: Record<SearchKind, string> = {
  post: "Writing",
  project: "Projects",
  skill: "Skill areas",
  topic: "Topics",
};

/**
 * Group order in the results list. Writing first because the index is mostly
 * prose and a query is most often a phrase from it; topics last because a topic
 * is a route to more results rather than a result itself.
 */
export const KIND_ORDER: SearchKind[] = ["post", "project", "skill", "topic"];

/** Lowercase, strip anything that is not a word character or a separator. */
export function normalize(text: string): string {
  return text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

export function tokenize(query: string): string[] {
  const t = normalize(query).split(" ").filter(Boolean);
  // Cap the token count so a pasted paragraph cannot turn one keystroke into
  // thousands of substring scans.
  return t.slice(0, 12);
}

/** Pre-lowercased haystacks, computed once per document rather than per query. */
interface Prepared {
  doc: SearchDoc;
  title: string;
  description: string;
  terms: string;
  body: string;
}

function prepare(doc: SearchDoc): Prepared {
  return {
    doc,
    title: normalize(doc.title),
    description: normalize(doc.description),
    terms: normalize(doc.terms.join(" ")),
    body: normalize(doc.body ?? ""),
  };
}

export function prepareIndex(docs: SearchDoc[]): Prepared[] {
  return docs.map(prepare);
}

export type PreparedIndex = ReturnType<typeof prepareIndex>;

/**
 * Field weights. A title hit is worth more than a body hit by roughly an order
 * of magnitude, which is what stops a post that mentions "stats-claw" in
 * passing from outranking the stats-claw project itself.
 */
const WEIGHT = { title: 100, terms: 40, description: 24, body: 6 } as const;
/** A token that starts a word reads as intentional; mid-word is incidental. */
const WORD_START_BONUS = 30;
/** Exact whole-title equality beats every partial. */
const EXACT_TITLE_BONUS = 300;

function scoreToken(p: Prepared, token: string): number {
  let score = 0;
  let matched = false;

  if (p.title.includes(token)) {
    score += WEIGHT.title;
    matched = true;
    if (p.title === token) score += EXACT_TITLE_BONUS;
    if (p.title.startsWith(token) || p.title.includes(` ${token}`)) {
      score += WORD_START_BONUS;
    }
  }
  if (p.terms.includes(token)) {
    score += WEIGHT.terms;
    matched = true;
    if (p.terms === token || p.terms.startsWith(token) || p.terms.includes(` ${token}`)) {
      score += WORD_START_BONUS;
    }
  }
  if (p.description.includes(token)) {
    score += WEIGHT.description;
    matched = true;
  }
  if (p.body.includes(token)) {
    score += WEIGHT.body;
    matched = true;
  }

  // Every token must land somewhere. Returning 0 (rather than a negative) lets
  // the caller treat "no score" as "not a match" without a second flag.
  return matched ? score : 0;
}

export interface SearchHit {
  doc: SearchDoc;
  score: number;
}

/**
 * All documents matching every token, best first.
 *
 * AND rather than OR: with a corpus this small, an OR query returns nearly the
 * whole index for any two-word phrase, which is the same as returning nothing
 * useful. Ties break on recency for posts and then on title, so repeated
 * queries produce the same order.
 */
export function search(index: PreparedIndex, query: string, limit = 24): SearchHit[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const hits: SearchHit[] = [];
  for (const p of index) {
    let total = 0;
    let all = true;
    for (const token of tokens) {
      const s = scoreToken(p, token);
      if (s === 0) {
        all = false;
        break;
      }
      total += s;
    }
    if (!all) continue;

    // Short documents that match are more likely to be *about* the query than
    // long ones that merely contain it. Small effect: a divisor, not a filter.
    total += 40 / (1 + p.body.length / 4000);
    hits.push({ doc: p.doc, score: total });
  }

  hits.sort(
    (a, b) =>
      b.score - a.score ||
      (b.doc.date ?? "").localeCompare(a.doc.date ?? "") ||
      a.doc.title.localeCompare(b.doc.title),
  );
  return hits.slice(0, limit);
}
