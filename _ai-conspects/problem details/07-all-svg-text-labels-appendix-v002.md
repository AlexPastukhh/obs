# Problem Details — all 118 native SVG text labels

Generated: 2026-06-30

These labels are complete canvas text evidence. They supplement but do not replace screenshot transcription.

## R01

- `T-004` — WHAT ISSUES WITHOUT IT
- `T-006` — ADDITON TO PD SERVICE,
- `T-011` — AND REFERENCES TO
- `T-012` — A DOCUMENTATION
- `T-018` — TRACE ID
- `T-019` — !!!
- `T-020` — whats wrong with this implementation?
- `T-021` — problemdetailsservice will do everything can being done in controller
- `T-022` — automatically, so you need to use it everywhere in middlewares,
- `T-023` — non mvc land
- `T-025` — configuring problem details
- `T-027` — on all pd that is produced via
- `T-028` — problemdetails frwrks pipeline
- `T-029` — auto in controllers or via iproblemdetailsservice
- `T-030` — last action (callback) in pipeline
- `T-031` — before response
- `T-033` — probmem details returning
- `T-034` — using Microsoft.AspNetCore.Mvc;
- `T-035` — options.Events.OnRedirectToLogin = async ctx =>
- `T-039` — ctx.Response.Redirect(ctx.RedirectUri);
- `T-048` — statusCode: StatusCodes.Status401Unauthorized,
- `T-049` — title: "Unauthorized",
- `T-077` — PROBLEMDETAILS
- `T-080` — USING PROBLEMDETAILSCONTEXT.EXCEPTION
- `T-086` — !!!
- `T-100` — SER TO XML IF DONT WANT WRITER)
- `T-107` — JUST CONFIGURE CUSTOMIZEPROBLEMDETAILS AND USE FACTORY
- `T-109` — CONFIGURE<PROBLEMDETAILSOPTIONS>
- `T-112` — the main issue
- `T-113` — so the writer wont see context too
- `T-114` — but controller uses default writer
- `T-115` — so its not the issue
- `T-116` — controller issue
- `T-117` — customize pd can see pdcontext
- `T-118` — but in controller path it cant

## R02

- `T-005` — WHEN TO USE
- `T-008` — PROBLEMDETAILS WRITERS
- `T-009` — PROBLEM DETAILS config
- `T-015` — NOT JUST SOME DOCS WITH EXPL
- `T-017` — !!!!
- `T-024` — BUT WHY PROBLEMDETAILS FACTORY
- `T-026` — like that you force xml
- `T-110` — !!
- `T-111` — ex order of pd writer and customize pd

## R03

- `T-001` — PROBLEM DETAILS
- `T-002` — PROBLEM DETAILS Factory
- `T-003` — PROBLEM DETAILS SERVICE
- `T-010` — ALL TITLE AND DETAILS
- `T-014` — TO YOUR API AND YOUR API'S DOCUMENTATION
- `T-042` — ctx.Response.StatusCode = StatusCodes.Status401Unauthorized;
- `T-043` — var http = ctx.HttpContext;
- `T-044` — var factory = http.RequestServices.GetRequiredService<ProblemDetailsFactory>();
- `T-045` — var pds = http.RequestServices.GetRequiredService<IProblemDetailsService>();
- `T-046` — var pd = factory.CreateProblemDetails(
- `T-047` — httpContext: http,
- `T-050` — type: "https://httpstatuses.com/401",
- `T-051` — detail: "Authentication is required to access this resource.",
- `T-052` — instance: http.Request.Path);
- `T-053` — await pds.WriteAsync(new ProblemDetailsContext { HttpContext = http, ProblemDetails = pd });
- `T-054` — };
- `T-055` — options.Events.OnRedirectToAccessDenied = async ctx =>
- `T-056` — {
- `T-057` — if (!ctx.Request.Path.StartsWithSegments("/api"))
- `T-058` — {
- `T-059` — ctx.Response.Redirect(ctx.RedirectUri);
- `T-060` — return;
- `T-061` — }
- `T-062` — ctx.Response.StatusCode = StatusCodes.Status403Forbidden;
- `T-063` — var http = ctx.HttpContext;
- `T-064` — var factory = http.RequestServices.GetRequiredService<ProblemDetailsFactory>();
- `T-065` — var pds = http.RequestServices.GetRequiredService<IProblemDetailsService>();
- `T-066` — var pd = factory.CreateProblemDetails(
- `T-067` — httpContext: http,
- `T-068` — statusCode: StatusCodes.Status403Forbidden,
- `T-069` — title: "Forbidden",
- `T-070` — type: "https://httpstatuses.com/403",
- `T-072` — instance: http.Request.Path);
- `T-073` — await pds.WriteAsync(new ProblemDetailsContext { HttpContext = http, ProblemDetails = pd });
- `T-076` — EXAMPLE WITH EXPL
- `T-078` — WRITERS CHAIN,CONTENT NEG
- `T-079` — WHAT IS PROBLEMDETAILSCONTEXT
- `T-081` — FOR CUSTOM WRITER TO ACCESS
- `T-082` — TRYWRITEASYNC CHECKS IF THERE IS A SUITABLE WRITER
- `T-083` — FOR CLIENTS ACCEPT HEADER, IF NO THEN WE CANT WRITE
- `T-084` — AND MUST HAVE CALLBACK
- `T-085` — TO PROCESS AS TEXT
- `T-087` — T
- `T-088` — WITH TRYWRITE(CAN RETURN PALIN TEXT IN THIS CASE TOO)
- `T-089` — ISSUES WITH XML WRITER AND XML PROBLEM DETAILS
- `T-090` — WHERE NOT TO USE THE SERVICE/
- `T-091` — IMPLICIT PROBLEMDETAILS PIPELINE
- `T-092` — NO DEFAULT WRITING BEHAVIOR
- `T-093` — IF NO MATCHING WRITER
- `T-094` — THEN NEED TO ADD
- `T-095` — CALLBACK ON !WRITTEN
- `T-096` — WHAT IS PROBLEMDETAILSCONTEXT
- `T-097` — THE DEFAULT WRITER = ADDPROBLEMDETAL
- `T-098` — JSON WRITER
- `T-099` — XML WRITER (CAN WRITE CALLBACK AND MANUALLY
- `T-101` — CUSTOMIZE PROBLEMDETAILS
- `T-102` — !!
- `T-103` — WHEN DOES CUST PD RUNS/
- `T-104` — WHAT IF NEED TO HAVE SOME PD OPTIONS CONFIGURATION FOR
- `T-105` — ALL PROBLEMDETAILS?
- `T-106` — APIBEH OPTIONS PD CONFIGURATIONS
- `T-108` — CUTOMIZEPROBLEMDETAILS

## R04

- `T-007` — TRYWRITEASYNC
- `T-013` — CAN RELATE
- `T-016` — WHAT IS THIS STATUS CODE
- `T-032` — cookies auth ON REDIRECT
- `T-036` — {
- `T-037` — if (!ctx.Request.Path.StartsWithSegments("/api"))
- `T-038` — {
- `T-040` — return;
- `T-041` — }
- `T-071` — detail: "You do not have permission to access this resource.",
- `T-074` — };
- `T-075` — a
