Да, ты прав: **добавление к существующему** и **изменение/замена существующего** — это разные вещи, и их нельзя прятать под один общий `[VAR]`.

Лучше разделить маркеры на **три оси**.

# 1. Ось scope / roadmap

Это отвечает на вопрос:

```text
Это часть текущего целевого поведения или дополнительное поведение?
```

| Marker    | Смысл                                                                  |
| --------- | ---------------------------------------------------------------------- |
| `[CORE]`  | обязательная часть текущего целевого поведения                         |
| `[ALT]`   | альтернативный путь внутри текущего целевого поведения                 |
| `[EXT]`   | дополнительное поведение, которое может быть отдельным сценарием/slice |
| `[DEFER]` | осознанно отложено                                                     |

Пример:

```text
Client submits valid request -> sees Submitted status [CORE]

Applicant data missing -> fill applicant data inline [ALT]

Upload documents [EXT: L2]

Reliable outbox delivery [DEFER: L3]
```

`EXT` говорит не “это может измениться”, а:

```text
это отдельное добавляемое поведение / capability / branch / slice
```

---

# 2. Ось volatility / change

Это отвечает на вопрос:

```text
Что в текущем поведении или модели может измениться?
```

Тут одного `[VAR]` мало. Лучше уточнять тип изменения:

| Marker          | Смысл                                                    |
| --------------- | -------------------------------------------------------- |
| `[VAR:EXPAND]`  | текущая модель расширится новыми вариантами              |
| `[VAR:MODIFY]`  | текущее правило/flow может измениться                    |
| `[VAR:REPLACE]` | реализация/провайдер/алгоритм может быть заменён         |
| `[VAR:REMOVE]`  | поведение может быть убрано/устареть, редко использовать |

Примеры:

```text
Applicant type may expand: individual -> entrepreneur/legal entity [VAR:EXPAND]

Request workflow may add clarification before final decision [VAR:MODIFY]

Email provider may change from SMTP to external service [VAR:REPLACE]

Temporary mock verification may be removed after real integration [VAR:REPLACE] or [VAR:REMOVE]
```

`VAR` говорит не “это отдельная фича”, а:

```text
в этом месте ожидается изменение требования, модели, правила или реализации
```

---

# 3. Ось uncertainty / decision

Это отвечает на вопрос:

```text
Нужно ли уточнение или архитектурное решение?
```

| Marker   | Смысл                                      |
| -------- | ------------------------------------------ |
| `[RISK]` | есть неопределённость или риск             |
| `[ADR?]` | вероятно понадобится архитектурное решение |

Пример:

```text
Should notification failure block approval? [RISK][ADR?]

Applicant data inline vs profile-first ownership [ADR?]
```

---

# Главное различие EXT vs VAR

```text
[EXT] = добавить новое поведение.

[VAR] = текущее поведение/правило/модель/реализация может измениться.
```

И да, handling разный.

## Если это EXT

Обычно мы думаем:

```text
Как потом добавить новый сценарий/slice?
Где attachment point?
Зависит ли он от core slice?
Можно ли добавить его без переписывания core?
```

Пример:

```text
Upload documents [EXT: L2]
```

Handling:

```text
- сделать отдельный Request Documents Scenario;
- потом отдельный SL-11 Upload Request Documents;
- прикрепить к Request Creation scenario;
- core Submit Request должен работать без документов, если documents optional.
```

## Если это VAR:EXPAND

Обычно мы думаем:

```text
Как не захардкодить один вариант так, чтобы расширение модели всё сломало?
```

Пример:

```text
Applicant type: individual -> entrepreneur/legal entity [VAR:EXPAND]
```

Handling:

```text
- не называть user-facing сценарий “Create individual applicant profile”;
- использовать “Provide applicant data”;
- в domain model держать место для ApplicantParty variants;
- не строить Request напрямую вокруг Individual-only assumptions;
- но не делать dynamic form engine заранее.
```

## Если это VAR:MODIFY

Обычно мы думаем:

```text
Как изолировать правило/transition, которое может поменяться?
```

Пример:

```text
Request workflow may add clarification [VAR:MODIFY]
```

Handling:

```text
- явно моделировать request status transitions;
- не размазывать transition rules по UI/controllers;
- держать workflow rules в domain aggregate/policy;
- добавить tests вокруг current transitions;
- возможно ADR позже.
```

## Если это VAR:REPLACE

Обычно мы думаем:

```text
Как заменить реализацию без изменения core behavior?
```

Пример:

```text
Email provider may change [VAR:REPLACE]
```

Handling:

```text
- IEmailSender / INotificationPort;
- SMTP adapter сейчас;
- другой adapter потом;
- core approval/request review не зависит от SmtpClient.
```

---

# Некоторые вещи могут иметь оба маркера

Это нормально.

## Пример 1

```text
Clarification flow [EXT: L2][VAR:MODIFY]
```

Почему оба?

```text
[EXT] потому что это новый сценарий/slice.
[VAR:MODIFY] потому что он меняет request workflow и статусы.
```

## Пример 2

```text
Documents upload [EXT: L2]
```

Если документы optional:

```text
только [EXT]
```

Если документы могут стать обязательными перед submit:

```text
[EXT][VAR:MODIFY]
```

Потому что это уже меняет acceptance/invariants для Submit Request.

## Пример 3

```text
External verification [EXT: L2/L3][VAR:REPLACE]
```

Почему оба?

```text
[EXT] потому что появляется отдельная capability.
[VAR:REPLACE] потому что mock verification может быть заменён external provider.
```

---

# Я бы обновил markers так

```text
[CORE]          required target behavior
[ALT]           alternative path inside current target behavior
[EXT]           additional scenario/slice/capability, not required for core
[DEFER]         known but intentionally postponed

[VAR:EXPAND]    current model may get more variants
[VAR:MODIFY]    current rule/workflow may change
[VAR:REPLACE]   implementation/provider/strategy may be replaced
[VAR:REMOVE]    behavior may be removed/deprecated, use rarely

[RISK]          uncertainty/risk
[ADR?]          architecture decision may be needed
```

# В таблицах лучше разделить это на колонки

Не одна колонка `Change marker`, а лучше так:

| Column        | Пример                                              |
| ------------- | --------------------------------------------------- |
| Scope marker  | CORE / ALT / EXT / DEFER                            |
| Change marker | VAR:EXPAND / VAR:MODIFY / VAR:REPLACE               |
| Risk/decision | RISK / ADR?                                         |
| Handling note | separate slice / port / policy / aggregate boundary |

Пример:

| Scenario item                 | Scope            | Change                 | Risk/Decision | Handling                   |
| ----------------------------- | ---------------- | ---------------------- | ------------- | -------------------------- |
| Submit valid request          | CORE             | —                      | —             | main slice                 |
| Applicant data missing inline | ALT              | VAR:EXPAND             | ADR?          | keep same domain result    |
| Upload documents              | EXT:L2           | maybe VAR:MODIFY       | —             | separate slice             |
| Clarification                 | EXT:L2           | VAR:MODIFY             | ADR?          | workflow/status design     |
| Email provider                | CORE/EXT depends | VAR:REPLACE            | ADR? later    | port/adapter               |
| Outbox delivery               | DEFER:L3 / EXT   | VAR:MODIFY reliability | ADR?          | extension/background slice |

Так станет гораздо чище.

# Финальная формула

```text
EXT отвечает: “что можно добавить?”

VAR отвечает: “что может измениться в уже существующем поведении, модели, правиле или реализации?”

ADD/EXT и CHANGE/VAR — разные вещи.

Extension planning ищет attachment points для новых slices.

Variation planning ищет seams, чтобы изменение не разнесло существующую систему.
```
