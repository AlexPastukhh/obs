# Repetition questions — ASP.NET Core filters

## Pipeline and filter types

1. Where do MVC filters run relative to middleware?
2. List the MVC filter stages in execution order.
3. Which filter runs before model binding?
4. Which filter can inspect bound action arguments?
5. Which filter surrounds result serialization/writing?
6. Which filter type applies to Minimal APIs?
7. What information is available in `AuthorizationFilterContext`?
8. What does setting `context.Result` do?
9. Why is a resource filter useful for caching?
10. Why can an action filter not avoid model-binding cost?
11. Which context exposes `ActionArguments`?
12. What is the difference between `ResourceExecutedContext` and `ResultExecutedContext`?

## Sync/async and delegates

13. Compare `IActionFilter` and `IAsyncActionFilter`.
14. Where does code before and after `await next()` run?
15. Why should `.Result` and `.Wait()` be avoided in sync filters?
16. Write an async action filter that measures execution time.
17. Write an async resource filter that allocates and cleans up a resource.
18. What does not calling `next()` mean in each filter type?

## Ordering

19. What three dimensions determine filter order?
20. What is the default scope order?
21. How do after callbacks run relative to before callbacks?
22. What does a negative `Order` value mean?
23. When can `Order` be set directly on `TypeFilterAttribute`?
24. When should a filter class implement `IOrderedFilter`?
25. Why might hard-coding order in the class be undesirable?
26. Predict execution for orders `-10`, `0`, and `10`.

## DI and creation

27. Why is a plain filter attribute not a normal scoped DI object?
28. What values can be passed to an attribute constructor?
29. How can a plain attribute obtain a service from the current request?
30. Why is direct `RequestServices` resolution less testable?
31. How does `options.Filters.Add<MyFilter>()` use DI?
32. What is the difference between adding a filter by type and by instance?
33. What does `ServiceFilter` do?
34. What does `TypeFilter` do?
35. What limitation does `TypeFilter.Arguments` have?
36. Why does `ServiceFilter` not accept arbitrary constructor arguments?
37. What problem does `IFilterFactory` solve?
38. What does `IFilterFactory.IsReusable` mean?
39. Create a permission attribute that carries a permission string and resolves a service.
40. Compare plain attribute, TypeFilter, ServiceFilter, and IFilterFactory.

## Middleware versus filters

41. Name five concerns that belong in middleware.
42. Name five concerns that belong in MVC filters.
43. Why should conventional middleware not constructor-inject a scoped service?
44. How can middleware resolve a scoped service per request?
45. When is creating a new service scope appropriate?
46. Why do global filters still matter when middleware exists?
47. Why do filters not run for static files?
48. Where must middleware be placed to see selected endpoint metadata?
49. Design a rule for choosing the earliest layer with enough context.
50. Compare middleware ordering with filter ordering.

## Exception handling

51. Which exceptions can an exception filter handle?
52. Why does it not catch exceptions from authorization filters?
53. Can outer exception middleware catch an exception escaping authorization?
54. Why should authorization filters return challenge/forbid instead of throwing?
55. What is the recommended “best of both” exception architecture?
56. How can an exception filter return `ProblemDetails`?
57. How can it return an MVC error view?
58. How can it return a `ChallengeResult`?
59. What does `ExceptionHandled = true` do?
60. Why is setting `ExceptionHandled` without a result risky?
61. Can an exception filter return HTTP 200?
62. Why does that not make the action execution a semantic success?
63. When should Minimal-API applications skip exception filters entirely?
64. Map expected domain exceptions and unexpected exceptions to different layers.

## Content negotiation and endpoint classification

65. Why does `ObjectResult` preserve content negotiation?
66. What determines which formatter MVC selects?
67. How do you add an XML formatter?
68. What can `[Produces("application/json")]` do?
69. Why is `[Produces]` only a heuristic for API classification?
70. Why is `[ApiController]` a stronger signal?
71. How can controller base type help distinguish pages/views from APIs?
72. What should happen when endpoint kind is unknown?
73. Write a classifier returning API, MVC view, or unknown.
74. Why is endpoint metadata preferable to blind reflection in some cases?

## Result/resource filters

75. When is it too late to replace an `ObjectResult` payload?
76. What can a result filter reliably do after `next()`?
77. What does `ResultExecutedContext.Exception` represent?
78. What does `ResultExecutedContext.Canceled` represent?
79. Compare result-execution timing with whole-MVC timing.
80. Where should result wrapping occur?
81. How can resource filters observe short-circuiting?
82. Why should cleanup use `try/finally`?

## Status and validation

83. Why is a filter unreliable for all 404/405 cases?
84. Where can 401/403 be produced before MVC?
85. Where can 415 and 406 be produced?
86. What is the correct role of status-code-pages middleware?
87. Is invalid model state normally an exception with `[ApiController]`?
88. When might `ProblemDetailsFactory` be preferable to invoking MVC’s invalid-model factory?
89. Why is fabricating `ActionContext` in middleware awkward?
90. When would an exception/action filter have the real context needed?

## Antiforgery and always-run results

91. What does `AutoValidateAntiforgeryTokenAttribute` do?
92. Which HTTP methods are normally considered safe?
93. What result represents antiforgery validation failure?
94. Why use an always-run result filter to rewrite it?
95. Which always-run filter interfaces exist?
96. Is there an always-run action-filter interface?
97. How does `[IgnoreAntiforgeryToken]` interact with a global policy?
98. Write a filter that maps antiforgery failure to `ProblemDetails`.

## Applied design

99. Choose a layer for global correlation IDs.
100. Choose a layer for caching before JSON model binding.
101. Choose a layer for validating a bound DTO.
102. Choose a layer for wrapping all controller `ObjectResult` values.
103. Choose a layer for logging serialization failures.
104. Choose a layer for mapping `OrderNotFoundException` on one controller.
105. Choose a layer for catch-all exceptions from static files and endpoints.
106. Choose a layer for Minimal API argument validation.
107. Explain how scope, stage, and order affect nested execution.
108. Design a complete mixed MVC/API error strategy.
