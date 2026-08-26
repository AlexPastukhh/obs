# Actions, slices, store, Provider, and selectors

Knowledge ID: `redux.actions-slices-and-store`

Topic: `redux`

## Core model

Redux actions are plain objects with required `type` and optional `payload`, `error`, and `meta`. `createSlice` groups state, case reducers, and generated action creators; apparent reducer mutation is implemented immutably through Immer.

`configureStore.reducer` keys define root state paths. Extend default middleware rather than accidentally replacing it. React components require `Provider`, dispatch action-creator results, and read centralized selectors through `useSelector`.

## What should be recallable

- Action shape; generated type convention; slice ownership; Immer rule; root state paths; Provider/hooks; selector purpose.

## Sources

- Workspace: `_ai-conspects/redux rtk/`
- Processed source: `01-final-transcript.md`, R01–R02
- Original SVG: `source/redux rtk.svg`
