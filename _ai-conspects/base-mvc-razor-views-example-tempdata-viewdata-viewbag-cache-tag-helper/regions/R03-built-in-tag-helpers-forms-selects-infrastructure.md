# R03 - Built-in Tag Helpers / forms / selects / infrastructure

Generated: 2026-06-13 08:06:22 UTC

Image uses: 10

```text
S-033, S-032, S-003, S-004, S-005, S-006, S-037, S-038, S-040, S-041
```

## Core idea

Tag Helpers let Razor views use HTML-like elements with server-side behavior.

They usually appear as `asp-*` attributes on normal HTML elements.

Mental model:

```text
Razor view contains tag helper attributes
Razor engine runs tag helpers during rendering
tag helper generates final HTML
browser receives normal HTML
```

Tag helpers are view-rendering tools. They are not middleware and they do not replace controllers or model binding.

## Why tag helpers are useful

Without tag helpers, Razor views often need many imperative helper calls.

Tag helpers keep markup closer to HTML while still connecting it to MVC metadata.

They can use:

```text
routing information
model expressions
validation metadata
static file versioning
environment conditions
partial rendering
form/action information
```

## Enabling tag helpers

Tag helpers are commonly made available through `_ViewImports.cshtml`.

Conceptual directive:

```text
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
```

This makes the built-in MVC tag helpers available to views under that folder tree.

If tag helpers are not imported, the `asp-*` attributes may remain plain HTML attributes and not produce the expected server-side output.

## Anchor Tag Helper

The Anchor Tag Helper builds links from routing information.

Typical attributes:

```text
asp-controller
asp-action
asp-route-*
asp-area
```

Benefit:

```text
links stay tied to MVC routes instead of hardcoded URLs
```

Example meaning:

```text
link to Products/Edit with product id
```

## Form Tag Helper

The Form Tag Helper builds a form action URL based on controller/action/route data.

Typical attributes:

```text
asp-controller
asp-action
asp-route-*
method
```

It also integrates with antiforgery behavior in common MVC form scenarios.

Use it when a form should post to a controller action without hardcoding the URL.

## Input / Label / TextArea Tag Helpers

These helpers bind HTML fields to model expressions.

Common attributes:

```text
asp-for
```

They use model metadata to generate names, ids, values and labels.

Example meaning:

```text
asp-for="Name" generates input metadata for Model.Name
```

This helps model binding because generated field names align with action parameters or view model properties.

## Select / Option Tag Helpers

The Select Tag Helper renders select boxes from model expressions and item lists.

Common attributes:

```text
asp-for
asp-items
```

Typical use:

```text
ProductEditVm has CategoryId
ProductEditVm has CategoryOptions
view renders select for CategoryId using CategoryOptions
```

This is why view models often contain both the selected value and the list of possible values.

## Validation Tag Helpers

Validation helpers connect views to ModelState and validation metadata.

Common helpers:

```text
ValidationMessage Tag Helper
ValidationSummary Tag Helper
```

Conceptually:

```text
POST form
model binding + validation
ModelState has errors
view returns same model
validation tag helpers render errors
```

This connects directly to R02 validation flow.

## Partial Tag Helper

The Partial Tag Helper renders a partial view.

Good fit:

```text
small reusable UI fragment
same data already available
simple shared markup
```

When the fragment needs its own data loading or service logic, a view component may be better.

## Environment / static asset helpers

Environment-related helpers render content conditionally based on environment.

Static asset helpers can help with cache-busting/versioning.

Typical examples:

```text
development script
production/minified script
append file version to CSS/JS/image URL
```

## Practical checklist

Use tag helpers when:

```text
markup should stay HTML-like
you need route-aware links/forms
inputs should bind to model expressions
validation errors should render from ModelState
select lists should bind to view model values
partials/static assets/environment-specific markup should stay declarative
```

Avoid:

```text
business logic in views
large conditional workflows in markup
hardcoded URLs when route-aware helpers are available
using ViewBag instead of proper view model for select items
```

## Boundary note

R03 covers the generic built-in helpers and infrastructure.

R04 covers Cache Tag Helper, view components, display templates and worked UI helper examples.
