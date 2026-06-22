# R03 - Application / Controller / Action / Parameter models

Generated: 2026-06-13 07:33:21 UTC

Image uses: 15

```text
S-021, S-022, S-023, S-024, S-025, S-026, S-027, S-028, S-029, S-030, S-031, S-032, S-033, S-034, S-035
```

## Core idea

The application model is the startup-time representation of the MVC/Razor Pages surface.

It is not the same thing as a runtime request.

It is a discovered model of:

```text
the application
controllers
actions
parameters
properties
selectors
filters
metadata
```

Conventions mutate this model before MVC uses it for routing, action selection, binding, filters and API metadata.

## ApplicationModel

`ApplicationModel` is the top-level model.

It represents the whole MVC application model and contains collections such as controllers and global filters/properties.

Think of it as:

```text
ApplicationModel
  Controllers
  Filters
  Properties
```

Use application-level conventions when a rule needs whole-application context.

Examples:

```text
apply a filter to all controllers in a namespace
add global controller/action metadata
scan all actions and alter selectors
group controllers/actions by a naming rule
```

## ControllerModel

`ControllerModel` represents one controller.

It contains controller-level metadata and nested actions.

Conceptually:

```text
ControllerModel
  ControllerName
  ControllerType
  Attributes
  Filters
  Selectors
  Actions
  Properties
```

Controller conventions are a natural place to apply rules based on:

```text
controller name
namespace
base type
attributes
implemented interfaces
controller-level route metadata
```

## ActionModel

`ActionModel` represents one action method.

It is where action-level route, selector, filter and parameter metadata lives.

Conceptually:

```text
ActionModel
  ActionName
  ActionMethod
  Attributes
  Filters
  Selectors
  Parameters
  ApiExplorer
```

Action conventions are useful when the rule is action-specific:

```text
hide some actions from API explorer
add filters to actions matching a naming rule
modify selectors/routes
apply metadata to actions with certain attributes
inspect parameters for one action
```

## ParameterModel

`ParameterModel` represents an action parameter.

It is the model level where parameter binding metadata can be adjusted.

Examples of rules:

```text
parameters of type CancellationToken should be treated specially
parameters with certain names get a binding prefix
parameters of certain DTO types get a binding source
parameters with custom attributes get extra metadata
```

Parameter-level conventions are narrower and easier to reason about than whole-application conventions when the rule is truly parameter-specific.

## Nested traversal

The application model object graph is nested.

A high-level convention can walk lower-level objects:

```text
ApplicationModel -> Controllers -> Actions -> Parameters
```

This is powerful but should be used carefully. If a rule only needs action context, prefer an action convention. If it only needs parameter context, prefer a parameter convention.

## Mutation policy

Conventions should make deterministic startup-time metadata changes.

Good use:

```text
metadata depends on type/name/attribute/namespace
same input codebase produces same model
rule is documented and testable
```

Bad use:

```text
depends on current request
depends on current user
does database lookups for request logic
changes behavior unpredictably
```

## Practical reading order

When inspecting a convention, ask:

```text
Which model level does it receive?
Which nested models does it touch?
Which metadata does it add/remove/change?
Will routing/action selection/binding/API explorer use that metadata later?
```

## Boundary note

R03 explains the main model graph.

R04 explains related metadata model objects such as selectors, API explorer metadata and binding info.
