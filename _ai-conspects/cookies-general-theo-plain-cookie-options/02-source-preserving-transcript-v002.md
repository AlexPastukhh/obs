# Cookies — corrected source-by-source transcript v002

> Source-preserving correction transcript. Wording is normalized, but visible claims and code are retained.

## S-001 — Excluded unrelated source

### Near-literal visible content

- This screenshot is a Stack Overflow fragment about `IEnumerable` and `IQueryable` lazy/deferred execution.
- It is unrelated to browser cookies and must not be used as cookie evidence.
- Keep it in the inventory for no-image-loss accounting, but classify it as `excluded-out-of-scope`.

### Study takeaway

- Keep it in the inventory for no-image-loss accounting, but classify it as `excluded-out-of-scope`.

## S-002 — Browser storage tree

### Near-literal visible content

- Browser DevTools shows Storage categories such as Local storage, Session storage, IndexedDB, and Cookies.
- Cookies are stored and inspected separately from web-storage APIs.

### Study takeaway

- Cookies are stored and inspected separately from web-storage APIs.

## S-003 — DevTools Application tab

### Near-literal visible content

- The screenshot identifies the browser Application panel used to inspect stored site data.

### Study takeaway

- The screenshot identifies the browser Application panel used to inspect stored site data.

## S-004 — Response Cookies table

### Near-literal visible content

- DevTools exposes response-cookie fields such as name, value, domain, path, expiration, size, HttpOnly, Secure, SameSite, partition information, cross-site state, and priority.

### Study takeaway

- DevTools exposes response-cookie fields such as name, value, domain, path, expiration, size, HttpOnly, Secure, SameSite, partition information, cross-site state, and priority.

## S-005 — Cookie-row details in DevTools

### Near-literal visible content

- The selected network request exposes request/response cookie details and attributes in the browser UI.

### Study takeaway

- The selected network request exposes request/response cookie details and attributes in the browser UI.

## S-006 — Priority context label

### Near-literal visible content

- Context-only crop: `Priority`.
- It labels the DevTools cookie priority field; it is not a standalone explanation.

### Study takeaway

- It labels the DevTools cookie priority field; it is not a standalone explanation.

## S-007 — Partition key context label

### Near-literal visible content

- Context-only crop: `Partition Key Site`.
- It labels the top-level-site partition key shown by DevTools.

### Study takeaway

- It labels the top-level-site partition key shown by DevTools.

## S-008 — Cookie request header shape

### Near-literal visible content

- A normal HTTP request contains ordinary headers such as Host, User-Agent, Accept, and Referer, plus a `Cookie` header.
- Several cookies are normally combined into one header line as semicolon-separated name/value pairs.

### Visible code

```csharp
Cookie: session_id=abc123; theme=dark; csrf_token=9f8e7d6c
```

### Study takeaway

- Several cookies are normally combined into one header line as semicolon-separated name/value pairs.

## S-009 — Realistic request with cookies

### Near-literal visible content

- A browser request contains normal request headers and a single Cookie header carrying several cookies.
- The cookie header is request data sent back to the server.

### Visible code

```csharp
GET /account/orders?page=2 HTTP/1.1
Host: app.example.com
User-Agent: ...
Accept: ...
Referer: https://app.example.com/account
Cookie: session_id=abc123; theme=dark; csrf_token=9f8e7d6c
```

### Study takeaway

- The cookie header is request data sent back to the server.

## S-010 — Request Cookie versus response Set-Cookie

### Near-literal visible content

- The response may contain multiple `Set-Cookie` headers.
- A later request normally contains one `Cookie` header with multiple semicolon-separated name/value pairs.
- This is the main response/request distinction.

### Visible code

```csharp
Cookie: session_id=abc123; theme=dark; cart=sku42
```

### Study takeaway

- This is the main response/request distinction.

## S-011 — How cookies look in a response

### Near-literal visible content

- The server creates cookies with one or more `Set-Cookie` response headers.
- Each Set-Cookie line defines one cookie and its attributes.

### Visible code

```csharp
HTTP/1.1 200 OK
Content-Type: text/html
Set-Cookie: session_id=abc123; Path=/; Secure; HttpOnly; SameSite=Lax
Set-Cookie: theme=dark; Path=/; Max-Age=2592000; SameSite=Lax
```

### Study takeaway

- Each Set-Cookie line defines one cookie and its attributes.

## S-012 — HTTP is stateless

### Near-literal visible content

- HTTP does not automatically remember that several requests came from the same browser session.
- After visiting, logging in, and opening another page, the server needs a mechanism to recognize the browser.
- Cookies are one common mechanism.

### Study takeaway

- Cookies are one common mechanism.

## S-013 — Server sets the cookie

### Near-literal visible content

- The server includes a Set-Cookie header in a response.
- The header gives the browser a value and storage/sending rules.

### Visible code

```csharp
Set-Cookie: session_id=abc123; HttpOnly; Secure; SameSite=Lax
```

### Study takeaway

- The header gives the browser a value and storage/sending rules.

## S-014 — Browser stores and sends it later

### Near-literal visible content

- The browser stores the cookie according to its domain/path/attribute rules.
- On later matching requests, it automatically adds the cookie to the request.
- The server can then recognize the browser session.

### Visible code

```csharp
Cookie: session_id=abc123
```

### Study takeaway

- The server can then recognize the browser session.

## S-015 — Common uses

### Near-literal visible content

- Common cookie uses include login sessions, shopping carts, language/theme preferences, analytics, remembering dismissed UI, and advertising/tracking.

### Study takeaway

- Common cookie uses include login sessions, shopping carts, language/theme preferences, analytics, remembering dismissed UI, and advertising/tracking.

## S-016 — Important lifetime and scope attributes

### Near-literal visible content

- `Expires` or `Max-Age` controls how long the cookie persists.
- A cookie without persistence attributes is usually a session cookie.
- `Domain` controls which hosts can receive it.
- `Path` limits which URL paths receive it.

### Study takeaway

- `Path` limits which URL paths receive it.

## S-017 — Secure, HttpOnly, and SameSite

### Near-literal visible content

- `Secure` means the browser sends the cookie only over HTTPS.
- `HttpOnly` means JavaScript cannot read the value through `document.cookie`.
- `SameSite` controls cross-site attachment and provides CSRF/tracking-related restrictions.
- Typical values: Strict, Lax, and None; None normally requires Secure.

### Study takeaway

- Typical values: Strict, Lax, and None; None normally requires Secure.

## S-018 — First-party and third-party cookies

### Near-literal visible content

- A first-party cookie is set by the site the user is visiting.
- A third-party cookie belongs to a different embedded domain such as an ad, analytics, iframe, or identity provider.
- Modern browsers restrict or block many third-party-cookie scenarios.

### Study takeaway

- Modern browsers restrict or block many third-party-cookie scenarios.

## S-019 — Are cookies dangerous?

### Near-literal visible content

- Cookies are not inherently dangerous; they are storage and identification mechanisms.
- Risks include privacy tracking, stolen session cookies, and misconfigured security attributes.
- HttpOnly, Secure, and SameSite reduce different classes of risk.

### Study takeaway

- HttpOnly, Secure, and SameSite reduce different classes of risk.

## S-020 — Plain HTTP observation

### Near-literal visible content

- Any machine or operator able to observe unencrypted traffic between the user and the site may be able to see request contents when the connection uses plain HTTP.

### Study takeaway

- Any machine or operator able to observe unencrypted traffic between the user and the site may be able to see request contents when the connection uses plain HTTP.

## S-021 — What “the network” means

### Near-literal visible content

- The traffic path can include the browser/device, Wi-Fi router or local network, ISP/mobile carrier, transit providers, organization or café gateway, and the destination server/load balancer.
- Any point capable of inspecting the path is part of the network for this risk model.

### Study takeaway

- Any point capable of inspecting the path is part of the network for this risk model.

## S-022 — Who could read plain HTTP traffic

### Near-literal visible content

- Possible observers include a public Wi-Fi operator, an attacker on the same LAN, school/company equipment, an ISP/upstream provider, malware/proxies, or an intermediary configured to inspect traffic.
- Not every hop stores the traffic, but plain HTTP gives observers the ability to read it.

### Study takeaway

- Not every hop stores the traffic, but plain HTTP gives observers the ability to read it.

## S-023 — Why the cookie is visible on HTTP

### Near-literal visible content

- The Cookie header is literally part of the HTTP request headers.
- Therefore a plain HTTP request exposes the cookie value to an observer.

### Visible code

```csharp
GET /account HTTP/1.1
Host: app.example.com
User-Agent: Mozilla/5.0
Cookie: session_id=abc123; theme=dark
```

### Study takeaway

- Therefore a plain HTTP request exposes the cookie value to an observer.

## S-024 — What plain HTTP may expose

### Near-literal visible content

- An observer may see hostname, path, headers, cookie values, and sometimes the body.
- The Cookie line is not encrypted in transit.

### Study takeaway

- The Cookie line is not encrypted in transit.

## S-025 — What HTTPS changes

### Near-literal visible content

- HTTPS places the HTTP request inside an encrypted TLS tunnel.
- Observers normally see encrypted packets rather than header values.
- They may still infer metadata such as destination, timing, and packet sizes, but not the cookie contents.

### Study takeaway

- They may still infer metadata such as destination, timing, and packet sizes, but not the cookie contents.

## S-026 — Plain-HTTP theft flow: preparation

### Near-literal visible content

- Example situation: the user is on airport Wi-Fi and visits an HTTP site.
- The browser possesses `session_id=abc123`, and the cookie lacks Secure.
- The browser checks domain/path rules and creates a request carrying the session cookie.

### Visible code

```csharp
GET /dashboard HTTP/1.1
Host: app.example.com
Cookie: session_id=abc123
```

### Study takeaway

- The browser checks domain/path rules and creates a request carrying the session cookie.

## S-027 — Plain-HTTP theft flow: interception

### Near-literal visible content

- The request leaves the device through the Wi-Fi/network path.
- A malicious or authorized observer can read the unencrypted request and copy the session cookie.

### Visible code

```csharp
Cookie: session_id=abc123
```

### Study takeaway

- A malicious or authorized observer can read the unencrypted request and copy the session cookie.

## S-028 — Plain-HTTP theft flow: replay

### Near-literal visible content

- The observer now has the session token and sends a new request to the site with the copied cookie.
- If the server treats the cookie as an authenticated session, the observer may be accepted as the user.
- This is session hijacking.

### Visible code

```csharp
GET /dashboard HTTP/1.1
Host: app.example.com
Cookie: session_id=abc123
```

### Study takeaway

- This is session hijacking.

## S-029 — Why SameSite=None requires Secure

### Near-literal visible content

- SameSite=None allows a cookie to travel in third-party, iframe, cross-site login, and other cross-site contexts.
- That exposure is broader than Lax or Strict.
- Without Secure, the browser might send the broadly usable cookie over plain HTTP.
- Modern browsers therefore require Secure with SameSite=None.

### Visible code

```csharp
Set-Cookie: refresh=abc; SameSite=None; Secure
```

### Study takeaway

- Modern browsers therefore require Secure with SameSite=None.

## S-030 — Why browsers enforce the rule

### Near-literal visible content

- Third-party cookies historically enabled tracking and are sensitive privacy/security surfaces.
- Requiring Secure ensures cross-site cookies are sent only over HTTPS.
- It also prevents developers from accidentally deploying broadly exposed cross-site cookies over insecure transport.

### Study takeaway

- It also prevents developers from accidentally deploying broadly exposed cross-site cookies over insecure transport.

## S-031 — What Secure actually does

### Near-literal visible content

- Secure means the browser sends the cookie only over HTTPS, not plain HTTP.
- Secure does not encrypt the cookie value by itself; TLS protects it in transit.

### Study takeaway

- Secure does not encrypt the cookie value by itself; TLS protects it in transit.

## S-032 — Why this matters for auth cookies

### Near-literal visible content

- A session cookie with SameSite=None but without Secure can be sent broadly and may be exposed on HTTP.
- Adding Secure makes the browser refuse to send it except over HTTPS.

### Study takeaway

- Adding Secure makes the browser refuse to send it except over HTTPS.

## S-033 — Practical browser behavior for SameSite=None

### Near-literal visible content

- Modern browsers normally reject or ignore a SameSite=None cookie that lacks Secure.
- With Secure present, the cross-site cookie can be accepted and sent over HTTPS.

### Visible code

```csharp
Set-Cookie: id=123; SameSite=None
Set-Cookie: id=123; SameSite=None; Secure
```

### Study takeaway

- With Secure present, the cross-site cookie can be accepted and sent over HTTPS.

## S-034 — SameSite=Strict

### Near-literal visible content

- Strict sends the cookie only in same-site contexts.
- Cross-site requests do not receive it.
- This gives the strongest SameSite-based CSRF protection and the highest user-friction risk.

### Study takeaway

- This gives the strongest SameSite-based CSRF protection and the highest user-friction risk.

## S-035 — Strict cross-site POST example

### Near-literal visible content

- A user is logged into `bank.example` and visits another site that submits a form POST to the bank.
- With SameSite=Strict, the browser does not attach the session cookie.
- The bank sees the request as unauthenticated.

### Visible code

```csharp
POST https://bank.example/transfer
```

### Study takeaway

- The bank sees the request as unauthenticated.

## S-036 — SameSite=Lax

### Near-literal visible content

- Lax is the middle ground.
- Cookies are sent in same-site requests.
- They are generally not sent on many cross-site subrequests or form-style background requests.
- They may be sent on top-level navigations, especially safe methods such as GET.

### Study takeaway

- They may be sent on top-level navigations, especially safe methods such as GET.

## S-037 — Lax blocked example

### Near-literal visible content

- A hidden cross-site form auto-submits a POST to the bank.
- With SameSite=Lax, the cookie is generally not sent.

### Visible code

```csharp
POST https://bank.example/transfer
```

### Study takeaway

- With SameSite=Lax, the cookie is generally not sent.

## S-038 — Lax allowed top-level navigation

### Near-literal visible content

- If the user clicks a normal link from another site to the bank, that top-level navigation commonly carries a Lax cookie.
- This balances usability with better CSRF resistance than None.

### Visible code

```csharp
GET https://bank.example/account
```

### Study takeaway

- This balances usability with better CSRF resistance than None.

## S-039 — SameSite=None

### Near-literal visible content

- None permits same-site and cross-site cookie sending.
- It is the least restrictive SameSite value.
- It is needed for legitimate third-party or cross-site cases and normally requires Secure.

### Visible code

```csharp
Set-Cookie: id=abc; SameSite=None; Secure
```

### Study takeaway

- It is needed for legitimate third-party or cross-site cases and normally requires Secure.

## S-040 — Uses and risks of None

### Near-literal visible content

- Uses include embedded third-party services, cross-site identity flows, federated sign-in, and widgets/iframes.
- Because the cookie may be attached cross-site, CSRF risk is higher unless other defenses are present.

### Study takeaway

- Because the cookie may be attached cross-site, CSRF risk is higher unless other defenses are present.

## S-041 — Quick comparison: Strict and Lax

### Near-literal visible content

- Strict: same-site only, strongest CSRF protection, greatest chance of friction.
- Lax: same-site plus many top-level navigations, blocks many cross-site background/form cases, common practical default.

### Study takeaway

- Lax: same-site plus many top-level navigations, blocks many cross-site background/form cases, common practical default.

## S-042 — Quick comparison: None

### Near-literal visible content

- None sends in cross-site contexts, is required for true third-party use, must be paired with Secure, and provides the weakest SameSite-based CSRF protection.

### Study takeaway

- None sends in cross-site contexts, is required for true third-party use, must be paired with Secure, and provides the weakest SameSite-based CSRF protection.

## S-043 — Concrete SameSite cookie

### Near-literal visible content

- Example session cookie is Secure and HttpOnly.
- The following sources compare whether it is sent under Strict, Lax, and None.

### Visible code

```csharp
Set-Cookie: session_id=abc123; Secure; HttpOnly; SameSite=Strict
```

### Study takeaway

- The following sources compare whether it is sent under Strict, Lax, and None.

## S-044 — Case A: navigation within the bank

### Near-literal visible content

- Request to the bank from the bank's own context:
- Strict is sent.
- Lax is sent.
- None is sent.

### Visible code

```csharp
GET https://bank.example/account
```

### Study takeaway

- None is sent.

## S-045 — Cross-site form versus top-level link

### Near-literal visible content

- Case B: an evil site auto-submits a cross-site POST to the bank—Strict not sent, Lax usually not sent, None sent.
- Case C: the user clicks a normal top-level link from another site—Strict often not sent, Lax usually sent, None sent.
- This is the practical distinction most users notice.

### Study takeaway

- This is the practical distinction most users notice.

## S-046 — Typical Priority use

### Near-literal visible content

- A session/auth cookie may use High priority.
- Analytics or less important preference cookies may use Low priority.
- Priority is a browser storage-management hint, not an authentication mechanism.

### Study takeaway

- Priority is a browser storage-management hint, not an authentication mechanism.

## S-047 — Priority semantics

### Near-literal visible content

- Priority hints which cookies the browser should retain when cookie storage is crowded.
- Typical values are Low, Medium, and High.
- It does not affect normal sending behavior.

### Study takeaway

- It does not affect normal sending behavior.

## S-048 — Partition key

### Near-literal visible content

- The partition key identifies the top-level-site context.
- Example: a page on `news.com` embeds `widget.example`; a partitioned widget cookie is associated with `news.com` as the top-level site.
- The browser can store separate widget cookies for news.com, shop.com, and forum.com.

### Study takeaway

- The browser can store separate widget cookies for news.com, shop.com, and forum.com.

## S-049 — What “site” means for partitioning

### Near-literal visible content

- For partitioning, the key is the top-level site the user is visiting, not just the cookie's own domain.
- Conceptually storage becomes `(top-level site, cookie domain, path, name)` instead of only `(cookie domain, path, name)`.

### Study takeaway

- Conceptually storage becomes `(top-level site, cookie domain, path, name)` instead of only `(cookie domain, path, name)`.

## S-050 — Why partitioning exists

### Near-literal visible content

- Without partitioning, a third-party domain could reuse one cookie across many websites and track a user.
- With partitioning, the embedded third party can maintain state inside one top-level site but cannot reuse the same cookie across unrelated top-level sites.

### Study takeaway

- With partitioning, the embedded third party can maintain state inside one top-level site but cannot reuse the same cookie across unrelated top-level sites.

## S-051 — Partitioned attribute

### Near-literal visible content

- `Partitioned` stores the cookie in a separate jar per top-level site instead of one shared jar across all sites.
- It is mainly intended for embedded third-party content.

### Visible code

```csharp
Set-Cookie: widget_session=...; Secure; SameSite=None; Partitioned
```

### Study takeaway

- It is mainly intended for embedded third-party content.

## S-052 — Cookie request omits attributes

### Near-literal visible content

- When a cookie is sent in a request, the browser sends only the name/value pair.
- Attributes such as Path, Secure, HttpOnly, SameSite, Partitioned, and Priority are browser-side storage/sending rules and are not echoed in the Cookie header.

### Visible code

```csharp
Set-Cookie: session_id=abc123; Path=/; Secure; HttpOnly; SameSite=Lax

Cookie: session_id=abc123
```

### Study takeaway

- Attributes such as Path, Secure, HttpOnly, SameSite, Partitioned, and Priority are browser-side storage/sending rules and are not echoed in the Cookie header.

## S-053 — Same response/request distinction

### Near-literal visible content

- The server originally sets the cookie with attributes.
- The later request contains only `Cookie: session_id=abc123`.

### Study takeaway

- The later request contains only `Cookie: session_id=abc123`.

## S-054 — HttpOnly nuance

### Near-literal visible content

- HttpOnly does not magically stop every XSS impact.
- Malicious JavaScript cannot read an HttpOnly value through document.cookie, but may still issue authenticated requests from the compromised page.
- HttpOnly mainly reduces direct token theft.
- A common safer pattern is an HttpOnly, Secure, SameSite refresh token plus a short-lived access token kept in memory.

### Study takeaway

- A common safer pattern is an HttpOnly, Secure, SameSite refresh token plus a short-lived access token kept in memory.

## S-055 — Why refresh tokens are sensitive

### Near-literal visible content

- Access tokens are often short-lived; refresh tokens can mint new access tokens.
- Stealing a refresh token can enable persistent access.
- An HttpOnly refresh token is still sent automatically by the browser, but JavaScript cannot directly read/exfiltrate its value.

### Study takeaway

- An HttpOnly refresh token is still sent automatically by the browser, but JavaScript cannot directly read/exfiltrate its value.

## S-056 — Non-HttpOnly refresh-token theft

### Near-literal visible content

- If a refresh token is readable through document.cookie, injected JavaScript can steal and send it to an attacker.
- The attacker may repeatedly mint new access tokens.

### Visible code

```csharp
const stolen = document.cookie;
// attacker sends it away
```

### Study takeaway

- The attacker may repeatedly mint new access tokens.

## S-057 — Why not store refresh tokens in non-HttpOnly cookies

### Near-literal visible content

- A non-HttpOnly cookie is readable by JavaScript.
- An XSS payload can read the token with `document.cookie` and exfiltrate it.
- That is why long-lived refresh tokens should not normally be stored in script-readable cookies.

### Study takeaway

- That is why long-lived refresh tokens should not normally be stored in script-readable cookies.

## S-058 — Partitioned third-party cookie meaning

### Near-literal visible content

- The cookie still belongs to the third-party domain.
- The browser stores it separately for each top-level site.
- Different top-level sites do not reuse one shared cookie.

### Study takeaway

- Different top-level sites do not reuse one shared cookie.

## S-059 — Who receives a third-party cookie

### Near-literal visible content

- The browser does not send `tracker.example`'s cookie to `news.com`.
- `news.com` receives cookies for news.com.
- `tracker.example` receives its own cookies when contacted from inside the news.com page.

### Study takeaway

- `tracker.example` receives its own cookies when contacted from inside the news.com page.

## S-060 — Later third-party request

### Near-literal visible content

- When the browser later requests `tracker.example` again from the page, it may send the third-party cookie back to tracker.example if browser rules permit.
- The cookie goes to the third-party domain, not to the top-level site.

### Visible code

```csharp
Cookie: id=user-789
```

### Study takeaway

- The cookie goes to the third-party domain, not to the top-level site.

## S-061 — Third party sets its own cookie

### Near-literal visible content

- A response from `tracker.example` may contain a Set-Cookie header.
- The browser stores that cookie for tracker.example even though the user is currently on news.com.

### Visible code

```csharp
Set-Cookie: id=user-789; SameSite=None; Secure
```

### Study takeaway

- The browser stores that cookie for tracker.example even though the user is currently on news.com.

## S-062 — Page includes third-party resources

### Near-literal visible content

- The top-level page may embed a third-party script, image, or iframe.
- That causes the browser to make requests to the third-party domain.

### Visible code

```csharp
<script src="https://tracker.example/pixel.js"></script>
<img src="https://tracker.example/pixel">
<iframe src="https://chat.example/widget"></iframe>
```

### Study takeaway

- That causes the browser to make requests to the third-party domain.

## S-063 — Top-level page loads

### Near-literal visible content

- The user first opens the top-level site, for example `https://news.com`.
- If another embedded domain sets a cookie, that cookie belongs to that other domain and is third-party in this context.

### Study takeaway

- If another embedded domain sets a cookie, that cookie belongs to that other domain and is third-party in this context.

## S-064 — Top-level site and subrequests

### Near-literal visible content

- While on news.com, the browser can also request ads.example, cdn.example, video.example, and tracker.example.
- Those are separate origins/domains contacted from within the top-level page.

### Study takeaway

- Those are separate origins/domains contacted from within the top-level page.

## S-065 — Definition of a third-party cookie

### Near-literal visible content

- A third-party cookie belongs to a different domain than the top-level page and participates through embedded third-party requests.

### Study takeaway

- A third-party cookie belongs to a different domain than the top-level page and participates through embedded third-party requests.

## S-066 — CORS does not override SameSite

### Near-literal visible content

- Even if ASP.NET Core CORS allows an origin and the client uses credentials, Lax or Strict can still prevent the cookie from being attached to a cross-site XHR/fetch request.
- CORS and cookie attachment are separate browser decisions.

### Study takeaway

- CORS and cookie attachment are separate browser decisions.

## S-067 — Different controls in cross-origin cookie auth

### Near-literal visible content

- CORS decides whether the browser may make the cross-origin request and expose the response to JavaScript.
- SameSite decides whether the browser may attach the cookie.
- For cross-origin SPA/API auth, the client must send credentials, the server must allow credentialed CORS for the exact origin, and the cookie usually needs SameSite=None plus Secure.
- Lax mainly helps top-level navigations, not general cross-site background requests.

### Study takeaway

- Lax mainly helps top-level navigations, not general cross-site background requests.

## S-068 — ASP.NET Core example: SameSite and CORS

### Near-literal visible content

- Cookie configuration and CORS configuration are independent.
- Allowing an origin with credentials does not make a Lax cookie attach to a cross-site fetch.

### Visible code

```csharp
options.Cookie.SameSite = SameSiteMode.None;
options.Cookie.SecurePolicy = CookieSecurePolicy.Always;

policy.WithOrigins("https://frontend.example.com")
      .AllowCredentials();
```

### Study takeaway

- Allowing an origin with credentials does not make a Lax cookie attach to a cross-site fetch.

## S-069 — Detailed Lax behavior

### Near-literal visible content

- Lax mainly reduces CSRF while allowing many normal top-level link navigations.
- It is generally not sent on cross-site fetch/XHR, iframes, or auto-submitted POST forms.
- It may be sent on top-level navigation with a safe method such as GET.
- `Lax + CORS` does not mean the cookie is included in a cross-site XHR.

### Study takeaway

- `Lax + CORS` does not mean the cookie is included in a cross-site XHR.

## S-070 — Multiple schemes, environments, and debugging

### Near-literal visible content

- Multiple authentication schemes on one app need distinct cookie names.
- Dev/staging/prod on the same host or overlapping paths can collide unless names/paths differ.
- Unique names make DevTools debugging clearer.

### Study takeaway

- Unique names make DevTools debugging clearer.

## S-071 — Why set Cookie.Name

### Near-literal visible content

- Using the default name across multiple apps or schemes on the same domain can cause one app to overwrite another cookie.
- Distinct names avoid collisions and make ownership obvious.

### Study takeaway

- Distinct names avoid collisions and make ownership obvious.

## S-072 — Events and ticket storage

### Near-literal visible content

- `CookieAuthenticationEvents` provides hooks such as validation, redirect-to-login, redirect-to-access-denied, and signing in.
- `SessionStore` can place the authentication ticket in a server-side store so the cookie contains only a key.

### Study takeaway

- `SessionStore` can place the authentication ticket in a server-side store so the cookie contains only a key.

## S-073 — Lifetime and renewal

### Near-literal visible content

- `ExpireTimeSpan` controls authentication-ticket lifetime.
- `SlidingExpiration` refreshes the ticket near expiry while the user remains active.
- `Cookie.MaxAge` affects the browser cookie layer, but sign-in persistence is commonly controlled through authentication properties such as `IsPersistent`.

### Study takeaway

- `Cookie.MaxAge` affects the browser cookie layer, but sign-in persistence is commonly controlled through authentication properties such as `IsPersistent`.

## S-074 — CookieAuthenticationOptions paths

### Near-literal visible content

- Common handler paths include LoginPath, LogoutPath, and AccessDeniedPath.
- `ReturnUrlParameter` controls the return URL query parameter.
- These configure authentication behavior, not just browser attributes.

### Study takeaway

- These configure authentication behavior, not just browser attributes.

## S-075 — Advanced cookie-auth controls

### Near-literal visible content

- Advanced options include `TicketDataFormat`, `DataProtectionProvider`, `ClaimsIssuer`, `ReturnUrlParameter`, `ExpireTimeSpan`, `SlidingExpiration`, and `SessionStore`.
- Framework defaults may provide values when these are not explicitly set.

### Study takeaway

- Framework defaults may provide values when these are not explicitly set.

## S-076 — Mapping AddCookie to Response.Cookies.Append

### Near-literal visible content

- `options.Cookie.Name`, Path, Domain, HttpOnly, SameSite, SecurePolicy, and IsEssential roughly map to the corresponding CookieOptions attributes used by Append.
- Authentication expiration and ticket persistence are not identical to browser-cookie `Expires`/`MaxAge`.

### Study takeaway

- Authentication expiration and ticket persistence are not identical to browser-cookie `Expires`/`MaxAge`.

## S-077 — What CookieOptions can set

### Near-literal visible content

- Common CookieOptions values include Path, Domain, HttpOnly, Secure, SameSite, Expires/MaxAge, and IsEssential.
- Some runtime versions also expose extensions/custom attributes and Priority.

### Study takeaway

- Some runtime versions also expose extensions/custom attributes and Priority.

## S-078 — Plain Response.Cookies.Append example

### Near-literal visible content

- A normal application cookie can be emitted directly from the response with CookieOptions.

### Visible code

```csharp
Response.Cookies.Append(
    "MyApp.Preference",
    "dark",
    new CookieOptions
    {
        Path = "/",
        Domain = null,
        HttpOnly = true,
        Secure = true,
        SameSite = SameSiteMode.Lax,
        IsEssential = true,
        Expires = DateTimeOffset.UtcNow.AddDays(30)
    });
```

### Study takeaway

- A normal application cookie can be emitted directly from the response with CookieOptions.

## S-079 — Auth cookie attributes

### Near-literal visible content

- Auth-cookie browser attributes are configured through `options.Cookie`: Name, Domain, Path, HttpOnly, SecurePolicy, SameSite, IsEssential, and sometimes MaxAge/Expiration.
- Persistence is usually selected during sign-in rather than by only setting a cookie expiration field.

### Study takeaway

- Persistence is usually selected during sign-in rather than by only setting a cookie expiration field.

## S-080 — Handler-level options

### Near-literal visible content

- CookieAuthenticationOptions also controls LoginPath, AccessDeniedPath, LogoutPath, ExpireTimeSpan, SlidingExpiration, Events, and SessionStore.
- These are authentication-handler behaviors rather than simple Set-Cookie attributes.

### Study takeaway

- These are authentication-handler behaviors rather than simple Set-Cookie attributes.

## S-081 — AddCookie configuration example

### Near-literal visible content

- AddCookie configures both authentication-handler behavior and the cookie builder for the authentication ticket.

### Visible code

```csharp
builder.Services
    .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login";
        options.AccessDeniedPath = "/Account/Denied";
        options.ReturnUrlParameter = "returnUrl";
        options.ExpireTimeSpan = TimeSpan.FromDays(14);
        options.SlidingExpiration = true;

        options.Cookie.Name = "MyApp.Auth";
        options.Cookie.Path = "/";
        options.Cookie.Domain = null;
        options.Cookie.HttpOnly = true;
        options.Cookie.SameSite = SameSiteMode.Lax;
        options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
        options.Cookie.IsEssential = true;
    });
```

### Study takeaway

- AddCookie configures both authentication-handler behavior and the cookie builder for the authentication ticket.

## S-082 — AddCookie does not configure Append defaults

### Near-literal visible content

- `AddCookie(...)` configures the cookie-authentication handler and the auth cookie it issues.
- `Response.Cookies.Append(...)` is a separate low-level API.
- CookieOptions passed to Append do not inherit AddCookie settings automatically.

### Study takeaway

- CookieOptions passed to Append do not inherit AddCookie settings automatically.

## S-083 — Expiration, consent, and typical defaults

### Near-literal visible content

- `Expiration` on CookieBuilder is normally null unless configured; the system sets persistence when needed.
- `MaxAge` is also normally null.
- `IsEssential=false` means consent policy can block a non-essential cookie.
- Typical configurable values include Name, Path, Domain, HttpOnly, SecurePolicy, SameSite, IsEssential.

### Study takeaway

- Typical configurable values include Name, Path, Domain, HttpOnly, SecurePolicy, SameSite, IsEssential.

## S-084 — Cookie security-flag defaults

### Near-literal visible content

- HttpOnly defaults to true for auth cookies.
- SecurePolicy commonly defaults to SameAsRequest; possible values are Always, SameAsRequest, and None.
- SameSite commonly defaults to Lax; possible values include Lax, Strict, None, and Unspecified.
- SameSite=None normally requires Secure.

### Study takeaway

- SameSite=None normally requires Secure.

## S-085 — CookieBuilder identity and scope

### Near-literal visible content

- `Name` controls the browser cookie name.
- `Path` defaults to `/`.
- `Domain=null` creates a host-only cookie; specifying a domain can share the cookie with subdomains.

### Study takeaway

- `Domain=null` creates a host-only cookie; specifying a domain can share the cookie with subdomains.

## S-086 — CookiePolicy middleware ordering

### Near-literal visible content

- UseCookiePolicy does not inherit AddCookie options; it is a separate middleware layer that can adjust cookies as they are appended.
- Place it before middleware/endpoints that issue cookies.
- A common order is UseRouting, UseCookiePolicy, UseAuthentication, UseAuthorization, Map.

### Study takeaway

- A common order is UseRouting, UseCookiePolicy, UseAuthentication, UseAuthorization, Map.

## S-087 — Typical UseCookiePolicy configuration

### Near-literal visible content

- CookiePolicy can set a minimum SameSite policy, enforce HttpOnly/Secure policies, and inspect or override individual cookies in `OnAppendCookie`.
- A callback may upgrade SameSite=None cookies to Secure.

### Visible code

```csharp
app.UseCookiePolicy(new CookiePolicyOptions
{
    MinimumSameSitePolicy = SameSiteMode.Lax,
    HttpOnly = Microsoft.AspNetCore.CookiePolicy.HttpOnlyPolicy.Always,
    Secure = CookieSecurePolicy.Always,
    OnAppendCookie = ctx =>
    {
        if (ctx.CookieOptions.SameSite == SameSiteMode.None)
            ctx.CookieOptions.Secure = true;
    }
});
```

### Study takeaway

- A callback may upgrade SameSite=None cookies to Secure.

## S-088 — What UseCookiePolicy is for

### Near-literal visible content

- UseCookiePolicy adds middleware that can globally modify cookies while they are appended or deleted.
- It affects cookies written through Response.Cookies.Append, cookie authentication, antiforgery, temp data, and other cookie writers.
- Use it for global rules such as Secure-only in production, minimum SameSite, or consent requirements.

### Study takeaway

- Use it for global rules such as Secure-only in production, minimum SameSite, or consent requirements.

## S-089 — Which URI/domain receives a cookie

### Near-literal visible content

- A cookie is attached to later requests whose host/domain and path satisfy the Set-Cookie attributes.
- Example: a cookie from site.example with Path=/ can be sent to matching URLs such as `/profile` and `/orders/123`.

### Visible code

```csharp
Set-Cookie: session_id=abc123; Path=/; HttpOnly; Secure
```

### Study takeaway

- Example: a cookie from site.example with Path=/ can be sent to matching URLs such as `/profile` and `/orders/123`.

## S-090 — Path matching

### Near-literal visible content

- A cookie with `Path=/account` is sent to matching paths such as `/account/me`.
- It is not sent to unrelated paths such as `/profile`.
- Because `Path=/` is broad, it matches nearly every path on the host.

### Visible code

```csharp
Set-Cookie: session_id=abc123; Path=/account

https://site.example/account/me   // matches
https://site.example/profile      // does not match
```

### Study takeaway

- Because `Path=/` is broad, it matches nearly every path on the host.
