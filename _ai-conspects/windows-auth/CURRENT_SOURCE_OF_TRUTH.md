# Current Source of Truth - Windows Auth

Generated: 2026-06-13 05:49:12 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
R01 core Windows Auth model / AD / Kerberos / NTLM: transcript v001 done
R02 ASP.NET Core / IIS / Negotiate basic implementation: transcript v001 done
R03 dual scheme Windows Auth + cookies/client auth: transcript v001 done
R04 company/domain deployment / SPN / troubleshooting: transcript v001 done
Final coverage audit: next
```

## Coverage after Stage2

```text
total image uses: 47
processed-in-r01-v001: 16
processed-in-r02-v001: 11
processed-in-r03-v001: 7
processed-in-r04-v001: 13
pending/problem rows before final audit: 0
```

## Current split policy

```text
Default: 50-80 images.
Can be bigger: 80-120 if the road is coherent.
Exception: 120+ only on explicit request or one very cohesive road.
```

## Next pass

```text
Final coverage audit:
verify all 47 image uses are processed,
no candidate/reserved/pending/unreviewed rows remain,
record coverage-complete or concrete problems.
```
