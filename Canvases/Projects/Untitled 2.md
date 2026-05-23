Да, фиксируем так.

## 1. Остаёмся на native `ProblemDetails`

Это нормальное решение. Не надо прямо сейчас заменять всё на свой кастомный error envelope.

Текущая модель:

```
HTTP error response→ native ProblemDetails→ extension с errors→ ServerError / ServerValidationError items
```

Оставляем её как основной API error contract.

При этом можно отдельно задокументировать, что у нас остаётся расширяемость:

```
ProblemDetails.Extensions может содержать дополнительные extension-поля,если slice/API contract явно это разрешает.
```

То есть сейчас стандартно:

```
errorsexception dev-only
```

А в будущем, если понадобится, можно добавить:

```
traceIdcorrelationIderrorGroupdetails
```

Но только если это будет описано в API contract конкретного slice или в общем API error contract doc.

---

## 2. Error codes — human-readable stable codes

Да, это стоит отдельно упомянуть для диплома.

У тебя error codes не выглядят как случайные машинные `ERR_1234`, а как читаемые стабильные коды:

```
account.email.is.requiredaccount.password.is.too.shortaccount.email.value.is.invalid
```

Это хороший компромисс:

```
- человек-разработчик понимает смысл кода;- клиент может стабильно сравнивать код;- текст сообщения не зашит в сервер;- код можно использовать в тестах;- код можно маппить на русский/английский текст на клиенте.
```

Формулировка для доков:

```
Error codes are stable, human-readable symbolic identifiers.They are not user-facing messages.Client maps them to presentation messages.
```

То есть:

```
error code = contractmessage = UI presentation
```

---

## 3. Upgrade .NET переносим

Да, переносим отдельно. Сейчас это не должно смешиваться с:

```
- client architecture;- OpenAPI contract;- ServerError / ProblemDetails contract;- slice planning;- UI/client sidecar workflow.
```

Можно завести отдельную future/infra задачу:

```
INFRA-NET-001 — Evaluate upgrade from .NET 8 to .NET 10 LTS
```

Статус:

```
Deferred.Not part of current slice/client work.
```

---

# Что надо будет записать в workflow/docs

Я бы добавил отдельный документ:

```
planning/api/api-error-contract.md
```

или, если ближе к slice planning:

```
planning/slices/api-error-contract.md
```

В нём:

```
# API Error Contract## 1. Default Error EnvelopeServer returns native ASP.NET `ProblemDetails` for API errors.## 2. Client-Facing Errors ExtensionClient-facing server errors are placed into the shared `errors` extension.## 3. Server Error ItemEach client-facing error item contains:- `FieldName`: API DTO field name or root/null- `ErrorCode`: stable human-readable error code## 4. Error Code PolicyError codes are stable, human-readable symbolic identifiers.Examples:- `account.email.is.required`- `account.password.is.too.short`- `request.review.request.not.in.review`Error codes are not user-facing messages.Client maps error codes to UI messages.## 5. Field Name PolicyServer returns API DTO field names.Client maps server DTO field names to client form field names when needed.## 6. Internal ErrorsNot every server/domain error is client-facing.Only errors intentionally returned through `ProblemDetails.errors` are part of the client/server contract.Internal errors are logged server-side and exposed to the client only as generic server error.## 7. Extension Policy`ProblemDetails.Extensions` may be extended later.Any new extension field that the client depends on must be documented in the API contract.
```

---

# Как это будет выглядеть в slice-файле

В parent slice:

```
### I02 — API LayerError contract:- errors are returned using native `ProblemDetails`;- client-facing errors are placed into shared `errors` extension;- error item uses:  - `FieldName`  - `ErrorCode`- `FieldName` uses API DTO field names;- `ErrorCode` is a stable human-readable symbolic code;- only client-facing errors are listed here.Client-facing error codes:| Error code | FieldName | HTTP status | Client handling ||---|---|---:|---|| `request.review.request.not.in.review` | root | 409 | stale state message + refetch || `request.review.applicant.cannot.be.verified` | root | 409/422 | root error |
```

---

# Как это будет выглядеть в client sidecar

```
## API / Error Contract UsageSource of truth:- parent slice `I02 — API Layer`- OpenAPI DTO types- shared generated error code constants- shared generated ProblemDetails/error field constantsClient behavior:- parse native `ProblemDetails`;- read errors from shared `errors` extension;- read `FieldName` and `ErrorCode` using shared constants;- map DTO field names to form field names if needed;- map error codes to UI messages;- handle known domain/stale-state errors explicitly;- show generic message for unknown/internal errors.
```

---

Итог: **native ProblemDetails остаётся**, `ServerError` внутри него становится явной частью client/server contract, error codes документируем как human-readable stable symbolic identifiers, а .NET upgrade переносим в deferred infra task.

что насчет генерации констант для клиента, как это реализовать? у меня был сервис котоый пишет константы в файл, я уже не помню как он работает но он был hosted т е запускался с приложением, сделать комманду для записии констаонт ?

Думал на протяжении 28s

1. Да, про FluentValidation надо смотреть на твою текущую реализацию валидаторов, а не автоматически мигрировать.

То, что я имел в виду: у FluentValidation у `ValidationFailure` есть отдельное поле `ErrorCode`, и его можно задать через `.WithErrorCode(...)`; потом оно доступно как `failure.ErrorCode`.

Но у тебя сейчас в `ProjectController` используется:

```
ServerValidationError.Create(f.PropertyName, f.ErrorMessage)
```

То есть текущий API-контракт, похоже, уже ожидает, что в `ErrorMessage` лежит стабильный human-readable error code. Это видно в base controller.

Если у тебя есть общие validation helpers, которые принимают explicit error code и кладут его в message, это рабочий вариант. Я бы не менял это прямо сейчас. Лучше записать как **current convention**:

```
Current validation convention:FluentValidation `ErrorMessage` contains stable human-readable error code.Base API error mapping uses `ValidationFailure.PropertyName` + `ValidationFailure.ErrorMessage`.
```

А целевое улучшение можно отложить:

```
Possible future improvement:Move stable code from `ErrorMessage` to FluentValidation `ErrorCode`and map `ValidationFailure.ErrorCode` into `ServerValidationError.ErrorCode`.
```

Это не blocker для client architecture.

---

2. По native `ProblemDetails`: да, оставляем.

Фиксируем так:

```
Default API error envelope:native ASP.NET ProblemDetails.Client-facing errors:stored in shared `errors` extension.Error item:ServerError / ServerValidationError with:- FieldName- ErrorCode
```

Кастомный `ProblemDetails` envelope пока не вводим, но оставляем возможность расширять `ProblemDetails.Extensions`, если конкретный slice/API contract это требует.

---

3. OpenAPI contract implementation

У тебя Swashbuckle уже подключён в server `.csproj`, а в `Program.cs` уже есть `AddEndpointsApiExplorer()` и `AddSwaggerGen()`.  
Microsoft описывает OpenAPI как спецификацию, которая документирует возможности API и используется tooling-ом вроде Swagger UI/codegen; для ASP.NET Core 8 и раньше Swashbuckle/NSwag — нормальный путь.

Я бы делал так:

```
Phase 1:- явно описать DTO классы;- явно описать response types через ProducesResponseType;- документировать ProblemDetails response shape;- пока не генерировать полный client, максимум генерировать TS types.Phase 2:- добавить npm script / dotnet script для генерации TS types из swagger.json.Phase 3:- если types-only мало, перейти к generated client wrapper.
```

Пример для action:

```
[HttpPost("{requestId:long}/approve")][ProducesResponseType(typeof(ApproveRequestResultDto), StatusCodes.Status200OK)][ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status409Conflict)][ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status422UnprocessableEntity)][ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status403Forbidden)][ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]public async Task<ActionResult<ApproveRequestResultDto>> Approve(long requestId){    ...}
```

Для `ProblemDetails.Extensions["errors"]` OpenAPI может быть неидеальным, потому что extensions динамические. Поэтому в документации slice/API contract отдельно пишем:

```
ProblemDetails contains shared `errors` extension.Each item has:- FieldName- ErrorCode
```

А на клиенте используем shared parser, который знает текущий формат.

---

4. По генерации constants

Hosted service, который пишет constants при запуске приложения, я бы больше не использовал как основной механизм.

Почему:

```
- запуск приложения не должен менять файлы в репозитории;- в production/runtime приложение не должно писать frontend contract files;- легко получить неожиданные изменения при обычном старте;- CI/build сложнее контролировать.
```

Лучше сделать явную команду:

```
dotnet run --project EnergyManagement.Tools -- generate-client-constants
```

или проще на первом этапе:

```
dotnet run --project EnergyManagement.Server -- generate-client-constants
```

Но чище — отдельный console/tool project:

```
EnergyManagement.Tools/  Program.cs  ClientConstantsGenerator.cs
```

Команда генерирует:

```
Shared/constants.jsonShared/errorcodes.json
```

из серверных источников:

```
AuthFieldNamesAuthRoutesProblemDetailsContractErrorObject / ErrorCodesRequestReviewErrorCodes...
```

И workflow такой:

```
1. Меняем серверные constants/error codes.2. Запускаем generate-client-constants.3. Проверяем diff в Shared/*.json.4. Клиент импортирует JSON.5. Integration tests проверяют, что API реально возвращает эти коды.
```

Для `Program.cs` можно оставить старые строки закомментированными или удалить после переноса:

```
// builder.Services.AddHostedService<ConstantWriterService>();
```

У тебя сейчас уже видно, что hosted writer был отключён, а `ErrorObject.Create()` регистрируется singleton-ом.

---

5. Как это связать с client/server contract

Итоговая схема:

```
OpenAPI:- DTO shape- endpoints- response DTOs- status codesGenerated constants JSON:- human-readable stable error codes- ProblemDetails extension names- ServerError field names- maybe route constants temporarilyClient:- imports generated DTOs/types from OpenAPI later- imports generated constants JSON now- maps error codes to UI messages- maps server DTO field names to form fields
```

И в slice parent file:

```
### I02 — API LayerContract sources:- DTO/schema: OpenAPI- client-facing error codes: generated shared constants JSON- error envelope: native ProblemDetails + shared errors extension
```

А в `.client.md`:

```
## API / Error Contract UsageClient uses:- generated DTO types from OpenAPI, when available;- generated shared error code constants;- generated field/extension constants;- local error-code-to-message map;- DTO-field-to-form-field mapping.
```

---

6. По .NET upgrade

Да, переносим. Текущий сервер на `net8.0`, и это не мешает client/server contract work.

Я бы зафиксировал:

```
INFRA-NET-001 — Evaluate .NET upgradeStatus: DeferredNot part of current client/slice/API-contract work.
```

Сейчас важнее стабилизировать:

```
- native ProblemDetails contract;- ServerError mapping;- generated constants command;- OpenAPI DTO contract;- client sidecar workflow.
```