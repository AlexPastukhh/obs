# Final semantic transcript — JavaScript sorting

Authoritative source: `source/js sorting.svg`

---

# R01 — `localeCompare` and `Intl.Collator`

## `localeCompare`

```ts
const result =
  a.localeCompare(
    b,
    "en",
    {
      sensitivity: "base",
    },
  );
```

Return value:

```text
negative
    a comes before b

zero
    equal under the selected collation rules

positive
    a comes after b
```

Use the sign only. Do not rely on the exact values being `-1`, `0`, and `1`.

`localeCompare` is convenient for one-off comparisons, but repeated sorting can create/reuse internal collation work less explicitly.

## `Intl.Collator`

```ts
const collator =
  new Intl.Collator(
    "en",
    {
      usage: "sort",
      sensitivity: "variant",
      numeric: true,
    },
  );

items.sort(
  collator.compare,
);
```

Advantages:

```text
collation rules are created once
the compare function can be reused
intent and options are centralized
better fit for repeated sorting/filtering
```

Use locale-aware comparison for human-readable text such as names, labels, titles and localized UI strings.

For technical identifiers where byte/code-point predictability matters, ordinary comparison or explicit normalization may be more appropriate.

---

# R02 — important collation options

## `sensitivity`

```text
"base"
    ignores case and accents
    a ≈ A
    a ≈ á

"accent"
    ignores case
    distinguishes accents
    a ≈ A
    a ≠ á

"case"
    distinguishes case
    often ignores accent differences at the base level

"variant"
    distinguishes case and accents
    most detailed comparison
```

Example:

```ts
const insensitive =
  new Intl.Collator(
    "en",
    {
      sensitivity: "base",
    },
  );

insensitive.compare(
  "resume",
  "résumé",
) === 0;
```

For accent-sensitive but case-insensitive matching:

```ts
const collator =
  new Intl.Collator(
    "en",
    {
      sensitivity: "accent",
    },
  );
```

## Other options

```ts
const collator =
  new Intl.Collator(
    "en",
    {
      usage: "sort",
      sensitivity: "variant",
      numeric: true,
      ignorePunctuation: false,
      caseFirst: "false",
    },
  );
```

Key options:

```text
usage
    "sort" or "search"

numeric
    compares embedded number sequences naturally
    "file2" before "file10"

ignorePunctuation
    can ignore punctuation differences

caseFirst
    controls uppercase/lowercase ordering where supported

collation
    requests a locale-specific collation

localeMatcher
    selects locale lookup strategy
```

Not every locale supports every requested behavior identically.

---

# R03 — sort versus search

## `usage: "sort"`

Sorting requires a strict and consistent ordering:

```ts
const collator =
  new Intl.Collator(
    "de",
    {
      usage: "sort",
      sensitivity: "variant",
    },
  );

names.sort(
  collator.compare,
);
```

Use for:

```text
tables
dropdowns
contact lists
filenames shown to users
localized labels
```

## `usage: "search"`

Search collation is optimized for matching equivalence rather than producing a stable total order:

```ts
const collator =
  new Intl.Collator(
    "en",
    {
      usage: "search",
      sensitivity: "base",
    },
  );

const matches =
  items.filter(
    item =>
      collator.compare(
        item,
        query,
      ) === 0,
  );
```

Do not use a search collator as an `Array.sort` comparator. Search equivalence can classify multiple distinct strings as equal, which can produce surprising ordering.

## Common presets

```ts
// case- and accent-insensitive matching
new Intl.Collator(
  locale,
  {
    usage: "search",
    sensitivity: "base",
  },
);

// user-visible natural sorting
new Intl.Collator(
  locale,
  {
    usage: "sort",
    sensitivity: "variant",
    numeric: true,
  },
);

// case-insensitive, accent-sensitive comparison
new Intl.Collator(
  locale,
  {
    sensitivity: "accent",
  },
);
```

## Practical checklist

```text
[ ] reuse one Intl.Collator for repeated operations
[ ] use usage:"sort" for ordering
[ ] use usage:"search" for equivalence/filtering
[ ] choose sensitivity deliberately
[ ] enable numeric for human-friendly numbered strings
[ ] do not rely on compare returning exactly -1 or 1
[ ] avoid locale collation for machine identifiers unless intended
```

# Coverage

```text
unique embedded screenshots: 13
image uses: 13
native SVG labels: 6
duplicate extra placements: 0

processed image uses: 13
processed text labels: 6
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
