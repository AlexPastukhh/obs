# Scenario DATA Specification

  

Status: first trial draft  

Scope: scenario DATA blocks for corrected scenario packages  

Target path: `planning/diagrams/scenario-data-spec.md`

  

This file is a companion to scenario diagrams and scenario text specifications.

  

It is **not** a domain model, database schema, DTO contract, API contract, UI component spec, or responsibility table.

  

## 1. Purpose

  

Collect scenario-level DATA blocks in one place:

  

```text

DATA = user-visible or scenario-relevant data, input fields, filter/search criteria,

selection criteria, uploaded/attached data, response data, review data, agreement data,

and security/policy data that affects scenario behavior.

```

  

Use this file to keep scenario diagrams compact:

  

```text

Scenario diagram node:

Enter registration data

SC-01-STEP-02

  

DATA side block:

Registration data

SC-01-DATA-01

```

  

The diagram should show the DATA block name/ref and only the essential fields.  

This file can hold the fuller explanation, markers and testable behavior.

  

## 2. Rules For This Draft

  

Do not add fields just because they are common in applications.

  

Add DATA only when it is needed for:

  

```text

- scenario logic;

- user-visible behavior;

- validation;

- filtering/searching that has clear UX value;

- access/security invariant;

- future use case already discussed;

- behavior that can and should be tested.

```

  

Avoid premature fields such as:

  

```text

- arbitrary date fields;

- internal database IDs;

- DTO-only properties;

- technical provider fields;

- implementation-only routing/link fields;

- React component state;

- EF/SQL columns.

```

  

Date/period criteria are not core by default in this draft.  

Use them only as `[VAR:EXPAND]` if later UX needs time-based filtering.

  

## 3. Marker Meaning

  

```text

[CORE]         required for current intended behavior

[EXT]          extension / future capability

[VAR:EXPAND]  likely to gain more fields/variants

[VAR:MODIFY]  likely workflow/rule modification

[VAR:REPLACE] provider/strategy can be replaced

[RISK]         uncertainty/risk

[ADR?]         architecture/UX decision likely needed

[Q]            open question

```

  

Core fields do not need to repeat `[CORE]` on every line if the DATA block section says `Core`.

  

Extension/future fields should be explicitly marked.

  

## 4. Standard DATA Block Format

  

```text

Scenario:

DATA ref:

Name:

Actor:

Used by:

Core DATA:

Extension / future DATA:

Validation / rules:

Testable behavior:

Open questions:

```

  

---

  

# 5. Core Scenario DATA

  

## SC-01 — Guest Registration

  

### SC-01-DATA-01 — Registration data

  

Actor: Guest  

Used by: registration form, registration submit

  

Core DATA:

  

```text

- email;

- password;

- password confirmation.

```

  

Extension / future DATA:

  

```text

[EXT][VAR:EXPAND]

- additional contact data;

- applicant-related data;

- profile data collected during registration.

```

  

Validation / rules:

  

```text

- email is required;

- email must have valid email format;

- password is required;

- password confirmation must match password;

- invalid registration data must not create an account.

```

  

Testable behavior:

  

```text

- account can be created with email + password + matching password confirmation;

- account is not created when password confirmation does not match;

- account is not created when required core fields are missing;

- extra registration/applicant data is not required for core registration.

```

  

Open questions:

  

```text

Q: After registration, is session issued automatically or must user sign in?

Q: Which applicant/profile fields, if any, move into registration in future implementations?

```

  

Diagram guidance:

  

```text

Use DATA block, not a large form card.

Mark additional contact/applicant/profile rows as [EXT][VAR:EXPAND], not core.

```

  

---

  

## SC-02 — Login

  

### SC-02-DATA-01 — Login credentials

  

Actor: Guest  

Used by: login form, sign-in submit

  

Core DATA:

  

```text

- email;

- password.

```

  

Validation / rules:

  

```text

- email is required;

- password is required;

- basic email format validation may run client-side;

- invalid credentials must not issue a session;

- error message must not expose unnecessary security information.

```

  

Testable behavior:

  

```text

- valid credentials issue session;

- invalid credentials do not issue session;

- missing/invalid format input shows validation feedback before or at submit;

- forgot password path opens password recovery.

```

  

Security/policy notes:

  

```text

- login throttling / rate limiting are security text specs;

- account lock policy, if planned, belongs to security text specification.

```

  

---

  

## SC-03A — Password Recovery Request

  

### SC-03A-DATA-01 — Recovery email

  

Actor: Guest  

Used by: password recovery form

  

Core DATA:

  

```text

- email.

```

  

Validation / rules:

  

```text

- email is required;

- email must have valid email format;

- system checks whether entered email is registered;

- if email is registered, recovery email is sent;

- if email is not registered, no recovery email is sent;

- user-visible confirmation must not reveal whether account exists.

```

  

Testable behavior:

  

```text

- registered email produces recovery email;

- unregistered email does not produce recovery email;

- both branches show neutral confirmation;

- account existence is not revealed;

- user can follow recovery email link to SC-03B when email is registered.

```

  

Open questions:

  

```text

Q: Exact recovery email content is out of scope here except that it provides a link to SC-03B.

```

  

Diagram guidance:

  

```text

It is acceptable to say email here: email is an explicit UX requirement.

Show branch "Entered email registered?".

Do not make user-visible confirmation reveal branch result.

```

  

---

  

## SC-03B — Account Owner Verified / Password Reset Choice

  

### SC-03B-DATA-01 — Recovery link context

  

Actor: Guest  

Used by: opening password reset experience from email link

  

Core DATA:

  

```text

- recovery link from email;

- recovery token/context represented as valid or invalid/expired.

```

  

Validation / rules:

  

```text

- recovery context must be valid to reset password;

- invalid/expired recovery context must not allow password update;

- user can request a new recovery email when recovery context is invalid/expired.

```

  

Testable behavior:

  

```text

- valid recovery link opens account-owner-verified experience;

- invalid/expired recovery link shows invalid/expired message;

- invalid/expired recovery link does not update password.

```

  

### SC-03B-DATA-02 — New password data

  

Actor: Guest  

Used by: set new password branch

  

Core DATA:

  

```text

- new password;

- password confirmation.

```

  

Validation / rules:

  

```text

- new password is required when reset branch is chosen;

- password confirmation must match new password;

- password policy must be visible or testable if enforced;

- password can be updated only with valid recovery context.

```

  

Testable behavior:

  

```text

- matching valid password updates password;

- mismatched confirmation shows validation error;

- password policy violation shows validation error;

- password is not updated without valid recovery context.

```

  

Open questions:

  

```text

Q: After password reset, do we automatically sign the user in or require login with the new password?

```

  

### SC-03B-DATA-03 — Password reset choice

  

Actor: Guest  

Used by: account-owner-verified state/page

  

Core DATA:

  

```text

- choice: set new password;

- choice: login with old password.

```

  

Validation / rules:

  

```text

- login with old password opens SC-02 Login;

- set new password stays in SC-03B reset branch.

```

  

Testable behavior:

  

```text

- user can choose to set new password;

- user can choose to go to login without changing password;

- login-with-old-password path does not update password.

```

  

---

  

## SC-04 — Client Request Creation

  

### SC-04-DATA-01 — Request creation data

  

Actor: Client  

Used by: request creation form, request submit

  

Core DATA:

  

```text

- requested service / request subject information;

- applicant data reference or inline applicant data needed for request;

- contact/reachability data if required for request processing.

```

  

Extension / future DATA:

  

```text

[EXT][VAR:EXPAND]

- fields needed for additional request types;

- data prefilled from rejected request feedback;

- document references if documents become required in the creation flow.

```

  

Validation / rules:

  

```text

- required request data must be present before submit;

- request is accepted only if required request data is valid;

- accepted request status becomes InReview;

- invalid request is not accepted.

```

  

Testable behavior:

  

```text

- accepted request creates request with status InReview;

- accepted request appears in My Requests;

- accepted request appears in employee review queue;

- missing required request data shows validation feedback;

- invalid request does not create InReview request.

```

  

Open questions:

  

```text

Q: Exact request subject fields need domain confirmation.

Q: Which data can be prefilled from rejected request feedback?

```

  

Diagram guidance:

  

```text

Do not use Submitted status.

Do not add arbitrary fields until they are needed for request logic or validation.

```

  

---

  

## SC-05 — My Requests / Own Request Details

  

### SC-05-DATA-01 — My Requests list item data

  

Actor: Client  

Used by: My Requests list

  

Core DATA:

  

```text

- request summary visible enough to identify the request;

- request status: InReview / Approved / Rejected.

```

  

Extension / future DATA:

  

```text

[VAR:EXPAND]

- additional summary fields useful for identifying a request;

- date/period display or filtering if UX later needs it.

```

  

Validation / rules:

  

```text

- list contains only client's own requests;

- client must not see another client's requests.

```

  

Testable behavior:

  

```text

- client sees only own requests;

- each request row shows current status;

- no other client's request appears in list.

```

  

### SC-05-DATA-02 — Request filter/search criteria

  

Actor: Client  

Used by: My Requests filtering/searching

  

Core DATA:

  

```text

- status.

```

  

Extension / future DATA:

  

```text

[VAR:EXPAND]

- request type, if multiple request types exist;

- text/search phrase if request summaries become searchable;

- date/period if UX later needs time-based filtering.

```

  

Validation / rules:

  

```text

- filters must not expose other clients' requests;

- filtering applies only within own requests.

```

  

Testable behavior:

  

```text

- status filter shows only own requests with selected status;

- filtering does not bypass own-request invariant.

```

  

### SC-05-DATA-03 — Own Request Details visible data

  

Actor: Client  

Used by: Request Details page

  

Core DATA:

  

```text

- request status: InReview / Approved / Rejected;

- submitted request data visible to the client;

- review result data when request is processed.

```

  

Status-specific DATA:

  

```text

InReview:

- submitted request data;

- under-review state.

  

Approved:

- approval result/message if available;

- agreement-related status/action if available.

  

Rejected:

- rejection explanation/details;

- feedback context for creating a new request.

```

  

Validation / rules:

  

```text

- client can open only own request details;

- rejected feedback belongs only to the client's own rejected request.

```

  

Testable behavior:

  

```text

- InReview request shows under-review state;

- Approved request shows approval result/status;

- Rejected request shows rejection explanation/details;

- client cannot open another client's request details;

- rejected request can expose action/path to create a new request based on feedback.

```

  

Open questions:

  

```text

Q: When review feedback is available, should UX lead to Request Details, My Agreements, Agreement Details, or multiple destinations?

Q: Where is “create new request based on feedback” offered: rejected Request Details, review feedback notification, both, or future update flow?

```

  

---

  

## SC-06 — Employee Request Dashboard

  

### SC-06-DATA-01 — Employee dashboard row data

  

Actor: Employee  

Used by: employee request dashboard / review queue

  

Core DATA:

  

```text

- request summary visible enough for employee to identify the request;

- request status, especially InReview;

- applicant/client summary if needed to distinguish requests.

```

  

Extension / future DATA:

  

```text

[VAR:EXPAND]

- assignment/owner if assignment is introduced;

- priority if priority is introduced;

- date/period if UX later needs time-based filtering.

```

  

Validation / rules:

  

```text

- dashboard requires employee permission;

- review can start only for InReview requests.

```

  

Testable behavior:

  

```text

- employee sees InReview queue/default set;

- employee can open request details;

- employee can start review only for InReview request;

- Approved/Rejected request cannot enter review from dashboard.

```

  

### SC-06-DATA-02 — Employee dashboard filter/search criteria

  

Actor: Employee  

Used by: dashboard filtering/searching

  

Core DATA:

  

```text

- status.

```

  

Extension / future DATA:

  

```text

[VAR:EXPAND]

- request type, if multiple request types exist;

- applicant/client search if needed;

- assigned/unassigned if assignment is introduced;

- priority if priority is introduced;

- date/period if UX later needs it.

```

  

Validation / rules:

  

```text

- filters must not bypass employee permissions.

```

  

Testable behavior:

  

```text

- status filter can isolate InReview requests;

- filters do not expose unauthorized data.

```

  

Open questions:

  

```text

Q: Does the dashboard show only InReview requests by default, or all requests with filters?

Q: Are requests assigned to employees in the current implementation, or is assignment future behavior?

```

  

---

  

## SC-07A — Employee Request Details

  

### SC-07A-DATA-01 — Employee request detail visible data

  

Actor: Employee  

Used by: Employee Request Details page

  

Core DATA:

  

```text

- request status;

- request data;

- applicant/client data needed for review;

- review action availability.

```

  

Extension / future DATA:

  

```text

[VAR:EXPAND]

- submitted documents, if document flow is enabled;

- verification result, if verification flow is enabled;

- review/decision history, if visible later;

- assignment/lock information, if introduced.

```

  

Validation / rules:

  

```text

- employee permission required;

- review action is available only when request status is InReview;

- Approved/Rejected requests cannot be reviewed again.

```

  

Testable behavior:

  

```text

- InReview request details show review action;

- Approved request details do not show review action;

- Rejected request details do not show review action;

- opening details does not automatically review/approve/reject.

```

  

Open questions:

  

```text

Q: Does opening details assign or lock the request? Current assumption: no.

Q: Is review history visible in current implementation or future behavior?

```

  

---

  

## SC-07B — Employee Request Review

  

### SC-07B-DATA-01 — Review decision data

  

Actor: Employee  

Used by: Employee Request Review

  

Core DATA:

  

```text

- decision: Approved or Rejected;

- rejection explanation when decision is Rejected.

```

  

Extension / future DATA:

  

```text

[VAR:EXPAND]

- approval message;

- agreement option/draft data if sent as part of approval flow;

- verification result used during decision;

- review notes not visible to client, if introduced.

```

  

Validation / rules:

  

```text

- request must be InReview to enter review;

- decision is required to complete review;

- rejection explanation is required when rejecting, if rejection feedback is shown to client;

- Approved/Rejected requests cannot be reviewed again.

```

  

Testable behavior:

  

```text

- Approved decision records decision and changes status to Approved;

- Rejected decision records explanation and changes status to Rejected;

- review cannot start for Approved/Rejected request;

- rejected request shows explanation to client in SC-05.

```

  

Open questions:

  

```text

Q: Is rejection explanation always required for Rejected?

Q: Is approval message required or optional?

Q: Does approval directly create/send agreement option, or is that done in SC-13B?

```

  

---

  

# 6. Merged Core Scenario Notes

  

## SC-08 — Approved Result

  

Status: merged / removed as standalone scenario.

  

DATA owned by:

  

```text

SC-07B-DATA-01 Review decision data

SC-05-DATA-03 Own Request Details visible data

SC-13A/SC-13B Agreement DATA

```

  

## SC-09 — Rejected Result

  

Status: merged / removed as standalone scenario.

  

DATA owned by:

  

```text

SC-07B-DATA-01 Review decision data

SC-05-DATA-03 Own Request Details visible data

SC-04-DATA-01 Request creation data when creating new request from feedback

```

  

---

  

# 7. Extension Scenario DATA

  

## SC-10 — Applicant Data

  

### SC-10-DATA-01 — Applicant data

  

Actor: Client  

Used by: Applicant Data page, Request Creation when applicant data is missing/needs update

  

Core DATA:

  

```text

- applicant identity/contact data needed to submit or process request;

- applicant data reference reused by request creation.

```

  

Extension / future DATA:

  

```text

[VAR:EXPAND]

- identity data if later required;

- future applicant types;

- applicant data partially collected during registration;

- anonymous / not-yet-registered follow-up contact data;

- exact contact channel for future feedback: email or phone not fixed.

```

  

Validation / rules:

  

```text

- required applicant data must be present when request requires it;

- invalid applicant data is not saved;

- standalone applicant data editing does not trigger verification.

```

  

Testable behavior:

  

```text

- client can save valid applicant data;

- invalid applicant data shows validation feedback;

- saved applicant data can be reused in request creation;

- editing applicant data alone does not start verification.

```

  

Open questions:

  

```text

Q: Exact applicant data fields need domain confirmation.

Q: Which applicant data, if any, is collected during registration in future implementation?

Q: Which applicant contact/follow-up fields are needed for anonymous/not-yet-registered flows?

```

  

---

  

## SC-11 — Request Documents

  

### SC-11-DATA-01 — Request document data

  

Actor: Client  

Used by: document attach/upload flow

  

Core DATA:

  

```text

- selected file/document.

```

  

Extension / future DATA:

  

```text

[VAR:EXPAND]

- document type, if user-visible or required;

- allowed format/size if user-visible;

- required/optional marker if document rules vary;

- after-feedback additional document requirement.

```

  

Validation / rules:

  

```text

- selected document must be accepted before attachment;

- rejected/invalid document is not attached;

- document validation errors are visible and correctable.

```

  

Testable behavior:

  

```text

- accepted document is attached and visible;

- rejected document is not attached;

- user can select another document after rejection;

- future after-feedback upload is not L1 unless explicitly enabled.

```

  

Open questions:

  

```text

Q: Are documents required in L1 or optional extension?

Q: Can documents be added after request is InReview, or only through future feedback/update flow?

```

  

---

  

## SC-13A — My Agreements

  

### SC-13A-DATA-01 — Agreement list item data

  

Actor: Client  

Used by: My Agreements list

  

Core DATA:

  

```text

- agreement/option summary visible enough to identify item;

- agreement/option state;

- direction/source: sent by employee or sent by client;

- related Approved request.

```

  

Extension / future DATA:

  

```text

[VAR:EXPAND]

- agreement option type if multiple types exist;

- date/period if UX later needs time-based filtering;

- signature status when electronic signature is introduced.

```

  

Validation / rules:

  

```text

- client can view only own agreements/agreement options;

- agreement item must be tied to an accessible Approved request or client-owned agreement context.

```

  

Testable behavior:

  

```text

- client sees own agreement list;

- list can include employee-sent options and client-sent options;

- client cannot see another client's agreement options;

- selecting item opens Agreement Details — SC-13B.

```

  

### SC-13A-DATA-02 — Agreement filter/search criteria

  

Actor: Client  

Used by: My Agreements filtering/searching

  

Core DATA:

  

```text

- agreement/option state;

- source/direction: sent by employee or sent by client.

```

  

Extension / future DATA:

  

```text

[VAR:EXPAND]

- related Approved request;

- agreement option type;

- signature status;

- date/period if UX later needs it.

```

  

Validation / rules:

  

```text

- filters must not expose other clients' agreements.

```

  

Testable behavior:

  

```text

- client can filter agreements by state/source where enabled;

- filtering preserves own-agreements invariant.

```

  

---

  

## SC-13B — Agreement Details / Agreement Response

  

### SC-13B-DATA-01 — Agreement details visible data

  

Actor: Client  

Used by: Agreement Details page

  

Core DATA:

  

```text

- selected agreement option;

- option source: employee-sent or client-sent;

- current agreement/option state;

- related Approved request.

```

  

Extension / future DATA:

  

```text

[VAR:EXPAND]

- option history;

- comparison between versions;

- electronic signature status.

```

  

Validation / rules:

  

```text

- client can open only own agreement details;

- response actions are available only for agreement options available to the client.

```

  

Testable behavior:

  

```text

- client can view selected own agreement option;

- client cannot open another client's agreement details;

- correct response actions are visible according to state.

```

  

### SC-13B-DATA-02 — Agreement response data

  

Actor: Client  

Used by: agreement response action

  

Core DATA:

  

```text

- response choice: accept/confirm current option;

- response choice: attach own agreement version/counterproposal.

```

  

Core DATA when attaching own version:

  

```text

- selected file/document/version to send back.

```

  

Extension / future DATA:

  

```text

[VAR:EXPAND]

- optional comment/message;

- direct send-own-option flow from My Agreements;

- selected Approved request when sending own option directly;

- electronic signature data.

```

  

Validation / rules:

  

```text

- response must be tied to an agreement option available to the client;

- attached own version must be accepted before submission;

- accepted/confirmed response is recorded;

- sent counterproposal/version is recorded.

```

  

Testable behavior:

  

```text

- client can accept/confirm current option;

- client can attach own version/counterproposal and send it back;

- invalid attachment is not sent;

- response state becomes visible after submit.

```

  

Open questions:

  

```text

Q: What exact agreement option states exist in L1?

Q: Does approval directly create agreement option, or does employee explicitly send it later?

Q: When future direct-send flow exists, how does client select Approved request?

```

  

---

  

## SC-14 — Client Data Verification

  

### SC-14-DATA-01 — Client verification data

  

Actor: Employee  

Used by: future client data verification action during review/details

  

Core / current note:

  

```text

Current implementation mocks verification/check.

```

  

Future DATA:

  

```text

[EXT][VAR:EXPAND]

- request data used for verification;

- applicant/client data used for verification;

- verification result: passed / failed / unavailable;

- verification issue/reason if failed;

- verification status visible to employee review.

```

  

Validation / rules:

  

```text

- verification is available only in request context;

- standalone applicant data editing does not trigger verification;

- employee cannot start verification without a request;

- future employee action starts verification from review/details context.

```

  

Testable behavior:

  

```text

- verification cannot be started without request;

- applicant data editing alone does not start verification;

- mocked verification result can be made available to employee review;

- failed/unavailable result is visible/handled according to review policy.

```

  

ADR candidates:

  

```text

ADR?: Verification/check is mocked in current implementation.

ADR?: Future implementation allows employee to start verification from review/details.

ADR?: Behavior when verification is unavailable needs decision if it affects review.

```

  

---

  

# 8. Security / Policy DATA

  

## SC-15 — Security Text Specification

  

### SC-15-DATA-01 — Login/account protection policy data

  

Actor: System / Security policy  

Used by: Login, Password Recovery, Account access

  

Core / current notes:

  

```text

- no account enumeration in password recovery;

- invalid login does not issue session;

- client can view only own requests;

- client can view only own agreements;

- employee review requires employee permission.

```

  

Extension / future DATA:

  

```text

[EXT][VAR:EXPAND]

- login throttling;

- rate limiting;

- account lock policy;

- recovery abuse protection;

- ban account status;

- ban reason;

- audit note for ban action.

```

  

Testable behavior:

  

```text

- password recovery confirmation does not reveal account existence;

- client cannot access another client's request/agreement;

- employee-only screens require employee permissions;

- future account ban prevents access according to policy.

```

  

Open questions:

  

```text

Q: Which security policies are in L1 and which are future?

Q: How should account ban affect active sessions and pending requests/agreements?

```

  

---

  

# 9. Advanced / Future DATA

  

## SC-17 — Anonymous Request

  

### SC-17-DATA-01 — Anonymous request data

  

Actor: Anonymous user  

Used by: anonymous request form

  

Core / extension status:

  

```text

[EXT]

```

  

DATA:

  

```text

- requested service / request subject information;

- description/details needed to understand request.

```

  

Extension / future DATA:

  

```text

[VAR:EXPAND]

- fields needed for additional anonymous request types;

- object/address/location if the future anonymous flow needs it.

```

  

Validation / rules:

  

```text

- required anonymous request data must be present;

- invalid anonymous request data is not accepted.

```

  

Testable behavior:

  

```text

- anonymous user can submit accepted request/contact information;

- invalid request data shows validation feedback;

- invalid request data is not accepted.

```

  

Open questions:

  

```text

Q: Does anonymous request create full request, contact request, or draft?

Q: Is anonymous request L3/future or nearer-term extension?

```

  

### SC-17-DATA-02 — Follow-up contact data

  

Actor: Anonymous user  

Used by: anonymous request follow-up

  

Core / extension status:

  

```text

[EXT]

```

  

DATA:

  

```text

- reachable follow-up contact: email or phone, exact channel not fixed.

```

  

Extension / future DATA:

  

```text

[VAR:EXPAND]

- preferred contact method if multiple channels are enabled;

- additional follow-up context.

```

  

Validation / rules:

  

```text

- anonymous request must have reachable follow-up contact data;

- exact contact channel is not fixed in this draft;

- invalid contact data is not accepted.

```

  

Testable behavior:

  

```text

- anonymous request without reachable contact data is not accepted;

- valid reachable contact data allows submission;

- validation errors are visible and correctable.

```

  

---

  

## FUT-ADMIN — Future Admin Board

  

Status: future implementation consideration, not current scenario package.

  

### FUT-ADMIN-DATA-01 — Admin employee filter/selection data

  

Actor: Admin  

Used by: future Admin Board

  

Markers:

  

```text

[EXT][VAR:EXPAND][ADR?]

```

  

DATA:

  

```text

- employee identifier/summary visible to admin;

- employee status;

- role/permission summary;

- selected employee;

- selected request.

```

  

Future view relationships:

  

```text

- requests associated with selected employee;

- reviews performed by selected employee;

- agreements where employee participated.

```

  

Testable future behavior:

  

```text

- admin can filter/select employees;

- admin can view requests/reviews/agreements associated with selected employee;

- admin filtering does not expose unauthorized data beyond admin permission model.

```

  

Open questions:

  

```text

Q: What admin roles exist?

Q: What does "employee participated in agreement" mean?

Q: Is admin board L3 or later?

```

  

### FUT-ADMIN-DATA-02 — Account ban data

  

Actor: Admin  

Used by: future account ban capability

  

Markers:

  

```text

[EXT][RISK][ADR?]

```

  

DATA:

  

```text

- target account;

- ban status;

- ban reason;

- actor performing ban;

- visible consequence of ban.

```

  

Extension / future DATA:

  

```text

[VAR:EXPAND]

- ban duration;

- unban reason;

- audit/history note;

- affected active sessions.

```

  

Testable future behavior:

  

```text

- admin can ban target account if authorized;

- banned account cannot perform restricted actions according to policy;

- ban reason/status is recorded/visible where required.

```

  

Open questions:

  

```text

Q: Does ban terminate active sessions?

Q: Does ban affect existing requests/agreements?

Q: Is ban reversible?

```

  

---

  

## SC-18 — Archive / Audit

  

Status: deferred / low priority / unresolved.

  

No current DATA block.

  

Possible future DATA if scenario becomes user-facing:

  

```text

[EXT][ADR?]

- archive status;

- archived request reference;

- actor/policy that archived request;

- audit/history visibility;

- restore/reopen flag if reversible.

```

  

Current decision:

  

```text

Do not model archive/audit in detail until user-facing behavior or policy is clarified.

```

  

---

  

# 10. Cross-Scenario DATA Reuse

  

## Shared DATA concepts

  

```text

Email:

- SC-01 registration email

- SC-02 login email

- SC-03A recovery email

- SC-17 follow-up contact may be email or phone

  

Password:

- SC-01 password/password confirmation

- SC-02 password

- SC-03B new password/password confirmation

  

Request status:

- SC-04 creates InReview

- SC-05 shows InReview / Approved / Rejected

- SC-06 filters/sees InReview queue

- SC-07A controls review action availability

- SC-07B changes status to Approved or Rejected

  

Own-resource access:

- SC-05 own requests

- SC-13A/SC-13B own agreements

  

Review decision:

- SC-07B produces Approved/Rejected

- SC-05 displays status/result

- SC-13 agreement path can follow approval

```

  

## DATA that should not become DB schema yet

  

```text

- request summary;

- applicant data;

- agreement option state;

- verification result;

- admin board data;

- ban data;

- archive/audit data.

```

  

These are scenario-level planning DATA until domain/aggregate/database planning starts.

  

---

  

# 11. First-Draft Open Questions

  

```text

Q1: Exact request creation fields need domain confirmation.

Q2: Exact applicant data fields need domain confirmation.

Q3: Which filters are actually needed in L1 vs future?

Q4: Does approval directly create/send agreement option, or is agreement sending a separate employee action?

Q5: What exact agreement option states exist in L1?

Q6: Which security policies are L1 and which are future?

Q7: Does anonymous request create full request, contact request, or draft?

Q8: Is admin board L3 or later?

Q9: Should any date/period filtering be L1, or keep it future only?

```