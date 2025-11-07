import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productApi } from "../../api/products";
import { categoryApi } from "../../api/categories";
import PageHeader from "../../components/PageHeader";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categoriesMap, setCategoriesMap] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    const [ps, cs] = await Promise.all([productApi.list(), categoryApi.list()]);
    const map = cs.reduce((acc, c) => ({ ...acc, [c.id]: c.title }), {});
    setCategoriesMap(map);
    setProducts(ps);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Bạn có chắc muốn xoá sản phẩm này?");
    if (ok) {
      await productApi.remove(id);
      await load(); // cập nhật lại danh sách
      alert("Xoá thành công!");
    }
  };

  return (
    <>
      <PageHeader
        title="Quản lý sản phẩm"
        actionText="Thêm sản phẩm"
        onAction={() => navigate("/products/new")}
      />
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Tên sản phẩm</th>
                <th className="p-3 text-left">Giá</th>
                <th className="p-3 text-left">Danh mục</th>
                <th className="p-3 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-3">{p.title}</td>
                  <td className="p-3">{p.price.toLocaleString()} VND</td>
                  <td className="p-3">{categoriesMap[p.categoryId] || "-"}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                        onClick={() => navigate(`/products/${p.id}`)}
                      >
                        Sửa
                      </button>
                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded"
                        onClick={() => handleDelete(p.id)}
                      >
                        Xoá
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td className="p-3 text-center" colSpan={4}>
                    Không có sản phẩm
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
