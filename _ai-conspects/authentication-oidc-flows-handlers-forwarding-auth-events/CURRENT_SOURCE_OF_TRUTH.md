# Current Source of Truth - Authentication / OIDC / Flows / Handlers / Forwarding / Auth Events

Generated: 2026-06-02 02:05:14 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
R01 base auth middleware / AuthenticationService / forwarding basics: transcript v001 done
R02 cookie auth core / ticket store / events / sliding expiration / redirects: transcript v001 done
R03A JWT bearer handler pipeline: transcript v001 done
R03B JWT outcomes / failure / challenge / forbid: transcript v001 done
R04 OIDC / PKCE / sign-in bridge: transcript v001 done
Final coverage audit: done
```

## Final audit verdict

```text
total image uses: 325
covered image uses: 325
problem image uses: 0
verdict: coverage-complete
```

## Pass-size rule going forward

```text
Default: 50-80 images.
Can be bigger: 80-120 if the road is coherent.
Exception: 120+ only on explicit request or one very cohesive road, with internal subregions preserved.
```

## Closure note

```text
This conspect is complete unless a later manual review finds a concrete transcript-quality issue or a specific misassigned image.
```
