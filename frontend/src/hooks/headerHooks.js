import { useState } from "react";

/**
 * Hook: useUndersize
 * @param {number} upperBound
 *  - The upper bound to use to determine if the window is undersize.
 *
 * @returns {boolean}
 */
export function useUndersize(upperBound) {
  const [undersize, setUndersize] = useState(false);
  const windowSizeQuery = matchMedia(`(max-width: ${upperBound}px)`);

  windowSizeQuery.addEventListener("change", (event) => {
    setUndersize(event.matches);
  });

  return undersize;
}

export function useScroll() {
  const [isScrolled, setIsScrolled] = useState(false);

  window.addEventListener("scroll", () => {
    setIsScrolled(window.scrollY != 0);
  });

  return isScrolled;
}
