import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";

function Router() {
  const router = createBrowserRouter([
    {
      path: "login",
      element: <SignIn />,
    },
    {
      path: "signup",
      element: <SignUp />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
