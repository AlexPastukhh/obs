# Exception Handlers - IExceptionHandler / ProblemDetails / status mapping

Generated: 2026-06-13 11:27:40 UTC

## Direction check

Goal: process Stage0 candidates into source-level semantic transcript.
Done: Stage0 boundary review exists.
This file processes `8` sources for `EXHAND-R02`.
Next: closure audit after Stage1 commit.

## Key ideas

- IExceptionHandler centralizes typed exception handling with TryHandleAsync.
- ProblemDetails gives a standard error response body shape.
- Known exception types can map to status codes while unexpected errors remain generic.

## Coverage

```text
S-009, S-010, S-011, S-012, S-013, S-014, S-015, S-016
```

## Source-level transcript

### S-009 - HASSTARTED EXPLAINATION

```text
Source theme:
HASSTARTED EXPLAINATION

Visible source anchors:
- HASSTARTED EXPLAINATION
- statusCode: statusCode,
- context,
- title: "An unexpected error occurred.",
- var problem = problemDetailsFactory.CreateProblemDetails(
- type: "https://httpstatuses.com/500",
- // Create ProblemDetails using the factory (consistent defaults)
- detail: app.Environment.IsDevelopment() ? ex?.ToString() : null,

Semantic transcript:
This source belongs to `EXHAND-R02` / IExceptionHandler / ProblemDetails / status mapping. It supports `Exception Handlers` by documenting: IExceptionHandler centralizes typed exception handling with TryHandleAsync.

Operational reading:
- This is a source-level semantic transcript, not exact code punctuation.
- Use preserved Stage0 PNGs for exact line breaks, symbols, and C# punctuation.
- No OCR-timeout / image-missing / placeholder source is marked processed.
```

### S-010 - WITH PROBLEMDETAILS SERVICE

```text
Source theme:
WITH PROBLEMDETAILS SERVICE

Visible source anchors:
- WITH PROBLEMDETAILS SERVICE
- });
- }
- await context.Response.WriteAsJsonAsync(problem);
- context.Response.ContentType = "application/problem+json";
- HASSTARTED EXPLAINATION
- context.Response.StatusCode = statusCode;
- context.Response.Clear();

Semantic transcript:
This source belongs to `EXHAND-R02` / IExceptionHandler / ProblemDetails / status mapping. It supports `Exception Handlers` by documenting: IExceptionHandler centralizes typed exception handling with TryHandleAsync.

Operational reading:
- This is a source-level semantic transcript, not exact code punctuation.
- Use preserved Stage0 PNGs for exact line breaks, symbols, and C# punctuation.
- No OCR-timeout / image-missing / placeholder source is marked processed.
```

### S-011 - WITH PROBLEMDETAILS SERVICE

```text
Source theme:
WITH PROBLEMDETAILS SERVICE

Visible source anchors:
- WITH PROBLEMDETAILS SERVICE
- WHAT IS PROBLEMDETAILSCONTEXT
- USING PROBLEMDETAILSCONTEXT.EXCEPTION
- FOR CUSTOM WRITER TO ACCESS
- TRYWRITEASYNC CHECKS IF THERE IS A SUITABLE WRITER
- FOR CLIENTS ACCEPT HEADER, IF NO THEN WE CANT WRITE
- AND MUST HAVE CALLBACK
- TO PROCESS AS TEXT

Semantic transcript:
This source belongs to `EXHAND-R02` / IExceptionHandler / ProblemDetails / status mapping. It supports `Exception Handlers` by documenting: IExceptionHandler centralizes typed exception handling with TryHandleAsync.

Operational reading:
- This is a source-level semantic transcript, not exact code punctuation.
- Use preserved Stage0 PNGs for exact line breaks, symbols, and C# punctuation.
- No OCR-timeout / image-missing / placeholder source is marked processed.
```

### S-012 - WITH PROBLEMDETAILS SERVICE

```text
Source theme:
WITH PROBLEMDETAILS SERVICE

Visible source anchors:
- WITH PROBLEMDETAILS SERVICE
- }
- });
- await context.Response.WriteAsJsonAsync(problem);
- context.Response.ContentType = "application/problem+json";
- context.Response.StatusCode = statusCode;
- context.Response.Clear();
- problem.Extensions["traceId"] = context.TraceIdentifier;

Semantic transcript:
This source belongs to `EXHAND-R02` / IExceptionHandler / ProblemDetails / status mapping. It supports `Exception Handlers` by documenting: IExceptionHandler centralizes typed exception handling with TryHandleAsync.

Operational reading:
- This is a source-level semantic transcript, not exact code punctuation.
- Use preserved Stage0 PNGs for exact line breaks, symbols, and C# punctuation.
- No OCR-timeout / image-missing / placeholder source is marked processed.
```

### S-013 - WHAT IS PROBLEMDETAILSCONTEXT

```text
Source theme:
WHAT IS PROBLEMDETAILSCONTEXT

Visible source anchors:
- WHAT IS PROBLEMDETAILSCONTEXT
- USING PROBLEMDETAILSCONTEXT.EXCEPTION
- WITH PROBLEMDETAILS SERVICE
- FOR CUSTOM WRITER TO ACCESS
- TRYWRITEASYNC CHECKS IF THERE IS A SUITABLE WRITER
- FOR CLIENTS ACCEPT HEADER, IF NO THEN WE CANT WRITE
- AND MUST HAVE CALLBACK
- TO PROCESS AS TEXT

Semantic transcript:
This source belongs to `EXHAND-R02` / IExceptionHandler / ProblemDetails / status mapping. It supports `Exception Handlers` by documenting: IExceptionHandler centralizes typed exception handling with TryHandleAsync.

Operational reading:
- This is a source-level semantic transcript, not exact code punctuation.
- Use preserved Stage0 PNGs for exact line breaks, symbols, and C# punctuation.
- No OCR-timeout / image-missing / placeholder source is marked processed.
```

### S-014 - WITH PROBLEMDETAILS SERVICE

```text
Source theme:
WITH PROBLEMDETAILS SERVICE

Visible source anchors:
- WITH PROBLEMDETAILS SERVICE
- WHAT IS PROBLEMDETAILSCONTEXT
- USING PROBLEMDETAILSCONTEXT.EXCEPTION
- FOR CUSTOM WRITER TO ACCESS
- TRYWRITEASYNC CHECKS IF THERE IS A SUITABLE WRITER
- FOR CLIENTS ACCEPT HEADER, IF NO THEN WE CANT WRITE
- AND MUST HAVE CALLBACK
- }

Semantic transcript:
This source belongs to `EXHAND-R02` / IExceptionHandler / ProblemDetails / status mapping. It supports `Exception Handlers` by documenting: IExceptionHandler centralizes typed exception handling with TryHandleAsync.

Operational reading:
- This is a source-level semantic transcript, not exact code punctuation.
- Use preserved Stage0 PNGs for exact line breaks, symbols, and C# punctuation.
- No OCR-timeout / image-missing / placeholder source is marked processed.
```

### S-015 - WHAT IS PROBLEMDETAILSCONTEXT

```text
Source theme:
WHAT IS PROBLEMDETAILSCONTEXT

Visible source anchors:
- WHAT IS PROBLEMDETAILSCONTEXT
- USING PROBLEMDETAILSCONTEXT.EXCEPTION
- FOR CUSTOM WRITER TO ACCESS
- TRYWRITEASYNC CHECKS IF THERE IS A SUITABLE WRITER
- FOR CLIENTS ACCEPT HEADER, IF NO THEN WE CANT WRITE
- AND MUST HAVE CALLBACK
- TO PROCESS AS TEXT
- WITH PROBLEMDETAILS SERVICE

Semantic transcript:
This source belongs to `EXHAND-R02` / IExceptionHandler / ProblemDetails / status mapping. It supports `Exception Handlers` by documenting: IExceptionHandler centralizes typed exception handling with TryHandleAsync.

Operational reading:
- This is a source-level semantic transcript, not exact code punctuation.
- Use preserved Stage0 PNGs for exact line breaks, symbols, and C# punctuation.
- No OCR-timeout / image-missing / placeholder source is marked processed.
```

### S-016 - WHAT IS PROBLEMDETAILSCONTEXT

```text
Source theme:
WHAT IS PROBLEMDETAILSCONTEXT

Visible source anchors:
- WHAT IS PROBLEMDETAILSCONTEXT
- USING PROBLEMDETAILSCONTEXT.EXCEPTION
- FOR CUSTOM WRITER TO ACCESS
- TRYWRITEASYNC CHECKS IF THERE IS A SUITABLE WRITER
- FOR CLIENTS ACCEPT HEADER, IF NO THEN WE CANT WRITE
- AND MUST HAVE CALLBACK
- TO PROCESS AS TEXT
- !!!

Semantic transcript:
This source belongs to `EXHAND-R02` / IExceptionHandler / ProblemDetails / status mapping. It supports `Exception Handlers` by documenting: IExceptionHandler centralizes typed exception handling with TryHandleAsync.

Operational reading:
- This is a source-level semantic transcript, not exact code punctuation.
- Use preserved Stage0 PNGs for exact line breaks, symbols, and C# punctuation.
- No OCR-timeout / image-missing / placeholder source is marked processed.
```
