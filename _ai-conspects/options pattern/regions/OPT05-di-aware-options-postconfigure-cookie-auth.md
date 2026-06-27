# OPT05 — DI-aware options configuration, PostConfigure, and cookie authentication named options

Status: **verified correction transcript v001**  
Restored sources: **S-057..S-086 (30 image uses)**

## Core model

ASP.NET Core does not build a fresh unrelated options object for each registration. For a given options type and name, `IOptionsFactory<TOptions>` creates one instance and runs the matching configuration pipeline:

1. create `TOptions`;
2. run matching `IConfigureOptions<TOptions>` / `IConfigureNamedOptions<TOptions>` actions;
3. run every `IPostConfigureOptions<TOptions>` action;
4. validate and return/cache the final instance.

For cookie authentication the scheme name (for example `"Cookies"`) is also the options name. The cookie handler ultimately reads the named instance through `IOptionsMonitor<CookieAuthenticationOptions>.Get("Cookies")`.

## Injecting services into options configuration

There are two valid approaches:

- use `AddOptions<TOptions>(name).Configure<TDependency>((options, dependency) => ...)` or the corresponding DI-aware `PostConfigure` overload;
- implement `IConfigureOptions<TOptions>` / `IPostConfigureOptions<TOptions>` as a class and inject dependencies through its constructor.

Do **not** call `BuildServiceProvider()` inside service registration. That creates a second container and can split singleton lifetimes, caching and disposal.

```csharp
builder.Services.AddSingleton<ITicketStore, DistributedCacheTicketStore>();

builder.Services
    .AddOptions<CookieAuthenticationOptions>("Cookies")
    .Configure<ITicketStore>((options, ticketStore) =>
    {
        options.SessionStore = ticketStore;
    });
```

A class-based finalizer is useful when ordering matters:

```csharp
public sealed class PostConfigureCookieTicketStore
    : IPostConfigureOptions<CookieAuthenticationOptions>
{
    private readonly string _scheme;
    private readonly ITicketStore _store;

    public PostConfigureCookieTicketStore(string scheme, ITicketStore store)
    {
        _scheme = scheme;
        _store = store;
    }

    public void PostConfigure(string? name, CookieAuthenticationOptions options)
    {
        if (string.Equals(name, _scheme, StringComparison.Ordinal))
            options.SessionStore = _store;
    }
}
```

## Configure versus PostConfigure

`Configure` performs normal configuration. `PostConfigure` runs after all normal configuration actions and is intended for final defaults, compatibility fixes and values that depend on the final state. Both stages can be DI-aware.

Multiple registrations mutate the same named instance:

- different properties combine;
- when two actions set the same property, the later action wins;
- `AddCookie("Cookies", ...)` and `AddOptions<CookieAuthenticationOptions>("Cookies")...` participate in the same `"Cookies"` pipeline.

`services.Configure<TOptions>(name, ...)` also supports named options. `AddOptions` is preferred when its fluent name/type selection and DI-aware generic overloads make the registration clearer.

## Cookie ticket-store operational notes

The restored material also calls out ticket lifetime, sliding expiration and Data Protection key persistence/rotation. A server-side `ITicketStore` does not remove the need to align stored-ticket lifetime with cookie lifetime and to persist the Data Protection key ring across restarts/instances.

## Source-by-source verification

| Source | Summary | Evidence |
|---|---|---|
| S-057 | Operational gotchas for cookie ticket storage: ticket expiry, sliding expiration and Data Protection key rotation. | `audit-assets/correction-missing-images/S-057_e32a6b6042.png` |
| S-058 | IPostConfigureOptions implementation assigns an injected ticket store to CookieAuthenticationOptions.SessionStore for the matching scheme. | `audit-assets/correction-missing-images/S-058_01948fe05f.png` |
| S-059 | PostConfigureCookieTicketStore helper class stores scheme and ITicketStore dependencies and implements named post-configuration. | `audit-assets/correction-missing-images/S-059_f7e1cdf6f4.png` |
| S-060 | Correct DI registration avoids BuildServiceProvider: register ticket store and construct IPostConfigureOptions from the real service provider. | `audit-assets/correction-missing-images/S-060_d8fa6ef3dd.png` |
| S-061 | IConfigureOptions runs normal configuration; IPostConfigureOptions runs afterward to finalize the options instance. | `audit-assets/correction-missing-images/S-061_53c9c08a4c.png` |
| S-062 | Options factory pipeline: create options, run matching configure actions, run post-configure actions, then return final options. | `audit-assets/correction-missing-images/S-062_da6034d093.png` |
| S-063 | services.PostConfigure registers an IPostConfigureOptions action; example finalizes cookie sliding expiration and lifetime. | `audit-assets/correction-missing-images/S-063_d6dba72c2b.png` |
| S-064 | Named options matter for authentication schemes; post-configuration is commonly used for auth handlers, defaults, compatibility patches and validation. | `audit-assets/correction-missing-images/S-064_446784109d.png` |
| S-065 | Options-pattern participants: IOptions, IOptionsSnapshot, IOptionsMonitor, Configure and PostConfigure. | `audit-assets/correction-missing-images/S-065_bb437580a1.png` |
| S-066 | Why PostConfigure is preferable to BuildServiceProvider: avoid a second DI container and use constructor injection in a post-configurer. | `audit-assets/correction-missing-images/S-066_d039b56612.png` |
| S-067 | Registration example using a real ITicketStore and PostConfigure/implementation class for CookieAuthenticationOptions. | `audit-assets/correction-missing-images/S-067_66a501ead2.png` |
| S-068 | Any options type can participate in post-configuration through IPostConfigureOptions<TOptions>. | `audit-assets/correction-missing-images/S-068_8be8941a40.png` |
| S-069 | Examples of built-in options types that can be post-configured: cookie, JWT bearer, authorization, CORS, MVC, Kestrel, forwarded headers, HTTP, antiforgery, session, JSON and custom options. | `audit-assets/correction-missing-images/S-069_0d5a82d330.png` |
| S-070 | Cookie authentication is a named-options scenario created by AddAuthentication().AddCookie("Cookies", ...). | `audit-assets/correction-missing-images/S-070_dd8bcb7b2b.png` |
| S-071 | The cookie handler resolves IOptionsMonitor<CookieAuthenticationOptions>.Get("Cookies"); named Configure/PostConfigure actions participate in that pipeline. | `audit-assets/correction-missing-images/S-071_f531c9026f.png` |
| S-072 | AddCookie plus AddOptions<CookieAuthenticationOptions>("Cookies").Configure<ITicketStore> injects a service into inline configuration. | `audit-assets/correction-missing-images/S-072_7a4a366ef3.png` |
| S-073 | DI-aware Configure overloads resolve ITicketStore and invoke the delegate; IPostConfigureOptions is not required merely to access DI. | `audit-assets/correction-missing-images/S-073_36e32d9798.png` |
| S-074 | Conceptual behavior of a DI-aware configure overload: resolve dependency then execute configureAction(options, dependency). | `audit-assets/correction-missing-images/S-074_40019ed2bc.png` |
| S-075 | OptionsBuilder exposes Configure<TDep> and multi-dependency overloads specifically for DI-aware options configuration. | `audit-assets/correction-missing-images/S-075_e590ad763d.png` |
| S-076 | PostConfigure differs mainly by ordering: it runs after normal Configure actions; both stages can be DI-aware. | `audit-assets/correction-missing-images/S-076_3575d7049e.png` |
| S-077 | AddCookie and later AddOptions configuration contribute to the same named CookieAuthenticationOptions instance rather than replacing the whole object. | `audit-assets/correction-missing-images/S-077_b2c3d5c20b.png` |
| S-078 | Combined example: AddCookie sets name/lifetime and named PostConfigure sets SessionStore on the same options instance. | `audit-assets/correction-missing-images/S-078_53c7b7250c.png` |
| S-079 | Configuration steps combine when they set different properties; for the same property, the later action wins. | `audit-assets/correction-missing-images/S-079_7efe175fc6.png` |
| S-080 | AddOptions is convenient for named authentication options and provides an explicit fluent options-builder API. | `audit-assets/correction-missing-images/S-080_965b6bf1ea.png` |
| S-081 | Named AddOptions clearly selects the options type, name and post-configuration stage. | `audit-assets/correction-missing-images/S-081_6f5b6ac5ec.png` |
| S-082 | services.Configure<TOptions>(name, ...) and PostConfigure overloads also support named options; AddOptions is not the only route. | `audit-assets/correction-missing-images/S-082_d47c73b46a.png` |
| S-083 | Why use AddOptions: fluent naming, DI-aware generic overloads and a cohesive builder chain. | `audit-assets/correction-missing-images/S-083_3bba805e53.png` |
| S-084 | Plain services.Configure/PostConfigure overloads normally accept delegates over TOptions, not the inline DI-aware delegate form. | `audit-assets/correction-missing-images/S-084_8b3e16dee8.png` |
| S-085 | Recommended inline DI-aware pattern for assigning ITicketStore to SessionStore through OptionsBuilder.Configure<ITicketStore>. | `audit-assets/correction-missing-images/S-085_a2852ac8b6.png` |
| S-086 | Precise alternatives: use AddOptions for inline DI-aware configuration, or inject dependencies into IConfigureOptions/IPostConfigureOptions classes. | `audit-assets/correction-missing-images/S-086_6a03f590b8.png` |
