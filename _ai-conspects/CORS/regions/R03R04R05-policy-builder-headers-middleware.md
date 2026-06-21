# R03+R04+R05 - ASP.NET policy builder / Access-Control headers / middleware behavior

Conspect: `CORS`  
File type: **source-preserving final combined region transcript**  
Stage: **stage-2 / verified final coverage transcript v001**  
Generated: 2026-06-02 12:31:17 UTC

---

## Direction check

Goal:
Convert the CORS Excalidraw/SVG conspect into source-preserving AI-readable text without losing screenshots.

Now:
Stage0 and R01/R02 are done. This pass processes the remaining lower-half R03/R04/R05 road and closes final coverage.

This step:
Process R03/R04/R05 together: ASP.NET CORS policy builder methods, Access-Control header reference, middleware/preflight behavior, credentialed CORS edge cases, Vary: Origin/cache correctness, and multiple allowed origins.

Why:
These regions are connected: policy builder methods produce/validate the headers in R04, and R05 explains middleware/preflight/multiple-origin behavior that makes those headers matter.

Next:
Review cached diff, commit, then this CORS conspect is complete by image-use coverage.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:

```text
- R03: ASP.NET CORS policy builder methods and their browser/header effects.
- R04: Access-Control request/response header reference, preflight cache, credentials, and browser failure behavior.
- R05: middleware/preflight mechanics, multiple-origin response behavior, and Vary: Origin cache correctness.
```

Key ideas:

- `WithOrigins`, `AllowAnyOrigin`, and `SetIsOriginAllowed` define how server-side policy maps incoming `Origin` to `Access-Control-Allow-Origin`.
- `WithHeaders`/`AllowAnyHeader` and `WithMethods`/`AllowAnyMethod` are relevant mostly to preflight: the browser asks whether it may send those request headers/methods.
- `WithExposedHeaders` controls response headers visible to JavaScript; it is not the same thing as allowing request headers.
- Credentialed CORS requires explicit client and server approval, and the server cannot rely on wildcard-style behavior for credentialed browser reads.
- `Access-Control-Max-Age` can reduce repeated preflight requests, but cached decisions are keyed by request shape and are constrained by browser behavior.
- `Vary: Origin` matters when a server dynamically echoes a specific allowed origin; otherwise shared caches can serve one origin's CORS response to another origin.
- CORS failures commonly surface as generic network/CORS errors in JavaScript, not normal HTTP responses.
- For multiple allowed origins, the server should return the matching single origin or no `Access-Control-Allow-Origin`, not a comma-separated list.

Reading quality:

```text
overall: high
image readability: medium-high
exact code punctuation: medium-high; preserved PNGs are source of truth for exact corrections
boundary confidence: high for R03/R04/R05 ownership
coverage confidence: high; remaining unclosed image uses after this pass = 0
```

---

## 1. Boundary review

Included:

```text
R03 sources: 26
S-042, S-035, S-036, S-043, S-037, S-044, S-038, S-045, S-039, S-046, S-040, S-047, S-041, S-048, S-052, S-049, S-050, S-053, S-091, S-051, S-105, S-092, S-106, S-107, S-093, S-094

R04 sources: 25
S-080, S-082, S-081, S-083, S-085, S-084, S-087, S-086, S-088, S-089, S-095, S-090, S-096, S-097, S-098, S-099, S-100, S-116, S-101, S-117, S-118, S-102, S-119, S-103, S-104

R05 sources: 19
S-014, S-015, S-017, S-013, S-010, S-012, S-011, S-016, S-018, S-120, S-121, S-019, S-020, S-122, S-123, S-021, S-124, S-125, S-126
```

Previously processed and not reopened:

```text
R01/R02: origin / preflight basics / ASP.NET upper use-cases, already done in stage1.
```

Decision:

```text
R03+R04+R05 are processed together as the final lower-half road.
The archive keeps region ownership separate in source tables and ledger.
Final coverage audit is included because this pass closes all remaining image uses.
```

---

## 2. Verified transcript / source-preserving notes

### 2.1 R03 - policy builder: origins

R03 starts with ASP.NET policy builder methods for origin selection:

```csharp
WithOrigins(...)
AllowAnyOrigin()
SetIsOriginAllowed(origin => ...)
```

The notes distinguish normal exact origin allow-lists from public APIs and custom/dynamic origin predicates. `WithOrigins` is the default safe shape for specific frontend origins. `AllowAnyOrigin` is appropriate only when the API is truly public/non-credentialed. `SetIsOriginAllowed` is useful for dynamic rules, but the rule must still be careful because it can allow too much.

Representative sources:

```text
S-035, S-036, S-037, S-038, S-039
```

### 2.2 R03 - policy builder: request headers and methods

The next R03 cluster maps policy methods to preflight behavior:

```csharp
WithHeaders(...)
AllowAnyHeader()
WithMethods(...)
AllowAnyMethod()
```

The browser preflight asks for intended request headers and methods. If the policy does not allow them, the browser does not send the actual cross-origin request. The screenshots emphasize that these settings are about request shape, not about response headers JavaScript can read.

Representative sources:

```text
S-042, S-043, S-044, S-045, S-046, S-047
```

### 2.3 R03 - exposed response headers and preflight max age

`WithExposedHeaders(...)` makes non-safelisted response headers visible to JavaScript. This is where practical headers like `Content-Disposition`, `X-Total-Count`, or `X-Request-Id` belong.

`SetPreflightMaxAge(...)` lets the browser cache the successful preflight result for the same cross-origin request shape. This can reduce repeated OPTIONS traffic, but it is still bounded by browser behavior and request shape.

Representative sources:

```text
S-040, S-041, S-052, S-053, S-105, S-106, S-107
```

### 2.4 R03 - credentials in policy builder

The credentials road covers:

```csharp
AllowCredentials()
DisallowCredentials()
```

The key idea is that credentialed browser requests require explicit approval. The client must opt into credentials and the server must answer with the correct credential headers and an allowed origin. Without that, the browser may block access to the response or fail the CORS check.

The notes also record uncertainty around cookie storage in some failure modes: JavaScript cannot reliably infer all cookie/storage behavior from a CORS-visible response, so preserved screenshots remain the source for exact correction.

Representative sources:

```text
S-048, S-049, S-050, S-051, S-091, S-092, S-093, S-094
```

### 2.5 R04 - Access-Control header reference

R04 is a reference road for the headers themselves:

```text
Origin
Access-Control-Request-Method
Access-Control-Request-Headers
Access-Control-Allow-Origin
Access-Control-Allow-Methods
Access-Control-Allow-Headers
Access-Control-Allow-Credentials
Access-Control-Expose-Headers
Access-Control-Max-Age
Vary: Origin
```

The reference separates request headers sent by the browser from response headers sent by the server. It also distinguishes preflight-only headers from headers relevant to actual responses.

Representative sources:

```text
S-080, S-081, S-082, S-083, S-084, S-085, S-086, S-087, S-088, S-089, S-090
```

### 2.6 R04 - preflight cache and Vary: Origin

`Access-Control-Max-Age` means the browser may reuse a preflight result for some time for the same request shape. This does not mean all future cross-origin requests are globally allowed; the cache key depends on origin/request method/request headers and browser rules.

`Vary: Origin` matters when the server dynamically chooses an allowed origin. Without it, shared caches can reuse a response for a different origin and create broken or unsafe behavior.

Representative sources:

```text
S-095, S-096, S-097
```

### 2.7 R04 - credential failure and browser/network errors

The credentialed-failure road explains that app JavaScript often does not receive a clean business-level HTTP response when CORS fails. Depending on whether the failure occurs at preflight or actual response validation, the request may be skipped or the response may be hidden. In JavaScript this often looks like:

```text
fetch rejected
TypeError / Failed to fetch
network/CORS error in browser console
```

The transcript keeps the distinction: CORS failure is usually not something to handle like a normal 4xx/5xx application response. It is usually a configuration/network/browser-policy failure unless server logs show otherwise.

Representative sources:

```text
S-098, S-099, S-100, S-101, S-102, S-103, S-104, S-116, S-117, S-118, S-119
```

### 2.8 R05 - middleware and preflight mechanics

R05 contains UI screenshots and diagrams of the actual browser/middleware mechanics. It shows browser request/response headers, error console examples, and the Access-Control header names emitted by the server.

The core model:

```text
Browser sends Origin.
For preflight, browser sends OPTIONS with Access-Control-Request-Method and Access-Control-Request-Headers.
Server/middleware decides whether that request shape is allowed.
If allowed, server returns the appropriate Access-Control-Allow-* headers.
If not allowed, browser blocks the cross-origin flow.
```

Representative sources:

```text
S-014, S-015, S-017, S-013, S-010, S-012, S-011, S-016, S-018
```

### 2.9 R05 - middleware implementation shape

The middleware examples show a simplified server-side implementation approach:

```text
inspect ext.Request.Method
if OPTIONS/preflight: emit allow-origin/methods/headers and complete
else: await next(); then emit allow-origin/expose/credentials headers as appropriate
```

The exact code punctuation is not treated as authoritative here, but the preserved screenshot captures the control-flow idea: preflight can short-circuit with allowed methods/headers; actual requests pass through and then response headers are attached.

Representative sources:

```text
S-019, S-020, S-021
```

### 2.10 R05 - multiple allowed origins and cache correctness

The final R05 road explains what the server should return when multiple origins are configured:

```text
allowed request origin -> Access-Control-Allow-Origin: <that exact origin>
not allowed request origin -> no Access-Control-Allow-Origin header
never -> Access-Control-Allow-Origin: https://a.com, https://b.com
```

This is also where `Vary: Origin` becomes important: when response content/headers differ by origin, caches need to know that origin is part of the response variant.

Representative sources:

```text
S-120, S-121, S-122, S-123, S-124, S-125, S-126
```

---

## 3. Evidence / source map

Detailed source rows are preserved in:

```text
data/R03R04R05-sources-stage2-v001.csv
data/R03R04R05-sources-stage2-v001.json
```

Audit images are preserved in:

```text
audit-assets/R03R04R05-source-images/*.png
audit-assets/contact-sheet-R03R04R05-final-coverage-v001.png
```

Final coverage audit:

```text
data/final-coverage-audit-stage2-v001.csv
data/final-coverage-audit-stage2-v001.json
```

---

## 4. Final status

```text
total image uses: 126
R01/R02 processed: 56
R03/R04/R05 processed: 70
remaining unclosed image uses: 0
```
