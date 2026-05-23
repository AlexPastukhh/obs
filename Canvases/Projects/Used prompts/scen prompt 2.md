```
You are a diagram-generation agent for the Energy Management project.Repository:https://github.com/AlexPastukhh/enman/tree/my-changesBranch:my-changesTask:Generate the second scenario diagram package: extension scenario pages.The first core scenario package is already generated and accepted/reviewed.Reuse its visual and semantic language.Do not regenerate the first package.Do not create domain/aggregate/DB diagrams.Do not create implementation diagrams.Do not write code.Do not create responsibility tables.Do not create scenario-to-slice maps.============================================================READ FIRST============================================================Read:- planning/diagram-brief.md- planning/diagram-scenario-spec.md- planning/diagram-generation-rules-with-example.md- planning/diagram-prompting-guide.md- planning/diagram-common-mistakes.md- planning/diagram-examples-index.mdRead approved canonical example:- planning/examples/scenario-login-correct-v3.md- planning/examples/scenario-login-correct-v3.drawio or .svg- planning/examples/scenario-login-correct-v3.png if availableRead first package if available:- planning/diagrams/scenario-core-package.md- planning/diagrams/scenario-core-package.drawioOptional only for high-level context:- planning/scenario-to-implementation-workflow-v5-consolidated.mdIf files conflict:- scenario semantics are controlled by planning/diagram-scenario-spec.md;- visual/draw.io construction is controlled by planning/diagram-generation-rules-with-example.md;- prompt process is controlled by planning/diagram-prompting-guide.md;- known anti-patterns are controlled by planning/diagram-common-mistakes.md;- approved examples are indexed by planning/diagram-examples-index.md.============================================================VISUAL BASELINE============================================================Use the approved dark visual theme.Do not use a light theme unless explicitly requested.Use these as visual baseline:- planning/examples/scenario-login-correct-v3.svg- planning/examples/scenario-login-correct-v3.png- planning/examples/scenario-login-correct-v3.drawioAlso match the accepted first scenario package style.============================================================OUTPUT============================================================Create one draw.io-compatible file with multiple pages.Also create a Markdown summary file.Suggested file names:```textplanning/diagrams/scenario-extension-package.drawioplanning/diagrams/scenario-extension-package.md
```

If the directory does not exist, create it.

# ============================================================  
PAGES TO CREATE

Create these pages:

```
10 Extended Applicant Data Scenario — SC-1011 Request Documents Scenario — SC-1112 Clarification Scenario — SC-1213 Contract Acknowledgement Scenario — SC-1314 Mock Verification Scenario — SC-14
```

Do not create pages 15–18 yet.

Do not recreate pages 00–09.  
Use off-page links to core pages when needed.

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
- React component/hook.

Observable outcomes are allowed:

- applicant data is saved;
- document is attached;
- clarification request is visible;
- clarification response is submitted;
- contract draft is visible;
- acknowledgement is recorded/visible;
- verification result is available;
- invalid input does not create saved data.

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

Good:  
SC-11-EXTND-01

Bad:  
SC-11-EXT-01

Use [VAR:EXPAND], [VAR:MODIFY], [VAR:REPLACE], [RISK], [ADR?] only where they help planning.

Since this is the extension package, [EXT:L2] is expected on extension capabilities, but do not spam it on every node.

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

# ============================================================  
SCENARIO-SPECIFIC GUIDANCE

SC-10 Extended Applicant Data Scenario

Goal:  
Client provides or updates richer applicant data.

Actor / Screen:  
Client — Applicant data / profile data screen

Use user-facing wording:

- Provide applicant data
- Provide individual applicant data
- Provide extended applicant data

Do not use as primary label:

- Create applicant profile
- Create ApplicantParty

Possible flow:

- client opens applicant data page [EXT:L2]
- client enters or updates applicant data [CORE or EXT:L2 depending on page framing]
- <<include>> Validate applicant data
- Applicant data valid?
    - if valid:
        - applicant data is saved
        - updated applicant data is visible/reusable
    - if invalid:
        - validation errors are visible
        - applicant data is not saved

Potential variants:

- individual applicant;
- future entrepreneur/legal entity if relevant.

Use [VAR:EXPAND] for applicant type expansion.

Use [ALT] only if there are alternative ways to achieve the same applicant-data goal, for example:

- provide data inline during request creation;
- open applicant data page and return to request creation.

Step postcondition:

- Applicant data is saved.

Invariant:

- invalid applicant data is not saved.  
    Attach to applicant-data validation decision or save transition.

Off-page links:

- Request Creation — SC-04, if this page is reached from request creation or returns there.  
    Use purple only for off-page link.

============================================================

SC-11 Request Documents Scenario

Goal:  
Client attaches or manages documents for a request.

Actor / Screen:  
Client — Request documents section/page

This is an extension scenario.

Possible flow:

- client opens request documents section [EXT:L2]
- client selects document to upload
- <<include>> Validate document
- Document accepted?
    - if accepted:
        - document is attached to request
        - attached document is visible
    - if rejected:
        - upload error is visible
        - document is not attached

Do not model:

- storage provider;
- filesystem;
- cloud bucket;
- database table;
- binary storage mechanics.

Use [EXT:L2] where appropriate.  
Use [VAR:EXPAND] if document types may grow.

Step postcondition:

- document is attached to request.

Invariant:

- rejected/invalid document is not attached.  
    Attach to document validation decision or attach transition.

Off-page links:

- Request Creation — SC-04 if documents are reached from request creation.
- Request Status — SC-05 if documents are managed after submission.

Use purple only for off-page links.

============================================================

SC-12 Clarification Scenario

Goal:  
Employee requests clarification and client provides clarification.

This scenario may involve two actors:

- Employee
- Client

Keep it readable.  
Use distinct areas for Employee side and Client side if needed, but avoid visible swimlane guide lines unless necessary.

Possible flow:

Employee side:

- employee reviews request;
- employee selects request clarification;
- employee writes clarification question/request;
- clarification request is submitted;
- request status becomes Needs clarification.

Client side:

- client opens request status/result page;
- clarification request is visible;
- client provides clarification response;
- <<include>> Validate clarification response;
- clarification response valid?
    - if valid:
        - clarification response is submitted;
        - employee can see clarification;
        - review can continue.
    - if invalid:
        - validation errors are visible;
        - clarification response is not submitted.

Use [EXT:L2][VAR:MODIFY] if useful.  
Use [ADR?] only if the decision is truly architectural, not just workflow uncertainty.

Invariant candidates:

- request cannot be approved/rejected while required clarification is unresolved;
- invalid clarification response is not submitted.

Attach invariants to enforcement points:

- review decision while clarification unresolved;
- clarification response validation decision / submit transition.

Do not over-model notifications.  
Do not model implementation details.

Off-page links:

- Employee Request Review — SC-07
- Client Request Status / Result — SC-05

Use purple only for off-page links.

============================================================

SC-13 Contract Acknowledgement Scenario

Goal:  
Client sees/receives contract draft after approval and acknowledges it if required.

Actor / Screen:  
Client — Approved request / contract draft page

Possible flow:

- approved result is visible;
- contract draft is available;
- client opens contract draft;
- contract draft readable/available?;
    - if available:
        - client reviews contract draft;
        - client acknowledges contract draft if acknowledgement is in scope;
        - acknowledgement is recorded/visible.
    - if unavailable:
        - contract draft unavailable message is visible;
        - acknowledgement is not recorded.

Keep high-level observable behavior.

Do not model:

- document generation internals;
- template engine;
- file storage;
- provider mechanics.

Step postconditions:

- contract draft is available/visible;
- acknowledgement is recorded/visible, if applicable.

Invariant:

- client cannot acknowledge unavailable contract draft.  
    Attach to draft availability decision / acknowledgement transition.

Off-page links:

- Approval Result — SC-08
- Reliable Notification Delivery — SC-16, only as future off-page placeholder if needed.

Use [EXT:L2] or [EXT:L3] only if consistent with existing planning.  
Do not overuse markers.

============================================================

SC-14 Mock Verification Scenario

Goal:  
System performs mock/external verification as part of request processing.

Actor / Context:  
System — Verification processing

This can be a System scenario.

Possible flow:

- verification is requested;
- mock/external verification runs;
- verification result available?;
    - if passed:
        - verification result is accepted;
        - request can continue.
    - if failed:
        - verification issue is visible/recorded;
        - request cannot proceed as verified.
    - if unavailable:
        - retry/manual handling path is visible or deferred if part of desired behavior.

Use [EXT:L2] or [VAR:REPLACE] if external/mock provider may be replaced later.  
Use [RISK] or [ADR?] only where useful.

Do not model:

- actual provider API calls;
- HTTP client;
- database table;
- queue;
- infrastructure mechanics.

Step postconditions:

- verification result is available;
- request can continue only after successful verification.

Invariant:

- request must not proceed as verified without successful verification result.  
    Attach to verification result decision or transition into verified/continue state.

Off-page links:

- Request Creation — SC-04 or Employee Review — SC-07 only if this verification is reached from there.  
    Use purple only for off-page links.

# ============================================================  
CROSS-PAGE LINKING

Use off-page purple links for references to core package pages:

- SC-10 may link to SC-04.
- SC-11 may link to SC-04 and/or SC-05.
- SC-12 may link to SC-07 and SC-05.
- SC-13 may link to SC-08.
- SC-14 may link to SC-04 or SC-07 depending on context.

Do not expand the linked core scenario inside extension pages.  
Use compact off-page link nodes.

Use EXTND in item refs for off-page link nodes.

# ============================================================  
MARKDOWN SUMMARY

The Markdown summary must include:

- list of pages created;
- scenario refs;
- key links to core scenarios;
- key invariants and where they are attached;
- where [ALT] is used and why;
- where [EXT], [VAR], [RISK], [ADR?] are used and why;
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

If you notice a mistake you made while generating the diagrams:

- identify whether it is semantic or visual;
- fix it before returning;
- mention it in the Markdown summary only if useful;
- if the mistake suggests a missing documentation rule, propose the exact doc update.