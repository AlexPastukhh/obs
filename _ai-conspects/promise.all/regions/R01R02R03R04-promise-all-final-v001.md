# Final semantic transcript — `Promise.all`

Authoritative source: `source/promise.all.svg`  
Coverage: **11 unique screenshots / 11 placements + 2 native SVG labels**

---

# R01 — what starts the work

A promise usually represents work that has already been started by the function call that created it.

```ts
const request = fetch("/api/items");
```

`fetch(...)` starts the request immediately and returns a promise for the eventual result. `await` does not start the request; it waits for the promise.

This difference matters:

```ts
// sequential start and wait
const a = await fetch("/a");
const b = await fetch("/b");
const c = await fetch("/c");
```

versus:

```ts
// start all first
const pa = fetch("/a");
const pb = fetch("/b");
const pc = fetch("/c");

const [a, b, c] =
  await Promise.all([pa, pb, pc]);
```

The second form overlaps the operations. `Promise.all` coordinates already-created promises; it is not a scheduler that retroactively starts them.

A closer .NET analogy is `Task.WhenAll`, but JavaScript promises do not expose the same task object and scheduler model as .NET `Task`.

---

# R02 — result order and fail-fast behavior

`Promise.all(iterable)` returns one promise.

It fulfills when all inputs fulfill:

```ts
const result = await Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
]);
// [1, 2, 3]
```

The result array follows **input order**, not completion order. If the second operation finishes first, its value still occupies index 1.

It rejects when the first input rejection is observed:

```ts
await Promise.all([
  Promise.resolve("ok"),
  Promise.reject(
    new Error("boom"),
  ),
  Promise.resolve("later"),
]);
```

From the caller’s perspective this is fail-fast. Other operations may already be running and can continue in the background; rejecting the aggregate promise does not automatically cancel them.

Values that are not promises are treated like already-fulfilled values. An empty iterable fulfills with an empty array.

---

# R03 — `Promise.allSettled` and per-item outcomes

Use `Promise.allSettled` when every result must be collected, even if some fail:

```ts
const results =
  await Promise.allSettled([
    fetch("/a"),
    fetch("/b"),
    fetch("/c"),
  ]);
```

Each entry is one of:

```ts
{ status: "fulfilled", value: ... }
{ status: "rejected", reason: ... }
```

Decision rule:

```text
all results are required and one failure should fail the group
    Promise.all

every item must report success or failure independently
    Promise.allSettled
```

`allSettled` still preserves input order.

---

# R04 — practical patterns and pitfalls

Concurrency pattern:

```ts
const promises = ids.map(
  (id) => loadItem(id),
);

const items =
  await Promise.all(promises);
```

Pitfalls:

```text
placing await inside map before collecting promises
    can accidentally serialize or complicate the flow

assuming Promise.all cancels remaining operations
    it does not

assuming completion order determines output order
    output order follows the input iterable

passing functions instead of calling them
    Promise.all waits for values/promises, not uninvoked functions
```

Cancellation requires cooperation from the underlying operation, commonly through `AbortController`.

For very large input sets, unrestricted concurrency may overload the client or server. Use a concurrency limiter when the operation count is large.

---

# Coverage

```text
unique embedded screenshots: 11
image uses: 11
native SVG labels: 2
duplicate extra placements: 0

processed image uses: 11
processed text labels: 2
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
