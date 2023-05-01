import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layouts/Layout";
import FillPage from "../pages/FillPage";
import Details from "../pages/Details";
import AllDetails from "../pages/AllDetails";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <FillPage />
      },
      {
        path: "/details/:id",
        element: <Details />
      },
      {
        path: "details",
        element: <AllDetails />
      }
    ]
  }
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
