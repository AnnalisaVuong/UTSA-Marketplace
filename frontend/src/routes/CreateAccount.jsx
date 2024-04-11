import { useFormState } from "@hooks/formHooks";
import { useState } from "react";
import { redirect } from "react-router-dom";
import "@style/Admin.css";

const BACKEND_URL = "http://localhost:5000";
const websiteLink = window.location.protocol + "//" + window.location.host;

/**
 * Route: Create Account Page
 *
 * URI: /
 *
 * @description Creates a new account for new users
 *
 * @returns {React.ReactElement} Component to be rendered at the Create account page route.
 */
export default function Example() {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [setFormData, onFormSubmit] = useFormState(
    new URL(BACKEND_URL + "/user/create"),
  );

  /** @param {Response | undefined} res */
  function handleServerResponse(res) {
    if (!res) {
      console.error("Server response is undefined.");
      return;
    }

    res.json().then((decoded) => {
      if (decoded.status != 200) {
        /** @type {import("@lib/types").BackendError} */
        const err = decoded;
        setFeedbackMessage(err.message);
      } else {
        /** @type {import("@lib/types").JWTResponse} */
        const valid = decoded;
        document.cookie = `access_token=${valid.token}`;
        redirect(BACKEND_URL + "/authenticate");
      }
    });
  }

  return (
    <>
      <div className="flex min-h-full items-center flex-col justify-center px-6 py-5 lg:px-8">
        <div className="flex w-96 p-6 shadow-lg bg-orange-500 rounded-md flex-col justify-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-9 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in
            </h2>
          </div>
          <h1 className="text-red-800 mx-auto text-sm mt-4">
            {feedbackMessage}
          </h1>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              onSubmit={(event) => onFormSubmit(event, handleServerResponse)}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-50"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    onChange={setFormData}
                    id="username"
                    name="username"
                    type="username"
                    autoComplete="username"
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
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirmed-password"
                    className="block text-sm font-medium leading-6 text-gray-50"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={setFormData}
                    id="confirm-password"
                    name="confirm-password"
                    type="confirm-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

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
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-50"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    onChange={setFormData}
                    id="first-name"
                    name="first-name"
                    type="first-name"
                    autoComplete="first-name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-50"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    onChange={setFormData}
                    id="last-name"
                    name="last-name"
                    type="last-name"
                    autoComplete="last-name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-medium leading-6 text-gray-50"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    onChange={setFormData}
                    id="phone-number"
                    name="phone-number"
                    type="phone-number"
                    autoComplete="phone-number"
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
                  Create Account
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{" "}
              <a
                href="/Login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
