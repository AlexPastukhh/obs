# Add Or Route New Information Workflow

Status: active workflow.

Use when the user gives new information and asks where/how to document it, or when a new file/workflow/template/map may be needed.

## Goal

Route new information to the correct existing owner file, or create a new file only when justified.

## Algorithm

```text
1. Classify the information type.

2. Read:
   - -Repetition/USE CASE MAP.md
   - -Repetition/RESPONSIBILITY MAP.md
   - -Repetition/Documentation Architecture Adapter.md
   - target files if a likely owner exists.

3. Decide whether an existing owner file already owns this information.

4. If existing owner exists:
   - update existing file;
   - do not create a new file;
   - do not update responsibility map unless ownership changed.

5. If no owner exists:
   - decide whether this should be:
     - new workflow;
     - new template;
     - new recovery note;
     - new chain/schedule file;
     - new locator entry;
     - new further-study branch;
     - new documentation architecture adapter/update;
     - new principles/profile/register/log file;
     - temporary inventory note.

6. Create a new file only if it reduces confusion or defines a durable responsibility.

7. If a new file or category is created:
   - update RESPONSIBILITY MAP;
   - update START HERE if it affects navigation;
   - update USE CASE MAP if it adds command routing;
   - use a template if one exists.

8. Report:
   - classification;
   - chosen target;
   - why existing file vs new file;
   - files touched;
   - responsibility map update yes/no.
```

## Classification Guide

```text
user command / action -> USE CASE MAP
step-by-step algorithm -> Workflows/
output skeleton -> Templates/
where information belongs -> RESPONSIBILITY MAP
local documentation architecture / file-type rule -> Documentation Architecture Adapter.md
domain invariant -> * Principles.md
role/capability model -> * Profile.md
durable open/deferred/shared list -> * Register.md
completed action history -> * Log.md
AI behavior / handoff -> FOR NEW AI CHAT.md
navigation / read order -> START HERE.md
repeat unit / repeat dates -> Chains/
daily queue -> Schedules/
explicit exception / break / rollback / shift -> Recovery/
where to find knowledge -> Lookup/Knowledge Locator Map.md
unclear old conspect or inventory staging -> Lookup/Inventory Notes.md
unscheduled deeper-study branch -> Further Study/
```

## Output Shape

```text
Information type:
- ...

Owner check:
- existing owner found / no owner found

Target:
- ...

Decision:
- update existing file / create new file

Why:
- ...

Responsibility map update:
- yes/no, because ...

Navigation/use-case map update:
- yes/no, because ...

Touched files:
- ...
```

## Do Not

```text
- Do not create new files just because information is new.
- Do not update responsibility map for every small content edit.
- Do not leave a newly created durable file unlisted in responsibility map.
- Do not silently change navigation or command routing.
```
