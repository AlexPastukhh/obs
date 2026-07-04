# Repetition questions — HttpContent buffering and streaming

1. Does receiving a `Stream` prove live network streaming?
2. Name the three different meanings of buffering/streaming in the conspect.
3. What does `ResponseContentRead` mean?
4. What does `ResponseHeadersRead` mean?
5. Which completion option is the default for `GetAsync`?
6. When does the task complete with `ResponseContentRead`?
7. When does it complete with `ResponseHeadersRead`?
8. Does HttpCompletionOption choose between two HttpContent overrides?
9. What does HttpClient do after receiving the response message in `ResponseContentRead` mode?
10. What does `LoadIntoBufferAsync` do?
11. When does its task complete?
12. What does a later `ReadAsStreamAsync` return after buffering?
13. Why can a stream API still read already-buffered content?
14. How do you progressively process a response?
15. Why must the response remain undisposed while reading?
16. What role does the read loop play under `ResponseHeadersRead`?
17. What is `CreateContentReadStreamAsync`?
18. Why can the base implementation buffer?
19. What does overriding the method allow?
20. Does overriding it guarantee network streaming?
21. Give an example where the override returns a MemoryStream over existing bytes.
22. What extra copy can that avoid?
23. What is `SerializeToStreamAsync` for?
24. When does HttpClient call it?
25. What does `TryComputeLength` communicate?
26. Why does compressed-on-the-fly content usually return false?
27. What happens to Content-Length when the final length is unknown?
28. How can HTTP/1.1 send unknown-length content?
29. Why use `leaveOpen: true` around the outgoing transport stream?
30. Why must the gzip wrapper be disposed?
31. What headers should GzipJsonContent set?
32. Why is Content-Type still `application/json`?
33. Why is Content-Encoding `gzip`?
34. How does `JsonSerializer.SerializeAsync` reduce memory usage?
35. What memory allocations are avoided compared with string + MemoryStream?
36. What CPU trade-off does compression introduce?
37. Can low-memory streaming and compression be used together?
38. Write the constructor of `GzipJsonContent<T>`.
39. Write its `SerializeToStreamAsync`.
40. Write its `TryComputeLength`.
41. Use the custom content in an HttpRequestMessage.
42. Compare request-content streaming with response-content streaming.
43. Is `ResponseHeadersRead` relevant to sending the request body?
44. What class normally represents SocketsHttpHandler response content internally?
45. Why can it expose the underlying response stream directly?
46. What makes that direct stream progressive rather than already buffered?
47. Build a `MyBufferedContent` class.
48. Why may ReadAsStreamAsync buffer that content?
49. Build a `MyDirectStreamContent` class.
50. Why does its direct stream not imply network I/O?
51. What does `MemoryStream(_bytes, writable: false)` provide?
52. What does `TryComputeLength = true` enable?
53. Can a content class both compute length and stream?
54. Explain `IsBuffered` conceptually.
55. What changes after HttpClient forces content buffering?
56. Why is “one 50 MB memory block” too specific as a public guarantee?
57. What public guarantee is safe to state?
58. Design a 1 GB download path with small working memory.
59. Design a gzipped JSON upload path without a full MemoryStream.
60. Explain the complete decision tree from SendAsync completion option to ReadAsStreamAsync behavior.
