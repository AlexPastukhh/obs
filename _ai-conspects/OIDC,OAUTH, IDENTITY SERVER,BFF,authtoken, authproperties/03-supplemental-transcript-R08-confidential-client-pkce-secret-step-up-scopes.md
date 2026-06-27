# Supplemental screenshot transcript — R08: Confidential-client PKCE, client secrets and step-up scopes

Conspect: `OIDC,OAUTH, IDENTITY SERVER,BFF,authtoken, authproperties`  
Generated: 2026-06-22 05:30:00 UTC

## Coverage

```text
region: R08
image uses reviewed: 12
unique screenshots represented: 12
duplicate placements retained: 0
remaining image uses in region: 0
```

## Semantic transcript

A focused confidential-client flow showing that PKCE and client authentication solve different problems, plus examples of requesting additional scopes only when an operation needs them.

## Key points recovered from the screenshots

- Confidential clients should generally use both PKCE and client authentication: PKCE binds the flow instance, while the secret authenticates the client.
- The client generates a verifier/challenge, receives a code, then redeems the code using both verifier and client credentials.
- OIDC client configuration should request only baseline scopes by default.
- A controller can inspect existing granted scopes and issue a new challenge with additional requested scopes for step-up consent.
- Opaque tokens require introspection rather than local JWT parsing when a client must inspect authorization state.

## Nearby SVG labels used for orientation

- pkce confidential client, mvc,bff
- pkce public client spa
- what is conf/pub clients and why bff is good
- atuh prop items
- additional scropes in
- with
- !!!
- setting all needed scopes

## Covered screenshot uses

```text
IU-180, IU-181, IU-182, IU-183, IU-184, IU-185, IU-246, IU-247, IU-248, IU-249, IU-250, IU-251
```

## Audit note

Every listed use is closed in `data/supplemental-image-uses-v002-closed.*`.  
Exact code, punctuation and configuration values remain governed by the recovered images and the complete SVG preserved in `source/`.
