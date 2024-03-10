import "@style/InfoBox.css";

// @ts-ignore
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
    <div className="info-item">
      <div className="logo-background">
        <img src={img} alt={alt} />
      </div>
      <h1>{title}</h1>
      <p>{children}</p>
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

  return <div className="info-grid">{elements}</div>;
}
