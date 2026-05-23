# 1. Общие semantic rules, которые надо добавить в correction pass

## 1.1 Нужен новый тип блока: `DETAIL / Criteria / Input details`

Ты прав: шаги типа:

```
Enter registration dataEnter applicant dataProvide request detailsFilter/search requests
```

слишком общие.

Но сам step не должен превращаться в огромную карточку. Лучше добавить вторичный блок:

```
Registration data detailsSC-01-DETAIL-01Request filter criteriaSC-05-DETAIL-01
```

Назначение:

```
- какие user-visible данные вводятся;- какие критерии фильтрации доступны;- какие поля могут расширяться;- какие данные нужны для follow-up;- какие данные важны для валидации.
```

Важно: это **не DTO / database / domain class**, а user-visible form/input criteria.

Применить к:

```
SC-01 RegistrationSC-04 Request CreationSC-05 My Requests / Request ListSC-06 Employee DashboardSC-10 Applicant DataSC-11 Request DocumentsSC-12 Clarification responseSC-17 Anonymous Request
```

## 1.2 Validation error branch не всегда финальный провал

Сейчас во многих местах логика такая:

```
invalid -> validation errors visible -> request/account/document not created
```

Но чаще сценарий должен продолжаться:

```
invalid -> validation errors visible -> user corrects data -> back to input step
```

А `not created / not saved / not attached` — это:

```
- invariant;- invalid-attempt outcome;- compact end-state;
```

но не обязательно финал всего сценария.

Применить к:

```
SC-01 RegistrationSC-03 Password Recovery formSC-04 Request CreationSC-10 Applicant DataSC-11 Request DocumentsSC-12 Clarification ResponseSC-17 Anonymous Request
```

## 1.3 Off-page links сейчас используются слишком разными смыслами

Нужно разделить 4 случая.

### Case A — current scenario opens another scenario

Это настоящий `EXTND` / purple link.

Пример:

```
Forgot password selected -> Password Recovery — SC-03
```

Ок.

### Case B — current scenario может быть открыт из другого сценария

Это не обязательно purple off-page link внутри сценария. Часто лучше:

```
2 entry points+ separate preconditions/context
```

Пример для SC-10:

```
Entry A:Client opens applicant data page directly.Entry B:Client reaches applicant data from Request Creation — SC-04.
```

Тогда не надо рисовать странную purple связь как будто SC-10 сам открывает SC-04.

### Case C — scenario is used by / triggered by another process

Это лучше держать:

```
- в overview;- в Markdown summary;- или как entry context;
```

но не как основной flow.

Пример SC-14:

```
Request Creation — SC-04 triggers verificationEmployee Review — SC-07 uses verification result
```

Это не значит, что SC-14 должен иметь две полноценные purple стрелки внутри себя.

### Case D — future placeholder

Ок как compact future link, но не надо делать из него flow.

Пример:

```
Reliable Notification Delivery — SC-16 [EXT:L3]
```

---

# 2. Scenario-by-scenario correction map

## SC-01 — Guest Registration

Проблема:

```
Enter registration data
```

слишком общий шаг.

Исправить:

```
Enter registration dataSC-01-STEP-02details ->Registration data detailsSC-01-DETAIL-01- email- password- password confirmation- required contact data if applicable[VAR:EXPAND]
```

Также invalid branch:

```
Registration data invalid-> validation errors visible-> guest corrects registration data-> back to Enter registration data
```

`Account is not created` оставить как invariant/outcome для invalid attempt.

Open question остаётся:

```
After registration, session is issued automatically or user must sign in?
```

---

## SC-02 — Login

В целом логика была наиболее правильной.

Проверить только:

```
- invalid credentials не [ALT];- forgot password = EXTND/off-page;- protected resource invariant не должен быть тут;- если validation error, можно показать correction loop к Enter credentials.
```

---

## SC-03 — Password Recovery

Проблемы:

```
Recovery request acceptable?
```

непонятно.

Email/send/link behavior выражен неявно.

Лучше:

```
Open password recovery screen-> Enter account email-> Submit recovery request-> <<include>> Validate recovery form-> Recovery confirmation is shown
```

Дальше внутренний/осторожный branch:

```
Account eligible for recovery?
```

Но пользователь не должен видеть разницу.

Eligible branch:

```
Recovery email is sent-> Guest opens recovery email link-> opens subscenario: Set New Password
```

Not eligible branch:

```
Same neutral confirmation remains visible-> account existence is not revealed
```

Invariant:

```
Account existence is not revealed.
```

Прикрепить к:

```
Recovery confirmation is shownилиAccount eligible for recovery?
```

---

## SC-04 — Client Request Creation

Большая проблема: статус.

Сейчас core summary говорит, что есть:

```
request status becomes Submittedclient sees Submitted status
```

Но это спорно.

Нужно не хардкодить `Submitted`, пока не принято status vocabulary.

Временно заменить на:

```
Request is sent for reviewRequest appears in client's request listRequest appears in employee review queueInitial request status is assigned [Q: status vocabulary]
```

Open question:

```
What is the initial status after client sends request?Draft?Created?Sent?Pending review?Submitted?
```

Также добавить details card:

```
Request detailsSC-04-DETAIL-01- request type- object/address/location- applicant reference/data- contact data if needed- required request fields[VAR:EXPAND]
```

Invalid branch:

```
Validation errors visible-> client corrects request details-> back to Fill request details
```

А `request is not accepted / no request created` — invariant/outcome invalid attempt.

---

## SC-05 — Client Request Status / Result

Текущий SC-05 надо переосмыслить.

Сейчас он выглядит как:

```
open request status/result pageselect/view requeststatus/result type?submitted/approved/rejected
```

Но лучше:

```
SC-05 = My Requests / Request List Status Overview
```

Flow:

```
Client opens My Requests page-> client sees own requests list-> each request shows current status-> client may filter/search/sort requests-> client selects one request-> opens Request Details / Result View
```

Нужно разделить:

```
Filter/search controlsRequest filter criteria detailsSelect requestOpen request details
```

Details card:

```
Request filter criteriaSC-05-DETAIL-01- status- request type- date/period- address/object- applicant if relevant[VAR:EXPAND]
```

Важный момент: request details page имеет 2 входа:

```
1. From My Requests list2. From email notification link
```

Нужно решить, details view — это:

```
A. часть SC-05;B. отдельная page/subscenario внутри SC-05;C. отдельный сценарий.
```

Пока это open scenario modeling question.

---

## SC-06 — Employee Request Dashboard

Похожая проблема с `filter/search/select`.

Не надо одной карточкой:

```
filter/search/select request
```

Лучше:

```
Open employee dashboard-> submitted/pending review queue is visible-> filter/search requests-> select request-> opens Employee Request Review — SC-07
```

Details card:

```
Employee dashboard filter criteriaSC-06-DETAIL-01- status- date/period- request type- applicant/client- priority if exists- assigned/unassigned if exists[VAR:EXPAND]
```

Также надо заменить `submitted requests` на более нейтральное, если status vocabulary не решён:

```
requests awaiting reviewreview queuenew requests
```

---

## SC-07 — Employee Request Review

Пока базово ок, но зависит от clarified status model.

Нужно уточнить:

```
- employee opens request for review;- does status become In review?- when is decision recorded?- can employee request clarification before approve/reject?- can verification result block approval?
```

Clarification branch сейчас лучше не рисовать просто как future link без понимания. Нужно сначала определить SC-12.

---

## SC-08 — Approval Result

Проблема: непонятно, отдельный ли это сценарий или branch внутри Request Details.

Если approval result — это просто состояние на request details page:

```
Request Details shows Approved result
```

то отдельный SC-08 может быть лишним.

Если там есть отдельное поведение:

```
agreement draft becomes availableclient reviews agreement draftnotification sentclient acknowledges/accepts
```

тогда SC-08 может остаться отдельным.

Но слово `Contract` лучше заменить.

Возможные названия:

```
Agreement DraftConnection Agreement DraftService Agreement DraftOffer / Agreement Draft
```

Я бы использовал:

```
Agreement Draft
```

или если доменно точнее:

```
Connection Agreement Draft
```

---

## SC-09 — Rejection Result

Аналогично SC-08.

Если это просто branch в Request Details:

```
Request Details shows Rejected result + reason
```

то отдельный SC-09 может быть лишним.

Если есть отдельная notification/result flow — можно оставить, но нужно не делать из него самостоятельную сложную page без поведения.

Open question:

```
Are approval/rejection result scenarios separate scenario pages,or are they branches of Request Details / Result View?
```

Это **scenario modeling decision**, не обязательно ADR.

---

## SC-10 — Extended Applicant Data

Проблема на скрине: purple/off-page links используются как “opened from”.

Лучше сделать 2 входа:

```
Entry A:Client opens applicant data page directly.Precondition: client is signed in; applicant data screen is reachable.Entry B:Client reaches applicant data from Request Creation — SC-04.Precondition: request creation is in progress and applicant data is missing/needs update.
```

То есть не обязательно делать purple link от SC-10 к SC-04 как основной flow.

Также добавить details card:

```
Applicant data detailsSC-10-DETAIL-01- individual applicant data- contact data- identity data if relevant- future applicant types[VAR:EXPAND]
```

Важная policy/ADR candidate от тебя:

```
Additional planned verification of provided applicant/request data makes sense only when a client creates/submits a request.Standalone applicant-data editing should not automatically trigger employee verification or allow an employee to start verification without a request.
```

Это нужно занести как:

```
ADR? / scenario policy candidate
```

Связано с:

```
SC-10SC-04SC-14SC-07
```

---

## SC-11 — Request Documents

Проблема:

```
managed from
```

непонятно.

Нужно заменить на явные entry points:

```
Entry A:Client manages documents during Request Creation — SC-04.Entry B:Client manages documents from Request Details / Status — SC-05, if allowed after creation.
```

И надо решить:

```
Can documents be added only before request is sent?Can documents be added after request is under review?Can employee request additional documents via clarification?
```

Если after submission documents are possible, это уже связано с SC-12 Clarification.

Нужен details card:

```
Document details / document criteriaSC-11-DETAIL-01- document type- file selected- allowed format/size if user-visible- required/optional marker[VAR:EXPAND]
```

---

## SC-12 — Clarification

Текущий concept неясен, и 2 актора в одном сценарии лучше разделить.

Предлагаю разделить внутри SC-12 на два связанных сценарных page/sections:

```
SC-12A Employee Requests ClarificationSC-12B Client Responds To Clarification
```

Или две страницы внутри package:

```
12A Clarification Request — Employee Side12B Clarification Response — Client Side
```

Смысл clarification нужно определить так:

```
Clarification = employee asks client for missing/incorrect/additional information during request review before final approve/reject decision.
```

Это не contract/agreement. Это не approval result. Это review loop.

Employee side:

```
Employee reviews request-> needs clarification?-> employee writes clarification request-> clarification request is sent/visible-> request status becomes Needs clarification / Awaiting client response [Q]
```

Client side:

```
Client opens request details or notification link-> clarification request is visible-> client provides clarification response / updated data / documents-> validate response-> response submitted-> employee can continue review
```

Open questions:

```
Does clarification pause review?Can multiple clarification rounds exist?Can clarification request documents?Can client edit original request data or only add response text/files?What status is used?
```

---

## SC-13 — Contract Acknowledgement

Тут надо сначала переименовать concept.

Лучше:

```
Agreement Draft Acknowledgement
```

или:

```
Connection Agreement Acknowledgement
```

Нужно решить, что значит acknowledgement:

```
A. client only confirms receipt/viewing;B. client accepts/agrees to terms;C. client signs agreement;D. client downloads/views agreement draft only.
```

Это сильно разные сценарии.

Связь с SC-12:

```
Clarification happens before final decision.Agreement acknowledgement happens after approval/agreement draft is available.
```

Не нужно смешивать их.

Если acknowledgement — это полноценное согласие, возможно сценарий должен называться:

```
Agreement Review / Acceptance
```

а не acknowledgement.

---

## SC-14 — Mock Verification

Сейчас на скрине есть links:

```
Request Creation — SC-04 triggered byEmployee Request Review — SC-07 used by
```

Это надо уточнить.

С твоим правилом согласен:

```
Additional verification of provided information should only happen in the context of request creation/submission/review.A client may provide applicant data standalone, but that alone should not trigger employee verification.An employee should not be able to start verification arbitrarily without a request in the current planned behavior.
```

Тогда SC-14 лучше моделировать так:

```
Request requires verification-> verification is requested as part of request processing-> verification result available?
```

И не показывать SC-04/SC-07 как две равнозначные entry points.

Лучше:

```
SC-04 sends request for review -> verification may be requestedSC-07 consumes verification result during review
```

То есть SC-14 может быть:

```
System supporting scenario / verification result availability
```

но нужно не превращать его в самостоятельный пользовательский flow, если visible behavior слабый.

---

## SC-15 — Security / Account Protection

Ты прав: это выглядит как базовая логика framework/auth.

Если сценарий просто:

```
Protected page requires authunauthenticated user redirects to login
```

то это может быть не отдельный scenario page, а:

```
Auth/Framework responsibilitycross-cutting invariant
```

Варианты:

```
A. Убрать SC-15 из scenario diagrams и оставить как auth/framework rule для responsibility tables.B. Оставить как очень маленький cross-cutting scenario, если нам нужен user-visible protected-resource-access behavior.
```

Я склоняюсь к A или к сильно сокращённому B.

Если оставить:

```
SC-15 Protected Resource Access
```

а не `Security / Account Protection`, чтобы было user-visible:

```
User opens protected page-> authenticated?-> if not: redirect to Login-> if yes: protected page opens
```

---

## SC-16 — Reliable Notification Delivery

Ты прав: текущий SC-16 скорее рассуждает о notification reliability, а не описывает visible behavior.

Нужно решить:

```
Это сценарий?или ADR/cross-cutting technical concern?
```

Если оставить как сценарий, нужен visible actor/outcome:

```
Client receives notificationSupport/employee sees failed notification follow-upClient opens request details from email link
```

Если нет visible behavior, лучше перенести в:

```
ADR candidatechangeability/extensibility mapports/adapters map later
```

Возможная формулировка:

```
SC-16 Notification Visibility / Notification Failure Follow-Up
```

а не generic `Reliable Notification Delivery`.

---

## SC-17 — Anonymous Request

Проблема на скрине: есть validation request data, но нет отдельной validation follow-up/contact data.

Нужно добавить:

```
Provide contact data-> <<include>> Validate follow-up contact data-> Contact data valid?
```

И details card:

```
Follow-up contact detailsSC-17-DETAIL-01- email- phone if required- preferred contact method if relevant[VAR:EXPAND]
```

Invariant:

```
Anonymous request must have valid reachable contact data for follow-up.
```

Прикрепить к:

```
Contact data valid?
```

Также остаётся большой open question:

```
Does anonymous request create full request, contact request, or draft?
```

Advanced summary уже тоже фиксирует эту неопределённость.

---

## SC-18 — Archive / Audit

Концепт пока неясен.

Нужно определить, что archive значит:

```
A. убрать final request из active employee dashboard;B. скрыть от клиента;C. оставить клиенту readonly access;D. перевести в historical view;E. выполнить retention/audit policy;F. системная автоматическая архивация;G. ручное действие сотрудника.
```

Если нет user-visible behavior, это не сценарий, а:

```
retention/audit policycross-cutting concernADR candidate
```

Если оставить как сценарий, нужно сделать visible behavior:

```
Employee opens final request-> archive action available?-> archive allowed?-> request moved out of active queue-> archive status visible-> audit/history remains visible
```

Open questions:

```
Who archives?When is archive allowed?Can client still see archived request?What audit/history must remain visible?Is archive reversible?
```

---

# 3. Отдельно: theme problem

По скринам диаграммы сейчас светлые. Если это актуальные `.drawio`, то они визуально не проходят наши правила.

Но я бы порядок сделал такой:

```
1. semantic correction first;2. then dark theme / visual correction;3. then consistency report;4. only then responsibility tables.
```

Иначе можно красиво перерисовать семантически неправильные сценарии.

---

# 4. Главные решения, которые надо обсудить до исправления диаграмм

## Decision 1 — status vocabulary

Нужно определить lifecycle статусы request.

Минимальный кандидат:

```
DraftSent for review / Pending reviewIn reviewNeeds clarificationApprovedRejectedArchived
```

Вопрос:

```
Используем ли Submitted?Если да, что именно он значит?
```

## Decision 2 — SC-05 / details page

Нужно решить:

```
SC-05 = request list only?SC-05 = request list + details?Request Details = отдельный subscenario/page?
```

## Decision 3 — SC-08/SC-09

Нужно решить:

```
Approval/Rejection result = отдельные сценарии?или branches inside Request Details?
```

## Decision 4 — clarification

Нужно определить:

```
Clarification = review loop before final decision?Что клиент может отправить в ответ?Меняется ли статус?Сколько раундов?
```

## Decision 5 — agreement/contract wording

Заменить `Contract` на более точное:

```
Agreement DraftConnection Agreement DraftService Agreement Draft
```

И определить, что значит acknowledgement:

```
viewed / received / accepted / signed
```

## Decision 6 — verification scope

Зафиксировать:

```
Verification happens only in request context.Standalone applicant data does not trigger verification.Employee cannot arbitrarily start verification without request in current planned behavior.
```

## Decision 7 — SC-15/16/18 scenario validity

Решить, что из этого реально scenario:

```
SC-15 auth framework behavior?SC-16 visible notification behavior or ADR?SC-18 visible archive behavior or retention/audit policy?
```

---

# 5. Что исправлять в пакетах

## Core package

Исправить:

```
SC-01 registration details + correction loopSC-03 recovery email/link semanticsSC-04 status wording + request details + correction loopSC-05 rework to My Requests list/status overviewSC-06 split filter/search/select + criteria detailsSC-07 clarification branch only after SC-12 decisionSC-08/SC-09 pending modeling decision
```

## Extension package

Исправить:

```
SC-10 entry points instead of ambiguous off-page usageSC-10 applicant details cardSC-11 replace "managed from" with explicit entry pointsSC-11 document criteria/detailsSC-12 split employee/client sides and define clarificationSC-13 rename contract/agreement and define acknowledgementSC-14 verification scope and relation to SC-04/SC-07
```

## Advanced package

Исправить:

```
SC-15 decide whether it belongs as scenario at allSC-16 make visible behavior or move to ADR/cross-cutting concernSC-17 add follow-up contact validationSC-18 define archive/audit concept or move out of scenario package
```

---

# 6. Итог

Сейчас нельзя делать responsibility tables. Нужен этап:

```
Scenario semantic correction pass
```

Результат этого этапа должен быть:

```
1. исправленные scenario packages;2. clarified status vocabulary;3. clarified SC-05 / details / result modeling;4. clarified clarification vs agreement relationship;5. clarified verification scope;6. decision по SC-15/16/18: scenario or cross-cutting/ADR;7. consistency report после исправлений.
```

Только после этого `scenario-responsibility-core.md` будет строиться не на спорных/временных сценариях, а на нормальном source of truth.