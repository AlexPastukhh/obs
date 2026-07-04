# ApiBehaviorOptions — technical correction notice v002

## Correct property names

Use these exact names:

```csharp
SuppressInferBindingSourcesForParameters
DisableImplicitFromServicesParameters
SuppressConsumesConstraintForFormFileParameters
SuppressMapClientErrors
ClientErrorMapping
InvalidModelStateResponseFactory
SuppressModelStateInvalidFilter
```

The canvas contains shortened/typo variants such as:

```text
SuppressInferBindingSourcesFromParams
SuppressConsumesConstraintForFOrmFIleParams
```

Those are corrected in the transcript and code reference.

## ClientErrorMapping boundary

`ClientErrorMapping` mainly customizes per-status default metadata:

```csharp
ClientErrorMapping[status].Title
ClientErrorMapping[status].Link
```

It is not the right tool for validation field structure, detailed extensions, exception handling, or full custom envelopes.

## NotFound() versus NotFound(object)

```csharp
return NotFound();
```

is a candidate for MVC client-error mapping.

```csharp
return NotFound(new { message = "Product not found" });
```

already has an explicit body and is usually not replaced by the mapping path.
