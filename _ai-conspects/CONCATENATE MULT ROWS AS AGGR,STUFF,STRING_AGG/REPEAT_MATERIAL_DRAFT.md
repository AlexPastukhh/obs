# Repeat material — row concatenation

```text
Legacy:
inner correlated query
-> prepend delimiter
-> FOR XML PATH(''), TYPE
-> .value('.', 'nvarchar(max)')
-> STUFF(..., 1, 2, '')

Modern:
STRING_AGG(name, ', ')
```

Key signature:

```sql
STUFF(character_expression, start, length, replaceWith_expression)
```
