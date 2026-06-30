import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import SqlCoursePage from "./pages/SqlCoursePage";
import PythonTerminal from "./pages/PythonTerminal";
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
import { gitActionsUnits } from "./content/gitActionsPath";
import { gitInternalsUnits } from "./content/gitInternalsPath";
import { pythonOopUnits } from "./content/pythonOopPath";
import { pythonPerformanceUnits } from "./content/pythonPerformancePath";
import { sqlAdvancedUnits } from "./content/sqlAdvancedPath";
import { apisAdvancedUnits } from "./content/apisAdvancedPath";
import { claudeBasicsUnits } from "./content/claudeBasicsPath";
import { cursorBasicsUnits } from "./content/cursorBasicsPath";
import { jsBasicsUnits } from "./content/jsBasicsPath";
import { jsArraysUnits } from "./content/jsArraysPath";
import { jsAsyncUnits } from "./content/jsAsyncPath";
import { typescriptBasicsUnits } from "./content/typescriptBasicsPath";
import ProgressPage from "./pages/ProgressPage";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17] text-slate-900 dark:text-[#e6e9f0]">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sql-path" element={<SqlCoursePage />} />
        <Route path="/python-terminal" element={<PythonTerminal />} />
        <Route path="/progress" element={<ProgressPage />} />
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
        <Route
          path="/git-actions-path"
          element={
            <LessonPathPage
              title="GitHub Actions & CI Basics"
              icon="🤖"
              units={gitActionsUnits}
              storagePrefix="gitactionspath"
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
        <Route
          path="/git-internals-path"
          element={
            <LessonPathPage
              title="Advanced Git Internals"
              icon="🧠"
              units={gitInternalsUnits}
              storagePrefix="gitinternalspath"
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
        <Route
          path="/python-oop-path"
          element={
            <LessonPathPage
              title="Object-Oriented Python"
              icon="🧱"
              units={pythonOopUnits}
              storagePrefix="pythonooppath"
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
        <Route
          path="/python-performance-path"
          element={
            <LessonPathPage
              title="Python Performance & Best Practices"
              icon="🚀"
              units={pythonPerformanceUnits}
              storagePrefix="pythonperformancepath"
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
        <Route
          path="/sql-advanced-path"
          element={
            <LessonPathPage
              title="Advanced SQL"
              icon="📊"
              units={sqlAdvancedUnits}
              storagePrefix="sqladvancedpath"
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
        <Route
          path="/apis-advanced-path"
          element={
            <LessonPathPage
              title="GraphQL, Webhooks & Scaling APIs"
              icon="🌐"
              units={apisAdvancedUnits}
              storagePrefix="apisadvancedpath"
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
        <Route
          path="/claude-basics-path"
          element={
            <LessonPathPage
              title="Claude Basics"
              icon="✨"
              units={claudeBasicsUnits}
              storagePrefix="claudebasicspath"
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
        <Route
          path="/js-path"
          element={
            <LessonPathPage
              title="JavaScript Fundamentals"
              icon="💛"
              units={jsBasicsUnits}
              storagePrefix="jspath"
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
        <Route
          path="/js-arrays-path"
          element={
            <LessonPathPage
              title="JavaScript Arrays & Modern Syntax"
              icon="🔄"
              units={jsArraysUnits}
              storagePrefix="jsarrayspath"
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
        <Route
          path="/js-async-path"
          element={
            <LessonPathPage
              title="Async JavaScript"
              icon="⚡"
              units={jsAsyncUnits}
              storagePrefix="jsasyncpath"
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
        <Route
          path="/typescript-basics-path"
          element={
            <LessonPathPage
              title="TypeScript Basics"
              icon="🔷"
              units={typescriptBasicsUnits}
              storagePrefix="typescriptbasicspath"
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
        <Route
          path="/cursor-basics-path"
          element={
            <LessonPathPage
              title="Cursor Basics"
              icon="🖱️"
              units={cursorBasicsUnits}
              storagePrefix="cursorbasicspath"
              backHref="/"
              backLabel="Back to all paths"
            />
          }
        />
      </Routes>
    </div>
  );
}
