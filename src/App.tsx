import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import SqlCoursePage from "./pages/SqlCoursePage";
import LessonPathPage from "./pages/LessonPathPage";
import { pythonUnits } from "./content/pythonPath";
import { apisUnits } from "./content/apisPath";
import { gitUnits } from "./content/gitPath";

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sql-path" element={<SqlCoursePage />} />
        <Route
          path="/git-path"
          element={
            <LessonPathPage
              title="Git & GitHub"
              icon="🌱"
              units={gitUnits}
              storagePrefix="gitpath"
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
        <Route
          path="/python-path"
          element={
            <LessonPathPage
              title="Python Fundamentals"
              icon="🐍"
              units={pythonUnits}
              storagePrefix="pythonpath"
              backHref="/"
              backLabel="Back to all paths"
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
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
      </Routes>
    </div>
  );
}
