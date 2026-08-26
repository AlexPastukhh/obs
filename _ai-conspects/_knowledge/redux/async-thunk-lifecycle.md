# createAsyncThunk lifecycle and request state

Knowledge ID: `redux.async-thunk-lifecycle`

Topic: `redux`

## Core model

`createAsyncThunk` derives `pending`, `fulfilled`, and `rejected` actions from a type prefix. Dispatch immediately emits pending; the payload creator then resolves to fulfilled payload or throws/rejects.

Lifecycle metadata includes the original argument, request ID, and status. Use `rejectWithValue` for controlled domain failures; otherwise inspect serialized `action.error`. Request state commonly clears errors on pending, stores data on fulfilled, and records controlled or unexpected errors on rejected.

## What should be recallable

- Type prefix versus URL; lifecycle order and action shapes; thunk signal; `rejectWithValue`; loading/error/data transitions.

## Sources

- Workspace: `_ai-conspects/redux rtk/`
- Processed source: `01-final-transcript.md`, R03
- Original SVG: `source/redux rtk.svg`
