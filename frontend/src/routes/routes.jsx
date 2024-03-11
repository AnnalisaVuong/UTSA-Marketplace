import LandingPage from "./LandingPage";
import Login from "./Login";

/**
 * @description Object representing the route and component that
 * react router will render.
 *
 * @type {import('react-router-dom').RouteObject}
 */
export const LandingPageRoute = {
  path: "/",
  element: <LandingPage />,
  children: [
    {
    path: "/Login",
    element: <Login />,
    }
  ]
};

