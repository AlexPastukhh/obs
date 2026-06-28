# Final semantic transcript — Uint arrays, Blob, ArrayBuffer, DataView and endianness

Authoritative source: `source/uintarray,blob, arraybuffer,dataview,endianness.svg`  
Coverage: **52 unique screenshots / 53 placements + 8 native SVG labels**

---

# R01 — raw storage and typed-array views

## `ArrayBuffer`

`ArrayBuffer` is a fixed-size block of raw bytes:

```js
const buffer = new ArrayBuffer(8);
```

By itself it does not define whether the bytes represent integers, floats, text or a protocol message. A view interprets the storage.

```js
const bytes = new Uint8Array(buffer);
const words = new Uint32Array(buffer);
```

Both views can refer to the same memory:

```text
ArrayBuffer
    storage

Uint8Array
    one byte per element

Uint32Array
    four bytes per element
```

Writing through one view changes the bytes observed through the other.

## Typed arrays

Names encode element type:

```text
Uint8Array
    unsigned 8-bit integers
    1 byte per element
    range 0..255

Uint16Array
    unsigned 16-bit integers
    2 bytes per element
    range 0..65535

Uint32Array
    unsigned 32-bit integers
    4 bytes per element
    range 0..4294967295
```

Other families include:

```text
Int8Array
Int16Array
Int32Array
Float32Array
Float64Array
BigInt64Array
BigUint64Array
```

A typed array is not a normal JavaScript array. It has a fixed length, homogeneous numeric elements and a backing buffer.

## Same bytes, different interpretation

```js
const buffer = new ArrayBuffer(4);
const bytes = new Uint8Array(buffer);

bytes.set([1, 2, 3, 4]);

const words = new Uint32Array(buffer);
```

The underlying memory remains:

```text
01 02 03 04
```

`bytes` reports four elements. `words` reports one 32-bit element whose numeric value depends on the platform byte order used by that typed-array view.

The key idea:

```text
bytes are storage
views provide interpretation
```

## Choosing an element width

Use `Uint8Array` for:

```text
raw file/network bytes
WebSocket binary messages
crypto/hash inputs
encoders and decoders
custom protocol buffers
the closest browser equivalent to byte[]
```

Use `Uint16Array` or `Uint32Array` only when the data is genuinely an array of fixed-width numeric elements, such as pixels, counters, indexes or numeric workloads.

Do not choose `Uint32Array` merely because the buffer contains some numbers. Structured binary formats usually contain mixed field widths and need `DataView`.

## `Blob`

`Blob` is browser-oriented immutable binary/file-like data:

```js
const blob = new Blob(
  ["hello"],
  {
    type: "text/plain",
  },
);
```

Use it for:

```text
file downloads
object URLs
browser file APIs
uploading file-like content
delaying byte-level parsing
```

Convert to bytes when needed:

```js
const buffer = await blob.arrayBuffer();
const bytes = new Uint8Array(buffer);
```

Mental model:

```text
Blob
    file-like immutable binary object

ArrayBuffer
    raw in-memory byte storage

typed array
    numeric view over storage
```

---

# R02 — little-endian and big-endian

## Why byte order exists

A one-byte value has no byte-order problem.

A multi-byte value can store its bytes in different orders.

Example value:

```text
0x12345678
```

The four bytes are:

```text
12 34 56 78
```

Big-endian stores the most significant byte first:

```text
12 34 56 78
```

Little-endian stores the least significant byte first:

```text
78 56 34 12
```

The bytes are the same components, but their memory order differs.

## Significant bytes

For hexadecimal `0x12345678`:

```text
12
    most significant byte

78
    least significant byte
```

The same concept is analogous to the leftmost and rightmost digits in ordinary positional notation.

## When endianness matters

It matters when a value occupies more than one byte:

```text
16-bit, 32-bit and 64-bit integers
floating-point values
binary file fields
network protocol fields
CPU instructions and raw memory formats
```

It does not apply to the order inside one byte. `Uint8Array` element access is just byte access.

Network formats often specify big-endian (“network byte order”), but every format must be read according to its own specification.

## Wrong interpretation

Memory:

```text
34 12
```

Interpretation:

```text
little-endian -> 0x1234
big-endian    -> 0x3412
```

A parser that ignores the format’s byte order can produce a valid-looking but incorrect number.

Typed arrays use the host’s native byte order for multi-byte elements and do not let each read select little- or big-endian. Use `DataView` when strict format control is required.

---

# R03 — bytes becoming numbers

## Bits, bytes and values

```text
1 bit
    binary 0 or 1

8 bits
    1 byte
```

A byte such as:

```text
11111111
```

has unsigned value:

```text
128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255
```

For an unsigned `n`-bit value, the range is:

```text
0 .. 2^n - 1
```

Therefore:

```text
8 bits  -> 0..255
16 bits -> 0..65535
32 bits -> 0..4294967295
```

## Combining bytes

Four bytes:

```text
00000001 00000000 00000000 00000000
```

may form:

```text
1
```

under little-endian interpretation, but:

```text
16777216
```

under big-endian interpretation.

The bit pattern did not change. Only the mapping of byte positions to significance changed.

## Typed-array interpretation

A typed array groups the backing bytes according to its element width:

```text
Uint8Array
    groups one byte per value

Uint16Array
    groups two bytes per value

Uint32Array
    groups four bytes per value
```

This is convenient when every element has the same type and width.

For a packet such as:

```text
bytes 0..3   length
bytes 4..5   type
byte 6       flags
bytes 7..14  timestamp
```

a single `Uint32Array` is the wrong abstraction because fields are mixed-width and may use explicit endianness.

---

# R04 — `DataView`, offsets and mixed binary layouts

## Purpose

`DataView` is a flexible reader/writer over an `ArrayBuffer`.

```js
const buffer = new ArrayBuffer(8);
const view = new DataView(buffer);
```

It can read or write different numeric types at byte offsets:

```js
view.setUint8(0, 255);
view.setUint16(1, 0x1234, true);
view.setUint32(3, 0xDEADBEEF, false);
```

The boolean endian argument for multi-byte methods means:

```text
true  -> little-endian
false -> big-endian
```

One-byte methods do not need byte-order control.

## Read and write methods

Common methods include:

```text
getInt8 / setInt8
getUint8 / setUint8

getInt16 / setInt16
getUint16 / setUint16

getInt32 / setInt32
getUint32 / setUint32

getFloat32 / setFloat32
getFloat64 / setFloat64

getBigInt64 / setBigInt64
getBigUint64 / setBigUint64
```

Example:

```js
const buffer = new ArrayBuffer(4);
const view = new DataView(buffer);

view.setUint32(
  0,
  0x12345678,
  true,
);

console.log(
  view.getUint32(0, true),
);

console.log(
  view.getUint32(0, false),
);
```

The two reads interpret the same bytes with different byte order.

## Offsets are bytes

```js
view.getUint32(4, true);
```

means:

```text
start at byte offset 4
read four bytes
interpret as unsigned 32-bit integer
use little-endian
```

It does not mean “read the fourth 32-bit element.”

This byte-oriented addressing is what makes `DataView` suitable for protocol and file layouts.

## DataView window

A view can cover only part of a buffer:

```js
const buffer = new ArrayBuffer(20);

const metadata = new DataView(
  buffer,
  8,
  6,
);
```

This means:

```text
view byteOffset = 8
view byteLength = 6
covered original bytes = 8..13
```

Method offsets are relative to the view:

```js
metadata.getUint16(2, true);
```

reads original buffer bytes starting at:

```text
8 + 2 = 10
```

The view does not copy the bytes. It references the same storage.

## Combined `Uint8Array` and `DataView`

A common pattern:

```js
const buffer = new ArrayBuffer(6);

const bytes = new Uint8Array(buffer);
const view = new DataView(buffer);

bytes.set([
  0x34,
  0x12,
  0x78,
  0x56,
  0x01,
  0x02,
]);

console.log(
  view.getUint16(0, true),
);

console.log(
  view.getUint16(2, true),
);
```

Use:

```text
Uint8Array
    inspect/copy raw bytes

DataView
    parse or write structured numeric fields
```

## Practical choices

```text
Use Blob
    browser file/download/upload workflows

Use ArrayBuffer
    backing storage

Use Uint8Array
    raw byte manipulation

Use Uint16Array/Uint32Array
    homogeneous fixed-width numeric arrays

Use DataView
    mixed binary layouts
    byte offsets
    explicit endianness
    file or network protocol parsing
```

---

# Coverage

```text
unique embedded screenshots: 52
image uses: 53
native SVG labels: 8
duplicate extra placements: 1

processed image uses: 53
processed text labels: 8
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
