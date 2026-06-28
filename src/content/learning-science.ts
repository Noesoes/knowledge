import type { Course } from "../types";

export const learningScience: Course = {
  id: "learning-how-to-learn",
  title: "Learning How to Learn (For Developers)",
  tagline: "The meta-skill that makes every other course on this site work.",
  icon: "🧠",
  description:
    "Before SQL, Python, or Git, learn how your brain actually acquires technical skill. This course distills research on memory, practice, and skill acquisition into a concrete study system you'll use for every course that follows.",
  modules: [
    {
      id: "why-most-studying-fails",
      title: "Why Most Studying Fails",
      summary:
        "Highlighting and re-reading feel productive but barely move the needle. Here's what the research actually shows works.",
      content: `
### The illusion of fluency

Re-reading notes and highlighting text creates "fluency" — material *feels* familiar, so your brain reports back "I know this." But fluency is not the same as retrieval ability. The classic Dunlosky et al. (2013) review of learning techniques ranked **re-reading and highlighting among the least effective** study strategies, despite being the most commonly used.

The two techniques that consistently outperform everything else:

### 1. Retrieval practice (active recall)
Instead of looking at the answer, you force your brain to *generate* it from memory. Closing the book and trying to explain a concept, or taking a quiz, is retrieval practice. The act of struggling to recall — even when you get it wrong — strengthens the memory trace more than passively reviewing the correct answer would.

### 2. Spaced repetition
Cramming creates short-lived memory. Spacing the *same* material across days (instead of one long session) produces dramatically better long-term retention, because each successful retrieval after a delay re-consolidates the memory more durably. This is why every course on this site is broken into small modules with quizzes — quiz yourself today, then again in 2 days, then in a week.

### Putting it together
Every module here ends with a quiz. Don't treat the quiz as a test of whether you read carefully — treat it as the *actual learning event*. Reading the lesson is just loading material into working memory; the quiz is what moves it into long-term memory.
      `,
      keyTakeaways: [
        "Re-reading and highlighting feel effective but produce weak long-term retention.",
        "Retrieval practice (quizzing yourself) is one of the most effective study techniques known.",
        "Spacing practice over days beats cramming it into one session.",
        "The quiz at the end of a module is the real learning step, not a formality.",
      ],
      quiz: [
        {
          question: "Why does re-reading feel productive even though it's a weak study technique?",
          options: [
            "It creates a false sense of fluency without testing actual recall",
            "It takes too long to be useful",
            "It only works for math, not for programming",
            "It actively damages memory formation",
          ],
          correctIndex: 0,
          explanation:
            "Re-reading makes material feel familiar (fluent), which your brain misreads as 'known,' but familiarity isn't the same as being able to retrieve the information unaided.",
        },
        {
          question: "What is 'retrieval practice'?",
          options: [
            "Looking up answers quickly online",
            "Forcing yourself to recall information from memory without looking it up",
            "Copying notes word for word",
            "Watching a video twice",
          ],
          correctIndex: 1,
          explanation:
            "Retrieval practice means generating the answer from memory — e.g., quizzing yourself — which is one of the strongest predictors of long-term retention.",
        },
        {
          question: "What does spaced repetition do that cramming doesn't?",
          options: [
            "Makes the first study session shorter",
            "Removes the need to ever review material again",
            "Strengthens memory by re-testing after a delay, which cramming skips",
            "Nothing — they produce identical results",
          ],
          correctIndex: 2,
          explanation:
            "Re-testing yourself after a delay (a day, a few days, a week) forces reconsolidation of the memory and produces much better long-term retention than one long cram session.",
        },
      ],
    },
    {
      id: "deliberate-practice",
      title: "Deliberate Practice & The Project-First Loop",
      summary:
        "Watching tutorials isn't practice. Here's the loop that actually builds skill: struggle, fail, get feedback, repeat.",
      content: `
### Tutorial purgatory

A well-known trap in learning to code: watching tutorial after tutorial, feeling like you're learning, but freezing up on a blank file. This happens because watching someone else code is **observation**, not **practice**. Skill is built by doing the thing yourself, hitting errors, and resolving them.

### Deliberate practice

Coined by psychologist Anders Ericsson, deliberate practice has a few defining features:
- It targets a specific weakness, just past your current skill level (not too easy, not impossibly hard)
- It includes immediate feedback (does the code run? does the test pass? was the quiz answer right?)
- It requires focused effort, not passive consumption

### The loop for this site

Every course module here follows: **read lesson → take quiz (retrieval) → build something small (deliberate practice) → revisit in a few days (spacing)**. The "project" at the end of select modules is the deliberate-practice step — don't skip it even if the quiz felt easy. Reading about a \`for\` loop and *writing* one that breaks and fixing it are different skills, and only the second one is what employers and real work demand.

### The 20-hour rule of thumb
You don't need 10,000 hours to become "decent enough to be useful" at a specific sub-skill (e.g., writing basic SQL joins). Josh Kaufman's research-informed claim is that ~20 focused hours of deliberate practice gets you from "can't do this at all" to "competent." That's the bar each course here aims for per topic — not mastery, but real competence you can build on.
      `,
      keyTakeaways: [
        "Watching tutorials is observation, not practice — it doesn't build skill on its own.",
        "Deliberate practice = focused effort, just beyond your current level, with immediate feedback.",
        "Each module's project is the part that actually builds durable skill.",
        "~20 hours of focused practice is enough to go from zero to functionally competent at a narrow skill.",
      ],
      quiz: [
        {
          question: "Why does 'tutorial purgatory' happen?",
          options: [
            "Tutorials are always wrong",
            "Watching someone else code is observation, not hands-on practice",
            "Tutorials are too short",
            "It only happens to beginners over 30",
          ],
          correctIndex: 1,
          explanation:
            "Watching is passive. Skill requires you to personally write code, hit errors, and fix them — that's what tutorials alone don't provide.",
        },
        {
          question: "Which of these best matches 'deliberate practice'?",
          options: [
            "Rewatching the same video until it feels familiar",
            "Practicing whatever is easiest and most comfortable",
            "Targeting a specific weak point, slightly past your current ability, with immediate feedback",
            "Reading documentation cover to cover before writing any code",
          ],
          correctIndex: 2,
          explanation:
            "Deliberate practice is targeted, slightly challenging, and gives immediate feedback — like fixing a failing test, not just reading about testing.",
        },
        {
          question: "What is the practical role of the 'project' step at the end of a module?",
          options: [
            "It's optional decoration",
            "It's the deliberate-practice step that actually builds skill, not just the quiz",
            "It replaces the need for a quiz",
            "It is only for advanced learners",
          ],
          correctIndex: 1,
          explanation:
            "The project forces you to apply the concept in a messier, more realistic context than a quiz question can — that's where real skill is built.",
        },
      ],
    },
    {
      id: "feynman-and-interleaving",
      title: "The Feynman Technique & Interleaving",
      summary:
        "Two more research-backed tools: explaining concepts simply, and mixing topics instead of blocking them.",
      content: `
### The Feynman Technique

Named after physicist Richard Feynman, this technique has 4 steps:
1. Pick a concept (e.g., "what is an API")
2. Explain it in plain language, as if to someone with no background — no jargon allowed
3. Notice where you get stuck or start using jargon to cover a gap — that's exactly what you don't understand yet
4. Go back to the source material, fill the gap, and simplify your explanation again

This works because **teaching forces retrieval practice and exposes gaps that passive reading hides.** If you can't explain why a SQL \`JOIN\` works without saying "it just joins the tables," you don't fully understand it yet.

### Interleaving vs. blocking

"Blocked" practice studies one topic exhaustively before moving to the next (all of SQL \`SELECT\`, then all of \`JOIN\`, then all of \`GROUP BY\`). "Interleaved" practice mixes related-but-different problem types in the same session. Research (Rohrer & Taylor, among others) shows interleaving produces worse *immediate* performance but much better long-term retention and transfer, because your brain is forced to discriminate between approaches rather than pattern-matching on "we're doing the GROUP BY chapter, so the answer probably involves GROUP BY."

### Practical takeaway for this site
After finishing a course, don't just move linearly forward — go back and mix old quizzes from a finished module into a session on a new topic. The discomfort of switching contexts is a feature, not a bug.
      `,
      keyTakeaways: [
        "The Feynman Technique: explain a concept in plain language and use the gaps you find to direct further study.",
        "Struggling to explain something without jargon reveals what you don't actually understand.",
        "Interleaving (mixing topics) feels harder but produces better long-term retention than blocked practice.",
        "Revisit old module quizzes periodically instead of only moving forward linearly.",
      ],
      quiz: [
        {
          question: "In the Feynman Technique, what do you do when you get stuck while explaining a concept?",
          options: [
            "Give up on the concept entirely",
            "Use more technical jargon to sound confident",
            "Note it as a specific gap and return to the source material to fix it",
            "Switch to a completely different topic",
          ],
          correctIndex: 2,
          explanation:
            "Getting stuck is the most useful part of the technique — it pinpoints exactly which part of the concept you don't yet understand.",
        },
        {
          question: "What does interleaving (mixing topics) do compared to blocked practice?",
          options: [
            "It produces better immediate performance and better long-term retention",
            "It produces worse immediate performance but better long-term retention",
            "It has no measurable effect on learning",
            "It only works for math, not programming",
          ],
          correctIndex: 1,
          explanation:
            "Interleaving feels harder in the moment because you can't rely on 'this is the JOIN chapter' pattern matching, but it builds more durable, transferable skill.",
        },
      ],
    },
  ],
};
