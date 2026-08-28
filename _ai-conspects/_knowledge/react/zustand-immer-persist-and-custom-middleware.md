# Zustand Immer, persistence, and custom middleware boundaries

Knowledge ID: `react.zustand-immer-persist-and-custom-middleware`

Topic: `react`

Zustand middleware wraps or enhances a store initializer. Immer changes nested-update syntax, persistence adds storage and rehydration, and custom middleware can wrap store operations. Each changes a specific boundary; none makes selector or lifecycle design automatic.

## Manual copying, `produce`, and Immer middleware

Without middleware, preserve nested state immutably:

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

Calling Immer's `produce` directly does not require Zustand's Immer middleware because `produce` itself returns the new immutable state:

```ts
import { produce } from "immer";

set(
  produce(state => {
    state.user.address.city =
      "Kaunas";
  }),
);
```

The middleware is useful when mutation-style callbacks are passed directly to Zustand `set`:

```ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

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

Immer changes update syntax. It does not make selectors focused, prevent notifications, or choose store boundaries.

## Persistence and rehydration

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

`persist` stores selected state and rehydrates it later. Source-captured options include:

```text
name
storage
partialize
version
migrate
onRehydrateStorage
```

Persist only state that should survive reloads. Browser storage is not secure storage for sensitive credentials; a security design may instead use server-managed HttpOnly cookies.

Other built-in middleware includes `devtools`, `immer`, and `subscribeWithSelector`.

Middleware can also expose action/update metadata to Redux DevTools; that observability role is distinct from persistence or Immer's update syntax.

## Custom middleware shape

Conceptually, middleware receives one initializer and returns another:

```ts
const middleware =
  config =>
  (set, get, api) => {
    return config(
      wrappedSet,
      wrappedGet,
      api,
    );
  };
```

A logger can inspect state before and after forwarding an update:

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

`partial` may be an object or functional update. `replace = false` requests the normal shallow merge; `replace = true` replaces the whole state. A wrapper must forward both arguments correctly.

## Read API boundaries

The read surfaces are related but not interchangeable:

```text
get()
    initializer/action read function
    middleware can pass a wrapped version to config

api.getState()
    external store API method
    changed only if middleware explicitly decorates/replaces it

useStore(selector)
    React subscription API
    separate from get/getState wrappers
```

Wrapping `get` inside the initializer does not automatically wrap `useStore.getState()`. Middleware that must instrument external reads must deliberately replace or decorate `api.getState` as well.

## What should be recallable

- When is manual copying required, and when does direct `produce` suffice?
- What does Zustand's Immer middleware change?
- Which persistence options own selection, versions, migration and rehydration?
- Why is browser-persisted state not automatically safe for credentials?
- What function shape does custom middleware wrap?
- Why must a wrapper forward both `partial` and `replace`?
- Why does wrapping initializer `get` not instrument `api.getState` or selector reads?

## Related knowledge

- `react.zustand-store-creation-and-update-semantics`
- `react.zustand-selectors-async-actions-and-subscriptions`

## Sources

- Workspace: `_ai-conspects/zustand/`
- Authoritative processed source: `01-final-transcript.md`, R02, R04 middleware overview and R05
- Identical regional transcript: `regions/R01R02R03R04R05-semantic-transcript-final-v001.md`, R02, R04 and R05
- Original SVG: `source/zustand.svg`
