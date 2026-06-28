# Regional transcript — R02: Store, Provider, selectors, preloaded state and getState

Conspect: `redux basics`  
Generated: 2026-06-27 17:30:00 UTC

## Coverage

```text
text elements represented: 4 / 4
image uses processed: 22 / 22
unique screenshots represented: 20
repeated placements retained: 2
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

React-Redux makes one store available through `Provider`. Components read selected values with `useSelector` and dispatch actions with `useDispatch`.

## Store creation

- `createStore` accepts a reducer and can receive preloaded state.
- `combineReducers` creates a root state whose keys match the reducer map.
- Preloaded state supports SSR hydration, persisted data and controlled tests.
- `store.getState()` returns the current complete state outside React.

## Provider

- Wrap the application with `<Provider store={store}>`.
- Hooks and connected components access the nearest Provider's store.
- Applications normally use one main store; multiple Providers create independent store contexts.
- Passing state as ordinary Provider props is unrelated to Redux unless it is the React-Redux Provider.

## useSelector

- `useSelector(selector)` runs the selector with the current root state.
- The component subscribes to the store and rerenders when the selected result changes by its equality rule.
- Selectors can return a scalar, object or derived value.
- Avoid recreating unstable objects unnecessarily; memoized selectors help with expensive derivation.

## useDispatch

- `useDispatch()` returns the store's dispatch function.
- Dispatch plain actions or thunk functions when thunk middleware is installed.
- Components should express intent through action creators rather than editing state directly.

## getState inside logic

- Thunk functions and middleware receive `getState` for conditional decisions.
- Use it to avoid duplicate requests, read auth tokens or chain actions based on current state.
- A component usually reads render data through selectors rather than direct `store.getState()` calls.

## Loading guards and query context

- Check loading/data state before starting an identical request.
- Read current filters, paging or search state when building an async request.
- Keep server-cache concerns separate when a specialized query library is a better fit.

## Representative pattern

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

## Caveats

- Calling `store.getState()` is not reactive; React does not rerender because arbitrary code read it.
- Selectors should match the actual root-state keys created by `combineReducers`.

## Source labels

- `store provider`
- `the state that useselector can access`
- `init state`
- `getstate`

## Covered text elements

```text
T-003, T-004, T-005, T-011
```

## Covered screenshot uses

```text
IU-003, IU-004, IU-005, IU-006, IU-007, IU-008, IU-009, IU-010, IU-028, IU-034, IU-035, IU-036, IU-041
IU-042, IU-043, IU-044, IU-045, IU-046, IU-073, IU-074, IU-075, IU-076
```

## Reading quality

- Complete regional contact sheets were reviewed.
- The semantic road and code examples were readable.
- Exact punctuation and library-version details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the concepts and flow represented in this region.
