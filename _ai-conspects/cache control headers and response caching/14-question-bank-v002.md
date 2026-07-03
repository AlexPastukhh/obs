# Cache-Control and Response Caching — question bank v002

## Foundations

1. What are the five independent caching questions?
2. What does freshness eliminate?
3. What does conditional validation eliminate?
4. What does `304 Not Modified` contain or omit?
5. Why is ETag often stronger than Last-Modified?
6. What does `Age` report?
7. Why should APIs avoid relying on heuristic freshness?
8. Can a response be cached without being fresh?
9. Can a response be fresh without an ETag?
10. Why are caching and invalidation part of correctness?

## Directives

11. Define `no-store`.
12. Define `no-cache`.
13. Why are they not synonyms?
14. Define `public`.
15. Define `private`.
16. Define `max-age`.
17. Define `s-maxage`.
18. Define `must-revalidate`.
19. Define `stale-while-revalidate`.
20. Define `stale-if-error`.
21. What does `immutable` change?
22. When is `immutable` unsafe?
23. What does request `only-if-cached` ask for?
24. What does request `min-fresh` mean?
25. What does request `max-stale` mean?

## Vary and keys

26. What problem does `Vary: Accept` solve?
27. What happens when Vary is missing?
28. Why can `Vary: Cookie` be impractical?
29. Does Vary make a response cacheable?
30. Does Vary set freshness?
31. When should Accept-Language be included?
32. When should tenant/version headers be included?
33. Why does every variant dimension lower reuse?
34. What is dangerous about forgetting a tenant dimension?
35. How is query-key variation different from the HTTP Vary header?

## ASP.NET Core

36. What does ResponseCacheAttribute actually do?
37. Is it middleware?
38. Does it store a response body?
39. Does it generate ETags?
40. How many ResponseCacheAttribute instances may be applied to one method?
41. Can attribute properties override a cache profile?
42. What does AddResponseCaching register?
43. What does UseResponseCaching enable?
44. Does enabling middleware cache every response?
45. Which methods/statuses are typical candidates?
46. Why is middleware ordering important?
47. What does VaryByQueryKeys require?
48. Compare a global filter with a named profile.
49. When is custom middleware preferable?
50. What is the difference between Response Caching and Output Caching?

## Corrections

51. Why is two ResponseCache attributes on one action invalid?
52. How do you combine CacheProfileName and VaryByHeader correctly?
53. What header behavior does ResponseCacheLocation.None imply?
54. Why does Location=None not prohibit storage?
55. Which property emits no-store?
56. What does NoStore=true plus Location=None produce conceptually?
57. Why was the old transcript dangerous for study?
58. How would you test the corrected behavior?

## Security and personalization

59. Why is Authorization a warning sign for shared caching?
60. Why is Cookie variation often a bad cache design?
61. When is private client caching acceptable?
62. When must no-store be used?
63. How can shared caching leak user data?
64. Why is per-user whole-response caching often low value?
65. When can per-tenant caching be worthwhile?
66. What belongs in an application-cache key?
67. Why does Set-Cookie affect cache eligibility?
68. How should feature flags be represented in cache keys?

## Scenarios

69. A public catalog changes every ten minutes. Propose a policy.
70. A bank balance endpoint is authenticated. Propose a policy.
71. A profile endpoint is safe in one browser for 30 seconds. Propose a policy.
72. A JSON/XML endpoint lacks Vary. Diagnose the failure.
73. A response is stale but has a matching ETag. Describe the exchange.
74. A CDN should cache ten times longer than the browser. Write the header.
75. A fingerprinted JS file changes URL on every build. Propose a policy.
76. An API has no cache headers. What behavior should you expect?
77. A response is repeatedly requested for three seconds during a traffic spike. Which caching option may help?
78. A CDN already serves public endpoints. Should in-process response caching be added automatically?
79. The endpoint depends on a tenant header. What must be varied or keyed?
80. The origin fails; a CDN has a recent stale copy. Which directive may help?

## Code/test prompts

81. Write one valid ResponseCache attribute that uses a profile and overrides VaryByHeader.
82. Configure three named profiles.
83. Write a safe global no-store filter.
84. Add Response Caching middleware in correct order.
85. Write a conditional authenticated no-store middleware.
86. Write manual Vary code for a minimal API.
87. Implement ETag/If-None-Match.
88. Test a 304 response has no representation body.
89. Test public and private policies.
90. Test that a sensitive response is not retained.
91. Test Accept variants remain separate.
92. Test max-age freshness without an origin call.
93. Test behavior after expiry.
94. Test a named profile plus attribute override.
95. Detect accidental duplicate attributes at compile/review time.
96. Measure cache hit ratio.
97. Measure variant explosion.
98. Compare origin CPU with and without caching.
99. Create an incident test for cross-user leakage.
100. Explain the final policy to a frontend/CDN team without ASP.NET jargon.
