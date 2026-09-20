import React from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import Register from "../../features/auth/ui/pages/Register";
import Login from "../../features/auth/ui/pages/Login";
import PublicRoute from "../../protectedRoutes/PublicRoute";
import AuthLayout from "../../layouts/AuthLayout";
import ProtectedRoute from "../../protectedRoutes/ProtectedRoute";
import DashboardLayout from "../../layouts/DashboardLayout";
import Home from "../../features/dashboard/ui/pages/Home";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
          ],
        },
      ],
    },
    {
      path: "/home",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <DashboardLayout />,
          children: [
            {
              path: "",
              element: <Home />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
