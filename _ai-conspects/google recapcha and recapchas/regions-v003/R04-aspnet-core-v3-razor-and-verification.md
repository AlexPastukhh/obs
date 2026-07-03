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
