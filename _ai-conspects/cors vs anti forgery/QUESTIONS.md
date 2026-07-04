# Questions — CORS vs antiforgery

1. What does CORS primarily control?
2. What does antiforgery primarily protect?
3. Why can a classic HTML form POST bypass CORS preflight?
4. Why can a CSRF attack succeed even if the attacker cannot read the response?
5. Under what condition may cookies be attached to a cross-site request?
6. What happens when a JSON POST requires preflight and preflight fails?
7. What happens when a simple state-changing request reaches the server but the response lacks CORS approval?
8. Why is `credentials: "include"` relevant?
9. Which response header lets a specific origin read a response?
10. Why is wildcard origin incompatible with credentialed CORS?
11. Name the five XHR `readyState` values.
12. When is XHR still useful?
13. When is Fetch usually preferred?
14. What can an `<img>` send?
15. What can an `<img>` not normally read?
16. Why can a cross-origin `<script>` be more dangerous than an image?
17. What was JSONP designed to do?
18. Why should modern APIs avoid JSONP?
19. What does `X-Content-Type-Options: nosniff` help prevent?
20. How can `onload`/`onerror` leak limited information?
21. Why are secret URLs not a sufficient defense?
22. What server-side controls should protect unsafe cookie-authenticated endpoints?
23. Compare a failed preflight with a simple form POST.
24. Write the HTML form from the source that posts to `bank.com/transfer`.
25. Write the JSON fetch that triggers preflight.
26. Explain why CORS is not authentication.
27. Explain why antiforgery is not authorization.
28. What changes when an API uses an explicitly supplied bearer token instead of ambient cookies?
