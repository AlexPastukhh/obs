# R01 — ASP.NET Core MVC display and editor templates final coverage transcript v001

Conspect: `editor,display templates`  
Source: `editor,display templates.svg`  
Stage: **stage-1 verified final coverage**

## 0. Area overview / key ideas / reading quality

Display and editor templates are reusable Razor fragments selected by type or explicit name through `DisplayFor` and `EditorFor`.

Reading quality: verified. The whole sheet is a single coherent region; all 5 image uses and 0 SVG text labels were reviewed against preserved source evidence.

## 1. What the templates are

Display and editor templates are Razor partial-like templates used by ASP.NET Core MVC's HTML helpers to render a model or property consistently.

- `@Html.DisplayFor(...)` selects a **display template**.
- `@Html.EditorFor(...)` selects an **editor template**.

The helper effectively says: render this value using the template for its type or the explicitly supplied template name.

## 2. Discovery locations

Templates live under:

```text
Views/Shared/DisplayTemplates/
Views/Shared/EditorTemplates/
```

or the corresponding controller-specific folders:

```text
Views/<Controller>/DisplayTemplates/
Views/<Controller>/EditorTemplates/
```

Controller-specific templates take precedence over shared fallback. A template can be named after the model/type (`Decimal.cshtml`, `Money.cshtml`) or selected explicitly by name.

## 3. Display templates

A display template renders read-only output. Example `Views/Shared/DisplayTemplates/Money.cshtml`:

```cshtml
@model decimal
@Model.ToString("C")
```

Usage:

```cshtml
@model Product
<p>Price: @Html.DisplayFor(m => m.Price, "Money")</p>
```

Explicit names avoid accidental global changes when many decimal properties should not all share the same formatting.

## 4. Editor templates

An editor template renders input controls and related markup consistently. Example `Views/Shared/EditorTemplates/Money.cshtml`:

```cshtml
@model decimal?

<input class="form-control"
       name="@ViewData.TemplateInfo.GetFullHtmlFieldName("")"
       value="@(Model?.ToString("0.00") ?? "")" />
```

Usage:

```cshtml
@Html.EditorFor(m => m.Price, "Money")
<span asp-validation-for="Price"></span>
```

Preserve the generated field prefix/name so nested objects and collections bind correctly. Validation messages and metadata should remain aligned with the property path.

## 5. Why use them

Templates provide:

- consistent formatting and controls across pages;
- less repeated Razor markup;
- centralized changes;
- reusable handling of complex/nested types;
- predictable conventions for display versus editing.

Use partial views when the reusable unit is a larger UI composition with its own explicit model. Use templates when rendering is naturally selected per property/type through the MVC templated helpers.

## 6. Coverage

```text
R01 processed image uses: 5
R01 processed text labels: 0
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
