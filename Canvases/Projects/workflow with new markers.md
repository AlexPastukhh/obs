Да, я бы сказал так: **новые колонки нужны и в responsibility map, и в slice planning**, но с разной глубиной.

Главное правило:

```text
В сценарии — лёгкие маркеры.
В responsibility table — классификация и ранний planning hint.
В consolidated maps — группировка по слоям.
В slice card / changeability map — конкретный design response / seam / handling.
```

То есть не надо сразу в чистом сценарии писать “сделать event dispatcher” или “создать INotificationPort”. Но можно пометить: `[VAR:REPLACE]`, `[EXT]`, `[RISK]`, `[ADR?]`.

---

## 1. Где какие колонки нужны

| Artifact                      |     Scope |           Change | Risk/Decision |                 Handling |
| ----------------------------- | --------: | ---------------: | ------------: | -----------------------: |
| Scenario Spec / Diagram       | да, лёгко |        да, лёгко |        иногда |                почти нет |
| Scenario Responsibility Table |        да |               да |            да | да, но как planning hint |
| Consolidated Layer Maps       |        да |               да |            да |    да, но layer-specific |
| Aggregate Design Table        |        да |               да |            да |      да, domain-specific |
| Scenario-To-Slice Map         |        да |               да |            да |          да, slice-level |
| Slice Card                    |        да |               да |            да |            да, конкретно |
| Changeability Map             |  нет/опц. |      да, главное |            да |              да, главное |
| ADR                           |  нет/опц. | да, если причина |            да |        финальное решение |

---

# 2. В сценарии: только лёгкая пометка

В Scenario Spec / diagram я бы не делал отдельную большую таблицу markers. Там достаточно inline-маркеров:

```text
Applicant data missing -> fill applicant data inline. [ALT][VAR:EXPAND]

Upload documents. [EXT:L2]

Clarification flow. [EXT:L2][VAR:MODIFY][ADR?]

Email notification sent. [CORE][VAR:REPLACE]

Should notification failure block approval? [RISK][ADR?]
```

Здесь смысл такой:

```text
Scope marker = место в roadmap/current behavior.
Change marker = возможная изменяемость.
Risk/ADR = вопрос, который нельзя забыть.
```

Но **handling ещё не решаем**. Максимум — короткая заметка:

```text
Note: may require separate scenario later.
```

---

# 3. В responsibility table: уже нужны отдельные колонки

Вот здесь новые колонки особенно полезны.

Responsibility table должна не только сказать “это domain/app/UI”, но и сохранить сигналы для будущего planning.

Я бы сделал так:

| Item ID | Scenario item | Type | Responsibility layer | Domain signal | Scope | Change | Risk/Decision | Planning hint |
| ------- | ------------- | ---- | -------------------- | ------------- | ----- | ------ | ------------- | ------------- |

### Зачем каждая новая колонка

| Column        | Зачем                                             |
| ------------- | ------------------------------------------------- |
| Scope         | понять, core это, alt или extension               |
| Change        | понять, это expansion/modify/replace/remove       |
| Risk/Decision | не потерять вопросы и ADR-кандидаты               |
| Planning hint | ранняя подсказка, но не финальное design decision |

Важно: в responsibility table **Planning hint** ещё не должен быть слишком техническим.

Хорошо:

```text
separate scenario later
domain abstraction candidate
read model candidate
external dependency candidate
ownership rule candidate
```

Слишком рано:

```text
use MediatR notification handler + outbox + SQL table OutboxMessages
```

---

## Пример responsibility table

| Item ID       | Scenario item                         | Type               | Responsibility layer       | Domain signal | Scope  | Change           | Risk/Decision | Planning hint                       |
| ------------- | ------------------------------------- | ------------------ | -------------------------- | ------------- | ------ | ---------------- | ------------- | ----------------------------------- |
| SC-04-PRE-01  | Client is signed in                   | Precondition       | Auth/Security              | no            | CORE   | —                | —             | framework/app auth                  |
| SC-04-ALT-01  | Applicant data missing -> fill inline | Alt/Extend         | App + Domain               | yes           | ALT    | VAR:EXPAND       | ADR?          | same domain result as profile-first |
| SC-04-POST-01 | Request status becomes Submitted      | Postcondition      | Domain                     | yes           | CORE   | —                | —             | request lifecycle state             |
| SC-04-EXT-01  | Upload documents                      | Extend             | App + Domain + Infra later | yes           | EXT:L2 | maybe VAR:MODIFY | —             | separate scenario/slice             |
| SC-08-OUT-01  | Email notification is sent            | Observable outcome | App + Infra                | weak          | CORE   | VAR:REPLACE      | RISK/ADR?     | notification seam needed            |
| SC-12-EXT-01  | Clarification may be requested        | Extend             | Domain + App               | yes           | EXT:L2 | VAR:MODIFY       | ADR?          | request workflow/status change      |

Вот это уже работает как мост.

---

# 4. В consolidated maps: колонки остаются, но смысл меняется по слоям

Да, эти маркеры касаются не только implementation. Они касаются и домена, и приложения, и инфраструктуры. Но **handling должен быть layer-specific**.

## 4.1 Consolidated Domain Map

Здесь `Handling` означает не “какой endpoint”, а “как домен должен быть готов”.

| Source | Domain requirement | Candidate concept | State / invariant / event | Scope | Change | Risk/Decision | Domain handling hint |
| ------ | ------------------ | ----------------- | ------------------------- | ----- | ------ | ------------- | -------------------- |

Пример:

| Source        | Domain requirement                                     | Candidate concept       | State / invariant / event | Scope  | Change     | Risk/Decision | Domain handling hint       |
| ------------- | ------------------------------------------------------ | ----------------------- | ------------------------- | ------ | ---------- | ------------- | -------------------------- |
| SC-04-ALT-01  | Applicant data can be provided inline or profile-first | ApplicantParty          | same domain result        | ALT    | VAR:EXPAND | ADR?          | avoid duplicating concepts |
| SC-04-POST-01 | Request starts as Submitted                            | ClientRequest           | initial state             | CORE   | —          | —             | lifecycle invariant        |
| SC-12-EXT-01  | Clarification may appear                               | ClientRequest workflow  | new transition/status     | EXT:L2 | VAR:MODIFY | ADR?          | explicit state transitions |
| SC-10         | Applicant types may expand                             | ApplicantParty variants | hierarchy/policy          | EXT:L2 | VAR:EXPAND | ADR?          | model variants carefully   |

Здесь видно: `VAR:EXPAND` в домене означает “не захардкодить модель так, что расширение будет болезненным”.

---

## 4.2 Consolidated Application Map

Здесь `Handling` — это orchestration/seam hint.

| Source | Application responsibility | Scope | Change | Risk/Decision | App handling hint |
| ------ | -------------------------- | ----- | ------ | ------------- | ----------------- |

Пример:

| Source       | Application responsibility                      | Scope  | Change      | Risk/Decision | App handling hint                              |
| ------------ | ----------------------------------------------- | ------ | ----------- | ------------- | ---------------------------------------------- |
| SC-04-ALT-01 | coordinate applicant data before request submit | ALT    | VAR:EXPAND  | ADR?          | keep profile-first and inline paths converging |
| SC-08-OUT-01 | trigger client notification after review        | CORE   | VAR:REPLACE | ADR?          | notification seam: service/event later         |
| SC-12-EXT-01 | coordinate clarification workflow               | EXT:L2 | VAR:MODIFY  | ADR?          | likely separate command/slice                  |

---

## 4.3 Consolidated Infrastructure Map

Здесь `VAR:REPLACE` особенно важен.

| Source | External/system behavior | Scope     | Change      | Port candidate                   | Adapter candidate | Risk/Decision |
| ------ | ------------------------ | --------- | ----------- | -------------------------------- | ----------------- | ------------- |
| SC-08  | email notification       | CORE      | VAR:REPLACE | IEmailSender / INotificationPort | SMTP/mock         | ADR?          |
| SC-11  | file upload              | EXT:L2    | VAR:REPLACE | IFileStorage                     | local/cloud       | ADR?          |
| SC-14  | verification             | EXT:L2/L3 | VAR:REPLACE | IVerificationGateway             | mock/external     | ADR?          |

---

# 5. В Scenario-To-Slice Map: колонки обязательны

Вот здесь новые колонки становятся почти обязательными, потому что slice planning уже решает порядок, зависимости и extensibility.

Я бы сделал такую таблицу:

| Slice ID | Parent scenario | Slice name | Type | Role | Trigger | Observable result | Depends on | Scope | Change | Risk/Decision | Handling / seam |
| -------- | --------------- | ---------- | ---- | ---- | ------- | ----------------- | ---------- | ----- | ------ | ------------- | --------------- |

Где `Role`:

```text
Primary
Supporting
Extension
Background
UI-only
```

Пример:

| Slice ID | Parent scenario | Slice name                    | Type                  | Role       | Trigger              | Observable result               | Depends on               | Scope            | Change           | Risk/Decision | Handling / seam                  |
| -------- | --------------- | ----------------------------- | --------------------- | ---------- | -------------------- | ------------------------------- | ------------------------ | ---------------- | ---------------- | ------------- | -------------------------------- |
| SL-04.2  | SC-04           | Provide applicant data inline | Command/UI            | Supporting | missing data in form | applicant data saved            | login                    | ALT              | VAR:EXPAND       | ADR?          | converge with profile-first path |
| SL-04.3  | SC-04           | Submit connection request     | Command               | Primary    | submit click         | request Submitted               | applicant data           | CORE             | —                | ADR?          | primary aggregate ClientRequest  |
| SL-11.1  | SC-11           | Upload request documents      | Command/Integration   | Extension  | upload files         | documents attached              | request draft/submission | EXT:L2           | maybe VAR:MODIFY | ADR?          | storage port                     |
| SL-08.2  | SC-08           | Notify client                 | Integration/Extension | Extension  | request reviewed     | notification sent/recorded      | approve/reject           | CORE/EXT depends | VAR:REPLACE      | ADR?          | notification port/event          |
| SL-16.1  | SC-16           | Reliable outbox delivery      | Background            | Extension  | scheduled worker     | pending notifications delivered | notification record      | DEFER:L3         | VAR:MODIFY       | ADR?          | outbox/background worker         |

Вот тут уже **handling/seam** может быть конкретнее.

---

# 6. В Slice Card: полный handling

Slice Card — место, где handling становится реальным design plan.

Например для notification:

```text
Slice ID:
SL-08.2 Notify Client

Scope:
CORE for simple L1 notification, DEFER/EXT for reliable L3 delivery

Change:
VAR:REPLACE — email provider/channel may change
VAR:MODIFY — delivery reliability may change later

Risk/Decision:
ADR? direct call vs event/outbox

Handling / seam:
L1: use notification application service through INotificationPort.
L3: replace/extend with outbox delivery slice.

Failure behavior:
Request review result must remain consistent if notification fails.
Failure can be recorded/retried depending on selected ADR.
```

Вот это уже не надо писать в чистом сценарии.

---

# 7. В Changeability Map: только изменения и handling

Changeability Map — это финальная сводка всего, что связано с изменениями.

Тут `Scope` можно даже убрать или оставить как context. Главное — `Change`.

| Change candidate | Change type | Affected scenarios | Affected slices | Current handling | Future handling | Avoid now | ADR |
| ---------------- | ----------- | ------------------ | --------------- | ---------------- | --------------- | --------- | --- |

Пример:

| Change candidate              | Change type      | Affected scenarios | Affected slices           | Current handling                              | Future handling                      | Avoid now                         | ADR  |
| ----------------------------- | ---------------- | ------------------ | ------------------------- | --------------------------------------------- | ------------------------------------ | --------------------------------- | ---- |
| Applicant types expand        | VAR:EXPAND       | SC-04, SC-10       | SL-04.2, SL-04.3, SL-10.* | ApplicantParty concept, individual only in L1 | add entrepreneur/legal variants      | dynamic form engine in L1         | ADR? |
| Documents become required     | EXT + VAR:MODIFY | SC-04, SC-11       | SL-04.3, SL-11.1          | no docs required in L1                        | document slice + request rule update | hardcoding docs absence           | ADR? |
| Notification provider changes | VAR:REPLACE      | SC-08, SC-16       | SL-08.2, SL-16.1          | notification port                             | new adapter/outbox                   | direct SMTP in handler            | ADR? |
| Clarification workflow        | EXT + VAR:MODIFY | SC-07, SC-12       | SL-07.2, SL-12.*          | approve/reject only                           | add clarification status/commands    | generic workflow engine too early | ADR? |

---

# 8. Ответ на главный вопрос

Да, правильнее всего:

```text
Scenario Spec:
inline markers only.

Responsibility Table:
Scope / Change / Risk columns + light planning hint.

Consolidated Layer Maps:
same markers, but handling becomes layer-specific.

Scenario-To-Slice Map:
same markers + role/dependency/attachment/seam.

Slice Card:
full handling / seam / tests / ADR candidates.

Changeability Map:
global view of all VAR/EXT/RISK items across scenarios and slices.
```

То есть твоя мысль верная:

```text
не только слайсы,
но responsibility map + slices.
```

Просто глубина разная.

---

# 9. Самое короткое правило

```text
В сценарии мы помечаем, что может быть важно.

В responsibility table мы классифицируем, чей это слой.

В consolidated maps мы видим, как это влияет на каждый слой.

В slice map/card мы решаем, как это поставить и через какой seam.

В changeability map мы следим, чтобы изменения были учтены системно.
```

И важное:

```text
EXT в ранних артефактах помогает увидеть будущие сценарии/slices.

VAR в ранних артефактах помогает не принять design decision, который сделает изменение дорогим.

Handling появляется постепенно:
hint -> layer-specific hint -> concrete seam/design decision.
```
