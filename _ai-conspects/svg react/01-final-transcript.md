# Final semantic transcript — SVG in React

Authoritative source: `source/svg react.svg`

---

# R01 — Vite, SVGR and import modes

## URL import

Default Vite behavior commonly treats an SVG import as an asset URL:

```ts
import iconUrl
  from "./icon.svg";
```

```tsx
<img
  src={iconUrl}
  alt=""
/>
```

Type declaration:

```ts
declare module "*.svg" {
  const src: string;
  export default src;
}
```

## React component import with SVGR

Install:

```bash
npm install -D vite-plugin-svgr
```

Configure:

```ts
import {
  defineConfig,
} from "vite";

import react
  from "@vitejs/plugin-react";

import svgr
  from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
});
```

Import:

```tsx
import EyeIcon
  from "./eye.svg?react";

<EyeIcon />
```

Declaration:

```ts
declare module "*.svg?react" {
  import * as React
    from "react";

  const Component:
    React.FunctionComponent<
      React.SVGProps<
        SVGSVGElement
      > & {
        title?: string;
      }
    >;

  export default Component;
}
```

Keep URL and component import declarations separate because they produce different runtime values.

---

# R02 — barrels and dynamic components

## Barrel exports

```ts
export {
  default as EyeIcon,
} from "./eye.svg?react";

export {
  default as EyeClosedIcon,
} from "./eye-closed.svg?react";
```

Consumer:

```ts
import {
  EyeIcon,
} from "@/assets/icons";
```

## Component type

```ts
export type SvgComponent =
  React.FunctionComponent<
    React.SVGProps<
      SVGSVGElement
    > & {
      title?: string;
    }
  >;
```

Component prop:

```tsx
type AccountNavProps = {
  Icon: SvgComponent;
};

export function AccountNav({
  Icon,
}: AccountNavProps) {
  return (
    <NavLink to="/account/profile">
      <Icon
        aria-hidden="true"
      />
    </NavLink>
  );
}
```

## Uppercase JSX identifiers

This is wrong:

```tsx
function AccountNav({
  icon,
}: {
  icon: SvgComponent;
}) {
  return <icon />;
}
```

Lowercase JSX names are interpreted as intrinsic DOM tags.

Use an uppercase local variable:

```tsx
function AccountNav({
  icon: Icon,
}: {
  icon: SvgComponent;
}) {
  return <Icon />;
}
```

or name the prop `Icon`.

---

# R03 — module declarations and consistent contracts

Place ambient declarations in a `.d.ts` file included by TypeScript, for example:

```text
src/vite-env.d.ts
src/types/assets.d.ts
```

```ts
import type {
  SvgComponent,
} from "./types";

declare module "*.svg?react" {
  const Component:
    SvgComponent;

  export default Component;
}
```

Avoid importing a normal application module from an ambient declaration when it creates circular or inclusion problems. A self-contained declaration is often the most robust.

## Common errors

```text
SVG imported as URL but rendered as component
component declaration missing or not included by tsconfig
barrel exports component under an unexpected name
lowercase JSX variable treated as a custom DOM element
plugin not registered in Vite
mixing legacy SVGR import syntax with ?react syntax
```

Verify that all layers agree:

```text
Vite plugin
import suffix
TypeScript declaration
barrel export
component prop type
```

---

# R04 — sizing, color and accessibility

## Follow font size

```css
.button-primary svg {
  width: 1em;
  height: 1em;
  vertical-align: middle;
}
```

This makes icon size follow the surrounding font size.

## `currentColor`

SVG source:

```svg
<path
  fill="currentColor"
  d="..."
/>
```

React:

```tsx
<EyeIcon
  className="icon"
  aria-hidden="true"
/>
```

CSS:

```css
.icon {
  width: 1em;
  height: 1em;
  color: currentColor;
}
```

The path inherits the CSS text color.

## Accessible names

Decorative icon:

```tsx
<EyeIcon
  aria-hidden="true"
  focusable="false"
/>
```

Meaningful standalone icon:

```tsx
<EyeIcon
  role="img"
  title="Show password"
/>
```

For an icon button, the button itself should have an accessible name:

```tsx
<button
  type="button"
  aria-label="Show password"
>
  <EyeIcon
    aria-hidden="true"
  />
</button>
```

## Checklist

```text
[ ] decide whether an import is a URL or a React component
[ ] keep declarations aligned with the selected import syntax
[ ] use uppercase variables for dynamic JSX components
[ ] type SVG props with SVGProps<SVGSVGElement>
[ ] use currentColor for themeable icons
[ ] size icons with em when they should follow text
[ ] provide accessible names at the control/graphic boundary
```

# Coverage

```text
unique embedded screenshots: 14
image uses: 14
native SVG labels: 16
duplicate extra placements: 0

processed image uses: 14
processed text labels: 16
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
