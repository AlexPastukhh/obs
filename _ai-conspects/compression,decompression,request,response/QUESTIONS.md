# Repetition questions — compression/decompression

## Fundamentals

1. What does HTTP compression change: headers, body bytes, or both?
2. What is the CPU-versus-bandwidth trade-off?
3. What is the difference between request and response compression?
4. Which request header advertises acceptable response codings?
5. Which header describes the coding already applied to a body?
6. Why does response decompression support not imply request decompression support?

## HttpClient and response compression

7. What does `SocketsHttpHandler.AutomaticDecompression` do?
8. Does `ReadAsStreamAsync` return compressed or decoded bytes after automatic decompression?
9. Which decompression algorithms can be combined in `DecompressionMethods`?
10. Why use `ResponseHeadersRead` for large responses?
11. Who sends `Accept-Encoding` when automatic decompression is configured?

## Sending a compressed request

12. Why is `Content-Type` still `application/json` when JSON bytes are gzipped?
13. Why is `Content-Encoding: gzip` required?
14. Why must the gzip stream be disposed before sending?
15. Why is `ms.Position = 0` required?
16. Why is `leaveOpen: true` required in the memory-stream example?
17. What happens if `leaveOpen` is false?
18. Why is `MemoryStream` convenient?
19. Why is it unsuitable for very large bodies?
20. What would a streaming custom `HttpContent` improve?

## Server response compression

21. Write the `AddResponseCompression` and `UseResponseCompression` setup.
22. What does `EnableForHttps` control?
23. Compare `Fastest`, `Optimal`, and `SmallestSize`.
24. When do provider options not need explicit configuration?
25. Why is `Vary: Accept-Encoding` important for caches?
26. When should custom code add `Vary` itself?

## Manual request decompression

27. Why save `originalBody`?
28. Why replace `Request.Body` only while downstream code runs?
29. Why restore the original stream in `finally`?
30. Which object does custom middleware own?
31. Which object does ASP.NET Core own?
32. What can break if middleware closes `originalBody`?
33. Why can diagnostics or exception middleware still need the body after `_next`?
34. Why should wrapper disposal happen even when model binding throws?

## Multiple encodings

35. Can `Content-Encoding` contain multiple values?
36. What does `Content-Encoding: gzip, br` mean?
37. In which order must the receiver decode it?
38. Why is `.Any(value => value.Contains("gzip"))` insufficient?
39. How should multiple header entries and comma-separated values be parsed?
40. Why return 415 for an unsupported coding?
41. Why track every created wrapper?
42. In which order should wrappers be disposed?

## Registry and DI

43. What members belong to `IRequestBodyDecompressor`?
44. What names are used for gzip, Brotli, and deflate?
45. Why do implementations create wrappers with `leaveOpen: true`?
46. How does `IEnumerable<IRequestBodyDecompressor>` populate the registry?
47. Why is registry lookup case-insensitive?
48. Why can a service be injected into `InvokeAsync`?
49. Can arbitrary application methods receive automatic DI parameters?
50. Why is method injection useful for scoped services?
51. When would `IMiddleware` be preferable?
52. When might `RequestServices.GetRequiredService` be reasonable?

## Decision questions

53. Why do JSON, XML, HTML, CSS, and CSV compress well?
54. Why might compression be wasteful below roughly 1 KB?
55. Why avoid recompressing JPEG, PNG, MP4, and ZIP?
56. What should you do when CPU is the bottleneck?
57. When is request compression worth the added complexity?
58. Design a safe middleware flow for `gzip, br`.
59. Explain the complete lifecycle from a gzipped client request to MVC model binding.
60. Explain the complete lifecycle from `Accept-Encoding` to a decoded HttpClient response stream.
