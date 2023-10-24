import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import ErrorPage from "./ErrorPage";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/login", // Add leading slash
      element: (
        <Layout>
          <SignIn />
        </Layout>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/signup", // Add leading slash
      element: (
        <Layout>
          <SignUp />
        </Layout>
      ),
      errorElement: <ErrorPage />,
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
    {
      path: "/shop",
      element: (
        <Layout>
          <Shop />
        </Layout>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/cart",
      element: (
        <Layout>
          <Cart />
        </Layout>
      ),
      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
