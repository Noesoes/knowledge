import type { PathUnit } from "../lessonPathTypes";

export const ragAdvancedUnits: PathUnit[] = [
  {
    id: "rag-advanced",
    title: "Advanced RAG & Production Patterns",
    color: "#c792ea",
    lessons: [
      {
        id: "raga-1",
        title: "Evaluating RAG: retrieval vs generation quality",
        content:
          "RAG quality has two independent failure modes. Retrieval failure: the right chunk wasn't returned (recall issue). Generation failure: the right chunk was returned but the LLM didn't use it correctly (faithfulness issue). Frameworks like RAGAS measure context recall, context precision, answer faithfulness, and answer relevance as separate metrics — you need all four to diagnose where things go wrong.",
        question: "If RAGAS shows high context recall but low answer faithfulness, what does that tell you?",
        options: [
          "The vector search is failing to return relevant chunks",
          "The relevant chunks are being retrieved, but the LLM is not using them correctly (hallucinating despite having the right context)",
          "The chunking strategy needs to be changed",
          "The embedding model is outdated",
        ],
        correctIndex: 1,
        explanation: "Context recall measures whether the right chunks are found. Low faithfulness despite high recall means the retrieval is working, but the LLM is ignoring or contradicting the evidence — a generation-side problem.",
      },
      {
        id: "raga-2",
        title: "Hypothetical Document Embeddings (HyDE)",
        content:
          "Standard RAG embeds the raw user question and searches for similar chunks. But questions and answers live in different linguistic spaces — a question is typically short and abstract, while the relevant document passage is detailed and factual. HyDE flips this: use the LLM to generate a hypothetical answer first, embed that, then search with it. The hypothetical answer is much closer in embedding space to the real answer chunks.",
        question: "What is the core insight behind HyDE (Hypothetical Document Embeddings)?",
        options: [
          "Generating fake documents replaces the need for a real knowledge base",
          "A generated hypothetical answer is semantically closer to real answer passages than the raw question is",
          "It embeds the question and the answer together in one vector",
          "It allows retrieval without a vector database",
        ],
        correctIndex: 1,
        explanation: "Questions and their answers have different linguistic patterns. A generated hypothetical answer bridges that gap, making the embedding query a better match for actual document passages.",
      },
      {
        id: "raga-3",
        title: "Query expansion and multi-query retrieval",
        content:
          "A single query may miss relevant chunks if phrased differently from the indexed text. Multi-query retrieval uses the LLM to generate 3–5 paraphrases of the user's question, retrieves top-k for each, then deduplicates and merges the results. This increases recall at the cost of more embedding calls and a larger context. LangChain's MultiQueryRetriever and LlamaIndex's SubQuestionQueryEngine implement this pattern.",
        question: "Why does multi-query retrieval improve recall compared to single-query retrieval?",
        options: [
          "It uses a more powerful embedding model",
          "Different phrasings of the same question may match different relevant chunks that any single phrasing would miss",
          "It removes duplicate chunks from the index",
          "It makes the LLM generate longer answers",
        ],
        correctIndex: 1,
        explanation: "Vector search is sensitive to phrasing. Generating multiple phrasings casts a wider semantic net, surfacing relevant passages that use different terminology than the original question.",
      },
      {
        id: "raga-4",
        title: "Hybrid search: combining BM25 + vector search",
        content:
          "Vector search excels at semantic matching but can miss exact rare terms (product codes, names, acronyms). BM25 is the classic keyword ranker that handles exact terms well but misses paraphrasing. Hybrid search runs both in parallel and combines scores (often with Reciprocal Rank Fusion). Weaviate, Elasticsearch, and pgvector+pg_trgm all support hybrid search out of the box.",
        question: "When would hybrid search outperform pure vector search?",
        options: [
          "When all your documents are long books",
          "When queries may contain specific product names, codes, or rare terms that need exact matching",
          "When you don't have an embedding model available",
          "When the document count is below 1,000",
        ],
        correctIndex: 1,
        explanation: "Vector search maps 'cheap red shoes' to semantically similar text well, but may miss an exact model number like 'XR-2024-BLK'. BM25 handles those exact terms; combining both gives the best of both worlds.",
      },
      {
        id: "raga-5",
        title: "Agentic RAG: tools, routing, and self-correction",
        content:
          "Basic RAG is a single retrieve-then-generate pass. Agentic RAG gives the LLM tools and lets it decide whether to retrieve, which data source to search, or whether to reformulate and retry if the first retrieval was insufficient. Frameworks like LangGraph and LlamaIndex Agents implement routing logic (choose SQL vs vector vs API based on the query type) and self-correction loops (re-retrieve if the generated answer contradicts the sources).",
        question: "What distinguishes agentic RAG from a standard single-pass RAG pipeline?",
        options: [
          "Agentic RAG doesn't use an LLM for generation",
          "The LLM can decide to retrieve multiple times, choose between data sources, or retry with a reformulated query based on intermediate results",
          "Agentic RAG only works with structured (SQL) data",
          "Agentic RAG skips the embedding step entirely",
        ],
        correctIndex: 1,
        explanation: "Standard RAG is a fixed retrieve-then-generate pipeline. Agentic RAG treats retrieval as a tool the model can invoke repeatedly, with routing and self-correction — enabling multi-hop reasoning over complex queries.",
      },
    ],
  },
];
