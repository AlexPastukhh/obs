# Stage0 - ASP.NET Core Basic authentication / custom handler / HttpClient / curl source check and boundary review v001

Source: `basic auth.svg`  
Batch: `batch-auth-cors-antiforgery-basic-auth-account-activation-stage0-v001`

## Counts

```text
unique embedded images: 24
image uses on canvas: 24
text labels parsed: 6
duplicate image uses by content: 0
```

## Candidate regions

| Region | Images | Text labels | Meaning |
|---|---:|---:|---|
| R01 | 8 | 5 | Basic auth theory, use cases, why it is risky without TLS, curl/PowerShell/script examples and external client behavior. |
| R02 | 10 | 0 | ASP.NET Core custom Basic authentication handler, scheme/options registration, claims principal creation, challenge/401 behavior and credential cache notes. |
| R03 | 6 | 1 | Automatic vs manual Authorization header usage, HttpClient handlers, curl/project examples and protected endpoints. |

## Important rule

```text
Stage0 split is checklist only, not source of truth.
Each transcript pass must re-check visual/semantic boundaries and nearby candidates.
Text-only canvas code/notes must be processed together with the related screenshots.
```

## Next

Suggested next step after this combined batch is committed: a second combined batch archive containing the transcript/final-coverage pass for all three conspects. Each conspect remains a separate folder, but delivery stays one archive per three-conspect batch.
