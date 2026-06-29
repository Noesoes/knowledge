import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import SqlCoursePage from "./pages/SqlCoursePage";
import LessonPathPage from "./pages/LessonPathPage";
import { pythonUnits } from "./content/pythonPath";
import { apisUnits } from "./content/apisPath";
import { gitUnits } from "./content/gitPath";
import { cliUnits } from "./content/cliPath";
import { gitBranchingUnits } from "./content/gitBranchingPath";
import { gitTeamsUnits } from "./content/gitTeamsPath";
import { cliScriptingUnits } from "./content/cliScriptingPath";
import { cliPowerUserUnits } from "./content/cliPowerUserPath";
import { pythonDataStructuresUnits } from "./content/pythonDataStructuresPath";
import { pythonDebuggingUnits } from "./content/pythonDebuggingPath";
import { sqlJoinsUnits } from "./content/sqlJoinsPath";
import { sqlDesignUnits } from "./content/sqlDesignPath";
import { apisDesignUnits } from "./content/apisDesignPath";
import { apisAuthUnits } from "./content/apisAuthPath";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17] text-slate-900 dark:text-[#e6e9f0]">
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
          path="/git-branching-path"
          element={
            <LessonPathPage
              title="Git Branching Deep Dive"
              icon="🌿"
              units={gitBranchingUnits}
              storagePrefix="gitbranchingpath"
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
        <Route
          path="/git-teams-path"
          element={
            <LessonPathPage
              title="Git for Teams"
              icon="🤝"
              units={gitTeamsUnits}
              storagePrefix="gitteamspath"
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
          path="/python-datastructures-path"
          element={
            <LessonPathPage
              title="Python Data Structures Deep Dive"
              icon="📦"
              units={pythonDataStructuresUnits}
              storagePrefix="pythondatastructurespath"
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
        <Route
          path="/python-debugging-path"
          element={
            <LessonPathPage
              title="Python Error Handling & Debugging"
              icon="🐞"
              units={pythonDebuggingUnits}
              storagePrefix="pythondebuggingpath"
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
        <Route
          path="/sql-joins-path"
          element={
            <LessonPathPage
              title="SQL Joins Deep Dive"
              icon="🔗"
              units={sqlJoinsUnits}
              storagePrefix="sqljoinspath"
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
        <Route
          path="/sql-design-path"
          element={
            <LessonPathPage
              title="Database Design Basics"
              icon="📐"
              units={sqlDesignUnits}
              storagePrefix="sqldesignpath"
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
        <Route
          path="/apis-design-path"
          element={
            <LessonPathPage
              title="REST API Design Best Practices"
              icon="🧩"
              units={apisDesignUnits}
              storagePrefix="apisdesignpath"
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
        <Route
          path="/apis-auth-path"
          element={
            <LessonPathPage
              title="Authentication & Security for APIs"
              icon="🔐"
              units={apisAuthUnits}
              storagePrefix="apisauthpath"
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
        <Route
          path="/cli-path"
          element={
            <LessonPathPage
              title="Command Line Basics"
              icon="⌨️"
              units={cliUnits}
              storagePrefix="clipath"
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
        <Route
          path="/cli-scripting-path"
          element={
            <LessonPathPage
              title="Shell Scripting Essentials"
              icon="📜"
              units={cliScriptingUnits}
              storagePrefix="cliscriptingpath"
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
        <Route
          path="/cli-poweruser-path"
          element={
            <LessonPathPage
              title="Power User CLI Tricks"
              icon="⚡"
              units={cliPowerUserUnits}
              storagePrefix="clipoweruserpath"
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
      </Routes>
    </div>
  );
}
