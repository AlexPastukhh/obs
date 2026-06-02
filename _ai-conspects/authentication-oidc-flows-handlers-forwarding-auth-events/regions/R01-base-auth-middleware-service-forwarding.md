# R01 - Base authentication middleware / AuthenticationService / forwarding basics

Generated: 2026-06-02 01:15:16 UTC

## Done

- P01/R01 combined transcript created.
- This closes base auth middleware, AuthenticationService, scheme/handler providers, and forwarding/challenge/forbid basics.
- Stage0 split was treated as checklist only; local boundary recheck added later-pass exclusions.

## Now

- Review/apply/commit R01.
- After commit, P02/R02 cookie auth core + events is next.

## Next

- P02/R02: cookie authentication core, ticket store, refresh, sign-in/sign-out, cookie events, redirects, sliding expiration.

## Later

- P03/R03A JWT bearer handler pipeline.
- P04/R03B+R04 JWT outcomes + OIDC/PKCE/sign-in bridge.
- Final coverage audit over all 325 image uses.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:

- How ASP.NET Core authentication enters the pipeline through UseAuthentication and AuthenticationMiddleware.
- How AuthenticationMiddleware uses request-handler schemes, default authenticate scheme, and context.AuthenticateAsync.
- How AuthenticationService delegates to scheme provider, handler provider, handlers, and claims transformation.
- How AuthenticationSchemeProvider owns scheme metadata and default scheme fallback rules.
- How AuthenticationHandlerProvider creates/caches per-request handler instances and calls InitializeAsync.
- How forwarding works through ResolveTarget, operation-specific Forward* options, ForwardDefaultSelector, and ForwardDefault.
- How Challenge/Forbid/SignIn/SignOut are separate operations and may be routed to different schemes.

Key ideas:

- UseAuthentication only inserts middleware; the core decisions happen in AuthenticationMiddleware, AuthenticationService, scheme provider, and handlers.
- AuthenticationMiddleware first gives IAuthenticationRequestHandler schemes a chance to handle/short-circuit special endpoints.
- Default authentication populates HttpContext.User only if a default authenticate scheme is resolved and succeeds.
- Scheme names are metadata that connect a name to a handler type and named options.
- The handler provider creates one handler instance per scheme per request and initializes it with scheme, context, options, events, and handler-specific initialization.
- Forwarding lets one logical scheme route Authenticate/Challenge/Forbid/SignIn/SignOut to different real schemes.
- Forwarding resolution priority is operation-specific Forward* setting, then ForwardDefaultSelector, then ForwardDefault, while avoiding self-targeting loops.
- Challenge and forbid are not “authenticate again”; they are separate response operations with their own default scheme resolution and handler methods.
- Sign-in and sign-out require handlers that implement sign-in/sign-out interfaces; not every handler supports these operations.

Reading quality:

```text
overall_conceptual_understanding: high
source_readability: mixed: screenshots are mostly readable, with some code-heavy low-OCR fragments
transcript_quality: OCR-assisted + semantic verification; good for concept preservation, not guaranteed for exact punctuation in every code line
known_limitations: ['S-023/S-028/S-034 are tiny snippets or weak OCR fragments; they are included for coverage/context but not relied on as standalone claims.']
```

---

## 0.2 Coverage / boundary review

Included source count: **81**

Included sources:

```text
S-299, S-300, S-020, S-001, S-021, S-037, S-039, S-035, S-022, S-002, S-038, S-036, S-003, S-031, S-030, S-004, S-032, S-034, S-029, S-033, S-005, S-026, S-024, S-006, S-027, S-023, S-025, S-028, S-007, S-008, S-009, S-010, S-011, S-012, S-013, S-014, S-043, S-015, S-044, S-016, S-042, S-017, S-045, S-065, S-041, S-018, S-046, S-040, S-066, S-019, S-047, S-067, S-048, S-064, S-053, S-050, S-049, S-051, S-054, S-052, S-055, S-056, S-068, S-059, S-069, S-060, S-070, S-061, S-071, S-062, S-072, S-063, S-057, S-088, S-073, S-089, S-058, S-074, S-075, S-090, S-076
```

Checked but not included in R01:

```text
S-077, S-078, S-079, S-080, S-081, S-082, S-083, S-084, S-085, S-086, S-087, S-091, S-092, S-093, S-094, S-095, S-096, S-097, S-098, S-099, S-100
```

Decision:

```text
S-077-S087/S-091 are OIDC sign-in/out/challenge bridge candidates, not R01 base auth/forwarding.
S-092-S100 are JWT challenge/forbid/outcome candidates, not R01.
They remain for later P04/R03B-R04 boundary review.
```

---

## 1. Source inventory

| Region source | Source | fileId | Subregion | Readability | Theme |
|---|---|---|---|---|---|
| R01-S001 | S-299 | `d395b86f3c` | R01A-base-middleware-auth-service-handlers | medium-high | UseAuthentication / AuthenticationMiddleware entry point |
| R01-S002 | S-300 | `a82a739377` | R01A-base-middleware-auth-service-handlers | medium | UseAuthentication / AuthenticationMiddleware entry point |
| R01-S003 | S-020 | `17852964fb` | R01A-base-middleware-auth-service-handlers | medium | AuthenticationMiddleware context and default-auth flow sketch |
| R01-S004 | S-001 | `66dd53e7f8` | R01A-base-middleware-auth-service-handlers | medium-high | UseAuthentication / AuthenticationMiddleware entry point |
| R01-S005 | S-021 | `1a94998582` | R01A-base-middleware-auth-service-handlers | medium-high | AuthenticationMiddleware context and default-auth flow sketch |
| R01-S006 | S-037 | `9860304323` | R01A-base-middleware-auth-service-handlers | medium-high | special/request handlers and HandleRequestAsync short-circuit |
| R01-S007 | S-039 | `7d74582b40` | R01A-base-middleware-auth-service-handlers | medium-high | special/request handlers and HandleRequestAsync short-circuit |
| R01-S008 | S-035 | `98308754b2` | R01A-base-middleware-auth-service-handlers | medium-high | special/request handlers and HandleRequestAsync short-circuit |
| R01-S009 | S-022 | `6b9e77f242` | R01A-base-middleware-auth-service-handlers | medium-high | AuthenticationMiddleware context and default-auth flow sketch |
| R01-S010 | S-002 | `89edc9a877` | R01A-base-middleware-auth-service-handlers | medium-high | UseAuthentication / AuthenticationMiddleware entry point |
| R01-S011 | S-038 | `00c04ce2d4` | R01A-base-middleware-auth-service-handlers | medium-high | special/request handlers and HandleRequestAsync short-circuit |
| R01-S012 | S-036 | `dc7d9b7c5b` | R01A-base-middleware-auth-service-handlers | medium-high | special/request handlers and HandleRequestAsync short-circuit |
| R01-S013 | S-003 | `e4a50dea2a` | R01A-base-middleware-auth-service-handlers | medium-high | UseAuthentication / AuthenticationMiddleware entry point |
| R01-S014 | S-031 | `37383f13b0` | R01A-base-middleware-auth-service-handlers | medium | AuthenticationMiddleware context and default-auth flow sketch |
| R01-S015 | S-030 | `6a9f996bc0` | R01A-base-middleware-auth-service-handlers | medium-high | AuthenticationMiddleware context and default-auth flow sketch |
| R01-S016 | S-004 | `58d7299b32` | R01A-base-middleware-auth-service-handlers | medium | UseAuthentication / AuthenticationMiddleware entry point |
| R01-S017 | S-032 | `b59d4d01b3` | R01A-base-middleware-auth-service-handlers | medium-high | Auth service, scheme provider, handler provider flow diagram/code |
| R01-S018 | S-034 | `891f8b55ef` | R01A-base-middleware-auth-service-handlers | low-or-code-fragment | Auth service, scheme provider, handler provider flow diagram/code |
| R01-S019 | S-029 | `22eac6fec2` | R01A-base-middleware-auth-service-handlers | medium-high | AuthenticationMiddleware context and default-auth flow sketch |
| R01-S020 | S-033 | `fbf77db651` | R01A-base-middleware-auth-service-handlers | medium-high | Auth service, scheme provider, handler provider flow diagram/code |
| R01-S021 | S-005 | `280eabcaea` | R01A-base-middleware-auth-service-handlers | medium-high | AuthenticationService.AuthenticateAsync and operation service methods |
| R01-S022 | S-026 | `13f376afbf` | R01A-base-middleware-auth-service-handlers | medium-high | Auth service, scheme provider, handler provider flow diagram/code |
| R01-S023 | S-024 | `9e4acf2aa3` | R01A-base-middleware-auth-service-handlers | medium-high | Auth service, scheme provider, handler provider flow diagram/code |
| R01-S024 | S-006 | `b66210c4a8` | R01A-base-middleware-auth-service-handlers | medium-high | AuthenticationService.AuthenticateAsync and operation service methods |
| R01-S025 | S-027 | `812189a7c5` | R01A-base-middleware-auth-service-handlers | medium-high | Auth service, scheme provider, handler provider flow diagram/code |
| R01-S026 | S-023 | `62f8e8d3d8` | R01A-base-middleware-auth-service-handlers | low-or-code-fragment | Auth service, scheme provider, handler provider flow diagram/code |
| R01-S027 | S-025 | `00de58172e` | R01A-base-middleware-auth-service-handlers | medium-high | Auth service, scheme provider, handler provider flow diagram/code |
| R01-S028 | S-028 | `2033d2b11d` | R01A-base-middleware-auth-service-handlers | low-or-code-fragment | Auth service, scheme provider, handler provider flow diagram/code |
| R01-S029 | S-007 | `93a6709164` | R01A-base-middleware-auth-service-handlers | medium-high | AuthenticationService.AuthenticateAsync and operation service methods |
| R01-S030 | S-008 | `17926e5788` | R01A-base-middleware-auth-service-handlers | medium-high | AuthenticationSchemeProvider defaults and fallback scheme resolution |
| R01-S031 | S-009 | `a0fbfd24c7` | R01A-base-middleware-auth-service-handlers | medium | AuthenticationSchemeProvider defaults and fallback scheme resolution |
| R01-S032 | S-010 | `5b3dd95c3d` | R01A-base-middleware-auth-service-handlers | medium-high | AuthenticationSchemeProvider defaults and fallback scheme resolution |
| R01-S033 | S-011 | `5aef5dde78` | R01A-base-middleware-auth-service-handlers | medium-high | AuthenticationHandlerProvider and handler initialization/cache |
| R01-S034 | S-012 | `e4cb6f9991` | R01A-base-middleware-auth-service-handlers | medium | AuthenticationHandlerProvider and handler initialization/cache |
| R01-S035 | S-013 | `85c44f86bd` | R01A-base-middleware-auth-service-handlers | medium-high | AuthenticationHandlerProvider and handler initialization/cache |
| R01-S036 | S-014 | `bc639a8620` | R01B-forwarding-challenge-forbid-basics | medium-high | forwarding/challenge/forbid basics |
| R01-S037 | S-043 | `6d3e5555d8` | R01B-forwarding-challenge-forbid-basics | medium-high | Forwarding internals: ResolveTarget, InitializeAsync, ForwardAuthenticate |
| R01-S038 | S-015 | `032da4b0a7` | R01B-forwarding-challenge-forbid-basics | medium-high | forwarding/challenge/forbid basics |
| R01-S039 | S-044 | `dbbe2cc3d5` | R01B-forwarding-challenge-forbid-basics | medium-high | Forwarding internals: ResolveTarget, InitializeAsync, ForwardAuthenticate |
| R01-S040 | S-016 | `01b1ddd76c` | R01B-forwarding-challenge-forbid-basics | medium | forwarding/challenge/forbid basics |
| R01-S041 | S-042 | `e4b5c4c722` | R01B-forwarding-challenge-forbid-basics | medium-high | Forwarding internals: ResolveTarget, InitializeAsync, ForwardAuthenticate |
| R01-S042 | S-017 | `b26255cf0c` | R01B-forwarding-challenge-forbid-basics | medium-high | forwarding/challenge/forbid basics |
| R01-S043 | S-045 | `e9282024a0` | R01B-forwarding-challenge-forbid-basics | medium-high | Forwarding internals: ResolveTarget, InitializeAsync, ForwardAuthenticate |
| R01-S044 | S-065 | `f73a2ce705` | R01B-forwarding-challenge-forbid-basics | medium-high | challenge/forbid/sign-in/sign-out basics and handler interfaces |
| R01-S045 | S-041 | `1a2da7a93a` | R01B-forwarding-challenge-forbid-basics | medium | Forwarding internals: ResolveTarget, InitializeAsync, ForwardAuthenticate |
| R01-S046 | S-018 | `b0f809d46d` | R01B-forwarding-challenge-forbid-basics | medium-high | forwarding/challenge/forbid basics |
| R01-S047 | S-046 | `7bf4e4f0ed` | R01B-forwarding-challenge-forbid-basics | medium-high | Forwarding internals: ResolveTarget, InitializeAsync, ForwardAuthenticate |
| R01-S048 | S-040 | `0f9ebbfa70` | R01B-forwarding-challenge-forbid-basics | medium-high | Forwarding internals: ResolveTarget, InitializeAsync, ForwardAuthenticate |
| R01-S049 | S-066 | `c81cdbac8c` | R01B-forwarding-challenge-forbid-basics | medium-high | challenge/forbid/sign-in/sign-out basics and handler interfaces |
| R01-S050 | S-019 | `6a5fb74ed6` | R01B-forwarding-challenge-forbid-basics | medium-high | forwarding/challenge/forbid basics |
| R01-S051 | S-047 | `26bd56b543` | R01B-forwarding-challenge-forbid-basics | medium-high | Forwarding concept and policy scheme motivation |
| R01-S052 | S-067 | `316ddefb1c` | R01B-forwarding-challenge-forbid-basics | medium-high | challenge/forbid/sign-in/sign-out basics and handler interfaces |
| R01-S053 | S-048 | `83fa587b79` | R01B-forwarding-challenge-forbid-basics | medium | Forwarding concept and policy scheme motivation |
| R01-S054 | S-064 | `01e496352b` | R01B-forwarding-challenge-forbid-basics | medium-high | challenge/forbid/sign-in/sign-out basics and handler interfaces |
| R01-S055 | S-053 | `2c8374473c` | R01B-forwarding-challenge-forbid-basics | medium-high | Forward options examples: cookies, OIDC challenge, selector/default priority |
| R01-S056 | S-050 | `e1e147a2c9` | R01B-forwarding-challenge-forbid-basics | medium | Forward options examples: cookies, OIDC challenge, selector/default priority |
| R01-S057 | S-049 | `9ad22b4441` | R01B-forwarding-challenge-forbid-basics | medium-high | Forwarding concept and policy scheme motivation |
| R01-S058 | S-051 | `235b87f544` | R01B-forwarding-challenge-forbid-basics | medium-high | Forward options examples: cookies, OIDC challenge, selector/default priority |
| R01-S059 | S-054 | `122657f18c` | R01B-forwarding-challenge-forbid-basics | medium-high | Forward options examples: cookies, OIDC challenge, selector/default priority |
| R01-S060 | S-052 | `fa53e80e0f` | R01B-forwarding-challenge-forbid-basics | medium-high | Forward options examples: cookies, OIDC challenge, selector/default priority |
| R01-S061 | S-055 | `7fa89ef5e5` | R01B-forwarding-challenge-forbid-basics | medium-high | Forward options examples: cookies, OIDC challenge, selector/default priority |
| R01-S062 | S-056 | `c5dcceefc7` | R01B-forwarding-challenge-forbid-basics | medium-high | ForwardDefault / ForwardDefaultSelector / challenge/forbid/sign-in/out routing |
| R01-S063 | S-068 | `6c318526f7` | R01B-forwarding-challenge-forbid-basics | medium | challenge/forbid/sign-in/sign-out basics and handler interfaces |
| R01-S064 | S-059 | `a7573207ec` | R01B-forwarding-challenge-forbid-basics | medium-high | ForwardDefault / ForwardDefaultSelector / challenge/forbid/sign-in/out routing |
| R01-S065 | S-069 | `8a3581cd7a` | R01B-forwarding-challenge-forbid-basics | medium-high | challenge/forbid/sign-in/sign-out basics and handler interfaces |
| R01-S066 | S-060 | `3ea97a6f06` | R01B-forwarding-challenge-forbid-basics | medium | ForwardDefault / ForwardDefaultSelector / challenge/forbid/sign-in/out routing |
| R01-S067 | S-070 | `2242ba256c` | R01B-forwarding-challenge-forbid-basics | medium-high | challenge/forbid/sign-in/sign-out basics and handler interfaces |
| R01-S068 | S-061 | `a6b0f6dd9c` | R01B-forwarding-challenge-forbid-basics | medium-high | ForwardDefault / ForwardDefaultSelector / challenge/forbid/sign-in/out routing |
| R01-S069 | S-071 | `2419f879a6` | R01B-forwarding-challenge-forbid-basics | medium | challenge/forbid/sign-in/sign-out basics and handler interfaces |
| R01-S070 | S-062 | `def20ab986` | R01B-forwarding-challenge-forbid-basics | medium | ForwardDefault / ForwardDefaultSelector / challenge/forbid/sign-in/out routing |
| R01-S071 | S-072 | `4b6e014024` | R01B-forwarding-challenge-forbid-basics | medium-high | challenge/forbid/sign-in/sign-out basics and handler interfaces |
| R01-S072 | S-063 | `1e0669cc32` | R01B-forwarding-challenge-forbid-basics | medium-high | ForwardDefault / ForwardDefaultSelector / challenge/forbid/sign-in/out routing |
| R01-S073 | S-057 | `d5d0ee5b62` | R01B-forwarding-challenge-forbid-basics | medium-high | ForwardDefault / ForwardDefaultSelector / challenge/forbid/sign-in/out routing |
| R01-S074 | S-088 | `03eff36184` | R01B-forwarding-challenge-forbid-basics | medium-high | default forbid scheme and sign-in/out handler tail |
| R01-S075 | S-073 | `19593eecf4` | R01B-forwarding-challenge-forbid-basics | medium | challenge/forbid/sign-in/sign-out basics and handler interfaces |
| R01-S076 | S-089 | `92c830f8b1` | R01B-forwarding-challenge-forbid-basics | medium-high | default forbid scheme and sign-in/out handler tail |
| R01-S077 | S-058 | `76f00eca1a` | R01B-forwarding-challenge-forbid-basics | medium-high | ForwardDefault / ForwardDefaultSelector / challenge/forbid/sign-in/out routing |
| R01-S078 | S-074 | `40a8739342` | R01B-forwarding-challenge-forbid-basics | medium | challenge/forbid/sign-in/sign-out basics and handler interfaces |
| R01-S079 | S-075 | `9ba12d337f` | R01B-forwarding-challenge-forbid-basics | medium-high | challenge/forbid/sign-in/sign-out basics and handler interfaces |
| R01-S080 | S-090 | `5dbfd3f21c` | R01B-forwarding-challenge-forbid-basics | medium-high | default forbid scheme and sign-in/out handler tail |
| R01-S081 | S-076 | `b4143ba0b2` | R01B-forwarding-challenge-forbid-basics | medium | challenge/forbid/sign-in/sign-out basics and handler interfaces |

---

## 2. OCR-assisted visible source transcript

Note: this section preserves visible source text using OCR-assisted reading plus semantic boundary verification. Use exact code punctuation with caution; the conceptual claims are captured in cleaned notes/evidence below.

### R01-S001 / S-299 - `d395b86f3c`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: UseAuthentication / AuthenticationMiddleware entry point
- readability: `medium-high`

```text
1. Common outer tlow for both handlers

Before we get into cookie/JWT specifics, both start from the same framework pattern.

Authenticate outer flow

AuthenticationMiddleware / PolicyEvaluator / your code

+

HttpContext - AuthenticateAsync("SchemeName")

+

AuthenticationService-AuthenticateAsync(context, scheme)

+

AuthenticationHandlerProvider.GetHandlerAsync(context, scheme)

+

handler. InitializeAsync(scheme, context)

+

handler. AuthenticateAsync()

+

AuthenticationHandler<TOptions>.AuthenticateAsync()

+

ResolveTarget (Options. ForwardAuthenticate)

+

if forwarded:

Context. AuthenticateAsync(targetScheme)

else:

HandleAuthenticateOnceAsync()

+

concrete handler HandleAuthenticateAsy”-()
```

### R01-S002 / S-300 - `a82a739377`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: UseAuthentication / AuthenticationMiddleware entry point
- readability: `medium`

```text
So for cookie:

concrete handler

=

CookieAuthenticationHandler

For JWT:

concrete handler

=

JwtBearerHandler
```

### R01-S003 / S-020 - `17852964fb`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: AuthenticationMiddleware context and default-auth flow sketch
- readability: `medium`

```text
af

re

Oe

eS

Ne

_

oe

—

_

a

ae

af

_

public AuthenticationMiddleware(RequestDelegate next, IAuthenticationSchemeProvider schemes )

{

ArgumentNullException. ThrowIfNul1 (next) 5

ArgumentNul Exception. ThrowIfNull (schemes ) ;

=

next

=

next 5

Schemes = schemes;
```

### R01-S004 / S-001 - `66dd53e7f8`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: UseAuthentication / AuthenticationMiddleware entry point
- readability: `medium-high`

```text
2. Pipeline entry: what Useauthentication() actually adds

UseAuthentication() is tiny. It sets a marker and inserts |AuthenticationMiddleware into the pipeline.

Gattub

Real excerpt:

o CH

public static IApplicationBuilder UseAuthentication(this IApplicationBuilder app)

{

return app-UseMiddleware<AuthenticationMiddleware>();

That means the interesting logic is entirely inside |AuthenticationMiddleware.Invoke . citub ++
```

### R01-S005 / S-021 - `1a94998582`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: AuthenticationMiddleware context and default-auth flow sketch
- readability: `medium-high`

```text
_—

publi

c as

yne Task Invoke(HttpContext context)

{

context . Features .Set<IAuthenticationFeature>(new AuthenticationFeature

{

OriginalPath = context .Request.Path,

OriginalPathBase

=

=

context .Request.PathBase

5

// Give any IAuthenticationRequestHandler schemes a chance to handle the request

var handlers

=

=

context .RequestServices .GetRequiredService<IAuthenticationHandlerProvider>()5

foreach (var scheme in await Schemes .GetRequestHandlerSchemesAsync())

{

var handler

=

=

await handlers .GetHandlerAsync(context, scheme.Name) as IAuthenticationRequestHandler ;

if (handler != null && await handler .HandleRequestAsync())

{

return;
```

### R01-S006 / S-037 - `9860304323`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: special/request handlers and HandleRequestAsync short-circuit
- readability: `medium-high`

```text
What HandleRequestAsync() really means

TAuthenticationRequestHandler inherits from TAuthenticationHandler and adds one extra method:

HandleRequestAsync()). Microsoft's docs say this method determines whether the request should stop being

processed, and authentication middleware will not invoke later handlers or later middleware if the method

returns |true .

leammicrsoftc_ +1

So in normal language:

.

false) means: “I looked at the request, it is not mine, keep going.”

.

true means: “I handled this request; stop the normal flow here.”

team microsoft. +1

That “handled” result can mean many things depending on the concrete handler:

.

it may have issued a redirect

.

it may have written a response body

.

it may have completed a protocol callback

.

it may have failed the auth operation and already produced the response

The key point is that once it returns (Eaué), the auth middleware does not proceed to default authentication

for that request. teammicroson<_ +1
```

### R01-S007 / S-039 - `7d74582b40`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: special/request handlers and HandleRequestAsync short-circuit
- readability: `medium-high`

```text
Which handlers commonly use this model

Microsoft's API page for TAuthenticationRequestHandler lists derived types including NegotiateHandler

and RemoteAuthenticationHandler<TOptions> . That means this pattem is used by handlers involved in

negotiation-style flows and remote/external auth flows.

leammicrosof.<_

So the usual intuition is:

.

cookies/bearer are often your normal default authenticate schemes

.

remote/negotiation-oriented handlers are often the ones that need this “special request first” behavior

leammicrsoftc. +

I'm phrasing that carefully because the exact scheme setup depends on your app configuration, but the

framework design clearly puts remote and negotiate-style handlers in this request-handler category.

eam microsoftc_
```

### R01-S008 / S-035 - `98308754b2`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: special/request handlers and HandleRequestAsync short-circuit
- readability: `medium-high`

```text
What problem these special handlers solve

Most authentication handlers are used like this:

.

read cookie or token

.

validate it

.

create a user principal

.

return success/failure/no result

That is the normal “authenticate the request” model.

But some auth-related requests are different. They are not regular app requests where the framework just

needs to figure out who the user is. They are requests like:

.

an extemal login callback returning from Google/OpenID Connect

.

a negotiation/handshake request

.

another auth protocol endpoint that the handler itself must process

For those requests, the auth handler does not just want to say “here is a user.” It wants to say:

Gattub

“This request is specifically for me. Let me handle it completely.”

That is why | TAuthenticationRequestHandler exists. Microsoft describes it as being used to determine

whether a handler wants to participate in request processing, and its |HandleRequestAsync() decides

whether request processing should stop. —eammioson.
```

### R01-S009 / S-022 - `6b9e77f242`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: AuthenticationMiddleware context and default-auth flow sketch
- readability: `medium-high`

```text
var defaultAuthenticate

=

=

await Schemes .GetDefaultAuthenticateSchemeAsync()5

if (defaultAuthenticate != null)

{

var result

=

=

await context .AuthenticateAsync(defaultAuthenticate.Name) ;

if (result?.Principal != null)

{

context .User = result .Principal;

if (result?.Succeeded ?? false)

{

var authFeatures

=

=

new AuthenticationFeatures(result);

context .Features.Set<IHttpAuthenticationFeature>(authFeatures ) ;

context .Features.Set<IAuthenticateResultFeature>(authFeatures ) ;

}

await _next(context);
```

### R01-S010 / S-002 - `89edc9a877`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: UseAuthentication / AuthenticationMiddleware entry point
- readability: `medium-high`

```text
3. AuthenticationmMiddleware : first stop for each request

The middleware does three major things:

1. stores original path/pathbase in an auth feature,

2. gives request-handler schemes a chance to short-circuit,

3. tries the default authenticate scheme and sets | context-User

Grttab +1

The key real method is this one:

o CH

public async Task Invoke(HttpContext context)

Inside it, the first notable block is:

o CH

foreach (var scheme in await Schemes.GetRequestHandlerSchemesAsync())

{

var handler = await handlers.GetHandlerAsync(context, scheme.Name)

as TAuthenticationRequestHandler;

if (handler != null && await handler-HandleRequestAsync())

{

return;
```

### R01-S011 / S-038 - `00c04ce2d4`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: special/request handlers and HandleRequestAsync short-circuit
- readability: `medium-high`

```text
How this differs from normal AuthenticateAsync()

This is the most important distinction.

Normal authentication path

The framework wants to know who the user is.

It picks a scheme and calls AuthenticateAsync() .

Gath 31

That may produce a principal that gets put into HttpContext_User

Request-handler path

The framework is not yet trying to identify the user in the usual sense.

Itis first asking:

“Is this one of those requests that an auth handler must process directly?”

Gath 1

So request-handling is not just “early authentication.” It is a different responsibility:

.

normal auth path = user identification

.

request-handler path = auth-protocol request processing usb «1
```

### R01-S012 / S-036 - `dc7d9b7c5b`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: special/request handlers and HandleRequestAsync short-circuit
- readability: `medium-high`

```text
How ASP.NET Core knows which schemes are “special”

AuthenticationSchemeProvider stores all schemes, but it also keeps a separate list of request-handler

schemes. When a scheme is added, if its HandlerType implements | TAuthenticationRequestHandler , the

provider adds it to _requestHandlers . Later GetRequestHandlerSchemesAsync() returns that list in priority

order for request handling. aus

In plain English:

.

every scheme is registered normally

.

but some schemes get an extra label: “this one can directly handle requests”

.

authentication middleware asks for that special subset first wi ~

That is why not every scheme participates in this first phase. Only schemes whose handlers implement the

request-handler interface do. cei +1
```

### R01-S013 / S-003 - `e4a50dea2a`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: UseAuthentication / AuthenticationMiddleware entry point
- readability: `medium-high`

```text
That is why remote auth handlers can “take over” a callback endpoint and stop the rest of the middleware

Pipeline. TAuthenticationRequestHandler exists specifically for that purpose. — citiub -1

Then it resolves the default authenticate scheme:

ow CH

var defaultAuthenticate = await Schemes.GetDefaultAuthenticateSchemeAsync();

and, if found, it calls:

o CH

var result = await context. AuthenticateAsync(defaultAuthenticate.Name) ;
```

### R01-S014 / S-031 - `37383f13b0`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: AuthenticationMiddleware context and default-auth flow sketch
- readability: `medium`

```text
31

public static Task<AuthenticateResult> AuthenticateAsync(this HttpContext context, string? scheme) =

32

—

GetAuthenticationService(context)

(context, scheme);
```

### R01-S015 / S-030 - `6a9f996bc0`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: AuthenticationMiddleware context and default-auth flow sketch
- readability: `medium-high`

```text
415

as

cf.

mis project doesn ct rererence AUCNENTICATLONSEPVICELOLLECTLONEXTENSIONS .AGGAUTNeNTICation SO We

216

private static IAuthenticationService

(HttpContext context) =>

217

context .RequestServices .GetService<IAuthenticationService>() ??

218

throw new InvalidOperationException(Resources .FormatException_UnableToFindServices(

219

nameof(IAuthenticationService) ,

220

nameof (IServiceCollection),

221

“addAuthentication"))5

222

223
```

### R01-S016 / S-004 - `58d7299b32`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: UseAuthentication / AuthenticationMiddleware entry point
- readability: `medium`

```text
If authentication succeeds, the middleware does two important things:

.

context User = result.Principal;

.

stores the authenticate result into features for later consumers. Git»

So this middleware is mostly bootstrap + default principal population, not the full auth decision engine.

Gath 31

The actual scheme execution happens deeper.
```

### R01-S017 / S-032 - `b59d4d01b3`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: Auth service, scheme provider, handler provider flow diagram/code
- readability: `medium-high`

```text
fee

“eS

aye

3

public class AuthenticationSchemeProvider

IAuthenticationSchemeProvider

{

Mf

<summary>

Mf

Creates an instance of <see cref="AuthenticationSchemeProvider"/>

Mf

using the specified <paramref name="options"/>.

Mf

</summary>

Mf

<param name="options">The <see cref="AuthenticationOptions"/> options.</param>

public AuthenticationSchemeProvider(IOptions<AuthenticationOptions> options)

this(options, new Dictionary<string, AuthenticationScheme>(StringComparer .Ordinal))
```

### R01-S018 / S-034 - `891f8b55ef`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: Auth service, scheme provider, handler provider flow diagram/code
- readability: `low-or-code-fragment`

```text
[tiny/low-OCR code or diagram fragment; retained in coverage and source images]
```

### R01-S019 / S-029 - `22eac6fec2`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: AuthenticationMiddleware context and default-auth flow sketch
- readability: `medium-high`

```text
14

public class (AuthenticationSenvace)

IAuthenticationService

[5

{

16

private HashSet<ClaimsPrincipal>? _transformCache;

7

1S

Mf

<summary>

19

Mf

Constructor.

A)

Mf

</summary>

1

Mf

<param name="

schemes">The <see cref="IAuthenticationSchemeProvider"/>.</param>

2

handlers">The <see cref:

Mf

<param name

AuthenticationHandlerProvider"/>.</param>

3,

Mf

<param name

transform">The <see cre

IClaimsTransformation"/>.</param>

4,

Mf

<param name

options">The <see cref="AuthenticationOptions"/>.</param>

5,

public AuthenticationService(

6

TAuthenticationSchemeProvider schemes ,

7

TAuthenticationHandlerProvider handlers,

8

IClaimsTransformation transform,

a]

IOptions<AuthenticationOptions> options)

30

{

31

Schemes = schemes;

32.

Handlers = handlers;

33

Transform = transform;

=

=

34

Options

options . Value;

5
```

### R01-S020 / S-033 - `fbf77db651`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: Auth service, scheme provider, handler provider flow diagram/code
- readability: `medium-high`

```text
ALL Spal alll Nalle= SCHeMes 7INE GLCCLONANY MSeG LO StOre aU nent iCal lO SCHEMES -</ pal al

protected AuthenticationSchemeProvider(IOptions<AuthenticationOptions> options, IDictionary<string,

{

=

_options

=

options .Value;

_schemes

=

=

schemes ?? throw new ArgumentNullException(nameof( schemes )) ;

=

=

“requestHandlers

new List<AuthenticationScheme>() 5

foreach (var builder in _options.Schemes)

{

var scheme

=

=

builder .Build();

AddScheme( scheme) ;
```

### R01-S021 / S-005 - `280eabcaea`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: AuthenticationService.AuthenticateAsync and operation service methods
- readability: `medium-high`

```text
4. context .AuthenticateAsync() — AuthenticationService

When middleware or your own code calls ‘context. AuthenticateAsync(...) , it lands in

TAuthenticationService , whose default implementation is AuthenticationService . Microsoft's docs also

describe |TAuthenticationService as the component used by authentication middleware. — Microson team -1

Core method:

o CH

public virtual async Task<AuthenticateResult> AuthenticateAsync(

HttpContext context, string? scheme)

The logi

.

if no scheme was provided, ask the scheme provider for DefaultAuthenticateScheme ,

.

resolve a handler from ‘TAuthenticationHandlerProvider ,

.

call handler. AuthenticateAsync() ,

if successful, run |IClaimsTransformation ,

return a new |AuthenticationTicket -

atta
```

### R01-S022 / S-026 - `13f376afbf`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: Auth service, scheme provider, handler provider flow diagram/code
- readability: `medium-high`

```text
fff sbeturnseine resuit.</Precurns>

public virtual async Task<AuthenticateResult> AuthenticateAsync(HttpContext context, string? scheme)

{

if (scheme

null)

{

=

=

var defaultScheme

await Schemes .GetDefaultAuthenticateSchemeAsync() ;

scheme = defaultScheme?.Name;

if (scheme == null)

{

throw new InvalidOperationException($"No authenticationScheme was specified, and there was no De

7

var handler

=

=

await Handlers.GetHandlerAsync(context, scheme) ?? throw await CreateMissingHandlerExcept
```

### R01-S023 / S-024 - `9e4acf2aa3`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: Auth service, scheme provider, handler provider flow diagram/code
- readability: `medium-high`

```text
f

fon

are

TAuthenticationHandlerProvider

public class AuthenticationHandlerProvider

Q

{

4)

/// <summary>

/// Constructor.

7/1 </summary>

/// <param name:

chemes">The <see cref="IAuthenticationHandlerProvider"/>.</param>

public AuthenticationHandlerProvider(IAuthenticationSchemeProvider schemes )

{

Schemes = schemes;

7

/// <summary>

/// The <see cref="IAuthenticationHandlerProvider"/>.

7/1 </summary>

public IAuthenticationSchemeProvider Schemes { get; }

// handler instance cache, need to initialize once per request

private readonly Dictionary<string, IAuthenticationHandler> _handlerMap = new Dictionary<string, IAuthentica
```

### R01-S024 / S-006 - `b66210c4a8`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: AuthenticationService.AuthenticateAsync and operation service methods
- readability: `medium-high`

```text
Tiny real excerpts:

o CH

=

if (scheme

=

null)

{

var defaultScheme = await Schemes .GetDefaultAuthenticateSchemeAsync() ;

scheme = defaultScheme? Name;

o CH

var handler = await Handlers.GetHandlerAsync(context, scheme)

2? throw await CreateMissinglHandlerException( scheme);

o CH

var result = (await handler-AuthenticateAsync()) ?? AuthenticateResult.NoResult();

o CH

principal = await Transform.TransformAsync(principal);
```

### R01-S025 / S-027 - `812189a7c5`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: Auth service, scheme provider, handler provider flow diagram/code
- readability: `medium-high`

```text
// Handlers should not return null, but we'll be tolerant of null values for legacy reasons.

=

=

var result

(await handler .AuthenticateAsync()) ?? AuthenticateResult .NoResult();

if (result .Succeeded)

{

var principal = result .Principal!;

var doTransform

=

=

true;

_transformCache ??= []3

if (_transformCache.Contains( principal) )

{

doTransform = false;

if (doTransform)

{

=

=

principal

await Transform. TransformAsync( principal);

_transformCache.Add( principal);

return AuthenticateResult.Success(new AuthenticationTicket (principal, result .Properties, r

}

return result;
```

### R01-S026 / S-023 - `62f8e8d3d8`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: Auth service, scheme provider, handler provider flow diagram/code
- readability: `low-or-code-fragment`

```text
| TAuthenticationHandler>(StringComparer .Ordinal)
```

### R01-S027 / S-025 - `00de58172e`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: Auth service, scheme provider, handler provider flow diagram/code
- readability: `medium-high`

```text
36

/// <returns>The handler instance.</returns>

37

public async Task<IAuthenticationHandler?> GetHandlerAsync(HttpContext context, string authenticationSct

38

{

4)

39

if (_handlermap.TryGetValue(authenticationScheme, out var value))

40

{

41

return value;

42

43

=

44

var scheme

=

await Schemes .GetSchemeAsync(authenticationScheme) ;

45

if (scheme

null)

46

{

47

return null;

48

}

=

49

var handler

=

(context .RequestServices.GetService(scheme.HandlerType) ??

50

ActivatorUtilities.CreateInstance(context .RequestServices, scheme .HandlerType) )

51

as IAuthenticationHandler;

52

if (handler != null)

53

{

54

await handler .InitializeAsync(scheme, context);

55

_handlerMap[authenticationScheme] = handler;

56

}

57

return handler;

58

59
```

### R01-S028 / S-028 - `2033d2b11d`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: Auth service, scheme provider, handler provider flow diagram/code
- readability: `low-or-code-fragment`

```text
» result.Ticket! .AuthenticationScheme) );
```

### R01-S029 / S-007 - `93a6709164`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: AuthenticationService.AuthenticateAsync and operation service methods
- readability: `medium-high`

```text
Important detail: claims transformation is after handler authentication, not inside the handler base itself.

That often gets missed. cu

The same service also coordinates challenge/forbid/sign-in/sign-out:

.

ChallengeAsync() — resolve challenge scheme — |handler.ChallengeAsync (properties)

.

ForbidAsync() — resolve forbid scheme — handler. ForbidAsync (properties)

.

SignInAsync() /|SignOutAsync() require handlers that implement the sign-in/sign-out interfaces.

Gattut
```

### R01-S030 / S-008 - `17926e5788`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: AuthenticationSchemeProvider defaults and fallback scheme resolution
- readability: `medium-high`

```text
5. AuthenticationSchemeProvider : where defaults and schemes come from

Ascheme is a small metadata object:

o CH

public class AuthenticationScheme

with:

.

Name

.

DisplayName

.

HandlerType

Gattut

Real excerpt:

o CH

public

string Name { get; }

public

string? DisplayName { get; }

public

Type HandlerType { get; }

AuthenticationSchemeProvider owns the scheme table and all default resolution rules. cua
```

### R01-S031 / S-009 - `a0fbfd24c7`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: AuthenticationSchemeProvider defaults and fallback scheme resolution
- readability: `medium`

```text
The default methods are basically:

o CH

GetDefaul tAuthenticateSchemeAsync()

GetDefaultChal lengeSchemeAsync()

GetDefaultForbidSchemeAsync()

GetDefaultSignInSchemeAsync()

GetDefaultSignOutSchemeAsync()
```

### R01-S032 / S-010 - `5b3dd95c3d`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: AuthenticationSchemeProvider defaults and fallback scheme resolution
- readability: `medium-high`

```text
and their fallback behavior is encoded directly in the class:

.

authenticate + DefaultAuthenticateScheme else | DefaultScheme

.

challenge > DefaultChallengeScheme else DefaultScheme

.

forbid — \DefaultForbidScheme else challenge default

.

sign-in + DefaultSigninScheme else DefaultScheme

.

sign-out — |DefaultSignOutScheme else sign-in default.

cats

This is one of the most important parts to understand multiple-scheme apps: scheme selection is

centralized here, not in middleware or in the handler.

Gata

Another subtle point: the provider separately tracks request-handler schemes. When a scheme’s handler

type implements TAuthenticationRequestHandler , TryAddScheme adds it into |_requestHandlers ; later

middleware enumerates those first. cttus -1
```

### R01-S033 / S-011 - `5aef5dde78`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: AuthenticationHandlerProvider and handler initialization/cache
- readability: `medium-high`

```text
6. AuthenticationHandlerProvider : how the framework gets the handler instance

Once a scheme name is known, |AuthenticationService asks |TAuthenticationtandlerProvider for the

handler instance. The default provider is scoped per request and caches handlers in a dictionary. Gun -1

Core method:

o CH

public async Task<IAuthenticationHandler?> GetHandlerAsync(

HttpContext context, string authenticationScheme)
```

### R01-S034 / S-012 - `e4cb6f9991`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: AuthenticationHandlerProvider and handler initialization/cache
- readability: `medium`

```text
Its logic is:

1.

check per-request |_handlerMap .

2.

ask scheme provider for the scheme,

3.

create handler from DI or ActivatorUtilities ,

call InitializeAsync(scheme, context) ,

5.

cache and return it.

atta

Tiny real excerpts:

o CH

if (_handlerMap.TryGetValue(authenticationScheme, out var value))

{

return value;
```

### R01-S035 / S-013 - `85c44f86bd`

- subregion: `R01A-base-middleware-auth-service-handlers`
- theme: AuthenticationHandlerProvider and handler initialization/cache
- readability: `medium-high`

```text
o CH

var scheme = await Schemes.GetSchemeAsync(authenticationScheme)

o CH

var handler = (context -RequestServices.GetService(scheme-HandlerType)

?

ActivatorUtilities.CreateInstance(.

)) as TAuthenticationHandler;

o CH

await handler.InitializeAsync(scheme, context);

This means the handler instance is created lazily only when that scheme is actually used on the request.

GitHub
```

### R01-S036 / S-014 - `bc639a8620`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: forwarding/challenge/forbid basics
- readability: `medium-high`

```text
7. AuthenticationHandler<Toptions> : the base class most handlers inherit from

This is the most important class to study if you want to understand “where auth really happens." It is the

base for many built-in handlers and for most custom handlers. avi»

The key members it owns are:

Scheme

Options

Context

Request

Response

Events

TimeProvider

cats

authenticate caching via |_authenticateTask
```

### R01-S037 / S-043 - `6d3e5555d8`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: Forwarding internals: ResolveTarget, InitializeAsync, ForwardAuthenticate
- readability: `medium-high`

```text
146

/ <returns></returns>

147

public async Task InitializeAsync(AuthenticationScheme scheme, HttpContext context)

148

{

149

ArgumentNullException. ThrowIfNull( scheme) ;

150

ArgumentNullException. ThrowIfNul1( context) 5

151

152

Scheme

scheme;

153

Context

context ;

154

=

155

Options

=

OptionsMonitor.Get(Scheme.Name) 5

156

157

TimeProvider = Options.TimeProvider ?? TimeProvider.System;

158

#pragma

warning disable CS@618 // Type or member is obsolete

159

Clock = TimeProvider == TimeProvider.System ? SystemClock.Default

new SystemClock(TimeProvider);

160

#pragma

warning restore CS@618 // Type or member is obsolete

161

162

await InitializeEventsAsync();

163

await InitializeHandlerAsync();

164

}

165
```

### R01-S038 / S-015 - `032da4b0a7`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: forwarding/challenge/forbid basics
- readability: `medium-high`

```text
7.1 Initial

ition

When the provider creates the handler, it immediately calls:

o CH

public async Task InitializeAsync(AuthenticationScheme scheme, HttpContext context)

Inside, the framework does:

o CH

Scheme = scheme;

Context = context;

Options = OptionsMonitor.Get (Scheme.Name) ;

-

await InitializeEventsAsync();

await InitializeHandlerAsync();

So per-scheme named options are resolved here, not at registration time. This is why one handler type can

back multiple named schemes with different settings.

Gath
```

### R01-S039 / S-044 - `dbbe2cc3d5`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: Forwarding internals: ResolveTarget, InitializeAsync, ForwardAuthenticate
- readability: `medium-high`

```text
Handler instance

A per-request object created for one scheme on one request. citius «1

So you can have this setup conceptually:

o CH

-AddCookie("Cookies", o => { -.. })

-AddCookie("

minCookies", o

-v

-AddCookie("MFaCookies", o => { -.. })

Even though those are three schemes, they can all use the same handler class. The difference is that each

scheme name has different named options, and during (TnitializeAsyne) the handler loads the right options

for the specific scheme it is currently serving. _ouws -2
```

### R01-S040 / S-016 - `01b1ddd76c`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: forwarding/challenge/forbid basics
- readability: `medium`

```text
72 Authenticate path

The base implementation of |AuthenticateAsync() is cru

o CH

public async Task<AuthenticateResult> AuthenticateAsync()

Its structure

1.

maybe forward to another scheme,

2.

otherwise call |HandleAuthenticateOnceAsync() .

3.

log success/failure,

retum the result.

Gata
```

### R01-S041 / S-042 - `e4b5c4c722`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: Forwarding internals: ResolveTarget, InitializeAsync, ForwardAuthenticate
- readability: `medium-high`

```text
203

/// <returns>The forwarded scheme or <see langword="“null"/>.</returns>

204

protected virtual string? ResolveTarget(string? scheme)

205

{

206

var target

=

=

scheme ?? Options. ForwardDefaultSelector?.Invoke(Context) ?? Options. ForwardDefault;

207

208

/ Prevent self targeting

209

return string.Equals(target, Scheme.Name, StringComparison.Ordinal)

210

? null

211

target;

212

213
```

### R01-S042 / S-017 - `b26255cf0c`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: forwarding/challenge/forbid basics
- readability: `medium-high`

```text
in

O_O

Real excerpts:

wo CH

var target = ResolveTarget(Options.ForwardAuthenticate) ;

if (target != null)

{

return await Context. AuthenticateAsync(target);

wo CH

var result = await HandleAuthenticateOnceAsync() ?? AuthenticateResult.NoResult();

wo CH

oO

protected abstract Task<AuthenticateResult> HandleAuthenticateAsync();

Konmposare

That last line is the big one: your actual scheme-specific auth logic lives in HandleAuthenticateAsync() -

The base class handles initialization, forwarding, caching, and logging around it css

kL
```

### R01-S043 / S-045 - `e9282024a0`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: Forwarding internals: ResolveTarget, InitializeAsync, ForwardAuthenticate
- readability: `medium-high`

```text
5. What ResolveTarget does

ResolveTarget is the method that decides whether the current scheme should handle the operation itself

or forward the operation to another scheme. The real base-class code is essentially:

o CH

o

var target = scheme

2? Options. ForwardDefaultSelector? . Invoke(Context)

2? Options. ForwardDefault;

// Prevent self targeting

return string-Equals(target, Scheme.Name, StringComparison.Ordinal) ? null

target;
```

### R01-S044 / S-065 - `f73a2ce705`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: challenge/forbid/sign-in/sign-out basics and handler interfaces
- readability: `medium-high`

```text
2. The intended flow

Step 1: someone asks the handler to authenticate

That usually happens through the base |AuthenticateAsync() method. Before doing the real auth work, the

handler checks whether authentication should be forwarded to another scheme using

ResolveTarget (Options. ForwardAuthenticate) . If forwarding applies, it delegates to

Context _AuthenticateAsync(target) and stops there. Otherwise it continues into

GitHub

HandleAuthenticateOnceAsync() -

Step 2: first call enters HandleAuthenticateOnceAsync()

On the first call, _authenticateTask is null, so the method sets:

.

_authenticateTask = HandleAuthenticateAsync()

GitHub

This starts the scheme-specific authentication operation.
```

### R01-S045 / S-041 - `1a2da7a93a`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: Forwarding internals: ResolveTarget, InitializeAsync, ForwardAuthenticate
- readability: `medium`

```text
215

public async Task<AuthenticateResult> AuthenticateAsync()

216

{

217

var target

ReSolveTarget (Options. ForwardAuthenticate) ;

218

if (target != null)

219

{

220

return await Context.AuthenticateAsync(target) ;

221

499
```

### R01-S046 / S-018 - `b0f809d46d`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: forwarding/challenge/forbid basics
- readability: `medium-high`

```text
~

7.3 Why auth only runs once

The base class memoizes authentication:

wo CH

protected Task<AuthenticateResult> HandleAuthenticateOnceAsync()

{

=

if (_authenticateTask

=

null)

{

_authenticateTask = HandleAuthenticateAsync();

t

return _authenticateTask;

So multiple calls to (AuthenticateAsyne()) on the same handler reuse the same result for that request.

Gattut
```

### R01-S047 / S-046 - `7bf4e4f0ed`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: Forwarding internals: ResolveTarget, InitializeAsync, ForwardAuthenticate
- readability: `medium-high`

```text
So it looks at three things in order:

1. the operation-specific forwarding setting passed in, such as |ForwardAuthenticate

2. if that is null, ForwardDefaultSelector

3. if that is null, ForwardDefault

Then it refuses to forward to the same scheme name, because that would loop back to itself.

Gath <2

In plain language:

“Do | have a specific instruction for this operation?”

“If not, do | have a dynamic rule based on the request?”

“If not, do | have a general fallback forwarding target?”

.

“If the answer points back to me, ignore it”

ati 1
```

### R01-S048 / S-040 - `0f9ebbfa70`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: Forwarding internals: ResolveTarget, InitializeAsync, ForwardAuthenticate
- readability: `medium-high`

```text
£2e

223

// Calling Authenticate more than once should always return the original value.

224

var result

=

=

await HandleAuthenticateOnceAsync() ?? AuthenticateResult.NoResult();

225

if (result. Failure

null)

q

226

{

227

var ticket

=

=

result .Ticket;

228

if (ticket?.Principal != null)

229

{

230

Logger . AuthenticationSchemeAuthenticated(Scheme.Name) ;

231

232

else

233

{

234

Logger .AuthenticationSchemeNotAuthenticated(Scheme.Name) ;

235

236

}

237

else

238

{

239

Logger . AuthenticationSchemeNotAuthenticatedwWithFailure(Scheme.Name, result .Failure.Message) ;

240

}

241

return result;

242

}

4A
```

### R01-S049 / S-066 - `c81cdbac8c`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: challenge/forbid/sign-in/sign-out basics and handler interfaces
- readability: `medium-high`

```text
Step 3: real scheme-specific authentication runs once

HandleAuthenticateAsync() is the handler-specific method. For example, a concrete handler may:

.

read a cookie

.

decrypt or validate a ticket

.

read the Authorization header

.

validate a JWT

.

GitHub +1

build a ClaimsPrincipal

Step 4: later calls reuse the same task

If something asks for authentication again during the same request and for the same handler instance,

_authenticateTask is already set, so HandleAuthenticateOnceAsync() just returns that same task. Gttub

That is the intended flow.

dL
```

### R01-S050 / S-019 - `6a5fb74ed6`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: forwarding/challenge/forbid basics
- readability: `medium-high`

```text
74 Challenge/forbid path

Base defaults are simple:

o CH

protected virtual Task HandleChallengeAsync(AuthenticationProperties properties)

{

Response.StatusCode = 401;

o CH

protected virtual Task HandleForbiddenAsync(AuthenticationProperties properties)

{

Response.StatusCode = 403;

But many real handlers override these. Cookie auth often redirects on challenge; bearer often writes |WHW-

Authenticate . The base class also supports forwarding here using |ForwardChallenge / ForwardForbid -

Gattu 1
```

### R01-S051 / S-047 - `26bd56b543`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: Forwarding concept and policy scheme motivation
- readability: `medium-high`

```text
6. Forwarding: what it means conceptually

Forwarding means that a scheme can act like an alias, router, or front door for another scheme. Instead of

handling the operation itself, it passes it on.

For example, in AuthenticateAsync() the base handler first does:

.

resolve target from Options. ForwardAuthenticate

.

if target is not null, call Context AuthenticateAsync(target)

So yes, calling AuthenticateAsync("SchemeA") may actually result in AuthenticateAsync("SchemeB") .

GitHub +2
```

### R01-S052 / S-067 - `316ddefb1c`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: challenge/forbid/sign-in/sign-out basics and handler interfaces
- readability: `medium-high`

```text
3. Why the framework wants this

The source code comment says:

“Calling Authenticate more than once should always retum the original value.”

GitHub

and also says HandleAuthenticateOnceAsync() is:

“Used to ensure HandleAuthenticateAsync is only invoked once.”

GitHub

So the framework’s intention is very clear:

.

one handler

.

one request

.

one actual authenticate operation

.

one stable result reused everywhere on that request — satu

That makes the handler behavior deterministic and avoids repeated work.
```

### R01-S053 / S-048 - `83fa587b79`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: Forwarding concept and policy scheme motivation
- readability: `medium`

```text
GitHub +2

This same idea exists for other operations too:

ForwardChallenge

ForwardForbid

ForwardSignin

ForwardSignOut

and the catch-all ForwardDefault / ForwardDefaultSelector

leammicrosoftic. +2
```

### R01-S054 / S-064 - `01e496352b`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: challenge/forbid/sign-in/sign-out basics and handler interfaces
- readability: `medium-high`

```text
9. How you set these properties

You set them on the options object of a scheme that derives from AuthenticationSchemeOptions - In

practice, the cleanest place is usually:

.

inside AddPolicyScheme(...)

.

or inside a scheme’s options configuration if that scheme supports it

The common pattem is:

“” C#

-AddPolicyScheme("MyScheme", null, options =>

{

options

-ForwardAuthenticate =

options

-ForwardChallenge = "

options

-ForwardDefault = ".

"

>

-ForwardDefaultSelector = context => "

options

ns

Policy-scheme docs describe this as the intended way to have a single logical scheme use multiple

approaches and forward dynamically based on the request. teammicosof<. +1
```

### R01-S055 / S-053 - `2c8374473c`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: Forward options examples: cookies, OIDC challenge, selector/default priority
- readability: `medium-high`

```text
2. The order ASP.NET Core uses

ASP.NET Core’s forwarding logic checks in this order:

1. the most specific setting for the operation, such as | ForwardAuthenticate

2. then ForwardDefaultSelector

3. then ForwardDefault

Jeammicrosoftc_. +2

The first non-null target wins.

So if you set:

~ C#

options .ForwardAuthenticate = "Bearer";

=

=

options .ForwardDefault

"Cookies";

then AuthenticateAsync() goes to “Bearer”, not “Cookies” , because the operation-specific rule is more

specific. teammicosor< +1
```

### R01-S056 / S-050 - `e1e147a2c9`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: Forward options examples: cookies, OIDC challenge, selector/default priority
- readability: `medium`

```text
8. Example: different authenticate and challenge schemes

This is another very common pattern.

You want:

.

authenticate with cookies for normal requests

.

challenge with OpenID Connect when login is needed
```

### R01-S057 / S-049 - `9ad22b4441`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: Forwarding concept and policy scheme motivation
- readability: `medium-high`

```text
8. Why ASP.NET Core supports this

Because apps often need a single logical scheme name while internally choosing between several real

mechanisms.

Typical examples:

browser requests use cookies

API requests use bearer tokens

challenges redirect to an external identity provider

different routes or request shapes need different auth handlers —teammicosonc. +1

Forwarding lets you say:

.

“When authenticating, use cookies.”

.

“When challenging, use OIDC.”

.

“When request has Authorization: Bearer , use bearer.”

.

learmmicrosoftc_ +2

“Otherwise use cookies.”

That is why policy schemes exist: one logical entry point, potentially several underlying schemes.

leammicrosoftc_
```

### R01-S058 / S-051 - `235b87f544`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: Forward options examples: cookies, OIDC challenge, selector/default priority
- readability: `medium-high`

```text
” C#

builder Services

-AddAuthentication(options =>

{

options .DefaultScheme = “AppAuth";

options .DefaultChallengeScheme = “AppAuth";

vn

-AddCookie("Cookies")

-AddOpenTdConnect (“oidc", options =>

{

options-Authority = "https://login.example";

options.ClientId = “client-id";

options.ClientSecret = “client-secret";

2)

-AddPolicyScheme("AppAuth", displayName: null, options =>

{

=

options . ForwardAuthenticate

=

"Cookies";

=

=

options . ForwardChal lenge

“oidc";

options .ForwardSignOut = “oidc";

ns
```

### R01-S059 / S-054 - `122657f18c`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: Forward options examples: cookies, OIDC challenge, selector/default priority
- readability: `medium-high`

```text
3. ForwardAuthenticate

What it means

This property says:

“When someone calls AuthenticateAsync on this scheme, forward that authenticate operation to

another scheme.”

Microsoft's API docs describe the related forwarding behavior as operation-specific forwarding, with

authenticate being one of the specific operations checked before selector/default fallback. teammicoson<_ -1

When to use it

Use it when you want a logical scheme name, but the real identity should come from another scheme.

Typical pattern:

.

logical scheme: "AppAuth™

.

actual authenticate scheme: “Cookies” or “Bearer™ depending on your design
```

### R01-S060 / S-052 - `fa53e80e0f`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: Forward options examples: cookies, OIDC challenge, selector/default priority
- readability: `medium-high`

```text
et

What this means:

e

when app needs to identify current user > use cookies

¢ when unauthenticated user hits [Authorize] and needs login — challenge via OIDC redirect

© when user signs out — use OIDC sign-out flow

Microsoft's policy-schemes docs explicitly describe scenarios like using Google/OpenID Connect for

challenges and cookies for everything else. teammicsor<_ +1
```

### R01-S061 / S-055 - `7fa89ef5e5`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: Forward options examples: cookies, OIDC challenge, selector/default priority
- readability: `medium-high`

```text
Example: wrapper scheme forwarding authenticate to cookies

“ C#

builder Services

-AddAuthentication(options =>

{

options.DefaultScheme = "AppAuth";

vn

-AddCookie("Cookies", options =>

{

options.LoginPath = "/account/login";

vn

-AddPolicyScheme("AppAuth", displayName: null, options =>

{

=

=

options .ForwardAuthenticate

"Cookies";

Ds

1
```

### R01-S062 / S-056 - `c5dcceefc7`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: ForwardDefault / ForwardDefaultSelector / challenge/forbid/sign-in/out routing
- readability: `medium-high`

```text
What happens:

.

app asks to authenticate using | “AppAuth™

.

“AppAuth" does not identify the user itself

.

it forwards authentication to |"Cookies™

.

cookie auth reads the cookie and creates the principal

Jeammicrosoftc__ +1

Real situation/pattern

This is useful when:

.

your app wants one public scheme name

.

but you want freedom to change the real authenticate backend later

.

or you want different forwarding rules for authenticate vs challenge
```

### R01-S063 / S-068 - `6c318526f7`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: challenge/forbid/sign-in/sign-out basics and handler interfaces
- readability: `medium`

```text
1. Challenge path

What Challenge means in plain language

A challenge says:

“You are not authenticated enough for this resource. Go authenticate.”

Typical outcomes are:

.

491 Unauthorized

e

redirect to login page

.

redirect to external identity provider

.

Whbl-Authenticate header for bearer auth. teammicosot_ +1
```

### R01-S064 / S-059 - `a7573207ec`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: ForwardDefault / ForwardDefaultSelector / challenge/forbid/sign-in/out routing
- readability: `medium-high`

```text
5. ForwardDefaultSelector — dynamic rule based on the request

What it means

This is a function that runs per request and returns the target scheme name.

Microsoft's docs say it is used to select a default scheme for the current request that handlers should

forward operations to by default. It is checked after operation-specific settings and before ForwardDefault

leammicrosoftc_ +1

So it lets you do:

.

browser page request — cookies

e

API request with bearer token — JWT bearer

e

certain path prefix — different scheme
```

### R01-S065 / S-069 - `8a3581cd7a`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: challenge/forbid/sign-in/sign-out basics and handler interfaces
- readability: `medium-high`

```text
Where it starts

Usually authorization decides a request should be challenged. The docs describe

TAuthorizationMiddlewareResultHandler as the place that customizes default challenge/forbid behavior,

which tells you that this is the stage where those outcomes are handled. — teammicoson<_

The practical flow is:

1.

endpoint/policy requires auth

2.

authorization evaluates the request

3.

result is “challenged”

4.

framework calls | context .ChallengeAsync(..-)

5.

that goes into AuthenticationService.ChallengeAsync(...)

6.

handler for the chosen scheme runs ChallengeAsync .

leammicrosoftc +1
```

### R01-S066 / S-060 - `3ea97a6f06`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: ForwardDefault / ForwardDefaultSelector / challenge/forbid/sign-in/out routing
- readability: `medium`

```text
When to use it

Use it when the correct auth mechanism depends on request details.

Typical patterns:

header presence

path prefix like /api

hostname / tenant

route family

content type or endpoint style
```

### R01-S067 / S-070 - `2242ba256c`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: challenge/forbid/sign-in/sign-out basics and handler interfaces
- readability: `medium-high`

```text
Real framework code: AuthenticationService.ChallengeAsync

This is the core service method:

“” C#

public virtual async Task ChallengeAsync(

HttpContext context, string? scheme, AuthenticationProperties? properties)

The important real logic is:

” C#

if (scheme == null)

{

var defaultChallengeScheme = await Schemes.GetDefaultChallengeSchemeAsync();

scheme = defaultChallengeScheme? .Name;

hoa,
```

### R01-S068 / S-061 - `a6b0f6dd9c`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: ForwardDefault / ForwardDefaultSelector / challenge/forbid/sign-in/out routing
- readability: `medium-high`

```text
6. Example: cookies for browser, bearer for API

This is the classic pattern.

“” CH

builder Services

-AddAuthentication(options =>

{

options .DefaultScheme = "Smart";

=

=

options .DefaultChal lengeScheme

"Smart";

nv

-AddCookie("Cookies", options =>

{

options-.LoginPath = “/account/login";

vn

-AddJwtBearer("Bearer", options =>

{

options Authority = “https://issuer.example";

options-Audience = "api";

yn

ae

a

Ao

-

_

—
```

### R01-S069 / S-071 - `2419f879a6`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: challenge/forbid/sign-in/sign-out basics and handler interfaces
- readability: `medium`

```text
then:

” CH

var handler = await Handlers-GetHandlerAsync(context, scheme)

and finally:

~ C#

await handler.ChallengeAsync(properties) ;

So in normal language:

e

pick the explicit or default challenge scheme

e

get the handler for that scheme

.

tell the handler: “perform your challenge behavior now.”
```

### R01-S070 / S-062 - `def20ab986`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: ForwardDefault / ForwardDefaultSelector / challenge/forbid/sign-in/out routing
- readability: `medium`

```text
vn

-AddPolicyScheme("Smart", displayName: null, options =>

{

options .ForwardDefaultSelector = context =>

{

var authHeader = context.Request .Headers Authorization. ToString();

if (!string.IsNull0OrEmpty(authHeader) &&

authHeader.StartsWith("Bearer ", StringComparison-OrdinalIgnoreCase) )

return "Bearer";

return "Cookies";

3

ns

—
```

### R01-S071 / S-072 - `4b6e014024`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: challenge/forbid/sign-in/sign-out basics and handler interfaces
- readability: `medium-high`

```text
Real framework code: base handler side

Inside AuthenticationHandler<TOptions> , the public ChallengeAsync is the wrapper. It first checks

forwarding and otherwise falls through to the protected virtual |HandleChallengeAsync(...) . The base-class

docs describe this override point as the place to handle 401 challenge concerns, such as adding a response

header or changing 401 into a 302 redirect to login.

leam microsoft.

The default behavior is very simple: if a handler does not override it, the base challenge behavior is basically

“set 401."

leam microsoft.

So the model is:

ChallengeAsync = public framework entry point

HandleChallengeAsync = handler-specific implementation point

default base behavior = 401

concrete handlers often override it to redirect or add headers. teammicoson_ +1
```

### R01-S072 / S-063 - `1e0669cc32`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: ForwardDefault / ForwardDefaultSelector / challenge/forbid/sign-in/out routing
- readability: `medium-high`

```text
What happens:

.

request has Authorization: Bearer ... — “Smart™ forwards to “Bearer™

.

normal browser request with cookie > |“Smart™ forwards to | “Cookies”

leammicrosoft.c_ +1

Real situation/pattern

This is common in apps that serve:

.

MVC / Razor pages for browsers

.

API endpoints for JavaScript/mobile clients

Microsoft explicitly mentions SPA-style or mixed-auth scenarios where cookies and JWT bearer are both

COMMON. — teammicosoft._

LL
```

### R01-S073 / S-057 - `d5d0ee5b62`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: ForwardDefault / ForwardDefaultSelector / challenge/forbid/sign-in/out routing
- readability: `medium-high`

```text
4. ForwardDefault

What it means

This property says:

“If there is no more specific forwarding rule, send auth operations to this scheme by default.”

Microsoft's docs say ForwardDefault specifies a default scheme that handlers should forward all

authentication operations to by default. teammicosonc_ +1

When to use it

Use it when one scheme is mostly just a pass-through alias to another scheme.

Example: send everything to cookies by default

“ C#

builder .Services

-AddAuthentication(options =>

{

options.DefaultScheme = "AppAuth";

vn

-AddCookie("Cookies")

-AddPolicyScheme("AppAuth", displayName

null, options =>

{

options .ForwardDefault = "Cookies";

yn;

v
```

### R01-S074 / S-088 - `03eff36184`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: default forbid scheme and sign-in/out handler tail
- readability: `medium-high`

```text
1. Why does DefaultForbidScheme exist if forbid feels like a continuation of

authentication?

Short answer

Because forbid is a separate operation, not “step 2 of authenticate.” Authentication answers “who are you?”

Authorization answers “are you allowed?" If the answer is “no, but you are authenticated,” ASP.NET Core

performs a forbid operation, and that operation can be handled by whichever scheme is configured to

generate the right response. tesmmicwsotc_ +1
```

### R01-S075 / S-073 - `19593eecf4`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: challenge/forbid/sign-in/sign-out basics and handler interfaces
- readability: `medium`

```text
2. Forbid path

What Forbid means in plain language

A forbid says:

“I know who you are, but you still cannot do this.”

Typical outcomes are:

.

403 Forbidden

.

redirect to access-denied page in cookie apps. teammiaosonc_ +1
```

### R01-S076 / S-089 - `92c830f8b1`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: default forbid scheme and sign-in/out handler tail
- readability: `medium-high`

```text
The key idea: decision vs response

There are really two separate things happening:

A. The app decides that the request should be forbidden

That typically happens because authorization evaluated the current user and found they do not satisfy the

policy. The docs for ForbidAsyne describe forbid as the thing used when an authenticated user tries to

lear microsoft +1

access a resource they are not permitted to access.

B. A scheme then generates the actual HTTP response

That response might be:

.

plain 493

.

redirect to an access-denied page

.

some other scheme-specific behavior

That is why ASP.NET Core has a separate forbid scheme resolution path. The framework is not assuming the

same scheme that authenticated must also own the forbid response behavior.

Jeam microsoft. +1
```

### R01-S077 / S-058 - `76f00eca1a`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: ForwardDefault / ForwardDefaultSelector / challenge/forbid/sign-in/out routing
- readability: `medium-high`

```text
What this means:

.

AuthenticateAsync("AppAuth") — forwarded to “Cookies™

.

ChallengeAsync("AppAuth") — forwarded to | "Cookies™

.

ForbidAsync("AppAuth") — forwarded to “Cookies

Jeam microsoft. +1

unless a more specific forward setting overrides one of those.

Real situation/pattern

This is useful when:

* you want one stable scheme name in your app

.

but the actual implementation is another scheme

.

you do not need per-operation differences

Think of it as:

.

ForwardDefault = broad fallback

.

ForwardAuthenticate = special case override for auth only
```

### R01-S078 / S-074 - `40a8739342`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: challenge/forbid/sign-in/sign-out basics and handler interfaces
- readability: `medium`

```text
Where it starts

Again, authorization usually decides this. The high-level rule is:

.

unauthenticated or insufficient authentication — challenge

e

authenticated but not authorized — forbid. teammicsore<_ +1

Then the framework calls _context-ForbidAsync(.-.-) , which routes into

AuthenticationService.ForbidAsync(..-)

GitHub
```

### R01-S079 / S-075 - `9ba12d337f`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: challenge/forbid/sign-in/sign-out basics and handler interfaces
- readability: `medium-high`

```text
Real framework code: AuthenticationService.ForbidAsync

This method mirrors challenge closely:

“> CH

public virtual async Task ForbidAsync(

HttpContext context, string? scheme, AuthenticationProperties? properties)

Important real logic

“” CH

if (scheme == null)

{

var defaultForbidScheme = await Schemes-GetDefaultForbidSchemeAsync() ;

scheme = defaultForbidScheme? .Name;
```

### R01-S080 / S-090 - `5dbfd3f21c`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: default forbid scheme and sign-in/out handler tail
- readability: `medium-high`

```text
Why this makes sense in real apps

Imagine these setups:

Case 1: Cookie-authenticated browser app

The user was authenticated by cookies. When they lack permission, you may want cookie auth’s forbid

behavior, which is often web-UI oriented, such as access-denied handling. Cookie-auth docs note behavior

differences for redirects vs status codes depending on endpoint type, and API endpoints in newer ASP.NET

Core versions return 401/403 instead of login redirects. teammicosotic_ +1

Case 2: Logical “app auth” scheme that routes operations

Your app may expose one logical scheme name while forwarding different operations to different real

schemes. Policy schemes exist specifically so one logical scheme can use one scheme for challenges and

another for “everything else,” or forward based on the request. teammicroson_

Case 3: Mixed scheme environment

One scheme may authenticate the request, but a different scheme may be responsible for how

forbid/challenge should be expressed to the client. That is exactly the kind of separation policy schemes

were designed to support. — teammicrosofic_ +1

So DefaultForbidScheme exists because “who proved identity?” and “who should shape the 403

behavior?” are related, but not always the same concer. —teammiaosoftc_ +1
```

### R01-S081 / S-076 - `b4143ba0b2`

- subregion: `R01B-forwarding-challenge-forbid-basics`
- theme: challenge/forbid/sign-in/sign-out basics and handler interfaces
- readability: `medium`

```text
then:

“” CH

var handler = await Handlers.GetHandlerAsync(context, scheme)

and:

“> CH

await handler.ForbidAsync(properties) ;

So the service does exactly the same orchestration pattern as challenge:

e

resolve scheme

.

resolve handler

.

delegate operation to handler. citub
```

---

## 3. Cleaned source notes

- `UseAuthentication()` inserts `AuthenticationMiddleware`; it is not itself the full authentication decision engine.
- `AuthenticationMiddleware.Invoke` is the per-request entry point: it sets auth features, lets request-handler schemes short-circuit, and then tries the default authenticate scheme.
- `IAuthenticationRequestHandler`/special handlers can handle callback-like endpoints before the rest of the pipeline continues.
- `HttpContext.AuthenticateAsync(...)` flows into `AuthenticationService.AuthenticateAsync`.
- If no scheme is supplied, `AuthenticationService` asks the scheme provider for the default authenticate scheme.
- `AuthenticationService` asks `IAuthenticationHandlerProvider` for a handler instance, calls handler `AuthenticateAsync`, and then applies claims transformation.
- `AuthenticationSchemeProvider` owns registered schemes and default scheme resolution rules.
- Default authenticate/challenge/forbid/sign-in/sign-out schemes have fallbacks; for example forbid can fall back to challenge default, and sign-out can fall back to sign-in default.
- `AuthenticationHandlerProvider` creates/caches handler instances per request and initializes them with scheme/context/options/events.
- Forwarding lets a scheme route operations to another scheme through `ForwardAuthenticate`, `ForwardChallenge`, `ForwardForbid`, `ForwardSignIn`, `ForwardSignOut`, `ForwardDefaultSelector`, and `ForwardDefault`.
- `ResolveTarget` chooses operation-specific forwarding first, then selector, then default, and avoids forwarding to itself.
- Policy schemes provide one logical scheme name that can route to cookies, bearer, OIDC, or other schemes based on operation/request.
- Challenge/forbid/sign-in/sign-out are separate operations from authenticate and may use different handlers/schemes.

---

## 4. Evidence table

| Claim | Evidence sources | Confidence |
|---|---|---|
| UseAuthentication is a small middleware insertion point | S-001, S-299, S-300 | high |
| AuthenticationMiddleware processes request-handler schemes before default authentication | S-002, S-003, S-035-S039 | high |
| Default authenticate scheme leads to context.AuthenticateAsync and principal population | S-003, S-004, S-020-S022, S-029-S031 | high |
| AuthenticationService resolves scheme, handler, AuthenticateAsync, and claims transformation | S-005-S007, S-026-S028 | high |
| AuthenticationSchemeProvider owns scheme metadata and default fallback rules | S-008-S010, S-032-S034 | high |
| HandlerProvider creates/caches per-request handler instances and initializes them | S-011-S013, S-023-S025, S-043-S044 | high |
| Forwarding checks operation-specific target, selector, and default, with self-target prevention | S-040-S046, S-053-S056, S-059-S064 | high |
| Forwarding supports logical scheme routing: cookies for authenticate, OIDC for challenge/signout, bearer for API | S-047-S052 | high |
| Challenge/forbid and sign-in/out are separate auth operations and may have different defaults/handlers | S-057-S076, S-088-S090 | medium-high |

---

## 5. Question hooks

- What does `UseAuthentication()` actually add to the pipeline?
- Why can request-handler schemes short-circuit before default authentication?
- What is the difference between `AuthenticationMiddleware` and `AuthenticationService`?
- How does the scheme provider decide the default authenticate/challenge/forbid/sign-in/sign-out schemes?
- Why are handlers per-request initialized objects rather than just global services?
- What does `ResolveTarget` do?
- What is the difference between `ForwardAuthenticate`, `ForwardChallenge`, `ForwardForbid`, and `ForwardDefault`?
- Why might one logical policy scheme authenticate with cookies but challenge with OIDC?
- Why are challenge/forbid not the same as authenticate failure?
- Which handler interfaces are required for sign-in and sign-out operations?

---

## 6. Open review issues

- Exact code punctuation in OCR-heavy snippets should be checked against source images before using as executable code.
- P01 deliberately excludes OIDC/JWT outcome neighbors; those must be rechecked in P04.