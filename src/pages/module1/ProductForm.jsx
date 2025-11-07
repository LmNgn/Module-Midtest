import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "../../schemas/categorySchema";
import { categoryApi } from "../../api/categories";
import { useNavigate, useParams } from "react-router-dom";

export default function CategoryForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: { title: "", slug: "" },
  });

  useEffect(() => {
    const init = async () => {
      if (isEdit) {
        const c = await categoryApi.get(id);
        setValue("title", c.title);
        setValue("slug", c.slug);
      }
    };
    init();
  }, [id, isEdit, setValue]);

  const onSubmit = async (values) => {
    if (isEdit) {
      await categoryApi.update(id, values);
      alert("Cập nhật danh mục thành công!");
    } else {
      await categoryApi.create(values);
      alert("Thêm danh mục thành công!");
    }
    navigate("/categories");
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">
        {isEdit ? "Cập nhật danh mục" : "Thêm danh mục"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Tên danh mục</label>
          <input
            className="w-full border rounded p-2"
            {...register("title")}
            placeholder="Nhập tên danh mục"
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Slug</label>
          <input
            className="w-full border rounded p-2"
            {...register("slug")}
            placeholder="vi-du-slug"
          />
          {errors.slug && (
            <p className="text-red-600 text-sm mt-1">{errors.slug.message}</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {isEdit ? "Cập nhật" : "Thêm mới"}
          </button>
          <button
            type="button"
            className="px-4 py-2 border rounded"
            onClick={() => navigate("/categories")}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
