import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layouts/Layout";
import FillPage from "../pages/FillPage";
import Details from "../pages/Details";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <FillPage />
      },
      {
        path: "/details",
        element: <Details />
      }
    ]
  }
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
