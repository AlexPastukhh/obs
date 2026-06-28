# Final semantic transcript — React Query rerenders and cache access outside React

Authoritative source: `source/react query rerenders + setting and getting data from cache outside of react.svg`

---

# R01 — which components rerender

React Query stores data in a cache managed by `QueryClient`. Changing cached data notifies observers of that query.

```ts
queryClient.setQueryData(
  ["auth", "token"],
  newToken,
);
```

A component rerenders when it subscribes to that query and the selected result changes:

```tsx
const token = useQuery({
  queryKey: ["auth", "token"],
  queryFn: async () => null,
  enabled: false,
  initialData: null,
}).data;
```

Components that never read the query are not observers and do not rerender merely because the cache changed.

Plain TypeScript code using:

```ts
queryClient.getQueryData(...)
```

performs an imperative snapshot read. It does not subscribe and cannot rerender.

## Cache hook

```ts
const TOKEN_KEY =
  ["auth", "token"] as const;

export function useAuthToken() {
  const result = useQuery({
    queryKey: TOKEN_KEY,
    queryFn: async () => null,
    enabled: false,
    initialData: null,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return result.data;
}
```

Only components calling this hook or otherwise observing the same query are updated.

## Root routing example

```tsx
function AppRoot() {
  const token =
    useAuthToken();

  return token
    ? <ProductsPage />
    : <LoginPage />;
}
```

Setting the cached token updates the root observer, which switches the rendered branch.

---

# R02 — cache access outside hooks

## One shared `QueryClient`

```ts
// queryClient.ts
import {
  QueryClient,
} from "@tanstack/react-query";

export const queryClient =
  new QueryClient();

export const TOKEN_KEY =
  ["auth", "token"] as const;
```

The provider must use that exact instance:

```tsx
<QueryClientProvider
  client={queryClient}
>
  <App />
</QueryClientProvider>
```

Creating another `QueryClient` in an API module would create another independent cache.

## Imperative helpers

```ts
import {
  queryClient,
  TOKEN_KEY,
} from "./queryClient";

export function getAccessToken():
  string | null {
  return (
    queryClient.getQueryData<
      string | null
    >(TOKEN_KEY) ?? null
  );
}

export function setAccessToken(
  token: string | null,
) {
  queryClient.setQueryData(
    TOKEN_KEY,
    token,
  );
}
```

Hooks are not required to read or write cache data in ordinary modules.

Imperative reads are snapshots. Cache writes still notify React observers.

## Refresh helper

```ts
let refreshPromise:
  Promise<string> | null = null;

export async function
refreshAccessToken() {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise =
    fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    })
      .then(async response => {
        if (!response.ok) {
          throw new Error(
            "Refresh failed"
          );
        }

        const data =
          await response.json();

        setAccessToken(
          data.accessToken
        );

        return data.accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });

  return refreshPromise;
}
```

The shared promise deduplicates simultaneous refresh attempts.

## Fetch wrapper

```ts
export async function fetchWithAuth(
  input: RequestInfo,
  init: RequestInit = {},
) {
  const token =
    getAccessToken();

  const headers =
    new Headers(init.headers);

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`,
    );
  }

  let response =
    await fetch(input, {
      ...init,
      headers,
      credentials: "include",
    });

  if (response.status !== 401) {
    return response;
  }

  const freshToken =
    await refreshAccessToken();

  headers.set(
    "Authorization",
    `Bearer ${freshToken}`,
  );

  return fetch(input, {
    ...init,
    headers,
    credentials: "include",
  });
}
```

Limit retries so a persistent `401` does not create an infinite loop.

---

# R03 — login, logout and design trade-offs

## Login

```ts
export async function login(
  username: string,
  password: string,
) {
  const response =
    await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

  const data =
    await response.json();

  setAccessToken(
    data.accessToken
  );
}
```

Observers of the token query rerender.

## Logout

```ts
export async function logout() {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  setAccessToken(null);

  queryClient.clear();
}
```

Clearing all queries is optional and may be too broad. In many applications, remove or invalidate only user-specific queries.

## Is React Query a token store?

It can technically hold client state through `setQueryData`, but React Query is primarily a server-state/cache library.

Consider alternatives for authentication state:

```text
HttpOnly secure cookies
    preferred when the server can own session/token storage

small dedicated client store/context
    clear semantics for purely client-owned auth state

React Query cache
    workable when cache integration and observers are deliberately desired
```

Do not persist sensitive access tokens to local storage without a security review.

## Checklist

```text
[ ] export exactly one QueryClient
[ ] use that instance in QueryClientProvider and non-React modules
[ ] understand getQueryData is an imperative snapshot
[ ] understand setQueryData notifies query observers
[ ] deduplicate refresh calls
[ ] retry a failed request at most once
[ ] clear token state on refresh failure/logout
[ ] invalidate only the server data that belongs to the previous identity
```

# Coverage

```text
unique embedded screenshots: 18
image uses: 18
native SVG labels: 75
duplicate extra placements: 0

processed image uses: 18
processed text labels: 75
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
