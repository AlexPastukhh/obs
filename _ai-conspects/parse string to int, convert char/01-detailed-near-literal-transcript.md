# Detailed near-literal transcript — parse string to int, convert char

Generated: 2026-06-29 06:06:52 UTC

## Transcript policy

This is a detailed, source-faithful semantic transcript. It stays close to the wording, ordering, examples, and code shown in the SVG screenshots, but it is not a mechanically duplicated OCR dump.

Only genuinely repeated statements are consolidated. Different examples, edge cases, results, and caveats remain separate.

No review questions are included.

## Source coverage

```text
SVG text labels: 1 / 1
embedded screenshots: 3 / 3
image uses: 3 / 3
remaining source units: 0
```

## Main idea

The conspect compares JavaScript ways to convert strings and characters into numbers:

- unary plus (`+input`) and `Number(input)`;
- `parseInt(input)`;
- `parseInt(input, 10)`;
- `parseFloat(input)`;
- a direct ASCII character-to-digit implementation using `charCodeAt(0)`.

The key distinction is between **converting the entire value** and **parsing a valid numeric prefix**.

## Unary plus and Number

Unary plus and `Number(...)` follow the same broad numeric-conversion behavior in the comparison table.

They try to convert the complete input value into a number.

### Results shown in the source

| Input literal | `+input` / `Number(input)` |
|---|---:|
| `"42"` | `42` |
| `" 42 "` | `42` |
| `""` | `0` |
| `" "` | `0` |
| `null` | `0` |
| `undefined` | `NaN` |
| `true` | `1` |
| `false` | `0` |
| `"123abc"` | `NaN` |
| `"abc123"` | `NaN` |
| `"123.45"` | `123.45` |
| `"123.45abc"` | `NaN` |

Important observations:

- surrounding whitespace is ignored for a valid numeric string;
- an empty string and a string containing only spaces become `0`;
- `null` becomes `0`;
- `true` becomes `1`, and `false` becomes `0`;
- `undefined` becomes `NaN`;
- mixed strings such as `"123abc"` fail because the whole string is not numeric;
- decimal text such as `"123.45"` remains a floating-point value;
- trailing nonnumeric text causes full conversion to fail.

Use this family when the whole value must be a valid numeric representation.

## parseInt

`parseInt` parses an integer from the beginning of a string.

The source compares both:

```js
parseInt(input)
parseInt(input, 10)
```

For the displayed decimal examples, they return the same results. Passing radix `10` makes the intended decimal interpretation explicit.

### Results shown in the source

| Input literal | `parseInt(input)` | `parseInt(input, 10)` |
|---|---:|---:|
| `"42"` | `42` | `42` |
| `" 42 "` | `42` | `42` |
| `""` | `NaN` | `NaN` |
| `" "` | `NaN` | `NaN` |
| `null` | `NaN` | `NaN` |
| `undefined` | `NaN` | `NaN` |
| `true` | `NaN` | `NaN` |
| `false` | `NaN` | `NaN` |
| `"123abc"` | `123` | `123` |
| `"abc123"` | `NaN` | `NaN` |
| `"123.45"` | `123` | `123` |
| `"123.45abc"` | `123` | `123` |

The behavior demonstrated by the table:

- leading whitespace is allowed;
- parsing must begin with a valid numeric prefix;
- `"123abc"` succeeds because parsing starts with digits and stops at the first invalid character;
- `"abc123"` fails because there is no numeric prefix at the start;
- fractional text is truncated at the decimal point;
- `parseInt` is not the same as rounding: it stops integer parsing before the fractional part.

## parseFloat

`parseFloat` also parses from the beginning of the string, but it preserves a valid fractional part.

### Results shown in the source

| Input literal | `parseFloat(input)` |
|---|---:|
| `"42"` | `42` |
| `" 42 "` | `42` |
| `""` | `NaN` |
| `" "` | `NaN` |
| `null` | `NaN` |
| `undefined` | `NaN` |
| `true` | `NaN` |
| `false` | `NaN` |
| `"123abc"` | `123` |
| `"abc123"` | `NaN` |
| `"123.45"` | `123.45` |
| `"123.45abc"` | `123.45` |

This means:

- `parseFloat` accepts a valid numeric prefix;
- it can preserve the decimal portion;
- it stops when nonnumeric trailing content begins;
- it still fails when the string does not start with a valid number.

## Choosing between the functions

Use unary plus or `Number` when:

- the entire input must represent a number;
- empty-string-to-zero behavior is acceptable or is explicitly guarded against;
- values such as booleans and `null` are intentionally allowed to follow JavaScript coercion rules.

Use `parseInt(input, 10)` when:

- an integer prefix is expected;
- trailing text may be present and should be ignored;
- fractional input should produce the integer prefix rather than a floating-point value.

Use `parseFloat(input)` when:

- a decimal prefix is expected;
- trailing nonnumeric text may be present;
- the fractional part must be retained.

In all cases, invalid numeric conversion is represented by `NaN`, so code should test the result when invalid input is possible.

A strict check usually uses:

```js
const value = Number(input);

if (Number.isNaN(value)) {
  // invalid input
}
```

## Fast ASCII character-to-digit conversion

The source also shows a minimal conversion for one known ASCII digit character:

```js
function charToDigitAscii(ch) {
  if (typeof ch !== "string" || ch.length !== 1) return NaN;

  const code = ch.charCodeAt(0);

  return code >= 48 && code <= 57
    ? code - 48
    : NaN;
}
```

Usage shown:

```js
charToDigitAscii("7"); // 7
charToDigitAscii("-"); // NaN
```

### How it works

ASCII digit code points are consecutive:

```text
"0" -> 48
"1" -> 49
...
"9" -> 57
```

After confirming that the character code is between `48` and `57`, subtracting `48` converts the code into its numeric digit value.

For example:

```text
"7".charCodeAt(0) = 55
55 - 48 = 7
```

### Why this method is used

The source describes it as:

- fast;
- minimal;
- suitable for tight loops;
- allocation-free for this direct conversion path.

### Important limitation

This implementation handles only ASCII digits `"0"` through `"9"`.

It does **not** handle every Unicode character that visually represents a digit. It should therefore be used only when the input contract guarantees a single ASCII digit.

## Final compact distinction

```text
Number / unary +:
convert the whole value

parseInt:
parse an integer prefix

parseFloat:
parse a floating-point prefix

charCodeAt digit conversion:
convert exactly one validated ASCII digit
```

The preserved SVG remains authoritative for the exact original screenshots and layout.
