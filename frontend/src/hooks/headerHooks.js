import { useEffect, useState } from "react";

/**
 * Hook: useUndersize
 *
 * @description Checks the size of the screen and sets a
 *  boolean based on whether it exceeds the given value.
 *
 * @param {number} upperBound
 *  The upper bound to use to determine if the window is undersize.
 *
 * @returns {boolean} Signaling whether the window size exceeds given parameter.
 */
export function useUndersize(upperBound) {
  const [undersize, setUndersize] = useState(false);
  const windowSizeQuery = matchMedia(`(max-width: ${upperBound}px)`);

  windowSizeQuery.addEventListener("change", (event) => {
    setUndersize(event.matches);
  });

  return undersize;
}

/**
 * Hook: useScroll
 *
 * @description Sets a boolean based on whether the page has been scrolled.
 *
 * @returns {boolean} Indicates whether the page has been scrolled.
 */
export function useScroll() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY != 0);
    });

    return () =>
      window.removeEventListener("scroll", () => {
        setIsScrolled(window.scrollY != 0);
      });
  }, []);

  return isScrolled;
}
