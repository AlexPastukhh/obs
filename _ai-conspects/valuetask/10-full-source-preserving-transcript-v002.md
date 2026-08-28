# Full source-preserving transcript v002 — ValueTask

Generated: 2026-07-04 UTC

```text
unique embedded screenshots: 18
image uses: 18
native SVG text lines: 5
source coverage: 18 / 18
transcript mode: near-literal normalized
```

Exact typography and version-sensitive punctuation remain authoritative in the preserved SVG and screenshots.

## S-001 — `async ValueTask<T>` с cache-hit и DB-веткой

```text
source_id: S-001
image_hash: 1e33b4004b11
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Если сделать `GetUserAsync` методом `async` и ожидать DB-ветку, код останется корректным, но изменятся характеристики производительности.

### Видимый код

```csharp
public async ValueTask<UserDto> GetUserAsync(
    int id,
    CancellationToken ct)
{
    if (_cache.TryGetValue(id, out var cached))
        return cached;

    return await FetchFromDbAsync(id, ct);
}
```

### Смысл

Компилятор строит async state machine. Cache-hit может завершиться синхронно, но метод всё равно имеет async-механику.

### Вопросы

1. Почему код корректен?
2. Как `async` влияет на hot path?

---

## S-002 — `return cached` внутри `async ValueTask<T>`

```text
source_id: S-002
image_hash: cc4f7ebcb745
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

В `async ValueTask<T>` методе `return cached;` — правильная форма. `cached` имеет тип результата `T`, а builder создаёт синхронно завершённый `ValueTask<T>`.

Поведенчески это похоже на `ValueTask.FromResult(cached)`, но внутри `async`-метода оператор `return` ожидает `T`, а не `ValueTask<T>`.

### Видимый код

```csharp
return cached;

// Концептуально:
return ValueTask.FromResult(cached);
```

### Вопросы

1. Какой тип ожидает `return`?
2. Почему нельзя вернуть wrapper напрямую?

---

## S-003 — Ожидание `ValueTask<T>` вызывающим кодом

```text
source_id: S-003
image_hash: 9b51ef7dfa72
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Обычный способ получить результат — `await`. Это работает и для уже готового результата, и для task-backed async-ветки.

### Видимый код

```csharp
var result = await GetSomethingAsync();

public ValueTask<int> GetNumberAsync()
{
    if (_cached)
        return new ValueTask<int>(42);

    return new ValueTask<int>(LoadNumberAsync());
}
```

### Вопросы

1. Нужно ли caller знать, какая ветка сработала?
2. Когда `await` завершается немедленно?

---

## S-004 — Mental model: `Task<T>` и `ValueTask<T>`

```text
source_id: S-004
image_hash: 9ff4ffeccc95
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

`Task<T>` — ссылочный объект будущего результата; его удобно комбинировать и повторно ожидать.

`ValueTask<T>` — небольшая структура, которая представляет либо уже готовый `T`, либо async source (`Task<T>`/`IValueTaskSource<T>`).

Ментальная модель: дешёвая completed-result ветка и обычная task-backed ветка.

### Вопросы

1. Какие два состояния представляет ValueTask?
2. Почему Task проще как общий API?

---

## S-005 — Async state machine и allocation risk

```text
source_id: S-005
image_hash: b287f9e6d7fa
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Маркер `async` создаёт state machine. Даже при синхронном cache-hit остаётся state-machine/builder machinery. Когда настоящий `await` не завершается синхронно, состояние приходится сохранять, что может привести к heap allocation.

Async-версия обычно имеет больше overhead, чем не-async wrapper.

### Вопросы

1. Всегда ли state machine размещается в куче?
2. Когда состояние приходится сохранять?

---

## S-006 — Проблема allocations на hot path

```text
source_id: S-006
image_hash: e9253c9dceea
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Если часто вызываемый метод обычно завершается синхронно, `Task.FromResult(x)` оставляет API в Task-land и может добавлять объект/механику задачи.

### Видимый код

```csharp
public Task<int> GetAsync()
{
    if (TryGetFromCache(out var x))
        return Task.FromResult(x);

    return SlowIoAsync();
}
```

### Вопросы

1. Какая ветка является hot path?
2. Почему рассматривают ValueTask?

---

## S-007 — Один `await` для обеих веток

```text
source_id: S-007
image_hash: d79f81b04207
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

```csharp
int x = await GetNumberAsync();
```

При cache-hit `x` становится `42` сразу. При miss caller ожидает загрузку. Caller обычно не различает внутренние ветки.

### Вопросы

1. Меняется ли синтаксис вызова?
2. Что видит caller?

---

## S-008 — Синхронная ветка — место основной выгоды

```text
source_id: S-008
image_hash: 512ef588bd12
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Главная выгода `ValueTask<T>` — синхронное завершение.

```csharp
return ValueTask.FromResult(cached);
```

Для такого вызова отдельный `Task<T>` не создаётся; небольшая структура содержит результат.

### Вопросы

1. Где экономится allocation?
2. Почему async-ветка не получает тот же выигрыш?

---

## S-009 — `async`-версия уменьшает cache-hit benefit

```text
source_id: S-009
image_hash: 4b91187e2be9
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Не-async cache-hit: немедленный return, нет внешней state machine, нет Task allocation, минимальный overhead.

`async`-версия тоже может завершиться синхронно, но оплачивает async method machinery.

### Вопросы

1. Какой вариант дешевле для частых cache hits?
2. Почему слово `async` важно?

---

## S-010 — Constructor и `ValueTask.FromResult`

```text
source_id: S-010
image_hash: f9aad69e8b29
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Оба варианта создают уже завершённый `ValueTask<int>` со значением `42`.

### Видимый код

```csharp
new ValueTask<int>(42);
ValueTask.FromResult(42);
```

### Смысл

Разница в основном стилистическая: constructor против factory method.

### Вопросы

1. Есть ли семантическая разница?
2. Какой стиль понятнее?

---

## S-011 — Не-`async` cache-first wrapper

```text
source_id: S-011
image_hash: 35a1c13ae6c5
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Метод возвращает готовый ValueTask при cache-hit и оборачивает `Task<UserDto>` от EF Core при miss.

### Видимый код

```csharp
public ValueTask<UserDto> GetUserAsync(
    int id,
    CancellationToken ct)
{
    if (_cache.TryGetValue(id, out var cached))
        return ValueTask.FromResult(cached);

    return new ValueTask<UserDto>(
        FetchFromDbAsync(id, ct));
}

private async Task<UserDto> FetchFromDbAsync(
    int id,
    CancellationToken ct)
{
    return await _db.Users
        .Where(u => u.Id == id)
        .SingleAsync(ct);
}
```

### Вопросы

1. Где отсутствует внешняя state machine?
2. Что возвращает EF-ветка?

---

## S-012 — Асинхронная ветка обычно не экономит allocation

```text
source_id: S-012
image_hash: 8e911ff9589e
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

`FetchAsync` уже создаёт/возвращает `Task<T>` и свою async state machine. `ValueTask<T>` только оборачивает task.

Стоимость async-ветки примерно та же, что при `Task<T>`, плюс небольшой wrapper. Магической двойной выгоды нет.

### Видимый код

```csharp
return new ValueTask<T>(FetchAsync(...));
```

### Вопросы

1. Убирает ли wrapper внутренний Task?
2. Почему сложность может вырасти?

---

## S-013 — EF Core уже возвращает `Task<T>`

```text
source_id: S-013
image_hash: b58dc5a6a1c5
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

`SingleAsync` возвращает `Task<UserDto>`. Под ним уже есть async I/O path.

Не-async wrapper: один EF Task + ValueTask struct.
`async ValueTask` wrapper: тот же EF Task + внешняя async state machine.

### Вопросы

1. Почему wrapper не отменяет EF allocation?
2. Где остаётся основная выгода?

---

## S-014 — API-style difference

```text
source_id: S-014
image_hash: 60b40f4f9432
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

`new ValueTask<T>(value)` — constructor; `ValueTask.FromResult(value)` — factory. Для уже готового generic результата они практически эквивалентны.

### Вопросы

1. Какой вариант подчёркивает готовый результат?
2. Что выбрать для единого style?

---

## S-015 — Cache-hit без Task allocation

```text
source_id: S-015
image_hash: 601468f9b2fb
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

При cache-hit отдельный `Task` не создаётся. Это основная победа данного паттерна.

### Вопросы

1. Какой объект не создаётся?
2. Какая ветка оправдывает ValueTask?

---

## S-016 — Отсутствие внешнего `await` не отменяет внутреннюю стоимость

```text
source_id: S-016
image_hash: dc205b60383c
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Неожидание во внешнем wrapper не меняет allocations внутренней async operation.

### Видимый код

```csharp
public ValueTask<T> M()
    => new ValueTask<T>(InnerAsync());
```

### Смысл

`InnerAsync()` всё равно создаёт свой Task/state machine в зависимости от внутренних await.

### Вопросы

1. Чья state machine остаётся?
2. Что экономит non-async wrapper?

---

## S-017 — Когда ValueTask помогает на async-ish path

```text
source_id: S-017
image_hash: ed21c1d1e827
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Особые случаи, где underlying operation сама может завершиться синхронно без Task:

- API на `IValueTaskSource`;
- pooled/reusable async operations;
- high-performance framework internals.

Для обычного app code (`HttpClient`, EF Core) настоящая async branch обычно task-based.

### Вопросы

1. Что даёт IValueTaskSource?
2. Почему app-level I/O редко выигрывает на async branch?

---

## S-018 — `Task.Run` не исправляет блокирующую серверную работу

```text
source_id: S-018
image_hash: e782b77d4832
placements: 1
transcript_mode: near-literal normalized
```

### Видимый текст

Inline blocking блокирует ThreadPool thread. `Task.Run` тоже занимает ThreadPool thread, поэтому не превращает работу в true async I/O.

Правильное решение: настоящая async I/O API либо background job/queue.

### Вопросы

1. Почему Task.Run не лечит blocking I/O?
2. Когда нужна background queue?
