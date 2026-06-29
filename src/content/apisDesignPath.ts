import type { PathUnit } from "../lessonPathTypes";

export const apisDesignUnits: PathUnit[] = [
  {
    id: "api-design",
    title: "API Design",
    color: "#5b9dff",
    lessons: [
      {
        id: "apid-1",
        title: "Resource naming conventions",
        diagram: "rest-url",
        content:
          "REST URLs should be nouns, not verbs: /articles not /getArticles. Use plural nouns for collections (/users) and an id for a specific item (/users/42). Nest sub-resources logically: /users/42/orders.",
        question: "Which URL best follows REST naming conventions for fetching a specific user's orders?",
        options: ["/getUserOrders?id=42", "/users/42/orders", "/doOrderLookup/42", "/order_fetch_user_42"],
        correctIndex: 1,
        explanation: "Plural nouns with the id and nested sub-resource clearly express 'orders belonging to user 42'.",
      },
      {
        id: "apid-2",
        title: "Pagination strategies",
        content:
          "Offset pagination (?page=2&limit=20) is simple but can skip/duplicate rows if data changes between requests. Cursor pagination (?after=<id>) is more stable for large or frequently-changing datasets since it anchors to a specific record instead of a position.",
        question: "Why is cursor-based pagination often preferred over offset pagination for large, frequently-updated datasets?",
        options: [
          "Cursor pagination requires no backend code",
          "It anchors to a specific record rather than a numeric position, avoiding skipped/duplicated rows when data changes between requests",
          "Offset pagination is always faster",
          "Cursor pagination only works with exactly 10 items per page",
        ],
        correctIndex: 1,
        explanation: "Anchoring to a stable cursor avoids the shifting-position problem that plagues offset pagination on changing data.",
      },
      {
        id: "apid-3",
        title: "Versioning an API",
        question: "Why do APIs commonly include a version in the URL, like /v1/users?",
        options: [
          "It's purely decorative and has no real effect",
          "It lets you make breaking changes in a new version while existing clients keep working against the old one",
          "It's required by the HTTP specification",
          "It makes requests faster",
        ],
        correctIndex: 1,
        explanation: "Versioning gives you a safe path to evolve the API without breaking clients still depending on the old contract.",
      },
      {
        id: "apid-4",
        title: "Idempotency",
        content:
          "An idempotent operation produces the same result no matter how many times it's repeated. GET, PUT, and DELETE are expected to be idempotent. POST typically isn't — calling it twice might create two resources, which is why retries on POST need extra care (e.g. idempotency keys).",
        question: "Why is it generally safe to automatically retry a failed PUT request, but riskier to retry a failed POST?",
        options: [
          "PUT is always faster than POST",
          "PUT is idempotent — repeating it has the same effect — while POST often creates a new resource each time it's called",
          "POST requests can never fail",
          "There's no difference in retry safety between them",
        ],
        correctIndex: 1,
        explanation: "Idempotent methods are safe to retry blindly; non-idempotent ones risk duplicate side effects like double-created records.",
      },
      {
        id: "apid-5",
        title: "Designing good error responses",
        diagram: "status-codes",
        content:
          "A good API error response includes a clear status code, a machine-readable error code/type, and a human-readable message — e.g. { \"error\": \"invalid_email\", \"message\": \"Email format is invalid\" } with a 400 status, rather than just a bare 500 with no detail.",
        question: "What makes an API error response useful to the developer consuming it?",
        options: [
          "Returning 200 OK for every request regardless of outcome",
          "A correct status code plus a clear, specific error message explaining what went wrong",
          "Returning only the word 'Error' with no other detail",
          "Always returning the same generic error for every failure",
        ],
        correctIndex: 1,
        explanation: "Specific status codes and messages let the calling code react appropriately instead of guessing what failed.",
      },
    ],
  },
];

export const allApisDesignLessons = apisDesignUnits.flatMap((u) => u.lessons);
