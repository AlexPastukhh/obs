
```table-of-contents
```Да, сейчас нужно превратить workflow из “хорошей теории” в **набор конкретных рабочих артефактов**. Я бы сделал так: не пытаться вести 15 таблиц одновременно. Есть **обязательное ядро**, а остальные maps — это производные представления, которые нужны, когда проект становится достаточно большим.

Текущий v3-файл уже правильно фиксирует базовую идею: сценарий остаётся чистым, responsibility table классифицирует элементы сценария по слоям, aggregate design идёт после доменной классификации, а slice planning превращает сценарии в frontend/API/application/domain/persistence/tests там, где это нужно.

---

# 1. Минимальный рабочий набор артефактов

Я бы разделил всё на **must-have** и **derived/optional**.

## Must-have

```text
1. Scenario Catalog
2. Scenario Spec
3. Scenario Responsibility Table
4. Consolidated Domain Map
5. Aggregate Design Table
6. Scenario-To-Slice Map
7. Slice Cards
8. Changeability Map
9. ADR Index / ADR files
```

# 1. Минимальный рабочий набор артефактов

Я бы разделил всё на **must-have** и **derived/optional**.

## Must-have


```
1. Scenario Catalog
2. Scenario Spec
3. Scenario Responsibility Table
4. Consolidated Domain Map
5. Aggregate Design Table
6. Scenario-To-Slice Map
7. Slice Cards
8. Changeability Map
9. ADR Index / ADR files
```

## D
## Derived / optional, но полезные

```text
10. Frontend Implementation Map
11. API Contract Map
12. Application Map
13. Persistence / Read Model Map
14. Ports / Adapters Map
15. Test Map
```

Эти derived maps не обязательно вести вручную с первого дня. Их можно собирать из Slice Cards, когда становится сложно видеть целую картину.

---

# 2. Общая картина workflow

Вот как это должно работать:

```text
A. Scenario Catalog
   ↓
B. Scenario Spec
   ↓
C. Scenario Responsibility Table
   ↓
D. Consolidated Layer Maps
   ↓
E. Domain Discovery / Domain Model
   ↓
F. Aggregate Design
   ↓
G. Scenario-To-Slice Map
   ↓
H. Slice Cards
   ↓
I. Consolidated Implementation Maps
   ↓
J. Changeability Map + ADRs
   ↓
K. Walking Skeleton / Slice Implementation
```

Ключевая мысль:

```text
Responsibility tables — это анализ требований.
Slice cards — это план поставки поведения.
Implementation maps — это обзор слайсов по архитектурным слоям.
```

---

# 3. Scenario Catalog

## Зачем нужен

Это просто индекс сценариев. Он нужен, чтобы не потеряться.

## Когда создаётся

Сразу в начале, до детальной проработки сценариев.

## Таблица

|Column|Зачем|
|---|---|
|Scenario ID|стабильная ссылка|
|Title|короткое имя сценария|
|Actor / screen|кто и где действует|
|Priority|порядок проработки|
|Level marker|L1/L2/L3, если полезно|
|Status|draft / reviewed / ready|
|Notes|краткие замечания|

## Пример

|Scenario ID|Title|Actor / screen|Priority|Level|Status|Notes|
|---|---|---|---|---|---|---|
|SC-04|Client Request Creation|Client — Request creation screen|High|L1|Draft|includes inline applicant data|
|SC-07|Employee Request Review|Employee — Review screen|High|L1|Draft|approve/reject|
|SC-11|Request Documents|Client — Request form|Medium|L2|Idea|extension scenario|

---

# 4. Scenario Spec

## Зачем нужен

Это главный чистый behavioral artifact.

Он отвечает:

```text
Что пользователь делает?
Что система должна показать/сделать?
Когда поведение считается выполненным?
```

## Когда создаётся

До responsibility table, до домена, до агрегатов, до слайсов.

## Формат

```text
Scenario ID:
Title:
Actor / Screen:
Goal:
Priority:
Level marker:
Preconditions:
Main flow:
Include:
Extend:
Invariants:
Postconditions:
Scenario acceptance criteria:
Observable outcomes:
Extension/change markers:
Open questions:
```

## Пример

```text
Scenario ID:
SC-04

Title:
Client Request Creation

Actor / Screen:
Client — Request creation screen

Goal:
Submit a connection request.

Preconditions:
- Client is signed in.

Main flow:
1. Client opens request creation page.
2. Client fills request details.
3. Client provides applicant data if missing.
4. Client submits request.
5. Client sees Submitted status.

Include:
- Validate request form.

Extend:
- Applicant data missing -> fill applicant data inline. [ALT]
- Upload documents. [EXT: L2]
- Anonymous request. [EXT: L3]

Invariants:
- Invalid request is not accepted.
- Client cannot submit request for another client's applicant data.

Postconditions:
- Request exists.
- Request status is Submitted.

Scenario acceptance criteria:
- Given client is signed in,
  when valid request is submitted,
  then client sees Submitted status.
- Given request form is invalid,
  when client submits the form,
  then request is not accepted and validation errors are shown.

Observable outcomes:
- Request is stored.
- Request status becomes Submitted.
- Employee can see request in submitted queue.

Extension/change markers:
- Applicant type may expand from individual to entrepreneur/legal entity. [VAR]
- Documents may become required later. [EXT]
```

---

# 5. Scenario-Level Extension And Change Markers

Твои маркеры хорошие, но их нужно точнее определить.

```text
[CORE]   required target behavior
[ALT]    alternative path in current target scenario
[EXT]    future/additional scenario or branch
[VAR]    likely requirement variation/change point
[RISK]   uncertain/risky behavior
[DEFER]  intentionally postponed
[ADR?]   likely architecture decision needed later
```

## Уточнение по каждому

### `[CORE]`

То, без чего сценарий не считается реализованным.

```text
Client submits valid request -> sees Submitted status. [CORE]
```

Это не значит “никогда не изменится”. Это значит “ядро текущего целевого поведения”.

---

### `[ALT]`

Альтернативная ветка внутри текущего сценария.

```text
Applicant data missing -> fill applicant data inline. [ALT]
```

Это уже часть целевого поведения, но не always path.

---

### `[EXT]`

Будущее или дополнительное поведение, которое может стать отдельным сценарием или слайсом.

```text
Upload documents. [EXT: L2]
Anonymous request. [EXT: L3]
```

`EXT` — это не просто “альтернатива сейчас”. Это потенциальное расширение.

---

### `[VAR]`

Место, где вероятно изменятся требования.

```text
Applicant type may expand from individual to entrepreneur/legal entity. [VAR]
```

`VAR` не обязательно создаёт новый сценарий прямо сейчас. Это warning для domain design / slice planning / changeability map.

---

### `[RISK]`

Неясное, спорное, опасное место.

```text
Should notification failure block approval? [RISK]
```

Часто ведёт к open question или ADR.

---

### `[DEFER]`

Осознанно отложено.

```text
Reliable notification retry is deferred to L3. [DEFER]
```

Важно: `DEFER` должен иметь причину, иначе это просто забытый долг.

---

### `[ADR?]`

Может потребоваться архитектурное решение.

```text
Notification after approval: direct call or event/outbox? [ADR?]
```

Не каждый `ADR?` сразу становится ADR. Это кандидат.

---

# 6. Scenario Responsibility Table

## Зачем нужна

Это первый аналитический bridge.

Она отвечает:

```text
К какому слою относится каждый элемент сценария?
```

Это ещё **не slice** и не implementation plan.

## Когда создаётся

После Scenario Spec.

## Вопросы процесса

Для каждой строки сценария спрашиваем:

```text
1. Это UI behavior?
2. Это auth/security/framework?
3. Это application orchestration?
4. Это domain rule/state/invariant?
5. Это read model/query?
6. Это persistence outcome?
7. Это integration/infrastructure?
8. Это cross-cutting concern?
9. Есть ли domain signal?
10. Есть ли change marker?
```

## Таблица

|Column|Зачем|
|---|---|
|Item ID|точная ссылка на элемент сценария|
|Scenario item|текст элемента|
|Type|precondition / step / include / extend / invariant / acceptance / outcome|
|Meaning|человеческий смысл|
|Responsibility layer|чей это слой|
|Domain signal|есть ли сигнал для domain discovery|
|Change marker|CORE/ALT/EXT/VAR/RISK/DEFER/ADR?|
|Notes|пояснения|

## Пример

|Item ID|Scenario item|Type|Meaning|Responsibility layer|Domain signal|Change marker|Notes|
|---|---|---|---|---|---|---|---|
|SC-04-PRE-01|Client is signed in|Precondition|user authenticated|Auth/Security|no|CORE|не домен заявки|
|SC-04-STEP-01|Client fills request details|Main step|user input|UI / App boundary|weak|CORE|сбор данных|
|SC-04-AC-01|Valid request shows Submitted status|Acceptance|behavior complete|Domain + Read model|yes|CORE|статус + отображение|
|SC-04-ALT-01|Applicant data missing -> fill inline|Extend/Alt|collect applicant data|App + Domain|yes|ALT/VAR|два UX-входа|
|SC-04-INV-01|Invalid request is not accepted|Invariant|no invalid request saved|Domain + App boundary|yes|CORE|final guard|
|SC-04-POST-01|Request status becomes Submitted|Postcondition|initial lifecycle state|Domain|yes|CORE|state transition|
|SC-04-POST-02|Employee can see request in queue|Observable outcome|visible in employee queue|Read model / Query|weak|CORE|projection|
|SC-04-EXT-01|Upload documents|Extend|future branch|App + Domain + Infra later|yes|EXT: L2|separate scenario/slice|

## Важное отличие

```text
Responsibility table = анализ.
Slice = план реализации.
```

Responsibility table может подсказать будущие slices, но строка таблицы не равна slice.

---

# 7. Consolidated Layer Maps

## Зачем нужны

Они собирают строки из всех responsibility tables по слоям.

Если смотреть только на один сценарий, можно неверно спроектировать домен. Например `ClientRequest` появляется в request creation, status page, review, clarification, archive. Поэтому нужно увидеть все доменные требования вместе.

## Когда создаются

После того как есть responsibility tables хотя бы для core-сценариев.

---

## 7.1 Consolidated Domain Map

### Зачем

Главный вход в domain discovery и aggregate design.

### Таблица

|Column|Зачем|
|---|---|
|Source|откуда требование|
|Domain requirement|формулировка доменного требования|
|Candidate concept|потенциальная сущность/VO/событие|
|State / invariant / event|что именно: состояние, правило, событие|
|Change marker|CORE/EXT/VAR/RISK|
|Open question|что надо уточнить|

### Пример

|Source|Domain requirement|Candidate concept|State / invariant / event|Change marker|Open question|
|---|---|---|---|---|---|
|SC-04-POST-01|New request starts as Submitted|Request|initial status|CORE|no|
|SC-04-INV-01|Invalid request is not accepted|Request / value objects|invariant|CORE|validation boundaries|
|SC-04-ALT-01|Applicant data required before request|Applicant data|completeness|VAR|profile-first vs inline|
|SC-07-STEP-03|Employee approves request|Request review|transition|CORE|review as child?|
|SC-07-INV-02|Final request cannot be approved again|Request|invariant|CORE|state model|
|SC-12-EXT-01|Clarification may be requested|Request workflow|new status branch|EXT/VAR|later L2|

---

## 7.2 Consolidated Application Map

### Зачем

Показывает orchestration responsibilities: что application layer должен координировать, но не должен превращать в бизнес-логику.

### Таблица

|Column|Зачем|
|---|---|
|Source|scenario item|
|Application responsibility|что оркестрировать|
|Needs domain?|нужен ли вызов домена|
|Needs auth/current user?|нужен ли actor context|
|Transaction?|есть ли commit boundary|
|Possible slice|будущий slice-кандидат|
|Notes||

### Пример

|Source|Application responsibility|Needs domain?|Needs auth/current user?|Transaction?|Possible slice|Notes|
|---|---|---|---|---|---|---|
|SC-04-ALT-01|create/use applicant data before submit|yes|yes|yes|SL-04.2 / SL-04.3|inline vs profile-first|
|SC-04-POST-01|create submitted request|yes|yes|yes|SL-04.3|command slice|
|SC-08-POST-01|create contract draft after approval|yes/partly|employee id|maybe|SL-08.1|extension slice|
|SC-08-POST-02|notify client|no/partly|no|maybe async|SL-08.2|port/event candidate|

---

## 7.3 Consolidated Auth/Security Map

### Зачем

Чтобы не смешать auth/security с доменом.

### Таблица

|Source|Security responsibility|Actor|Rule|Domain dependency|Notes|
|---|---|---|---|---|---|
|SC-04-PRE-01|require signed-in client|Client|authenticated|no|framework/app|
|SC-04-INV-02|cannot use another client’s applicant data|Client|ownership/access|yes|app + domain reference|
|SC-07-PRE-01|require employee role|Employee|authorized role|no/weak|framework/app|

---

## 7.4 Consolidated Read Model Map

### Зачем

Чтобы понять, какие query/read projections нужны, не заставляя read-only сценарии грузить aggregates.

### Таблица

|Source|User-visible data|Query/read model|Source domain state|Filters/sorting|Change marker|
|---|---|---|---|---|---|
|SC-05|client sees own requests|MyRequestsDto|Request status|by client/account|filters later|
|SC-06|employee sees submitted queue|EmployeeRequestQueueDto|Submitted requests|status/date|assignment later|
|SC-07|employee opens request details|RequestDetailsDto|request + applicant data|by request id|docs later|

---

## 7.5 Consolidated Infrastructure/Integration Map

### Зачем

Чтобы заранее увидеть внешние/заменяемые возможности: email, file storage, verification, clock, current user.

### Таблица

|Source|External/system behavior|Port candidate|Adapter candidate|Reliability need|Change marker|
|---|---|---|---|---|---|
|SC-08|email notification sent|IEmailSender / INotificationPort|SMTP/Mock|low L1, high L3|VAR/EXT|
|SC-11|file upload|IFileStorage|local/cloud|medium|EXT|
|SC-14|mock verification|IVerificationGateway|mock/external|medium|VAR|
|SC-*|current time used|IClock|SystemClock|low|CORE|

---

# 8. Domain Discovery / Aggregate Design

Ты это уже понимаешь, но в системе артефактов это выглядит так:

## Domain Discovery Table

|Source|Business meaning|Candidate concept|Rule/state/event|Layer confidence|Notes|
|---|---|---|---|---|---|

## Aggregate Design Table

|Column|Зачем|
|---|---|
|Aggregate candidate|название|
|Source scenarios|какие сценарии его трогают|
|Owns|что реально внутри lifecycle|
|Stored refs|ссылки на другие aggregates|
|Protected invariants|что защищает|
|Commands/scenarios|какие действия идут сюда|
|Read-only scenarios|где только читается|
|Change markers|будущие изменения|
|ADR candidates|спорные решения|

Пример:

|Aggregate|Source scenarios|Owns|Stored refs|Protected invariants|Commands/scenarios|Change markers|ADR|
|---|---|---|---|---|---|---|---|
|ClientRequest|SC-04, SC-05, SC-07, SC-12, SC-18|status, details, address, review later|ApplicantPartyId, reviewer id|valid transitions, final state protection|submit, approve, reject, clarify, archive|workflow may expand|ADR? review ownership|
|ApplicantParty|SC-04, SC-10|applicant data|ClientAccountId|applicant completeness|provide applicant data|applicant types expand|ADR? hierarchy persistence|

---

# 9. Scenario-To-Slice Map

## Зачем нужен

Это главный переход от анализа к реализации.

Он отвечает:

```text
Какие единицы поведения мы будем реализовывать?
В каком порядке?
От каких сценариев они происходят?
От чего зависят?
```

Это ещё не полная Slice Card. Это индекс slices.

## Когда создаётся

После aggregate design. Можно делать черновик раньше, но финализировать лучше после aggregate boundaries.

## Таблица

|Column|Зачем|
|---|---|
|Slice ID|стабильная ссылка|
|Parent scenario|из какого сценария|
|Slice name|поведение|
|Type|command/query/UI-only/integration/background/extension|
|Trigger|что запускает|
|Observable result|что проверяем|
|Primary aggregate/read model|доменный/write или read target|
|Depends on|зависимость|
|Priority|порядок|
|Change marker|EXT/VAR/RISK|
|ADR|ссылка/кандидат|

## Пример

|Slice ID|Parent scenario|Slice name|Type|Trigger|Observable result|Primary aggregate/read model|Depends on|Priority|Change marker|ADR|
|---|---|---|---|---|---|---|---|---|---|---|
|SL-04.1|SC-04|Load request creation screen|Query/UI|page open|form is ready|Applicant data read model|login|High|VAR applicant types|—|
|SL-04.2|SC-04|Provide applicant data inline|Command/UI|fill applicant block|applicant data saved|ApplicantParty|login|High|VAR|ADR? inline/profile|
|SL-04.3|SC-04|Submit connection request|Command|submit click|request Submitted|ClientRequest|applicant data|High|EXT docs/anonymous|ADR? boundary|
|SL-05.1|SC-05|View my requests|Query/UI|open status page|list visible|MyRequestsDto|submitted request|High|filters later|—|
|SL-07.2|SC-07|Approve/reject request|Command/UI|employee decision|request final|ClientRequest|queue|High|clarification later|ADR? review|
|SL-08.2|SC-08|Notify client|Integration/extension|request reviewed|notification sent/recorded|Notification/port|review decision|Medium|outbox later|ADR? notification|

---

# 10. Slice Card

## Что это такое

Slice Card — это не обязательно таблица. Лучше как **карточка/секция markdown** на каждый slice.

Почему не таблица? Потому что у slice много разных аспектов: frontend, API, application, domain, persistence, tests, changeability. В широкой таблице это становится нечитаемо.

## Зачем нужна

Она отвечает:

```text
Как именно поставить и проверить эту единицу поведения?
```

## Минимальная Slice Card

```text
Slice ID:
Parent scenario:
Type:
Priority:
Trigger:
Observable result:
Depends on:
Acceptance:
Implementation path:
Tests:
Changeability:
ADR:
```

## Полная Slice Card

```text
Slice ID:
Parent scenario:
Slice type:
Priority:
Depends on:
User goal:
Trigger:
Screen/context:
User action:
Observable/verifiable result:
Scenario acceptance links:
Slice acceptance criteria:

Frontend:
API contract:
Application:
Domain:
Persistence/read model:
Ports/adapters:
Tests:
Changeability:
Migration/legacy:
ADR:
```

## Зачем каждая секция

|Section|Зачем|
|---|---|
|Slice ID|ссылаться из maps, ADR, задач|
|Parent scenario|не потерять связь с поведением|
|Type|понимать command/query/UI/integration|
|Trigger|понять вход|
|Observable result|понять результат|
|Depends on|планировать порядок|
|Scenario acceptance links|связь с чистой спецификацией|
|Slice acceptance|что именно проверять в реализации|
|Frontend|не забыть UI|
|API contract|договор UI/backend|
|Application|command/query/process|
|Domain|aggregate/invariants|
|Persistence/read|write/read impact|
|Ports/adapters|внешние/заменяемые зависимости|
|Tests|план проверки|
|Changeability|будущие изменения|
|ADR|решения/кандидаты|
|Migration/legacy|если есть старый flow|

## Пример

```text
Slice ID:
SL-04.3 Submit Connection Request

Parent scenario:
SC-04 Client Request Creation

Type:
Command

Priority:
High

Depends on:
SL-04.1 Load request form
SL-04.2 Provide applicant data or existing applicant data

Trigger:
Client clicks Submit.

Observable result:
Client sees Submitted status.
Request is visible in MyRequests and EmployeeQueue.

Scenario acceptance links:
SC-04-AC-01 valid request shows Submitted status.
SC-04-AC-02 invalid form is not accepted.

Slice acceptance:
- valid submit returns request id and Submitted status;
- invalid request returns validation errors;
- request appears in MyRequests;
- request appears in employee queue;
- frontend shows loading/error/success states.

Frontend:
- RequestCreatePage submit action
- request details form
- validation summary
- loading state
- success state

API contract:
- POST /api/requests
- request: requestDetails + address + applicantData? / applicantPartyId?
- response: requestId, status
- errors: validation, unauthorized, applicant ownership failure

Application:
- CreateConnectionRequestCommand
- reads current client id
- loads applicant data
- checks applicant belongs to current client
- creates request
- commits transaction

Domain:
- primary aggregate: ClientRequest
- supporting reference: ApplicantParty
- invariant: request starts as Submitted
- invariant: invalid request is not accepted

Persistence/read model:
- write ClientRequests
- maybe write ApplicantParties if inline path is in same slice
- read visible in MyRequests and EmployeeQueue

Ports/adapters:
- CurrentUser
- Clock

Tests:
- domain creation test
- HTTP happy path
- invalid request
- ownership failure
- frontend form test

Changeability:
- applicant types may expand
- documents may become required
- anonymous request may bypass account path
- do not create dynamic form engine in L1

ADR:
- ADR? applicant inline vs profile-first
- ADR? applicant/request aggregate boundary
```

---

# 11. Consolidated Implementation Maps

Теперь главное: зачем они нужны, если есть Slice Cards?

Ответ:

```text
Slice Cards показывают slice целиком.
Implementation Maps показывают один архитектурный слой по всем slices.
```

Они нужны не для проектирования с нуля, а для проверки целостности.

## Когда нужны

Не обязательно сразу. Они полезны, когда:

```text
- slices стало больше 5–7;
- нужно увидеть все endpoints;
- нужно проверить frontend scope;
- нужно проверить coverage тестами;
- нужно увидеть все ports/adapters;
- нужно планировать команды/PR/tasks;
- нужно найти дублирование;
- нужно проверить, что query slices не лезут в aggregates;
- нужно проверить, что extension slices имеют seams.
```

---

## 11.1 Frontend Implementation Map

### Зачем

Показывает весь frontend scope по slices.

### Таблица

|Slice|Route/Page|Feature components|State|API call|UI tests|
|---|---|---|---|---|---|

### Пример

|Slice|Route/Page|Feature components|State|API call|UI tests|
|---|---|---|---|---|---|
|SL-04.1|/requests/new|RequestCreatePage|loading/empty|GET applicant data|page loads|
|SL-04.2|/requests/new|ProvideApplicantDataBlock|validation/error|POST applicant data|form validation|
|SL-04.3|/requests/new|SubmitRequestAction|loading/error/success|POST request|submit behavior|
|SL-05.1|/requests/my|RequestList|loading/empty/error|GET my requests|list renders|

### Что даёт

```text
- видно, какие pages/features нужны;
- видно, где shared component ещё рано/уже нужен;
- видно, какие UI states нужно реализовать;
- frontend не забывается после backend planning.
```

---

## 11.2 API Contract Map

### Зачем

Видеть все endpoints и договоры UI/backend.

### Таблица

|Slice|Endpoint|Request|Response|Errors|Auth|
|---|---|---|---|---|---|

### Пример

|Slice|Endpoint|Request|Response|Errors|Auth|
|---|---|---|---|---|---|
|SL-04.1|GET /api/requests/new-context|—|applicant data, options|401|Client|
|SL-04.2|POST /api/applicant-data|applicant fields|applicantId|validation, 401|Client|
|SL-04.3|POST /api/requests|details/address/applicantId|requestId/status|validation, ownership, 401|Client|
|SL-05.1|GET /api/requests/my|filters|request list|401|Client|
|SL-07.2|POST /api/employee/requests/{id}/approve|comment|status|invalid state, 403|Employee|

### Что даёт

```text
- видно, не превращается ли API в CRUD-by-table;
- видно, где нужны auth rules;
- видно, какие ошибки должны быть единообразны;
- удобно давать frontend/backend контракт.
```

---

## 11.3 Application Map

### Зачем

Видеть commands/queries/processes и transaction boundaries.

### Таблица

|Slice|Command/Query/Process|Handler/Service|Domain operation|Transaction|Errors|
|---|---|---|---|---|---|

### Пример

|Slice|Command/Query|Handler/Service|Domain operation|Transaction|Errors|
|---|---|---|---|---|---|
|SL-04.2|ProvideApplicantDataCommand|handler|ApplicantParty.Create|yes|invalid data|
|SL-04.3|CreateConnectionRequestCommand|handler|ClientRequest.Create|yes|ownership, validation|
|SL-05.1|GetMyRequestsQuery|query handler|none|no write|unauthorized|
|SL-08.2|NotifyClientProcess|notification service/handler|maybe none|maybe separate|provider failure|

### Что даёт

```text
- видно, какие command/query нужны;
- видно, где transaction boundary;
- видно, нет ли business logic в application;
- видно, где extension process.
```

---

## 11.4 Persistence / Read Model Map

### Зачем

Планировать storage/read side без того, чтобы БД диктовала domain model.

### Таблица

|Slice|Write model|Read model|Tables|Migration|Notes|
|---|---|---|---|---|---|

### Пример

|Slice|Write model|Read model|Tables|Migration|Notes|
|---|---|---|---|---|---|
|SL-04.2|ApplicantParty|ApplicantDataDto|ApplicantParties|yes|TPH later|
|SL-04.3|ClientRequest|MyRequestsDto, EmployeeQueueDto|ClientRequests|yes|status Submitted|
|SL-05.1|none|MyRequestsDto|ClientRequests join ApplicantParties|no/depends|Dapper possible|
|SL-08.2|Notification|NotificationStatusDto|Notifications/Outbox later|maybe|L3 outbox|

### Что даёт

```text
- видно, какие таблицы реально нужны;
- видно write/read separation;
- видно, где query projection;
- видно миграции по slices.
```

---

## 11.5 Ports / Adapters Map

### Зачем

Понять все внешние/заменяемые зависимости.

### Таблица

|Slice|Port|Adapter|Why needed|Replaceability|Tests|ADR|
|---|---|---|---|---|---|---|

### Пример

|Slice|Port|Adapter|Why needed|Replaceability|Tests|ADR|
|---|---|---|---|---|---|---|
|SL-04.3|ICurrentUser|HttpContextCurrentUser|current client id|medium|HTTP auth tests|—|
|SL-04.3|IClock|SystemClock|CreatedAt|high|unit/integration|—|
|SL-08.2|IEmailSender|Smtp/Mock|send notification|high|adapter tests|ADR?|
|SL-11.1|IFileStorage|Local/Cloud|documents|high|contract tests|ADR?|
|SL-14.1|IVerificationGateway|Mock/External|verification|high|contract tests|ADR?|

### Что даёт

```text
- видно, где нужны interfaces;
- видно, что можно заменить;
- видно, где не надо зависеть от конкретной технологии;
- видно, где ADR нужен.
```

---

## 11.6 Test Map

### Зачем

Понять test coverage по slices, а не “просто много тестов”.

### Таблица

|Slice|Scenario acceptance|Domain tests|HTTP/API tests|Frontend tests|E2E|Adapter/contract|Notes|
|---|---|---|---|---|---|---|---|

### Пример

|Slice|Scenario acceptance|Domain tests|HTTP/API tests|Frontend tests|E2E|Adapter/contract|Notes|
|---|---|---|---|---|---|---|---|
|SL-04.2|applicant data saved|VO/applicant validation|create applicant data|form validation|no|no|maybe combine with SL-04.3|
|SL-04.3|request Submitted|ClientRequest.Create|POST request + read visibility|submit states|yes, skeleton|no|critical|
|SL-05.1|client sees requests|no|GET my requests|list renders|maybe|no|query|
|SL-08.2|notification sent|no/weak|maybe process test|no|no|email adapter|extension|

### Что даёт

```text
- видно, где достаточно domain unit;
- где нужен HTTP integration;
- где нужен frontend component;
- где E2E оправдан;
- где adapter contract.
```

---

# 12. Какие таблицы реально вести руками

Я бы предложил такой практичный режим:

## На старте проекта

Вести руками:

```text
scenario-catalog.md
scenario-spec.md
scenario-responsibility-tables.md
consolidated-layer-maps.md
domain-discovery.md
aggregate-design.md
```

## Когда переходишь к реализации

Добавить:

```text
scenario-to-slice-map.md
slice-cards.md
changeability-map.md
adr/
```

## Когда slices стало много

Добавить derived maps:

```text
implementation-maps.md
```

Внутри него:

```text
Frontend Map
API Contract Map
Application Map
Persistence/Read Model Map
Ports/Adapters Map
Test Map
```

Их можно не заполнять идеально сразу. Они нужны, чтобы видеть систему в разрезе.

---

# 13. Итоговая схема артефактов

```text
01 Scenario Catalog
   = список сценариев

02 Scenario Spec
   = чистое поведение + acceptance + observable outcomes

03 Scenario Responsibility Tables
   = классификация элементов сценария по слоям

04 Consolidated Layer Maps
   = сводка требований по слоям

05 Domain Discovery
   = термины, правила, состояния, events

06 Aggregate Design
   = consistency boundaries

07 Scenario-To-Slice Map
   = список slices, зависимостей, приоритетов

08 Slice Cards
   = подробный план каждого slice

09 Implementation Maps
   = разрез slices по frontend/API/app/persistence/ports/tests

10 Changeability Map
   = ожидаемые изменения и seams

11 ADR
   = решения и trade-offs
```

---

# 14. Самая важная разница

```text
Scenario Spec:
что должно произойти.

Responsibility Table:
чей это слой.

Consolidated Layer Maps:
что у каждого слоя в целом.

Aggregate Design:
где живут доменные инварианты.

Scenario-To-Slice Map:
какие единицы поведения будем поставлять.

Slice Card:
как именно поставить и проверить одну единицу поведения.

Implementation Maps:
как все slices выглядят по каждому архитектурному слою.

Changeability Map:
где ожидаются изменения и какие seams оставляем.

ADR:
почему выбрали именно так.
```

---

# 15. Я бы немного поправил markers

Текущий набор хороший, но я бы добавил одно правило:

```text
[EXT] = новое/дополнительное поведение
[VAR] = место изменения существующего поведения
```

Пример:

```text
Upload documents [EXT]
```

потому что это добавляет новый сценарий/ветку.

```text
Applicant type may expand [VAR]
```

потому что это меняет/расширяет существующую модель applicant data.

```text
Clarification flow [EXT + VAR]
```

потому что это и новый сценарий, и изменение request workflow.

```text
Notification channel may change [VAR]
```

потому что сама идея уведомления остаётся, но способ может меняться.

```text
Outbox reliable delivery [EXT]
```

потому что это новая technical/behavior capability.

И ещё:

```text
[RISK] = не знаем, как правильно
[ADR?] = знаем варианты, нужно решение
```

Например:

```text
Should notification failure block approval? [RISK][ADR?]
```

Это значит: вопрос не просто будущий, а требует решения.