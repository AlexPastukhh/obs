# Data Shaping and ExpandoObject — question bank v002

## Contract

1. What is data shaping?
2. What does `fields=id,name` mean?
3. Why must fields refer to DTO properties?
4. How does shaping reduce over-fetching?
5. How can it support multiple client views?
6. Why must pagination links preserve fields?
7. Is fields filtering rows or shaping columns in the response?
8. What should blank fields mean?
9. Should unknown fields be ignored or rejected?
10. What status should an invalid fields list produce?

## Parameters and validation

11. Why put Fields in AuthorsResourceParameters?
12. What does MaxPageSize protect?
13. Why use an interface for the property checker?
14. What does TypeHasProperties return for blank fields?
15. Why use RemoveEmptyEntries?
16. Why use TrimEntries?
17. Why use IgnoreCase?
18. Why use Public and Instance BindingFlags?
19. What happens when GetProperty returns null?
20. Why validate before shaping?
21. Why keep a defensive check inside ShapeData too?
22. What error is avoided by early validation?
23. How would duplicate field names be handled?
24. How would aliases be supported?
25. How would nested field syntax change validation?

## Collection shaping

26. What does the collection extension return?
27. Why collect PropertyInfo once before iterating items?
28. What happens when fields is blank?
29. Why create one ExpandoObject per source item?
30. How are property names added?
31. How are values read?
32. Why cast to IDictionary?
33. Is the cast a copy?
34. What is the complexity relative to items and selected fields?
35. Where could PropertyInfo caching help?

## Single shaping

36. Why have a separate single-object extension?
37. What does it return?
38. Why not wrap one DTO in a collection?
39. What null checks are needed?
40. How should a missing requested property be reported internally?
41. What happens when fields is empty?
42. How does the JSON shape differ from a strongly typed DTO?

## Controller flow

43. List the controller steps in order.
44. Why validate before repository work?
45. Why map before shaping?
46. Why is IActionResult suitable?
47. What results besides 200 can be returned?
48. How does ProblemDetails improve invalid-field errors?
49. Why must collection and single endpoints follow the same policy?
50. Where should DI registration occur?
51. What service lifetime is suitable for a stateless checker?
52. How should fields be preserved in links?

## ExpandoObject

53. What is ExpandoObject?
54. Which dictionary interface does it implement?
55. Why does the dictionary cast not copy?
56. How can dynamic syntax be used?
57. How does JSON serialization usually treat ExpandoObject?
58. Can Dictionary<string,object?> be returned instead?
59. What semantic intent does ExpandoObject communicate?
60. Why are anonymous types not runtime-field friendly?
61. When are anonymous types appropriate?
62. Why is performance similarity not a guaranteed conclusion?
63. What should be benchmarked?

## Safety and constraints

64. Does `where T : class` enforce DTO-only usage?
65. What does it actually exclude?
66. How does a marker interface help?
67. What is the simplest safe alternative to a generic constraint?
68. Why must entities not be exposed directly?
69. How can reflection accidentally leak internal properties?
70. How would you implement a whitelist mapping?

## Projection

71. Define database projection.
72. Define representation shaping.
73. Why are they related but different?
74. Why is a computed Name field hard to map by column name?
75. Why can links/flags not be projected from one DB column?
76. Why can sorting mappings not be reused unchanged?
77. What does a projection mapping need to store?
78. When is post-mapping shaping preferable?
79. When is DB projection preferable?
80. Why are predefined list/detail DTOs often a good compromise?
81. What is dynamic LINQ doing in this problem?
82. What validation is still required after dynamic projection?
83. Why can premature projection add complexity without benefit?
84. Which DB/query costs may dominate a few extra columns?

## Scenarios and coding

85. Client requests `fields=id,doesNotExist`. Design the response.
86. Client requests only `name`; Name is computed from two columns. Where should computation occur?
87. A DTO contains a link property not stored in DB. Explain projection implications.
88. A client requests `fields=Id,id`. Define a duplicate policy.
89. Add a case-insensitive alias `category -> MainCategory`.
90. Add a whitelist that prevents entity navigation-property exposure.
91. Implement a PropertyInfo cache keyed by type and normalized field list.
92. Write a unit test for blank fields.
93. Write a unit test for unknown fields.
94. Write a unit test for case-insensitive fields.
95. Write a unit test for collection output keys.
96. Write a unit test for single-object output keys.
97. Test that pagination links preserve fields.
98. Compare ExpandoObject and Dictionary JSON output.
99. Benchmark post-mapping shaping versus DB projection.
100. Explain the design to an API consumer without mentioning reflection.
