# Repeat material — CORS vs antiforgery

## One-minute model

```text
Can browser send?      Often yes.
Can JS read response?  CORS decides.
Can unsafe cookie request prove intent?  Antiforgery decides.
Is caller allowed?     Authentication + authorization decide.
```

## Two paths

```text
simple form POST
  no CORS preflight
  cookies may accompany request
  server state may change
  attacker cannot read response
  => CSRF risk

JSON fetch POST
  preflight OPTIONS
  failed preflight
  actual POST not sent
  => no state change from that request
```

## Defenses

- antiforgery tokens for unsafe cookie-authenticated requests;
- appropriate SameSite cookies;
- authentication and authorization;
- strict CORS allowlists;
- no JSONP;
- `application/json`;
- `X-Content-Type-Options: nosniff`;
- origin/referer checks as defense in depth.
