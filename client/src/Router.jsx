import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthLayout from "./pages/AuthLayout";
import AccountPage from "./pages/AccountPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <IndexPage /> },
      { path: "account/:subpage?", element: <AccountPage />, },
      { path: "account/:subpage/:action", element: <AccountPage />, },
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage />, },
      { path: "register", element: <RegisterPage />, },
    ]

  }
]);

export default router;