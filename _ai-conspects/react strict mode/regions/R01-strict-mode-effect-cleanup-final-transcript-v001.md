# Final source-reconstructed transcript - React Strict Mode and effect cleanup

Generated: 2026-07-07

Source: `source/react strict mode.svg`, local source screenshots, and Stage0 source inventory.

## Coverage

```text
Source screenshots: 3 / 3 visually checked from complete canvas preview
Status before this file: regional transcripts not started
```

## What React Strict Mode is

React Strict Mode is a development-only tool that helps reveal bugs caused by impure rendering and unsafe side effects. It does not change production behavior the same way, but it exposes code that would still be fragile in real apps.

Important point:

```text
Strict Mode is not the bug. It reveals the bug.
```

## Fragile effect example

The source shows an effect that changes global document state without cleanup:

```typescript
useEffect(() => {
  document.body.style.overflow = "hidden";
}, []);
```

Why this is fragile:

- no cleanup;
- if the component unmounts, `body.style.overflow` stays changed;
- if mounted twice or remounted, global state can get out of sync.

## Safer effect version

Store the previous value, apply the new value, and restore the previous value in cleanup:

```typescript
useEffect(() => {
  const prev = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = prev;
  };
}, []);
```

This makes the effect safe to run, clean up and run again.

## Do not rely on "it can't happen"

Avoid assuming an effect runs only once forever. Even outside Strict Mode, effects may run more than once because:

- dependencies changed;
- component unmounted and remounted;
- conditional rendering toggled it;
- route/navigation changed;
- parent key changed;
- Suspense/concurrent behavior caused retries;
- future refactors changed mounting patterns.

So write effects defensively and assume repeated runs are possible.

## Best mental model

Treat an effect like a synchronization block:

```text
setup the external thing to match current React state
cleanup the old external thing before replacing/removing it
```

Do not treat an effect as:

```text
do this one-time action and trust nothing weird happens
```

## Final answer from the sheet

```text
useEffect may run multiple times
Strict Mode is a common reason you notice it in development
you should clean up every effect that creates external side effects
you should not rely on "it can't happen"
```

Good slogan:

```text
Effects should be safe to run, clean up, and run again.
```
