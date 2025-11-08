import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import { createItem, getOne, updateItem } from "../../api/commonApi";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const key = "lessons";

const lessonSchema = z.object({
  title: z.string().min(6),
  content: z.string(),
});

const LessonForm = () => {
  const { id, courseId } = useParams();
  const isEdit = Boolean(id);
  const nav = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(lessonSchema) });

  const onSubmit = async (data) => {
    try {
      let newData = data;
      if (!isEdit) {
        newData = { ...data, courseId: courseId };
      }
      isEdit
        ? await updateItem(key, id, newData)
        : await createItem(key, newData);
      toast.success(`${isEdit ? "Edit" : "Add"} successful`);
      nav(`/module1/lessons/${courseId}`);
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
          content: data.content,
        });
      })();
    }
  }, [id, reset]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <div className="flex justify-between align-center">
        <h2 className="text-2xl font-bold mb-6">
          {isEdit ? "Edit Lesson" : "Add Lesson"}
        </h2>
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          onClick={() => nav(`/module1/lessons/${courseId}`)}
        >
          Return
        </button>
      </div>
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
          <label className="block font-medium mb-1">Content</label>
          <textarea
            {...register("content")}
            rows={4}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
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

export default LessonForm;
