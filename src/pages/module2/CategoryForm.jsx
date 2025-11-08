import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import { createItem, getOne, updateItem } from "../../api/commonApi";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const key = "categories";

const courseSchema = z.object({
  title: z.string().min(6),
  slug: z
    .string()
    .min(1)
    .refine((data) => !data.includes(" "), {
      message: "Slug không được chứa khoảng trắng",
    }),
});

const CategoryForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const nav = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(courseSchema) });

  const onSubmit = async (data) => {
    try {
      isEdit ? await updateItem(key, id, data) : await createItem(key, data);
      toast.success(`${isEdit ? "Edit" : "Add"} successful`);
      nav("/module2/categories");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      (async () => {
        const { data } = await getOne(key, id);
        reset({
          title: data.title,
          slug: data.slug,
        });
      })();
    }
  }, [id, reset]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Course" : "Add Course"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            {...register("title")}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Slug</label>
          <input
            type="text"
            {...register("slug", { required: true })}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
          />
          {errors.slug && (
            <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
