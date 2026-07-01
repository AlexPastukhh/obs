# JavaScript indexed iteration — repetition guide v001

Generated: 2026-07-01

## Comparison

| Construct | Produces | Index type | Best use |
|---|---|---|---|
| `for...of arr` | values | none | ordinary value iteration |
| `for...of arr.entries()` | `[index, value]` | number | value and index together |
| `for...of arr.keys()` | indices | number | index-only iteration |
| `for...in arr` | enumerable property keys | string | object-like key enumeration; usually avoid for arrays |
| classic `for` | manual index | number | explicit bounds, steps, reverse iteration |

## Recall questions

1. Why does `entries()` fit the C# `foreach` mental model while also exposing an index?
2. How does `keys()` differ from `entries()`?
3. Why is a `for...in` array index a string?
4. What extra properties could `for...in` enumerate?
5. Which construct is best when the loop needs to skip every second element?

## Coding prompts

1. Print `0 -> a`, `1 -> b`, `2 -> c` with `entries()`.
2. Iterate only array indices with `keys()`.
3. Rewrite a `for...in` array loop using `entries()`.
4. Iterate an array in reverse with a classic `for`.
5. Filter by value while preserving original indices.
