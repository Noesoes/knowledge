import type { PathUnit } from "../lessonPathTypes";

export const apisAdvancedUnits: PathUnit[] = [
  {
    id: "apis-advanced",
    title: "GraphQL, Webhooks & Scaling",
    color: "#5b9dff",
    lessons: [
      {
        id: "apiadv-1",
        title: "REST vs GraphQL",
        content:
          "REST exposes fixed endpoints that return a fixed shape of data, often requiring multiple requests to gather related resources. GraphQL exposes a single endpoint where the client specifies exactly which fields it needs in one query, avoiding over-fetching or under-fetching.",
        question: "What problem does GraphQL primarily solve compared to a typical REST API?",
        options: [
          "It eliminates the need for a server entirely",
          "It lets clients request exactly the fields they need in a single query, avoiding the over-fetching or multiple round-trips common with fixed REST endpoints",
          "It removes the need for authentication",
          "It's only usable for read operations, never writes",
        ],
        correctIndex: 1,
        explanation: "Client-specified queries mean you get exactly the fields you need in one request instead of stitching together several REST calls.",
      },
      {
        id: "apiadv-2",
        title: "Webhooks: push instead of poll",
        diagram: "webhook",
        content:
          "Polling means repeatedly asking an API 'anything new yet?' — wasteful and laggy. A webhook flips this: you register a URL, and the server calls that URL the moment an event happens, pushing data to you instantly instead of you asking on a timer.",
        question: "Why is a webhook generally more efficient than polling for detecting new events?",
        options: [
          "Webhooks require no network connection at all",
          "The server pushes data the instant an event occurs, instead of the client repeatedly asking and wasting requests when nothing has changed",
          "Webhooks only work over postal mail",
          "Polling and webhooks are functionally identical",
        ],
        correctIndex: 1,
        explanation: "Push-based notification avoids the wasted requests and latency inherent in periodically asking 'did anything happen yet?'",
      },
      {
        id: "apiadv-3",
        title: "Caching with ETags and CDNs",
        question: "How does an ETag header help avoid re-downloading unchanged data?",
        options: [
          "It compresses every response automatically",
          "It's a fingerprint of the resource's content; the client can send it back and the server replies '304 Not Modified' if nothing changed, skipping the full response body",
          "It forces the client to always re-download fresh data",
          "ETags are only used for image files",
        ],
        correctIndex: 1,
        explanation: "Conditional requests using ETags let the server confirm 'still the same' cheaply instead of resending an unchanged payload.",
      },
      {
        id: "apiadv-4",
        title: "Horizontal scaling and load balancing",
        content:
          "Vertical scaling means making one server bigger (more CPU/RAM) — it has limits. Horizontal scaling means running many smaller server instances behind a load balancer that distributes incoming requests across them, allowing near-unlimited growth.",
        question: "Why does horizontal scaling generally handle growth better than vertical scaling alone?",
        options: [
          "Horizontal scaling is always cheaper per request",
          "Adding more server instances behind a load balancer avoids the hard ceiling of a single machine's maximum CPU/RAM, and tolerates one instance failing",
          "Vertical scaling requires no hardware at all",
          "They are the same strategy with different names",
        ],
        correctIndex: 1,
        explanation: "A single machine has a hardware ceiling and is a single point of failure; distributing load across many instances avoids both.",
      },
      {
        id: "apiadv-5",
        title: "API gateways and throttling",
        content:
          "An API gateway sits in front of one or more backend services, handling cross-cutting concerns like authentication, rate limiting, request routing, and logging in one place instead of duplicating that logic in every service.",
        question: "What's a key benefit of putting rate limiting at an API gateway instead of in each individual backend service?",
        options: [
          "It makes rate limiting impossible to bypass",
          "It centralizes the logic in one place, so every service behind the gateway is protected consistently without duplicating that code in each one",
          "Gateways eliminate the need for backend servers",
          "It has no benefit over per-service rate limiting",
        ],
        correctIndex: 1,
        explanation: "Centralizing cross-cutting concerns like rate limiting at the gateway avoids reimplementing (and potentially misconfiguring) it in every service.",
      },
    ],
  },
];

export const allApisAdvancedLessons = apisAdvancedUnits.flatMap((u) => u.lessons);
