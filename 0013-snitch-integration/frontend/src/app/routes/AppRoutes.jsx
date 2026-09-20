import React from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import Register from "../../features/auth/ui/pages/Register";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Register />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
