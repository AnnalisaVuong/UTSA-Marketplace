import "@style/HeaderDropdown.css";

/**
 * Component: HeaderDropdown
 *
 * @description A header dropdown block containing options for the user.
 *
 * @param {Object} props
 * @param {boolean} props.display - whether the component should be display.
 * @param {React.ReactNode} props.children - The children of this element.
 * @param {number} props.offset - The offset of the parent element.
 *
 * @returns {React.ReactElement}
 */
export default function HeaderDropdown({ display, children, offset }) {
  return (
    <div
      className={`dropdown${display ? " visible" : ""}`}
      style={{ top: offset + 5 }}
    >
      {children}
    </div>
  );
}
