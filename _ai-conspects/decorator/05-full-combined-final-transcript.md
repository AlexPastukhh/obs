# Full combined final transcript — decorator

Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements: 0 / 0
unique screenshots: 7 / 7
screenshot uses: 7 / 7
repeated placements retained: 0
regions: 4 / 4
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — TypeScript decorator structure and intent

A TypeScript decorator is a function applied to a declaration so it can observe, annotate or replace aspects of that declaration.

### Where decorators apply

- Decorator forms exist for classes, methods, accessors, properties and parameters.
- Decorator expressions are evaluated when the class declaration is processed, not when each instance is created.
- The exact signature depends on the decorated declaration and on whether legacy or modern decorator semantics are used.

### Configuration

- Legacy TypeScript decorators require the relevant compiler option.
- Metadata emission is a separate option and commonly relies on a runtime metadata shim.
- Modern ECMAScript decorators have different signatures and capabilities; do not mix the two models casually.

### Caveats

- Decorator semantics depend on the compiler mode and TypeScript version used by the project.
- A decorator should not hide essential business flow behind surprising declaration-time side effects.

## R02 — Method wrapping, validation and argument forwarding

A legacy method decorator receives the target, property key and property descriptor, then can wrap `descriptor.value`.

### Validation wrapper

- Read and validate that the descriptor value is a function.
- Store the original method before replacing it.
- Create a wrapper that checks arguments and throws a domain-appropriate error when validation fails.
- Call the original with `original.apply(this, args)` so both `this` and all arguments are preserved.

### Descriptor handling

- Assign the wrapper back to `descriptor.value`.
- Return the descriptor explicitly or mutate and return nothing according to the chosen pattern.
- Preserve relevant descriptor flags.

### Typing

- Type the wrapper's `this` when possible.
- Avoid broad `any` in reusable production decorators; model the expected method signature.

### Caveats

- Arrow wrappers capture lexical `this` and are often wrong for replacing instance methods.
- Runtime decorators cannot replace compile-time type checking.

## R03 — Logging decorators and decorator ordering

A logging decorator can wrap a method to observe arguments, results and failures without changing call sites.

### Logging wrapper

- Log the method key and arguments before invocation.
- Invoke the original with the caller's `this` value.
- Log and return the original result.
- Handle promises deliberately when completion or rejection must be logged rather than only the returned promise object.

### Evaluation order

- Decorator expressions are evaluated from top to bottom.
- The resulting decorator functions are applied from bottom to top for the same declaration.
- Therefore the written order and wrapper nesting order are not identical.

### Class-member order

- Legacy decorator processing has defined ordering across parameter, method/accessor/property, static and class decorators.
- Keep order-dependent decorator stacks small and documented.

### Caveats

- Logging can expose secrets or personally identifiable data.
- A decorator that changes errors or return values must be documented as behavior, not mere instrumentation.

## R04 — Decorator kinds, return values and design guidance

Different decorator kinds receive different inputs and have different powers to replace declarations.

### Class decorators

- Receive the constructor.
- Can return a replacement constructor in models that permit replacement.
- A replacement must preserve expected prototype and static behavior.

### Method and accessor decorators

- Receive a property descriptor.
- Can replace the descriptor or mutate its callable/get/set members.
- They are the natural fit for logging, validation, caching and authorization wrappers.

### Property and parameter decorators

- Legacy property decorators do not receive a descriptor and usually record metadata.
- Parameter decorators record metadata about a parameter index.
- Their return values are ignored under legacy behavior.

### Design guidance

- Use decorators for cross-cutting declaration concerns with a clear, testable contract.
- Keep business logic visible in ordinary functions and services.
- Test the decorated method through normal invocation and test ordering when decorators compose.

### Caveats

- Reflect-metadata-based frameworks create runtime coupling that should be explicit.
- Migrating between legacy and modern decorator semantics can require redesign, not just syntax changes.

## Regional coverage map

| Region | Text | Uses | Unique | Repeated | Remaining |
|---|---:|---:|---:|---:|---:|
| R01 | 0 | 2 | 2 | 0 | 0 |
| R02 | 0 | 2 | 2 | 0 | 0 |
| R03 | 0 | 2 | 2 | 0 | 0 |
| R04 | 0 | 1 | 1 | 0 | 0 |

## Exactness note

This document is the authoritative semantic transcript. The complete SVG and extracted
screenshots remain authoritative for exact source code, punctuation and version details.
