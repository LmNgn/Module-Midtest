import { Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ClientLayout from "../components/layouts/ClientLayout";
import PrivateRoute from "./protect/PrivateRouter";

export const ClientRoute = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <ClientLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Navigate to="homepage" /> },
      { path: "homepage", Component: LandingPage },
    ],
  },
];
