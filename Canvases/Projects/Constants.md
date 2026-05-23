Да, разложим аккуратно.

## 1. Что такое `ClientConstantsSnapshotFactory`

`ClientConstantsSnapshotFactory` — это класс, который **собирает in-memory модель будущих JSON-файлов** из серверных source-of-truth constants.

То есть он не пишет файлы и не занимается CLI. Его задача только такая:

```text
C# server constants
→ strongly typed snapshot object
```

Например сейчас у тебя уже есть похожая идея в `ErrorObject.Create()`: он собирает объект из доменных error constants и `ServerValidationErrorContract.Create()`, который берёт имена `FieldName` и `ErrorCode` через `nameof(instance.FieldName)` / `nameof(instance.ErrorCode)`.

То есть `ErrorObject.Create()` уже почти является старым вариантом `CreateErrorCodesSnapshot()`.

Целевое разделение:

```csharp
public static class ClientConstantsSnapshotFactory
{
    public static ClientConstantsSnapshot CreateConstants()
    {
        return new ClientConstantsSnapshot(
            AuthConstants: CreateAuthConstants(),
            GeneralConstants: CreateGeneralConstants(),
            Routes: CreateRoutes()
        );
    }

    public static ClientErrorCodesSnapshot CreateErrorCodes()
    {
        return new ClientErrorCodesSnapshot(
            Email: CreateEmailErrorCodes(),
            Password: CreatePasswordErrorCodes(),
            PasswordConfirmation: CreatePasswordConfirmationErrorCodes(),
            Phone: CreatePhoneErrorCodes(),
            ServerValidationError: CreateServerValidationErrorContract()
        );
    }
}
```

Важно:

```text
Factory не сериализует.
Factory не пишет файл.
Factory не сравнивает файлы.
Factory только собирает объект, который потом можно сериализовать.
```

---

## 2. Почему это называется snapshot

Потому что это “снимок” client-facing contract на момент генерации.

Например:

```text
server constants сейчас такие
→ snapshot такой
→ JSON должен быть таким
```

Snapshot — это не доменная модель и не runtime-сервис. Это DTO для генерации client artifact.

Пример:

```csharp
public sealed record ClientErrorCodesSnapshot(
    EmailErrorCodesSnapshot Email,
    PasswordErrorCodesSnapshot Password,
    PasswordConfirmationErrorCodesSnapshot PasswordConfirmation,
    PhoneErrorCodesSnapshot Phone,
    ServerValidationErrorContractSnapshot ServerValidationError
);
```

Он по форме должен соответствовать тому JSON, который клиент уже читает.

---

## 3. Что делает каждый класс в `EnergyManagement.Tools`

Я бы планировал так.

```text
EnergyManagement.Tools/
  Program.cs
  ClientConstants/
    GenerateClientConstantsCommand.cs
    ClientConstantsSnapshotFactory.cs
    ClientConstantsArtifacts.cs
    ClientConstantsJsonSerializer.cs
    ClientConstantsWriter.cs
    ClientConstantsChecker.cs
    ClientConstantsPathResolver.cs
```

### `Program.cs`

Точка входа.

Отвечает за:

```text
- прочитать args;
- понять команду: generate-client-constants;
- понять опции: --out, --check;
- вызвать GenerateClientConstantsCommand;
- вернуть exit code 0 или 1.
```

Примерно:

```csharp
return await GenerateClientConstantsCommand.RunAsync(args);
```

Он не должен знать детали JSON shape.

---

### `GenerateClientConstantsCommand`

Оркестратор команды.

Делает:

```text
1. определить output path;
2. создать artifacts через factory;
3. если обычный режим — вызвать writer;
4. если --check — вызвать checker;
5. вернуть результат.
```

Пример:

```csharp
public sealed class GenerateClientConstantsCommand
{
    public int Run(GenerateClientConstantsOptions options)
    {
        var outputDirectory = _pathResolver.Resolve(options.Out);

        var artifacts = ClientConstantsArtifacts.CreateCurrent();

        if (options.Check)
        {
            var check = _checker.Check(outputDirectory, artifacts);
            return check.IsSuccess ? 0 : 1;
        }

        _writer.Write(outputDirectory, artifacts);
        return 0;
    }
}
```

---

### `ClientConstantsArtifacts`

Это контейнер для двух будущих файлов.

```csharp
public sealed record ClientConstantsArtifacts(
    string ConstantsJson,
    string ErrorCodesJson
);
```

Или можно хранить не строки, а snapshots:

```csharp
public sealed record ClientConstantsArtifacts(
    ClientConstantsSnapshot Constants,
    ClientErrorCodesSnapshot ErrorCodes
);
```

Я бы сделал так:

```csharp
public sealed record ClientConstantsArtifacts(
    string ConstantsJson,
    string ErrorCodesJson
)
{
    public static ClientConstantsArtifacts CreateCurrent()
    {
        var constants = ClientConstantsSnapshotFactory.CreateConstants();
        var errorCodes = ClientConstantsSnapshotFactory.CreateErrorCodes();

        return new ClientConstantsArtifacts(
            ConstantsJson: ClientConstantsJsonSerializer.Serialize(constants),
            ErrorCodesJson: ClientConstantsJsonSerializer.Serialize(errorCodes)
        );
    }
}
```

Смысл: команда работает с готовыми artifact strings, а не знает, как сериализовать.

---

### `ClientConstantsSnapshotFactory`

Главный builder snapshot-объектов.

Он отвечает за:

```text
- какие C# constants попадают в client artifact;
- какая структура у constants.json;
- какая структура у errorcodes.json;
- как server constants превращаются в client-facing contract snapshot.
```

Пример:

```csharp
private static ServerValidationErrorContractSnapshot CreateServerValidationErrorContract()
{
    var instance = ServerValidationError.Create("", "");

    return new ServerValidationErrorContractSnapshot(
        FieldNameField: nameof(instance.FieldName),
        ErrorCodeField: nameof(instance.ErrorCode)
    );
}
```

Это похоже на твою текущую реализацию `ServerValidationErrorContract.Create()`.

---

### `ClientConstantsJsonSerializer`

Единое место для JSON serialization.

Отвечает за:

```text
- WriteIndented = true;
- PropertyNamingPolicy = null;
- стабильный формат;
- единый newline, если захочешь;
- чтобы PascalCase/текущие property names не сломались случайно.
```

Пример:

```csharp
public static class ClientConstantsJsonSerializer
{
    private static readonly JsonSerializerOptions Options = new()
    {
        WriteIndented = true,
        PropertyNamingPolicy = null
    };

    public static string Serialize<T>(T value)
    {
        return JsonSerializer.Serialize(value, Options) + Environment.NewLine;
    }
}
```

---

### `ClientConstantsWriter`

Пишет файлы.

Отвечает только за IO:

```text
- создать output directory, если его нет;
- записать constants.json;
- записать errorcodes.json.
```

Пример:

```csharp
public sealed class ClientConstantsWriter
{
    public void Write(string outputDirectory, ClientConstantsArtifacts artifacts)
    {
        Directory.CreateDirectory(outputDirectory);

        File.WriteAllText(
            Path.Combine(outputDirectory, "constants.json"),
            artifacts.ConstantsJson);

        File.WriteAllText(
            Path.Combine(outputDirectory, "errorcodes.json"),
            artifacts.ErrorCodesJson);
    }
}
```

---

### `ClientConstantsChecker`

Проверяет, что файлы уже актуальны.

Он **не пишет файлы**.

Отвечает за:

```text
- прочитать existing constants.json;
- прочитать existing errorcodes.json;
- сравнить с generated strings;
- вернуть success/failure + список отличающихся файлов.
```

Пример:

```csharp
public sealed class ClientConstantsChecker
{
    public ClientConstantsCheckResult Check(
        string outputDirectory,
        ClientConstantsArtifacts expected)
    {
        var constantsPath = Path.Combine(outputDirectory, "constants.json");
        var errorCodesPath = Path.Combine(outputDirectory, "errorcodes.json");

        var mismatches = new List<string>();

        if (!File.Exists(constantsPath) ||
            File.ReadAllText(constantsPath) != expected.ConstantsJson)
        {
            mismatches.Add("constants.json");
        }

        if (!File.Exists(errorCodesPath) ||
            File.ReadAllText(errorCodesPath) != expected.ErrorCodesJson)
        {
            mismatches.Add("errorcodes.json");
        }

        return mismatches.Count == 0
            ? ClientConstantsCheckResult.Success()
            : ClientConstantsCheckResult.Failure(mismatches);
    }
}
```

---

### `ClientConstantsPathResolver`

Необязательный, но полезный класс.

Отвечает за:

```text
- если --out указан, использовать его;
- если не указан, найти repo root;
- вернуть путь к Shared.
```

Например:

```text
--out Shared
```

значит:

```text
write/check:
Shared/constants.json
Shared/errorcodes.json
```

---

## 4. Тесты, которые оставляем / убираем

Ты сказал:

```text
- convention tests точно не надо
- duplicate test можно
- serialization test можно
- checker test нужен
- golden test пока не нужен
```

Согласен.

Тогда минимальный набор:

```text
1. Snapshot shape tests
2. Duplicate error codes test
3. Serialization tests
4. Writer tests
5. Checker tests
```

Без convention tests и без golden file.

---

## 5. Тест на форму / shape test

Под “тест на форму” я имею в виду тест, который проверяет **структуру snapshot/JSON**, а не конкретно каждую константу.

Например клиент ожидает, что в `errorcodes.json` есть:

```json
{
  "ServerValidationError": {
    "FieldNameField": "FieldName",
    "ErrorCodeField": "ErrorCode"
  }
}
```

Тест:

```csharp
[Fact]
public void CreateErrorCodesSnapshot_ContainsServerValidationErrorContract()
{
    var snapshot = ClientConstantsSnapshotFactory.CreateErrorCodes();

    Assert.NotNull(snapshot.ServerValidationError);
    Assert.Equal("FieldName", snapshot.ServerValidationError.FieldNameField);
    Assert.Equal("ErrorCode", snapshot.ServerValidationError.ErrorCodeField);
}
```

Зачем это нужно:

```text
Если кто-то поменял форму generated artifact,
тест падает и заставляет явно обновить клиентский parser/importer/docs.
```

Это не golden test. Мы не сравниваем весь файл. Мы проверяем обязательные contract-секции.

Ещё пример shape test:

```csharp
[Fact]
public void CreateErrorCodesSnapshot_ContainsCurrentTopLevelSections()
{
    var snapshot = ClientConstantsSnapshotFactory.CreateErrorCodes();

    Assert.NotNull(snapshot.Email);
    Assert.NotNull(snapshot.Password);
    Assert.NotNull(snapshot.PasswordConfirmation);
    Assert.NotNull(snapshot.Phone);
    Assert.NotNull(snapshot.ServerValidationError);
}
```

Если ты потом добавишь `RequestReview`, тест можно обновить. Если кто-то случайно удалит `ServerValidationError`, тест упадёт.

---

## 6. Тест на casing / PascalCase

Да, проверка casing нужна именно для того, чтобы явно увидеть изменение contract shape.

Сейчас клиент, судя по текущему подходу, ожидает конкретные имена property из JSON. Если кто-то поменяет serializer на `camelCase`, получится:

```json
{
  "serverValidationError": {
    "fieldNameField": "FieldName",
    "errorCodeField": "ErrorCode"
  }
}
```

вместо:

```json
{
  "ServerValidationError": {
    "FieldNameField": "FieldName",
    "ErrorCodeField": "ErrorCode"
  }
}
```

Это может сломать клиентский импорт/доступ к полям.

Тест:

```csharp
[Fact]
public void Serializer_KeepsExpectedPropertyCasing()
{
    var snapshot = ClientConstantsSnapshotFactory.CreateErrorCodes();

    var json = ClientConstantsJsonSerializer.Serialize(snapshot);

    Assert.Contains("\"ServerValidationError\"", json);
    Assert.Contains("\"FieldNameField\"", json);
    Assert.Contains("\"ErrorCodeField\"", json);
}
```

Да, это тоже сигнализация:

```text
Изменился shape/casing client artifact.
Проверь клиент, docs и parser.
```

Это не про бизнес-логику. Это contract-shape guard.

---

## 7. Тест на дубликаты error codes

Этот тест полезен.

Идея: если два разных semantic error case случайно получили один и тот же code, клиент не сможет их различить.

Пример helper:

```csharp
public static class ErrorCodeFlattener
{
    public static IReadOnlyList<string> Flatten(ClientErrorCodesSnapshot snapshot)
    {
        var result = new List<string>();

        void AddPublicStringProperties(object obj)
        {
            foreach (var prop in obj.GetType().GetProperties())
            {
                var value = prop.GetValue(obj);

                if (value is string s)
                {
                    result.Add(s);
                }
                else if (value is not null)
                {
                    AddPublicStringProperties(value);
                }
            }
        }

        AddPublicStringProperties(snapshot);

        return result;
    }
}
```

Тест:

```csharp
[Fact]
public void ErrorCodes_AreUnique()
{
    var snapshot = ClientConstantsSnapshotFactory.CreateErrorCodes();

    var codes = ErrorCodeFlattener.Flatten(snapshot);

    Assert.Equal(codes.Count, codes.Distinct().Count());
}
```

Нюанс: надо не включить в этот список `FieldNameField = "FieldName"` и `ErrorCodeField = "ErrorCode"`, потому что это не error codes. Можно либо flatten только known error-code groups, либо исключить `ServerValidationError`.

---

## 8. Тест сериализации

Минимально два теста.

### A. Сериализация стабильна

```csharp
[Fact]
public void Serializer_ProducesStableOutput()
{
    var snapshot = ClientConstantsSnapshotFactory.CreateErrorCodes();

    var first = ClientConstantsJsonSerializer.Serialize(snapshot);
    var second = ClientConstantsJsonSerializer.Serialize(snapshot);

    Assert.Equal(first, second);
}
```

Зачем:

```text
Чтобы генератор не создавал случайный diff при каждом запуске.
```

### B. Сериализация сохраняет expected casing / shape

Это тот тест, который выше:

```csharp
[Fact]
public void Serializer_KeepsExpectedPropertyCasing()
{
    var snapshot = ClientConstantsSnapshotFactory.CreateErrorCodes();

    var json = ClientConstantsJsonSerializer.Serialize(snapshot);

    Assert.Contains("\"ServerValidationError\"", json);
    Assert.Contains("\"FieldNameField\"", json);
    Assert.Contains("\"ErrorCodeField\"", json);
}
```

---

## 9. Writer tests

Writer tests проверяют, что `ClientConstantsWriter` правильно пишет файлы.

### Успешный writer test

```csharp
[Fact]
public void Writer_WritesConstantsAndErrorCodesFiles()
{
    using var temp = new TempDirectory();

    var artifacts = new ClientConstantsArtifacts(
        ConstantsJson: "{ \"Constants\": true }\n",
        ErrorCodesJson: "{ \"ErrorCodes\": true }\n"
    );

    var writer = new ClientConstantsWriter();

    writer.Write(temp.Path, artifacts);

    var constantsPath = Path.Combine(temp.Path, "constants.json");
    var errorCodesPath = Path.Combine(temp.Path, "errorcodes.json");

    Assert.True(File.Exists(constantsPath));
    Assert.True(File.Exists(errorCodesPath));

    Assert.Equal(artifacts.ConstantsJson, File.ReadAllText(constantsPath));
    Assert.Equal(artifacts.ErrorCodesJson, File.ReadAllText(errorCodesPath));
}
```

Что проверяет:

```text
- writer создаёт нужные файлы;
- пишет именно constants.json и errorcodes.json;
- содержимое не портится;
- путь output directory используется правильно.
```

### Writer creates directory

Если output folder ещё нет:

```csharp
[Fact]
public void Writer_CreatesOutputDirectory_WhenItDoesNotExist()
{
    using var temp = new TempDirectory();

    var output = Path.Combine(temp.Path, "Shared");

    var artifacts = new ClientConstantsArtifacts(
        ConstantsJson: "{}\n",
        ErrorCodesJson: "{}\n"
    );

    var writer = new ClientConstantsWriter();

    writer.Write(output, artifacts);

    Assert.True(Directory.Exists(output));
    Assert.True(File.Exists(Path.Combine(output, "constants.json")));
    Assert.True(File.Exists(Path.Combine(output, "errorcodes.json")));
}
```

---

## 10. Ошибочный writer test

Тут надо решить, какое поведение мы хотим.

Я бы не делал сложную обработку всех IO-ошибок. Writer может просто дать исключению подняться. Это нормально для tool-команды: если нельзя записать файл — команда падает.

Тогда ошибочный тест может быть:

```csharp
[Fact]
public void Writer_Throws_WhenOutputPathIsAFile()
{
    using var temp = new TempDirectory();

    var outputPath = Path.Combine(temp.Path, "Shared");
    File.WriteAllText(outputPath, "I am a file, not a directory");

    var artifacts = new ClientConstantsArtifacts(
        ConstantsJson: "{}\n",
        ErrorCodesJson: "{}\n"
    );

    var writer = new ClientConstantsWriter();

    Assert.Throws<IOException>(() => writer.Write(outputPath, artifacts));
}
```

Что проверяет:

```text
Если output path некорректный, writer не делает вид, что всё успешно.
Команда должна упасть, а не silently skip.
```

Можно не тестировать все OS-specific cases вроде permission denied, потому что они нестабильнее.

---

## 11. Checker tests

Да, checker tests нужны.

Checker — это как раз основа `--check` режима.

### A. Check success when files match

```csharp
[Fact]
public void Checker_ReturnsSuccess_WhenFilesMatchGeneratedArtifacts()
{
    using var temp = new TempDirectory();

    var artifacts = new ClientConstantsArtifacts(
        ConstantsJson: "{ \"Constants\": true }\n",
        ErrorCodesJson: "{ \"ErrorCodes\": true }\n"
    );

    var writer = new ClientConstantsWriter();
    writer.Write(temp.Path, artifacts);

    var checker = new ClientConstantsChecker();

    var result = checker.Check(temp.Path, artifacts);

    Assert.True(result.IsSuccess);
    Assert.Empty(result.MismatchedFiles);
}
```

Что проверяет:

```text
Если committed files совпадают с generated artifacts,
--check должен пройти.
```

### B. Check failure when errorcodes is outdated

```csharp
[Fact]
public void Checker_ReturnsFailure_WhenErrorCodesFileIsOutdated()
{
    using var temp = new TempDirectory();

    var expected = new ClientConstantsArtifacts(
        ConstantsJson: "{ \"Constants\": true }\n",
        ErrorCodesJson: "{ \"ErrorCodes\": true }\n"
    );

    var existing = new ClientConstantsArtifacts(
        ConstantsJson: "{ \"Constants\": true }\n",
        ErrorCodesJson: "{ \"ErrorCodes\": false }\n"
    );

    var writer = new ClientConstantsWriter();
    writer.Write(temp.Path, existing);

    var checker = new ClientConstantsChecker();

    var result = checker.Check(temp.Path, expected);

    Assert.False(result.IsSuccess);
    Assert.Contains("errorcodes.json", result.MismatchedFiles);
}
```

Что проверяет:

```text
Если Shared/errorcodes.json устарел,
--check должен упасть.
```

### C. Check failure when constants is outdated

```csharp
[Fact]
public void Checker_ReturnsFailure_WhenConstantsFileIsOutdated()
{
    using var temp = new TempDirectory();

    var expected = new ClientConstantsArtifacts(
        ConstantsJson: "{ \"Constants\": true }\n",
        ErrorCodesJson: "{ \"ErrorCodes\": true }\n"
    );

    var existing = new ClientConstantsArtifacts(
        ConstantsJson: "{ \"Constants\": false }\n",
        ErrorCodesJson: "{ \"ErrorCodes\": true }\n"
    );

    new ClientConstantsWriter().Write(temp.Path, existing);

    var result = new ClientConstantsChecker().Check(temp.Path, expected);

    Assert.False(result.IsSuccess);
    Assert.Contains("constants.json", result.MismatchedFiles);
}
```

### D. Check failure when file is missing

```csharp
[Fact]
public void Checker_ReturnsFailure_WhenFileIsMissing()
{
    using var temp = new TempDirectory();

    File.WriteAllText(Path.Combine(temp.Path, "constants.json"), "{}\n");
    // errorcodes.json missing

    var expected = new ClientConstantsArtifacts(
        ConstantsJson: "{}\n",
        ErrorCodesJson: "{}\n"
    );

    var result = new ClientConstantsChecker().Check(temp.Path, expected);

    Assert.False(result.IsSuccess);
    Assert.Contains("errorcodes.json", result.MismatchedFiles);
}
```

### E. Check does not modify files

```csharp
[Fact]
public void Checker_DoesNotModifyFiles_WhenMismatchExists()
{
    using var temp = new TempDirectory();

    var constantsPath = Path.Combine(temp.Path, "constants.json");
    var errorCodesPath = Path.Combine(temp.Path, "errorcodes.json");

    File.WriteAllText(constantsPath, "{ \"oldConstants\": true }\n");
    File.WriteAllText(errorCodesPath, "{ \"oldErrorCodes\": true }\n");

    var beforeConstants = File.ReadAllText(constantsPath);
    var beforeErrorCodes = File.ReadAllText(errorCodesPath);

    var expected = new ClientConstantsArtifacts(
        ConstantsJson: "{ \"newConstants\": true }\n",
        ErrorCodesJson: "{ \"newErrorCodes\": true }\n"
    );

    var result = new ClientConstantsChecker().Check(temp.Path, expected);

    var afterConstants = File.ReadAllText(constantsPath);
    var afterErrorCodes = File.ReadAllText(errorCodesPath);

    Assert.False(result.IsSuccess);
    Assert.Equal(beforeConstants, afterConstants);
    Assert.Equal(beforeErrorCodes, afterErrorCodes);
}
```

Это важно, потому что `--check` не должен перезаписывать файлы. Он только сигналит.

---

## 12. Итоговый набор тестов без convention/golden

Я бы оставил такой список:

```text
ClientConstantsSnapshotFactoryTests
- CreateErrorCodesSnapshot_ContainsRequiredTopLevelSections
- CreateErrorCodesSnapshot_ContainsServerValidationErrorContract
- ErrorCodes_AreUnique

ClientConstantsJsonSerializerTests
- Serializer_ProducesStableOutput
- Serializer_KeepsExpectedPropertyCasing

ClientConstantsWriterTests
- Writer_WritesConstantsAndErrorCodesFiles
- Writer_CreatesOutputDirectory_WhenItDoesNotExist
- Writer_Throws_WhenOutputPathIsAFile

ClientConstantsCheckerTests
- Checker_ReturnsSuccess_WhenFilesMatchGeneratedArtifacts
- Checker_ReturnsFailure_WhenErrorCodesFileIsOutdated
- Checker_ReturnsFailure_WhenConstantsFileIsOutdated
- Checker_ReturnsFailure_WhenFileIsMissing
- Checker_DoesNotModifyFiles_WhenMismatchExists
```

Без:

```text
- convention tests;
- full golden-file tests.
```

---

## 13. Как это соотносится с текущим проектом

Сейчас у тебя есть старый/частично отключённый генератор constants: `ConstantsToJson.cs` фактически закомментирован.

Для error codes уже есть рабочая snapshot-like структура `ErrorObject`, которая собирает client-facing error-code object из доменных constants и server validation error field names.

То есть первый рефакторинг может быть не “писать всё с нуля”, а:

```text
1. Перенести идею ErrorObject.Create() в ClientConstantsSnapshotFactory.CreateErrorCodes().
2. Восстановить/переписать constants snapshot для constants.json.
3. Добавить serializer/writer/checker.
4. Сделать CLI command.
5. Покрыть тестами writer/checker/shape/duplicates/serialization.
```

Это даст нормальную явную генерацию без hosted service и без магии при старте приложения.