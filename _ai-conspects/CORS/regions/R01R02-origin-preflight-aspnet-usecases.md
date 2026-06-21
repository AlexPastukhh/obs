# R01+R02 - Origin / preflight basics / ASP.NET CORS use-cases

Conspect: `CORS`  
File type: **source-preserving combined region transcript**  
Stage: **stage-1 / verified combined transcript v001**  
Generated: 2026-06-02 12:18:34 UTC

---

## Direction check

Goal:
Convert the CORS Excalidraw/SVG conspect into source-preserving AI-readable text without losing screenshots.

Now:
Stage0 is the source/boundary checkpoint. This pass processes the upper-half R01/R02 road.

This step:
Process R01/R02 together: origin basics, URL components, preflight mechanics, safelisted headers, browser CORS flow, ASP.NET proxy/manual config/credentials, response header exposure, and auth redirect gotchas.

Why:
R01 supplies the browser mental model; R02 applies it to ASP.NET and SPA development. They are adjacent and coherent as one 56-image pass without mixing lower-half policy-builder/header-reference/middleware material.

Next:
R03+R04+R05 combined boundary review: ASP.NET policy builder methods + Access-Control headers reference + middleware/preflight behavior.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:

```text
- R01: origin = scheme + host + port; URL components; host vs hostname; preflight and browser CORS flow.
- R01: safelisted request headers vs readable response headers; failed origin/header/method checks; credentialed CORS behavior.
- R02: why CORS exists; SPA proxy/same-origin development; ASP.NET manual AddCors policies; Content-Disposition exposure; auth redirects causing CORS symptoms.
```

Key ideas:

- CORS is a browser enforcement mechanism for protecting user data, not a server-side security boundary against arbitrary clients.
- Origin comparison uses scheme + host + port. Path, query, and fragment are not part of origin.
- Preflight is an OPTIONS permission check for non-simple methods/headers/content types. It asks whether the browser may send the real request.
- A successful preflight permits the next request under the approved origin/method/header rules; a rejected preflight blocks the actual request in the browser.
- Safelisted request headers and exposed/readable response headers are different concepts.
- Credentialed CORS needs both client opt-in and explicit server approval.
- In ASP.NET SPA setups, one visible browser origin via proxying avoids many CORS problems; API redirects to login pages often create confusing CORS-like failures and should usually be 401/403 for API routes.

Reading quality:

```text
overall: high
image readability: medium-high
exact code punctuation: medium-high; preserved PNGs are source of truth for exact corrections
boundary confidence: high for R01/R02 ownership
```

---

## 1. Boundary review

Included:

```text
R01 sources: 42
S-033, S-034, S-032, S-029, S-115, S-027, S-028, S-030, S-031, S-076, S-077, S-071, S-072, S-078, S-079, S-073, S-074, S-075, S-054, S-059, S-063, S-067, S-055, S-108, S-112, S-060, S-068, S-064, S-113, S-056, S-109, S-065, S-069, S-061, S-114, S-110, S-070, S-057, S-062, S-066, S-058, S-111

R02 sources: 14
S-026, S-022, S-005, S-023, S-024, S-006, S-025, S-009, S-007, S-008, S-004, S-002, S-003, S-001
```

Checked but not included:

```text
R03: policy builder method catalogue / WithOrigins / AllowAny / methods / exposed headers.
R04: Access-Control headers reference / origin / methods / credentials / expose / max-age.
R05: middleware behavior / preflight semantics / multiple origins / credentials edge cases.
```

Decision:

```text
R01+R02 are processed together because they form the upper-half mental-model + ASP.NET-use-case road.
R03/R04/R05 remain lower-half config/reference/middleware road for the next pass.
```

---

## 2. Verified transcript / source-preserving notes

### 2.1 R01 - origin and URL components

The first R01 cluster defines the comparison unit used by CORS: an **origin** is the tuple of scheme, host, and port. The examples distinguish the full URL from its pieces:

```text
scheme/protocol: https
host: example.com or host:port
hostname: domain name without port
path/query/fragment: not part of the origin
```

Important implications:

- `https://example.com` and `https://example.com:443` represent the same default HTTPS port in practical origin examples.
- Changing scheme, host, or port changes origin.
- Changing path/query/fragment does not by itself change origin.

Representative sources:

```text
S-033, S-034, S-032, S-029, S-027, S-028, S-030, S-031, S-115
```

### 2.2 R01 - why preflight exists

The conspect then builds the browser flow for non-simple requests. For requests like `PATCH`, `PUT`, `DELETE`, custom request headers, or non-safelisted content types, the browser sends a preflight OPTIONS request first.

The preflight carries intent, not application data:

```text
Origin: <request origin>
Access-Control-Request-Method: <actual method>
Access-Control-Request-Headers: <non-safelisted headers the real request wants to send>
```

The server response must explicitly approve the origin/method/headers. If it does not, the browser blocks the real request.

Representative sources:

```text
S-076, S-077, S-071, S-072, S-078, S-079
```

### 2.3 R01 - success/failure cases

The screenshots walk through several browser outcomes:

```text
success: preflight succeeds -> browser sends actual request -> JavaScript may read the response if response CORS rules allow it
rejected origin: server does not allow Origin -> browser blocks
rejected header: requested header is not listed in Access-Control-Allow-Headers -> browser blocks
credential failure: credentialed mode needs explicit credential approval; otherwise browser blocks reading/using the response
```

A key nuance in the notes: not every request is preflighted. Some simple requests can still be sent to the server, but the browser may prevent JavaScript from reading the response. This is why CORS protects user data in browsers rather than making the server unreachable.

Representative sources:

```text
S-073, S-074, S-075, S-054, S-059, S-063, S-067, S-055, S-060, S-068, S-064, S-056, S-065, S-069, S-061, S-070, S-057, S-062, S-066, S-058
```

### 2.4 R01 - credentials and readable response data

The credentials section highlights that cookies/auth are a separate axis:

```text
client: fetch(..., { credentials: "include" })
server: Access-Control-Allow-Credentials: true
server: Access-Control-Allow-Origin must match the allowed origin; wildcard-style behavior is not enough for credentialed CORS.
```

The conspect also separates **sending/storing cookies** from **JavaScript being allowed to read the response**. Browser cookie policy, SameSite/Secure, third-party-cookie restrictions, and CORS response headers can all affect what happens.

Representative sources:

```text
S-108, S-112, S-113, S-109, S-114, S-110, S-111
```

### 2.5 R02 - what CORS is for

R02 starts with the high-level purpose: CORS protects users, not servers. It stops a malicious website from making the user browser read another origin's authenticated response and hand that data to attacker JavaScript.

It does not solve:

```text
phishing / fake login pages
malware
DNS hijack
mixed content / TLS problems
server-side access from non-browser clients
```

Representative sources:

```text
S-023, S-024, S-025
```

### 2.6 R02 - exposing response headers

The Content-Disposition note is preserved as a practical gotcha. Even if the response contains `Content-Disposition`, browser JavaScript cannot read it unless the server exposes it through CORS:

```csharp
.WithExposedHeaders("Content-Disposition")
```

Representative sources:

```text
S-026, S-022
```

### 2.7 R02 - SPA proxy and one visible origin

The SPA/proxy screenshots recommend avoiding browser-visible cross-origin calls in local development:

```text
Browser -> ASP.NET origin, e.g. https://localhost:7250
ASP.NET -> proxies UI traffic to Vite origin, e.g. http://localhost:5173
React API calls use relative URLs like /api/...
```

The idea is that the browser sees one origin and the server performs the forwarding. If the browser directly opens the Vite origin and calls ASP.NET APIs cross-origin, CORS becomes involved again.

Representative sources:

```text
S-005, S-006, S-009
```

### 2.8 R02 - manual ASP.NET CORS policy and credentials

The manual config examples show a named policy:

```csharp
builder.Services.AddCors(op =>
    op.AddPolicy("p", pb =>
        pb.WithOrigins("specificOrigin")
          .AllowAnyHeader()
          .AllowAnyMethod()
          .AllowCredentials()
    ));

app.UseCors("p");
```

Important notes:

- For credentialed browser fetches, the client must use credentials mode and the server must allow credentials.
- For non-GET/POST methods such as PUT/PATCH/DELETE, the method must be allowed because preflight checks it.
- The conspect suggests being explicit and careful rather than assuming broad settings automatically cover every credentialed case.

Representative sources:

```text
S-007, S-008
```

### 2.9 R02 - auth redirects that look like CORS failures

A final R02 road explains a common ASP.NET/API pitfall: a request to an API endpoint is unauthenticated, the backend redirects to a login page, and the browser follows that redirect. From the SPA perspective this can surface as a CORS problem because the eventual page response is not the intended API response and may lack appropriate CORS headers.

The remedy shown is to customize cookie authentication redirects for API paths:

```text
/api request unauthenticated -> return 401, not login-page redirect
/api request authenticated but forbidden -> return 403, not access-denied-page redirect
browser-page request -> normal redirect can remain
```

Representative sources:

```text
S-004, S-002, S-003, S-001
```

---

## 3. Evidence / source map

Detailed source rows are preserved in:

```text
data/R01R02-sources-stage1-v001.csv
data/R01R02-sources-stage1-v001.json
```

Audit images are preserved in:

```text
audit-assets/R01R02-source-images/*.png
audit-assets/contact-sheet-R01R02-origin-preflight-aspnet-v001.png
```

---

## 4. Remaining work

```text
R03+R04+R05: pending
remaining planned image uses after this pass: 70
```
