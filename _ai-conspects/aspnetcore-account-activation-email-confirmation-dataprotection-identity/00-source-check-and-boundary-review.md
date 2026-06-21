# Stage0 - ASP.NET Core account activation / email confirmation / Data Protection / Identity source check and boundary review v001

Source: `account activation.svg`  
Batch: `batch-auth-cors-antiforgery-basic-auth-account-activation-stage0-v001`

## Counts

```text
unique embedded images: 21
image uses on canvas: 22
text labels parsed: 9
duplicate image uses by content: 1
```

## Candidate regions

| Region | Images | Text labels | Meaning |
|---|---:|---:|---|
| R01 | 5 | 2 | Account activation overview, security requirements, token formats, links/query parameters and React token reading. |
| R02 | 9 | 3 | Custom account activation token flow with IDataProtector/TimeLimitedDataProtector, token creation, URL-safe encoding, validation and activation link generation. |
| R03 | 8 | 4 | Registration, storing inactive users, ASP.NET Core Identity email confirmation tokens, confirm endpoints, token hashing/storage choices and practical checklist. |

## Important rule

```text
Stage0 split is checklist only, not source of truth.
Each transcript pass must re-check visual/semantic boundaries and nearby candidates.
Text-only canvas code/notes must be processed together with the related screenshots.
```

## Next

Suggested next step after this combined batch is committed: a second combined batch archive containing the transcript/final-coverage pass for all three conspects. Each conspect remains a separate folder, but delivery stays one archive per three-conspect batch.
