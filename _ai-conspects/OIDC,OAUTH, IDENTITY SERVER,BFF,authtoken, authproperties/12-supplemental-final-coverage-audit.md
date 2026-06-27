# Supplemental screenshot-layer coverage audit

Conspect: `OIDC,OAUTH, IDENTITY SERVER,BFF,authtoken, authproperties`  
Generated: 2026-06-22 05:30:00 UTC  
Scope wording corrected: 2026-06-27 01:00:00 UTC

## Scope

This audit proves that the recovered screenshot layer was processed. It does
not describe the historical text-only transcript as a complete final transcript.
The integrated full-conspect result is audited separately in
`14-full-conspect-final-coverage-audit.md`.

## Screenshot-layer result

```text
unique embedded images: 263
image uses on canvas: 269
duplicate image uses: 6
processed supplemental image uses: 269
remaining unclosed image uses: 0
```

## Regions

| Region | Topic | Uses | Unique | Duplicates | Remaining |
|---|---|---:|---:|---:|---:|
| R01 | Architecture, schemes, tickets, cookies and production basics | 44 | 44 | 0 | 0 |
| R02 | Authorization code, PKCE, MVC/API integration, refresh and server-side token storage | 91 | 91 | 0 | 0 |
| R03 | Identity resources, profile service, UserInfo, claims and refresh rotation | 39 | 34 | 5 | 0 |
| R04 | IdentityServer resources, clients, lifetimes, production configuration and OIDC options | 34 | 34 | 0 | 0 |
| R05 | Client types, grant types, secrets and claim mapping | 13 | 13 | 1 | 0 |
| R06 | BFF, public/confidential clients and the SPA threat model | 3 | 3 | 0 | 0 |
| R07 | API resource UserClaims, scopes, PKCE and client validation | 17 | 17 | 0 | 0 |
| R08 | Confidential-client PKCE, client secrets and step-up scopes | 12 | 12 | 0 | 0 |
| R09 | OIDC events and handler contexts | 16 | 16 | 0 | 0 |

## Closure rule

A screenshot placement is closed only when it appears in the recovered ledger,
belongs to a reviewed regional contact sheet and is represented in the
corresponding regional transcript.

## Conclusion

The screenshot layer is fully covered. The old text-only transcript remains a
legacy incomplete artifact; the authoritative integrated transcript is
`13-full-combined-final-transcript.md`.
