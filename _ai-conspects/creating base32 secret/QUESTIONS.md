# Base32 and TOTP secret generation - repetition questions

Source: `regions/full-semantic-transcript-v001.md`

## Secret fundamentals

1. What is the real security property of a TOTP secret?
2. What role does Base32 play?
3. Does Base32 create entropy?
4. Why is Base32 convenient for provisioning?
5. What alphabet is normally used for Base32?

## Recommended generation

6. Which API should generate secret bytes?
7. Why is `Random` unsuitable?
8. Why is the byte-first approach preferred?
9. How many bits are in twenty random bytes?
10. How many Base32 characters represent 160 bits without padding?
11. Why do verification libraries often prefer byte keys?
12. When should the secret be converted to Base32?

## Direct character selection

13. How does the alphabet-picking algorithm choose one character?
14. What does `BitConverter.ToUInt32` do?
15. Why does the sample consume four bytes per output character?
16. How many bytes does the sixteen-character sample request?
17. Does endianness make cryptographic random bytes predictable?
18. How many bits does one uniformly selected Base32 character represent?
19. How much entropy do sixteen characters provide?
20. How much entropy do thirty-two characters provide?
21. What is modulo bias?
22. Why is modulo 32 unbiased for a uniform 32-bit integer?
23. When would rejection sampling be needed?

## Comparing approaches

24. What is the true secret in the byte-first approach?
25. What is the true secret in direct text generation?
26. Which approach gives clearer entropy control?
27. Why can two outputs look similar while having different strength?
28. Why is thirty-two-character direct selection stronger than sixteen-character selection?

## Provisioning URI

29. What is the basic `otpauth://totp` URI shape?
30. What belongs in the label?
31. Why should the issuer appear in both label and query data?
32. Which values must be URL-encoded?
33. Why is an email address important to encode?
34. Which URI value is the actual shared credential?
35. Which values are display and identification metadata?

## Secret handling

36. Why must the provisioning QR be protected?
37. Should the secret be logged?
38. What should happen after suspected exposure?
39. What are reasonable storage representations?
40. Why must either representation still be protected?

## In-flight dictionary side topic

41. Why can several callers await the same `Lazy<Task<object>>`?
42. Why can every waiter reach the cleanup `finally`?
43. What does key-and-value `TryRemove` verify?
44. Why do later removal attempts fail harmlessly?
45. What race exists with `TryRemove(key, out _)`?
46. How can a later request create `lazy2` before an older waiter cleans up?
47. Why is exact-value removal safer than key-only removal?

## Scenario review

48. A TOTP key is generated with sixteen Base32 characters. Approximately how much entropy does it have?
49. Twenty secure random bytes are Base32-encoded. Did encoding increase the entropy?
50. An application uses a non-32-symbol alphabet with `% alphabet.Length`. What bias question must be checked?
51. An issuer contains spaces and an account is an email address. What must happen before URI construction?
52. A QR containing the secret appears in logs. What security assumption has been broken?
53. An old waiter executes cleanup after a new lazy value was stored under the same key. Which removal overload avoids deleting the new work?
