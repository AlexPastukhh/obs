# Regional transcript — R04: Unsubscribe lifecycle and cleanup

Conspect: `usesyncexternalstore`  
Generated: 2026-06-28 02:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 4 / 4
unique screenshots represented: 4
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

The subscription function owns listener registration and must return an exact cleanup function so React can remove the listener during unmount or resubscription.

## Subscribe implementation

- Add the supplied callback to a listener collection.
- Return a function that removes that exact callback.
- The cleanup should be safe even if called more than once.
- Do not return the result of `delete` directly; return a callable cleanup function.

## When cleanup runs

- React unsubscribes when the component unmounts.
- React can unsubscribe and resubscribe when the `subscribe` function identity changes.
- Development Strict Mode can expose cleanup defects through additional lifecycle checks.
- Store replacement also requires old subscriptions to be released.

## Notification safety

- Iterate over a stable listener snapshot if listeners can unsubscribe during notification.
- A `Set` naturally avoids duplicate listener entries.
- One listener throwing should not silently prevent the store from reaching other listeners unless that is the documented policy.
- Avoid retaining component objects or closures after unsubscribe.

## Diagnostics

- Track listener count during development to detect leaks.
- Test repeated mount/unmount cycles.
- Verify that an unmounted component no longer rerenders after store updates.

## Caveats

- A leaked subscription retains component closures and creates updates after unmount.
- Keep subscription code synchronous and minimal.

## Covered source units

### Text elements

```text
T-001
```

### Screenshot uses

```text
IU-029, IU-030, IU-031, IU-034
```

Raw labels and exact screenshots remain in the SVG and closed ledgers.
