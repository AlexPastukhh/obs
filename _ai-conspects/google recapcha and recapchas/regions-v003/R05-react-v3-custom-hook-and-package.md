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
