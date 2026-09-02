# Knowledge Registry - Shared Polly cheat sheet and production handling

Source workspace: `_ai-conspects/shared-polly-cheat-sheet-production-ready-verions-exceptions-from-pipeline-and-handling/`

Authoritative processed sources: all three region transcripts designated by `CURRENT_SOURCE_OF_TRUTH.md`; 186 image uses, zero unclosed.

Original SVG: `source/shared-polly-cheat-sheet-production-ready-verions-exceptions-from-pipeline-and-handling.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| Pipeline ExecuteAsync callback model, provider selection, and fresh request/stream per retryable upload attempt | `dotnet.polly-pipeline-execution-and-resilience-context` | `dotnet` | `../_knowledge/dotnet/polly-pipeline-execution-and-resilience-context.md` | MAPPED |
| ResilienceContext typed metadata, cancellation, pooling, and finally-return lifecycle | `dotnet.polly-pipeline-execution-and-resilience-context` | `dotnet` | `../_knowledge/dotnet/polly-pipeline-execution-and-resilience-context.md` | MAPPED |
| Outcome result/exception classification, request metadata access, nullable DelayGenerator fallback, and exhaustion boundary | `dotnet.polly-retry-outcomes-delays-and-request-metadata` | `dotnet` | `../_knowledge/dotnet/polly-retry-outcomes-delays-and-request-metadata.md` | MAPPED |
| RateLimiterStrategy lease/acquire semantics and underlying limiter behavior | `dotnet.polly-rate-limiter-strategies-and-partitions` | `dotnet` | `../_knowledge/dotnet/polly-rate-limiter-strategies-and-partitions.md` | MAPPED |
| RateLimitPartition key isolation and conditional limiter selection/testing | `dotnet.polly-rate-limiter-strategies-and-partitions` | `dotnet` | `../_knowledge/dotnet/polly-rate-limiter-strategies-and-partitions.md` | MAPPED |
| Strategy nesting/order, retry-timeout scope, exception bubbling, and outer/inner observability | `dotnet.polly-strategy-ordering-hedging-and-exception-flow` | `dotnet` | `../_knowledge/dotnet/polly-strategy-ordering-hedging-and-exception-flow.md` | MAPPED |
| Hedging competing attempts, tail-latency tradeoff, idempotency, cancellation, and placement relative to limits/timeouts | `dotnet.polly-strategy-ordering-hedging-and-exception-flow` | `dotnet` | `../_knowledge/dotnet/polly-strategy-ordering-hedging-and-exception-flow.md` | MAPPED |
| Classic HandleTransientHttpError exact scope, retry/breaker/timeout/fallback/bulkhead composition, AddPolicyHandler/registry, and v8 selection boundary | `dotnet.polly-http-policy-helpers-and-httpclient-integration` | `dotnet` | `../_knowledge/dotnet/polly-http-policy-helpers-and-httpclient-integration.md` | MAPPED |
| Boundary reviews, source-use ledgers, final audit, manifests, and apply archives | - | - | - | NON_LEARNING |
| Source images, contact sheets, duplicate-placement accounting, and repetition scaffolding | - | - | - | NON_LEARNING |

## Boundary decisions

- Pipeline execution/context, retry callback semantics, rate limiting, composition/hedging, and HTTP integration each form an independently reviewable model.
- Classic and v8 syntax are compared only where the source does so; the migration does not claim that their APIs are interchangeable.

| Status | Count |
|---|---:|
| MAPPED | 8 |
| MERGED | 0 |
| NON_LEARNING | 2 |
| UNRESOLVED | 0 |

Total mapping rows: 10

Distinct Knowledge IDs: 5 (5 new)
