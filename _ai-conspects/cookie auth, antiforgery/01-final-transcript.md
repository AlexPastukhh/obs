# Final transcript — cookie auth, antiforgery

Generated: 2026-06-22 00:00:00 UTC

## 0.1 Area understanding / reading quality

**Overall:** ASP.NET Core cookie authentication combined with antiforgery: login/logout, claims and auth tickets, safe returnUrl handling, SPA cookie/antiforgery flow, ITicketStore, OnValidatePrincipal, sliding renewal, cookie policy/options and secure cookie prefixes.

**Reading quality:** high for text/code elements; exact code is retained in the SVG/text ledger.

```text
processed image uses: 0
processed text elements: 124
remaining unclosed image uses: 0
remaining unclosed text elements: 0
```

## Structured transcript

### Login/logout flow

Cookie SignInAsync/SignOutAsync, claims principal creation, ValidateAntiForgeryToken and local return URL validation.

### Antiforgery

Two-token antiforgery model, SPA integration and error behavior.

### Ticket lifecycle

Auth ticket encryption, AuthenticateAsync, ITicketStore, renewal and sliding expiration.

### Principal validation

OnValidatePrincipal, avoiding a database call on every request, claim refresh strategies and cache-backed tickets.

### Cookie options

Name, domain/path, SameSite, Secure, HttpOnly, prefixes __Host-/__Secure-, TicketDataFormat and CookiePolicy interaction.

### SPA/CORS

Credentials mode, proxy setups and distinction between browser cookies, auth/session cookies and business validity.

## Source-preserving element sample

The full source text is stored in `data/text-elements.json` and `data/text-elements.csv`.

- `T-001` using System.Security.Claims;
- `T-002` using Microsoft.AspNetCore.Authentication;
- `T-003` using Microsoft.AspNetCore.Authentication.Cookies;
- `T-004` using Microsoft.AspNetCore.Mvc;
- `T-006` public class AccountController : Controller
- `T-007` {
- `T-008` [HttpGet]
- `T-009` public IActionResult Login(string? returnUrl = null)
- `T-010` {
- `T-011` ViewData["ReturnUrl"] = returnUrl ?? Url.Action("Index", "Home");
- `T-012` return View();
- `T-013` }
- `T-015` [HttpPost]
- `T-016` [ValidateAntiForgeryToken]
- `T-017` public async Task<IActionResult> Login(string username, string password, string? returnUrl)
- `T-018` {
- `T-019` // Demo auth check (replace with DB/Identity)
- `T-020` if (username != "alice" || password != "pass123")
- `T-021` {
- `T-022` ModelState.AddModelError("", "Invalid credentials");
- `T-023` ViewData["ReturnUrl"] = returnUrl;
- `T-024` return View();
- `T-025` }
- `T-027` var claims = new List<Claim>
- `T-028` {
- `T-029` new(ClaimTypes.Name, "alice"),
- `T-030` new(ClaimTypes.Role, "Admin"),
- `T-031` new("permission", "products.edit")
- `T-032` };
- `T-034` var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

## Practical conclusion

Use this conspect as a conceptual map, then return to the preserved SVG or embedded screenshots for exact code/API spellings before copying implementation details.
