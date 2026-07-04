# Injecting services and inspecting request/user data in Razor — source-preserving transcript v002

Source:

```text
source/injecting into razor.svg
```

Coverage:

```text
screenshots: 3 / 3
native SVG text: 0
```

## S-001 — `@inject` in Razor

### Near-literal normalized transcript

`@inject` lets a Razor view receive a service from ASP.NET Core dependency injection. It is similar to constructor injection, but for a Razor view.

```cshtml
@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Antiforgery
@inject ILogger<MyView> Logger
```

You can inject any service registered in DI, for example:

- `IHttpContextAccessor` — rarely needed in views because Razor already exposes `Context` and `User`;
- `IUrlHelper` — usually Razor already exposes `Url`;
- `IAntiforgery` — token extraction/generation;
- localization services such as `IViewLocalizer` and `IStringLocalizer<T>`;
- application services such as `IProductStore`, `ICurrencyFormatter`, and feature-flag services.

Good practice: inject only small, view-friendly services for formatting, localization, feature flags, and similar presentation concerns.

Running database queries in a view is usually a design smell. Put complex/data-access work in a controller, view model, view component, or application service.

## S-002 — request/user inspection inside a Razor view

Razor MVC views have request and user access through `Context` and `User`.

```cshtml
<p>Path: @Context.Request.Path</p>

@if (User.Identity?.IsAuthenticated == true)
{
    <p>Hello @User.Identity.Name</p>
}
```

Important identities:

```text
Context == current HttpContext
User == HttpContext.User
```

A Razor/MVC features demo could additionally cover layouts, partials, view components, tag helpers, validation, sections, TempData/ViewData, and HTML helpers, but this screenshot focuses on request/user inspection.

## S-003 — should business logic be in a view?

Acceptable view decisions:

- show Login/Logout;
- display the user name;
- hide or show presentation links;
- show a banner depending on path/query;
- format/localize already-prepared data.

Not acceptable as the only enforcement:

- authorization/permission decisions;
- security checks;
- business rules;
- complex data retrieval.

Always enforce authorization in policies, controllers/endpoints, services, and `[Authorize]`-based infrastructure.

For complex logic/data, use a controller, prepared view model, view component, or service.
