## OpenAPI workflow: конспект

Общая цепочка:

```text
Server controllers / DTO / OpenAPI metadata
-> Shared/openapi.json
-> energymanagement.client/src/shared/api/generated/openapi-types.ts
-> typed client API wrappers
-> client slices
```

`Shared/openapi.json` — это **снимок структурного API-контракта**.  
`openapi-types.ts` — это **TypeScript-типы, сгенерированные из этого снимка**.

---

# 1. Что нужно, чтобы начать генерить `Shared/openapi.json`

## 1.1. На сервере должен быть Swagger/OpenAPI setup

Уже есть базово:

```csharp
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
```

И пакет:

```xml
<PackageReference Include="Swashbuckle.AspNetCore" Version="..." />
```

## 1.2. Сервер должен запускаться

Для running-server генерации нужно, чтобы backend поднимался:

```bash
dotnet run --project EnergyManagement.Server/EnergyManagement.Server.csproj --no-launch-profile -- --urls https://localhost:7250
```

Если backend требует БД, использовать test DB connection string или уже настроенный E2E/test DB workflow.

## 1.3. Swagger JSON должен быть доступен

Проверить вручную:

```bash
curl -k https://localhost:7250/swagger/v1/swagger.json
```

Или открыть в браузере:

```text
https://localhost:7250/swagger/v1/swagger.json
```

Если JSON открывается — можно писать его в файл:

```bash
curl -k https://localhost:7250/swagger/v1/swagger.json -o Shared/openapi.json
```

## 1.4. Client-facing endpoints должны иметь нормальную metadata

Иначе JSON будет сгенерен, но будет бедным.

Для endpoint-ов надо указывать response types:

```csharp
[ProducesResponseType(typeof(L1RegisterClientAccountResponse), StatusCodes.Status200OK)]
[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status422UnprocessableEntity)]
[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
```

Для protected endpoint-ов:

```csharp
[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status403Forbidden)]
```

## 1.5. DTO должны быть schema-friendly

То есть:

```text
- public DTO classes/records;
- public properties;
- понятные request/response DTO;
- DTO не должны зависеть от internal/domain-only типов;
- для client-facing API лучше иметь отдельные API DTO, а не отдавать domain entities напрямую.
```

## 1.6. Endpoint contract status должен быть понятен

Перед генерацией полезно классифицировать endpoints:

```text
target L1 contract
legacy/current support
temporary compatibility
internal/not client-facing
```

Например сейчас:

```text
target L1:
- POST /api/l1/auth/register
- POST /api/l1/applicant-parties/individual
- POST /api/l1/requests

legacy/current:
- старые auth/login/getUser endpoints, пока auth не мигрирован
```

---

# 2. Способы генерации `Shared/openapi.json`

## Вариант A — running server + curl

Команды:

```bash
dotnet run --project EnergyManagement.Server/EnergyManagement.Server.csproj --no-launch-profile -- --urls https://localhost:7250
```

В другом терминале:

```bash
curl -k https://localhost:7250/swagger/v1/swagger.json -o Shared/openapi.json
```

Плюсы:

```text
- самый простой;
- видно реальный runtime Swagger;
- удобно для первого раза.
```

Минусы:

```text
- надо держать сервер запущенным;
- зависит от окружения;
- хуже для CI/check mode.
```

## Вариант B — Swashbuckle CLI

Команды примерно:

```bash
dotnet build EnergyManagement.Server/EnergyManagement.Server.csproj
dotnet swagger tofile --output Shared/openapi.json EnergyManagement.Server/bin/Debug/net8.0/EnergyManagement.Server.dll v1
```

Если CLI не установлен:

```bash
dotnet new tool-manifest
dotnet tool install Swashbuckle.AspNetCore.Cli
```

Плюсы:

```text
- лучше для автоматизации;
- не надо вручную держать сервер;
- удобнее для check scripts.
```

Минусы:

```text
- может быть сложнее из-за startup/config;
- иногда всё равно требует корректное окружение.
```

## Вариант C — через `EnergyManagement.Tools`

Целевой удобный интерфейс:

```bash
dotnet run --project EnergyManagement.Tools -- generate-openapi --out Shared/openapi.json
```

Внутри tool всё равно будет использовать один из способов:

```text
- running server + download swagger json;
- или Swashbuckle CLI.
```

Плюсы:

```text
- единый стиль с generate-client-constants;
- можно добавить --check;
- удобно для CI и docs.
```

Минусы:

```text
- нужно реализовать orchestration;
- нужно управлять процессом server/timeout/logs, если используется running server.
```

---

# 3. Что нужно, чтобы генерить TypeScript types

## 3.1. Нужен готовый `Shared/openapi.json`

Типы генерятся **не напрямую из C#**, а из JSON:

```text
Shared/openapi.json
-> openapi-types.ts
```

## 3.2. Нужен пакет `openapi-typescript`

Добавить в client package:

```bash
npm --prefix energymanagement.client install -D openapi-typescript
```

## 3.3. Нужна папка для generated types

Целевой путь:

```text
energymanagement.client/src/shared/api/generated/openapi-types.ts
```

Создать папку:

```bash
mkdir -p energymanagement.client/src/shared/api/generated
```

На Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force energymanagement.client/src/shared/api/generated
```

## 3.4. Команда генерации типов

Из корня репо:

```bash
npx openapi-typescript Shared/openapi.json -o energymanagement.client/src/shared/api/generated/openapi-types.ts
```

Или через client package script:

```json
{
  "scripts": {
    "generate:api-types": "openapi-typescript ../Shared/openapi.json -o src/shared/api/generated/openapi-types.ts"
  }
}
```

Тогда запуск:

```bash
npm --prefix energymanagement.client run generate:api-types
```

---

# 4. Какие scripts стоит добавить

## Root `package.json`

```json
{
  "scripts": {
    "generate:api-types": "npm --prefix energymanagement.client run generate:api-types",
    "generate:api": "npm run generate:api-types",
    "check:api": "npm run generate:api && git diff --exit-code Shared/openapi.json energymanagement.client/src/shared/api/generated/openapi-types.ts"
  }
}
```

На первом этапе `generate:api` может включать только types, если `Shared/openapi.json` генеришь руками.

Когда появится `generate-openapi`:

```json
{
  "scripts": {
    "generate:openapi": "dotnet run --project EnergyManagement.Tools -- generate-openapi --out Shared/openapi.json",
    "generate:api-types": "npm --prefix energymanagement.client run generate:api-types",
    "generate:api": "npm run generate:openapi && npm run generate:api-types",
    "check:api": "npm run generate:api && git diff --exit-code Shared/openapi.json energymanagement.client/src/shared/api/generated/openapi-types.ts"
  }
}
```

## Client `package.json`

```json
{
  "scripts": {
    "generate:api-types": "openapi-typescript ../Shared/openapi.json -o src/shared/api/generated/openapi-types.ts"
  }
}
```

---

# 5. Как проверять руками

## Проверить constants отдельно

```bash
dotnet run --project EnergyManagement.Tools -- generate-client-constants --out Shared --check
```

## Сгенерировать OpenAPI JSON

Running server способ:

```bash
dotnet run --project EnergyManagement.Server/EnergyManagement.Server.csproj --no-launch-profile -- --urls https://localhost:7250
```

Потом:

```bash
curl -k https://localhost:7250/swagger/v1/swagger.json -o Shared/openapi.json
```

## Сгенерировать TS types

```bash
npm --prefix energymanagement.client run generate:api-types
```

## Проверить diff

```bash
git diff -- Shared/openapi.json energymanagement.client/src/shared/api/generated/openapi-types.ts
```

## Проверить, что всё актуально

```bash
npm run check:api
```

---

# 6. Что делать после генерации типов

Типы использовать в thin handwritten wrappers.

Примерно так:

```ts
import type { paths } from "@/shared/api/generated/openapi-types";

type RegisterRequest =
  paths["/api/l1/auth/register"]["post"]["requestBody"]["content"]["application/json"];

type RegisterResponse =
  paths["/api/l1/auth/register"]["post"]["responses"]["200"]["content"]["application/json"];
```

И wrapper:

```ts
export async function registerClientAccount(
  dto: RegisterRequest
): Promise<RegisterResponse> {
  const response = await fetch("/api/l1/auth/register", {
    method: "POST",
    body: JSON.stringify(dto),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw await response.json();
  }

  return await response.json();
}
```

То есть OpenAPI на первом этапе даёт **типы**, но сам fetch wrapper пока пишется руками.

---

# 7. Что не забыть

```text
OpenAPI JSON:
- generated artifact;
- committed;
- источник для TS types;
- не заменяет errorcodes.json.

openapi-types.ts:
- generated artifact;
- committed;
- не редактируется руками.

constants.json/errorcodes.json:
- semantic constants;
- error codes;
- ProblemDetails extension names;
- field-name constants;
- генерируются отдельно.

client API wrappers:
- ручные;
- но typed через generated OpenAPI types.
```

---

# 8. Минимальный порядок работ

```text
1. Добавить ProducesResponseType metadata на client-facing endpoints.
2. Запустить сервер.
3. Сохранить /swagger/v1/swagger.json в Shared/openapi.json.
4. Установить openapi-typescript.
5. Сгенерировать openapi-types.ts.
6. Добавить generate/check scripts.
7. Проверить git diff.
8. Commit generated artifacts.
```

Для первого прохода я бы начал с running server + curl, чтобы увидеть реальный JSON. Потом уже можно заворачивать это в `EnergyManagement.Tools generate-openapi`.