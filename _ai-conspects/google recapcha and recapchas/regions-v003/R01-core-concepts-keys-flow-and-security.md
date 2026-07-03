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
