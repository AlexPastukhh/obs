# R01/R02/R03/R04 — Google reCAPTCHA v2/v3, Razor/React and ASP.NET Core verification

Conspect: `google recapcha and recapchas`  
File type: **source-preserving combined final transcript**  
Stage: **stage-1 final coverage v001**  
Generated: 2026-06-22 00:20:00 UTC

## Direction check

Goal:
Turn the reCAPTCHA SVG into a complete AI-readable conspect without losing screenshots, code blocks or short canvas notes.

Now:
Stage0 is committed. This pass processes every remaining image placement and text block.

This step:
Close R01/R02/R03/R04 together: core trust flow, v2 Razor/React, combined server verification, v3 Razor/React, and remote-IP/proxy handling.

Why:
The four regions form one request lifecycle. Splitting them would repeat the same token/verification boundary and obscure the difference between v2 and v3.

Next:
Apply and commit this archive. After commit, no normal transcript regions remain.

---

## 0.1 Area understanding / reading quality

What the area is about:

```text
client receives site key only
client obtains reCAPTCHA token
client submits token with protected operation
server sends secret + token to Google's siteverify endpoint
server validates response before registration/login/action continues
```

Key ideas:

- The **site key is public** and belongs in rendered Razor/HTML or frontend environment configuration.
- The **secret key is server-only** and must not be sent to the browser.
- Client-side completion is not proof. The application trusts only the result of a server-side `siteverify` call.
- A token is short-lived and effectively single-use for the intended operation; failed attempts commonly reset the v2 widget or obtain a fresh v3 token.
- v2 mainly checks successful challenge verification. v3 also requires application policy checks such as expected `action` and an acceptable `score` threshold.
- `hostname` can be checked to reduce acceptance of tokens produced for an unintended host.
- `remoteip` is optional. Behind a reverse proxy it is useful only when forwarded headers are configured correctly and the real client address is obtained safely.

Reading quality:

```text
overall semantic understanding: high
screenshots/code readability: high
exact code punctuation/package versions: medium-high; preserved PNGs remain authoritative
coverage: 77 image uses + 29 text blocks, remaining = 0
```

---

## 1. R01 — Core flow, keys, token submission and server verification

### 1.1 Site key and secret key

The server exposes the configured site key to the view or frontend. A Razor example reads `Recaptcha:SiteKey` from options/configuration and passes it to the page, commonly through a strongly typed view model or `ViewBag`. The HTML/React client may safely use the site key because it identifies the public widget/application integration.

The secret key stays in ASP.NET Core configuration, environment variables, user-secrets or a secret store. It is used only by the backend when calling Google's verification endpoint.

Representative sources:

```text
S-001, S-002, S-003, S-018, S-019
```

### 1.2 Client obtains and submits a token

For v2 checkbox integration, the client loads the reCAPTCHA script and renders a widget with the site key. On form submission the browser includes `g-recaptcha-response`; a React integration may instead read the token from a widget ref and put it into JSON such as `recaptchaToken`.

For v3, the client calls `grecaptcha.execute(siteKey, { action: "register" })` or a library wrapper such as `executeRecaptcha("register")`. The token is inserted into a hidden field or JSON request before the business request is sent.

The canvas notes emphasize that the application can use the same general pattern for v2 and v3: prevent normal submission, obtain a fresh token, attach it to the request, then submit.

Representative sources:

```text
S-004, S-005, S-006, S-007, S-009, S-016, S-017
T-023, T-024, T-025, T-026, T-027, T-028, T-029
```

### 1.3 Server verification is mandatory

The backend extracts the token and posts form-encoded fields to:

```text
https://www.google.com/recaptcha/api/siteverify
```

Typical fields:

```text
secret   = server-only secret key
response = token supplied by the client
remoteip = optional client address
```

The response is deserialized into a DTO containing `success`, `challenge_ts`, `hostname`, `error-codes`, and for v3, `score` and `action`.

The controller must stop the protected operation when verification fails. It adds a model error or returns an error response; only a successful server result permits registration/login/other work to continue.

Representative sources:

```text
S-008, S-010, S-020, S-021
```

### 1.4 Hostname, action and score

The notes distinguish transport success from application acceptance:

- `success` must be true.
- For v3, returned `action` must equal the action expected by the endpoint.
- The application chooses a score threshold appropriate for its risk policy; a low score can be rejected or routed to a fallback challenge/review flow.
- `hostname` may be validated against an allow-list for the deployed domains.

Representative sources:

```text
S-011, S-012, S-013, S-014, S-015
T-022
```

---

## 2. R02 — v2 Razor/React and reusable ASP.NET Core verification

### 2.1 Razor v2 checkbox flow

A Razor page loads Google's API script, renders a form, and places:

```html
<div class="g-recaptcha" data-sitekey="..."></div>
```

When the form is submitted, the generated `g-recaptcha-response` field is read from `Request.Form`. The controller obtains the optional remote IP, calls the verifier, and returns the form with a validation error when verification fails.

A model property cannot naturally use the hyphenated field name as a normal C# identifier, so the sheet shows manual form lookup as the straightforward approach.

Representative sources and text blocks:

```text
S-022, S-023, S-024, S-025, S-026, S-027, S-028, S-029, S-030
T-001, T-002, T-003, T-004, T-005
```

### 2.2 React v2 with a library

The library approach uses `react-google-recaptcha`:

- store a widget ref;
- read `getValue()` during submit;
- refuse the request when no token is present;
- send `{ email, password, recaptchaToken }` to the API;
- reset the widget after a failed attempt so a new token can be produced.

Representative sources:

```text
S-031, S-032, S-033, S-034, S-035
T-006
```

### 2.3 React v2 without a library

The manual approach dynamically loads `api.js?render=explicit`, waits for `grecaptcha.ready`, renders the widget into a referenced `<div>`, stores the widget ID, and calls `getResponse(widgetId)` when the form is submitted. On failure, `grecaptcha.reset(widgetId)` allows another attempt.

The no-library route gives direct control over loading and rendering but requires lifecycle guards so the script/widget is not inserted or rendered repeatedly.

Representative sources:

```text
S-036, S-037, S-038, S-039, S-040, S-041
T-007
```

### 2.4 Combined v2/v3 models and service

The sheet then consolidates verification into reusable backend models and a service:

```text
RecaptchaVerifyResponse
RecaptchaV2Result
RecaptchaV3Result
IRecaptchaService
GoogleRecaptchaService
```

The shared core method performs the HTTP POST and JSON deserialization. `VerifyV2Async` uses the common success/hostname/error information. `VerifyV3Async` adds expected-action validation and returns score/action/hostname details so endpoint policy can decide acceptance.

The service is registered through DI with an `HttpClient`, keeping HTTP/configuration concerns outside controllers.

Representative sources and text blocks:

```text
S-042, S-043, S-044, S-045, S-046, S-047, S-048, S-049, S-050, S-051, S-052, S-053, S-054
T-009, T-010, T-011, T-012, T-013
```

Duplicate placement note:

```text
The embedded image shared by S-002 and S-022 is retained in both placements because it introduces the core form flow in R01 and the concrete v2 Razor road in R02. The concept is transcribed once per relevant context, not counted as missing.
```

---

## 3. R03 — v3 Razor and React integration

### 3.1 Backend requirements for v3

The v3 backend must check more than `success`:

```text
success == true
action == expected endpoint action
score >= application threshold
optional hostname/domain checks
optional challenge timestamp/freshness policy
```

The sheet proposes decision bands rather than treating the score as a universal truth: high scores may pass, middle scores may trigger extra verification, and low scores may be rejected. The concrete threshold remains an application policy decision.

Representative sources:

```text
S-055, S-056
```

### 3.2 Razor v3

The Razor view loads the script with the site key in the `render` query string. JavaScript intercepts form submission, calls `grecaptcha.ready`, executes reCAPTCHA with the action (for example `register`), writes the returned token into a hidden input, and then submits the form.

The controller reads the token, calls `VerifyV3Async(token, "register", remoteIp)`, and checks success plus the chosen score policy before proceeding.

Representative sources:

```text
S-057, S-058, S-059, S-060, S-065, S-067, S-068, S-069, S-070, S-071, S-072
T-015, T-020
```

### 3.3 React v3 without a library

The manual React path loads Google's v3 script once, waits for readiness, and calls:

```javascript
grecaptcha.execute(SITE_KEY, { action: "register" })
```

The returned token is sent with the registration request. The action used on the client must match the action checked by the backend.

Representative sources:

```text
S-058, S-060, S-062, S-063
T-014, T-016
```

### 3.4 React v3 with a provider library

With `react-google-recaptcha-v3`, the application wraps the component tree in `GoogleReCaptchaProvider`, then calls `useGoogleReCaptcha()` and `executeRecaptcha("register")` in the form component. The form disables submission or reports a loading state until the library is ready and a token can be obtained.

The library simplifies script/provider lifecycle but does not replace server verification.

Representative sources:

```text
S-061, S-063, S-064, S-066
T-017, T-018, T-019
```

---

## 4. R04 — `remoteip`, forwarded headers and proxy correctness

`remoteip` is the end-user IP optionally supplied to `siteverify`. It can add request-network context to Google's abuse analysis, but it is not required for ordinary verification.

It can be useful for high-risk endpoints or when the application reliably knows the real client address. It becomes misleading when `HttpContext.Connection.RemoteIpAddress` is merely the reverse proxy/CDN address.

Behind Nginx, IIS, Cloudflare, Azure Front Door or another proxy, ASP.NET Core must process forwarded headers from trusted proxies/networks before reading the client address. After `UseForwardedHeaders`, `RemoteIpAddress` is more likely to represent the actual client.

Do not blindly trust arbitrary forwarded headers from untrusted senders. The proxy/network trust configuration is part of the security boundary.

Representative sources:

```text
S-073, S-074, S-075, S-076, S-077
T-021
```

---

## 5. Compact end-to-end checklist

```text
1. Register the correct site/domain and obtain site key + secret key.
2. Keep the site key client-visible; keep the secret server-only.
3. Obtain a fresh token for the specific form/action.
4. Send the token together with the protected operation.
5. Server posts secret + token (+ optional real remoteip) to siteverify.
6. Require success.
7. For v3, require expected action and application-approved score.
8. Optionally validate hostname and timestamp/freshness.
9. Reject safely and obtain/reset a fresh token for another attempt.
10. Continue registration/login only after server-side acceptance.
```

---

## 6. Evidence and final coverage

Detailed source map:

```text
data/R01R02R03R04-sources-stage1-v001.csv
data/R01R02R03R04-sources-stage1-v001.json
```

Text blocks:

```text
data/R01R02R03R04-text-labels-stage1-v001.csv
data/R01R02R03R04-text-labels-stage1-v001.json
```

Audit assets:

```text
audit-assets/R01R02R03R04-source-images/*.png
audit-assets/contact-sheet-R01R02R03R04-final-coverage-v001.png
```

Final status:

```text
R01: 21 image uses + 8 text blocks
R02: 33 image uses + 12 text blocks
R03: 18 image uses + 8 text blocks
R04: 5 image uses + 1 text block
total: 77 image uses + 29 text blocks
remaining unclosed: 0
```
