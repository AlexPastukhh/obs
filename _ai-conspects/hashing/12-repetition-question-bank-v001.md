# Repetition question bank — Hashing

## Fundamentals

1. Why must password storage be one-way?
2. Why is reversible password encryption the wrong default?
3. What information is stored for password verification?
4. Why is salt not secret?
5. What attack does a unique salt disrupt?
6. Why does salt not make raw SHA-256 adequate?
7. What is a pepper?
8. Where should pepper be stored?
9. What operational risks does pepper create?
10. What is key stretching?

## Cost parameters

11. Which parameter controls PBKDF2 work?
12. What does bcrypt log rounds mean?
13. Which parameters control Argon2id?
14. Why is Argon2id memory-hard?
15. Why must cost parameters be stored?
16. How should a production work factor be selected?
17. Why should numeric recommendations be treated as version-sensitive?
18. What happens if the cost is too low?
19. What happens if the cost is too high?
20. Why can different accounts use different stored parameters?

## PBKDF2 and .NET

21. What inputs does `Rfc2898DeriveBytes.Pbkdf2` require?
22. How should a salt be generated?
23. What should determine the output key length?
24. Why should new code avoid a legacy PRF profile?
25. How should an encoded hash string be parsed safely?
26. Why must verification use the stored iteration count?
27. What does `CryptographicOperations.FixedTimeEquals` protect against?
28. Why is Base64 not a security boundary?
29. Write a versioned PBKDF2 storage format.
30. Write the registration and verification flows.

## ASP.NET Core Identity

31. What does `PasswordHasher<TUser>.HashPassword` return?
32. Does it prepend a literal `IDENTITY:` prefix?
33. What is encoded inside the Identity hash payload?
34. What are the three `PasswordVerificationResult` values?
35. What should happen after `SuccessRehashNeeded`?
36. Why does `IPasswordHasher<TUser>` receive a user object?
37. Is a separate salt column required for the default Identity hasher?
38. How can Identity hashing be used without adopting the full Identity schema?
39. How do you configure PasswordHasher options?
40. Which settings require a migration plan?

## Versioning and migration

41. Why should custom formats contain a version?
42. When should the version be bumped?
43. What is rehash-on-login?
44. How do you migrate a legacy `hash:salt` format?
45. When may a legacy prefix be useful?
46. Why should the upgraded hash be persisted only after successful verification?
47. What happens to inactive legacy accounts?
48. How can a forced password reset complement migration?
49. What should the application do with a malformed legacy record?
50. How can migration avoid exposing which format an account uses?

## Threat model and operations

51. What can an attacker do after stealing plaintext passwords?
52. What changes when the attacker steals salted KDF hashes?
53. Why do weak user passwords remain a problem?
54. How do rate limits help online attacks but not offline attacks?
55. Why is MFA outside the hash itself?
56. Why should passwords and derived bytes never be logged?
57. What does a breached-password check add?
58. Why must TLS still be used?
59. What is the difference between collision resistance and password guessing resistance?
60. Build a secure end-to-end registration/login/rehash flow from memory.
