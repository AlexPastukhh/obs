# R04 — Cookie options, scope, secure prefixes, and ticket format

## Coverage

```text
Image uses: S-052–S-090 (39)
SVG text nodes assigned to region: 17
Status: visually and semantically verified
```

## Scheme and cookie defaults

The canvas configures default authenticate, challenge, sign-in, sign-out, and forbid schemes, then configures `CookieAuthenticationOptions` through `AddCookie`. It covers cookie name, HttpOnly, `CookieSecurePolicy`, SameSite, path, domain, expiration/sliding expiration, claims issuer, redirect paths, events, and advanced forwarding settings.

`ExpireTimeSpan` controls the protected ticket lifetime; `SlidingExpiration` can reissue a fresh cookie after sufficient progress through the expiration window. This is not identical to browser `Max-Age`.

## Domain, host, and path

A host such as `app.example.com` and `admin.example.com` shares the parent domain `example.com` but remains a distinct full host. `www` has no protocol-level magic; it is another subdomain.

Cookie scope is controlled through the `Domain` attribute:

- omitting `Domain` produces a host-only cookie;
- setting `Domain=.example.com` permits the cookie for the parent domain and eligible subdomains.

There is no literal `Host` attribute in `Set-Cookie`. Browser developer tools may display a host/domain column, but the HTTP distinction is presence or absence of `Domain`.

`Path` controls URL-path scope, not host scope. An authentication cookie usually uses `/` so login applies throughout the application.

## Cookie names and collisions

Setting `Cookie.Name` avoids collisions when several applications, schemes, environments, or paths share a domain. Using the same default name can cause one app to overwrite or send a cookie intended for another. Distinct names also improve debugging.

## `__Host-` and `__Secure-`

The browser enforces prefix invariants:

- `__Secure-` requires a Secure cookie;
- `__Host-` requires Secure, `Path=/`, and no `Domain`.

An invalid combination can be rejected by the browser. `__Host-` already includes the secure requirement, so prefixes should not be concatenated. The strongest host-bound choice is a single `__Host-` name with the required attributes.

Without a prefix, the same option combination may be valid, but its intended invariants are only application convention and can be accidentally weakened by another response. Prefixes turn those invariants into browser-enforced rules.

## `TicketDataFormat` and Data Protection

`TicketDataFormat` protects and unprotects `AuthenticationTicket` values. The default is created from ASP.NET Core Data Protection and provides serialization, encryption/protection, integrity, key rotation, and ticket-expiration support.

Most applications should leave it at the default and configure Data Protection for shared multi-server keys/application name when needed. Custom formats are reserved for compatibility with another system, migration, specialized serialization, or intentionally shared tickets with special protection logic.

Advanced `Forward*` options belong to multi-scheme routing and are normally left unset in a simple cookie application.
