import "@style/HeaderDropdown.css";

/**
 * Component for a header dropdown block containing options for the user.
 *
 * @param {Object} props
 * @param {boolean} props.display - whether the component should be display.
 * @param {HTMLElement} props.children - The children of this element.
 *
 * @returns {ReactElement}
 */
export default function HeaderDropdown({ display, children }) {
  return (
    <div className={`dropdown${display ? " visible" : ""}`}>{children}</div>
  );
}
