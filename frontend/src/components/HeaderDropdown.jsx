import "@style/HeaderDropdown.css";

/**
 * @description Component for a header dropdown block containing options for the user.
 *
 * @param {Object} props
 * @param {boolean} props.display - whether the component should be display.
 * @param {React.ReactNode} props.children - The children of this element.
 *
 * @returns {React.ReactElement}
 */
export default function HeaderDropdown({ display, children }) {
  return (
    <div className={`dropdown${display ? " visible" : ""}`}>{children}</div>
  );
}
