# R02 - Cookie authentication core, ticket store, events, sliding expiration, redirects

Generated: 2026-06-02 01:38:16 UTC

## 0.1 Area overview / key ideas / reading quality

This region explains **cookie authentication** as a stateful authentication handler. The cookie handler converts a protected cookie value into an authentication ticket/principal, can use an external `ITicketStore`, writes or deletes cookies during sign-in/sign-out, renews cookies when sliding expiration says it should, and exposes event hooks around all of those steps.

Key ideas:

```text
- Cookie auth is not only “read a cookie”. It is a handler lifecycle around ticket read, validate, refresh, sign-in, sign-out, redirects, and final response writing.
- The real auth state is an AuthenticationTicket: principal + properties + scheme.
- The cookie can contain the full protected ticket, or only a session key that points to an ITicketStore entry.
- Authenticate/ensure/read ticket is separate from sign-in/sign-out writing.
- FinishResponseAsync is important because renewed/deleted cookies are written late, when the response is finishing.
- Cookie events let application code customize signing-in, signed-in, validate-principal, signing-out, redirect-to-login, access-denied, logout/return-url, and sliding expiration behavior.
```

Reading quality:

```text
Good for flow, API names, and architecture. Some code screenshots are dense, so this transcript avoids pretending exact line-by-line copy where small text is not fully readable. The semantic flow and key methods/events are readable and stable.
```

## 0.2 Coverage / boundary review

Included in R02 v001:

```text
S-203, S-204, S-205, S-206, S-207, S-208, S-209, S-210, S-211, S-212, S-213, S-214, S-215, S-216, S-217, S-218, S-219, S-220, S-221, S-222, S-223, S-224, S-225, S-226, S-227, S-228, S-229, S-230, S-231, S-232, S-233, S-234, S-235, S-236, S-237, S-238, S-239, S-240, S-241, S-242, S-243, S-244, S-245, S-246, S-247, S-248, S-249, S-250, S-251, S-252, S-253, S-254, S-255, S-256, S-257, S-258, S-259, S-260, S-261, S-262, S-263, S-264, S-265, S-266, S-267, S-268, S-269, S-270, S-271, S-272, S-273, S-274, S-275, S-276, S-277, S-278, S-279, S-280, S-281, S-282, S-283, S-284, S-285, S-286, S-287, S-288, S-289, S-290, S-291, S-292, S-293, S-294, S-295, S-296, S-297, S-298, S-301, S-302, S-303, S-309
```

Checked but not included:

```text
S-304, S-305, S-306, S-307
```

Boundary decision:

```text
S-304-S-307 are JWT bearer OnMessageReceived / token lookup / HandleAuthenticate flow candidates.
They sit near the coordinate band but belong to P03/R03A, not Cookie R02.
```

Inventory/ledger rule:

```text
Stage0 split and ledger are checklist only. R02 ownership is based on local visual/semantic boundary review.
```

## 1. Cookie handler mental model

Cookie auth is the “session-like” handler in ASP.NET authentication. Instead of validating a bearer token on each request, it reads a browser cookie, unprotects or looks up an authentication ticket, and returns an `AuthenticateResult` containing a principal.

The central objects in this area are:

```text
CookieAuthenticationHandler
AuthenticationTicket
AuthenticationProperties
ClaimsPrincipal
CookieAuthenticationOptions
ITicketStore
CookieAuthenticationEvents
```

The handler’s responsibilities split into four roads:

```text
1. authenticate: read/validate ticket and build the user principal;
2. sign in: create/store ticket and append auth cookie;
3. sign out: remove ticket and delete cookie;
4. finish response: renew/delete cookie when the response is about to be sent.
```

## 2. Reading the cookie and ticket

The handler does not treat the cookie as the user directly. It obtains a ticket:

```text
cookie value -> unprotect or session-store lookup -> AuthenticationTicket -> ClaimsPrincipal
```

Important steps:

```text
- check whether a cookie is present;
- unprotect cookie value or retrieve from ITicketStore;
- validate the ticket;
- check expiry;
- create the authenticated principal;
- remember that the ticket was already read so repeated calls do not redo all work.
```

The notes distinguish `EnsureCookieTicket` and `ReadCookieTicket`: one is about “read the ticket once”, the other is the real cookie/session-store decode path.

## 3. ITicketStore mode

With an `ITicketStore`, the cookie may store only an identifier/key. The real ticket is stored server-side.

Meaning:

```text
sign in with ITicketStore:
  store full ticket server-side;
  put only ticket id/session key into cookie.

authenticate with ITicketStore:
  read id from cookie;
  retrieve full ticket from store.

refresh with ITicketStore:
  renew/update the stored ticket.

sign out with ITicketStore:
  remove stored ticket and delete cookie.
```

This changes the storage model but not the logical auth flow: the output is still an authentication ticket/principal.

## 4. Refresh and sliding expiration

The region has a long road about refresh and sliding expiration. The important idea is that renewal is not automatic on every request. The handler checks whether renewal is allowed and useful.

Decision factors shown in the notes:

```text
- there is a valid current ticket;
- ticket has expiration information;
- AllowRefresh permits renewal;
- enough time has elapsed;
- enough remaining time is small enough to justify renewal;
- custom event logic can approve/deny renewal.
```

The simplified mental model:

```text
if user is active and the ticket is old enough but not expired:
  renew the ticket/cookie
else:
  keep existing ticket or reject it
```

This is why the notes emphasize “based on real user activity”, “based on AllowRefresh”, and “based on ticket age / remaining time”.

## 5. Sign-in

Sign-in means the application has decided it trusts a user and now needs to persist that identity.

The handler:

```text
- receives a principal and authentication properties;
- creates an AuthenticationTicket;
- optionally stores the ticket in ITicketStore;
- protects/serializes the ticket or stores the session key;
- appends the auth cookie to the response.
```

Events around this flow:

```text
OnSigningIn  -> before cookie is written;
OnSignedIn   -> after sign-in work is done.
```

The screenshot road also distinguishes `SigningInContext` and `SignedInContext`: the first is a customization point before writing; the second observes/extends the completed sign-in path.

## 6. Sign-out

Sign-out removes persisted authentication state.

The handler:

```text
- deletes the browser cookie;
- removes the server-side ticket if ITicketStore is used;
- can run signing-out event logic;
- writes response changes at the appropriate lifecycle point.
```

Event:

```text
OnSigningOut -> customize or observe sign-out before final cookie deletion / response effects.
```

## 7. FinishResponseAsync

A repeated point in the screenshots is `FinishResponseAsync`. It matters because cookie writes are response effects.

The handler may decide during authenticate that the cookie should be renewed, but the actual `Set-Cookie` header must be emitted when the response is still writable. So a finish-response callback is registered and later performs the write/delete/renew behavior.

Practical meaning:

```text
Authenticate phase can decide “refresh needed”.
Finish response phase actually appends/deletes/renews cookie headers.
```

This also explains why the notes mention “can write to response” near redirect and cookie-event contexts.

## 8. ValidatePrincipal

`OnValidatePrincipal` is the event that gives the app a chance to re-check an existing ticket.

Uses:

```text
- reject principal if account/session is no longer valid;
- replace principal;
- request renewal;
- enforce server-side changes after cookie was issued.
```

The context road includes `ValidatePrincipalContext`, which is the event context used by this validation hook.

## 9. Redirect events

Cookie auth often handles browser flows through redirects rather than plain status codes.

The notes track redirect events:

```text
OnRedirectToLogin       -> challenge / unauthenticated user should log in;
OnRedirectToAccessDenied -> forbid / authenticated but not allowed;
OnRedirectToLogout      -> sign-out/logout redirect;
OnRedirectToReturnUrl   -> return-url redirect after auth action.
```

These are cookie-specific response customizations. They are different from JWT bearer outcomes, which are reserved for R03B/P04.

## 10. Cookie event contexts

The screenshots group event names with their context objects:

```text
SigningInContext
SignedInContext
ValidatePrincipalContext
SigningOutContext
CookieRedirectContext
CheckSlidingExpirationContext
```

The key idea is that events are not random callbacks: each one exists at a precise point in the handler lifecycle and receives a context that exposes the ticket/properties/response/redirect details relevant to that point.

## 11. Source-backed evidence table

| Source group | What it supports |
|---|---|
| S-254-S-264, S-295-S-303, S-309 | cookie ticket read/ensure/handle-authenticate/refresh/finish-response road |
| S-284-S-291 | `ITicketStore` sign-in/authenticate/refresh/sign-out mechanics |
| S-265-S-283, S-292-S-294 | sign-in/sign-out, append/delete cookie, finish response |
| S-203-S-230, S-238-S-246 | cookie events: signing-in, signed-in, validate-principal, signing-out, redirects |
| S-231-S-237, S-247-S-253 | redirect contexts, response writing, sliding expiration and renewal criteria |
| S-304-S-307 | checked but excluded; JWT bearer token lookup/handler flow, reserved for R03A |

## 12. Questions / hooks for later study

```text
- When should a cookie contain the full ticket versus only an ITicketStore key?
- Which cookie events are safe for mutation and which should only observe?
- How does sliding expiration balance security, UX, and server load?
- How do cookie redirects differ from JWT bearer challenge/forbid behavior?
- How does FinishResponseAsync avoid writing headers after response start?
```
