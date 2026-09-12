import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthContextProvider } from "./context/MyContext.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

createRoot(document.getElementById("root")).render(
    <AuthContextProvider>
      <AppRoutes />
    </AuthContextProvider>
);
