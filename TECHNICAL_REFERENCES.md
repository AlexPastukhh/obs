# Technical references / verification notes

## ApiBehaviorOptions

The archive uses actual ASP.NET Core option property names:

```text
SuppressModelStateInvalidFilter
InvalidModelStateResponseFactory
SuppressInferBindingSourcesForParameters
DisableImplicitFromServicesParameters
SuppressConsumesConstraintForFormFileParameters
SuppressMapClientErrors
ClientErrorMapping
```

## Account activation

The archive flags code-level risks found in the source:

```text
128 random bytes -> 256 hex characters, conflicting with HasMaxLength(100)
not-found branch logs but does not return before `.Value`
success path should set ActivatedAt
GET activation has side-effect/idempotency concerns
HttpContext-based link generation is request-context dependent
raw activation codes should not be logged or ideally stored
```

Confirm framework behavior and project conventions against the exact ASP.NET Core and EF Core versions used in the repository.
