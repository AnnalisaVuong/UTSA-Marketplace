import { useFormState } from "@hooks/formHooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "http://localhost:5000";

/**
 * Route: Login Page
 *
 * URI: /
 *
 * @description The login page for returning users
 *
 * @returns {React.ReactElement} Component to be rendered at the login page route.
 */
export default function Example() {
  const navigate = useNavigate();
  const [formMessage, setFormMessage] = useState("");
  const [setFormData, handleSubmit] = useFormState(
    new URL(BACKEND_URL + "/user/login"),
  );

  /**
   * Function: handleServerResponse
   *
   * @description Handles the json response from the server
   * asynchronously
   *
   * @param {Response | undefined} res
   */
  function handleServerResponse(res) {
    if (!res) {
      console.error("ERROR: Server response is undefined.");
      return;
    }

    res
      .json()
      .then((obj) => {
        if (res.status == 200) {
          document.cookie = `auth_token=${obj.token}; SameSite=None; secure`;
          setFormMessage("Login success, navigating to posts...");
          setTimeout(() => navigate("/posts/view"), 1500);
        } else {
          setFormMessage(obj.message);
        }
      })
      .catch(() => {
        setFormMessage("An error occurred while processing the request.");
        console.error("Error: Unable to decode server response object");
      });
  }

  return (
    <>
      <div className="flex min-h-full items-center flex-col justify-center px-6 py-12 lg:px-8">
        <div className="flex w-96 p-6 shadow-lg bg-orange-500 rounded-md flex-col justify-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              onSubmit={(event) => {
                handleSubmit(event, handleServerResponse);
              }}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-50"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    onChange={setFormData}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-50"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={setFormData}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="block text-center text-sm text-red-500">
              {formMessage}
            </p>
            <p className="text-center text-sm text-gray-500">
              Not a member?{" "}
              <a
                href="/CreateAccount"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Create Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
