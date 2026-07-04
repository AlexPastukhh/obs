# Questions — `STUFF`, `FOR XML PATH`, `STRING_AGG`

1. What problem does this conspect solve?
2. Why does the legacy query prepend `', '` to every employee name?
3. What does the correlated `WHERE x.dept_id = e.dept_id` do?
4. What does `FOR XML PATH('')` do in this pattern?
5. Why is `TYPE` used?
6. What does `.value('.', 'nvarchar(max)')` return?
7. What does the dot in `.value('.')` refer to?
8. Why does `.value` matter for XML entities such as `&amp;`?
9. What is the signature of `STUFF`?
10. Is `start` zero-based or one-based?
11. What does `STUFF(..., 1, 2, '')` remove?
12. How can `STUFF` insert without deleting?
13. Write the complete legacy grouped-concatenation query.
14. Write the equivalent `STRING_AGG` query.
15. Which SQL Server versions support `STRING_AGG`?
16. Why is `STRING_AGG` normally preferred?
17. What happens if a group contains null values?
18. How would you impose ordering on the aggregated values?
19. Why is an outer `GROUP BY dept_id` used?
20. Explain the full legacy pipeline from rows to final string.
