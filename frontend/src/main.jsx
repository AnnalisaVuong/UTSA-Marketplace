import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPageRoute } from "@routes/routes";
import { LoginPageRoute } from "@routes/routes";
import { CreateAccountRoute } from "@routes/routes";
// @ts-ignore
import Admin from "@routes/AdminCreation";

// Add new routes here.
const router = createBrowserRouter([
  LandingPageRoute,
{
    path: "admin/",
    element: <Admin />,
}, LoginPageRoute, CreateAccountRoute,
]);

// Select root element for rendering ReactDOM tree.
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Unable to find root element for rendering DOM Tree.");
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}
