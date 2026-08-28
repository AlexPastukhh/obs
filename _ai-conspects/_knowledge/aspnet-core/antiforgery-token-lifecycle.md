# ASP.NET Core antiforgery token lifecycle

Knowledge ID: `aspnet-core.antiforgery-token-lifecycle`

Topic: `aspnet-core`

CSRF exploits automatic auth-cookie attachment. ASP.NET Core validates linked cookie/request tokens plus user/context data; failure is normally 400. Razor emits `__RequestVerificationToken`; `[ValidateAntiForgeryToken]` validates actions, and global `AutoValidateAntiforgeryToken` covers unsafe methods while skipping safe methods.

SPAs can obtain a same-origin request token through `IAntiforgery.GetAndStoreTokens`, expose it through an application-defined readable cookie or JSON response, and send it using the configured header:

```csharp
var tokens = antiforgery.GetAndStoreTokens(context);
context.Response.Cookies.Append(
    "XSRF-TOKEN",
    tokens.RequestToken!,
    new CookieOptions {
        HttpOnly = false,
        Secure = true,
        SameSite = SameSiteMode.Strict
    });
```

```js
await fetch("/Products/EditAjax", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "RequestVerificationToken": token
  },
  body: JSON.stringify(model)
});
```

Refresh after login/logout/session changes. Cross-tab failure has a concrete sequence:

```text
Tab A renders cookie C1 + request token R1
Tab B changes authentication/session state
the shared browser cookie becomes C2
Tab A submits stale R1 with C2
C2 + R1 fail pair validation
```

The cookie token and request token are related but not interchangeable. Sending the cookie token itself as the header value is not the intended protocol. The header alone also does not prove a trusted origin: the defense relies on an attacker being unable to read the trusted origin's request token while the browser supplies the paired cookie automatically.

For an SPA, cache the returned request token in process memory or a non-persisted query store and fetch it with `credentials: "include"`. Persistent `localStorage`/`sessionStorage` increases its exposure under XSS. Unsafe requests send the configured header while the browser sends both auth and antiforgery cookies.

Recognize the antiforgery response, refetch once, and retry at most once; never create an implicit endless retry loop.

Do not expose token endpoints through broad credentialed CORS. SameSite and Origin/Referer are defense in depth. Manual resource-filter validation can return stable Problem Details; result filters can mark built-in failures. Exception filters do not normally catch earlier authorization-filter failures. Use `[IgnoreAntiforgeryToken]` deliberately and avoid duplicate global validation.

## Sources
- Workspace: `_ai-conspects/antiforgerytoken/`
- Processed source: `02-corrected-semantic-transcript-v002.md`, complete corrected transcript
- Workspace: `_ai-conspects/cookie auth, antiforgery/`
- Authoritative processed source: `regions/R03-spa-antiforgery-and-cookie-policy.md`
- Original SVG: `source/cookie auth, antiforgery.svg`
