# Regional transcript — R05: Browsing-context targets and default target behavior

Conspect: `iframe,cross window communication,target`  
Generated: 2026-06-28 02:00:00 UTC

## Coverage

```text
text elements represented: 2 / 2
image uses processed: 6 / 6
unique screenshots represented: 6
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

The `target` value chooses where a link, form submission or `window.open` navigation occurs.

## Special targets

- `_self` uses the current browsing context and is the normal default for links/forms.
- `_blank` requests a new top-level context.
- `_parent` navigates the immediate parent context, or behaves like `_self` when no parent exists.
- `_top` navigates the top-level context.

## Named targets

- Any other non-empty target is a browsing-context name.
- A later link or `window.open` with the same name can reuse the existing context.
- An iframe's `name` allows links or forms to navigate that iframe.
- Choose unique, stable names only when reuse is intentional.

## Default behavior

- An anchor or form without `target` navigates/submits in `_self`.
- `window.open` has different API defaults: omitting its target commonly behaves like requesting a new unnamed context.
- Do not assume HTML target defaults and `window.open` defaults are identical.
- Explicit target values make navigation intent clearer.

## Security and UX

- For `_blank`, use opener isolation unless communication is required.
- Navigating `_top` or `_parent` from framed content can be restricted by sandbox and browser security.
- Announce new-window behavior for accessibility when it is not obvious.
- Avoid unexpected named-window reuse that replaces a user's unrelated task.

## Caveats

- Browser policies may prevent a framed page from navigating its ancestors.
- Target selection identifies a context; it does not bypass same-origin restrictions.

## Covered source units

### Text elements

```text
T-007, T-008
```

### Screenshot uses

```text
IU-028, IU-029, IU-030, IU-031, IU-032, IU-033
```

Raw labels and exact screenshots remain in the SVG and closed ledgers.
