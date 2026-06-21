# Exception Handlers - global middleware / UseExceptionHandler

Generated: 2026-06-13 11:27:40 UTC

## Direction check

Goal: process Stage0 candidates into source-level semantic transcript.
Done: Stage0 boundary review exists.
This file processes `8` sources for `EXHAND-R01`.
Next: closure audit after Stage1 commit.

## Key ideas

- Global exception middleware handles unhandled exceptions from later pipeline steps.
- UseExceptionHandler configures a fallback handler/error endpoint.
- Pipeline placement matters for what can be caught and converted to a response.

## Coverage

```text
S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008
```

## Source-level transcript

### S-001 - PLAIN USEEXCEPTIONHANDLER WITH ADDPROBLEMDETAILS

```text
Source theme:
PLAIN USEEXCEPTIONHANDLER WITH ADDPROBLEMDETAILS

Visible source anchors:
- PLAIN USEEXCEPTIONHANDLER WITH ADDPROBLEMDETAILS
- HASSTARTED EXPLAINATION
- from anywhere(where they werent handled)
- add exception handler middleware so youll return problemdetails with 500 status code on exception
- WIHTOUT PROBLEMDETAILSFACTORY AND
- IPROBLEMDETAILS SERVICE BUT WITH EXCEPTIONHANDLERFEATURE
- EXCEPTIONHANDLER MIVVLEWARE
- ausing Microsoft.AspNetCore.Diagnostics;

Semantic transcript:
This source belongs to `EXHAND-R01` / global middleware / UseExceptionHandler. It supports `Exception Handlers` by documenting: Global exception middleware handles unhandled exceptions from later pipeline steps.

Operational reading:
- This is a source-level semantic transcript, not exact code punctuation.
- Use preserved Stage0 PNGs for exact line breaks, symbols, and C# punctuation.
- No OCR-timeout / image-missing / placeholder source is marked processed.
```

### S-002 - HASSTARTED EXPLAINATION

```text
Source theme:
HASSTARTED EXPLAINATION

Visible source anchors:
- HASSTARTED EXPLAINATION
- IPROBLEMDETAILS SERVICE BUT WITH EXCEPTIONHANDLERFEATURE
- WIHTOUT PROBLEMDETAILSFACTORY AND
- from anywhere(where they werent handled)
- add exception handler middleware so youll return problemdetails with 500 status code on exception
- EXCEPTIONHANDLER MIVVLEWARE
- ausing Microsoft.AspNetCore.Diagnostics;
- using Microsoft.AspNetCore.Mvc;

Semantic transcript:
This source belongs to `EXHAND-R01` / global middleware / UseExceptionHandler. It supports `Exception Handlers` by documenting: Global exception middleware handles unhandled exceptions from later pipeline steps.

Operational reading:
- This is a source-level semantic transcript, not exact code punctuation.
- Use preserved Stage0 PNGs for exact line breaks, symbols, and C# punctuation.
- No OCR-timeout / image-missing / placeholder source is marked processed.
```

### S-003 - IPROBLEMDETAILS SERVICE BUT WITH EXCEPTIONHANDLERFEATURE

```text
Source theme:
IPROBLEMDETAILS SERVICE BUT WITH EXCEPTIONHANDLERFEATURE

Visible source anchors:
- IPROBLEMDETAILS SERVICE BUT WITH EXCEPTIONHANDLERFEATURE
- WIHTOUT PROBLEMDETAILSFACTORY AND
- from anywhere(where they werent handled)
- add exception handler middleware so youll return problemdetails with 500 status code on exception
- ausing Microsoft.AspNetCore.Diagnostics;
- using Microsoft.AspNetCore.Mvc;
- using Microsoft.AspNetCore.WebUtilities;
- if (app.Environment.IsDevelopment())

Semantic transcript:
This source belongs to `EXHAND-R01` / global middleware / UseExceptionHandler. It supports `Exception Handlers` by documenting: Global exception middleware handles unhandled exceptions from later pipeline steps.

Operational reading:
- This is a source-level semantic transcript, not exact code punctuation.
- Use preserved Stage0 PNGs for exact line breaks, symbols, and C# punctuation.
- No OCR-timeout / image-missing / placeholder source is marked processed.
```

### S-004 - PLAIN USEEXCEPTIONHANDLER WITH ADDPROBLEMDETAILS

```text
Source theme:
PLAIN USEEXCEPTIONHANDLER WITH ADDPROBLEMDETAILS

Visible source anchors:
- PLAIN USEEXCEPTIONHANDLER WITH ADDPROBLEMDETAILS
- HASSTARTED EXPLAINATION
- IPROBLEMDETAILS SERVICE BUT WITH EXCEPTIONHANDLERFEATURE
- WIHTOUT PROBLEMDETAILSFACTORY AND
- from anywhere(where they werent handled)
- add exception handler middleware so youll return problemdetails with 500 status code on exception
- ausing Microsoft.AspNetCore.Diagnostics;
- using Microsoft.AspNetCore.Mvc;

Semantic transcript:
This source belongs to `EXHAND-R01` / global middleware / UseExceptionHandler. It supports `Exception Handlers` by documenting: Global exception middleware handles unhandled exceptions from later pipeline steps.

Operational reading:
- This is a source-level semantic transcript, not exact code punctuation.
- Use preserved Stage0 PNGs for exact line breaks, symbols, and C# punctuation.
- No OCR-timeout / image-missing / placeholder source is marked processed.
```

### S-005 - {

```text
Source theme:
{

Visible source anchors:
- {
- app.UseDeveloperExceptionPage();
- if (app.Environment.IsDevelopment())
- }
- else
- using Microsoft.AspNetCore.WebUtilities;
- using Microsoft.AspNetCore.Mvc;
- app.UseExceptionHandler(errorApp =>

Semantic transcript:
This source belongs to `EXHAND-R01` / global middleware / UseExceptionHandler. It supports `Exception Handlers` by documenting: Global exception middleware handles unhandled exceptions from later pipeline steps.

Operational reading:
- This is a source-level semantic transcript, not exact code punctuation.
- Use preserved Stage0 PNGs for exact line breaks, symbols, and C# punctuation.
- No OCR-timeout / image-missing / placeholder source is marked processed.
```

### S-006 - HASSTARTED EXPLAINATION

```text
Source theme:
HASSTARTED EXPLAINATION

Visible source anchors:
- HASSTARTED EXPLAINATION
- {
- app.UseExceptionHandler(errorApp =>
- errorApp.Run(async context =>
- IPROBLEMDETAILS SERVICE BUT WITH EXCEPTIONHANDLERFEATURE
- else
- // If the response already started, we can't write our problem details
- }

Semantic transcript:
This source belongs to `EXHAND-R01` / global middleware / UseExceptionHandler. It supports `Exception Handlers` by documenting: Global exception middleware handles unhandled exceptions from later pipeline steps.

Operational reading:
- This is a source-level semantic transcript, not exact code punctuation.
- Use preserved Stage0 PNGs for exact line breaks, symbols, and C# punctuation.
- No OCR-timeout / image-missing / placeholder source is marked processed.
```

### S-007 - HASSTARTED EXPLAINATION

```text
Source theme:
HASSTARTED EXPLAINATION

Visible source anchors:
- HASSTARTED EXPLAINATION
- errorApp.Run(async context =>
- {
- app.UseExceptionHandler(errorApp =>
- // If the response already started, we can't write our problem details
- PLAIN USEEXCEPTIONHANDLER WITH ADDPROBLEMDETAILS
- IPROBLEMDETAILS SERVICE BUT WITH EXCEPTIONHANDLERFEATURE
- if (context.Response.HasStarted)

Semantic transcript:
This source belongs to `EXHAND-R01` / global middleware / UseExceptionHandler. It supports `Exception Handlers` by documenting: Global exception middleware handles unhandled exceptions from later pipeline steps.

Operational reading:
- This is a source-level semantic transcript, not exact code punctuation.
- Use preserved Stage0 PNGs for exact line breaks, symbols, and C# punctuation.
- No OCR-timeout / image-missing / placeholder source is marked processed.
```

### S-008 - var problemDetailsFactory = context.RequestServices.GetRequiredService<ProblemDetailsFactory>();

```text
Source theme:
var problemDetailsFactory = context.RequestServices.GetRequiredService<ProblemDetailsFactory>();

Visible source anchors:
- var problemDetailsFactory = context.RequestServices.GetRequiredService<ProblemDetailsFactory>();
- // You can map exception types to status codes if you want
- // Resolve ProblemDetailsFactory from DI
- var statusCode = StatusCodes.Status500InternalServerError;
- var ex = exceptionHandlerFeature?.Error;
- // Create ProblemDetails using the factory (consistent defaults)
- var exceptionHandlerFeature = context.Features.Get<IExceptionHandlerFeature>();
- var problem = problemDetailsFactory.CreateProblemDetails(

Semantic transcript:
This source belongs to `EXHAND-R01` / global middleware / UseExceptionHandler. It supports `Exception Handlers` by documenting: Global exception middleware handles unhandled exceptions from later pipeline steps.

Operational reading:
- This is a source-level semantic transcript, not exact code punctuation.
- Use preserved Stage0 PNGs for exact line breaks, symbols, and C# punctuation.
- No OCR-timeout / image-missing / placeholder source is marked processed.
```
