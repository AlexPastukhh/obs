# Stage0 v002 — AUTHORIZATION source-identity correction and boundary review

Generated: 2026-07-04 UTC

## Goal

Restore `_ai-conspects/AUTHORIZATION/` to the authorization-policies /
requirements / handlers / resource-based-authorization canvas, preserve the
complete uploaded source, and prevent the separate authorization-flow canvas
from being treated as this conspect.

## Authoritative source

```text
file: source/AUTHORIZATION.svg
uploaded name: AUTHORIZATION(3).svg
SHA-256: 1736c127c36e6cb6aa6416067669adc34a0491f473bf6d67ac4772200aef9106
Git blob SHA: 6ea0f2d4afdc0d6f39252b25661172b4de7adc80
viewBox: 0 0 21698.38176736547 15922.010865642986
```

## Direct structural inventory

```text
SVG symbol/image definitions: 113
unique embedded images by content: 112
image uses on canvas: 119
duplicate extra placements: 7
native SVG text lines: 110
native SVG text groups: 35
broken embedded images: 0
external image references: 0
dangling <use> references: 0
```

## Source-identity defect corrected

The previous Stage0 for this folder correctly described the same conceptual
conspect, but it used an older incomplete source:

```text
68 unique images
75 image uses
110 text lines
```

Later, files and ledgers from the separate
`authorization flow,autorization options, framework,
authorizationmiddlewareresulthandler` conspect were placed into the
`AUTHORIZATION` folder and presented as:

```text
119 unique images
120 image uses
112 text lines
```

That `119/120/112` source has a different canvas, a different viewBox and zero
image-content overlap with this `AUTHORIZATION` source. It belongs only in the
separate authorization-flow folder.

## Current region plan

| Region | Source range | Unique sources | Uses | Meaning |
|---|---|---:|---:|---|
| R01 | `S-001..S-020` | 20 | 20 | Core authorization model, policies, claims and resource-based authorization |
| R02 | `S-021..S-040` | 20 | 20 | PendingRequirements lifecycle, policy composition, registration and resource handlers |
| R03 | `S-041..S-060` | 20 | 23 | Requirement types, Succeed/Fail, claims, scopes and handler design |
| R04 | `S-061..S-076` | 16 | 20 | IAuthorizationRequirementData, explicit Fail cases and multiple handlers |
| R05 | `S-077..S-092` | 16 | 16 | Alternative handlers, OAuth scopes, non-generic handlers and batching |
| R06 | `S-093..S-104` | 12 | 12 | FallbackPolicy, AllowAnonymous, combined rules and the AND/OR mental model |
| R07 | `S-105..S-112` | 8 | 8 | Cross-requirement success, custom failure and dynamic authorization engines |

## Stage rule

This Stage0 closes source identity, image preservation, placement inventory,
canvas-text inventory and visual boundaries only.

It does **not** mark the transcript complete.

Every source still needs a near-literal source block preserving visible wording
and code. The existing semantic material is retained only as an integrated study
draft, not as evidence that 112 screenshots were transcribed.
