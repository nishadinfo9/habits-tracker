import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layout/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Notfound from "../pages/Notfound";
import Home from "../pages/Home";

const AppRouter = () => {
  const router = createBrowserRouter([
    { path: "/*", element: <Notfound /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
      path: "/",
      element: <Layout />,
      children: [{ path: "/", element: <Home /> }],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default AppRouter;
