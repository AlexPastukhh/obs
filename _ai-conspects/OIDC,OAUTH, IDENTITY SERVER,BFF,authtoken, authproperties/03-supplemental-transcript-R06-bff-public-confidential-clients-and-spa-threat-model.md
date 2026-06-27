# Supplemental screenshot transcript — R06: BFF, public/confidential clients and the SPA threat model

Conspect: `OIDC,OAUTH, IDENTITY SERVER,BFF,authtoken, authproperties`  
Generated: 2026-06-22 05:30:00 UTC

## Coverage

```text
region: R06
image uses reviewed: 3
unique screenshots represented: 3
duplicate placements retained: 0
remaining image uses in region: 0
```

## Semantic transcript

Why public clients cannot keep secrets, what confidential clients can protect and why a Backend-for-Frontend is often preferred for browser applications.

## Key points recovered from the screenshots

- A public client is not defective; it simply has a threat model in which distributed code cannot protect a secret.
- A confidential server application can protect client credentials and refresh tokens.
- A BFF keeps tokens server-side, exposes same-origin endpoints to the browser and reduces token theft through XSS or browser storage.
- BFF architecture does not remove all browser risks, but it simplifies token handling and reduces CORS/API exposure.

## Nearby SVG labels used for orientation

- what is conf/pub clients and why bff is good
- pkce public client spa
- confidential/public clients/pkce flow/both lients types flow,bff

## Covered screenshot uses

```text
IU-177, IU-178, IU-179
```

## Audit note

Every listed use is closed in `data/supplemental-image-uses-v002-closed.*`.  
Exact code, punctuation and configuration values remain governed by the recovered images and the complete SVG preserved in `source/`.
