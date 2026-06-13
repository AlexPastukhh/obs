# Current Source of Truth - Base MVC Razor Views / TempData ViewData ViewBag / Cache Tag Helper

Generated: 2026-06-13 07:58:17 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
P01/R01R02 base MVC views + state/validation flow: next
P02/R03R04 tag helpers + cache/view components/display templates: pending
```

## Stage0 inventory

```text
unique embedded images: 41
image uses: 41
text labels: 4
```

## Proposed split

```text
R01 base MVC/Razor Products app, views, layouts, partials/view components: 13 image uses
R02 ViewData/ViewBag/TempData/validation flow: 10 image uses
R03 built-in tag helpers/forms/selects/infrastructure: 10 image uses
R04 cache tag helper/view components/display templates/validation helpers: 8 image uses
```

## Next pass

```text
P01 / R01R02:
Products app structure, MVC controller/view flow,
_ViewStart/_ViewImports/_Layout, model/viewmodel,
ViewData/ViewBag/TempData and validation flow.
```
