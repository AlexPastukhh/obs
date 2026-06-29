# R05 — Default Identity UI versus Identity API endpoints

## Coverage

```text
source screenshots: 3 / 3
SVG text nodes assigned to this region: 1 / 1
remaining: 0
```

Covered source IDs: `S-062, S-063, S-064`.

## Two meanings of “default Identity endpoints”

The source separates two different built-in experiences.

## A. Default Identity UI — Razor Pages and cookie-focused flows

The default UI provides account pages with routes such as:

```text
/Identity/Account/Login
/Identity/Account/Register
/Identity/Account/ForgotPassword
/Identity/Account/ResetPassword
/Identity/Account/ConfirmEmail
```

This is designed primarily for traditional MVC and Razor Pages applications.

Characteristics:

- it uses the normal Identity application cookie;
- it provides ready-made pages and handlers for common account flows;
- it uses `IEmailSender` during confirmation and reset flows;
- it can give an application a complete account system quickly;
- the pages can be scaffolded into the application and customized later.

The UI still uses the same Identity stores, managers, token providers, password policies, and lockout configuration discussed in the previous regions.

## B. Identity API endpoints — Minimal API endpoints for APIs and SPAs

Identity API endpoints are prebuilt endpoints mapped in `Program.cs` for client-driven account flows.

They are intended for:

- single-page applications;
- mobile clients;
- other API clients;
- projects that do not want to build every registration, login, confirmation, and reset endpoint from scratch.

Depending on the framework version and authentication configuration, they can participate in token-based or cookie-based architectures.

The source's high-level distinction is:

```text
Default Identity UI:
ready-made HTML/Razor account pages, normally cookie-focused

Identity API endpoints:
ready-made HTTP endpoints for programmatic API clients
```

The two are related but are not the same feature.

## Version and architecture caveat

The exact route names, request contracts, token response shape, refresh behavior, and cookie/token options of the API endpoints depend on the .NET version and how Identity is registered.

A project should check the documentation for its target framework rather than copying endpoint assumptions from another version.

The larger architecture decision remains important:

- traditional server-rendered application with an Identity cookie;
- SPA calling custom JWT endpoints;
- SPA using built-in Identity API endpoints;
- BFF or another server-side session design;
- external OIDC provider or dedicated authorization server.

## Region conclusion

“Use default Identity” can mean either scaffolded Razor account pages or mapped API endpoints. The first is an interactive UI solution centered on cookies; the second is a programmatic endpoint surface for API clients. Neither removes the need to understand Identity stores, managers, email delivery, lockout, token transport, and the application's chosen browser security model.
