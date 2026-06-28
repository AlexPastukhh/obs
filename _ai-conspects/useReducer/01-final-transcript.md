# Final semantic transcript — useReducer

Authoritative source: `source/useReducer.svg`

---

# R01 — reducer fundamentals

## Shape

```tsx
const [
  state,
  dispatch,
] = useReducer(
  reducer,
  initialState,
);
```

Reducer:

```ts
function reducer(
  state: State,
  action: Action,
): State {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: state.count + 1,
      };

    default:
      return state;
  }
}
```

Roles:

```text
state
    current reducer state

dispatch(action)
    requests an update

reducer(state, action)
    pure function that computes next state
```

## Counter example

```tsx
type State = {
  count: number;
};

type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" };

function reducer(
  state: State,
  action: Action,
): State {
  switch (action.type) {
    case "increment":
      return {
        count: state.count + 1,
      };

    case "decrement":
      return {
        count: state.count - 1,
      };

    case "reset":
      return {
        count: 0,
      };
  }
}
```

```tsx
function Counter() {
  const [
    state,
    dispatch,
  ] = useReducer(
    reducer,
    { count: 0 },
  );

  return (
    <>
      <p>{state.count}</p>

      <button
        onClick={() =>
          dispatch({
            type: "increment",
          })
        }
      >
        +
      </button>
    </>
  );
}
```

The UI dispatches intent. The reducer centralizes how each intent changes state.

## `useState` versus `useReducer`

Use `useState` when:

```text
state is simple
updates are independent
the next value is obvious
```

Use `useReducer` when:

```text
state has several related fields
many transitions exist
updates depend on current state
transition rules should be centralized
action history is useful for debugging
```

A large form with validation, submitting and error states often fits a reducer.

---

# R02 — reducers must be pure

## Deterministic transition

A reducer should satisfy:

```text
same state + same action
→ same next state
```

Avoid inside reducers:

```text
network requests
timers
subscriptions
DOM access
localStorage writes
random values
current timestamps
mutating external objects
```

Bad:

```ts
function reducer(
  state: State,
  action: Action,
): State {
  switch (action.type) {
    case "save":
      fetch("/api/save", {
        method: "POST",
        body: JSON.stringify(state),
      });

      return state;
  }
}
```

Good:

```ts
async function onSave() {
  dispatch({
    type: "save_started",
  });

  try {
    await api.save(state);

    dispatch({
      type: "save_succeeded",
    });
  } catch (error) {
    dispatch({
      type: "save_failed",
      error,
    });
  }
}
```

The event handler or effect owns the side effect. The reducer owns state transitions.

## Time and randomness

Bad:

```ts
case "add":
  return {
    ...state,
    items: [
      ...state.items,
      {
        id: Date.now(),
        text: action.text,
      },
    ],
  };
```

Better:

```ts
dispatch({
  type: "add",
  id: crypto.randomUUID(),
  text,
});
```

Reducer:

```ts
case "add":
  return {
    ...state,
    items: [
      ...state.items,
      {
        id: action.id,
        text: action.text,
      },
    ],
  };
```

The action carries all nondeterministic input.

## Immutable updates

Do not mutate:

```ts
state.todos.push(todo);
return state;
```

Return a new state:

```ts
return {
  ...state,
  todos: [
    ...state.todos,
    todo,
  ],
};
```

React can then detect the new reference and schedule updates correctly.

---

# R03 — typed actions and lazy initialization

## Discriminated action union

```ts
type Todo = {
  id: string;
  text: string;
  done: boolean;
};

type State = {
  todos: Todo[];
  filter:
    | "all"
    | "active"
    | "done";
};

type Action =
  | {
      type: "add";
      id: string;
      text: string;
    }
  | {
      type: "toggle";
      id: string;
    }
  | {
      type: "remove";
      id: string;
    }
  | {
      type: "setFilter";
      filter: State["filter"];
    };
```

Reducer:

```ts
function reducer(
  state: State,
  action: Action,
): State {
  switch (action.type) {
    case "add":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.id,
            text: action.text,
            done: false,
          },
        ],
      };

    case "toggle":
      return {
        ...state,
        todos: state.todos.map(
          todo =>
            todo.id === action.id
              ? {
                  ...todo,
                  done: !todo.done,
                }
              : todo,
        ),
      };

    case "remove":
      return {
        ...state,
        todos: state.todos.filter(
          todo =>
            todo.id !== action.id,
        ),
      };

    case "setFilter":
      return {
        ...state,
        filter: action.filter,
      };

    default: {
      const neverAction: never =
        action;

      return state;
    }
  }
}
```

The `never` check reveals an unhandled action when the union grows.

## Lazy initialization

Without an initializer:

```tsx
const [
  state,
  dispatch,
] = useReducer(
  reducer,
  computeInitialState(props.items),
);
```

JavaScript evaluates `computeInitialState(...)` whenever the component function renders, even though React ignores the new initial argument after the first mount.

Use the third argument:

```tsx
const [
  state,
  dispatch,
] = useReducer(
  reducer,
  props.items,
  computeInitialState,
);
```

React calls the initializer to produce the initial state.

```ts
function computeInitialState(
  items: Item[],
): State {
  return {
    items,
    filter: "all",
  };
}
```

The initializer is not a side-effect hook. Keep it pure because development checks may call pure functions more than once.

## Reset through initializer logic

```ts
type Action =
  | {
      type: "reset";
      items: Item[];
    }
  | OtherAction;

case "reset":
  return computeInitialState(
    action.items,
  );
```

This reuses the same initialization rule.

---

# R04 — dispatch and render timing

## What dispatch means

```ts
dispatch({
  type: "increment",
});
```

Conceptually:

```text
event handler dispatches action
React schedules an update
React renders the component
React calls reducer with current state and action
reducer returns next state
React commits the resulting UI
```

The reducer participates in render work. It must be pure because React may start, replay or discard render work.

## State is a render snapshot

Immediately after dispatch:

```ts
dispatch({
  type: "increment",
});

console.log(state.count);
```

`state` still refers to the snapshot captured by the current render.

The next state becomes observable in the next render.

Do not make logic depend on reading the old local variable after dispatch. Put transition rules in the reducer, or use an effect that reacts to committed state when external synchronization is required.

## Initial state versus render expressions

React ignores a changed `initialArg` after the component is mounted, but JavaScript still evaluates the expression passed as that argument on each render.

```text
React state initialization
    first mount only

JavaScript argument expression
    evaluated whenever component executes
```

Lazy initialization avoids wasted computation by passing a function instead of its result.

## Reducer checklist

```text
[ ] reducer is pure
[ ] state is updated immutably
[ ] actions describe events or intent
[ ] nondeterministic values are created before dispatch
[ ] API calls run in handlers/effects
[ ] expensive initialization uses init
[ ] TypeScript actions form a discriminated union
[ ] derived lists are computed during render
```

# Coverage

```text
unique embedded screenshots: 31
image uses: 31
native SVG labels: 0
duplicate extra placements: 0

processed image uses: 31
processed text labels: 0
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
