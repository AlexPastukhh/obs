# Encoding.UTF8 and chunk processing - repetition questions

Source: `regions/full-semantic-transcript-v001.md`

## Basic API

1. Which namespace contains `Encoding`?
2. How do you encode a complete string as UTF-8 bytes?
3. How do you decode complete UTF-8 bytes into a string?
4. Which APIs allocate a new result?
5. Which API decodes into an existing character buffer?
6. What are the three main overload styles covered by the conspect?
7. How do you use a `Memory<byte>` with a span-based API?
8. Why is UTF-8 normally preferred for APIs, JSON, files, and web data?

## Buffer sizing

9. What does `GetByteCount` return?
10. What does `GetCharCount` return?
11. What does `GetMaxCharCount` return?
12. Why can a maximum count over-allocate?
13. When is an exact count worth an extra pass?
14. What does `TryGetBytes` report?

## Chunk boundaries

15. Why can one UTF-8 character be split between reads?
16. Why is calling `GetString` separately for every chunk unsafe?
17. What state does a `Decoder` preserve?
18. How long should one decoder instance be reused?
19. When should decoder state be reset?
20. Why should a new decoder not be created for every WebSocket fragment?

## GetChars and Convert

21. What does `Decoder.GetChars` assume about the output buffer?
22. What can happen when that buffer is too small?
23. What additional information does `Decoder.Convert` return?
24. What does `bytesUsed` mean?
25. What does `charsUsed` mean?
26. What does `completed` mean?
27. What does `completed` not mean?
28. Why must the input index be advanced by `bytesUsed`?
29. When is `Convert` preferable to `GetChars`?

## Flush and finalization

30. What does `flush: false` communicate?
31. What does `flush: true` communicate?
32. Which WebSocket fragment should use `flush: true`?
33. Why is a final empty conversion useful at end-of-stream?
34. What happens if a decoder with incomplete bytes is simply discarded?
35. Why is the problem correctness rather than a runtime hang?

## Fallback

36. What does replacement fallback do?
37. Which character normally represents invalid decoded text?
38. What does exception fallback do?
39. When should strict invalid-byte handling be used?
40. What can `UTF8Encoding(false, true)` do on invalid input?
41. How does the final flush expose truncated input?

## Streaming design

42. What invariants must a safe stream-decoding loop preserve?
43. Why must `result.Count`, not the entire receive buffer, be decoded?
44. When should a WebSocket text message be delivered to the application?
45. How should cancellation propagate through the receive and conversion loops?
46. Why should independent logical messages not share leftover decoder state?

## Encoder side

47. Why can a stateful `Encoder` be needed for character chunks?
48. What UTF-16 structure can be split between character chunks?
49. When is ordinary `Encoding.UTF8.GetBytes` sufficient?
50. When should `Encoding.UTF8.GetEncoder()` be used?

## Scenario review

51. Two bytes of the euro sign arrive in one chunk and the third in the next. What preserves the character?
52. `Convert` reports `completed == false`. What must the caller do?
53. The destination span is too small for `GetChars`. Which API gives controlled partial progress?
54. The final UTF-8 sequence is incomplete and replacement fallback is active. What should a proper final flush produce?
55. A decoder is reset between WebSocket fragments. What information is lost?
