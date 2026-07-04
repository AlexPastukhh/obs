# Stage0 source check and boundary review v001 — Hashing

## Source

```text
uploaded source: hashing(3).svg
authoritative path: source/hashing.svg
SHA-256: b448bc181530f736edb053e72d146b1d9a8f09f14b5d33658d9d7a2eac2c8ecd
Git blob SHA: 06c1512a1fb13ee7a29070b2750d5f748d36eb5f
viewBox: 0 0 21374.025271065828 12113.344481710374
symbol definitions: 105
unique embedded screenshots: 104
image uses: 106
duplicate extra placements: 2
native SVG text lines: 70
native SVG text groups: 23
broken embedded images: 0
external image references: 0
dangling use references: 0
```

## Duplicate placements

- `S-057`: 2 placements;
- `S-065`: 2 placements.

## Region plan

| Region | Sources | Meaning |
|---|---|---|
| R01 | `S-001..S-018` | Threat model, salt, pepper and password-storage fundamentals |
| R02 | `S-019..S-036` | ASP.NET Core Identity setup, custom entities and cost-parameter basics |
| R03 | `S-037..S-054` | Fixed-time verification, PBKDF2 implementation and encoded formats |
| R04 | `S-055..S-070` | Identity hash payload, bcrypt, versioning and rehash decisions |
| R05 | `S-071..S-088` | Determinism, tuning, FixedTimeEquals and Argon2id mechanics |
| R06 | `S-089..S-104` | Migration, rehash-on-login and production parameter selection |

## Transcript decision

The source is screenshot-heavy and code-heavy. The package therefore keeps all extracted screenshots,
an overview, contact sheets, a source ledger, regional source blocks and an integrated study layer.
