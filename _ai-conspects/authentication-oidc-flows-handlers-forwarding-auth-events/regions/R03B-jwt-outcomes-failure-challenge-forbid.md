# R03B - JWT outcomes / failure / challenge / forbid

Generated: 2026-06-02 01:53:55 UTC

## 0.1 Area overview / key ideas / reading quality

This region explains what happens **after** or around JWT authentication when the result is not simply “valid token accepted”. It covers challenge behavior, forbid behavior, failure handling, and how JWT bearer events can customize the response.

Key ideas:

```text
- Authentication failure, challenge, and forbid are not the same thing.
- Challenge is the handler asking the client to authenticate or retry with valid credentials.
- Forbid is used when the user/principal is known but is not allowed.
- JWT bearer challenge may include WWW-Authenticate details.
- OnChallenge and OnForbidden are explicit customization points.
- Result handling determines how failure/no-result/success turns into HTTP response behavior.
```

Reading quality:

```text
Good for event names, outcome categories, and response semantics. Some code is too small for exact transcription, so dense implementation screenshots are summarized semantically.
```

## 0.2 Coverage / boundary review

Included in R03B v001:

```text
S-092, S-093, S-094, S-095, S-096, S-097, S-098, S-099, S-100, S-101, S-102, S-103, S-104, S-105, S-106, S-107, S-108,
S-109, S-134, S-135, S-136, S-137, S-138, S-139, S-140, S-141, S-142, S-143, S-144, S-145, S-146, S-147, S-148, S-149,
S-150, S-151, S-152, S-153, S-154, S-155, S-156, S-157, S-189
```

Boundary decision:

```text
R03B is the JWT outcome tail: failure, challenge, forbid, result handling, WWW-Authenticate/error response customization.
R03A remains the token lookup/validation pipeline.
R04 remains OIDC challenge/callback/sign-in bridge.
```

## 1. Challenge vs authentication failure

The notes emphasize that challenge is not simply “token validation failed”.

A JWT request can end in several states:

```text
no token -> no authenticated result -> challenge may be issued later
invalid token -> authentication failure
valid token but rejected by app/event -> failure or forbidden depending on path
valid token but not authorized -> forbid
```

## 2. Challenge behavior

JWT bearer challenge usually maps to HTTP 401 and may use the `WWW-Authenticate` header. The handler can include error details depending on options and context.

Mental model:

```text
challenge = client needs to authenticate / provide acceptable token
```

Customization points:

```text
OnChallenge
HandleResponse / skip default handling
error / error_description / error_uri
WWW-Authenticate header composition
```

## 3. Forbid behavior

Forbid is different from challenge:

```text
challenge -> not authenticated / needs credentials
forbid -> authenticated or known principal is not allowed
```

JWT bearer forbid usually maps to HTTP 403 and fires `OnForbidden`.

## 4. AuthenticationFailed / exceptions

The screenshots track validation exceptions and failure contexts. `OnAuthenticationFailed` lets application code observe or modify the behavior after validation fails.

Common use cases:

```text
log token validation failure
customize error response
suppress or replace default behavior
map specific exceptions to app-specific result
```

## 5. TokenValidated as bridge to application policy

After a valid token, `OnTokenValidated` can still reject or enrich the principal.

Typical work:

```text
add claims
load user data
reject disabled users
store request-local values
control SaveToken / ticket properties
```

## 6. Outcome summary

The final outcome categories are:

```text
NoResult -> no credentials found
Fail -> token/validation failed
Success -> valid principal accepted
Challenge -> 401 response path
Forbid -> 403 response path
```
