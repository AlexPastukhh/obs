# Regional transcript — R04: SARGability and applying COLLATE without losing indexes

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

The most reliable way to keep case-insensitive queries index-friendly is to store and index the column under the intended collation. Per-query conversions should be reserved for exceptions.

## Preferred schema

- Define the column with a CI collation when most searches are case-insensitive.
- Create an index on that column.
- Use direct equality or prefix predicates.
- This keeps the indexed expression identical to the search expression.

## Exceptional collation

- Applying `COLLATE` to the column creates an expression that may not match the existing index order.
- Applying the intended collation to a parameter can sometimes avoid transforming the column, but collation precedence and conversion rules must be verified.
- For recurring alternate semantics, create a persisted computed column with the alternate collation and index it.

## Normalized key

- A separate normalized search key is useful when business normalization goes beyond collation.
- Generate it consistently and enforce uniqueness where required.

## Representative pattern

```sql
ALTER TABLE Users
ADD UserName_CI AS
    (UserName COLLATE Latin1_General_100_CI_AS) PERSISTED;

CREATE INDEX IX_Users_UserName_CI
ON Users(UserName_CI);

SELECT *
FROM Users
WHERE UserName_CI = @UserName;
```

## Caveats

- Computed-column index eligibility depends on determinism and database settings.
- Unicode, accent and locale rules require domain-specific tests.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-007, IU-008, IU-009
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
