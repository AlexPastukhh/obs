# R03A - JWT bearer handler pipeline / token lookup / validation events

Generated: 2026-06-02 01:53:55 UTC

## 0.1 Area overview / key ideas / reading quality

This region explains the **JWT bearer authentication handler** as an authentication pipeline. The handler does not create a browser session. It tries to find a bearer token for the current request, validates it, then returns an authentication result for this request only.

Key ideas:

```text
- JwtBearerHandler implements the authenticate operation for bearer-token APIs.
- OnMessageReceived runs early and can manually set context.Token.
- If no event supplies a token, the handler normally reads Authorization: Bearer <token>.
- No token means no result, not necessarily a hard auth failure.
- A malformed/invalid token becomes authentication failure.
- A valid token becomes ClaimsPrincipal + AuthenticationTicket.
- TokenValidated, AuthenticationFailed, Challenge, and Forbidden are separate event points.
```

Reading quality:

```text
Good for control flow and named events/options. Some screenshots are code-dense, so this transcript preserves method/event names and behavior rather than claiming exact line-by-line source copy for every tiny code block.
```

## 0.2 Coverage / boundary review

Included in R03A v001:

```text
S-110, S-111, S-112, S-113, S-114, S-115, S-116, S-117, S-118, S-119, S-120, S-121, S-122, S-123, S-124, S-125, S-126,
S-127, S-128, S-129, S-130, S-131, S-132, S-133, S-158, S-159, S-160, S-161, S-162, S-163, S-164, S-165, S-166, S-167,
S-168, S-169, S-170, S-171, S-172, S-173, S-174, S-175, S-176, S-177, S-178, S-179, S-180, S-181, S-182, S-183, S-184,
S-185, S-186, S-187, S-188, S-190, S-191, S-192, S-193, S-194, S-195, S-196, S-197, S-198, S-199, S-200, S-201, S-202,
S-304, S-305, S-306, S-307, S-308, S-310
```

Boundary decisions:

```text
S-304-S307 were previously checked during R02 and reserved for JWT bearer. They are now included here because they continue OnMessageReceived / token lookup / HandleAuthenticate flow.
R03A owns the JWT authentication pipeline up to token validation and events.
R03B owns later outcomes: challenge, forbidden, failure, result handling, and JWT-specific response behavior.
```

## 1. Mental model

JWT bearer auth is request-local authentication:

```text
request -> bearer token lookup -> token validation -> ClaimsPrincipal or failure
```

Unlike cookie auth, the server is not reading a protected local session cookie and usually does not write a sign-in cookie. The token itself carries claims and validity information, while validation parameters decide whether the token is acceptable.

## 2. Token lookup

The handler starts by creating a message-received context and firing the message-received event. This is the customization point for non-standard token locations.

Typical sources:

```text
Authorization: Bearer <token>
query string / websocket / SignalR token conventions
custom header
custom extraction logic in OnMessageReceived
```

Important distinction:

```text
OnMessageReceived can set context.Token manually.
If context.Token remains empty, the handler falls back to the Authorization header.
```

## 3. No token vs invalid token

The screenshots separate three cases:

```text
no token -> NoResult / nothing to authenticate
bad token -> authentication failure
valid token -> success ticket/principal
```

This distinction matters because challenge behavior is different from validation failure and because multiple schemes may be involved.

## 4. Validation setup

The handler uses token validation parameters and configuration/metadata to validate the token.

Typical validation dimensions:

```text
issuer
audience
lifetime
signature/signing keys
metadata / authority configuration
clock skew / validation parameters
```

The mental model is:

```text
raw token -> token validator -> validated security token + ClaimsPrincipal
```

## 5. Events in the pipeline

Important JWT events in this area:

```text
OnMessageReceived
OnTokenValidated
OnAuthenticationFailed
OnChallenge
OnForbidden
```

`OnTokenValidated` is after successful validation and is a good point to add claims, reject a principal, or load request-local values.

`OnAuthenticationFailed` is for failed validation and can influence later error handling.

## 6. Output of AuthenticateAsync

Successful JWT authentication creates an `AuthenticateResult.Success(...)` with a ticket/principal for the JWT bearer scheme.

Failure and no-result paths are intentionally distinct:

```text
NoResult: handler did not find credentials.
Fail: credentials existed but were invalid or validation threw.
Success: token valid and principal accepted.
```
