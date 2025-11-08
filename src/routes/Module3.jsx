import CommonLayout from "../components/layouts/CommonLayout";
import Projects from "../pages/module3/Projects";
import ProjectForm from "../pages/module3/ProjectForm";
import Project from "../pages/module3/Project";
import TaskForm from "../pages/module3/TaskForm";
import PrivateRoute from "./protect/PrivateRouter";
import ProtectedRoute from "./protect/ProtectedRotue";

export const Module3Rotue = [
  {
    path: "module3",
    element: (
      <PrivateRoute>
        <ProtectedRoute allowedRoles={["admin"]}>
          <CommonLayout />
        </ProtectedRoute>
      </PrivateRoute>
    ),
    children: [
      { path: "projects", Component: Projects },
      { path: "projects/:id", Component: Project },
      { path: "project/:id", Component: ProjectForm },
      { path: "project/add", Component: ProjectForm },
      { path: "tasks/edit/:projectId/:id", Component: TaskForm },
      { path: "tasks/add/:projectId", Component: TaskForm },
    ],
  },
];
