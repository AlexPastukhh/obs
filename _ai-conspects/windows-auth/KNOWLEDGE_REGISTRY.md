# Knowledge Registry

Source workspace: `_ai-conspects/windows-auth/`

Authoritative processed sources: verified R01 through R04 region transcripts; `03-stage3-final-coverage-audit.md` and `CURRENT_SOURCE_OF_TRUTH.md` confirm 47/47 image uses covered.

Original SVG: `source/windows-auth.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 Windows/domain trust flow, AD ownership, Negotiate/Kerberos/NTLM roles, intranet fit and authentication-versus-authorization boundary | `security.windows-integrated-authentication-and-domain-infrastructure` | `security` | `../_knowledge/security/windows-integrated-authentication-and-domain-infrastructure.md` | MAPPED |
| R02 host/application alignment, IIS switches, Negotiate registration, middleware order, endpoint authorization and protected `whoami` setup | `aspnet-core.windows-authentication-negotiate-hosting` | `aspnet-core` | `../_knowledge/aspnet-core/windows-authentication-negotiate-hosting.md` | MAPPED |
| R03 named Windows/cookie/bearer/OIDC entrances, default/policy selection and scheme-specific challenge outcomes | `aspnet-core.authentication-schemes-oidc-events-and-tickets` | `aspnet-core` | `../_knowledge/aspnet-core/authentication-schemes-oidc-events-and-tickets.md` | MERGED |
| R04 production domain/browser/IIS identity/SPN flow, Kerberos fallback causes, claims/group inspection and safe diagnostics | `security.windows-integrated-authentication-and-domain-infrastructure`; `aspnet-core.windows-authentication-negotiate-hosting` | `security`; `aspnet-core` | `../_knowledge/security/windows-integrated-authentication-and-domain-infrastructure.md`; `../_knowledge/aspnet-core/windows-authentication-negotiate-hosting.md` | MAPPED |

Boundary decision: protocol/domain infrastructure is a security model; framework/host wiring belongs to ASP.NET Core; the general named-scheme/challenge model already exists and is extended instead of duplicated.

| Status | Count |
|---|---:|
| MAPPED | 3 |
| MERGED | 1 |
| NON_LEARNING | 0 |
| UNRESOLVED | 0 |
