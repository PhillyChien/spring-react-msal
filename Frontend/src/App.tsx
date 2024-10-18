import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import useAcquireToken from "./hooks/useAcquireToken";
import useMe from "./hooks/useMe";
import UserProfile from "./pages/UserProfile";
import UserAdministration from "./pages/UserAdministration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/user-profile",
        element: <UserProfile />,
      },
      {
        path: "/user-administration",
        element: <UserAdministration />,
      },
    ],
  },
]);

function App() {
  useAcquireToken();
  useMe();
  return <RouterProvider router={router} />;
}

export default App;
