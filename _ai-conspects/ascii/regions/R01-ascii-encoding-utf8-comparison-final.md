# R01 — ASCII and its relationship to UTF-8 final coverage transcript v001

Conspect: `ascii`  
Source: `ascii.svg`  
Stage: **stage-1 verified final coverage**

## 0. Area overview / key ideas / reading quality

ASCII is a 7-bit character set with 128 codes. UTF-8 preserves those first 128 values but supports the full Unicode range.

Reading quality: verified. The whole sheet is a single coherent region; all 10 image uses and 2 SVG text labels were reviewed against preserved source evidence.

## 1. What ASCII represents

ASCII means **American Standard Code for Information Interchange**. It maps characters to numeric values. Common examples are:

```text
'A' = 65
'B' = 66
'a' = 97
'0' = 48
space = 32
```

Original ASCII is 7-bit and therefore defines 128 values (`0`–`127`). Values `0`–`31` and `127` are control codes; `32`–`126` are printable characters. Examples of controls include line feed (`10`), carriage return (`13`), and tab (`9`).

## 2. ASCII in C#

A `char` containing an ASCII character can be converted to its integer code and back:

```csharp
char ch = 'A';
int code = ch;       // 65
char again = (char)65;
```

This works because .NET `char` stores a UTF-16 code unit, and the ASCII range uses the same Unicode scalar values.

## 3. Relationship to UTF-8

UTF-8 encodes Unicode. For code points `U+0000` through `U+007F`, UTF-8 uses one byte with exactly the ASCII numeric value. Therefore valid ASCII bytes are also valid UTF-8 bytes and plain English ASCII text looks identical under either encoding.

The distinction appears outside the first 128 values. UTF-8 uses multibyte sequences for other Unicode characters, while ASCII cannot represent them.

## 4. `Encoding.ASCII` versus UTF-8

```csharp
Encoding.ASCII.GetBytes("Alice:secret");
Encoding.UTF8.GetBytes("Alice:secret");
```

For an ASCII-only string these produce the same bytes. For non-ASCII input, UTF-8 preserves the characters while `Encoding.ASCII` uses its replacement fallback and loses information.

Use ASCII only when a protocol or credential format explicitly guarantees the ASCII repertoire. Use UTF-8 for general modern text. Be precise: saying “UTF-8 is ASCII” is incorrect; rather, UTF-8 encodes the ASCII subset with the same single-byte values.

## 6. Coverage

```text
R01 processed image uses: 10
R01 processed text labels: 2
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
