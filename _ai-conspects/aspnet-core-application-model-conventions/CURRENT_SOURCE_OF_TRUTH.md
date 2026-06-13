# Current Source of Truth - ASP.NET Core Application Model Conventions

Generated: 2026-06-13 07:29:58 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
R01 application model conventions overview / attributes: transcript v001 done
R02 convention interfaces / app-controller-action-parameter: transcript v001 done
P02/R03R04 application model object graph and metadata models: next
```

## P01 boundary decisions

```text
R01 included:
7 image uses

R02 included:
13 image uses

Checked-not-P01 / reserved for P02:
S-021, S-022, S-023, S-024, S-025, S-026, S-027, S-028, S-029, S-030, S-031, S-032, S-033, S-034, S-035, S-036, S-037, S-038, S-039, S-040, S-041, S-042, S-043, S-044, S-045, S-046, S-047, S-048, S-049, S-050
```

## Current split policy

```text
Default: 50-80 images.
Can be bigger: 80-120 if the road is coherent.
Exception: 120+ only on explicit request or one very cohesive road.
```

## Next pass

```text
P02 / R03R04:
ApplicationModel, ControllerModel, ActionModel, ParameterModel,
ParameterModelBase, PropertyModel, SelectorModel,
ApiExplorerModel and BindingInfo.
```
