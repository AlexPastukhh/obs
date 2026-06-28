# Regional transcript — R01: XOR basics, truth table and toggling

Conspect: `xor operator`  
Generated: 2026-06-28 03:00:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 6 / 6
unique screenshots represented: 6
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Exclusive OR is true when exactly one boolean operand is true. For integers, bitwise XOR applies that rule independently to every bit position.

## Boolean XOR

- False XOR false is false.
- False XOR true and true XOR false are true.
- True XOR true is false.
- This is the 'either, but not both' relation.

## Integer XOR

- Each corresponding bit is compared independently.
- Equal bits produce 0; different bits produce 1.
- For example, binary `0101 XOR 0011` produces `0110`.

## Compound assignment

- `x ^= mask` is equivalent to `x = x ^ mask` after normal assignment conversions.
- For booleans in languages that support it, XOR remains logical exclusive-or without short-circuiting.
- For integers, the result type and signed behavior follow the language's bitwise rules.

## Toggling flags

- XOR with a mask flips every bit set in the mask.
- Applying the same mask twice restores the original value.
- Use named flags and explicit intent rather than unexplained numeric masks.

## Caveats

- XOR is not exponentiation.
- The historical XOR-swap trick is less readable and unnecessary in modern code.

## Covered source units

### Text elements

```text
(none; this region is screenshot-only)
```

### Screenshot uses

```text
IU-012, IU-013, IU-014, IU-015, IU-016, IU-017
```

Exact code and original wording remain available in the SVG and closed ledgers.
