# R04 - JsonPatch validation / upsert / ModelState ProblemDetails

Generated: 2026-06-13 09:03:25 UTC

## Core idea

JSON Patch and upsert flows often require custom validation.

The action may need to inspect the patch document, apply it, validate the resulting model and then return a ProblemDetails response from ModelState.

## JSON Patch validation

Before applying a patch, check whether the patch document is valid and acceptable for your API.

Possible checks:

```text
patch document exists
operations are allowed
paths are allowed
operation count/size is acceptable
system.text.json patch behavior is understood
```

If invalid, add errors to ModelState.

## Applying patch

A patch mutates a target model.

After patching, the model may violate validation rules.

So validation should happen after applying the patch:

```text
apply patch
TryValidateModel(target)
if ModelState invalid: return validation ProblemDetails
```

## Manual ModelState errors

Some JSON Patch libraries or custom rules may require adding errors manually.

Example:

```text
ModelState.AddModelError("path", "Operation is not allowed")
```

These errors should be returned in the same ProblemDetails shape as other validation errors.

## Upsert flow

The source road mentions upsert:

```text
if id missing -> create flow
else -> update flow as normal patch
```

This means the controller may branch:

```text
no id/resource missing -> create a new resource
id/resource exists -> patch/update existing resource
```

Both branches should use the same validation-response policy.

## Returning ProblemDetails from ModelState

The goal is consistency.

Whether errors come from:

```text
automatic validation
TryValidateModel
manual ModelState.AddModelError
patch validation
upsert rule validation
```

the response should look like the configured validation ProblemDetails response.

That is why P01's `InvalidModelStateResponseFactory` helper is important.

## Important caution

Do not return inconsistent validation formats from different branches.

Bad:

```text
automatic validation returns ProblemDetails
patch validation returns random custom object
upsert validation returns plain string
```

Good:

```text
all invalid ModelState responses use configured factory/problem details policy
```

## Boundary note

R04 closes the automatic ProblemDetails/ModelState conspect.

After R03/R04, the only remaining step is final coverage audit.
