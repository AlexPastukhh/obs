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
