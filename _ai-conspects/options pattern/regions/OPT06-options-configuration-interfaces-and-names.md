# OPT06 — IConfigureOptions, IPostConfigureOptions, and IConfigureNamedOptions

Status: **verified correction transcript v001**  
Restored sources: **S-087..S-091 (5 image uses)**

## Choosing the interface

- `IConfigureOptions<TOptions>` applies normal/default configuration.
- `IPostConfigureOptions<TOptions>` adjusts or finalizes values after all normal configuration has run.
- `IConfigureNamedOptions<TOptions>` configures different instances of the same type according to the options name.

A normal configurer can set defaults, while a post-configurer can enforce final invariants:

```csharp
public sealed class ConfigureMyOptions : IConfigureOptions<MyOptions>
{
    public void Configure(MyOptions options)
        => options.TimeoutSeconds = 30;
}

public sealed class PostConfigureMyOptions : IPostConfigureOptions<MyOptions>
{
    public void PostConfigure(string? name, MyOptions options)
    {
        if (options.TimeoutSeconds < 1)
            options.TimeoutSeconds = 1;
    }
}
```

`IConfigureNamedOptions<TOptions>` is the class-based counterpart of named fluent registrations. Its `Configure(string? name, TOptions options)` method can apply different values to `"Primary"` and `"Secondary"`, while `Configure(TOptions options)` handles the unnamed/default instance. `IOptionsSnapshot<T>` and `IOptionsMonitor<T>` can retrieve named instances with `Get(name)`; plain `IOptions<T>` exposes only the default value.

## Source-by-source verification

| Source | Summary | Evidence |
|---|---|---|
| S-087 | Interface selection: IConfigureOptions for normal/default configuration, IPostConfigureOptions for finalization, IConfigureNamedOptions for named instances. | `audit-assets/correction-missing-images/S-087_36bc9251de.png` |
| S-088 | Example normal and post-configure classes for MyOptions, including a final minimum timeout safeguard. | `audit-assets/correction-missing-images/S-088_a09c43bcdd.png` |
| S-089 | IConfigureNamedOptions configures the same options type differently by name; Snapshot/Monitor can resolve names through Get(name). | `audit-assets/correction-missing-images/S-089_b3bbf61a1b.png` |
| S-090 | MyOptions and MyNamedOptionsSetup example implementing IConfigureNamedOptions<MyOptions>. | `audit-assets/correction-missing-images/S-090_17e3872d80.png` |
| S-091 | Named Configure method applies Primary/Secondary endpoints and timeouts, while Configure(options) handles the default unnamed instance. | `audit-assets/correction-missing-images/S-091_003dd25891.png` |
