import { createBrowserRouter } from "react-router";
import Login from "./features/authentication/pages/Login.jsx";
import Register from "./features/authentication/pages/Register.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home Page</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
