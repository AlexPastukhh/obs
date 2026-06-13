# R03 - 406/415 diagnostics / StatusCodePages / ProblemDetails

Generated: 2026-06-13 05:25:22 UTC

Image uses: 11

```text
S-015, S-016, S-017, S-018, S-019, S-020, S-021, S-028, S-029, S-030, S-031
```

## Core distinction

`406` and `415` are both media-type-related failures, but they belong to opposite directions.

```text
406 Not Acceptable:
client asked for response media type that the server cannot produce.

415 Unsupported Media Type:
client sent request body Content-Type that the server cannot consume.
```

That is the most important distinction in this region.

## 406 Not Acceptable

`406` is response-side.

A client sends `Accept`, for example:

```http
Accept: application/xml
```

If the selected endpoint cannot produce XML, and strict content negotiation is enabled, ASP.NET Core can return:

```text
406 Not Acceptable
```

This means:

```text
the endpoint may exist
the route may match
the action may be callable
but the requested response representation is not available
```

So 406 is connected to:

```text
[Produces]
output formatters
Accept header
ReturnHttpNotAcceptable / strict negotiation behavior
```

## 415 Unsupported Media Type

`415` is request-side.

A client sends `Content-Type`, for example:

```http
Content-Type: application/xml
```

If the selected action cannot read XML, or `[Consumes]` excludes XML, ASP.NET Core can return:

```text
415 Unsupported Media Type
```

This means:

```text
the server does not support this request body representation for that endpoint/action
```

So 415 is connected to:

```text
[Consumes]
input formatters
Content-Type header
request body model binding
action selection by media type
```

## StatusCodePages

The screenshots include the idea of adding `StatusCodePages` for 406/415.

This is useful because status-code-only responses can be hard to debug. A custom status page can explain:

```text
what status code happened
which path was requested
what the client likely needs to change
```

For media-type errors, useful hints are:

```text
406: check the Accept header and available output media types
415: check the Content-Type header and available input media types
```

## ProblemDetails

ProblemDetails is a structured error response shape. It can include:

```text
status
title
detail
type
instance
extensions
```

For 406/415, the useful part is not necessarily the exact internal reason. The useful part is enough guidance for the client:

```text
406 -> requested response media type is not available
415 -> submitted request media type is not supported
```

The canvas note says you may not always be able to add the exact reason, but you can add useful details. That is the right policy: do not overpromise exact internals; add safe, actionable diagnostics.

## Reason phrases and status-code endpoints

The source screenshots also include explicit status-code endpoints and reason phrase helpers.

That pattern can be used to centralize responses:

```text
/status-code/406
/status-code/415
```

The endpoint can then build a response based on the code:

```text
406 -> Not Acceptable -> check Accept header
415 -> Unsupported Media Type -> check Content-Type header
```

## Practical diagnostic policy

Good diagnostics:

```text
tell which direction failed: response Accept or request Content-Type
name the relevant header
name the endpoint/path if safe
suggest acceptable media types if known
stay consistent with ProblemDetails structure
```

Bad diagnostics:

```text
leak internal formatter implementation details
claim an exact cause when action selection/formatter selection is ambiguous
mix up Accept and Content-Type
treat 406 and 415 as the same error
```

## Relationship to R01/R02

```text
R01 explains how Produces and output formatters lead to successful/failed response negotiation.
R02 explains how Consumes and input formatters lead to successful/failed request body handling.
R03 explains how to make the failures readable and debuggable.
```
