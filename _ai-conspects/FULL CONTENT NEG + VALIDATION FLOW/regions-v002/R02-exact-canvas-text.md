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
