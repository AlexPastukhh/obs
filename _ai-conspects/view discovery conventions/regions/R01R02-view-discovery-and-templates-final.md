# R01/R02 — View discovery conventions final coverage transcript v001

Conspect: `view discovery conventions`  
Source: `view discovery conventions.svg`  
Stage: **stage-1 verified final coverage**

## 0.1 Area overview / key ideas / reading quality

The sheet documents ASP.NET Core MVC conventions for locating Razor views, partial views, layouts, Area views, View Component views, Display Templates, and Editor Templates. It also shows how to bypass conventions with explicit paths or customize discovery globally.

Key ideas:

- `View()` without a name uses the action name.
- MVC checks controller-specific folders before shared folders.
- Partials follow similar rules but are commonly prefixed with `_`.
- Layouts are typically selected through `_ViewStart.cshtml` and found in controller or shared view locations.
- Areas introduce an Area-specific search root with fallback to global shared views.
- View Component templates have their own `Views/Shared/Components/...` convention.
- Display and Editor Templates provide reusable rendering/editing conventions for types or named templates.

Reading quality: high. All 13 screenshots are readable and there are no separate SVG text labels.

## 1. R01 — normal views, partials, layouts, Areas, and components

### Controller views

When an action returns `View()` with no explicit name, MVC uses the action name and commonly searches:

```text
Views/{Controller}/{Action}.cshtml
Views/Shared/{Action}.cshtml
```

For example, `ProductsController.Edit` maps first to `Views/Products/Edit.cshtml`, then falls back to `Views/Shared/Edit.cshtml`.

When code calls `View("Something")`, the same controller-specific then shared search pattern is applied for `Something.cshtml`. If no file is found, MVC throws a runtime error listing the searched locations.

### Partial views

Partial views use similar discovery rules. A partial named `_ProductRow` is typically found in:

```text
Views/{Controller}/_ProductRow.cshtml
Views/Shared/_ProductRow.cshtml
```

An explicit application-relative path, such as `~/Views/Shared/_ProductRow.cshtml`, bypasses discovery and uses that exact file.

### Layouts

`_ViewStart.cshtml` commonly assigns:

```csharp
@{
    Layout = "_Layout";
}
```

MVC then finds `_Layout.cshtml` using normal view locations, commonly including the current controller folder and `Views/Shared`. Most projects place the shared layout at `Views/Shared/_Layout.cshtml`.

### Areas

Areas add Area-specific locations. For Area `Admin`, controller `Users`, action `Index`, common search locations include:

```text
Areas/Admin/Views/Users/Index.cshtml
Areas/Admin/Views/Shared/Index.cshtml
Views/Shared/Index.cshtml
```

This lets Areas maintain their own controller and shared view sets while still falling back to global shared views.

### View Components

A component class such as `FeaturedProductsViewComponent` has component name `FeaturedProducts`. Its default view is conventionally located at:

```text
Views/Shared/Components/FeaturedProducts/Default.cshtml
```

Returning a named component view such as `View("Compact", model)` searches for `Compact.cshtml` under the component folder. Areas may also provide Area-specific component views under their own `Views/Shared/Components/...` path.

### Overriding conventions

A full or application-relative path can be returned directly:

```csharp
return View("~/Views/Shared/SpecialEdit.cshtml");
```

Applications can also customize view locations through Razor view engine options when a different folder structure is required.

## 2. R02 — Display Templates and Editor Templates

Display and Editor Templates are reusable Razor templates used by classic MVC HTML helpers:

```csharp
@Html.DisplayFor(...)
@Html.EditorFor(...)
```

They express a convention: whenever a value of a given type or a named template is displayed or edited, render it consistently.

### Display Templates

Display Templates render read-only UI. They commonly live in:

```text
Views/Shared/DisplayTemplates/
Views/{Controller}/DisplayTemplates/
```

A named template such as `Money.cshtml` can contain:

```csharp
@model decimal
@Model.ToString("C")
```

Usage:

```csharp
@Html.DisplayFor(m => m.Price, "Money")
```

Templates may also be named after a model type, such as `Decimal.cshtml`, allowing automatic selection. Explicit template names are often preferred when global type-based formatting would be surprising.

### Editor Templates

Editor Templates render editable UI and typically include input elements and validation markup. They commonly live in:

```text
Views/Shared/EditorTemplates/
Views/{Controller}/EditorTemplates/
```

A `Money.cshtml` editor can format a nullable decimal and preserve the correct field name through `ViewData.TemplateInfo.GetFullHtmlFieldName(...)`.

Usage:

```csharp
@Html.EditorFor(m => m.Price, "Money")
```

A richer editor may combine a currency selector, amount field, date picker, or domain-specific validation UI.

### Why templates are useful

- **Consistency:** prices, dates, phone numbers, and addresses look or edit the same way everywhere.
- **Less repetition:** formatting and form markup are not copied into every view.
- **Centralized changes:** changing one template updates all uses.

## 3. Discovery cheat sheet

```text
Normal view:
Views/{Controller}/{Action}.cshtml -> Views/Shared/{Action}.cshtml

Partial:
Views/{Controller}/_{Name}.cshtml -> Views/Shared/_{Name}.cshtml

Layout:
usually selected by _ViewStart.cshtml; commonly Views/Shared/_Layout.cshtml

Area view:
Areas/{Area}/Views/{Controller}/{Action}.cshtml
-> Areas/{Area}/Views/Shared/{Action}.cshtml
-> Views/Shared/{Action}.cshtml

View Component:
Views/Shared/Components/{Component}/Default.cshtml

Display Templates:
Views/{Controller}/DisplayTemplates/{Template}.cshtml
or Views/Shared/DisplayTemplates/{Template}.cshtml

Editor Templates:
Views/{Controller}/EditorTemplates/{Template}.cshtml
or Views/Shared/EditorTemplates/{Template}.cshtml
```

## 4. Coverage

```text
R01: 8 image uses
R02: 5 image uses
Total: 13 image uses
Remaining unclosed: 0
```
