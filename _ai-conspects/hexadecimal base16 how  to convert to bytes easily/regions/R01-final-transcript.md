# Hexadecimal/base-16 and easy conversion to bytes

Source conspect: `hexadecimal base16 how  to convert to bytes easily.svg`  
Generated: 2026-06-22 00:00:00 UTC

## 0.1 Area overview / reading quality

This compact sheet contains 15 image placements and 1 canvas text labels. The main concepts and code examples were visually reviewed as one coherent area. Exact code punctuation remains preserved in `source/images/` and the original SVG.

## Verified transcript

### Positional bases and hexadecimal notation

A number is a quantity; decimal, hexadecimal and binary are different written representations of the same value. Decimal uses place values that are powers of 10. Hexadecimal uses powers of 16 and the digits `0-9` plus `A-F`, where `A=10` through `F=15`. The `0x` prefix marks a hexadecimal integer in C#, C/C++ and many other languages.

### Why hexadecimal maps cleanly to bytes

One hexadecimal digit represents exactly four bits because 16 possible digit values fit in `2^4`. A byte is eight bits, so one byte is written as exactly two hexadecimal digits. This makes hexadecimal compact and easy to align with memory, binary files, colors, networking and protocol fields.

### Conversion method

Convert each hex digit independently to a four-bit nibble, then concatenate the nibbles. For example, `0x41` is `0100 0001`, which is decimal 65 and ASCII `A`. The reverse operation groups binary digits into sets of four from the right and maps each nibble to one hex digit.

### Literal examples and practical use

The same integer can be written as decimal `42`, hexadecimal `0x2A`, or binary `0b101010`. Byte arrays often use hexadecimal because boundaries are visible: each pair of digits is one byte. The conspect also illustrates an ASCII byte and explains why hex notation is common in byte-level code.

## Evidence map

Image placements: `S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008, S-009, S-010, S-011, S-012, S-013, S-014, S-015`

Canvas labels: `T-001`

Detailed coordinates and hashes are stored in `data/image-uses.*`, `data/text-labels.*`, and the review ledgers.

## Final coverage

```text
image uses processed: 15
text labels processed: 1
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```