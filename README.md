# DevPath

A free learning platform for people heading into software development — not just syntax, but the whole picture: how to learn technical skills effectively, version control, working with data, and how applications talk to each other.

## Why it's built this way

Courses are structured around learning-science research rather than passive reading:

- **Retrieval practice** — every module ends with a quiz you must pass (not just read past) to mark it complete.
- **Spacing** — content is chunked into small modules so you can revisit and re-quiz over several days instead of cramming.
- **Deliberate practice** — select modules include a hands-on project, because watching/reading isn't the same skill as doing.

The first course, **Learning How to Learn**, covers this explicitly so the method is transparent, not just baked silently into the UI.

## Courses (v1)

- 🧠 Learning How to Learn (For Developers)
- 🌱 Git & GitHub
- 🐍 Python Fundamentals
- 🗄️ SQL & Databases
- 🔌 APIs & Web Services

Progress is tracked locally per-browser (no account needed yet).

## Stack

React + TypeScript + Vite + Tailwind CSS v4 + React Router. No backend yet — content lives in `src/content/*.ts` as typed data, course progress in `localStorage`.

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Roadmap

- Account system + server-synced progress
- More courses: command line, testing, deployment, the "dev mindset" / soft skills, reading a job description
- Spaced-repetition review queue across finished modules (not just linear progress)
