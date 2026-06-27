# Supplemental screenshot transcript — R05: Client types, grant types, secrets and claim mapping

Conspect: `OIDC,OAUTH, IDENTITY SERVER,BFF,authtoken, authproperties`  
Generated: 2026-06-22 05:30:00 UTC

## Coverage

```text
region: R05
image uses reviewed: 13
unique screenshots represented: 13
duplicate placements retained: 1
remaining image uses in region: 0
```

## Semantic transcript

Public and confidential client definitions, AllowedGrantTypes, RequireClientSecret, ClientSecrets, service-to-service credentials, SPA restrictions and JWT claim-type mapping.

## Key points recovered from the screenshots

- Browser/mobile clients cannot safely keep long-lived secrets and therefore use authorization code + PKCE without a client secret.
- Confidential server-side clients authenticate at the token endpoint and should rotate secrets or use stronger credentials where supported.
- Client credentials is appropriate for service identities, not user login.
- AllowedGrantTypes restrict which OAuth/OIDC flow a client may use; RequireClientSecret and ClientSecrets define client authentication.
- JWT inbound claim mapping can rename role/name claim types; production code should configure mapping explicitly and test authorization policies.

## Nearby SVG labels used for orientation

- token rotation
- should we use refresh tokens in spa
- what is conf/pub clients and why bff is good
- confidential/public clients/pkce flow/both lients types flow,bff
- pkce public client spa
- using Microsoft.AspNetCore.Authentication.OpenIdConnect;
- using System.Security.Claims;
- options.Events = new OpenIdConnectEvents
- setting all needed scopes
- app.Run();
- !!!
- app.MapDefaultControllerRoute();
- app.UseAuthorization();

## Covered screenshot uses

```text
IU-165, IU-166, IU-167, IU-168, IU-169, IU-170, IU-171, IU-172, IU-199, IU-205, IU-206, IU-207, IU-208
```

## Audit note

Every listed use is closed in `data/supplemental-image-uses-v002-closed.*`.  
Exact code, punctuation and configuration values remain governed by the recovered images and the complete SVG preserved in `source/`.
