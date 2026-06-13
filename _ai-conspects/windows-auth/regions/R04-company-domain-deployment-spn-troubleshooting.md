# R04 - Company/domain deployment / SPN / whoami / troubleshooting

Generated: 2026-06-13 05:49:12 UTC

Image uses: 13

```text
S-030, S-031, S-032, S-029, S-033, S-028, S-027, S-034, S-035, S-036, S-037, S-038, S-039
```

## Core idea

Windows Authentication is extremely environment-dependent.

A configuration that works in local IIS Express is not enough proof that production Windows Auth will work.

The real behavior depends on:

```text
domain membership
browser zone/settings
IIS authentication settings
app pool identity
server/service account
SPN registration
Kerberos vs NTLM negotiation
proxy/load balancer setup
authorization rules
```

## IIS Express vs real company domain

Local development often proves only the app-level basics:

```text
AddNegotiate works
UseAuthentication/UseAuthorization are present
Authorize attributes are applied
User.Identity.Name can be read
```

Production/intranet deployment adds domain infrastructure:

```text
server joined to domain
users joined to domain
IIS site configured
browser trusts the intranet zone
service identity can decrypt Kerberos tickets
SPN points to the right account
```

## SPN and Kerberos

Kerberos depends on Service Principal Names.

Conceptually:

```text
client requests ticket for HTTP/app.company.local
domain controller finds SPN for that service
ticket is encrypted for the service account
server/app pool identity must be able to validate it
```

If SPN is missing or wrong, Kerberos can fail and the system may fall back to NTLM or prompt repeatedly.

Typical SPN-related issues:

```text
duplicate SPN
SPN registered on wrong account
app pool runs under identity that does not match SPN
using DNS alias without proper SPN
load-balanced name not configured for the right service identity
```

## App pool identity

In IIS, the app pool identity matters because it can be the security context that validates Kerberos tickets.

Common identities:

```text
ApplicationPoolIdentity
NetworkService
custom domain service account
gMSA
```

For real Kerberos scenarios, a managed domain identity or gMSA may be needed so SPNs can be registered correctly and maintained safely.

## Login prompts and 401 loops

Browser login prompts or repeated 401s can come from several layers.

Checklist:

```text
Is Windows Authentication enabled?
Is Anonymous disabled where needed?
Is the site considered intranet/trusted by the browser?
Is the browser allowed to send credentials automatically?
Is the hostname using a name that has a valid SPN?
Is Kerberos failing and falling back to NTLM?
Does the endpoint require a policy/role the user does not have?
Is a proxy/load balancer stripping or changing auth headers?
```

Do not assume every prompt means bad ASP.NET Core code. Often it is browser/domain/IIS/SPN configuration.

## whoami endpoint

A diagnostic endpoint is very useful.

It should be protected and temporary or safe for the environment.

Example information:

```text
User.Identity.Name
User.Identity.AuthenticationType
User.Identity.IsAuthenticated
claims
roles/groups if present
request headers relevant to auth
```

This answers:

```text
Did authentication happen?
Which scheme authenticated?
What name did the app receive?
Are group/role claims present?
```

## Claims, roles and groups

With Windows Auth, group information may appear as role claims or SIDs depending on platform and configuration.

Do not assume every AD group name is immediately visible in the way the app expects.

Debug separately:

```text
identity name
authentication type
claim types
role claim type
group/role membership
policy requirements
```

## Secure troubleshooting policy

Useful diagnostics should not leak too much.

Safe-ish in internal debug:

```text
authenticated true/false
identity name
authentication type
selected scheme
claim types/counts
```

Be careful with:

```text
full tokens
sensitive headers
internal domain topology
all group memberships in public responses
service account details
```

## Practical deployment checklist

Before blaming the app, check:

```text
IIS site auth settings
app pool identity
server domain join
client/browser intranet zone
SPN for HTTP/host
DNS alias vs real host
Kerberos event logs / browser dev tools
whoami endpoint output
policy/role requirements
```

## Boundary note

R04 is the deployment and troubleshooting tail.

R01/R02 explain the model and basic setup. R03 explains multi-scheme composition.
