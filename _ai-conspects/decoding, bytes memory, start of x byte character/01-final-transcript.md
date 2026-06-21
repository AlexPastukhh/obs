# Final transcript — decoding, bytes memory, start of x byte character

## 0.1 Area overview / reading quality

This conspect builds a mental model for UTF-8 decoding from raw bytes. It separates three ideas that are often mixed together:

1. the mathematical value being represented;
2. the number of bytes chosen by a storage format;
3. the bit patterns UTF-8 uses so a decoder can identify character boundaries and sequence length.

Reading quality is high. Binary examples and diagrams are preserved as images for exact bit-level reference.

## 1. Mathematical value versus storage width

A value may mathematically fit in fewer bits than the storage type used to hold it. For example, a small integer can be stored in an 8-bit, 16-bit, or 32-bit integer type. The numeric value does not change; only the storage width changes.

This distinction matters when reasoning about bytes in memory. “The value needs N bits” and “the chosen type occupies M bytes” are different statements.

## 2. UTF-8 is variable length

UTF-8 does not assign the same number of bytes to every character:

- ASCII-range code points use one byte;
- other characters may use two, three, or four bytes.

Therefore a decoder cannot simply read a fixed number of bytes per character. It must inspect the first byte and determine how many bytes belong to the current sequence.

## 3. Self-describing byte prefixes

UTF-8 reserves recognizable prefixes:

```text
0xxxxxxx   one-byte ASCII character
110xxxxx   start of a two-byte sequence
1110xxxx   start of a three-byte sequence
11110xxx   start of a four-byte sequence
10xxxxxx   continuation byte
```

The first byte is a leading byte. Its prefix tells the decoder the total sequence length. Continuation bytes always begin with `10`, which prevents them from being mistaken for a new character start.

This is why the scheme can find boundaries quickly: start-byte prefixes and continuation-byte prefixes do not conflict.

## 4. Why the prefixes look “wasteful”

Some high bits are spent on structural markers rather than payload. That is deliberate. The markers make the encoding self-synchronizing and allow a decoder to identify sequence length and continuation bytes without external metadata.

The tradeoff is fewer payload bits per byte in multi-byte sequences, but the benefit is reliable decoding and boundary detection.

## 5. One-byte example

For a plain ASCII letter such as `A`, UTF-8 uses one byte. The first bit is `0`, so the decoder immediately knows the character occupies one byte. The remaining seven bits carry the code point value.

## 6. Two-byte example

A character outside the ASCII range may use two bytes:

```text
110xxxxx 10xxxxxx
```

The decoder:

1. sees `110` and knows the sequence length is two bytes;
2. verifies that the next byte begins with `10`;
3. removes the structural prefix bits;
4. joins the remaining payload bits;
5. reconstructs the code point.

Three- and four-byte sequences follow the same principle with longer leading prefixes.

## 7. Final takeaway

Do not decode UTF-8 by guessing character width from the numeric size alone. Read the leading byte, derive the sequence length from its prefix, verify continuation bytes, then combine payload bits. The format uses non-conflicting start and continuation patterns so decoding can be fast and unambiguous.