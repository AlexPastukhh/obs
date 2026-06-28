# Regional transcript — R02: SQL UNPIVOT syntax and examples

Conspect: `pivot unpivot`  
Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`UNPIVOT` converts several columns into rows, usually producing a name column and a value column.

## Input

- Start with a wide row containing repeated measurement columns.
- Choose columns with compatible data types or cast them to a common type first.

## Syntax

- Apply `UNPIVOT (value_column FOR name_column IN ([col1], [col2], ...))`.
- Each listed source column becomes a row whose name is exposed through the name column.
- Retain identifier columns outside the unpivot operator.

## Null behavior

- SQL Server `UNPIVOT` omits null input values.
- Use `CROSS APPLY (VALUES ...)` when explicit control, mixed types or null preservation is required.

## Caveats

- Unpivoted column names become data and may need normalization.
- Collation conflicts can require explicit collation in metadata/name comparisons.

## Covered source units

### Text elements

```text
T-060
```

### Screenshot uses

```text
IU-001, IU-003
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
