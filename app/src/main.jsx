import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import BeHost from "./pages/BeHost/BeHost.jsx";

import "./main.css";
import { ParallaxProvider } from "react-scroll-parallax";
import Meals from "./pages/Meals/Meals.jsx";
import MealDetails from "./pages/Meals/MealDetails/MealDetails.jsx";
import About from "./pages/About/About.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "/behost",
    element: <BeHost />,
  },
  {
    path: "/meals",
    element: <Meals />,
  },

  {
    path: "/meals/:id",
    element: <MealDetails />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ParallaxProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ParallaxProvider>
);
