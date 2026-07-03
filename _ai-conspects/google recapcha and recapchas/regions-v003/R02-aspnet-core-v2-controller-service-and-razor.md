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
