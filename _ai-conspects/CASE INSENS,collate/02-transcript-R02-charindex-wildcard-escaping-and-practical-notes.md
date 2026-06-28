# Regional transcript — R02: CHARINDEX wildcard escaping and practical notes

Conspect: `CASE INSENS,collate`  
Generated: 2026-06-28 14:30:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 3 / 3
unique screenshots represented: 3
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`CHARINDEX` searches for a literal substring. Unlike `LIKE`, percent and underscore do not act as wildcards inside the search expression.

## CHARINDEX

- Returns a one-based position when found.
- Returns zero when the substring is absent.
- An optional start position controls where searching begins.
- Case sensitivity follows collation.

## LIKE wildcards

- `%` matches any sequence and `_` matches one character.
- Use an `ESCAPE` character or bracket syntax when user text should be literal.
- Escape the escape character itself before escaping `%` and `_`.

## Practical choice

- Use CHARINDEX for simple contains semantics.
- Use LIKE for prefix, suffix or wildcard patterns.
- Neither leading-wildcard LIKE nor arbitrary CHARINDEX searches are normally index-seek friendly.

## Representative pattern

```sql
-- Literal substring:
WHERE CHARINDEX(@search, DisplayName) > 0;

-- Literal LIKE text with ! as escape:
WHERE DisplayName LIKE '%' + @escaped + '%' ESCAPE '!';
```

## Caveats

- Empty search strings have special behavior; define the product rule explicitly.
- Full-text search can be more appropriate for linguistic word search.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-004, IU-005, IU-006
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
