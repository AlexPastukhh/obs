# Knowledge Registry

Source: `01-final-transcript.md`; SVG: `source/redux rtk.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01: ordinary action shape; `type`, `payload`, `error`, `meta`; same object for middleware and reducers | `redux.actions-slices-and-store` | `redux` | `../_knowledge/redux/actions-slices-and-store.md` | MAPPED |
| R01: classic/generated creators; conceptual dispatched object; `sliceName/reducerName` and its benefits | `redux.actions-slices-and-store` | `redux` | `../_knowledge/redux/actions-slices-and-store.md` | MAPPED |
| R02: store composition, default middleware, thunks, dev checks/DevTools, safe middleware extension | `redux.actions-slices-and-store` | `redux` | `../_knowledge/redux/actions-slices-and-store.md` | MAPPED |
| R02: slice structure/exports, Immer updates, and restriction on mixing update styles | `redux.actions-slices-and-store` | `redux` | `../_knowledge/redux/actions-slices-and-store.md` | MAPPED |
| R02: reducer keys and root paths; correct/incorrect selector paths | `redux.actions-slices-and-store` | `redux` | `../_knowledge/redux/actions-slices-and-store.md` | MAPPED |
| R02: Provider, hooks, dispatch calls, selector benefits, application separation | `redux.actions-slices-and-store` | `redux` | `../_knowledge/redux/actions-slices-and-store.md` | MAPPED |
| R03: thunk declaration, argument/request params, `thunkApi.signal`, type prefix and derived types | `redux.async-thunk-lifecycle` | `redux` | `../_knowledge/redux/async-thunk-lifecycle.md` | MAPPED |
| R03: dispatch order and lifecycle actions versus the Promise | `redux.async-thunk-lifecycle` | `redux` | `../_knowledge/redux/async-thunk-lifecycle.md` | MAPPED |
| R03: pending/fulfilled/rejected shapes, including payload/error and request metadata | `redux.async-thunk-lifecycle` | `redux` | `../_knowledge/redux/async-thunk-lifecycle.md` | MAPPED |
| R03: `rejectWithValue`, controlled versus unexpected errors, request-state transitions | `redux.async-thunk-lifecycle` | `redux` | `../_knowledge/redux/async-thunk-lifecycle.md` | MAPPED |
| R04: owned/external boundary and cross-slice reaction | `redux.extra-reducers` | `redux` | `../_knowledge/redux/extra-reducers.md` | MAPPED |
| R04: `addCase` matching, callback inputs, action creator versus exact string | `redux.extra-reducers` | `redux` | `../_knowledge/redux/extra-reducers.md` | MAPPED |
| R04: all async cases and multiple slices observing one action | `redux.extra-reducers` | `redux` | `../_knowledge/redux/extra-reducers.md` | MAPPED |
| R04 practical integration checklist | all three units | `redux` | all three destination files above | MAPPED |
| Screenshot/label counts and processing-coverage statistics | — | — | — | NON_LEARNING |

## Boundary and coverage

Core store composition, async lifecycle, and cross-owned action reactions remain independent review scopes. The unit bodies were compared with every learning subsection of R01–R04; no learning claim was intentionally excluded. Screenshot and label counts establish transcript-processing coverage, not knowledge preservation by themselves.

| Status | Count |
|---|---:|
| MAPPED | 14 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
