# Stage0 - ASP.NET Core authorization flow / authorization options source check and boundary review v001

Generated: 2026-06-02 17:10:00 UTC

## Direction check

Goal:
Convert the uploaded `authorization flow, autorization options, framework, authorizationmiddlewareresulthandler.svg` Excalidraw/SVG conspect into source-preserving AI-readable text without losing screenshots or canvas text.

Now:
This archive only creates the source/boundary checkpoint. No transcript is considered done yet.

This step:
Parse the SVG, extract embedded PNGs, collect image-use coordinates/text labels, create contact sheets, initial region split plan, duplicate-use list, and coverage ledger.

Why:
Before transcript passes, we need image inventory and candidate boundaries so the pass can process all screenshots and text-only notes without losing/duplicating material.

Next:
Start transcript pass after boundary review. Since total image-use count is 55 and the sheet has substantial text-only lower content, the whole conspect can probably be closed in one transcript pass if boundary review confirms coherence.

---

## Counts

```text
unique embedded images: 54
image uses on canvas: 55
text labels parsed: 64
duplicate image uses by extracted file/content: 1
```

## Candidate regions

| Region | Candidate images | Candidate text labels | Meaning |
|---|---:|---:|---|
| R01 | 19 | 18 | authorization metadata/options and policy construction: endpoint metadata, IAuthorizeData, AuthorizationPolicy, AuthorizationMiddleware entry and cache/policy-combine road |
| R02 | 29 | 12 | AuthorizationMiddleware execution: policy authentication, AllowAnonymous handling, resource selection, PolicyEvaluator.Authorize, IAuthorizationService and handler/evaluator flow |
| R03 | 7 | 34 | AuthorizationMiddlewareResultHandler/result handling: PolicyAuthorizationResult, challenge/forbid/succeeded, failed requirements, custom responses, loop over schemes and handler customization |

## Important rule

```text
Stage0 split is checklist only, not source of truth.
Each transcript pass must re-check visual/semantic boundaries and nearby candidates before marking a region done.
Text-only labels are part of the source material and must be processed with nearby screenshots.
```

## Suggested batching

```text
Pass 1 option A: R01+R02+R03 = 55 image uses + 64 parsed text labels.
Meaning: full authorization flow/options/result-handler conspect in one pass, if boundary review confirms coherence.

Fallback option B:
Pass 1: R01+R02 = metadata/options + AuthorizationMiddleware/PolicyEvaluator flow.
Pass 2: R03 = AuthorizationMiddlewareResultHandler / challenge-forbid custom response final coverage.
```
