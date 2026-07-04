# Repetition questions — HttpContext Items and Features

1. What is the declared type of `HttpContext.Items`?
2. Why can string keys collide?
3. Why is a static `new object()` key collision-safe?
4. How do object keys compare?
5. Write a static key class for a correlation ID.
6. Store a correlation ID using the object key.
7. Read the correlation ID safely.
8. What is `HttpContext.Features`?
9. What interface represents the feature collection?
10. Who commonly populates features?
11. What does `Features.Get<T>()` return when absent?
12. What does `Features.Set<T>()` do?
13. Compare Items and Features.
14. When is Items the simpler choice?
15. When is a custom Feature preferable?
16. Why are Features called infrastructure/capability-oriented?
17. What is `IExceptionHandlerFeature`?
18. What does `IExceptionHandlerPathFeature` add?
19. How does an error endpoint obtain the original exception?
20. How does it obtain the original path?
21. Why does exception middleware use Features rather than a magic Items key?
22. What does `GetEndpoint()` return?
23. When does `GetEndpoint()` start returning the selected endpoint?
24. What happens if middleware calls it before routing?
25. Give three uses for endpoint metadata.
26. What is `IEndpointFeature`?
27. Why do most applications use `GetEndpoint()` instead?
28. Name four low-level server/transport feature categories.
29. Why is direct feature access uncommon in ordinary application code?
30. Build correlation-ID middleware using Items.
31. Why return the correlation ID in a response header?
32. Build tenant-resolution middleware using Items.
33. Why is tenant data usually Items rather than Features?
34. Build request-timing middleware.
35. What should happen if downstream middleware throws before the elapsed header is written?
36. Build user-profile enrichment using Items.
37. What lifetime does an Items value have?
38. Is Items shared across requests?
39. Can middleware and controllers see the same Items dictionary for one request?
40. Define `IMyFeature` and a concrete implementation.
41. Set the custom feature from middleware.
42. Read the feature from a controller.
43. Why is a typed feature cleaner for shared packages?
44. Define `IRequestAuditFeature`.
45. Why can a feature interface evolve more safely than a magic string convention?
46. Can an application replace an existing feature implementation?
47. What risks exist when replacing framework features?
48. Compare feature capability with ordinary business data.
49. Choose Items or Features for a loaded database entity.
50. Choose Items or Features for exception details.
51. Choose Items or Features for a custom response-body capability.
52. Choose Items or Features for a request flag used by one app.
53. Explain the phrase “typed extensibility contract.”
54. Explain why `const string` is not private identity.
55. What happens when two libraries use the same Items string key?
56. How can a shared library expose a safe Items key?
57. Should sensitive data be placed in Items without considering access by later middleware?
58. Explain the end-to-end lifecycle of a custom feature.
59. Explain the end-to-end lifecycle of an Items correlation ID.
60. Design a middleware-to-endpoint contract and justify Items versus Features.
