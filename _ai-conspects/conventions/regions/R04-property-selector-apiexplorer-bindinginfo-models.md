# R04 - Property / Selector / ApiExplorer / BindingInfo models

Generated: 2026-06-13 07:33:21 UTC

Image uses: 15

```text
S-036, S-037, S-038, S-039, S-040, S-041, S-042, S-043, S-044, S-045, S-046, S-047, S-048, S-049, S-050
```

## Core idea

Beyond the obvious application/controller/action/parameter nodes, application model conventions also interact with metadata model objects.

These objects influence:

```text
routing/action selection
endpoint metadata
API explorer/OpenAPI output
model binding
controller/page properties
```

R04 is the metadata layer of the application model.

## ParameterModelBase

`ParameterModelBase` is a shared base concept for parameter-like model metadata.

It is useful because several model objects need similar metadata behavior:

```text
name
attributes
binding information
properties
metadata
```

When a convention changes parameter-like binding metadata, it may be dealing with this shared base behavior.

## PropertyModel

`PropertyModel` represents a property in the application model.

Properties can matter for controller/page model binding and metadata.

Use cases:

```text
change binding behavior for controller/page properties
apply metadata to properties with certain attributes
adjust property names/binding names
exclude or include properties from specific metadata flows
```

Property conventions are related to parameter conventions, but the target is a property instead of an action method parameter.

## SelectorModel

`SelectorModel` represents selection metadata for a controller/action.

This is important for routing and endpoint/action selection.

A selector can include:

```text
attribute route model
action constraints
endpoint metadata
HTTP method metadata
route values
```

Changing selector metadata can affect which URL/HTTP method reaches which action.

So selector changes are powerful and should be explicit.

## ApiExplorerModel

`ApiExplorerModel` controls API explorer metadata.

API explorer is the metadata source used by tools such as Swagger/OpenAPI generators.

Conventions can change:

```text
visibility
group name
API name
description-like metadata
whether an action appears in generated API docs
```

Typical examples:

```text
hide internal endpoints
group actions by version/module
rename/group controllers in API docs
apply documentation conventions consistently
```

## BindingInfo

`BindingInfo` holds model-binding metadata.

It can include things like:

```text
BindingSource
BinderModelName
BinderType
PropertyFilterProvider
RequestPredicate
```

Conventions that modify binding info can change where a value is read from and how the binder interprets it.

Examples:

```text
mark a parameter as coming from query/body/header/route
set a binder model name
assign a custom binder type
apply binding source rules by parameter type
```

## Route/API metadata caution

Changing selectors, API explorer metadata or binding info can have visible behavior changes.

Possible effects:

```text
routes change
actions stop matching
Swagger output changes
model binding reads from another source
ambiguous actions appear or disappear
```

That is why these conventions should be tested and documented.

## How this connects to P01

P01 explained the convention interfaces.

R04 explains what those interfaces often mutate.

Example mapping:

```text
IActionModelConvention -> ActionModel.Selectors / ApiExplorer
IParameterModelConvention -> ParameterModel.BindingInfo
IControllerModelConvention -> ControllerModel.Properties / Selectors / Filters
IApplicationModelConvention -> all of the above through traversal
```

## Practical checklist

When a convention mutates metadata, check:

```text
Is this the narrowest model level?
Does it affect routing?
Does it affect OpenAPI/ApiExplorer output?
Does it affect model binding?
Could attributes do the same thing more clearly?
Is the convention easy to find and test?
```

## Boundary note

R04 closes the object/metadata model pass.

After R03 and R04, the conspect needs only a final coverage audit to verify all source images are processed.
