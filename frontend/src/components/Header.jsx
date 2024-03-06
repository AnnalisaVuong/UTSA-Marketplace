import { useEffect, useState, useRef } from "react";
import { useUndersize, useScroll } from "@hooks/headerHooks";
import HeaderDropdown from "@components/HeaderDropdown";
import "@style/Header.css";

/**
 * Component: Header
 *
 * @description A header with links and a
 *  nav bar to be displayed at the top of a page.
 *
 * @return {React.ReactElement} The header component.
 * */
export default function Header() {
  const [dropdownToggled, setDropdownToggled] = useState(false);
  const [theme, setTheme] = useState("blue");
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerElement = useRef(null);
  const undersize = useUndersize(1000);
  const isScrolled = useScroll();

  // Change the layout of the header when the page width is too small.
  useEffect(() => {
    if (!undersize) setDropdownToggled(false);
  }, [undersize]);

  // Change the theme of the header when the scroll status changes.
  useEffect(() => setTheme(isScrolled ? "white" : "blue"), [isScrolled]);

  // Set the height of the header when the component mounts.
  useEffect(() => {
    /** @type {HTMLElement | null} - Type could be defined at this state */
    const elementOption = headerElement.current;

    // Check if the ref is null
    if (!elementOption) {
      return;
    }

    /** @type {HTMLElement} */
    const element = elementOption;
    setHeaderHeight(element.clientHeight);
  }, []);

  return (
    <>
      <div className={`container header-${theme}`} ref={headerElement}>
        <h1>Rowdy Marketplace</h1>
        {!undersize ? (
          <>
            <div className="header-options">
              <a href="/home">Home</a>
              <a href="/features">Features</a>
              <a href="/overview">Overview</a>
            </div>
            <a className="login" id="login" href="/login">
              Log In
            </a>
          </>
        ) : (
          <button
            className="btn-dropdown"
            onClick={() => setDropdownToggled(!dropdownToggled)}
          >
            ...
          </button>
        )}
        <HeaderDropdown display={dropdownToggled} offset={headerHeight}>
          <a href="/home">Home</a>
          <a href="/features">Features</a>
          <a href="/overview">Overview</a>
        </HeaderDropdown>
      </div>
    </>
  );
}
