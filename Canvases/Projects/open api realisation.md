## 5. Как реализовать OpenAPI-контракты

У тебя сервер на `net8.0`, и уже подключён `Swashbuckle.AspNetCore`.  
Microsoft описывает Swashbuckle/NSwag как инструменты для генерации OpenAPI-документации и Swagger UI для ASP.NET Core Web API; OpenAPI-документ описывает capabilities API и используется tooling-ом вроде Swagger UI/codegen.

Практический план:

### Шаг 1 — DTO-классы в server contracts

Например:

```
EnergyManagement.Server/Api/Contracts/Requests/ApproveRequestResultDto.csEnergyManagement.Server/Api/Contracts/Requests/RejectRequestDto.csEnergyManagement.Server/Api/Contracts/Common/ServerErrorDto.csEnergyManagement.Server/Api/Contracts/Common/ApiProblemDetailsDto.cs
```

DTO должны быть именно API contracts, а не domain entities.

---

### Шаг 2 — Action signatures с `ActionResult<T>`

Для OpenAPI лучше, чтобы controller action явно показывал success DTO:

```
[HttpPost("{requestId:long}/approve")][ProducesResponseType(typeof(ApproveRequestResultDto), StatusCodes.Status200OK)][ProducesResponseType(typeof(ApiProblemDetailsDto), StatusCodes.Status409Conflict)][ProducesResponseType(typeof(ApiProblemDetailsDto), StatusCodes.Status422UnprocessableEntity)][ProducesResponseType(typeof(ApiProblemDetailsDto), StatusCodes.Status403Forbidden)][ProducesResponseType(typeof(ApiProblemDetailsDto), StatusCodes.Status404NotFound)]public async Task<ActionResult<ApproveRequestResultDto>> Approve(long requestId){    ...}
```

ASP.NET Core docs отдельно указывают, что `ActionResult<T>`/`IActionResult` подходят, когда action может возвращать несколько типов результата/status codes.

---

### Шаг 3 — Явная схема для `ProblemDetails`

Обычный `ProblemDetails.Extensions["errors"]` не всегда удобно генерируется в TypeScript, потому что extension-поля динамические.

Поэтому есть два варианта.

#### Вариант A — оставить runtime `ProblemDetails`, но документировать DTO

```
public sealed class ApiProblemDetailsDto{    public string? Type { get; init; }    public string? Title { get; init; }    public int? Status { get; init; }    public string? Detail { get; init; }    public IReadOnlyList<ServerErrorDto>? Errors { get; init; }}
```

А runtime всё ещё может возвращать стандартный `ProblemDetails` с extension `errors`, если JSON shape совпадает.

#### Вариант B — перейти на свой `ApiProblemDetailsDto` как response body

Это проще для codegen, но чуть дальше от стандартного ASP.NET `ProblemDetails`.

Я бы выбрал **A на первом шаге**: runtime почти не ломаем, но OpenAPI получает явный schema contract.

---

### Шаг 4 — Swagger config

В `Program.cs` должно быть примерно:

```
builder.Services.AddEndpointsApiExplorer();builder.Services.AddSwaggerGen(options =>{    options.SupportNonNullableReferenceTypes();    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);    if (File.Exists(xmlPath))    {        options.IncludeXmlComments(xmlPath);    }});
```

И в dev:

```
app.UseSwagger();app.UseSwaggerUI();
```

У тебя `GenerateDocumentationFile` уже включён в csproj, так что XML comments можно подключить к Swagger.

---

### Шаг 5 — Генерация клиента

Дальше есть два рабочих варианта.

#### Вариант A — генерировать только TypeScript types

Например через `openapi-typescript`:

```
swagger/v1/swagger.json  → src/shared/api/generated/schema.d.ts
```

Тогда fetch/query/mutation функции ты пишешь сам, но DTO-типы берёшь из generated OpenAPI.

Это хорошо для твоей архитектуры, потому что у тебя всё равно есть:

```
entities/request/api/getEmployeeRequestDetailsfeatures/approve-request/api/approveRequest
```

#### Вариант B — генерировать полноценный TypeScript client

Через NSwag/OpenAPI Generator.

Это быстрее, но может хуже лечь на твою `entities/features` структуру, потому что сгенерированный client будет жить отдельно, а ты будешь писать обёртки.

Я бы начал с **types-only generation**, а потом при необходимости перейти к generated client.