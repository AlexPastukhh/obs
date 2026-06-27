# Supplemental screenshot transcript — R07: API resource UserClaims, scopes, PKCE and client validation

Conspect: `OIDC,OAUTH, IDENTITY SERVER,BFF,authtoken, authproperties`  
Generated: 2026-06-22 05:30:00 UTC

## Coverage

```text
region: R07
image uses reviewed: 17
unique screenshots represented: 17
duplicate placements retained: 0
remaining image uses in region: 0
```

## Semantic transcript

Relationship among identity resources, API scopes and API resource UserClaims; authorization policies; PKCE mechanics and limits; client registration and custom validation.

## Key points recovered from the screenshots

- Identity resources answer what identity data the client may receive; API scopes answer what actions were granted; API resource UserClaims answer what subject data the API may receive.
- Scopes and claims work together: scopes represent granted permissions, while claims describe the user or client.
- PKCE binds the authorization request and code redemption using code_challenge/code_verifier and prevents authorization-code interception.
- PKCE does not replace client authentication for confidential clients and does not by itself stop XSS or stolen browser tokens.
- Client AllowedScopes and API definitions must line up, and authorization policies should validate required scopes/claims explicitly.

## Nearby SVG labels used for orientation

- api resources
- idp config
- for custom id resources
- so identity resources is what client app
- pkce public client spa
- pkce confidential client, mvc,bff
- what is conf/pub clients and why bff is good
- atuh prop items
- scope
- additional scropes in
- !!!
- setting all needed scopes

## Covered screenshot uses

```text
IU-148, IU-149, IU-150, IU-151, IU-152, IU-153, IU-154, IU-155, IU-173, IU-174, IU-175, IU-176, IU-241, IU-242, IU-243, IU-244, IU-245
```

## Audit note

Every listed use is closed in `data/supplemental-image-uses-v002-closed.*`.  
Exact code, punctuation and configuration values remain governed by the recovered images and the complete SVG preserved in `source/`.
