# Supplemental screenshot transcript — R04: IdentityServer resources, clients, lifetimes, production configuration and OIDC options

Conspect: `OIDC,OAUTH, IDENTITY SERVER,BFF,authtoken, authproperties`  
Generated: 2026-06-22 05:30:00 UTC

## Coverage

```text
region: R04
image uses reviewed: 34
unique screenshots represented: 34
duplicate placements retained: 0
remaining image uses in region: 0
```

## Semantic transcript

Complete IdentityServer and ASP.NET Core OIDC configuration: identity resources, API scopes/resources, MVC, SPA and service clients, token lifetimes, claims mapping, refresh-token options, production certificates, persistent configuration stores, reverse-proxy forwarded headers, OIDC events and multi-scheme setups.

## Key points recovered from the screenshots

- Identity resources, API scopes and API resources model identity data, permissions and protected APIs separately.
- MVC/BFF clients use authorization code + PKCE and usually a secret; SPAs use authorization code + PKCE without a secret; services use client credentials.
- Token and refresh-token lifetimes, reuse/rotation policy, absolute/sliding expiration and offline_access must be set deliberately.
- Production replaces developer signing credentials with managed certificates/keys and commonly persists clients, grants and tokens in a configuration/operational store.
- Behind a reverse proxy, forwarded headers and public issuer/origin configuration must be correct or discovery and redirect URIs break.
- OIDC client options cover authority, client credentials, response type, scopes, token saving, claim mapping, callbacks, sign-out and event hooks.

## Nearby SVG labels used for orientation

- idp config
- so identity resources is what client app
- gets in id token and what is being populated into
- for api to decide whether this user is allowed to request it(in addition to scopes)
- claimsprincipal by middleware, userclaims in apiresources are needed
- confidential/public clients/pkce flow/both lients types flow,bff
- what is conf/pub clients and why bff is good
- pkce public client spa
- token rotation
- should we use refresh tokens in spa
- why
- are there sec reason or just a payload?
- clients config
- using Microsoft.AspNetCore.Authentication.Cookies;
- var sid = Guid.NewGuid().ToString("N"); // our server session id
- // Add sid claim to the cookie identity (small)
- var identity = (ClaimsIdentity)ctx.Principal!.Identity!;
- using Microsoft.AspNetCore.Authentication.OpenIdConnect;
- using System.Security.Claims;
- options.Events = new OpenIdConnectEvents

## Covered screenshot uses

```text
IU-122, IU-123, IU-124, IU-125, IU-126, IU-127, IU-128, IU-129, IU-130, IU-131, IU-132, IU-133, IU-134, IU-135, IU-136, IU-137, IU-138, IU-139, IU-140, IU-141, IU-142, IU-186, IU-187, IU-188, IU-189, IU-190, IU-191, IU-192, IU-193, IU-194, IU-195, IU-196, IU-197, IU-198
```

## Audit note

Every listed use is closed in `data/supplemental-image-uses-v002-closed.*`.  
Exact code, punctuation and configuration values remain governed by the recovered images and the complete SVG preserved in `source/`.
