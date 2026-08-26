# Knowledge Registry

Source conspect: `_ai-conspects/js yield, asyncenumerable, finally of generator/`

Authoritative processed source: `01-final-transcript.md`

Original SVG: `source/js yield, asyncenumerable, finally of generator.svg`

| Source area | Knowledge ID | Topic | Knowledge file | Mapping |
|---|---|---|---|---|
| R01 — lazy execution boundary and iterator control methods | `javascript.generator-control-flow` | `javascript` | [[../_knowledge/javascript/generator-control-flow]] | MAPPED |
| R01 — cancellation propagation and distinction from cancellable I/O | `javascript.async-generators-and-cancellation` | `javascript` | [[../_knowledge/javascript/async-generators-and-cancellation]] | MAPPED |
| R02 — generator call, `yield`, `return`, manual iteration, and `for...of` | `javascript.generator-control-flow` | `javascript` | [[../_knowledge/javascript/generator-control-flow]] | MAPPED |
| R02 — async generators, `for await...of`, and the .NET analogy | `javascript.async-generators-and-cancellation` | `javascript` | [[../_knowledge/javascript/async-generators-and-cancellation]] | MAPPED |
| R03 — `generator.return()`, `finally`, and cleanup paths | `javascript.generator-finally-cleanup` | `javascript` | [[../_knowledge/javascript/generator-finally-cleanup]] | MAPPED |
| R04 — yielding from `finally` and draining cleanup values | `javascript.generator-finally-cleanup` | `javascript` | [[../_knowledge/javascript/generator-finally-cleanup]] | MAPPED |
| R04 — blocked awaits, queued return requests, and cooperative cancellation | `javascript.async-generators-and-cancellation` | `javascript` | [[../_knowledge/javascript/async-generators-and-cancellation]] | MAPPED |
| Practical checklist | all three units above | `javascript` | [[../_knowledge/javascript/generator-control-flow]]; [[../_knowledge/javascript/async-generators-and-cancellation]]; [[../_knowledge/javascript/generator-finally-cleanup]] | MAPPED |
| Coverage counts, screenshot/text inventory, audit state, and processing metadata | — | — | — | NON_LEARNING |

## Boundary decisions

- R01 and R02 are split because basic iterator control and async cancellation are independently reviewable models.
- R03 and most of R04 are combined: yielding during `finally` is a continuation of the `return()`-through-cleanup model, not a standalone topic.
- The async-await caveat from R04 belongs with async cancellation because it explains why `return()` alone may not produce prompt shutdown.
- Cleanup examples remain inside the `finally` unit instead of becoming separate files per resource type.

## Explicit disposition notes

- All four semantic regions, all 30 screenshots, and all 19 native SVG labels are represented by the mappings above.
- No substantial source statement was excluded as disputed, erroneous, or outside the selected boundaries.

## Coverage check

| Status | Count | Notes |
|---|---:|---|
| MAPPED | 8 | Every semantic area and the final checklist is traceable to three units. |
| MERGED | 0 | No existing semantic duplicate was available to extend. |
| NON_LEARNING | 1 | Coverage and processing metadata remain in the workspace. |
| UNRESOLVED | 0 | No meaningful source claim remains unclassified. |
