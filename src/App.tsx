import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import CoursePage from "./pages/CoursePage";
import ModulePage from "./pages/ModulePage";
import ReviewPage from "./pages/ReviewPage";
import SqlCoursePage from "./pages/SqlCoursePage";
import LessonPathPage from "./pages/LessonPathPage";
import { pythonUnits } from "./content/pythonPath";
import { apisUnits } from "./content/apisPath";

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/course/:courseId/module/:moduleId" element={<ModulePage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/sql-path" element={<SqlCoursePage />} />
        <Route
          path="/python-path"
          element={
            <LessonPathPage
              title="Python Fundamentals"
              icon="🐍"
              units={pythonUnits}
              storagePrefix="pythonpath"
              backHref="/course/python"
              backLabel="Back to Python course overview"
            />
          }
        />
        <Route
          path="/apis-path"
          element={
            <LessonPathPage
              title="APIs & Web Services"
              icon="🔌"
              units={apisUnits}
              storagePrefix="apispath"
              backHref="/course/apis"
              backLabel="Back to APIs course overview"
            />
          }
        />
      </Routes>
    </div>
  );
}
