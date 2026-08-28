# Knowledge Registry

Source workspace: `_ai-conspects/basic auth/`

Authoritative processed source: `regions/R01R02R03-basic-authentication-final.md`

Original SVG: `source/basic auth.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 Basic wire payload, Base64-versus-encryption, mandatory TLS, controlled-use cases and public-auth boundary | `http.authentication-headers` | `http` | `../_knowledge/http/authentication-headers.md` | MERGED |
| Credential parsing, intended separator, replay risk and raw-header/password logging prohibition | `http.authentication-headers`; `aspnet-core.basic-authentication-handler-and-clients` | `http`; `aspnet-core` | `../_knowledge/http/authentication-headers.md`; `../_knowledge/aspnet-core/basic-authentication-handler-and-clients.md` | MAPPED |
| R02 scheme handler flow, dedicated validation, minimal claims, NoResult/Fail/Success and standards-compatible challenge | `aspnet-core.basic-authentication-handler-and-clients` | `aspnet-core` | `../_knowledge/aspnet-core/basic-authentication-handler-and-clients.md` | MAPPED |
| 401 authentication challenge versus 403 authorization failure | `aspnet-core.basic-authentication-handler-and-clients` | `aspnet-core` | `../_knowledge/aspnet-core/basic-authentication-handler-and-clients.md` | MAPPED |
| R03 explicit `AuthenticationHeaderValue`, credential-aware client behavior, curl/PowerShell conveniences and preauthentication variability | `aspnet-core.basic-authentication-handler-and-clients` | `aspnet-core` | `../_knowledge/aspnet-core/basic-authentication-handler-and-clients.md` | MAPPED |
| Scheme registration and endpoint `[Authorize]`/`RequireAuthorization` protection | `aspnet-core.basic-authentication-handler-and-clients` | `aspnet-core` | `../_knowledge/aspnet-core/basic-authentication-handler-and-clients.md` | MAPPED |
| Coverage and evidence metadata | — | — | — | NON_LEARNING |

## Boundary decisions

- The HTTP credential/challenge contract extends the existing protocol unit.
- Handler result states, claims construction, scheme registration, and .NET client mechanics remain one framework/client integration unit.

| Status | Count |
|---|---:|
| MAPPED | 5 |
| MERGED | 1 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
