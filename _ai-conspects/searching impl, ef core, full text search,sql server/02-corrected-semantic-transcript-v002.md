# Corrected semantic transcript — searching impl, EF Core, full-text search and SQL Server v002

Authoritative source: `source/searching impl, ef core, full text search,sql server.svg`  
Coverage: **89 unique screenshots / 90 placements + 73 native SVG labels**

The previous transcript used only canvas text. This version incorporates the complete recovered implementation and index diagrams.

## 1. EF Core substring search

LINQ `Contains` is usually translated to substring matching, conceptually:

```sql
WHERE Name LIKE '%' + @term + '%'
```

It is not SQL Server full-text `CONTAINS`.

Substring search is reasonable for small/admin screens, low-volume endpoints or when exact substring semantics are required.

## 2. Prefix versus leading wildcard

A normal B-tree index can often help:

```sql
WHERE Name LIKE 'phone%'
```

because values are ordered by the whole column and the engine can seek to a prefix.

This is usually harder:

```sql
WHERE Name LIKE '%phone%'
```

because the text may occur anywhere.

## 3. Escaping LIKE patterns

User input can contain `%`, `_`, `[` or the chosen escape character.

```csharp
static string EscapeLikePattern(string value) =>
    value
        .Replace("!", "!!")
        .Replace("%", "!%")
        .Replace("_", "!_")
        .Replace("[", "![");
```

```csharp
var escaped = EscapeLikePattern(term);
var pattern = $"%{escaped}%";

query = query.Where(product =>
    EF.Functions.Like(product.Name, pattern, "!"));
```

Conceptual SQL:

```sql
WHERE Name LIKE @pattern ESCAPE '!'
```

## 4. Collation and case sensitivity

Case sensitivity depends on provider and collation.

```text
SQL_Latin1_General_CP1_CI_AS -> case-insensitive
SQL_Latin1_General_CP1_CS_AS -> case-sensitive
```

Avoid `ToLower()` on the indexed column unless its index consequences are understood. Prefer the correct collation, provider operation or an indexed normalized column.

## 5. Basic search endpoint

```csharp
var query = context.Products.AsNoTracking();

if (!string.IsNullOrWhiteSpace(request.Query))
{
    var escaped = EscapeLikePattern(request.Query.Trim());
    var pattern = $"%{escaped}%";

    query = query.Where(product =>
        EF.Functions.Like(product.Name, pattern, "!") ||
        EF.Functions.Like(product.Description, pattern, "!") ||
        EF.Functions.Like(product.Sku, pattern, "!"));
}

if (!string.IsNullOrWhiteSpace(request.Category))
{
    query = query.Where(
        product => product.Category == request.Category);
}

var items = await query
    .OrderBy(product => product.Name)
    .Skip((request.Page - 1) * request.PageSize)
    .Take(request.PageSize)
    .Select(product => new ProductSearchItem(
        product.Id,
        product.Name,
        product.Sku,
        product.Price))
    .ToListAsync();
```

Apply selective tenant/category filters before a broad substring predicate where possible.

## 6. SQL Server full-text setup

```sql
CREATE FULLTEXT CATALOG ProductCatalog AS DEFAULT;
```

```sql
CREATE FULLTEXT INDEX ON dbo.Products
(
    Name        LANGUAGE 1033,
    Description LANGUAGE 1033
)
KEY INDEX PK_Products
ON ProductCatalog;
```

The catalog is a logical container. The full-text index can cover several text columns and uses language-specific tokenization, stemming and stopword rules.

## 7. Unique row locator

`KEY INDEX PK_Products` identifies the unique base-table row represented by a full-text match.

Conceptually:

```text
wireless -> row keys 1, 2
keyboard -> row keys 1, 3
```

The key is not searched as text and is not the rank. It links each token occurrence back to exactly one row, so it must be unique and suitable as a row locator.

## 8. Inverted-index model

A normal index is ordered by complete column values:

```text
Gaming Keyboard   -> row 31
Wireless Keyboard -> row 55
```

A full-text index is organized by tokens:

```text
wireless -> rows 1, 2
keyboard -> rows 1, 3
gaming   -> row 2
```

It may additionally store token positions, language information and data needed for phrase/proximity/ranking behavior.

## 9. CONTAINS

`CONTAINS` is precise structured full-text search:

```sql
WHERE CONTAINS(Name, '"wireless"')
```

```sql
WHERE CONTAINS(
    (Name, Description),
    '"keyboard" AND "wireless"')
```

```sql
WHERE CONTAINS(
    Description,
    'NEAR((wireless, keyboard), 5)')
```

It supports controlled expressions such as exact words/phrases, Boolean operators, prefix terms, proximity, weighted terms and inflectional forms.

A prefix expression such as `"word*"` means token prefix, not arbitrary substring:

```text
"word*" may match wording / words / wordpad
"board" does not normally match token "keyboard"
```

## 10. FREETEXT

`FREETEXT` is natural-language meaning-oriented search:

```sql
WHERE FREETEXT(
    (Name, Description),
    'comfortable wireless keyboard for gaming')
```

It is broader and less exact than a structured `CONTAINS` expression.

```text
CONTAINS -> exact controlled search expression
FREETEXT -> natural-language linguistic matching
```

## 11. Ranking

`CONTAINSTABLE` and `FREETEXTTABLE` return:

```text
KEY
RANK
```

```sql
SELECT p.Id, p.Name, ft.[RANK]
FROM dbo.Products AS p
JOIN CONTAINSTABLE(
    dbo.Products,
    (Name, Description),
    @search
) AS ft
  ON p.Id = ft.[KEY]
ORDER BY ft.[RANK] DESC;
```

In EF Core, a keyless result type plus parameterized raw SQL is a practical approach for ranked table-valued full-text queries.

## 12. Full-text is not general substring search

```text
LIKE '%board%' may match "keyboard"
CONTAINS(Name, '"board"') normally does not match "keyboard"
```

Full-text is token/word/phrase/prefix-token/proximity search.

For serious middle-of-string requirements consider provider-specific n-gram/trigram indexing, normalized search tables or a dedicated search engine.

## 13. Search-service abstraction

```csharp
public interface IProductSearchService
{
    Task<PagedResult<ProductSearchResultDto>> SearchAsync(
        ProductSearchRequest request,
        CancellationToken cancellationToken = default);
}
```

Possible implementations:

```text
EfProductSearchService
SqlFullTextProductSearchService
ElasticProductSearchService
AzureSearchProductSearchService
OpenSearchProductSearchService
```

This keeps API/controller code independent from the current search backend.

## 14. Dedicated search engine

Use Azure AI Search, Elasticsearch, OpenSearch, Meilisearch or another dedicated system when requirements include:

```text
strong relevance
typo tolerance
autocomplete
facets
highlighting
synonyms
semantic/vector search
large scale
```

Typical architecture:

```text
SQL remains source of truth
outbox/event/background job updates search index
API queries search service
result IDs/metadata return to frontend
```

## 15. Decision guide

```text
basic filtering/admin screen
    EF Core predicates and LIKE

small exact substring need
    escaped LIKE after selective filters

database word search/ranking
    SQL Server full-text

advanced relevance/UX/scale
    dedicated search engine
```

## Coverage

```text
unique screenshots: 89
image uses: 90
native labels: 73
duplicate extra placements: 1
remaining image/text items: 0
```
