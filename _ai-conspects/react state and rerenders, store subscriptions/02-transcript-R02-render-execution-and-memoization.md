# Regional transcript — R02: Render execution, eager calls and memoization rules

Conspect: `react state and rerenders, store subscriptions`  
Generated: 2026-06-28 02:00:00 UTC

## Coverage

```text
text elements represented: 2 / 2
image uses processed: 15 / 15
unique screenshots represented: 15
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A React function component executes again whenever React renders it. Every ordinary expression in the function body is evaluated during that render.

## Render execution

- Calling a helper in JSX such as `{buildRows()}` invokes it immediately during render.
- Writing `onClick={handleClick()}` also invokes the function during render; use `onClick={handleClick}` or an arrow when an event should invoke it later.
- Creating objects, arrays and functions in the body produces new identities on each execution.
- Render code must be pure: the same inputs should describe the same UI without external mutation.

## Parent and child renders

- When a parent renders, React normally evaluates its child elements again.
- `React.memo` can skip a child commit/render when its props are shallowly equal.
- A freshly created object or callback defeats shallow prop equality even when its contents look the same.
- Context updates and the child's own state can still rerender a memoized child.

## Memoization boundaries

- Memoize the expensive calculation or identity crossing the boundary, not unrelated code.
- Keep state close to the components that use it.
- Prefer component composition so unrelated children are not rebuilt from one broad state owner.
- Do not use memoization to hide side effects or broken data flow.

## Strict development behavior

- Development Strict Mode can invoke render calculations more than once to expose impurity.
- Production behavior differs, but render code must still remain pure.
- Logs from render are not a reliable measure of committed UI updates.

## Caveats

- A render is not the same as a DOM mutation; React may abandon or reuse work.
- Performance reasoning should distinguish component execution, reconciliation and browser painting.

## Covered source units

### Text elements

```text
T-005, T-006
```

### Screenshot uses

```text
IU-023, IU-024, IU-025, IU-026, IU-027, IU-028, IU-029, IU-030, IU-031, IU-032, IU-033, IU-034, IU-035
IU-036, IU-037
```

Raw labels and exact screenshots remain in the SVG and closed ledgers.
