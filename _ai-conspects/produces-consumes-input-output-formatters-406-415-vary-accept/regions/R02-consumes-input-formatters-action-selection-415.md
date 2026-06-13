# R02 - Consumes / input formatters / action selection / 415

Generated: 2026-06-13 05:14:03 UTC

Image uses: 11

```text
S-011, S-012, S-013, S-014, S-022, S-023, S-024, S-025, S-026, S-027, S-032
```

## Core idea

`[Consumes]` is request-side metadata and constraint.

It says which request `Content-Type` an action accepts. It works with action selection and model binding/input-formatting.

A useful mental model:

```text
request body + Content-Type -> input formatter -> model parameter
Consumes metadata -> which action is allowed for that Content-Type
```

## Consumes and input formatters are different gates

The screenshots distinguish two related but separate cases:

```text
[Consumes] does not match Content-Type -> action/endpoint may not be selected
input formatter cannot read Content-Type -> 415 Unsupported Media Type
```

So `[Consumes]` is not itself the serializer. It is metadata/constraint. The input formatter is the code that reads the body.

## 415 Unsupported Media Type

`415` means the server does not support the request body media type for the selected endpoint/action.

Common reasons:

```text
Content-Type is absent where a body media type is required
Content-Type is not supported by any registered input formatter
[Consumes] restricts the action to another media type
route/action selection finds no compatible action for that Content-Type
```

The source screenshots show examples where the same route can be split by media type. In that case, `[Consumes]` helps choose the correct action.

## Action selection and ambiguity

When two actions have the same route and verb, `[Consumes]` can disambiguate them by request media type.

Example shape:

```csharp
[HttpPost]
[Consumes("application/vnd.company.a+json")]
public IActionResult CreateA(CreateA dto) => Ok();

[HttpPost]
[Consumes("application/vnd.company.b+json")]
public IActionResult CreateB(CreateB dto) => Ok();
```

The content type determines which action is a valid candidate.

If the request content type matches none, the result is not a random fallback. It is a failed media-type match, usually expressed as 415.

## Custom IActionConstraint

The canvas also notes `IActionConstraint`.

That is the lower-level hook behind custom action matching rules. You usually prefer `[Consumes]` when the rule is simply request media type. A custom constraint is for specialized routing/action-selection logic that does not fit built-in metadata.

## What Consumes does not do

`[Consumes]` does not deserialize the body by itself.

It also does not replace formatter registration.

Examples:

```text
JSON input requires JSON input formatter.
XML input requires XML input formatter registration.
Custom vendor media types often require formatter support or mapped media types.
```

## Practical checklist

Use `[Consumes]` when:

```text
an endpoint only accepts specific request media types
same route/verb has multiple actions separated by Content-Type
OpenAPI/Swagger should show accepted request body media types
you want explicit 415 behavior instead of ambiguous matching
```

Keep separate:

```text
[Produces] -> response media type / output formatter / Accept
[Consumes] -> request media type / input formatter / Content-Type
406 -> client requested unacceptable response media type
415 -> client sent unsupported request body media type
```

Detailed diagnostic customization for 406/415 is reserved for R03/P02.
