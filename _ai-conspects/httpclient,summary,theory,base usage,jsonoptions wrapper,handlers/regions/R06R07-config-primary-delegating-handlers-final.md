# R06/R07 - Global config, primary handlers, delegating handlers, handler rotation

Conspect: `httpclient,summary,theory,base usage,jsonoptions wrapper,handlers`  
File type: **source-preserving combined final transcript**  
Stage: **stage-4 / R06+R07 + final coverage v001**  
Generated: 2026-06-02 01:52:08 UTC

---

## Direction check

Goal:
Finish the HttpClient conspect by closing the remaining config/handler tail and final coverage gaps.

Now:
R01/R02, R03/R04 and R05AB are done; remaining sources are R06/R07 plus four R05AB leftover images.

This step:
Process R06/R07 together and add R05AB coverage correction.

Why:
These remaining sources are contiguous: global config, timeouts, cancellation, primary handler config, delegating handlers, handler chain, and handler rotation details.

Next:
Review/commit, then no normal transcript regions remain; only final audit/cleanup if diff reveals inconsistencies.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
- global HttpClient configuration and default options
- client-level timeout vs per-request cancellation
- linked cancellation tokens and distinguishing timeout from caller cancellation
- primary transport handler configuration
- DelegatingHandler/message-handler chains
- named/typed client scoped primary-handler configuration
- handler rotation vs connection rotation and DNS refresh
```

Key ideas:

- HttpClient.Timeout is global to the client instance; per-request timeout should use CancellationTokenSource.CancelAfter or a linked token.
- In ASP.NET Core, combine request-aborted cancellation with operation timeout to avoid wasting work after disconnects.
- catch filters with when are useful to distinguish timeout vs caller cancellation without swallowing unrelated OperationCanceledException cases.
- The primary handler is the innermost transport handler; DelegatingHandlers wrap around it as outgoing middleware.
- AddHttpClient can configure default headers/base address/timeouts, add message handlers, and configure the primary transport handler.
- Named and typed client registrations scope handler options to a logical client.
- Handler lifetime and pooled connection lifetime solve different but related DNS/connection-refresh concerns.

Reading quality:
```text
overall_conceptual_understanding: high
source_readability: medium-high; many code screenshots are readable but source images are kept for exact punctuation
limitations:
- Large final pass closes 51 previously unclosed sources, so exact code punctuation should be checked against source images if needed.
- Some R07 sources discuss handler rotation, which overlaps conceptually with R05B; ownership is separated by theme: R05B = factory/DNS lifetime behavior, R07 = message/primary handler configuration details.
confidence_summary: High for boundary/coverage and key ideas; medium-high for exact code transcription.
```

---
## 0.2 Coverage / boundary review

Included R06 sources:
```text
S-027, S-042, S-071, S-083, S-091, S-097, S-104, S-113, S-122, S-130, S-134, S-142, S-145, S-153, S-159, S-163, S-171, S-173
```
Included R07 sources:
```text
S-175, S-176, S-178, S-180, S-181, S-183, S-184, S-191, S-192, S-194, S-195, S-196, S-197, S-199, S-200, S-201, S-202, S-203, S-205, S-206, S-207, S-209, S-210, S-212, S-213, S-214, S-216, S-218, S-220
```
R05AB coverage correction sources closed in this same archive:
```text
S-074, S-099, S-128, S-136
```

Boundary rule:
```text
R05B handler rotation = factory/DNS/lifetime behavior.
R07 handler rotation = primary/delegating handler configuration details and handler-chain mechanics.
```

---
## 1. Source inventory

| Region source | Global source | fileId | Band | Theme |
|---|---|---|---|---|
| R06-S001 | S-027 | `02f4e55788` | R06-global-config-primary-handler-basics | Global AddHttpClient config example |
| R06-S002 | S-042 | `f6b364a8de` | R06-global-config-primary-handler-basics | Configure primary HttpClientHandler |
| R06-S003 | S-071 | `c84e1e316d` | R06-global-config-primary-handler-basics | HttpClient.Timeout is client-level timeout |
| R06-S004 | S-083 | `1cc06f04f6` | R06-global-config-primary-handler-basics | Timeout nuance: global vs per-request |
| R06-S005 | S-091 | `1f1cb142ff` | R06-global-config-primary-handler-basics | Common timeout layers |
| R06-S006 | S-097 | `cbb466d33d` | R06-global-config-primary-handler-basics | CancellationTokenSource.CancelAfter |
| R06-S007 | S-104 | `0b92f44dd0` | R06-global-config-primary-handler-basics | Basic per-request CancelAfter example |
| R06-S008 | S-113 | `4bcc039635` | R06-global-config-primary-handler-basics | One client with different request timeouts |
| R06-S009 | S-122 | `d08f769e53` | R06-global-config-primary-handler-basics | CancelAfter with ASP.NET request cancellation |
| R06-S010 | S-130 | `47e05703d8` | R06-global-config-primary-handler-basics | Linked token cancels on disconnect or timeout |
| R06-S011 | S-134 | `cb3725a5be` | R06-global-config-primary-handler-basics | Detect timeout vs caller cancellation |
| R06-S012 | S-142 | `a4af987398` | R06-global-config-primary-handler-basics | when as a guard/filter concept |
| R06-S013 | S-145 | `c7b72d71cd` | R06-global-config-primary-handler-basics | when in catch filters |
| R06-S014 | S-153 | `71ab827415` | R06-global-config-primary-handler-basics | Why catch filters are useful |
| R06-S015 | S-159 | `4bfacc9f3e` | R06-global-config-primary-handler-basics | when in switch cases |
| R06-S016 | S-163 | `91714272a3` | R06-global-config-primary-handler-basics | switch case when example |
| R06-S017 | S-171 | `1902720bb9` | R06-global-config-primary-handler-basics | when in switch expressions |
| R06-S018 | S-173 | `d008a904bf` | R06-global-config-primary-handler-basics | when vs if inside catch |
| R07-S001 | S-175 | `7d1a2bdf34` | R07-message-handlers-primary-handler-rotation | Access token handler / logging handler chain code |
| R07-S002 | S-176 | `82d381018e` | R07-message-handlers-primary-handler-rotation | Demo title: configuring HttpClients |
| R07-S003 | S-178 | `7442b68c36` | R07-message-handlers-primary-handler-rotation | Access token and logging handlers implementation |
| R07-S004 | S-180 | `e021376e40` | R07-message-handlers-primary-handler-rotation | Register handler chain in AddHttpClient |
| R07-S005 | S-181 | `330cecd6e7` | R07-message-handlers-primary-handler-rotation | Correlation / logger handler examples |
| R07-S006 | S-183 | `a4da972f46` | R07-message-handlers-primary-handler-rotation | Configure primary handler in client registration |
| R07-S007 | S-184 | `2d196f25d1` | R07-message-handlers-primary-handler-rotation | Redirect behavior note |
| R07-S008 | S-191 | `7461868102` | R07-message-handlers-primary-handler-rotation | Do we need a primary message handler? |
| R07-S009 | S-192 | `02f4e55788` | R07-message-handlers-primary-handler-rotation | Duplicate placement of global AddHttpClient config |
| R07-S010 | S-194 | `ca637dc68c` | R07-message-handlers-primary-handler-rotation | Handler rotation vs connection rotation |
| R07-S011 | S-195 | `7b1486ab31` | R07-message-handlers-primary-handler-rotation | Can configure primary handler for a specific client |
| R07-S012 | S-196 | `d1633ed3cc` | R07-message-handlers-primary-handler-rotation | Primary handler for one specific HttpClient |
| R07-S013 | S-197 | `f6b364a8de` | R07-message-handlers-primary-handler-rotation | Duplicate placement of primary handler config |
| R07-S014 | S-199 | `9514b257e0` | R07-message-handlers-primary-handler-rotation | Why rotate handlers |
| R07-S015 | S-200 | `3ddf4b65e6` | R07-message-handlers-primary-handler-rotation | Handler lifetime and connection lifetime are different knobs |
| R07-S016 | S-201 | `e3d628c777` | R07-message-handlers-primary-handler-rotation | ConfigurePrimaryHttpMessageHandler for named/typed client |
| R07-S017 | S-202 | `48c4e1a193` | R07-message-handlers-primary-handler-rotation | Specific client primary handler options |
| R07-S018 | S-203 | `c69c11db88` | R07-message-handlers-primary-handler-rotation | Why not only PooledConnectionLifetime |
| R07-S019 | S-205 | `ed89c93ba8` | R07-message-handlers-primary-handler-rotation | Handler rotation summary |
| R07-S020 | S-206 | `fa97ca0b8a` | R07-message-handlers-primary-handler-rotation | Typed/named client primary handler configuration |
| R07-S021 | S-207 | `1a793f8bd3` | R07-message-handlers-primary-handler-rotation | Question: one specific named client handler |
| R07-S022 | S-209 | `b700305d88` | R07-message-handlers-primary-handler-rotation | Handler lifetime with named/typed clients |
| R07-S023 | S-210 | `63d85f0428` | R07-message-handlers-primary-handler-rotation | Handler rotation deeper explanation |
| R07-S024 | S-212 | `ae3a5fed3d` | R07-message-handlers-primary-handler-rotation | Specific client configuration short note |
| R07-S025 | S-213 | `599f7325eb` | R07-message-handlers-primary-handler-rotation | Why need rotate handlers |
| R07-S026 | S-214 | `fdc1aaf4c0` | R07-message-handlers-primary-handler-rotation | Configure primary handler caveat |
| R07-S027 | S-216 | `c87665d512` | R07-message-handlers-primary-handler-rotation | Primary handler options for particular client |
| R07-S028 | S-218 | `16f21e5488` | R07-message-handlers-primary-handler-rotation | Final handler rotation note |
| R07-S029 | S-220 | `79b8794c54` | R07-message-handlers-primary-handler-rotation | Wrap-up: named vs typed/global configuration |

---
## 2. Source transcript

### R06-S001 / S-027 - `02f4e55788`

Metadata:

- band: `R06-global-config-primary-handler-basics`
- status: `included-in-r06-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Global AddHttpClient config example

#### Verified visible text / source-backed summary
```text
Program/service registration configures a named client with BaseAddress, Timeout, DefaultRequestHeaders.Accept and request headers. This is global/default client configuration for a registered HttpClient.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R06-S002 / S-042 - `f6b364a8de`

Metadata:

- band: `R06-global-config-primary-handler-basics`
- status: `included-in-r06-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Configure primary HttpClientHandler

#### Verified visible text / source-backed summary
```text
ConfigurePrimaryHttpMessageHandler returns a new SocketsHttpHandler/HttpClientHandler with low-level options such as automatic decompression/proxy/credentials and pooled connection lifetime. This affects the primary transport handler.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R06-S003 / S-071 - `c84e1e316d`

Metadata:

- band: `R06-global-config-primary-handler-basics`
- status: `included-in-r06-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: HttpClient.Timeout is client-level timeout

#### Verified visible text / source-backed summary
```text
HttpClient.Timeout is the overall time limit for a request made by that HttpClient instance. If the request takes longer, HttpClient cancels and throws, usually TaskCanceledException/OperationCanceledException.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R06-S004 / S-083 - `1cc06f04f6`

Metadata:

- band: `R06-global-config-primary-handler-basics`
- status: `included-in-r06-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Timeout nuance: global vs per-request

#### Verified visible text / source-backed summary
```text
HttpClient.Timeout is a global timeout for that client instance. For different per-request timeouts, use a CancellationTokenSource.CancelAfter(...) or linked cancellation token.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R06-S005 / S-091 - `1f1cb142ff`

Metadata:

- band: `R06-global-config-primary-handler-basics`
- status: `included-in-r06-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Common timeout layers

#### Verified visible text / source-backed summary
```text
Real apps can have multiple timeout/cancel sources: HttpClient.Timeout, per-request CancellationTokenSource, caller token such as ASP.NET request-aborted token, and server/proxy timeout. Usually whichever triggers first cancels the request.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R06-S006 / S-097 - `cbb466d33d`

Metadata:

- band: `R06-global-config-primary-handler-basics`
- status: `included-in-r06-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: CancellationTokenSource.CancelAfter

#### Verified visible text / source-backed summary
```text
CancelAfter cancels a token after a specified time and is useful for different timeouts per call, combining caller cancellation with timeout, or not relying only on HttpClient.Timeout.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R06-S007 / S-104 - `0b92f44dd0`

Metadata:

- band: `R06-global-config-primary-handler-basics`
- status: `included-in-r06-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Basic per-request CancelAfter example

#### Verified visible text / source-backed summary
```text
Creates CancellationTokenSource, calls CancelAfter(TimeSpan.FromSeconds(...)), passes cts.Token to GetAsync; when timeout expires, request stops.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R06-S008 / S-113 - `4bcc039635`

Metadata:

- band: `R06-global-config-primary-handler-basics`
- status: `included-in-r06-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: One client with different request timeouts

#### Verified visible text / source-backed summary
```text
One shared HttpClient can issue requests with different request-level timeouts by passing different CancellationTokenSource tokens; do not mutate HttpClient.Timeout per call.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R06-S009 / S-122 - `d08f769e53`

Metadata:

- band: `R06-global-config-primary-handler-basics`
- status: `included-in-r06-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: CancelAfter with ASP.NET request cancellation

#### Verified visible text / source-backed summary
```text
In ASP.NET Core, combine RequestAborted with timeout using CancellationTokenSource.CreateLinkedTokenSource so either client disconnect or timeout cancels downstream work.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R06-S010 / S-130 - `47e05703d8`

Metadata:

- band: `R06-global-config-primary-handler-basics`
- status: `included-in-r06-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Linked token cancels on disconnect or timeout

#### Verified visible text / source-backed summary
```text
The linked token cancels if client disconnects/request is aborted, or if the explicit timeout elapses.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R06-S011 / S-134 - `cb3725a5be`

Metadata:

- band: `R06-global-config-primary-handler-basics`
- status: `included-in-r06-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Detect timeout vs caller cancellation

#### Verified visible text / source-backed summary
```text
OperationCanceledException can happen because timeout token canceled, caller token canceled, or HttpClient.Timeout canceled. Check which token is cancellation-requested to distinguish cases.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R06-S012 / S-142 - `a4af987398`

Metadata:

- band: `R06-global-config-primary-handler-basics`
- status: `included-in-r06-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: when as a guard/filter concept

#### Verified visible text / source-backed summary
```text
when in C# is a guard/condition that adds an extra filter to another construct; used in catch filters, switch pattern matching, and some pattern forms.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R06-S013 / S-145 - `c7b72d71cd`

Metadata:

- band: `R06-global-config-primary-handler-basics`
- status: `included-in-r06-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: when in catch filters

#### Verified visible text / source-backed summary
```text
catch (ExceptionType ex) when (condition) catches only when the condition is true; this supports separate timeout vs caller-cancellation handling.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R06-S014 / S-153 - `71ab827415`

Metadata:

- band: `R06-global-config-primary-handler-basics`
- status: `included-in-r06-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Why catch filters are useful

#### Verified visible text / source-backed summary
```text
Catch filters let multiple cases share the same exception type but route by condition. If condition is false, exception matching continues to the next catch.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R06-S015 / S-159 - `4bfacc9f3e`

Metadata:

- band: `R06-global-config-primary-handler-basics`
- status: `included-in-r06-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: when in switch cases

#### Verified visible text / source-backed summary
```text
switch case patterns can use when to add extra matching conditions after a type/value match.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R06-S016 / S-163 - `91714272a3`

Metadata:

- band: `R06-global-config-primary-handler-basics`
- status: `included-in-r06-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: switch case when example

#### Verified visible text / source-backed summary
```text
Example switch over object values: int with condition, string with condition, and default. Demonstrates guarded cases.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R06-S017 / S-171 - `1902720bb9`

Metadata:

- band: `R06-global-config-primary-handler-basics`
- status: `included-in-r06-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: when in switch expressions

#### Verified visible text / source-backed summary
```text
Switch expressions can use when guards on arms, for example scoring/description logic based on value ranges.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R06-S018 / S-173 - `d008a904bf`

Metadata:

- band: `R06-global-config-primary-handler-basics`
- status: `included-in-r06-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: when vs if inside catch

#### Verified visible text / source-backed summary
```text
A catch filter with when decides whether the catch applies before entering the catch block. An if inside catch catches first and decides what to do inside; important difference for exception flow.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S001 / S-175 - `7d1a2bdf34`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Access token handler / logging handler chain code

#### Verified visible text / source-backed summary
```text
Code shows custom DelegatingHandler examples such as access-token and logging handlers. Each handler surrounds SendAsync and calls base.SendAsync to continue the chain.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S002 / S-176 - `82d381018e`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Demo title: configuring HttpClients

#### Verified visible text / source-backed summary
```text
Demo slide for configuring HttpClients and their handlers.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S003 / S-178 - `7442b68c36`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Access token and logging handlers implementation

#### Verified visible text / source-backed summary
```text
Custom handlers add request metadata/logging around outgoing requests. Demonstrates overriding SendAsync in DelegatingHandler.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S004 / S-180 - `e021376e40`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Register handler chain in AddHttpClient

#### Verified visible text / source-backed summary
```text
Program/service registration configures an HttpClient and adds message handlers in order, creating a chain before the primary handler.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S005 / S-181 - `330cecd6e7`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Correlation / logger handler examples

#### Verified visible text / source-backed summary
```text
More DelegatingHandler examples: add correlation id, log request/response, or modify outgoing request before sending.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S006 / S-183 - `a4da972f46`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Configure primary handler in client registration

#### Verified visible text / source-backed summary
```text
ConfigurePrimaryHttpMessageHandler configures the transport handler for a named/typed client; example sets AllowAutoRedirect to false.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S007 / S-184 - `2d196f25d1`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Redirect behavior note

#### Verified visible text / source-backed summary
```text
HttpClientHandler usually follows redirects by default; setting AllowAutoRedirect=false changes redirect behavior so redirect responses are visible to the caller.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S008 / S-191 - `7461868102`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Do we need a primary message handler?

#### Verified visible text / source-backed summary
```text
Explains that you do not always create a primary handler yourself. HttpClientFactory supplies a default primary handler unless you need low-level transport options.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S009 / S-192 - `02f4e55788`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Duplicate placement of global AddHttpClient config

#### Verified visible text / source-backed summary
```text
Duplicate canvas placement of the global AddHttpClient configuration example also seen in R06. Recorded here as an R07-neighbor duplicate; content ownership remains R06.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S010 / S-194 - `ca637dc68c`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Handler rotation vs connection rotation

#### Verified visible text / source-backed summary
```text
Clarifies handler rotation versus individual connection rotation. Handler lifetime rotates handler/pool instances; pooled connection lifetime rotates physical connections within a handler.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S011 / S-195 - `7b1486ab31`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Can configure primary handler for a specific client

#### Verified visible text / source-backed summary
```text
You can configure primary handler options for a specific named or typed client registration rather than globally for all clients.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S012 / S-196 - `d1633ed3cc`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Primary handler for one specific HttpClient

#### Verified visible text / source-backed summary
```text
Question/answer about configuring the primary handler for one specific HttpClient, usually through named/typed client registration in IHttpClientFactory.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S013 / S-197 - `f6b364a8de`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Duplicate placement of primary handler config

#### Verified visible text / source-backed summary
```text
Duplicate canvas placement of primary-handler configuration also seen in R06. Recorded as R07-neighbor duplicate; content ownership remains with config/primary-handler section.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S014 / S-199 - `9514b257e0`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Why rotate handlers

#### Verified visible text / source-backed summary
```text
Handler rotation exists so clients do not keep the same handler/connection pool forever; it helps refresh DNS and low-level connection state.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S015 / S-200 - `3ddf4b65e6`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Handler lifetime and connection lifetime are different knobs

#### Verified visible text / source-backed summary
```text
Handler lifetime controls when factory creates a new handler/pool. PooledConnectionLifetime controls maximum age of individual connections inside a pool.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S016 / S-201 - `e3d628c777`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: ConfigurePrimaryHttpMessageHandler for named/typed client

#### Verified visible text / source-backed summary
```text
Example shows ConfigurePrimaryHttpMessageHandler in client registration to set transport behavior for that specific configured client.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S017 / S-202 - `48c4e1a193`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Specific client primary handler options

#### Verified visible text / source-backed summary
```text
Continues specific-client primary handler configuration; primary handler is the innermost transport handler after all DelegatingHandlers.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S018 / S-203 - `c69c11db88`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Why not only PooledConnectionLifetime

#### Verified visible text / source-backed summary
```text
Explains why handler lifetime and pooled connection lifetime solve different parts of DNS/connection refresh; one does not fully replace the other.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S019 / S-205 - `ed89c93ba8`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Handler rotation summary

#### Verified visible text / source-backed summary
```text
Summary source about handler rotation versus connection rotation and why handler rotation exists in HttpClientFactory.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S020 / S-206 - `fa97ca0b8a`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Typed/named client primary handler configuration

#### Verified visible text / source-backed summary
```text
Shows or explains configuring primary handler for a named/typed client without manually newing a raw HttpClient everywhere.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S021 / S-207 - `1a793f8bd3`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Question: one specific named client handler

#### Verified visible text / source-backed summary
```text
Short source asking/answering how to configure handler options for one specific client registration.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S022 / S-209 - `b700305d88`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Handler lifetime with named/typed clients

#### Verified visible text / source-backed summary
```text
Explains using named/typed client registration to scope handler settings to one logical client.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S023 / S-210 - `63d85f0428`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Handler rotation deeper explanation

#### Verified visible text / source-backed summary
```text
Deeper explanation of rotating handlers, DNS updates, and why old connections may continue until they naturally close or expire.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S024 / S-212 - `ae3a5fed3d`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Specific client configuration short note

#### Verified visible text / source-backed summary
```text
Short source about configuring primary handler / handler lifetime for a specific client.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S025 / S-213 - `599f7325eb`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Why need rotate handlers

#### Verified visible text / source-backed summary
```text
Handler rotation is about avoiding permanently stale handler pools, enabling DNS refresh, and keeping factory-managed clients healthy over time.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S026 / S-214 - `fdc1aaf4c0`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Configure primary handler caveat

#### Verified visible text / source-backed summary
```text
Caveat/example around ConfigurePrimaryHttpMessageHandler and client registration; use factory configuration rather than overriding handler in typed client constructor.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S027 / S-216 - `c87665d512`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Primary handler options for particular client

#### Verified visible text / source-backed summary
```text
Another source clarifying primary handler options can be attached to a particular named/typed client registration.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S028 / S-218 - `16f21e5488`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Final handler rotation note

#### Verified visible text / source-backed summary
```text
Final note on why handler rotation exists and how it differs from manually rotating clients/connections.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

### R07-S029 / S-220 - `79b8794c54`

Metadata:

- band: `R07-message-handlers-primary-handler-rotation`
- status: `included-in-r07-v001`
- confidence: `high-for-theme-boundary-medium-high-for-exact-code`
- theme: Wrap-up: named vs typed/global configuration

#### Verified visible text / source-backed summary
```text
Closing/wrap-up source: use named/typed clients and factory configuration to scope handler settings; do not mix global/manual configuration accidentally.
```

#### Notes

Verified during large combined final pass; source image included for exact visual review.

---

## 3. Cleaned source notes

- HttpClient.Timeout is global to the client instance; per-request timeout should use CancellationTokenSource.CancelAfter or a linked token.
- In ASP.NET Core, combine request-aborted cancellation with operation timeout to avoid wasting work after disconnects.
- catch filters with when are useful to distinguish timeout vs caller cancellation without swallowing unrelated OperationCanceledException cases.
- The primary handler is the innermost transport handler; DelegatingHandlers wrap around it as outgoing middleware.
- AddHttpClient can configure default headers/base address/timeouts, add message handlers, and configure the primary transport handler.
- Named and typed client registrations scope handler options to a logical client.
- Handler lifetime and pooled connection lifetime solve different but related DNS/connection-refresh concerns.

---
## 4. Evidence table

| Claim | Evidence | Source type | Confidence |
|---|---|---|---|
| Global AddHttpClient configuration sets defaults such as base address, timeout, and headers | R06-S001/R06-S002 | extracted screenshot / source-image-backed gist | high |
| HttpClient.Timeout is global; per-request timeouts should use cancellation tokens | R06-S003 through R06-S008 | extracted screenshot / source-image-backed gist | high |
| Linked tokens combine ASP.NET request cancellation with operation timeout | R06-S009/R06-S010 | extracted screenshot / source-image-backed gist | high |
| catch filters with when help distinguish timeout vs cancellation cases | R06-S011 through R06-S018 | extracted screenshot / source-image-backed gist | high |
| DelegatingHandlers are chainable outgoing middleware around the primary transport handler | R07-S001/R07-S003/R07-S004/R07-S005 | extracted screenshot / source-image-backed gist | high |
| ConfigurePrimaryHttpMessageHandler configures low-level transport behavior | R07-S006/R07-S007/R07-S013/R07-S016/R07-S018 | extracted screenshot / source-image-backed gist | high |
| Handler rotation and connection rotation are related but distinct | R07-S010/R07-S014/R07-S015/R07-S019/R07-S027 | extracted screenshot / source-image-backed gist | high |
| All previously unclosed source images are now assigned | final coverage audit | extracted screenshot / source-image-backed gist | high |

---
## 5. Question hooks

- What is the difference between HttpClient.Timeout and a per-request CancelAfter token?
- Why should ASP.NET request cancellation be linked with downstream HTTP cancellation?
- How do catch filters with when differ from if inside catch?
- What is the primary handler in HttpClientFactory?
- What does a DelegatingHandler do in the outgoing pipeline?
- How do you configure a primary handler for one named/typed client?
- What is the difference between handler lifetime and pooled connection lifetime?
- Why did final coverage pull four sources back into R05AB?

---
## 6. Open review issues

- Normal transcript regions are now closed in the ledger.
- If diff review finds noisy JSON formatting or a missed duplicate, make a small correction archive rather than reopening all regions.
