# Regional transcript — R03: Middleware, custom middleware and thunk

Conspect: `redux basics`  
Generated: 2026-06-27 17:30:00 UTC

## Coverage

```text
text elements represented: 3 / 3
image uses processed: 17 / 17
unique screenshots represented: 17
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Redux middleware sits between `dispatch` and reducers. It can inspect actions, dispatch additional actions, read state, delay forwarding or stop an action.

## Middleware signature

- The canonical shape is `storeAPI => next => action => result`.
- `storeAPI` exposes `dispatch` and `getState`.
- `next(action)` forwards to the next middleware or reducer.
- `dispatch(action)` restarts the chain from the beginning.
- Returning `next(action)` preserves the downstream return value.

## Why the nested functions exist

- The store supplies long-lived dependencies once.
- Redux composes the returned functions into a chain.
- Each dispatched action then executes the innermost action handler.
- The closure retains `dispatch`, `getState` and configuration without globals.

## Custom examples

- A logger records state before and after `next(action)`.
- Analytics middleware observes selected action types and emits telemetry.
- Permission middleware can block an action based on current user state.
- Side-effect middleware should catch its own failures so logging/analytics does not crash dispatch.

## Applying middleware

- Classic Redux uses `applyMiddleware` when creating the store.
- DevTools composition should include the middleware enhancer.
- Ordering matters because each middleware wraps the next one.
- Avoid putting a logger first when it would log huge or sensitive payloads without filtering.

## Thunk middleware

- Thunk checks whether the dispatched value is a function.
- For a function, it calls it with `(dispatch, getState)`.
- For a normal action object, it forwards to `next`.
- This allows async or conditional orchestration outside reducers.

## Redux Toolkit middleware

- `configureStore` already includes thunk and development checks.
- Add custom middleware through the `middleware` callback and `.concat(...)`.
- Do not replace the default middleware accidentally unless that is deliberate.

## Representative pattern

```js
const logger = ({ getState }) => next => action => {
  console.log("before", action, getState());
  const result = next(action);
  console.log("after", getState());
  return result;
};

const store = createStore(
  rootReducer,
  applyMiddleware(logger, thunk)
);
```

## Caveats

- Calling `dispatch` inside middleware can recurse indefinitely unless the emitted action is distinguishable.
- Reducers remain pure even when middleware performs side effects.

## Source labels

- `middleware, custom middleware`
- `thunk middleware`
- `middleware examples`

## Covered text elements

```text
T-012, T-013, T-014
```

## Covered screenshot uses

```text
IU-039, IU-040, IU-077, IU-078, IU-080, IU-081, IU-082, IU-083, IU-084, IU-085, IU-086, IU-087, IU-088
IU-089, IU-090, IU-091, IU-092
```

## Reading quality

- Complete regional contact sheets were reviewed.
- The semantic road and code examples were readable.
- Exact punctuation and library-version details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the concepts and flow represented in this region.
