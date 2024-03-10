import Header from "@components/Header";
import "@style/LandingPage.css";
import InfoBox from "@components/InfoBox";

// @ts-ignore - Tell LSP to ignore this line.
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
            <h1>A Campus Hub For Your Personal Needs.</h1>
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
      <div className="hero-section-white">
        <div className="hero hero-white">
          <h3>Features</h3>
          <h1>Support The Local UTSA Economy.</h1>
          <h2>
            There are countless ways to buy and sell items that makes supporting
            the local campus ecosystem a breeze.
          </h2>
        </div>
        <InfoBox></InfoBox>
      </div>
    </>
  );
}
