import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <IndexPage /> },
      { path: "login", element: <LoginPage />, },
    ]
  }
]);

export default router;