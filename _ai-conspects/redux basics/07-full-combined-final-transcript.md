# Full combined final transcript — redux basics

Generated: 2026-06-27 17:30:00 UTC

## Coverage

```text
meaningful text elements: 19 / 19
unique embedded screenshots: 105 / 105
screenshot uses: 108 / 108
repeated placements retained: 3
regions: 6 / 6
remaining text elements: 0
remaining screenshot uses: 0
```

## Integrated transcript

## R01 — Classic Redux flow, principles and connect

Redux models application state as a one-way data flow: UI dispatches an action, reducers calculate the next state, the store publishes it and subscribed UI reads the result.

### Redux versus Context

- Redux is useful when state is shared widely, transitions must be predictable and middleware/debugging matter.
- Context can be sufficient for small or slowly changing cross-cutting values.
- Redux DevTools, middleware and explicit actions make complex update flows inspectable.
- The decision should follow state complexity and workflow needs rather than component count alone.

### Three principles

- A store is the single source of truth for the state owned by that Redux store.
- State is read-only from application code; changes are requested by dispatching actions.
- Reducers are pure functions that calculate new state from previous state and action.
- Reducers must not perform I/O or mutate existing state in classic Redux.

### Building blocks

- Action types identify events.
- Actions are plain objects with a `type` and optional payload.
- Action creators are functions that return actions.
- Reducers return the next state.
- The store exposes `dispatch`, `getState` and `subscribe`.

### mapStateToProps

- Receives the entire Redux state.
- Selects only the data needed by the connected component.
- The returned object becomes component props.
- Keep selection logic reusable through selector functions when it becomes complex.

### mapDispatchToProps and connect

- Maps dispatching action creators to prop callbacks.
- `connect(mapStateToProps, mapDispatchToProps)(Component)` subscribes and injects the selected state/actions.
- Connected components rerender when their selected values change.
- The hooks API is now more common, but connect remains valid and useful.

### Representative pattern

```js
const mapStateToProps = state => ({
  pizzaBase: state.pizza.pizzaBase
});

const mapDispatchToProps = dispatch => ({
  orderPizza: () => dispatch(orderPizza())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PizzaBox);
```

### Caveats

- A Redux store is a single source of truth only for the state deliberately placed in that store.
- Do not copy every local UI value into Redux without a sharing or workflow reason.

## R02 — Store, Provider, selectors, preloaded state and getState

React-Redux makes one store available through `Provider`. Components read selected values with `useSelector` and dispatch actions with `useDispatch`.

### Store creation

- `createStore` accepts a reducer and can receive preloaded state.
- `combineReducers` creates a root state whose keys match the reducer map.
- Preloaded state supports SSR hydration, persisted data and controlled tests.
- `store.getState()` returns the current complete state outside React.

### Provider

- Wrap the application with `<Provider store={store}>`.
- Hooks and connected components access the nearest Provider's store.
- Applications normally use one main store; multiple Providers create independent store contexts.
- Passing state as ordinary Provider props is unrelated to Redux unless it is the React-Redux Provider.

### useSelector

- `useSelector(selector)` runs the selector with the current root state.
- The component subscribes to the store and rerenders when the selected result changes by its equality rule.
- Selectors can return a scalar, object or derived value.
- Avoid recreating unstable objects unnecessarily; memoized selectors help with expensive derivation.

### useDispatch

- `useDispatch()` returns the store's dispatch function.
- Dispatch plain actions or thunk functions when thunk middleware is installed.
- Components should express intent through action creators rather than editing state directly.

### getState inside logic

- Thunk functions and middleware receive `getState` for conditional decisions.
- Use it to avoid duplicate requests, read auth tokens or chain actions based on current state.
- A component usually reads render data through selectors rather than direct `store.getState()` calls.

### Loading guards and query context

- Check loading/data state before starting an identical request.
- Read current filters, paging or search state when building an async request.
- Keep server-cache concerns separate when a specialized query library is a better fit.

### Representative pattern

```jsx
const store = createStore(rootReducer, preloadedState);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

function PizzaCount() {
  const count = useSelector(state => state.pizza.pizzaBase);
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(orderPizza())}>{count}</button>;
}
```

### Caveats

- Calling `store.getState()` is not reactive; React does not rerender because arbitrary code read it.
- Selectors should match the actual root-state keys created by `combineReducers`.

## R03 — Middleware, custom middleware and thunk

Redux middleware sits between `dispatch` and reducers. It can inspect actions, dispatch additional actions, read state, delay forwarding or stop an action.

### Middleware signature

- The canonical shape is `storeAPI => next => action => result`.
- `storeAPI` exposes `dispatch` and `getState`.
- `next(action)` forwards to the next middleware or reducer.
- `dispatch(action)` restarts the chain from the beginning.
- Returning `next(action)` preserves the downstream return value.

### Why the nested functions exist

- The store supplies long-lived dependencies once.
- Redux composes the returned functions into a chain.
- Each dispatched action then executes the innermost action handler.
- The closure retains `dispatch`, `getState` and configuration without globals.

### Custom examples

- A logger records state before and after `next(action)`.
- Analytics middleware observes selected action types and emits telemetry.
- Permission middleware can block an action based on current user state.
- Side-effect middleware should catch its own failures so logging/analytics does not crash dispatch.

### Applying middleware

- Classic Redux uses `applyMiddleware` when creating the store.
- DevTools composition should include the middleware enhancer.
- Ordering matters because each middleware wraps the next one.
- Avoid putting a logger first when it would log huge or sensitive payloads without filtering.

### Thunk middleware

- Thunk checks whether the dispatched value is a function.
- For a function, it calls it with `(dispatch, getState)`.
- For a normal action object, it forwards to `next`.
- This allows async or conditional orchestration outside reducers.

### Redux Toolkit middleware

- `configureStore` already includes thunk and development checks.
- Add custom middleware through the `middleware` callback and `.concat(...)`.
- Do not replace the default middleware accidentally unless that is deliberate.

### Representative pattern

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

### Caveats

- Calling `dispatch` inside middleware can recurse indefinitely unless the emitted action is distinguishable.
- Reducers remain pure even when middleware performs side effects.

## R04 — Action creators, thunk action creators and async flow

A normal action creator returns a plain action. A thunk action creator returns a function that middleware executes with `dispatch` and `getState`.

### Normal action creator

- Calling the creator produces an object.
- Dispatch receives the resulting plain object.
- No thunk middleware is needed.
- Use normal creators for synchronous state transitions.

### Thunk action creator

- Calling the creator produces a function.
- Dispatching that function requires thunk middleware.
- The thunk can perform I/O and dispatch zero or more plain actions.
- It can read current state through `getState`.

### Classic async lifecycle

- Dispatch a request/start action before the API call.
- Dispatch success with data when the promise resolves.
- Dispatch failure with a serializable error payload when it rejects.
- The reducer updates `loading`, `data` and `error` for each phase.

### Conditional and chained logic

- Skip a request when equivalent data is already loading or cached.
- Read auth/filter state before constructing the request.
- Dispatch a follow-up action after success.
- Keep component code small by locating orchestration in the thunk.

### Component integration

- Hooks code calls `dispatch(fetchProducts())`.
- Classic connect maps the same thunk action creator through `mapDispatchToProps`.
- Components select loading/data/error and render the current state.

### Modern direction

- Redux Toolkit `createAsyncThunk` standardizes pending/fulfilled/rejected actions.
- RTK Query is often preferable for server-state fetching and caching.
- Manual thunks remain useful for multi-step workflows and non-query orchestration.

### Representative pattern

```js
export const fetchProducts = () => async (dispatch, getState) => {
  if (getState().products.loading) return;

  dispatch({ type: "FETCH_REQUEST" });

  try {
    const { data } = await axios.get("/products");
    dispatch({ type: "FETCH_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_ERROR", payload: error.message });
  }
};
```

### Caveats

- Do not dispatch raw Error objects when serializable state/actions are required.
- Guard retries and duplicate calls explicitly; async dispatch alone does not deduplicate requests.

## R05 — Immer draft state and immutability

Immer records writes made to a temporary draft and produces a new immutable state with structural sharing.

### Why immutability matters

- Redux change detection commonly relies on reference changes.
- Immutable history enables DevTools replay and time travel.
- Pure state transitions are predictable and easier to test.
- Mutation can cause hidden side effects and missed rerenders.

### produce model

- `produce(baseState, recipe)` creates a proxy draft.
- The recipe may read and write the draft using mutation-like syntax.
- Immer records the edits and returns a new state.
- Unchanged branches reuse their previous references.

### draft versus state

- Inside the recipe, read current values from the draft.
- The draft begins as a proxy view of the base state.
- Base state remains necessary so Immer knows what to proxy and compare.
- Do not leak the draft outside the recipe callback.

### Arrays and nested objects

- `draft.items.push(value)` is safe inside an Immer recipe.
- Nested assignments do not require manual object spreading.
- Filtering can be assigned back to the draft collection.
- The resulting state is immutable even though the recipe looks mutative.

### Thunks and reducers

- Immer solves immutable reducer updates, not async orchestration.
- A thunk may read state and dispatch actions, while reducers/RTK slices update state.
- Plain synchronous action creators still do not require thunk.

### Representative pattern

```js
const nextState = produce(state, draft => {
  draft.items.push(newItem);
  draft.user.profile.address.city = "Paris";
});
```

### Caveats

- The draft is a proxy and should not be stored, returned to unrelated code or compared by identity.
- Large state graphs can still be expensive; normalized state remains useful.

## R06 — Immutable update examples and Redux Toolkit integration

The examples compare manual immutable updates, direct mutation and Immer-backed reducers, including Redux Toolkit reducers that use Immer automatically.

### Simple field updates

- Directly decrementing `state.pizzaBase` mutates the existing object in classic Redux and is unsafe.
- Manual immutable code returns a new object with a changed field.
- Immer code assigns to the draft and returns the generated next state.

### Array updates

- Manual append uses a new array such as `[...state.items, value]`.
- Immer allows `draft.items.push(value)`.
- Manual removal uses `filter`; Immer can assign the filtered array back to the draft field.
- Do not both mutate the draft and return an unrelated new state from the same recipe.

### Nested object updates

- Without Immer, every changed path level must be copied.
- With Immer, assign directly to the nested draft property.
- Structural sharing still preserves references for unchanged branches.

### Redux Toolkit

- `createSlice` case reducers are wrapped in Immer.
- Mutation-like syntax is therefore the recommended RTK style.
- Redux state must still be treated as read-only outside reducers.
- Use `PayloadAction<T>` or equivalent typing to describe payloads.

### Fill-update pattern

- A full replacement action may assign all draft fields from the payload.
- For replacing the entire state, return the replacement object instead of rebinding the local `draft` variable.
- Partial updates should be explicit about which fields are allowed.

### Representative pattern

```js
const pizzaSlice = createSlice({
  name: "pizza",
  initialState: { pizzaBase: 10, ingredients: [] },
  reducers: {
    orderPizza(state) {
      state.pizzaBase -= 1;
    },
    addIngredient(state, action) {
      state.ingredients.push(action.payload);
    }
  }
});
```

### Caveats

- Redux Toolkit's mutation-like syntax is safe only inside its Immer-enabled reducers.
- Replacing `draft = newValue` does not replace the produced state; return `newValue` when replacing the whole state.

## Regional source map

### R01

- transcript: `01-transcript-R01-classic-redux-flow-principles-and-connect.md`
- text elements: `2`
- screenshot uses: `13`
- unique screenshots: `13`
- repeated placements: `0`
- remaining: `0`

### R02

- transcript: `02-transcript-R02-store-provider-selectors-preloaded-state-and-getstate.md`
- text elements: `4`
- screenshot uses: `22`
- unique screenshots: `20`
- repeated placements: `2`
- remaining: `0`

### R03

- transcript: `03-transcript-R03-middleware-custom-middleware-and-thunk.md`
- text elements: `3`
- screenshot uses: `17`
- unique screenshots: `17`
- repeated placements: `0`
- remaining: `0`

### R04

- transcript: `04-transcript-R04-action-creators-thunk-action-creators-and-async-flow.md`
- text elements: `5`
- screenshot uses: `28`
- unique screenshots: `27`
- repeated placements: `1`
- remaining: `0`

### R05

- transcript: `05-transcript-R05-immer-draft-state-and-immutability.md`
- text elements: `3`
- screenshot uses: `18`
- unique screenshots: `18`
- repeated placements: `0`
- remaining: `0`

### R06

- transcript: `06-transcript-R06-immutable-update-examples-and-redux-toolkit-integration.md`
- text elements: `2`
- screenshot uses: `10`
- unique screenshots: `10`
- repeated placements: `0`
- remaining: `0`

## Exactness note

This is the authoritative semantic transcript. The preserved SVG and
extracted screenshots remain authoritative for exact code punctuation,
version-specific APIs and original examples.
