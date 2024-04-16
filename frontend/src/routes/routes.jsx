import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import CreateAccount from "./CreateAccount";
import ViewPosts from "./ViewPosts";
import AdminCreation from "./AdminCreation";

const BACKEND_URL = "http://localhost:5000";

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

/**
 * @type {import('react-router-dom').RouteObject}
 */
export const LoginPageRoute = {
  path: "/Login",
  element: <LoginPage />,
};

/**
 * @type {import('react-router-dom').RouteObject}
 */
export const CreateAccountRoute = {
  path: "/CreateAccount",
  element: <CreateAccount />,
};


/**
 * @type {import('react-router-dom').RouteObject}
 */
export const PostViewingRoute = {
  path: "/posts/view/:token",
  element: <ViewPosts />,
  loader: async ({params}) => {
    const destructure = (obj) => Object.values(obj).map(({data}) => data)

    const headers = new Headers("Authorization", `Bearer ${params.token}`)

    const postSelf = await fetch(BACKEND_URL + "/listing/retrieve/self", {
      method: "GET",
      headers: headers
    });

    const listSelf = destructure(await postSelf.json());

    const postOther = await fetch(BACKEND_URL + "/listing/retrieve/other", {
      headers: headers,
      method: "GET"
    });

    const listOther = destructure(await postOther.json());

    return {
    }
  }
};

/**
 * @type {import('react-router-dom').RouteObject}
 */
export const AdminCreationRoute = {
  path: "/admin",
  element: <AdminCreation />,
};
