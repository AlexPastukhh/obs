# Regional transcript — R03: Logging decorators and decorator ordering

Conspect: `decorator`  
Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A logging decorator can wrap a method to observe arguments, results and failures without changing call sites.

## Logging wrapper

- Log the method key and arguments before invocation.
- Invoke the original with the caller's `this` value.
- Log and return the original result.
- Handle promises deliberately when completion or rejection must be logged rather than only the returned promise object.

## Evaluation order

- Decorator expressions are evaluated from top to bottom.
- The resulting decorator functions are applied from bottom to top for the same declaration.
- Therefore the written order and wrapper nesting order are not identical.

## Class-member order

- Legacy decorator processing has defined ordering across parameter, method/accessor/property, static and class decorators.
- Keep order-dependent decorator stacks small and documented.

## Caveats

- Logging can expose secrets or personally identifiable data.
- A decorator that changes errors or return values must be documented as behavior, not mere instrumentation.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-005, IU-006
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
