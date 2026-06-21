# R01/R02/R07 - final remaining pass: option mechanics, hedging, production-ready exception mapping

Generated: 2026-06-02 11:30:51 UTC

## Direction check

Goal:
Convert the Polly Excalidraw conspect into source-preserving AI-readable text with no lost screenshots.

Now:
R03 and R04/R05/R06 are done. This pass closes all remaining planned images: R01/R02/R07.

This step:
Close R01/R02/R07 in one final archive with explicit per-region sections and final coverage audit.

Why:
The remaining set is 54 images; it is safe to close together because R01/R02 and R07 are separated in the transcript and ledger.

Next:
Review cached diff, commit, then this Polly conspect is complete by image-use coverage.

---
## 0.1 Area overview / key ideas / reading quality

What this pass is about:
```text
- R01: retry options, ShouldHandle args, Outcome, DelayGenerator fallback, request/context metadata, nesting/order effects
- R02: standard vs custom pipeline selection, hedging mechanics, explicit pipeline/provider usage, testing/conditional limiter examples
- R07: production-ready full cheat sheet, exception/status mapping, final handling examples
```
Key ideas:
- ShouldHandle/DelayGenerator callbacks reason over Outcome and ResilienceContext.
- Returning null from nullable delay generators means fallback only where the delegate contract defines that behavior.
- Request-aware decisions require request metadata via result.RequestMessage or ResilienceContext properties.
- Strategy nesting/order changes what wraps each retry/hedge attempt.
- Hedging/custom provider/testing examples are request-dependent and often require explicit pipeline/provider usage.
- Production-ready mapping separates HTTP status handling, transient exception mapping, and what should bubble.

Reading quality:
```text
overall_conceptual_understanding: high
source_image_readability: medium-high; R07 is code-heavy/wide
transcript_method: visual/contact-sheet review with source-preserving summaries and preserved PNGs
limitations:
  - Exact code punctuation should be checked against preserved PNGs.
  - R07 is conceptually separate but included in same final coverage archive.
confidence_summary: High for coverage and boundary; medium-high for exact code punctuation.
```

---
## 0.2 Boundary / coverage review
Included counts:
```text
R01: 16
R02: 26
R07: 12
Total: 54
Remaining after this pass: 0
```

Boundary note:
```text
R01/R02 and R07 are not collapsed into one semantic topic. They are handled together only as the final coverage pass. Each source keeps its own region decision.
```

---
## 1. Source inventory
| Region source | Global source | Region | fileId | Status | Topic |
|---|---|---|---|---|---|
| R01-S001 | S-004 | R01 | `334c28aac9` | `processed-in-r01r02r07-final-v001` | R01 retry options: ShouldHandle args, Outcome, DelayGenerator fallback, Retry-After |
| R01-S002 | S-005 | R01 | `267483ed5e` | `processed-in-r01r02r07-final-v001` | R01 retry options: ShouldHandle args, Outcome, DelayGenerator fallback, Retry-After |
| R01-S003 | S-007 | R01 | `c3bbc91a69` | `processed-in-r01r02r07-final-v001` | R01 retry options: ShouldHandle args, Outcome, DelayGenerator fallback, Retry-After |
| R01-S004 | S-008 | R01 | `b018717e5c` | `processed-in-r01r02r07-final-v001` | R01 retry options: ShouldHandle args, Outcome, DelayGenerator fallback, Retry-After |
| R01-S005 | S-016 | R01 | `812d9d362b` | `processed-in-r01r02r07-final-v001` | R01 retry options: ShouldHandle args, Outcome, DelayGenerator fallback, Retry-After |
| R01-S006 | S-021 | R01 | `c6c78918dc` | `processed-in-r01r02r07-final-v001` | R01 retry options: ShouldHandle args, Outcome, DelayGenerator fallback, Retry-After |
| R01-S007 | S-022 | R01 | `c7cf32651d` | `processed-in-r01r02r07-final-v001` | R01 retry options: ShouldHandle args, Outcome, DelayGenerator fallback, Retry-After |
| R01-S008 | S-025 | R01 | `33f67f3df8` | `processed-in-r01r02r07-final-v001` | R01 retry options: ShouldHandle args, Outcome, DelayGenerator fallback, Retry-After |
| R01-S009 | S-031 | R01 | `fc8053ad8a` | `processed-in-r01r02r07-final-v001` | R01 retry options: ShouldHandle args, Outcome, DelayGenerator fallback, Retry-After |
| R01-S010 | S-034 | R01 | `cf4aba673c` | `processed-in-r01r02r07-final-v001` | R01 retry options: ShouldHandle args, Outcome, DelayGenerator fallback, Retry-After |
| R01-S011 | S-047 | R01 | `377ad8734c` | `processed-in-r01r02r07-final-v001` | R01 retry options: ShouldHandle args, Outcome, DelayGenerator fallback, Retry-After |
| R01-S012 | S-052 | R01 | `39f128b4d5` | `processed-in-r01r02r07-final-v001` | R01 retry options: ShouldHandle args, Outcome, DelayGenerator fallback, Retry-After |
| R01-S013 | S-064 | R01 | `7a1d15ca37` | `processed-in-r01r02r07-final-v001` | R01 strategy nesting/order and request/context mechanics |
| R01-S014 | S-073 | R01 | `8504d1915e` | `processed-in-r01r02r07-final-v001` | R01 strategy nesting/order and request/context mechanics |
| R01-S015 | S-074 | R01 | `344ef2b020` | `processed-in-r01r02r07-final-v001` | R01 retry options: ShouldHandle args, Outcome, DelayGenerator fallback, Retry-After |
| R01-S016 | S-116 | R01 | `03e57d9c30` | `processed-in-r01r02r07-final-v001` | R01 strategy nesting/order and request/context mechanics |
| R02-S001 | S-006 | R02 | `2bbd5cb57c` | `processed-in-r01r02r07-final-v001` | R02 new standard vs custom / explicit pipeline usage |
| R02-S002 | S-019 | R02 | `7dabb30d03` | `processed-in-r01r02r07-final-v001` | R02 standard/custom/hedging road and explicit pipeline/provider usage |
| R02-S003 | S-039 | R02 | `d623048952` | `processed-in-r01r02r07-final-v001` | R02 standard/custom/hedging road and explicit pipeline/provider usage |
| R02-S004 | S-041 | R02 | `3d110ff6b3` | `processed-in-r01r02r07-final-v001` | R02 standard/custom/hedging road and explicit pipeline/provider usage |
| R02-S005 | S-053 | R02 | `5f9e2fb3e2` | `processed-in-r01r02r07-final-v001` | R02 standard/custom/hedging road and explicit pipeline/provider usage |
| R02-S006 | S-056 | R02 | `a4db22a75f` | `processed-in-r01r02r07-final-v001` | R02 standard/custom/hedging road and explicit pipeline/provider usage |
| R02-S007 | S-068 | R02 | `b018717e5c` | `processed-in-r01r02r07-final-v001` | R02 standard/custom/hedging road and explicit pipeline/provider usage |
| R02-S008 | S-077 | R02 | `6342b0e96a` | `processed-in-r01r02r07-final-v001` | R02 standard/custom/hedging road and explicit pipeline/provider usage |
| R02-S009 | S-079 | R02 | `c6c78918dc` | `processed-in-r01r02r07-final-v001` | R02 standard/custom/hedging road and explicit pipeline/provider usage |
| R02-S010 | S-082 | R02 | `12778194d0` | `processed-in-r01r02r07-final-v001` | R02 standard/custom/hedging road and explicit pipeline/provider usage |
| R02-S011 | S-083 | R02 | `fc8053ad8a` | `processed-in-r01r02r07-final-v001` | R02 standard/custom/hedging road and explicit pipeline/provider usage |
| R02-S012 | S-088 | R02 | `7048156b70` | `processed-in-r01r02r07-final-v001` | R02 standard/custom/hedging road and explicit pipeline/provider usage |
| R02-S013 | S-092 | R02 | `c7cf32651d` | `processed-in-r01r02r07-final-v001` | R02 standard/custom/hedging road and explicit pipeline/provider usage |
| R02-S014 | S-094 | R02 | `c51aae1bdb` | `processed-in-r01r02r07-final-v001` | R02 standard/custom/hedging road and explicit pipeline/provider usage |
| R02-S015 | S-101 | R02 | `a9581bee93` | `processed-in-r01r02r07-final-v001` | R02 standard/custom/hedging road and explicit pipeline/provider usage |
| R02-S016 | S-114 | R02 | `e3c053fa6c` | `processed-in-r01r02r07-final-v001` | R02 standard/custom/hedging road and explicit pipeline/provider usage |
| R02-S017 | S-118 | R02 | `0dc6095cb3` | `processed-in-r01r02r07-final-v001` | R02 standard/custom/hedging road and explicit pipeline/provider usage |
| R02-S018 | S-127 | R02 | `ff7f3e7177` | `processed-in-r01r02r07-final-v001` | R02 new standard vs custom / explicit pipeline usage |
| R02-S019 | S-134 | R02 | `9720169f20` | `processed-in-r01r02r07-final-v001` | R02 new standard vs custom / explicit pipeline usage |
| R02-S020 | S-138 | R02 | `78311235f1` | `processed-in-r01r02r07-final-v001` | R02 new standard vs custom / explicit pipeline usage |
| R02-S021 | S-144 | R02 | `595961545c` | `processed-in-r01r02r07-final-v001` | R02 testing / conditional rate limiting examples |
| R02-S022 | S-150 | R02 | `704a3a0c7e` | `processed-in-r01r02r07-final-v001` | R02 testing / conditional rate limiting examples |
| R02-S023 | S-151 | R02 | `b7c836d98c` | `processed-in-r01r02r07-final-v001` | R02 testing / conditional rate limiting examples |
| R02-S024 | S-156 | R02 | `777d5a578d` | `processed-in-r01r02r07-final-v001` | R02 testing / conditional rate limiting examples |
| R02-S025 | S-161 | R02 | `08f7d43a84` | `processed-in-r01r02r07-final-v001` | R02 testing / conditional rate limiting examples |
| R02-S026 | S-167 | R02 | `a494e5fbbc` | `processed-in-r01r02r07-final-v001` | R02 testing / conditional rate limiting examples |
| R07-S001 | S-014 | R07 | `0375241708` | `processed-in-r01r02r07-final-v001` | R07 production-ready cheat sheet / exception mapping |
| R07-S002 | S-027 | R07 | `347d669f32` | `processed-in-r01r02r07-final-v001` | R07 production-ready cheat sheet / exception mapping |
| R07-S003 | S-030 | R07 | `4b4ce425a3` | `processed-in-r01r02r07-final-v001` | R07 production-ready cheat sheet / exception mapping |
| R07-S004 | S-044 | R07 | `fdb5e44e62` | `processed-in-r01r02r07-final-v001` | R07 production-ready cheat sheet / exception mapping |
| R07-S005 | S-059 | R07 | `b1c434af62` | `processed-in-r01r02r07-final-v001` | R07 production-ready cheat sheet / exception mapping |
| R07-S006 | S-069 | R07 | `784c5d3900` | `processed-in-r01r02r07-final-v001` | R07 production-ready cheat sheet / exception mapping |
| R07-S007 | S-081 | R07 | `dcd85fd548` | `processed-in-r01r02r07-final-v001` | R07 production-ready cheat sheet / exception mapping |
| R07-S008 | S-085 | R07 | `043ea65a3f` | `processed-in-r01r02r07-final-v001` | R07 production-ready cheat sheet / exception mapping |
| R07-S009 | S-097 | R07 | `46837f4d4d` | `processed-in-r01r02r07-final-v001` | R07 production-ready cheat sheet / exception mapping |
| R07-S010 | S-108 | R07 | `d067829fd3` | `processed-in-r01r02r07-final-v001` | R07 production-ready cheat sheet / exception mapping |
| R07-S011 | S-130 | R07 | `88a43a5e75` | `processed-in-r01r02r07-final-v001` | R07 production-ready cheat sheet / exception mapping |
| R07-S012 | S-139 | R07 | `0536a69afb` | `processed-in-r01r02r07-final-v001` | R07 production-ready cheat sheet / exception mapping |

---
## 2. Source transcript / source-preserving notes

### R01 - ShouldHandle / DelayGenerator / request context / nesting

#### R01-S001 / S-004 - `334c28aac9`

Metadata:
- image_use_id: `IU-004`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: setting properties | args args in shouldhandle | why do we need to attach request to context | new standart vs custom | SETTING TRUE/FALSE | BASED ON REQUEST METHOD

Verified meaning / source note:
```text
Explains ShouldHandle/RetryPredicateArguments and Outcome<TResult>: callbacks can inspect attempt number, context, result, or exception to decide whether to retry.
```
---

#### R01-S002 / S-005 - `267483ed5e`

Metadata:
- image_use_id: `IU-005`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: args args in shouldhandle | why do we need to attach request to context | delay generator, way to fallback to defaults | setting properties | nesting | new standart vs custom

Verified meaning / source note:
```text
Explains retry DelayGenerator behavior: custom delay from Retry-After or fallback to configured exponential/jitter delay when the nullable callback returns null.
```
---

#### R01-S003 / S-007 - `c3bbc91a69`

Metadata:
- image_use_id: `IU-007`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: delay generator, way to fallback to defaults | args args in shouldhandle | why do we need to attach request to context | setting properties | nesting | new standart vs custom

Verified meaning / source note:
```text
Explains retry DelayGenerator behavior: custom delay from Retry-After or fallback to configured exponential/jitter delay when the nullable callback returns null.
```
---

#### R01-S004 / S-008 - `b018717e5c`

Metadata:
- image_use_id: `IU-008`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: setting properties | new standart vs custom | SETTING TRUE/FALSE | BASED ON REQUEST METHOD | need to use pipeline excplicitly with pipeline provider | args args in shouldhandle
- duplicate_source_ids: `S-008,S-068`

Verified meaning / source note:
```text
Explains ShouldHandle/RetryPredicateArguments and Outcome<TResult>: callbacks can inspect attempt number, context, result, or exception to decide whether to retry.
```
---

#### R01-S005 / S-016 - `812d9d362b`

Metadata:
- image_use_id: `IU-016`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: setting properties | args args in shouldhandle | why do we need to attach request to context | new standart vs custom | SETTING TRUE/FALSE | BASED ON REQUEST METHOD

Verified meaning / source note:
```text
Explains ShouldHandle/RetryPredicateArguments and Outcome<TResult>: callbacks can inspect attempt number, context, result, or exception to decide whether to retry.
```
---

#### R01-S006 / S-021 - `c6c78918dc`

Metadata:
- image_use_id: `IU-021`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: setting properties | new standart vs custom | SETTING TRUE/FALSE | BASED ON REQUEST METHOD | need to use pipeline excplicitly with pipeline provider | args args in shouldhandle
- duplicate_source_ids: `S-021,S-079`

Verified meaning / source note:
```text
Explains ShouldHandle/RetryPredicateArguments and Outcome<TResult>: callbacks can inspect attempt number, context, result, or exception to decide whether to retry.
```
---

#### R01-S007 / S-022 - `c7cf32651d`

Metadata:
- image_use_id: `IU-022`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: delay generator, way to fallback to defaults | args args in shouldhandle | why do we need to attach request to context | setting properties | nesting | need to think about nesting in polly like that
- duplicate_source_ids: `S-022,S-092`

Verified meaning / source note:
```text
Explains retry DelayGenerator behavior: custom delay from Retry-After or fallback to configured exponential/jitter delay when the nullable callback returns null.
```
---

#### R01-S008 / S-025 - `33f67f3df8`

Metadata:
- image_use_id: `IU-025`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: args args in shouldhandle | why do we need to attach request to context | delay generator, way to fallback to defaults | setting properties | nesting | new standart vs custom

Verified meaning / source note:
```text
Explains retry DelayGenerator behavior: custom delay from Retry-After or fallback to configured exponential/jitter delay when the nullable callback returns null.
```
---

#### R01-S009 / S-031 - `fc8053ad8a`

Metadata:
- image_use_id: `IU-031`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: setting properties | SETTING TRUE/FALSE | BASED ON REQUEST METHOD | new standart vs custom | need to use pipeline excplicitly with pipeline provider | args args in shouldhandle
- duplicate_source_ids: `S-031,S-083`

Verified meaning / source note:
```text
Explains ShouldHandle/RetryPredicateArguments and Outcome<TResult>: callbacks can inspect attempt number, context, result, or exception to decide whether to retry.
```
---

#### R01-S010 / S-034 - `cf4aba673c`

Metadata:
- image_use_id: `IU-034`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: setting properties | args args in shouldhandle | why do we need to attach request to context | SETTING TRUE/FALSE | BASED ON REQUEST METHOD | new standart vs custom

Verified meaning / source note:
```text
Explains ShouldHandle/RetryPredicateArguments and Outcome<TResult>: callbacks can inspect attempt number, context, result, or exception to decide whether to retry.
```
---

#### R01-S011 / S-047 - `377ad8734c`

Metadata:
- image_use_id: `IU-047`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: setting properties | args args in shouldhandle | why do we need to attach request to context | SETTING TRUE/FALSE | BASED ON REQUEST METHOD | nesting

Verified meaning / source note:
```text
Explains ShouldHandle/RetryPredicateArguments and Outcome<TResult>: callbacks can inspect attempt number, context, result, or exception to decide whether to retry.
```
---

#### R01-S012 / S-052 - `39f128b4d5`

Metadata:
- image_use_id: `IU-052`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: setting properties | nesting | SETTING TRUE/FALSE | BASED ON REQUEST METHOD | args args in shouldhandle | why do we need to attach request to context

Verified meaning / source note:
```text
Explains ShouldHandle/RetryPredicateArguments and Outcome<TResult>: callbacks can inspect attempt number, context, result, or exception to decide whether to retry.
```
---

#### R01-S013 / S-064 - `7a1d15ca37`

Metadata:
- image_use_id: `IU-064`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: nesting | SETTING TRUE/FALSE | BASED ON REQUEST METHOD | setting properties | need to use pipeline excplicitly with pipeline provider | need to think about nesting in polly like that

Verified meaning / source note:
```text
Shows request-aware retry decisions by reading HttpRequestMessage from result or by attaching request metadata to ResilienceContext properties.
```
---

#### R01-S014 / S-073 - `8504d1915e`

Metadata:
- image_use_id: `IU-073`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: nesting | need to think about nesting in polly like that | whe nsomeything has multiple retries or hedge attempts | and we put something inside - we wrap each retry with one bulhead | and all retries affect bulkhead | SETTING TRUE/FALSE

Verified meaning / source note:
```text
Explains strategy nesting/order: retry or hedging attempts interact differently with bulkhead/outer-inner strategy placement.
```
---

#### R01-S015 / S-074 - `344ef2b020`

Metadata:
- image_use_id: `IU-074`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: nesting | need to think about nesting in polly like that | whe nsomeything has multiple retries or hedge attempts | and we put something inside - we wrap each retry with one bulhead | and all retries affect bulkhead | args args in shouldhandle

Verified meaning / source note:
```text
Explains ShouldHandle/RetryPredicateArguments and Outcome<TResult>: callbacks can inspect attempt number, context, result, or exception to decide whether to retry.
```
---

#### R01-S016 / S-116 - `03e57d9c30`

Metadata:
- image_use_id: `IU-116`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: need to think about nesting in polly like that | whe nsomeything has multiple retries or hedge attempts | and we put something inside - we wrap each retry with one bulhead | and all retries affect bulkhead | nesting | need to use pipeline excplicitly with pipeline provider

Verified meaning / source note:
```text
Explains strategy nesting/order: retry or hedging attempts interact differently with bulkhead/outer-inner strategy placement.
```
---

### R02 - standard vs custom / hedging / testing

#### R02-S001 / S-006 - `2bbd5cb57c`

Metadata:
- image_use_id: `IU-006`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: new standart vs custom | SETTING TRUE/FALSE | BASED ON REQUEST METHOD | custom | need to use pipeline excplicitly with pipeline provider | setting properties

Verified meaning / source note:
```text
R02 source about standard vs custom Polly setup and explicit pipeline use when ready-made handlers/options are not enough.
```
---

#### R02-S002 / S-019 - `7dabb30d03`

Metadata:
- image_use_id: `IU-019`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: SETTING TRUE/FALSE | BASED ON REQUEST METHOD | new standart vs custom | need to use pipeline excplicitly with pipeline provider | hedging priciple of work | custom

Verified meaning / source note:
```text
Explains standard/custom pipeline choice and hedging mechanics: explicit pipeline/provider usage, hedge attempts, delay/acquire behavior, and request-dependent configuration.
```
---

#### R02-S003 / S-039 - `d623048952`

Metadata:
- image_use_id: `IU-039`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: SETTING TRUE/FALSE | BASED ON REQUEST METHOD | need to use pipeline excplicitly with pipeline provider | new standart vs custom | hedging priciple of work | custom

Verified meaning / source note:
```text
Explains standard/custom pipeline choice and hedging mechanics: explicit pipeline/provider usage, hedge attempts, delay/acquire behavior, and request-dependent configuration.
```
---

#### R02-S004 / S-041 - `3d110ff6b3`

Metadata:
- image_use_id: `IU-041`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: SETTING TRUE/FALSE | BASED ON REQUEST METHOD | need to use pipeline excplicitly with pipeline provider | hedging priciple of work | new standart vs custom | custom

Verified meaning / source note:
```text
Explains standard/custom pipeline choice and hedging mechanics: explicit pipeline/provider usage, hedge attempts, delay/acquire behavior, and request-dependent configuration.
```
---

#### R02-S005 / S-053 - `5f9e2fb3e2`

Metadata:
- image_use_id: `IU-053`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: SETTING TRUE/FALSE | BASED ON REQUEST METHOD | need to use pipeline excplicitly with pipeline provider | hedging priciple of work | new standart vs custom | custom

Verified meaning / source note:
```text
Explains standard/custom pipeline choice and hedging mechanics: explicit pipeline/provider usage, hedge attempts, delay/acquire behavior, and request-dependent configuration.
```
---

#### R02-S006 / S-056 - `a4db22a75f`

Metadata:
- image_use_id: `IU-056`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: need to use pipeline excplicitly with pipeline provider | SETTING TRUE/FALSE | BASED ON REQUEST METHOD | hedging priciple of work | new standart vs custom | custom

Verified meaning / source note:
```text
Explains standard/custom pipeline choice and hedging mechanics: explicit pipeline/provider usage, hedge attempts, delay/acquire behavior, and request-dependent configuration.
```
---

#### R02-S007 / S-068 - `b018717e5c`

Metadata:
- image_use_id: `IU-068`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: need to use pipeline excplicitly with pipeline provider | SETTING TRUE/FALSE | BASED ON REQUEST METHOD | hedging priciple of work | new standart vs custom | custom
- duplicate_source_ids: `S-008,S-068`

Verified meaning / source note:
```text
Explains standard/custom pipeline choice and hedging mechanics: explicit pipeline/provider usage, hedge attempts, delay/acquire behavior, and request-dependent configuration.
```
---

#### R02-S008 / S-077 - `6342b0e96a`

Metadata:
- image_use_id: `IU-077`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: hedging priciple of work | need to use pipeline excplicitly with pipeline provider | SETTING TRUE/FALSE | BASED ON REQUEST METHOD | !!! | using strategyopiton need to acquire

Verified meaning / source note:
```text
Explains standard/custom pipeline choice and hedging mechanics: explicit pipeline/provider usage, hedge attempts, delay/acquire behavior, and request-dependent configuration.
```
---

#### R02-S009 / S-079 - `c6c78918dc`

Metadata:
- image_use_id: `IU-079`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: hedging priciple of work | need to use pipeline excplicitly with pipeline provider | SETTING TRUE/FALSE | BASED ON REQUEST METHOD | new standart vs custom | !!!
- duplicate_source_ids: `S-021,S-079`

Verified meaning / source note:
```text
Explains standard/custom pipeline choice and hedging mechanics: explicit pipeline/provider usage, hedge attempts, delay/acquire behavior, and request-dependent configuration.
```
---

#### R02-S010 / S-082 - `12778194d0`

Metadata:
- image_use_id: `IU-082`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: hedging priciple of work | need to use pipeline excplicitly with pipeline provider | !!! | using strategyopiton need to acquire | SETTING TRUE/FALSE | BASED ON REQUEST METHOD

Verified meaning / source note:
```text
Explains standard/custom pipeline choice and hedging mechanics: explicit pipeline/provider usage, hedge attempts, delay/acquire behavior, and request-dependent configuration.
```
---

#### R02-S011 / S-083 - `fc8053ad8a`

Metadata:
- image_use_id: `IU-083`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: need to use pipeline excplicitly with pipeline provider | hedging priciple of work | SETTING TRUE/FALSE | BASED ON REQUEST METHOD | using strategyopiton need to acquire | !!!
- duplicate_source_ids: `S-031,S-083`

Verified meaning / source note:
```text
Explains standard/custom pipeline choice and hedging mechanics: explicit pipeline/provider usage, hedge attempts, delay/acquire behavior, and request-dependent configuration.
```
---

#### R02-S012 / S-088 - `7048156b70`

Metadata:
- image_use_id: `IU-088`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: hedging priciple of work | need to use pipeline excplicitly with pipeline provider | !!! | using strategyopiton need to acquire | SETTING TRUE/FALSE | BASED ON REQUEST METHOD

Verified meaning / source note:
```text
Explains standard/custom pipeline choice and hedging mechanics: explicit pipeline/provider usage, hedge attempts, delay/acquire behavior, and request-dependent configuration.
```
---

#### R02-S013 / S-092 - `c7cf32651d`

Metadata:
- image_use_id: `IU-092`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: hedging priciple of work | using strategyopiton need to acquire | !!! | need to use pipeline excplicitly with pipeline provider | from threading we return our limiter types | rate limiter in polly
- duplicate_source_ids: `S-022,S-092`

Verified meaning / source note:
```text
Explains standard/custom pipeline choice and hedging mechanics: explicit pipeline/provider usage, hedge attempts, delay/acquire behavior, and request-dependent configuration.
```
---

#### R02-S014 / S-094 - `c51aae1bdb`

Metadata:
- image_use_id: `IU-094`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: need to use pipeline excplicitly with pipeline provider | hedging priciple of work | SETTING TRUE/FALSE | BASED ON REQUEST METHOD | using strategyopiton need to acquire | !!!

Verified meaning / source note:
```text
Explains standard/custom pipeline choice and hedging mechanics: explicit pipeline/provider usage, hedge attempts, delay/acquire behavior, and request-dependent configuration.
```
---

#### R02-S015 / S-101 - `a9581bee93`

Metadata:
- image_use_id: `IU-101`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: need to use pipeline excplicitly with pipeline provider | hedging priciple of work | SETTING TRUE/FALSE | BASED ON REQUEST METHOD | using strategyopiton need to acquire | !!!

Verified meaning / source note:
```text
Explains standard/custom pipeline choice and hedging mechanics: explicit pipeline/provider usage, hedge attempts, delay/acquire behavior, and request-dependent configuration.
```
---

#### R02-S016 / S-114 - `e3c053fa6c`

Metadata:
- image_use_id: `IU-114`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: hedging priciple of work | need to use pipeline excplicitly with pipeline provider | SETTING TRUE/FALSE | BASED ON REQUEST METHOD | using strategyopiton need to acquire | !!!

Verified meaning / source note:
```text
Explains standard/custom pipeline choice and hedging mechanics: explicit pipeline/provider usage, hedge attempts, delay/acquire behavior, and request-dependent configuration.
```
---

#### R02-S017 / S-118 - `0dc6095cb3`

Metadata:
- image_use_id: `IU-118`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: hedging priciple of work | need to use pipeline excplicitly with pipeline provider | using strategyopiton need to acquire | need to think about nesting in polly like that | whe nsomeything has multiple retries or hedge attempts | and we put something inside - we wrap each retry with one bulhead

Verified meaning / source note:
```text
Explains standard/custom pipeline choice and hedging mechanics: explicit pipeline/provider usage, hedge attempts, delay/acquire behavior, and request-dependent configuration.
```
---

#### R02-S018 / S-127 - `ff7f3e7177`

Metadata:
- image_use_id: `IU-127`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: need to think about nesting in polly like that | whe nsomeything has multiple retries or hedge attempts | and we put something inside - we wrap each retry with one bulhead | and all retries affect bulkhead | nesting | need to use pipeline excplicitly with pipeline provider

Verified meaning / source note:
```text
Follow-up source about strategy nesting/hedging effects and how attempts are wrapped when strategies are composed.
```
---

#### R02-S019 / S-134 - `9720169f20`

Metadata:
- image_use_id: `IU-134`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: need to think about nesting in polly like that | whe nsomeything has multiple retries or hedge attempts | and we put something inside - we wrap each retry with one bulhead | and all retries affect bulkhead | from threading we return our limiter types | using strategyopiton need to acquire

Verified meaning / source note:
```text
Follow-up source about strategy nesting/hedging effects and how attempts are wrapped when strategies are composed.
```
---

#### R02-S020 / S-138 - `78311235f1`

Metadata:
- image_use_id: `IU-138`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: need to think about nesting in polly like that | whe nsomeything has multiple retries or hedge attempts | and we put something inside - we wrap each retry with one bulhead | and all retries affect bulkhead | nesting | need to use pipeline excplicitly with pipeline provider

Verified meaning / source note:
```text
Follow-up source about strategy nesting/hedging effects and how attempts are wrapped when strategies are composed.
```
---

#### R02-S021 / S-144 - `595961545c`

Metadata:
- image_use_id: `IU-144`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: for testing | from threading we return our limiter types | need to think about nesting in polly like that | whe nsomeything has multiple retries or hedge attempts | and we put something inside - we wrap each retry with one bulhead | and all retries affect bulkhead

Verified meaning / source note:
```text
Testing-focused source around conditional rate limiting, custom limiter/provider setup, and controllable strategy behavior.
```
---

#### R02-S022 / S-150 - `704a3a0c7e`

Metadata:
- image_use_id: `IU-150`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: for testing | from threading we return our limiter types | need to think about nesting in polly like that | whe nsomeything has multiple retries or hedge attempts | and we put something inside - we wrap each retry with one bulhead | and all retries affect bulkhead

Verified meaning / source note:
```text
Testing-focused source around conditional rate limiting, custom limiter/provider setup, and controllable strategy behavior.
```
---

#### R02-S023 / S-151 - `b7c836d98c`

Metadata:
- image_use_id: `IU-151`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: for testing | conditional rate limiting | from threading we return our limiter types | using strategyopiton need to acquire | !!! | rate limiter in polly

Verified meaning / source note:
```text
Testing-focused source around conditional rate limiting, custom limiter/provider setup, and controllable strategy behavior.
```
---

#### R02-S024 / S-156 - `777d5a578d`

Metadata:
- image_use_id: `IU-156`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: for testing | conditional rate limiting | from threading we return our limiter types | using strategyopiton need to acquire | !!! | rate limiter in polly

Verified meaning / source note:
```text
Testing-focused source around conditional rate limiting, custom limiter/provider setup, and controllable strategy behavior.
```
---

#### R02-S025 / S-161 - `08f7d43a84`

Metadata:
- image_use_id: `IU-161`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: for testing | conditional rate limiting | from threading we return our limiter types | using strategyopiton need to acquire | !!! | rate limiter in polly

Verified meaning / source note:
```text
Testing-focused source around conditional rate limiting, custom limiter/provider setup, and controllable strategy behavior.
```
---

#### R02-S026 / S-167 - `a494e5fbbc`

Metadata:
- image_use_id: `IU-167`
- readability: `medium-high`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: for testing | conditional rate limiting | from threading we return our limiter types | using strategyopiton need to acquire | !!! | classic polly transient failures

Verified meaning / source note:
```text
Testing-focused source around conditional rate limiting, custom limiter/provider setup, and controllable strategy behavior.
```
---

### R07 - production-ready final cheat sheet / exception mapping

#### R07-S001 / S-014 - `0375241708`

Metadata:
- image_use_id: `IU-014`
- readability: `medium-high-wide-code`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: using Polly; | using Polly.Timeout; | using Polly.Bulkhead; | using Polly.CircuitBreaker; | using Polly.Retry; | using Polly.Wrap;

Verified meaning / source note:
```text
Production-ready final cheat-sheet source: full policy/wrap code and exception/status mapping notes for what to handle, what to bubble, and how newer/classic mapping differs.
```
---

#### R07-S002 / S-027 - `347d669f32`

Metadata:
- image_use_id: `IU-027`
- readability: `medium-high-wide-code`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: using Polly; | using Polly.Timeout; | using Polly.Bulkhead; | using Polly.CircuitBreaker; | using Polly.Retry; | using Polly.Wrap;
- duplicate_source_ids: `S-027,S-100`

Verified meaning / source note:
```text
Production-ready final cheat-sheet source: full policy/wrap code and exception/status mapping notes for what to handle, what to bubble, and how newer/classic mapping differs.
```
---

#### R07-S003 / S-030 - `4b4ce425a3`

Metadata:
- image_use_id: `IU-030`
- readability: `medium-high-wide-code`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: using Polly; | using Polly.Timeout; | using Polly.Bulkhead; | using Polly.CircuitBreaker; | using Polly.Retry; | using Polly.Wrap;

Verified meaning / source note:
```text
Production-ready final cheat-sheet source: full policy/wrap code and exception/status mapping notes for what to handle, what to bubble, and how newer/classic mapping differs.
```
---

#### R07-S004 / S-044 - `fdb5e44e62`

Metadata:
- image_use_id: `IU-044`
- readability: `medium-high-wide-code`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: using Polly; | using Polly.Timeout; | using Polly.Bulkhead; | using Polly.CircuitBreaker; | using Polly.Retry; | using Polly.Wrap;
- duplicate_source_ids: `S-044,S-178`

Verified meaning / source note:
```text
Production-ready final cheat-sheet source: full policy/wrap code and exception/status mapping notes for what to handle, what to bubble, and how newer/classic mapping differs.
```
---

#### R07-S005 / S-059 - `b1c434af62`

Metadata:
- image_use_id: `IU-059`
- readability: `medium-high-wide-code`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: using Polly; | using Polly.Timeout; | using Polly.Bulkhead; | using Polly.CircuitBreaker; | using Polly.Retry; | using Polly.Wrap;

Verified meaning / source note:
```text
Production-ready final cheat-sheet source: full policy/wrap code and exception/status mapping notes for what to handle, what to bubble, and how newer/classic mapping differs.
```
---

#### R07-S006 / S-069 - `784c5d3900`

Metadata:
- image_use_id: `IU-069`
- readability: `medium-high-wide-code`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: mapping | Exception handling | using Polly; | using Polly.Timeout; | using Polly.Bulkhead; | using Polly.CircuitBreaker;

Verified meaning / source note:
```text
Production-ready final cheat-sheet source: full policy/wrap code and exception/status mapping notes for what to handle, what to bubble, and how newer/classic mapping differs.
```
---

#### R07-S007 / S-081 - `dcd85fd548`

Metadata:
- image_use_id: `IU-081`
- readability: `medium-high-wide-code`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: mapping | Exception handling | try | { | var resp = await client.GetAsync(url, cancellationToken); | if (resp.StatusCode == HttpStatusCode.NotFound)

Verified meaning / source note:
```text
Production-ready final cheat-sheet source: full policy/wrap code and exception/status mapping notes for what to handle, what to bubble, and how newer/classic mapping differs.
```
---

#### R07-S008 / S-085 - `043ea65a3f`

Metadata:
- image_use_id: `IU-085`
- readability: `medium-high-wide-code`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: mapping | try | { | var resp = await client.GetAsync(url, cancellationToken); | if (resp.StatusCode == HttpStatusCode.NotFound) | return /* handle 404 */;

Verified meaning / source note:
```text
Production-ready final cheat-sheet source: full policy/wrap code and exception/status mapping notes for what to handle, what to bubble, and how newer/classic mapping differs.
```
---

#### R07-S009 / S-097 - `46837f4d4d`

Metadata:
- image_use_id: `IU-097`
- readability: `medium-high-wide-code`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: try | { | var resp = await client.GetAsync(url, cancellationToken); | if (resp.StatusCode == HttpStatusCode.NotFound) | return /* handle 404 */; | if ((int)resp.StatusCode >= 500)

Verified meaning / source note:
```text
Production-ready final cheat-sheet source: full policy/wrap code and exception/status mapping notes for what to handle, what to bubble, and how newer/classic mapping differs.
```
---

#### R07-S010 / S-108 - `d067829fd3`

Metadata:
- image_use_id: `IU-108`
- readability: `medium-high-wide-code`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: in newer | try | { | var resp = await client.GetAsync(url, cancellationToken); | if (resp.StatusCode == HttpStatusCode.NotFound) | return /* handle 404 */;

Verified meaning / source note:
```text
Production-ready final cheat-sheet source: full policy/wrap code and exception/status mapping notes for what to handle, what to bubble, and how newer/classic mapping differs.
```
---

#### R07-S011 / S-130 - `88a43a5e75`

Metadata:
- image_use_id: `IU-130`
- readability: `medium-high-wide-code`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: in newer | exception bubling | outer starts call inner one, not throw to inner | try | { | var resp = await client.GetAsync(url, cancellationToken);

Verified meaning / source note:
```text
Production-ready final cheat-sheet source: full policy/wrap code and exception/status mapping notes for what to handle, what to bubble, and how newer/classic mapping differs.
```
---

#### R07-S012 / S-139 - `0536a69afb`

Metadata:
- image_use_id: `IU-139`
- readability: `medium-high-wide-code`
- confidence: `high for boundary; medium-high for exact code punctuation`
- nearest_labels: in newer | exception bubling | outer starts call inner one, not throw to inner | so cant tell inner starts to not handle ex from outer because ex | bubble fro miner to outer and outer just call inner ones | try

Verified meaning / source note:
```text
Production-ready final cheat-sheet source: full policy/wrap code and exception/status mapping notes for what to handle, what to bubble, and how newer/classic mapping differs.
```
---

## 3. Cleaned source notes

- R01 closes retry option mechanics: ShouldHandle args, Outcome result/exception, DelayGenerator fallback, request/context access, and nesting/order implications.
- R02 closes standard/custom and hedging/testing mechanics: explicit pipeline/provider usage, hedge/acquire semantics, conditional limiter/testing examples.
- R07 closes the production-ready final code/mapping sheet: status-code handling, exception mapping, and final newer/production-ready exception handling notes.
- Duplicate image uses were handled per placement, not just per fileId.
- After this pass, image-review-ledger has zero unprocessed-stage0-candidate image uses.

---
## 4. Evidence table
| Claim | Evidence | Confidence |
|---|---|---|
| DelayGenerator null fallback and Outcome/ShouldHandle args are R01-owned mechanics | R01 sources S-004/S-005/S-007/S-022/S-025 and surrounding R01 source set | high |
| Request-aware retry decisions use Result.RequestMessage or ResilienceContext properties | R01 sources S-008/S-016/S-021/S-031/S-034/S-047/S-052 | high |
| Nesting/order affects retries/hedging/bulkhead-like strategies | R01 sources S-064/S-073/S-074/S-116 and R02 nesting follow-ups | high |
| Hedging/custom pipeline/provider/testing examples are R02-owned | R02 sources S-006/S-019/S-039/S-041/S-056/S-068/S-077-S-083/S-088/S-092-S-167 | high |
| Production-ready final exception mapping is R07-owned | R07 sources S-014/S-027/S-030/S-044/S-059/S-069/S-081/S-085/S-097/S-108/S-130/S-139 | high |
| Final coverage is closed | final-coverage-audit-stage3-v001.json: remaining_unclosed_count = 0 | high |

---
## 5. Question hooks

- What exactly is available inside RetryPredicateArguments<TResult>?
- When does returning null from DelayGenerator mean “use configured/default behavior”?
- How can Polly retry logic access HttpRequestMessage or request metadata?
- How does strategy nesting change whether retry/hedge attempts are wrapped by bulkhead/timeout/circuit breaker?
- When do you need explicit pipeline/provider usage instead of a standard ready-made resilience pipeline?
- How does hedging differ from retry in terms of multiple attempts and delay/acquire behavior?
- How should production-ready code map HTTP status codes, exceptions, and Polly strategy handling?
- Which images remain unprocessed after final audit?

---
## 6. Final coverage audit summary
```text
total image uses: 186
processed-in-r03-v001: 62
processed-in-r04r05r06-v001: 70
processed-in-r01r02r07-final-v001: 54
remaining unprocessed-stage0-candidate: 0
final verdict: complete by image-use coverage
```
