# Knowledge Registry

Source workspace: `_ai-conspects/changetracker/`

Authoritative processed sources:
- `regions/R01-changetracker-core-methods-detection-cascade-debugview.md` (includes Stage2 correction of S-001-S-003)
- `regions/R02-entityentry-properties-methods-query-and-values.md`
- `regions/R03-trackgraph-nodestate-and-member-api.md`
- `regions/R04-changetracker-events-tracking-tracked-state.md`
- `04-stage4-final-coverage-audit.md`

Original SVG: `source/changetracker.svg` (Git blob SHA: `50d75c751eb9f20252807b6433d90f496b91f960`)

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| ChangeTracker overview (S-001-S-003): in-memory state manager, SaveChanges INSERT/UPDATE/DELETE, EntityState per EntityEntry | `ef-core.changetracker-detection-cascade-and-save-lifecycle` | ef-core | `../_knowledge/ef-core/changetracker-detection-cascade-and-save-lifecycle.md` | MAPPED |
| Entries() / Entries<T>() scanner (S-001-S-003): returns EntityEntry; typed filter e.g. Modified orders | `ef-core.changetracker-detection-cascade-and-save-lifecycle` | ef-core | `../_knowledge/ef-core/changetracker-detection-cascade-and-save-lifecycle.md` | MAPPED |
| HasChanges() (S-037/S-038): pending changes that matter for SaveChanges; conditional save; depends on up-to-date detection | `ef-core.changetracker-detection-cascade-and-save-lifecycle` | ef-core | `../_knowledge/ef-core/changetracker-detection-cascade-and-save-lifecycle.md` | MAPPED |
| DetectChanges() (S-039/S-041/S-063-S-067): in-memory snapshot comparison; tracked-only; AsNoTracking/detached attach may lack originals | `ef-core.changetracker-detection-cascade-and-save-lifecycle` | ef-core | `../_knowledge/ef-core/changetracker-detection-cascade-and-save-lifecycle.md` | MAPPED |
| AutoDetectChangesEnabled (S-068-S-072/S-047-S-049): does not stop tracking; auto-detect also on Entries/HasChanges/CascadeChanges; try/finally and batch Add patterns; Entry.DetectChanges() | `ef-core.changetracker-detection-cascade-and-save-lifecycle` | ef-core | `../_knowledge/ef-core/changetracker-detection-cascade-and-save-lifecycle.md` | MAPPED |
| Clear() (S-042-S-046/S-056-S-058): detaches all tracked entities; does not save; chunk processing; save-after-Clear is empty | `ef-core.changetracker-detection-cascade-and-save-lifecycle` | ef-core | `../_knowledge/ef-core/changetracker-detection-cascade-and-save-lifecycle.md` | MAPPED |
| QueryTrackingBehavior (S-050-S-052): TrackAll/NoTracking/NoTrackingWithIdentityResolution; AsTracking override; does not block Add/Attach/Update | `ef-core.changetracker-detection-cascade-and-save-lifecycle` | ef-core | `../_knowledge/ef-core/changetracker-detection-cascade-and-save-lifecycle.md` | MAPPED |
| DebugView (S-053-S-055/S-059-S-062): ShortView/LongView; inspect Modified, FKs, current/original, navigations | `ef-core.changetracker-detection-cascade-and-save-lifecycle` | ef-core | `../_knowledge/ef-core/changetracker-detection-cascade-and-save-lifecycle.md` | MAPPED |
| Cascade/orphan timing (S-073-S-077/S-156-S-160): CascadeDeleteTiming vs DeleteOrphansTiming; Immediate/OnSaveChanges/Never; CascadeChanges vs DetectChanges | `ef-core.changetracker-detection-cascade-and-save-lifecycle` | ef-core | `../_knowledge/ef-core/changetracker-detection-cascade-and-save-lifecycle.md` | MAPPED |
| LazyLoadingEnabled (S-078): tracker toggle; requires configured proxies or ILazyLoader; virtual navigations for proxies | `ef-core.lazy-loading-and-query-shaping` | ef-core | `../_knowledge/ef-core/lazy-loading-and-query-shaping.md` | MERGED |
| AcceptAllChanges / acceptAllChangesOnSuccess (S-079-S-082): state transitions; SaveChanges default; manual accept after commit uncertainty | `ef-core.changetracker-detection-cascade-and-save-lifecycle` | ef-core | `../_knowledge/ef-core/changetracker-detection-cascade-and-save-lifecycle.md` | MAPPED |
| EntityEntry overview (S-004-S-006/S-098-S-102): per-entity handle; Entity, State, values, Properties, Context | `ef-core.entityentry-state-values-and-property-control` | ef-core | `../_knowledge/ef-core/entityentry-state-values-and-property-control.md` | MAPPED |
| Entity and State (S-004-S-006): five states; SaveChanges insert/update/delete meaning; setting State | `ef-core.entityentry-state-values-and-property-control` | ef-core | `../_knowledge/ef-core/entityentry-state-values-and-property-control.md` | MAPPED |
| CurrentValues / OriginalValues (S-108-S-119): save vs snapshot; property IsModified diffs | `ef-core.entityentry-state-values-and-property-control` | ef-core | `../_knowledge/ef-core/entityentry-state-values-and-property-control.md` | MAPPED |
| Property(...) / IsModified (S-007-S-011/S-103-S-107): CurrentValue/OriginalValue; Attach then one-property update; string name access | `ef-core.entityentry-state-values-and-property-control` | ef-core | `../_knowledge/ef-core/entityentry-state-values-and-property-control.md` | MAPPED |
| Properties / Members helpers (S-128-S-135): generic member inspection; Properties CurrentValue | `ef-core.entityentry-state-values-and-property-control` | ef-core | `../_knowledge/ef-core/entityentry-state-values-and-property-control.md` | MAPPED |
| Attach + Property IsModified (R03 section 9): precise disconnected update vs full Update(entity) | `ef-core.entityentry-state-values-and-property-control` | ef-core | `../_knowledge/ef-core/entityentry-state-values-and-property-control.md` | MAPPED |
| References / Collections / Navigations and Load/IsLoaded (S-012-S-036): Reference vs Collection LoadAsync | `ef-core.entityentry-navigations-explicit-load-and-query` | ef-core | `../_knowledge/ef-core/entityentry-navigations-explicit-load-and-query.md` | MAPPED |
| Query() (S-012-S-036): IQueryable for related collection/reference; filter/count/Any without full Load | `ef-core.entityentry-navigations-explicit-load-and-query` | ef-core | `../_knowledge/ef-core/entityentry-navigations-explicit-load-and-query.md` | MAPPED |
| IsKeySet (R02 section 8): key set vs not; disconnected Add vs Update heuristic, not a truth detector | `ef-core.entityentry-state-values-and-property-control` | ef-core | `../_knowledge/ef-core/entityentry-state-values-and-property-control.md` | MAPPED |
| Context (R02 section 9): Entry.Context points at owning DbContext | `ef-core.entityentry-state-values-and-property-control` | ef-core | `../_knowledge/ef-core/entityentry-state-values-and-property-control.md` | MAPPED |
| Reload / ReloadAsync (S-108-S-119): overwrite from database; usually Unchanged; can wipe local changes | `ef-core.entityentry-state-values-and-property-control` | ef-core | `../_knowledge/ef-core/entityentry-state-values-and-property-control.md` | MAPPED |
| GetDatabaseValues / concurrency merge (S-108-S-119/S-161-S-164): fetch without replacing current; null row deleted; OriginalValues.SetValues(databaseValues) | `ef-core.entityentry-state-values-and-property-control` | ef-core | `../_knowledge/ef-core/entityentry-state-values-and-property-control.md` | MAPPED |
| SetValues (S-108-S-119): DTO into CurrentValues; databaseValues into OriginalValues | `ef-core.entityentry-state-values-and-property-control` | ef-core | `../_knowledge/ef-core/entityentry-state-values-and-property-control.md` | MAPPED |
| Metadata (S-120-S-127): FindProperty/FindNavigation/FindPrimaryKey; GetProperties/GetNavigations | `ef-core.entityentry-state-values-and-property-control` | ef-core | `../_knowledge/ef-core/entityentry-state-values-and-property-control.md` | MAPPED |
| Why TrackGraph exists (S-085-S-087): mixed new/existing/deleted disconnected graph vs broad Add/Attach/Update/Remove | `ef-core.trackgraph-disconnected-graphs-and-nodestate` | ef-core | `../_knowledge/ef-core/trackgraph-disconnected-graphs-and-nodestate.md` | MAPPED |
| TrackGraph callback shape (S-083/S-084): node.Entry; IsKeySet Modified vs Added | `ef-core.trackgraph-disconnected-graphs-and-nodestate` | ef-core | `../_knowledge/ef-core/trackgraph-disconnected-graphs-and-nodestate.md` | MAPPED |
| EntityEntryGraphNode (S-088-S-097): Entry, NodeState, SourceEntry, InboundNavigation | `ef-core.trackgraph-disconnected-graphs-and-nodestate` | ef-core | `../_knowledge/ef-core/trackgraph-disconnected-graphs-and-nodestate.md` | MAPPED |
| State assignment examples (S-083-S-097): key-based, ITrackChanges flags, Unchanged then selective property mods | `ef-core.trackgraph-disconnected-graphs-and-nodestate` | ef-core | `../_knowledge/ef-core/trackgraph-disconnected-graphs-and-nodestate.md` | MAPPED |
| NodeState (S-088-S-097): carries custom traversal state when parent/relationship context is not on the entity (depth, tenant, parent decision, read-only branch) | `ef-core.trackgraph-disconnected-graphs-and-nodestate` | ef-core | `../_knowledge/ef-core/trackgraph-disconnected-graphs-and-nodestate.md` | MAPPED |
| Advanced TrackGraph(root, initialState, callback) example and child-traversal control via callback return/assign (R03 section 5): source shows a void lambda; actual TrackGraph<TState> takes Func<EntityEntryGraphNode<TState>, bool> | - | - | - | UNRESOLVED |
| Detached stops branch traversal (S-088-S-097) | `ef-core.trackgraph-disconnected-graphs-and-nodestate` | ef-core | `../_knowledge/ef-core/trackgraph-disconnected-graphs-and-nodestate.md` | MAPPED |
| TrackGraph vs Add/Attach/Update good/bad fit (S-085-S-087) | `ef-core.trackgraph-disconnected-graphs-and-nodestate` | ef-core | `../_knowledge/ef-core/trackgraph-disconnected-graphs-and-nodestate.md` | MAPPED |
| Tracking event (S-136-S-142/S-150-S-155): before tracked; handler on e.Entry | `ef-core.changetracker-tracking-and-state-events` | ef-core | `../_knowledge/ef-core/changetracker-tracking-and-state-events.md` | MAPPED |
| Tracked + FromQuery (S-136-S-142/S-150-S-155): after tracked; query vs Add/Attach/Update | `ef-core.changetracker-tracking-and-state-events` | ef-core | `../_knowledge/ef-core/changetracker-tracking-and-state-events.md` | MAPPED |
| StateChanging / StateChanged (S-143-S-149): OldState/NewState; before vs after transition | `ef-core.changetracker-tracking-and-state-events` | ef-core | `../_knowledge/ef-core/changetracker-tracking-and-state-events.md` | MAPPED |
| Event triggers (R04 section 6): query, Add/Attach/Update/Remove, DetectChanges, SaveChanges/AcceptAllChanges, cascade, TrackGraph | `ef-core.changetracker-tracking-and-state-events` | ef-core | `../_knowledge/ef-core/changetracker-tracking-and-state-events.md` | MAPPED |
| Good vs bad event uses (R04 section 7): diagnostics vs durable audit/side effects; prefer SaveChanges/interceptors for audit | `ef-core.changetracker-tracking-and-state-events` | ef-core | `../_knowledge/ef-core/changetracker-tracking-and-state-events.md` | MAPPED |
| Diagnostic setup and event-args model (R04 sections 8-9): Tracked+StateChanged sample; Entry/Metadata/Properties; avoid heavy handlers | `ef-core.changetracker-tracking-and-state-events` | ef-core | `../_knowledge/ef-core/changetracker-tracking-and-state-events.md` | MAPPED |
| Processing/evidence metadata: Stage0 inventory, coverage audit, image ledgers, contact sheets | - | - | - | NON_LEARNING |

## Boundary decisions

- ChangeTracker-level APIs (`HasChanges`, `DetectChanges`, `Clear`, `QueryTrackingBehavior`, cascade timings, `AcceptAllChanges`, `DebugView`, `Entries()` scanner) -> new `ef-core.changetracker-detection-cascade-and-save-lifecycle`.
- `EntityEntry` scalar/state/value/concurrency/metadata surface -> new `ef-core.entityentry-state-values-and-property-control`. R03 member/`IsModified` helpers go here rather than duplicating them inside TrackGraph.
- Navigation `Load` / `IsLoaded` / `Query()` -> new `ef-core.entityentry-navigations-explicit-load-and-query`.
- Disconnected graph traversal (`TrackGraph`, `NodeState`, Detached-stop) -> new `ef-core.trackgraph-disconnected-graphs-and-nodestate`.
- Event lifecycle -> new `ef-core.changetracker-tracking-and-state-events`.
- `LazyLoadingEnabled` is the same lazy-loading mechanism already covered by `ef-core.lazy-loading-and-query-shaping`; only the ChangeTracker toggle and "flag is not enough" claim were merged there.
- Related `ChangeTracker.Entries<Order>()` usage in `ef-core.aggregate-version-etag-propagation` is a different unit (aggregate ETag), not a duplicate of this API conspect.
- R03 section 5 `TrackGraph(root, initialState, node => { ... })` is not copied into the unit: the conceptual callback does not return `bool`, which conflicts with `TrackGraph<TState>`. Detached-stop (R03 section 6) remains MAPPED separately. Fix R03 via the normal source-correction workflow, then remigrate this row.

| Status | Count |
|---|---:|
| MAPPED | 37 |
| MERGED | 1 |
| NON_LEARNING | 1 |
| UNRESOLVED | 1 |
