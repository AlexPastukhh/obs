# Current Source of Truth - ASP.NET Core Application Model Conventions

Generated: 2026-06-13 07:33:21 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
R01 application model conventions overview / attributes: transcript v001 done
R02 convention interfaces / app-controller-action-parameter: transcript v001 done
R03 ApplicationModel / ControllerModel / ActionModel / ParameterModel: transcript v001 done
R04 ParameterModelBase / PropertyModel / SelectorModel / ApiExplorerModel / BindingInfo: transcript v001 done
Final coverage audit: next
```

## Coverage after Stage2

```text
total image uses: 50
processed-in-r01-v001: 7
processed-in-r02-v001: 13
processed-in-r03-v001: 15
processed-in-r04-v001: 15
pending/problem rows before final audit: 0
```

## Current split policy

```text
Default: 50-80 images.
Can be bigger: 80-120 if the road is coherent.
Exception: 120+ only on explicit request or one very cohesive road.
```

## Next pass

```text
Final coverage audit:
verify all 50 image uses are processed,
no candidate/reserved/pending/unreviewed rows remain,
record coverage-complete or concrete problems.
```
