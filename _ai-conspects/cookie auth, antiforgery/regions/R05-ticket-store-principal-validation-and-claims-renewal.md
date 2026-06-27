# R05 — `ITicketStore`, principal validation, and claims renewal

## Coverage

```text
Image uses: S-091–S-127 (37)
SVG text nodes assigned to region: 30
Status: visually and semantically verified
```

## `ITicketStore` model

Without a session store, cookie authentication serializes the complete protected authentication ticket into the browser cookie. `ITicketStore` changes the model: the cookie contains a key while claims and properties live server-side.

Reasons include large claim sets, smaller cookies, immediate server-side revocation, and avoiding sensitive identity/claim payloads in the browser cookie. A distributed implementation uses a shared cache, protects serialized ticket bytes at rest, chooses a TTL from ticket expiration or a fallback, and implements:

- `StoreAsync` to create a key and save a ticket;
- `RenewAsync` to update the same key;
- `RetrieveAsync` to unprotect and deserialize;
- `RemoveAsync` on logout/revocation.

Corrupt or unprotectable cache entries are treated as missing so the user must authenticate again.

## Request and renewal lifecycle

The traced lifecycle is:

- login stores the protected ticket and returns a key cookie;
- a later request retrieves the ticket by key and reconstructs the principal;
- renewal serializes/protects the refreshed ticket and updates the same cache key;
- logout removes the key.

`RenewAsync` is triggered when validation replaces the principal and sets `ShouldRenew`, or when other handler renewal rules require reissue. With no `ITicketStore`, renewal writes a new ticket into the cookie. With a store, it updates server-side state while the browser keeps the session-key cookie.

## `OnValidatePrincipal`

`OnValidatePrincipal` is part of cookie authentication validation. Before it runs, the handler has already read the cookie, optionally retrieved the stored ticket, unprotected/deserialized it, and reconstructed a candidate `ClaimsPrincipal`.

The event is for application-level trust decisions: whether the user still exists, the account is disabled, roles/claims/security version changed, or the cookie should be rejected or renewed. It differs from authorization, which runs afterward and asks whether the accepted identity may access a resource.

A straightforward database lookup inside the event can run on every authenticated request. That may be correct but expensive. Typical mitigations are a security-stamp/version claim, periodic revalidation, cached user snapshots, refresh only on explicit account-changing events, or ASP.NET Core Identity’s validator pattern.

## Updating claims reliably

Changing database claims does not mutate an already-issued ticket. Reliable patterns are:

1. explicitly rebuild the principal and call `SignInAsync` when the application knows claims changed;
2. detect stale claims during `OnValidatePrincipal`, call `ReplacePrincipal(newPrincipal)`, and set `ShouldRenew = true`;
3. reject the principal and require re-login when seamless refresh is undesirable.

The documented contract is replacement, not mutating the existing `ClaimsIdentity` in place. `ReplacePrincipal` affects the current request; `ShouldRenew` tells the handler to persist the refreshed ticket for future requests.

`ITicketStore` is not required for this refresh mechanism. It only changes where renewed ticket data is stored.

## Choosing the mechanism

Use `OnValidatePrincipal` for later-request detection, version/security-stamp checks, and automatic refresh. Use explicit `SignInAsync` when the current request itself changed identity data and an immediate replacement ticket is desired. `IClaimsTransformation` is simpler when claims are needed only for the current request and do not have to be persisted into the authentication ticket.
