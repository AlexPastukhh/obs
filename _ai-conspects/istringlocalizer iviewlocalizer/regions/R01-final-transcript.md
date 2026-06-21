# IStringLocalizer<T> and IViewLocalizer

Source conspect: `istringlocalizer iviewlocalizer.svg`  
Generated: 2026-06-22 00:00:00 UTC

## 0.1 Area overview / reading quality

This compact sheet contains 7 image placements and 0 canvas text labels. The main concepts and code examples were visually reviewed as one coherent area. Exact code punctuation remains preserved in `source/images/` and the original SVG.

## Verified transcript

### Localization setup

Register MVC localization with `AddViewLocalization`, `AddDataAnnotationsLocalization`, and `AddLocalization(options => options.ResourcesPath = "Resources")`. Configure supported cultures and call `UseRequestLocalization` before routing endpoints that need culture selection.

### Culture selection

The example supports cultures such as `en` and `fr` and allows switching through a query-string culture provider, for example `?culture=fr`. The default culture is used when no provider selects another supported culture.

### IStringLocalizer<T>

Inject `IStringLocalizer<HomeController>` into a controller and retrieve values by key, such as `loc["PageTitle"]`. Resource lookup is based on the generic type/controller, so resource files are named and placed to match that type under the configured Resources path.

### IViewLocalizer

Inject `IViewLocalizer` into a Razor view. View localization resolves resources from the view path rather than a controller type. The example uses separate `.resx` files for `Views/Home/Index.cshtml` and demonstrates localized view text and language links.

### Resource files

.resx files contain XML `<data>` entries with a `name` key and `<value>` translation. Controller resources and view resources use different path conventions; keys must match the strings requested by the localizer.

## Evidence map

Image placements: `S-001, S-002, S-003, S-004, S-005, S-006, S-007`

Canvas labels: `none`

Detailed coordinates and hashes are stored in `data/image-uses.*`, `data/text-labels.*`, and the review ledgers.

## Final coverage

```text
image uses processed: 7
text labels processed: 0
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```