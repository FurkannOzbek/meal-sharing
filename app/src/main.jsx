import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.jsx";
import BeHost from "../BeHost/BeHost.jsx";
import TestPage from "./components/TestPage/TestPage.jsx";
import "./main.css";
import { ParallaxProvider } from "react-scroll-parallax";
import Meals from "./Meals/Meals.jsx";
import MealDetails from "./Meals/MealDetails/MealDetails.jsx";
import About from "../About/About.jsx";

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
