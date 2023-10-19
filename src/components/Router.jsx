import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import ErrorPage from "./ErrorPage";

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
    {
      path: "/",
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
