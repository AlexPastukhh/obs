# R01 — Common narrowing patterns

## S-001 — Common narrowing patterns

### Near-literal normalized transcript

**Common narrowing patterns**

Any of these narrow away `undefined`:

```ts
if (maybeName == null) return;
// removes null and undefined

if (!maybeName) return;
// also removes "" (empty string), so be careful

if (typeof maybeName !== "string") return;
```

### Study meaning

All three checks can remove `undefined`, but they are not semantically identical:

- `maybeName == null` intentionally uses loose equality to match both `null` and `undefined`;
- `!maybeName` removes every falsy value, including the valid empty string;
- `typeof maybeName !== "string"` keeps only runtime strings.

Choose a guard according to the values the program considers valid.

### Recall questions

1. Why does `value == null` remove both `null` and `undefined`?
2. Which valid string value is also rejected by `!value`?
3. What type remains after `typeof value !== "string"` returns?
4. When is a truthiness guard too broad?
