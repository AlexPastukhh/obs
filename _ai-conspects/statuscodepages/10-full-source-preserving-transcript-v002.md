# Full source-preserving transcript v002 — StatusCodePages / ProblemDetails

Generated: 2026-07-04 UTC

```text
unique embedded screenshots: 12
image uses: 12
native SVG text lines: 77
source coverage: 12 / 12
transcript mode: near-literal normalized
```

Exact typography and version-sensitive punctuation remain authoritative in the preserved SVG and screenshots.

## S-001 — `WithReExecute`: фильтрация внутри error endpoint

```text
source_id: S-001
image_hash: d331f1dfb183
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Можно оставить `UseStatusCodePagesWithReExecute` и re-execute status codes, а в `/api/error/{code}` создавать body только для выбранных codes.

Недостаток: остальные codes тоже проходят повторный pipeline. Проверка `HasStarted` внутри error endpoint не является основным фильтром: если response уже started, re-execute обычно не запускается.

### Вопросы

1. Где фильтровать codes?
2. Какова цена лишнего re-execute?

---

## S-002 — Custom `UseStatusCodePages`: проверка response и codes

```text
source_id: S-002
image_hash: bc299e381202
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

API branch получает `HttpContext`, проверяет `Response.HasStarted`, читает status code и обрабатывает только 404, 405, 406, 415.

### Видимый код

```csharp
apiApp.UseStatusCodePages(async statusCodeContext =>
{
    var http = statusCodeContext.HttpContext;

    if (http.Response.HasStarted)
        return;

    var code = http.Response.StatusCode;

    if (code is not (
        StatusCodes.Status404NotFound or
        StatusCodes.Status405MethodNotAllowed or
        StatusCodes.Status406NotAcceptable or
        StatusCodes.Status415UnsupportedMediaType))
    {
        return;
    }

    // create and write ProblemDetails
});
```

### Вопросы

1. Почему проверяется HasStarted?
2. Зачем фильтр до создания body?

---

## S-003 — Вопрос об implicit `TryWriteAsync`

```text
source_id: S-003
image_hash: 729b1f88f472
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Вопрос источника: если вызвать `AddProblemDetails()` и обычный `UseStatusCodePages()`, вызовет ли default StatusCodePages handler `TryWriteAsync`, из-за чего применится `CustomizeProblemDetails`?

### Вопросы

1. Какой service связывает middleware и ProblemDetails?
2. Когда callback может выполниться?

---

## S-004 — Ответ: `AddProblemDetails` + `UseStatusCodePages`

```text
source_id: S-004
image_hash: 66a10548d9d8
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Да, с условиями.

```csharp
builder.Services.AddProblemDetails();
app.UseStatusCodePages();
```

StatusCodePages срабатывает для 4xx/5xx responses, у которых иначе был бы empty body. При наличии ProblemDetails infrastructure default handler пытается записать ProblemDetails через `IProblemDetailsService`, концептуально через `TryWriteAsync`.

### Вопросы

1. Почему body должен быть empty?
2. Какие status ranges рассматриваются?

---

## S-005 — Ограничение `UseStatusCodePagesWithReExecute`

```text
source_id: S-005
image_hash: f905ca1ef7ec
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

К `UseStatusCodePagesWithReExecute` нельзя добавить произвольный callback с custom `HasStarted`/status checks так же, как к `UseStatusCodePages`.

Фильтрация выполняется branch-условием до middleware либо внутри error endpoint.

### Вопросы

1. Какой middleware даёт callback?
2. Где выбирать codes при re-execute?

---

## S-006 — API-only re-execute pipeline

```text
source_id: S-006
image_hash: 543647b6d8b4
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Pipeline ограничивает status pages путями `/api` и re-executes запрос в `/api/error/{0}`.

### Видимый код

```csharp
app.UseRouting();

app.UseWhen(
    ctx => ctx.Request.Path.StartsWithSegments(
        "/api",
        StringComparison.OrdinalIgnoreCase),
    apiApp =>
    {
        apiApp.UseStatusCodePagesWithReExecute(
            "/api/error/{0}");
    });

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
```

### Вопросы

1. Зачем UseWhen?
2. Что подставляется в {0}?

---

## S-007 — Создание `ProblemDetails` и useful detail

```text
source_id: S-007
image_hash: ced62cbeb212
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Handler получает `ProblemDetailsFactory` и `IProblemDetailsService`.

Detail:
- 404: endpoint not found;
- 405: method not allowed;
- 406: check Accept;
- 415: check Content-Type.

Создаётся ProblemDetails с status, reason phrase, type URI, detail и request path.

### Видимый код

```csharp
var pd = factory.CreateProblemDetails(
    httpContext: http,
    statusCode: code,
    title: ReasonPhrases.GetReasonPhrase(code),
    type: $"https://httpstatuses.com/{code}",
    detail: detail,
    instance: http.Request.Path);
```

### Вопросы

1. Почему 406 связан с Accept?
2. Почему нельзя обещать точную business reason?

---

## S-008 — `CustomizeProblemDetails` и gotchas

```text
source_id: S-008
image_hash: 93b1cf41864a
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Поскольку response проходит ProblemDetails service/writers pipeline, `options.CustomizeProblemDetails` выполняется и может добавить `traceId`, `instance` и extensions.

Условия:
1. endpoint не записал body;
2. content negotiation нашёл writer;
3. status обрабатывается StatusCodePages.

### Вопросы

1. Что если endpoint уже вернул Problem()?
2. Как Accept влияет на writer?

---

## S-009 — `TryWriteAsync` и fallback

```text
source_id: S-009
image_hash: 79f320937f30
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Сначала вызывается writer с content negotiation. Если writer не найден, используется JSON fallback.

### Видимый код

```csharp
var written = await pdService.TryWriteAsync(
    new ProblemDetailsContext
    {
        HttpContext = http,
        ProblemDetails = pd
    });

if (!written)
{
    http.Response.ContentType =
        "application/problem+json; charset=utf-8";

    await http.Response.WriteAsJsonAsync(pd);
}
```

### Вопросы

1. Что означает false?
2. Когда fallback безопасен?

---

## S-010 — Error controller и original path

```text
source_id: S-010
image_hash: 1f4e8c8bdae3
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Controller читает `IStatusCodeReExecuteFeature.OriginalPath` и возвращает ProblemDetails для status code.

### Видимый код

```csharp
[ApiController]
[Route("api/error")]
public class ApiErrorController : ControllerBase
{
    [HttpGet("{statusCode:int}")]
    public IActionResult Handle(int statusCode)
    {
        var reExecute = HttpContext.Features
            .Get<IStatusCodeReExecuteFeature>();

        var originalPath =
            reExecute?.OriginalPath
            ?? HttpContext.Request.Path.Value;

        return Problem(
            statusCode: statusCode,
            title: ReasonPhrases.GetReasonPhrase(statusCode),
            type: $"https://httpstatuses.com/{statusCode}",
            detail: $"Request to '{originalPath}' failed.",
            instance: originalPath);
    }
}
```

### Вопросы

1. Где хранится original path?
2. Почему endpoint может фильтровать codes?

---

## S-011 — Default flow в одной цепочке

```text
source_id: S-011
image_hash: b99517eb2dd6
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

```text
StatusCodePages default handler
→ пытается записать ProblemDetails через TryWriteAsync
→ выполняется CustomizeProblemDetails
```

Главное ограничение — empty-body error responses.

### Вопросы

1. Что запускает цепочку?
2. Почему ready body не заменяется?

---

## S-012 — Что записывает StatusCodePages

```text
source_id: S-012
image_hash: f8bad6a05371
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Обычно generic problem document содержит:

- `status` — текущий response status;
- `title` — standard phrase;
- `type` — link/URI;
- `detail` — обычно empty без customization;
- `instance` — часто request path.

StatusCodePages не знает, почему приложение произвело 404/403; он оборачивает code, а не восстанавливает business reason.

### Вопросы

1. Какие поля generic?
2. Откуда брать безопасный detail?

---

# Native SVG canvas text — StatusCodePages

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseRouting();

app.UseWhen(
    ctx => ctx.Request.Path.StartsWithSegments("/api"),
    apiApp =>
    {
        apiApp.UseStatusCodePages(async statusCodeContext =>
        {
            var http = statusCodeContext.HttpContext;

            if (http.Response.HasStarted)
                return;

            var code = http.Response.StatusCode;

            if (code is not (
                StatusCodes.Status404NotFound or
                StatusCodes.Status405MethodNotAllowed or
                StatusCodes.Status406NotAcceptable or
                StatusCodes.Status415UnsupportedMediaType))
            {
                return;
            }

            var factory = http.RequestServices
                .GetRequiredService<ProblemDetailsFactory>();

            var pdService = http.RequestServices
                .GetRequiredService<IProblemDetailsService>();

            var detail = code switch
            {
                StatusCodes.Status404NotFound =>
                    "Endpoint not found.",
                StatusCodes.Status405MethodNotAllowed =>
                    "HTTP method not allowed for this endpoint.",
                StatusCodes.Status406NotAcceptable =>
                    "The requested response media type is not acceptable. Check the Accept header.",
                StatusCodes.Status415UnsupportedMediaType =>
                    "The request media type is unsupported. Check the Content-Type header.",
                _ => null
            };

            var pd = factory.CreateProblemDetails(
                httpContext: http,
                statusCode: code,
                title: ReasonPhrases.GetReasonPhrase(code),
                type: $"https://httpstatuses.com/{code}",
                detail: detail,
                instance: http.Request.Path);

            var written = await pdService.TryWriteAsync(
                new ProblemDetailsContext
                {
                    HttpContext = http,
                    ProblemDetails = pd
                });

            if (!written)
            {
                http.Response.ContentType =
                    "application/problem+json; charset=utf-8";
                await http.Response.WriteAsJsonAsync(pd);
            }
        });
    });

app.MapControllers();
app.Run();
```

Canvas notes:

```text
ADD STATUSCODEPAGES FOR 406/415 ETC
OR CREATE SOME ENDPOINTS FOR STATUS CODES
add check for status code and useful info about initial path
406 -> check Accept
415 -> check Content-Type
can't add exact reason, but can add useful details
```
