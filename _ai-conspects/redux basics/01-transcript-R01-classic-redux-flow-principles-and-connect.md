# Regional transcript — R01: Classic Redux flow, principles and connect

Conspect: `redux basics`  
Generated: 2026-06-27 17:30:00 UTC

## Coverage

```text
text elements represented: 2 / 2
image uses processed: 13 / 13
unique screenshots represented: 13
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Redux models application state as a one-way data flow: UI dispatches an action, reducers calculate the next state, the store publishes it and subscribed UI reads the result.

## Redux versus Context

- Redux is useful when state is shared widely, transitions must be predictable and middleware/debugging matter.
- Context can be sufficient for small or slowly changing cross-cutting values.
- Redux DevTools, middleware and explicit actions make complex update flows inspectable.
- The decision should follow state complexity and workflow needs rather than component count alone.

## Three principles

- A store is the single source of truth for the state owned by that Redux store.
- State is read-only from application code; changes are requested by dispatching actions.
- Reducers are pure functions that calculate new state from previous state and action.
- Reducers must not perform I/O or mutate existing state in classic Redux.

## Building blocks

- Action types identify events.
- Actions are plain objects with a `type` and optional payload.
- Action creators are functions that return actions.
- Reducers return the next state.
- The store exposes `dispatch`, `getState` and `subscribe`.

## mapStateToProps

- Receives the entire Redux state.
- Selects only the data needed by the connected component.
- The returned object becomes component props.
- Keep selection logic reusable through selector functions when it becomes complex.

## mapDispatchToProps and connect

- Maps dispatching action creators to prop callbacks.
- `connect(mapStateToProps, mapDispatchToProps)(Component)` subscribes and injects the selected state/actions.
- Connected components rerender when their selected values change.
- The hooks API is now more common, but connect remains valid and useful.

## Representative pattern

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

## Caveats

- A Redux store is a single source of truth only for the state deliberately placed in that store.
- Do not copy every local UI value into Redux without a sharing or workflow reason.

## Source labels

- `full usage of classic redux + map functions + connect`
- `map funcs, connect`

## Covered text elements

```text
T-001, T-002
```

## Covered screenshot uses

```text
IU-022, IU-023, IU-024, IU-025, IU-026, IU-027, IU-029, IU-030, IU-031, IU-032, IU-033, IU-037, IU-038
```

## Reading quality

- Complete regional contact sheets were reviewed.
- The semantic road and code examples were readable.
- Exact punctuation and library-version details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the concepts and flow represented in this region.
