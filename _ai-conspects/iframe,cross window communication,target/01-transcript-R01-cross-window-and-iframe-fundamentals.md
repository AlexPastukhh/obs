# Regional transcript — R01: Cross-window communication and iframe fundamentals

Conspect: `iframe,cross window communication,target`  
Generated: 2026-06-28 02:00:00 UTC

## Coverage

```text
text elements represented: 4 / 4
image uses processed: 10 / 10
unique screenshots represented: 10
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

An iframe, popup and parent page are separate browsing contexts. Their ability to inspect each other depends on references and the same-origin policy.

## Browsing contexts

- An iframe creates a nested browsing context inside the current document.
- A popup creates a separate top-level browsing context, commonly returned by `window.open`.
- Each context has its own `window`, document, history and JavaScript global scope.
- A context can hold references such as `parent`, `top`, `opener`, `frames` or `contentWindow`.

## Same-origin access

- Pages with the same scheme, host and port can generally inspect each other's DOM and JavaScript objects.
- Cross-origin contexts cannot read arbitrary DOM, storage or variables from each other.
- A reference to a cross-origin window still permits a limited safe set of operations, notably `postMessage` and navigation in allowed cases.

## Communication choices

- Same-origin contexts may call functions or manipulate DOM directly, but message-based interfaces are often less coupled.
- Cross-origin communication should use `window.postMessage`.
- Shared backends, BroadcastChannel, MessageChannel or service workers can be alternatives depending on scope.

## Iframe lifecycle

- Wait for the iframe load event before assuming its document/application is ready.
- An iframe can navigate and replace its current document while retaining the browsing-context reference.
- Sandbox attributes can remove capabilities even for otherwise trusted content.

## Caveats

- Do not weaken cross-origin isolation with unsafe wildcard messaging.
- Framing can be blocked by CSP `frame-ancestors` or `X-Frame-Options`.

## Covered source units

### Text elements

```text
T-001, T-002, T-003, T-011
```

### Screenshot uses

```text
IU-005, IU-006, IU-007, IU-008, IU-009, IU-010, IU-011, IU-012, IU-013, IU-035
```

Raw labels and exact screenshots remain in the SVG and closed ledgers.
