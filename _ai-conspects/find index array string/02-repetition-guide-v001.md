# Find index in arrays and strings — repetition guide v001

Generated: 2026-06-30

## Comparison table

| Data / goal | Method | Return value | Match rule |
|---|---|---|---|
| Array, known primitive value | `array.indexOf(value)` | index or `-1` | strict equality |
| Array, object or condition | `array.findIndex(predicate)` | index or `-1` | predicate |
| String, literal substring position | `string.indexOf(text)` | index or `-1` | literal substring |
| String, existence only | `string.includes(text)` | `true` / `false` | literal substring |
| String, regular expression | `string.search(regex)` | index or `-1` | regex |

## High-value questions

1. Why can `indexOf({ id: 2 })` fail even when an object with `id: 2` exists in an array?
2. How would you find the first negative number in an array?
3. How do `includes` and `indexOf` differ when the substring starts at index `0`?
4. When is `search` more expressive than `indexOf`?
5. What is the common “not found” value shared by `indexOf`, `findIndex`, and `search`?
6. Which methods return a position and which return a boolean?

## Coding prompts

1. Find the index of `'c'` in `['a', 'b', 'c']`.
2. Find the first user with `active === false`.
3. Check whether a string contains `'error'` without needing its position.
4. Find the first digit in a string using a regular expression.
5. Write a helper that returns `null` instead of `-1`.
