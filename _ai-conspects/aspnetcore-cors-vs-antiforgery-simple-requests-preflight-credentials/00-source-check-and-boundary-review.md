# Stage0 - ASP.NET Core CORS vs antiforgery / simple requests / preflight / credentials source check and boundary review v001

Source: `cors vs anti forgery.svg`  
Batch: `batch-auth-cors-antiforgery-basic-auth-account-activation-stage0-v001`

## Counts

```text
unique embedded images: 20
image uses on canvas: 20
text labels parsed: 5
duplicate image uses by content: 0
```

## Candidate regions

| Region | Images | Text labels | Meaning |
|---|---:|---:|---|
| R01 | 7 | 4 | Attacker capabilities, classic form/img requests, what CORS blocks, what it does not block, reading vs sending requests. |
| R02 | 8 | 1 | Simple requests, preflight behavior, cookie-authenticated cross-site POSTs, why CORS is not CSRF protection, server-side antiforgery validation. |
| R03 | 5 | 0 | XHR vs Fetch, modern API request patterns, failed preflight examples, practical CSRF/CORS defense checklist. |

## Important rule

```text
Stage0 split is checklist only, not source of truth.
Each transcript pass must re-check visual/semantic boundaries and nearby candidates.
Text-only canvas code/notes must be processed together with the related screenshots.
```

## Next

Suggested next step after this combined batch is committed: a second combined batch archive containing the transcript/final-coverage pass for all three conspects. Each conspect remains a separate folder, but delivery stays one archive per three-conspect batch.
