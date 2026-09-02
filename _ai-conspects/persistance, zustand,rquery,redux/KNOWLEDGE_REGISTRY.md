# Knowledge Registry

Source workspace: `_ai-conspects/persistance, zustand,rquery,redux/`

Authoritative processed sources: `01-final-transcript.md` (identical complete copy: `regions/final-transcript.md`); completion certified by `CURRENT_SOURCE_OF_TRUTH.md`.

Original source identity: `persistance, zustand,rquery,redux.svg` (canonical and raw SVGs exist locally under `source/` but are not tracked/resolvable from the current branch tree).

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| Runtime state versus persisted snapshots; cross-library mapping; save/restore timing; schema, TTL, throttling, selective policies, flush-before-purge, and design checklist (sections 1-2 and 6-9) | `architecture.client-state-persistence-snapshot-lifecycle` | `architecture` | `../_knowledge/architecture/client-state-persistence-snapshot-lifecycle.md` | MAPPED |
| React Query persister/provider, dehydration filters and meta, hydration, useIsRestoring, gcTime/maxAge alignment, buster, explicit save, and whole-client/per-query throttling boundary (section 3) | `react-query.persistence-hydration-and-cache-pruning` | `react-query` | `../_knowledge/react-query/persistence-hydration-and-cache-pruning.md` | MERGED |
| Zustand persist options, partialize, version/migrate, imperative persist API, explicit TTL, throttled storage wrapper, and flush boundary (section 4) | `react.zustand-immer-persist-and-custom-middleware` | `react` | `../_knowledge/react/zustand-immer-persist-and-custom-middleware.md` | MERGED |
| Redux Persist configuration, PersistGate, whitelist/blacklist, nested persistence, transforms, migrations, reconcilers, persistor methods, and explicit TTL (section 5) | `redux.persist-reducers-transforms-and-rehydration` | `redux` | `../_knowledge/redux/persist-reducers-transforms-and-rehydration.md` | MAPPED |
| Source identity, screenshot/text inventories, duplicate placements, semantic-import record, and coverage audit | — | — | — | NON_LEARNING |

## Boundary decisions

- The cross-library lifecycle is a durable model of its own; library-specific API mechanics remain in their respective topic units.
- React Query and Zustand content extends existing central models and is present in their bodies, not only in Sources.
- The complete transcript is partitioned by headings; its union is represented without excluding any learning section.

| Status | Count |
|---|---:|
| MAPPED | 2 |
| MERGED | 2 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
