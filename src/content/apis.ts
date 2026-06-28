import type { Course } from "../types";

export const apis: Course = {
  id: "apis",
  title: "APIs & Web Services",
  tagline: "How software talks to other software — the connective tissue of every modern app.",
  icon: "🔌",
  description:
    "Nearly every app you use talks to a server somewhere: your phone's weather app, a checkout page calling a payment processor, one microservice calling another. APIs (Application Programming Interfaces) are the contract that makes that communication possible. This course covers REST, HTTP, JSON, and authentication.",
  modules: [
    {
      id: "what-is-an-api",
      title: "What an API Actually Is",
      summary: "Stripping away the jargon: an API is just an agreed-upon way to ask for or send data.",
      content: `
### The plain-language version

An API is a defined way for one piece of software to request something from, or send something to, another piece of software — without needing to know how that other software is built internally. A weather app doesn't run its own global network of weather sensors; it calls a weather service's API, asks "what's the forecast for this zip code," and gets back an answer in a predictable format.

### Why this matters in practice
You will spend an enormous amount of your career as a developer calling APIs (using a payment processor, a maps service, an internal microservice owned by another team) and *building* APIs (so other parts of your own system, or external developers, can use what you've built). It's one of the most universally needed skills in software, regardless of what you specialize in.

### Web APIs specifically
Most APIs you'll deal with day to day are **web APIs** — they run over HTTP, the same protocol your browser uses to load web pages. That means the same tools you use to debug a website (browser dev tools, \`curl\`, Postman) work for debugging API calls too.

### Client and server
The **client** is whoever is making the request (a mobile app, a website's JavaScript, another server). The **server** is whoever receives the request and sends back a response. The same machine can be a server for one interaction and a client for another — e.g., your backend server is a server to your frontend, but a client when it calls a third-party payment API.
      `,
      keyTakeaways: [
        "An API is a defined contract for how software can request or send data to other software.",
        "You'll spend significant career time both consuming APIs and building your own.",
        "Most modern APIs are web APIs, running over the same HTTP protocol as websites.",
        "Client = the one making the request; server = the one responding. A system can be both, depending on context.",
      ],
      quiz: [
        {
          question: "In simple terms, what is an API?",
          options: [
            "A type of database",
            "A defined way for one piece of software to request or send data to another",
            "A programming language",
            "A web browser feature",
          ],
          correctIndex: 1,
          explanation: "An API is the agreed contract/interface that lets separate pieces of software communicate predictably.",
        },
        {
          question: "What protocol do most modern web APIs run over?",
          options: ["FTP", "SMTP", "HTTP", "SSH"],
          correctIndex: 2,
          explanation: "Web APIs typically use HTTP/HTTPS, the same protocol browsers use to load web pages.",
        },
      ],
    },
    {
      id: "http-basics",
      title: "HTTP: Methods, Status Codes, and JSON",
      summary: "The vocabulary every API conversation is built from.",
      content: `
### HTTP methods (verbs)
Each request specifies a method describing the intended action:
- **GET** — retrieve data (should never change anything on the server)
- **POST** — create something new
- **PUT** — replace an existing resource entirely
- **PATCH** — partially update an existing resource
- **DELETE** — remove a resource

\`\`\`
GET /users/42          → fetch user 42
POST /users             → create a new user (data sent in the request body)
PATCH /users/42          → update part of user 42
DELETE /users/42          → delete user 42
\`\`\`

### Status codes
The server's response includes a 3-digit status code summarizing what happened:
- **2xx — success**: \`200 OK\`, \`201 Created\`
- **3xx — redirect**: \`301 Moved Permanently\`
- **4xx — client error**: \`400 Bad Request\`, \`401 Unauthorized\`, \`403 Forbidden\`, \`404 Not Found\`
- **5xx — server error**: \`500 Internal Server Error\`

A useful rule: 4xx means "you (the client) did something the server didn't expect" — bad input, missing auth, wrong URL. 5xx means "the server itself broke," regardless of what the client sent.

### JSON — the universal data format
APIs almost universally exchange data as **JSON** (JavaScript Object Notation) — readable text representing structured data:
\`\`\`json
{
  "id": 42,
  "name": "Ada Lovelace",
  "isActive": true,
  "tags": ["engineer", "writer"]
}
\`\`\`
JSON supports objects (\`{}\`), arrays (\`[]\`), strings, numbers, booleans, and \`null\`. Nearly every programming language has built-in or trivial-to-add support for parsing JSON into native data structures and back.
      `,
      keyTakeaways: [
        "HTTP methods express intent: GET (read), POST (create), PUT/PATCH (update), DELETE (remove).",
        "Status codes summarize the outcome: 2xx success, 4xx client error, 5xx server error.",
        "404 means not found; 401 means unauthenticated; 403 means authenticated but not permitted.",
        "JSON is the near-universal data format for API requests and responses.",
      ],
      project:
        "Using a tool like curl, Postman, or your browser, call a free public API (e.g., https://jsonplaceholder.typicode.com/users) with GET, and inspect the JSON response and status code you get back.",
      quiz: [
        {
          question: "Which HTTP method is meant for creating a new resource?",
          options: ["GET", "POST", "DELETE", "OPTIONS"],
          correctIndex: 1,
          explanation: "POST is conventionally used to create new resources, with the data for the new item sent in the request body.",
        },
        {
          question: "What does a 404 status code mean?",
          options: [
            "The server crashed",
            "The requested resource could not be found",
            "The request succeeded",
            "The user is not authenticated",
          ],
          correctIndex: 1,
          explanation: "404 Not Found specifically means the requested resource/URL doesn't exist on the server.",
        },
        {
          question: "What's the difference between a 401 and a 403 status code?",
          options: [
            "There is no difference, they're synonyms",
            "401 means not authenticated; 403 means authenticated but not allowed to access this resource",
            "401 is a server error; 403 is a client error",
            "403 always means the URL is wrong",
          ],
          correctIndex: 1,
          explanation: "401 Unauthorized really means 'we don't know who you are' (missing/invalid credentials); 403 Forbidden means 'we know who you are, but you can't do this.'",
        },
      ],
    },
    {
      id: "rest-and-design",
      title: "REST Design Principles",
      summary: "What makes an API 'RESTful,' and the conventions that make APIs predictable to use.",
      content: `
### What REST actually means
REST (Representational State Transfer) is a style of API design, not a strict protocol. A RESTful API typically:
- Organizes functionality around **resources** (nouns), not actions: \`/users\`, \`/orders\`, not \`/getUser\` or \`/createOrder\`
- Uses HTTP methods to express the action on that resource (GET /orders vs POST /orders)
- Is **stateless** — each request contains everything needed to process it; the server doesn't remember previous requests from the same client between calls

### Resource-oriented URLs
\`\`\`
GET    /articles            → list all articles
GET    /articles/7           → get article 7
POST   /articles             → create a new article
PUT    /articles/7            → replace article 7
DELETE /articles/7             → delete article 7
GET    /articles/7/comments     → list comments for article 7 (a nested resource)
\`\`\`
Notice the URL itself never contains a verb — the HTTP method *is* the verb. This consistency is what makes RESTful APIs predictable to explore even without reading documentation closely.

### Query parameters for filtering/pagination
\`\`\`
GET /articles?author=ada&page=2&limit=20
\`\`\`
Query parameters (after the \`?\`) are typically used for filtering, sorting, and pagination — optional modifiers to a GET request, rather than identifying a specific resource.

### Versioning
APIs change over time, but breaking existing consumers (other companies' code calling your API) is costly. A common pattern is versioning the API in the URL or a header: \`/v1/articles\` vs \`/v2/articles\`, so old consumers can keep using v1 while new features land in v2.
      `,
      keyTakeaways: [
        "RESTful APIs model resources as nouns in URLs; HTTP methods express the action.",
        "REST APIs are stateless — each request stands alone, with no server-side memory of prior requests.",
        "Query parameters (?key=value) typically handle filtering, sorting, and pagination.",
        "API versioning (e.g., /v1/, /v2/) lets APIs evolve without breaking existing consumers.",
      ],
      quiz: [
        {
          question: "Which URL design follows REST conventions?",
          options: [
            "GET /getAllUsers",
            "POST /deleteUser",
            "DELETE /users/42",
            "GET /user-deletion-action",
          ],
          correctIndex: 2,
          explanation: "REST models resources as nouns (/users/42) and uses the HTTP method (DELETE) to express the action — no verbs in the URL.",
        },
        {
          question: "What does it mean for a REST API to be 'stateless'?",
          options: [
            "It never stores any data",
            "Each request contains everything needed to process it, with no memory of past requests",
            "It only works with static websites",
            "It can't be used by mobile apps",
          ],
          correctIndex: 1,
          explanation: "Statelessness means the server doesn't rely on remembering previous interactions — every request is self-contained.",
        },
      ],
    },
    {
      id: "auth-and-security",
      title: "Authentication, Authorization, and API Keys",
      summary: "How APIs know who's calling, and what they're allowed to do.",
      content: `
### Authentication vs. authorization
- **Authentication** answers "who are you?" — proving identity, usually via a password, token, or API key.
- **Authorization** answers "what are you allowed to do?" — once identified, are you permitted to access this specific resource or perform this action?

You can be authenticated (the server knows you're "Ada") but not authorized to delete someone else's data.

### Common authentication methods
- **API keys** — a unique string identifying the calling application, sent in a header (\`X-API-Key: abc123\`) or query param. Simple, but treat them like passwords — never commit them to a public Git repo.
- **Bearer tokens / JWTs** — a token (often a JSON Web Token) sent as \`Authorization: Bearer <token>\`, proving the request comes from an authenticated user/session, usually with an expiration time.
- **OAuth** — a standard that lets a user grant a third-party app limited access to their data on another service, without sharing their actual password (e.g., "Sign in with Google," or a calendar app accessing your Google Calendar after you click "Allow").

### Practical security habits
- Never hardcode API keys or secrets directly in source code — use environment variables, and add secret files to \`.gitignore\`.
- Always use HTTPS, not HTTP, for any API exchanging real data — HTTP sends data in plain text, readable by anyone intercepting the connection.
- Rate limiting (a cap on how many requests a client can make in a time window) protects APIs from abuse and accidental overload; expect to receive a \`429 Too Many Requests\` status if you exceed it.

### Reading API documentation efficiently
Good API docs typically show: the base URL, available endpoints with their methods, required/optional parameters, an example request, and an example response. When learning a new API, find the smallest possible working example (often a GET request needing no auth) and get that working before attempting anything that writes data.
      `,
      keyTakeaways: [
        "Authentication proves who you are; authorization determines what you're allowed to do.",
        "API keys, bearer tokens/JWTs, and OAuth are the most common authentication mechanisms.",
        "Never commit API keys/secrets to source control — use environment variables instead.",
        "429 Too Many Requests signals you've hit a rate limit; always use HTTPS for real data exchange.",
      ],
      project:
        "Sign up for a free tier of any public API that requires an API key (e.g., OpenWeatherMap), store the key in an environment variable (not in code), and write a small script that fetches and prints live data using that key.",
      quiz: [
        {
          question: "What's the difference between authentication and authorization?",
          options: [
            "They're the same thing",
            "Authentication proves identity; authorization determines what that identity is permitted to do",
            "Authentication is for servers; authorization is for clients",
            "Authorization always happens before authentication",
          ],
          correctIndex: 1,
          explanation: "Authentication = 'who are you'; authorization = 'what can you do, now that we know who you are.'",
        },
        {
          question: "Where should API keys and secrets be stored?",
          options: [
            "Hardcoded directly in the source code for simplicity",
            "In environment variables, kept out of source control",
            "In a public GitHub repository for transparency",
            "In the URL of every request",
          ],
          correctIndex: 1,
          explanation: "Environment variables (and .gitignore for any secret files) keep credentials out of your codebase and git history.",
        },
        {
          question: "What does a 429 status code indicate?",
          options: [
            "The request succeeded",
            "The server crashed",
            "The client has exceeded the allowed rate limit of requests",
            "The resource was permanently moved",
          ],
          correctIndex: 2,
          explanation: "429 Too Many Requests is returned when a client exceeds the API's rate limit.",
        },
      ],
    },
  ],
};
