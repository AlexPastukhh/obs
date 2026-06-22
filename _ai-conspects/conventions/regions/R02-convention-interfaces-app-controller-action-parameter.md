# R02 - Convention interfaces / app-controller-action-parameter

Generated: 2026-06-13 07:29:58 UTC

Image uses: 13

```text
S-008, S-009, S-010, S-011, S-012, S-013, S-014, S-015, S-016, S-017, S-018, S-019, S-020
```

## Core interface pattern

Application model conventions are small classes that implement convention interfaces.

Each interface chooses which model level the convention receives.

## IApplicationModelConvention

`IApplicationModelConvention` receives the whole `ApplicationModel`.

Use it when the rule needs broad access:

```text
all controllers
all actions
many parameters
global filter/route/API metadata policy
rules based on controller/action combinations
```

Because it receives the whole graph, it can make broad changes.

Conceptually:

```text
ApplicationModel
  Controllers
    Actions
      Parameters
```

## IControllerModelConvention

`IControllerModelConvention` receives one `ControllerModel`.

Use it when the rule is controller-scoped:

```text
controller-level filters
controller route metadata
controller API explorer settings
rules based on namespace/name/base type/attributes
```

It can still inspect the controller's actions, but the convention is naturally centered on controller-level metadata.

## IActionModelConvention

`IActionModelConvention` receives one `ActionModel`.

Use it when the rule is action-scoped:

```text
action-level filters
selectors/routes
action names
HTTP method metadata
ApiExplorer settings
parameter inspection for one action
```

This is often the most convenient convention level for changing endpoint/action behavior without touching every action with attributes.

## IParameterModelConvention

`IParameterModelConvention` receives one `ParameterModel`.

Use it when the rule is parameter-scoped:

```text
binding source rules
parameter name conventions
metadata for specific parameter types
rules based on attributes/type/name
```

For example, you might set binding behavior for all parameters of a certain type, or enforce a naming/metadata rule.

## Razor Pages convention interfaces

Razor Pages has analogous conventions for page application models.

The same principle applies:

```text
choose the convention level that matches the thing you want to change
```

Examples:

```text
page route conventions
page folder conventions
page handler conventions
page filter conventions
```

Use page conventions when the target is Razor Pages rather than MVC controllers/actions.

## Registering conventions

MVC conventions are usually added through MVC options.

Conceptual shape:

```text
AddControllers options
  Conventions.Add(new custom convention)
```

For Razor Pages, use Razor Pages options and page conventions.

Exact registration depends on whether the convention is MVC/controller-based or Razor Pages based.

## Choosing the right interface

Choose the narrowest convention interface that still has enough context.

```text
Need whole graph?       IApplicationModelConvention
Need one controller?    IControllerModelConvention
Need one action?        IActionModelConvention
Need one parameter?     IParameterModelConvention
Need Razor Page model?  Razor Pages conventions
```

Narrower conventions are easier to reason about. Broader conventions are more powerful but easier to misuse.

## Boundary note

R02 names the interfaces and their intended scope.

R03/R04 describe the model classes and metadata objects these conventions mutate.
