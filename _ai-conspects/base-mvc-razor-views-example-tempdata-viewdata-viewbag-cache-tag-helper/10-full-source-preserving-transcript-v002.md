# Full source-preserving transcript v002 — Base MVC Razor Views / TempData / ViewData / ViewBag / Tag Helpers

Generated: 2026-07-04 UTC

```text
unique embedded screenshots: 43
image uses: 43
native SVG text lines: 4
source coverage: 43 / 43
transcript mode: near-literal normalized
```

Exact typography and version-sensitive punctuation remain authoritative in the preserved SVG and screenshots.

## S-001 — Обзор tiny Products app

```text
source_id: S-001
image_hash: c84cdc382912
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Пример — маленькое Products CRUD-приложение: list, details, create, edit, delete.

Показывает layout, `_ViewStart`, `_ViewImports`, Tag Helpers, strongly typed views/ViewModels, DataAnnotations, validation summary, antiforgery, TempData flash, partials, View Component, ViewData title, `@section Scripts`, Environment Tag Helper, `<cache>` fragment caching и display template.

### Вопросы

1. Какие части относятся к validation?
2. Какие reusable UI mechanisms показаны?

---

## S-002 — Folder structure — application code

```text
source_id: S-002
image_hash: 7a84b6a5d7e0
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

```text
/Controllers/ProductsController.cs
/Models/Product.cs
/ViewModels/ProductEditVm.cs
/Services/IProductStore.cs
/Services/InMemoryProductStore.cs
/Components/FeaturedProductsViewComponent.cs
/Program.cs
```

### Вопросы

1. Где лежит View Component class?
2. Почему controller зависит от service interface?

---

## S-003 — Folder structure — views

```text
source_id: S-003
image_hash: e9b8f64ab60c
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

```text
/Views/Shared/_Layout.cshtml
/Views/Shared/_ViewImports.cshtml
/Views/Shared/_ViewStart.cshtml
/Views/Shared/_ValidationScriptsPartial.cshtml
/Views/Shared/DisplayTemplates/Money.cshtml
/Views/Shared/Components/FeaturedProducts/Default.cshtml
/Views/Products/Index.cshtml
/Views/Products/Details.cshtml
/Views/Products/Create.cshtml
/Views/Products/Edit.cshtml
/Views/Products/Delete.cshtml
/Views/Products/_ProductForm.cshtml
/Views/Products/_ProductRow.cshtml
```

### Вопросы

1. Где MVC ищет View Component view?
2. Почему partial names начинаются с underscore?

---

## S-004 — Domain model `Product`

```text
source_id: S-004
image_hash: fa2b21c533fe
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Модель содержит Id, Name, Price, Category, IsDiscontinued и CreatedUtc.

### Видимый код

```csharp
namespace MvcRazorDemo.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
    public string Category { get; set; } = "";
    public bool IsDiscontinued { get; set; }
    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
}
```

### Вопросы

1. Какие поля редактируются?
2. Почему CreatedUtc имеет default?

---

## S-005 — `ProductEditVm` с validation

```text
source_id: S-005
image_hash: 7444fd6896ce
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Edit ViewModel содержит nullable Id и поля формы. DataAnnotations ограничивают Name, Price и Category.

### Видимый код

```csharp
using System.ComponentModel.DataAnnotations;

namespace MvcRazorDemo.ViewModels;

public class ProductEditVm
{
    public int? Id { get; set; }

    [Required, StringLength(60)]
    public string Name { get; set; } = "";

    [Range(0.01, 100000)]
    public decimal Price { get; set; }

    [Required, StringLength(30)]
    public string Category { get; set; } = "";

    public bool IsDiscontinued { get; set; }
}
```

### Вопросы

1. Почему Id nullable?
2. Где metadata используется Razor helpers?

---

## S-006 — Built-in Tag Helpers — часть 1

```text
source_id: S-006
image_hash: 4aea8a6a72bb
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

AnchorTagHelper: `asp-action`, `asp-controller`, `asp-area`, `asp-route-id`, `asp-route-*`, `asp-all-route-data`, `asp-fragment`, `asp-host`, `asp-protocol`.

FormTagHelper: action/controller/area, route values, Razor Pages page/handler, `asp-antiforgery`, fragment.

InputTagHelper: `asp-for`, `asp-format`.

### Вопросы

1. Как передать route id?
2. Как FormTagHelper связан с antiforgery?

---

## S-007 — Controller constructor и store

```text
source_id: S-007
image_hash: ad0db910751a
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

`ProductsController` наследует `Controller`, получает `IProductStore` через constructor injection.

### Видимый код

```csharp
using Microsoft.AspNetCore.Mvc;
using MvcRazorDemo.Models;
using MvcRazorDemo.Services;
using MvcRazorDemo.ViewModels;

namespace MvcRazorDemo.Controllers;

public class ProductsController : Controller
{
    private readonly IProductStore _store;

    public ProductsController(IProductStore store)
        => _store = store;
}
```

### Вопросы

1. Какая dependency внедряется?
2. Почему readonly field?

---

## S-008 — ViewData, ViewBag, TempData — начало

```text
source_id: S-008
image_hash: eae9d0ba9f01
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

ViewData — `ViewDataDictionary`, lifetime текущий request, передаёт small UI values.

```csharp
ViewData["Title"] = "Edit";
return View(vm);
```

ViewBag — dynamic wrapper над той же ViewData, lifetime тот же.

```csharp
ViewBag.Title = "Edit";
```

### Вопросы

1. Отдельное ли это хранилище?
2. Почему не подходит для redirect?

---

## S-009 — Built-in Tag Helpers — часть 2

```text
source_id: S-009
image_hash: ac59eb8dbb1f
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

TextArea: `asp-for`.
Select/Option: `asp-for`, `asp-items`.
Label: `asp-for`.
ValidationMessage: `asp-validation-for`.
ValidationSummary: `asp-validation-summary` (`All`, `ModelOnly`, `None`).
Partial: `name`, `model`, `for`, `view-data`.
Environment: `include`, `exclude`.
Cache: expires и vary-by attributes.

### Вопросы

1. Как вывести ошибку поля?
2. Как передать model в partial?

---

## S-010 — GET Index, Details, Create

```text
source_id: S-010
image_hash: 4a4042ea9806
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Index задаёт title, получает список и опционально фильтрует category. Details возвращает product или NotFound. Create GET возвращает пустой ViewModel.

### Видимый код

```csharp
public IActionResult Index(string? category = null)
{
    ViewData["Title"] = "Products";
    var items = _store.GetAll();

    if (!string.IsNullOrWhiteSpace(category))
        items = items.Where(p =>
            p.Category.Equals(
                category,
                StringComparison.OrdinalIgnoreCase));

    return View(items);
}

public IActionResult Details(int id)
{
    var p = _store.Get(id);
    if (p is null) return NotFound();
    return View(p);
}

public IActionResult Create()
{
    ViewData["Title"] = "Create product";
    return View(new ProductEditVm());
}
```

### Вопросы

1. Когда применяется filter?
2. Почему Details может вернуть 404?

---

## S-011 — TempData flash после redirect

```text
source_id: S-011
image_hash: 44be710d4eab
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

TempData — `ITempDataDictionary`, переживает следующий request/redirect, используется для PRG flash messages и обычно backed by cookies.

```csharp
TempData["Flash"] = "Saved!";
return RedirectToAction("Index");
```

Rule: ViewData/ViewBag — same request; TempData — after redirect.

### Вопросы

1. Почему TempData должна быть маленькой?
2. Какой pattern использует flash?

---

## S-012 — Link, Script и Image Tag Helpers

```text
source_id: S-012
image_hash: 1bd44d09d144
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

LinkTagHelper/ScriptTagHelper поддерживают `asp-append-version` и CDN fallback attributes. ImageTagHelper главным образом добавляет `asp-append-version`.

Version query помогает cache busting.

### Вопросы

1. Зачем append version?
2. Какие helpers имеют fallback?

---

## S-013 — POST Create + PRG

```text
source_id: S-013
image_hash: 0c81fde5d294
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

POST проверяет ModelState, создаёт Product, добавляет его, пишет flash и redirects.

### Видимый код

```csharp
[HttpPost]
[ValidateAntiForgeryToken]
public IActionResult Create(ProductEditVm vm)
{
    if (!ModelState.IsValid)
        return View(vm);

    var p = new Product
    {
        Name = vm.Name,
        Price = vm.Price,
        Category = vm.Category,
        IsDiscontinued = vm.IsDiscontinued
    };

    _store.Add(p);
    TempData["Flash"] = $"Created product #{p.Id}";
    return RedirectToAction(nameof(Index));
}
```

### Вопросы

1. Почему invalid model возвращает view?
2. Зачем redirect после POST?

---

## S-014 — ViewBag/ViewData в той же view

```text
source_id: S-014
image_hash: 80226126dd84
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Значение, установленное action, доступно view, которую этот action возвращает.

### Видимый код

```csharp
public IActionResult Edit(int id)
{
    ViewBag.Title = "Edit product";
    return View();
}
```

### Вопросы

1. Каков lifetime ViewBag?
2. Что случится после redirect?

---

## S-015 — TempData доступна и в текущем request

```text
source_id: S-015
image_hash: 79ba0ad96071
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

TempData предназначена для следующего request, но значение можно прочитать в текущем request до redirect. Главное различие — lifetime across requests.

### Видимый код

```csharp
[HttpPost]
public IActionResult Save(ProductEditVm vm)
{
    TempData["Flash"] = "Saved!";
    return RedirectToAction("Index");
}

public IActionResult Index()
{
    return View();
}
```

### Вопросы

1. Можно ли прочитать TempData сразу?
2. Почему обычно используют redirect?

---

## S-016 — GET Edit

```text
source_id: S-016
image_hash: 882193fce964
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Action получает Product, возвращает NotFound при отсутствии, задаёт title и отображает domain model в `ProductEditVm`.

### Видимый код

```csharp
public IActionResult Edit(int id)
{
    var p = _store.Get(id);
    if (p is null) return NotFound();

    ViewData["Title"] = $"Edit #{p.Id}";
    var vm = new ProductEditVm
    {
        Id = p.Id,
        Name = p.Name,
        Price = p.Price,
        Category = p.Category,
        IsDiscontinued = p.IsDiscontinued
    };

    return View(vm);
}
```

### Вопросы

1. Почему model преобразуется в ViewModel?
2. Что происходит при unknown id?

---

## S-017 — POST Edit

```text
source_id: S-017
image_hash: 34244d1d3aa9
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

POST проверяет route id против vm.Id, validation, строит updated Product, обновляет store, пишет TempData и redirects.

### Видимый код

```csharp
[HttpPost]
[ValidateAntiForgeryToken]
public IActionResult Edit(int id, ProductEditVm vm)
{
    if (vm.Id != id) return BadRequest();

    if (!ModelState.IsValid)
        return View(vm);

    var updated = new Product
    {
        Id = id,
        Name = vm.Name,
        Price = vm.Price,
        Category = vm.Category,
        IsDiscontinued = vm.IsDiscontinued
    };

    if (!_store.Update(updated))
        return NotFound();

    TempData["Flash"] = $"Updated product #{id}";
    return RedirectToAction(nameof(Details), new { id });
}
```

### Вопросы

1. Почему сравнивают два id?
2. Куда выполняется redirect?

---

## S-018 — Вывод flash message

```text
source_id: S-018
image_hash: 14c7d2bef46f
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

```cshtml
@if (TempData["Flash"] is string msg)
{
    <div>@msg</div>
}
```

### Вопросы

1. Почему pattern matching удобен?
2. Что происходит с TempData после чтения?

---

## S-019 — Delete GET и POST

```text
source_id: S-019
image_hash: d334f7a98c1d
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

GET показывает confirmation. POST удаляет и redirects. `[ActionName("Delete")]` позволяет методу называться `DeleteConfirmed`.

### Видимый код

```csharp
public IActionResult Delete(int id)
{
    var p = _store.Get(id);
    if (p is null) return NotFound();
    return View(p);
}

[HttpPost, ActionName("Delete")]
[ValidateAntiForgeryToken]
public IActionResult DeleteConfirmed(int id)
{
    if (!_store.Delete(id)) return NotFound();

    TempData["Flash"] = $"Deleted product #{id}";
    return RedirectToAction(nameof(Index));
}
```

### Вопросы

1. Почему GET не удаляет?
2. Что делает ActionName?

---

## S-020 — Вызов View Component из layout

```text
source_id: S-020
image_hash: 556426cebf78
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

```cshtml
<aside>
    @await Component.InvokeAsync(
        "FeaturedProducts",
        new { count = 2 })
</aside>
```

### Вопросы

1. Как передаётся count?
2. Почему вызов await?

---

## S-021 — `FeaturedProductsViewComponent`

```text
source_id: S-021
image_hash: 278bc77287f7
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Component получает store, выбирает featured products и возвращает view.

### Видимый код

```csharp
using Microsoft.AspNetCore.Mvc;
using MvcRazorDemo.Services;

namespace MvcRazorDemo.Components;

public class FeaturedProductsViewComponent : ViewComponent
{
    private readonly IProductStore _store;

    public FeaturedProductsViewComponent(IProductStore store)
        => _store = store;

    public IViewComponentResult Invoke(int count = 2)
    {
        var featured = _store.GetFeatured(count);
        return View(featured);
    }
}
```

### Вопросы

1. Может ли component inject services?
2. Где ищется view?

---

## S-022 — Как работают View Components

```text
source_id: S-022
image_hash: 4a3eeddbadbd
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

View Component — mini-controller для reusable UI:

1. C# class выполняет data retrieval/logic.
2. Razor view рендерит HTML.

```cshtml
@await Component.InvokeAsync(
    "FeaturedProducts",
    new { count = 3 })
```

Partial выбирают, когда data уже есть и нужно reuse markup. View Component — когда UI piece имеет собственную data retrieval и logic.

### Вопросы

1. Когда выбрать partial?
2. Когда View Component?

---

## S-023 — `_ViewImports` и `_ViewStart`

```text
source_id: S-023
image_hash: 5d2c4f31ffa9
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

`_ViewImports` импортирует namespaces и MVC Tag Helpers. `_ViewStart` задаёт layout.

### Видимый код

```cshtml
@using MvcRazorDemo
@using MvcRazorDemo.Models
@using MvcRazorDemo.ViewModels
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
```

```cshtml
@{
    Layout = "_Layout";
}
```

### Вопросы

1. Что наследуют views?
2. Когда задаётся Layout?

---

## S-024 — Internal flow View Component

```text
source_id: S-024
image_hash: 22e4a6820540
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

1. Razor встречает `Component.InvokeAsync`.
2. MVC находит `FeaturedProductsViewComponent`.
3. Вызывает `Invoke`/`InvokeAsync`.
4. Метод возвращает result.
5. MVC рендерит `Views/Shared/Components/FeaturedProducts/Default.cshtml`.
6. HTML вставляется в parent output.

### Вопросы

1. Как сопоставляется class name?
2. Как называется default view?

---

## S-025 — View Component versus partial

```text
source_id: S-025
image_hash: 5799464ecf77
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

View Component запускает C# code и injects services. Partial преимущественно рендерит markup с переданной model. View Component имеет собственную discovery convention `Views/Shared/Components/...`.

### Вопросы

1. Что имеет собственную data retrieval?
2. Что проще для чистого markup reuse?

---

## S-026 — `_Layout.cshtml`: head, nav, flash

```text
source_id: S-026
image_hash: 9d5ff9ae390c
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Layout задаёт document shell, title, stylesheet, navigation и flash.

### Видимый код

```cshtml
<!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <title>@ViewData["Title"] - MvcRazorDemo</title>
    <link rel="stylesheet" href="~/css/site.css" />
</head>
<body>
<header>
    <nav>
        <a asp-controller="Products" asp-action="Index">Products</a>
        <a asp-controller="Products" asp-action="Create">Create</a>
    </nav>

    @if (TempData["Flash"] is string msg)
    {
        <div class="flash">@msg</div>
    }
</header>
```

### Вопросы

1. Как AnchorTagHelper строит links?
2. Где flash рендерится?

---

## S-027 — `RenderSection("Scripts", required: false)`

```text
source_id: S-027
image_hash: 959d0ceb6401
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Section — named placeholder в layout.

```cshtml
@RenderSection("Scripts", required: false)
```

View:

```cshtml
@section Scripts {
    <script src="..."></script>
}
```

Если view определяет section, content вставляется здесь. `required: false` означает отсутствие ошибки, если section нет.

### Вопросы

1. Что изменит required true?
2. Почему scripts ставят в конце body?

---

## S-028 — `RenderBody()`

```text
source_id: S-028
image_hash: 4a1469821bd4
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

`@RenderBody()` — placeholder, куда вставляется основной content view.

Layout — outer shell; View — page content; RenderBody — место вставки.

### Вопросы

1. Сколько RenderBody обычно?
2. Чем отличается от section?

---

## S-029 — Layout: body, Environment и sections

```text
source_id: S-029
image_hash: e880d1a742bc
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Layout вставляет View Component, `RenderBody`, environment-specific footer и optional Scripts section.

### Видимый код

```cshtml
<main>
    <aside>
        @await Component.InvokeAsync(
            "FeaturedProducts",
            new { count = 2 })
    </aside>
    <section>
        @RenderBody()
    </section>
</main>

<footer>
    <environment include="Development">
        <small>Development mode</small>
    </environment>
    <environment exclude="Development">
        <small>Production mode</small>
    </environment>
</footer>

@RenderSection("Scripts", required: false)
```

### Вопросы

1. Что делает Environment helper?
2. Где main view content?

---

## S-030 — Один RenderBody, дополнительные placeholders — sections

```text
source_id: S-030
image_hash: 335f38a54eb8
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Layout имеет один основной `RenderBody`. Для дополнительных named placeholders используются sections (`RenderSection`), а не второй RenderBody.

### Вопросы

1. Как создать CSS section?
2. Почему второй RenderBody не нужен?

---

## S-031 — `_ValidationScriptsPartial.cshtml`

```text
source_id: S-031
image_hash: d6a8002631ff
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Partial подключает jQuery, jQuery Validation и unobtrusive validation scripts через CDN.

### Видимый код

```cshtml
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.20.0/jquery.validate.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validation-unobtrusive/4.0.0/jquery.validate.unobtrusive.min.js"></script>
```

### Вопросы

1. Какая library читает data-val attributes?
2. Почему partial подключается через section?

---

## S-032 — Глобальные и per-page scripts

```text
source_id: S-032
image_hash: d2a9d682f53d
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Layout сначала подключает global scripts, затем optional per-page section.

### Видимый код

```cshtml
<script src="~/js/site.js"></script>
@RenderSection("Scripts", required: false)
```

### Вопросы

1. В каком порядке выполняются scripts?
2. Почему validation scripts не нужны каждой view?

---

## S-033 — Display template для денег

```text
source_id: S-033
image_hash: e358bf8352f9
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

`Views/Shared/DisplayTemplates/Money.cshtml`:

```cshtml
@model decimal
@Model.ToString("C")
```

Использование:

```cshtml
@Html.DisplayFor(m => m.Price, "Money")
```

### Вопросы

1. Где ищется template?
2. Как выбрать template явно?

---

## S-034 — Edit view и `@section Scripts`

```text
source_id: S-034
image_hash: 151bdd8d09c1
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Edit view содержит form и page-specific script section. Section content вставляется там, где находится `RenderSection`; обычный script вне section рендерится inline.

### Видимый код

```cshtml
@model ProductEditVm

<h1>Edit</h1>

<form asp-action="Edit" method="post">
    ...
</form>

@section Scripts {
    <script>
        console.log(
            "This runs after site.js and at end of body");
    </script>
}
```

### Вопросы

1. Где окажется section?
2. Чем отличается inline script?

---

## S-035 — View Component view

```text
source_id: S-035
image_hash: d739cb97747b
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Default view получает список Products и строит links на Details.

### Видимый код

```cshtml
@model IReadOnlyList<MvcRazorDemo.Models.Product>

<h3>Featured</h3>
<ul>
@foreach (var p in Model)
{
    <li>
        <a asp-controller="Products"
           asp-action="Details"
           asp-route-id="@p.Id">
            @p.Name
        </a>
    </li>
}
</ul>
```

### Вопросы

1. Как передаётся route id?
2. Почему model — list?

---

## S-036 — Products Index view

```text
source_id: S-036
image_hash: 34b70b1c297e
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Index показывает strongly typed list, GET filter, Create link, fragment cache и rows через partial.

### Видимый код

```cshtml
@model IReadOnlyList<MvcRazorDemo.Models.Product>
@{
    ViewData["Title"] = "Products";
}

<h1>Products</h1>

<form method="get" asp-action="Index">
    <label>Filter category:</label>
    <input name="category"
           value="@Context.Request.Query["category"]" />
    <button type="submit">Apply</button>
    <a asp-action="Index">Clear</a>
</form>

<p><a asp-action="Create">Create new</a></p>

<cache expires-after="@TimeSpan.FromSeconds(10)">
    <p><em>This paragraph is fragment-cached for 10 seconds.</em></p>
</cache>

<table>
    <tbody>
    @foreach (var p in Model)
    {
        <partial name="_ProductRow" model="p" />
    }
    </tbody>
</table>
```

### Вопросы

1. Что кэширует cache tag?
2. Как partial получает product?

---

## S-037 — Cache Tag Helper versus response caching

```text
source_id: S-037
image_hash: db3207f26ed6
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

`<cache>...</cache>` кэширует fragment server-rendered HTML и снижает повторную работу для части Razor page. Это важно для MVC/Razor, не pure JSON API.

`ResponseCache` — MVC attribute/filter metadata, а не Razor Tag Helper.

### Вопросы

1. Что является единицей cache?
2. Почему это не response cache?

---

## S-038 — `_ProductRow.cshtml` partial

```text
source_id: S-038
image_hash: 721ccdc21bb8
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Partial отображает row, discontinued marker, category, money template и Edit/Delete links.

### Видимый код

```cshtml
@model MvcRazorDemo.Models.Product

<tr>
    <td>@Model.Id</td>
    <td>
        <a asp-action="Details"
           asp-route-id="@Model.Id">@Model.Name</a>
        @if (Model.IsDiscontinued)
        {
            <strong>(discontinued)</strong>
        }
    </td>
    <td>@Model.Category</td>
    <td>@Html.DisplayFor(m => m.Price, "Money")</td>
    <td>
        <a asp-action="Edit"
           asp-route-id="@Model.Id">Edit</a> |
        <a asp-action="Delete"
           asp-route-id="@Model.Id">Delete</a>
    </td>
</tr>
```

### Вопросы

1. Какая часть использует display template?
2. Как строятся action links?

---

## S-039 — Что делает `asp-for`

```text
source_id: S-039
image_hash: 7bd0c1f48050
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

`asp-for` связывает helper со свойством model.

```cshtml
@model ProductEditVm

<label asp-for="Name"></label>
<input asp-for="Name" />
<span asp-validation-for="Name"></span>
```

Label получает `for`, input и validation используют field name и metadata.

### Вопросы

1. Что генерируется из metadata?
2. Что при rename property?

---

## S-040 — Shared form partial для Create/Edit

```text
source_id: S-040
image_hash: b3a4e1570aa2
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Partial показывает validation summary и поля Name, Category, Price.

### Видимый код

```cshtml
@model MvcRazorDemo.ViewModels.ProductEditVm

<div asp-validation-summary="ModelOnly"></div>

<div>
    <label asp-for="Name"></label>
    <input asp-for="Name" />
    <span asp-validation-for="Name"></span>
</div>

<div>
    <label asp-for="Category"></label>
    <input asp-for="Category" />
    <span asp-validation-for="Category"></span>
</div>

<div>
    <label asp-for="Price"></label>
    <input asp-for="Price" />
    <span asp-validation-for="Price"></span>
</div>
```

### Вопросы

1. Почему fields в partial?
2. Где находится form tag?

---

## S-041 — Attributes, генерируемые InputTagHelper

```text
source_id: S-041
image_hash: dfb3bbfdc5c7
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Для `<input asp-for="Name">` helper задаёт:

- `name="Name"` для model binding;
- `id="Name"`;
- current value;
- type на основе property type/annotations;
- client validation attributes.

Преимущества: strongly typed связь, automatic binding/validation, меньше manual HTML.

### Вопросы

1. Почему name важен для binding?
2. Откуда берётся input type?

---

## S-042 — Create view

```text
source_id: S-042
image_hash: 09e12c4521af
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Create view задаёт title, POST form, использует `_ProductForm`, Save/Cancel и validation scripts.

### Видимый код

```cshtml
@model MvcRazorDemo.ViewModels.ProductEditVm
@{
    ViewData["Title"] = "Create";
}

<h1>Create</h1>

<form asp-action="Create" method="post">
    <partial name="_ProductForm" model="Model" />
    <button type="submit">Save</button>
    <a asp-action="Index">Cancel</a>
</form>

@section Scripts {
    <partial name="_ValidationScriptsPartial" />
}
```

### Смысл

FormTagHelper для POST обычно автоматически генерирует antiforgery token. Не добавляйте второй token без необходимости.

### Вопросы

1. Кто генерирует antiforgery token?
2. Почему scripts в section?

---

## S-043 — Delete confirmation view

```text
source_id: S-043
image_hash: f3073749c329
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

View спрашивает подтверждение и отправляет POST Delete с route id.

### Видимый код

```cshtml
@model MvcRazorDemo.Models.Product
@{
    ViewData["Title"] = "Delete";
}

<h1>Delete product</h1>

<p>
    Are you sure you want to delete
    <strong>@Model.Name</strong>?
</p>

<form asp-action="Delete"
      asp-route-id="@Model.Id"
      method="post">
    <button type="submit">Yes, delete</button>
    <a asp-action="Details"
       asp-route-id="@Model.Id">No, go back</a>
</form>
```

### Вопросы

1. Почему delete POST?
2. Как id передаётся action?
