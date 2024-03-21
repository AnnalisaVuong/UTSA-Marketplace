import cameraPath from "@assets/camera.svg";

/**
 * Component: InfoItem
 *
 * @description - An info box that displays information about the product.
 *
 * @param {Object} props
 * @param {string} props.img - The image to display inside of the box.
 * @param {string} props.alt - The alt for the image.
 * @param {string} props.title - The title of the headline inside of the box.
 * @param {string} props.children - The smaller text content underneath the title.
 *
 * @returns {React.ReactElement}
 */
function InfoItem({ img, alt, title, children }) {
  return (
    <div className="border-black border-[0.5px] p-4 rounded-xl flex gap-5 flex-col content-evenly">
      <div className="flex items-center bg-[#0c2340] rounded-lg p-2 max-w-10">
        <img
          src={img}
          alt={alt}
          style={{
            filter:
              "invert(99%) sepia(31%) saturate(230%) hue-rotate(245deg) brightness(112%) contrast(100%)",
          }}
        />
      </div>
      <h1 className="text-sm lg:text-xl">{title}</h1>
      <p className="text-xs text-gray-500">{children}</p>
    </div>
  );
}

/**
 * Component: InfoBox
 *
 * @description - An information section of the page.
 * Items are displayed in a grid layout.
 *
 * @returns {React.ReactElement}
 */
export default function InfoBox() {
  /** @type {React.ReactElement[]} */
  const elements = [];
  for (let i = 0; i < 6; i++) {
    elements.push(
      <InfoItem
        img={cameraPath}
        alt="An image of a camera."
        title="Placeholder Text"
        key={`element-${i}`}
      >
        For now this is placeholder. I will be adding to this as the team
        implements more site features.
      </InfoItem>,
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6 w-4/5 h-4/6 grid-cols-1">
      {elements}
    </div>
  );
}
