# Knowledge Registry

Source workspace: `_ai-conspects/redux basics/`

Authoritative processed source: `07-full-combined-final-transcript.md`

Authoritative audit: `08-full-conspect-final-coverage-audit.md`

Original SVG: `source/redux basics.svg`

Evidence and coverage: `data/full-conspect-final-coverage-audit-v001.json`; all 19 meaningful text elements and all 108 screenshot uses are closed across R01-R06, including three repeated placements.

| Source claim group | Topic | Knowledge ID | Destination file | Mapping |
|---|---|---|---|---|
| R01 Redux-versus-Context decision, one-way dispatch/reducer/store/UI flow and the three Redux state principles | `redux` | `redux.actions-slices-and-store` | `../_knowledge/redux/actions-slices-and-store.md` | MERGED |
| R01 classic action/reducer/store building blocks, `mapStateToProps`, `mapDispatchToProps` and `connect` subscription/injection | `redux` | `redux.actions-slices-and-store` | `../_knowledge/redux/actions-slices-and-store.md` | MERGED |
| R02 `createStore`, `combineReducers`, preloaded state, nearest React-Redux `Provider` and independent multiple-provider contexts | `redux` | `redux.actions-slices-and-store` | `../_knowledge/redux/actions-slices-and-store.md` | MERGED |
| R02 `useSelector` equality/stability, `useDispatch`, non-reactive `getState` and thunk/middleware loading/query guards | `redux` | `redux.actions-slices-and-store` | `../_knowledge/redux/actions-slices-and-store.md` | MERGED |
| R03 middleware closure shape, `next` versus `dispatch`, downstream return value, order and logger/analytics/permission failure boundaries | `redux` | `redux.middleware-chain-and-manual-thunks` | `../_knowledge/redux/middleware-chain-and-manual-thunks.md` | MAPPED |
| R03 function-versus-action thunk dispatch, `dispatch`/`getState` injection, classic/Toolkit middleware installation and recursive-dispatch caveat | `redux` | `redux.middleware-chain-and-manual-thunks` | `../_knowledge/redux/middleware-chain-and-manual-thunks.md` | MAPPED |
| R04 normal versus thunk action creators and explicit request/success/failure async state transitions | `redux` | `redux.middleware-chain-and-manual-thunks` | `../_knowledge/redux/middleware-chain-and-manual-thunks.md` | MAPPED |
| R04 current-state guards, conditional/chained orchestration, component integration, serializable errors and duplicate-request boundary | `redux` | `redux.middleware-chain-and-manual-thunks` | `../_knowledge/redux/middleware-chain-and-manual-thunks.md` | MAPPED |
| R04 `createAsyncThunk` lifecycle standardization, RTK Query server-state boundary and continued manual-thunk role | `redux` | `redux.async-thunk-lifecycle` | `../_knowledge/redux/async-thunk-lifecycle.md` | MERGED |
| R05 `produce` base/draft/next-state model, structural sharing, draft lifetime and immutable nested/array edits | `redux` | `redux.actions-slices-and-store` | `../_knowledge/redux/actions-slices-and-store.md` | MERGED |
| R06 manual copying versus Immer updates, Toolkit case-reducer drafts and whole-state replacement versus local draft rebinding | `redux` | `redux.actions-slices-and-store` | `../_knowledge/redux/actions-slices-and-store.md` | MERGED |
| Coverage inventories, region assignments, repeated placements and audit metadata | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- Classic store/connect/hooks and Immer-backed slice semantics extend the existing broad store/actions/slices unit rather than creating region-shaped duplicates.
- Middleware traversal and manual thunk orchestration form one focused new unit because `next`/`dispatch` mechanics directly explain how function dispatch becomes async flow.
- Toolkit async lifecycle detail remains in the existing `createAsyncThunk` unit; the new unit keeps only the manual-thunk comparison and selection boundary.

| Status | Count |
|---|---:|
| MAPPED | 4 |
| MERGED | 7 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |

