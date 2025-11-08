import CommonLayout from "../components/layouts/CommonLayout";
import CourseForm from "../pages/module1/CourseForm";
import Courses from "../pages/module1/Courses";
import LessonForm from "../pages/module1/LessonForm";
import Lessons from "../pages/module1/Lessons";
import PrivateRoute from "./protect/PrivateRouter";
import ProtectedRoute from "./protect/ProtectedRotue";

export const Module1Rotue = [
  {
    path: "module1",
    element: (
      <PrivateRoute>
        <ProtectedRoute allowedRoles={["admin"]}>
          <CommonLayout />
        </ProtectedRoute>
      </PrivateRoute>
    ),
    children: [
      { path: "courses", Component: Courses },
      { path: "course/:id", Component: CourseForm },
      { path: "course/add", Component: CourseForm },
      { path: "lessons/:id", Component: Lessons },
      { path: "lesson/:id/:courseId", Component: LessonForm },
      { path: "lesson/add/:courseId", Component: LessonForm },
    ],
  },
];
