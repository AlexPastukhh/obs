# R01 - Application model conventions overview / attributes

Generated: 2026-06-13 07:29:58 UTC

Image uses: 7

```text
S-001, S-002, S-003, S-004, S-005, S-006, S-007
```

## Core idea

Application model conventions are a way to modify MVC/Razor Pages metadata at application startup.

They run while ASP.NET Core builds the application model, before requests are handled.

A useful mental model:

```text
controllers/actions/pages discovered
application model is built
conventions modify that model
routing/action selection/filters/binding use the modified metadata at runtime
```

So conventions are not middleware and they are not action filters. They are model-shaping hooks.

## Why conventions exist

Attributes are good when metadata belongs directly on one controller/action/parameter.

Conventions are better when the rule is broad or centralized.

Use an attribute when:

```text
one action needs one special route/name/filter/binding rule
the rule is obvious from the code location
you want metadata visible next to the target
```

Use a convention when:

```text
many controllers/actions follow the same rule
the rule is based on naming/namespace/project structure
you want centralized policy instead of repeated attributes
you need to add metadata generated from app-level logic
```

## What conventions can change

Conventions can adjust application model objects such as:

```text
controllers
actions
parameters
properties
selectors
filters
route values
ApiExplorer visibility/grouping
binding metadata
```

They are useful for cross-cutting rules like:

```text
add a filter to every controller in a namespace
prefix routes for a set of controllers
hide internal actions from ApiExplorer
rename/group API explorer metadata
apply binding rules to certain parameter types
add conventions for Razor Pages folders
```

## Attributes vs conventions

Attributes are local and explicit.

Conventions are centralized and programmatic.

A practical rule:

```text
Use attributes for simple local exceptions.
Use conventions for repeated structural policy.
```

A convention should not make the codebase mysterious. If a convention changes behavior far away from the controller/action source, document it clearly.

## Nested model access

Outer conventions can access nested models.

Examples:

```text
application-level convention can iterate controllers
controller-level convention can inspect actions
action-level convention can inspect parameters
```

This matters because a convention at a high level can still apply targeted changes lower in the graph.

## What not to use conventions for

Do not use application model conventions for runtime decisions that depend on the current request.

Bad fit:

```text
per-request authentication decision
request body parsing
business logic branching
runtime database lookups
changing behavior based on current user
```

Better tools for those:

```text
middleware
filters
model binders
authorization policies
endpoint filters
normal application services
```

## Practical checklist

Before writing a convention, ask:

```text
Is this metadata/model-shaping, not runtime request logic?
Does this rule apply broadly?
Would attributes be too repetitive?
Can future readers discover the convention easily?
Does the convention target the right model level?
```

## Boundary note

R01 covers the why/when mental model.

R02 covers the exact convention interfaces. R03/R04 cover the application model object graph that those interfaces mutate.
