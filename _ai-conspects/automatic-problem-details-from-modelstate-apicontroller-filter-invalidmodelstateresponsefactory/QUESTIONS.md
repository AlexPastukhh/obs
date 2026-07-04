# Automatic ProblemDetails / ModelState — repetition questions

## Direct recall

1. What does `[ApiController]` do when ModelState is invalid before the action runs?
2. What delegate creates the automatic invalid-model response?
3. What is the input type of `InvalidModelStateResponseFactory`?
4. What is its output type?
5. Why does the delegate receive `ActionContext` rather than only `ModelStateDictionary`?
6. What is the relationship between `ControllerContext` and `ActionContext`?
7. What does `TryValidateModel` modify?
8. Why is `TryValidateModel` useful after applying a patch?
9. What does `ActionResultObjectValue` affect?
10. What is the default role of `ProblemDetailsFactory`?
11. How can the automatic invalid-model filter be suppressed?
12. What is the consequence of suppressing it?
13. How can implicit required validation for non-nullable reference types be suppressed?
14. Does that option remove explicit `[Required]` attributes?
15. Why should automatic and manual validation paths reuse the same factory?

## Flow questions

16. Describe the automatic `[ApiController]` validation flow from request binding to response.
17. Describe the manual PATCH validation flow.
18. Why should patch-operation errors be checked before validating the final DTO?
19. What changes in the flow when the resource does not exist and PATCH is used as upsert?
20. Why does manual validation inside the action not trigger the pre-action automatic filter again?

## Code tasks

21. Override `ValidationProblem` so that it invokes the current configured factory.
22. Configure `InvalidModelStateResponseFactory` to return 422 with `ValidationProblemDetails`.
23. Write a PATCH action that applies a Newtonsoft patch and returns configured validation responses.
24. Write the equivalent error callback for System.Text.Json JSON Patch.
25. Write the option that suppresses `ModelStateInvalidFilter`.
26. Write the option that suppresses implicit required validation for non-nullable reference types.

## Debugging scenarios

27. The action never executes when a required field is missing. Why?
28. The same API returns 400 automatically but 422 from manual PATCH validation. What design inconsistency caused this?
29. `TryValidateModel(dto)` returns false, but the response omits the configured trace metadata. What helper/factory was probably bypassed?
30. A System.Text.Json patch reports an operation error, but ModelState remains valid. What is missing?
31. An empty request body causes an automatic response before a breakpoint in the action. Which feature is responsible?
32. Why is returning `BadRequest(ModelState)` less future-proof than invoking the configured factory?
