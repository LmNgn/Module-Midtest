import React, { useEffect, useState } from "react";
import { deleteItem, getList } from "../../api/commonApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const key = "products";
const Products = () => {
  const [list, setList] = useState([]);
  const nav = useNavigate();

  const getData = async () => {
    try {
      const { data } = await getList(key);
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteItem = async (id) => {
    if (!confirm("Confirm delete?")) return;
    try {
      await deleteItem(key, id);
      toast.success("Delete successful");
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Products List</h2>
        <button
          onClick={() => nav(`/module1/course/add`)}
          className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>
      {list.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left border-b">#</th>
                <th className="px-4 py-2 text-left border-b">Title</th>
                <th className="px-4 py-2 text-left border-b">Price</th>
                <th className="px-4 py-2 text-left border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((i, idx) => (
                <tr key={i.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{idx + 1}</td>
                  <td
                    className="px-4 py-2 border-b cursor-pointer"
                    onClick={() => nav(`/module2/products/${i.id}`)}
                  >
                    {i.title}
                  </td>
                  <td className="px-4 py-2 border-b">{i.price}</td>
                  <td className="px-4 py-2 border-b space-x-2">
                    <button
                      onClick={() => nav(`/module2/product/${i.id}`)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => DeleteItem(i.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default Products;
