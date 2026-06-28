# Final semantic transcript — IntersectionObserver

Authoritative source: `source/interseption observer.svg`

---

# R01 — callback and entries

```ts
const observer =
  new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        console.log(
          entry.target,
          entry.isIntersecting,
          entry.intersectionRatio,
        );
      }
    },
    options,
  );
```

`entries` is an array because one observer can watch many targets and one browser notification can include changes for multiple elements.

Do not assume `entries[0]` is always the element you care about when several targets are observed.

Important `IntersectionObserverEntry` fields:

```text
target
    observed DOM element

isIntersecting
    whether target intersects the root

intersectionRatio
    visible fraction from 0 to 1

boundingClientRect
    target geometry

intersectionRect
    visible intersection geometry

rootBounds
    root geometry when available

time
    observer timestamp
```

---

# R02 — React pattern

```tsx
function Sentinel() {
  const sentinelRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const [
    isVisible,
    setIsVisible,
  ] = useState(false);

  useEffect(() => {
    const element =
      sentinelRef.current;

    if (!element) {
      return;
    }

    const observer =
      new IntersectionObserver(
        entries => {
          const entry =
            entries.find(
              item =>
                item.target
                === element,
            );

          if (!entry) {
            return;
          }

          setIsVisible(
            entry.isIntersecting,
          );
        },
        {
          threshold: 0.2,
        },
      );

    observer.observe(element);

    return () => {
      observer.unobserve(
        element,
      );

      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={sentinelRef}
    />
  );
}
```

Why `useEffect`:

```text
render creates JSX
commit creates DOM nodes
ref.current becomes a DOM element
effect can safely attach the observer
```

Do not create/attach the observer during render.

Capture the current element in a local variable so cleanup refers to the same element that was observed.

---

# R03 — multiple targets

```ts
const elements =
  document.querySelectorAll(
    "section",
  );

const observer =
  new IntersectionObserver(
    entries => {
      for (
        const entry of entries
      ) {
        if (
          entry.isIntersecting
          && entry.intersectionRatio
            >= 0.5
        ) {
          activate(
            entry.target,
          );
        }
      }
    },
    {
      threshold: [0, 0.5, 1],
    },
  );

elements.forEach(
  element =>
    observer.observe(element),
);
```

With multiple targets:

```text
iterate all entries
or find the entry whose target matches the desired ref
do not rely on callback array order
```

When one observer watches only one target, destructuring the first entry is concise:

```ts
([entry]) => {
  setVisible(
    entry.isIntersecting,
  );
}
```

But the assumption should remain explicit.

---

# R04 — observer options

## `root`

```ts
{
  root: null,
}
```

`null` uses the browser viewport.

```ts
{
  root:
    scrollContainerElement,
}
```

Use a custom root for elements inside a scrollable container.

## `threshold`

```ts
{
  threshold: 0,
}
```

Notifies around the first intersection.

```ts
{
  threshold: 1,
}
```

Requires full visibility before the threshold is crossed.

```ts
{
  threshold: [
    0,
    0.25,
    0.5,
    0.75,
    1,
  ],
}
```

The ratio refers to the target's visible fraction, not the viewport fraction.

## `rootMargin`

```ts
{
  rootMargin:
    "100px 0px",
}
```

It expands or contracts the effective root rectangle.

Use cases:

```text
prefetch before content enters the viewport
start lazy loading early
delay activation until the target moves deeper inside
```

CSS-like order:

```text
top right bottom left
```

Positive margins expand the root. Negative margins contract it.

## Cleanup choices

```ts
observer.unobserve(
  element,
);
```

stops observing one target.

```ts
observer.disconnect();
```

stops all targets for that observer.

Calling both in a one-target cleanup is safe but `disconnect()` alone is usually sufficient.

## Checklist

```text
[ ] create observers after DOM commit
[ ] observe a real current DOM element
[ ] capture the observed element for cleanup
[ ] iterate entries for multiple targets
[ ] match entry.target when selecting one target
[ ] choose root, threshold and rootMargin deliberately
[ ] disconnect on unmount
```

# Coverage

```text
unique embedded screenshots: 15
image uses: 15
native SVG labels: 8
duplicate extra placements: 0

processed image uses: 15
processed text labels: 8
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
