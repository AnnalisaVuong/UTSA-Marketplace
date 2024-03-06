import Header from "@components/Header";
import "@style/LandingPage.css";

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
          <div>
            <h1>This is some text.</h1>
            <h2>This is some more text.</h2>
          </div>
          <div>
            <h1>More text this time in grid.</h1>
            <h2>More subtext.</h2>
          </div>
        </div>
      </div>
    </>
  );
}
