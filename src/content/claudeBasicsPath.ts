import type { PathUnit } from "../lessonPathTypes";

export const claudeBasicsUnits: PathUnit[] = [
  {
    id: "claude-basics",
    title: "Claude Basics",
    color: "#5b9dff",
    lessons: [
      {
        id: "claude-1",
        title: "What an AI assistant like Claude is for",
        content:
          "Claude is a large language model (LLM) — a system trained on huge amounts of text that predicts and generates language. You can use it to draft and edit writing, explain or write code, summarize documents, brainstorm, and answer questions, by describing what you want in plain language.",
        question: "What's the most accurate description of how an LLM assistant like Claude works?",
        options: [
          "It looks up answers from a fixed database of pre-written responses",
          "It generates a response by predicting likely next text based on patterns learned from training data and the conversation so far",
          "It connects to the internet live for every single answer",
          "It only works for writing code, not general text",
        ],
        correctIndex: 1,
        explanation: "LLMs generate responses token by token based on learned patterns, not by retrieving a canned answer from a lookup table.",
      },
      {
        id: "claude-2",
        title: "Being specific in your prompts",
        content:
          "A vague prompt like 'write something about dogs' gives the model little to work with. A specific prompt — audience, format, length, tone, and any constraints — gives it much more to anchor on: 'Write a 100-word, upbeat Instagram caption about a rescue dog's first day home.'",
        question: "Why does adding specifics (audience, format, length, constraints) to a prompt usually improve the response?",
        options: [
          "It makes the model respond faster",
          "It narrows down what 'good' looks like, so the model has clearer signal about what you actually want instead of guessing",
          "Specific prompts are required or the model will refuse to answer",
          "It has no effect on output quality",
        ],
        correctIndex: 1,
        explanation: "More context reduces ambiguity, so the model's prediction of 'what comes next' lines up better with your actual intent.",
      },
      {
        id: "claude-3",
        title: "System prompts vs your messages",
        content:
          "A system prompt sets persistent context or rules for the whole conversation (e.g. 'You are a helpful coding tutor who explains things simply'), while your individual messages are the specific requests/questions within that conversation. Many apps built on Claude set a system prompt behind the scenes that you never see directly.",
        question: "What's the role of a 'system prompt' compared to a regular user message?",
        options: [
          "It's identical to a user message, just sent first",
          "It sets persistent context, role, or rules that shape how the assistant behaves across the whole conversation, rather than being a one-off request",
          "It's only used to end a conversation",
          "It has no effect on the assistant's responses",
        ],
        correctIndex: 1,
        explanation: "System prompts configure ongoing behavior/persona, while user messages are the turn-by-turn requests within that configured context.",
      },
      {
        id: "claude-4",
        title: "Context windows: why long chats can lose track",
        content:
          "An LLM only 'sees' a limited amount of recent text at once — its context window. In a very long conversation, earlier details can fall outside that window and the model may lose track of them, which is why restating key facts or starting a fresh conversation for a new task can help.",
        question: "Why might Claude seem to 'forget' something you mentioned much earlier in a very long conversation?",
        options: [
          "Claude intentionally ignores old messages to save effort",
          "The model has a limited context window, and content from far enough back may no longer be included in what it currently has access to",
          "Long conversations are technically impossible",
          "It only happens if you ask about an unrelated topic",
        ],
        correctIndex: 1,
        explanation: "Context windows are finite — once a conversation exceeds it, older content can no longer directly inform the model's response.",
      },
      {
        id: "claude-5",
        title: "Why you should still review AI output",
        content:
          "LLMs can sometimes generate plausible-sounding but incorrect information — often called a 'hallucination' — especially for very specific facts, citations, or niche code APIs. Treat AI output as a strong first draft to verify, not an infallible source, particularly for anything high-stakes.",
        question: "Why is it important to double-check facts, citations, or code an AI assistant generates before relying on them?",
        options: [
          "AI assistants are always 100% accurate, so this is unnecessary",
          "Models can generate confident-sounding but incorrect content ('hallucinations'), so verifying important claims or code against a real source is good practice",
          "Checking AI output is only needed for image generation",
          "It's only a concern for very old AI models",
        ],
        correctIndex: 1,
        explanation: "Fluent, confident phrasing isn't the same as correctness — verifying important details protects against plausible-sounding mistakes.",
      },
    ],
  },
];

export const allClaudeBasicsLessons = claudeBasicsUnits.flatMap((u) => u.lessons);
