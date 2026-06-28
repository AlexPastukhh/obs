# Regional transcript — R02: XOR properties, cancellation and hashing

Conspect: `xor operator`  
Generated: 2026-06-28 03:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 4 / 4
unique screenshots represented: 4
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

XOR is self-cancelling, commutative and associative. These properties make it useful for parity and duplicate-pair puzzles, but a weak general-purpose hash combiner.

## Algebraic properties

- `x ^ x = 0`.
- `x ^ 0 = x`.
- `a ^ b = b ^ a`.
- `(a ^ b) ^ c = a ^ (b ^ c)`.
- The order of terms does not affect the result.

## Cancellation

- A value appearing an even number of times cancels completely.
- A value appearing an odd number of times contributes one remaining copy.
- This supports the classic problem where every integer appears twice except one.

## Parity

- XOR can accumulate parity because each repeated bit flips the parity state.
- Simple checksums can use XOR for basic error detection.
- It cannot detect every multi-bit error and is not a cryptographic integrity check.

## Order-independent hashing

- XOR-ing element hash codes gives the same result regardless of element order.
- Duplicate pairs cancel, which can resemble set semantics.
- Collisions are easy: many different sets produce the same XOR.
- If duplicate counts matter, XOR is especially unsuitable because even multiplicities disappear.

## Safe use

- Use XOR as one component only when its cancellation semantics are deliberate.
- For an unordered collection hash, combine count and stronger mixed accumulators or use a tested framework strategy.
- Normalize collection semantics before hashing.

## Caveats

- A commutative combiner sacrifices ordering information by design.
- Hash equality never proves collection equality.

## Covered source units

### Text elements

```text
T-001
```

### Screenshot uses

```text
IU-001, IU-002, IU-003, IU-004
```

Exact code and original wording remain available in the SVG and closed ledgers.
