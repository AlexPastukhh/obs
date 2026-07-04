# Concatenate multiple rows — `STUFF`, `FOR XML PATH`, `STRING_AGG`

Generated: 2026-07-04 UTC

```text
unique screenshots: 4
image uses: 4
native text elements: 7
logical source groups: 4
remaining source work: 0
```

## S-001 — Legacy XML PATH + STUFF aggregation

The older pre-SQL Server 2017 pattern concatenates rows with `FOR XML PATH` and removes the leading delimiter with `STUFF`.

```sql
SELECT dept_id,
       STUFF((
           SELECT ', ' + name
           FROM employees x
           WHERE x.dept_id = e.dept_id
           FOR XML PATH(''), TYPE
       ).value('.', 'nvarchar(max)'), 1, 2, '') AS names
FROM employees e
GROUP BY e.dept_id;
```

Flow:

1. the correlated inner query selects employees from the current department;
2. `', ' + name` prepends a delimiter to every value;
3. `FOR XML PATH(''), TYPE` concatenates rows into one XML value;
4. `.value('.', 'nvarchar(max)')` extracts the text;
5. `STUFF(..., 1, 2, '')` removes the first comma and space.

## S-002 — Why `.value('.', 'nvarchar(max)')` is used

Using:

```sql
.value('.', 'nvarchar(max)')
```

extracts the text content from the typed XML and decodes XML entities.

For example, encoded `&amp;` becomes `&`.

The dot means the current XML context node.

## S-003 — `STUFF` signature and parameters

Signature:

```sql
STUFF(character_expression, start, length, replaceWith_expression)
```

Parameters:

- `character_expression`: source string;
- `start`: 1-based position where deletion/insertion begins;
- `length`: number of characters to remove; use 0 to insert without deleting;
- `replaceWith_expression`: string inserted at the start position.

In the aggregation pattern:

```sql
STUFF(..., 1, 2, '')
```

removes the initial `", "`.

## S-004 — Modern `STRING_AGG` form

SQL Server 2017 and newer:

```sql
SELECT dept_id,
       STRING_AGG(name, ', ') AS names
FROM employees
GROUP BY dept_id;
```

`STRING_AGG` directly aggregates values using the supplied separator. It is clearer than the XML workaround and should normally be preferred when available.


# Canvas text

```text
old way of getting rows concatenated pre-SQL Server 2017
all selected rows are parsed as XML
then we get inner text
`.` is needed because it selects the current XML node
STUFF
new way
```

# Comparison

```text
Old:
FOR XML PATH + TYPE + .value + STUFF

New:
STRING_AGG(value, separator)
```
