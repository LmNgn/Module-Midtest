import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { categoryApi } from "../../api/categories";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const load = async () => {
    const cs = await categoryApi.list();
    setCategories(cs);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Bạn có chắc muốn xoá danh mục này?");
    if (!ok) return;

    setError("");
    const has = await categoryApi.hasProducts(id);
    if (has) {
      setError("Không thể xoá: danh mục đang có sản phẩm.");
      return;
    }
    await categoryApi.remove(id);
    await load();
    alert("Xoá danh mục thành công!");
  };

  return (
    <>
      <PageHeader
        title="Quản lý danh mục"
        actionText="Thêm danh mục"
        onAction={() => navigate("/categories/new")}
      />
      {error && <p className="mb-3 text-red-600">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Tên danh mục</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.title}</td>
                <td className="p-3">{c.slug}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                      onClick={() => navigate(`/categories/${c.id}`)}
                    >
                      Sửa
                    </button>
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded"
                      onClick={() => handleDelete(c.id)}
                    >
                      Xoá
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td className="p-3 text-center" colSpan={3}>
                  Không có danh mục
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
