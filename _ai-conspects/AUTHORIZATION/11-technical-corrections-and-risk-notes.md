# Technical correction and risk notes — AUTHORIZATION

These notes do not replace the source transcript. They separate framework-safe interpretation from near-literal source wording.

1. **`context.Fail()`** records explicit failure for the final authorization result. Remaining handlers may still execute depending on authorization options; subsequent `Succeed` calls do not undo the explicit failure.
2. **Do nothing** means only that one handler did not satisfy the requirement. Another handler may still satisfy the same requirement.
3. **Policy-name authorization calls** should use an overload available in the target ASP.NET Core version. When no domain resource is involved, the common form supplies `resource: null`; resource-based checks pass the loaded object.
4. **Scope claim shape is provider-specific.** Support the actual `scope`/`scp` representation produced by the configured authentication handler rather than assuming every provider emits the same form.
5. **Issuer checks supplement authentication trust configuration.** Inspecting `Claim.Issuer` does not replace validation of JWT issuers, signatures or external identities.
6. **Approximate age arithmetic** based on total days divided by 365.25 is useful for a teaching example but can be incorrect around birthdays. Production rules should compare calendar dates deliberately.
7. **Authorization in UI is not enforcement.** Server-side command/data boundaries must repeat the authorization check.
8. **Non-generic handler batching** is valuable when it shares I/O or one domain decision. It is not automatically better than small typed handlers.
9. **FallbackPolicy** is a secure default only when public endpoints are deliberately marked anonymous and middleware/endpoint configuration is correct.
10. **Large domain dispatchers** are legitimate but require strict domain boundaries and tests to avoid becoming an unmaintainable global switch.
