# R01/R02/R03 - ASP.NET Core middleware / WriteAsJson final transcript v001

Conspect: `middleware-writeasjson`
File type: **source-preserving final combined region transcript**  
Stage: **stage-1 / verified final coverage transcript v001**  
Generated: 2026-06-13 08:55:00 UTC

---

## Direction check

Goal: convert the middleware + `WriteAsJson` SVG conspect into AI-readable text while preserving source-image coverage and canvas labels.

This pass closes the full sheet because all regions belong to one road: middleware shape and ordering -> writing JSON from non-MVC middleware/endpoints -> short-circuiting, exception flow, branching, async/debugging and final patterns.

Coverage:

```text
R01: 11 image uses / 10 text labels
R02: 12 image uses / 24 text labels
R03: 11 image uses / 0 text labels
Total: 34 image uses / 34 text labels
Remaining unclosed: 0
```

---

## 0.1 Area overview / key ideas / reading quality

This sheet is about ASP.NET Core middleware as a request-pipeline component and about returning JSON from middleware/minimal non-MVC code via `HttpResponse.WriteAsJsonAsync`.

Key ideas:

- Middleware is ordered. Each component receives an `HttpContext`, may do work before and after the next middleware, and may call or skip `_next`.
- `RequestDelegate` is the next pipeline component. Calling `await _next(context)` continues the pipeline; not calling it short-circuits.
- Middleware can be implemented inline, by conventional class with `Invoke`/`InvokeAsync`, or through extension methods that hide registration details.
- DI is available, but scoped dependencies in middleware constructors are a common gotcha because middleware instances are normally created once; scoped services should be requested in `InvokeAsync` or with `IMiddleware`/factory patterns when appropriate.
- `WriteAsJsonAsync` is useful in “non-MVC land”: custom middleware, minimal handlers, error handlers, health-like endpoints, fallback handlers, auth/validation short-circuits and other pipeline-level responses.
- After a response has started, changing status code/headers or trying to write a different JSON error becomes dangerous; exception middleware/order matters.
- Async code should avoid blocking work and should preserve cancellation/flow when writing the response.

Reading quality:

```text
overall: high for concepts and flow
exact code punctuation: medium-high; preserved screenshots remain source of truth for exact correction
coverage: full combined pass; duplicate image uses tracked and closed
```

---

## 1. R01 - middleware basics, order, RequestDelegate, DI gotchas

Sources: `S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008, S-009, S-010, S-011`

R01 establishes the mental model. Middleware sits in a chain. Each middleware can inspect/modify the request before the next component and inspect/modify the response after the next component returns. The important boundary is `await _next(context)`: code before it is request-side/pre-next, code after it is response-side/post-next.

The canvas labels emphasize `ORDER`, `theory`, `all SERVICED`, `EXAMPLE`, `FEATURES-->`, and `METHODS`. They mark that this is not only a syntax topic; middleware behavior depends strongly on registration order.

Canvas labels closed in R01:

```text
T-019: ORDER
T-020: ______
T-021: theory
T-028: all SERVICED
T-029: EXAMPLE
T-030: FEATURES-->
T-031: CAN GET EXCEPTION
T-032: what is brunch here
T-033: to write json in non mvc land :
T-034: METHODS
```

Important R01 decisions:

```text
- Place exception handling early enough to catch later pipeline errors.
- Place routing/auth/endpoint-related middleware in the documented order.
- Do not assume middleware is like a controller/action filter; it is lower-level and sees the raw HttpContext.
- Use conventional class middleware when behavior is reusable and needs dependencies.
- Hide registration behind extension methods when the app should read cleanly.
```

DI gotcha: conventional middleware constructor dependencies are resolved when the middleware instance is created, not per request. Scoped services in constructor are therefore a trap. Per-request scoped dependencies should be parameters to `InvokeAsync`, retrieved from `HttpContext.RequestServices`, or handled with `IMiddleware` depending on lifetime needs.

---

## 2. R02 - WriteAsJson / response flow / short-circuiting / exceptions

Sources: `S-012, S-013, S-014, S-015, S-016, S-017, S-018, S-019, S-020, S-021, S-022, S-023`

R02 focuses on writing JSON responses from middleware. The sheet labels this as “to write json in non mvc land”. The core API is `context.Response.WriteAsJsonAsync(...)`, usually after setting `StatusCode`, headers/content type when needed, and deciding whether the pipeline should stop.

The preserved handwritten/code label block contains a `RequestTimingMiddleware` example:

```text
T-001: public class RequestTimingMiddleware
T-002: {
T-003: private readonly RequestDelegate _next;
T-004: private readonly ILogger<RequestTimingMiddleware> _log;
T-005: public RequestTimingMiddleware(RequestDelegate next, ILogger<RequestTimingMiddleware> log)
T-006: {
T-007: _next = next;
T-008: _log = log;
T-009: }
T-010: public async Task InvokeAsync(HttpContext context)
T-011: {
T-012: var sw = Stopwatch.StartNew();
T-013: await _next(context);
T-014: sw.Stop();
T-015: context.Response.Headers["X-Elapsed-ms"] = sw.ElapsedMilliseconds.ToString();
T-016: _log.LogInformation("Elapsed: {ms}ms", sw.ElapsedMilliseconds);
T-017: }
T-018: }
T-022: 1 INHERITANCE
T-023: 2 DI GOTCHA MIDDLEWARE + SCOPED MIDDLEWARE
T-024: 1 SHORT CIRCUIT
T-025: 2 ASYNC TIPS
T-026: 3 DEBUGGING TIPS
T-027: 4 COMMON PATTERNS
```

The example measures elapsed time around `await _next(context)`, then writes/logs `X-Elapsed-ms`. The transcript interpretation is:

```text
- If you call _next, this middleware wraps downstream work.
- If you do not call _next, the middleware short-circuits and becomes the endpoint/terminal response.
- Header mutation after _next only works if the response has not already started or if the specific header timing is still valid.
```

Short-circuiting is a main R02 branch. Middleware can decide to return immediately for auth failures, validation failures, custom 404/403/429 responses, maintenance mode, feature flags, rate limiting, health checks, or error transformations. In that case it should write the status/body and `return` without `_next`.

`WriteAsJsonAsync` notes:

```text
- It serializes an object as JSON to the HTTP response.
- It is useful outside MVC/controllers.
- The object should be a response DTO/problem/error shape, not a random domain object if that leaks details.
- Set the status code before writing the body.
- Avoid writing twice; once the body starts, later middleware may not be able to replace it.
```

Exception flow: if middleware writes JSON for errors, it must be placed correctly relative to exception handling. Exceptions thrown before/after `_next` behave differently; exceptions after response has started are especially hard to turn into clean JSON.

---

## 3. R03 - branching, async/debugging and common patterns

Sources: `S-024, S-025, S-026, S-027, S-028, S-029, S-030, S-031, S-032, S-033, S-034`

R03 closes the remaining examples and pattern road. It covers branching, async tips, debugging tips, and common middleware patterns.

No separate canvas text labels were assigned to R03, but screenshots S-024..S-034 are closed by this pass.

Common middleware patterns preserved by the sheet:

```text
- logging/timing wrapper
- custom headers
- correlation/request-id propagation
- exception-to-json/problem response conversion
- feature-flag or maintenance short-circuit
- auth/validation guard
- branch mapping / conditional middleware
- endpoint-specific JSON responses outside MVC
```

Branching means middleware can choose different paths based on path, headers, endpoint metadata, environment, feature flags, user/claims or other request state. The transcript keeps the distinction between branch middleware and final/terminal response: a branch may still call its own nested `_next`, while a short-circuit writes the response and stops.

Async/debugging tips:

```text
- Always await downstream work unless intentionally fire-and-forget is safe, which is rare.
- Do not block on async calls with .Result/Wait.
- Watch response-started state when debugging why status/headers do not change.
- Use logging around _next to see which middleware executed and whether the pipeline continued.
- Keep middleware small; extract services for complicated logic.
```

Final mental model:

```text
Middleware = ordered low-level pipeline component.
_next(context) = continue.
return without _next = short-circuit.
WriteAsJsonAsync = JSON body writer for non-MVC response paths.
Response-started state and ordering decide whether your JSON/status/header changes actually work.
```

---

## 4. Evidence / source map

Detailed source rows are preserved in:

```text
data/R01R02R03-sources-stage1-v001.csv
data/R01R02R03-sources-stage1-v001.json
```

Canvas text labels are preserved in:

```text
data/R01R02R03-text-labels-stage1-v001.csv
data/R01R02R03-text-labels-stage1-v001.json
```

Audit images are preserved in:

```text
audit-assets/R01R02R03-source-images/*.png
audit-assets/contact-sheet-R01R02R03-final-coverage-v001.png
```

Final status:

```text
image uses processed: 34
text labels processed: 34
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
