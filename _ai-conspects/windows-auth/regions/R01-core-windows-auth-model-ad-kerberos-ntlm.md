# R01 - Core Windows Auth model / AD / Kerberos / NTLM

Generated: 2026-06-13 05:43:48 UTC

Image uses: 16

```text
S-001, S-002, S-003, S-018, S-019, S-020, S-017, S-016, S-015, S-010, S-009, S-008, S-007, S-006, S-005, S-004
```

## Core idea

Windows Authentication means the application does not ask the user to type an application-specific username and password.

Instead, the app trusts the Windows/domain identity that has already been established by the operating system and browser/server authentication handshake.

A compact model:

```text
domain user signs into Windows
browser accesses intranet app
server challenges for Windows credentials
browser and server negotiate Kerberos/NTLM
ASP.NET Core receives an authenticated Windows principal
```

## Where Active Directory fits

In a company network, Windows Authentication usually depends on Active Directory.

Active Directory provides:

```text
domain user accounts
computer/server accounts
groups
Kerberos key distribution
central identity and policy management
```

The application does not own the password database. The domain does.

That is why Windows Auth is most natural for internal corporate applications:

```text
same company
domain-joined machines
intranet network
central AD identities and groups
```

## Kerberos and NTLM

Windows Authentication is an umbrella at the web-app level. Under the hood, the common protocols are:

```text
Kerberos
NTLM
```

Kerberos is usually preferred in domain environments because it supports ticket-based authentication and better delegation scenarios.

NTLM is older and can appear as fallback, especially when Kerberos cannot be used because of SPN/configuration/domain constraints.

A useful mental split:

```text
Windows Authentication = app/server authentication mode
Negotiate = HTTP authentication scheme that can choose Kerberos or NTLM
Kerberos/NTLM = underlying Windows authentication protocols
```

## Request flow

The browser first requests a protected resource.

The server replies with an authentication challenge, commonly:

```http
WWW-Authenticate: Negotiate
```

The browser then sends a token. The server validates it through Windows/SSPI/domain infrastructure. If validation succeeds, the app receives an authenticated principal.

Inside ASP.NET Core, the important result is:

```csharp
HttpContext.User
User.Identity.IsAuthenticated
User.Identity.Name
```

The name often has a domain-style shape:

```text
DOMAIN\username
```

## What Windows Auth is good for

Windows Auth is good when the app is for employees or internal users.

Typical fit:

```text
intranet portals
internal admin tools
line-of-business apps
corporate dashboards
apps where AD groups map naturally to roles/policies
```

It is attractive because users can get single sign-on-like behavior: they already signed into Windows, and the browser can send the needed credentials automatically.

## What Windows Auth is not good for

Windows Auth is not a good default for public internet apps.

Problems:

```text
external users are not in your AD
non-domain machines may show login prompts
cross-platform/browser behavior can vary
firewalls/proxies can interfere
Kerberos/NTLM assumptions often require intranet/domain conditions
```

For public users, app-owned login, cookies, OAuth/OIDC, or external identity providers are usually a better fit.

## Groups, roles, and authorization

Authentication answers:

```text
Who is the user?
```

Authorization answers:

```text
What can the user do?
```

With Windows Auth, authorization often uses AD groups.

Examples:

```text
Domain Users
Developers
Finance
App-Admins
```

In ASP.NET Core, this can become policy-based authorization or role checks, depending on how group/role claims are surfaced by hosting and configuration.

## Practical checklist

Use Windows Auth when:

```text
users are internal employees
machines/users are domain-managed
the app is hosted inside a trusted corporate network
AD groups are useful for authorization
you want to avoid separate app credentials
```

Be cautious when:

```text
the app is public-facing
users are external
you need mobile/non-domain clients
you need token-based API access
Kerberos delegation/SPN setup is not controlled
```

## Boundary note

R01 is the conceptual model.

R02 covers how to wire this into ASP.NET Core and IIS/IIS Express with Negotiate and authentication middleware.
