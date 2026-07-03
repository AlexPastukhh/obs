# Google reCAPTCHA v2/v3 — repetition guide v003

Generated: 2026-07-02

## Core mental model

1. The browser uses the public site key to obtain a short-lived token.
2. The application server receives the token as untrusted input.
3. The server sends token plus private secret to Google's `siteverify` endpoint.
4. The endpoint is accepted only after server-side verification and application policy checks.
5. v2 checkbox normally checks success and preferably hostname/token age.
6. v3 additionally checks a stable action name and score threshold.
7. reCAPTCHA is only one abuse signal; rate limiting, lockouts, validation, and generic error responses still matter.
8. Remote IP is optional and must represent the real client, not a reverse proxy.
9. ASP.NET Core forwarded-header middleware must trust only known infrastructure.
10. Site keys may be exposed; secret keys must never reach the client.

## v2 versus v3

| Property | v2 checkbox | v3 score-based |
|---|---|---|
| User interaction | visible challenge/checkbox | normally invisible |
| Browser token | widget response | `execute(siteKey, { action })` |
| Typical form field | `g-recaptcha-response` | explicit hidden/payload token |
| Required server check | success | success + action + score |
| Additional checks | hostname, challenge timestamp | hostname, challenge timestamp |
| Retry UX | reset widget | request a new token |
| Risk decision | challenge completion | application threshold and friction policy |

## Architecture questions

1. Why can the site key be returned from `/api/config/recaptcha-site-key`?
2. Why must the secret never appear in React, Razor HTML, or a client-accessible endpoint?
3. Why does the controller depend on `IRecaptchaVerifier` rather than constructing HTTP requests itself?
4. What does typed `AddHttpClient<IRecaptchaVerifier, GoogleRecaptchaVerifier>()` provide?
5. Why must a failed Razor POST restore `ViewBag.RecaptchaSiteKey`?
6. Why does `g-recaptcha-response` not map cleanly to a normal C# identifier?

## v2 coding prompts

1. Recreate the Razor checkbox form.
2. Recreate the minimal controller POST.
3. Implement `VerifyV2Async`.
4. Build the verification response DTO with a correct JSON mapping for error codes.
5. Implement the `react-google-recaptcha` form and reset on failure.
6. Implement the explicit-render version with `widgetId`.
7. Explain why auto-render can conflict with React reconciliation.

## v3 coding prompts

1. Recreate the Razor hidden-token flow.
2. Recreate the v3 browser script using `action: "register"`.
3. Implement `VerifyV3Async` with expected-action enforcement.
4. Implement the controller threshold decision.
5. Build the custom `useRecaptchaV3` hook and one-time script loader.
6. Build the `GoogleReCaptchaProvider` version.
7. Design a three-band policy for high, medium, and low scores.

## Security and networking questions

1. What can go wrong when `RemoteIpAddress` contains a proxy address?
2. When is omitting remoteip better than sending it?
3. How do `X-Forwarded-For` and trusted proxy configuration affect correctness?
4. Why is hostname not a full URL?
5. Why should the host check use an exact allowlist?
6. Why must action be matched with `StringComparison.Ordinal`?
7. Why is a generic reCAPTCHA failure safer on registration/login forms?
8. How does token age affect replay risk?
9. Why must a v2 token be reset after a failed application request?
10. Why should a v3 token be generated immediately before the protected action?

## Misconceptions to reject

- The site key is secret.
- A client-side success callback proves the request is human.
- `success == true` is sufficient for v3.
- The score is a universal Google-defined pass/fail boundary.
- reCAPTCHA replaces rate limiting or account lockout.
- RemoteIpAddress always contains the real user behind a CDN.
- A hostname includes scheme and route path.
- A v3 token generated for one action should be accepted for every endpoint.
- React wrapper libraries remove the need for backend verification.
- Reusing an old token is a reliable optimization.
