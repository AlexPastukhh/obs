# R03 - Pipeline.Execute / provider / RateLimiter / partitions road

Conspect: `polly-cheat-sheet-production-ready-exceptions-pipeline-handling`  
File type: **source-preserving region transcript**  
Stage: **stage-1 / verified region transcript v001**  
Generated: 2026-06-02 09:26:01 UTC

---

## Direction check

Goal:
Convert the Polly Excalidraw conspect into source-preserving AI-readable text without losing screenshots.

Now:
Stage0 is committed in repo. R03 is the first transcript pass and is sized to the new default: 60-100 images.

This step:
Process the coherent R03 road: manual pipeline execution, ResilienceContext, RateLimiterStrategy, RateLimitPartition, conditional rate limiting, and testing-oriented examples.

Why:
This closes one large contiguous technical road without mixing it with R01/R02 option mechanics or R04/R05/R06 exception/classic Polly roads.

Next:
Likely R04+R05+R06 combined boundary review, if contact sheets confirm coherence.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:

- manual execution of Polly v8 ResiliencePipeline instead of relying on HttpMessageHandler
- creating a fresh request/content stream per retry attempt
- ResilienceContext and context properties for per-request metadata
- RateLimiterStrategy options and Acquire/WaitAsync semantics
- System.Threading.RateLimiting limiter types and how Polly can wrap them
- RateLimitPartition / partitioned limiter scenarios and chained/conditional limiting
- testing/extension-style examples around conditional rate limiting

Key ideas:

- A pipeline is not an HTTP handler; ExecuteAsync runs a delegate through configured resilience strategies.
- For retrying upload/request bodies, a new stream and a new HttpRequestMessage per attempt is the safer pattern.
- Polly v8 ResilienceContext can carry per-execution properties, but context must be returned to the pool.
- Rate limiter strategies need a limiter acquisition model; strategy callbacks return limiter/lease semantics from System.Threading.RateLimiting.
- RateLimitPartition is useful when key-based or request-dependent limiter selection is needed.
- Conditional rate limiting can select limiter/no-limiter behavior based on request metadata or context.

Reading quality:
```text
overall_conceptual_understanding: high
source_image_readability: medium-high: contact sheet is large but coherent; code screenshots are readable enough for concepts, exact punctuation should be checked in preserved PNGs
transcript_method: visual/contact-sheet review plus OCR-assisted excerpts from extracted source images
limitations:
- Some code punctuation and generic angle brackets may be OCR-noisy.
- This pass preserves source images and records OCR-assisted text so future correction can target exact screenshots.
- Stage0 split remains checklist only; R04/R05/R06/R07 still need own boundary review.
confidence_summary: High for region ownership and conceptual notes; medium-high for exact code line transcription.
```

---

## 0.2 Boundary / coverage

Included source count: `62`

Included source IDs:
```text
S-013, S-023, S-026, S-032, S-033, S-035, S-040, S-042, S-048, S-051, S-055, S-057, S-060, S-065, S-067, S-070, S-076, S-080, S-084, S-089, S-093, S-095, S-102, S-103, S-105, S-109, S-112, S-113, S-121, S-122, S-124, S-128, S-131, S-133, S-135, S-137, S-140, S-143, S-145, S-146, S-148, S-149, S-152, S-153, S-154, S-158, S-159, S-162, S-164, S-166, S-168, S-169, S-171, S-173, S-176, S-179, S-181, S-182, S-183, S-184, S-185, S-186
```

Checked / left for later:
```text
R01 -> ShouldHandle/delay/context/nesting mechanics
R02 -> new standard vs custom / hedging / testing road
R04 -> manual execution / provider / classic-vs-new Polly road
R05 -> classic extensions / HttpPolicyExtensions examples
R06 -> exception bubbling / newer exception handling
R07 -> production-ready full cheat sheet / exception mapping
```

Duplicate-use note:
```text
S-033 duplicates the same embedded image as S-001. R03 owns S-033 as the R03 placement. S-001 remains available for later R04 review if needed.
```

---

## 1. Source inventory

| Region source | Global source | fileId | Topic | Readability | Confidence |
|---|---|---|---|---|---|
| R03-S001 | S-013 | `f0f0808ea8` | Manual ResiliencePipeline.Execute / new request per retry / context passing | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S002 | S-023 | `4d72e66e10` | Manual ResiliencePipeline.Execute / new request per retry / context passing | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S003 | S-026 | `01c81512db` | Manual ResiliencePipeline.Execute / new request per retry / context passing | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S004 | S-032 | `5bd0dfe740` | Manual ResiliencePipeline.Execute / new request per retry / context passing | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S005 | S-033 | `4aec986325` | Manual ResiliencePipeline.Execute / new request per retry / context passing | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S006 | S-035 | `af54ccdfe5` | Manual ResiliencePipeline.Execute / new request per retry / context passing | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S007 | S-040 | `82fc2acfb5` | Manual ResiliencePipeline.Execute / new request per retry / context passing | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S008 | S-042 | `db8e76c35c` | Manual ResiliencePipeline.Execute / new request per retry / context passing | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S009 | S-048 | `892310b650` | Manual ResiliencePipeline.Execute / new request per retry / context passing | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S010 | S-051 | `2d36297f56` | Manual ResiliencePipeline.Execute / new request per retry / context passing | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S011 | S-055 | `84367ac66e` | Manual ResiliencePipeline.Execute / new request per retry / context passing | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S012 | S-057 | `42f54ebe49` | RateLimiterStrategy options / limiter acquisition / concurrency | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S013 | S-060 | `e23ed23608` | RateLimiterStrategy options / limiter acquisition / concurrency | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S014 | S-065 | `c6da91c1d0` | RateLimitPartition / partitioned/chained limiters | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S015 | S-067 | `5a9b22f068` | RateLimiterStrategy options / limiter acquisition / concurrency | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S016 | S-070 | `24e2f35931` | RateLimitPartition / partitioned/chained limiters | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S017 | S-076 | `2f10c18e17` | RateLimitPartition / partitioned/chained limiters | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S018 | S-080 | `25e6ed724e` | RateLimitPartition / partitioned/chained limiters | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S019 | S-084 | `6b594bdab1` | RateLimitPartition / partitioned/chained limiters | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S020 | S-089 | `9a8b3e8e18` | RateLimitPartition / partitioned/chained limiters | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S021 | S-093 | `ce589e1564` | RateLimitPartition / partitioned/chained limiters | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S022 | S-095 | `3c9fb19b6a` | RateLimitPartition / partitioned/chained limiters | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S023 | S-102 | `b408541b04` | R03 pipeline/rate-limiter source | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S024 | S-103 | `b11e09846e` | RateLimitPartition / partitioned/chained limiters | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S025 | S-105 | `8660f1d742` | RateLimitPartition / partitioned/chained limiters | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S026 | S-109 | `427b4f1ead` | R03 pipeline/rate-limiter source | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S027 | S-112 | `3f0264fc42` | RateLimitPartition / partitioned/chained limiters | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S028 | S-113 | `677d2ecb93` | R03 pipeline/rate-limiter source | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S029 | S-121 | `cb2e22c967` | System.Threading.RateLimiting limiter types returned from callbacks | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S030 | S-122 | `4cbe1f2400` | RateLimitPartition / partitioned/chained limiters | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S031 | S-124 | `4a75181cc8` | R03 pipeline/rate-limiter source | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S032 | S-128 | `329903ab42` | System.Threading.RateLimiting limiter types returned from callbacks | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S033 | S-131 | `0e9d048ae7` | R03 pipeline/rate-limiter source | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S034 | S-133 | `7f89e92900` | Conditional rate limiting / testing / extension-style examples | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S035 | S-135 | `a03ec19432` | Conditional rate limiting / testing / extension-style examples | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S036 | S-137 | `353e736c46` | System.Threading.RateLimiting limiter types returned from callbacks | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S037 | S-140 | `556599c61f` | Conditional rate limiting / testing / extension-style examples | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S038 | S-143 | `1448630305` | System.Threading.RateLimiting limiter types returned from callbacks | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S039 | S-145 | `fb3dd4c559` | Conditional rate limiting / testing / extension-style examples | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S040 | S-146 | `f77ba847a1` | System.Threading.RateLimiting limiter types returned from callbacks | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S041 | S-148 | `b899ea628b` | System.Threading.RateLimiting limiter types returned from callbacks | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S042 | S-149 | `ec40b7bc05` | Conditional rate limiting / testing / extension-style examples | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S043 | S-152 | `70375a0351` | System.Threading.RateLimiting limiter types returned from callbacks | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S044 | S-153 | `070fb786e0` | System.Threading.RateLimiting limiter types returned from callbacks | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S045 | S-154 | `e272c21bda` | System.Threading.RateLimiting limiter types returned from callbacks | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S046 | S-158 | `1b0e5519bf` | System.Threading.RateLimiting limiter types returned from callbacks | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S047 | S-159 | `39976fc21a` | System.Threading.RateLimiting limiter types returned from callbacks | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S048 | S-162 | `c037ae667f` | System.Threading.RateLimiting limiter types returned from callbacks | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S049 | S-164 | `20244719a1` | R03 pipeline/rate-limiter source | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S050 | S-166 | `c1f70b7d39` | System.Threading.RateLimiting limiter types returned from callbacks | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S051 | S-168 | `7d6a8e8312` | R03 pipeline/rate-limiter source | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S052 | S-169 | `5277e820bd` | R03 pipeline/rate-limiter source | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S053 | S-171 | `60fce52ec2` | R03 pipeline/rate-limiter source | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S054 | S-173 | `5369b3f787` | R03 pipeline/rate-limiter source | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S055 | S-176 | `d6527f34a1` | R03 pipeline/rate-limiter source | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S056 | S-179 | `8b2be0bfe0` | R03 pipeline/rate-limiter source | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S057 | S-181 | `efdc6fb257` | R03 pipeline/rate-limiter source | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S058 | S-182 | `4f604be090` | R03 pipeline/rate-limiter source | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S059 | S-183 | `19f68a61d8` | R03 pipeline/rate-limiter source | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S060 | S-184 | `ebe43de39b` | R03 pipeline/rate-limiter source | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S061 | S-185 | `29c65452de` | R03 pipeline/rate-limiter source | medium-high | medium-high for concept; exact code punctuation should be checked against source image |
| R03-S062 | S-186 | `6b18c2f35f` | R03 pipeline/rate-limiter source | medium-high | medium-high for concept; exact code punctuation should be checked against source image |

---

## 2. Source transcript / OCR-assisted visible text

### R03-S001 / S-013 - `f0f0808ea8`

- topic: Manual ResiliencePipeline.Execute / new request per retry / context passing
- nearest labels: the pipeline, not handler, you cant use handler for manual execution | making request with pipeline.execute | ratelimiterstrategy args | so to have delegating handler that gets pipeline with pipelineprovider | based on request properties | or

Visible text / code excerpt:
```text
2) Creating a NEW stream + NEW request on each retry (recommended)
This is the safest way because every attempt gets a fresh, readable body.
Example: use the pipeline directly (cleanest “new request each attempt”)
oO o
using Polly;
using Polly.Retry;
public sealed class Uploader
{
private readonly ResiliencePipeline<HttpResponseMessage> _pipeline;
private readonly HttpClient _client;
public Uploader(ResiliencePipelineProvider<string> provider, IHttpClientFactory factory)
{
_pipeline = provider .GetPipeline<HttpResponseMessage>(“upload-pipeline”);
_Client = factory.CreateClient(“upload-raw"); // plain client (no retry handler)
+
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S002 / S-023 - `4d72e66e10`

- topic: Manual ResiliencePipeline.Execute / new request per retry / context passing
- nearest labels: so to have delegating handler that gets pipeline with pipelineprovider | based on request properties | or | creating a wrapper that runs pipeline.execute and passes context | look like the cleanest options | for simple scenarios its better to create wrapper with manual pipeline

Visible text / code excerpt:
```text
how we can set something into resilience context of new polly for each
request

Ayman Ha npotmxexmn 31s >

With new Polly + Microsoft. Extensions Http.Resilience , there are two supported patterns:

1. If you execute the pipeline yourself

Then you can set ResilienceContext.Properties directly for each execution:
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S003 / S-026 - `01c81512db`

- topic: Manual ResiliencePipeline.Execute / new request per retry / context passing
- nearest labels: the pipeline, not handler, you cant use handler for manual execution | making request with pipeline.execute | ratelimiterstrategy args | custom | hedging priciple of work | so to have delegating handler that gets pipeline with pipelineprovider

Visible text / code excerpt:
```text
Common builder methods (v8)
AddRetry(...)
Use for: transient failures (exceptions and/or bad results) with delays/backoff.
Options: RetryStrategyOptions / RetryStrategyOptions<TResult> — pollydocsorg ~
wo CH ia’)
using Polly;
using Polly.Retry;
var pipeline = new ResiliencePipelineBuilder<HttpResponseMessage>()
-AddRetry(new RetryStrategy0ptions<HttpResponseMessage>
{
MaxRetryAttempts = 3,
Delay = TimeSpan.FromMilliseconds(200),
ShouldHandle = new PredicateBuilder<HttpResponseMessage>()
-Handle<tittpRequestException>()
-HandleResult(r => (int)r.StatusCode >= 500),
OnRetry = args => { /* log args.Outcome + args.AttemptNumber */ return default; }
2D) Vv
-Build();
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S004 / S-032 - `5bd0dfe740`

- topic: Manual ResiliencePipeline.Execute / new request per retry / context passing
- nearest labels: ratelimiterstrategy args | the pipeline, not handler, you cant use handler for manual execution | making request with pipeline.execute | so to have delegating handler that gets pipeline with pipelineprovider | based on request properties | or

Visible text / code excerpt:
```text
What _pipeline.ExecuteAsync is
_pipeline is a ResiliencePipeline<HttpResponseMessage> (Polly v8).
ExecuteAsync(...) means:
“Run this delegate through the pipeline strategies.”

So if your pipeline contains Retry + Timeout + CircuitBreaker, then:

© Retry will re-invoke the delegate on transient failures

* Timeout can cancel attempts

* Circuit breaker can block execution when open

© etc.
In other words:
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S005 / S-033 - `4aec986325`

- topic: Manual ResiliencePipeline.Execute / new request per retry / context passing
- nearest labels: so to have delegating handler that gets pipeline with pipelineprovider | based on request properties | or | creating a wrapper that runs pipeline.execute and passes context | look like the cleanest options | for simple scenarios its better to create wrapper with manual pipeline
- duplicate source IDs: `S-001,S-033`

Visible text / code excerpt:
```text
using Polly;
var key = new ResiliencePropertykey<string>(“TenantId”);
ResilienceContext context = ResilienceContextPool Shared. Get (cancel lationToken) ;
context.Properties.Set(key, “tenant-42");
try
{
await pipeline. Executeasync(
static async ctx =>
{
var tenantId = ctx.Properties.GetValue(
new ResiliencePropertykey<string>("TenantId"),
unknown”);
await DoWorkAsync(ctx.CancellationToken) ;

hb

context);
+
Finally
{

ResilienceContextPool .Shared.Return(context) ;
+
That is the standard Polly v8 model: get a context from ResilienceContextPool , set properties, execute,
then retum it to the pool. rehoos 2
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S006 / S-035 - `af54ccdfe5`

- topic: Manual ResiliencePipeline.Execute / new request per retry / context passing
- nearest labels: ratelimiterstrategy args | the pipeline, not handler, you cant use handler for manual execution | making request with pipeline.execute | custom | so to have delegating handler that gets pipeline with pipelineprovider | based on request properties

Visible text / code excerpt:
```text
public Task<HttpResponseMessage> UploadFileAsync(Uri url, string filePath, CancellationToken
{
return _pipeline.Executeasync(async _ =>
{
7 NEW stream each attempt
await using var fs = File.OpenRead(filepath) ;
71 NEW request each attempt
using var req = new HttpRequestMessage(HttpMethod.Post, url)
{
Content = new StreamContent(fs)
b
req.Content.Headers ContentType =
new System.Net.Http.Headers .MedialypeHeaderValue(“application/octet-stream”);
return await _client.Sendasync(req, HttpCompletionOption.ResponseHeadersRead, ct);
} ct)s
+
} v
a .
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S007 / S-040 - `82fc2acfb5`

- topic: Manual ResiliencePipeline.Execute / new request per retry / context passing
- nearest labels: the pipeline, not handler, you cant use handler for manual execution | ratelimiterstrategy args | making request with pipeline.execute | custom | hedging priciple of work | rate limiter in polly

Visible text / code excerpt:
```text
AddTimeout(...)
Use for: bounding execution time (must honor cancellation token).
Options: TimeoutStrategy0ptions
Exception: TimeoutRejectedException — pollydocorg ~1
” cH (ay
using Polly;
using Polly.Timeout;
var pipeline = new ResiliencePipelineBuilder()
-AddTimeout(new TimeoutStrategyOptions
{
Timeout = TimeSpan.FromSeconds(2)
2D)
-Build();
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S008 / S-042 - `db8e76c35c`

- topic: Manual ResiliencePipeline.Execute / new request per retry / context passing
- nearest labels: ratelimiterstrategy args | the pipeline, not handler, you cant use handler for manual execution | making request with pipeline.execute | so to have delegating handler that gets pipeline with pipelineprovider | based on request properties | or

Visible text / code excerpt:
```text
o CH ia}
return _pipeline.ExecuteAsync(async ct =>
{
// your actual HTTP call
return await _client.SendAsync(req, HttpCompletionOption.ResponseHeadersRead, ct);
}, ct)s
is like saying:
“Call HttpClientSendAsync, but with resilience behaviors applied.”
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S009 / S-048 - `892310b650`

- topic: Manual ResiliencePipeline.Execute / new request per retry / context passing
- nearest labels: so to have delegating handler that gets pipeline with pipelineprovider | based on request properties | or | creating a wrapper that runs pipeline.execute and passes context | look like the cleanest options | for simple scenarios its better to create wrapper with manual pipeline

Visible text / code excerpt:
```text
2. If you use HttpClientFactory + AddResilienceHandler
Here is the important part:
There is no official built-in AddResilienceHiandler overload that gives you the current
HttpRequestMessage and lets you populate ResilienceContext directly per request. The documented
overloads are configuration-time overloads using ResiliencePipelineBuilder<HttpResponseMessage> and
optionally ResilienceHandlerContext . _wicosoftleam
So with the stock HTTP integration, the usual answer is:

© put per-request data on HttpRequestMessage.Options

© then read that data where you need it during request handling or resilience callbacks
Microsoft explicitly recommends |HttpRequestMessage Options for passing arbitrary per-request data
alongside an HTTP request. wicosoftizam ~
Example:
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S010 / S-051 - `2d36297f56`

- topic: Manual ResiliencePipeline.Execute / new request per retry / context passing
- nearest labels: ratelimiterstrategy args | the pipeline, not handler, you cant use handler for manual execution | making request with pipeline.execute | rate limiter in polly | concur vs addratelimiter | and ratelimiterstrat options

Visible text / code excerpt:
```text
Register the pipeline + client
oO o
builder.Services.addResiliencePipeline<string, HttpResponseMessage>(“upload-pipeline”, p =>
{
p-AddRetry(new RetryStrategyOptions<HttpResponseMessage>
{
MaxRetryattempts = 3,
Delay = TimeSpan.FromMtilliseconds(200),
Backofflype = DelayBackoffType. Exponential,
UseJitter = true,
ShouldHandle = args => ValueTask.FromResult(
args.Outcome.Exception is HttpRequestException | |
(args-Outcome.Result?.StatusCode is >= System.Net.HttpStatusCode.InternalServerError)
)
ns
ns
builder.Services.addHttpClient(“upload-raw"); // no resilience handler here
builder.Services.addTransient<Uploader>();
(( ~~}
@ Works even if the underlying content is non-seekable (because you reopen/recreate it each attempt).
@ Avoids “empty body on retry” and most stream-c \| »sal issues.
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S011 / S-055 - `84367ac66e`

- topic: Manual ResiliencePipeline.Execute / new request per retry / context passing
- nearest labels: ratelimiterstrategy args | the pipeline, not handler, you cant use handler for manual execution | hedging priciple of work | making request with pipeline.execute | rate limiter in polly | concur vs addratelimiter

Visible text / code excerpt:
```text
AddCircuitBreaker(...)
Use for: stop calling a broken dependency for a while (v8 uses the advanced-style breaker).
Options: CircuitBreakerStrategyOptions / CircuitBreakerStrategyOptions<TResult>
Note: v8 does not support the old “classic consecutive failures” breaker. cus»
” cH (ay
using Polly;
using Polly.CircuitBreaker;
var pipeline = new ResiliencePipelineBuilder<HttpResponseMessage>()
-AddCircuitBreaker(new CircuitBreakerStrategyOptions<HttpResponseMessage>
{
ShouldHandle = new PredicateBuilder<HttpResponseMessage>()
-Handle<HttpRequestException>()
-HandleResult(r => (int)r.StatusCode >= 500),
FailureRatio = 0.5,
SamplingDuration = TimeSpan.FromSeconds(10),
MinimumThroughput = 20,
BreakDuration = TimeSpan.FromSeconds(3@),
OnOpened = args => { /* log */ return default; },
OnClosed = args => { /* log */ return default; },
OnHalfOpened = args => { /* log */ return default; },
»
-Build(); Vv
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S012 / S-057 - `42f54ebe49`

- topic: RateLimiterStrategy options / limiter acquisition / concurrency
- nearest labels: ratelimiterstrategy args | rate limiter in polly | concur vs addratelimiter | and ratelimiterstrat options | so to have delegating handler that gets pipeline with pipelineprovider | based on request properties

Visible text / code excerpt:
```text
var pipeline = new ResiliencePipelineBuilder()
-AddRateLimiter(new RateLimiterStrategyOptions
{
// If RateLimiter is null, Polly uses DefaultRateLimiterOptions (a default concurrency li
RateLimiter = args =>
{
// Custom limiter (here: concurrency limiter)
var limiter = new ConcurrencyLimiter(new ConcurrencyLimiterOptions
{
PermitLimit = 100,
QueueLimit = 50,
QueueProcessingOrder = QueueProcessingOrder.OldestFirst
ys
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S013 / S-060 - `e23ed23608`

- topic: RateLimiterStrategy options / limiter acquisition / concurrency
- nearest labels: ratelimiterstrategy args | so to have delegating handler that gets pipeline with pipelineprovider | based on request properties | or | creating a wrapper that runs pipeline.execute and passes context | look like the cleanest options

Visible text / code excerpt:
```text
Example:
o oO
public static class RequestOptionkeys
{
public static readonly HttpRequestOptionskey<string> TenantId =
new("TenantId);
+
var request = new HttpRequestMessage(HttpMethod.Get, “/orders/42");
request Options .Set(RequestOptionKeys.TenantId, “tenant-42");
var response = await client.SendAsync(request) ;
Then later, if you have access to the request, you read:
CH 9% Cnpocure ChatGPT 8
if (request Options. TryGetValue(RequestOptionKeys.TenantId, out var tenantId))
{
7/ use tenantid
+
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S014 / S-065 - `c6da91c1d0`

- topic: RateLimitPartition / partitioned/chained limiters
- nearest labels: ratelimiterstrategy args | rate limiter in polly | concur vs addratelimiter | and ratelimiterstrat options | ratelimiterpartition and partitioned rate limiter | 3 scenarios

Visible text / code excerpt:
```text
args there is a RateLimiterarguments value passed to the [RateLimiter delegate. Polly defines
RateLimiter as:
CH ia}
Func<RateLimiterArguments, ValueTask<RateLimitLease>>
So in:
CH ia}
RateLimiter - args -> { ... }
args is not your own app args; it is Polly's wrapper object for the limiter callback. _potydoog
The main thing you usually use from it is:
© args.Context — the current Resiliencecontext
© and from that, commonly:
© args.Context .CancellationToken
© args.Context Properties
© args.Context.OperationKey — pollydocsorg ~
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S015 / S-067 - `5a9b22f068`

- topic: RateLimiterStrategy options / limiter acquisition / concurrency
- nearest labels: ratelimiterstrategy args | rate limiter in polly | concur vs addratelimiter | and ratelimiterstrat options | hedging priciple of work | !!!

Visible text / code excerpt:
```text
AddFallback(...)
Use for: return a safe response/value when failures happen.
Options: FallbackStrategyOptions / FallbackStrategyOptions<TResult> (docs are under “fallback
strategy” on Polly site). potydocsors ~
” cH (ay
using Polly;
using Polly. Fallback;
var pipeline = new ResiliencePipelineBuilder<HttpResponseMessage>()
-AddFallback(new FallbackStrategyOptions<HttpResponseMessage>
{
ShouldHandle = new PredicateBuilder<HttpResponseMessage>()
-Handle<HttpRequestException>()
-HandleResult(r => (int)r.StatusCode >= 500),
FallbackAction = args =>
Outcome. FromResultAsValueTask(new HttpResponseMessage(System.Net .HttpStatusCode.OK)
{ Content = new StringContent("{\"cached\":true}") }),
OnFallback = args => { /* log */ return default; }
»
-Build();
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S016 / S-070 - `24e2f35931`

- topic: RateLimitPartition / partitioned/chained limiters
- nearest labels: ratelimiterpartition and partitioned rate limiter | 3 scenarios | so we need ratelimitpartition when | 1 we need specific ratelimiter and we need to pass | key (ratelimiter middleware case) | 2 we need to create ratelimiter with callback that has httpcontext

Visible text / code excerpt:
```text
So can you set ResilienceContext for each HttpClient request automatically?
Not through a documented built-in request-aware AddResiliencelandler hook. Nicosotsan
What to do instead
A. Best supported option for HttpClientFactory
Use HttpRequestMessage.options for per-request data. Microsoft recommends that for arbitrary request-
scoped information, cosa team -1
B. If you need request-time logic in the handler chain
Use a custom DelegatingHandler , because DelegatingHandler.Sendasync runs for each request and
receives the HttpRequestMessage . Mavsot iam -
Example:
o oO
public sealed class TenantTageingHandler : DelegatingHandler
{ 99 Cnpocute ChatGPT
protected override sum swscprespunnsnsSage> SendAsync(
HttpRequestMessage request,
CancellationToken cancellationToken)
{
request .Options.Set(RequestOptionKeys.TenantId, “tenant-42");
return base.SendAsync(request, cancellationToken) ;
+
+
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S017 / S-076 - `2f10c18e17`

- topic: RateLimitPartition / partitioned/chained limiters
- nearest labels: rate limiter in polly | concur vs addratelimiter | and ratelimiterstrat options | ratelimiterpartition and partitioned rate limiter | 3 scenarios | ratelimiterstrategy args

Visible text / code excerpt:
```text
That is why examples do this:
o oO
RateLimiter = args =>
{
return partitionedLimiterAcquireasync(
args.Context,
permitCount: 1,
args.Context .CancellationToken) ;
+
because the limiter is being given the current Polly execution context, and you pass that into the underlying
-NET rate limiter. _pottydocsorg +1
So mentally, read it as:
args’ = Polly rate-limiter callback arguments
args.Context = data about the current pipeline execution
In practice, that delegate means:
“When this pipeline execution reaches the rate limiter, Polly calls my function with the current execution
context, and | must return a RateLimitLease .”
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S018 / S-080 - `25e6ed724e`

- topic: RateLimitPartition / partitioned/chained limiters
- nearest labels: !!! | rate limiter in polly | concur vs addratelimiter | and ratelimiterstrat options | using strategyopiton need to acquire | hedging priciple of work

Visible text / code excerpt:
```text
AddHedging(...)
Use for: “send another attempt” (often after a small delay) to reduce tail latency.
Options: HedgingStrategyOptions<TResult> (Polly v8). _potyaocsorg ~
wo C# (
using Polly;
using Polly.Hedging;
var pipeline = new ResiliencePipelineBuilder<HttpResponseMessage>()
-AddHedging(new HedgingStrategyOptions<HttpResponseMessage>
{
MaxHedgedAttempts = 3, // total attempts
Delay = TimeSpan.Fromitilliseconds(200),
ShouldHandle = new PredicateBuilder<HttpResponseMessage>()
-Handle<HttpRequestException>()
-HandleResult(r => (int)r.StatusCode >= 500),
Onliedging = args => { /* log */ return default; }
»
-Build();
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S019 / S-084 - `6b594bdab1`

- topic: RateLimitPartition / partitioned/chained limiters
- nearest labels: ratelimiterpartition and partitioned rate limiter | 3 scenarios | so we need ratelimitpartition when | 1 we need specific ratelimiter and we need to pass | key (ratelimiter middleware case) | 2 we need to create ratelimiter with callback that has httpcontext

Visible text / code excerpt:
```text
Register it:
wo CH a
builder.Services.AddTransient<TenantTaggingHandler>();
builder.Services.AddHttpClient(“api")
.AddHttpMessageHandler<TenantTaggingHandler>()
-AddStandardResilienceHandler();
C. If you truly need ResilienceContext Properties
Execute a Polly pipeline directly yourself, where you control the ResilienceContext . That is the official Polly
way to set custom context data. PotyDoc ~
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S020 / S-089 - `9a8b3e8e18`

- topic: RateLimitPartition / partitioned/chained limiters
- nearest labels: !!! | using strategyopiton need to acquire | rate limiter in polly | concur vs addratelimiter | and ratelimiterstrat options | from threading we return our limiter types

Visible text / code excerpt:
```text
AddconcurrencyLimiter(...) (bulkhead/concurrency)
Use for: cap concurrent executions to protect your service/dependency.
Docs show pipelines using this strategy. rotydocors
wo CH ia’)
using Polly;
var pipeline = new ResiliencePipelineBuilder()
-AddConcurrencyLimiter(100) // simplest form
-Build();
(There are also option-based overloads depending on package version; the docs are the source of truth for
the exact option type in your version.) _potyocsorg -
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S021 / S-093 - `ce589e1564`

- topic: RateLimitPartition / partitioned/chained limiters
- nearest labels: !!! | using strategyopiton need to acquire | rate limiter in polly | concur vs addratelimiter | and ratelimiterstrat options | from threading we return our limiter types

Visible text / code excerpt:
```text
Bulkhead with full-ish options (concurrency + queue + order)
o cH (ay
using Polly;
using System. Threading.Ratel imiting;
var pipeline = new ResiliencePipelineBuilder()
// Bulkhead isolation: limit concurrent executions (+ optional queue)
-AddRateLimiter(new ConcurrencyLimiter(new ConcurrencyLimiterOptions
{
PermitLimit = 100, // max concurrent executions
Queuelimit = 50, // how many wait in queue when permits are exhausted
QueueProcessingOrder = QueueProcessingOrder.OldestFirst
»)
-Build();
If you prefer Polly options + rejection callback (so you can log/metrics), use RatelimiterStrategyOptions :
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S022 / S-095 - `3c9fb19b6a`

- topic: RateLimitPartition / partitioned/chained limiters
- nearest labels: ratelimiterpartition and partitioned rate limiter | 3 scenarios | rate limiter in polly | concur vs addratelimiter | and ratelimiterstrat options | so we need ratelimitpartition when

Visible text / code excerpt:
```text
1) AddConcurrencyLimiter(...) is the specialized shortcut
It is specifically for a ConcurrencyLimiter -style strategy.
Polly exposes these overloads:
© AddConcurrencyLimiter(builder, int permitLimit, int queueLimit = @)
* AddConcurrencyLimiter(builder, ConcurrencyLimiterOptions) — PolyDos
So with AddConcurrencyLimiter(...) , you give Polly either:
© raw permitLimit / queueLimit , or
© a System. Threading.RateLimiting.ConcurrencyLimiterOptions . Poly Dos -
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S023 / S-102 - `b408541b04`

- topic: R03 pipeline/rate-limiter source
- nearest labels: so we need ratelimitpartition when | 1 we need specific ratelimiter and we need to pass | key (ratelimiter middleware case) | 2 we need to create ratelimiter with callback that has httpcontext | as arg | 3 we need to create chained rate limiter -- PARTITIONED RATE LIMITER

Visible text / code excerpt:
```text
Quick Summary
RateLimiterPartition :
* Splits requests into independent rate limit buckets
© Lets you rate limit per user / IP / tenant
* Works with Fixed, Sliding, Token bucket, Concurrency
Most commonly used:
oo CH
RateLimiterPartition.GetFixedWindowlLimiter(...)
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S024 / S-103 - `b11e09846e`

- topic: RateLimitPartition / partitioned/chained limiters
- nearest labels: using strategyopiton need to acquire | !!! | from threading we return our limiter types | rate limiter in polly | concur vs addratelimiter | and ratelimiterstrat options

Visible text / code excerpt:
```text
If you prefer Polly options + rejection callback (so you can log/metrics), use RatelimiterStrategyOptions :
o cH (ay
using Polly;
using Polly.RateLimiting;
using System. Threading.Ratelimiting;
var pipeline = new ResiliencePipelineBuilder()

-AddRateLimiter(new RateLimiterStrategyOptions
{
// Tf RateLimiter is null, Polly uses DefaultRateLimiterOptions (a default concurrency li
RateLimiter = args =>
{
// Custom limiter (here: concurrency limiter)
var limiter = new ConcurrencyLimiter(new ConcurrencyLimiterOptions
{
PermitLimit = 100,
Queuelimit = 50,
QueueProcessingOrder = QueueProcessingOrder .OldestFirst
Ds
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S025 / S-105 - `8660f1d742`

- topic: RateLimitPartition / partitioned/chained limiters
- nearest labels: ratelimiterpartition and partitioned rate limiter | 3 scenarios | so we need ratelimitpartition when | 1 we need specific ratelimiter and we need to pass | key (ratelimiter middleware case) | 2 we need to create ratelimiter with callback that has httpcontext

Visible text / code excerpt:
```text
a = = een erreet aeee
2) AddRateLimiter(...) is the general one
This one can be configured in two ways:
* AddRateLimiter(builder, RateLimiterStrategyOptions)
© AddRateLimiter(builder, RateLimiter limiter) — roty Dos
That means with AddRateLimiter(...) you can either:
A. pass Polly options
Example: new RateLimiterStrategyOptions { ... }
or
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S026 / S-109 - `427b4f1ead`

- topic: R03 pipeline/rate-limiter source
- nearest labels: so we need ratelimitpartition when | 1 we need specific ratelimiter and we need to pass | key (ratelimiter middleware case) | 2 we need to create ratelimiter with callback that has httpcontext | as arg | 3 we need to create chained rate limiter -- PARTITIONED RATE LIMITER

Visible text / code excerpt:
```text
Can we have multiple or mixed limiters?
Yes — in 3 common ways:
A) Global limiter + endpoint limiter
You can set a global limiter (applies to all requests) and also set specific policies per endpoint.
o oO
builder.Services.AddRateLimiter(options =>
{
// Global: keep the whole app safe
options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
{
var ip = httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
return RateLimitPartition.GetFixedWindowLimiter(ip, _ => new FixedWindowRateLimiterOption
{
PermitLimit = 200,
Window = TimeSpan.FromMinutes(1),
QueueLimit = 0
ys
Ys
// Endpoint-specific policies can still be udded via options.AddPolicy(...)
ns
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S027 / S-112 - `3f0264fc42`

- topic: RateLimitPartition / partitioned/chained limiters
- nearest labels: using strategyopiton need to acquire | from threading we return our limiter types | !!! | rate limiter in polly | concur vs addratelimiter | and ratelimiterstrat options

Visible text / code excerpt:
```text
// Acquire 1 permit for this execution
return limiter.AcquireAsync(1, args-Context.CancellationToken) ;
Lb
OnRejected = args =>
{
// called right before Polly throws RateLimiterRejectedException :contentReference[oa
// args.Lease tells you why it was rejected (queue full, etc.)
return default;
3
vn
-Build();
‘(~~ »
When the bulkhead rejects, Polly throws RateLimiterRejectedException . pollydecorg -1
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S028 / S-113 - `677d2ecb93`

- topic: R03 pipeline/rate-limiter source
- nearest labels: so we need ratelimitpartition when | 1 we need specific ratelimiter and we need to pass | key (ratelimiter middleware case) | 2 we need to create ratelimiter with callback that has httpcontext | as arg | 3 we need to create chained rate limiter -- PARTITIONED RATE LIMITER

Visible text / code excerpt:
```text
B. pass a concrete System. Threading.RateLimiting.RateLimiter
Such as:

* ~~ ConcurrencyLimiter

©  TokenBucketRateLimiter

©  FixedWindowRateLimiter

© SlidingWindowRateLimiter  rotyDac -
So yes: all of those limiter types come from System. Threading-RateLimiting , and Polly's rate-limiter
strategy is a thin wrapper over that package. Polly explicitly says it no longer implements its own limiter and
uses System Threading RateLimiting . Polly Doc -
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S029 / S-121 - `cb2e22c967`

- topic: System.Threading.RateLimiting limiter types returned from callbacks
- nearest labels: from threading we return our limiter types | so we need ratelimitpartition when | 1 we need specific ratelimiter and we need to pass | key (ratelimiter middleware case) | 2 we need to create ratelimiter with callback that has httpcontext | as arg

Visible text / code excerpt:
```text
3) Can AddRateLimiter(...) use ConcurrencyLimiterOptions directly?
Not directly as the method argument.
AddRateLimiter(...) accepts:
© RateLimiterStrategyOptions , or
© a RateLimiter instance.  PotyDos
But inside RateLimiterStrategyOptions , you can set:
© DefaultRateLimiterOptions = new ConcurrencyLimiterOptions { ... }
and Polly will use that to create the default limiter. The Polly docs show exactly that. _retyoa
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S030 / S-122 - `4cbe1f2400`

- topic: RateLimitPartition / partitioned/chained limiters
- nearest labels: from threading we return our limiter types | using strategyopiton need to acquire | !!! | rate limiter in polly | concur vs addratelimiter | and ratelimiterstrat options

Visible text / code excerpt:
```text
Rate limiter (requests-per-time, token bucket, sliding window, etc.)
Polly v8 rate limiting is also built on System.Threading-RateLimiting and added via AddRateLimiter(...)
polydocsorg -1
Example: 100 requests per minute (sliding window)
o cH (ay
using Polly;
using System. Threading. Ratel imiting;
var pipeline = new ResiliencePipelineBuilder()
-AddRateLimiter(new SlidingWindowRatelimiter(new SlidingWindowRatel imiterOptions
{
PermitLimit = 100,
Window = TimeSpan.FromMinutes(1),
SegmentsPerWindow = 4
»)
-Build();
Vv
This pattern is shown in Polly docs/examples. rotyioxon ~
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S031 / S-124 - `4a75181cc8`

- topic: R03 pipeline/rate-limiter source
- nearest labels: so we need ratelimitpartition when | 1 we need specific ratelimiter and we need to pass | key (ratelimiter middleware case) | 2 we need to create ratelimiter with callback that has httpcontext | as arg | 3 we need to create chained rate limiter -- PARTITIONED RATE LIMITER

Visible text / code excerpt:
```text
B) Chain multiple limiters for one endpoint (true “mixed”)
You can chain limiters so a request must pass all of them.
Example: For /login , require both:
* fixed window per IP
* concurrency limit (server protection)
” cH (a)
builder.Services.AddRateLimiter(options =>
{
options .AddPolicy("login-mixed", httpContext =>
{
var ip = httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
var fixedLimiter = RateLimitPartition.GetFixedWindowLimiter(ip, _ => new FixedWindowRateL
{
PermitLimit = 5,
Window = TimeSpan.FromMinutes(1),
QueueLimit = 0
ys
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S032 / S-128 - `329903ab42`

- topic: System.Threading.RateLimiting limiter types returned from callbacks
- nearest labels: from threading we return our limiter types | so we need ratelimitpartition when | 1 we need specific ratelimiter and we need to pass | key (ratelimiter middleware case) | 2 we need to create ratelimiter with callback that has httpcontext | as arg

Visible text / code excerpt:
```text
So this is valid:
” cH (ay
builder.AddRateLimiter(new RateLimiterStrategyOptions
{
DefaultRateLimiterOptions = new ConcurrencyLimiterOptions
{
PermitLimit = 10,
QueueLimit = 100
+
ys
But this is not the same as ” AddRateLimiter(new ConcurrencyLimiterOptions(...)) ", because that overload
does not exist. Paty bas
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S033 / S-131 - `0e9d048ae7`

- topic: R03 pipeline/rate-limiter source
- nearest labels: so we need ratelimitpartition when | 1 we need specific ratelimiter and we need to pass | key (ratelimiter middleware case) | 2 we need to create ratelimiter with callback that has httpcontext | as arg | 3 we need to create chained rate limiter -- PARTITIONED RATE LIMITER

Visible text / code excerpt:
```text
afr

var concurrencyLimiter = RatelimitPartition.GetConcurrencylimiter("login", _ => new Concu

{
PermitLimit = 50,
Queuel.imit = 0

Ds

// Chain: must succeed in both

return PartitionedRatel imiter CreateChained(fixedLimiter, concurrencyLimiter);

Ys
Ds
‘(~~ »
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S034 / S-133 - `7f89e92900`

- topic: Conditional rate limiting / testing / extension-style examples
- nearest labels: from threading we return our limiter types | using strategyopiton need to acquire | !!! | conditional rate limiting | rate limiter in polly | concur vs addratelimiter

Visible text / code excerpt:
```text
Partitioned rate limiting (per user / per tenant)
Ifyou want “100/min per user”, use a partitioned limiter keyed from |ResilienceContext . rotosow
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S035 / S-135 - `a03ec19432`

- topic: Conditional rate limiting / testing / extension-style examples
- nearest labels: from threading we return our limiter types | using strategyopiton need to acquire | !!! | conditional rate limiting | rate limiter in polly | concur vs addratelimiter

Visible text / code excerpt:
```text
what is partitioned limiter keyed from resiliencecontext
A partitioned limiter means: instead of one global rate limit for everyone, you create separate limit
“buckets” per key (user, tenant, API key, host, etc).
“Keyed from ResilienceContext ” means Polly gives your rate limiter factory a ResilienceContext for each
execution, and you derive the partition key from that context (or from data you attach to it). Then the
limiter enforces limits per key.
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S036 / S-137 - `353e736c46`

- topic: System.Threading.RateLimiting limiter types returned from callbacks
- nearest labels: from threading we return our limiter types | conditional rate limiting | so we need ratelimitpartition when | 1 we need specific ratelimiter and we need to pass | key (ratelimiter middleware case) | 2 we need to create ratelimiter with callback that has httpcontext

Visible text / code excerpt:
```text
4) When do you use which one?
Use AddConcurrencyLimiter(...) when you specifically want a bulkhead/concurrency cap:
* “allow at most N concurrent executions”
* optionally queue some extra callers. Poy Docs -
Use AddRateLimiter(...) when you want the broader rate-limiter strategy:
* custom OnRejected
¢ default limiter options through RateLimiterStrategyOptions
* oraconcrete limiter like FixedWindowRateLimiter , SlidingWindowRateLimiter , or
TokenBucketRateLimiter . Polly Docs -2 db
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S037 / S-140 - `556599c61f`

- topic: Conditional rate limiting / testing / extension-style examples
- nearest labels: from threading we return our limiter types | using strategyopiton need to acquire | conditional rate limiting | !!! | for testing | rate limiter in polly

Visible text / code excerpt:
```text
Why it matters
* Global limiter: “100 requests/min total”
* Partitioned limiter: “100 requests/min per tenant”
* Tenant A can't starve Tenant B
* Fairness + isolation
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S038 / S-143 - `1448630305`

- topic: System.Threading.RateLimiting limiter types returned from callbacks
- nearest labels: conditional rate limiting | from threading we return our limiter types | so we need ratelimitpartition when | 1 we need specific ratelimiter and we need to pass | key (ratelimiter middleware case) | 2 we need to create ratelimiter with callback that has httpcontext

Visible text / code excerpt:
```text
5) Yes, you can use AddRateLimiter(...) with RateLimiterStrategyOptions and
OnRejected
That is exactly what RateLimiterStrategyOptions is for.
Polly documents these properties on the rate-limiter strategy:
© RateLimiter
© DefaultRateLimiterOptions
© OnRejected — roty Docs -
ae
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S039 / S-145 - `fb3dd4c559`

- topic: Conditional rate limiting / testing / extension-style examples
- nearest labels: from threading we return our limiter types | conditional rate limiting | using strategyopiton need to acquire | !!! | for testing | ratelimiterpartition and partitioned rate limiter

Visible text / code excerpt:
```text
What is ResilienceContext ?
In Polly v8, each pipeline execution has a ResilienceContext carrying:
© CancellationToken
© OperationKey (optional string)
* a Properties bag (key/value) where you can attach metadata
* other execution metadata used by strategies
You can attach your own key like tenant/user id, then the rate limiter reads it.
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S040 / S-146 - `f77ba847a1`

- topic: System.Threading.RateLimiting limiter types returned from callbacks
- nearest labels: conditional rate limiting | from threading we return our limiter types | so we need ratelimitpartition when | 1 we need specific ratelimiter and we need to pass | key (ratelimiter middleware case) | 2 we need to create ratelimiter with callback that has httpcontext

Visible text / code excerpt:
```text
Example:
o cH (ay
builder AddRateLimiter(new RateLimiterStrategyOptions
{
DefaultRateLimiterOptions = new ConcurrencyLimiterOptions
{
PermitLimit = 10,
QueueLimit = 20
Lb
OnRejected = args =>
{
// args.Context
// args.Lease
return default;
+
Ds
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S041 / S-148 - `b899ea628b`

- topic: System.Threading.RateLimiting limiter types returned from callbacks
- nearest labels: conditional rate limiting | from threading we return our limiter types | for testing | using strategyopiton need to acquire | !!! | so we need ratelimitpartition when

Visible text / code excerpt:
```text
4) Partitioned limiter for HttpClient (per host / per tenant)
There are two pieces:
1. How to compute the partition key (host, tenant, api-key...)
2. How the rate-limiter strategy acquires permits using that key
A) Partition per destination host (common for HttpClient)
You can partition by request.RequestUri-Host .
In the DI AddResilienceHandler , you have access to the outgoing request, so it's the easiest place to create
partitions.
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S042 / S-149 - `ec40b7bc05`

- topic: Conditional rate limiting / testing / extension-style examples
- nearest labels: conditional rate limiting | from threading we return our limiter types | for testing | using strategyopiton need to acquire | !!! | ratelimiterpartition and partitioned rate limiter

Visible text / code excerpt:
```text
Example: per-tenant rate limiter (Token Bucket), key from context
1) Build a partitioned limiter
” cH (a)
using Polly;
using System. Threading.Ratelimiting;
static readonly ResiliencePropertyKey<string> TenantKey =
new("tenant-id");
var limiter = PartitionedRateLimiter.Create<ResilienceContext, string>(context =>
{
// Pull tenant id from the context (fallback to "anonymous")
var tenantId = context.Properties.TryGetValue(TenantKey, out var t) ? t : “anonymous";
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S043 / S-152 - `70375a0351`

- topic: System.Threading.RateLimiting limiter types returned from callbacks
- nearest labels: conditional rate limiting | from threading we return our limiter types | classic polly transient failures | new polly | vs httprequest exception | for testing

Visible text / code excerpt:
```text
Polly states that OnRejected runs just before RatelimiterRejectedException is thrown, and the callback
gives you access to the Context and the Lease. Petes
‘Two important details:

* OnRtejected is for notification/side effects such as logging or metrics.

© The strategy still rejects by throwing RateLimiterRejectedException unless an outer strategy handles it.

Poly Dos

Also, Polly notes that RetryAfter is available on the thrown RateLimiterRejectedException , but not inside
the OnRejected callback itself. otyoos
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S044 / S-153 - `070fb786e0`

- topic: System.Threading.RateLimiting limiter types returned from callbacks
- nearest labels: conditional rate limiting | from threading we return our limiter types | for testing | using strategyopiton need to acquire | !!! | so we need ratelimitpartition when

Visible text / code excerpt:
```text
Example (conceptual — exact delegate names vary by package version, but the idea is stable):
” cH (ay
using System. Threading.RateLimiting;
using Polly.RateLimiting;
services. AddHttpClient ("api")
-AddResilienceHandler("rl", (builder, context) =>
{
// context contains info about HttpClient request execution
// (outgoing HttpRequestMessage, service provider, etc.)
var limiter = PartitionedRateLimiter.Create<HttpRequestMessage, string>(request =>
{
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S045 / S-154 - `e272c21bda`

- topic: System.Threading.RateLimiting limiter types returned from callbacks
- nearest labels: conditional rate limiting | for testing | from threading we return our limiter types | using strategyopiton need to acquire | !!! | so we need ratelimitpartition when

Visible text / code excerpt:
```text
return RateLimitPartition.GetTokenBucketLimiter(tenantId, _ => new TokenBucketRatel.imiterOptions
{
TokenLimit = 100, // bucket size
TokensPerPeriod = 100, // refill amount
ReplenishmentPeriod = TimeSpan.FromMinutes(1),
AutoReplenishment = true,
QueueLimit = // reject instead of queue
Ys
4 ee )
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S046 / S-158 - `1b0e5519bf`

- topic: System.Threading.RateLimiting limiter types returned from callbacks
- nearest labels: conditional rate limiting | for testing | from threading we return our limiter types | using strategyopiton need to acquire | !!! | so we need ratelimitpartition when

Visible text / code excerpt:
```text
2) Use it in a Polly pipeline
o cH (ay
var pipeline = new ResiliencePipelineBuilder()
-AddRateLimiter(new Ratel.imiterStrategy0ptions
{
RateLimiter = args => limiter.AcquireAsync(1, args.Context .CancellationToken),
OnRejected = args => { /* log tenant */ return default; }
2)
-Build();
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S047 / S-159 - `39976fc21a`

- topic: System.Threading.RateLimiting limiter types returned from callbacks
- nearest labels: conditional rate limiting | for testing | from threading we return our limiter types | using strategyopiton need to acquire | classic polly transient failures | new polly

Visible text / code excerpt:
```text
tv
var host = request.RequestUri?.Host ?? "unknown";
return RateLimitPartition.GetTokenBucketLimiter(host, _ => new TokenBucketRateLimiterOptions
{
TokenLimit = 50,
TokensPerPeriod = 50,
ReplenishmentPeriod = TimeSpan.FromSeconds(1),
AutoReplenishment = true,
Queuel.imit = 0
Ys
Ds
builder. AddRateLimiter(new RatelimiterStrategyOptions
{
RateLimiter = args =>
{
// args.Context is ResilienceContext
// but we need the request to pick a partition key.
var request = context.Request; // (conceptually)
return limiterAcquireAsync(request, permitCount: 1, args.Context.CancellationToken);
t
Ds Y
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S048 / S-162 - `c037ae667f`

- topic: System.Threading.RateLimiting limiter types returned from callbacks
- nearest labels: for testing | conditional rate limiting | from threading we return our limiter types | using strategyopiton need to acquire | !!! | classic polly transient failures

Visible text / code excerpt:
```text
3) When executing, set the tenant id in the context
wo CH ia’)
var ctx = ResilienceContextPool .Shared.Get();
ctx. Properties.Set(TenantKey, "tenant-42");
try
{

await pipeline.ExecuteAsync(async _ =>
{
// do work
return;
3, ctx)s
t
finally
{
ResilienceContextPool .Shared.Return(ctx)5
+

Now each tenant gets its own 100/min limiter.

1
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S049 / S-164 - `20244719a1`

- topic: R03 pipeline/rate-limiter source
- nearest labels: conditional rate limiting | classic polly transient failures | new polly | vs httprequest exception | for testing | with extension

Visible text / code excerpt:
```text
DOES POLLYS RATE LIMITER HAS THIS
Ayman Ha npotaxkennn 17s >
No — Polly's rate limiter strategy doesn’t have a ShouldHandle / predicate like Retry or Circuit Breaker. It’s
proactive: every execution that goes through the rate-limiter strategy will try to acquire a lease; if it can’t, it
rejects (throws RateLimiterRejectedException or calls OnRejected ). _potydoorg
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S050 / S-166 - `c1f70b7d39`

- topic: System.Threading.RateLimiting limiter types returned from callbacks
- nearest labels: conditional rate limiting | for testing | from threading we return our limiter types | classic polly transient failures | new polly | vs httprequest exception

Visible text / code excerpt:
```text
eee il
Because different versions expose the request differently, the shape above may not compile as-is in your
exact packages — but the architecture is correct:
* compute partition key from outgoing request
* acquire permits from a partitioned limiter
If you tell me your package set ( Microsoft.Extensions.Http-Resilience version / Polly version), | can give
the exact compiling code for your version.
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S051 / S-168 - `7d6a8e8312`

- topic: R03 pipeline/rate-limiter source
- nearest labels: conditional rate limiting | for testing | classic polly transient failures | new polly | vs httprequest exception | with extension

Visible text / code excerpt:
```text
1) Decide where to apply it (the real equivalent of ShouldHand1e )

You choose which operations run through a pipeline that contains .AddRateLimiter(...) . If it's not in the
pipeline, it won't be limited.

2) Conditional limiting via the RateLimiter delegate (closest to “ShouldHandle”)
Polly's RateLimiterStrategyOptions lets you supply a Ratelimiter delegate. That delegate can choose
different limiters (or partitions) based on ResilienceContext (operation key, custom properties, etc), by
using PartitionedRateLimiter .  polidocorg
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S052 / S-169 - `5277e820bd`

- topic: R03 pipeline/rate-limiter source
- nearest labels: classic polly transient failures | new polly | vs httprequest exception | conditional rate limiting | with extension | manually

Visible text / code excerpt:
```text
builder. Services.AddResiliencePipeline<string, HttpResponseMessage>(“rate-limit™, p =>
{
p-AddRateLimiter(new RateLimiterStrategyoptions
{
RateLimiter = args =>
{
17 18 requests per second with queue up to 20
return new TokenBucketRateLimiter(new TokenBucketRatelimiteroptions
{
TokenLimit = 10,
TokensPerPeriod = 10,
ReplenishmentPeriod = TimeSpan.FromSeconds(1),
QueueProcessingOrder = QueueProcessingOrder .OldestFirst,
QueveLimit = 20,
AutoReplenishment = true
Ds
}
ns
bs v
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S053 / S-171 - `60fce52ec2`

- topic: R03 pipeline/rate-limiter source
- nearest labels: conditional rate limiting | for testing | classic polly transient failures | new polly | vs httprequest exception | with extension

Visible text / code excerpt:
```text
That's how you implement “limit only some requests":
* Pick a partition key from context (e.g. user id, tenant id, route name)
© Retuma limiter for that partition
* For routes you want to exclude, return a “no limiter” partition (if available in your target framework) or
route them to a very-high-limit limiter
Polly docs explicitly show partitioned rate limiter usage (extracting partition key from ResilienceContext )-
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S054 / S-173 - `5369b3f787`

- topic: R03 pipeline/rate-limiter source
- nearest labels: conditional rate limiting | for testing | with extension | classic polly transient failures | new polly | vs httprequest exception

Visible text / code excerpt:
```text
Pollydocs.org,
3) OnRejected exists, but it’s after the decision
There's an OnRejected) callback, but it only runs when the limiter already rejected an execution. It's not a
“should | limit?” hook. — patydocorg
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S055 / S-176 - `d6527f34a1`

- topic: R03 pipeline/rate-limiter source
- nearest labels: for testing | conditional rate limiting | with extension | classic polly transient failures | new polly | vs httprequest exception

Visible text / code excerpt:
```text
Chaos strategies: what they are (and why you'd use them)
Chaos strategies are intentional fault injection for testing resiliency without waiting for real outages. Polly
integrated Simmy-style chaos into v8 (starting 8.3.0). ctu -
Polly provides these chaos strategy builders: _potydocos

* AddChaosFault — randomly throw exceptions (simulate downstream crashes)

* ‘AddChaosLatency — randomly add delay (simulate slowness / tail latency)

© ‘AddChaosOutcome — randomly return “fake” results (simulate bad responses)

* AddChaosBehavior — run custom behavior (e.g., log/alter context)
Where to place them: usually last/innermost in the pipeline so your “real” resilience (retry/cb/timeout) can
react to injected faults. potyiocso
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S056 / S-179 - `8b2be0bfe0`

- topic: R03 pipeline/rate-limiter source
- nearest labels: for testing | conditional rate limiting | with extension | classic polly transient failures | new polly | vs httprequest exception

Visible text / code excerpt:
```text
Example: inject 5% latency and 1% faults (for testing)
” cH (ay
using Polly;
using Polly.Simmy; // package/name may vary by version
using Polly.Simmy. Fault;
using Polly.Simmy.Latency;
var pipeline = new ResiliencePipelineBuilder<HttpResponseMessage>()
-AddRetry(new() { MaxRetryAttempts = 2 })
-AddTimeout (TimeSpan .FromSeconds(2))
// Chaos (typically last)
-AddChaosLatency(new ChaosLatencyStrategyOptions
{
InjectionRate = 0.05, // 5% of executions
Latency = TimeSpan.FromMilliseconds (200)
2)
-AddChaosFault(new ChaosFaultStrategy0ptions
{
InjectionRate = 0.01, // 1% of executions
FaultGenerator = _ => new ValueTask<Exception>(new HttpRequestException("Injected fault")
2) NV
-Build();
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S057 / S-181 - `efdc6fb257`

- topic: R03 pipeline/rate-limiter source
- nearest labels: for testing | conditional rate limiting | with extension | classic polly transient failures | new polly | vs httprequest exception

Visible text / code excerpt:
```text
does classic polly have chaos strategies?
Oo
Classic Polly (v7 Policy.* / ISyncPolicy / IAsyncPolicy ) does not include chaos strategies.
Chaos/fault-injection in the Polly ecosystem historically came from a separate library called Simmy (from
the same App-vNext team). In Polly v8, chaos strategies are integrated into Polly as first-class “chaos
strategies” (built on the new pipeline model).
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S058 / S-182 - `4f604be090`

- topic: R03 pipeline/rate-limiter source
- nearest labels: for testing | conditional rate limiting | with extension | classic polly transient failures | new polly | vs httprequest exception

Visible text / code excerpt:
```text
can we use simmy with classic polly for chaos strategies?
Yes. Simmy was designed to work with “classic” Polly (v7 policy API) by creating chaos policies that you
wrap around your normal Polly policies.
How it fits together
+ Simmy gives you policies like inject fault, inject latency, inject result.
* You wrap them with your retry/circuit breaker/etc.
* Then execute like any other Polly policy.
You typically put chaos inside your resilience (so retry/timeout/circuit breaker react to the injected faults),
@.g. Policy-WrapAsync(retry, chaos) with chaos as the inner policy.
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S059 / S-183 - `19f68a61d8`

- topic: R03 pipeline/rate-limiter source
- nearest labels: for testing | conditional rate limiting | with extension | classic polly transient failures | new polly | vs httprequest exception

Visible text / code excerpt:
```text
Example 1: Inject 5% latency + 1% faults (classic Polly + Simmy)
” cH (a)
using Polly;
using Polly.Retry;
using Polly.Wrap;
using Polly.Contrib.Simmy; // namespace varies by package
using Polly.Contrib.Simmy.Fault;
using Polly.Contrib.Simmy. Latency;

// Retry (classic Polly)

TAsyncPolicy retry = Policy
-Handle<HttpRequestException>()
-WaitAndRetryAsync(3, attempt => TimeSpan.FromMilliseconds(20@));

// Chaos: inject latency

TAsyncPolicy latencyChaos = MonkeyPolicy.InjectLatencyAsync(
injectionRate: 0.05, // 5% of executions
latency: TimeSpan.FromMilliseconds(25@));

// Chaos: inject faults

IAsyncPolicy faultChaos = MonkeyPolicy.InjectExceptionAsync(
exceptionFactory: () => new HttpRequestException("Injected fault"),
injectionRate: 0.01); I/ 1%
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S060 / S-184 - `ebe43de39b`

- topic: R03 pipeline/rate-limiter source
- nearest labels: for testing | conditional rate limiting | with extension | classic polly transient failures | new polly | vs httprequest exception

Visible text / code excerpt:
```text
// Wrap: retry OUTSIDE, chaos INSIDE
TAsyncPolicy<HttpResponseMessage> pipeline =
Policy.WrapAsync(retry, faultChaos, latencyChaos)
-AsAsyncPolicy<HttpResponseMessage>();
// Execute
var response = await pipeline.ExecuteAsync(async () =>
{
return await httpClient.GetAsync("https://example.com/api");
ys
Notes:
* Package/namespaces depend on which Simmy package you install ( Polly. Contrib.Simmy.* ).
* Order matters: putting retry outside chaos makes your resiliency respond to the injected problems.
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S061 / S-185 - `29c65452de`

- topic: R03 pipeline/rate-limiter source
- nearest labels: for testing | with extension | conditional rate limiting | manually | classic polly transient failures | new polly

Visible text / code excerpt:
```text
Example 2: Inject “bad results” (e.g., force a 503 sometimes)
Useful when you want to test handling of HTTP 5xx without throwing exceptions.
wo CH ia’)
using Polly;
using Polly.Contrib.Simmy.Outcomes;
var chaosResult = MonkeyPolicy.InjectResultAsync<HttpResponseMessage>(
result: new HttpResponseMessage(System.Net -HttpStatusCode.ServiceUnavailable),
injectionRate: 0.02); // 2%
var retryOn5xx = Policy<HttpResponseMessage>
-HandleResult(r => (int)r.StatusCode >= 500)
-WaitAndRetryAsync(2, _ => TimeSpan.FromMilliseconds(100));
var wrapped = Policy-WrapAsync(retryOn5xx, chaosResult);
var resp = await wrapped.ExecuteAsync(() => httpClient.GetAsync("https://example.com"));
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

### R03-S062 / S-186 - `6b18c2f35f`

- topic: R03 pipeline/rate-limiter source
- nearest labels: for testing | with extension | conditional rate limiting | manually | classic polly transient failures | new polly

Visible text / code excerpt:
```text
Practical tips
* Keep chaos off in prod (or extremely low + controlled) — typically enable via config flag.
* Use chaos mainly in:
*  dev/staging
* load tests
* "game days” / resilience drills
* Put chaos inside retry/timeout/circuit breaker so you exercise those policies.
```

Notes:
OCR-assisted visible transcript from extracted SVG screenshot; source image preserved for verification.

---

## 3. Cleaned source notes

- A pipeline is not an HTTP handler; ExecuteAsync runs a delegate through configured resilience strategies.
- For retrying upload/request bodies, a new stream and a new HttpRequestMessage per attempt is the safer pattern.
- Polly v8 ResilienceContext can carry per-execution properties, but context must be returned to the pool.
- Rate limiter strategies need a limiter acquisition model; strategy callbacks return limiter/lease semantics from System.Threading.RateLimiting.
- RateLimitPartition is useful when key-based or request-dependent limiter selection is needed.
- Conditional rate limiting can select limiter/no-limiter behavior based on request metadata or context.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| Pipeline.ExecuteAsync runs a delegate through configured Polly strategies rather than being an HTTP handler. | R03-S001/R03-S004/R03-S008 and nearby labels about pipeline not handler / making request with Execute | high |
| For retrying request bodies/uploads, create a fresh stream and HttpRequestMessage per attempt. | R03-S001/R03-S006 | high |
| ResilienceContext properties carry per-execution metadata and context must be returned to the pool. | R03-S005/R03-S009/R03-S013 | medium-high |
| RateLimiterStrategy wraps System.Threading.RateLimiting acquisition semantics. | R03-S010-R03-S022 | medium-high |
| RateLimitPartition is used for keyed/request-dependent limiter selection. | R03-S016/R03-S019/R03-S023-R03-S033 | high |
| Conditional rate limiting can be implemented and tested by choosing limiter behavior based on context/request conditions. | R03-S034-R03-S062 | medium-high |

---

## 5. Question hooks

- Why is Polly v8 pipeline execution not the same as an HttpMessageHandler?
- Why should upload/content streams be recreated per retry attempt?
- How does ResilienceContext carry per-request metadata?
- What does RateLimiterStrategy acquire from a limiter?
- When do you need RateLimitPartition?
- How can conditional rate limiting be tested?
- Where should R04/R05/R06 pick up after this road?

---

## 6. Open review issues

- Exact code punctuation should be checked in preserved source images if needed.
- R04/R05/R06 boundary should be reviewed next; they may form one larger 60-100 image pass.
- S-001 duplicate of S-033 must be explicitly handled when R04 is processed.
