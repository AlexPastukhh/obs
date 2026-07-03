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
