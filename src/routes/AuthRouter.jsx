import AuthLayout from "../components/layouts/AuthLayout";
import AuthForm from "../pages/auth/AuthForm";

export const AuthRoute = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [{ path: "auth", Component: AuthForm }],
  },
];
