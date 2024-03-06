import { useEffect, useState, useRef } from "react";
import "@style/Header.css";
import { useScroll, useUndersize } from "@hooks/headerHooks";
import HeaderDropdown from "@components/HeaderDropdown";

/**
 * A header component for the page.
 *
 * @return {React.ReactElement} The header component.
 * */
export default function Header() {
  const [dropdownToggled, setDropdownToggled] = useState(false);
  const [theme, setTheme] = useState("blue");
  const undersize = useUndersize(1000);
  const isScrolled = useScroll();

  const containerRef = useRef(null);

  useEffect(() => {
    if (!undersize) setDropdownToggled(false);
  }, [undersize]);

  useEffect(() => {
    setTheme(isScrolled ? "white" : "blue");
  }, [isScrolled]);

  return (
    <>
      <div className={`container header-${theme}`} ref={containerRef}>
        <h1>Rowdy Marketplace</h1>
        {!undersize ? (
          <>
            <div className="header-options">
              <a href="/home">Home</a>
              <a href="/features">Features</a>
              <a href="/overview">Overview</a>
            </div>
            <a href="/login">Log In</a>
          </>
        ) : (
          <button
            className="btn-dropdown"
            onClick={() => setDropdownToggled(!dropdownToggled)}
          >
            ...
          </button>
        )}
      </div>
      <HeaderDropdown display={dropdownToggled}>
        <a href="/home">Home</a>
        <a href="/features">Features</a>
        <a href="/overview">Overview</a>
      </HeaderDropdown>
    </>
  );
}
