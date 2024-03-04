import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPageRoute } from "@routes";

// Add new routes here.
const router = createBrowserRouter([LandingPageRoute]);

// Render DOM root inside of index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
