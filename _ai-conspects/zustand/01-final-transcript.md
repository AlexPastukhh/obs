# Final semantic transcript — zustand

Authoritative source: `source/zustand.svg`

---

# R01 — store creation and updates

## Core model

Zustand is a small external-state library built around stores and selector hooks. A Provider is not required for the default store API.

```bash
npm i zustand
```

```ts
import { create } from "zustand";

type CounterState = {
  count: number;
  increment: () => void;
  add: (amount: number) => void;
};

export const useCounterStore =
  create<CounterState>((set, get) => ({
    count: 0,

    increment: () =>
      set(state => ({
        count: state.count + 1,
      })),

    add: amount =>
      set(state => ({
        count: state.count + amount,
      })),
  }));
```

`set` updates state. `get` reads the current state inside store actions and middleware.

## Component selectors

Subscribe only to the state needed by a component:

```tsx
const count =
  useCounterStore(
    state => state.count,
  );

const increment =
  useCounterStore(
    state => state.increment,
  );
```

Avoid selecting the whole store when the component only needs one field:

```tsx
const state = useCounterStore();
```

The whole-store subscription changes for every store update.

## Update forms

Object update:

```ts
set({
  loading: true,
});
```

Functional update:

```ts
set(state => ({
  count: state.count + 1,
}));
```

Functional updates are safer when the next value depends on current state.

## Shallow merge

By default, Zustand shallow-merges the returned partial object into the current top-level state:

```ts
set({
  loading: true,
});
```

Other top-level keys remain.

Nested objects are not deeply merged:

```ts
set({
  user: {
    name: "B",
  },
});
```

can replace the entire `user` object. Preserve nested data explicitly:

```ts
set(state => ({
  user: {
    ...state.user,
    name: "B",
  },
}));
```

## Replace mode

The second `set` argument can replace the entire state:

```ts
set(
  {
    count: 0,
  },
  true,
);
```

Use replacement rarely because actions and unrelated fields can be removed.

## Multiple updates and notifications

Each `set(...)` is a store update. Zustand notifies subscribers after every update.

```ts
setLoading(true);
increment();
increment();
setLoading(false);
```

can produce several subscription notifications and selector comparisons.

Prefer one update when the changes are logically one transaction:

```ts
set(state => ({
  loading: false,
  count: state.count + 2,
}));
```

This is about store notifications and render work, not merely React's local-state batching.

---

# R02 — Immer and persistence

## Manual immutable update

Without middleware, nested state must be copied:

```ts
set(state => ({
  user: {
    ...state.user,
    address: {
      ...state.user.address,
      city: "Kaunas",
    },
  },
}));
```

## Immer without middleware

```ts
import { produce }
  from "immer";

set(
  produce(state => {
    state.user.address.city =
      "Kaunas";
  }),
);
```

This works because `produce` returns a new immutable state.

## Immer middleware

```ts
import { create }
  from "zustand";

import { immer }
  from "zustand/middleware/immer";

export const useStore = create(
  immer<State>(set => ({
    user: initialUser,

    setCity: city =>
      set(state => {
        state.user.address.city =
          city;
      }),
  })),
);
```

Middleware is needed when mutation-style callbacks are passed directly to Zustand's `set`. It is not required when the application calls `produce` itself.

Immer changes update syntax; it does not remove the need for good selectors or automatically prevent notifications.

## Persist middleware

```ts
import { persist }
  from "zustand/middleware";

export const useAuthStore = create(
  persist<AuthState>(
    set => ({
      token: "",
      setToken: token =>
        set({ token }),
      logout: () =>
        set({ token: "" }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
```

`persist` saves selected state to browser storage and rehydrates it later.

Useful options include:

```text
name
storage
partialize
version
migrate
onRehydrateStorage
```

Persist only data that should survive reloads. Do not treat local storage as a secure place for sensitive credentials. Security requirements may favor server-managed HttpOnly cookies.

---

# R03 — selectors and render optimization

## Selector execution

On every store update, Zustand runs selectors for subscribers and compares the new selected value with the previous selected value.

Primitive selector:

```ts
const count =
  useStore(
    state => state.count,
  );
```

usually compares by `Object.is`.

## New object problem

```ts
const selection =
  useStore(state => ({
    count: state.count,
    increment: state.increment,
  }));
```

creates a new object each time the selector runs. Even if its fields are unchanged, the reference is different.

Use separate selectors or shallow comparison.

## `shallow`

```ts
import { shallow }
  from "zustand/shallow";

const {
  count,
  increment,
} = useStore(
  state => ({
    count: state.count,
    increment: state.increment,
  }),
  shallow,
);
```

Depending on Zustand version/API, an equivalent shallow-selector helper may be used.

`shallow` compares top-level selected values. It is not a deep comparison.

If a selected nested object receives a new reference, shallow comparison considers it changed.

## Derived state

Compute inexpensive derived values in selectors:

```ts
const total = useCartStore(
  state =>
    state.items.reduce(
      (sum, item) =>
        sum + item.price,
      0,
    ),
);
```

For expensive derivations, consider memoization, precomputed state, or a more focused store design.

## Splitting stores

Common approaches:

```text
several small domain stores
one larger store with slices
```

Choose boundaries based on domain ownership and update frequency. Separate stores can reduce unrelated selector work, while slices can centralize cross-domain actions.

---

# R04 — async actions, `get` and subscriptions

## Async actions

No special async middleware is required:

```ts
const useProductsStore = create<
  ProductsState
>((set, get) => ({
  loading: false,
  products: [],
  error: null,

  fetchProducts: async () => {
    if (get().loading) {
      return;
    }

    set({
      loading: true,
      error: null,
    });

    try {
      const response =
        await api.get("/products");

      set({
        products: response.data,
        loading: false,
      });
    } catch (error) {
      set({
        error,
        products: [],
        loading: false,
      });
    }
  },
}));
```

`get()` reads the latest store state at action execution time.

Typical uses:

```text
prevent duplicate fetches
read authentication state
avoid duplicate derived work
chain decisions based on current state
```

Use domain-specific loading flags when several independent requests can run.

## `subscribe`

Outside React:

```ts
const unsubscribe =
  useCounterStore.subscribe(
    state => state.count,
    (count, previousCount) => {
      console.log(
        previousCount,
        count,
      );
    },
  );

unsubscribe();
```

Depending on configuration/version, selector subscriptions may require the relevant middleware/helper.

Subscriptions are useful for:

```text
analytics
logging
storage synchronization
WebSocket or audio side effects
integration with non-React code
```

Always unsubscribe when the listener is no longer needed.

## Built-in middleware

Common middleware includes:

```text
persist
devtools
immer
subscribeWithSelector
```

Middleware wraps or enhances the store creator and can intercept `set`, expose devtools metadata, add persistence, or change update behavior.

---

# R05 — custom middleware and API boundaries

## Middleware shape

Conceptually:

```ts
const middleware =
  config =>
  (set, get, api) => {
    // wrap set/get/api
    return config(
      wrappedSet,
      wrappedGet,
      api,
    );
  };
```

Logger example:

```ts
const logger =
  config =>
  (set, get, api) => {
    const wrappedSet = (
      partial,
      replace,
    ) => {
      const previousState = get();

      set(partial, replace);

      const nextState = get();

      console.log({
        partial,
        replace,
        previousState,
        nextState,
      });
    };

    return config(
      wrappedSet,
      get,
      api,
    );
  };
```

The middleware receives the original store initializer and returns another initializer.

## `partial` and `replace`

The internal update arguments represent:

```text
partial
    object update or functional update

replace = false
    shallow merge into current state

replace = true
    replace the whole state
```

A custom middleware must forward both arguments correctly.

## Wrapped `get` and `getState`

Important boundaries:

```text
get()
    the get function supplied to store actions;
    can be wrapped by middleware

api.getState()
    store API method;
    only wrapped if middleware explicitly replaces it

useStore(selector)
    React subscription API;
    separate from get/getState wrappers
```

Wrapping `get` inside the initializer does not automatically wrap `useStore.getState()`.

To instrument external reads, middleware must deliberately replace or decorate `api.getState`.

## TypeScript template

```ts
type CounterState = {
  count: number;
  increment: () => void;
};

export const useCounterStore =
  create<CounterState>(set => ({
    count: 0,

    increment: () =>
      set(state => ({
        count: state.count + 1,
      })),
  }));
```

## Common mistakes

```text
selecting the entire store
returning new selector objects without equality handling
assuming nested state is deeply merged
using several set calls for one logical update
persisting sensitive state without a security review
forgetting to unsubscribe
assuming middleware-wrapped get also wraps getState
performing expensive derivations in every selector run
```

# Coverage

```text
unique embedded screenshots: 80
image uses: 80
native SVG labels: 27
duplicate extra placements: 0

processed image uses: 80
processed text labels: 27
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
