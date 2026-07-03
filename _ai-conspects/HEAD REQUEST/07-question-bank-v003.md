# HEAD REQUEST — question bank v003

1. What representation does HEAD select?
2. What must never be sent in a HEAD response?
3. What is an entity tag?
4. What is a metadata-only query?
5. What does 304 mean?
6. Which headers should correspond to GET?
7. Which headers may be omitted?
8. When is Content-Length legal?
9. Why is estimated length invalid?
10. Is HEAD safe and idempotent?
11. When does If-None-Match produce 304?
12. Which comparison strength is required?
13. What does `If-None-Match: *` mean?
14. Why can conditional HEAD be redundant?
15. Which verb does HttpGetAttribute declare?
16. Which attribute maps HEAD?
17. Why use typed headers?
18. Why does `object.Version` fail to compile?
19. Why is StringValues.Contains insufficient?
20. What must the metadata query return?
21. Why share GET/HEAD helpers?
22. Exact content length is unknown. What should HEAD do?
23. A client wants the new body immediately if changed. Which method is best?
24. A header contains several entity tags. How is it evaluated?
25. A weak tag matches. What happens?
26. A resource is absent. Which status?
27. HEAD serializes a 20 MB DTO. What should be redesigned?
28. Content varies by language. What must ETag represent?
29. `[HttpGet]` is the only route attribute. What must not be assumed?
30. How do you test that no body bytes were sent?
31. When is explicit HEAD worth maintaining?
32. Why can Last-Modified be weaker than a version token?
