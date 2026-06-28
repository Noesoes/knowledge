import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import CoursePage from "./pages/CoursePage";
import ModulePage from "./pages/ModulePage";
import ReviewPage from "./pages/ReviewPage";
import SqlCoursePage from "./pages/SqlCoursePage";

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
      </Routes>
    </div>
  );
}
