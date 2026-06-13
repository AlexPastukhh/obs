# R02 - ViewData / ViewBag / TempData / validation flow

Generated: 2026-06-13 08:04:08 UTC

Image uses: 10

```text
S-030, S-029, S-031, S-035, S-036, S-034, S-028, S-027, S-026, S-039
```

## Core idea

R02 explains small view-state tools in MVC/Razor:

```text
ViewData
ViewBag
TempData
ModelState / validation messages
```

These are useful, but they should not replace a normal view model for main page data.

## ViewData

`ViewData` is a dictionary available to the controller and the view during the current request.

Mental model:

```text
controller stores small UI value in dictionary
view reads value by key
value exists only for this request
```

Good uses:

```text
page title
small flag
breadcrumb label
selected menu item
tiny one-off UI value
```

Weaknesses:

```text
string keys
casting may be needed
not compile-time safe
easy to mistype key names
```

## ViewBag

`ViewBag` is dynamic syntax over ViewData.

Mental model:

```text
ViewBag.Title = "Products"
```

is a dynamic convenience around the same kind of current-request view data.

It is shorter than ViewData, but even less compile-time safe.

Use it for small UI metadata, not for the main model.

## ViewData vs ViewBag

They are closely related.

Practical rule:

```text
main page data -> strongly typed model/view model
small current-request UI values -> ViewData or ViewBag
cross-redirect message -> TempData
```

## TempData

`TempData` is for short-lived data that survives a redirect.

The classic case is Post-Redirect-Get.

Flow:

```text
POST action saves product
action writes TempData["SuccessMessage"]
action redirects to GET action
GET view reads TempData and shows toast/message
TempData value is consumed
```

This prevents duplicate form submission and keeps a success/error message visible after redirect.

## TempData caution

TempData is not a general storage mechanism.

Use it for small short-lived messages, not large objects or durable state.

Good fit:

```text
"Product created"
"Product updated"
"Cannot delete item"
```

Bad fit:

```text
full Product object
large lists
long-lived user/session state
business data
```

## Validation flow

Validation typically flows like this:

```text
form posts data
model binding fills model/view model
validation runs
errors go into ModelState
controller checks ModelState.IsValid
view displays validation messages
```

If the model is invalid, the controller usually returns the same view with the same model so the user can fix errors.

## Validation display

Validation can be displayed through helpers/tag helpers such as:

```text
field-level validation message
validation summary
CSS classes for invalid inputs
```

The exact rendering is often handled by validation tag helpers, which are part of P02.

## Common controller pattern

Conceptually:

```text
GET Edit:
  load product
  map to ProductEditVm
  return View(vm)

POST Edit:
  bind ProductEditVm
  if ModelState invalid: return View(vm)
  save product
  TempData success message
  redirect to details/index
```

This keeps GET rendering, POST validation and PRG message flow clear.

## Practical checklist

Use:

```text
ViewModel for page data
ViewData/ViewBag for tiny current-request view metadata
TempData for one-redirect message
ModelState for validation errors
validation helpers/tag helpers for display
```

Avoid:

```text
large ViewBag payloads
TempData as database/session replacement
main page data hidden behind string keys
losing validation data by redirecting on invalid form
```

## Boundary note

R02 closes the P01 state and validation flow.

P02 will cover the tag helpers that render forms, inputs, validation messages, selects, cache blocks and related view helper behavior.
