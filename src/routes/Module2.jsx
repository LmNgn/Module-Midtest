import CommonLayout from "../components/layouts/CommonLayout";
import Categories from "../pages/module2/Categories";
import CategoryForm from "../pages/module2/CategoryForm";
import Product from "../pages/module2/Product";
import ProductForm from "../pages/module2/ProductForm";
import Products from "../pages/module2/Products";
import PrivateRoute from "./protect/PrivateRouter";
import ProtectedRoute from "./protect/ProtectedRotue";

export const Module2Rotue = [
  {
    path: "module2",
    element: (
      <PrivateRoute>
        <ProtectedRoute allowedRoles={["admin"]}>
          <CommonLayout />
        </ProtectedRoute>
      </PrivateRoute>
    ),
    children: [
      { path: "products", Component: Products },
      { path: "products/:id", Component: Product },
      { path: "product/:id", Component: ProductForm },
      { path: "product/add", Component: ProductForm },
      { path: "categories", Component: Categories },
      { path: "category/:id", Component: CategoryForm },
      { path: "category/add", Component: CategoryForm },
    ],
  },
];
