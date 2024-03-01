import { useState } from "react";
import './Header.css'

const DROPDOWN_HEIGHT = 300;

export default function Header() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [dropdownToggled, setDropdownToggled] = useState(false);

  let isUndersize = innerWidth < 1000;


  // Listen for window resize.
  window.addEventListener("resize", () => {
    setInnerWidth(window.innerWidth);
  });

  function toggleDropdown() {
    setDropdownToggled(!dropdownToggled);
  }

  return (
    <div className="container">
      <h1>Rowdy Marketplace</h1>
      {
        !isUndersize ? (
          <>
            <div className="header-options">
              <a href="/home">Home</a>
              <a href="/features">Features</a>
              <a href="/overview">Overview</a>
            </div>
            <a href="/login">Log In</a></>
        ) : <button on:click={toggleDropdown}>Toggle Modal</button>
      }
    </div>
  );
}
