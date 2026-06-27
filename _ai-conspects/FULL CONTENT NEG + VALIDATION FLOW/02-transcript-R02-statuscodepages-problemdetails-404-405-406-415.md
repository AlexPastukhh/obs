# Regional transcript — R02: StatusCodePages and ProblemDetails for 404, 405, 406 and 415

Conspect: `FULL CONTENT NEG + VALIDATION FLOW`  
Generated: 2026-06-27 10:00:00 UTC

## Coverage

```text
text elements represented: 78 / 78
image uses processed: 9 / 9
unique screenshots represented: 9
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`UseStatusCodePages` can add a response body when routing, action selection or
formatters produce an error status without a body. For APIs, the body should be
a consistent `ProblemDetails` object.

### Services and writers

- `AddProblemDetails()` registers problem-details infrastructure.
- `ProblemDetailsFactory` creates a consistent object with `status`, `title`,
  `type`, `detail`, `instance` and extensions.
- `IProblemDetailsService.TryWriteAsync` lets registered writers choose the
  representation.
- A JSON fallback can write `application/problem+json` when no writer accepts.

### Safe middleware behavior

- Scope API pages with `UseWhen` when browser routes should keep HTML errors.
- Check `Response.HasStarted` before clearing or writing.
- Do not overwrite an error body already produced by MVC, authentication or
  application code.
- Generic status pages can add safe guidance but often cannot know the exact
  internal reason for the status.

### Status guidance

- **404**: endpoint/resource not found; include the request path as `instance`.
- **405**: route exists but the HTTP method is not allowed; preserve the `Allow`
  header when present.
- **406**: no response representation satisfies `Accept`.
- **415**: request body media type is unsupported; tell the client to inspect
  `Content-Type`.

Endpoint-specific code should create a more precise problem response when it
has more context than the generic status-code page.

## Representative source labels

- configure supported media types(will return 406)
- for
- ADD STATUSCODEPAGES FOR 406/415 ETC
- OR
- CREATE SOME ENDPOINTS FOR STATUS CODES
- can add check for status code and add more info about
- the initial path and what client does need to do
- (406 check accept 415 check content tyep)
- cant add the exact
- reason to problem
- but can add useful details
- using Microsoft.AspNetCore.Mvc;
- using Microsoft.AspNetCore.WebUtilities;
- var builder = WebApplication.CreateBuilder(args);
- // MVC (or minimal APIs + services)
- builder.Services.AddControllers();
- // ProblemDetails infrastructure
- builder.Services.AddProblemDetails();
- var app = builder.Build();
- app.UseRouting();
- app.UseWhen(
- ctx => ctx.Request.Path.StartsWithSegments("/api"),
- apiApp =>
- {
- apiApp.UseStatusCodePages(async statusCodeContext =>
- var http = statusCodeContext.HttpContext;
- // If headers/body already started, can't write a body safely
- if (http.Response.HasStarted)
- return;
- var code = http.Response.StatusCode;

## Covered text elements

```text
T-002, T-003, T-472, T-473, T-474, T-475, T-476, T-477, T-478, T-479, T-480, T-481, T-482, T-483, T-484
T-485, T-486, T-487, T-488, T-489, T-490, T-491, T-492, T-493, T-494, T-495, T-496, T-497, T-498, T-499
T-500, T-501, T-502, T-503, T-504, T-505, T-506, T-507, T-508, T-509, T-510, T-511, T-512, T-513, T-514
T-515, T-516, T-517, T-518, T-519, T-520, T-521, T-522, T-523, T-524, T-525, T-526, T-527, T-528, T-529
T-530, T-531, T-532, T-533, T-534, T-535, T-536, T-537, T-538, T-539, T-540, T-541, T-542, T-543, T-544
T-545, T-546, T-547
```

## Covered screenshot uses

```text
IU-003, IU-004, IU-128, IU-129, IU-130, IU-131, IU-132, IU-133, IU-134
```

## Audit note

Every listed text element and screenshot placement is closed in the final ledgers.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
