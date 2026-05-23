```
You are a diagram-generation agent for the Energy Management project.Repository:https://github.com/AlexPastukhh/enman/tree/my-changesBranch:my-changesTask:Generate the third scenario diagram package: advanced/cross-cutting scenario pages.Also perform a consistency pass across all generated scenario diagram packages.Do not rewrite already approved diagrams unless a consistency problem is found and explicitly described.Do not recreate core or extension pages.Do not create domain/aggregate/DB diagrams.Do not create implementation diagrams.Do not write code.Do not create responsibility tables.Do not create scenario-to-slice maps.============================================================READ FIRST============================================================Read:- planning/diagram-brief.md- planning/diagram-scenario-spec.md- planning/diagram-generation-rules-with-example.md- planning/diagram-prompting-guide.md- planning/diagram-common-mistakes.md- planning/diagram-examples-index.mdRead approved canonical example:- planning/examples/scenario-login-correct-v3.md- planning/examples/scenario-login-correct-v3.drawio or .svg- planning/examples/scenario-login-correct-v3.png if availableRead existing generated packages if available:- planning/diagrams/scenario-core-package.md- planning/diagrams/scenario-core-package.drawio- planning/diagrams/scenario-extension-package.md- planning/diagrams/scenario-extension-package.drawioOptional only for high-level context:- planning/scenario-to-implementation-workflow-v5-consolidated.mdIf files conflict:- scenario semantics are controlled by planning/diagram-scenario-spec.md;- visual/draw.io construction is controlled by planning/diagram-generation-rules-with-example.md;- prompt process is controlled by planning/diagram-prompting-guide.md;- known anti-patterns are controlled by planning/diagram-common-mistakes.md;- approved examples are indexed by planning/diagram-examples-index.md.============================================================VISUAL BASELINE============================================================Use the approved dark visual theme.Do not use a light theme unless explicitly requested.Use these as visual baseline:- planning/examples/scenario-login-correct-v3.svg- planning/examples/scenario-login-correct-v3.png- planning/examples/scenario-login-correct-v3.drawioAlso match the accepted first and second scenario package style.Theme/style requirements:- dark grid/background;- high-contrast readable text;- semantic color palette from diagram-scenario-spec.md;- spacious layout;- readable node sizes;- no text overflow;- no connector web.============================================================OUTPUT============================================================Create one draw.io-compatible file with multiple pages:```textplanning/diagrams/scenario-advanced-package.drawio
```

Create Markdown summary:

```
planning/diagrams/scenario-advanced-package.md
```

Create consistency report:

```
planning/diagrams/scenario-diagram-consistency-report.md
```

If the directory does not exist, create it.

# ============================================================  
PAGES TO CREATE

Create these pages:

```
15 Security / Account Protection Scenario — SC-1516 Reliable Notification Delivery Scenario — SC-1617 Anonymous Request Scenario — SC-1718 Archive / Audit Scenario — SC-18
```

These are advanced/cross-cutting/future scenarios.  
Keep them high-level and user/behavior-facing.

Do not recreate pages 00–14.  
Use off-page links to earlier packages when needed.

# ============================================================  
GENERAL SCENARIO DIAGRAM RULES

Each page must be a scenario/use-case flow diagram, not text cards.

Main flow must be the visual backbone.

Use:

- actor/screen/context;
- scenario-level preconditions;
- main flow nodes;
- decision nodes;
- required include nodes;
- step-level postconditions;
- compact scenario-level end states;
- local invariants;
- off-page/subscenario links where needed.

Do not create large standalone acceptance cards by default.  
The diagram flow should express acceptance.

Do not include implementation details:

- controller;
- endpoint;
- handler;
- repository;
- DbContext;
- EF mapping;
- SQL table;
- aggregate method;
- command/query class;
- React component/hook;
- queue/table/outbox implementation details;
- provider API details.

Observable outcomes are allowed:

- protected page is shown;
- user is redirected to login;
- notification is sent;
- delivery failure is visible/recorded;
- anonymous request is submitted;
- request status/result is visible;
- archive status is visible;
- audit/history remains visible;
- invalid action is rejected;
- invalid data does not create saved data.

# ============================================================  
COLOR RULES

Use approved semantic colors:

```
Green  = current scenario flow / success path / normal in-page behaviorRed    = negative, invalid, error, rejection or failure branch shown on this pagePurple = off-page transition / subscenario link onlyBlue   = decision node, compact end-state block, observable summaryCyan   = include / mandatory supporting stepYellow = invariant / rule / constraintOlive  = preconditionGray   = actor/screen/context, metadata, legend
```

Purple does not mean actor choice in general.  
Purple means the path leaves the current scenario page.

Color = visual role.  
Marker = planning meaning.  
Connector label = semantic relationship.

# ============================================================  
MARKER RULES

Use markers selectively but visibly.

Use [CORE] on key required main-flow nodes and key required branches.

Use [ALT] narrowly:  
only when a normal/current path is not suitable and another path lets the actor achieve the same or equivalent goal.

Use [EXT] only as roadmap/scope marker.  
Do not use EXT in item refs.

Use EXTND in item refs for off-page/subscenario branch items.

Examples:

```
Good:SC-15-EXTND-01Bad:SC-15-EXT-01
```

Use [VAR:EXPAND], [VAR:MODIFY], [VAR:REPLACE], [RISK], [ADR?] only where they help planning.

Since this is the advanced/cross-cutting package, [EXT:L3], [RISK] and [ADR?] may appear, but do not spam them.

# ============================================================  
LAYOUT RULES

Use lane discipline conceptually.  
Do not draw visible lane guide lines by default.

Keep main flow clean.

Keep separate:

- main/current flow;
- success/result branch;
- negative/error/rejection branch;
- off-page/subscenario links;
- invariants;
- compact end-state summary.

Do not route secondary connectors across the main flow.

Secondary connectors must be short and local when possible:

- include;
- protected by;
- opens subscenario;
- condition for.

Do not draw long connectors from every final branch to the End states/Postconditions block.  
Prefer no connector over a connector web.

Use a large canvas.  
Do not make diagrams compact.  
Readable whitespace is required.

# ============================================================  
TEXT FIT RULE

Text must fit inside every shape.

No label, ref, marker, or body text may overflow outside the shape boundary.

If text does not fit:

- increase the shape size;
- reduce the text;
- split the node;
- move details to a note;
- or use a larger canvas.

Never accept overflow as valid.

Before returning, inspect every shape.

Reject/revise if:

- text escapes outside a shape;
- text touches borders too closely;
- refs/markers overlap body text;
- connector labels overlap node text;
- node is too small for its content.

# ============================================================  
SCENARIO-SPECIFIC GUIDANCE

SC-15 Security / Account Protection Scenario

Goal:  
Protect account/session/access to protected application resources.

Actor / Screen:  
User or Client — Protected application page / protected action

This scenario should capture the invariant that does NOT belong directly inside Login:

```
Protected resource is accessible only after authentication.
```

Possible flow:

- user attempts to open protected page/action [CORE]
- authenticated? [CORE]
    - if authenticated:
        - protected page/action is allowed [CORE]
        - protected content/action is visible/available [CORE]
    - if not authenticated:
        - access is not allowed [CORE]
        - user is redirected to Login — SC-02 [CORE]

Scenario preconditions:

- protected page/action exists;
- user may or may not already have a valid session.

Do not use:

```
User is authenticated
```

as a scenario-level precondition, because authentication is the decision inside this scenario.

Invariant:

- protected resource is accessible only after authentication.

Attach invariant to:

- Authenticated? decision;
- or transition into Protected page/action is allowed.

Off-page link:

- Login Scenario — SC-02

Use purple for the off-page Login link if shown as a subscenario/off-page transition.

Possible markers:

- [CORE] for required protection behavior;
- [ADR?] only if there is a real architecture decision around auth behavior;
- do not overuse markers.

Do not model:

- auth framework internals;
- token storage;
- cookies;
- middleware;
- claims plumbing.

============================================================

SC-16 Reliable Notification Delivery Scenario

Goal:  
System ensures important user notifications are sent or failures are visible/handled.

Actor / Context:  
System — Notification processing

Keep this behavioral and observable.  
Do not model outbox tables, queues, retry jobs, provider clients, or email provider API details.

Possible flow:

- notification is required after a business result [EXT:L3]
- notification send is attempted [EXT:L3]
- delivery accepted? [EXT:L3]
    - if accepted:
        - notification is sent/visible [EXT:L3]
        - recipient can receive notification [EXT:L3]
    - if failed:
        - notification failure is visible/recorded for follow-up [EXT:L3]
        - business result remains unchanged [CORE or EXT:L3 depending on wording]

Scenario preconditions:

- a business result exists that requires notification;
- recipient contact data is available, if needed.

Do not over-detail:

- SMTP;
- email provider;
- outbox;
- background worker;
- database status fields;
- retry implementation.

Allowed observable outcomes:

- notification is sent;
- failure is visible/recorded;
- user-facing business status remains correct;
- support/system can see that notification needs follow-up.

Invariant candidate:

- business decision/result must not be lost, reverted, or corrupted because notification failed.

Attach invariant to:

- boundary between business result and notification attempt;
- or notification failure branch that preserves business result.

Potential off-page links:

- Approval Result — SC-08
- Rejection Result — SC-09
- Contract Acknowledgement — SC-13

Use purple only for off-page links.

Markers:

- [EXT:L3] because reliable delivery is advanced/cross-cutting;
- [VAR:REPLACE] if notification provider may be replaced;
- [ADR?] if reliability mechanism is an architecture decision;
- [RISK] if failure semantics are uncertain.

Use markers sparingly.

============================================================

SC-17 Anonymous Request Scenario

Goal:  
Potential future capability for unauthenticated user to start or submit a request.

Actor / Screen:  
Guest — Anonymous request screen

This is likely future/advanced behavior.

Use [EXT:L3] and possibly [RISK][ADR?] where useful.

Possible flow:

- guest opens anonymous request page [EXT:L3]
- guest provides contact data [EXT:L3]
- guest provides applicant/request data [EXT:L3]
- <<include>> Validate anonymous request data [EXT:L3]
- request data valid? [EXT:L3]
    - if valid:
        - anonymous request is submitted or saved as contact/request draft [EXT:L3]
        - guest sees submission/reference result [EXT:L3]
    - if invalid:
        - validation errors are visible [EXT:L3]
        - no anonymous request is submitted [EXT:L3]

Scenario preconditions:

- anonymous request page is reachable;
- guest is not required to be signed in.

Do not invent a final product decision if it is unknown.

Use open questions for uncertain behavior:

- Does anonymous request create a full request or only a contact request/draft?
- Does guest need to create an account later?
- How does guest track status?
- Is anonymous request actually in scope?

Invariant candidates:

- invalid anonymous request data does not create a submitted request;
- anonymous request must have enough contact data for follow-up.

Attach invariants to:

- validation decision;
- transition into anonymous request submitted/saved.

Potential off-page links:

- Registration — SC-01 if guest later creates account;
- Login — SC-02 if guest chooses to sign in;
- Client Request Creation — SC-04 if anonymous flow converts to authenticated flow.

Use purple only for off-page links.

Do not model:

- anonymous session implementation;
- temporary token storage;
- DB schema;
- account linking implementation.

============================================================

SC-18 Archive / Audit Scenario

Goal:  
Employee or System archives completed/final requests while preserving required audit/history.

Actor / Screen:  
Employee or System — Final request / archive / history context

Keep high-level and behavior-facing.

Possible flow:

- employee/system opens final/completed request [EXT:L3]
- archive action is selected or triggered [EXT:L3]
- archive allowed? [EXT:L3]
    - if allowed:
        - request is archived [EXT:L3]
        - archive status is visible [EXT:L3]
        - audit/history remains visible [EXT:L3]
    - if not allowed:
        - archive action is rejected [EXT:L3]
        - reason/error is visible [EXT:L3]

Scenario preconditions:

- request exists;
- request is final/completed if archive requires final state.

Do not use “request is final” as a precondition if the diagram explicitly checks archive allowed/final state inside the flow.  
Choose one representation, not both.

Invariant:

- archived request must not lose required audit/history.

Attach invariant to:

- archive transition;
- or transition into archived state.

Possible second invariant:

- non-final request cannot be archived, if that is desired behavior.

Attach to:

- Archive allowed? decision.

Observable outcomes:

- request archived;
- archive status visible;
- audit/history visible;
- archive rejected if not allowed.

Do not model:

- audit tables;
- event store;
- database triggers;
- archival storage;
- repository methods.

Potential off-page links:

- Employee Request Dashboard — SC-06
- Employee Request Review — SC-07
- Client Request Status / Result — SC-05, if archive changes visibility.

Use purple only for off-page links.

# ============================================================  
CROSS-PAGE LINKING

Use off-page purple links for references to earlier package pages:

- SC-15 may link to SC-02 Login.
- SC-16 may link to SC-08 Approval Result, SC-09 Rejection Result, or SC-13 Contract Acknowledgement.
- SC-17 may link to SC-01 Registration, SC-02 Login, or SC-04 Client Request Creation.
- SC-18 may link to SC-06 Employee Dashboard, SC-07 Employee Review, or SC-05 Client Request Status.

Do not expand linked scenarios inside advanced pages.  
Use compact off-page link nodes.

Use EXTND in item refs for off-page link nodes.

# ============================================================  
CONSISTENCY PASS

Create:

```
planning/diagrams/scenario-diagram-consistency-report.md
```

Check all available scenario packages:

- scenario-core-package.drawio / .md
- scenario-extension-package.drawio / .md
- scenario-advanced-package.drawio / .md

If some files are missing, state that explicitly and check only available files.

The consistency report must cover:

---

1. Ref consistency

---

Check:

- SC IDs are consistent.
- Item refs use allowed codes:
    - PRE
    - SPRE
    - STEP
    - BR
    - INC
    - EXTND
    - INV
    - POST
    - SPOST
    - OUT
    - Q
- No item ref uses EXT.
- Off-page/subscenario branch refs use EXTND.
- Readable labels appear before or with strict refs.

---

2. Marker consistency

---

Check:

- [CORE] is visible on key required behavior.
- [ALT] is narrow and justified.
- [EXT] is roadmap/scope marker only.
- [EXT] is not used in item refs.
- [VAR:*], [RISK], [ADR?] are not spammed.
- Error branches are not marked [ALT] by default.

---

3. Color consistency

---

Check:

- dark theme is used;
- purple only means off-page/subscenario link;
- red only means negative/error/rejection/failure branch;
- yellow only means invariant/rule/constraint;
- cyan only means include/mandatory supporting step;
- olive only means precondition;
- green means current in-page flow/success/normal behavior;
- blue means decision/end-state/observable summary.

---

4. Semantic consistency

---

Check:

- invariants attach to enforcement points;
- preconditions do not duplicate decisions;
- step postconditions attach to producing steps;
- scenario-level postconditions are compact summaries;
- off-page links are not drawn as normal in-page flow;
- no implementation details appear.

---

5. Visual consistency

---

Check:

- text fits inside all shapes;
- no text touches borders too closely;
- no connector web;
- no connector crosses shape bodies;
- no secondary connectors cross main flow;
- connector labels do not overlap nodes;
- pages are spacious;
- diagrams are not text-card summaries.

---

6. Cross-page link consistency

---

Check relevant links:

- SC-02 -> SC-03
- SC-04 -> SC-10 / SC-11 where used
- SC-05 -> SC-12 / SC-13 where used
- SC-06 -> SC-07
- SC-07 -> SC-08 / SC-09 / SC-12 where used
- SC-08 -> SC-13 / SC-16 where used
- SC-09 -> SC-16 where used
- SC-15 -> SC-02 where used
- SC-17 -> SC-01 / SC-02 / SC-04 where used
- SC-18 -> SC-05 / SC-06 / SC-07 where used

---

7. Problems and recommendations

---

If a problem is found:

- describe the problem;
- identify file/page if possible;
- classify as semantic, visual, marker/ref, or cross-link problem;
- recommend a concrete fix;
- do not silently change approved diagrams unless explicitly asked.

# ============================================================  
MARKDOWN SUMMARY FOR ADVANCED PACKAGE

Create:

```
planning/diagrams/scenario-advanced-package.md
```

It must include:

- list of pages created;
- scenario refs;
- key off-page links;
- key invariants and where they are attached;
- [ALT] usage and justification;
- [EXT], [VAR], [RISK], [ADR?] usage and justification;
- open questions;
- self-check results.

# ============================================================  
SELF-CHECK BEFORE RETURNING

Before returning, verify:

Semantic correctness:

- preconditions do not duplicate decision branches;
- invariants attach to enforcement points;
- invalid/error branches are not [ALT] unless explicitly justified;
- [ALT] is used narrowly;
- [EXT] is not used in item refs;
- EXTND is used for off-page/subscenario item refs;
- step postconditions attach to producing steps;
- scenario end states are compact;
- no implementation details appear;
- purple means off-page/subscenario only.

Visual correctness:

- uses approved dark theme;
- main flow is visually obvious;
- diagrams are not text-card summaries;
- no connector web;
- no connector crosses shape bodies;
- no secondary connectors cross main flow;
- no text overflows outside shapes;
- connector labels do not overlap nodes;
- pages are spacious;
- semantic colors match the approved palette.

Consistency report:

- created;
- checks all available packages;
- clearly states missing files if any;
- lists problems and recommendations instead of silently changing approved diagrams.

If you notice a mistake you made while generating the diagrams:

- identify whether it is semantic or visual;
- fix it before returning;
- mention it in the Markdown summary only if useful;
- if the mistake suggests a missing documentation rule, propose the exact doc update.