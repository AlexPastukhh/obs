# Current Source of Truth - ASP.NET Core Application Model Conventions

Generated: 2026-06-13 07:16:40 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
P01/R01R02 overview and convention interfaces: next
P02/R03R04 application model object graph and metadata models: pending
```

## Stage0 inventory

```text
unique embedded images: 50
image uses: 50
text labels: 19
```

## Proposed split

```text
R01 application model conventions overview / attributes: 7 image uses
R02 convention interfaces / app-controller-action-parameter: 13 image uses
R03 ApplicationModel / ControllerModel / ActionModel / ParameterModel: 15 image uses
R04 PropertyModel / SelectorModel / ApiExplorerModel / BindingInfo: 15 image uses
```

## Next pass

```text
P01 / R01R02:
overview, attributes, when to use conventions,
IApplicationModelConvention / IControllerModelConvention /
IActionModelConvention / IParameterModelConvention.
```
