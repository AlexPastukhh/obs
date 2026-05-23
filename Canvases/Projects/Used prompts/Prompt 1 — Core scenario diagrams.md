You are a diagram-generation agent for the Energy Management project.

Repository:
https://github.com/AlexPastukhh/enman/tree/my-changes

Branch:
my-changes

Task:
Generate the CORE scenario diagram package.

IMPORTANT:
The previous problem was that diagram agents generated diagrams in a light/default theme.
This is NOT acceptable for this project.

You MUST use the approved dark visual theme.

Do not use a light theme.
Do not use white background.
Do not use default draw.io light styles.
Do not silently switch to light theme.

If you cannot generate the diagram in the approved dark theme, stop and explain that instead of returning a light-themed diagram.

============================================================
READ FIRST
============================================================

Read these files before generating anything:

- planning/diagram-brief.md
- planning/diagram-scenario-spec.md
- planning/diagram-generation-rules-with-example.md
- planning/diagram-prompting-guide.md
- planning/diagram-common-mistakes.md
- planning/diagram-examples-index.md

Read the approved canonical visual/semantic example:

- planning/examples/scenario-login-correct-v3.md
- planning/examples/scenario-login-correct-v3.drawio
- planning/examples/scenario-login-correct-v3.svg
- planning/examples/scenario-login-correct-v3.png

Optional, only for high-level context:

- planning/scenario-to-implementation-workflow-v5-consolidated.md

If files conflict:

- scenario semantics are controlled by planning/diagram-scenario-spec.md;
- visual/draw.io construction is controlled by planning/diagram-generation-rules-with-example.md;
- prompt process is controlled by planning/diagram-prompting-guide.md;
- known anti-patterns are controlled by planning/diagram-common-mistakes.md;
- approved examples are indexed by planning/diagram-examples-index.md.

============================================================
APPROVED DARK THEME REQUIREMENT
============================================================

Use the dark visual style from:

- planning/examples/scenario-login-correct-v3.png
- planning/examples/scenario-login-correct-v3.svg
- planning/examples/scenario-login-correct-v3.drawio

The output must visually match that family:

- dark background;
- subtle dark grid/background texture if supported;
- high-contrast readable text;
- dark node bodies;
- semantic colored borders/fills;
- no white canvas;
- no pale default draw.io theme;
- no light-theme cards;
- no unreadable low-contrast text.

Default theme:

```text
Dark theme is mandatory.
Light theme is allowed only if explicitly requested by the user.
The user did not request light theme.

If your first generated output is light-themed, it is wrong even if the scenario logic is correct.

============================================================
OUTPUT

Create one draw.io-compatible file with multiple pages:

planning/diagrams/scenario-core-package.drawio

Create Markdown summary:

planning/diagrams/scenario-core-package.md

If possible, also create a preview image:

planning/diagrams/scenario-core-package-preview.png

or separate page previews if that is easier.

Do not create domain/aggregate/DB diagrams.
Do not create implementation diagrams.
Do not write code.
Do not create responsibility tables.
Do not create scenario-to-slice maps.

============================================================
PAGES TO CREATE

Create these pages:

00 Scenario Overview / Navigation Map
01 Guest Registration Scenario — SC-01
02 Login Scenario — SC-02
03 Password Recovery Scenario — SC-03
04 Client Request Creation Scenario — SC-04
05 Client Request Status / Result Scenario — SC-05
06 Employee Request Dashboard Scenario — SC-06
07 Employee Request Review Scenario — SC-07
08 Approval Result: Contract Draft + Email Notification — SC-08
09 Rejection Result Scenario — SC-09

Do not create pages 10–18 yet.

You may show pages 10–18 only as compact off-page/future placeholder links on the overview page if useful.

============================================================
VISUAL STYLE BASELINE

Use the approved canonical Login example as the visual quality reference.

The output should look like the same diagram family:

planning/examples/scenario-login-correct-v3.png
planning/examples/scenario-login-correct-v3.svg
planning/examples/scenario-login-correct-v3.drawio

Use this style:

Canvas/background:
- dark background;
- no white page background;
- no default light theme;
- optional subtle dark grid.

Text:
- high contrast;
- readable;
- no text overflow;
- no text touching borders too closely.

Shapes:
- dark filled cards/nodes;
- rounded corners;
- colored borders/fills by semantic role;
- enough padding.

Layout:
- spacious;
- main flow visually obvious;
- no dense diagrams;
- no connector web.
============================================================
COLOR RULES

Use the approved semantic palette:

Green  = current scenario flow / success path / normal in-page behavior
Red    = negative, invalid, error, rejection or failure branch shown on this page
Purple = off-page transition / subscenario link only
Blue   = decision node, compact end-state block, observable summary
Cyan   = include / mandatory supporting step
Yellow = invariant / rule / constraint
Olive  = precondition
Gray   = actor/screen/context, metadata, legend

Critical rule:

Purple does NOT mean actor choice in general.
Purple means the path leaves the current scenario page.

Examples:

Forgot password selected -> Password Recovery — SC-03

is purple because it opens another scenario page.

But a normal actor choice that continues inside the current scenario is NOT purple by default.
Color it according to its role in the current page.

Color = visual role.
Marker = planning meaning.
Connector label = semantic relationship.

============================================================
MARKER RULES

Use markers selectively but visibly.

Use [CORE] on key required main-flow nodes and key required branches.

Use [ALT] narrowly:
only when a normal/current path is not suitable and another path lets the actor achieve the same or equivalent goal.

Do not use [ALT] for normal errors.

Use [EXT] only as roadmap/scope marker.
Do not use EXT in item refs.

Use EXTND in item refs for off-page/subscenario branch items.

Good:

SC-02-EXTND-01
SC-04-EXTND-01

Bad:

SC-02-EXT-01
SC-04-EXT-01

Use [VAR:EXPAND], [VAR:MODIFY], [VAR:REPLACE], [RISK], [ADR?] only where they help planning.
Do not spam markers.

============================================================
SCENARIO DIAGRAM SEMANTICS

Each page must be a scenario/use-case flow diagram, not a text-card summary.

Main flow must be the visual backbone.

Use:

actor/screen/context;
scenario-level preconditions;
main flow nodes;
decision nodes;
required include nodes;
step-level postconditions;
compact scenario-level end states;
local invariants;
off-page/subscenario links where needed.

Do not create large standalone acceptance cards by default.
The diagram flow should express acceptance.

Semantic correctness is as important as visual correctness.

A visually clean diagram is still wrong if:

invariant is attached to the wrong step/state/transition;
branch type is mislabeled;
[ALT], [EXT], [VAR] are used incorrectly;
precondition duplicates a decision branch;
step postcondition is shown as scenario precondition;
off-page subscenario link is drawn as normal current-flow branch;
error branch is marked as [ALT] without reason.
============================================================
INVARIANT RULE

Invariant must be attached to the step, decision, transition or state where the rule is enforced.

Do not attach an invariant to a late consequence state if enforcement happened earlier.

Example:

Bad:

Remain unauthenticated
-> protected by
No session for invalid credentials

Correct:

Credentials valid?
-> protected by
Session is issued only for valid credentials

or:

Transition to Session is issued
-> protected by
Session is issued only for valid credentials
============================================================
LAYOUT RULES

Use lane discipline conceptually.
Do not draw visible lane guide lines by default.

Keep main flow clean.

Keep separate:

main/current flow;
success/result branch;
negative/error/rejection branch;
off-page/subscenario links;
invariants;
compact end-state summary.

Do not route secondary connectors across the main flow.

Secondary connectors must be short and local when possible:

include;
protected by;
opens subscenario;
condition for.

Do not draw long connectors from every final branch to the End states/Postconditions block.
Prefer no connector over a connector web.

Use a large canvas.
Do not make diagrams compact.
Readable whitespace is required.

============================================================
TEXT FIT RULE

Text must fit inside every shape.

No label, ref, marker, or body text may overflow outside the shape boundary.

If text does not fit:

increase the shape size;
reduce the text;
split the node;
move details to a note;
or use a larger canvas.

Never accept overflow as valid.

Before returning, inspect every shape.

Reject/revise if:

text escapes outside a shape;
text touches borders too closely;
refs/markers overlap body text;
connector labels overlap node text;
node is too small for its content.
============================================================
CONNECTOR RULES

Do not use generic "extend" connector labels.

Use intuitive labels:

starts
next
checks
if valid
if invalid
if missing
if selected
if available
continue
include
results in
protected by
opens subscenario
future branch

Every connector must mean something.

Do not draw decorative connectors.

Do not route connectors through shape bodies.
Do not route connectors through text.
Do not let connector labels overlap shapes or other labels.

============================================================
DO NOT INCLUDE IMPLEMENTATION DETAILS

Do not use:

controller;
endpoint;
handler;
repository;
DbContext;
EF mapping;
SQL table;
aggregate method;
command/query class;
React component/hook;
provider API;
outbox table;
database table;
background job implementation.

Observable outcomes are allowed:

account is saved;
session is issued;
applicant data is saved;
request is stored;
request status becomes Submitted / Approved / Rejected;
employee sees request in queue;
client sees result;
email notification is sent;
invalid input does not create saved data.

Keep outcomes user-facing or externally verifiable.

============================================================
SCENARIO-SPECIFIC GUIDANCE

SC-00 Scenario Overview / Navigation Map

Purpose:
Show navigation between scenario pages.

Include links:

Guest Registration — SC-01
Login — SC-02
Password Recovery — SC-03
Client Request Creation — SC-04
Client Request Status / Result — SC-05
Employee Request Dashboard — SC-06
Employee Request Review — SC-07
Approval Result — SC-08
Rejection Result — SC-09

Show high-level flow:

Guest registration -> login
login -> password recovery
client request creation -> request status/result
employee dashboard -> request review
review -> approval result / rejection result

Use purple only for off-page links.
Keep overview readable, not dense.

Optional compact future links:

Request Documents — SC-11 [EXT:L2]
Clarification — SC-12 [EXT:L2]
Reliable Notification Delivery — SC-16 [EXT:L3]

Do not expand future scenarios here.

SC-01 Guest Registration Scenario

Goal:
Guest registers an account.

Actor / Screen:
Guest — Registration screen

Scenario preconditions:

guest is not signed in;
registration screen is reachable.

Main flow:

open registration screen [CORE]
enter registration data [CORE]
submit registration [CORE]
<<include>> Validate registration form [CORE]
Registration data valid? [CORE]

Valid branch:

account is saved [CORE]
user can sign in or session may be issued [CORE?]

Invalid branch:

validation errors are visible [CORE]
account is not created [CORE]

Invariant:
Invalid registration data must not create an account.
Attach to Registration data valid? or transition into Account is saved.

Open question:
After registration, is session issued automatically or must user sign in?

Do not model password hashing, database, identity internals.

SC-02 Login Scenario

Use approved canonical example as reference.

Required semantic shape:

Scenario preconditions:

Guest is not signed in.
Login screen is reachable.

Main flow:

open login screen [CORE]
enter credentials [CORE]
submit sign-in [CORE]
<<include>> Validate login form [CORE]
Credentials valid? [CORE]

Valid branch:

session is issued [CORE]
redirect to requested app page [CORE]

Invalid branch:

show sign-in error [CORE]
remain unauthenticated [CORE]

Invariant:
Session is issued only for valid credentials.
Attach to Credentials valid? or transition into Session is issued.

Off-page:
Forgot password selected -> Password Recovery — SC-03
Use SC-02-EXTND-01.
Use purple because it leaves the current page.

Do not:

add "Credentials are valid" as precondition;
mark invalid credentials as [ALT];
mark forgot password as [ALT] by default;
use SC-02-EXT-01.

SC-03 Password Recovery Scenario

Goal:
Guest restores account access.

Actor / Screen:
Guest — Password recovery screen

Main flow:

open password recovery screen [CORE]
enter account email [CORE]
submit recovery request [CORE]
<<include>> Validate recovery form [CORE]
Recovery request acceptable? [CORE]

Valid/acceptable branch:

recovery instructions are sent or confirmation is shown [CORE]
guest can continue recovery [CORE]

Invalid/unacceptable branch:

neutral recovery message is shown [CORE]
account existence is not revealed [CORE]

Invariant:
Do not reveal account existence.
Attach to Recovery request acceptable? / account lookup eligibility decision.

Off-page:
Set new password subscenario may be shown as off-page if complex.

Do not model email provider internals.

SC-04 Client Request Creation Scenario

Use the accepted SC-04 proof-of-layout semantics if available.

Actor / Screen:
Client — Request creation screen

Scenario preconditions:

Client is signed in.
Request creation screen is reachable.

Main flow:

open request creation screen [CORE]
fill request details [CORE]
Applicant data available? [CORE][VAR:EXPAND]

Branch 1:
if available

reuse saved applicant data [CORE]
continue request creation [CORE]

Branch 2:
if missing

provide individual applicant data inline [ALT][VAR:EXPAND]
applicant data is saved [CORE]
continue request creation [CORE]

Then:

submit connection request [CORE]
<<include>> Validate request form [CORE]
Request valid? [CORE]

Valid branch:

request is stored [CORE]
request status becomes Submitted [CORE]
client sees Submitted status [CORE]

Invalid branch:

validation errors are visible [CORE]
request is not accepted / no request is created [CORE]

Invariant:
Invalid request is not accepted.
Attach to Request valid? or transition into Request is stored / Submitted.

Step-level postconditions:

applicant data is saved;
request is stored;
request status becomes Submitted.

Potential off-page:
Request Documents — SC-11 [EXT:L2], only as purple link if useful.

Use user-facing wording:
Provide individual applicant data

Do not use:
Create individual applicant profile

SC-05 Client Request Status / Result Scenario

Goal:
Client views request status or result.

Actor / Screen:
Client — Request status/result page

Scenario preconditions:

Client is signed in.
Client has a request to view.

Main flow:

open request status/result page [CORE]
select or view request [CORE]
current request status is shown [CORE]
Status/result type? [CORE]

Possible visible states:

Submitted;
Approved;
Rejected;
Needs clarification only if already in planning;
Draft only if relevant.

Submitted branch:

client sees submitted/in-review status.

Approved branch:

client sees approved result.
off-page link to Approval Result — SC-08 if result details are complex.

Rejected branch:

client sees rejected result.
off-page link to Rejection Result — SC-09 if result details are complex.

Invariant:
Client can see only requests/results available to them, if this is part of scenario semantics.
Attach to request selection/status visibility decision.

Do not model database reads.

SC-06 Employee Request Dashboard Scenario

Goal:
Employee finds submitted requests.

Actor / Screen:
Employee — Request dashboard

Scenario preconditions:

Employee is signed in.
Employee has access to request dashboard.

Main flow:

open employee dashboard [CORE]
submitted requests are visible [CORE]
employee filters/searches/selects request if useful [CORE]
employee opens request for review [CORE]
off-page link to Employee Request Review — SC-07

Invariant:
Employee only sees requests they are allowed to review, if in scope.
Attach to dashboard visibility/filtering decision.

Do not model database queries.

SC-07 Employee Request Review Scenario

Goal:
Employee reviews submitted request and approves or rejects it.

Actor / Screen:
Employee — Request review screen

Scenario preconditions:

Employee is signed in.
Employee has access to review.
Request is submitted and not final.

Main flow:

open submitted request [CORE]
review request details [CORE]
Review decision? [CORE][VAR:MODIFY]

Approve branch:

approve request [CORE]
request status becomes Approved [CORE]
review decision is recorded [CORE]
off-page link to Approval Result — SC-08 if complex.

Reject branch:

reject request [CORE]
request status becomes Rejected [CORE]
rejection result/reason is visible if required [CORE]
off-page link to Rejection Result — SC-09 if complex.

Invariant:
Final request cannot be reviewed again.
Attach to decision/finalization transition, not only to late status node.

Potential off-page:
Clarification — SC-12 [EXT:L2][VAR:MODIFY][ADR?], if relevant.

Do not model command handlers or persistence.

SC-08 Approval Result: Contract Draft + Email Notification

Goal:
After approval, client receives approval result and contract draft/notification behavior is visible.

Actor / Context:
Client / System — Approved request result

Main flow:

approval decision exists [CORE]
approved status/result is visible [CORE]
contract draft becomes available or is prepared [CORE or EXT:L2 depending on planning]
notification is sent [CORE or EXT:L2 depending on planning]
client can see approved result [CORE]

Keep high-level observable behavior.

Do not model:

notification provider;
outbox;
email API;
document generation internals;
database mechanics.

Potential invariant / rule:
Notification failure must not incorrectly change review decision.
Use [RISK][ADR?] only if useful.

Off-page:
Reliable Notification Delivery — SC-16 [EXT:L3], only as future purple link if useful.

SC-09 Rejection Result Scenario

Goal:
Client sees rejection result.

Actor / Context:
Client / System — Rejected request result

Main flow:

rejection decision exists [CORE]
rejected status/result is visible [CORE]
rejection reason is visible if required [CORE]
notification is sent if part of target behavior [CORE or EXT:L2]

Keep it user-facing.

Do not model:

email provider;
persistence tables;
handler logic.

Potential invariant:
Rejection result shown to client must correspond to recorded rejection decision.
Attach to decision/result visibility transition.

Off-page:
Reliable Notification Delivery — SC-16 [EXT:L3], only as future purple link if useful.

============================================================
OVERVIEW PAGE RULES

Page 00 should be a navigation map, not a dense mega-diagram.

Use compact nodes and off-page links.

Do not duplicate all scenario details on overview.

============================================================
MARKDOWN SUMMARY

The Markdown summary must include:

list of pages created;
scenario refs;
key off-page links;
key invariants and where they are attached;
where [ALT] is used and why;
where [EXT], [VAR], [RISK], [ADR?] are used and why;
open questions;
self-check results;
confirmation that dark theme was used.
============================================================
SELF-CHECK BEFORE RETURNING

Before returning, verify:

Dark theme:

dark background is used;
output does not use white/light canvas;
semantic colors are readable on dark background;
visual style matches scenario-login-correct-v3 family.

Semantic correctness:

preconditions do not duplicate decision branches;
invariants attach to enforcement points;
invalid/error branches are not [ALT] unless explicitly justified;
[ALT] is used narrowly;
[EXT] is not used in item refs;
EXTND is used for off-page/subscenario item refs;
step postconditions attach to producing steps;
scenario end states are compact;
no implementation details appear;
purple means off-page/subscenario only.

Visual correctness:

main flow is visually obvious;
diagrams are not text-card summaries;
no connector web;
no connector crosses shape bodies;
no secondary connectors cross main flow;
no text overflows outside shapes;
connector labels do not overlap nodes;
pages are spacious;
semantic colors match the approved palette.

If any generated page is light-themed, do not return it as final. Fix it first.