import type { PathUnit } from "../lessonPathTypes";

export const apisAuthUnits: PathUnit[] = [
  {
    id: "auth-security",
    title: "Auth & Security",
    color: "#ff8a8a",
    lessons: [
      {
        id: "apia-1",
        title: "API keys vs tokens",
        diagram: "bearer-token",
        content:
          "An API key is a long-lived static secret identifying which app/project is calling — simple but hard to scope and rotate. A token (like a Bearer token) is typically short-lived and tied to a specific user/session, often issued after a login or OAuth flow.",
        question: "What's a key difference between a static API key and a short-lived bearer token?",
        options: [
          "API keys expire every few minutes",
          "Tokens are typically scoped to a session/user and expire, while API keys are usually long-lived and static",
          "There is no functional difference",
          "Bearer tokens can only be used once ever",
        ],
        correctIndex: 1,
        explanation: "Token expiry limits the damage if one leaks, which is why session-based auth favors short-lived tokens over static keys.",
      },
      {
        id: "apia-2",
        title: "JWT basics",
        content:
          "A JWT (JSON Web Token) is a signed token containing claims (like user id, expiry) encoded in three base64 parts: header.payload.signature. The server verifies the signature to trust the claims without needing a database lookup on every request.",
        question: "Why can a server trust the claims inside a JWT without looking them up in a database each time?",
        options: [
          "JWTs are encrypted so no one can read them",
          "The token is cryptographically signed, so the server can verify it hasn't been tampered with using the signature",
          "JWTs are stored on the server, not the client",
          "JWTs never expire so there's nothing to check",
        ],
        correctIndex: 1,
        explanation: "Signature verification confirms the claims came from a trusted issuer and weren't altered, without a database roundtrip.",
      },
      {
        id: "apia-3",
        title: "CORS",
        question: "What problem does CORS (Cross-Origin Resource Sharing) solve?",
        options: [
          "It speeds up all network requests",
          "It lets a server explicitly allow browsers running on other origins (domains) to call its API, which browsers block by default",
          "It encrypts all API traffic automatically",
          "It replaces the need for authentication",
        ],
        correctIndex: 1,
        explanation: "Browsers block cross-origin requests by default for security; CORS headers let a server opt specific origins back in.",
      },
      {
        id: "apia-4",
        title: "Rate limiting for abuse prevention",
        diagram: "rate-limit",
        question: "Besides protecting server resources, what's a security reason to rate-limit a login endpoint?",
        options: [
          "It makes the login page load faster",
          "It slows down brute-force password-guessing attacks by capping how many attempts an attacker can make per time window",
          "It's required for HTTPS to work",
          "It has no security benefit",
        ],
        correctIndex: 1,
        explanation: "Capping attempts per window makes brute-forcing credentials impractically slow for an attacker.",
      },
      {
        id: "apia-5",
        title: "HTTPS and why it matters",
        question: "What does HTTPS primarily protect against that plain HTTP doesn't?",
        options: [
          "It prevents the server from ever going down",
          "It encrypts traffic between client and server, preventing eavesdroppers from reading or tampering with requests in transit",
          "It makes API responses smaller",
          "It's only relevant for static websites, not APIs",
        ],
        correctIndex: 1,
        explanation: "TLS encryption (the 'S' in HTTPS) protects confidentiality and integrity of data as it travels over the network.",
      },
    ],
  },
];

export const allApisAuthLessons = apisAuthUnits.flatMap((u) => u.lessons);
