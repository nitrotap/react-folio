import { THEME_IDS, DEFAULT_THEME, STORAGE_KEY } from "@/lib/themes";

/**
 * Blocking inline script that resolves the theme before first paint.
 *
 * The site is a static export, so every page ships pre-rendered with no theme
 * baked in — the choice has to happen client-side. Running this in <head>
 * before the body renders avoids a flash of the default theme.
 *
 * Resolution order:
 *   1. An explicit choice the visitor made (localStorage) always wins.
 *   2. Otherwise a theme already picked for this visit (sessionStorage), so
 *      it stays put across reloads and hard navigations within the visit.
 *   3. Otherwise pick one at random and remember it for the visit.
 *
 * The attribute is `data-kj-theme`, not `data-theme`: Astryx's <Theme> component
 * manages attributes on documentElement and sets its own `data-astryx-theme`,
 * stripping a plain `data-theme` in the process. Namespacing keeps the two
 * systems from fighting over the same attribute — the same reason our design
 * tokens are `--kj-*`.
 *
 * On `dangerouslySetInnerHTML`: the interpolated values are compile-time
 * constants from src/lib/themes.ts, serialised with JSON.stringify. No request,
 * user, or content data reaches this string, and the value read back from
 * storage is validated against the theme list before it is applied. There is no
 * injection surface here.
 */
export default function ThemeScript() {
  const script = `(function(){try{
var T=${JSON.stringify(THEME_IDS)};
var K=${JSON.stringify(STORAGE_KEY)};
var p=localStorage.getItem(K);
var t=(p&&T.indexOf(p)>-1)?p:null;
if(!t){var s=sessionStorage.getItem(K);if(s&&T.indexOf(s)>-1)t=s;}
if(!t){t=T[Math.floor(Math.random()*T.length)];try{sessionStorage.setItem(K,t)}catch(e){}}
document.documentElement.setAttribute('data-kj-theme',t);
}catch(e){document.documentElement.setAttribute('data-kj-theme',${JSON.stringify(DEFAULT_THEME)});}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
