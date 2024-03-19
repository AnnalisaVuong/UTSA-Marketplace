import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPageRoute } from "@routes/routes";
import Admin from "@routes/AdminCreation";
import { UserCreationRoute } from "@routes/CreateUser";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; <- To be added later when caching is desired.

// Add new routes here.
const router = createBrowserRouter([
  LandingPageRoute,
  UserCreationRoute,
  LandingPageRoute,
  {
    path: "/admin",
    element: <Admin />,
  },
]);

// Add new routes here.
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
