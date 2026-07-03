# Route parameters and query strings — question bank v002

## Fundamentals

1. What is route data?
2. What is a query string?
3. How many values does one route segment normally provide?
4. How does `{id}` match an action parameter?
5. What is a simple type in model binding?
6. Why can `Guid` bind as a scalar?
7. Why does a CSV list require a grammar?
8. Does `/users/1,2,3` contain three route segments?
9. What does `[FromRoute]` select?
10. What does `[FromQuery]` select?

## Repeated query keys

11. Write a query containing three `ids` values.
12. Which target type can receive those values?
13. Why do repeated keys avoid CSV escaping?
14. How should missing keys be handled?
15. How should duplicate IDs be handled?
16. Does array binding validate business limits?
17. What can `[ApiController]` do for conversion errors?
18. Why still validate count and authorization?

## CSV route/query values

19. Is `ids=1,2,3` one query value or three?
20. Is `users/1,2,3` one route value or three?
21. Why does `int.Parse` need safer handling?
22. Which malformed strings should tests cover?
23. What does `RemoveEmptyEntries` change?
24. What does `TrimEntries` change?
25. How should an empty CSV value behave?
26. How should ordering be treated?
27. How should duplicates be treated?
28. What URL-size issue can arise?

## Custom binding

29. When is a custom binder appropriate?
30. When is `IParsable<T>` appropriate?
31. What is the benefit of a value object such as GuidList?
32. Where should maximum-count validation live?
33. What should TryParse return for one bad item?
34. Why should parsing avoid external resources?
35. Which integration test proves route binding works?
36. What is a model-binding error versus a domain-validation error?

## Composite keys

37. What is a composite key?
38. Why are separate route segments often clearer?
39. When can a packed composite string be reasonable?
40. What escaping rules does `key1=value1,key2=value2` need?
41. How should route constraints help?
42. What lookup must verify both key components?

## Design correction

43. Is a route list forbidden by REST?
44. What is the actual default-binding limitation?
45. Why may query parameters still be preferable?
46. When can a batch resource have a path identity?
47. Why must binding mechanics be separated from URI semantics?
48. When is a POST body preferable?

## Scenarios and code

49. Implement repeated-query int array binding.
50. Return a clear 400 for one invalid ID.
51. Implement a CSV route parser with TryParse.
52. Implement GuidList as a value object.
53. Add a 100-ID count limit.
54. Preserve order while removing duplicates.
55. Reject duplicate IDs instead of removing them.
56. Create an explicit two-segment composite route.
57. Compare cache behavior for query versus path list forms.
58. Design a structured batch request body.
59. Test URL encoding for unusual values.
60. Explain the endpoint choice to an API consumer.
