# Corrected semantic transcript — antiforgerytoken v002

Authoritative source: `source/antiforgerytoken.svg`  
Coverage: **58 screenshots + 51 native SVG labels**

The previous transcript used only canvas text. This version incorporates all recovered screenshots.

## 1. CSRF and the token pair

CSRF is possible because a browser automatically attaches a site's authentication cookie when a request is sent to that site. An attacker may cause the request without being able to read the response.

ASP.NET Core antiforgery normally validates two linked values:

```text
cookie token
request token
```

The cookie can be attached automatically, but an attacker cannot normally read a trusted page to obtain the matching request token. Validation also considers the current user/security context and any configured additional data.

A failed check normally produces `400 Bad Request`, not `401` or `403`.

## 2. Razor forms

The form tag helper or `@Html.AntiForgeryToken()` renders a hidden field:

```html
<input
  name="__RequestVerificationToken"
  type="hidden"
  value="..." />
```

Controller validation:

```csharp
[HttpPost]
[ValidateAntiForgeryToken]
public IActionResult Edit(ProductEditVm model)
{
    return Ok();
}
```

`AutoValidateAntiforgeryToken` is suitable as a global MVC filter because it validates unsafe HTTP methods while skipping safe methods such as GET, HEAD, OPTIONS and TRACE.

## 3. AJAX and SPA requests

JavaScript may read the hidden token and send it in the configured request header:

```javascript
const token = document.querySelector(
  'input[name="__RequestVerificationToken"]'
).value;

await fetch("/Products/EditAjax", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "RequestVerificationToken": token
  },
  body: JSON.stringify({ id: 5, name: "New name" })
});
```

Form-encoded AJAX can submit the hidden input as normal form data instead.

Protect state-changing cookie-authenticated requests such as POST, PUT, PATCH, DELETE and logout/session mutations.

## 4. Fetching a token for an SPA

A same-origin endpoint can call `IAntiforgery.GetAndStoreTokens` and expose the request token to JavaScript through a readable cookie or JSON response:

```csharp
app.MapGet("/antiforgery/token",
    (IAntiforgery antiforgery, HttpContext context) =>
{
    var tokens = antiforgery.GetAndStoreTokens(context);

    context.Response.Cookies.Append(
        "XSRF-TOKEN",
        tokens.RequestToken!,
        new CookieOptions
        {
            HttpOnly = false,
            Secure = true,
            SameSite = SameSiteMode.Strict
        });

    return Results.Ok();
});
```

The exact cookie/header convention is application-specific. Keep this endpoint same-origin and do not expose it through broad credentialed CORS.

## 5. Login/logout and stale tokens

A practical SPA policy is:

```text
fetch at startup/page refresh
fetch after login
fetch after logout
fetch after an auth/session refresh that changes user or cookie context
optionally refresh before rare critical writes
```

An anonymous token may fail after login, and an authenticated token may fail after logout.

## 6. Cross-tab failure

Tabs share site cookies but retain their own page-rendered request tokens.

```text
Tab A: cookie C1 + request token R1
Tab B changes auth/session state
browser/server now uses cookie C2
Tab A submits old R1
C2 + R1 fail pair validation
```

Multiple tabs are not forbidden; the failure is caused by a stale request token paired with the current shared cookie token.

Use a recognizable antiforgery-failure response, refetch once and retry at most once. Avoid implicit endless refresh/retry loops.

## 7. CORS, Origin and SameSite

Antiforgery does not repair unsafe credentialed CORS. Do not allow hostile origins to make credentialed requests and read token responses.

`SameSite` cookies and optional Origin/Referer checks are defense in depth, not replacements for antiforgery validation.

## 8. Filters and manual validation

Built-in attributes are filter factories that create authorization filters early in the MVC pipeline.

Manual validation can be performed in a resource filter:

```csharp
try
{
    await antiforgery.ValidateRequestAsync(context.HttpContext);
    await next();
}
catch (AntiforgeryValidationException)
{
    context.Result = new ObjectResult(new ProblemDetails
    {
        Title = "Antiforgery validation failed",
        Status = StatusCodes.Status400BadRequest,
        Type = "https://example.com/problems/antiforgery-failed"
    })
    {
        StatusCode = StatusCodes.Status400BadRequest
    };
}
```

A custom always-run result filter may rewrite `AntiforgeryValidationFailedResult` into stable JSON or add a marker such as:

```http
X-Antiforgery-Error: invalid
```

This lets the SPA distinguish antiforgery `400` from ordinary model/request `400`.

Exception filters do not normally catch failures from the earlier authorization-filter phase. A resource filter can catch validation it performs itself, while outer exception middleware can handle unhandled exceptions escaping MVC.

## 9. Opt-out

A deliberate endpoint can use:

```csharp
[IgnoreAntiforgeryToken]
```

Do not combine global automatic validation and a custom global manual validator unless duplicate validation is intentional.

## Coverage

```text
unique screenshots: 58
image uses: 58
native labels: 51
duplicate placements: 0
remaining image/text items: 0
```
