import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import CreateAccount from "./CreateAccount";
import CreatePost from "./CreatePost";
import ProductListingPage from "./ProductListingPage"

/**
 * @description Object representing the route and component that
 * react router will render.
 *
 * @type {import('react-router-dom').RouteObject}
 */
export const LandingPageRoute = {
  path: "/",
  element: <LandingPage />,
};
export const LoginPageRoute = {
  path: "/Login",
  element: <LoginPage />,
};
export const CreateAccountRoute = {
  path: "/CreateAccount",
  element: <CreateAccount />,
};
export const ProductListingRoute = {
  path: "/Home",
  element: <ProductListingPage />,
};