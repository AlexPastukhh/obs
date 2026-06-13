# Current Source of Truth - Windows Auth

Generated: 2026-06-13 05:43:48 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
R01 core Windows Auth model / AD / Kerberos / NTLM: transcript v001 done
R02 ASP.NET Core / IIS / Negotiate basic implementation: transcript v001 done
P02/R03R04 dual schemes, company deployment and troubleshooting: next
```

## P01 boundary decisions

```text
R01 included:
16 image uses

R02 included:
11 image uses

Checked-not-P01 / reserved for P02:
S-026, S-025, S-024, S-023, S-022, S-021, S-040, S-030, S-031, S-032, S-029, S-033, S-028, S-027, S-034, S-035, S-036, S-037, S-038, S-039
```

## Current split policy

```text
Default: 50-80 images.
Can be bigger: 80-120 if the road is coherent.
Exception: 120+ only on explicit request or one very cohesive road.
```

## Next pass

```text
P02 / R03R04:
dual scheme Windows Auth + cookies/client auth,
company/domain deployment, SPN, roles/claims/whoami,
401/login-prompt troubleshooting.
```
