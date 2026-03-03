import { createBrowserRouter } from "react-router";
import Login from "./features/authentication/pages/Login.jsx";
import Register from "./features/authentication/pages/Register.jsx";
import Protected from "./features/authentication/components/Protected.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <div>Home Page</div>
      </Protected>
    ),
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
