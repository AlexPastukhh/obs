# Current Source of Truth - Windows Auth

Generated: 2026-06-13 05:40:28 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
P01/R01R02 core Windows Auth and ASP.NET Core/IIS implementation: next
P02/R03R04 dual schemes, company deployment and troubleshooting: pending
```

## Stage0 inventory

```text
unique embedded images: 45
image uses: 47
text labels: 2
```

## Proposed split

```text
R01 core Windows Auth model / AD / Kerberos / NTLM: 16 image uses
R02 ASP.NET Core / IIS / Negotiate implementation: 11 image uses
R03 dual scheme Windows Auth + cookies/client auth: 7 image uses
R04 company/domain deployment / SPN / troubleshooting: 13 image uses
```

## Next pass

```text
P01 / R01R02:
Windows Authentication mental model, AD/Kerberos/NTLM,
ASP.NET Core Negotiate/IIS setup and basic implementation.
```
