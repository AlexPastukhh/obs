# FULL CONTENT NEG + VALIDATION FLOW — exact canvas-text transcript v002

Generated: 2026-07-03

## Scope

```text
non-empty native SVG text elements: 554
regions: 8
normalized or omitted text elements: 0
```

This file preserves native SVG text exactly as text evidence.  
It does not claim that pixels inside embedded screenshots were OCR-transcribed.

# R01 — MVC content negotiation, formatters, media types, and 406

Exact non-empty SVG text elements in this region: 7

The following is a literal canvas-text evidence layer. Original spelling is retained; no semantic correction is silently applied here.

## T-552

Canvas position: `x=2704.056`, `y=106.714`

~~~text
input/output formatters
~~~

## T-553

Canvas position: `x=2704.056`, `y=243.936`

~~~text
supported media types
~~~

## T-554

Canvas position: `x=2704.056`, `y=381.159`

~~~text
configure 406
~~~

## T-548

Canvas position: `x=3665.526`, `y=623.064`

~~~text
configure system.text.json options
~~~

## T-004

Canvas position: `x=2862.379`, `y=633.786`

~~~text
full content negotiation basics flow
~~~

## T-005

Canvas position: `x=2862.379`, `y=658.786`

~~~text
+ validation problem details (can name sheet like this)
~~~

## T-001

Canvas position: `x=2735.439`, `y=951.407`

~~~text
configure formatters
~~~


---

# R02 — Status-code pages and ProblemDetails for 404/405/406/415

Exact non-empty SVG text elements in this region: 78

The following is a literal canvas-text evidence layer. Original spelling is retained; no semantic correction is silently applied here.

## T-002

Canvas position: `x=2865.526`, `y=2364.474`

~~~text
configure supported media types(will return 406)
~~~

## T-003

Canvas position: `x=2896.305`, `y=2411.355`

~~~text
for
~~~

## T-481

Canvas position: `x=1398.144`, `y=2991.971`

~~~text
using Microsoft.AspNetCore.Mvc;
~~~

## T-482

Canvas position: `x=1398.144`, `y=3011.107`

~~~text
using Microsoft.AspNetCore.WebUtilities;
~~~

## T-472

Canvas position: `x=2057.093`, `y=3028.016`

~~~text
ADD STATUSCODEPAGES FOR 406/415 ETC
~~~

## T-483

Canvas position: `x=1398.144`, `y=3049.380`

~~~text
var builder = WebApplication.CreateBuilder(args);
~~~

## T-474

Canvas position: `x=4040.328`, `y=3057.125`

~~~text
CREATE SOME ENDPOINTS FOR STATUS CODES
~~~

## T-473

Canvas position: `x=3682.958`, `y=3057.920`

~~~text
OR
~~~

## T-484

Canvas position: `x=1398.144`, `y=3087.654`

~~~text
// MVC (or minimal APIs + services)
~~~

## T-485

Canvas position: `x=1398.144`, `y=3106.790`

~~~text
builder.Services.AddControllers();
~~~

## T-486

Canvas position: `x=1398.144`, `y=3145.063`

~~~text
// ProblemDetails infrastructure
~~~

## T-487

Canvas position: `x=1398.144`, `y=3164.200`

~~~text
builder.Services.AddProblemDetails();
~~~

## T-488

Canvas position: `x=1398.144`, `y=3202.473`

~~~text
var app = builder.Build();
~~~

## T-489

Canvas position: `x=1398.144`, `y=3240.746`

~~~text
app.UseRouting();
~~~

## T-490

Canvas position: `x=1398.144`, `y=3279.019`

~~~text
app.UseWhen(
~~~

## T-491

Canvas position: `x=1398.144`, `y=3298.156`

~~~text
ctx => ctx.Request.Path.StartsWithSegments("/api"),
~~~

## T-492

Canvas position: `x=1398.144`, `y=3317.292`

~~~text
apiApp =>
~~~

## T-493

Canvas position: `x=1398.144`, `y=3336.429`

~~~text
{
~~~

## T-494

Canvas position: `x=1398.144`, `y=3355.565`

~~~text
apiApp.UseStatusCodePages(async statusCodeContext =>
~~~

## T-495

Canvas position: `x=1398.144`, `y=3374.702`

~~~text
{
~~~

## T-496

Canvas position: `x=1398.144`, `y=3393.838`

~~~text
var http = statusCodeContext.HttpContext;
~~~

## T-497

Canvas position: `x=1398.144`, `y=3432.111`

~~~text
// If headers/body already started, can't write a body safely
~~~

## T-498

Canvas position: `x=1398.144`, `y=3451.248`

~~~text
if (http.Response.HasStarted)
~~~

## T-499

Canvas position: `x=1398.144`, `y=3470.384`

~~~text
return;
~~~

## T-500

Canvas position: `x=1398.144`, `y=3508.658`

~~~text
var code = http.Response.StatusCode;
~~~

## T-501

Canvas position: `x=1398.144`, `y=3546.931`

~~~text
// Only handle selected status codes
~~~

## T-502

Canvas position: `x=1398.144`, `y=3566.067`

~~~text
if (code is not (
~~~

## T-503

Canvas position: `x=1398.144`, `y=3585.204`

~~~text
StatusCodes.Status404NotFound or
~~~

## T-504

Canvas position: `x=1398.144`, `y=3604.340`

~~~text
StatusCodes.Status405MethodNotAllowed or
~~~

## T-505

Canvas position: `x=1398.144`, `y=3623.477`

~~~text
StatusCodes.Status406NotAcceptable or
~~~

## T-506

Canvas position: `x=1398.144`, `y=3642.613`

~~~text
StatusCodes.Status415UnsupportedMediaType))
~~~

## T-507

Canvas position: `x=1398.144`, `y=3661.750`

~~~text
{
~~~

## T-508

Canvas position: `x=1398.144`, `y=3680.886`

~~~text
return;
~~~

## T-509

Canvas position: `x=1398.144`, `y=3700.023`

~~~text
}
~~~

## T-510

Canvas position: `x=1398.144`, `y=3738.296`

~~~text
var factory = http.RequestServices.GetRequiredService<ProblemDetailsFactory>();
~~~

## T-511

Canvas position: `x=1398.144`, `y=3757.433`

~~~text
var pdService = http.RequestServices.GetRequiredService<IProblemDetailsService>();
~~~

## T-512

Canvas position: `x=1398.144`, `y=3795.706`

~~~text
var detail = code switch
~~~

## T-513

Canvas position: `x=1398.144`, `y=3814.842`

~~~text
{
~~~

## T-514

Canvas position: `x=1398.144`, `y=3833.979`

~~~text
StatusCodes.Status404NotFound =>
~~~

## T-515

Canvas position: `x=1398.144`, `y=3853.115`

~~~text
"Endpoint not found.",
~~~

## T-516

Canvas position: `x=1398.144`, `y=3872.252`

~~~text
StatusCodes.Status405MethodNotAllowed =>
~~~

## T-517

Canvas position: `x=1398.144`, `y=3891.388`

~~~text
"HTTP method not allowed for this endpoint.",
~~~

## T-518

Canvas position: `x=1398.144`, `y=3910.525`

~~~text
StatusCodes.Status406NotAcceptable =>
~~~

## T-519

Canvas position: `x=1398.144`, `y=3929.662`

~~~text
"The requested response media type is not acceptable. Check the Accept header.",
~~~

## T-520

Canvas position: `x=1398.144`, `y=3948.798`

~~~text
StatusCodes.Status415UnsupportedMediaType =>
~~~

## T-521

Canvas position: `x=1398.144`, `y=3967.935`

~~~text
"The request media type is unsupported. Check the Content-Type header.",
~~~

## T-522

Canvas position: `x=1398.144`, `y=3987.071`

~~~text
_ => null
~~~

## T-523

Canvas position: `x=1398.144`, `y=4006.208`

~~~text
};
~~~

## T-475

Canvas position: `x=4033.237`, `y=4012.251`

~~~text
can add check for status code and add more info about
~~~

## T-476

Canvas position: `x=4033.237`, `y=4037.251`

~~~text
the initial path and what client does need to do
~~~

## T-524

Canvas position: `x=1398.144`, `y=4044.481`

~~~text
var pd = factory.CreateProblemDetails(
~~~

## T-477

Canvas position: `x=4033.237`, `y=4062.251`

~~~text
(406 check accept 415 check content tyep)
~~~

## T-525

Canvas position: `x=1398.144`, `y=4063.617`

~~~text
httpContext: http,
~~~

## T-526

Canvas position: `x=1398.144`, `y=4082.754`

~~~text
statusCode: code,
~~~

## T-478

Canvas position: `x=3421.520`, `y=4090.263`

~~~text
cant add the exact
~~~

## T-527

Canvas position: `x=1398.144`, `y=4101.890`

~~~text
title: ReasonPhrases.GetReasonPhrase(code),
~~~

## T-479

Canvas position: `x=3421.520`, `y=4115.263`

~~~text
reason to problem
~~~

## T-528

Canvas position: `x=1398.144`, `y=4121.027`

~~~text
type: $"https://httpstatuses.com/{code}",
~~~

## T-529

Canvas position: `x=1398.144`, `y=4140.164`

~~~text
detail: detail,
~~~

## T-480

Canvas position: `x=3421.520`, `y=4140.263`

~~~text
but can add useful details
~~~

## T-530

Canvas position: `x=1398.144`, `y=4159.300`

~~~text
instance: http.Request.Path
~~~

## T-531

Canvas position: `x=1398.144`, `y=4178.437`

~~~text
);
~~~

## T-532

Canvas position: `x=1398.144`, `y=4216.710`

~~~text
// Safe writer (content-negotiates across registered ProblemDetails writers)
~~~

## T-533

Canvas position: `x=1398.144`, `y=4235.846`

~~~text
var written = await pdService.TryWriteAsync(new ProblemDetailsContext
~~~

## T-534

Canvas position: `x=1398.144`, `y=4254.983`

~~~text
{
~~~

## T-535

Canvas position: `x=1398.144`, `y=4274.119`

~~~text
HttpContext = http,
~~~

## T-536

Canvas position: `x=1398.144`, `y=4293.256`

~~~text
ProblemDetails = pd
~~~

## T-537

Canvas position: `x=1398.144`, `y=4312.392`

~~~text
});
~~~

## T-538

Canvas position: `x=1398.144`, `y=4350.666`

~~~text
if (!written)
~~~

## T-539

Canvas position: `x=1398.144`, `y=4369.802`

~~~text
{
~~~

## T-540

Canvas position: `x=1398.144`, `y=4388.939`

~~~text
// Fallback if no ProblemDetails writer is registered for the request
~~~

## T-541

Canvas position: `x=1398.144`, `y=4408.075`

~~~text
http.Response.ContentType = "application/problem+json; charset=utf-8";
~~~

## T-542

Canvas position: `x=1398.144`, `y=4427.212`

~~~text
await http.Response.WriteAsJsonAsync(pd);
~~~

## T-543

Canvas position: `x=1398.144`, `y=4446.348`

~~~text
}
~~~

## T-544

Canvas position: `x=1398.144`, `y=4465.485`

~~~text
});
~~~

## T-545

Canvas position: `x=1398.144`, `y=4484.621`

~~~text
});
~~~

## T-546

Canvas position: `x=1398.144`, `y=4522.894`

~~~text
app.MapControllers();
~~~

## T-547

Canvas position: `x=1398.144`, `y=4561.168`

~~~text
app.Run();
~~~


---

# R03 — Exception handling and ProblemDetails for 500

Exact non-empty SVG text elements in this region: 45

The following is a literal canvas-text evidence layer. Original spelling is retained; no semantic correction is silently applied here.

## T-277

Canvas position: `x=1963.888`, `y=4826.715`

~~~text
EXCEPTIONHANDLER MIVVLEWARE
~~~

## T-006

Canvas position: `x=2782.703`, `y=4906.955`

~~~text
add exception handler middleware so youll return problemdetails with 500 status code on exception
~~~

## T-007

Canvas position: `x=2782.703`, `y=4933.066`

~~~text
from anywhere(where they werent handled)
~~~

## T-015

Canvas position: `x=1398.425`, `y=5026.294`

~~~text
ausing Microsoft.AspNetCore.Diagnostics;
~~~

## T-016

Canvas position: `x=1398.425`, `y=5051.294`

~~~text
using Microsoft.AspNetCore.Mvc;
~~~

## T-017

Canvas position: `x=1398.425`, `y=5076.294`

~~~text
using Microsoft.AspNetCore.WebUtilities;
~~~

## T-018

Canvas position: `x=1398.425`, `y=5126.294`

~~~text
if (app.Environment.IsDevelopment())
~~~

## T-019

Canvas position: `x=1398.425`, `y=5151.294`

~~~text
{
~~~

## T-020

Canvas position: `x=1398.425`, `y=5176.294`

~~~text
app.UseDeveloperExceptionPage();
~~~

## T-021

Canvas position: `x=1398.425`, `y=5201.294`

~~~text
}
~~~

## T-022

Canvas position: `x=1398.425`, `y=5226.294`

~~~text
else
~~~

## T-023

Canvas position: `x=1398.425`, `y=5251.294`

~~~text
{
~~~

## T-024

Canvas position: `x=1398.425`, `y=5276.294`

~~~text
app.UseExceptionHandler(errorApp =>
~~~

## T-025

Canvas position: `x=1398.425`, `y=5301.294`

~~~text
{
~~~

## T-026

Canvas position: `x=1398.425`, `y=5326.294`

~~~text
errorApp.Run(async context =>
~~~

## T-027

Canvas position: `x=1398.425`, `y=5351.294`

~~~text
{
~~~

## T-028

Canvas position: `x=1398.425`, `y=5376.294`

~~~text
// If the response already started, we can't write our problem details
~~~

## T-029

Canvas position: `x=1398.425`, `y=5401.294`

~~~text
if (context.Response.HasStarted)
~~~

## T-030

Canvas position: `x=1398.425`, `y=5426.294`

~~~text
{
~~~

## T-031

Canvas position: `x=1398.425`, `y=5451.294`

~~~text
return;
~~~

## T-032

Canvas position: `x=1398.425`, `y=5476.294`

~~~text
}
~~~

## T-033

Canvas position: `x=1398.425`, `y=5526.294`

~~~text
var exceptionHandlerFeature = context.Features.Get<IExceptionHandlerFeature>();
~~~

## T-034

Canvas position: `x=1398.425`, `y=5551.294`

~~~text
var ex = exceptionHandlerFeature?.Error;
~~~

## T-035

Canvas position: `x=1398.425`, `y=5601.294`

~~~text
// Resolve ProblemDetailsFactory from DI
~~~

## T-036

Canvas position: `x=1398.425`, `y=5626.294`

~~~text
var problemDetailsFactory = context.RequestServices.GetRequiredService<ProblemDetailsFactory>();
~~~

## T-037

Canvas position: `x=1398.425`, `y=5676.294`

~~~text
// You can map exception types to status codes if you want
~~~

## T-038

Canvas position: `x=1398.425`, `y=5701.294`

~~~text
var statusCode = StatusCodes.Status500InternalServerError;
~~~

## T-039

Canvas position: `x=1398.425`, `y=5751.294`

~~~text
// Create ProblemDetails using the factory (consistent defaults)
~~~

## T-040

Canvas position: `x=1398.425`, `y=5776.294`

~~~text
var problem = problemDetailsFactory.CreateProblemDetails(
~~~

## T-041

Canvas position: `x=1398.425`, `y=5801.294`

~~~text
context,
~~~

## T-042

Canvas position: `x=1398.425`, `y=5826.294`

~~~text
statusCode: statusCode,
~~~

## T-043

Canvas position: `x=1398.425`, `y=5851.294`

~~~text
title: "An unexpected error occurred.",
~~~

## T-044

Canvas position: `x=1398.425`, `y=5876.294`

~~~text
type: "https://httpstatuses.com/500",
~~~

## T-045

Canvas position: `x=1398.425`, `y=5901.294`

~~~text
detail: app.Environment.IsDevelopment() ? ex?.ToString() : null,
~~~

## T-046

Canvas position: `x=1398.425`, `y=5926.294`

~~~text
instance: context.Request.Path
~~~

## T-047

Canvas position: `x=1398.425`, `y=5951.294`

~~~text
);
~~~

## T-048

Canvas position: `x=1398.425`, `y=6001.294`

~~~text
// Optionally attach extra info (extensions)
~~~

## T-049

Canvas position: `x=1398.425`, `y=6026.294`

~~~text
problem.Extensions["traceId"] = context.TraceIdentifier;
~~~

## T-050

Canvas position: `x=1398.425`, `y=6076.294`

~~~text
context.Response.Clear();
~~~

## T-051

Canvas position: `x=1398.425`, `y=6101.294`

~~~text
context.Response.StatusCode = statusCode;
~~~

## T-052

Canvas position: `x=1398.425`, `y=6126.294`

~~~text
context.Response.ContentType = "application/problem+json";
~~~

## T-053

Canvas position: `x=1398.425`, `y=6176.294`

~~~text
await context.Response.WriteAsJsonAsync(problem);
~~~

## T-054

Canvas position: `x=1398.425`, `y=6201.294`

~~~text
});
~~~

## T-055

Canvas position: `x=1398.425`, `y=6226.294`

~~~text
});
~~~

## T-056

Canvas position: `x=1398.425`, `y=6251.294`

~~~text
}
~~~


---

# R04 — Accept-header syntax validation and explicit 400 responses

Exact non-empty SVG text elements in this region: 99

The following is a literal canvas-text evidence layer. Original spelling is retained; no semantic correction is silently applied here.

## T-276

Canvas position: `x=2248.434`, `y=7087.467`

~~~text
ACCEPT HEADER CHECK
~~~

## T-010

Canvas position: `x=2912.945`, `y=7201.665`

~~~text
you can check if accept headers value is valid
~~~

## T-011

Canvas position: `x=2912.945`, `y=7226.665`

~~~text
and return proper problemdetails
~~~

## T-012

Canvas position: `x=2912.945`, `y=7251.665`

~~~text
if you wont - framework will return just status code
~~~

## T-550

Canvas position: `x=8281.871`, `y=7699.095`

~~~text
helper to check accept
~~~

## T-551

Canvas position: `x=8281.871`, `y=7883.792`

~~~text
values with q
~~~

## T-272

Canvas position: `x=3836.944`, `y=8116.413`

~~~text
BETTER:MULTIPLE ACCEPT HEADER VALUES WITH
~~~

## T-273

Canvas position: `x=3836.944`, `y=8190.302`

~~~text
QS PREFERENCE
~~~

## T-008

Canvas position: `x=2941.112`, `y=8385.239`

~~~text
create action filter for trying to parse value from accept header
~~~

## T-009

Canvas position: `x=2941.112`, `y=8410.239`

~~~text
and return 400 with proper problem details                                  or                 do this in every controller action
~~~

## T-280

Canvas position: `x=6469.199`, `y=8659.676`

~~~text
using Microsoft.Net.Http.Headers;
~~~

## T-281

Canvas position: `x=6469.199`, `y=8684.676`

~~~text
using Microsoft.Extensions.Primitives;
~~~

## T-282

Canvas position: `x=6469.199`, `y=8734.676`

~~~text
public static class AcceptHeaderSelectionHelper
~~~

## T-283

Canvas position: `x=6469.199`, `y=8759.676`

~~~text
{
~~~

## T-284

Canvas position: `x=6469.199`, `y=8784.676`

~~~text
// Define server preference order (first = most preferred when q ties)
~~~

## T-057

Canvas position: `x=1246.147`, `y=8805.755`

~~~text
using Microsoft.AspNetCore.Mvc;
~~~

## T-285

Canvas position: `x=6469.199`, `y=8809.676`

~~~text
// Put the variants you support here in the exact preference order you want.
~~~

## T-058

Canvas position: `x=1246.147`, `y=8830.755`

~~~text
using Microsoft.AspNetCore.Mvc.Filters;
~~~

## T-286

Canvas position: `x=6469.199`, `y=8834.676`

~~~text
private static readonly string[] SupportedByPreference =
~~~

## T-059

Canvas position: `x=1246.147`, `y=8855.755`

~~~text
using Microsoft.Net.Http.Headers;
~~~

## T-287

Canvas position: `x=6469.199`, `y=8859.676`

~~~text
{
~~~

## T-288

Canvas position: `x=6469.199`, `y=8884.676`

~~~text
"application/vnd.marvin.author.full.hateoas+json",
~~~

## T-060

Canvas position: `x=1246.147`, `y=8905.755`

~~~text
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
~~~

## T-289

Canvas position: `x=6469.199`, `y=8909.676`

~~~text
"application/vnd.marvin.author.full+json",
~~~

## T-061

Canvas position: `x=1246.147`, `y=8930.755`

~~~text
public sealed class ValidateAcceptHeaderAttribute : Attribute, IAsyncActionFilter
~~~

## T-290

Canvas position: `x=6469.199`, `y=8934.676`

~~~text
"application/vnd.marvin.author.friendly.hateoas+json",
~~~

## T-062

Canvas position: `x=1246.147`, `y=8955.755`

~~~text
{
~~~

## T-291

Canvas position: `x=6469.199`, `y=8959.676`

~~~text
"application/vnd.marvin.author.friendly+json",
~~~

## T-063

Canvas position: `x=1246.147`, `y=8980.755`

~~~text
public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
~~~

## T-292

Canvas position: `x=6469.199`, `y=8984.676`

~~~text
"application/json",
~~~

## T-064

Canvas position: `x=1246.147`, `y=9005.755`

~~~text
{
~~~

## T-293

Canvas position: `x=6469.199`, `y=9009.676`

~~~text
"application/*",
~~~

## T-065

Canvas position: `x=1246.147`, `y=9030.755`

~~~text
// No Accept header => treat as */* (valid). Let MVC pick default output.
~~~

## T-294

Canvas position: `x=6469.199`, `y=9034.676`

~~~text
"*/*"
~~~

## T-066

Canvas position: `x=1246.147`, `y=9055.755`

~~~text
if (!context.HttpContext.Request.Headers.TryGetValue(HeaderNames.Accept, out var acceptValues) ||
~~~

## T-295

Canvas position: `x=6469.199`, `y=9059.676`

~~~text
};
~~~

## T-067

Canvas position: `x=1246.147`, `y=9080.755`

~~~text
string.IsNullOrWhiteSpace(acceptValues.ToString()))
~~~

## T-068

Canvas position: `x=1246.147`, `y=9105.755`

~~~text
{
~~~

## T-296

Canvas position: `x=6469.199`, `y=9109.676`

~~~text
public sealed record NegotiationResult(
~~~

## T-069

Canvas position: `x=1246.147`, `y=9130.755`

~~~text
await next();
~~~

## T-297

Canvas position: `x=6469.199`, `y=9134.676`

~~~text
string MediaType,
~~~

## T-070

Canvas position: `x=1246.147`, `y=9155.755`

~~~text
return;
~~~

## T-298

Canvas position: `x=6469.199`, `y=9159.676`

~~~text
string PrimaryMediaType,  // e.g. vnd.marvin.author.full / vnd.marvin.author.friendly / application
~~~

## T-071

Canvas position: `x=1246.147`, `y=9180.755`

~~~text
}
~~~

## T-299

Canvas position: `x=6469.199`, `y=9184.676`

~~~text
bool IncludeLinks          // true if hateoas requested
~~~

## T-300

Canvas position: `x=6469.199`, `y=9209.676`

~~~text
);
~~~

## T-072

Canvas position: `x=1246.147`, `y=9230.755`

~~~text
// Accept can be a comma-separated list; TryParseList handles typical Accept syntax.
~~~

## T-073

Canvas position: `x=1246.147`, `y=9255.755`

~~~text
// If it's malformed (cannot be parsed), return 400 ProblemDetails.
~~~

## T-301

Canvas position: `x=6469.199`, `y=9259.676`

~~~text
/// <summary>
~~~

## T-074

Canvas position: `x=1246.147`, `y=9280.755`

~~~text
if (!MediaTypeHeaderValue.TryParseList(acceptValues, out var parsed))
~~~

## T-302

Canvas position: `x=6469.199`, `y=9284.676`

~~~text
/// Picks the best matching media type from Accept header using:
~~~

## T-075

Canvas position: `x=1246.147`, `y=9305.755`

~~~text
{
~~~

## T-303

Canvas position: `x=6469.199`, `y=9309.676`

~~~text
/// 1) q weight (descending)
~~~

## T-076

Canvas position: `x=1246.147`, `y=9330.755`

~~~text
// Use ProblemDetailsFactory for consistent API error responses
~~~

## T-304

Canvas position: `x=6469.199`, `y=9334.676`

~~~text
/// 2) specificity (exact > type/* > */*)
~~~

## T-077

Canvas position: `x=1246.147`, `y=9355.755`

~~~text
var pdf = context.HttpContext.RequestServices.GetRequiredService<ProblemDetailsFactory>();
~~~

## T-305

Canvas position: `x=6469.199`, `y=9359.676`

~~~text
/// 3) server preference order (SupportedByPreference)
~~~

## T-306

Canvas position: `x=6469.199`, `y=9384.676`

~~~text
/// 4) header order as a final tie-breaker (stable by index)
~~~

## T-078

Canvas position: `x=1246.147`, `y=9405.755`

~~~text
var problem = pdf.CreateProblemDetails(
~~~

## T-013

Canvas position: `x=3951.412`, `y=9405.805`

~~~text
in controller return badrequest with
~~~

## T-307

Canvas position: `x=6469.199`, `y=9409.676`

~~~text
/// </summary>
~~~

## T-079

Canvas position: `x=1246.147`, `y=9430.755`

~~~text
context.HttpContext,
~~~

## T-308

Canvas position: `x=6469.199`, `y=9434.676`

~~~text
public static bool TrySelect(
~~~

## T-080

Canvas position: `x=1246.147`, `y=9455.755`

~~~text
statusCode: StatusCodes.Status400BadRequest,
~~~

## T-309

Canvas position: `x=6469.199`, `y=9459.676`

~~~text
StringValues acceptHeader,
~~~

## T-081

Canvas position: `x=1246.147`, `y=9480.755`

~~~text
title: "Invalid Accept header.",
~~~

## T-310

Canvas position: `x=6469.199`, `y=9484.676`

~~~text
out NegotiationResult? result)
~~~

## T-082

Canvas position: `x=1246.147`, `y=9505.755`

~~~text
detail: $"The '{HeaderNames.Accept}' header value is not a valid media type list.",
~~~

## T-311

Canvas position: `x=6469.199`, `y=9509.676`

~~~text
{
~~~

## T-083

Canvas position: `x=1246.147`, `y=9530.755`

~~~text
type: "https://httpstatuses.com/400",
~~~

## T-312

Canvas position: `x=6469.199`, `y=9534.676`

~~~text
result = null;
~~~

## T-084

Canvas position: `x=1246.147`, `y=9555.755`

~~~text
instance: context.HttpContext.Request.Path
~~~

## T-085

Canvas position: `x=1246.147`, `y=9580.755`

~~~text
);
~~~

## T-313

Canvas position: `x=6469.199`, `y=9584.676`

~~~text
// Missing Accept => treat as */* (client accepts anything)
~~~

## T-314

Canvas position: `x=6469.199`, `y=9609.676`

~~~text
if (StringValues.IsNullOrEmpty(acceptHeader))
~~~

## T-086

Canvas position: `x=1246.147`, `y=9630.755`

~~~text
context.Result = new BadRequestObjectResult(problem)
~~~

## T-315

Canvas position: `x=6469.199`, `y=9634.676`

~~~text
{
~~~

## T-087

Canvas position: `x=1246.147`, `y=9655.755`

~~~text
{
~~~

## T-316

Canvas position: `x=6469.199`, `y=9659.676`

~~~text
// choose your default representation here
~~~

## T-088

Canvas position: `x=1246.147`, `y=9680.755`

~~~text
ContentTypes = { "application/problem+json" }
~~~

## T-317

Canvas position: `x=6469.199`, `y=9684.676`

~~~text
var defaultMt = "application/vnd.marvin.author.friendly+json";
~~~

## T-089

Canvas position: `x=1246.147`, `y=9705.755`

~~~text
};
~~~

## T-318

Canvas position: `x=6469.199`, `y=9709.676`

~~~text
result = BuildResult(defaultMt);
~~~

## T-090

Canvas position: `x=1246.147`, `y=9730.755`

~~~text
return;
~~~

## T-319

Canvas position: `x=6469.199`, `y=9734.676`

~~~text
return true;
~~~

## T-091

Canvas position: `x=1246.147`, `y=9755.755`

~~~text
}
~~~

## T-320

Canvas position: `x=6469.199`, `y=9759.676`

~~~text
}
~~~

## T-092

Canvas position: `x=1246.147`, `y=9805.755`

~~~text
await next();
~~~

## T-321

Canvas position: `x=6469.199`, `y=9809.676`

~~~text
if (!MediaTypeHeaderValue.TryParseList(acceptHeader, out var parsedList))
~~~

## T-093

Canvas position: `x=1246.147`, `y=9830.755`

~~~text
}
~~~

## T-322

Canvas position: `x=6469.199`, `y=9834.676`

~~~text
{
~~~

## T-094

Canvas position: `x=1246.147`, `y=9855.755`

~~~text
}
~~~

## T-275

Canvas position: `x=2203.242`, `y=9855.755`

~~~text
CONTENT TYPE CHECK MIDDLEWARE
~~~

## T-323

Canvas position: `x=6469.199`, `y=9859.676`

~~~text
return false; // invalid syntax -> caller should return 400 ProblemDetails
~~~

## T-324

Canvas position: `x=6469.199`, `y=9884.676`

~~~text
}
~~~

## T-325

Canvas position: `x=6469.199`, `y=9934.676`

~~~text
// Build candidates from Accept values
~~~

## T-326

Canvas position: `x=6469.199`, `y=9959.676`

~~~text
var candidates = parsedList
~~~

## T-265

Canvas position: `x=2647.243`, `y=9976.477`

~~~text
CAN CHECK REQUESTS FOR INVALID CONTENT-TYPE HEADER WITH MIDDLEWARE
~~~

## T-327

Canvas position: `x=6469.199`, `y=9984.676`

~~~text
.Select((mt, index) => new Candidate(mt, index))
~~~


---

# R05 — q values, specificity, wildcards, server preference, and HATEOAS

Exact non-empty SVG text elements in this region: 152

The following is a literal canvas-text evidence layer. Original spelling is retained; no semantic correction is silently applied here.

## T-328

Canvas position: `x=6469.199`, `y=10009.676`

~~~text
.Where(c => c.Q > 0) // q=0 means "not acceptable"
~~~

## T-329

Canvas position: `x=6469.199`, `y=10034.676`

~~~text
.ToList();
~~~

## T-330

Canvas position: `x=6469.199`, `y=10084.676`

~~~text
if (candidates.Count == 0)
~~~

## T-331

Canvas position: `x=6469.199`, `y=10109.676`

~~~text
{
~~~

## T-332

Canvas position: `x=6469.199`, `y=10134.676`

~~~text
return false;
~~~

## T-333

Canvas position: `x=6469.199`, `y=10159.676`

~~~text
}
~~~

## T-334

Canvas position: `x=6469.199`, `y=10209.676`

~~~text
// For each Accept candidate, find best supported match based on:
~~~

## T-335

Canvas position: `x=6469.199`, `y=10234.676`

~~~text
// - exact match in SupportedByPreference
~~~

## T-336

Canvas position: `x=6469.199`, `y=10259.676`

~~~text
// - or "application/*" / "*/*" wildcard
~~~

## T-337

Canvas position: `x=6469.199`, `y=10284.676`

~~~text
var supportedMatches = new List<SupportedMatch>();
~~~

## T-338

Canvas position: `x=6469.199`, `y=10334.676`

~~~text
foreach (var c in candidates)
~~~

## T-339

Canvas position: `x=6469.199`, `y=10359.676`

~~~text
{
~~~

## T-340

Canvas position: `x=6469.199`, `y=10384.676`

~~~text
foreach (var supported in SupportedByPreference)
~~~

## T-341

Canvas position: `x=6469.199`, `y=10409.676`

~~~text
{
~~~

## T-342

Canvas position: `x=6469.199`, `y=10434.676`

~~~text
if (Matches(c, supported))
~~~

## T-343

Canvas position: `x=6469.199`, `y=10459.676`

~~~text
{
~~~

## T-266

Canvas position: `x=1851.052`, `y=10474.168`

~~~text
can framework handle this by itslef?
~~~

## T-344

Canvas position: `x=6469.199`, `y=10484.676`

~~~text
supportedMatches.Add(new SupportedMatch(
~~~

## T-345

Canvas position: `x=6469.199`, `y=10509.676`

~~~text
supportedMediaType: Normalize(supported),
~~~

## T-346

Canvas position: `x=6469.199`, `y=10534.676`

~~~text
q: c.Q,
~~~

## T-347

Canvas position: `x=6469.199`, `y=10559.676`

~~~text
specificity: c.Specificity,
~~~

## T-348

Canvas position: `x=6469.199`, `y=10584.676`

~~~text
supportedPreferenceRank: Array.IndexOf(SupportedByPreference, supported),
~~~

## T-349

Canvas position: `x=6469.199`, `y=10609.676`

~~~text
acceptHeaderIndex: c.Index));
~~~

## T-350

Canvas position: `x=6469.199`, `y=10634.676`

~~~text
}
~~~

## T-351

Canvas position: `x=6469.199`, `y=10659.676`

~~~text
}
~~~

## T-352

Canvas position: `x=6469.199`, `y=10684.676`

~~~text
}
~~~

## T-353

Canvas position: `x=6469.199`, `y=10734.676`

~~~text
if (supportedMatches.Count == 0)
~~~

## T-354

Canvas position: `x=6469.199`, `y=10759.676`

~~~text
{
~~~

## T-355

Canvas position: `x=6469.199`, `y=10784.676`

~~~text
// No overlap between Accept and what we can produce -> 406 scenario
~~~

## T-356

Canvas position: `x=6469.199`, `y=10809.676`

~~~text
return false;
~~~

## T-357

Canvas position: `x=6469.199`, `y=10834.676`

~~~text
}
~~~

## T-358

Canvas position: `x=6469.199`, `y=10884.676`

~~~text
var winner = supportedMatches
~~~

## T-359

Canvas position: `x=6469.199`, `y=10909.676`

~~~text
.OrderByDescending(m => m.Q)
~~~

## T-360

Canvas position: `x=6469.199`, `y=10934.676`

~~~text
.ThenByDescending(m => m.Specificity)
~~~

## T-361

Canvas position: `x=6469.199`, `y=10959.676`

~~~text
.ThenBy(m => m.SupportedPreferenceRank)
~~~

## T-362

Canvas position: `x=6469.199`, `y=10984.676`

~~~text
.ThenBy(m => m.AcceptHeaderIndex)
~~~

## T-363

Canvas position: `x=6469.199`, `y=11009.676`

~~~text
.First();
~~~

## T-364

Canvas position: `x=6469.199`, `y=11059.676`

~~~text
result = BuildResult(winner.SupportedMediaType);
~~~

## T-365

Canvas position: `x=6469.199`, `y=11084.676`

~~~text
return true;
~~~

## T-366

Canvas position: `x=6469.199`, `y=11109.676`

~~~text
}
~~~

## T-367

Canvas position: `x=6469.199`, `y=11159.676`

~~~text
private static NegotiationResult BuildResult(string mediaType)
~~~

## T-368

Canvas position: `x=6469.199`, `y=11184.676`

~~~text
{
~~~

## T-369

Canvas position: `x=6469.199`, `y=11209.676`

~~~text
// your course logic: include links if subtype ends with "hateoas"
~~~

## T-370

Canvas position: `x=6469.199`, `y=11234.676`

~~~text
var includeLinks = mediaType.Contains("hateoas", StringComparison.OrdinalIgnoreCase);
~~~

## T-371

Canvas position: `x=6469.199`, `y=11284.676`

~~~text
// derive "primary" type similar to course:
~~~

## T-372

Canvas position: `x=6469.199`, `y=11309.676`

~~~text
// application/vnd.marvin.author.full.hateoas+json -> vnd.marvin.author.full
~~~

## T-373

Canvas position: `x=6469.199`, `y=11334.676`

~~~text
// application/vnd.marvin.author.friendly+json -> vnd.marvin.author.friendly
~~~

## T-374

Canvas position: `x=6469.199`, `y=11359.676`

~~~text
// application/json -> application
~~~

## T-375

Canvas position: `x=6469.199`, `y=11384.676`

~~~text
var parsed = MediaTypeHeaderValue.Parse(mediaType);
~~~

## T-376

Canvas position: `x=6469.199`, `y=11409.676`

~~~text
var subType = parsed.SubTypeWithoutSuffix.Value; // e.g. vnd.marvin.author.full.hateoas or json
~~~

## T-377

Canvas position: `x=6469.199`, `y=11434.676`

~~~text
var primary = subType.EndsWith(".hateoas", StringComparison.OrdinalIgnoreCase)
~~~

## T-378

Canvas position: `x=6469.199`, `y=11459.676`

~~~text
? subType[..^(".hateoas".Length)]
~~~

## T-379

Canvas position: `x=6469.199`, `y=11484.676`

~~~text
: subType;
~~~

## T-380

Canvas position: `x=6469.199`, `y=11534.676`

~~~text
return new NegotiationResult(mediaType, primary, includeLinks);
~~~

## T-381

Canvas position: `x=6469.199`, `y=11559.676`

~~~text
}
~~~

## T-382

Canvas position: `x=6469.199`, `y=11609.676`

~~~text
private static string Normalize(string mediaType) => mediaType.Trim();
~~~

## T-383

Canvas position: `x=6469.199`, `y=11659.676`

~~~text
private sealed record Candidate(MediaTypeHeaderValue Value, int Index)
~~~

## T-384

Canvas position: `x=6469.199`, `y=11684.676`

~~~text
{
~~~

## T-385

Canvas position: `x=6469.199`, `y=11709.676`

~~~text
public double Q
~~~

## T-386

Canvas position: `x=6469.199`, `y=11734.676`

~~~text
{
~~~

## T-267

Canvas position: `x=576.386`, `y=11756.834`

~~~text
checking that there is a
~~~

## T-387

Canvas position: `x=6469.199`, `y=11759.676`

~~~text
get
~~~

## T-388

Canvas position: `x=6469.199`, `y=11784.676`

~~~text
{
~~~

## T-389

Canvas position: `x=6469.199`, `y=11809.676`

~~~text
// If q is absent => 1.0
~~~

## T-390

Canvas position: `x=6469.199`, `y=11834.676`

~~~text
var qParam = Value.Parameters.FirstOrDefault(p =>
~~~

## T-391

Canvas position: `x=6469.199`, `y=11859.676`

~~~text
string.Equals(p.Name.Value, "q", StringComparison.OrdinalIgnoreCase));
~~~

## T-268

Canvas position: `x=576.386`, `y=11896.120`

~~~text
body
~~~

## T-392

Canvas position: `x=6469.199`, `y=11909.676`

~~~text
if (qParam?.Value is null) return 1.0;
~~~

## T-393

Canvas position: `x=6469.199`, `y=11959.676`

~~~text
// q is a StringSegment like "0.9"
~~~

## T-278

Canvas position: `x=10501.695`, `y=11968.531`

~~~text
!!!
~~~

## T-394

Canvas position: `x=6469.199`, `y=11984.676`

~~~text
if (double.TryParse(qParam.Value.Value, System.Globalization.NumberStyles.AllowDecimalPoint,
~~~

## T-395

Canvas position: `x=6469.199`, `y=12009.676`

~~~text
System.Globalization.CultureInfo.InvariantCulture, out var q))
~~~

## T-396

Canvas position: `x=6469.199`, `y=12034.676`

~~~text
{
~~~

## T-269

Canvas position: `x=576.386`, `y=12035.406`

~~~text
transfer encoding with chunked
~~~

## T-397

Canvas position: `x=6469.199`, `y=12059.676`

~~~text
return q;
~~~

## T-271

Canvas position: `x=2578.608`, `y=12065.723`

~~~text
middleware
~~~

## T-398

Canvas position: `x=6469.199`, `y=12084.676`

~~~text
}
~~~

## T-399

Canvas position: `x=6469.199`, `y=12134.676`

~~~text
// Malformed q -> treat as invalid by making it unacceptable
~~~

## T-400

Canvas position: `x=6469.199`, `y=12159.676`

~~~text
return 0;
~~~

## T-270

Canvas position: `x=576.386`, `y=12174.692`

~~~text
transfer
~~~

## T-401

Canvas position: `x=6469.199`, `y=12184.676`

~~~text
}
~~~

## T-402

Canvas position: `x=6469.199`, `y=12209.676`

~~~text
}
~~~

## T-403

Canvas position: `x=6469.199`, `y=12259.676`

~~~text
// exact = 2, type/* = 1, */* = 0
~~~

## T-404

Canvas position: `x=6469.199`, `y=12284.676`

~~~text
public int Specificity =>
~~~

## T-405

Canvas position: `x=6469.199`, `y=12309.676`

~~~text
Value.MediaType?.Value == "*/*" ? 0 :
~~~

## T-406

Canvas position: `x=6469.199`, `y=12334.676`

~~~text
Value.SubType?.Value == "*" ? 1 :
~~~

## T-407

Canvas position: `x=6469.199`, `y=12359.676`

~~~text
2;
~~~

## T-408

Canvas position: `x=6469.199`, `y=12384.676`

~~~text
}
~~~

## T-409

Canvas position: `x=6469.199`, `y=12434.676`

~~~text
private sealed record SupportedMatch(
~~~

## T-410

Canvas position: `x=6469.199`, `y=12459.676`

~~~text
string SupportedMediaType,
~~~

## T-411

Canvas position: `x=6469.199`, `y=12484.676`

~~~text
double Q,
~~~

## T-412

Canvas position: `x=6469.199`, `y=12509.676`

~~~text
int Specificity,
~~~

## T-413

Canvas position: `x=6469.199`, `y=12534.676`

~~~text
int SupportedPreferenceRank,
~~~

## T-414

Canvas position: `x=6469.199`, `y=12559.676`

~~~text
int AcceptHeaderIndex);
~~~

## T-415

Canvas position: `x=6469.199`, `y=12609.676`

~~~text
private static bool Matches(Candidate accept, string supported)
~~~

## T-416

Canvas position: `x=6469.199`, `y=12634.676`

~~~text
{
~~~

## T-417

Canvas position: `x=6469.199`, `y=12659.676`

~~~text
supported = Normalize(supported);
~~~

## T-418

Canvas position: `x=6469.199`, `y=12709.676`

~~~text
// wildcard supported entries are just there for preference list;
~~~

## T-419

Canvas position: `x=6469.199`, `y=12734.676`

~~~text
// treat them as matching in the obvious way.
~~~

## T-420

Canvas position: `x=6469.199`, `y=12759.676`

~~~text
if (supported == "*/*")
~~~

## T-421

Canvas position: `x=6469.199`, `y=12784.676`

~~~text
return true;
~~~

## T-422

Canvas position: `x=6469.199`, `y=12834.676`

~~~text
// Parse supported into type/subtype
~~~

## T-423

Canvas position: `x=6469.199`, `y=12859.676`

~~~text
if (!MediaTypeHeaderValue.TryParse(supported, out var supportedMt))
~~~

## T-424

Canvas position: `x=6469.199`, `y=12884.676`

~~~text
{
~~~

## T-425

Canvas position: `x=6469.199`, `y=12909.676`

~~~text
// developer error; should never happen because SupportedByPreference is ours
~~~

## T-426

Canvas position: `x=6469.199`, `y=12934.676`

~~~text
return false;
~~~

## T-427

Canvas position: `x=6469.199`, `y=12959.676`

~~~text
}
~~~

## T-428

Canvas position: `x=6469.199`, `y=13009.676`

~~~text
// If accept is */* it matches anything
~~~

## T-429

Canvas position: `x=6469.199`, `y=13034.676`

~~~text
if (accept.Value.MediaType?.Value == "*/*")
~~~

## T-430

Canvas position: `x=6469.199`, `y=13059.676`

~~~text
return true;
~~~

## T-431

Canvas position: `x=6469.199`, `y=13109.676`

~~~text
// If accept is type/* it matches any subtype for that type
~~~

## T-432

Canvas position: `x=6469.199`, `y=13134.676`

~~~text
if (accept.Value.SubType?.Value == "*")
~~~

## T-433

Canvas position: `x=6469.199`, `y=13159.676`

~~~text
{
~~~

## T-434

Canvas position: `x=6469.199`, `y=13184.676`

~~~text
return string.Equals(
~~~

## T-435

Canvas position: `x=6469.199`, `y=13209.676`

~~~text
accept.Value.Type?.Value,
~~~

## T-436

Canvas position: `x=6469.199`, `y=13234.676`

~~~text
supportedMt!.Type?.Value,
~~~

## T-437

Canvas position: `x=6469.199`, `y=13259.676`

~~~text
StringComparison.OrdinalIgnoreCase);
~~~

## T-438

Canvas position: `x=6469.199`, `y=13284.676`

~~~text
}
~~~

## T-439

Canvas position: `x=6469.199`, `y=13334.676`

~~~text
// Otherwise exact compare by media type (ignore parameters)
~~~

## T-440

Canvas position: `x=6469.199`, `y=13359.676`

~~~text
return string.Equals(
~~~

## T-441

Canvas position: `x=6469.199`, `y=13384.676`

~~~text
accept.Value.MediaType?.Value,
~~~

## T-442

Canvas position: `x=6469.199`, `y=13409.676`

~~~text
supportedMt!.MediaType?.Value,
~~~

## T-443

Canvas position: `x=6469.199`, `y=13434.676`

~~~text
StringComparison.OrdinalIgnoreCase);
~~~

## T-444

Canvas position: `x=6469.199`, `y=13459.676`

~~~text
}
~~~

## T-445

Canvas position: `x=6469.199`, `y=13484.676`

~~~text
}
~~~

## T-279

Canvas position: `x=8111.947`, `y=13633.828`

~~~text
in controller
~~~

## T-446

Canvas position: `x=6538.384`, `y=13718.437`

~~~text
using Microsoft.AspNetCore.Mvc;
~~~

## T-447

Canvas position: `x=6538.384`, `y=13768.437`

~~~text
[ApiController]
~~~

## T-448

Canvas position: `x=6538.384`, `y=13793.437`

~~~text
[Route("api/authors")]
~~~

## T-449

Canvas position: `x=6538.384`, `y=13818.437`

~~~text
public class AuthorsController : ControllerBase
~~~

## T-450

Canvas position: `x=6538.384`, `y=13843.437`

~~~text
{
~~~

## T-451

Canvas position: `x=6538.384`, `y=13868.437`

~~~text
[HttpGet("{authorId}")]
~~~

## T-452

Canvas position: `x=6538.384`, `y=13893.437`

~~~text
public IActionResult GetAuthor(Guid authorId, [FromHeader(Name = "Accept")] string? accept)
~~~

## T-453

Canvas position: `x=6538.384`, `y=13918.437`

~~~text
{
~~~

## T-471

Canvas position: `x=3021.593`, `y=13934.051`

~~~text
better
~~~

## T-454

Canvas position: `x=6538.384`, `y=13943.437`

~~~text
if (!AcceptHeaderSelectionHelper.TrySelect(accept, out var selected))
~~~

## T-455

Canvas position: `x=6538.384`, `y=13968.437`

~~~text
{
~~~

## T-456

Canvas position: `x=6538.384`, `y=13993.437`

~~~text
// Could be invalid Accept syntax (400) OR no supported match (406).
~~~

## T-457

Canvas position: `x=6538.384`, `y=14018.437`

~~~text
// If you want to distinguish, check TryParseList separately.
~~~

## T-458

Canvas position: `x=6538.384`, `y=14043.437`

~~~text
return StatusCode(StatusCodes.Status406NotAcceptable);
~~~

## T-459

Canvas position: `x=6538.384`, `y=14068.437`

~~~text
}
~~~

## T-460

Canvas position: `x=6538.384`, `y=14118.437`

~~~text
// selected.IncludeLinks -> add HATEOAS
~~~

## T-461

Canvas position: `x=6538.384`, `y=14143.437`

~~~text
// selected.PrimaryMediaType -> "vnd.marvin.author.full" / "vnd.marvin.author.friendly"
~~~

## T-462

Canvas position: `x=6538.384`, `y=14168.437`

~~~text
if (string.Equals(selected!.PrimaryMediaType, "vnd.marvin.author.full", StringComparison.OrdinalIgnoreCase))
~~~

## T-463

Canvas position: `x=6538.384`, `y=14193.437`

~~~text
{
~~~

## T-464

Canvas position: `x=6538.384`, `y=14218.437`

~~~text
// build full representation
~~~

## T-465

Canvas position: `x=6538.384`, `y=14243.437`

~~~text
return Ok(new { kind = "full", links = selected.IncludeLinks });
~~~

## T-466

Canvas position: `x=6538.384`, `y=14268.437`

~~~text
}
~~~

## T-467

Canvas position: `x=6538.384`, `y=14318.437`

~~~text
// build friendly representation
~~~

## T-468

Canvas position: `x=6538.384`, `y=14343.437`

~~~text
return Ok(new { kind = "friendly", links = selected.IncludeLinks });
~~~

## T-469

Canvas position: `x=6538.384`, `y=14368.437`

~~~text
}
~~~

## T-470

Canvas position: `x=6538.384`, `y=14393.437`

~~~text
}
~~~


---

# R06 — request-body detection, Content-Type, Consumes, and 415

Exact non-empty SVG text elements in this region: 4

The following is a literal canvas-text evidence layer. Original spelling is retained; no semantic correction is silently applied here.

## T-274

Canvas position: `x=1491.867`, `y=16344.308`

~~~text
CONSUMES
~~~

## T-096

Canvas position: `x=3182.332`, `y=16435.714`

~~~text
IACTIONCONSTRAINT
~~~

## T-095

Canvas position: `x=2582.658`, `y=16480.621`

~~~text
OR
~~~

## T-014

Canvas position: `x=1880.798`, `y=16487.744`

~~~text
use consumes
~~~


---

# R07 — IActionConstraint design and developer-input validation

Exact non-empty SVG text elements in this region: 6

The following is a literal canvas-text evidence layer. Original spelling is retained; no semantic correction is silently applied here.

## T-097

Canvas position: `x=6070.675`, `y=19463.997`

~~~text
FROM COURSE WITH PLAIN IACTIONCONSTAINT ATTR
~~~

## T-098

Canvas position: `x=2511.939`, `y=19562.300`

~~~text
NEED TO VALIDATE
~~~

## T-099

Canvas position: `x=2511.939`, `y=19587.300`

~~~text
INPUTTED BY DEVELOPER
~~~

## T-100

Canvas position: `x=2511.939`, `y=19612.300`

~~~text
VALUES
~~~

## T-101

Canvas position: `x=2929.157`, `y=21034.680`

~~~text
BUT NOT ONLY HEADERS MB
~~~

## T-102

Canvas position: `x=6244.729`, `y=21055.193`

~~~text
WITH VALIDATION OF DEVELOPERS INPUT AND MULTIPLE CTORS
~~~


---

# R08 — RequestMatchesAttribute for method/header/query/route matching

Exact non-empty SVG text elements in this region: 163

The following is a literal canvas-text evidence layer. Original spelling is retained; no semantic correction is silently applied here.

## T-103

Canvas position: `x=7233.082`, `y=22287.113`

~~~text
using Microsoft.AspNetCore.Mvc.ActionConstraints;
~~~

## T-104

Canvas position: `x=7233.082`, `y=22312.113`

~~~text
using Microsoft.Net.Http.Headers;
~~~

## T-105

Canvas position: `x=7233.082`, `y=22337.113`

~~~text
using Microsoft.Extensions.Primitives;
~~~

## T-106

Canvas position: `x=7233.082`, `y=22387.113`

~~~text
[AttributeUsage(AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
~~~

## T-107

Canvas position: `x=7233.082`, `y=22412.113`

~~~text
public sealed class RequestMatchesAttribute : Attribute, IActionConstraintFactory
~~~

## T-108

Canvas position: `x=7233.082`, `y=22437.113`

~~~text
{
~~~

## T-109

Canvas position: `x=7233.082`, `y=22462.113`

~~~text
// Lower runs earlier
~~~

## T-110

Canvas position: `x=7233.082`, `y=22487.113`

~~~text
public int Order { get; set; } = 0;
~~~

## T-111

Canvas position: `x=7233.082`, `y=22537.113`

~~~text
public bool IsReusable => true;
~~~

## T-112

Canvas position: `x=7233.082`, `y=22587.113`

~~~text
// Optional: match method
~~~

## T-113

Canvas position: `x=7233.082`, `y=22612.113`

~~~text
public string? HttpMethod { get; }
~~~

## T-114

Canvas position: `x=7233.082`, `y=22662.113`

~~~text
// Optional: match a single header against allowed media types
~~~

## T-115

Canvas position: `x=7233.082`, `y=22687.113`

~~~text
// (Typical for Content-Type selection)
~~~

## T-116

Canvas position: `x=7233.082`, `y=22712.113`

~~~text
public string? HeaderToMatch { get; }
~~~

## T-117

Canvas position: `x=7233.082`, `y=22737.113`

~~~text
private readonly MediaTypeHeaderValue[]? _allowedHeaderMediaTypes;
~~~

## T-118

Canvas position: `x=7233.082`, `y=22787.113`

~~~text
// Optional: query string rules (presence or exact match)
~~~

## T-119

Canvas position: `x=7233.082`, `y=22812.113`

~~~text
public string? RequiredQueryKey { get; }
~~~

## T-120

Canvas position: `x=7233.082`, `y=22837.113`

~~~text
public string? RequiredQueryValue { get; }
~~~

## T-121

Canvas position: `x=7233.082`, `y=22887.113`

~~~text
// Optional: route value rules
~~~

## T-122

Canvas position: `x=7233.082`, `y=22912.113`

~~~text
public string? RequiredRouteKey { get; }
~~~

## T-123

Canvas position: `x=7233.082`, `y=22937.113`

~~~text
public string? RequiredRouteValue { get; }
~~~

## T-124

Canvas position: `x=7233.082`, `y=22987.113`

~~~text
// Example ctor: match by Content-Type list
~~~

## T-125

Canvas position: `x=7233.082`, `y=23012.113`

~~~text
public RequestMatchesAttribute(
~~~

## T-126

Canvas position: `x=7233.082`, `y=23037.113`

~~~text
string headerToMatch,
~~~

## T-127

Canvas position: `x=7233.082`, `y=23062.113`

~~~text
string mediaType,
~~~

## T-128

Canvas position: `x=7233.082`, `y=23087.113`

~~~text
params string[] otherMediaTypes)
~~~

## T-129

Canvas position: `x=7233.082`, `y=23112.113`

~~~text
{
~~~

## T-130

Canvas position: `x=7233.082`, `y=23137.113`

~~~text
if (string.IsNullOrWhiteSpace(headerToMatch))
~~~

## T-131

Canvas position: `x=7233.082`, `y=23162.113`

~~~text
throw new ArgumentNullException(nameof(headerToMatch));
~~~

## T-132

Canvas position: `x=7233.082`, `y=23212.113`

~~~text
HeaderToMatch = headerToMatch;
~~~

## T-133

Canvas position: `x=7233.082`, `y=23262.113`

~~~text
var all = new List<string> { mediaType };
~~~

## T-134

Canvas position: `x=7233.082`, `y=23287.113`

~~~text
if (otherMediaTypes is { Length: > 0 })
~~~

## T-135

Canvas position: `x=7233.082`, `y=23312.113`

~~~text
all.AddRange(otherMediaTypes);
~~~

## T-136

Canvas position: `x=7233.082`, `y=23362.113`

~~~text
_allowedHeaderMediaTypes = all.Select(mt =>
~~~

## T-137

Canvas position: `x=7233.082`, `y=23387.113`

~~~text
{
~~~

## T-138

Canvas position: `x=7233.082`, `y=23412.113`

~~~text
// Validate DEV-provided media type strings
~~~

## T-139

Canvas position: `x=7233.082`, `y=23437.113`

~~~text
if (!MediaTypeHeaderValue.TryParse(mt, out var parsed))
~~~

## T-140

Canvas position: `x=7233.082`, `y=23462.113`

~~~text
throw new ArgumentException($"Invalid media type configured: '{mt}'", nameof(mediaType));
~~~

## T-141

Canvas position: `x=7233.082`, `y=23487.113`

~~~text
return parsed!;
~~~

## T-142

Canvas position: `x=7233.082`, `y=23512.113`

~~~text
}).ToArray();
~~~

## T-143

Canvas position: `x=7233.082`, `y=23537.113`

~~~text
}
~~~

## T-144

Canvas position: `x=7233.082`, `y=23587.113`

~~~text
// Example ctor: match by query (presence or exact)
~~~

## T-145

Canvas position: `x=7233.082`, `y=23612.113`

~~~text
public RequestMatchesAttribute(string requiredQueryKey, string? requiredQueryValue = null, bool query = true)
~~~

## T-146

Canvas position: `x=7233.082`, `y=23637.113`

~~~text
{
~~~

## T-147

Canvas position: `x=7233.082`, `y=23662.113`

~~~text
if (!query) throw new ArgumentException("Use the query ctor overload.", nameof(query));
~~~

## T-148

Canvas position: `x=7233.082`, `y=23687.113`

~~~text
if (string.IsNullOrWhiteSpace(requiredQueryKey))
~~~

## T-149

Canvas position: `x=7233.082`, `y=23712.113`

~~~text
throw new ArgumentNullException(nameof(requiredQueryKey));
~~~

## T-150

Canvas position: `x=7233.082`, `y=23762.113`

~~~text
RequiredQueryKey = requiredQueryKey;
~~~

## T-151

Canvas position: `x=7233.082`, `y=23787.113`

~~~text
RequiredQueryValue = requiredQueryValue;
~~~

## T-152

Canvas position: `x=7233.082`, `y=23812.113`

~~~text
}
~~~

## T-153

Canvas position: `x=7233.082`, `y=23862.113`

~~~text
// Example ctor: match by route value
~~~

## T-154

Canvas position: `x=7233.082`, `y=23887.113`

~~~text
public RequestMatchesAttribute(string requiredRouteKey, string requiredRouteValue, bool route = true)
~~~

## T-155

Canvas position: `x=7233.082`, `y=23912.113`

~~~text
{
~~~

## T-156

Canvas position: `x=7233.082`, `y=23937.113`

~~~text
if (!route) throw new ArgumentException("Use the route ctor overload.", nameof(route));
~~~

## T-157

Canvas position: `x=7233.082`, `y=23962.113`

~~~text
if (string.IsNullOrWhiteSpace(requiredRouteKey))
~~~

## T-158

Canvas position: `x=7233.082`, `y=23987.113`

~~~text
throw new ArgumentNullException(nameof(requiredRouteKey));
~~~

## T-159

Canvas position: `x=7233.082`, `y=24012.113`

~~~text
if (string.IsNullOrWhiteSpace(requiredRouteValue))
~~~

## T-160

Canvas position: `x=7233.082`, `y=24037.113`

~~~text
throw new ArgumentNullException(nameof(requiredRouteValue));
~~~

## T-161

Canvas position: `x=7233.082`, `y=24087.113`

~~~text
RequiredRouteKey = requiredRouteKey;
~~~

## T-162

Canvas position: `x=7233.082`, `y=24112.113`

~~~text
RequiredRouteValue = requiredRouteValue;
~~~

## T-163

Canvas position: `x=7233.082`, `y=24137.113`

~~~text
}
~~~

## T-164

Canvas position: `x=7233.082`, `y=24187.113`

~~~text
public IActionConstraint CreateInstance(IServiceProvider services)
~~~

## T-165

Canvas position: `x=7233.082`, `y=24212.113`

~~~text
=> new RequestMatchesConstraint(
~~~

## T-166

Canvas position: `x=7233.082`, `y=24237.113`

~~~text
order: Order,
~~~

## T-167

Canvas position: `x=7233.082`, `y=24262.113`

~~~text
httpMethod: HttpMethod,
~~~

## T-168

Canvas position: `x=7233.082`, `y=24287.113`

~~~text
headerToMatch: HeaderToMatch,
~~~

## T-169

Canvas position: `x=7233.082`, `y=24312.113`

~~~text
allowedHeaderMediaTypes: _allowedHeaderMediaTypes,
~~~

## T-170

Canvas position: `x=7233.082`, `y=24337.113`

~~~text
requiredQueryKey: RequiredQueryKey,
~~~

## T-171

Canvas position: `x=7233.082`, `y=24362.113`

~~~text
requiredQueryValue: RequiredQueryValue,
~~~

## T-172

Canvas position: `x=7233.082`, `y=24387.113`

~~~text
requiredRouteKey: RequiredRouteKey,
~~~

## T-173

Canvas position: `x=7233.082`, `y=24412.113`

~~~text
requiredRouteValue: RequiredRouteValue);
~~~

## T-174

Canvas position: `x=7233.082`, `y=24462.113`

~~~text
private sealed class RequestMatchesConstraint : IActionConstraint
~~~

## T-175

Canvas position: `x=7233.082`, `y=24487.113`

~~~text
{
~~~

## T-176

Canvas position: `x=7233.082`, `y=24512.113`

~~~text
private readonly int _order;
~~~

## T-177

Canvas position: `x=7233.082`, `y=24537.113`

~~~text
private readonly string? _httpMethod;
~~~

## T-178

Canvas position: `x=7233.082`, `y=24587.113`

~~~text
private readonly string? _headerToMatch;
~~~

## T-179

Canvas position: `x=7233.082`, `y=24612.113`

~~~text
private readonly MediaTypeHeaderValue[]? _allowedHeaderMediaTypes;
~~~

## T-180

Canvas position: `x=7233.082`, `y=24662.113`

~~~text
private readonly string? _requiredQueryKey;
~~~

## T-181

Canvas position: `x=7233.082`, `y=24687.113`

~~~text
private readonly string? _requiredQueryValue;
~~~

## T-182

Canvas position: `x=7233.082`, `y=24737.113`

~~~text
private readonly string? _requiredRouteKey;
~~~

## T-183

Canvas position: `x=7233.082`, `y=24762.113`

~~~text
private readonly string? _requiredRouteValue;
~~~

## T-184

Canvas position: `x=7233.082`, `y=24812.113`

~~~text
public RequestMatchesConstraint(
~~~

## T-185

Canvas position: `x=7233.082`, `y=24837.113`

~~~text
int order,
~~~

## T-186

Canvas position: `x=7233.082`, `y=24862.113`

~~~text
string? httpMethod,
~~~

## T-187

Canvas position: `x=7233.082`, `y=24887.113`

~~~text
string? headerToMatch,
~~~

## T-188

Canvas position: `x=7233.082`, `y=24912.113`

~~~text
MediaTypeHeaderValue[]? allowedHeaderMediaTypes,
~~~

## T-189

Canvas position: `x=7233.082`, `y=24937.113`

~~~text
string? requiredQueryKey,
~~~

## T-190

Canvas position: `x=7233.082`, `y=24962.113`

~~~text
string? requiredQueryValue,
~~~

## T-191

Canvas position: `x=7233.082`, `y=24987.113`

~~~text
string? requiredRouteKey,
~~~

## T-192

Canvas position: `x=7233.082`, `y=25012.113`

~~~text
string? requiredRouteValue)
~~~

## T-193

Canvas position: `x=7233.082`, `y=25037.113`

~~~text
{
~~~

## T-194

Canvas position: `x=7233.082`, `y=25062.113`

~~~text
_order = order;
~~~

## T-195

Canvas position: `x=7233.082`, `y=25087.113`

~~~text
_httpMethod = httpMethod;
~~~

## T-196

Canvas position: `x=7233.082`, `y=25112.113`

~~~text
_headerToMatch = headerToMatch;
~~~

## T-197

Canvas position: `x=7233.082`, `y=25137.113`

~~~text
_allowedHeaderMediaTypes = allowedHeaderMediaTypes;
~~~

## T-198

Canvas position: `x=7233.082`, `y=25162.113`

~~~text
_requiredQueryKey = requiredQueryKey;
~~~

## T-199

Canvas position: `x=7233.082`, `y=25187.113`

~~~text
_requiredQueryValue = requiredQueryValue;
~~~

## T-200

Canvas position: `x=7233.082`, `y=25212.113`

~~~text
_requiredRouteKey = requiredRouteKey;
~~~

## T-201

Canvas position: `x=7233.082`, `y=25237.113`

~~~text
_requiredRouteValue = requiredRouteValue;
~~~

## T-202

Canvas position: `x=7233.082`, `y=25262.113`

~~~text
}
~~~

## T-203

Canvas position: `x=7233.082`, `y=25312.113`

~~~text
public int Order => _order;
~~~

## T-204

Canvas position: `x=7233.082`, `y=25362.113`

~~~text
public bool Accept(ActionConstraintContext context)
~~~

## T-205

Canvas position: `x=7233.082`, `y=25387.113`

~~~text
{
~~~

## T-206

Canvas position: `x=7233.082`, `y=25412.113`

~~~text
var http = context.RouteContext.HttpContext;
~~~

## T-207

Canvas position: `x=7233.082`, `y=25437.113`

~~~text
var req = http.Request;
~~~

## T-208

Canvas position: `x=7233.082`, `y=25487.113`

~~~text
// Method (optional)
~~~

## T-209

Canvas position: `x=7233.082`, `y=25512.113`

~~~text
if (!string.IsNullOrWhiteSpace(_httpMethod) &&
~~~

## T-210

Canvas position: `x=7233.082`, `y=25537.113`

~~~text
!HttpMethods.IsMethod(req.Method, _httpMethod))
~~~

## T-211

Canvas position: `x=7233.082`, `y=25562.113`

~~~text
{
~~~

## T-212

Canvas position: `x=7233.082`, `y=25587.113`

~~~text
return false;
~~~

## T-213

Canvas position: `x=7233.082`, `y=25612.113`

~~~text
}
~~~

## T-214

Canvas position: `x=7233.082`, `y=25662.113`

~~~text
// Route rule (optional)
~~~

## T-215

Canvas position: `x=7233.082`, `y=25687.113`

~~~text
if (_requiredRouteKey != null)
~~~

## T-216

Canvas position: `x=7233.082`, `y=25712.113`

~~~text
{
~~~

## T-217

Canvas position: `x=7233.082`, `y=25737.113`

~~~text
if (!context.RouteContext.RouteData.Values.TryGetValue(_requiredRouteKey, out var obj))
~~~

## T-218

Canvas position: `x=7233.082`, `y=25762.113`

~~~text
return false;
~~~

## T-549

Canvas position: `x=2478.247`, `y=25769.814`

~~~text
produces attribute
~~~

## T-263

Canvas position: `x=1296.268`, `y=25806.154`

~~~text
CAN SPLIT OUR ACTION THAT PRODUCES 4 DIFFERENT VARIANTS(APPJSON/HATEMARVIN
~~~

## T-219

Canvas position: `x=7233.082`, `y=25812.113`

~~~text
var actual = Convert.ToString(obj);
~~~

## T-264

Canvas position: `x=1296.268`, `y=25832.417`

~~~text
= FRENDLYJSON/FRENDLYHATE)
~~~

## T-220

Canvas position: `x=7233.082`, `y=25837.113`

~~~text
if (!string.Equals(actual, _requiredRouteValue, StringComparison.OrdinalIgnoreCase))
~~~

## T-221

Canvas position: `x=7233.082`, `y=25862.113`

~~~text
return false;
~~~

## T-222

Canvas position: `x=7233.082`, `y=25887.113`

~~~text
}
~~~

## T-223

Canvas position: `x=7233.082`, `y=25937.113`

~~~text
// Query rule (optional)
~~~

## T-224

Canvas position: `x=7233.082`, `y=25962.113`

~~~text
if (_requiredQueryKey != null)
~~~

## T-225

Canvas position: `x=7233.082`, `y=25987.113`

~~~text
{
~~~

## T-226

Canvas position: `x=7233.082`, `y=26012.113`

~~~text
if (!req.Query.TryGetValue(_requiredQueryKey, out var values))
~~~

## T-227

Canvas position: `x=7233.082`, `y=26037.113`

~~~text
return false;
~~~

## T-228

Canvas position: `x=7233.082`, `y=26087.113`

~~~text
if (_requiredQueryValue != null && !AnyEquals(values, _requiredQueryValue))
~~~

## T-229

Canvas position: `x=7233.082`, `y=26112.113`

~~~text
return false;
~~~

## T-230

Canvas position: `x=7233.082`, `y=26137.113`

~~~text
}
~~~

## T-231

Canvas position: `x=7233.082`, `y=26187.113`

~~~text
// Header media type rule (optional)
~~~

## T-232

Canvas position: `x=7233.082`, `y=26212.113`

~~~text
if (_headerToMatch != null && _allowedHeaderMediaTypes != null)
~~~

## T-233

Canvas position: `x=7233.082`, `y=26237.113`

~~~text
{
~~~

## T-234

Canvas position: `x=7233.082`, `y=26262.113`

~~~text
if (!req.Headers.TryGetValue(_headerToMatch, out var raw))
~~~

## T-235

Canvas position: `x=7233.082`, `y=26287.113`

~~~text
return false;
~~~

## T-236

Canvas position: `x=7233.082`, `y=26337.113`

~~~text
// IMPORTANT: client header might be malformed -> don't throw
~~~

## T-237

Canvas position: `x=7233.082`, `y=26362.113`

~~~text
if (!MediaTypeHeaderValue.TryParse(raw.ToString(), out var parsedRequest))
~~~

## T-238

Canvas position: `x=7233.082`, `y=26387.113`

~~~text
return false;
~~~

## T-239

Canvas position: `x=7233.082`, `y=26437.113`

~~~text
var requestMediaType = parsedRequest!.MediaType?.Value;
~~~

## T-240

Canvas position: `x=7233.082`, `y=26462.113`

~~~text
if (string.IsNullOrWhiteSpace(requestMediaType))
~~~

## T-241

Canvas position: `x=7233.082`, `y=26487.113`

~~~text
return false;
~~~

## T-242

Canvas position: `x=7233.082`, `y=26537.113`

~~~text
foreach (var allowed in _allowedHeaderMediaTypes)
~~~

## T-243

Canvas position: `x=7233.082`, `y=26562.113`

~~~text
{
~~~

## T-244

Canvas position: `x=7233.082`, `y=26587.113`

~~~text
if (string.Equals(requestMediaType, allowed.MediaType?.Value, StringComparison.OrdinalIgnoreCase))
~~~

## T-245

Canvas position: `x=7233.082`, `y=26612.113`

~~~text
return true;
~~~

## T-246

Canvas position: `x=7233.082`, `y=26637.113`

~~~text
}
~~~

## T-247

Canvas position: `x=7233.082`, `y=26687.113`

~~~text
return false;
~~~

## T-248

Canvas position: `x=7233.082`, `y=26712.113`

~~~text
}
~~~

## T-249

Canvas position: `x=7233.082`, `y=26762.113`

~~~text
// If no header rule configured, and other configured rules passed, accept.
~~~

## T-250

Canvas position: `x=7233.082`, `y=26787.113`

~~~text
return true;
~~~

## T-251

Canvas position: `x=7233.082`, `y=26812.113`

~~~text
}
~~~

## T-252

Canvas position: `x=7233.082`, `y=26862.113`

~~~text
private static bool AnyEquals(StringValues values, string expected)
~~~

## T-253

Canvas position: `x=7233.082`, `y=26887.113`

~~~text
{
~~~

## T-254

Canvas position: `x=7233.082`, `y=26912.113`

~~~text
foreach (var v in values)
~~~

## T-255

Canvas position: `x=7233.082`, `y=26937.113`

~~~text
{
~~~

## T-256

Canvas position: `x=7233.082`, `y=26962.113`

~~~text
if (string.Equals(v, expected, StringComparison.OrdinalIgnoreCase))
~~~

## T-257

Canvas position: `x=7233.082`, `y=26987.113`

~~~text
return true;
~~~

## T-258

Canvas position: `x=7233.082`, `y=27012.113`

~~~text
}
~~~

## T-259

Canvas position: `x=7233.082`, `y=27037.113`

~~~text
return false;
~~~

## T-260

Canvas position: `x=7233.082`, `y=27062.113`

~~~text
}
~~~

## T-261

Canvas position: `x=7233.082`, `y=27087.113`

~~~text
}
~~~

## T-262

Canvas position: `x=7233.082`, `y=27112.113`

~~~text
}
~~~
