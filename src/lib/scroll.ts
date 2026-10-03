import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Scroll to an element id, using Lenis' smooth scroll when it's running. */
export function scrollToId(id: string) {
  const target = id === "top" ? 0 : document.getElementById(id);
  if (target === null) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(target, { offset: 0, duration: 1.4 });
  } else if (target === 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
  history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
}
