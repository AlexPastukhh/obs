# AuthenticationTicket / ClaimsPrincipal — repetition questions

## Direct recall

1. What three objects are packaged by `AuthenticationTicket`?
2. What is the type of `HttpContext.User`?
3. What is the difference between `ClaimsPrincipal` and `ClaimsIdentity`?
4. Why can a principal contain multiple identities?
5. What normally makes `ClaimsIdentity.IsAuthenticated` true?
6. Where do `IssuedUtc` and `ExpiresUtc` live?
7. What does `IsPersistent` mean for cookie authentication?
8. What does `AllowRefresh` mean?
9. Why is `AllowRefresh` usually irrelevant to ordinary JWT bearer validation?
10. What is the difference between `Items` and `Parameters`?
11. What is `RedirectUri` normally used for?
12. Why does `RedirectUri` usually not redirect a JWT bearer challenge?
13. What does `SaveToken = true` do?
14. What happens when `SaveToken = false`?
15. How do you retrieve a stored access token?
16. What does `ticket.AuthenticationScheme` represent?
17. Where does a cookie handler obtain a ticket on a later request?
18. Why must the bearer token be sent again on the next request?
19. What does `ClaimsPrincipal.Claims` return?
20. Why should authorization code sometimes inspect the whole principal instead of only `User.Identity`?

## Compare and explain

21. Compare cookie authentication and JWT bearer authentication in terms of ticket persistence.
22. Compare `Items` and stored authentication tokens.
23. Compare `IsPersistent` and `ExpiresUtc`.
24. Compare `RedirectUri` behavior for OIDC/cookies and bearer.
25. Compare `AuthenticationType` and authentication scheme name.
26. Explain why the same principal can be associated with different schemes.
27. Explain why an in-memory JWT ticket is not a server-side login session.
28. Explain why arbitrary `Parameters` values do nothing unless a handler or event reads them.

## Code tasks

29. Write cookie sign-in code with an eight-hour persistent ticket.
30. Write an OIDC challenge that returns to `/dashboard`.
31. Store access and refresh tokens in `AuthenticationProperties`.
32. Authenticate the bearer scheme manually and read the access token.
33. Read the `sub` claim from `HttpContext.User`.
34. Configure a custom bearer challenge parameter and read it in `OnChallenge`.
35. Write a policy/action that can authenticate both cookie and bearer schemes.

## Scenario questions

36. A JWT is valid, but `GetTokenValue("access_token")` returns null. What option should you inspect?
37. A developer sets `RedirectUri` during a bearer challenge and expects a browser redirect. Why is that assumption wrong?
38. A cookie disappears after browser restart although authentication succeeded. Which property and cookie settings should be examined?
39. Two identities are present, but `User.Identity` does not contain the claim you expected. Where else should you look?
40. A property value must survive inside the cookie ticket. Should it be stored in `Items` or `Parameters`?
