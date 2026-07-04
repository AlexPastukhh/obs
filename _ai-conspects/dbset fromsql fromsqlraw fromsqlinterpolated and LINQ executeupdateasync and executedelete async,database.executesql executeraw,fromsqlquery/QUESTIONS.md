# EF Core SQL APIs - repetition questions

Source: `regions/full-semantic-transcript-v001.md`

## API taxonomy

1. Which APIs are deferred query APIs?
2. Which APIs execute immediately and return affected-row counts?
3. Which APIs perform immediate set-based update or delete?
4. Which workflow waits for `SaveChanges`?
5. When does a `FromSql` query actually execute?
6. Is a previous `ExecuteSqlRawAsync` call waiting for `SaveChanges`?

## Entity and non-entity results

7. Why does `FromSql` start from a `DbSet<TEntity>`?
8. Are entity results tracked by default?
9. Can changes to a tracked entity returned by `FromSql` be saved?
10. Which conditions prevent that update from being saved?
11. What is `Database.SqlQuery<T>` primarily intended for?
12. Can `SqlQuery<T>` return a scalar?
13. Can it return a multi-column DTO?
14. Why is a DTO returned by `SqlQuery<T>` not an automatically updatable entity?
15. When should a keyless entity type be considered?

## Parameterization

16. What happens to interpolated values in EF SQL APIs?
17. Why does parameterization prevent a value from becoming SQL code?
18. What other benefits do `DbParameter` values provide?
19. Why is concatenating user input into a raw SQL string dangerous?
20. Does using a raw API require inlining all values?
21. How can a raw API still use safe parameters?

## Dynamic SQL structure

22. Why can a parameter not represent a column name?
23. Which SQL elements are grammar rather than values?
24. When is `FromSqlRaw` or `SqlQueryRaw` necessary?
25. How should a dynamic column name be validated?
26. How should `ASC` or `DESC` be selected?
27. Why can an arbitrary table name not be trusted?
28. What is the safe pattern for optional SQL fragments plus user values?
29. Why may ordinary LINQ be preferable to dynamic raw SQL?
30. What can `FormattableString` parameterize?
31. Why can it not turn an interpolated `WHERE` clause into SQL grammar?

## Immediate operations and transactions

32. Do multiple `ExecuteSql` calls automatically form one transaction?
33. When is an explicit transaction required?
34. Can tracked changes and immediate commands participate in one transaction?
35. What should be reviewed when mixing these execution models?

## ExecuteUpdate and ExecuteDelete

36. Do these APIs load matching entities?
37. Do they update the change tracker?
38. Do they require `SaveChanges`?
39. What does `SetProperty` describe?
40. Can `SetProperty` call an arbitrary entity method?
41. Why can a tracked entity become stale after `ExecuteUpdateAsync`?
42. What can happen to a tracked entity after `ExecuteDeleteAsync` deletes its row?
43. How can the application restore consistency after set-based DML?

## Domain behavior

44. Which entity behavior is bypassed by set-based DML?
45. When should tracked entities and domain methods be preferred?
46. When is set-based DML a strong fit?
47. Why is "revoke all expired sessions" a good example?
48. Why is "cancel orders, refund, restore stock, and raise events" a poor direct bulk-update example?

## Scenario review

49. A user selects a sort column from an HTTP query string. What must happen before it enters SQL text?
50. A raw SQL statement contains placeholders and separate arguments. Is it necessarily unsafe?
51. An entity loaded by `FromSql` uses `AsNoTracking`. What happens after changing it and calling `SaveChanges`?
52. A `SqlQuery<UserSummary>` result is edited in memory. Why is no update generated?
53. A tracked salary value is old after `ExecuteUpdateAsync`. What should the application do?
54. Two immediate operations must succeed together. What boundary is missing if no transaction exists?
55. A developer uses `FromSql` to call a side-effecting stored procedure. Why is this conceptually misleading?
