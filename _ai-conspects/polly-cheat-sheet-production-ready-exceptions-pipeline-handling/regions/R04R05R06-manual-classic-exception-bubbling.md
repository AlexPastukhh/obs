# R04+R05+R06 - Manual execution / classic extensions / exception bubbling

Conspect: `polly-cheat-sheet-production-ready-exceptions-pipeline-handling`  
File type: **source-preserving combined region transcript**  
Stage: **stage-2 / verified combined transcript v001**  
Generated: 2026-06-02 11:22:40 UTC

---

## Direction check

Goal:
Convert the Polly Excalidraw conspect into source-preserving AI-readable text without losing screenshots.

Now:
Stage0 is committed and R03 is done. This pass processes the next 70-image right-side road.

This step:
Process R04/R05/R06 together: manual execution/provider, classic Polly extensions, and exception bubbling/newer handling.

Why:
These three regions are connected: manual/classic policy composition flows into HttpPolicyExtensions and then into what exceptions/statuses bubble through policy layers.

Next:
R01/R02 option mechanics + hedging, then R07 production-ready full cheat sheet / final exception mapping.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:

- manual execution of Polly pipelines and custom pipeline provider patterns
- classic Polly policy examples: retry, timeout, circuit breaker, fallback, bulkhead, wrap
- classic HttpPolicyExtensions helpers around transient HTTP failures
- AddPolicyHandler / registry integration and choosing policies based on request
- exception bubbling through outer/inner strategies and newer Polly handling decisions
- how policy selection differs from handling exceptions inside nested strategies

Key ideas:

- Classic Polly policies are often composed as Retry + CircuitBreaker + Timeout, but order matters because outer policies see failures from inner policies.
- HttpPolicyExtensions.HandleTransientHttpError() is an opinionated shortcut: it handles HttpRequestException, HTTP 5xx, and HTTP 408, not every status code you might treat as transient.
- Classic AddPolicyHandler/AddPolicyHandlerFromRegistry attaches policies around HttpClient and can choose policies based on request.
- Exception bubbling is central: inner strategies cannot know whether an outer strategy will retry or swallow an exception.
- Newer Polly makes exception handling more explicit through ShouldHandle predicates and exception/status mapping.
- For dynamic policy/pipeline choice, select the policy/pipeline before execution based on request/context rather than expecting inner strategies to see outer decisions.

Reading quality:
```text
overall_conceptual_understanding: high
source_image_readability: medium-high: contact sheets are broad but connected; exact code punctuation should be checked in preserved PNGs
transcript_method: visual/contact-sheet review with source-preserving summaries and preserved PNGs
limitations:
- Some code screenshots are small; this transcript captures meaning/source ownership more confidently than exact punctuation.
- R07 production-ready full code sheet remains pending and may duplicate/expand some concepts.
confidence_summary: High for boundary and conceptual notes; medium-high for exact code line transcription.
```

---

## 0.2 Boundary / coverage

Included source count: `70`

R04 included count: `27`
```text
S-001, S-002, S-003, S-009, S-010, S-011, S-020, S-024, S-038, S-045, S-058, S-066, S-078, S-087, S-090, S-099, S-104, S-111, S-119, S-129, S-136, S-141, S-147, S-175, S-177, S-178, S-180
```

R05 included count: `18`
```text
S-012, S-015, S-018, S-029, S-036, S-037, S-046, S-049, S-050, S-061, S-063, S-072, S-086, S-091, S-098, S-107, S-117, S-125
```

R06 included count: `25`
```text
S-017, S-028, S-043, S-054, S-062, S-071, S-075, S-096, S-100, S-106, S-110, S-115, S-120, S-123, S-126, S-132, S-142, S-155, S-157, S-160, S-163, S-165, S-170, S-172, S-174
```

Checked / left for later:
```text
R01 -> ShouldHandle/delay/context/nesting mechanics; left for own region.
R02 -> new standard vs custom / hedging road; left for own region.
R03 -> already processed in stage1.
R07 -> production-ready full cheat sheet / final exception mapping; left for final pass.
```

Duplicate-use notes:
```text
- S-001 duplicates S-033; S-033 is already processed as the R03 placement, while S-001 is processed here as the R04 placement.
- S-011 duplicates S-155; both placements are inside this combined pass and are recorded as separate image uses.
- S-054 duplicates S-177 and S-062 duplicates S-180; both sides are inside this combined pass and are recorded by image use.
- S-178 duplicates S-044 and S-100 duplicates S-027; this pass processes the R04/R06 placements and leaves the R07 placements for R07 review.
```

---

## 1. Source inventory

| Combined source | Region source | Global source | Region | fileId | Topic | Duplicate uses |
|---|---|---|---|---|---|---|
| R04R05R06-S001 | R04-S001 | S-001 | R04 | `4aec986325` | Custom/manual Polly pipeline provider, context passing, registry/provider patterns | S-001,S-033 |
| R04R05R06-S002 | R04-S002 | S-002 | R04 | `277ca6910b` | Custom/manual Polly pipeline provider, context passing, registry/provider patterns | - |
| R04R05R06-S003 | R04-S003 | S-003 | R04 | `f96bff56a0` | Custom/manual Polly pipeline provider, context passing, registry/provider patterns | - |
| R04R05R06-S004 | R04-S004 | S-009 | R04 | `e7e0102b71` | Custom/manual Polly pipeline provider, context passing, registry/provider patterns | - |
| R04R05R06-S005 | R04-S005 | S-010 | R04 | `a9fb8b8fe5` | Custom/manual Polly pipeline provider, context passing, registry/provider patterns | - |
| R04R05R06-S006 | R04-S006 | S-011 | R04 | `d16b8dae56` | Custom/manual Polly pipeline provider, context passing, registry/provider patterns | S-011,S-155 |
| R04R05R06-S007 | R04-S007 | S-020 | R04 | `00817539fe` | Custom/manual Polly pipeline provider, context passing, registry/provider patterns | - |
| R04R05R06-S008 | R04-S008 | S-024 | R04 | `154e41c1f0` | Custom/manual Polly pipeline provider, context passing, registry/provider patterns | - |
| R04R05R06-S009 | R04-S009 | S-038 | R04 | `4756a372c9` | Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration | - |
| R04R05R06-S010 | R04-S010 | S-045 | R04 | `38c57f1440` | Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration | - |
| R04R05R06-S011 | R04-S011 | S-058 | R04 | `63b5a940f4` | Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration | - |
| R04R05R06-S012 | R04-S012 | S-066 | R04 | `19b9f83a9f` | Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration | - |
| R04R05R06-S013 | R04-S013 | S-078 | R04 | `afb5f438bc` | Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration | - |
| R04R05R06-S014 | R04-S014 | S-087 | R04 | `893dc6acd1` | Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration | - |
| R04R05R06-S015 | R04-S015 | S-090 | R04 | `291353b6eb` | Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration | - |
| R04R05R06-S016 | R04-S016 | S-099 | R04 | `bc0bef8a0c` | Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration | - |
| R04R05R06-S017 | R04-S017 | S-104 | R04 | `4fda85091a` | Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration | - |
| R04R05R06-S018 | R04-S018 | S-111 | R04 | `f4fdb2ed48` | Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration | - |
| R04R05R06-S019 | R04-S019 | S-119 | R04 | `b5dc89056b` | Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration | - |
| R04R05R06-S020 | R04-S020 | S-129 | R04 | `764fb76254` | Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration | - |
| R04R05R06-S021 | R04-S021 | S-136 | R04 | `26d2f62a54` | Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration | - |
| R04R05R06-S022 | R04-S022 | S-141 | R04 | `b6dcef0735` | Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration | - |
| R04R05R06-S023 | R04-S023 | S-147 | R04 | `b81bec3438` | Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration | - |
| R04R05R06-S024 | R04-S024 | S-175 | R04 | `d86de76424` | Manual/extension classic Polly transient-failure examples and newer-pipeline comparison | - |
| R04R05R06-S025 | R04-S025 | S-177 | R04 | `4de8acb1fd` | Manual/extension classic Polly transient-failure examples and newer-pipeline comparison | S-054,S-177 |
| R04R05R06-S026 | R04-S026 | S-178 | R04 | `fdb5e44e62` | Manual/extension classic Polly transient-failure examples and newer-pipeline comparison | S-044,S-178 |
| R04R05R06-S027 | R04-S027 | S-180 | R04 | `c6022c85f6` | Manual/extension classic Polly transient-failure examples and newer-pipeline comparison | S-062,S-180 |
| R04R05R06-S028 | R05-S001 | S-012 | R05 | `083fb22bce` | Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions | - |
| R04R05R06-S029 | R05-S002 | S-015 | R05 | `764dcc83ea` | Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions | - |
| R04R05R06-S030 | R05-S003 | S-018 | R05 | `4903cfaa87` | Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions | - |
| R04R05R06-S031 | R05-S004 | S-029 | R05 | `346be9b86f` | Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions | - |
| R04R05R06-S032 | R05-S005 | S-036 | R05 | `b49886f626` | Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions | - |
| R04R05R06-S033 | R05-S006 | S-037 | R05 | `4cd9d99fde` | Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions | - |
| R04R05R06-S034 | R05-S007 | S-046 | R05 | `5b7c0cfb1e` | Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions | - |
| R04R05R06-S035 | R05-S008 | S-049 | R05 | `5105984e7b` | Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions | - |
| R04R05R06-S036 | R05-S009 | S-050 | R05 | `7acb455cf8` | Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions | - |
| R04R05R06-S037 | R05-S010 | S-061 | R05 | `f0f446defd` | Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions | - |
| R04R05R06-S038 | R05-S011 | S-063 | R05 | `99e5aa46a2` | Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions | - |
| R04R05R06-S039 | R05-S012 | S-072 | R05 | `ad86b967da` | Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions | - |
| R04R05R06-S040 | R05-S013 | S-086 | R05 | `b2e1373c76` | Classic AddPolicyHandler / registry overloads and choosing policies based on request/exception bubbling context | - |
| R04R05R06-S041 | R05-S014 | S-091 | R05 | `fd03be6790` | Classic AddPolicyHandler / registry overloads and choosing policies based on request/exception bubbling context | - |
| R04R05R06-S042 | R05-S015 | S-098 | R05 | `ec6965f4e3` | Classic AddPolicyHandler / registry overloads and choosing policies based on request/exception bubbling context | - |
| R04R05R06-S043 | R05-S016 | S-107 | R05 | `a92f6fd8d2` | Classic AddPolicyHandler / registry overloads and choosing policies based on request/exception bubbling context | - |
| R04R05R06-S044 | R05-S017 | S-117 | R05 | `219d2a4c02` | Classic AddPolicyHandler / registry overloads and choosing policies based on request/exception bubbling context | - |
| R04R05R06-S045 | R05-S018 | S-125 | R05 | `7ee20c322a` | Classic AddPolicyHandler / registry overloads and choosing policies based on request/exception bubbling context | - |
| R04R05R06-S046 | R06-S001 | S-017 | R06 | `260ed0a5d4` | Production-ready custom policy wrap and exception bubbling theory | - |
| R04R05R06-S047 | R06-S002 | S-028 | R06 | `3bd3aa517f` | Production-ready custom policy wrap and exception bubbling theory | - |
| R04R05R06-S048 | R06-S003 | S-043 | R06 | `a35edc76b1` | Production-ready custom policy wrap and exception bubbling theory | - |
| R04R05R06-S049 | R06-S004 | S-054 | R06 | `4de8acb1fd` | Production-ready custom policy wrap and exception bubbling theory | S-054,S-177 |
| R04R05R06-S050 | R06-S005 | S-062 | R06 | `c6022c85f6` | Production-ready custom policy wrap and exception bubbling theory | S-062,S-180 |
| R04R05R06-S051 | R06-S006 | S-071 | R06 | `a9f9394a5c` | Production-ready custom policy wrap and exception bubbling theory | - |
| R04R05R06-S052 | R06-S007 | S-075 | R06 | `020cb4e5d1` | Production-ready custom policy wrap and exception bubbling theory | - |
| R04R05R06-S053 | R06-S008 | S-096 | R06 | `f16a32b44a` | Newer Polly exception handling: what to handle, what bubbles, and transient exception mapping | - |
| R04R05R06-S054 | R06-S009 | S-100 | R06 | `347d669f32` | Newer Polly exception handling: what to handle, what bubbles, and transient exception mapping | S-027,S-100 |
| R04R05R06-S055 | R06-S010 | S-106 | R06 | `946be8013b` | Newer Polly exception handling: what to handle, what bubbles, and transient exception mapping | - |
| R04R05R06-S056 | R06-S011 | S-110 | R06 | `400b773a1d` | Newer Polly exception handling: what to handle, what bubbles, and transient exception mapping | - |
| R04R05R06-S057 | R06-S012 | S-115 | R06 | `94f45be6d3` | Newer Polly exception handling: what to handle, what bubbles, and transient exception mapping | - |
| R04R05R06-S058 | R06-S013 | S-120 | R06 | `d52b2f01d7` | Newer Polly exception handling: what to handle, what bubbles, and transient exception mapping | - |
| R04R05R06-S059 | R06-S014 | S-123 | R06 | `471abbd4f5` | Newer Polly exception handling: what to handle, what bubbles, and transient exception mapping | - |
| R04R05R06-S060 | R06-S015 | S-126 | R06 | `714b86f673` | Newer Polly exception handling: what to handle, what bubbles, and transient exception mapping | - |
| R04R05R06-S061 | R06-S016 | S-132 | R06 | `b9b85c83e8` | Newer Polly exception handling: what to handle, what bubbles, and transient exception mapping | - |
| R04R05R06-S062 | R06-S017 | S-142 | R06 | `abfe206648` | Newer Polly exception handling: what to handle, what bubbles, and transient exception mapping | - |
| R04R05R06-S063 | R06-S018 | S-155 | R06 | `d16b8dae56` | Choosing pipelines based on request/context and why inner strategies cannot know outer failures | S-011,S-155 |
| R04R05R06-S064 | R06-S019 | S-157 | R06 | `07eccec90b` | Choosing pipelines based on request/context and why inner strategies cannot know outer failures | - |
| R04R05R06-S065 | R06-S020 | S-160 | R06 | `9b8ae90c4d` | Choosing pipelines based on request/context and why inner strategies cannot know outer failures | - |
| R04R05R06-S066 | R06-S021 | S-163 | R06 | `ede52ba6fa` | Choosing pipelines based on request/context and why inner strategies cannot know outer failures | - |
| R04R05R06-S067 | R06-S022 | S-165 | R06 | `c6ca94f069` | Choosing pipelines based on request/context and why inner strategies cannot know outer failures | - |
| R04R05R06-S068 | R06-S023 | S-170 | R06 | `8a9c294898` | Choosing pipelines based on request/context and why inner strategies cannot know outer failures | - |
| R04R05R06-S069 | R06-S024 | S-172 | R06 | `f1f655e19d` | Choosing pipelines based on request/context and why inner strategies cannot know outer failures | - |
| R04R05R06-S070 | R06-S025 | S-174 | R06 | `38c992b66d` | Choosing pipelines based on request/context and why inner strategies cannot know outer failures | - |

---

## 2. Source transcript / source-preserving summary

### R04R05R06-S001 / R04-S001 / S-001 - `4aec986325`

- region: `R04`
- topic: Custom/manual Polly pipeline provider, context passing, registry/provider patterns
- nearest labels: manual executiong | custom pipeline | + | provider | passing context to | classic polly
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`
- duplicate image-use group: `S-001,S-033`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S002 / R04-S002 / S-002 - `277ca6910b`

- region: `R04`
- topic: Custom/manual Polly pipeline provider, context passing, registry/provider patterns
- nearest labels: passing context to | classic polly | + | getting pipeline from registry | classic | manual executiong
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S003 / R04-S003 / S-003 - `f96bff56a0`

- region: `R04`
- topic: Custom/manual Polly pipeline provider, context passing, registry/provider patterns
- nearest labels: classic | passing context to | classic polly | + | getting pipeline from registry | manual executiong
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S004 / R04-S004 / S-009 - `e7e0102b71`

- region: `R04`
- topic: Custom/manual Polly pipeline provider, context passing, registry/provider patterns
- nearest labels: classic | passing context to | classic polly | + | getting pipeline from registry | cheat sheet
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S005 / R04-S005 / S-010 - `a9fb8b8fe5`

- region: `R04`
- topic: Custom/manual Polly pipeline provider, context passing, registry/provider patterns
- nearest labels: classic | cheat sheet | passing context to | classic polly | + | getting pipeline from registry
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S006 / R04-S006 / S-011 - `d16b8dae56`

- region: `R04`
- topic: Custom/manual Polly pipeline provider, context passing, registry/provider patterns
- nearest labels: so to have delegating handler that gets pipeline with pipelineprovider | based on request properties | or | creating a wrapper that runs pipeline.execute and passes context | look like the cleanest options | for simple scenarios its better to create wrapper with manual pipeline
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`
- duplicate image-use group: `S-011,S-155`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S007 / R04-S007 / S-020 - `00817539fe`

- region: `R04`
- topic: Custom/manual Polly pipeline provider, context passing, registry/provider patterns
- nearest labels: classic | passing context to | classic polly | + | getting pipeline from registry | cheat sheet
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S008 / R04-S008 / S-024 - `154e41c1f0`

- region: `R04`
- topic: Custom/manual Polly pipeline provider, context passing, registry/provider patterns
- nearest labels: classic | cheat sheet | !!! | passing context to | classic polly | +
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S009 / R04-S009 / S-038 - `4756a372c9`

- region: `R04`
- topic: Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration
- nearest labels: cheat sheet | classic | !!! | classic polly httppolicyextensions | 1what counts as  transient http failure | 2 transient status codes (when have your own exception handling)
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S010 / R04-S010 / S-045 - `38c57f1440`

- region: `R04`
- topic: Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration
- nearest labels: cheat sheet | classic | !!! | !!! | classic polly httppolicyextensions | 1what counts as  transient http failure
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S011 / R04-S011 / S-058 - `63b5a940f4`

- region: `R04`
- topic: Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration
- nearest labels: cheat sheet | !!! | !!! | classic | classic polly httppolicyextensions | 1what counts as  transient http failure
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S012 / R04-S012 / S-066 - `19b9f83a9f`

- region: `R04`
- topic: Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration
- nearest labels: !!! | !!! | cheat sheet | classic | classic polly httppolicyextensions | 1what counts as  transient http failure
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S013 / R04-S013 / S-078 - `afb5f438bc`

- region: `R04`
- topic: Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration
- nearest labels: !!! | !!! | cheat sheet | classic | classic polly httppolicyextensions | 1what counts as  transient http failure
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S014 / R04-S014 / S-087 - `893dc6acd1`

- region: `R04`
- topic: Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration
- nearest labels: !!! | !!! | cheat sheet | how to handle? | !!! | classic polly httppolicyextensions
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S015 / R04-S015 / S-090 - `291353b6eb`

- region: `R04`
- topic: Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration
- nearest labels: !!! | !!! | how to handle? | cheat sheet | !!! | so we need ratelimitpartition when
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S016 / R04-S016 / S-099 - `bc0bef8a0c`

- region: `R04`
- topic: Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration
- nearest labels: !!! | how to handle? | !!! | so we need ratelimitpartition when | 1 we need specific ratelimiter and we need to pass | key (ratelimiter middleware case)
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S017 / R04-S017 / S-104 - `4fda85091a`

- region: `R04`
- topic: Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration
- nearest labels: how to handle? | !!! | !!! | so we need ratelimitpartition when | 1 we need specific ratelimiter and we need to pass | key (ratelimiter middleware case)
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S018 / R04-S018 / S-111 - `f4fdb2ed48`

- region: `R04`
- topic: Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration
- nearest labels: how to handle? | !!! | so we need ratelimitpartition when | 1 we need specific ratelimiter and we need to pass | key (ratelimiter middleware case) | 2 we need to create ratelimiter with callback that has httpcontext
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S019 / R04-S019 / S-119 - `b5dc89056b`

- region: `R04`
- topic: Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration
- nearest labels: how to handle? | !!! | so we need ratelimitpartition when | 1 we need specific ratelimiter and we need to pass | key (ratelimiter middleware case) | 2 we need to create ratelimiter with callback that has httpcontext
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S020 / R04-S020 / S-129 - `764fb76254`

- region: `R04`
- topic: Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration
- nearest labels: how to handle? | !!! | classic polly transient failures | new polly | vs httprequest exception | so we need ratelimitpartition when
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S021 / R04-S021 / S-136 - `26d2f62a54`

- region: `R04`
- topic: Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration
- nearest labels: how to handle? | classic polly transient failures | new polly | vs httprequest exception | manually | !!!
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S022 / R04-S022 / S-141 - `b6dcef0735`

- region: `R04`
- topic: Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration
- nearest labels: how to handle? | classic polly transient failures | new polly | vs httprequest exception | manually | with extension
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S023 / R04-S023 / S-147 - `b81bec3438`

- region: `R04`
- topic: Classic Polly policy cheat sheet: retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler integration
- nearest labels: how to handle? | classic polly transient failures | new polly | vs httprequest exception | manually | with extension
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S024 / R04-S024 / S-175 - `d86de76424`

- region: `R04`
- topic: Manual/extension classic Polly transient-failure examples and newer-pipeline comparison
- nearest labels: manually | with extension | classic polly transient failures | new polly | vs httprequest exception | how to handle?
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S025 / R04-S025 / S-177 - `4de8acb1fd`

- region: `R04`
- topic: Manual/extension classic Polly transient-failure examples and newer-pipeline comparison
- nearest labels: manually | with extension | classic polly transient failures | new polly | vs httprequest exception | how to handle?
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`
- duplicate image-use group: `S-054,S-177`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S026 / R04-S026 / S-178 - `fdb5e44e62`

- region: `R04`
- topic: Manual/extension classic Polly transient-failure examples and newer-pipeline comparison
- nearest labels: with extension | manually | classic polly transient failures | new polly | vs httprequest exception | conditional rate limiting
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`
- duplicate image-use group: `S-044,S-178`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S027 / R04-S027 / S-180 - `c6022c85f6`

- region: `R04`
- topic: Manual/extension classic Polly transient-failure examples and newer-pipeline comparison
- nearest labels: manually | with extension | classic polly transient failures | new polly | vs httprequest exception | how to handle?
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`
- duplicate image-use group: `S-062,S-180`

Visible/source summary:
```text
This source is part of the manual/classic Polly road: custom pipeline provider or classic policy examples around retry, timeout, circuit breaker, fallback, bulkhead, wrap, AddPolicyHandler, and classic-vs-new migration notes.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S028 / R05-S001 / S-012 - `083fb22bce`

- region: `R05`
- topic: Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions
- nearest labels: examples | !!! | classic polly httppolicyextensions | 1what counts as  transient http failure | 2 transient status codes (when have your own exception handling) | 3 attach around httpclient with confiigured trans errors handling
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the classic Polly extensions road: HandleTransientHttpError, OrTransientHttpStatusCode, AddTransientHttpErrorPolicy, AddPolicyHandler, AddPolicyHandlerFromRegistry, retry/circuit-breaker examples, and what counts as transient HTTP failure.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S029 / R05-S002 / S-015 - `764dcc83ea`

- region: `R05`
- topic: Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions
- nearest labels: classic polly httppolicyextensions | 1what counts as  transient http failure | 2 transient status codes (when have your own exception handling) | 3 attach around httpclient with confiigured trans errors handling | 4 registry | !!!
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the classic Polly extensions road: HandleTransientHttpError, OrTransientHttpStatusCode, AddTransientHttpErrorPolicy, AddPolicyHandler, AddPolicyHandlerFromRegistry, retry/circuit-breaker examples, and what counts as transient HTTP failure.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S030 / R05-S003 / S-018 - `4903cfaa87`

- region: `R05`
- topic: Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions
- nearest labels: cheat sheet | classic polly httppolicyextensions | 1what counts as  transient http failure | 2 transient status codes (when have your own exception handling) | 3 attach around httpclient with confiigured trans errors handling | 4 registry
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the classic Polly extensions road: HandleTransientHttpError, OrTransientHttpStatusCode, AddTransientHttpErrorPolicy, AddPolicyHandler, AddPolicyHandlerFromRegistry, retry/circuit-breaker examples, and what counts as transient HTTP failure.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S031 / R05-S004 / S-029 - `346be9b86f`

- region: `R05`
- topic: Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions
- nearest labels: !!! | examples | !!! | classic polly httppolicyextensions | 1what counts as  transient http failure | 2 transient status codes (when have your own exception handling)
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the classic Polly extensions road: HandleTransientHttpError, OrTransientHttpStatusCode, AddTransientHttpErrorPolicy, AddPolicyHandler, AddPolicyHandlerFromRegistry, retry/circuit-breaker examples, and what counts as transient HTTP failure.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S032 / R05-S005 / S-036 - `b49886f626`

- region: `R05`
- topic: Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions
- nearest labels: !!! | !!! | classic polly httppolicyextensions | 1what counts as  transient http failure | 2 transient status codes (when have your own exception handling) | 3 attach around httpclient with confiigured trans errors handling
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the classic Polly extensions road: HandleTransientHttpError, OrTransientHttpStatusCode, AddTransientHttpErrorPolicy, AddPolicyHandler, AddPolicyHandlerFromRegistry, retry/circuit-breaker examples, and what counts as transient HTTP failure.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S033 / R05-S006 / S-037 - `4cd9d99fde`

- region: `R05`
- topic: Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions
- nearest labels: !!! | cheat sheet | classic polly httppolicyextensions | 1what counts as  transient http failure | 2 transient status codes (when have your own exception handling) | 3 attach around httpclient with confiigured trans errors handling
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the classic Polly extensions road: HandleTransientHttpError, OrTransientHttpStatusCode, AddTransientHttpErrorPolicy, AddPolicyHandler, AddPolicyHandlerFromRegistry, retry/circuit-breaker examples, and what counts as transient HTTP failure.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S034 / R05-S007 / S-046 - `5b7c0cfb1e`

- region: `R05`
- topic: Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions
- nearest labels: !!! | !!! | examples | !!! | classic polly httppolicyextensions | 1what counts as  transient http failure
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the classic Polly extensions road: HandleTransientHttpError, OrTransientHttpStatusCode, AddTransientHttpErrorPolicy, AddPolicyHandler, AddPolicyHandlerFromRegistry, retry/circuit-breaker examples, and what counts as transient HTTP failure.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S035 / R05-S008 / S-049 - `5105984e7b`

- region: `R05`
- topic: Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions
- nearest labels: !!! | !!! | cheat sheet | classic polly httppolicyextensions | 1what counts as  transient http failure | 2 transient status codes (when have your own exception handling)
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the classic Polly extensions road: HandleTransientHttpError, OrTransientHttpStatusCode, AddTransientHttpErrorPolicy, AddPolicyHandler, AddPolicyHandlerFromRegistry, retry/circuit-breaker examples, and what counts as transient HTTP failure.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S036 / R05-S009 / S-050 - `7acb455cf8`

- region: `R05`
- topic: Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions
- nearest labels: !!! | !!! | !!! | classic polly httppolicyextensions | 1what counts as  transient http failure | 2 transient status codes (when have your own exception handling)
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the classic Polly extensions road: HandleTransientHttpError, OrTransientHttpStatusCode, AddTransientHttpErrorPolicy, AddPolicyHandler, AddPolicyHandlerFromRegistry, retry/circuit-breaker examples, and what counts as transient HTTP failure.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S037 / R05-S010 / S-061 - `f0f446defd`

- region: `R05`
- topic: Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions
- nearest labels: !!! | !!! | !!! | cheat sheet | classic polly httppolicyextensions | 1what counts as  transient http failure
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the classic Polly extensions road: HandleTransientHttpError, OrTransientHttpStatusCode, AddTransientHttpErrorPolicy, AddPolicyHandler, AddPolicyHandlerFromRegistry, retry/circuit-breaker examples, and what counts as transient HTTP failure.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S038 / R05-S011 / S-063 - `99e5aa46a2`

- region: `R05`
- topic: Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions
- nearest labels: !!! | !!! | !!! | classic polly httppolicyextensions | 1what counts as  transient http failure | 2 transient status codes (when have your own exception handling)
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the classic Polly extensions road: HandleTransientHttpError, OrTransientHttpStatusCode, AddTransientHttpErrorPolicy, AddPolicyHandler, AddPolicyHandlerFromRegistry, retry/circuit-breaker examples, and what counts as transient HTTP failure.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S039 / R05-S012 / S-072 - `ad86b967da`

- region: `R05`
- topic: Classic Polly HttpPolicyExtensions / HandleTransientHttpError / transient HTTP failure definitions
- nearest labels: !!! | !!! | !!! | classic polly httppolicyextensions | 1what counts as  transient http failure | 2 transient status codes (when have your own exception handling)
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the classic Polly extensions road: HandleTransientHttpError, OrTransientHttpStatusCode, AddTransientHttpErrorPolicy, AddPolicyHandler, AddPolicyHandlerFromRegistry, retry/circuit-breaker examples, and what counts as transient HTTP failure.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S040 / R05-S013 / S-086 - `b2e1373c76`

- region: `R05`
- topic: Classic AddPolicyHandler / registry overloads and choosing policies based on request/exception bubbling context
- nearest labels: !!! | !!! | !!! | exception bubbling | classic polly httppolicyextensions | 1what counts as  transient http failure
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the classic Polly extensions road: HandleTransientHttpError, OrTransientHttpStatusCode, AddTransientHttpErrorPolicy, AddPolicyHandler, AddPolicyHandlerFromRegistry, retry/circuit-breaker examples, and what counts as transient HTTP failure.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S041 / R05-S014 / S-091 - `fd03be6790`

- region: `R05`
- topic: Classic AddPolicyHandler / registry overloads and choosing policies based on request/exception bubbling context
- nearest labels: !!! | !!! | !!! | exception bubbling | !!!! | classic polly httppolicyextensions
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the classic Polly extensions road: HandleTransientHttpError, OrTransientHttpStatusCode, AddTransientHttpErrorPolicy, AddPolicyHandler, AddPolicyHandlerFromRegistry, retry/circuit-breaker examples, and what counts as transient HTTP failure.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S042 / R05-S015 / S-098 - `ec6965f4e3`

- region: `R05`
- topic: Classic AddPolicyHandler / registry overloads and choosing policies based on request/exception bubbling context
- nearest labels: !!! | !!! | !!! | exception bubbling | !!!! | how to handle?
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the classic Polly extensions road: HandleTransientHttpError, OrTransientHttpStatusCode, AddTransientHttpErrorPolicy, AddPolicyHandler, AddPolicyHandlerFromRegistry, retry/circuit-breaker examples, and what counts as transient HTTP failure.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S043 / R05-S016 / S-107 - `a92f6fd8d2`

- region: `R05`
- topic: Classic AddPolicyHandler / registry overloads and choosing policies based on request/exception bubbling context
- nearest labels: !!! | how to handle? | !!!! | !!! | !!! | exception bubbling
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the classic Polly extensions road: HandleTransientHttpError, OrTransientHttpStatusCode, AddTransientHttpErrorPolicy, AddPolicyHandler, AddPolicyHandlerFromRegistry, retry/circuit-breaker examples, and what counts as transient HTTP failure.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S044 / R05-S017 / S-117 - `219d2a4c02`

- region: `R05`
- topic: Classic AddPolicyHandler / registry overloads and choosing policies based on request/exception bubbling context
- nearest labels: how to handle? | !!! | !!!! | choosing pipelines based on something | exception bubbling | !!!
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the classic Polly extensions road: HandleTransientHttpError, OrTransientHttpStatusCode, AddTransientHttpErrorPolicy, AddPolicyHandler, AddPolicyHandlerFromRegistry, retry/circuit-breaker examples, and what counts as transient HTTP failure.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S045 / R05-S018 / S-125 - `7ee20c322a`

- region: `R05`
- topic: Classic AddPolicyHandler / registry overloads and choosing policies based on request/exception bubbling context
- nearest labels: how to handle? | !!!! | choosing pipelines based on something | !!! | exception bubbling | !!!
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the classic Polly extensions road: HandleTransientHttpError, OrTransientHttpStatusCode, AddTransientHttpErrorPolicy, AddPolicyHandler, AddPolicyHandlerFromRegistry, retry/circuit-breaker examples, and what counts as transient HTTP failure.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S046 / R06-S001 / S-017 - `260ed0a5d4`

- region: `R06`
- topic: Production-ready custom policy wrap and exception bubbling theory
- nearest labels: shared impl | using Polly; | using Polly.Timeout; | using Polly.Bulkhead; | using Polly.CircuitBreaker; | using Polly.Retry;
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S047 / R06-S002 / S-028 - `3bd3aa517f`

- region: `R06`
- topic: Production-ready custom policy wrap and exception bubbling theory
- nearest labels: shared impl | using Polly; | using Polly.Timeout; | using Polly.Bulkhead; | using Polly.CircuitBreaker; | using Polly.Retry;
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S048 / R06-S003 / S-043 - `a35edc76b1`

- region: `R06`
- topic: Production-ready custom policy wrap and exception bubbling theory
- nearest labels: using Polly; | using Polly.Timeout; | using Polly.Bulkhead; | using Polly.CircuitBreaker; | using Polly.Retry; | using Polly.Wrap;
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S049 / R06-S004 / S-054 - `4de8acb1fd`

- region: `R06`
- topic: Production-ready custom policy wrap and exception bubbling theory
- nearest labels: Exception handling | theory | mapping | using Polly; | using Polly.Timeout; | using Polly.Bulkhead;
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`
- duplicate image-use group: `S-054,S-177`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S050 / R06-S005 / S-062 - `c6022c85f6`

- region: `R06`
- topic: Production-ready custom policy wrap and exception bubbling theory
- nearest labels: Exception handling | theory | mapping | exception bubbling | using Polly; | using Polly.Timeout;
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`
- duplicate image-use group: `S-062,S-180`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S051 / R06-S006 / S-071 - `a9f9394a5c`

- region: `R06`
- topic: Production-ready custom policy wrap and exception bubbling theory
- nearest labels: Exception handling | theory | mapping | exception bubbling | try | {
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S052 / R06-S007 / S-075 - `020cb4e5d1`

- region: `R06`
- topic: Production-ready custom policy wrap and exception bubbling theory
- nearest labels: Exception handling | theory | mapping | exception bubbling | try | {
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S053 / R06-S008 / S-096 - `f16a32b44a`

- region: `R06`
- topic: Newer Polly exception handling: what to handle, what bubbles, and transient exception mapping
- nearest labels: theory | Exception handling | mapping | in newer | try | {
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S054 / R06-S009 / S-100 - `347d669f32`

- region: `R06`
- topic: Newer Polly exception handling: what to handle, what bubbles, and transient exception mapping
- nearest labels: exception bubbling | !!!! | theory | Exception handling | mapping | in newer
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`
- duplicate image-use group: `S-027,S-100`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S055 / R06-S010 / S-106 - `946be8013b`

- region: `R06`
- topic: Newer Polly exception handling: what to handle, what bubbles, and transient exception mapping
- nearest labels: theory | in newer | mapping | Exception handling | try | {
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S056 / R06-S011 / S-110 - `400b773a1d`

- region: `R06`
- topic: Newer Polly exception handling: what to handle, what bubbles, and transient exception mapping
- nearest labels: !!!! | exception bubbling | theory | Exception handling | in newer | mapping
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S057 / R06-S012 / S-115 - `94f45be6d3`

- region: `R06`
- topic: Newer Polly exception handling: what to handle, what bubbles, and transient exception mapping
- nearest labels: in newer | theory | mapping | Exception handling | try | {
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S058 / R06-S013 / S-120 - `d52b2f01d7`

- region: `R06`
- topic: Newer Polly exception handling: what to handle, what bubbles, and transient exception mapping
- nearest labels: !!!! | exception bubbling | choosing pipelines based on something | in newer | theory | exception bubling
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S059 / R06-S014 / S-123 - `471abbd4f5`

- region: `R06`
- topic: Newer Polly exception handling: what to handle, what bubbles, and transient exception mapping
- nearest labels: in newer | exception bubling | outer starts call inner one, not throw to inner | theory | mapping | !!!!
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S060 / R06-S015 / S-126 - `714b86f673`

- region: `R06`
- topic: Newer Polly exception handling: what to handle, what bubbles, and transient exception mapping
- nearest labels: !!!! | choosing pipelines based on something | exception bubling | outer starts call inner one, not throw to inner | so cant tell inner starts to not handle ex from outer because ex | bubble fro miner to outer and outer just call inner ones
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S061 / R06-S016 / S-132 - `b9b85c83e8`

- region: `R06`
- topic: Newer Polly exception handling: what to handle, what bubbles, and transient exception mapping
- nearest labels: in newer | exception bubling | outer starts call inner one, not throw to inner | so cant tell inner starts to not handle ex from outer because ex | bubble fro miner to outer and outer just call inner ones | !!!!
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S062 / R06-S017 / S-142 - `abfe206648`

- region: `R06`
- topic: Newer Polly exception handling: what to handle, what bubbles, and transient exception mapping
- nearest labels: exception bubling | outer starts call inner one, not throw to inner | so cant tell inner starts to not handle ex from outer because ex | bubble fro miner to outer and outer just call inner ones | in newer | !!!!
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S063 / R06-S018 / S-155 - `d16b8dae56`

- region: `R06`
- topic: Choosing pipelines based on request/context and why inner strategies cannot know outer failures
- nearest labels: choosing pipelines based on something | so cant tell inner starts to not handle ex from outer because ex | bubble fro miner to outer and outer just call inner ones | exception bubling | outer starts call inner one, not throw to inner | !!!!
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`
- duplicate image-use group: `S-011,S-155`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S064 / R06-S019 / S-157 - `07eccec90b`

- region: `R06`
- topic: Choosing pipelines based on request/context and why inner strategies cannot know outer failures
- nearest labels: so cant tell inner starts to not handle ex from outer because ex | bubble fro miner to outer and outer just call inner ones | exception bubling | outer starts call inner one, not throw to inner | choosing pipelines based on something | in newer
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S065 / R06-S020 / S-160 - `9b8ae90c4d`

- region: `R06`
- topic: Choosing pipelines based on request/context and why inner strategies cannot know outer failures
- nearest labels: choosing pipelines based on something | so cant tell inner starts to not handle ex from outer because ex | bubble fro miner to outer and outer just call inner ones | exception bubling | outer starts call inner one, not throw to inner | !!!!
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S066 / R06-S021 / S-163 - `ede52ba6fa`

- region: `R06`
- topic: Choosing pipelines based on request/context and why inner strategies cannot know outer failures
- nearest labels: so cant tell inner starts to not handle ex from outer because ex | bubble fro miner to outer and outer just call inner ones | exception bubling | outer starts call inner one, not throw to inner | choosing pipelines based on something | in newer
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S067 / R06-S022 / S-165 - `c6ca94f069`

- region: `R06`
- topic: Choosing pipelines based on request/context and why inner strategies cannot know outer failures
- nearest labels: choosing pipelines based on something | so cant tell inner starts to not handle ex from outer because ex | bubble fro miner to outer and outer just call inner ones | exception bubling | outer starts call inner one, not throw to inner | !!!!
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S068 / R06-S023 / S-170 - `8a9c294898`

- region: `R06`
- topic: Choosing pipelines based on request/context and why inner strategies cannot know outer failures
- nearest labels: choosing pipelines based on something | so cant tell inner starts to not handle ex from outer because ex | bubble fro miner to outer and outer just call inner ones | exception bubling | outer starts call inner one, not throw to inner | !!!!
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S069 / R06-S024 / S-172 - `f1f655e19d`

- region: `R06`
- topic: Choosing pipelines based on request/context and why inner strategies cannot know outer failures
- nearest labels: so cant tell inner starts to not handle ex from outer because ex | bubble fro miner to outer and outer just call inner ones | choosing pipelines based on something | exception bubling | outer starts call inner one, not throw to inner | !!!!
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

### R04R05R06-S070 / R06-S025 / S-174 - `38c992b66d`

- region: `R06`
- topic: Choosing pipelines based on request/context and why inner strategies cannot know outer failures
- nearest labels: so cant tell inner starts to not handle ex from outer because ex | bubble fro miner to outer and outer just call inner ones | choosing pipelines based on something | exception bubling | outer starts call inner one, not throw to inner | !!!!
- readability: `medium-high`
- confidence: `high for ownership and concepts; medium-high for exact code punctuation`

Visible/source summary:
```text
This source is part of the exception-bubbling/newer-handling road: production-ready wrap, timeout/bulkhead/circuit-breaker exception behavior, how exceptions bubble between strategies, and mapping transient failures in newer Polly.
```

Notes:
Verified by region contact-sheet review; preserved source image should be used for exact code punctuation.

---

## 3. Cleaned source notes

- R04 explains manual/custom provider and classic policy composition: retry, timeout, circuit breaker, fallback, bulkhead, wrap, and AddPolicyHandler integration.
- R05 explains classic HttpPolicyExtensions shortcuts and their exact transient-failure scope: HttpRequestException, HTTP 5xx, and HTTP 408 by default.
- R06 explains why exception bubbling matters: outer strategies see what inner strategies throw; inner strategies do not know outer retry/fallback decisions.
- Classic policy wrap order matters because outer policies can handle exceptions produced by inner policies.
- Newer Polly makes handling explicit through predicates/status mapping; do not assume every transient-looking HTTP response is covered by a helper.
- When different requests need different policy behavior, choose the pipeline/policy based on request/context before execution.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| Manual/classic policy/provider material is R04-owned | R04 contact sheet and R04-S001..R04-S027 | high |
| HttpPolicyExtensions transient failure helpers are R05-owned | R05 contact sheet and R05-S001..R05-S018 | high |
| Exception bubbling/newer handling material is R06-owned | R06 contact sheet and R06-S001..R06-S025 | high |
| Duplicate image uses must be tracked by source placement, not deduplicated blindly | duplicate-image-uses-stage0 + combined boundary review | high |
| R07 is still pending because production-ready full cheat sheet / final mapping is a separate region | stage0 region split + boundary review | high |

---

## 5. Question hooks

- What is the difference between a Polly pipeline and an HttpMessageHandler?
- What does HandleTransientHttpError include by default?
- When should you extend transient status-code handling manually?
- How does AddPolicyHandler attach a policy to HttpClient?
- Why does policy wrap order matter?
- Which exceptions should timeout/bulkhead/circuit-breaker strategies throw?
- Why can an inner strategy not know whether an outer policy will retry?
- How should a request choose between different policies/pipelines?

---

## 6. Open review issues

- R01/R02 option mechanics and hedging remain pending.
- R07 production-ready full cheat sheet / exception mapping remains pending.
- Exact code punctuation should be checked against preserved PNGs when needed.
