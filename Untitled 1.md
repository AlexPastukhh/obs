# AI File Observability — Discovery Draft Package

Status: working discovery package  
Doc version: v0.1.0  
Product name: provisional  
Package scope: Opportunity and Ecosystem Research, Product Legend, Core Value Scenarios, Supporting and Future Scenarios, Solution Overview

## Working Convention

This package is maintained by the same workflow used for scenario drafts.

The user provides:

- ideas;
- observations;
- corrections;
- doubts;
- research findings;
- answers;
- decisions.

AI:

- restructures the provided information according to the relevant draft contract;
- preserves uncertainty instead of filling gaps with invented requirements;
- identifies contradictions and missing information;
- adds important questions;
- adds critical remarks;
- keeps related ideas separate from accepted requirements;
- records user answers and decisions;
- returns the complete current package after each update unless the workflow is changed.

Questions, critical remarks, related ideas, user answers and decisions are parts of the planning artifacts. They are not temporary chat commentary.

## Current Draft Set

1. Opportunity and Ecosystem Research Draft
2. Product Legend Draft
3. Core Value Scenario Candidates Draft
4. Supporting and Future Scenario Candidates Draft
5. Solution Overview Draft

Full user scenarios are not defined in this package. They continue to use the separate scenario draft template.

---

# Opportunity And Ecosystem Research Draft

Status: working draft  
Doc version: v0.1.0

## Purpose

Determine whether the identified problem requires a new product, whether an existing workflow or product already solves it sufficiently, and whether the proposed solution should be built, integrated into an existing environment, implemented as an extension, or reduced to a smaller supporting tool.

This draft also evaluates whether the problem is likely to remain relevant as AI development tools, IDEs and repository workflows evolve.

The purpose is not to prove in advance that a new application must be built.

## Problem Under Consideration

In AI-driven development, important dependencies between files, planning artifacts and semantic objects are often implicit.

They may exist:

1. in the developer's memory;
2. as ordinary prose such as:
   - “see another file”;
   - “this method must match that contract”;
   - “this behavior comes from that scenario”;
3. inside a complex AI workflow that repeatedly asks AI to:
   - find sources;
   - read them;
   - find consumers;
   - determine impact;
   - update the correct places;
   - avoid missing anything.

This makes it difficult to verify quickly and unambiguously:

- whether AI found the correct source;
- whether AI used the current source version;
- whether AI found all relevant consumers;
- whether similarly named concepts were confused;
- which consumers were already reviewed after a source change;
- which consumers still rely on an older understanding;
- why a file or object is currently considered valid;
- what actions were previously performed.

The current product idea is to replace implicit dependencies with explicit, observable and reviewable references.

## Current Workflow

The current workflow is primarily file-based and AI-assisted.

A typical change requires some combination of:

1. remembering where relevant source information is stored;
2. searching repository files manually;
3. preparing a text prompt that explains which files AI must inspect;
4. asking AI to find dependencies and affected files;
5. reviewing whether AI selected the correct context;
6. applying generated changes;
7. inspecting Git diff;
8. manually checking whether dependent files also need updates;
9. retaining reasoning and decisions in chat or Markdown.

The workflow can already accomplish many desired tasks, but it becomes complicated because the same dependency discovery and verification work is repeated for each change.

There is no simple deterministic view showing:

- registered sources;
- registered consumers;
- source versions last reviewed;
- stale consumers;
- completed reviews;
- unresolved dependency impact;
- a complete activity history.

## Direct Existing Solutions

No direct existing solution has yet been validated as covering the complete proposed loop:

```text
register dependency
  → resolve source next to consumer
  → assemble AI context
  → change source
  → detect affected consumers
  → review impact
  → preserve review and activity history
```

The following are current research candidates rather than confirmed direct solutions.

### IDE and editor solutions

Candidate examples:

- Visual Studio Code;
- editor file explorers;
- editor extensions;
- AI coding assistants and agents inside editors.

Potentially reusable capabilities:

- file editing;
- repository navigation;
- tree views;
- file watchers;
- decorations;
- hover and inline UI;
- Git integration;
- extension APIs;
- AI workflows already occurring in the editor.

Unknown:

- whether an existing extension already provides explicit semantic references, source-version-aware stale signaling and dependency review for arbitrary planning/documentation objects.

### Version-control and review solutions

Candidate examples:

- Git;
- GitHub;
- pull request review;
- commit history;
- branch comparison;
- file and line diffs.

Potentially reusable capabilities:

- physical file versioning;
- change history;
- changed-file detection;
- line-level diff;
- branches and commits;
- review discussion.

Known limitation of the category for the current problem:

- file diffs do not automatically express the meaning of a dependency between semantic objects;
- they do not automatically identify all registered consumers that were reviewed against an earlier source version;
- ordinary Git review state is not the same as semantic dependency review state.

### Documentation and knowledge-management solutions

Candidate categories:

- Markdown documentation systems;
- wikis;
- note systems with backlinks;
- graph-based knowledge tools;
- documentation portals.

Potentially reusable capabilities:

- links;
- backlinks;
- navigation;
- embedded content;
- graph views;
- metadata.

Unknown:

- whether they support repository changes, source-version-aware invalidation, AI context assembly and impact review as one workflow.

### Static-analysis and dependency-analysis solutions

Candidate categories:

- code symbol reference tools;
- language servers;
- architecture dependency tools;
- build-system dependency graphs;
- schema and API contract validation.

Potentially reusable capabilities:

- deterministic relationships;
- symbol navigation;
- broken-reference detection;
- type-aware validation;
- affected-project calculation.

Known limitation of the category for the current problem:

- most such tools operate on specific programming languages or formal structures;
- the proposed system also targets planning files, documentation, scenarios, domain artifacts, decisions and other semi-structured objects.

### AI agent and repository-search solutions

Candidate categories:

- coding agents;
- repository-aware chat;
- automated context retrieval;
- retrieval-augmented AI workflows.

Potentially reusable capabilities:

- repository search;
- context selection;
- multi-file editing;
- summarization;
- diff generation.

Current concern:

- retrieval is often probabilistic;
- the developer may not have a simple deterministic way to confirm that every required source and consumer was found;
- the workflow may need complex prompts and repeated verification.

## Alternative Workflows

### Alternative A — Continue with prompt-only repository workflow

Description:

```text
Use Markdown conventions and detailed AI instructions.
Ask AI to search, inspect and update dependencies for every task.
```

Advantages:

- no new application;
- works with existing tools;
- highly flexible;
- low initial implementation cost.

Limitations:

- repeated prompt complexity;
- uncertain completeness;
- expensive manual verification;
- dependencies remain difficult to inspect globally;
- review status is not automatically preserved.

### Alternative B — Use Git and GitHub as the main observability system

Description:

```text
Use commits, branches, pull requests and diffs
to understand and review all changes.
```

Advantages:

- mature tooling;
- reliable physical history;
- strong review workflow;
- no custom version-control implementation required.

Limitations:

- semantic dependencies are not explicit by default;
- stale consumers are not automatically identified;
- source-purpose relationships remain outside ordinary diff;
- planning objects may not map cleanly to line changes.

### Alternative C — Use VS Code plus lightweight conventions or scripts

Description:

```text
Keep work inside the editor.
Add structured metadata, commands, scripts or a small extension.
```

Advantages:

- files and Git are already present;
- low context switching;
- lower UI implementation cost;
- can test the value without building a full standalone product.

Limitations:

- extension UI may constrain richer observability;
- long-term data model may become coupled to VS Code;
- a collection of scripts can become fragmented;
- unclear whether a small extension can support the complete workflow.

### Alternative D — Structured Markdown/JSON plus command-line tools

Description:

```text
Store stable IDs and references in structured files or sidecars.
Use CLI commands to resolve sources, detect stale references and build AI context.
```

Advantages:

- small implementation surface;
- deterministic and scriptable;
- easy to automate;
- reusable without a large UI.

Limitations:

- weaker visual observability;
- review workflow may be cumbersome;
- difficult to inspect large dependency graphs;
- user may still need several tools.

### Alternative E — Use an existing knowledge-graph or documentation product

Description:

```text
Represent files and semantic objects in an existing linked-document system.
```

Advantages:

- backlinks and graph UI may already exist;
- reduced application development.

Limitations:

- repository and Git integration may be weak;
- file source of truth may become duplicated;
- stale signaling and AI task context may require substantial customization.

## Adjacent Solutions

The following adjacent areas may provide reusable concepts or integrations:

### Editors and IDEs

Relevant capabilities:

- file editing;
- symbol navigation;
- file watching;
- extension platforms;
- source-control UI;
- diagnostics and decorations.

### Git and repository hosting

Relevant capabilities:

- immutable commit history;
- branch experiments;
- change sets;
- review discussion;
- diff display;
- repository links.

### Language servers and static analysis

Relevant concepts:

- stable symbol identity;
- go-to-definition;
- find references;
- diagnostics;
- dependency graphs;
- invalidation after source changes.

### Knowledge graphs and linked documentation

Relevant concepts:

- explicit links;
- reverse links;
- transclusion;
- graph navigation;
- source metadata.

### Build systems and incremental computation

Relevant concepts:

- dependency invalidation;
- changed-input detection;
- affected-output calculation;
- cached results;
- stale state.

### Issue, decision and review systems

Relevant concepts:

- state transitions;
- blocking items;
- decision records;
- review ownership;
- audit trails.

### AI orchestration systems

Relevant concepts:

- context assembly;
- allowed and prohibited actions;
- source requirements;
- structured tool input;
- proposal review;
- change provenance.

## Integration Opportunities

Current integration opportunities include:

### Visual Studio Code extension

Potential use:

- repository tree decorations;
- custom semantic tree;
- source hover or inline expansion;
- copy-for-AI command;
- stale dependency diagnostics;
- review commands;
- Git integration.

### Git and GitHub integration

Potential use:

- file diffs;
- commit and branch identity;
- links to pull requests;
- attaching semantic impact records to physical changes;
- comparing planned and actual changed files.

### CLI or local service

Potential use:

- indexing;
- reference resolution;
- stale calculation;
- JSON validation;
- context-bundle generation;
- scripts and CI checks.

### Standalone application

Potential use:

- rich dependency graph;
- cross-layer explorer;
- detailed impact review;
- activity timeline;
- variant comparison;
- structured planning editor.

### Existing documentation or graph tool

Potential use:

- visualization and backlinks;
- embedded resolved sources;
- reuse of an existing document browser.

No integration option is currently selected.

## Build / Integrate / Extend Options

### Option A — Standalone application

Build a dedicated local application that reads a repository and owns the complete observability interface.

Current appeal:

- maximum control over dependency, review and change visualization;
- easier to create a coherent specialized workflow.

Current concerns:

- may duplicate file explorer, editor and Git capabilities;
- larger initial UI scope;
- repository editing and integration must be implemented or delegated.

### Option B — Visual Studio Code extension

Build the first product directly inside VS Code.

Current appeal:

- user already works with repository files there;
- file editor and Git features are already available;
- lower context switching;
- useful extension APIs may reduce implementation scope.

Current concerns:

- UI and persistence constraints;
- dependence on one editor;
- difficult rich cross-project visualization;
- unclear long-term suitability.

### Option C — Shared core plus one or more clients

Build a narrow reusable core for:

- object identity;
- references;
- source resolution;
- stale calculation;
- dependency review;
- logs;
- context bundles.

Use one initial client, possibly a VS Code extension or standalone UI.

Current appeal:

- fundamental rules remain independent from UI;
- alternative clients can be tested later;
- core behavior can be tested without interface code.

Current concerns:

- requires early boundary design;
- higher initial architecture cost;
- risk of designing an overly generic framework before the first workflow is proven.

### Option D — Scripts / CLI first

Implement the closed dependency loop as commands and structured files.

Current appeal:

- fastest technical validation;
- narrow scope;
- useful for automation and tests.

Current concerns:

- may not validate visual observability;
- manual use may be inconvenient;
- later UI integration may require model changes.

### Option E — Extend an existing product

Implement the solution as a plugin or integration for an existing editor, documentation system or graph tool.

Current appeal:

- reuse of mature navigation and storage capabilities;
- reduced implementation effort if extension points are sufficient.

Current concerns:

- product boundaries may not match the proposed workflow;
- critical behavior may be impossible or fragile;
- dependence on external product decisions.

## Future Relevance

### Conditions supporting future relevance

The solution is more likely to remain useful if:

- AI continues to make multi-file repository changes;
- developers still need to review AI-generated results;
- important context remains distributed across files;
- repositories continue to mix code, contracts, planning and documentation;
- AI retrieval remains probabilistic;
- existing tools continue to show file diffs without semantic review state;
- teams need auditable explanations of why a file or object is considered current.

### Conditions reducing future relevance

The solution may become less valuable if:

- IDEs natively provide explicit semantic references across arbitrary repository artifacts;
- AI agents reliably discover all relevant dependencies and expose proof of completeness;
- repository platforms add source-version-aware semantic impact tracking;
- standardized structured planning formats make the custom layer unnecessary;
- the overhead of registering references is greater than the review benefit.

### Future-relevance uncertainty

Future relevance cannot be established only through conceptual analysis.

It needs:

- periodic ecosystem review;
- real workflow trials;
- comparison with improving AI agents and IDE tooling;
- evidence that explicit references prevent meaningful errors or reduce review cost.

## Assumptions

| ID | Assumption | Current confidence | Invalidation signal | Status |
|---|---|---|---|---|
| OR-A01 | AI-driven repository work will continue to involve multi-file context. | medium | AI workflows become reliably self-contained or repository-wide by default. | unverified |
| OR-A02 | Developers will still need observable review of AI changes. | high | AI changes become sufficiently trusted without human review. | unverified |
| OR-A03 | Explicit registered dependencies can provide useful guarantees even if they cannot represent every real dependency. | medium | Registration overhead exceeds benefit or users cannot maintain references. | unverified |
| OR-A04 | Existing general-purpose tools do not yet cover the complete proposed loop sufficiently. | low | Research identifies an existing adequate product or workflow. | unverified |
| OR-A05 | Source expansion and context assembly will reduce AI context mistakes. | medium | Real tasks show no improvement over repository search. | unverified |
| OR-A06 | Stale-consumer signaling will improve review completeness. | medium | Signals are too noisy or do not correspond to meaningful impact. | unverified |
| OR-A07 | Planning and documentation objects need observability similar to code symbols. | medium | Real use remains limited to formal code dependencies. | unverified |

## Simple Research References

No validated research list has been completed yet.

Initial references or products to investigate:

- Visual Studio Code and its extension capabilities;
- Git;
- GitHub pull request and code-review workflow;
- AI coding assistants and repository-aware agents;
- documentation systems with backlinks or transclusion;
- knowledge-graph tools;
- language-server “find references” and diagnostics concepts;
- build-system dependency invalidation;
- architecture dependency and static-analysis tools.

This section intentionally remains a simple list. It does not currently use source versions, source hashes, dependency cascades or a separate source register.

## Current Conclusion

The problem appears coherent enough to justify further investigation and a limited prototype.

The strongest current value proposition is not another file editor or another generic diff interface.

It is the closed observable dependency loop:

```text
explicit source reference
  → source available beside consumer
  → verified AI context assembly
  → source change detection
  → affected-consumer signaling
  → explicit impact review
  → recorded history
```

There is not enough evidence to choose:

- standalone application;
- VS Code extension;
- shared core plus client;
- scripts/CLI;
- integration with another product.

Before detailed production planning, research and prototypes should test:

1. whether stable semantic references are practical;
2. whether the workflow is useful in real AI-driven changes;
3. whether VS Code provides a sufficient first interface;
4. whether a narrow shared core is justified.

## Questions

| ID | Question | Priority | Blocking | Status |
|---|---|---:|---:|---|
| OR-Q01 | Which existing products provide the closest complete workflow? | high | yes | open |
| OR-Q02 | Is explicit dependency registration acceptable during real work? | high | yes | open |
| OR-Q03 | Which user segment experiences the problem most strongly? | high | yes | open |
| OR-Q04 | Is the first useful solution better as a VS Code extension, standalone tool, CLI or hybrid? | high | yes | open |
| OR-Q05 | What exact capability is missing from GitHub review? | high | no | open |
| OR-Q06 | Which adjacent product can be extended instead of building a new application? | high | no | open |
| OR-Q07 | What would make the solution obsolete within two or three years? | medium | no | open |
| OR-Q08 | What amount of manual reference maintenance is acceptable? | high | yes | open |
| OR-Q09 | Is the initial market only the developer's personal workflow or a wider team workflow? | high | no | open |
| OR-Q10 | Does the first research phase require real product trials or only documentation review? | medium | no | open |

## Critical Remarks

### OR-CR01 — The direct-solution research is currently conceptual

No systematic product comparison has yet been completed. The claim that a new product is needed remains provisional.

### OR-CR02 — Explicit references create their own maintenance cost

The product solves hidden dependencies by requiring visible registered dependencies. If registration is difficult, users may stop maintaining the graph.

### OR-CR03 — The problem may be partly solved by a workflow rather than a product

A structured Markdown convention plus a small CLI or editor extension may provide most of the value.

### OR-CR04 — General AI observability can become too broad

The current idea should not expand immediately into monitoring every AI action, every code dependency and every project artifact.

### OR-CR05 — Existing code intelligence should not be rebuilt unnecessarily

Language servers and static-analysis tools already handle many formal code references. The product should focus on gaps or integrate their results.

## Related Ideas

- Compare the same real repository task across prompt-only, VS Code-assisted and prototype workflows.
- Build a feature matrix of candidate products.
- Treat the reference graph as a repository overlay rather than a replacement for files.
- Start with planning and Markdown objects, then evaluate code-symbol integration.
- Use Git for physical history and the application for semantic review state.
- Create a periodic ecosystem review artifact.
- Define a maximum acceptable cost for registering one dependency.

## User Answers

```text
- The main direction is now a fundamental AI file-observability application.
- The application should track file changes, logs and dependencies inside files.
- Dependencies should be insertable and inspectable without searching other files.
- Changed sources should cause dependent files or objects to be marked for review.
- Ordinary Git/GitHub diff may remain useful and should not be rebuilt without reason.
- Direct research references should remain a simple list in this draft.
```

## Decisions

```text
- No architecture or client option is selected.
- The opportunity is considered worth researching and prototyping.
- The differentiating value is semantic dependency observability,
  not generic file editing or generic diff rendering.
```

---

# Product Legend Draft

Status: working draft  
Doc version: v0.1.0

## Primary User

Current primary-user candidate:

```text
A developer or software planner who uses AI
to understand, plan and change a repository
containing multiple related files and artifacts.
```

Likely characteristics:

- works with AI chat, coding assistant or agent;
- changes several related files over time;
- uses planning, documentation, contracts and code;
- needs to understand why files depend on other files;
- personally reviews AI-generated work;
- wants deterministic evidence that registered sources and consumers were considered.

The primary user segment is not yet validated.

Possible later users:

- small development teams;
- technical leads;
- architecture reviewers;
- maintainers of large documentation or planning repositories.

## Main Problem

Important dependencies between repository artifacts are frequently implicit.

When a source behavior, contract, domain rule, API description or other semantic object changes, it is difficult to know:

- where it is used;
- which consumers were reviewed against the old version;
- what source information AI used;
- whether all affected places were found;
- whether the resulting repository state is still coherent.

## Current Situation

Dependencies are currently represented through a mixture of:

- developer memory;
- ordinary prose references;
- file paths;
- naming conventions;
- AI repository search;
- prompt instructions;
- Git diff;
- manual review.

AI can often find and update the relevant files, but its search and interpretation are not sufficiently visible or deterministic for the user to trust without additional checking.

The user may need to repeat a complicated workflow for every meaningful change.

## Why The Current Workflow Is Insufficient

The current workflow is insufficient when the user needs guarantees about registered dependencies and review state.

It does not provide one clear place to see:

- all explicit dependencies of the current object;
- all consumers of the current source;
- source purpose;
- source version last reviewed;
- stale dependencies;
- broken dependencies;
- unresolved review work;
- context actually prepared for AI;
- actions performed after the change.

The workflow can work, but it becomes difficult to scale and difficult to audit.

## Existing Alternatives And Their Limitations

### Manual file search

Useful for:

- small repositories;
- infrequent changes;
- experienced developers who remember the structure.

Limitation:

- repeated effort;
- easy to miss indirect or forgotten consumers;
- no persistent review state.

### AI repository search

Useful for:

- quickly discovering possible context;
- summarizing many files;
- proposing multi-file updates.

Limitation:

- probabilistic retrieval;
- uncertain completeness;
- difficult to verify exactly what was considered;
- similar names or concepts may be confused.

### Markdown links and ordinary references

Useful for:

- basic navigation;
- explaining relationships.

Limitation:

- usually no typed meaning;
- no reviewed source version;
- no automatic stale signaling;
- no dependency-review lifecycle.

### Git and GitHub review

Useful for:

- physical history;
- changed-file and line diff;
- branch and pull-request review.

Limitation:

- semantic relation between source and consumer is not explicit by default;
- a file can remain unchanged while still requiring conceptual review;
- ordinary code review does not preserve source-specific dependency review.

### Language servers and static analysis

Useful for:

- formal code symbols;
- type-aware references;
- compiler and analyzer diagnostics.

Limitation:

- limited coverage of scenarios, planning, prose contracts, decisions and mixed documentation;
- not designed as an AI context and review workflow.

## Proposed Fundamental Change

Replace implicit semantic dependencies with explicit, addressable and observable references.

For every registered dependency, the system should be able to know:

- source identity;
- consumer identity;
- relationship type or purpose;
- source version last reviewed;
- current source version;
- dependency state;
- review state.

The user should be able to resolve and inspect source content near the consumer without manually searching another file.

When a source changes, the system should identify registered consumers and mark them for review.

The system should also assemble selected sources into clear AI context and record important actions.

## Core Value Loop

```text
1. Register a source-consumer dependency.

2. Inspect the source beside the consumer.

3. Assemble the consumer and resolved sources for AI.

4. AI or the user changes repository files.

5. Detect that a registered source changed.

6. Mark consumers reviewed against an older source version as stale.

7. Review each affected consumer.

8. Record the result and activity history.
```

The product's fundamental closed-loop guarantee is currently expressed as:

> A registered consumer must not remain silently marked current after its registered source changes.

This guarantee does not claim that every real-world dependency was registered.

## Expected Value

Expected value for the user:

- less repeated repository searching;
- clearer AI context;
- easier verification of source selection;
- reduced risk of forgetting known consumers;
- visible review backlog after source changes;
- faster understanding of why an object depends on another;
- auditable history of changes and reviews;
- easier gradual modification of shared behavior and contracts.

Expected system-level value:

- deterministic identity around otherwise text-heavy artifacts;
- explicit connection between planning, implementation and review;
- a reusable observability layer above files and Git.

## Why The Idea Is Worth Testing

The idea is worth testing because it targets a recurring weakness of AI-driven repository work:

```text
AI can perform broad semantic work,
but the developer still needs a clear, checkable model
of required sources, affected consumers and review completion.
```

The idea can be tested with a narrow closed-loop prototype without committing to a full application architecture.

A successful prototype would show whether explicit references and stale signaling improve real work enough to justify the maintenance overhead.

## Major Assumptions

| ID | Assumption | Current confidence | Status |
|---|---|---|---|
| PL-A01 | Users can identify meaningful semantic objects inside files. | medium | unverified |
| PL-A02 | Stable object identity can survive normal file edits sufficiently well. | low | unverified |
| PL-A03 | Users will register important dependencies if the workflow is simple. | medium | unverified |
| PL-A04 | Resolved sources improve AI work compared with repository search alone. | medium | unverified |
| PL-A05 | Stale signaling is actionable rather than noisy. | medium | unverified |
| PL-A06 | Git can remain the physical versioning layer while the product owns semantic observability. | high | unverified |
| PL-A07 | Planning and documentation dependencies are important enough to justify dedicated tooling. | medium | unverified |
| PL-A08 | A narrow base can prove value before supporting arbitrary file types. | high | unverified |

## Major Risks

### PL-R01 — Registration overhead

Users may consider explicit dependency creation slower than occasional manual search.

### PL-R02 — False confidence

Users may incorrectly assume the registered graph contains every real dependency.

### PL-R03 — Unstable object identity

References may break when text is moved, split, renamed or rewritten.

### PL-R04 — Excessive stale signals

Minor source changes may mark too many consumers and create alert fatigue.

### PL-R05 — Product scope expansion

The product could expand into:

- full IDE;
- full documentation platform;
- full project planner;
- full Git client;
- full AI agent platform.

That would hide the core value and increase implementation cost.

### PL-R06 — Existing products catch up

VS Code, GitHub or AI agents may introduce similar dependency and review capabilities.

### PL-R07 — Architecture chosen too early

Selecting standalone, extension or shared core before prototype evidence may create unnecessary constraints.

### PL-R08 — AI-generated summaries treated as facts

Human-readable summaries may be useful but must not replace deterministic reference and review data.

## Non-Goals

The current product does not aim to:

- replace Git;
- replace GitHub pull-request review;
- replace a code editor;
- guarantee discovery of unregistered dependencies;
- guarantee that AI understood a provided source;
- automatically rewrite every consumer after a source change;
- infer all semantic objects perfectly from arbitrary files;
- support every file format in the first version;
- become a general project-management suite;
- select the final application architecture before prototyping;
- treat AI-generated explanations as the source of truth.

## Success Signals

### Core mechanism signals

- a user can register a dependency without excessive effort;
- a user can inspect the source beside the consumer;
- a user can assemble AI context without manually searching the source file;
- a changed source reliably marks registered consumers stale;
- the user can review and clear the impact explicitly;
- the activity history explains why the current state exists.

### Workflow-value signals

- fewer manual repository searches during selected tasks;
- fewer missed known consumers;
- less time spent explaining source locations to AI;
- increased confidence that registered dependencies were reviewed;
- users choose to keep using references after the prototype trial.

### Product-boundary signals

- the workflow adds value beyond existing VS Code and GitHub views;
- the first client can reuse existing editing and Git capabilities;
- the core loop can remain narrow enough to implement and understand.

No numeric thresholds have yet been accepted.

## Candidate Core Value Scenarios

Only short candidates are kept here. Full scenarios belong to the separate scenario draft package.

| Candidate ID | Candidate | Related scenario draft |
|---|---|---|
| CVS-01 | Register an explicit dependency between a consumer and source. | `SC-08 — Create And Inspect Explicit Dependency Reference` |
| CVS-02 | Inspect the current source beside the consumer without manual file search. | `SC-08 — Create And Inspect Explicit Dependency Reference` |
| CVS-03 | Copy an artifact with resolved sources for use in AI. | `SC-09 — Copy Artifact With Resolved Sources For AI` |
| CVS-04 | Detect a registered source change and mark consumers stale. | `SC-10 — Detect Source Changes And Mark Dependents Stale` |
| CVS-05 | Review a consumer affected by a source change. | `SC-11 — Review Affected Dependency` |
| CVS-06 | Understand the history of source changes, AI actions and dependency reviews. | `SC-12 — View Activity And Change Log` |
| CVS-07 | Inspect physical repository diff together with semantic impact. | `SC-13 — Inspect Repository Diff And Semantic Impact` |

`CVS-07` may be supporting rather than core. Its classification remains open.

## Questions

| ID | Question | Priority | Blocking | Status |
|---|---|---:|---:|---|
| PL-Q01 | Who is the first validated primary user? | high | yes | open |
| PL-Q02 | What is the smallest useful semantic object supported in the base? | high | yes | open |
| PL-Q03 | How is a dependency registered during normal work? | high | yes | open |
| PL-Q04 | What exact guarantee can the product communicate without causing false confidence? | high | yes | open |
| PL-Q05 | Is activity logging core value or supporting observability? | medium | no | open |
| PL-Q06 | Is semantic diff required for the first value proof? | high | no | open |
| PL-Q07 | What numeric or qualitative success criteria will justify continued development? | high | yes | open |
| PL-Q08 | Which candidate scenario is the strongest first prototype entry point? | high | no | open |
| PL-Q09 | Does the product initially support only explicitly structured planning files? | high | yes | open |
| PL-Q10 | Is `AI File Observability` an adequate provisional product name? | low | no | open |

## Critical Remarks

### PL-CR01 — The legend is currently developer-centric

The problem is well described for a personal AI workflow, but team collaboration and organizational use are not validated.

### PL-CR02 — The core value depends on graph quality

The system is useful only when important dependencies are registered and identities remain stable.

### PL-CR03 — The application may be a feature, not a standalone product

The complete value may fit better inside an editor or repository tool.

### PL-CR04 — Logging should support decisions, not become surveillance or noise

The product should record meaningful domain events rather than every UI action.

### PL-CR05 — Candidate scenarios need real-task validation

A coherent scenario on paper does not prove that the workflow is faster or safer.

## Related Ideas

- Show why each dependency exists, not only where it points.
- Let AI propose references, but require explicit confirmation.
- Separate required, informational and experimental references.
- Show a source's reverse references.
- Preserve the AI context bundle used for a change.
- Compare planned affected files with actual Git diff.
- Allow base planning scenarios to be one supported semantic-object category.
- Reuse language-server references when available instead of duplicating them.

## User Answers

```text
- The main user works with files through an AI-driven workflow.
- The core problem is hidden and difficult-to-review dependencies.
- The proposed change is explicit observable dependencies.
- The system must signal which files or objects require re-review.
- Important actions should be logged.
- Full scenarios remain in separate scenario drafts.
```

## Decisions

```text
- The Product Legend is a distinct planning artifact.
- Candidate core value scenarios remain short in this file.
- No architecture is selected.
- The current fundamental value loop centers on explicit dependencies,
  resolved AI context, stale signaling and review history.
```

---

# Core Value Scenario Candidates Draft

Status: working draft  
Doc version: v0.1.0

## Purpose

Identify the short scenario candidates that directly demonstrate why the product should exist.

This draft is not a replacement for full scenario specifications.

A candidate belongs here only when completing it would test the fundamental product value described in the Product Legend.

## Candidate Selection Rule

A candidate is a core value scenario when it directly contributes to the closed loop:

```text
register dependency
  → resolve source
  → use context
  → detect source change
  → identify affected consumers
  → review impact
  → preserve history
```

A scenario that only enables navigation, configuration or editing is supporting unless it independently proves product value.

## Core Value Scenario Candidates

### CVS-01 — Register Explicit Dependency

Short description:

```text
The user marks that a consumer object depends on a specific source object,
records the meaning of the relationship,
and the system preserves the explicit reference.
```

Value being tested:

- important dependencies can be made explicit;
- the relationship is more useful than an ordinary file path or prose mention.

Full draft reference:

- `SC-08 — Create And Inspect Explicit Dependency Reference`

### CVS-02 — Inspect Source Beside Consumer

Short description:

```text
The user opens a consumer and expands its source content
without manually searching or navigating another file.
```

Value being tested:

- source context becomes immediately inspectable;
- explicit references reduce repository-search effort;
- the user can confirm exactly which source is being used.

Full draft reference:

- `SC-08 — Create And Inspect Explicit Dependency Reference`

### CVS-03 — Assemble Context For AI

Short description:

```text
The user copies or sends a consumer together with selected resolved sources,
source identities, relationship explanations and constraints.
```

Value being tested:

- AI context can be prepared deterministically;
- the user can inspect the context before AI uses it;
- complex repeated prompt instructions can be reduced.

Full draft reference:

- `SC-09 — Copy Artifact With Resolved Sources For AI`

### CVS-04 — Detect Source Change And Mark Consumers Stale

Short description:

```text
A registered source changes.
The system identifies registered consumers reviewed against an older source state
and marks them as requiring review.
```

Value being tested:

- known impact is not lost;
- the user does not need a repeated search to discover registered consumers;
- current and stale relationships are distinguishable.

Full draft reference:

- `SC-10 — Detect Source Changes And Mark Dependents Stale`

### CVS-05 — Review Dependency Impact

Short description:

```text
The user inspects the changed source and affected consumer together,
then records whether the consumer remains valid,
requires an update, was updated or is deferred.
```

Value being tested:

- stale signaling leads to an actionable workflow;
- review completion becomes explicit;
- the system records which source state was reviewed.

Full draft reference:

- `SC-11 — Review Affected Dependency`

### CVS-06 — Trace Change And Review History

Short description:

```text
The user sees why a dependency is current or stale,
which source changed,
which AI or user action occurred,
and which review resolved the impact.
```

Value being tested:

- observability persists after the immediate task;
- current state can be explained;
- AI-driven changes remain auditable.

Full draft reference:

- `SC-12 — View Activity And Change Log`

### CVS-07 — Inspect Semantic Impact Of Repository Diff

Short description:

```text
The user views physical file changes
together with known changed objects and dependency impact.
```

Value being tested:

- semantic observability adds value beyond ordinary diff;
- Git and the dependency model can be connected.

Full draft reference:

- `SC-13 — Inspect Repository Diff And Semantic Impact`

Current classification:

```text
candidate core or supporting;
requires validation.
```

## Candidate Core Loop

The current primary end-to-end candidate is:

```text
CVS-01 Register dependency
  → CVS-02 Inspect source
  → CVS-03 Assemble AI context
  → repository/source change
  → CVS-04 Mark consumers stale
  → CVS-05 Review impact
  → CVS-06 Trace history
```

## Questions

| ID | Question | Priority | Blocking | Status |
|---|---|---:|---:|---|
| CVS-Q01 | Can the loop be tested with only two Markdown files and one dependency? | high | no | open |
| CVS-Q02 | Is context assembly required to prove the dependency value, or can it be a second prototype? | high | no | open |
| CVS-Q03 | Is the activity log part of the first closed loop or added after stale review works? | medium | no | open |
| CVS-Q04 | Does semantic diff belong to core value or later observability? | high | no | open |
| CVS-Q05 | Is source expansion a separate scenario or a branch of dependency inspection? | medium | no | open |
| CVS-Q06 | Which candidate should be used as the first vertical prototype? | high | yes | open |
| CVS-Q07 | What evidence would reject each candidate as insufficiently useful? | high | yes | open |

## Critical Remarks

### CVS-CR01 — The candidates are currently derived from one person's workflow

They require validation through realistic tasks.

### CVS-CR02 — Too many “core” scenarios weaken the concept

The base should likely prove one end-to-end loop rather than implement every observability feature.

### CVS-CR03 — Context assembly and semantic diff may be separable

The dependency-review loop may provide value before custom AI-context or diff interfaces are complete.

## Related Ideas

- Define one `core-loop prototype scenario` that references several scenario drafts.
- Measure manual searches and missed consumers before and after the prototype.
- Use a real planning artifact, domain rule and implementation file in the trial.
- Treat logs as automatic evidence generated by the other scenarios.

## User Answers

```text
- Core value scenarios are the scenarios that explain why the product is needed.
- They should be derived from the Product Legend.
- Full versions must remain in the separate scenario draft system.
```

## Decisions

```text
- Candidate scenarios remain short and reference full scenario drafts.
- The dependency-change-review loop is the current core value candidate.
```

---

# Supporting And Future Scenario Candidates Draft

Status: working draft  
Doc version: v0.1.0

## Purpose

Identify scenario candidates that support the core value loop or define possible future expansion without prematurely turning every idea into a full accepted scenario.

This draft helps preserve product boundaries.

## Classification

### Supporting

Required to operate or access the core value scenarios, but not independently the main reason to build the product.

### Future

Potentially valuable after the core loop is validated.

### Experimental

A scenario used to test an uncertain direction and not yet accepted into the intended product.

## Supporting Scenario Candidates

### SCS-01 — Create Repository-Backed Workspace

Short description:

```text
The user creates a workspace connected to a repository
and saves its basic metadata.
```

Related full draft:

- `SC-01 — Create Planning Workspace`
- `SC-06 — Open Repository-Backed Observable Workspace`

### SCS-02 — Choose Existing Workspace

Short description:

```text
The user opens a previously created workspace
without losing saved references, reviews or versions.
```

Related full draft:

- `SC-01B — Choose Existing Planning Workspace`

### SCS-03 — Browse Physical Files And Logical Objects

Short description:

```text
The user moves between the repository tree
and logical views of semantic objects.
```

Related full draft:

- `SC-07 — Browse Physical Files And Logical Objects`

### SCS-04 — View Dependency And Review Counts

Short description:

```text
The user sees stale, broken and unreviewed counts
on relevant objects, files, folders or layers.
```

Related full draft:

- likely part of `SC-07`, `SC-10` and later UI-specific scenarios.

### SCS-05 — Preserve Intermediate Artifact Versions

Short description:

```text
The user saves and reopens intermediate scenario,
domain, slice or dependency-model states.
```

Related full draft:

- `SC-03 — Save And Reopen Intermediate Draft Versions`

### SCS-06 — Navigate Planning Layers

Short description:

```text
The user opens Scenario, Domain or Slice views
inside the workspace.
```

Related full draft:

- `SC-01C — Choose Planning Layer`

### SCS-07 — Draft Structured Planning Artifacts

Short description:

```text
The user creates structured scenario drafts manually or with AI
and stores questions, criticism, ideas and decisions.
```

Related full draft:

- `SC-02 — Draft A User Scenario`

Current relevance:

- important use case;
- not necessarily the fundamental file-observability core.

### SCS-08 — Define Base Scope

Short description:

```text
The user marks scenarios or scenario parts
as base, later or experimental.
```

Related full draft:

- `SC-04 — Define Base Scope And Later Extensions`

### SCS-09 — Create Planning Variant

Short description:

```text
The user preserves alternative scenario, domain or slice variants
without overwriting the current direction.
```

Related full draft:

- `SC-05 — Create And Compare Planning Variants`

## Future Scenario Candidates

### FCS-01 — AI Proposes Dependencies

```text
AI identifies possible source-consumer relationships,
and the user confirms or rejects them.
```

Risk:

- suggestions may create false confidence;
- accepted references must remain explicit.

### FCS-02 — Import Formal Code References

```text
The system imports language-server or static-analysis references
instead of duplicating formal code intelligence.
```

### FCS-03 — Support API, Database And Architecture Objects

```text
The system supports explicit objects such as:
API contracts;
database constraints;
domain methods;
architecture decisions;
test contracts.
```

### FCS-04 — Compare Planning Branches

```text
The user compares alternative dependency graphs,
planning artifacts and implementation variants.
```

### FCS-05 — Team Review And Collaboration

```text
Several users assign, perform and approve dependency reviews.
```

### FCS-06 — CI Validation

```text
A command or CI job detects broken references,
unreviewed required dependencies or invalid structured artifacts.
```

### FCS-07 — Cross-Repository Dependencies

```text
A consumer references a source in another repository
with explicit version and availability state.
```

### FCS-08 — Automatic Context Delivery To Agent

```text
An integrated agent receives the resolved context bundle
without manual copy and paste.
```

### FCS-09 — AI Impact Explanation

```text
AI explains likely semantic impact of a source change
while deterministic stale state remains authoritative.
```

### FCS-10 — Rich Dependency Graph Visualization

```text
The user explores large dependency structures,
change propagation and review progress visually.
```

## Experimental Scenario Candidates

### ECS-01 — VS Code-Native Workflow

```text
The complete dependency loop is performed inside a VS Code extension.
```

### ECS-02 — Standalone Workspace Workflow

```text
The complete dependency loop is performed in a dedicated application.
```

### ECS-03 — CLI-Only Closed Loop

```text
The dependency loop is proven through structured files and commands
before building a rich client.
```

These are solution experiments, not accepted product scenarios.

## Questions

| ID | Question | Priority | Blocking | Status |
|---|---|---:|---:|---|
| SF-Q01 | Which supporting scenarios are required for the first vertical prototype? | high | yes | open |
| SF-Q02 | Are structured scenario drafts part of the base product or only the first use case? | high | no | open |
| SF-Q03 | Should planning variants exist before the core dependency loop is validated? | medium | no | open |
| SF-Q04 | Is Git diff inspection supporting or core? | high | no | open |
| SF-Q05 | Which future scenario has the highest integration risk? | medium | no | open |
| SF-Q06 | Is team collaboration explicitly out of scope for the first product stage? | high | no | open |
| SF-Q07 | Should the first implementation support custom object types? | high | yes | open |

## Critical Remarks

### SF-CR01 — Planning features can dominate the product too early

Scenario, domain and slice planning remain valuable, but they should not prevent validation of the more fundamental observability loop.

### SF-CR02 — Supporting scenarios still create real implementation cost

Workspace, explorer and persistence work can consume more effort than the dependency mechanism itself.

### SF-CR03 — Future candidates should not be treated as roadmap commitments

They are boundaries and possibilities, not accepted work.

### SF-CR04 — Solution experiments are not product requirements

VS Code and standalone workflows should remain prototype options until evidence exists.

## Related Ideas

- Use one repository and one preconfigured workspace in the first technical spike.
- Simulate the explorer while implementing the real dependency engine.
- Keep a visible distinction between base, future and experimental scenarios.
- Convert a candidate into a full scenario draft only when its boundary becomes relevant.

## User Answers

```text
- Supporting and future scenarios should be described only enough to understand boundaries.
- Full scenarios are created separately.
- Planning layers remain important but the broader product is file observability.
```

## Decisions

```text
- No future scenario is committed to implementation.
- VS Code, standalone and CLI workflows remain experiments rather than selected product behavior.
```

---

# Solution Overview Draft

Status: working draft  
Doc version: v0.1.0

## Purpose

Describe, at a high level, how the needs from the Product Legend and core value scenarios might be implemented.

This draft compares plausible solution directions without selecting one prematurely.

It is not:

- a final architecture;
- a detailed domain model;
- a slice plan;
- a production estimate;
- a commitment to a client platform.

## Legend And Scenario Needs

The solution must support the following needs derived from the Product Legend and candidate scenarios.

### Need N-01 — Explicit identity

Files or semantic objects must have addressable identities suitable for references.

### Need N-02 — Explicit typed relationship

The system must preserve:

- source;
- consumer;
- relationship purpose or type;
- source state last reviewed.

### Need N-03 — Source resolution

The user must be able to inspect source content from the consumer context.

### Need N-04 — AI context assembly

The system should assemble target content and selected resolved sources in an inspectable form.

### Need N-05 — Change detection

The system must detect when a registered source changes.

### Need N-06 — Impact identification

The system must identify registered consumers of the changed source.

### Need N-07 — Dependency review state

The system must preserve whether each affected consumer is:

- stale;
- in review;
- still valid;
- updated;
- changes required;
- deferred;
- broken.

The final state vocabulary is not selected.

### Need N-08 — Activity history

Important changes, AI proposals and review actions should remain visible.

### Need N-09 — Repository compatibility

The solution should reuse files and Git rather than replacing them unnecessarily.

### Need N-10 — Observable interface

The user must be able to see files, objects, dependencies and review backlog conveniently.

## Required Capabilities

### Repository access

- open configured repository;
- read supported files;
- detect file changes;
- identify Git state when available;
- avoid silently modifying files.

### Semantic object model

- stable object ID;
- object type;
- containing file;
- addressable content range or structured field;
- object version or semantic hash;
- metadata.

### Reference model

- source object;
- consumer object;
- relation type;
- purpose;
- reviewed source version;
- dependency status;
- review status.

### Indexing and reverse lookup

- resolve an object ID;
- list outgoing references;
- list incoming consumers;
- detect unresolved references;
- update indexes after file changes.

### Change interpretation

- obtain file changes;
- determine whether supported semantic objects changed;
- conservatively invalidate consumers where precise interpretation is not possible.

### Context assembly

- select current object;
- resolve required sources;
- include source identity and purpose;
- report stale or broken sources;
- produce human-readable and possibly structured output.

### Review workflow

- open affected consumer;
- inspect changed source;
- record result;
- update reviewed source version;
- attach evidence where relevant.

### Activity log

- record meaningful events;
- connect events to objects, versions, reviews, AI proposals and repository changes.

### Presentation

- physical file view;
- logical semantic-object view;
- source expansion;
- dependency/impact view;
- review backlog;
- activity history.

## Candidate Solution Approaches

No approach is selected.

### Approach A — Standalone Application

#### Description

A dedicated local application reads the repository and provides:

- file explorer;
- semantic explorer;
- dependency graph;
- source expansion;
- context copying;
- impact review;
- logs.

#### Strengths

- full control over specialized observability UI;
- rich graph and review views;
- easier consistency across operating systems than editor-specific UI;
- can support multiple editors.

#### Weaknesses

- duplicates some editor and Git functions;
- must implement repository navigation and file opening;
- larger UI scope;
- user may switch between editor and application frequently.

#### Best reason to choose later

Choose if the value depends strongly on rich cross-file visualization and editor APIs are too restrictive.

### Approach B — Visual Studio Code Extension

#### Description

Implement the first workflow inside VS Code using:

- custom tree views;
- file decorations;
- hover or webviews;
- commands;
- file watchers;
- source-control integration.

#### Strengths

- existing file editor and repository context;
- user already performs AI-driven work there;
- reduced context switching;
- smaller need to build generic editing capabilities.

#### Weaknesses

- UI limitations;
- dependence on VS Code APIs;
- complex graph and review interfaces may require webviews;
- local state and portability require design;
- risks coupling core semantics to editor commands.

#### Best reason to choose later

Choose if the core workflow can be performed naturally inside the editor and extension APIs cover the required observability.

### Approach C — Shared Core Plus One Or More Clients

#### Description

Create a narrow UI-independent core that owns:

- object identity;
- references;
- resolution;
- invalidation;
- review state;
- context assembly;
- domain events.

Use one initial client:

- VS Code extension;
- standalone application;
- CLI.

Other clients are added only after evidence.

#### Strengths

- core rules can be tested without UI;
- clients can change without rewriting fundamental behavior;
- CLI and UI can share the same semantics;
- allows comparison of client experiments.

#### Weaknesses

- more boundaries and interfaces at the start;
- storage and event contracts must be designed earlier;
- risk of creating an abstract platform instead of proving the first use case;
- possible duplication if only one client is ever needed.

#### Safe interpretation

```text
narrow modular library
  + one real client
  + simple adapters
```

It does not imply:

- microservices;
- a separate server;
- multiple finished clients;
- a generic plugin ecosystem.

#### Best reason to choose later

Choose if technical prototypes show that the dependency model is stable enough to separate and that more than one client or automation interface is likely.

### Approach D — Scripts / CLI

#### Description

Implement:

- structured object/reference files;
- indexing;
- stale detection;
- context generation;
- validation;
- review commands.

Use ordinary editor and Git tools for presentation.

#### Strengths

- fastest path to technical proof;
- deterministic;
- easy to test;
- useful in automation;
- low UI cost.

#### Weaknesses

- weak visual observability;
- review can be cumbersome;
- may not prove usability;
- later UI may reveal model limitations.

#### Best reason to choose later

Choose as the first technical spike or when command-based workflow already provides sufficient value.

### Approach E — Integration With Existing Product

#### Description

Use an existing editor, graph tool, documentation platform or repository product as the main host.

#### Strengths

- reuse mature navigation, storage or collaboration;
- potentially smallest custom product;
- existing user ecosystem.

#### Weaknesses

- host model may not support source-version-aware stale reviews;
- integration APIs may be insufficient;
- product evolution is externally controlled;
- semantic data may be duplicated.

#### Best reason to choose later

Choose only after identifying a host that already matches most of the required model.

## Existing Capabilities That Can Be Reused

### Git

Reuse for:

- physical file history;
- branch and commit identity;
- changed-file and line diff;
- rollback and comparison.

Do not replace with a custom version-control system.

### GitHub or repository host

Potential reuse for:

- pull-request review;
- links to commits and file diffs;
- collaboration;
- change discussion.

### Visual Studio Code

Potential reuse for:

- editing;
- file navigation;
- commands;
- Git UI;
- file watching;
- extension host;
- decorations.

### Existing parsers

Potential reuse for:

- Markdown AST;
- JSON/YAML parsing;
- code syntax trees;
- source positions.

### Language servers and analyzers

Potential reuse for:

- formal code-symbol identity;
- code references;
- diagnostics;
- symbol changes.

### Local database or structured sidecars

Potential reuse for:

- reference index;
- review state;
- event log;
- cached object versions.

No storage choice is selected.

## Integration Options

### Repository overlay

Keep repository files as source material and store observability metadata in:

- sidecar JSON;
- a local database;
- a repository metadata folder;
- a mixed model.

### Structured artifact model

Use canonical JSON or structured documents for supported planning artifacts and generate Markdown projections.

### VS Code integration

Use the editor as a client over the observability model.

### Git integration

Associate object and dependency changes with:

- working-tree diff;
- staged diff;
- commit;
- branch;
- pull request.

### AI integration

Initial form may remain manual:

```text
copy resolved context
  → paste into AI chat
  → receive result
  → apply to repository
  → inspect diff
```

Later form may use an agent or API directly.

## System Boundary

### Inside the proposed system

Current candidate responsibilities:

- identify supported semantic objects;
- store or resolve stable IDs;
- manage explicit references;
- calculate incoming and outgoing links;
- track source state last reviewed;
- mark dependencies stale or broken;
- assemble AI context;
- record dependency reviews;
- record meaningful activity events;
- project observability into clients.

### Outside the proposed system

Current candidate exclusions:

- full code editor;
- Git implementation;
- generic pull-request platform;
- guaranteed discovery of all implicit dependencies;
- automatic proof that AI understood context;
- general build/test execution engine;
- complete static analysis for every language;
- final product-management system.

### Unresolved boundary

It remains unclear whether:

- artifact authoring belongs inside the product;
- files or structured objects are canonical;
- AI application of changes happens inside or outside;
- logs are repository-shared or local;
- object extraction is explicit, automatic or mixed.

## Major Components

These are conceptual components, not accepted architecture.

### Workspace Manager

Responsibilities:

- repository configuration;
- workspace identity;
- methodology or schema context where relevant.

### Repository Adapter

Responsibilities:

- file access;
- file-change events;
- Git information;
- external diff links.

### Semantic Object Index

Responsibilities:

- object identity;
- containing file;
- current content range;
- object type;
- object state/hash.

### Reference Graph

Responsibilities:

- source-consumer links;
- relationship types;
- reverse lookup;
- broken-link detection.

### Change And Invalidation Engine

Responsibilities:

- detect changed source objects;
- compare current and reviewed source state;
- mark dependencies stale.

### Review Manager

Responsibilities:

- review queue;
- review result;
- reviewed source state;
- evidence links.

### Context Builder

Responsibilities:

- resolve selected sources;
- assemble human-readable AI context;
- report stale and broken references.

### Activity Log

Responsibilities:

- meaningful events;
- actor and origin;
- object/version links;
- AI proposal and repository-change links.

### Client Projection

Responsibilities:

- repository tree decorations;
- semantic explorer;
- source expansion;
- dependency view;
- review screen;
- timeline.

## Technical Unknowns

| ID | Unknown | Why it matters | Candidate test |
|---|---|---|---|
| SO-U01 | How stable IDs survive edits and moves. | Broken identity destroys dependency history. | Markdown reference technical spike |
| SO-U02 | Whether objects are explicit or extracted. | Determines reliability and authoring cost. | Compare explicit anchors with parser/AI extraction |
| SO-U03 | How source versions are represented. | Needed for stale detection. | Compare content hash, semantic hash and artifact version |
| SO-U04 | How to distinguish semantic and formatting-only changes. | Controls stale-signal noise. | Conservative invalidation trial |
| SO-U05 | Where references and review states are stored. | Affects portability, Git sharing and collaboration. | Sidecar vs local DB prototype |
| SO-U06 | Whether VS Code can support the required UI. | Affects first-client choice. | VS Code integration prototype |
| SO-U07 | How much context can be resolved safely for AI. | Large graphs may exceed context limits. | Context-bundle size trial |
| SO-U08 | Whether users maintain explicit references. | Fundamental value depends on graph quality. | Workflow/value prototype |
| SO-U09 | How external file changes are indexed. | Normal work may occur outside the client. | File-watcher and Git-state spike |
| SO-U10 | How repository diff maps to semantic objects. | Determines value beyond ordinary Git review. | Object-diff spike |
| SO-U11 | Whether a shared core is justified. | Premature abstraction increases cost. | Implement one vertical loop in a modular but narrow design |
| SO-U12 | How AI output is linked to applied file changes. | Needed for provenance and logs. | Manual proposal/change-set prototype |

## Risks

### SO-R01 — Premature architecture

Selecting a client or generic core before testing the loop may waste effort.

### SO-R02 — Overgeneralized object model

Supporting arbitrary files and relationships too early may prevent a useful first implementation.

### SO-R03 — Storage fragmentation

Repository sidecars, local database and Git history may diverge.

### SO-R04 — Identity breakage

File edits may invalidate references unexpectedly.

### SO-R05 — Stale-alert fatigue

Conservative invalidation may create too much review work.

### SO-R06 — Weak differentiation

The result may duplicate VS Code, GitHub or existing graph tools without enough added value.

### SO-R07 — Hidden dependency problem remains

Only registered dependencies are observable.

### SO-R08 — UI consumes effort before mechanism is proven

A rich explorer may delay testing the dependency loop.

### SO-R09 — AI workflow changes rapidly

Tooling assumptions may become outdated.

### SO-R10 — Logs become noisy

Recording every operation would reduce rather than improve observability.

## Rough Complexity And Cost

No numeric estimate is currently accepted.

### Lower-complexity work

Relative estimate: low to medium.

Candidate items:

- structured reference schema;
- two-file technical spike;
- basic reverse-reference index;
- simple context generation;
- simple stale-state calculation;
- CLI proof;
- static workflow mock.

### Medium-complexity work

Relative estimate: medium.

Candidate items:

- persistent workspace;
- explicit Markdown object IDs;
- file watching;
- review lifecycle;
- activity events;
- VS Code tree and commands;
- basic sidecar storage;
- Git working-tree integration.

### Higher-complexity work

Relative estimate: high.

Candidate items:

- robust identity across arbitrary edits;
- semantic diff;
- rich standalone graph;
- cross-repository references;
- collaboration;
- planning branches and merges;
- automatic AI integration;
- generalized parser/plugin architecture;
- reliable import of code intelligence from many languages.

### Cost uncertainty

The main cost uncertainty is not basic UI.

It is whether stable object identity and low-noise invalidation can work with acceptable user effort.

## Prototype Candidates

### PT-01 — Workflow Mock

Question:

```text
Can the user understand and use:
source registration;
source expansion;
stale review;
activity history?
```

Possible implementation:

- Figma;
- static React mock;
- simulated repository data.

### PT-02 — Explicit Markdown Reference Spike

Question:

```text
Can two Markdown objects keep stable explicit references
through ordinary edits and source changes?
```

Possible implementation:

- explicit IDs;
- JSON sidecar;
- content hashes;
- CLI.

### PT-03 — Closed-Loop Vertical Prototype

Question:

```text
Can the system perform the entire fundamental loop
with one source, one consumer and one review?
```

Scope:

```text
create objects
  → add reference
  → resolve source
  → change source
  → mark stale
  → review
  → log event
```

### PT-04 — Context Bundle Trial

Question:

```text
Does resolved source context improve a real AI task
compared with manual repository search?
```

### PT-05 — VS Code Integration Spike

Question:

```text
Can VS Code present the core loop conveniently
without a standalone application?
```

### PT-06 — Value Trial

Question:

```text
Does the workflow reduce manual search,
missed consumers or review uncertainty
across several real repository changes?
```

### PT-07 — Storage Comparison

Question:

```text
Should references and review state live in repository sidecars,
local storage or a mixed model?
```

## Current Comparison

| Approach | Fast technical proof | Visual observability | Reuses editor/Git | Client independence | Premature-generalization risk | Current status |
|---|---:|---:|---:|---:|---:|---|
| Standalone application | low | high | medium | high | medium | unselected |
| VS Code extension | medium | medium | high | low | low-medium | unselected |
| Shared core + client | medium-low | depends on client | high | high | high | unselected |
| Scripts / CLI | high | low | high | high | low | unselected |
| Existing-product integration | unknown | depends on host | high | low | medium | unselected |

Current provisional interpretation:

- scripts/CLI may be the fastest way to test reference and invalidation mechanics;
- a VS Code extension may be the fastest way to test realistic editor workflow;
- a standalone application may be strongest for long-term rich observability;
- shared core may be justified only after the first closed loop exposes stable rules;
- integration with an existing product requires ecosystem research.

No winner is selected.

## Questions

| ID | Question | Priority | Blocking | Status |
|---|---|---:|---:|---|
| SO-Q01 | What is the canonical first object format? | high | yes | open |
| SO-Q02 | Where are IDs and references stored? | high | yes | open |
| SO-Q03 | Which prototype should be built first? | high | yes | open |
| SO-Q04 | Is VS Code the first client or only an integration experiment? | high | no | open |
| SO-Q05 | Should the first technical implementation have a shared core package? | high | no | open |
| SO-Q06 | What does the first prototype deliberately simulate? | high | yes | open |
| SO-Q07 | Is Git required for stale detection or only for physical diff? | high | no | open |
| SO-Q08 | What event types belong in the first activity log? | medium | no | open |
| SO-Q09 | Does the base need semantic object diff or only explicit source-version change? | high | no | open |
| SO-Q10 | How will a user recover from a broken or moved source? | high | no | open |
| SO-Q11 | What existing product should be trialed before building a client? | high | no | open |
| SO-Q12 | What result would cause the project to stop rather than continue? | high | yes | open |

## Critical Remarks

### SO-CR01 — This overview still contains several products

A dependency engine, structured planning editor, repository explorer and review dashboard could each become a large product. The first prototype must keep one center.

### SO-CR02 — Shared core is a design direction, not automatically the best start

A modular implementation is useful. A platform-level abstraction is not justified yet.

### SO-CR03 — The most important unknown is behavioral and technical

The product fails if either:

- users do not maintain references;
- references and invalidation are not reliable.

### SO-CR04 — Rough complexity is intentionally qualitative

Numeric estimates before object/storage/client choices would create false precision.

### SO-CR05 — Existing-tool reuse requires actual trials

Assumptions about VS Code and GitHub should be tested rather than accepted from conceptual comparison.

## Related Ideas

- Implement the closed-loop engine as pure functions first, but keep the model narrow.
- Use a simple VS Code webview only after CLI mechanics work.
- Build the first prototype on one real repository and one artifact type.
- Keep repository files authoritative and use replaceable sidecar storage for the spike.
- Record prototype evidence in dedicated Prototype Result drafts.
- Add a stop decision if reference maintenance is not useful after real tasks.
- Compare one standalone mock and one VS Code mock before production UI choice.

## User Answers

```text
- Standalone, VS Code extension, shared core, scripts/CLI
  and existing-product integration must all remain candidates.
- No option should be preselected.
- The solution should reuse Git diff rather than rebuild Git.
- Rich semantic observability may justify a custom application,
  but this is not yet decided.
- Prototype work should occur before detailed production planning.
```

## Decisions

```text
- No solution approach is selected.
- The first implementation should focus on the closed dependency loop.
- Detailed architecture and cost planning are deferred until research
  and prototype evidence exist.
