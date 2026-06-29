# Cookies — repetition questions

## Mechanics

1. What is the difference between Set-Cookie and Cookie?
2. Why can a response have multiple Set-Cookie headers while a request usually has one Cookie header?
3. Which cookie attributes are not repeated in the request header?
4. How do Domain and Path limit cookie sending?
5. What is the difference between a session cookie and a persistent cookie?
6. Why are cookies useful in stateless HTTP?

## Security

7. What does Secure guarantee?
8. What does Secure not guarantee?
9. What does HttpOnly prevent?
10. What can XSS still do even when a cookie is HttpOnly?
11. Explain a plain-HTTP session-cookie theft flow.
12. Why are refresh tokens more sensitive than short-lived access tokens?
13. Why is a non-HttpOnly refresh-token cookie dangerous?
14. What three attributes/rules reduce different cookie risks?

## SameSite and CORS

15. Compare Strict, Lax, and None.
16. Why does SameSite=None require Secure?
17. Which SameSite value commonly permits top-level cross-site GET navigation?
18. Why can a CORS-allowed credentialed fetch still omit the cookie?
19. Which client, server-CORS, and cookie settings are needed for cross-origin cookie auth?
20. Why is SameSite not a replacement for CSRF defense in all cases?

## Third-party and partitioned cookies

21. Who receives a third-party cookie: the top-level site or the third-party domain?
22. What is the partition key?
23. How does Partitioned prevent one third party from reusing one cookie across many top-level sites?
24. What is the difference between first-party, third-party, and partitioned third-party cookies?
25. What does Priority influence?

## ASP.NET Core

26. What does AddCookie configure?
27. Do AddCookie settings automatically become defaults for Response.Cookies.Append?
28. What is the difference between CookieAuthenticationOptions and CookieOptions?
29. What is Cookie.Name used for?
30. Why should multiple schemes/apps use distinct names?
31. What do LoginPath and AccessDeniedPath control?
32. What is SlidingExpiration?
33. What does SessionStore change?
34. What can UseCookiePolicy enforce globally?
35. Where should UseCookiePolicy appear in the middleware pipeline?
36. How do SecurePolicy and the Boolean CookieOptions.Secure differ?

## Source-hygiene checks

37. Which source in this SVG is unrelated to cookies?
38. Why should tiny DevTools label crops remain inventoried but not be treated as full knowledge sources?
