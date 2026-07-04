# Account activation — question bank v002

## Token generation and storage

1. Why use RandomNumberGenerator for activation codes?
2. Why not use Random?
3. How many hex characters result from 128 random bytes?
4. Why does that conflict with HasMaxLength(100)?
5. How many hex characters result from 32 random bytes?
6. Why might storing a token hash be better than storing raw token?
7. What should never be logged?
8. Why does the code need an expiration time?
9. Why use TimeProvider instead of DateTime.UtcNow directly?
10. What tests should prove expiration behavior?

## Entity design

11. Why create a separate Activation entity?
12. What does IsActivated represent?
13. What does ActivatedAt represent?
14. Why is ActivatedAt optional?
15. What does IsActivationAttempted represent?
16. What should happen after a wrong code?
17. What should happen after an expired code?
18. What should happen after successful activation?
19. Why should success set ActivatedAt?
20. How should already activated be handled?
21. What invariants belong inside the entity?
22. Why keep setters private?
23. Why is an EF constructor needed?
24. How does Maybe conversion work?
25. Why include row version?

## EF mapping

26. Which table stores activations?
27. Which property is the key?
28. What is the shadow UserId?
29. How is the relationship configured?
30. What does cascade delete do?
31. Why does HasMaxLength require token-size review?
32. Why might SecurityCode need a unique index or hash index?
33. Why should lookup include not-activated state?
34. How can concurrency protect double activation?
35. What happens if multiple active codes exist for one user?

## Email and link generation

36. Why redirect to check-email page after registration?
37. Why not sign the user in before activation?
38. Where does the activation code come from in RegisterHandler?
39. What creates the URL?
40. Which route values are passed?
41. Why can IHttpContextAccessor be fragile?
42. When is a configured base URL better?
43. Why must links work behind reverse proxies?
44. What should happen if email sending fails?
45. Why should email sending and DB save be coordinated?
46. How can an outbox pattern help?
47. Why should links be absolute?
48. Why should activation email not expose internal errors?

## Handler and endpoint

49. What repository lookup is used?
50. What is the bug in the missing-user branch?
51. Why must it return the error?
52. What does UnitResult<Error> express?
53. Where is domain validation delegated?
54. Why must SaveChanges occur after success?
55. What should be returned for invalid code?
56. What should be returned for expired code?
57. What should be returned for already activated?
58. Why avoid logging raw code?
59. What does cancellationToken protect?
60. How should repeated clicks behave?

## GET/POST activation design

61. Why do email links commonly use GET?
62. Why is side-effecting GET risky?
63. What are link scanners?
64. How can GET be made idempotent?
65. How does GET confirmation + POST mutation work?
66. What should the success page show?
67. What should the failure page reveal?
68. How can user enumeration be avoided?
69. What anti-forgery concern applies to POST confirmation?
70. How should expired links be handled?

## Scenarios and tests

71. Test token length fits schema.
72. Test invalid code marks attempted.
73. Test expired code marks attempted.
74. Test valid code activates and sets ActivatedAt.
75. Test already activated path.
76. Test missing code branch returns error.
77. Test email failure returns error.
78. Test link factory creates HTTPS URL.
79. Test background link creation without HttpContext.
80. Test duplicate activation under concurrency.
81. Test row version conflict.
82. Test activation after password registration redirects to check-email.
83. Test raw code is not logged.
84. Test token is cleared or made unusable after success.
85. Test expired token cannot be reused.
86. Test latest activation is selected correctly.
87. Test multiple active tokens policy.
88. Test cascade delete removes activations.
89. Test Maybe conversion round-trip.
90. Test public URL configuration behind proxy.
