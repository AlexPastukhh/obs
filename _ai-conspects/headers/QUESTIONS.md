# Repetition questions — HTTP headers

1. What is the difference between request, response, and content headers?
2. Where do `HttpRequestMessage` content headers live?
3. Where do `HttpResponseMessage` content headers live?
4. What does `Expect: 100-continue` mean?
5. What problem can `100-continue` avoid for a large upload?
6. Can browser JavaScript set `Expect`?
7. What status may a server return for an unsupported expectation?
8. Why is the header spelled `Referer` rather than `Referrer`?
9. What information may `Referer` contain?
10. Why must `Referer` not be used as an authorization proof?
11. What does the `Authorization` request header carry?
12. Compare Basic and Bearer authorization schemes.
13. What does `WWW-Authenticate` communicate?
14. When is `WWW-Authenticate` commonly returned?
15. What is a `realm` in an authentication challenge?
16. Compare an authorization header with a cookie.
17. What does the `Origin` header identify?
18. Why is `Origin` validated against an allow-list?
19. Which response headers can cross-origin JavaScript read by default?
20. What does `Access-Control-Expose-Headers` do?
21. Why are allowed request headers and exposed response headers different CORS concepts?
22. What does `Location` mean with `201 Created`?
23. What does `Location` mean with a redirect status?
24. Does the presence of `Location` alone imply redirect?
25. Which modern header controls cache lifetime?
26. What are `Expires` and `Pragma` mainly used for today?
27. What does `If-None-Match` send?
28. What does `If-Modified-Since` send?
29. What does `ETag` represent?
30. What can a server return when a conditional request validator still matches?
31. Name the four header collections on HttpClient request/response messages.
32. Why can adding `Content-Type` to the wrong collection fail?
33. What is `TryAddWithoutValidation` for?
34. When should it not be your first choice?
35. What does `TryGetValues` return?
36. What problem do typed header properties solve?
37. What type models a media type?
38. What type models an entity tag?
39. What type models an authorization value?
40. Where is `ContentLength` exposed?
41. Where is `ContentEncoding` exposed?
42. What is `IHeaderDictionary`?
43. What does `StringValues` represent?
44. Compare indexer assignment and `Append`.
45. Why can dictionary `Add` fail when a header already exists?
46. What does `TryGetValue` return for a multi-valued field?
47. When are comma-separated helper methods appropriate?
48. Why must `Set-Cookie` not be merged into one comma-separated value?
49. Compare `Cookie` and `Set-Cookie`.
50. How should request cookies normally be inspected in ASP.NET Core?
51. How should response cookies normally be created?
52. What is `CookieHeaderValue` for?
53. What is `SetCookieHeaderValue` for?
54. Name common Set-Cookie attributes.
55. Why is manually splitting raw cookie strings fragile?
56. What does `HeaderNames` provide?
57. Why use semantic header comparers rather than `string.Equals`?
58. What does a quality factor in `Accept` mean?
59. How do you append a custom response header in ASP.NET Core?
60. How do you replace a header value?
61. How do you remove a header?
62. How do you check whether a header exists?
63. Explain the difference between `Add`, `Append`, and indexer assignment.
64. Why might a single HTTP header appear as multiple field lines?
65. Why can a single field line contain a comma-separated list?
66. Is every header comma-combinable?
67. What does `User-Agent` describe?
68. What does `Host` identify?
69. What does `Retry-After` communicate?
70. What does `Content-Type` describe?
71. Does `Content-Encoding` describe the media type?
72. What does `Content-Length` count?
73. Write a request that advertises JSON in `Accept`.
74. Write a response with JSON `Content-Type`.
75. Write a conditional GET using an ETag.
76. Write a `201 Created` response with Location.
77. Write a 401 response with a Basic challenge and realm.
78. Write a custom exposed response header for browser JavaScript.
79. Explain why CORS is not authentication.
80. Explain why raw header values should be treated as untrusted input.
