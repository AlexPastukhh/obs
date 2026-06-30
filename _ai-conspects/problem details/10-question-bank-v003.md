# Problem Details — question bank v003

Generated: 2026-06-30

## A. Standard model

1. What problem does a structured error document solve beyond a status code?
2. What is the role of `type`?
3. How does `type` differ from `instance`?
4. What makes a good `title`?
5. Which content belongs in `detail`?
6. Why should `status` match the actual response status?
7. Where should a stable application error code be stored?
8. Where should `traceId` be stored?
9. Why is a stack trace unsuitable for production detail?
10. When can an empty error body still be acceptable?

## B. Factory, service, and writer

11. What does `ProblemDetailsFactory` create?
12. Why is the factory associated with MVC conventions?
13. What does `IProblemDetailsService` orchestrate?
14. What does an `IProblemDetailsWriter` own?
15. What is the purpose of `CanWrite`?
16. Why is writer order observable?
17. What can happen if the first writer accepts every context?
18. Compare model construction with response writing.
19. Which abstraction should middleware normally use to negotiate and write?
20. Which abstraction should a specialized representation implement?

## C. Context and metadata

21. What is carried by `ProblemDetailsContext`?
22. Under what conditions is `Exception` available?
23. What can `AdditionalMetadata` contain?
24. How can endpoint metadata select a custom writer?
25. Why can exception middleware know more than a controller result?
26. Why should metadata access not imply that all metadata is safe to serialize?

## D. Registration and customization

27. What does `AddProblemDetails` establish?
28. What belongs in `CustomizeProblemDetails`?
29. What does not belong in global customization?
30. When does customization run relative to writing?
31. Why should trace identifiers be generated from the current request/activity?
32. How would you add a request path and trace ID globally?
33. Why is customization not a substitute for domain error mapping?

## E. MVC and validation

34. What does `[ApiController]` do for invalid model state?
35. What is `ValidationProblemDetails` used for?
36. What is the role of `InvalidModelStateResponseFactory`?
37. Why should a custom invalid-model-state response preserve field errors?
38. How do client-error mappings differ from the writer service?
39. When might an API choose 422 instead of 400?
40. Why should validation error codes remain stable?

## F. Response lifecycle

41. Who must check `Response.HasStarted`?
42. Why can the service not repair an already-started response?
43. What does `Response.Clear()` remove?
44. When is clearing safe?
45. Why must status be set before writing?
46. What should exception middleware do after the response has started?
47. What error can result from two components writing competing bodies?

## G. WriteAsync, TryWriteAsync, and fallback

48. What does `TryWriteAsync == true` mean?
49. What does `TryWriteAsync == false` mean?
50. Why must false not be treated as success?
51. Name three legitimate fallback strategies.
52. What normal features can direct `WriteAsJsonAsync` bypass?
53. When is plain text a reasonable final fallback?
54. How can `Accept` cause no writer to match?
55. When is `WriteAsync` preferable to `TryWriteAsync`?

## H. Negotiation and writers

56. Why is content negotiation more than choosing a serializer?
57. Does adding an XML MVC formatter automatically add an XML problem writer?
58. What must a custom XML writer do?
59. Which inputs should a writer consider in `CanWrite`?
60. How should an API handle an unsupported requested representation?
61. Why must a specialized writer be narrow?
62. How would you test writer ordering?

## I. Exceptions and security

63. Which fields should a safe 500 response expose?
64. Where should the full exception be recorded?
65. Why is exception type potentially sensitive?
66. How can `traceId` connect a public response to private logs?
67. Name five kinds of information that must not be exposed.
68. Why is a raw exception message not automatically safe?
69. Which expected failures should be mapped before the generic 500 path?
70. Why is a stable error code useful even when a trace ID exists?

## J. Authentication and authorization

71. Why do cookie handlers normally redirect?
72. Why is a redirect often wrong for an API?
73. What status should an API login challenge return?
74. What status should API access denial return?
75. Explain 401 versus 403.
76. Why preserve redirects for non-API browser pages?
77. What is fragile about checking only a path prefix?
78. How can endpoint metadata improve API/page differentiation?

## K. HTTP status distinctions

79. Compare 400, 406, and 415.
80. What does 405 mean, and which header matters?
81. When is 409 appropriate?
82. Compare route-not-found with domain-resource-not-found.
83. What does 406 say about the response representation?
84. What does 415 say about the request representation?
85. When can 422 be useful?
86. Why should status policy be documented consistently?

## L. Scenarios

87. `Accept: application/xml` arrives, but only the JSON writer exists. What can happen?
88. A custom writer accepts every context and is registered first. Diagnose the result.
89. Middleware catches an exception after body bytes were written. What can it safely do?
90. A client receives `TryWriteAsync == false`. Design a fallback policy.
91. A cookie API endpoint redirects to `/Account/Login`. Repair the flow.
92. A user is authenticated but lacks an order-management permission. Which status applies?
93. A request sends JSON with `Content-Type: text/plain`. Which error is likely?
94. The server can produce JSON, but the client accepts only an unsupported vendor format. Which error is likely?
95. A concurrency token is stale. Design a 409 problem type and extensions.
96. A validation response concatenates all field errors into one string. Explain the client-side cost.
97. A production response includes a database server name. Repair the security boundary.
98. A 405 body is empty but the `Allow` header is correct. Is this protocol-invalid?
99. A custom writer needs to run only for endpoints with a marker. Implement the selection rule.
100. Design integration tests proving status, media type, writer choice, fallback, and sensitive-data safety.

## Coding prompts

101. Write a middleware helper with `HasStarted`, `Clear`, `TryWriteAsync`, and plain-text fallback.
102. Configure global trace ID and request-path extensions.
103. Override `InvalidModelStateResponseFactory` without losing field errors.
104. Implement a metadata-selected JSON writer.
105. Implement API-specific cookie login and access-denied event responses.
106. Write a safe exception-handler ProblemDetails response.
107. Add a stable error-code extension for concurrency conflicts.
108. Test unsupported `Accept` behavior.
109. Test that a broad writer does not capture specialized endpoints.
110. Test that raw exception messages never reach production output.
