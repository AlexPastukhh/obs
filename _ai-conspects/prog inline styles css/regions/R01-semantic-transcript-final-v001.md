# Final semantic transcript — programmatic inline CSS styles

Authoritative source: `source/prog inline styles css.svg`

## DOM style property

```ts
const element =
  document.querySelector(
    ".box"
  ) as HTMLElement;

element.style.color =
  "red";

element.style.backgroundColor =
  "black";
```

JavaScript property names are camel-cased:

```text
background-color
    backgroundColor

margin-top
    marginTop
```

## `setProperty` and `removeProperty`

Use CSS syntax names and custom properties:

```ts
element.style.setProperty(
  "background-color",
  "black"
);

element.style.setProperty(
  "--accent-color",
  "#09f"
);

element.style.removeProperty(
  "background-color"
);
```

Priority:

```ts
element.style.setProperty(
  "color",
  "red",
  "important"
);
```

Prefer avoiding `!important` unless required by the cascade contract.

## Reading styles

Inline declaration only:

```ts
const inlineColor =
  element.style.color;
```

Resolved computed style:

```ts
const computed =
  getComputedStyle(element);

const color =
  computed.color;
```

Computed style can include stylesheet, inheritance and browser resolution.

## React inline style

```tsx
<div
  style={{
    color: active
      ? "red"
      : "black",
    marginTop: 8,
  }}
/>
```

React accepts a style object and adds `px` to many numeric length properties.

For reusable visual states, prefer class names:

```tsx
<div
  className={
    active
      ? "box box--active"
      : "box"
  }
/>
```

Use inline styles for truly dynamic values and CSS variables; use classes for reusable themes, states, pseudo-classes and media queries.

## Cleanup

Imperative effects should restore/remove styles:

```tsx
useEffect(() => {
  const element =
    ref.current;

  if (!element) {
    return;
  }

  element.style.setProperty(
    "--progress",
    String(progress)
  );

  return () => {
    element.style.removeProperty(
      "--progress"
    );
  };
}, [progress]);
```


# Coverage

```text
unique embedded screenshots: 3
image uses: 3
native SVG labels: 1
duplicate extra placements: 0

processed image uses: 3
processed text labels: 1
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
