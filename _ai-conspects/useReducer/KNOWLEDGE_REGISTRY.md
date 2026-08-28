# Knowledge Registry

Source workspace: `_ai-conspects/useReducer/`

Authoritative processed source: `01-final-transcript.md`; `CURRENT_SOURCE_OF_TRUTH.md` reports all 31 image uses closed.

Original SVG: `source/useReducer.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 state/dispatch/reducer roles, counter composition and `useState` versus `useReducer` selection | `react.reducer-state-transitions-and-initialization` | `react` | `../_knowledge/react/reducer-state-transitions-and-initialization.md` | MAPPED |
| R02 deterministic reducer purity, handler-owned async flow and nondeterministic action inputs | `react.reducer-state-transitions-and-initialization` | `react` | `../_knowledge/react/reducer-state-transitions-and-initialization.md` | MAPPED |
| R02 immutable array/object transition mechanics and React reference detection | `react.reducer-state-transitions-and-initialization` | `react` | `../_knowledge/react/reducer-state-transitions-and-initialization.md` | MAPPED |
| R03 discriminated action union, `never` exhaustiveness, lazy third-argument initializer and reset reuse | `react.reducer-state-transitions-and-initialization` | `react` | `../_knowledge/react/reducer-state-transitions-and-initialization.md` | MAPPED |
| R04 dispatch-to-render timeline, current-render state snapshot and initialArg-expression-versus-React-initialization distinction | `react.reducer-state-transitions-and-initialization` | `react` | `../_knowledge/react/reducer-state-transitions-and-initialization.md` | MAPPED |

Boundary decision: the four source regions describe one reducer transition model; splitting purity, typing, initialization, and dispatch timing would make each piece depend on the others.

| Status | Count |
|---|---:|
| MAPPED | 5 |
| MERGED | 0 |
| NON_LEARNING | 0 |
| UNRESOLVED | 0 |
