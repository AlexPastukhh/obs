# Regional transcript — R02: Popup versus iframe behavior and security

Conspect: `iframe,cross window communication,target`  
Generated: 2026-06-28 02:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 9 / 9
unique screenshots represented: 9
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Popups and iframes both host another browsing context, but differ in placement, user activation requirements, lifecycle and common security controls.

## Iframe

- Rendered inside the page layout.
- Created declaratively with `<iframe>` or dynamically through the DOM.
- The parent accesses its window through `iframe.contentWindow`.
- Useful for embeds, isolated tools, payment/authentication widgets and previews.

## Popup

- Opened with `window.open` into a new tab or window according to browser policy.
- Usually requires a direct user gesture to avoid popup blocking.
- The opener receives a `WindowProxy` reference when opening succeeds.
- Useful for OAuth, external workflows, print views and secondary tools.

## Opener risks

- A newly opened page can sometimes access `window.opener` and navigate the opener.
- Use `noopener` when the opened page does not need an opener relationship.
- Use `noreferrer` when the referrer should also be omitted.
- Cross-origin opener policies can intentionally isolate browsing-context groups.

## Iframe risks

- Untrusted embedded content should be sandboxed with the smallest required capability set.
- Do not combine powerful sandbox exceptions without understanding how they restore escape capabilities.
- Use explicit `allow`/Permissions Policy features for camera, microphone and other capabilities.
- Validate all messages received from the embedded context.

## Caveats

- Popup size/position features are hints and browsers may ignore them.
- Embedded content can affect privacy, focus, navigation and accessibility.

## Covered source units

### Text elements

```text
T-004
```

### Screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-014, IU-015, IU-016, IU-017, IU-018
```

Raw labels and exact screenshots remain in the SVG and closed ledgers.
