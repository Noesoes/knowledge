import type { PathDiagramKind } from "../lessonPathTypes";

function Box({ children, color = "indigo" }: { children: React.ReactNode; color?: "indigo" | "green" | "amber" | "slate" }) {
  const colors: Record<string, string> = {
    indigo: "border-indigo-500 bg-indigo-500/10 text-indigo-200",
    green: "border-green-500 bg-green-500/10 text-green-200",
    amber: "border-amber-500 bg-amber-500/10 text-amber-200",
    slate: "border-slate-600 bg-slate-800/60 text-slate-300",
  };
  return (
    <div className={`shrink-0 rounded-lg border px-3 py-2 text-center text-xs sm:text-sm font-medium ${colors[color]}`}>
      {children}
    </div>
  );
}

function Arrow({ label, reverse = false }: { label?: string; reverse?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center px-1 min-w-[64px]">
      {label && <span className="text-[10px] sm:text-xs text-slate-400 mb-0.5 text-center">{label}</span>}
      <span className="text-lg text-slate-500">{reverse ? "←" : "→"}</span>
    </div>
  );
}

export default function PathDiagram({ kind }: { kind: PathDiagramKind }) {
  if (kind === "client-server") {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 mb-3">
        <div className="flex items-center justify-center gap-1 flex-wrap">
          <Box color="indigo">🖥️ Client</Box>
          <Arrow label="HTTP request" />
          <Box color="green">🗄️ Server</Box>
        </div>
        <div className="flex items-center justify-center gap-1 flex-wrap mt-2">
          <Box color="indigo">🖥️ Client</Box>
          <Arrow label="HTTP response" reverse />
          <Box color="green">🗄️ Server</Box>
        </div>
      </div>
    );
  }

  if (kind === "rest-methods") {
    const rows: [string, string, string][] = [
      ["GET", "/users/42", "read a resource"],
      ["POST", "/users", "create a resource"],
      ["PATCH", "/users/42", "partially update"],
      ["PUT", "/users/42", "replace entirely"],
      ["DELETE", "/users/42", "remove"],
    ];
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 mb-3 space-y-2">
        <p className="text-[10px] sm:text-xs text-slate-500 mb-1">
          Every request pairs a method (the verb — what to do) with a URL (the noun — which resource to do it to).
        </p>
        {rows.map(([method, path, desc]) => (
          <div key={method} className="flex items-center gap-2 flex-wrap text-xs sm:text-sm">
            <Box color="indigo">{method}</Box>
            <Arrow label="on" />
            <Box color="slate">{path}</Box>
            <span className="text-slate-500">— {desc}</span>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "status-codes") {
    const rows: [string, string, "green" | "amber" | "indigo"][] = [
      ["2xx", "Success — e.g. 200 OK, 201 Created", "green"],
      ["3xx", "Redirect — e.g. 301 Moved Permanently", "indigo"],
      ["4xx", "Client error — e.g. 404 Not Found, 401, 403", "amber"],
      ["5xx", "Server error — e.g. 500 Internal Server Error", "amber"],
    ];
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 mb-3 space-y-2">
        {rows.map(([code, desc, color]) => (
          <div key={code} className="flex items-center gap-2 flex-wrap text-xs sm:text-sm">
            <Box color={color}>{code}</Box>
            <span className="text-slate-400">{desc}</span>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "rest-url") {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 mb-3">
        <div className="flex items-center justify-center gap-1 flex-wrap font-mono text-xs sm:text-sm">
          <Box color="slate">GET</Box>
          <span className="text-slate-500">/articles</span>
          <Box color="indigo">/7</Box>
          <span className="text-slate-500">/comments</span>
        </div>
        <div className="flex items-center justify-center gap-6 flex-wrap mt-3 text-[10px] sm:text-xs text-slate-500">
          <span>resource (noun)</span>
          <span>id of one article</span>
          <span>nested sub-resource</span>
        </div>
      </div>
    );
  }

  if (kind === "bearer-token") {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 mb-3">
        <div className="flex items-center justify-center gap-1 flex-wrap">
          <Box color="indigo">🖥️ Client</Box>
          <Arrow label='Authorization: Bearer <token>' />
          <Box color="green">🗄️ Server</Box>
        </div>
        <div className="flex items-center justify-center gap-1 flex-wrap mt-2">
          <Box color="green">🗄️ Server</Box>
          <Arrow label="verifies token, then responds" reverse />
          <Box color="indigo">🖥️ Client</Box>
        </div>
      </div>
    );
  }

  if (kind === "oauth") {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 mb-3 space-y-2">
        <div className="flex items-center justify-center gap-1 flex-wrap">
          <Box color="indigo">🖥️ Your App</Box>
          <Arrow label="1. redirect to login" />
          <Box color="amber">🔐 Google</Box>
        </div>
        <div className="flex items-center justify-center gap-1 flex-wrap">
          <Box color="amber">🔐 Google</Box>
          <Arrow label="2. user approves, sends token" reverse />
          <Box color="indigo">🖥️ Your App</Box>
        </div>
        <div className="flex items-center justify-center gap-1 flex-wrap">
          <Box color="indigo">🖥️ Your App</Box>
          <Arrow label="3. calls API with token" />
          <Box color="green">🗄️ Google API</Box>
        </div>
      </div>
    );
  }

  if (kind === "websocket") {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 mb-3">
        <div className="flex items-center justify-center gap-1 flex-wrap">
          <Box color="indigo">🖥️ Client</Box>
          <div className="flex flex-col items-center justify-center px-1 min-w-[100px]">
            <span className="text-[10px] sm:text-xs text-slate-400 mb-0.5">persistent connection</span>
            <span className="text-lg text-slate-500">⇄</span>
            <span className="text-[10px] sm:text-xs text-slate-400 mt-0.5">messages flow both ways, anytime</span>
          </div>
          <Box color="green">🗄️ Server</Box>
        </div>
      </div>
    );
  }

  if (kind === "webhook") {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 mb-3 space-y-2">
        <div className="flex items-center justify-center gap-1 flex-wrap">
          <Box color="green">🗄️ Their Server</Box>
          <Arrow label="POST event → your URL" />
          <Box color="indigo">🖥️ Your Server</Box>
        </div>
        <p className="text-[10px] sm:text-xs text-slate-500 text-center">
          Inverted from a normal call — the other server initiates the request when something happens, instead of
          you polling for updates.
        </p>
      </div>
    );
  }

  if (kind === "rate-limit") {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 mb-3">
        <div className="flex items-center justify-center gap-1 flex-wrap">
          <Box color="indigo">🖥️ Client</Box>
          <Arrow label="too many requests" />
          <Box color="amber">429 Too Many Requests</Box>
        </div>
        <p className="text-[10px] sm:text-xs text-slate-500 text-center mt-2">
          The server caps how many requests a client can make per time window, then rejects the rest until it resets.
        </p>
      </div>
    );
  }

  return null;
}
