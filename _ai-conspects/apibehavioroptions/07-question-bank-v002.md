# ApiBehaviorOptions — question bank v002

## Invalid model state

1. When is `InvalidModelStateResponseFactory` invoked?
2. What does `[ApiController]` do for invalid model state by default?
3. Why does the action not execute?
4. What object stores field-level validation errors?
5. Why use `ValidationProblemDetails`?
6. Why add `traceId`?
7. Why set `application/problem+json`?
8. What is lost when returning one flat error string?
9. What does `SuppressModelStateInvalidFilter = true` do?
10. When is suppression useful?
11. Why is suppression risky for normal APIs?
12. How can domain errors be aggregated with validation errors?
13. How would you test the custom factory?
14. Which status code should invalid model state usually return?
15. What should the `type` URI document?

## Binding inference

16. What does `SuppressInferBindingSourcesForParameters` control?
17. Where is `{id}` inferred from?
18. Where is a complex request inferred from?
19. Which attributes make sources explicit?
20. Why can hidden inference be confusing?
21. When is inference convenient?
22. When are explicit attributes clearer?
23. What is the exact property name?
24. How can a project enforce explicit binding?
25. What test catches incorrect binding source assumptions?

## Services inference

26. What does `DisableImplicitFromServicesParameters` control?
27. What happens if a parameter type is registered in DI?
28. Why can DI registration change binding behavior?
29. What does `[FromServices]` make explicit?
30. When should constructor injection be preferred?
31. Which other option must permit inference?
32. How can strict APIs avoid surprises?
33. Write an action using explicit `[FromServices]`.
34. How should service parameters be reviewed?
35. What is the exact property name?

## Form files

36. What parameter type triggers form-file convention?
37. Which content type is inferred?
38. What does a consumes constraint affect?
39. What is the exact property name?
40. When should `[Consumes]` be explicit?
41. When might suppression be needed?
42. Why usually leave this convention enabled?
43. How do you test upload endpoint selection?
44. What should happen with the wrong content type?
45. What security checks are still required for uploads?

## Client errors

46. What does `SuppressMapClientErrors` disable?
47. What status range is involved?
48. What is `IClientErrorActionResult`?
49. Name five affected result helpers.
50. What does `ClientErrorMapping` customize?
51. Which fields can it set per status?
52. What does `Link` usually influence?
53. What does `Title` influence?
54. Does ClientErrorMapping set Detail?
55. Does it set Instance?
56. Does it set Extensions?
57. Which tools should be used for richer customization?
58. Why is invalid model state separate?
59. What happens to `NotFound()`?
60. What usually happens to `NotFound(object)`?
61. Why can an explicit object body be preserved?
62. When should client error mapping be suppressed?
63. How can global error middleware conflict with MVC mapping?
64. How should 404 documentation links be set?
65. How should 400 documentation links be set?

## Integration and design

66. Design a validation response contract.
67. Compare anonymous envelope and ValidationProblemDetails.
68. Add trace ID to every validation response.
69. Test controller action is not executed for invalid model.
70. Test suppression lets the action run.
71. Test explicit query/header/body binding.
72. Test implicit services inference disabled.
73. Test IFormFile consumes behavior.
74. Test empty 404 ProblemDetails mapping.
75. Test body 404 is not replaced.
76. Document all ApiBehaviorOptions used by a project.
77. Explain which options are conventions and which change response contracts.
78. Decide whether a large public API should disable binding inference.
79. Decide whether a small internal API should keep inference.
80. Explain these options to a team using ProblemDetails globally.
