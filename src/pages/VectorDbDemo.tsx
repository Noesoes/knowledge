import { useState } from "react";
import { Link } from "react-router-dom";

// 8-dimensional vectors. Dims represent roughly:
// [0] animal-ness  [1] pet/domestic  [2] tech/software  [3] code/systems
// [4] food/eating  [5] cuisine       [6] science         [7] math/physics
const DOCS: Doc[] = [
  { id: 1,  text: "The dog chased the ball across the park",        category: "Animals",  color: "#ff8a8a", x: 0.22, y: 0.16, vec: [ 0.82,  0.74, -0.12, -0.08,  0.05, -0.03,  0.11, -0.06] },
  { id: 2,  text: "My cat sleeps on the keyboard all day",           category: "Animals",  color: "#ff8a8a", x: 0.29, y: 0.22, vec: [ 0.79,  0.71,  0.18,  0.12, -0.04,  0.02, -0.07,  0.05] },
  { id: 3,  text: "Birds migrate south for the winter",              category: "Animals",  color: "#ff8a8a", x: 0.17, y: 0.28, vec: [ 0.75,  0.42, -0.08, -0.11,  0.07,  0.04,  0.13, -0.09] },
  { id: 4,  text: "The horse galloped through the meadow",           category: "Animals",  color: "#ff8a8a", x: 0.12, y: 0.20, vec: [ 0.80,  0.38, -0.15, -0.09,  0.03, -0.05,  0.08,  0.02] },
  { id: 5,  text: "A neural network is a machine learning model",    category: "Tech",     color: "#5b9dff", x: 0.72, y: 0.17, vec: [-0.09, -0.05,  0.85,  0.78, -0.06,  0.03,  0.42,  0.38] },
  { id: 6,  text: "Deploy your API to a Kubernetes cluster",         category: "Tech",     color: "#5b9dff", x: 0.78, y: 0.23, vec: [-0.06,  0.03,  0.88,  0.72, -0.03,  0.05,  0.18,  0.12] },
  { id: 7,  text: "SQL databases store data in tables and rows",     category: "Tech",     color: "#5b9dff", x: 0.65, y: 0.27, vec: [-0.11, -0.02,  0.80,  0.65, -0.08,  0.02,  0.22,  0.19] },
  { id: 8,  text: "Vector embeddings represent meaning as numbers",  category: "Tech",     color: "#5b9dff", x: 0.74, y: 0.12, vec: [-0.04,  0.06,  0.82,  0.70, -0.05,  0.04,  0.48,  0.44] },
  { id: 9,  text: "Neapolitan pizza has a thin crispy crust",        category: "Food",     color: "#3ecf8e", x: 0.40, y: 0.72, vec: [ 0.08, -0.04, -0.07, -0.11,  0.88,  0.75, -0.05,  0.03] },
  { id: 10, text: "Fresh sushi with salmon and avocado",             category: "Food",     color: "#3ecf8e", x: 0.48, y: 0.76, vec: [ 0.04, -0.07, -0.03, -0.08,  0.85,  0.82, -0.08,  0.02] },
  { id: 11, text: "A juicy burger with lettuce and tomato",          category: "Food",     color: "#3ecf8e", x: 0.34, y: 0.79, vec: [ 0.11, -0.02, -0.09, -0.06,  0.84,  0.68, -0.04,  0.06] },
  { id: 12, text: "Pasta carbonara with pecorino and guanciale",     category: "Food",     color: "#3ecf8e", x: 0.44, y: 0.67, vec: [ 0.06, -0.05, -0.11, -0.04,  0.86,  0.79, -0.06, -0.02] },
  { id: 13, text: "Quantum entanglement links particles across space",category: "Science", color: "#c792ea", x: 0.82, y: 0.70, vec: [-0.07,  0.04,  0.22,  0.18, -0.04, -0.06,  0.88,  0.81] },
  { id: 14, text: "DNA encodes genetic information in base pairs",    category: "Science", color: "#c792ea", x: 0.75, y: 0.76, vec: [ 0.12, -0.03,  0.08,  0.05, -0.07,  0.02,  0.84,  0.76] },
  { id: 15, text: "Black holes warp spacetime with intense gravity",  category: "Science", color: "#c792ea", x: 0.86, y: 0.62, vec: [-0.05,  0.06,  0.14,  0.10, -0.05, -0.03,  0.86,  0.79] },
  { id: 16, text: "Evolution explains diversity of life on Earth",    category: "Science", color: "#c792ea", x: 0.76, y: 0.84, vec: [ 0.09,  0.02,  0.05,  0.03, -0.04, -0.02,  0.82,  0.74] },
];

const QUERIES = [
  { label: "🐾  pet behavior",       vec: [ 0.75,  0.68,  0.08,  0.05,  0.03, -0.01,  0.06,  0.02] },
  { label: "☁️  software deployment", vec: [-0.05,  0.02,  0.86,  0.73, -0.04,  0.03,  0.20,  0.15] },
  { label: "🍕  Italian food",        vec: [ 0.05, -0.04, -0.08, -0.06,  0.87,  0.80, -0.05,  0.01] },
  { label: "🔬  physics research",    vec: [-0.04,  0.05,  0.16,  0.12, -0.05, -0.04,  0.87,  0.80] },
  { label: "🤖  machine learning",    vec: [-0.06,  0.02,  0.84,  0.76, -0.04,  0.02,  0.50,  0.45] },
];

interface Doc {
  id: number;
  text: string;
  category: string;
  color: string;
  x: number; // 0–1 position in scatter
  y: number;
  vec: number[];
}

function cosine(a: number[], b: number[]): number {
  const dot = a.reduce((s, v, i) => s + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
  const magB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
  return magA && magB ? dot / (magA * magB) : 0;
}

function fmt(n: number) {
  return (n >= 0 ? " " : "") + n.toFixed(2);
}

export default function VectorDbDemo() {
  const [activeQuery, setActiveQuery] = useState<number | null>(null);
  const [hoveredDoc, setHoveredDoc] = useState<number | null>(null);
  const [showRawVec, setShowRawVec] = useState<number | null>(null);

  const queryVec = activeQuery !== null ? QUERIES[activeQuery].vec : null;

  const ranked = queryVec
    ? [...DOCS]
        .map((d) => ({ ...d, sim: cosine(d.vec, queryVec) }))
        .sort((a, b) => b.sim - a.sim)
    : null;

  const topIds = new Set(ranked?.slice(0, 3).map((d) => d.id) ?? []);

  const W = 560, H = 340, PAD = 30;
  const cx = (x: number) => PAD + x * (W - PAD * 2);
  const cy = (y: number) => PAD + y * (H - PAD * 2);

  const categories = Array.from(new Set(DOCS.map((d) => d.category)));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link to="/" className="text-sm text-indigo-600 dark:text-indigo-300 hover:underline">
        ← Back to all paths
      </Link>

      <h1 className="text-2xl font-bold mt-3 mb-1 text-slate-900 dark:text-slate-100">
        🧲 Live Vector Database Demo
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-2xl">
        This is a real vector database running in your browser — 16 documents, each stored as an 8-dimensional
        embedding. Pick a query to run nearest-neighbor search and watch which documents are closest in vector space.
      </p>

      {/* The Database Table */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">
          The database — 16 rows, each with text + embedding vector
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
          Real production embeddings have 768–3072 dimensions. We're using 8 so you can see the numbers.
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <table className="min-w-full text-xs font-mono">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 text-left">
                <th className="px-3 py-2 w-8">id</th>
                <th className="px-3 py-2">text</th>
                <th className="px-3 py-2 w-24">category</th>
                <th className="px-3 py-2">embedding vector (8-dim)</th>
                {ranked && <th className="px-3 py-2 w-24 text-right">similarity</th>}
              </tr>
            </thead>
            <tbody>
              {(ranked ?? DOCS.map((d) => ({ ...d, sim: undefined }))).map((doc) => {
                const isTop = topIds.has(doc.id);
                const isHovered = hoveredDoc === doc.id;
                return (
                  <tr
                    key={doc.id}
                    onMouseEnter={() => setHoveredDoc(doc.id)}
                    onMouseLeave={() => setHoveredDoc(null)}
                    className={[
                      "border-t border-slate-100 dark:border-slate-800 transition-colors cursor-pointer",
                      isTop ? "bg-indigo-50 dark:bg-indigo-500/10" : isHovered ? "bg-slate-50 dark:bg-slate-800/40" : "",
                    ].join(" ")}
                    onClick={() => setShowRawVec(showRawVec === doc.id ? null : doc.id)}
                  >
                    <td className="px-3 py-2 text-slate-400">{doc.id}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="shrink-0 w-2 h-2 rounded-full"
                          style={{ backgroundColor: doc.color }}
                        />
                        <span className={isTop ? "text-indigo-700 dark:text-indigo-300 font-semibold" : "text-slate-700 dark:text-slate-300"}>
                          {doc.text}
                        </span>
                        {isTop && (
                          <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300">
                            TOP {ranked!.findIndex((r) => r.id === doc.id) + 1}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-slate-500 dark:text-slate-400">{doc.category}</td>
                    <td className="px-3 py-2">
                      {showRawVec === doc.id ? (
                        <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                          {doc.vec.map((v, i) => (
                            <span
                              key={i}
                              className={[
                                "px-1 rounded",
                                v > 0.5 ? "text-emerald-600 dark:text-emerald-400 font-semibold" :
                                v < -0.1 ? "text-rose-500 dark:text-rose-400" :
                                "text-slate-500 dark:text-slate-400",
                              ].join(" ")}
                            >
                              {fmt(v)}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-600">
                          [{doc.vec.map((v) => fmt(v)).join(", ")}]
                        </span>
                      )}
                    </td>
                    {"sim" in doc && doc.sim !== undefined && (
                      <td className="px-3 py-2 text-right">
                        <span className={isTop ? "text-indigo-600 dark:text-indigo-300 font-bold" : "text-slate-500 dark:text-slate-400"}>
                          {(doc.sim as number).toFixed(3)}
                        </span>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-1.5">Click any row to highlight its dimensions.</p>
      </section>

      {/* 2D Scatter + Query */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Scatter plot */}
        <section>
          <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">
            2D projection of vector space
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Each dot is one document. Semantically similar documents cluster together.
            This is what makes vector search possible.
          </p>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-sm">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
              {/* Axis labels */}
              <text x={W / 2} y={H - 4} textAnchor="middle" className="fill-slate-400" fontSize="10">
                dimension 1 →
              </text>
              <text x={10} y={H / 2} textAnchor="middle" className="fill-slate-400" fontSize="10"
                transform={`rotate(-90, 10, ${H / 2})`}>
                dim 2 →
              </text>

              {/* Cluster label zones */}
              {[
                { label: "Animals", x: 0.18, y: 0.05 },
                { label: "Tech", x: 0.74, y: 0.05 },
                { label: "Food", x: 0.42, y: 0.58 },
                { label: "Science", x: 0.80, y: 0.58 },
              ].map((z) => (
                <text key={z.label} x={cx(z.x)} y={cy(z.y)} textAnchor="middle"
                  fontSize="9" className="fill-slate-300 dark:fill-slate-700 select-none">
                  {z.label}
                </text>
              ))}

              {/* Docs */}
              {DOCS.map((doc) => {
                const isTop = topIds.has(doc.id);
                const isHov = hoveredDoc === doc.id;
                const r = isTop ? 9 : isHov ? 8 : 6;
                return (
                  <g key={doc.id}
                    onMouseEnter={() => setHoveredDoc(doc.id)}
                    onMouseLeave={() => setHoveredDoc(null)}
                    style={{ cursor: "pointer" }}
                  >
                    {isTop && (
                      <circle cx={cx(doc.x)} cy={cy(doc.y)} r={16}
                        fill="none" stroke="#6366f1" strokeWidth="1.5" opacity={0.5}>
                        <animate attributeName="r" values="12;18;12" dur="1.8s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.8s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle
                      cx={cx(doc.x)} cy={cy(doc.y)} r={r}
                      fill={doc.color}
                      opacity={ranked && !isTop ? 0.3 : 0.9}
                      stroke={isTop ? "#6366f1" : isHov ? "#94a3b8" : "transparent"}
                      strokeWidth={isTop ? 2 : 1}
                    />
                    {(isHov || isTop) && (
                      <text x={cx(doc.x)} y={cy(doc.y) - 12} textAnchor="middle"
                        fontSize="8.5" className="fill-slate-700 dark:fill-slate-300 pointer-events-none">
                        {doc.id}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-2">
            {categories.map((cat) => {
              const color = DOCS.find((d) => d.category === cat)!.color;
              return (
                <span key={cat} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                  {cat}
                </span>
              );
            })}
          </div>
        </section>

        {/* Query panel */}
        <section>
          <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">
            Run a nearest-neighbor query
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Each query has its own embedding vector. The database ranks every document by
            cosine similarity and returns the top-3 matches.
          </p>
          <div className="space-y-2 mb-5">
            {QUERIES.map((q, i) => (
              <button
                key={i}
                onClick={() => setActiveQuery(activeQuery === i ? null : i)}
                className={[
                  "w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-all",
                  activeQuery === i
                    ? "border-indigo-400 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-medium"
                    : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <span>{q.label}</span>
                  {activeQuery === i && <span className="text-xs text-indigo-500">▶ active</span>}
                </div>
                {activeQuery === i && (
                  <div className="mt-1.5 text-[11px] font-mono text-indigo-500 dark:text-indigo-400 opacity-80">
                    [{q.vec.map((v) => fmt(v)).join(", ")}]
                  </div>
                )}
              </button>
            ))}
          </div>

          {ranked && (
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                Top 3 results by cosine similarity
              </p>
              <div className="space-y-2">
                {ranked.slice(0, 3).map((doc, rank) => (
                  <div key={doc.id}
                    className="flex items-start gap-3 px-3 py-2.5 rounded-lg border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {rank + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm text-slate-800 dark:text-slate-200 leading-snug">{doc.text}</p>
                      <p className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 mt-0.5">
                        similarity: {doc.sim.toFixed(4)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 rounded-lg bg-slate-100 dark:bg-slate-900/60 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">How it works: </span>
                cosine_similarity(query_vec, doc_vec) = (A · B) / (|A| × |B|).
                A score of 1.0 means identical direction; 0.0 means orthogonal (unrelated).
              </div>
            </div>
          )}

          {!ranked && (
            <div className="p-4 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 text-center text-sm text-slate-400 dark:text-slate-600">
              ← Pick a query above to run nearest-neighbor search
            </div>
          )}
        </section>
      </div>

      {/* Explanation */}
      <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 shadow-sm">
        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">
          What you're seeing
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-600 dark:text-slate-400">
          <div>
            <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">🗃️ Storage</p>
            <p>Each document is stored as a row: the original text plus its embedding vector. The vector is what the database actually searches — the text is just metadata.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">🧭 Search</p>
            <p>At query time, the query is embedded too. The DB computes cosine similarity between the query vector and every stored vector, then returns the closest ones.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">📐 Clusters</p>
            <p>Documents about similar topics have similar vectors, so they land near each other in the scatter plot. That's the geometric intuition behind semantic search.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
