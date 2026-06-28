# Final semantic transcript — persistence with React Query, Zustand and Redux Persist

Authoritative source: `source/persistance, zustand,rquery,redux.svg`

Raw uploaded source: `source/persistance, zustand,rquery,redux(1).svg`

This is a semantic transcript of the canvas. Extracted screenshots remain authoritative for exact code punctuation and package-version details.

## 1. Mental model: memory state versus persisted state

All three libraries maintain an in-memory runtime representation and optionally save a serializable snapshot to external storage.

```text
runtime memory
    React Query cache
    Zustand store
    Redux store

persistence boundary
    selects, serializes and writes a snapshot

restore boundary
    reads, validates/transforms and merges the snapshot back into memory
```

Persisted state is not the live state object. It is a stored representation with its own lifecycle, schema version, expiration policy and write frequency.

## 2. Cross-library mapping

| Concern | React Query | Zustand persist | Redux Persist |
|---|---|---|---|
| persisted unit | dehydrated query/mutation cache | selected store state | selected reducer state |
| save conversion | `dehydrate` | `partialize` plus storage serialization | inbound `transform` |
| restore conversion | `hydrate` | `migrate` and `onRehydrateStorage` | migration, outbound `transform`, reconciler |
| schema invalidation | `buster` | `version` + `migrate` | `version` + `migrate` |
| selective persistence | `shouldDehydrateQuery`, `shouldDehydrateMutation` | `partialize` | whitelist/blacklist, nested persist, transforms |
| write throttling | persister `throttleTime` / persister implementation | custom storage wrapper | persist config `throttle` |
| force pending write | explicit persister save where supported | custom wrapper `flush` | `persistor.flush()` |
| clear persisted data | remove persisted client | `store.persist.clearStorage()` | `persistor.purge()` |

The names are similar but the persisted units differ. React Query persists cache entries; Zustand and Redux Persist primarily persist application state.

## 3. React Query persistence

### Provider and persister

A persistent query client combines a `QueryClient`, a storage persister and restore options.

```tsx
<PersistQueryClientProvider
  client={queryClient}
  persistOptions={{
    persister,
    maxAge,
    buster,
    dehydrateOptions,
  }}
>
  <App />
</PersistQueryClientProvider>
```

A storage persister writes the dehydrated cache into sync or async storage.

```text
sync storage
    browser-style synchronous storage

async storage
    IndexedDB, React Native async storage or another promise-based adapter
```

The source notes that the exact helper package/API can vary by TanStack Query generation, so the canvas keeps both sync and async persister concepts rather than treating one helper name as permanent.

### Dehydration

`dehydrate` converts cache state into a plain serializable snapshot.

By default, persistence commonly includes successful queries and paused mutations. Filters control inclusion:

```ts
dehydrateOptions: {
  shouldDehydrateQuery: query =>
    query.state.status === "success"
    && query.meta?.persist === true,

  shouldDehydrateMutation: mutation =>
    mutation.state.isPaused,
}
```

`meta` can mark cache entries for persistence and can also be read inside a query function through query context.

```ts
useQuery({
  queryKey: ["posts"],
  meta: { persist: true },
  queryFn: ({ meta }) =>
    fetchPosts({
      persist: meta?.persist === true,
    }),
});
```

This avoids persisting every successful cache entry and prevents storage growth from debug, transient or private queries.

React Query selection is query/mutation-entry level. It is not a first-class field-level partialization API for arbitrary `query.data`. Field-level reduction requires a custom serializer/deserializer and must preserve cache invariants carefully.

### Hydration and restoration

`hydrate` restores a dehydrated snapshot into a `QueryClient`.

`useIsRestoring()` can prevent components from treating restore-time cache state as ordinary runtime fetching.

```tsx
const isRestoring =
  useIsRestoring();
```

The source emphasizes setting query `gcTime` at least as high as persistence `maxAge`; otherwise an inactive query can be removed from memory earlier than the persisted snapshot is allowed to live.

### `maxAge`

`maxAge` is checked while restoring a persisted cache. An expired snapshot is rejected rather than continuously deleted by a live timer.

```text
save
    snapshot receives persisted timestamp

restore
    current time - persisted timestamp > maxAge
        discard snapshot
```

It is a persisted-cache TTL.

### `buster`

`buster` is a hard invalidation token for persisted cache snapshots.

```ts
persistOptions: {
  persister,
  buster: BUILD_OR_SCHEMA_ID,
}
```

A mismatched buster means “this snapshot belongs to an incompatible app/data version; discard it.” This is closer to replacing a storage bucket or hard reset than to a schema migration function.

### Explicit save and throttling

A persistence subscriber can save whenever meaningful cache changes occur. The persister throttles/coalesces those saves to reduce serialization and storage I/O.

```text
many cache updates
    subscriber receives many events
    throttle collapses them
    one later persisted snapshot
```

For standard whole-client persistence, throttling is effectively global to that persisted client snapshot.

When per-query persistence behavior is required, use the dedicated per-query persister route supported by the installed TanStack Query generation rather than assuming whole-client persistence can throttle each query independently.

## 4. Zustand `persist`

### Basic store

```ts
type AuthState = {
  token: string | null;
  user: User | null;
  theme: "light" | "dark";
  loginCount: number;

  setAuth:
    (
      token: string,
      user: User,
    ) => void;

  logout: () => void;
};

export const useAuthStore =
  create<AuthState>()(
    persist(
      set => ({
        token: null,
        user: null,
        theme: "light",
        loginCount: 0,

        setAuth:
          (token, user) =>
            set({
              token,
              user,
            }),

        logout:
          () =>
            set({
              token: null,
              user: null,
            }),
      }),
      {
        name: "auth-storage",
        storage:
          createJSONStorage(
            () => localStorage,
          ),
      },
    ),
  );
```

Important options:

```text
name
    storage key; changing it starts using another persisted bucket

storage
    storage adapter

partialize
    choose which state fields are written

version
    current persisted schema version

migrate
    convert older snapshots into current shape

onRehydrateStorage
    hook around restoration
```

### `partialize`

```ts
partialize: state => ({
  token: state.token,
  user: state.user,
  theme: state.theme,
})
```

Only the returned object is persisted. Runtime-only fields such as counters, loading flags and errors remain in memory.

### Version and migration

`version` is schema metadata for the persisted format.

```ts
{
  name: "auth-storage",
  version: 2,
  migrate: (
    persistedState,
    persistedVersion,
  ) => {
    if (persistedVersion === 1) {
      return {
        ...persistedState,
        theme: "light",
      };
    }

    return persistedState;
  },
}
```

Flow:

```text
write
    Zustand stores current configured version

restore
    stored version == configured version
        restore normally

    stored version != configured version
        run migrate

    migration unavailable/incompatible
        reject or reset persisted state
```

Do not manually mutate a `state.version` field inside `migrate`. The version is persistence metadata managed by the middleware.

A breaking schema change usually requires:

```text
1. update persisted shape
2. increment configured version
3. add migration path or intentionally return fresh defaults
```

Changing only actions or non-persisted fields normally does not require migration.

Changing `name` abandons the old storage key. It is a clean reset but leaves old storage unless separately removed.

### Persist middleware methods

The canvas records the imperative API exposed through `store.persist`:

```ts
store.persist.clearStorage();
await store.persist.rehydrate();

store.persist.hasHydrated();

const unsubStart =
  store.persist.onHydrate(
    state => {},
  );

const unsubFinish =
  store.persist.onFinishHydration(
    state => {},
  );

store.persist.setOptions({
  name: "new-name",
});
```

These methods support explicit clearing, forced rehydration, hydration status subscriptions and runtime option changes.

### TTL for Zustand

Zustand persist has schema migration and storage customization but no universal built-in `maxAge` option equivalent to React Query persistence.

A practical TTL stores an expiration timestamp inside the persisted subset and rejects it during restore/migration.

```ts
const ONE_DAY =
  24 * 60 * 60 * 1000;

type PersistedAuth = {
  token: string | null;
  user: User | null;
  expiresAt: number;
};
```

```ts
partialize: state => ({
  token: state.token,
  user: state.user,
  expiresAt:
    Date.now() + ONE_DAY,
})
```

During migration/rehydration:

```ts
if (
  !persisted.expiresAt
  || Date.now()
     > persisted.expiresAt
) {
  return emptyAuthState;
}
```

### Throttling in Zustand

The persistence middleware controls when it asks storage to write. To throttle/coalesce storage writes, wrap the storage adapter.

The wrapper keeps:

```text
pending value
timer
setItem scheduling logic
flush() method
```

Conceptual shape:

```ts
function createThrottledStorage(
  delay: number,
) {
  let timer:
    ReturnType<
      typeof setTimeout
    > | null = null;

  let pending:
    {
      name: string;
      value: string;
    }
    | null = null;

  const flush = () => {
    if (!pending) {
      return;
    }

    localStorage.setItem(
      pending.name,
      pending.value,
    );

    pending = null;

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return {
    getItem:
      (name: string) =>
        localStorage.getItem(name),

    removeItem:
      (name: string) =>
        localStorage.removeItem(name),

    setItem:
      (
        name: string,
        value: string,
      ) => {
        pending = {
          name,
          value,
        };

        if (timer) {
          clearTimeout(timer);
        }

        timer =
          setTimeout(
            flush,
            delay,
          );
      },

    flush,
  };
}
```

Expose `flush` deliberately for logout, route changes or other boundaries where pending writes must reach storage immediately.

Use multiple stores or different storage wrappers when only one part of Zustand state should have a different persistence/throttle policy.

## 5. Redux Persist

### Basic configuration

```ts
import {
  persistReducer,
  persistStore,
} from "redux-persist";

import storage from
  "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer =
  persistReducer(
    persistConfig,
    rootReducer,
  );

export const store =
  configureStore({
    reducer: persistedReducer,
  });

export const persistor =
  persistStore(store);
```

`persistor` controls the persistence lifecycle.

### `PersistGate`

```tsx
<Provider store={store}>
  <PersistGate
    loading={<Loading />}
    persistor={persistor}
  >
    <App />
  </PersistGate>
</Provider>
```

The gate delays rendering until persisted Redux state is rehydrated, preventing an initial UI based on defaults followed by a second UI based on restored state.

### Core configuration fields

```text
key
storage key prefix/root key

storage
local/session/custom adapter

whitelist
persist only selected direct reducer keys

blacklist
persist every direct reducer key except selected keys

version
persisted schema version

migrate
upgrade old snapshots

transforms
change values before save and after load

stateReconciler
control merge with reducer initial state

throttle
coalesce write frequency
```

Whitelist/blacklist apply at the reducer level wrapped by `persistReducer`.

```ts
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "auth",
    "settings",
  ],
};
```

A root whitelist cannot select `auth.token` directly. Options:

```text
wrap the auth reducer separately
use nested persist configuration
use a transform that persists only part of auth
```

### Nested persistence

```ts
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: [
    "token",
    "user",
  ],
};

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: [
    "auth",
  ],
};

const rootReducer =
  combineReducers({
    auth:
      persistReducer(
        authPersistConfig,
        authReducer,
      ),

    ui:
      uiReducer,
  });

export default
  persistReducer(
    rootPersistConfig,
    rootReducer,
  );
```

Nested configuration gives a child reducer its own policy while preventing the root persister from duplicating it.

### Transforms

A transform has two directions:

```text
inbound
    reducer state → serialized persisted state

outbound
    persisted state → Redux reducer state
```

```ts
const authTransform =
  createTransform(
    inbound => ({
      token: inbound.token,
      user: inbound.user,
    }),

    outbound => ({
      token:
        outbound.token ?? null,

      user:
        outbound.user ?? null,

      loading: false,
      error: null,
    }),

    {
      whitelist: ["auth"],
    },
  );
```

Transforms support:

```text
field-level persistence
Set/Map conversion
encryption/decryption
compression
TTL filtering
```

For a `Set`, convert to an array inbound and restore a `Set` outbound.

### Migrations

Redux Persist versioning follows the same high-level idea as Zustand:

```text
stored snapshot version
current configured version
migration converts old state to current shape
```

```ts
const migrations = {
  1: state => ({
    ...state,
    theme: "light",
  }),

  2: state => ({
    ...state,
    auth: {
      ...state.auth,
      token:
        state.auth?.token
        ?? null,
    },
  }),
};

const persistConfig = {
  key: "root",
  storage,
  version: 2,
  migrate:
    createMigrate(
      migrations,
      {
        debug: false,
      },
    ),
};
```

Migration occurs during restore/rehydration, not on every save.

### State reconcilers

```text
hardSet
    replace the target slice completely with persisted state

autoMergeLevel1
    shallow merge one level

autoMergeLevel2
    shallow merge two levels
```

A persisted object can omit fields that exist in reducer defaults. The reconciler determines whether omitted defaults survive.

Choose `hardSet` when the persisted object is complete and authoritative. Choose an auto-merge reconciler when reducer defaults should fill missing keys.

### Persistor methods

```ts
await persistor.flush();
await persistor.purge();

persistor.pause();
persistor.persist();
```

```text
flush
    force pending serialized writes now

purge
    delete persisted storage

pause
    temporarily stop writes

persist
    resume/start persistence
```

A logout/reset flow can explicitly reset memory, flush or discard pending writes, and purge storage in a deliberate order.

### TTL for Redux Persist

Redux Persist does not have one universal `maxAge` field analogous to React Query persistence.

Implement TTL with an inbound/outbound transform:

```ts
const authExpiryTransform =
  createTransform(
    inbound => ({
      token: inbound.token,
      user: inbound.user,
      expiresAt:
        Date.now() + ONE_DAY,
    }),

    outbound => {
      if (
        !outbound.expiresAt
        || Date.now()
           > outbound.expiresAt
      ) {
        return emptyAuthState;
      }

      return {
        token:
          outbound.token
          ?? null,

        user:
          outbound.user
          ?? null,

        loading: false,
        error: null,
      };
    },

    {
      whitelist: ["auth"],
    },
  );
```

Migration can also reject expired snapshots, but a transform is often clearer when expiration is part of serialization policy rather than schema conversion.

## 6. Hydration, migration and transform timing

### React Query

```text
save path
    cache change
    dehydrate/filter
    persister save

restore path
    read persisted client
    check buster and maxAge
    hydrate QueryClient
```

### Zustand

```text
save path
    store change
    partialize
    serialize/write

restore path
    read storage
    compare version
    migrate if necessary
    merge into store
    run rehydration callbacks
```

### Redux Persist

```text
save path
    Redux state update
    select persisted reducer state
    inbound transforms
    serialize/write

restore path
    read storage
    migrate
    outbound transforms
    state reconciliation
    rehydrated Redux state
```

## 7. Throttling and pending writes

Throttling means delaying and coalescing writes to storage.

```text
state changes repeatedly
    persistence layer schedules one pending write
    later write contains the newest snapshot
```

Benefits:

```text
less serialization
less localStorage/AsyncStorage/disk I/O
fewer writes during fast UI updates
```

Risk:

```text
a write is still pending
app closes or storage is cleared
latest snapshot may never reach storage
```

Therefore:

```text
Redux Persist
    await persistor.flush()

Zustand
    expose flush from custom storage wrapper

React Query
    trigger explicit save only through the API supported by the selected persister strategy
```

Do not purge or remove storage while an older delayed write can still run afterward. Cancel/flush pending timers before clearing storage.

## 8. Selective throttling

Different data often needs different persistence policies.

```text
authentication
    small, infrequent, flush at logout/login boundaries

draft editor
    frequent updates, longer throttle

UI preferences
    small and durable

server cache
    query-level filters and cache-specific expiration
```

Strategies:

```text
Redux Persist
    multiple/nested persist reducers with separate configs

Zustand
    separate stores or separate storage wrappers

React Query
    whole-client persistence for one cache blob,
    or supported per-query persister behavior where required
```

## 9. Design checklist

```text
[ ] define exactly what the persisted unit is
[ ] persist only durable state
[ ] keep secrets and transient flags out unless required
[ ] version persisted schemas
[ ] provide migration or an intentional reset path
[ ] align React Query gcTime with persistence maxAge
[ ] use buster for hard cache invalidation
[ ] implement TTL explicitly for Zustand/Redux Persist
[ ] throttle storage writes when updates are frequent
[ ] expose a flush path for critical boundaries
[ ] cancel pending writes before purging storage
[ ] test fresh install, upgrade, expiration, corruption and logout
```

# Coverage

```text
embedded symbols: 135
unique embedded screenshots: 135
image uses: 137
native SVG labels: 75
duplicate extra placements: 2

processed image uses: 137
processed text labels: 75
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
