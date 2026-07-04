# Full source-preserving transcript v002 — Filter, Middleware cancellation, RequestAborted

Generated: 2026-07-04 UTC

```text
authoritative SVG: source/FILTER,MIDDLEWARE CANCELLATION,REQUEST ABORTED.svg
SHA-256: a394ec2cbdbbc8c5bc77db3e828fa5c52bf83d4413bd17c60e70d90cbbc9edb0
Git blob SHA: 57aa65e0b618f209c6481f5ae786e9776bd553a6
viewBox: 0 0 1123.3740989608007 4032.8244050261287
unique embedded screenshots: 10 / 10
image uses: 10 / 10
duplicate extra placements: 0
native SVG text lines: 6 / 6
source blocks: 10 / 10
```

## Topic boundary

ASP.NET Core request cancellation, middleware/filter short-circuiting and RequestAborted.

## Transcript policy

Visible wording and code are preserved source-by-source with conservative OCR normalization.
Obvious glyph substitutions, broken member-access spacing and editor artifacts are corrected.
Exact screenshot typography remains authoritative.

---

## S-001 — 1) Middleware example: cancel async work when client

```text
source_id: S-001
image_hash: 842b390a3e92
placements: 1
image_file: source/images-near-literal-v001/S-001__842b390a3e92.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
1) Middleware example: cancel async work when client
disconnects
Key points

- Token is context.RequestAborted

- Pass it into your async calls: SendAsync(..., ct), ReadAsStringAsync(ct),

ToListAsync(ct), etc.
- If ct.IsCancellationRequested, stop doing work and don't write a response.
- Catch OperationCanceledException when it's caused by that token.
~~~

### Recall

1. Как «1) Middleware example: cancel async work when client» использует RequestAborted или short-circuiting?
2. Где cancellation token должен быть передан дальше?
3. Что нельзя делать после отмены или disconnect?

---

## S-002 — CancellationToken ct = context.RequestAborted;

```text
source_id: S-002
image_hash: e1cf54b8e2ed
placements: 1
image_file: source/images-near-literal-v001/S-002__e1cf54b8e2ed.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
iz St

13

public async Task InvokeAsync(HttpContext context)

{

CancellationToken ct = context.RequestAborted;

17

// If the client already disconnected, stop immediately.

if (ct.IsCancellationRequested)

return;

21

try

{

// Example "async work" that supports cancellation: outgoing HTTP call

var client = _httpClientFactory.CreateClient("MoviesAPIClient");

26

using var request = new HttpRequestMessage(HttpMethod.Get, "api/health");

request.Headers.Accept.Add(new
MediaTypeWithQualityHeaderValue("application/json"));

29

using var response = await client.SendAsync(request, ct);

response.EnsureSuccessStatusCode();

32

// More cancellable async work

var body = await response.Content.ReadAsStringAsync(ct);

35
~~~

### Recall

1. Как «CancellationToken ct = context.RequestAborted;» использует RequestAborted или short-circuiting?
2. Где cancellation token должен быть передан дальше?
3. Что нельзя делать после отмены или disconnect?

---

## S-003 — // If client disconnected during the work, stop; don't try to write.

```text
source_id: S-003
image_hash: e5784f04dcbe
placements: 1
image_file: source/images-near-literal-v001/S-003__e5784f04dcbe.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
35

// If client disconnected during the work, stop; don't try to write.
if (ct.IsCancellationRequested)

return;

39

// Put something into HttpContext for downstream components

context.Items["UpstreamHealth"] = body;

42

// Continue pipeline

await _next(context);

}

catch (OperationCanceledException) when (ct.IsCancellationRequested)

{

// Normal: client disconnected. Don't log as error and don't write response.
return;

}

}
~~~

### Recall

1. Как «// If client disconnected during the work, stop; don't try to write.» использует RequestAborted или short-circuiting?
2. Где cancellation token должен быть передан дальше?
3. Что нельзя делать после отмены или disconnect?

---

## S-004 — Registration:

```text
source_id: S-004
image_hash: cf7b4916a780
placements: 1
image_file: source/images-near-literal-v001/S-004__cf7b4916a780.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Registration:
<> Program.cs v16 "
app.UseMiddleware<OutgoingCallMiddleware>();

Can middleware short-circuit the whole request?

Yes. If you return without calling await _next(context), the rest of the pipeline won't run.
~~~

### Recall

1. Как «Registration:» использует RequestAborted или short-circuiting?
2. Где cancellation token должен быть передан дальше?
3. Что нельзя делать после отмены или disconnect?

---

## S-005 — 2) Middleware example: cancel a long loop cooperatively

```text
source_id: S-005
image_hash: ce74d0a79694
placements: 1
image_file: source/images-near-literal-v001/S-005__ce74d0a79694.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
2) Middleware example: cancel a long loop cooperatively
If you have CPU-ish work in a loop, cancellation only works if you check the token:
~~~

### Recall

1. Как «2) Middleware example: cancel a long loop cooperatively» использует RequestAborted или short-circuiting?
2. Где cancellation token должен быть передан дальше?
3. Что нельзя делать после отмены или disconnect?

---

## S-006 — for (var i = 0; i < 10 000; i++)

```text
source_id: S-006
image_hash: 8ce397d9ac69
placements: 1
image_file: source/images-near-literal-v001/S-006__8ce397d9ac69.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
public async Task InvokeAsync(HttpContext context)
{
var ct = context.RequestAborted;
for (var i = 0; i < 10 000; i++)
{
ct.ThrowIfCancellationRequested(); // stops promptly on disconnect
// simulate async work
await Task.Delay(10, ct);
}
await _next(context);
}
r
~~~

### Recall

1. Как «for (var i = 0; i < 10 000; i++)» использует RequestAborted или short-circuiting?
2. Где cancellation token должен быть передан дальше?
3. Что нельзя делать после отмены или disconnect?

---

## S-007 — 3) Action filter example: cancel async work + short-circuit

```text
source_id: S-007
image_hash: 31f1f8e8d3aa
placements: 1
image_file: source/images-near-literal-v001/S-007__31f1f8e8d3aa.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
3) Action filter example: cancel async work + short-circuit
MVC
Key points
- Token is context.HttpContext .RequestAborted
- You can short-circuit by:
- setting context.Result = ...
- returning without calling await next()
~~~

### Recall

1. Как «3) Action filter example: cancel async work + short-circuit» использует RequestAborted или short-circuiting?
2. Где cancellation token должен быть передан дальше?
3. Что нельзя делать после отмены или disconnect?

---

## S-008 — ActionExecutionDelegate next)

```text
source_id: S-008
image_hash: 243d6d811d55
placements: 1
image_file: source/images-near-literal-v001/S-008__243d6d811d55.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
18

public async Task OnActionExecutionAsync(ActionExecutingContext context,
ActionExecutionDelegate next)

{

var ct = context.HttpContext.RequestAborted;

14

// If client disconnected, do nothing (don't execute action).

if (ct.IsCancellationRequested)

return;

18

// Example: short-circuit on missing header (this cancels the action execution)

2e if (!context.HttpContext.Request.Headers.TryGetValue("X-Api-Key", out var apikey)
II

21 string.IsNullOrWhiteSpace(apikey))

{

context.Result = new UnauthorizedObjectResult (new

{

25 error = "Missing X-Api-Key header."

})3

return; // no next() => action will not run

}

29
~~~

### Recall

1. Как «ActionExecutionDelegate next)» использует RequestAborted или short-circuiting?
2. Где cancellation token должен быть передан дальше?
3. Что нельзя делать после отмены или disconnect?

---

## S-009 — // Example cancellable async work inside a filter (outgoing call)

```text
source_id: S-009
image_hash: e11bdb9dcdf3
placements: 1
image_file: source/images-near-literal-v001/S-009__e11bdb9dcdf3.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
29

// Example cancellable async work inside a filter (outgoing call)
try

{

var client = _httpClientFactory.CreateClient(""AuthClient");
using var resp = await client.GetAsync("api/validate-key?key=" + apikey, ct);
35

if (!resp.IsSuccessStatusCode)

{

context.Result = new ForbidResult();

return;

}

}

catch (OperationCanceledException) when (ct.IsCancellationRequested)
{

// client disconnected mid-filter; stop

4s return;

}

47

// Continue MVC pipeline (action executes)

await next();

}

}
~~~

### Recall

1. Как «// Example cancellable async work inside a filter (outgoing call)» использует RequestAborted или short-circuiting?
2. Где cancellation token должен быть передан дальше?
3. Что нельзя делать после отмены или disconnect?

---

## S-010 — Registration:

```text
source_id: S-010
image_hash: bab0cdd9faee
placements: 1
image_file: source/images-near-literal-v001/S-010__bab0cdd9faee.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Registration:
<> Program.cs vi7 a
builder .Services.AddControllers(options =>
{
options.Filters .Add<DisconnectAwareHeaderValidationFilter>();
})3
Can a filter short-circuit the whole request by not calling next() ?
- It can short-circuit the rest of the MVC action pipeline (the action + later filters + result).
- The hosting pipeline earlier/later middleware is still in control, but for practical purposes:
yes, you prevent the action from running.
Best practice: set context.Result when you short-circuit, unless the client has disconnected
(then just return).
~~~

### Recall

1. Как «Registration:» использует RequestAborted или short-circuiting?
2. Где cancellation token должен быть передан дальше?
3. Что нельзя делать после отмены или disconnect?
