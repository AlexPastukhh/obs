# Final semantic transcript — CSS animation keyframes

Authoritative source: `source/animation keyframes.svg`

---

# R01 — animation versus transition

## Transition

A transition needs a property value change:

```css
.button {
  transform: translateY(0);
  transition:
    transform 300ms ease-out;
}

.button:hover {
  transform: translateY(-4px);
}
```

It interpolates between the previous and new states.

## Animation

An animation can start automatically and can define multiple stages:

```css
.element {
  animation:
    fade-in
    300ms
    ease-out
    forwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
```

Comparison:

```text
transition
    triggered by state/property change
    usually two endpoints
    natural for hover/focus/open states

animation
    can start independently
    supports multiple keyframes
    can repeat, alternate and be controlled
```

---

# R02 — animation shorthand and properties

Full shorthand order:

```css
.element {
  animation:
    name
    duration
    timing-function
    delay
    iteration-count
    direction
    fill-mode
    play-state;
}
```

Example:

```css
.element {
  animation:
    fade-in
    300ms
    ease-out
    100ms
    1
    normal
    forwards
    running;
}
```

Common individual properties:

```text
animation-name
animation-duration
animation-timing-function
animation-delay
animation-iteration-count
animation-direction
animation-fill-mode
animation-play-state
```

## Direction

```text
normal
    0% → 100%

reverse
    100% → 0%

alternate
    forward, then backward

alternate-reverse
    backward, then forward
```

## Fill mode

```text
none
    no keyframe styles outside active interval

forwards
    retain final keyframe after finishing

backwards
    apply initial keyframe during delay

both
    combine backwards and forwards
```

`forwards` affects the presented style after the animation; it does not rewrite the underlying CSS rule.

## Play state

```css
.element {
  animation-play-state:
    paused;
}
```

Useful for explicit pause/resume controls and JavaScript-driven playback.

---

# R03 — keyframe syntax and events

## `from` / `to`

```css
@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
```

Equivalent to `0%` and `100%`.

## Percentage stages

```css
@keyframes bounce {
  0% {
    transform:
      translateY(0);
  }

  50% {
    transform:
      translateY(-20px);
  }

  100% {
    transform:
      translateY(0);
  }
}
```

Multiple percentages provide intermediate states.

## Multiple animations

```css
.element {
  animation:
    fade-in 300ms ease-out,
    shadow-in 300ms ease-out;
}
```

Comma-separated animation lists align each property's comma-separated entries by position.

## Events

```ts
element.addEventListener(
  "animationstart",
  onStart,
);

element.addEventListener(
  "animationiteration",
  onIteration,
);

element.addEventListener(
  "animationend",
  onEnd,
);

element.addEventListener(
  "animationcancel",
  onCancel,
);
```

Clean up listeners when the element/component is disposed.

---

# R04 — performance and accessibility

## Prefer compositor-friendly properties

Usually prefer animating:

```text
transform
opacity
```

Avoid frequent animation of layout-heavy properties when possible:

```text
top / left
width / height
margin / padding
```

Layout-affecting animations can trigger style, layout and paint work every frame.

`will-change` can help in targeted cases, but should not be applied broadly because it consumes resources.

## Reduced motion

```css
@media (
  prefers-reduced-motion:
  reduce
) {
  *,
  *::before,
  *::after {
    animation-duration:
      0.01ms !important;

    animation-iteration-count:
      1 !important;

    transition-duration:
      0.01ms !important;
  }
}
```

Or disable specific non-essential motion:

```css
@media (
  prefers-reduced-motion:
  reduce
) {
  .decorative-animation {
    animation: none;
  }
}
```

Preserve essential state communication even when motion is reduced.

## Checklist

```text
[ ] use transitions for state changes
[ ] use keyframes for autonomous or multi-step motion
[ ] specify duration; default duration is zero
[ ] choose fill mode deliberately
[ ] animate transform/opacity where possible
[ ] remove animation listeners during cleanup
[ ] respect prefers-reduced-motion
```

# Coverage

```text
unique embedded screenshots: 14
image uses: 14
native SVG labels: 0
duplicate extra placements: 0

processed image uses: 14
processed text labels: 0
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
