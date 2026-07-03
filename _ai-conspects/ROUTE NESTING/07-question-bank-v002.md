# Route nesting — question bank v002

## Identity and uniqueness

1. When is a parent key required for child identity?
2. What is a locally unique child key?
3. What is a composite resource key?
4. Does a globally unique GUID eliminate every reason to nest?
5. What does global uniqueness solve?
6. What does it not solve?
7. How can a child key be hidden from the public API?
8. When can several parents reuse the same local child key?
9. Which route identifies such a child?
10. How do route constraints help?

## Aggregate boundary

11. What is an aggregate root?
12. What makes a course a true child?
13. Which parent invariant can govern creation?
14. How does cascade deletion affect route design?
15. Why can a globally unique child still be nested?
16. Which commands belong under the aggregate root?
17. Can a top-level read coexist with nested commands?
18. Does a convenience read change ownership?

## Authorization and tenancy

19. What scope does authorId communicate?
20. Why does the route not enforce authorization?
21. What should a parent-scoped repository query contain?
22. Why is load-by-courseId then compare riskier?
23. How can cross-tenant existence leak?
24. When does 404 reduce leakage?
25. When may 403 be correct?
26. What should logs record internally?
27. Why must the policy be consistent?
28. How should policies/claims use parent IDs?

## When not to nest

29. What signs show the child is independent?
30. Why is PATCH often top-level for an aggregate root?
31. Why does reparenting make a nested canonical URI unstable?
32. Why does co-ownership create multiple valid URLs?
33. How can a relationship resource solve that?
34. What is a stable canonical URI?
35. Can nested collection routes remain useful?
36. What is redundant about authorId plus global courseId?
37. When is the redundancy still valuable?

## Canonical URI and links

38. Why select one canonical URI?
39. Which response header uses it after creation?
40. How does CreatedAtRoute depend on route names?
41. What is a scoped view?
42. What is an alias route?
43. How should documentation present aliases?
44. Why can two route families confuse clients?
45. What makes them safe to support together?

## Query versus nested path

46. What does `/courses?authorId=123` express?
47. What does `/authors/123/courses` express?
48. Which is better for global filtering?
49. Which foregrounds parent containment?
50. Can both return the same data?
51. What semantic distinction should remain?
52. Why is the choice domain-driven rather than a universal REST rule?

## Scenarios and coding

53. Design routes for a globally unique independent Course.
54. Design routes for a Course that cannot exist without Author.
55. Write a parent-scoped repository query.
56. Return 404 for a wrong-parent course.
57. Return 403 under an existence-revealing policy.
58. Use CreatedAtRoute for the top-level canonical URI.
59. Use CreatedAtRoute for a true nested child.
60. Add a top-level convenience lookup to a nested lifecycle model.
61. Model course reassignment.
62. Model many-to-many course ownership.
63. Test that nested routes cannot cross tenant scope.
64. Test that pagination links keep the parent context.
65. Test canonical Location after creation.
66. Refactor a three-level route to remove unnecessary depth.
67. Decide whether `/authors/{a}/courses/{c}` is identity or a scoped view.
68. Explain 404/403 choice to a security reviewer.
69. Explain canonical URI choice to a client team.
70. Derive routes from explicit domain invariants.
