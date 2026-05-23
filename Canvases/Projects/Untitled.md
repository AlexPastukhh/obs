Да, твой подход с **живым файлом состояния проекта** — один из самых правильных способов работать с ИИ-агентами на сложном проекте. По сути это **external memory / project state file**: агент не должен каждый раз пытаться восстановить контекст из чата, а должен читать актуальное состояние проекта из файла и после работы обновлять его.

Ниже — набор практик, которые реально помогают.

---

# 1. Главный принцип: один файл как “источник правды”

У проекта должен быть файл, например:

```text
docs/agent/PROJECT_STATE.md
```

или

```text
AI_PROJECT_CONTEXT.md
```

В нем хранится не всё подряд, а только то, что нужно агенту, чтобы продолжить работу без длинного объяснения.

Файл должен отвечать на вопросы:

- что это за проект;
    
- какая цель;
    
- какой сейчас слой реализации;
    
- какие решения уже приняты;
    
- что уже сделано;
    
- что делается сейчас;
    
- что делать следующим;
    
- какие есть риски;
    
- какие классы/эндпоинты/тесты считаются целевыми;
    
- что нельзя менять без причины.
    

---

# 2. Лучше иметь не один огромный файл, а несколько уровней контекста

Один файл можно оставить главным, но не надо превращать его в свалку. Лучше сделать так:

```text
docs/agent/
  00_GENERAL_INFO.md
  01_PROJECT_STATE.md
  02_DECISIONS.md
  03_LAYER_PLAN.md
  04_DOMAIN_MODEL.md
  05_API_PLAN.md
  06_TESTING_STRATEGY.md
  07_NEXT_STEPS.md
```

Но для экономии контекста агенту обычно достаточно сначала читать:

```text
00_GENERAL_INFO.md
01_PROJECT_STATE.md
07_NEXT_STEPS.md
```

А остальные файлы — только когда задача касается конкретной области.

## Какой файл за что отвечает

|Файл|Назначение|
|---|---|
|`GENERAL_INFO.md`|Кратко: что за проект, тема диплома, стек, цель|
|`PROJECT_STATE.md`|Текущее состояние: что сделано, что в работе, что сломано|
|`DECISIONS.md`|Принятые архитектурные решения|
|`LAYER_PLAN.md`|Слои L1/L2/L3 и границы функционала|
|`DOMAIN_MODEL.md`|Целевая модель классов|
|`API_PLAN.md`|Целевые endpoint’ы|
|`TESTING_STRATEGY.md`|Unit/integration/E2E стратегия|
|`NEXT_STEPS.md`|Ближайшие действия|

---

# 3. Что обязательно должно быть в `PROJECT_STATE.md`

Вот хорошая структура.

```markdown
# Project State

## 1. Current Goal
Кратко: над чем сейчас работаем.

## 2. Current Layer
Текущий слой реализации: L0 / L1 / L2 / L3.

## 3. Current Task
Конкретная задача, которую агент выполняет сейчас.

## 4. Done
Список уже выполненных изменений.

## 5. In Progress
Что начато, но не закончено.

## 6. Next Steps
Следующие 3–7 действий.

## 7. Accepted Decisions
Краткий список важных решений.

## 8. Current Domain Model
Кратко: какие классы считаются целевыми.

## 9. Current API Scope
Кратко: какие endpoint’ы сейчас реализуем.

## 10. Testing Scope
Какие тесты должны быть написаны.

## 11. Known Problems
Известные проблемы и технический долг.

## 12. Risks / Future Issues
Какие решения могут создать проблемы позже.

## 13. Do Not Change Without Reason
Что нельзя переименовывать/ломать без явной задачи.

## 14. Last Updated
Дата и краткое описание последнего обновления.
```

---

# 4. Как агент должен обновлять файл после работы

Лучшее правило:

> После каждого законченного действия агент обновляет только те разделы, которые изменились.

Не надо каждый раз переписывать весь файл. Это экономит токены и уменьшает шанс случайно испортить контекст.

Например, после реализации `ClientRequest` агент должен обновить:

- `Done`;
    
- `Current Domain Model`;
    
- `Next Steps`;
    
- `Known Problems`, если появились;
    
- `Last Updated`.
    

---

# 5. Раздел “принятые решения” особенно важен

Для сложного проекта обязательно нужен decision log. Лучше отдельно:

```text
docs/agent/DECISIONS.md
```

Формат:

```markdown
# Decisions

## DEC-001: ФЛ/ИП/ЮЛ моделируются через ApplicantParty, а не через Account

### Status
Accepted

### Context
Нужно поддерживать разных заявителей, но аккаунт отвечает только за вход.

### Decision
Используем:
- Account
  - ClientAccount
  - EmployeeAccount
- ApplicantParty
  - IndividualApplicantParty
  - EntrepreneurApplicantParty
  - LegalEntityApplicantParty

### Consequences
Плюсы:
- аккаунт не смешивается с юридической ролью заявителя;
- один клиент может иметь несколько заявителей;
- проще добавить анонимные заявки.

Минусы:
- модель сложнее, чем простой User.
```

Это очень помогает, когда через неделю агент или ты сам забываете, почему было принято решение.

---

# 6. Используй ADR для крупных решений

ADR — Architecture Decision Record. Это мини-документ по каждому важному решению.

Для твоего проекта ADR нужны на такие темы:

```text
ADR-001 Account vs ApplicantParty
ADR-002 EF Core inheritance mapping strategy
ADR-003 TPH for Account / ApplicantParty / Request
ADR-004 ContractDraft without electronic signature
ADR-005 Playwright TypeScript for E2E
ADR-006 Layered implementation strategy L1/L2/L3
ADR-007 Email first, SMS later
ADR-008 Mock verification instead of real integrations
```

Так агент не будет снова предлагать старые альтернативы.

---

# 7. Контекст надо делить на “долгий” и “короткий”

## Долгий контекст

То, что редко меняется:

- тема диплома;
    
- архитектура;
    
- слои;
    
- доменная модель;
    
- ADR;
    
- границы проекта.
    

Хранится в отдельных документах.

## Короткий контекст

То, что меняется часто:

- текущая задача;
    
- что сделано за сегодня;
    
- следующий шаг;
    
- текущие ошибки;
    
- текущая ветка.
    

Хранится в `PROJECT_STATE.md` или `NEXT_STEPS.md`.

---

# 8. Хорошая техника: “context pack” перед задачей

Перед тем как просить агента что-то сделать, давай ему маленький context pack:

```markdown
Read first:
- docs/agent/GENERAL_INFO.md
- docs/agent/PROJECT_STATE.md
- docs/agent/DOMAIN_MODEL.md

Task:
Implement L1 ClientRequest domain model and unit tests.

Constraints:
- Do not implement L2 documents.
- Do not add anonymous requests.
- Keep Account and ApplicantParty separated.
- Update PROJECT_STATE.md after changes.
```

Так агент не будет тащить в задачу лишний контекст.

---

# 9. Правило “одна задача — один агентский проход”

Не проси агента сразу:

> “Переделай домен, API, фронт, тесты и документацию”.

Лучше дробить:

1. Обновить доменную модель.
    
2. Написать unit-тесты.
    
3. Реализовать домен.
    
4. Реализовать API.
    
5. Написать integration-тесты.
    
6. Реализовать UI.
    
7. Написать Playwright.
    

Это снижает хаос и ошибки.

---

# 10. Правило “не переписывать без причины”

В `PROJECT_STATE.md` лучше явно написать:

```markdown
## Do Not Change Without Reason

- Do not merge Account and ApplicantParty.
- Do not add electronic signature to L1/L2.
- Do not implement real government integrations.
- Do not move L3 security features into L1.
- Do not rename domain classes unless updating DOMAIN_MODEL.md and tests.
- Do not implement documents before L1 request workflow is stable.
```

Это защищает от агента, который начинает “улучшать” не туда.

---

# 11. Техника для сохранения токенов

## Писать краткие файлы-индексы

Например:

```markdown
# INDEX.md

For project overview: GENERAL_INFO.md
For current status: PROJECT_STATE.md
For domain classes: DOMAIN_MODEL.md
For API endpoints: API_PLAN.md
For decisions: DECISIONS.md
For tests: TESTING_STRATEGY.md
```

Агенту не нужно читать всё подряд.

## Не хранить большие код-листинги в контекстных файлах

Плохо:

```markdown
Вот весь код Account.cs...
```

Хорошо:

```markdown
Account.cs:
- базовая учетная запись
- наследники: ClientAccount, EmployeeAccount
- mapping: TPH
- статус: planned / implemented / tested
```

## Хранить состояние таблицами

Таблица экономит токены и повышает ясность.

Например:

```markdown
| Component | Status | Tests | Notes |
|---|---|---|---|
| Account | Planned | No | Base class for users |
| ApplicantParty | Planned | No | Separate from Account |
| ClientRequest | In progress | Partial | Needs status transitions |
```

---

# 12. Техника “статус каждого элемента”

Для проекта полезно иметь статусы:

```text
planned
in-progress
implemented
tested
documented
blocked
deferred
removed
```

Например:

```markdown
## Domain Status

| Class | Layer | Status | Tests | Notes |
|---|---:|---|---|---|
| Account | L1 | planned | no | base auth entity |
| ClientAccount | L1 | planned | no | inherits Account |
| ApplicantParty | L1 | planned | no | base applicant entity |
| IndividualApplicantParty | L1 | planned | no | first applicant type |
| EntrepreneurApplicantParty | L2 | deferred | no | later |
| LegalEntityApplicantParty | L2 | deferred | no | later |
| ClientRequest | L1 | in-progress | partial | main aggregate |
```

Так агент сразу понимает, где он находится.

---

# 13. Для сложного проекта нужен “словарь терминов”

Отдельно:

```markdown
# Glossary

## Account
Техническая учетная запись для входа в систему.

## ApplicantParty
Заявитель, от имени которого подается заявка. Может быть ФЛ, ИП, ЮЛ.

## ClientRequest
Заявка клиента.

## ContractDraft
Проект договора/документа, создаваемый после одобрения заявки.

## Review
Решение сотрудника по заявке.
```

Это снижает риск, что агент снова перепутает `Client`, `Account`, `ApplicantParty`.

---

# 14. Правило “слои нельзя смешивать”

В `LAYER_PLAN.md` нужно явно прописать:

```markdown
# Layer Rules

## L1
Only:
- local auth
- individual applicant
- request creation
- manual employee review
- approve/reject
- email
- simple contract draft

Forbidden in L1:
- documents
- entrepreneur/legal entity
- mock verification
- PDF generation
- rate limiting
- Windows auth
- anonymous requests

## L2
Adds:
- documents
- applicant types
- mock verification
- templates
- PDF
- history
- better errors

## L3
Adds:
- production-like security
- outbox
- audit
- Windows auth
- cache
- anonymous requests
```

Это помогает агенту не уносить лишний функционал в первый слой.

---

# 15. Как давать задачи агенту

Хороший prompt:

```text
Read docs/agent/GENERAL_INFO.md, PROJECT_STATE.md, DOMAIN_MODEL.md, LAYER_PLAN.md.

Task:
Implement L1 domain classes Account, ClientAccount, EmployeeAccount.

Rules:
- Do not implement L2/L3 properties unless they are already listed as planned comments.
- Do not implement email confirmation.
- Do not implement lockout.
- Use TPH-ready inheritance.
- Add xUnit tests for creation and basic invariants.
- Update PROJECT_STATE.md and DECISIONS.md if needed.
```

Плохой prompt:

```text
Сделай аккаунты.
```

---

# 16. Когда проект становится сложным — используй “checkpoints”

После каждого большого этапа делай checkpoint:

```markdown
# Checkpoint 2026-01-15

## Completed
- Account hierarchy created.
- ApplicantParty hierarchy created.
- RequestStatus added.
- ClientRequest unit tests added.

## Current branch
feature/l1-domain

## Known issues
- EF mapping not configured yet.
- ContractDraft still missing.

## Next
- Add EF mapping.
- Add migration.
- Add integration tests.
```

Это позволяет восстановиться после любой потери контекста.

---

# 17. Отдельный файл для “что агенту нельзя делать”

Полезно иметь:

```text
docs/agent/AGENT_RULES.md
```

Пример:

```markdown
# Agent Rules

1. Always read PROJECT_STATE.md before changing code.
2. Do not change architecture decisions without updating DECISIONS.md.
3. Do not introduce L2/L3 features into L1 tasks.
4. Prefer small commits / small diffs.
5. After completing a task, update PROJECT_STATE.md.
6. If a task affects domain classes, update DOMAIN_MODEL.md.
7. If a task affects endpoints, update API_PLAN.md.
8. If a task affects tests, update TESTING_STRATEGY.md.
9. Do not remove tests unless replacing them with equivalent tests.
10. Do not rename public concepts without updating glossary and use cases.
```

---

# 18. Очень полезная техника: “Definition of Done”

Для каждой задачи агент должен знать, что значит “готово”.

Например:

```markdown
## Definition of Done for L1 Domain Task

- Domain class created.
- Invariants implemented.
- Unit tests written.
- Tests pass.
- No L2/L3 behavior implemented.
- PROJECT_STATE.md updated.
- DOMAIN_MODEL.md updated if class changed.
```

Это снижает недоделки.

---

# 19. Для ИИ важно хранить не только “что сделали”, но и “почему”

Плохо:

```markdown
Сделали ApplicantParty.
```

Хорошо:

```markdown
Сделали ApplicantParty отдельно от Account, потому что Account отвечает за вход, а ApplicantParty — за юридического заявителя. Это позволит одному аккаунту иметь несколько заявителей и позже добавить ИП/ЮЛ/анонимные заявки.
```

Причины важнее фактов, потому что агент иначе может в будущем “оптимизировать” обратно.

---

# 20. Как контролировать качество агента

После каждого действия проси агента выводить:

```markdown
## Summary
Что изменено.

## Files changed
Какие файлы изменены.

## Tests
Какие тесты добавлены / запущены.

## Risks
Что может сломаться.

## Project state updates
Какие разделы PROJECT_STATE.md обновлены.
```

Это делает работу проверяемой.

---

# 21. Минимальный набор файлов для твоего проекта

Я бы сделал так:

```text
docs/agent/
  GENERAL_INFO.md
  PROJECT_STATE.md
  LAYER_PLAN.md
  DOMAIN_MODEL.md
  USE_CASES.md
  API_PLAN.md
  TESTING_STRATEGY.md
  DECISIONS.md
  AGENT_RULES.md
```

## Самые важные

Если не хочешь много файлов, минимум:

```text
GENERAL_INFO.md
PROJECT_STATE.md
DECISIONS.md
DOMAIN_MODEL.md
LAYER_PLAN.md
```

---

# 22. Шаблон `PROJECT_STATE.md`

Вот готовый вариант.

```markdown
# Project State

## Current Goal
Implement L1 diploma MVP for customer requests and document workflow.

## Current Layer
L1 — обязательный минимум.

## Current Task
Describe current active task here.

## Project Summary
Web application for diploma:
"Разработка web-приложения для автоматизации ведения документооборота и обработки клиентских заявок в сетевой компании ООО «ЗСК»".

Stack:
- ASP.NET Core backend
- React + TypeScript frontend
- EF Core + SQL Server
- xUnit / Vitest / Playwright tests

## Layer Boundaries

### L1
Registration, login, individual applicant, request creation, employee review, approve/reject, email, simple contract draft.

### L2
Applicant types ФЛ/ИП/ЮЛ, documents, mock verification, templates, PDF, history, better errors.

### L3
Anonymous requests, Windows Negotiate, rate limiting, lockout, outbox, audit, cache, SMS.

## Accepted Decisions
- Account and ApplicantParty are separate.
- ФЛ/ИП/ЮЛ are ApplicantParty types, not Account types.
- L1 supports only IndividualApplicantParty.
- ContractDraft is a project/preview document, not legally signed contract.
- Electronic signature is out of scope.
- Playwright E2E is written in TypeScript.
- Backend/domain tests are written in C# with xUnit.
- EF inheritance strategy: prefer TPH for Account, ApplicantParty, ClientRequest, NotificationMessage.

## Current Domain Model

| Class | Layer | Status | Notes |
|---|---:|---|---|
| Account | L1 | planned | Base account |
| ClientAccount | L1 | planned | Inherits Account |
| EmployeeAccount | L1 | planned | Inherits Account |
| ApplicantParty | L1 | planned | Base applicant |
| IndividualApplicantParty | L1 | planned | First applicant type |
| EntrepreneurApplicantParty | L2 | deferred | Later |
| LegalEntityApplicantParty | L2 | deferred | Later |
| ClientRequest | L1 | planned | Main request aggregate |
| ConnectionRequest | L1 | planned | Request type |
| MeteringDeviceRequest | L1 | planned | Request type |
| RequestReview | L1 | planned | Employee decision |
| ContractDraft | L1 | planned | Simple project document |
| EmailNotification | L1 | planned | Email feedback |

## Current API Scope L1

- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me
- GET /api/profile
- PUT /api/profile
- POST /api/applicant-parties/individual
- GET /api/applicant-parties
- POST /api/requests
- GET /api/requests/my
- GET /api/requests/{id}
- GET /api/employee/requests
- GET /api/employee/requests?view=unprocessed
- GET /api/employee/requests?view=processed
- GET /api/employee/requests/{id}
- POST /api/employee/requests/{id}/take
- POST /api/employee/requests/{id}/approve
- POST /api/employee/requests/{id}/reject

## Testing Scope

### Unit
Domain invariants and status transitions.

### Integration
API scenarios with DB.

### Frontend component
Forms and validation.

### E2E
Full user scenario through browser using Playwright TypeScript.

## Done
- Add completed items here.

## In Progress
- Add active work here.

## Next Steps
1. Finalize L1 domain classes.
2. Add unit tests.
3. Configure EF mapping.
4. Implement L1 API.
5. Add integration tests.
6. Implement React UI.
7. Add Playwright E2E.

## Known Problems
- Add known issues here.

## Risks
- Inheritance can complicate EF mapping.
- Too many L2/L3 features may leak into L1.
- Contract workflow can become too large if electronic signature is added.
- ApplicantParty and Account must not be merged.

## Do Not Change Without Reason
- Do not model ФЛ/ИП/ЮЛ as Account subclasses.
- Do not add electronic signature.
- Do not implement real government integrations.
- Do not add SMS before email works.
- Do not move L3 security into L1.

## Last Updated
YYYY-MM-DD — short summary.
```

---

# 23. Самая рабочая стратегия

Твой процесс должен выглядеть так:

1. Перед задачей агент читает `PROJECT_STATE.md`.
    
2. Агент выполняет маленькую задачу.
    
3. Агент запускает релевантные тесты.
    
4. Агент обновляет `PROJECT_STATE.md`.
    
5. Если принято новое решение — обновляет `DECISIONS.md`.
    
6. Если изменились классы — обновляет `DOMAIN_MODEL.md`.
    
7. Если изменились endpoint’ы — обновляет `API_PLAN.md`.
    

Это даст порядок даже при ограниченном контексте и длинной разработке.

---

# 24. Главная мысль

Ты правильно делаешь, что держишь живой файл.

Но лучше, чтобы он был не просто “планы + заметки”, а структурированная память проекта:

```text
что строим
почему так
что уже сделано
что сейчас делаем
что дальше
что нельзя ломать
какие риски
```

Такой файл превращает ИИ-агента из “болталки с короткой памятью” в нормального помощника по проекту.