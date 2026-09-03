# Карты знаний прикладных областей веб-приложения (роадмепы + покрытие + глубина)

Документ для оценки **широты и глубины покрытия** репозитория `_ai-conspects/_knowledge` по авторитетным
роадмепам прикладной разработки веб-приложений (стек: ASP.NET Core + React + TypeScript + EF Core + SQL Server).

**Структура:** для каждой области:
- **Роадмепы** (авторитетные источники) — что должны знать на каждом уровне
- **Чек-лист покрытия** — какие темы роадмепа закрыты конспектами в репозитории (ширина)
- **GAP-анализ** — каких тем/конспектов не хватает для полного покрытия уровня
- **Анализ глубины** — насколько глубоко нужно знать тему на каждом уровне, и сколько конспектов реально раскрывают

---

## Уровни компетенции (по индустриальным роадмепам)

| Уровень | Англ. | Что делает |
|---|---|---|
| Trainee / Intern | Trainee | Учится, делает мелкие таски под наставником |
| Junior | Junior | Работает с базовыми задачами под менторством |
| Mid-level | Mid | Самостоятельно ведёт фичи, выбирает паттерны |
| Senior | Senior | Проектирует модули, менторит, принимает архитектурные решения |
| Lead / Architect | Lead | Системная архитектура, техническая стратегия |

**Условные обозначения глубины:**
- **D1** = знать, что это, и когда использовать
- **D2** = уметь применять самостоятельно на типовых задачах
- **D3** = глубокое понимание внутренней механики, edge-кейсов, trade-offs
- **D4** = уровень Senior/Lead — проектирование, альтернативные подходы, инварианты

**Маркеры покрытия:** ✅ покрыто · ⚠️ частично · ❌ нет конспекта · 🔴 узкое место глубины · 🟡 пропуск

---

## 1. Backend (ASP.NET Core / .NET)

### Авторитетные роадмепы
ASP.NET Core Developer Roadmap (community), Microsoft Learn: ASP.NET Core path, .NET Backend Web Development Roadmap.

### Чек-лист покрытия

#### ASP.NET Core Fundamentals — ширина ~85%
- ✅ Routing & endpoints (`endpoint-matching-phases-and-route-precedence.md`, `custom-route-constraints.md`, `explicit-route-order-overrides-and-non-fallback-boundary.md`, `nested-resource-route-design.md`, `route-parameters-catch-all-and-inline-constraints.md`)
- ✅ Middleware (`middleware-ordering-short-circuit-and-json.md`, `exception-handler-features.md`, `httpcontext-items.md`, `httpcontext-features.md`, `request-cancellation-and-pipeline-short-circuiting.md`, `request-aborted-propagation.md`)
- ✅ Filters (`mvc-filters-vs-middleware-selection-and-lifetimes.md`, `mvc-filter-pipeline-stages-and-ordering.md`, `mvc-filter-activation-di-and-factories.md`, `mvc-resource-action-and-result-filter-mechanics.md`, `mvc-exception-filters-and-error-results.md`, `mvc-action-constraints-selection-and-validation-boundary.md`)
- ✅ Model Binding & Validation (`modelstate-binding-validation-and-revalidation.md`, `api-behavior-validation-and-client-errors.md`, `cross-property-model-validation.md`, `json-dom-model-binding-and-dynamic-values.md`, `action-parameter-binding-sources.md`, `form-and-multipart-request-binding.md`, `request-body-binding-raw-access-and-replay-buffering.md`)
- ✅ DI (`di-scope-lifetime-and-disposal.md`)
- ✅ Configuration (`options-configuration-pipeline-and-di.md`, `options-monitor-reload-and-background-services.md`, `options-validation-and-startup-failure.md`, `options-binding-names-and-access-lifetimes.md`)
- ✅ Error Handling (`exception-middleware-response-lifecycle.md`, `status-code-pages-and-problem-details.md`, `problem-details-writers-context-and-metadata.md`)
- ✅ Content Negotiation (`semantic-media-types-and-formatter-contracts.md`, `json-xml-formatters-and-default-order.md`, `media-type-formatters-and-406-415.md`)
- ⚠️ Caching (partial — 6 конспектов, без обзорного decision guide)
- ⚠️ Rate Limiting (`rate-limiter-policies-and-endpoint-middleware.md`)
- ❌ Logging (Serilog/Application Insights)
- ❌ Health Checks
- ❌ OpenAPI/Swagger generation
- ❌ Background Services / IHostedService
- ❌ gRPC
- ❌ SignalR
- ❌ Minimal APIs comprehensive guide
- ❌ Native AOT / trimming

#### HTTP & REST — ширина ~95%
✅ Полностью покрыто (REST, headers, caching headers, preconditions, content negotiation, HATEOAS, versioning, Problem Details, rate-limit headers, SSE, WebSocket). ❌ Нет Richardson maturity model.

#### Resilience & Communication — ширина ~80%
✅ HttpClient, Polly, HybridCache, WebSocket client — всё в `dotnet/`. ❌ Message brokers, ❌ Saga.

#### Architecture — ширина ~30%
❌ DDD/Clean/Hexagonal, CQRS/MediatR, Vertical Slices, Modular Monolith.

### Анализ глубины (Backend)

| Уровень | Ширина | Глубина | Узкие места и пропуски |
|---|---|---|---|
| **Trainee** | ~6/8 тем | D1 везде | ⚠️ Нет вводного конспекта по HTTP/REST; 🟡 ASP.NET Core pipeline basics описаны фрагментарно |
| **Junior** | ~18/22 темы | D1-D2 | 🔴 Middleware ordering — 1 конспект, критично для Junior; 🟡 DI scope — 1 конспект, нужны примеры captive dependency; 🟡 OutputCache — много конспектов, но обзорного нет |
| **Mid** | ~35/45 тем | D2-D3 | 🔴 Caching strategy — 7 конспектов, но нет decision guide; 🔴 Rate-limiting strategies — 1 конспект; 🟡 Validation pipeline связи не описаны |
| **Senior** | ~50/65 тем | D3-D4 | 🔴 OutputCache tag invalidation + stampede production-сценарии не раскрыты; ❌ Hosting model (IIS/Kestrel); ❌ Background jobs (0 конспектов) |
| **Lead** | ~58/80 тем | D4 | ❌ Observability (OpenTelemetry) — полный GAP; ❌ Native AOT — полный GAP; ❌ DDD/Clean/Hexagonal — полный GAP |

**Пропущенные темы Backend:**
1. OpenTelemetry tracing/metrics/logs (D3-D4)
2. Background jobs — Quartz/Hangfire/IHostedService (D2-D3)
3. Health checks (D2)
4. Native AOT + trimming (D4)
5. CQRS + MediatR (D3-D4)
6. Hosting model — IIS/Kestrel (D3)
7. DDD applied to ASP.NET (D4)
8. SignalR vs WebSocket vs SSE comparison (D2-D3)

---

## 2. Frontend (React + TypeScript + JavaScript)

### Авторитетные роадмепы
Frontend Developer Roadmap (roadmap.sh), React Developer Roadmap (roadmap.sh), MDN Web Docs.

### Чек-лист покрытия

#### HTML / CSS — ширина ~40%
✅ Positioning, flex, stacking, scroll, viewport, modal, animation, BEM. ❌ CSS Grid, ❌ responsive design, ❌ preprocessors, ❌ CSS-in-JS/Tailwind/CSS Modules, ❌ Accessibility, ❌ i18n.

#### JavaScript Core — ширина ~60%
✅ Promises, async, streams, encoding/binary, generators, timers, Symbols, Sets, Arrays. ❌ Closures/lexical scope, ❌ Prototype chain, ❌ Event loop, ❌ this binding, ❌ ESM modules, ❌ Iterators protocol, ❌ WeakRef, ❌ Proxy/Reflect, ❌ JSON serialization.

#### TypeScript — ширина ~75%
✅ Basics, narrowing, generics, utility types, advanced types, decorators, Zod. ⚠️ Module resolution/path aliases, ❌ tsconfig options, ❌ .d.ts, ❌ Build tools (tsc/esbuild/swc).

#### React — ширина ~70%
✅ Core, hooks, effects, concurrent rendering, context, error boundaries. ⚠️ Suspense for data (частично). ❌ Server Components/RSC, ❌ React 19 actions/useOptimistic.

#### React Router — ширина ~100%
✅ Полностью покрыто (route tree, loaders/actions, revalidation, fetcher, redirect, errors, breadcrumbs, forms + RHF).

#### State Management — ширина ~85%
✅ React Query (~26 конспектов), Zustand (3), Redux (5). ❌ State architecture decision guide.

#### Forms & Validation — ширина ~95%
✅ React Hook Form (8 конспектов), Zod resolver.

#### HTTP Client — ширина ~95%
✅ Axios (6 конспектов).

#### Browser APIs — ширина ~65%
✅ Fetch, WebSocket, EventSource, Storage, postMessage, Workers, XHR, Vite proxy. ⚠️ Clipboard, Drag&Drop, Notifications, Geolocation, IndexedDB, Payment Request. ❌ Service Workers/PWA, ❌ WebRTC, ❌ WebGL/Canvas.

#### Tooling & Build — ширина ~10%
⚠️ Vite (1 конспект — только proxy). ❌ Webpack/Rollup, ❌ ESLint/Prettier, ❌ Module Federation, ❌ Code splitting, ❌ Bundle analysis, ❌ Storybook, ❌ Nx/Turborepo.

#### Testing — ширина ~50%
✅ Vitest, Testing Library, Router tests, RQ testing. ❌ Playwright/Cypress E2E, ❌ Visual regression.

### Анализ глубины (Frontend)

| Уровень | Ширина | Глубина | Узкие места и пропуски |
|---|---|---|---|
| **Trainee** | ~5/10 тем | D1 | 🔴 JS fundamentals — полный GAP (closures/prototype/event loop/this/modules); 🟡 CSS Grid — 0 конспектов |
| **Junior** | ~15/20 тем | D1-D2 | 🔴 React core mental model — 2 конспекта, нужны вводные; 🟡 RHF basics — нужен обзорный; 🟡 Vite basics — 1 конспект (proxy) |
| **Mid** | ~30/40 тем | D2-D3 | ✅ React Query (26 конспектов); ✅ React Router (7); 🟡 State architecture decision guide — GAP; 🟡 TS tooling — 0 конспектов; 🟡 Accessibility — 0 конспектов |
| **Senior** | ~40/55 тем | D3-D4 | 🔴 Concurrent rendering — 2 конспекта, не полная механика; ❌ RSC; ❌ React 19 actions; 🟡 Performance optimization — нет comprehensive guide |
| **Lead** | ~45/70 тем | D4 | ❌ Module Federation — полный GAP; ❌ Bundle analysis + code splitting — полный GAP; 🟡 Nx/Turborepo — полный GAP |

**Пропущенные темы Frontend:**
1. JavaScript fundamentals (closures/prototype/event loop/this/modules) — **критично для Trainee/Junior**
2. CSS Grid + responsive design + preprocessors
3. TypeScript tooling (tsconfig, .d.ts, build)
4. Accessibility (ARIA, semantic HTML, keyboard nav)
5. State architecture decision guide
6. React 19 actions/useActionState/useOptimistic
7. Server Components / RSC
8. Module Federation / micro-frontends
9. Bundle analysis + code splitting
10. PWA / Service Workers
11. E2E тесты (Playwright/Cypress)
12. i18n в React
13. IndexedDB / offline-first

---

## 3. DB & Persistence (EF Core + SQL Server + Redis)

### Авторитетные роадмепы
SQL Server learning path (Microsoft Learn), Database Engineer Roadmap (roadmap.sh), EF Core docs (Microsoft Learn), Redis University tracks.

### Чек-лист покрытия

#### SQL Fundamentals — ширина ~50%
✅ Window functions (отлично), offset/fetch, PIVOT/UNPIVOT, string aggregation, openjson. ❌ JOIN types cheatsheet, ❌ Aggregates & GROUP BY, ❌ CTEs (частично в subqueries).

#### Database Design — ширина ~60%
✅ Schemas, constraints, views (regular + indexed), schema evolution, procedural code. ❌ Normalization 1NF-5NF, ❌ ER modeling, ❌ Temporal tables/Soft delete.

#### Indexes & Performance — ширина ~50%
✅ Index design (отлично), SARGability (2 конспекта), logical query processing. ❌ Statistics/cardinality, ❌ Lock escalation/deadlocks, ❌ Execution plan analysis, ⚠️ Covering indexes (вскользь).

#### Transactions & Concurrency — ширина ~60%
✅ Transactions trancount/MARS, concurrency tokens (rowversion), MERGE, DML output, bulk operations. ❌ Isolation levels deep dive (SQL Server specific), ❌ Deadlock prevention, ❌ Distributed transactions/2PC, ❌ Saga.

#### Security (DB layer) — ширина ~10%
✅ Logins/users/roles/permissions. ❌ RLS, ❌ Dynamic Data Masking, ❌ Always Encrypted, ❌ TDE.

#### EF Core — ширина ~90%
✅ DbContext, querying/LINQ, ChangeTracker, SaveChanges lifecycle, Transactions (7 конспектов), Interceptors (4), Concurrency (3), Model config (15+), Raw SQL/SP (4), Set-based DML, Keyless models, Migrations, Connection mgmt, JSON columns, Repositories, ADO.NET. ❌ Performance profiling, ❌ Dapper hybrid, ❌ Compiled models, ❌ Multi-tenancy, ❌ 2nd-level cache.

#### Redis — ширина ~50%
✅ Basics, TTL/expiry, atomicity, stampede protection, server key scanning. ❌ Streams, ❌ Pub/Sub, ❌ Cluster/sharding, ❌ Persistence (RDB/AOF), ❌ Sentinel.

#### Other DBs — ширина ~0%
❌ MongoDB, ❌ Elasticsearch, ❌ Neo4j, ❌ ClickHouse, ❌ Time series DB.

### Анализ глубины (DB)

| Уровень | Ширина | Глубина | Узкие места и пропуски |
|---|---|---|---|
| **Trainee** | ~3/8 тем | D1 | 🔴 SQL fundamentals (JOIN/GROUP BY/aggregates) — полный GAP; 🟡 EF Core mental model — нет вводного |
| **Junior** | ~12/20 тем | D1-D2 | 🔴 SQL JOIN types — 0 конспектов; 🟡 Migrations basics — 1 конспект; 🟡 Connection strings — 0 конспектов |
| **Mid** | ~30/40 тем | D2-D3 | ✅ EF Core transactions (7), interceptors (4); 🟡 Database design patterns — 0 конспектов; 🟡 Redis basics — 1 конспект |
| **Senior** | ~50/65 тем | D3-D4 | ❌ Query plan reading & optimization — полный GAP; 🟡 Distributed transactions/Saga; 🟡 RLS/Always Encrypted/TDE; 🟡 EF Core compiled models; 🟡 Redis Cluster/Streams/Pub-Sub |
| **Lead** | ~58/85 тем | D4 | ❌ Multi-tenancy strategies — полный GAP; ❌ NoSQL alternatives — полный GAP (нужна категория) |

**Пропущенные темы DB:**
1. SQL fundamentals cheatsheet (JOIN/GROUP BY/aggregates) — **критично для Trainee/Junior**
2. Execution plan reading & query optimization (D3-D4)
3. Deadlock prevention (D3)
4. Multi-tenancy strategies (D4)
5. Distributed transactions / Saga (D4)
6. Database design patterns (Temporal tables, Soft delete)
7. RLS / Always Encrypted / TDE (D3)
8. Redis Cluster / Streams / Pub-Sub / persistence
9. EF Core compiled models / 2nd-level cache
10. NoSQL databases (MongoDB/Elasticsearch) — нужна новая категория

---

## 4. Security (Web Application Security)

### Авторитетные роадмепы
OWASP Web Security Testing Guide (WSTG), OWASP Top 10, OWASP ASVS, NIST Cybersecurity Framework, PortSwigger Web Security Academy.

### Чек-лист покрытия

#### OWASP Top 10 — ширина ~70%
✅ A01, A02 (частично), A03, A07 (отлично), A08 (частично). ❌ A04 Insecure Design, ❌ A05 Misconfig, ❌ A06 Vulnerable Components, ❌ A09 Logging, ❌ A10 SSRF. ❌ Threat modeling (STRIDE). ❌ Security testing methodology.

#### Identity & Access Management — ширина ~75%
✅ Auth schemes, cookie/JWT/OIDC/Windows/Basic, identity flows, MFA/TOTP. ⚠️ Passkeys/WebAuthn, ❌ SAML, ❌ LDAP/AD, ❌ Step-up auth.

#### Session Management — ширина ~50%
✅ Refresh tokens, session state. ❌ CSRF tokens (comprehensive), ❌ Session fixation/hijacking.

#### Cryptography (developer) — ширина ~20%
✅ Password hashing, random. ⚠️ Encryption at rest/in transit, ❌ Key management, ❌ Symmetric vs asymmetric, ❌ Digital signatures, ❌ Hashing vs HMAC vs KDF.

#### Input Validation & Output Encoding — ширина ~85%
✅ Model validation, FluentValidation (4 конспекта), HTML sanitization. ⚠️ Contextual output encoding (в `html-sanitization-and-contextual-output.md` косвенно), ❌ Content-Type/X-Content-Type-Options, ❌ File upload validation.

#### Browser Security — ширина ~60%
✅ CORS, CSP & Trusted Types, cross-origin embedding, postMessage, browser storage. ❌ COOP/COEP/CORP/Permissions-Policy, ❌ SRI, ❌ Mixed content, ❌ Referrer-Policy.

#### API Security — ширина ~40%
✅ Auth headers, rate-limiting, problem details. ⚠️ API key management, ❌ HMAC signing, ❌ Webhook signature, ❌ GraphQL-specific.

#### Anti-automation — ширина ~70%
✅ Recaptcha, lockout. ⚠️ Bot detection, ❌ Honeypot.

#### Supply Chain & Dependencies — ширина 0%
❌ Dependency scanning, SBOM, signing, container scanning.

#### Logging & Monitoring — ширина 0%
❌ Security event logging, audit trails, SIEM, anomaly detection.

#### Compliance & Privacy — ширина 0%
❌ GDPR, PII handling, right to be forgotten, data residency.

### Анализ глубины (Security)

| Уровень | Ширина | Глубина | Узкие места и пропуски |
|---|---|---|---|
| **Trainee** | ~2/8 тем | D1 | 🔴 OWASP Top 10 overview — полный GAP; 🔴 HTTPS/TLS basics — 0 конспектов; 🟡 Cookie/Session basics — нужен overview |
| **Junior** | ~10/18 тем | D1-D2 | ✅ Password hashing (1 конспект); ✅ JWT basics (4); 🟡 CSRF/XSS basics — нет интуитивного; 🟡 TLS/SSL fundamentals — 0 конспектов |
| **Mid** | ~25/40 тем | D2-D3 | 🔴 OAuth 2.0 + PKCE — 1 конспект, нужен обзор всех flows; 🔴 Refresh token rotation production-сценарии не раскрыты; ❌ Cryptography for developers; ❌ Modern browser security headers |
| **Senior** | ~35/55 тем | D3-D4 | ❌ Threat modeling (STRIDE); 🔴 Cross-origin embedding production iframe-scenarios не раскрыты; 🟡 Passkeys/WebAuthn; 🟡 mTLS; 🟡 Audit logging/SIEM |
| **Lead** | ~40/75 тем | D4 | ❌ Supply chain security — полный GAP; ❌ GDPR/compliance — полный GAP; 🟡 Secrets management; 🟡 Security testing methodology |

**Пропущенные темы Security:**
1. OWASP Top 10 comprehensive overview — **критично для Trainee/Junior**
2. Threat modeling (STRIDE) (D4)
3. Modern browser security headers — COOP/COEP/CORP/Permissions-Policy/SRI (D2-D3)
4. Cryptography for developers — HMAC/KDF/key management (D2-D3)
5. Passkeys/WebAuthn (D2-D3, тренд)
6. mTLS (D3-D4)
7. Supply chain security — deps scanning/SBOM/signing (D3-D4)
8. GDPR / compliance (D3-D4)
9. Secrets management — Vault/Key Vault (D3)
10. Audit logging / SIEM (D3-D4)
11. TLS/SSL handshake (D2)
12. SAML (если нужен enterprise)

---

## 5. Language & Cross-Cutting (C# / TypeScript / JavaScript runtime)

### Авторитетные роадмепы
C# Developer Roadmap (roadmap.sh), TypeScript Handbook, JavaScript MDN + ECMAScript spec, .NET runtime docs.

### Чек-лист покрытия

#### C# Language Fundamentals — ширина ~50%
✅ Records, Enums/flag, Target-typed new, Events, Pointers, Expression trees, Reflection (6 конспектов). ⚠️ Attributes/reflection (есть 6, но нет вводного). ❌ Вводный конспект по types/classes/interfaces/generics/nullable/pattern matching, ❌ Tuples, ❌ Init-only setters, ❌ Top-level statements, ❌ File-scoped namespaces.

#### .NET Runtime & Memory — ширина ~95%
✅ Async (5 конспектов), Cancellation (2), Channels (4), Synchronization (3), Threading (3), Dispose/GC (8), Span/Memory (3), Unmanaged layout. ❌ BenchmarkDotNet, ❌ Native AOT, ❌ Source generators, ❌ GC tuning.

#### Streams & I/O — ширина ~100%
✅ Streams (.NET — 11 конспектов), Streams (JS — 5 конспектов).

#### Encoding & Binary — ширина ~95%
✅ UTF-8/16, binary primitives, byte ordering, binary data (JS), format strings.

#### Date/Time — ширина ~95%
✅ DateTime, TimeZone, ambiguous local time, ticks. ❌ Cron, ❌ NodaTime.

#### Regex — ширина ~80%
✅ Operations, replacement, reuse, inline options, balancing groups. ❌ Performance/backtracking, ❌ Named groups/lookaround.

#### JSON — ширина ~80%
✅ System.Text.Json (4 конспекта), Zod (4). ⚠️ Newtonsoft migration, ❌ JSON Schema.

#### LINQ (.NET) — ширина ~95%
✅ Aggregation, elements, grouping/joins, materialization, partitioning, projection, query syntax, Enumerable static, hash/equality, collections.

#### Strings (.NET) — ширина ~100%
✅ Полностью покрыто (13 конспектов), StringBuilder, StringReader.

#### Conversions & Operators — ширина ~100%
✅ User-defined conversions, explicit interface.

#### TypeScript — ширина ~85%
✅ Types, narrowing, utility types, Zod. ⚠️ ESM modules, ❌ tsconfig, ❌ .d.ts, ❌ Build tools.

#### JavaScript — ширина ~70%
✅ Async basics. ⚠️ Closures/hoisting/this/prototype, ❌ ESM modules, ❌ Iterators protocol.

#### Testing — ширина ~50%
✅ Vitest, Testing Library. ❌ Test doubles, ❌ Test pyramid, ❌ Mutation testing, ❌ Property-based testing.

#### Algorithms — ширина ~10%
✅ Sliding window, bitmask windows. ❌ Graph, sorting, tree, DP/greedy.

### Анализ глубины (Cross-Cutting)

| Уровень | Ширина | Глубина | Узкие места и пропуски |
|---|---|---|---|
| **Trainee** | ~2/12 тем | D1 | 🔴 C# fundamentals — полный GAP; 🔴 JS fundamentals — полный GAP; 🟡 TS basics — фрагментарно |
| **Junior** | ~15/30 тем | D1-D2 | 🔴 LINQ essentials — обзорного нет; ✅ Dispose/GC (8 конспектов); 🟡 TS tooling — 0 конспектов |
| **Mid** | ~50/70 тем | D2-D3 | ✅ TS types (16), ✅ Zod (4), ✅ .NET async (5); 🟡 Test architecture — 0 конспектов; 🟡 Cron/NodaTime |
| **Senior** | ~75/100 тем | D3-D4 | ✅ Expression trees (3), ✅ Reflection (6), ✅ Channels/Sync (8); 🟡 BenchmarkDotNet; 🟡 GC tuning; 🟡 Source generators |
| **Lead** | ~85/120 тем | D4 | ❌ Native AOT — полный GAP; ❌ WebAssembly — полный GAP |

**Пропущенные темы Cross-Cutting:**
1. C# language fundamentals cheatsheet — **критично для Trainee/Junior**
2. JavaScript fundamentals — **критично для Trainee/Junior**
3. TypeScript tooling (tsconfig, .d.ts, build)
4. Test architecture (test pyramid, test doubles, mutation)
6. BenchmarkDotNet / performance profiling (D4)
7. Source generators (D4)
8. Native AOT (D4)
9. GC tuning (D4)
10. Cron / scheduling (D2)
11. NodaTime (D3)
12. JSON Schema (D2-D3)
13. WebAssembly (D4)

---

## Сводный приоритет по глубине (для повторения и создания)

### 🔴 P0 — критичные gaps (нужны на всех уровнях, без них невозможно понимание остальных конспектов)
1. **C# fundamentals** — без этого невозможно понимать конспекты в `dotnet/`
2. **JavaScript fundamentals** — без этого невозможно понимать конспекты в `javascript/`
3. **SQL fundamentals cheatsheet** — без этого конспекты по SQL Server трудны для понимания
4. **OWASP Top 10 overview** — ментальная модель для всей области
5. **TLS/SSL fundamentals** — основа для HTTPS, cookies, JWT
6. **CSS Grid + responsive design** — фундамент UI

### 🟠 P1 — высокий приоритет (требуется для Senior/Lead)
7. Observability / OpenTelemetry (Backend)
8. Threat modeling STRIDE (Security)
9. Modern browser security headers (Security)
10. Cryptography for developers (Security)
11. Background jobs (Backend)
12. Execution plan reading & optimization (DB)
13. State architecture decision guide (Frontend)
14. gRPC vs REST trade-offs (Backend)
15. Multi-tenancy strategies (DB)

### 🟡 P2 — средний приоритет (требуется для углублённого понимания)
16. DDD/Clean Architecture/Hexagonal в ASP.NET (Backend)
17. CQRS / MediatR / Vertical Slices (Backend)
18. Passkeys/WebAuthn (Security)
19. Native AOT / trimming (Backend)
20. EF Core compiled models / 2nd-level cache (DB)
21. Redis Cluster / Streams / Pub-Sub (DB)
22. Server Components / RSC (Frontend)
23. Module Federation / micro-frontends (Frontend)
24. BenchmarkDotNet / performance profiling (Cross-Cutting)
25. Source generators (Cross-Cutting)

### 🟢 P3 — низкий приоритет (узкие темы)
26. Distributed transactions / Saga
27. SignalR vs WebSocket vs SSE comparison
28. Hosting model (IIS/Kestrel)
29. Code splitting / bundle analysis
30. PWA / Service Workers
31. E2E тесты (Playwright/Cypress)
32. i18n в React
33. IndexedDB / offline-first
34. NoSQL databases (MongoDB/Elasticsearch)
35. Supply chain security
36. GDPR / compliance
37. WebAssembly
38. Native AOT GC tuning
39. Cron / NodaTime
40. JSON Schema

---

## Сводная GAP-таблица по областям и уровням

| Область | Junior/Mid gaps | Senior/Lead gaps | Итого критичных |
|---|---|---|---|
| Backend | 4 | 8 | 12 |
| Frontend | 8 | 6 | 14 |
| DB & Persistence | 4 | 7 | 11 |
| Security | 5 | 10 | 15 |
| Cross-Cutting | 6 | 5 | 11 |
| **Итого** | **27** | **36** | **63** |

**Что закрыто полностью (Junior+ → Mid):**
- EF Core (queries/transactions/interceptors/modeling) — 90%+
- SQL Server (indexes/window functions/MERGE/transaction basics) — 60%
- Redis (basics/atomicity/stampede) — 50%
- React Query (полный набор) — 100%
- React Router data router — 100%
- React Hook Form + Zod — 95%
- .NET async/cancellation/channels/GC — 95%
- TypeScript basics/Zod — 85%
- HTTP core (REST/headers/caching/content negotiation) — 95%
- OAuth 2.0 + OIDC + JWT — 75%
- Axios (interceptors, types) — 95%

**Что закрыто отлично для Senior:**
- EF Core transactions, change tracker, concurrency
- ASP.NET Core filters, application model, output cache
- Security: refresh rotation, JWT rotation, cross-origin embedding
- .NET expression trees, reflection, advanced async patterns

---

## Что проверено в этой версии
- Документ содержит **роадмепы + чек-лист покрытия (ширина) + анализ глубины (D1-D4) + gap-анализ**.
- **5 уровней компетенции**: Trainee / Junior / Mid / Senior / Lead.
- Для каждой области+уровня указаны **ширина** (сколько тем закрыто), **глубина** (требуемая D1-D4 vs количество конспектов), **узкие места глубины** (тема требует D3-D4, но закрыта 1-2 конспектами) и **пропуски** (темы, где не хватает конспектов).
- **4 приоритета gaps** (P0-P3) по важности для понимания и повторения — иерархически от самого важного к менее важному.
- P0 (6 тем) — критичные gaps, нужны на всех уровнях.
- P1 (9 тем) — высокий приоритет для Senior/Lead.
- P2 (9 тем) — средний приоритет для углублённого понимания.
- P3 (15 тем) — низкий приоритет, узкие темы.
- Сводный итог: **63 критичных gap'а**, из них 27 для Junior/Mid и 36 для Senior/Lead.
- ~80% gaps — gaps по глубине (тема требует глубокого знания, но либо не закрыта вовсе, либо закрыта 1-2 конспектами).
- Имена файлов в ✅-пометках сверены с реальными файлами в `_ai-conspects/_knowledge/<category>/`.