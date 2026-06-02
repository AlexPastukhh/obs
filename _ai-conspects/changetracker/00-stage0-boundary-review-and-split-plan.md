# Stage 0 - ChangeTracker Boundary Review and Split Plan v001

Generated: 2026-06-02 12:20:29 UTC

## Done

- Parsed uploaded Excalidraw SVG.
- Extracted embedded PNG sources.
- Built image-use inventory and label inventory.
- Created first boundary/split plan.
- Created contact sheets and canvas map.

## Why this is not transcript yet

This SVG is medium-large:

```text
unique embedded images: 164
image uses on canvas: 164
text labels parsed: 113
```

A blind transcript would risk losing/misassigning screenshots. Stage0 is only inventory/checklist and split plan.

## Size policy for this conspect

```text
Default pass size: 50-80 image uses.
Can be bigger: 80-120 if the road is coherent.
Exception: 120+ only when explicitly requested or when splitting breaks one cohesive road.
Inventory/ledger is not source of truth.
Transcript ownership is decided by visual/semantic boundary review.
```

## Proposed passes

| Pass | Count | Meaning |
|---|---:|---|
| P01-R01-changetracker-core-methods-detection-cascade-debugview | 49 | ChangeTracker itself: HasChanges, DetectChanges, Clear, AutoDetectChangesEnabled, QueryTrackingBehavior, cascade/delete timings, AcceptAllChanges, DebugView. |
| P02-R02-entityentry-properties-methods-query-and-values | 70 | EntityEntry: State, Entity, Metadata, CurrentValues/OriginalValues, IsKeySet, Context, Entry.Query, navigations/references/collections/properties, Reload/GetDatabaseValues examples. |
| P03-R03R04-trackgraph-member-api-and-events | 45 | ChangeTracker events: Tracking vs Tracked, state during events, query/materialization hooks, event examples. / TrackGraph and graph traversal: NodeState, manual state assignment, TrackGraph stopping behavior, member/property API helpers. |

## Subregion counts

```text
R02-entityentry-properties-methods-query-and-values: 70
R01-changetracker-core-methods-detection-cascade-debugview: 49
R03-trackgraph-nodestate-and-member-api: 25
R04-changetracker-events-tracking-tracked-state: 20
```

## Pass counts

```text
P01-R01-changetracker-core-methods-detection-cascade-debugview: 49
P02-R02-entityentry-properties-methods-query-and-values: 70
P03-R03R04-trackgraph-member-api-and-events: 45
```

## Contact sheets

```text
audit-assets/contact-sheet-all-candidates-stage0.png
audit-assets/contact-sheet-P01-R01-changetracker-core-methods-detection-cascade-debugview.png
audit-assets/contact-sheet-P02-R02-entityentry-properties-methods-query-and-values.png
audit-assets/contact-sheet-P03-R03R04-trackgraph-member-api-and-events.png
audit-assets/canvas-map-labels-and-image-boxes.png
```

## Important stage0 caveat

The split is intentionally based on a first visual/coordinate reading.

Before each transcript pass, do a local boundary review and check neighbors. If a screenshot belongs to a previous/next section, record the correction instead of forcing it into the current pass.

## Next

Start with P01/R01 after local boundary recheck:

```text
R01: ChangeTracker methods/properties and detection/cascade/debug behavior.
```
