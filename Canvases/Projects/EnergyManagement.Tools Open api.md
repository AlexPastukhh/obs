Да, я бы делал **сразу через `EnergyManagement.Tools`**, чтобы OpenAPI работал по тому же принципу, что уже сделанные команды:

```
dotnet run --project EnergyManagement.Tools -- generate-client-constants --out Shareddotnet run --project EnergyManagement.Tools -- reset-test-db
```

`EnergyManagement.Tools` уже стал command-dispatcher’ом: сейчас он принимает `generate-client-constants` и `reset-test-db`, так что `generate-openapi` логично добавить туда же.

## Какой вариант генерации выбрать

Для первого нормального варианта я бы выбрал:

```
EnergyManagement.Tools generate-openapi-> запускает backend process-> ждёт /swagger/v1/swagger.json-> скачивает JSON через HttpClient-> форматирует deterministic JSON-> пишет Shared/openapi.json
```

То есть внутри tool мы автоматизируем running-server вариант из planning docs. В доках этот способ уже описан как первый быстрый вариант: поднять сервер и скачать `/swagger/v1/swagger.json`.

Почему не Swashbuckle CLI сразу:

```
- running-server generation показывает реальный runtime Swagger;- не нужен dotnet tool manifest для Swashbuckle CLI;- проще отлаживать;- у нас уже есть test DB reset workflow;- server уже умеет запускаться для E2E.
```

Swashbuckle CLI можно оставить как future improvement, если позже нужен более чистый CI/check pipeline.

## Что должен делать `generate-openapi`

Целевая команда:

```
dotnet run --project EnergyManagement.Tools -- generate-openapi --out Shared/openapi.json
```

Check mode:

```
dotnet run --project EnergyManagement.Tools -- generate-openapi --out Shared/openapi.json --check
```

Поведение:

```
write mode:  start backend  download swagger json  normalize/format json  write Shared/openapi.jsoncheck mode:  start backend  download swagger json  normalize/format json  compare with existing Shared/openapi.json  exit 0 if up to date  exit 1 if missing/outdated  do not modify file
```

Backend надо запускать с:

```
ASPNETCORE_ENVIRONMENT=DevelopmentConnectionStrings__ManagementDb=<TestEnergyManagement connection string>
```

`Development` нужен, потому что Swagger middleware сейчас включается только в Development. Это видно в `Program.cs`: `UseSwagger()` и `UseSwaggerUI()` вызываются внутри `if (app.Environment.IsDevelopment())`.

Test DB connection string уже вынесен в `TestDatabaseDefaults`, и Playwright использует его через env.

## Что нужно до генерации

Сначала нужно улучшить OpenAPI metadata на client-facing endpoints. Сейчас `L1Controller` имеет target L1 endpoints, но без явных `ProducesResponseType`.

Добавить примерно:

```
[ProducesResponseType(typeof(L1RegisterClientAccountResponse), StatusCodes.Status200OK)][ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status422UnprocessableEntity)][ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
```

Для `[Authorize]` endpoints:

```
[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)][ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status403Forbidden)]
```

Это прямо соответствует `CC-API-001`: OpenAPI должен показывать endpoints, DTO schemas, success/error statuses, ProblemDetails.

## Что с TypeScript types

После `Shared/openapi.json` генерируем:

```
energymanagement.client/src/shared/api/generated/openapi-types.ts
```

Командой:

```
npm --prefix energymanagement.client run generate:api-types
```

Для этого надо добавить `openapi-typescript` в client devDependencies и script в `energymanagement.client/package.json`. Сейчас `openapi-typescript` там ещё нет.


## импл
Да, кода получается заметно больше, потому что `Tools generate-openapi` — это не сама “магия OpenAPI”, а **обвязка вокруг процесса генерации**, чтобы она была повторяемой, проверяемой и удобной как `generate-client-constants`.

## Что именно реализуется в Tools

Высокоуровнево там будет не бизнес-логика, а orchestration:

```text
EnergyManagement.Tools generate-openapi
-> запустить backend
-> дождаться swagger json
-> скачать swagger json
-> нормализовать JSON
-> записать Shared/openapi.json
-> или проверить, что файл актуален
-> остановить backend
```

То есть Tool отвечает не за описание API. API всё равно описывается сервером: controllers, DTO, attributes, `ProducesResponseType`, Swagger metadata. Это уже зафиксировано в `CC-API-001`: серверная metadata → `Shared/openapi.json` → generated TypeScript types.

## Из каких частей состоит Tools-реализация

Примерно так:

```text
GenerateOpenApiOptions
```

Парсит:

```bash
generate-openapi --out Shared/openapi.json --check
```

То есть отвечает только за CLI args.

```text
OpenApiServerProcessRunner
```

Запускает backend процесс:

```bash
dotnet run --project EnergyManagement.Server/EnergyManagement.Server.csproj --no-launch-profile -- --urls https://127.0.0.1:7250
```

и передаёт env:

```text
ASPNETCORE_ENVIRONMENT=Development
ConnectionStrings__ManagementDb=TestEnergyManagement...
```

`Development` нужен, потому что Swagger middleware включается только в Development.

```text
OpenApiDocumentFetcher
```

Ждёт и скачивает:

```text
https://127.0.0.1:7250/swagger/v1/swagger.json
```

```text
OpenApiJsonFormatter
```

Берёт скачанный JSON, парсит и записывает стабильно:

```text
- indented JSON;
- без timestamp;
- одинаковый порядок насколько возможно;
- final newline "\n";
```

Это нужно, чтобы `git diff` не прыгал от машины к машине.

```text
OpenApiArtifactWriter
```

Пишет:

```text
Shared/openapi.json
```

```text
OpenApiArtifactChecker
```

В `--check` режиме сравнивает generated content с existing file и ничего не пишет.

```text
GenerateOpenApiCommand
```

Склеивает всё вместе.

## Почему кода много

Потому что tool пытается закрыть сразу несколько инженерных требований:

```text
- запуск без ручных терминалов;
- правильный backend env;
- test DB connection;
- ожидание readiness;
- HTTPS dev cert handling;
- стабильный JSON;
- write mode;
- check mode;
- нормальные exit codes;
- не писать артефакты при обычном server startup.
```

Это тот же принцип, что у constants generator: source of truth на сервере, artifact committed, check mode проверяет актуальность. У тебя `EnergyManagement.Tools` уже работает как command dispatcher для `generate-client-constants` и `reset-test-db`, поэтому `generate-openapi` туда логично ложится.

## Можно ли проще?

Да. **Контракты всё равно будут генериться**, если сохраняется эта цепочка:

```text
server Swagger/OpenAPI endpoint
-> Shared/openapi.json
-> openapi-typescript
-> openapi-types.ts
```

Способ получения `Shared/openapi.json` — это техническая деталь.

## Самый простой способ без Tools

Руками:

```bash
dotnet run --project EnergyManagement.Server/EnergyManagement.Server.csproj --no-launch-profile -- --urls https://localhost:7250
```

В другом терминале:

```bash
curl -k https://localhost:7250/swagger/v1/swagger.json -o Shared/openapi.json
```

Потом:

```bash
npm --prefix energymanagement.client run generate:api-types
```

Контракт будет тот же, потому что источник тот же — `/swagger/v1/swagger.json`. Этот вариант прямо описан в planning docs как running-server generation.

Минусы:

```text
- надо руками запускать сервер;
- надо помнить правильный env/connection string;
- нет нормального --check;
- легко забыть обновить файл;
- хуже для CI;
- хуже для повторяемости.
```

## Средний вариант

Можно не делать сложный `ProcessRunner`, а начать с npm scripts:

```json
{
  "scripts": {
    "generate:api-types": "npm --prefix energymanagement.client run generate:api-types",
    "check:api": "npm run generate:api-types && git diff --exit-code Shared/openapi.json energymanagement.client/src/shared/api/generated/openapi-types.ts"
  }
}
```

А `Shared/openapi.json` пока генерить руками через curl.

Это проще, но тогда OpenAPI JSON generation остаётся manual step.

## Более простой Tools-вариант

Компромисс:

```text
Tools не запускает backend.
Tools только скачивает swagger с уже запущенного backend.
```

Команда:

```bash
dotnet run --project EnergyManagement.Tools -- generate-openapi --source https://localhost:7250/swagger/v1/swagger.json --out Shared/openapi.json
```

Тогда кода меньше:

```text
- options parser;
- HttpClient fetcher;
- formatter;
- writer/checker.
```

Но backend всё равно надо запускать отдельно.

## Мой вывод

Если тебе сейчас хочется быстрее перейти к клиентским слайсам, можно упростить:

```text
1. Сначала сделать manual/curl генерацию Shared/openapi.json.
2. Сделать openapi-typescript generation.
3. Добавить check для generated types.
4. Позже завернуть OpenAPI JSON generation в Tools.
```

Но если цель — аккуратный дипломный workflow, лучше оставить Tools-вариант, потому что он красиво показывает:

```text
explicit contract generation;
no server startup side effects;
repeatable generated artifacts;
check mode;
same pattern as constants generation.
```

Главное: **контракт будет тем же самым**, если `Shared/openapi.json` получен из того же серверного Swagger endpoint. Меняется только удобство, повторяемость и надёжность генерации.

## нек вопро
Да, по сути в `generate-openapi` есть часть логики, похожая на `generate-client-constants`: **получить generated content → привести к стабильному виду → записать файл или проверить файл**.

Разница в источнике:

```text
generate-client-constants:
server C# constants
-> snapshot object
-> JSON string
-> Shared/constants.json / Shared/errorcodes.json

generate-openapi:
running server / swagger endpoint
-> raw swagger JSON
-> normalized JSON string
-> Shared/openapi.json
```

## Что значит “нормализовать JSON”

“Нормализовать” здесь значит: взять JSON, который вернул Swagger endpoint, и привести его к **стабильному файловому виду**, чтобы он одинаково выглядел при повторной генерации.

Не нормализованный JSON может быть таким:

```json
{"openapi":"3.0.1","info":{"title":"EnergyManagement.Server","version":"1.0"},"paths":{"/api/l1/auth/register":{"post":{"tags":["L1"],"responses":{"200":{"description":"OK"}}}}}}
```

А нормализованный — таким:

```json
{
  "openapi": "3.0.1",
  "info": {
    "title": "EnergyManagement.Server",
    "version": "1.0"
  },
  "paths": {
    "/api/l1/auth/register": {
      "post": {
        "tags": [
          "L1"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    }
  }
}
```

То есть нормализация — это не изменение смысла контракта, а приведение файла к удобному и стабильному виду.

## Зачем нормализовать

Чтобы generated artifact был нормальным для Git:

```text
- readable diff;
- одинаковое форматирование при каждом запуске;
- одинаковый final newline;
- меньше случайных изменений между Windows/Linux;
- check mode может сравнивать expected и actual как текст.
```

Например, без нормализации один запуск может дать compact JSON, другой — indented JSON. Смысл тот же, но `git diff` будет огромный.

Или на Windows в конце файла будет `\r\n`, а на Linux `\n`. Тогда `check` может ругаться на файл, хотя контракт не поменялся.

## Что обычно входит в нормализацию

Минимально:

```text
1. Parse raw JSON.
2. Serialize it back with WriteIndented = true.
3. Add final newline "\n".
4. In check mode normalize line endings before comparison.
```

На C# это выглядит примерно так:

```csharp
public string Format(string rawJson)
{
    using var document = JsonDocument.Parse(rawJson);

    var options = new JsonSerializerOptions
    {
        WriteIndented = true
    };

    return JsonSerializer.Serialize(document.RootElement, options) + "\n";
}
```

## Важно: нормализация не должна менять контракт

Нормализация **не должна**:

```text
- переименовывать endpoints;
- удалять schemas;
- менять status codes;
- фильтровать paths;
- менять DTO shapes;
- добавлять operationId;
- исправлять ошибки OpenAPI.
```

Если в OpenAPI плохой endpoint или нет response metadata — это чинится на сервере через controller attributes / Swagger config, а не “нормализацией”.

## А что с ordering?

Тут тонкость.

Если ты просто делаешь:

```csharp
JsonDocument.Parse(rawJson)
JsonSerializer.Serialize(root, WriteIndented = true)
```

порядок свойств обычно сохранится таким, каким его отдал Swagger. Для первого этапа этого достаточно.

Более сильная нормализация могла бы сортировать свойства по алфавиту:

```text
components.schemas
paths
responses
```

Но я бы **не делал сортировку сейчас**, потому что:

```text
- это лишний код;
- можно случайно сломать структуру;
- Swagger обычно и так достаточно стабилен;
- readable diff важнее, чем идеальная canonical JSON sorting.
```

То есть сейчас нормализация = **pretty print + stable newline**, не больше.

## Как это связано с writer/checker

Для OpenAPI будет та же идея, что с константами:

```text
OpenApiJsonFormatter
  raw swagger json -> normalized json string

OpenApiArtifactWriter
  normalized json string -> Shared/openapi.json

OpenApiArtifactChecker
  normalized json string + existing Shared/openapi.json -> match/mismatch
```

`Writer` пишет файл.

`Checker` ничего не пишет. Он только сравнивает.

## Супер-коротко

```text
Нормализовать = привести swagger JSON к стабильному текстовому виду:
parse -> pretty print -> final "\n" -> compare with normalized line endings.
```

Это нужно не для генерации контракта как такового, а чтобы `Shared/openapi.json` был хорошим generated artifact для Git и `--check`.