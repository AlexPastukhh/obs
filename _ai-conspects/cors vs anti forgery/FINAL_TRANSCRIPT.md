# CORS vs antiforgery — source-preserving final transcript v002

Generated: 2026-07-04 UTC

```text
unique screenshots: 20
image uses: 20
grouped canvas labels: 5
remaining source work: 0
```

Transcript mode: near-literal normalized. Code and examples are preserved; exact typography remains in the source screenshots.

## S-001 — Cookie-authenticated CSRF and classic tags

If the victim is logged into `bank.com` and the bank uses cookie authentication, the browser may attach the bank's cookies, depending on `SameSite`. A transfer can succeed unless CSRF defenses exist.

That is CSRF.

`<img>`, `<script>`, and `<link>` can also cause requests to other origins. They are mostly GET requests, but they demonstrate that browsers have always been able to send cross-site requests.

## S-002 — Why CORS is not enough to block a form POST

CORS mainly governs JavaScript APIs such as `fetch` and XHR. Other mechanisms can trigger cross-site requests without relying on CORS.

Classic HTML form POST from `evil.com`:

```html
<form action="https://bank.com/transfer" method="POST">
  <input name="to" value="attacker" />
  <input name="amount" value="1000" />
  <button type="submit">Click me</button>
</form>
<script>document.forms[0].submit()</script>
```

The browser can POST that form to `bank.com`. No fetch/XHR CORS check is involved.

## S-003 — No CORS configuration in ASP.NET Core

Same-origin XHR/fetch works normally.

If JavaScript on `evil.com` calls:

```javascript
fetch("https://bank.com/api/balance", {
  credentials: "include"
})
```

the browser may still send the request, sometimes after preflight.

If `bank.com` does not return an appropriate:

```text
Access-Control-Allow-Origin: https://evil.com
```

and, for credentialed requests, suitable credentials approval, the browser blocks `evil.com` JavaScript from accessing the response.

Result: the request may reach the server, but the caller sees a CORS error and cannot read the response body/headers.

## S-004 — CORS controls browser JavaScript access

CORS is a browser rule about allowing JavaScript to read responses from another origin. It is not a server-side security boundary that blocks every cross-site request.

A POST can still be sent from `evil.com` to `bank.com`; the browser may only refuse to let the attacker's JavaScript read the response.

This is why CORS alone does not stop CSRF.

## S-005 — XMLHttpRequest example

```javascript
// Create a new XMLHttpRequest object
const xhr = new XMLHttpRequest();

// Configure the request
xhr.open('GET', 'https://api.example.com/users/123', true);

// Set up the callback
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      const userData = JSON.parse(xhr.responseText);
      console.log('User data:', userData);
    } else {
      console.error('Request failed with status:', xhr.status);
    }
  }
};

// Send the request
xhr.send();
```

## S-006 — XHR `readyState` values

| Value | State | Meaning |
|---:|---|---|
| 0 | `UNSENT` | XHR object created, but `open()` not called |
| 1 | `OPENED` | `open()` called |
| 2 | `HEADERS_RECEIVED` | `send()` called; headers and status available |
| 3 | `LOADING` | response body is downloading |
| 4 | `DONE` | operation complete |

## S-007 — When to use XHR versus Fetch

Use `XMLHttpRequest` when:

- supporting old browsers;
- precise upload/download progress is required;
- maintaining legacy code;
- aborting requests with fine-grained control.

Use `fetch` when:

- building modern applications;
- using async/await;
- working with Service Workers;
- preferring Promise-based code.

## S-008 — CORS is mainly about reading, not sending

The browser decides whether JavaScript on `evil.com` may read the response from `bank.com`.

- The browser can still send a request.
- If `bank.com` does not opt in with CORS headers, the browser blocks the attacker's JavaScript from reading the response.

An attacker can therefore cause a state change without reading the result. That is classic CSRF: the attacker only needs the action to happen.

## S-009 — Non-simple fetch without CORS configuration

ASP.NET Core example with no CORS middleware:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();
app.MapControllers();
app.Run();
```

From `https://evil.com`:

```javascript
fetch("https://api.bank.com/payments", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ amount: 10 }),
  credentials: "include"
});
```

## S-010 — Failed preflight prevents the actual POST

Browser behavior for the JSON POST:

- sends preflight `OPTIONS`, because the request uses `application/json`;
- the server does not return the required CORS approval;
- the browser blocks the operation;
- the actual POST is never sent.

## S-011 — Can a fetch POST still modify state?

It depends:

- If the request requires preflight and preflight fails, the browser does not send the POST, so no state change occurs.
- If it is a simple request, or the actual request is sent but the response lacks readable CORS approval, the POST can reach the server and modify state; the browser then blocks JavaScript from reading the response.

Attackers care about whether the transfer happened, not whether they can read the response.

## S-012 — What `<img>` can and cannot do

`<img>` can send a request:

```html
<img src="https://bank.com/account/balance" />
```

Cookies may be sent depending on `SameSite`.

JavaScript on `evil.com` cannot normally read the response body or pixels of a cross-origin image unless the response is CORS-enabled. Drawing it to canvas can taint the canvas.

## S-013 — Classic tags and limited leakage

An attacker can trigger requests with tags such as:

```text
<img>
<script>
<link>
<form>
```

Reading the response is a separate question.

Key rule: CORS controls JavaScript access to cross-origin responses for fetch/XHR. Other browser mechanisms do not use CORS in the same way and can sometimes leak limited information.

## S-014 — Practical defenses

- Never expose sensitive data through GET endpoints that return executable JavaScript / JSONP.
- Set `X-Content-Type-Options: nosniff`.
- Use authentication and authorization on sensitive endpoints.
- Use CSRF defenses on state-changing cookie-authenticated endpoints: antiforgery tokens, appropriate `SameSite`, and origin checks.
- Do not rely on secret URLs.

## S-015 — CORS is not a universal no-read shield

For fetch/XHR, without CORS permission, JavaScript cannot read the response.

Other web primitives still exist:

```text
<img>
<link>
<script>
navigation
forms
```

They can send requests and sometimes leak small signals such as load/error or timing. A script response can fully leak data if the server returns executable JavaScript/JSONP.

CORS is primarily about JavaScript APIs and response access, not a universal block for every HTML mechanism.

## S-016 — What a form can do

A form can POST cross-site without CORS:

```html
<form action="https://bank.com/transfer" method="POST">
  <input name="to" value="attacker">
  <input name="amount" value="1000">
</form>
<script>document.forms[0].submit()</script>
```

It cannot read the response, but it can still cause a state change. That is why antiforgery protection matters.

## S-017 — Modern API response hygiene

Modern APIs should:

- not support JSONP;
- use `Content-Type: application/json`;
- ideally add `X-Content-Type-Options: nosniff`.

## S-018 — Why `<script>` is more dangerous

A cross-origin script is executed as JavaScript:

```html
<script src="https://bank.com/data"></script>
```

If a server returns sensitive data as executable JavaScript, JSONP, or similar content, an attacker can exfiltrate it without fetch/XHR CORS access.

Example danger:

```html
<script src="https://bank.com/api/balance?callback=steal"></script>
<script>
  function steal(data) {
    console.log(data); // exfiltrate
  }
</script>
```

## S-019 — Side channels: redirects and cache probing

Redirect detection can sometimes reveal state. For example, if a logged-in user is redirected to `/home` and a logged-out user to `/login`, different load behavior may leak a login-state signal.

Historically, cache probing could reveal whether resources were cached. Modern browsers reduce much of this, but some side channels can still exist.

An image cannot read the data, but it may sometimes answer limited yes/no questions.

## S-020 — Image load/error timing as an information leak

Example:

```html
<img
  src="https://bank.com/user/exists?name=alice"
  onload="hit('exists')"
  onerror="hit('nope')"
/>
```

If the server returns:

- `200` with image-compatible bytes, `onload` may run;
- `404` or non-image content, `onerror` may run.

If the server behaves differently, the attacker can infer limited information such as existence or state.


# Canvas labels

```text
what attacker can do with classic form/img that CORS does not handle
when there is no preflight because of a simple request
authenticated cookie request may bypass preflight only when request shape is simple
when CORS can reject a request so server state is not modified
why CORS is not enough
```

# Integrated conclusion

```text
CORS:
  controls cross-origin JavaScript response access
  and gates non-simple requests through preflight

Antiforgery:
  validates intent for unsafe cookie-authenticated requests

Authentication/authorization:
  still required independently
```

A failed preflight can prevent a non-simple request from being sent. A simple form POST can still reach the server without CORS preflight. Therefore CORS is not a substitute for antiforgery protection.
