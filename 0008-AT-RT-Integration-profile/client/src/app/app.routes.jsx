import { createBrowserRouter } from "react-router";
import Register from "../modules/auth/page/Register";
import Profile from "../modules/auth/page/Profile";
const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

export default router;
