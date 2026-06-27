# Supplemental screenshot transcript — R03: Identity resources, profile service, UserInfo, claims and refresh rotation

Conspect: `OIDC,OAUTH, IDENTITY SERVER,BFF,authtoken, authproperties`  
Generated: 2026-06-22 05:30:00 UTC

## Coverage

```text
region: R03
image uses reviewed: 39
unique screenshots represented: 34
duplicate placements retained: 5
remaining image uses in region: 0
```

## Semantic transcript

IdentityServer identity resources and custom identity scopes, IProfileService claim emission, client scope requests, user claims in API resources, UserInfo behavior and refresh-token rotation for browser and SPA scenarios.

## Key points recovered from the screenshots

- IdentityResources define identity data the client may request and receive in the ID token or UserInfo response.
- A custom identity scope must be registered, allowed for the client and populated by IProfileService.
- API resource UserClaims control which user claims may be placed into access tokens for APIs.
- ProfileService remains the central claim factory; default profile configuration does not automatically emit every custom claim.
- UserInfo is useful for retrieving allowed claims after login without overloading the ID token.
- Refresh-token rotation makes each refresh token single-use; concurrent SPA refresh attempts need serialization or a server-side BFF/token manager.

## Nearby SVG labels used for orientation

- confidential/public clients/pkce flow/both lients types flow,bff
- should we use refresh tokens in spa
- token rotation
- for api to decide whether this user is allowed to request it(in addition to scopes)
- claimsprincipal by middleware, userclaims in apiresources are needed
- gets in id token and what is being populated into
- iprofser
- so identity resources is what client app
- def challenge scheme how works
- app.Run();
- app.MapDefaultControllerRoute();
- app.UseAuthorization();
- oidc.TokenValidationParameters.RoleClaimType = "role";
- });
- oidc.TokenValidationParameters.NameClaimType = "name";
- oidc.Scope.Clear();
- oidc.Scope.Add("openid");    // required for OIDC
- // Scopes requested at login
- clients config
- are there sec reason or just a payload?

## Covered screenshot uses

```text
IU-143, IU-144, IU-145, IU-146, IU-147, IU-156, IU-157, IU-158, IU-159, IU-160, IU-161, IU-162, IU-163, IU-164, IU-200, IU-201, IU-202, IU-203, IU-204, IU-209, IU-210, IU-211, IU-212, IU-213, IU-214, IU-229, IU-230, IU-231, IU-232, IU-233, IU-234, IU-235, IU-236, IU-237, IU-238, IU-239, IU-240, IU-268, IU-269
```

## Audit note

Every listed use is closed in `data/supplemental-image-uses-v002-closed.*`.  
Exact code, punctuation and configuration values remain governed by the recovered images and the complete SVG preserved in `source/`.
