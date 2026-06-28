# Final semantic transcript — creating JavaScript arrays and fixed-length storage

Authoritative source: `source/create array, fixed length.svg`  
Coverage: **19 unique screenshots / 19 placements + 3 native SVG labels**

---

# R01 — array creation patterns

Prefer literal syntax for ordinary arrays:

```js
const values = [1, 2, 3];
```

`Array()` and `new Array()` are functionally equivalent:

```js
Array(1, 2, 3);
new Array(1, 2, 3);
```

The single-number constructor form is special:

```js
new Array(5);
// length 5, five empty slots
```

It does not create `[5]`. Use `Array.of()` when a single number must become one element:

```js
Array.of(5);
// [5]
```

`Array.from()` creates an array from an iterable or array-like value and can map while creating:

```js
const zeroToFour =
  Array.from(
    { length: 5 },
    (_, index) => index,
  );

const oneToFive =
  Array.from(
    { length: 5 },
    (_, index) => index + 1,
  );
```

A reusable range helper:

```js
function range(
  start,
  end,
  step = 1,
) {
  const length =
    Math.max(
      0,
      Math.ceil(
        (end - start) / step));

  return Array.from(
    { length },
    (_, index) =>
      start + index * step,
  );
}
```

---

# R02 — holes versus initialized values

```js
const array = new Array(3);
```

creates three holes, not three explicit `undefined` values:

```js
array[0];
// undefined

array.hasOwnProperty(0);
// false
```

Holes matter because some iteration methods skip them:

```text
map
forEach
filter
```

Serialization and equality-related behavior can also differ.

Initialize values explicitly when holes are not intended:

```js
const zeros =
  new Array(3).fill(0);

const values =
  Array.from(
    { length: 3 },
    () => 0,
  );
```

Use caution with `fill()` and objects:

```js
const wrong =
  Array(3).fill([]);

// every element references the same array
```

Correct independent values:

```js
const rows =
  Array.from(
    { length: 3 },
    () => [],
  );
```

---

# R03 — matrices and shared inner arrays

A matrix with independent rows:

```js
const rows = 5;
const cols = 3;

const matrix =
  Array.from(
    { length: rows },
    () => Array(cols),
  );
```

Pre-filled matrix:

```js
const matrix =
  Array.from(
    { length: rows },
    () =>
      Array.from(
        { length: cols },
        () => 0),
  );
```

This is wrong:

```js
const matrix =
  Array(5).fill(
    Array(3),
  );
```

All outer entries refer to the same inner array:

```js
matrix[0][0] = 1;

console.log(matrix[1][0]);
// 1
```

`Array.from(..., () => Array(cols))` invokes the factory for every row and therefore creates independent arrays.

Normal JavaScript arrays remain resizable:

```js
matrix.push([]);
matrix[0].push(99);
```

Creating an initial length does not enforce a permanent fixed size.

---

# R04 — true fixed-size numeric arrays and choices

Typed arrays have a fixed element count:

```js
const bytes =
  new Uint8Array(16);

const words =
  new Int32Array(8);
```

Their length cannot grow or shrink. Elements are numeric and initialized to zero.

A fixed-inner-length numeric matrix can use one typed array per row:

```js
const matrix =
  Array.from(
    { length: rows },
    () =>
      new Int32Array(cols),
  );
```

The outer normal array can still be resized unless the design prevents it.

`Object.freeze()` prevents structural mutation of a normal array object but does not turn nested arrays into fixed-size typed storage or deeply freeze the complete graph.

Decision guide:

```text
ordinary general-purpose collection
    []

single numeric element
    Array.of(value)

create by length and mapping
    Array.from({ length }, factory)

initialized repeated primitive
    Array(length).fill(value)

independent nested rows
    Array.from({ length: rows }, () => Array(cols))

truly fixed-length numeric storage
    typed arrays
```

Practical rules:

```text
[ ] avoid the single-number Array constructor pitfall
[ ] distinguish holes from explicit undefined
[ ] do not fill nested arrays with one shared reference
[ ] remember normal arrays can grow and shrink
[ ] use typed arrays when a real fixed numeric length is required
```

---

# Coverage

```text
unique embedded screenshots: 19
image uses: 19
native SVG labels: 3
duplicate extra placements: 0

processed image uses: 19
processed text labels: 3
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
