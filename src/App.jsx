import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ProductList from "./pages/products/ProductList";
import ProductForm from "./pages/products/ProductForm";
import CategoryList from "./pages/categories/CategoryList";
import CategoryForm from "./pages/categories/CategoryForm";

export default function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/:id" element={<ProductForm />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/new" element={<CategoryForm />} />
          <Route path="/categories/:id" element={<CategoryForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
