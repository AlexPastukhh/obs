# R03 - TryValidateModel / custom manual validation flow

Generated: 2026-06-13 09:03:25 UTC

## Core idea

Sometimes standard model binding and data annotations are not enough.

You may need to run custom rules, then add ModelState errors manually.

But with `[ApiController]`, automatic invalid ModelState response can happen before the action logic runs.

So the design must choose when automatic validation should run and when manual validation should control the response.

## TryValidateModel

`TryValidateModel` runs validation manually for an object.

Conceptually:

```text
build or mutate model
call TryValidateModel(model)
inspect ModelState
return configured invalid response if needed
```

This is useful when the object is created or modified inside the action rather than directly bound once from the request.

## Custom rules

Custom business rules may invalidate input after basic binding succeeds.

Examples:

```text
date range invalid
combination of fields not allowed
resource state forbids operation
patch document created invalid object
upsert rule fails
```

These errors can be added with:

```text
ModelState.AddModelError(...)
```

## Automatic response concern

If `[ApiController]` automatic ModelState response is still active, the action may not run when ModelState is already invalid.

That is good for normal validation, but bad when the action needs to do custom validation before deciding the response.

In those cases, the automatic response may need to be suppressed or bypassed for that action/path.

## Manual invalid response

After adding custom errors, you still want the same response format as automatic validation.

That connects back to P01:

```text
use current InvalidModelStateResponseFactory
build ActionContext
return the configured invalid ModelState response
```

This keeps automatic and manual validation responses consistent.

## Flow

A common manual validation flow:

```text
receive input
perform custom transformation or patch
run TryValidateModel if needed
add custom ModelState errors
if ModelState invalid:
    return configured invalid ModelState response
continue normal action
```

## Boundary note

R03 covers manual validation control.

R04 covers JSON Patch validation, upsert flow and returning ProblemDetails from ModelState.
