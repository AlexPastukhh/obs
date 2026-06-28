# Regional transcript — R06: Immutable update examples and Redux Toolkit integration

Conspect: `redux basics`  
Generated: 2026-06-27 17:30:00 UTC

## Coverage

```text
text elements represented: 2 / 2
image uses processed: 10 / 10
unique screenshots represented: 10
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

The examples compare manual immutable updates, direct mutation and Immer-backed reducers, including Redux Toolkit reducers that use Immer automatically.

## Simple field updates

- Directly decrementing `state.pizzaBase` mutates the existing object in classic Redux and is unsafe.
- Manual immutable code returns a new object with a changed field.
- Immer code assigns to the draft and returns the generated next state.

## Array updates

- Manual append uses a new array such as `[...state.items, value]`.
- Immer allows `draft.items.push(value)`.
- Manual removal uses `filter`; Immer can assign the filtered array back to the draft field.
- Do not both mutate the draft and return an unrelated new state from the same recipe.

## Nested object updates

- Without Immer, every changed path level must be copied.
- With Immer, assign directly to the nested draft property.
- Structural sharing still preserves references for unchanged branches.

## Redux Toolkit

- `createSlice` case reducers are wrapped in Immer.
- Mutation-like syntax is therefore the recommended RTK style.
- Redux state must still be treated as read-only outside reducers.
- Use `PayloadAction<T>` or equivalent typing to describe payloads.

## Fill-update pattern

- A full replacement action may assign all draft fields from the payload.
- For replacing the entire state, return the replacement object instead of rebinding the local `draft` variable.
- Partial updates should be explicit about which fields are allowed.

## Representative pattern

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

## Caveats

- Redux Toolkit's mutation-like syntax is safe only inside its Immer-enabled reducers.
- Replacing `draft = newValue` does not replace the produced state; return `newValue` when replacing the whole state.

## Source labels

- `examples`
- `!!!`

## Covered text elements

```text
T-018, T-019
```

## Covered screenshot uses

```text
IU-093, IU-094, IU-101, IU-102, IU-103, IU-104, IU-105, IU-106, IU-107, IU-108
```

## Reading quality

- Complete regional contact sheets were reviewed.
- The semantic road and code examples were readable.
- Exact punctuation and library-version details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the concepts and flow represented in this region.
