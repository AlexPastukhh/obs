# Knowledge Registry

Source workspace: `_ai-conspects/react render + useEffect/`

Authoritative processed source: `01-final-transcript.md`; `CURRENT_SOURCE_OF_TRUTH.md` reports 22/22 image uses and 22/22 native labels closed.

Original SVG: `source/react render + useEffect.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 action-owned clearing, route-change effect and `useEffect`/`useLayoutEffect` flicker-versus-blocking choice | `react.root-error-lifetime-and-route-clearing` | `react` | `../_knowledge/react/root-error-lifetime-and-route-clearing.md` | MERGED |
| R02 pure render, render/commit/paint/setup sequence, dependency cleanup ordering and valid external synchronization targets | `react.strict-mode-effect-cleanup` | `react` | `../_knowledge/react/strict-mode-effect-cleanup.md` | MERGED |
| R02 derived-state anti-pattern and direct-render calculation | `react.strict-mode-effect-cleanup` | `react` | `../_knowledge/react/strict-mode-effect-cleanup.md` | MERGED |
| R03 stable setter, callback/provider memoization, guarded hook and provider lifetime across route/remount boundaries | `react.context-provider-identity-and-splitting` | `react` | `../_knowledge/react/context-provider-identity-and-splitting.md` | MERGED |
| R04 cleanup targets/return contract, stale closures/four repair choices and StrictMode setup-cleanup-setup diagnostic | `react.strict-mode-effect-cleanup` | `react` | `../_knowledge/react/strict-mode-effect-cleanup.md` | MERGED |

Boundary decision: all three central models already have stable knowledge identities. The migration extends those units with the source's missing mechanics and provenance instead of creating overlapping React-effect/context cards.

| Status | Count |
|---|---:|
| MAPPED | 0 |
| MERGED | 5 |
| NON_LEARNING | 0 |
| UNRESOLVED | 0 |
