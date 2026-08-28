# Knowledge Registry

Source workspace: `_ai-conspects/zustand/`

Authoritative processed source: `01-final-transcript.md` (identical regional copies: `regions/final-transcript.md` and `regions/R01R02R03R04R05-semantic-transcript-final-v001.md`)

Original SVG: `source/zustand.svg`

Evidence and coverage: `data/final-coverage-audit.json`; 80 of 80 image uses and 27 of 27 native SVG labels are closed.

| Source claim group | Topic | Knowledge ID | Destination file | Mapping |
|---|---|---|---|---|
| R01 default Provider-free store model, typed `create`, action-owned `set` and current-state `get` | `react` | `react.zustand-store-creation-and-update-semantics` | `../_knowledge/react/zustand-store-creation-and-update-semantics.md` | MAPPED |
| R01 focused component selectors, whole-store subscription cost and object/functional update forms | `react` | `react.zustand-store-creation-and-update-semantics` | `../_knowledge/react/zustand-store-creation-and-update-semantics.md` | MAPPED |
| R01 top-level shallow merge, explicit nested copying and whole-state replacement risk | `react` | `react.zustand-store-creation-and-update-semantics` | `../_knowledge/react/zustand-store-creation-and-update-semantics.md` | MAPPED |
| R01 per-`set` notifications and combining one logical store transaction | `react` | `react.zustand-store-creation-and-update-semantics` | `../_knowledge/react/zustand-store-creation-and-update-semantics.md` | MAPPED |
| R03 selector execution/equality, new-object reference problem and version-qualified shallow comparison | `react` | `react.zustand-selectors-async-actions-and-subscriptions` | `../_knowledge/react/zustand-selectors-async-actions-and-subscriptions.md` | MAPPED |
| R03 derived-state cost and domain-store versus slice boundary | `react` | `react.zustand-selectors-async-actions-and-subscriptions` | `../_knowledge/react/zustand-selectors-async-actions-and-subscriptions.md` | MAPPED |
| R04 async actions, latest-state `get`, duplicate-fetch guard and independent loading-state ownership | `react` | `react.zustand-selectors-async-actions-and-subscriptions` | `../_knowledge/react/zustand-selectors-async-actions-and-subscriptions.md` | MAPPED |
| R04 external subscription values, non-React integration, helper/configuration boundary and unsubscribe lifecycle | `react` | `react.zustand-selectors-async-actions-and-subscriptions` | `../_knowledge/react/zustand-selectors-async-actions-and-subscriptions.md` | MAPPED |
| R02 manual immutable copying, direct Immer `produce` and Immer-middleware distinction | `react` | `react.zustand-immer-persist-and-custom-middleware` | `../_knowledge/react/zustand-immer-persist-and-custom-middleware.md` | MAPPED |
| R02 persistence options, rehydration/versioning and sensitive browser-storage boundary | `react` | `react.zustand-immer-persist-and-custom-middleware` | `../_knowledge/react/zustand-immer-persist-and-custom-middleware.md` | MAPPED |
| R04-R05 built-in/custom middleware shape, logger composition and exact `partial`/`replace` forwarding | `react` | `react.zustand-immer-persist-and-custom-middleware` | `../_knowledge/react/zustand-immer-persist-and-custom-middleware.md` | MAPPED |
| R05 wrapped initializer `get`, external `api.getState` and React selector API boundaries | `react` | `react.zustand-immer-persist-and-custom-middleware` | `../_knowledge/react/zustand-immer-persist-and-custom-middleware.md` | MAPPED |
| Source inventory, image/text assignment and coverage metadata | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- Core state-update semantics remain separate from selector/subscription behavior so neither becomes a broad Zustand summary card.
- Async actions stay with selector/subscription lifecycle because both depend on reading and reacting to current external-store state.
- Immer, persistence and custom middleware share one unit around initializer wrapping and API ownership.
- Version-dependent shallow and selector-subscription forms retain the authoritative source's qualification instead of being asserted as universal signatures.

| Status | Count |
|---|---:|
| MAPPED | 12 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
