import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AuthRoute } from "./AuthRouter";
import { Module2Rotue } from "./Module2";
import { Module3Rotue } from "./Module3";
import NotFound from "../pages/NotFound";
import { Module1Rotue } from "./Module1";
import { ClientRoute } from "./ClientRoute";

const route = createBrowserRouter([
  ...AuthRoute,
  ...ClientRoute,
  ...Module1Rotue,
  ...Module2Rotue,
  ...Module3Rotue,
  { path: "*", element: <NotFound /> },
]);

const AppRoute = () => {
  return <RouterProvider router={route} />;
};
export default AppRoute;
