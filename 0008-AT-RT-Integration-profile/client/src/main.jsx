import { createRoot } from "react-dom/client";
import "./app/App.css";
import { RouterProvider } from "react-router/dom";
import router from "./app/app.routes.jsx";
import AuthProvider from "../src/modules/auth/context/AuthProvider.jsx";
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />,
  </AuthProvider>,
);
