import { createHashRouter } from "react-router-dom";
import App from "./App";
import Home from "../components/Home";
import RegisterPage from "../components/RegisterPage";
import LoginPage from "../components/LoginPage";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      }
    ],
  },
]);

export default router;