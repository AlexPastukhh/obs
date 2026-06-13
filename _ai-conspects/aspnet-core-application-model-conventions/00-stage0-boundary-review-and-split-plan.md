# Stage 0 - Boundary Review and Split Plan v001

Generated: 2026-06-13 07:16:40 UTC

## Source

```text
conventions(2).svg
```

## Extracted inventory

```text
unique embedded images: 50
image uses: 50
text labels: 19
```

## Stage0 rule

This is not a transcript.

The inventory is a checklist only. Region ownership is not final until visual/semantic boundary review.

A region is complete only after:

```text
visual/semantic boundary review
nearby/candidate screenshot check
verified transcript archive
```

## Proposed split

```text
P01 / R01+R02:
Application-model-conventions overview + convention interfaces.
R01: 7 images
R02: 13 images

P02 / R03+R04:
Application model object graph + metadata models.
R03: 15 images
R04: 15 images
```

## Regions

### R01 - Application model conventions overview / attributes

```text
S-001, S-002, S-003, S-004, S-005, S-006, S-007
```

Meaning:

```text
Attributes, use-or-not decision, application model conventions purpose,
and how outer conventions can access nested models.
```

Boundary concern:

```text
Check R02 convention-interface screenshots before closing; overview and convention APIs are adjacent.
```

### R02 - Convention interfaces / app-controller-action-parameter

```text
S-008, S-009, S-010, S-011, S-012, S-013, S-014, S-015, S-016, S-017, S-018, S-019, S-020
```

Meaning:

```text
IApplicationModelConvention, IControllerModelConvention,
IActionModelConvention, IParameterModelConvention,
and Razor Pages convention interfaces.
```

Boundary concern:

```text
Check R03 model-object screenshots before closing; interfaces mutate these model objects.
```

### R03 - Application / Controller / Action / Parameter models

```text
S-021, S-022, S-023, S-024, S-025, S-026, S-027, S-028, S-029, S-030, S-031, S-032, S-033, S-034, S-035
```

Meaning:

```text
ApplicationModel, ControllerModel, ActionModel, ParameterModel,
nested object graph and convention mutation points.
```

Boundary concern:

```text
Check R04 late metadata models as neighbor.
```

### R04 - Property / Selector / ApiExplorer / BindingInfo models

```text
S-036, S-037, S-038, S-039, S-040, S-041, S-042, S-043, S-044, S-045, S-046, S-047, S-048, S-049, S-050
```

Meaning:

```text
ParameterModelBase, PropertyModel, SelectorModel,
ApiExplorerModel, BindingInfo and API/endpoint metadata.
```

Boundary concern:

```text
Check R03 action/parameter screenshots before closing; object model is continuous.
```

## Important labels noticed

```text
attributes
app model
Controller model
Action model
Parameter model
Parameter model base
Property model
selector model
api explorer model
binding info
App Model COnvention
icontroller Model COnvention
iaction Model COnvention
iparameter Model COnvention
razor pages interfaces
use or not
can access nested models in outer convention
```

## Next

Create P01/R01R02 transcript only after reviewing:

```text
contact-sheet-P01-R01R02-overview-and-convention-interfaces.png
contact-sheet-P02-R03R04-model-object-graph-and-metadata.png
canvas-map-labels-and-image-boxes.png
```
