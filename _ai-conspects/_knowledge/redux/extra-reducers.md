# Cross-slice and async reactions with extraReducers

Knowledge ID: `redux.extra-reducers`

Topic: `redux`

## Core model

Use `reducers` for actions owned by a slice. Use `extraReducers` when reacting to another slice's action, a thunk lifecycle action, or another external action creator.

`builder.addCase(actionCreator, reducer)` preserves type information and avoids duplicating strings. Multiple slices may react to the same dispatched action object. The callback receives the slice's Immer draft and the matched action.

## What should be recallable

- Ownership boundary between reducers and extraReducers; `addCase` matching; action creator versus string; multiple-slice reactions; async lifecycle cases.

## Sources

- Workspace: `_ai-conspects/redux rtk/`
- Processed source: `01-final-transcript.md`, R04
- Original SVG: `source/redux rtk.svg`
