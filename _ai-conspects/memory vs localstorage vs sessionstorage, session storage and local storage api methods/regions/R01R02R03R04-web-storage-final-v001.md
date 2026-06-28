# Final semantic transcript — memory, localStorage and sessionStorage

Authoritative source: `source/memory vs localstorage vs sessionstorage, session storage and local storage api methods.svg`  
Coverage: **20 unique screenshots / 20 placements + 6 native SVG labels**

---

# R01 — Web Storage API and string serialization

`localStorage` and `sessionStorage` implement the same synchronous `Storage` API:

```js
storage.setItem(key, value);
storage.getItem(key);       // string | null
storage.removeItem(key);
storage.clear();
storage.key(index);         // string | null
storage.length;
```

Every stored value is a string. Numbers, booleans, objects and arrays must be encoded deliberately:

```js
localStorage.setItem("count", String(5));

const count =
  Number(localStorage.getItem("count") ?? 0);
```

Objects and arrays normally use JSON:

```js
const user = { id: 1, name: "Ann" };

localStorage.setItem(
  "user",
  JSON.stringify(user),
);

const raw = localStorage.getItem("user");

const restored = raw
  ? JSON.parse(raw)
  : null;
```

`getItem()` can return `null`, and `JSON.parse()` can throw when storage contains corrupt, manually edited or outdated data. A safe helper should handle both:

```js
function readJSON(storage, key, fallback = null) {
  const raw = storage.getItem(key);

  if (raw === null) {
    return fallback;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
```

A matching writer:

```js
function saveJSON(storage, key, value) {
  storage.setItem(
    key,
    JSON.stringify(value),
  );
}
```

---

# R02 — memory, sessionStorage and localStorage trade-offs

## In-memory state

```text
lifetime
    current page instance

survives refresh
    no

shared across tabs
    no

readable by XSS running in the page
    yes
```

Memory minimizes persistence. It is useful for sensitive short-lived state such as an access token, but a refresh loses the value. Authentication must then use re-login, silent renewal or a refresh mechanism.

Memory is not immune to XSS: malicious code executing in the page can still read live state and make authenticated requests.

## `sessionStorage`

```text
lifetime
    current tab/page session

survives refresh in that tab
    yes

shared across normal tabs
    no

readable by XSS
    yes
```

Typical uses:

```text
single-tab drafts
wizard progress
temporary redirect flags
per-tab UI state
```

The data normally disappears when the tab/session ends.

## `localStorage`

```text
lifetime
    persistent until removed or cleared

survives refresh and browser restart
    yes

shared by same-origin documents
    yes

readable by XSS
    yes
```

Typical uses:

```text
theme and language preferences
non-sensitive UI settings
small cached state
```

Persistent bearer or refresh tokens in `localStorage` increase the impact of XSS because stolen values can be reused later. Security-sensitive authentication designs often prefer short-lived memory state plus protected cookie-based renewal, depending on the system threat model.

---

# R03 — common patterns and helpers

Theme preference:

```js
localStorage.setItem("theme", "dark");

const theme =
  localStorage.getItem("theme")
  ?? "light";
```

Draft form:

```js
saveJSON(
  localStorage,
  "draft",
  {
    title: "Hello",
    body: "...",
  },
);

const draft =
  readJSON(localStorage, "draft", {});
```

One-tab redirect flag:

```js
sessionStorage.setItem(
  "fromCheckout",
  "true",
);

const fromCheckout =
  sessionStorage.getItem(
    "fromCheckout",
  ) === "true";
```

The API is synchronous, so large or frequent storage operations can block the main thread. Web Storage is best for small values, not large datasets or high-throughput caches.

---

# R04 — cross-tab events, quota and failure handling

When one same-origin document changes `localStorage`, other documents can receive a `storage` event:

```js
window.addEventListener(
  "storage",
  (event) => {
    if (event.key === "theme") {
      console.log(
        "Changed in another tab:",
        event.newValue,
      );
    }
  },
);
```

Important behavior:

```text
normally fires in other documents/tabs
does not normally fire in the same document that made the change
contains key, oldValue, newValue, storageArea and URL
```

This supports logout synchronization or preference updates across tabs.

Storage is quota-limited and browser-dependent. `setItem()` can throw, commonly because the quota is exceeded or storage is unavailable:

```js
try {
  localStorage.setItem(
    "large-data",
    hugeString,
  );
} catch (error) {
  console.error(
    "Storage write failed",
    error,
  );
}
```

Practical rules:

```text
[ ] treat getItem as string | null
[ ] serialize structured values explicitly
[ ] catch JSON parsing failures
[ ] catch storage write failures
[ ] keep data small
[ ] do not treat Web Storage as a secure secret store
[ ] choose memory/session/local lifetime intentionally
[ ] use the storage event for cross-tab synchronization
```

---

# Coverage

```text
unique embedded screenshots: 20
image uses: 20
native SVG labels: 6
duplicate extra placements: 0

processed image uses: 20
processed text labels: 6
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
