# Repetition questions — injecting into Razor

1. What does `@inject` do in a Razor view?
2. How is it similar to constructor injection?
3. Write an `@inject` directive for `ILogger<MyView>`.
4. Can a Razor view inject any registered DI service?
5. Why is `IHttpContextAccessor` often unnecessary in a Razor view?
6. What does `Context` refer to?
7. What does `User` refer to?
8. How do you display `Context.Request.Path`?
9. How do you check whether the user is authenticated?
10. How do you display the authenticated user's name?
11. What is `IAntiforgery` used for?
12. What services are commonly used for localization?
13. Give three examples of view-friendly services.
14. Why is querying a database directly from a view a smell?
15. Where should complex data-access work occur?
16. What is a view model for?
17. When is a view component preferable?
18. Is showing a Login/Logout link in the view acceptable?
19. Is hiding an admin link sufficient authorization?
20. Where must actual permission enforcement occur?
21. Can a view branch on path/query for presentation?
22. Which logic belongs in a controller or service instead?
23. Explain the difference between UI visibility and security enforcement.
24. Design a view that injects a formatter but receives its data through a model.
