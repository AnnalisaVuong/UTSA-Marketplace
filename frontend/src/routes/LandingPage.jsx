import Header from "@components/Header";
import "@style/LandingPage.css";
import shoppingSvgPath from "@assets/shopping.svg";

/**
 * Route: Landing Page
 *
 * URI: /
 *
 * @description The first page a user will see when they arrive at the site.
 *
 * @returns {React.ReactElement} Component to be rendered at the landing page route.
 */
export default function LandingPage() {
  return (
    <>
      <Header />
      <div className="landing-hero-header">
        <div className="landing-grid">
          <div className="hero">
            <h1>Campus Hub For Your Personal Needs.</h1>
            <h2>
              From old furniture to used gaming systems, buy and sell goods with
              other UTSA students.
            </h2>
          </div>
          <div className="img-container">
            <img
              className="shopping-svg"
              src={shoppingSvgPath}
              alt="People shopping"
            />
          </div>
        </div>
      </div>
    </>
  );
}
