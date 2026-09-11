import { createRoot } from "react-dom/client";
import "./app/App.css";
import { RouterProvider } from "react-router/dom";
import router from "./app/app.routes.jsx";
import { AuthProvider } from "./modules/auth/context/useAuthContext.jsx";
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />,
  </AuthProvider>,
);
