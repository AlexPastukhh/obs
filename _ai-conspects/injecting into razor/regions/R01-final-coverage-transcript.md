# injecting into razor — final coverage transcript v001

Source SVG: `injecting into razor.svg`  
Conspect folder: `injecting into razor`  
Stage: combined ten-conspect final coverage

## R01 — injecting services and request data into Razor

Razor views and pages can resolve registered services with `@inject`:

```cshtml
@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Antiforgery
@inject ILogger<MyView> Logger
@inject IViewLocalizer Localizer
```

The directive creates a property in the generated Razor class. It is analogous to constructor injection, but specifically for Razor-generated types. Shared directives can be placed in `_ViewImports.cshtml` when many views need the same service.

Reasonable view-facing dependencies include localization, formatting, feature flags, antiforgery helpers and small read-only presentation services. Although any registered service can technically be injected, database queries and domain workflows in a view are a design smell; prepare data in the controller/page model/view model or a view component.

Razor already exposes request/user information:

```cshtml
<p>Path: @Context.Request.Path</p>
@if (User.Identity?.IsAuthenticated == true)
{
    <p>Hello @User.Identity.Name</p>
}
```

`Context` is the current `HttpContext`, and `User` is `HttpContext.User`. This is useful for presentation decisions such as showing account links or a banner.

Do not treat hiding UI as authorization. Permissions must still be enforced in endpoints with authorization policies, attributes or explicit authorization services.

`IHttpContextAccessor` is rarely needed inside the view because `Context` and `User` are already available. `IUrlHelper` is usually available as `Url`. Inject only when an explicit abstraction is required.

## Coverage

```text
R01 processed image uses: 3
R01 processed text labels: 0
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
