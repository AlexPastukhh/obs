# Regional transcript — R05: Immer draft state and immutability

Conspect: `redux basics`  
Generated: 2026-06-27 17:30:00 UTC

## Coverage

```text
text elements represented: 3 / 3
image uses processed: 18 / 18
unique screenshots represented: 18
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Immer records writes made to a temporary draft and produces a new immutable state with structural sharing.

## Why immutability matters

- Redux change detection commonly relies on reference changes.
- Immutable history enables DevTools replay and time travel.
- Pure state transitions are predictable and easier to test.
- Mutation can cause hidden side effects and missed rerenders.

## produce model

- `produce(baseState, recipe)` creates a proxy draft.
- The recipe may read and write the draft using mutation-like syntax.
- Immer records the edits and returns a new state.
- Unchanged branches reuse their previous references.

## draft versus state

- Inside the recipe, read current values from the draft.
- The draft begins as a proxy view of the base state.
- Base state remains necessary so Immer knows what to proxy and compare.
- Do not leak the draft outside the recipe callback.

## Arrays and nested objects

- `draft.items.push(value)` is safe inside an Immer recipe.
- Nested assignments do not require manual object spreading.
- Filtering can be assigned back to the draft collection.
- The resulting state is immutable even though the recipe looks mutative.

## Thunks and reducers

- Immer solves immutable reducer updates, not async orchestration.
- A thunk may read state and dispatch actions, while reducers/RTK slices update state.
- Plain synchronous action creators still do not require thunk.

## Representative pattern

```js
const nextState = produce(state, draft => {
  draft.items.push(newItem);
  draft.user.profile.address.city = "Paris";
});
```

## Caveats

- The draft is a proxy and should not be stored, returned to unrelated code or compared by identity.
- Large state graphs can still be expensive; normalized state remains useful.

## Source labels

- `immer and`
- `immutability`
- `can read from draft, need to pass state`

## Covered text elements

```text
T-015, T-016, T-017
```

## Covered screenshot uses

```text
IU-001, IU-002, IU-021, IU-053, IU-054, IU-055, IU-056, IU-057, IU-059, IU-060, IU-061, IU-062, IU-095
IU-096, IU-097, IU-098, IU-099, IU-100
```

## Reading quality

- Complete regional contact sheets were reviewed.
- The semantic road and code examples were readable.
- Exact punctuation and library-version details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the concepts and flow represented in this region.
