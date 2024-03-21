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
      className="rounded-lg flex w-[90vw] mx-auto right-0 left-0 bg-white absolute flex-col justify-around items-start transition-all overflow-hidden [&>*]:text-gray-950 [&>*:hover]:text-orange-500 pl-10"
      style={{
        top: offset,
        height: display ? "20vh" : "0vh",
      }}
    >
      {children}
    </div>
  );
}
