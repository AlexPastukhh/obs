# Full source-preserving transcript v002 — Hexadecimal base16

Generated: 2026-07-04 UTC

```text
unique embedded screenshots: 14
image uses: 15
native SVG text lines: 1
source coverage: 14 / 14
transcript mode: near-literal normalized
```

Exact typography and version-sensitive punctuation remain authoritative in the preserved SVG and screenshots.

## S-001 — Одна hex-цифра равна четырём битам

```text
source_id: S-001
image_hash: a1143dcb5055
placements: 2
transcript_mode: near-literal normalized
```

### Видимый текст

Hex ↔ binary mapping:

```text
0 0000   1 0001   2 0010   3 0011
4 0100   5 0101   6 0110   7 0111
8 1000   9 1001   A 1010   B 1011
C 1100   D 1101   E 1110   F 1111
```

Одна hex-цифра соответствует ровно четырём binary bits.

### Вопросы

1. Какому nibble соответствует A?
2. Какому hex-символу соответствует 1111?

---

## S-002 — Префикс `0x`

```text
source_id: S-002
image_hash: d8912ccd3555
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

`0x...` означает hexadecimal literal (base 16). `0x10` не означает «zero times something». В JS, C, C++ и многих языках это стандартный prefix.

### Вопросы

1. Что означает 0x10?
2. Чему оно равно в decimal?

---

## S-003 — Что такое hexadecimal

```text
source_id: S-003
image_hash: 3f0b0e0fd987
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Hexadecimal — base 16.

Decimal digits:

```text
0 1 2 3 4 5 6 7 8 9
```

Hex digits:

```text
0 1 2 3 4 5 6 7 8 9 A B C D E F
```

```text
A=10 B=11 C=12 D=13 E=14 F=15
```

### Вопросы

1. Сколько symbols использует hex?
2. Почему появляются A–F?

---

## S-004 — Таблица делает перевод механическим

```text
source_id: S-004
image_hash: 043a22edca86
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Если знать таблицу одной hex-цифры, перевод hex ↔ binary становится простым: каждую цифру переводят отдельно в 4 bits.

### Вопросы

1. Нужно ли сначала переводить всё число в decimal?
2. Как обрабатывается каждая позиция?

---

## S-005 — Почему именно четыре бита

```text
source_id: S-005
image_hash: f4785158919e
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

4 bits дают `2^4 = 16` комбинаций. Hex имеет 16 digits `0..F`. Поэтому одна hex digit идеально помещается в 4 bits.

### Вопросы

1. Сколько комбинаций дают 4 bits?
2. Как называется группа 4 bits?

---

## S-006 — Почему программисты используют hex

```text
source_id: S-006
image_hash: 1da6318dd74d
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Каждая hex digit точно соответствует 4 bits.

```text
A = 1010
F = 1111
2 = 0010

0xAF = 10101111
```

Две hex digits составляют один byte.

### Вопросы

1. Сколько hex digits в byte?
2. Переведите 0xAF.

---

## S-007 — Как `0x41` maps to binary

```text
source_id: S-007
image_hash: d78f9450be54
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Берём digits отдельно:

```text
4 -> 0100
1 -> 0001

0x41 = 01000001
```

ASCII/UTF-8 byte `A` часто показывают как decimal 65, hex 0x41, binary 01000001.

### Вопросы

1. Почему сохраняются leading zeros?
2. Какой символ имеет code 65?

---

## S-008 — Где используется hex

```text
source_id: S-008
image_hash: b836985661e1
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Hex постоянно используется для:

- bytes;
- bit patterns;
- memory dumps;
- colors;
- binary protocols.

### Вопросы

1. Почему hex компактнее binary?
2. Как это связано с bytes?

---

## S-009 — Почему `0x41` показывают для `A`

```text
source_id: S-009
image_hash: 7794e893d332
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Один value в разных notations:

```text
decimal: 65
hex:     0x41
binary:  01000001
```

Это один и тот же byte.

### Вопросы

1. Меняется ли value при смене notation?
2. Что представляет binary запись?

---

## S-010 — Почему decimal 65 равно hex 0x41

```text
source_id: S-010
image_hash: babdf7eac432
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

```text
0x41 = 4 * 16 + 1
     = 64 + 1
     = 65
```

### Вопросы

1. Каков вес правой позиции?
2. Переведите 0x2A.

---

## S-011 — Hex в byte examples

```text
source_id: S-011
image_hash: a23bd6d98c3f
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

UTF-8 bytes часто показывают как:

```text
0xC3 0xA9
```

Это короче, чем:

```text
11000011 10101001
```

Например, `é` в UTF-8 обычно состоит из этих двух bytes.

### Вопросы

1. Сколько bytes показано?
2. Переведите 0xC3 в binary.

---

## S-012 — Same number, different bases

```text
source_id: S-012
image_hash: 15e39b339b9f
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Decimal 65:

```text
65 = 6 * 10 + 5
```

Hex 0x41:

```text
0x41 = 4 * 16 + 1
```

Обе записи выражают одинаковое quantity.

### Вопросы

1. Что означает base?
2. Почему используются powers 10 и 16?

---

## S-013 — Префиксы `0b`, `0o`, `0x`

```text
source_id: S-013
image_hash: 4d98b9853562
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

В JavaScript:

- `0x` — hex/base 16;
- `0b` — binary/base 2;
- `0o` — octal/base 8.

```javascript
0b1010 // 10
0o12   // 10
0xA    // 10
10     // decimal 10
```

### Вопросы

1. Что означает 0o12?
2. Какая запись binary?

---

## S-014 — Place value

```text
source_id: S-014
image_hash: 65ecc7c59e94
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Value digit зависит от position.

```text
ones     = 10^0 = 1
tens     = 10^1 = 10
hundreds = 10^2 = 100

65 = 6*10 + 5*1
```

Последняя digit находится в ones place и даёт `5 * 1`.

### Вопросы

1. Почему справа exponent 0?
2. Разложите 327.
