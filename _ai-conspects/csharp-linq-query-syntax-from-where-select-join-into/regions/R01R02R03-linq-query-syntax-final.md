# R01/R02/R03 - C# LINQ query syntax final transcript v001

Conspect: `csharp-linq-query-syntax-from-where-select-join-into`  
File type: **source-preserving final combined region transcript**  
Stage: **stage-1 / verified final coverage transcript v001**  
Generated: 2026-06-13 08:55:00 UTC

---

## Direction check

Goal: convert the LINQ query syntax SVG conspect into AI-readable text while preserving screenshots and handwritten canvas labels.

This pass closes the full sheet: query syntax basics -> `into` and grouping/joining -> left join patterns and `DefaultIfEmpty`.

Coverage:

```text
R01: 12 image uses / 20 text labels
R02: 12 image uses / 16 text labels
R03: 12 image uses / 0 text labels
Total: 36 image uses / 36 text labels
Remaining unclosed: 0
```

---

## 0.1 Area overview / key ideas / reading quality

This sheet explains C# LINQ query expression syntax and how it maps to method syntax. It focuses on `from`, `where`, `select`, `join`, `group join`, `into`, and left join patterns with `DefaultIfEmpty`.

Key ideas:

- Query syntax is compiler sugar over LINQ methods such as `Select`, `Where`, `Join`, `GroupJoin`, `SelectMany`, `GroupBy` and `OrderBy`.
- `from x in source` introduces a range variable. It is mentally close to “start enumerating this source”.
- `where` filters the current range variable.
- `select` projects the current range variable into the final result shape.
- `join ... on ... equals ...` performs an inner join.
- `join ... into ...` creates a grouped result variable, which is commonly needed for group joins and left join patterns.
- Multiple `from` clauses flatten/navigate collections and compile roughly to `SelectMany`-like behavior.
- Left join in query syntax commonly uses `join ... into group` followed by `from item in group.DefaultIfEmpty()`.

Reading quality:

```text
overall: high for mental model and syntax differences
exact code punctuation: medium-high; preserved screenshots remain source of truth
canvas labels: many user reminders are preserved verbatim in text-label tables
coverage: full combined pass; remaining unclosed = 0
```

---

## 1. R01 - query syntax vs method syntax / from-where-select basics

Sources: `S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008, S-009, S-010, S-011, S-012`

R01 establishes why query syntax exists and how it relates to functional/method syntax. The canvas notes say to practice with tasks using both function/method LINQ and query LINQ, and to understand when either syntax is preferable.

Canvas labels closed in R01:

```text
T-001: need to practise, ask for some tasks with func or query linq
T-002: + will need to underst if i can use func or query
T-003: or what is more preferrable mb
T-004: from is like start enumeration - start for loop or some enum callback
T-005: !!!
T-022: into,
T-023: 3 cases,
T-024: select,group
T-025: filtered set to use it as the collection
T-026: into
T-027: method / query
T-028: sytaxes
T-029: we have 2 left join patterns and one of them uses into
T-030: to operate on inner matched result
T-031: with froms we dont need into to operate on matched results/
T-032: setnulls
T-033: AND WE CANT USE INTO WITH FROM
T-034: 2 left join patterns
T-035: when we can use into
T-036: !!!
```

Mental model from R01:

```text
from item in source   = introduce item while enumerating source
where predicate       = filter items
select projection     = choose output shape
```

`from` is not just a keyword; it introduces a range variable for the rest of the query. The handwritten note “from is like start enumeration” is preserved as the primary intuition. Each later clause works with the variable introduced by `from` or by earlier query continuations.

Method syntax equivalent pattern:

```csharp
var q1 = from x in source
         where Predicate(x)
         select Projection(x);

var q2 = source
    .Where(x => Predicate(x))
    .Select(x => Projection(x));
```

Query syntax is often more readable for multiple joins, group joins, left joins and multiple range variables. Method syntax can be clearer for simple pipelines and APIs that do not have direct query-expression keywords.

The R01 labels also mention “method / query syntaxes” and “2 left join patterns”. This sets up R02/R03: the sheet is not only about `from/where/select`; it is about when query syntax makes join continuations and left joins easier to see.

---

## 2. R02 - join, group join, into and grouping

Sources: `S-013, S-014, S-015, S-016, S-017, S-018, S-019, S-020, S-021, S-022, S-023, S-024`

R02 explains `join` and `into`. In a normal inner join, each outer element is paired with matching inner elements. In a group join, `into` captures all matching inner elements into a group variable.

Canvas labels closed in R02:

```text
T-006: like the line
T-007: like you have some var
T-008: that represent
T-009: one element from some source
T-010: but when the source gets
T-011: filtered or smth you may need
T-012: into for clear variable+
T-013: ability to operate the source
T-014: variable
T-015: for group its just
T-016: create group variable
T-017: here we have
T-018: some hidden source
T-019: of matching by id orders
T-020: and o is the one el
T-021: have some hidden source like names
```

The important distinction:

```text
join ... in ... on outerKey equals innerKey
    => inner join result pairs

join ... in ... on outerKey equals innerKey into groupVar
    => group of matching inner items is stored in groupVar
```

The notes say “into” is used when a filtered/joined/grouped set needs to be reused as a new variable. In group joins this creates a group variable. The label “some hidden source of matching by id orders” matches the idea that `into orders` stores the inner matches for a given outer element, not a single item.

Example mental model:

```csharp
var query =
    from c in customers
    join o in orders on c.Id equals o.CustomerId into customerOrders
    select new
    {
        Customer = c,
        Orders = customerOrders
    };
```

Here `customerOrders` is a sequence/group of matched orders for the current customer. It is not the same as `o` in a simple inner join. The sheet's label “for group its just create group variable” is preserved as the shortcut.

`into` can also continue a query after `select` or `group`, allowing the result of an earlier clause to become the new range variable for later clauses.

---

## 3. R03 - left join patterns / DefaultIfEmpty / multiple from

Sources: `S-025, S-026, S-027, S-028, S-029, S-030, S-031, S-032, S-033, S-034, S-035, S-036`

R03 closes the left join and `DefaultIfEmpty` material. The sheet explicitly warns that there are two left join patterns and that one of them uses `into`.

Common left join pattern:

```csharp
var query =
    from c in customers
    join o in orders on c.Id equals o.CustomerId into customerOrders
    from o in customerOrders.DefaultIfEmpty()
    select new
    {
        Customer = c,
        Order = o
    };
```

Meaning:

```text
1. group join stores all matched inner rows in customerOrders
2. DefaultIfEmpty makes empty groups produce one null/default inner row
3. second from flattens the group/default row
4. select can now produce customer + possibly-null order
```

The notes “setnulls” and “DefaultIfEmpty” belong to this: the right/inner side may be null/default when no match exists. Therefore projection must handle nulls.

The sheet also contrasts `into` with multiple `from` clauses. Multiple `from` clauses introduce another range variable and flatten a nested sequence, while `into` creates a continuation/group variable. The handwritten note “AND WE CANT USE INTO WITH FROM” is interpreted as: `into` is not attached to a plain `from` clause; it appears after `join`, `group`, or `select` as query continuation/grouping syntax.

Final mental model:

```text
Use from/where/select for simple filtering/projection.
Use join for inner joins.
Use join ... into when you need grouped matches or a left-join base.
Use from ... DefaultIfEmpty() after group join to flatten left join results.
Use multiple from when flattening nested collections, not when creating a grouped join variable.
```

---

## 4. Evidence / source map

Detailed source rows are preserved in:

```text
data/R01R02R03-sources-stage1-v001.csv
data/R01R02R03-sources-stage1-v001.json
```

Canvas text labels are preserved in:

```text
data/R01R02R03-text-labels-stage1-v001.csv
data/R01R02R03-text-labels-stage1-v001.json
```

Audit images are preserved in:

```text
audit-assets/R01R02R03-source-images/*.png
audit-assets/contact-sheet-R01R02R03-final-coverage-v001.png
```

Final status:

```text
image uses processed: 36
text labels processed: 36
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
