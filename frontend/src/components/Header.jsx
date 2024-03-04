import { useEffect, useState } from "react";
import "@style/Header.css";
import "@style/HeaderDropdown.css";
import { useUndersize } from "@hooks";
import HeaderDropdown from "@components/HeaderDropdown";

/** A header component for the page.
 * @returns {ReactElement}
 * */
export default function Header() {
  const [dropdownToggled, setDropdownToggled] = useState(false);
  const undersize = useUndersize(1000);

  function toggleDropdown() {
    setDropdownToggled(!dropdownToggled);
  }

  useEffect(() => {
    if (!undersize) {
      setDropdownToggled(false);
    }
  }, [undersize]);

  return (
    <>
      <div className="container">
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
          <button className="btn-dropdown" onClick={toggleDropdown}>
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
