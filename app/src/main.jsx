import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.jsx";
import TestPage from "./components/TestPage/TestPage.jsx";
import "./main.css";
import { ParallaxProvider } from "react-scroll-parallax";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  // This route can be removed and replaced with your own page
  {
    path: "/nested",
    element: <TestPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ParallaxProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ParallaxProvider>
);
