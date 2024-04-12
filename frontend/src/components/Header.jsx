import { useEffect, useState, useRef } from "react";
import { useUndersize, useScroll } from "@hooks/headerHooks";
import HeaderDropdown from "@components/HeaderDropdown";
import CreateModal from "@components/CreateModal";

/**
 * @type {Record<string, Object>} headerStyles
 *
 * @description A collection of styles to represent
 * different themes that will be applied to the header.
 */
const headerStyles = {
  white: {
    backgroundColor: "#ffffff",
    transition: "background-color 400ms, filter 400ms",
    filter: "drop-shadow(0 1px 1px gray)",
    position: "sticky",
    top: "0px",
  },
  blue: {
    backgroundColor: "#0c2340",
    transition: "background-color 400ms, filter 400ms",
    color: "#ffffff",
  },
};

/**
 * Component: Header
 *
 * @description A header with links and a
 *  nav bar to be displayed at the top of a page.
 *
 * @return {React.ReactElement} The header component.
 * */
export default function Header() {
  const [modalShown, setModalShown] = useState(false);
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
    /** @type {HTMLElement | null} - Element ref could be defined at this state */
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
      <CreateModal
        shown={modalShown}
        onClose={() => setModalShown(false)}
      ></CreateModal>
      <header
        className="[&>*]:font-roboto flex justify-between px-[8vw] py-4 items-center h-2/6"
        style={headerStyles[theme]}
        ref={headerElement}
      >
        <h1 className="text-xl md:text-2xl lg:text-3xl">Rowdy Marketplace</h1>
        {!undersize ? (
          <>
            <nav className="flex items-center justify-center gap-16 flex-1 [&>a:hover]:text-orange-500">
              <a href="/home">Home</a>
              <a href="/catalog">Catalog</a>
              <button
                onClick={() => {
                  setModalShown(true);
                }}
              >
                Create Post
              </button>
            </nav>
            <a
              className="px-8 py-2 rounded-lg hover:!border-orange-500 hover:text-orange-500"
              style={{
                border: "2px solid #ffffff",
                borderColor: theme == "white" ? "#222222" : "#ffffff",
              }}
              id="login"
              href="/login"
            >
              Log In
            </a>
          </>
        ) : (
          <button
            className="text-2xl"
            style={{ color: theme == "white" ? "#222222" : undefined }}
            onClick={() => setDropdownToggled(!dropdownToggled)}
          >
            ...
          </button>
        )}
        <HeaderDropdown display={dropdownToggled} offset={headerHeight}>
          <a href="/home">Home</a>
          <a href="/posts">Posts</a>
          <button
            onClick={() => {
              setModalShown(true);
            }}
          >
            Create Post
          </button>
        </HeaderDropdown>
      </header>
    </>
  );
}
