import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteItem, getOne } from "../../api/commonApi";
import { getTaskByProject } from "../../api/module3Api";
import toast from "react-hot-toast";

const key = "projects";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const nav = useNavigate();

  const getData = async () => {
    try {
      const { data } = await getOne(key, id);
      setProject(data);
      const res = await getTaskByProject(id);
      setTasks(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm("Bạn có chắc muốn xóa công việc này?")) return;
    try {
      await deleteItem("tasks", taskId);
      toast.success("Xóa công việc thành công");
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (!project) {
    return (
      <p className="text-center mt-10 text-gray-500">Đang tải dữ liệu...</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-700">{project.title}</h2>
        <button
          onClick={() => nav(`/module3/tasks/add/${id}`)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add
        </button>
      </div>

      <p className="text-gray-700 mb-2">{project.description}</p>
      <p className="mb-6">
        <span className="font-semibold">Status:</span>{" "}
        <span className="capitalize text-blue-600">{project.status}</span>
      </p>

      <h3 className="text-xl font-semibold mb-3">Task list:</h3>
      {tasks.length > 0 ? (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="border border-gray-200 p-4 rounded hover:shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-medium text-gray-800">
                    {task.title}
                  </h4>
                  <p className="text-gray-600">{task.description}</p>
                  <p className="text-sm mt-1">
                    <span className="font-semibold">Status:</span>{" "}
                    <span className="capitalize text-green-600">
                      {task.status}
                    </span>
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => nav(`/module3/tasks/edit/${id}/${task.id}`)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Chưa có công việc nào cho dự án này.</p>
      )}
    </div>
  );
};

export default Project;
