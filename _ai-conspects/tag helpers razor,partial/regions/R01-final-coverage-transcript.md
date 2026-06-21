# tag helpers razor,partial — final coverage transcript v001

Source SVG: `tag helpers razor,partial.svg`  
Conspect folder: `tag helpers razor,partial`  
Stage: combined ten-conspect final coverage

## R01 — built-in Razor tag helpers and partials

Tag Helpers add server-side behavior to ordinary-looking HTML. They generate URLs, names, validation metadata, antiforgery tokens and cache-busting values from ASP.NET Core metadata.

### Navigation and forms

`AnchorTagHelper` commonly uses:

```text
asp-action, asp-controller, asp-area
asp-route-<name>, asp-all-route-data
asp-page, asp-page-handler
asp-fragment
asp-protocol, asp-host
```

`FormTagHelper` uses similar action/controller/area/page/route attributes and can generate an antiforgery field. Do not combine a manually fixed `href`/`action` with competing route-generation attributes unless the resulting precedence is understood.

### Form controls

```text
InputTagHelper      <input asp-for="..." asp-format="...">
TextAreaTagHelper   <textarea asp-for="..."></textarea>
SelectTagHelper     <select asp-for="..." asp-items="..."></select>
OptionTagHelper     option selection support
LabelTagHelper      <label asp-for="..."></label>
```

`asp-for` reads model metadata and builds `name`, `id`, current value and validation attributes. `asp-format` controls formatting; it does not change the underlying model type.

Validation helpers:

```text
<span asp-validation-for="..."></span>
<div asp-validation-summary="All|ModelOnly|None"></div>
```

### PartialTagHelper

```cshtml
<partial name="_Order" model="Model.Order" />
<partial name="_Editor" for="Customer" />
```

Important inputs are `name`, `model`, `for`, and `view-data`. `model` supplies an explicit object. `for` is a model expression and retains metadata/prefix information. Partials are for rendering reusable markup; complex independent behavior may be better represented by a view component.

### Environment, cache and assets

`EnvironmentTagHelper` conditionally renders content with `include`/`exclude` environment names.

`CacheTagHelper` supports expiration and variation controls such as:

```text
expires-after, expires-on, expires-sliding
vary-by-route, vary-by-query, vary-by-user
```

Link, script and image tag helpers can use `asp-append-version="true"`. ASP.NET Core calculates a content hash and appends it as a query value, producing fingerprinted/cache-busted asset URLs. Link/script helpers also support CDN fallback attributes.

### Quick rules

```text
- Use asp-all-route-data for a dictionary of route values.
- Use asp-fragment for the URL #fragment.
- Use asp-area when generating an Area URL.
- Prefer tag helpers over hand-concatenating URLs.
- Treat partials as rendering units, not endpoint/business-logic containers.
```

## Coverage

```text
R01 processed image uses: 3
R01 processed text labels: 11
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
