# R01/R02/R03 - Cookies general theory / plain CookieOptions / SameSite-Secure final transcript v001

Generated: 2026-06-02 16:40:00 UTC

Source policy: preserved PNGs remain the source of truth for exact code punctuation and browser UI text. This transcript is a source-preserving semantic pass over all image uses.

## Boundary decision

The whole sheet is closed in one pass because it has 90 image uses and one continuous conceptual flow:

```text
R01: ASP.NET/auth/plain cookie option surfaces and normal cookie flow
R02: general browser cookie theory, storage, HttpOnly, partitioned/third-party cookies, refresh-token notes
R03: SameSite, Secure, HTTP/HTTPS visibility, CORS credentials interaction
```

No duplicate image uses were detected in stage0.

## R01 - auth/plain cookie options and normal cookie flow

This area explains the places where cookies are configured in ASP.NET and how those settings map to actual `Set-Cookie` attributes.

Key points:

- `CookieAuthenticationOptions` controls the auth-cookie handler: paths/events/ticket storage/sliding expiration and the cookie builder used for the authentication ticket.
- Plain `CookieOptions` / `CookieBuilder` attributes control the browser-facing cookie: `Name`, `Path`, `Domain`, `HttpOnly`, `Secure`, `SameSite`, `Expires`, `MaxAge`, `IsEssential` and similar attributes.
- `Response.Cookies.Append(...)` emits a `Set-Cookie` response header; later matching requests return the cookie in the `Cookie` request header.
- `UseCookiePolicy` is a broader middleware layer that can apply global policy, consent or minimum SameSite/Secure rules across cookies.
- `Cookie.Name` matters when multiple applications or multiple auth schemes run on the same host/path. Broad names/paths can cause collisions or confusing devtools/debugging behavior.

## R02 - general cookie theory / storage / HttpOnly / partitioned and refresh-token notes

This area explains cookies as a browser-managed request/response mechanism rather than just an ASP.NET option object.

Key points:

- The server sends `Set-Cookie`; the browser stores the cookie and later includes it automatically as a `Cookie` header when domain/path/SameSite/Secure rules match.
- Cookies are visible in browser storage/devtools, but their value may or may not be readable by JavaScript depending on `HttpOnly`.
- `HttpOnly` protects the cookie value from `document.cookie`; it does not prevent the browser from sending the cookie with matching requests.
- Non-HttpOnly tokens are easier for JavaScript to read and therefore more exposed to XSS. HttpOnly refresh-token storage changes the risk profile, but CSRF and request-context rules still matter.
- First-party vs third-party context, partitioned cookies and partition keys affect whether cookies are shared globally or scoped by top-level site.
- Partitioned/third-party cookie behavior is browser-enforced and can affect embedded widgets, iframes and cross-site login/session flows.

## R03 - SameSite / Secure / HTTP visibility / CORS-cookie comparison

This area explains why a cookie may not be sent even when the request URL and CORS policy seem correct.

Key points:

- `SameSite=Strict` sends the cookie only in same-site contexts and gives the strongest CSRF protection, but causes the most cross-site friction.
- `SameSite=Lax` sends cookies in same-site contexts and many top-level navigations, but not in many subresource/background or form-style cross-site cases.
- `SameSite=None` permits cross-site cookie sending, but modern browsers require `Secure` with `None`.
- `Secure` means the cookie is only sent over HTTPS. It does not make the cookie unreadable to JavaScript; `HttpOnly` controls JavaScript readability.
- Plain HTTP can expose cookie headers/body to observers on the network path. HTTPS encrypts transport, but the endpoint and allowed browser APIs still matter.
- CORS credentials and SameSite solve different problems. CORS may allow a frontend to make credentialed cross-origin requests, but SameSite may still prevent cookies from being attached.
- To make cross-site cookie auth work, the server usually needs correct CORS credentials settings, the client request must include credentials, and the cookie must have compatible `SameSite`/`Secure` attributes.

## Coverage

```text
total image uses: 90
R01 processed: 21
R02 processed: 40
R03 processed: 29
remaining unclosed: 0
```

## Limitations

Exact C# punctuation, option defaults and browser UI strings should be corrected from preserved PNGs if needed. This pass closes image-use coverage and captures conceptual structure; it is not a verbatim code transcription of every screenshot.
