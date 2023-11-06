import { createBrowserRouter, defer } from "react-router-dom";
import App from "./App";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthLayout from "./pages/AuthLayout";
import AccountPage from "./pages/AccountPage";
import axios from "axios";
import PlacePage from "./pages/PlacePage";

const isUserAuthLoader = () => {
  try {
    return axios.get("/api/v1/auth/isauth");
  } catch (error) {
    throw error.response.data.error;
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    loader: () => defer({ userPromise: isUserAuthLoader() }),
    children: [
      { index: true, element: <IndexPage /> },
      { path: "account/:subpage?", element: <AccountPage />, },
      { path: "account/:subpage/:action", element: <AccountPage />, },
      { path: "place/:id", element: <PlacePage />, },
    ]
  },
  {
    path: '/auth',
    element: <App />,
    children: [
      { path: "login", element: <LoginPage />, },
      { path: "register", element: <RegisterPage />, },
    ]

  }
]);

export default router;