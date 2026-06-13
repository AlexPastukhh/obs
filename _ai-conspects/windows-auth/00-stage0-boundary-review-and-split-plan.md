# Stage 0 - Boundary Review and Split Plan v001

Generated: 2026-06-13 05:40:28 UTC

## Source

```text
windows auth.svg
```

## Extracted inventory

```text
unique embedded images: 45
image uses: 47
text labels: 2
```

## Stage0 rule

This is not a transcript.

The inventory is a checklist only. Region ownership is not final until visual/semantic boundary review.

A region is complete only after:

```text
visual/semantic boundary review
nearby/candidate screenshot check
verified transcript archive
```

## Proposed split

```text
P01 / R01+R02:
Windows Authentication core model + ASP.NET Core/IIS implementation.
R01: 16 images
R02: 11 images

P02 / R03+R04:
Dual auth schemes + company/domain deployment/troubleshooting.
R03: 7 images
R04: 13 images
```

## Regions

### R01 - Core Windows Auth model / AD / Kerberos / NTLM

```text
S-001, S-002, S-003, S-018, S-019, S-020, S-017, S-016, S-015, S-010, S-009, S-008, S-007, S-006, S-005, S-004
```

Meaning:

```text
Windows Authentication concept, Active Directory, domain identity,
Kerberos/NTLM, request flow, intranet/public-site constraints,
basic roles/groups explanation.
```

Boundary concern:

```text
Check R02 implementation screenshots before closing; conceptual and implementation screenshots are adjacent.
```

### R02 - ASP.NET Core / IIS / Negotiate basic implementation

```text
S-014, S-013, S-012, S-011, S-047, S-041, S-046, S-042, S-045, S-043, S-044
```

Meaning:

```text
AddAuthentication/AddNegotiate, Authorize attributes,
IIS/IIS Express Windows Authentication toggles,
basic controller/program setup.
```

Boundary concern:

```text
Check R03 dual-scheme screenshots before closing; do not mix basic Negotiate setup with cookie/client-auth composition.
```

### R03 - Dual scheme: Windows Auth + cookies/client auth

```text
S-026, S-025, S-024, S-023, S-022, S-021, S-040
```

Meaning:

```text
Windows Auth for employees plus cookie auth for clients,
multiple schemes, default scheme setup, policies, controller/action scheme selection.
```

Boundary concern:

```text
Check R04 deployment/troubleshooting screenshots as neighbor; shared scheme/policy terms appear there.
```

### R04 - Company/domain deployment / SPN / troubleshooting

```text
S-030, S-031, S-032, S-029, S-033, S-028, S-027, S-034, S-035, S-036, S-037, S-038, S-039
```

Meaning:

```text
IIS Express vs real domain setup, company domain environment,
app pool identity, SPN, roles/claims/whoami endpoints,
401/login-prompt troubleshooting.
```

Boundary concern:

```text
Check R03 dual-scheme examples before closing; avoid duplicating auth-scheme composition.
```

## Important labels noticed

```text
implementations
basic info about configuring computers for windows auth
```

## Next

Create P01/R01R02 transcript only after reviewing:

```text
contact-sheet-P01-R01R02-core-model-aspnet-iis-implementation.png
contact-sheet-P02-R03R04-dual-scheme-company-deploy-troubleshooting.png
canvas-map-labels-and-image-boxes.png
```
