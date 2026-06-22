# R01 - Base MVC/Razor Products app / views / layouts

Generated: 2026-06-13 08:04:08 UTC

Image uses: 13

```text
S-012, S-013, S-014, S-015, S-016, S-017, S-018, S-019, S-020, S-021, S-022, S-023, S-024
```

## Core idea

This region is the base MVC/Razor example around a small Products app.

The main flow is:

```text
request URL
controller action runs
action prepares model or view model
action returns View(...)
Razor view renders HTML
layout/partials/components provide shared UI
```

The important separation:

```text
controller = request handling and choosing view/data
model/view model = data shape passed to view
Razor view = HTML template plus C# expressions
layout/partials/components = reusable view structure
```

## Views folder convention

MVC views usually live under:

```text
Views/<ControllerName>/<ActionName>.cshtml
```

Example:

```text
ProductsController.Index -> Views/Products/Index.cshtml
ProductsController.Edit  -> Views/Products/Edit.cshtml
```

Shared views and reusable view files can live under:

```text
Views/Shared
```

This is where layouts, shared partials and shared display/editor templates are commonly placed.

## Layout

A layout is the common page shell.

Typical layout responsibilities:

```text
html/head/body structure
shared CSS/script references
header/nav/footer
RenderBody placeholder
optional sections
```

A Razor view can use a layout so every page does not duplicate the same full HTML structure.

## _ViewStart

`_ViewStart.cshtml` runs before a view and is often used to set the default layout.

Typical meaning:

```text
all views in this folder tree use this layout unless overridden
```

It keeps each individual view cleaner because the layout does not need to be repeated in every file.

## _ViewImports

`_ViewImports.cshtml` centralizes Razor imports and directives.

Common uses:

```text
@using namespaces
@addTagHelper directives
@namespace
@inject shared services
```

The important practical effect is that views can use common types and tag helpers without repeating imports everywhere.

## Strongly typed views

A strongly typed view declares the model type it expects.

Conceptual shape:

```text
view declares model type
controller passes instance of that type
view uses Model.Property
```

This is better than pushing main page data through ViewData/ViewBag because it is typed and discoverable.

## View models

A view model is a shape built specifically for the view.

Use it when the domain model alone is not enough.

Examples:

```text
ProductEditVm
ProductDetailsVm
ProductListVm
```

View models can combine:

```text
product data
select-list items
UI flags
validation-friendly fields
extra display metadata
```

## Partials

A partial view is a reusable piece of Razor markup.

Good fit:

```text
repeated product card
shared form fragment
small UI block without separate logic
```

Partials are best when the parent already has the data needed to render them.

## View components

A view component is stronger than a partial because it can run its own logic before rendering.

Good fit:

```text
cart summary
sidebar menu
top products widget
user/profile panel
```

A view component is useful when the UI fragment needs its own data retrieval or preparation.

## Boundary note

R01 covers the base MVC/Razor view structure.

R02 covers ViewData/ViewBag/TempData and validation flow. P02 covers tag helpers, cache tag helper, display templates and helper infrastructure.
