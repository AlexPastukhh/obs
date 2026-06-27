# Regional transcript — R04: Accept-header validation filter and controller BadRequest ProblemDetails

Conspect: `FULL CONTENT NEG + VALIDATION FLOW`  
Generated: 2026-06-27 10:00:00 UTC

## Coverage

```text
text elements represented: 99 / 99
image uses processed: 16 / 16
unique screenshots represented: 16
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

An action filter can distinguish **malformed Accept syntax** from a valid header
that merely has no supported representation.

### Validation flow

1. Missing or blank `Accept` is accepted as wildcard/default behavior.
2. Parse the entire comma-separated list with
   `MediaTypeHeaderValue.TryParseList`.
3. Parsing failure returns a 400 `ProblemDetails`.
4. Parsing success continues to MVC or the custom selector.
5. Later failure to find a supported representation returns 406.

### Filter response

- Use `ProblemDetailsFactory` for application-wide defaults.
- Set title such as `Invalid Accept header`.
- Use the request path as `instance`.
- Return `BadRequestObjectResult`.
- Include `application/problem+json` in the result content types.

A controller-local check is reasonable for one endpoint. A class/action filter
avoids duplication across controllers. Middleware is more global but lacks some
MVC action context.

Syntax validity and representation support are deliberately separate:
`TryParseList` proves only that the header is well formed.

## Representative source labels

- create action filter for trying to parse value from accept header
- and return 400 with proper problem details                                  or                 do this in every controller action
- you can check if accept headers value is valid
- and return proper problemdetails
- if you wont - framework will return just status code
- in controller return badrequest with
- using Microsoft.AspNetCore.Mvc;
- using Microsoft.AspNetCore.Mvc.Filters;
- using Microsoft.Net.Http.Headers;
- [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
- public sealed class ValidateAcceptHeaderAttribute : Attribute, IAsyncActionFilter
- {
- public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
- // No Accept header => treat as */* (valid). Let MVC pick default output.
- if (!context.HttpContext.Request.Headers.TryGetValue(HeaderNames.Accept, out var acceptValues) ||
- string.IsNullOrWhiteSpace(acceptValues.ToString()))
- await next();
- return;
- }
- // Accept can be a comma-separated list; TryParseList handles typical Accept syntax.
- // If it's malformed (cannot be parsed), return 400 ProblemDetails.
- if (!MediaTypeHeaderValue.TryParseList(acceptValues, out var parsed))
- // Use ProblemDetailsFactory for consistent API error responses
- var pdf = context.HttpContext.RequestServices.GetRequiredService<ProblemDetailsFactory>();
- var problem = pdf.CreateProblemDetails(
- context.HttpContext,
- statusCode: StatusCodes.Status400BadRequest,
- title: "Invalid Accept header.",
- detail: $"The '{HeaderNames.Accept}' header value is not a valid media type list.",
- type: "https://httpstatuses.com/400",

## Covered text elements

```text
T-008, T-009, T-010, T-011, T-012, T-013, T-057, T-058, T-059, T-060, T-061, T-062, T-063, T-064, T-065
T-066, T-067, T-068, T-069, T-070, T-071, T-072, T-073, T-074, T-075, T-076, T-077, T-078, T-079, T-080
T-081, T-082, T-083, T-084, T-085, T-086, T-087, T-088, T-089, T-090, T-091, T-092, T-093, T-094, T-265
T-272, T-273, T-275, T-276, T-280, T-281, T-282, T-283, T-284, T-285, T-286, T-287, T-288, T-289, T-290
T-291, T-292, T-293, T-294, T-295, T-296, T-297, T-298, T-299, T-300, T-301, T-302, T-303, T-304, T-305
T-306, T-307, T-308, T-309, T-310, T-311, T-312, T-313, T-314, T-315, T-316, T-317, T-318, T-319, T-320
T-321, T-322, T-323, T-324, T-325, T-326, T-327, T-550, T-551
```

## Covered screenshot uses

```text
IU-005, IU-006, IU-007, IU-008, IU-009, IU-010, IU-011, IU-012, IU-089, IU-090, IU-091, IU-092, IU-093
IU-094, IU-095, IU-098
```

## Audit note

Every listed text element and screenshot placement is closed in the final ledgers.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
