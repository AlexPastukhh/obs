# Google reCAPTCHA v2/v3 — source-preserving transcript v003

Generated: 2026-07-02

## Coverage

```text
unique embedded screenshots: 76
image placements: 77
duplicate placements: 1
native SVG text nodes: 537
non-empty SVG text nodes: 432
source-preserving unique blocks: 76
duplicate placement records: 1
uncovered placements: 0
```

## Relationship to v002

`regions/full-svg-reconciliation-v002.md` remains a concise thematic overview.

It is superseded as the detailed authoritative transcript because it compressed the full SVG into four summary regions. This v003 file preserves screenshot-level material for repetition and question generation.

## Duplicate placement

```text
S-067 is an exact duplicate placement of S-015.
Both point to the same embedded PNG content.
No second transcript is invented for the duplicate.
```



---

# Core concepts, keys, verification flow, and security

Generated: 2026-07-02

## Transcript policy

- Every unique embedded screenshot has one source block.
- Visible C#, Razor, JavaScript, JSX, JSON, routes, field names, actions, and thresholds are retained.
- Cropped screenshots are explicitly marked.
- Explanation is separated from the normalized source layer.
- Every source includes recall questions.

## S-001 — What reCAPTCHA is for

**Known limits:** none

### Near-literal normalized transcript

Typical uses:

- stop form spam on contact forms and newsletter signup;
- slow down credential stuffing and brute force on login;
- protect registration and password-reset endpoints;
- reduce abuse such as comment spam and scraping.

reCAPTCHA is not authentication and is not a security silver bullet. Rate limiting, lockouts, validation, and normal security controls are still required.

### Study meaning

reCAPTCHA is an abuse-signal layer around public endpoints, not a replacement for identity, authorization, or request throttling.

### Recall questions

1. Name four endpoint types protected in the source.
2. Why is reCAPTCHA not authentication?
3. Which controls must still exist?


---

## S-002 — Bot protection and the two keys

**Known limits:** none

### Near-literal normalized transcript

Google reCAPTCHA is a bot-protection system placed on public forms such as registration, login, contact, and password reset.

Two keys are used:

- **Site key:** public; used in the browser to render or execute reCAPTCHA.
- **Secret key:** private; used only on the server to verify the user's token with Google.

### Study meaning

The site key enables client integration. The secret key establishes trusted server-to-Google verification.

### Recall questions

1. Which key may be exposed to the browser?
2. Which key must remain server-side?
3. What does the server verify with Google?


---

## S-003 — Security best practices

**Known limits:** none

### Near-literal normalized transcript

Best practices:

- always verify server-side;
- bind the token to context: v3 action, and the intended v2 flow;
- add rate limiting and lockouts;
- do not reveal detailed “bot detected” versus “email exists” information on sensitive forms;
- keep the secret key out of source control, using environment variables or a secrets vault.

### Study meaning

Token verification must be combined with abuse controls and information-disclosure discipline.

### Recall questions

1. Where must verification occur?
2. What v3 field binds a token to an operation?
3. Why avoid overly specific failure messages?
4. Where should the secret key live?


---

## S-004 — Quick reCAPTCHA v3 differences

**Known limits:** none

### Near-literal normalized transcript

For v3:

```js
grecaptcha.execute(siteKey, { action: "register" })
```

returns a token.

The server verifies the token and checks:

```text
success == true
score >= threshold
action == "register"
```

The action check prevents reuse of a token generated for another page or operation.

### Study meaning

v3 is invisible and score-based. A successful verification response alone is insufficient; action and score are part of the decision.

### Recall questions

1. How is a v3 token requested?
2. Which three server checks are listed?
3. What attack does the action check reduce?


---

## S-017 — Where site and secret keys belong

**Known limits:** none

### Near-literal normalized transcript

- Site key: safe to expose in HTML or JavaScript; still keep it in configuration for easy replacement.
- Secret key: never place it in HTML, JavaScript, or the repository.
- Development secret: User Secrets.
- Production secret: environment variables, Azure Key Vault, AWS Secrets Manager, or another secrets provider.
- Load keys through `IConfiguration`.

### Study meaning

The public/private key split is a trust-boundary rule, not merely a deployment preference.

### Recall questions

1. Which key is browser-visible?
2. Name three production secret stores.
3. Which .NET abstraction loads the values?


---

## S-018 — Complete verification flow

**Known limits:** none

### Near-literal normalized transcript

1. Browser renders reCAPTCHA with the site key.
2. The user completes the challenge, or v3 scores the interaction.
3. The browser receives a token, often named `g-recaptcha-response`.
4. The form sends the token to the application server.
5. The server sends token plus secret to Google's verification endpoint.
6. Google returns valid/invalid information and, for v3, score and action.
7. The application accepts or rejects the request.

Client-side checks alone are meaningless; server verification is mandatory.

### Study meaning

The token is untrusted client input until the server verifies it with the secret.

### Recall questions

1. List the seven steps in order.
2. At which step does the secret key participate?
3. Why are client-only checks insufficient?


---

# ASP.NET Core v2 controller, service, configuration, and Razor

Generated: 2026-07-02

## Transcript policy

- Every unique embedded screenshot has one source block.
- Visible C#, Razor, JavaScript, JSX, JSON, routes, field names, actions, and thresholds are retained.
- Cropped screenshots are explicitly marked.
- Explanation is separated from the normalized source layer.
- Every source includes recall questions.

## S-005 — Minimal v2 controller POST

**Known limits:** none

### Near-literal normalized transcript

```csharp
[HttpPost]
[ValidateAntiForgeryToken]
public async Task<IActionResult> Register(RegisterVm vm)
{
    var token = Request.Form["g-recaptcha-response"].ToString();
    var ip = HttpContext.Connection.RemoteIpAddress?.ToString();

    var ok = await _recaptcha.VerifyV2Async(token, ip);
    if (!ok)
    {
        ModelState.AddModelError("", "reCAPTCHA failed. Please try again.");
        ViewBag.RecaptchaSiteKey = _config["Recaptcha:SiteKey"];
        return View(vm);
    }

    // reCAPTCHA passed -> proceed with registration
    return RedirectToAction("RegisterSuccess");
}
```

The source calls this a correct minimal v2 checkbox integration.

### Study meaning

The POST action extracts Google's form token, verifies it on the server, restores view data after failure, and only then continues registration.

### Recall questions

1. Which form field contains the v2 token?
2. Why is the site key restored before returning the failed view?
3. Where does remote IP come from?
4. What must happen before user creation?


---

## S-006 — AccountController dependencies and GET action

**Known limits:** none

### Near-literal normalized transcript

```csharp
public class AccountController : Controller
{
    private readonly IRecaptchaVerifier _recaptcha;
    private readonly IConfiguration _config;

    public AccountController(
        IRecaptchaVerifier recaptcha,
        IConfiguration config)
    {
        _recaptcha = recaptcha;
        _config = config;
    }

    [HttpGet]
    public IActionResult Register()
    {
        ViewBag.RecaptchaSiteKey =
            _config["Recaptcha:SiteKey"];
        return View();
    }
}
```

### Study meaning

The controller receives a verifier and configuration through DI. The GET action passes only the public site key to the view.

### Recall questions

1. Which two dependencies are injected?
2. Which key is sent to the Razor view?
3. Why is the secret key absent?


---

## S-007 — RegisterVm and g-recaptcha-response binding

**Known limits:** none

### Near-literal normalized transcript

```csharp
public class RegisterVm
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";

    public string? g_recaptcha_response { get; set; }
}
```

The source warns that the actual HTML field name is:

```text
g-recaptcha-response
```

with dashes. Reading it directly from `Request.Form` is the simplest option unless custom binding is configured.

### Study meaning

C# identifiers cannot contain dashes, so automatic model binding requires explicit mapping or direct form access.

### Recall questions

1. What is Google's exact form-field name?
2. Why does the shown property use underscores?
3. What simpler extraction method is recommended?


---

## S-008 — Register the verifier with HttpClient

**Known limits:** none

### Near-literal normalized transcript

```csharp
builder.Services.AddHttpClient<
    IRecaptchaVerifier,
    GoogleRecaptchaVerifier>();
```

### Study meaning

Typed HttpClient registration supplies the verifier with a managed HttpClient and makes the interface injectable.

### Recall questions

1. Which interface is registered?
2. Which implementation fulfills it?
3. Why use AddHttpClient instead of manually constructing HttpClient?


---

## S-009 — VerifyV2Async response handling

**Known limits:** cropped continuation of the service method; all visible statements are preserved

### Near-literal normalized transcript

Visible continuation of the verification method:

```csharp
using var content = new FormUrlEncodedContent(data);

using var resp = await _http.PostAsync(
    "https://www.google.com/recaptcha/api/siteverify",
    content);

resp.EnsureSuccessStatusCode();

var json = await resp.Content.ReadAsStringAsync();
var result =
    JsonSerializer.Deserialize<RecaptchaVerifyResponse>(json);

return result?.success == true;
```

### Study meaning

The service sends a form-encoded request to Google's `siteverify` endpoint, parses the JSON response, and returns true only for a successful response.

### Recall questions

1. Which endpoint receives verification requests?
2. What content type shape is used?
3. What final expression decides success?


---

## S-010 — VerifyV2Async request construction

**Known limits:** method continues in S-009

### Near-literal normalized transcript

```csharp
public async Task<bool> VerifyV2Async(
    string token,
    string? remoteIp = null)
{
    if (string.IsNullOrWhiteSpace(token))
        return false;

    var secret = _config["Recaptcha:SecretKey"];
    if (string.IsNullOrWhiteSpace(secret))
        throw new InvalidOperationException(
            "Recaptcha:SecretKey is not configured.");

    var data = new Dictionary<string, string>
    {
        ["secret"] = secret,
        ["response"] = token
    };

    if (!string.IsNullOrWhiteSpace(remoteIp))
        data["remoteip"] = remoteIp;
```

### Study meaning

The verifier rejects an empty token, fails fast when server configuration is missing, and sends `remoteip` only when a trustworthy value is available.

### Recall questions

1. What happens for an empty token?
2. What happens for a missing secret?
3. Which two fields are always sent?
4. When is remoteip included?


---

## S-011 — Verifier interface and implementation constructor

**Known limits:** none

### Near-literal normalized transcript

```csharp
public interface IRecaptchaVerifier
{
    Task<bool> VerifyV2Async(
        string token,
        string? remoteIp = null);
}

public class GoogleRecaptchaVerifier : IRecaptchaVerifier
{
    private readonly HttpClient _http;
    private readonly IConfiguration _config;

    public GoogleRecaptchaVerifier(
        HttpClient http,
        IConfiguration config)
    {
        _http = http;
        _config = config;
    }
}
```

### Study meaning

The interface isolates controller code from Google's HTTP protocol. The implementation owns HTTP transport and configuration access.

### Recall questions

1. What method does the interface expose?
2. Which dependencies does the implementation receive?
3. What testability benefit does the interface provide?


---

## S-012 — Verification response DTO

**Known limits:** the source intentionally shows two alternative error-code property shapes; use one normalized DTO in implementation

### Near-literal normalized transcript

```csharp
public sealed class RecaptchaVerifyResponse
{
    public bool success { get; set; }
    public string[]? error_codes { get; set; }
    public List<string>? error_codes { get; set; }
    public double score { get; set; }      // v3 only
    public string? action { get; set; }    // v3 only
    public string? hostname { get; set; }
}
```

The screenshot notes that Google's JSON naming for error codes may need an exact serializer mapping.

### Study meaning

The DTO captures shared fields plus v3-only score and action. Production code should use one correctly attributed error-code property rather than both alternatives.

### Recall questions

1. Which fields are v3-only?
2. Which field identifies the verified host?
3. Why must the error-code JSON name be mapped carefully?


---

## S-013 — Configuration and secret storage

**Known limits:** none

### Near-literal normalized transcript

`appsettings.json` may contain the public site key and an empty placeholder for the secret:

```json
{
  "Recaptcha": {
    "SiteKey": "YOUR_SITE_KEY",
    "SecretKey": ""
  }
}
```

Development secret:

```bash
dotnet user-secrets set "Recaptcha:SecretKey" "YOUR_SECRET"
```

Production: use an environment variable or secrets manager.

### Study meaning

The configuration path is stable, but secret material should be supplied by a secure provider outside committed files.

### Recall questions

1. Which key can be stored openly?
2. How is the development secret set?
3. What should production use?


---

## S-014 — GET site key and submitted field name

**Known limits:** none

### Near-literal normalized transcript

Controller GET:

```csharp
public IActionResult Register()
{
    ViewBag.RecaptchaSiteKey =
        _config["Recaptcha:SiteKey"];
    return View();
}
```

On submit, the browser includes:

```text
g-recaptcha-response
```

as a string token.

### Study meaning

The GET path prepares client rendering. The POST path receives a token under Google's fixed field name.

### Recall questions

1. Where is the site key placed?
2. What field appears in the submitted form?
3. Is the submitted field the secret key?


---

## S-015 — Razor v2 checkbox form

**Known limits:** none

### Near-literal normalized transcript

```html
<script src="https://www.google.com/recaptcha/api.js"
        async defer></script>

<form asp-action="Register" method="post">
    <input type="email" name="Email" required />
    <input type="password" name="Password" required />

    <div class="g-recaptcha"
         data-sitekey="@ViewBag.RecaptchaSiteKey"></div>

    <button type="submit">Submit</button>
</form>
```

### Study meaning

The v2 script auto-renders an element with class `g-recaptcha`. Google adds the response token to form submission.

### Recall questions

1. Which script is loaded?
2. Which CSS class triggers the widget?
3. Where does the site key come from?
4. What HTTP method submits the form?


---

## S-016 — ASP.NET Core v2 implementation section

**Known limits:** none

### Near-literal normalized transcript

The source introduces ASP.NET Core Controller examples for reCAPTCHA v2 checkbox and states that v3 has three important differences.

### Study meaning

This is a boundary/header screenshot linking the v2 implementation to later v3 action and score handling.

### Recall questions

1. Which reCAPTCHA version is implemented first?
2. What architecture style is used?
3. What later section introduces three differences?


---

## S-068 — Repeated v2 POST integration screenshot

**Known limits:** none

### Near-literal normalized transcript

The source repeats the complete minimal v2 POST action:

- read `g-recaptcha-response`;
- read `RemoteIpAddress`;
- call `VerifyV2Async(token, ip)`;
- on failure add a generic ModelState error and restore the site key;
- on success continue registration and redirect.

It is explicitly labeled a correct minimal v2 checkbox integration.

### Study meaning

This unique screenshot repeats the same integration lesson as S-005 with a different crop/rendering and therefore remains a separate source item.

### Recall questions

1. Which token field is read?
2. What verifier method is called?
3. What must be restored on failure?


---

## S-069 — g-recaptcha-response reminder

**Known limits:** none

### Near-literal normalized transcript

On form submission, the browser includes:

```text
g-recaptcha-response
```

as a string token.

### Study meaning

This is the fixed v2 response field generated by Google's widget.

### Recall questions

1. What is the exact field name?
2. What value does it contain?


---

# React v2 checkbox: wrapper package and explicit render

Generated: 2026-07-02

## Transcript policy

- Every unique embedded screenshot has one source block.
- Visible C#, Razor, JavaScript, JSX, JSON, routes, field names, actions, and thresholds are retained.
- Cropped screenshots are explicitly marked.
- Explanation is separated from the normalized source layer.
- Every source includes recall questions.

## S-019 — React v2 options and backend reminder

**Known limits:** none

### Near-literal normalized transcript

For a React v2 checkbox:

- the backend verifies `recaptchaToken` with Google;
- require `success == true`;
- no v3 score or action check is used for a v2 checkbox.

Manual option:

- load `https://www.google.com/recaptcha/api.js`;
- render a `<div class="g-recaptcha" data-sitekey="..."></div>`;
- read the token through `window.grecaptcha.getResponse()`.

The source says the library approach is cleaner in React.

### Study meaning

React can use either a wrapper library or direct Google API calls, but the backend verification contract stays the same.

### Recall questions

1. Which v3 fields are absent from v2 checking?
2. How is a manual v2 token read?
3. Which approach is described as cleaner?


---

## S-020 — React v2 component markup

**Known limits:** cropped continuation; component setup appears in S-022

### Near-literal normalized transcript

Visible JSX continuation:

```jsx
return (
  <form onSubmit={onSubmit}>
    <input
      type="email"
      value={email}
      onChange={e => setEmail(e.target.value)}
      required
    />
    <input
      type="password"
      value={password}
      onChange={e => setPassword(e.target.value)}
      required
    />

    <ReCAPTCHA
      sitekey={SITE_KEY}
      ref={recaptchaRef}
    />

    <button type="submit">Register</button>
    <div>{status}</div>
  </form>
);
```

### Study meaning

The component keeps form state, renders the package widget, and uses a ref to read or reset the token.

### Recall questions

1. Which ref points to the widget?
2. Which two controlled inputs are shown?
3. Where is status rendered?


---

## S-021 — React v2 submit fetch and reset

**Known limits:** none

### Near-literal normalized transcript

```js
const resp = await fetch("/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email,
    password,
    recaptchaToken: token
  })
});

if (!resp.ok) {
  setStatus(await resp.text());
  recaptchaRef.current?.reset();
  return;
}

setStatus("Registered!");
```

The source notes that a token is effectively single-use/short-lived and should be reset after failure.

### Study meaning

The frontend sends the token as part of the registration payload and resets the widget when the attempt fails.

### Recall questions

1. What property carries the token?
2. What happens after a failed response?
3. Why is reset important?


---

## S-022 — React v2 package component setup

**Known limits:** component continues in S-021 and S-020

### Near-literal normalized transcript

```jsx
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY =
    import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export default function RegisterV2()
{
    const recaptchaRef = useRef(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");

    const onSubmit = async (e) =>
    {
        e.preventDefault();
        setStatus("");

        const token =
            recaptchaRef.current?.getValue();

        if (!token)
        {
            setStatus("Please complete reCAPTCHA.");
            return;
        }
```

### Study meaning

The package exposes imperative widget methods through a ref. Submission is delayed until a non-empty token exists.

### Recall questions

1. Where is the site key read from?
2. Which hook stores the widget reference?
3. Which method returns the token?
4. What happens when no token exists?


---

## S-023 — Install the React v2 package

**Known limits:** none

### Near-literal normalized transcript

```bash
npm i react-google-recaptcha
```

### Study meaning

The package provides a React component wrapper around Google's v2 widget.

### Recall questions

1. Which package is installed?
2. Which reCAPTCHA integration style does it support?


---

## S-024 — Backend checks for v2

**Known limits:** none

### Near-literal normalized transcript

After verifying with Google, the backend should check:

- `success == true`;
- optionally, `hostname` matches the intended domain;
- optionally, `challenge_ts` is not too old;
- handle Google/network errors;
- apply rate limiting.

### Study meaning

Google verification is one input to an application decision. Host, token age, failure handling, and throttling harden the endpoint.

### Recall questions

1. What is the mandatory v2 response check?
2. Which two optional contextual fields are listed?
3. What operational protection is still required?


---

## S-025 — React v2 auto-render style

**Known limits:** none

### Near-literal normalized transcript

Less-recommended React approach:

```html
<div class="g-recaptcha" data-sitekey="..."></div>
```

Load:

```text
https://www.google.com/recaptcha/api.js
```

Read on submit:

```js
const token = window.grecaptcha.getResponse();
```

React can re-render or remove the div unexpectedly, so explicit render is usually safer.

### Study meaning

Google's automatic DOM scanning can conflict with React's ownership of the same DOM subtree.

### Recall questions

1. What class triggers auto-render?
2. How is the token read?
3. Why can React make this fragile?


---

## S-026 — Why explicit render is better in React

**Known limits:** none

### Near-literal normalized transcript

Explicit render avoids React re-rendering problems and gives a `widgetId`.

That ID is useful for:

- multiple CAPTCHA instances;
- `getResponse(widgetId)`;
- `reset(widgetId)`.

### Study meaning

A stable widget ID disambiguates imperative calls and keeps Google rendering under explicit lifecycle control.

### Recall questions

1. What does explicit render return?
2. Name two methods that accept widgetId.
3. Why does widgetId matter with multiple widgets?


---

## S-027 — Manual React v2 form markup

**Known limits:** cropped continuation from the explicit-render example

### Near-literal normalized transcript

Visible JSX continuation of the no-library example:

```jsx
return (
  <form onSubmit={onSubmit}>
    <input ... />
    <input ... />

    <div ref={captchaDivRef} />

    <button type="submit">Register</button>
    <div>{status}</div>
  </form>
);
```

### Study meaning

The component supplies an empty React-owned container that Google's explicit render call fills.

### Recall questions

1. Which ref identifies the render container?
2. What event handler submits the form?
3. Where is status displayed?


---

## S-028 — Manual React v2 POST and reset logic

**Known limits:** none

### Near-literal normalized transcript

```js
const resp = await fetch("/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email,
    password,
    recaptchaToken: token
  })
});

if (!resp.ok) {
  setStatus(await resp.text());

  if (widgetId !== null)
    window.grecaptcha.reset(widgetId);
  else
    window.grecaptcha.reset();

  return;
}

setStatus("Registered!");
```

### Study meaning

The explicit widget ID is used to reset exactly the rendered CAPTCHA after a rejected registration.

### Recall questions

1. What payload field contains the token?
2. Which reset call is preferred?
3. What fallback is shown?


---

## S-029 — Manual React v2 token retrieval

**Known limits:** none

### Near-literal normalized transcript

```js
const onSubmit = async (e) => {
  e.preventDefault();
  setStatus("");

  const widgetId = widgetIdRef.current;

  const token =
    widgetId !== null
      ? window.grecaptcha.getResponse(widgetId)
      : window.grecaptcha.getResponse();

  if (!token) {
    setStatus("Please complete reCAPTCHA.");
    return;
  }
```

### Study meaning

The component prefers widget-specific token retrieval but includes a global fallback.

### Recall questions

1. Where is widgetId stored?
2. Which API reads a widget-specific token?
3. What happens when the token is empty?


---

## S-030 — Manual React v2 explicit render lifecycle

**Known limits:** callbacks and component continuation are cropped

### Near-literal normalized transcript

```jsx
export default function RegisterV2NoLib() {
  const captchaDivRef = useRef(null);
  const widgetIdRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const src =
      "https://www.google.com/recaptcha/api.js?render=explicit";

    loadScript(src).then(() => {
      window.grecaptcha.ready(() => {
        if (widgetIdRef.current !== null)
          return;

        widgetIdRef.current =
          window.grecaptcha.render(
            captchaDivRef.current,
            {
              sitekey: SITE_KEY,
              theme: "light"
            });
      });
    });
  }, []);
```

### Study meaning

The effect loads the explicit API once, waits for readiness, prevents duplicate rendering, and stores the widget ID.

### Recall questions

1. Which query parameter requests explicit rendering?
2. What prevents rendering twice?
3. Where is the widget ID stored?
4. What theme is shown?


---

## S-031 — Manual React v2 script loader

**Known limits:** none

### Near-literal normalized transcript

```js
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing =
      document.querySelector(`script[src="${src}"]`);

    if (existing)
      return resolve();

    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.defer = true;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}
```

### Study meaning

The loader prevents duplicate script elements and exposes asynchronous success/failure to the React effect.

### Recall questions

1. How is an existing script detected?
2. Which two loading attributes are enabled?
3. How are load errors reported?


---

# ASP.NET Core v3 Razor flow and verification

Generated: 2026-07-02

## Transcript policy

- Every unique embedded screenshot has one source block.
- Visible C#, Razor, JavaScript, JSX, JSON, routes, field names, actions, and thresholds are retained.
- Cropped screenshots are explicitly marked.
- Explanation is separated from the normalized source layer.
- Every source includes recall questions.

## S-032 — v3 backend requirements and score policy

**Known limits:** none

### Near-literal normalized transcript

Server checks for v3:

- `success == true`;
- `action == "register"`;
- `score >= threshold`, for example `0.5`;
- optionally, expected hostname;
- optionally, recent `challenge_ts`.

Recommended example decision strategy:

- score `>= 0.7`: allow;
- score `0.3–0.7`: allow with added friction such as email verification or rate limiting;
- score `< 0.3`: block or require a v2 challenge.

### Study meaning

A score should drive a risk policy rather than a universal binary rule. Thresholds must be tuned to the endpoint.

### Recall questions

1. Which action value is expected?
2. What sample threshold is shown?
3. What happens in the middle score range?
4. What fallback is proposed for low scores?


---

## S-033 — Razor v3 ViewModel and GET

**Known limits:** none

### Near-literal normalized transcript

```csharp
public class RegisterVm
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
    public string? RecaptchaToken { get; set; }
}

public IActionResult Register()
{
    ViewBag.RecaptchaSiteKey =
        _config["Recaptcha:SiteKey"];

    return View(new RegisterVm());
}
```

### Study meaning

The v3 token is carried through an explicit hidden ViewModel property rather than Google's v2 checkbox field.

### Recall questions

1. Which property holds the v3 token?
2. What does the GET action return?
3. Which key is passed through ViewBag?


---

## S-034 — Razor v3 form with hidden token

**Known limits:** none

### Near-literal normalized transcript

```cshtml
@model RegisterVm
@{
    var siteKey =
        (string)ViewBag.RecaptchaSiteKey;
}

<form id="registerForm"
      asp-action="Register"
      method="post">
    @Html.AntiForgeryToken()

    <input asp-for="Email"
           type="email"
           required />
    <input asp-for="Password"
           type="password"
           required />

    <input asp-for="RecaptchaToken"
           type="hidden" />

    <button type="submit">Register</button>
</form>
```

### Study meaning

The hidden input becomes the handoff point from browser-side `execute` to server-side model binding.

### Recall questions

1. What is the form ID?
2. Which field is hidden?
3. Why is the anti-forgery token still present?


---

## S-035 — Razor v3 execute script

**Known limits:** none

### Near-literal normalized transcript

```html
<script src="https://www.google.com/recaptcha/api.js?render=@siteKey"></script>
<script>
(function () {
    const siteKey = "@siteKey";
    const form =
        document.getElementById("registerForm");
    const tokenInput =
        document.querySelector(
            'input[name="RecaptchaToken"]');

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        grecaptcha.ready(function () {
            grecaptcha.execute(
                siteKey,
                { action: "register" })
            .then(function (token) {
                tokenInput.value = token;
                form.submit();
            });
        });
    });
})();
</script>
```

### Study meaning

The first submit is paused, an action-bound token is requested, the hidden input is filled, and native submission resumes.

### Recall questions

1. Why is preventDefault called?
2. Which action name is used?
3. Where is the token stored?
4. What resumes submission?


---

## S-036 — Razor v3 success endpoint

**Known limits:** none

### Near-literal normalized transcript

```csharp
[HttpGet("register-success")]
public IActionResult RegisterSuccess()
    => Content("Registered (Razor v3).");
```

### Study meaning

The example ends successful registration at a dedicated GET route.

### Recall questions

1. What route is used?
2. What response text is returned?


---

## S-037 — Razor v3 controller POST decision

**Known limits:** non-security registration work is represented by a TODO in the source

### Near-literal normalized transcript

```csharp
[HttpPost("register")]
[ValidateAntiForgeryToken]
public async Task<IActionResult> Register(
    RazorRegisterVm vm)
{
    var ip =
        HttpContext.Connection.RemoteIpAddress?
            .ToString();

    var v3 = await _recaptcha.VerifyV3Async(
        vm.RecaptchaToken ?? "",
        expectedAction: "register",
        remoteIp: ip);

    if (!v3.Success ||
        v3.Score < _v3Threshold)
    {
        ModelState.AddModelError(
            "",
            "reCAPTCHA failed or suspicious activity detected.");

        ViewBag.RecaptchaSiteKey =
            _config["Recaptcha:SiteKey"];

        return View(vm);
    }

    return RedirectToAction(
        nameof(RegisterSuccess));
}
```

### Study meaning

The controller uses a structured v3 result, validates the endpoint-specific action inside the verifier, and enforces an application score threshold.

### Recall questions

1. What expected action is passed?
2. What two conditions reject the request?
3. Why is a generic error message used?
4. What view state is restored?


---

## S-038 — Razor v3 GET variant

**Known limits:** none

### Near-literal normalized transcript

```csharp
// Razor (v3)

[HttpGet("register")]
public IActionResult Register()
{
    ViewBag.RecaptchaSiteKey =
        _config["Recaptcha:SiteKey"];

    return View(new RazorRegisterVm());
}
```

### Study meaning

This route-specific GET creates a fresh model and supplies the public site key.

### Recall questions

1. What route is mapped?
2. Which model is created?
3. Which key is exposed?


---

## S-039 — RazorRegisterVm

**Known limits:** none

### Near-literal normalized transcript

```csharp
public sealed class RazorRegisterVm
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
    public string? RecaptchaToken { get; set; }
}
```

### Study meaning

The model separates user inputs from the short-lived v3 verification token.

### Recall questions

1. Which property is nullable?
2. Which two properties are user credentials?
3. Why is the token not stored permanently?


---

## S-040 — VerifyV3 result construction

**Known limits:** cropped service-method continuation

### Near-literal normalized transcript

Visible service continuation:

```csharp
var resp =
    await VerifyCoreAsync(token, remoteIp);

// v3: must check action + score
var ok =
    resp.Success &&
    string.Equals(
        resp.Action,
        expectedAction,
        StringComparison.Ordinal);

var score = resp.Score ?? 0.0;

return new RecaptchaV3Result(
    ok,
    score,
    resp.Action,
    resp.Hostname,
    resp.ErrorCodes);
```

### Study meaning

The verifier converts Google's response into an application result after enforcing the expected action. The controller can then apply a threshold.

### Recall questions

1. Which comparison mode is used for action?
2. What score is used when Google returns null?
3. Which response fields are preserved in the result?


---

## S-041 — Implementation boundary label

**Known limits:** none

### Near-literal normalized transcript

Canvas/source heading:

```text
Implementation
```

### Study meaning

This small screenshot marks the implementation subsection in the original canvas.

### Recall questions

1. What subsection begins here?


---

## S-042 — Interface boundary label

**Known limits:** none

### Near-literal normalized transcript

Canvas/source heading:

```text
Interface
```

### Study meaning

This boundary separates the verifier contract from its implementation.

### Recall questions

1. What architectural element is introduced?


---

## S-043 — Models and service boundary

**Known limits:** none

### Near-literal normalized transcript

Canvas/source headings:

```text
Recaptcha models + service
Models
```

### Study meaning

This boundary groups verification DTOs and the server-side service.

### Recall questions

1. Which two artifact types are grouped?


---

## S-066 — v3 submit continuation

**Known limits:** cropped continuation duplicated semantically by the fuller S-035/S-070 examples

### Near-literal normalized transcript

Visible script fragment:

```js
e.preventDefault();

grecaptcha.ready(function () {
  grecaptcha.execute(
    siteKey,
    { action: "register" })
  .then(function (token) {
    tokenInput.value = token;
    form.submit();
  });
});
```

### Study meaning

This is the critical v3 submit sequence: delay, execute, store, then resubmit.

### Recall questions

1. What stops the first submit?
2. What action is executed?
3. What receives the token?
4. What triggers the final submit?


---

## S-070 — Full Razor v3 browser script

**Known limits:** none

### Near-literal normalized transcript

```html
<script src="https://www.google.com/recaptcha/api.js?render=@siteKey"></script>
<script>
(function () {
    const siteKey = "@siteKey";
    const form =
        document.getElementById("registerForm");
    const tokenInput =
        document.querySelector(
            'input[name="RecaptchaToken"]');

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        grecaptcha.ready(function () {
            grecaptcha.execute(
                siteKey,
                { action: "register" })
            .then(function (token) {
                tokenInput.value = token;
                form.submit();
            });
        });
    });
})();
</script>
```

### Study meaning

This second full crop reinforces the complete v3 token-generation and form-resubmission lifecycle.

### Recall questions

1. Which script URL embeds the site key?
2. What is the form ID?
3. Which hidden input is selected?
4. Why is the action string significant?


---

## S-071 — Razor view model and site-key variable

**Known limits:** none

### Near-literal normalized transcript

```cshtml
@model RegisterVm
@{
    var siteKey =
        (string)ViewBag.RecaptchaSiteKey;
}
```

### Study meaning

The Razor view receives a strongly typed model plus the public site key needed by browser-side rendering or execution.

### Recall questions

1. What is the view model type?
2. Where does the site key come from?
3. Is the secret key exposed?


---

## S-072 — Razor site-key fragment

**Known limits:** small cropped fragment

### Near-literal normalized transcript

```cshtml
@model RegisterVm
@{
    var siteKey =
        (string)ViewBag.RecaptchaSiteKey;
}
```

### Study meaning

This cropped duplicate-like fragment emphasizes the site-key extraction at the top of the view.

### Recall questions

1. What local variable is created?
2. What ViewBag property supplies it?


---

## S-074 — Repeated Razor v3 POST screenshot

**Known limits:** none

### Near-literal normalized transcript

The repeated v3 POST action:

- reads the connection IP;
- calls `VerifyV3Async` with `vm.RecaptchaToken ?? ""`;
- passes `expectedAction: "register"`;
- rejects when `!v3.Success` or `v3.Score < _v3Threshold`;
- restores the site key and returns the model on failure;
- redirects to success after application registration work.

### Study meaning

This source is a second crop of the server decision and remains useful for memorizing the exact action and threshold checks.

### Recall questions

1. What null fallback is used for the token?
2. What expected action is passed?
3. What two result properties control rejection?


---

## S-075 — Combined Razor form with v2 and v3 token fields

**Known limits:** the screenshot continues below the visible area

### Near-literal normalized transcript

Visible form:

```cshtml
@model RegisterVm
@{
    var siteKey =
        (string)ViewBag.RecaptchaSiteKey;
}

<form id="registerForm"
      asp-action="Register"
      method="post">
    @Html.AntiForgeryToken()

    <input asp-for="Email"
           type="email"
           required />
    <input asp-for="Password"
           type="password"
           required />

    <input asp-for="RecaptchaToken"
           type="hidden"
           id="RecaptchaToken" />

    <div class="g-recaptcha"
         data-sitekey="@siteKey"></div>

    <button type="submit">Register</button>
</form>

<script src="https://www.google.com/recaptcha/api.js"
        async defer></script>
```

### Study meaning

The screenshot combines a v2 checkbox element with a separate hidden token field. In a real implementation, choose a coherent v2 or v3 flow rather than mixing token-acquisition models unintentionally.

### Recall questions

1. Which field is hidden?
2. Which element renders the v2 checkbox?
3. What implementation risk exists when both patterns are mixed?


---

## S-076 — Submit handler reading v2 getResponse

**Known limits:** none

### Near-literal normalized transcript

```html
<script>
document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    var token =
      grecaptcha.getResponse();

    if (!token) {
      e.preventDefault();
      alert("Please complete the reCAPTCHA.");
      return;
    }

    document
      .getElementById("RecaptchaToken")
      .value = token;
  });
</script>
```

### Study meaning

The handler blocks an empty v2 response and copies Google's token into the model-bound hidden input.

### Recall questions

1. Which API reads the v2 token?
2. When is default submission prevented?
3. Where is the token copied?


---

## S-077 — What happens without preventDefault

**Known limits:** none

### Near-literal normalized transcript

Without `preventDefault()`, the submit handler still runs, but after it finishes the browser continues submitting the form.

### Study meaning

`preventDefault` is required when asynchronous token generation must finish before the original submission proceeds. It is not required merely to inspect an already available synchronous v2 token unless invalid submission must be blocked.

### Recall questions

1. Does the handler run without preventDefault?
2. What does the browser do afterward?
3. Why is preventDefault mandatory for v3 execute?


---

# React v3: custom hook and wrapper package

Generated: 2026-07-02

## Transcript policy

- Every unique embedded screenshot has one source block.
- Visible C#, Razor, JavaScript, JSX, JSON, routes, field names, actions, and thresholds are retained.
- Cropped screenshots are explicitly marked.
- Explanation is separated from the normalized source layer.
- Every source includes recall questions.

## S-044 — React v3 form tail and ready state

**Known limits:** cropped tail of the React v3 form

### Near-literal normalized transcript

Visible JSX continuation:

```jsx
<input
  value={password}
  onChange={e => setPassword(e.target.value)}
  placeholder="password"
  type="password"
  required
/>

<button type="submit" disabled={!ready}>
  Register
</button>

<div>{status}</div>
```

The source marks this as the correct client-side flow: get a token with an action and send it to the server.

### Study meaning

The submit button is disabled until the reCAPTCHA API is ready, preventing predictable client errors.

### Recall questions

1. What condition disables the button?
2. Where is status shown?
3. What must be sent to the server?


---

## S-045 — React v3 email field fragment

**Known limits:** cropped form fragment

### Near-literal normalized transcript

Visible form fragment:

```jsx
return (
  <form onSubmit={onSubmit}>
    <input
      value={email}
      onChange={e => setEmail(e.target.value)}
      placeholder="email"
      type="email"
      required
    />
```

### Study meaning

The v3 integration is embedded in a normal controlled React form.

### Recall questions

1. Which state setter handles the email field?
2. Which validation attributes are shown?


---

## S-046 — React v3 execute and POST

**Known limits:** none

### Near-literal normalized transcript

```js
// IMPORTANT: choose a stable action name per endpoint
const token = await execute("register");

const resp = await fetch("/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email,
    password,
    recaptchaToken: token
  })
});

if (!resp.ok) {
  const text = await resp.text();
  setStatus(`Failed: ${text}`);
  return;
}

setStatus("Registered! Check your email.");
```

The source catches errors and reports `"Error during reCAPTCHA."`.

### Study meaning

The action string must match server expectations. The token travels with the application request, not directly from React to Google verification.

### Recall questions

1. What action is executed?
2. What payload property carries the token?
3. What happens after a non-OK response?
4. Why must action names be stable?


---

## S-047 — React v3 form using a custom hook

**Known limits:** component continues in S-046, S-045, and S-044

### Near-literal normalized transcript

```jsx
import React, { useState } from "react";
import { useRecaptchaV3 } from "./useRecaptchaV3";

const SITE_KEY =
    import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export default function RegisterForm() {
  const { ready, execute } =
      useRecaptchaV3(SITE_KEY);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      if (!ready) {
        setStatus("reCAPTCHA is loading, try again.");
        return;
      }
```

### Study meaning

The custom hook encapsulates script loading and token execution while the form owns endpoint state and submission.

### Recall questions

1. What two values does the hook return?
2. Where is the site key sourced?
3. What happens before the API is ready?


---

## S-048 — Custom useRecaptchaV3 hook

**Known limits:** none

### Near-literal normalized transcript

```js
export function useRecaptchaV3(siteKey) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!siteKey) return;

    loadRecaptcha(siteKey)
      .then(grecaptcha =>
        grecaptcha.ready(() => setReady(true)))
      .catch(() => setReady(false));
  }, [siteKey]);

  const execute = async (action) => {
    if (!window.grecaptcha)
      throw new Error("reCAPTCHA not loaded");

    return await window.grecaptcha.execute(
      siteKey,
      { action });
  };

  return { ready, execute };
}
```

### Study meaning

The hook exposes a readiness flag and a single action-based execution API.

### Recall questions

1. What dependency reruns the effect?
2. What happens on loading failure?
3. What exception is thrown before the global API exists?
4. What does execute return?


---

## S-049 — Load the v3 script once

**Known limits:** normalized from the visible helper; the bottom closing lines are cropped in the screenshot

### Near-literal normalized transcript

```js
function loadRecaptcha(siteKey) {
  return new Promise((resolve, reject) => {
    if (window.grecaptcha)
      return resolve(window.grecaptcha);

    const existing =
      document.querySelector(
        'script[src^="https://www.google.com/recaptcha/api.js"]');

    if (existing) {
      existing.addEventListener(
        "load",
        () => resolve(window.grecaptcha));

      existing.addEventListener(
        "error",
        reject);

      return;
    }

    const script =
      document.createElement("script");

    script.src =
      `https://www.google.com/recaptcha/api.js?render=${siteKey}`;

    script.async = true;
    script.defer = true;
    script.onload =
      () => resolve(window.grecaptcha);
    script.onerror = reject;

    document.head.appendChild(script);
  });
}
```

### Study meaning

The helper reuses the global API or an existing script and only appends a new v3 script when necessary.

### Recall questions

1. How is an existing reCAPTCHA script detected?
2. What query parameter contains the site key?
3. How are success and failure surfaced?


---

## S-050 — React v3 direct executeRecaptcha flow

**Known limits:** cropped component continuation

### Near-literal normalized transcript

Visible component continuation:

```js
// action name must match what server expects
const token =
    await executeRecaptcha("register");

const resp = await fetch(
    "/api/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        recaptchaToken: token
      })
    });

setStatus(
  resp.ok
    ? "Registered!"
    : await resp.text());
```

The form then renders controlled email/password fields and a submit button.

### Study meaning

The package-level hook produces the same action-bound token used by the custom-hook solution.

### Recall questions

1. Which function executes reCAPTCHA?
2. What action is passed?
3. How is status selected from the response?


---

## S-051 — useGoogleReCaptcha component setup

**Known limits:** none

### Near-literal normalized transcript

```jsx
import React, { useState } from "react";
import {
  useGoogleReCaptcha
} from "react-google-recaptcha-v3";

export default function RegisterV3() {
  const { executeRecaptcha } =
      useGoogleReCaptcha();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (!executeRecaptcha) {
      setStatus("reCAPTCHA not ready yet.");
      return;
    }
```

### Study meaning

The package hook may be unavailable until its provider loads Google's API, so submission must guard against a missing executor.

### Recall questions

1. Which hook is used?
2. What condition means the API is not ready?
3. Which form states are maintained?


---

## S-052 — GoogleReCaptchaProvider

**Known limits:** none

### Near-literal normalized transcript

```jsx
import React from "react";
import {
  GoogleReCaptchaProvider
} from "react-google-recaptcha-v3";
import RegisterV3 from "./RegisterV3";

const SITE_KEY =
    import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export default function App() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={SITE_KEY}
      scriptProps={{
        async: true,
        defer: true
      }}
    >
      <RegisterV3 />
    </GoogleReCaptchaProvider>
  );
}
```

### Study meaning

The provider loads and scopes the reCAPTCHA v3 integration near the React application root.

### Recall questions

1. Which prop receives the site key?
2. Which script properties are enabled?
3. Which component consumes the provider?


---

## S-053 — Install the React v3 package

**Known limits:** none

### Near-literal normalized transcript

```bash
npm i react-google-recaptcha-v3
```

### Study meaning

This package supplies the provider and `useGoogleReCaptcha` hook.

### Recall questions

1. Which package is installed?
2. Which API style does it provide?


---

# Remote IP, forwarded headers, hostname, action, and score

Generated: 2026-07-02

## Transcript policy

- Every unique embedded screenshot has one source block.
- Visible C#, Razor, JavaScript, JSX, JSON, routes, field names, actions, and thresholds are retained.
- Cropped screenshots are explicitly marked.
- Explanation is separated from the normalized source layer.
- Every source includes recall questions.

## S-054 — RemoteIpAddress after forwarded headers

**Known limits:** cropped continuation from the forwarded-header setup

### Near-literal normalized transcript

After correct forwarded-header processing:

```csharp
var ip =
    HttpContext.Connection.RemoteIpAddress?
        .ToString();
```

is much more likely to represent the real client.

### Study meaning

RemoteIpAddress is only trustworthy behind a proxy after ASP.NET Core has accepted forwarded information from known infrastructure.

### Recall questions

1. Which property reads the IP?
2. What middleware condition makes it more likely to be correct?


---

## S-055 — Forwarded headers configuration

**Known limits:** right side of the production trust example is cropped

### Near-literal normalized transcript

```csharp
using Microsoft.AspNetCore.HttpOverrides;

var builder =
    WebApplication.CreateBuilder(args);

builder.Services
    .Configure<ForwardedHeadersOptions>(
        options =>
        {
            options.ForwardedHeaders =
                ForwardedHeaders.XForwardedFor |
                ForwardedHeaders.XForwardedProto;

            // In production restrict KnownProxies/
            // KnownNetworks to trusted infrastructure.
        });

var app = builder.Build();

app.UseForwardedHeaders();
```

### Study meaning

The middleware restores original client IP and scheme from trusted reverse-proxy headers. Trust boundaries must be constrained in production.

### Recall questions

1. Which two forwarded-header types are enabled?
2. Which middleware activates processing?
3. Why restrict known proxies or networks?


---

## S-056 — Why reverse proxies can produce the wrong IP

**Known limits:** none

### Near-literal normalized transcript

Behind Nginx, IIS, Cloudflare, Azure Front Door, another reverse proxy, or a CDN:

```csharp
HttpContext.Connection.RemoteIpAddress
```

may contain the proxy IP instead of the real user's IP.

Sending that wrong IP to Google reduces the usefulness of `remoteip`.

Enable and correctly trust forwarded headers when the real client address is needed.

### Study meaning

Network topology changes the immediate peer. The backend must deliberately restore original client context.

### Recall questions

1. Which IP may RemoteIpAddress contain?
2. How does that affect Google risk analysis?
3. What ASP.NET Core feature is required?


---

## S-057 — Do you need to send remoteip?

**Known limits:** none

### Near-literal normalized transcript

Usually no:

- it is optional;
- proxies and CDNs can make it wrong unless forwarded headers are configured.

It can be useful when:

- bot abuse is occurring and maximum signal is desired;
- strict validation is needed on high-risk endpoints such as signup or password reset;
- stable infrastructure provides a reliable client IP.

### Study meaning

An omitted optional signal is safer than a confidently wrong signal. Include remoteip only when its provenance is reliable.

### Recall questions

1. Is remoteip mandatory?
2. Name two reasons to omit it.
3. Name three cases where it can help.


---

## S-058 — What remoteip means

**Known limits:** none

### Near-literal normalized transcript

`remoteip` is the end user's IP address — the client that solved reCAPTCHA.

Google's `siteverify` endpoint accepts:

- `secret` — required;
- `response` token — required;
- `remoteip` — optional.

It helps bind the token to network context and improve risk analysis, including some token-reuse and abuse signals.

### Study meaning

remoteip is contextual metadata, not the token itself and not the proxy's address.

### Recall questions

1. Whose IP should remoteip contain?
2. Which two fields are required by siteverify?
3. Why does Google accept this optional value?


---

## S-059 — Why hostname validation matters

**Known limits:** none

### Near-literal normalized transcript

Hostname validation protects against accepting a token generated somewhere else.

Example:

- the application should accept tokens from `example.com`;
- Google returns `hostname = evilsite.com`;
- even if `success = true`, the application should reject it.

When Google-side origin validation is disabled, server-side hostname checking becomes especially important.

### Study meaning

The token's origin context must match the application that is accepting it.

### Recall questions

1. What hostile hostname is shown?
2. Can success alone be enough?
3. When does server-side hostname checking become critical?


---

## S-060 — Which hostname values to compare

**Known limits:** none

### Near-literal normalized transcript

Compare Google's returned hostname against expected hosts such as:

- `example.com`;
- `www.example.com`;
- `localhost` for development.

The source notes that Google domain configuration may allow a domain and first-level subdomains, but the application should still implement its intended policy explicitly.

### Study meaning

Allowed hosts should be an explicit application list rather than a broad string suffix test.

### Recall questions

1. Which three hosts are listed?
2. Why is localhost special?
3. Why should the server keep its own allowlist?


---

## S-061 — Hostname is not a URL

**Known limits:** none

### Near-literal normalized transcript

`hostname` contains only a host, for example:

```text
example.com
www.example.com
localhost
```

It does not contain:

```text
https://example.com/register
example.com/register
```

### Study meaning

Comparisons must use host values, without scheme, path, or port assumptions.

### Recall questions

1. Does hostname include https?
2. Does it include a route path?
3. Give two valid hostname values.


---

## S-062 — ASP.NET Core allowed-host check

**Known limits:** none

### Near-literal normalized transcript

```csharp
var allowedHosts = new[]
{
    "example.com",
    "www.example.com",
    "localhost"
};

if (!verifyResponse.Success)
    return false;

if (string.IsNullOrWhiteSpace(
        verifyResponse.Hostname) ||
    !allowedHosts.Contains(
        verifyResponse.Hostname,
        StringComparer.OrdinalIgnoreCase))
{
    return false;
}
```

### Study meaning

The server first requires Google's success result and then performs a case-insensitive exact-host allowlist check.

### Recall questions

1. Which three hosts are allowed?
2. What happens for an empty hostname?
3. What comparison mode is used?


---

## S-063 — v3 requires action and score checks

**Known limits:** none

### Near-literal normalized transcript

For v3, hostname is only one part of validation. Check:

- `success`;
- `hostname`;
- `action`;
- `score`.

v3 tokens are action-based and score-based, and Google returns action and score in the verification response.

### Study meaning

v3 validation combines origin, operation identity, and risk level.

### Recall questions

1. Which four fields are checked?
2. Why is hostname alone insufficient?
3. Which fields are specific to the v3 decision?


---

## S-064 — Combined v3 verification example

**Known limits:** right side of the first hostname condition is cropped; normalized logic follows the visible code

### Near-literal normalized transcript

```csharp
if (!verifyResponse.Success)
    return false;

if (!string.Equals(
        verifyResponse.Hostname,
        "example.com",
        StringComparison.OrdinalIgnoreCase) &&
    !string.Equals(
        verifyResponse.Hostname,
        "www.example.com",
        StringComparison.OrdinalIgnoreCase))
{
    return false;
}

if (!string.Equals(
        verifyResponse.Action,
        "register",
        StringComparison.Ordinal))
{
    return false;
}

if (verifyResponse.Score < 0.5m)
    return false;
```

### Study meaning

The example applies exact host alternatives, exact action matching, and a numeric score threshold after success.

### Recall questions

1. Which two hostnames are accepted?
2. Which action is required?
3. What score threshold is shown?
4. Which comparison is case-sensitive?


---

## S-065 — Practical hostname-check rule

**Known limits:** none

### Near-literal normalized transcript

Do you always need a hostname check?

- Google-side domain validation already provides protection when enabled.
- A server-side hostname check adds defense in depth.
- It becomes especially important if Google-side origin validation is disabled.

Practical rule:

- v2: check `success`, preferably also `hostname`;
- v3: check `success`, `hostname`, `action`, and `score`.

### Study meaning

Server checks should mirror the assurance level of the reCAPTCHA version and deployment configuration.

### Recall questions

1. What is the v2 minimum?
2. What four checks are recommended for v3?
3. When is hostname checking especially important?


---

# Site-key configuration endpoint and placement audit

Generated: 2026-07-02

## Transcript policy

- Every unique embedded screenshot has one source block.
- Visible C#, Razor, JavaScript, JSX, JSON, routes, field names, actions, and thresholds are retained.
- Cropped screenshots are explicitly marked.
- Explanation is separated from the normalized source layer.
- Every source includes recall questions.

## S-073 — API endpoint for exposing only the site key

**Known limits:** none

### Near-literal normalized transcript

```csharp
[ApiController]
[Route("api/config")]
public class ConfigController : ControllerBase
{
    private readonly GoogleReCaptchaOptions _options;

    public ConfigController(
        IOptions<GoogleReCaptchaOptions> options)
    {
        _options = options.Value;
    }

    [HttpGet("recaptcha-site-key")]
    public IActionResult GetRecaptchaSiteKey()
    {
        return Ok(new
        {
            siteKey = _options.SiteKey
        });
    }
}
```

### Study meaning

A frontend may fetch the public site key from a configuration endpoint. The secret key must never be included.

### Recall questions

1. What route exposes the site key?
2. Which options type is injected?
3. What JSON property is returned?
4. Which key must not be returned?
