# Regional transcript — R01: Root error state and clearing on route or action

Conspect: `react root error, trigger useeffect on route change`  
Generated: 2026-06-28 12:30:00 UTC

## Coverage

```text
text elements represented: 5 / 5
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A root error banner is useful for application-wide failures, but its lifetime must be explicit. Otherwise an error from one page can leak into the next route.

## Root error model

- Store the current root error in context or a top-level state owner.
- Expose `setRootError` and `clearRootError` functions.
- Render the banner in the root layout.
- Keep structured fields such as message, code and optional retry action.

## Clear triggers

- Clear when the user explicitly dismisses the banner.
- Clear before or after navigation according to the desired UX.
- Clear when the action that caused the error is retried successfully.
- Do not clear on every render; renders are not lifecycle events.

## Scope decision

- Use a root error only when multiple pages or global infrastructure need it.
- Keep validation and page-specific errors near the page or form.
- A clear ownership rule prevents unrelated errors from replacing one another.

## Representative pattern

```tsx
type RootErrorContextValue = {
  error: AppError | null;
  setRootError(error: AppError): void;
  clearRootError(): void;
};
```

## Caveats

- Avoid storing raw Error objects when state must be serialized or shown to users.
- Concurrent operations may need IDs so clearing one error does not clear a newer one.

## Source labels

- `THE PROBLEM`
- `NEED SOME ROOT ERRORS`
- `BUT IF I NEED THEM TO BE REMOVED ON SOME ACTION/ON NEXT RENDER/ON ROUTE CHANGE`
- `THEN I NEED TO USE CONTEXT FUNC INSUDE USELAYOUT EFFECT TO GET RID OF ERROR`
- `MESSAGE`

## Covered text elements

```text
T-001, T-002, T-003, T-004, T-005
```

## Covered screenshot uses

```text
IU-004, IU-005
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The concepts and representative examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main semantic flow represented here.
