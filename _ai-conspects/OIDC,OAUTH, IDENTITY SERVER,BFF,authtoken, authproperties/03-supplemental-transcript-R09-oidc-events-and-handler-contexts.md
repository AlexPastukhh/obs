# Supplemental screenshot transcript — R09: OIDC events and handler contexts

Conspect: `OIDC,OAUTH, IDENTITY SERVER,BFF,authtoken, authproperties`  
Generated: 2026-06-22 05:30:00 UTC

## Coverage

```text
region: R09
image uses reviewed: 16
unique screenshots represented: 16
duplicate placements retained: 0
remaining image uses in region: 0
```

## Semantic transcript

Lifecycle of ASP.NET Core OpenID Connect events and the data available in each event context, including redirects, authorization-code receipt, token response, token validation, UserInfo, ticket creation and remote failures.

## Key points recovered from the screenshots

- OnRedirectToIdentityProvider customizes the outbound authorize request; the sign-out variant customizes the end-session request.
- OnMessageReceived runs when the middleware first receives an inbound OIDC message.
- OnAuthorizationCodeReceived runs after code receipt and can take over code redemption.
- OnTokenResponseReceived exposes token-endpoint results before final principal construction.
- OnTokenValidated can add or normalize claims and reject sign-in.
- OnUserInformationReceived handles UserInfo JSON; OnTicketReceived is the final point before the local ticket is persisted.
- OnRemoteFailure handles IdP errors, correlation/state failures, token endpoint errors and validation failures.

## Nearby SVG labels used for orientation

- oidc events
- !!!
- setting all needed scopes
- using IdentityModel.Client;
- public ApiClientWithBffTokens(IHttpClientFactory httpClientFactory, ITokenStore tokenStore)
- if (tokens.ExpiresAt > DateTimeOffset.UtcNow.AddMinutes(1))
- }, ct);
- atuh prop items

## Covered screenshot uses

```text
IU-252, IU-253, IU-254, IU-255, IU-256, IU-257, IU-258, IU-259, IU-260, IU-261, IU-262, IU-263, IU-264, IU-265, IU-266, IU-267
```

## Audit note

Every listed use is closed in `data/supplemental-image-uses-v002-closed.*`.  
Exact code, punctuation and configuration values remain governed by the recovered images and the complete SVG preserved in `source/`.
