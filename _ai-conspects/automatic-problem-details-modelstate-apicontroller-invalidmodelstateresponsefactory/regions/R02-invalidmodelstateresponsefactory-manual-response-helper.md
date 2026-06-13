# R02 - InvalidModelStateResponseFactory manual response helper

## Core idea

`InvalidModelStateResponseFactory` is the central callback that builds the response for invalid ModelState when `[ApiController]` automatic validation triggers.

It lets the application customize the invalid-model response once.

## Configuration point

The factory is configured through API behavior options.

Conceptually:

```text
services configure ApiBehaviorOptions
InvalidModelStateResponseFactory = context => custom response
```

The callback receives an `ActionContext`.

The context contains:

```text
ModelState
HttpContext
RouteData
ActionDescriptor
```

## Why use the factory

Use it to standardize validation error responses.

Examples:

```text
custom ProblemDetails title
custom error envelope
logging
metrics
adding trace/request metadata
changing status code policy
```

This is better than writing custom validation response code in every controller action.

## Manual helper idea

Sometimes you suppress or bypass automatic validation and still want to return the same configured invalid ModelState response manually.

The helper pattern is:

```text
create or reuse ActionContext
call the configured InvalidModelStateResponseFactory
return its result
```

This avoids duplicating response-building logic.

## Why ActionContext matters

The factory expects action context because it needs the same information the automatic filter would have.

Important pieces:

```text
HttpContext for request services and trace id
RouteData for endpoint/controller context
ActionDescriptor for action metadata
ModelState for validation errors
```

If a manual helper constructs an incomplete context, the response may miss expected details.

## Current-config behavior

The strongest helper design uses the current configured factory.

That means:

```text
global customization still applies
manual responses match automatic responses
future factory changes affect both paths
```

This is better than hardcoding `BadRequest(ModelState)` manually.

## Typical helper usage

A service or controller adds errors:

```text
ModelState.AddModelError("Name", "Name is required")
```

Then returns:

```text
return InvalidModelStateResponseFactory(actionContext)
```

The exact wrapper can be hidden in a helper method to keep actions clean.

## Boundary note

R02 closes P01 by covering customized/manual invalid ModelState responses.

P02 should cover `TryValidateModel`, custom manual validation, JsonPatch validation and upsert/create/update flows.
