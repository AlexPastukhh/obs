# Current Source of Truth - Authentication / OIDC / Flows / Handlers / Forwarding / Auth Events

Generated: 2026-06-02 01:38:16 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
R01 base auth middleware / AuthenticationService / forwarding basics: transcript v001 done
R02 cookie auth core / ticket store / events / sliding expiration / redirects: transcript v001 done
P03/R03A JWT bearer handler pipeline: next
```

## R02 note

```text
R02 used a larger combined pass: 100 included image uses.
It covers cookie ticket read/write, ITicketStore, refresh/sliding expiration, sign-in/sign-out, FinishResponseAsync, cookie events, and redirect events.
S-304-S307 were checked as neighboring JWT bearer material and reserved for P03/R03A.
```
