import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Layout from "../layouts/Layout";

function Router() {
  const router = createBrowserRouter([
    {
      path: "login",
      element: (
        <Layout>
          <SignIn />
        </Layout>
      ),
    },
    {
      path: "signup",
      element: (
        <Layout>
          <SignUp />
        </Layout>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
