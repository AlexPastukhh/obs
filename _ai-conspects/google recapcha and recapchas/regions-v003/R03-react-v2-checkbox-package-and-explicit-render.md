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
