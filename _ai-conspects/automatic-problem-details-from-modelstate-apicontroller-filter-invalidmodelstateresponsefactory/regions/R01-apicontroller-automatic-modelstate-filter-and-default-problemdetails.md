# R01 - ApiController automatic ModelState filter and default ProblemDetails

## Core idea

`[ApiController]` enables automatic behavior for API controllers.

One key behavior:

```text
if ModelState is invalid before action logic
ASP.NET Core automatically returns a 400 response
```

The response is usually a validation problem details payload.

## ModelState

`ModelState` stores model binding and validation errors.

Errors can come from:

```text
failed binding
data annotation validation
non-nullable reference type required behavior
manual ModelState.AddModelError
```

When `[ApiController]` is active, invalid ModelState is handled automatically before the action body runs.

## Automatic 400

The automatic filter prevents boilerplate in every action:

```text
if (!ModelState.IsValid)
    return BadRequest(ModelState);
```

With `[ApiController]`, this check is normally implicit.

This keeps controller actions focused on valid input.

## Default ProblemDetails shape

The default invalid ModelState response is a validation problem details response.

Common fields:

```text
type
title
status
traceId
errors
```

The `errors` object maps field names to validation messages.

## Implicit required behavior

With nullable reference types, non-nullable properties can behave as if they are required.

This means a missing non-nullable property may create ModelState validation errors even without an explicit `[Required]` attribute.

This behavior is often surprising, so it must be remembered when debugging automatic validation errors.

## When automatic behavior is enough

Automatic ModelState responses are enough when:

```text
validation is standard
error format can stay default
action should not run on invalid input
you do not need custom pre-response logic
```

## When customization is needed

Customization is needed when:

```text
you want a custom error body
you need a custom status code or title
you need logging/metrics
you need a different validation contract
you must run custom rules before returning invalid response
```

Customization is usually done with `InvalidModelStateResponseFactory`.

## Boundary note

R01 covers `[ApiController]` automatic invalid ModelState behavior.

R02 covers using `InvalidModelStateResponseFactory` and manually invoking the current configured response behavior.
