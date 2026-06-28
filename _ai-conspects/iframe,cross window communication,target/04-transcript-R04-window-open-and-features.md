# Regional transcript — R04: Opening popups and windowFeatures

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

`window.open(url, target, features)` requests a new or reused browsing context. The browser retains control over whether it is a tab, window or blocked request.

## Arguments

- `url` is the initial navigation.
- `target` selects or names the browsing context.
- `features` is a comma-separated list of requested popup features.
- The return value is a `WindowProxy` or `null` when opening failed or was blocked.

## Common features

- `popup` asks for minimal browser UI.
- `width`, `height`, `left` and `top` request geometry.
- `noopener` prevents the opened page from receiving `window.opener`.
- `noreferrer` suppresses the referrer and also implies opener isolation in typical behavior.

## User activation

- Call `window.open` synchronously from a click or other trusted user action.
- Opening after an awaited delay can lose transient user activation and be blocked.
- Open a blank window first only when the workflow genuinely requires asynchronous URL preparation, then navigate it safely.

## Lifecycle

- Check the returned reference before using it.
- Poll `popup.closed` sparingly or use messaging to learn when the workflow completes.
- Clean up timers and message listeners when the popup closes.
- Do not assume requested dimensions or screen placement were honored.

## Caveats

- Popup blockers and mobile browsers can change the requested behavior.
- Opening untrusted URLs without `noopener` can expose the opener relationship.

## Covered source units

### Text elements

```text
T-009, T-010
```

### Screenshot uses

```text
IU-022, IU-023, IU-024, IU-025, IU-034
```

Raw labels and exact screenshots remain in the SVG and closed ledgers.
