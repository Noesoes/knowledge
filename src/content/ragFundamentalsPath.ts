import type { PathUnit } from "../lessonPathTypes";

export const ragFundamentalsUnits: PathUnit[] = [
  {
    id: "rag-basics",
    title: "RAG Fundamentals",
    color: "#3ecf8e",
    lessons: [
      {
        id: "rag-1",
        title: "What is Retrieval-Augmented Generation?",
        content:
          "RAG (Retrieval-Augmented Generation) is a pattern where you first retrieve relevant documents from a knowledge base, then pass those documents into the LLM's context alongside the user's question. The LLM uses the retrieved text to ground its answer in real data — reducing hallucinations and keeping answers up to date without retraining the model.",
        question: "What problem does RAG primarily solve compared to a plain LLM?",
        options: [
          "It makes the LLM run faster",
          "It grounds the LLM's answers in retrieved, specific documents rather than relying solely on training data",
          "It lets the LLM answer questions in more languages",
          "It removes the need for a context window",
        ],
        correctIndex: 1,
        explanation: "RAG's key value is grounding — instead of the model guessing from fuzzy training memory, it reads the actual source documents before answering.",
      },
      {
        id: "rag-2",
        title: "The RAG pipeline: chunk → embed → retrieve → generate",
        content:
          "Step 1 — Chunk: split your documents into manageable pieces (e.g. 500-token chunks with some overlap). Step 2 — Embed: run each chunk through an embedding model to produce a vector. Step 3 — Index: store those vectors in a vector database. At query time: embed the user's question, retrieve the top-k most similar chunks, then pass them to the LLM as context.",
        question: "In which order do the core RAG steps happen?",
        options: [
          "Generate → Retrieve → Embed → Chunk",
          "Embed → Chunk → Retrieve → Generate",
          "Chunk → Embed → (index) → Retrieve → Generate",
          "Retrieve → Chunk → Embed → Generate",
        ],
        correctIndex: 2,
        explanation: "You must chunk and embed documents first to build the index. At query time you retrieve relevant chunks, then feed them to the LLM to generate the final answer.",
      },
      {
        id: "rag-3",
        title: "Chunking strategies and why they matter",
        content:
          "Too-large chunks may exceed context limits and dilute relevance. Too-small chunks lose surrounding context and may be meaningless in isolation. Common strategies: fixed-size with overlap (simple, robust), sentence/paragraph splitting (respects natural boundaries), recursive character splitting (tries multiple separators), and semantic chunking (splits on topic shifts detected by an embedder).",
        question: "Why is a small overlap (e.g. 10–15% of chunk size) recommended when doing fixed-size chunking?",
        options: [
          "It reduces the total number of chunks stored",
          "It prevents ideas that span a chunk boundary from being split across two unrelated chunks",
          "It makes embeddings more accurate",
          "Overlapping chunks are required for the vector index to work",
        ],
        correctIndex: 1,
        explanation: "Without overlap, a sentence cut in half at a chunk boundary would produce two chunks that each have incomplete context. Overlap ensures key ideas near boundaries appear in full in at least one chunk.",
      },
      {
        id: "rag-4",
        title: "Top-k retrieval and relevance scoring",
        content:
          "After embedding the query, you retrieve the top-k (e.g. k=5) most similar chunks by cosine similarity or dot product. A higher k increases coverage but also increases noise and context cost. Some pipelines add a reranker — a smaller cross-encoder model that re-scores the top-k results more accurately, letting you fetch a larger pool (say, top-20) then rerank to the best 5.",
        question: "What is the purpose of a reranker in a RAG pipeline?",
        options: [
          "To generate the final answer instead of the LLM",
          "To more accurately re-score a pool of retrieved candidates before passing the best ones to the LLM",
          "To split documents into smaller chunks",
          "To choose which embedding model to use",
        ],
        correctIndex: 1,
        explanation: "Vector similarity is a fast but coarse measure. A cross-encoder reranker reads the query and each candidate together and assigns a more accurate relevance score, improving the quality of what the LLM sees.",
      },
      {
        id: "rag-5",
        title: "Prompt construction: injecting retrieved context",
        content:
          "Once you have your top-k chunks, you assemble a prompt like:\n\nSystem: You are a helpful assistant. Answer only based on the provided context. If the context doesn't contain the answer, say so.\n\nContext:\n[chunk 1]\n[chunk 2]\n...\n\nUser question: {question}\n\nBeing explicit about 'answer from context only' reduces hallucination and makes it clear to the model what sources to cite.",
        question: "Why should a RAG system prompt explicitly tell the LLM to answer only from the provided context?",
        options: [
          "It is required by the vector database API",
          "It prevents the model from falling back on training data and inventing answers not supported by the retrieved documents",
          "It makes the model respond faster",
          "It increases the number of retrieved chunks",
        ],
        correctIndex: 1,
        explanation: "Without this instruction, the LLM may blend retrieved context with its training knowledge, producing answers that sound plausible but aren't grounded in your actual documents.",
      },
    ],
  },
];
