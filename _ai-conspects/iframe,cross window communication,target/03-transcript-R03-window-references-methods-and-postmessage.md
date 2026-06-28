# Regional transcript — R03: Window references, methods, properties and postMessage

Conspect: `iframe,cross window communication,target`  
Generated: 2026-06-28 02:00:00 UTC

## Coverage

```text
text elements represented: 2 / 2
image uses processed: 5 / 5
unique screenshots represented: 5
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Window relationships provide references; `postMessage` provides an explicit cross-origin-safe message channel when used with strict validation.

## References

- `window.parent` refers to the immediate parent frame.
- `window.top` refers to the top-level context.
- `window.opener` refers to the context that opened a popup when the relationship exists.
- `iframe.contentWindow` refers from the parent to the iframe's window.
- `window.frames` exposes named or indexed child frames.

## Useful methods and properties

- `focus`, `blur` and `close` affect a window subject to browser restrictions.
- `closed` reports whether a referenced popup has been closed.
- `location` navigates the context; cross-origin read access is restricted.
- `name` identifies a browsing context and participates in target selection.

## Sending messages

- Call `targetWindow.postMessage(message, targetOrigin)`.
- Use the exact expected origin rather than `*` whenever the destination is known.
- Structured-clone-compatible data can be transferred without manual JSON serialization.
- Transferable objects such as `MessagePort` can establish a dedicated channel.

## Receiving messages

- Listen for the `message` event.
- Validate `event.origin` against an allowlist.
- Validate `event.source` when a specific iframe or popup is expected.
- Validate the message schema and command before performing any action.
- Remove listeners when the owning component/page lifecycle ends.

## Handshake

- A child can send a ready message after initialization.
- The parent replies with configuration only after validating origin/source.
- Attach correlation IDs for request/response exchanges.
- Define versioned message types instead of passing arbitrary commands.

## Caveats

- `postMessage` delivery does not authenticate the contents by itself.
- Never evaluate received strings as code.

## Covered source units

### Text elements

```text
T-005, T-006
```

### Screenshot uses

```text
IU-019, IU-020, IU-021, IU-026, IU-027
```

Raw labels and exact screenshots remain in the SVG and closed ledgers.
