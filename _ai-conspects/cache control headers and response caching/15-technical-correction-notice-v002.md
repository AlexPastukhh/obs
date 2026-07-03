# Cache-Control conspect — technical correction notice v002

## Revoked statement 1

Old integrated example applied two `ResponseCacheAttribute` instances to one action.

The attribute declaration uses:

```csharp
[AttributeUsage(
    AttributeTargets.Class | AttributeTargets.Method,
    AllowMultiple = false,
    Inherited = true)]
```

Use one attribute or move values into one cache profile.

## Revoked statement 2

Old text treated `ResponseCacheLocation.None` as a no-storage guarantee.

Actual filter behavior maps `None` to `no-cache`; storage remains possible, but validation is required before reuse. `NoStore = true` is the storage-prohibition switch.

## Official implementation references

- `dotnet/aspnetcore`, `ResponseCacheAttribute.cs`
- `dotnet/aspnetcore`, `ResponseCacheFilterExecutor.cs`

## Authority

For study and questions, use:

```text
11-corrected-code-preserving-transcript-v002.md
12-code-and-header-reference-v002.md
13-repetition-guide-v002.md
14-question-bank-v002.md
```
