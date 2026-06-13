// ==UserScript==
// @name         Reusable Chat Command Helper
// @namespace    https://github.com/AlexPastukhh/obs/reusable-docs
// @version      0.6.1-obs-cleanup
// @description  Reusable list-only draggable command helper for inserting structured command prompt bodies into ChatGPT.
// @author       Reusable docs layer
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

/*
TM-OBS-REUSE source sync:
  Source-of-truth:
    - planning/planning-use-case-map.md
    - planning/documentation/tampermonkey-command-projection-workflow.md
    - planning/documentation/tools/tampermonkey/README.md

  Boundary:
    - This userscript is a reusable documentation-layer helper projection.
    - It is not command source of truth.
    - Command semantics remain owned by the project root use-case map and linked owner workflow/template/area files.
    - The command set below is trimmed to accepted OBS root UCM routes.
*/


(function () {
  'use strict';

  const COMMANDS = [
  {
    "id": "replacement_archive.create",
    "group": "MVP-1",
    "label": "давай архив",
    "description": "output package",
    "englishName": "give arch",
    "body": "[PLANNING_COMMAND]
Read this whole command body before answering.
Do not ignore `key_reminders`.

command:
  давай архив

english_name:
  give arch

command_family:
  `давай архив` / `собери архив` / `replacement package`

source_of_truth:
  Start from `planning/planning-use-case-map.md`.
  Then read the owner / linked files for this command route.

route_read_rule:
  If you have not read this command route and its linked owner/example files in this chat, read them before answering.
  If you have read them but do not remember the required behavior, boundaries or key points, reread from `planning/planning-use-case-map.md` before answering.
  Do not rely only on this prompt when command behavior is uncertain.

key_reminders:
  - Output-package mode, not archive read-source mode.
  - Produce a full replacement archive.
  - Give apply/diff commands in chat.
  - Use git add -N for new files before diff capture.
  - Ask user to paste diff before commit.
  - Do not commit or push.

user_target:
  <what archive/package should include>

[/PLANNING_COMMAND]"
  },
  {
    "id": "archive_source.use",
    "group": "MVP-1",
    "label": "арх",
    "description": "archive source",
    "englishName": "added arch",
    "body": "[PLANNING_COMMAND]
Read this whole command body before answering.
Do not ignore `key_reminders`.

command:
  арх

english_name:
  added arch

command_family:
  `арх` / `из архива` / `use archive`

source_of_truth:
  Start from `planning/planning-use-case-map.md`.
  Then read the owner / linked files for this command route.

route_read_rule:
  If you have not read this command route and its linked owner/example files in this chat, read them before answering.
  If you have read them but do not remember the required behavior, boundaries or key points, reread from `planning/planning-use-case-map.md` before answering.
  Do not rely only on this prompt when command behavior is uncertain.

key_reminders:
  - Read-source mode, not output-package mode.
  - Use provided/latest archive as source snapshot.
  - Do not create replacement archive unless separately requested.
  - State archive freshness/source limits when relevant.

user_target:
  <what should be checked from archive>

[/PLANNING_COMMAND]"
  },
  {
    "id": "file_update.plan",
    "group": "MVP-1",
    "label": "план файл-обновление",
    "description": "file plan",
    "englishName": "plan file update",
    "body": "[PLANNING_COMMAND]
Read this whole command body before answering.
Do not ignore `key_reminders`.

command:
  план файл-обновление

english_name:
  plan file update

command_family:
  `план файл-обновление` / `спланируй обновление файлов` / `спланируй архив`

source_of_truth:
  Start from `planning/planning-use-case-map.md`.
  Then read the owner / linked files for this command route.

route_read_rule:
  If you have not read this command route and its linked owner/example files in this chat, read them before answering.
  If you have read them but do not remember the required behavior, boundaries or key points, reread from `planning/planning-use-case-map.md` before answering.
  Do not rely only on this prompt when command behavior is uncertain.

key_reminders:
  - Plan file/docs/code/archive update only.
  - End with `План файл-обновление` in planned mode.
  - Do not edit files.
  - Do not create archive unless separately requested.

user_target:
  <what update/archive should be planned>

[/PLANNING_COMMAND]"
  },
  {
    "id": "critical_review.apply",
    "group": "MVP-1",
    "label": "крит",
    "description": "critical review",
    "englishName": "crit",
    "body": "[PLANNING_COMMAND]
Read this whole command body before answering.
Do not ignore `key_reminders`.

command:
  крит

english_name:
  crit

command_family:
  `крит` / `критически оцени` / `critical review`

source_of_truth:
  Start from `planning/planning-use-case-map.md`.
  Then read the owner / linked files for this command route.

route_read_rule:
  If you have not read this command route and its linked owner/example files in this chat, read them before answering.
  If you have read them but do not remember the required behavior, boundaries or key points, reread from `planning/planning-use-case-map.md` before answering.
  Do not rely only on this prompt when command behavior is uncertain.

key_reminders:
  - Treat target as hypothesis, not accepted truth.
  - Give honest verdict with risks and assumptions.
  - Do not edit files, create archives, commit or push.

user_target:
  <what should be critically reviewed>

[/PLANNING_COMMAND]"
  },
  {
    "id": "context_recheck.apply",
    "group": "MVP-1",
    "label": "обс",
    "description": "context recheck",
    "englishName": "chat rech",
    "body": "[PLANNING_COMMAND]
Read this whole command body before answering.
Do not ignore `key_reminders`.

command:
  обс

english_name:
  chat rech

command_family:
  `обс` / `перепроверь обсуждение` / `context recheck`

source_of_truth:
  Start from `planning/planning-use-case-map.md`.
  Then read the owner / linked files for this command route.

route_read_rule:
  If you have not read this command route and its linked owner/example files in this chat, read them before answering.
  If you have read them but do not remember the required behavior, boundaries or key points, reread from `planning/planning-use-case-map.md` before answering.
  Do not rely only on this prompt when command behavior is uncertain.

key_reminders:
  - Re-check relevant prior discussion.
  - Preserve accepted decisions and constraints.
  - State what was checked and what remains unavailable.

user_target:
  <what discussion/context should be rechecked>

[/PLANNING_COMMAND]"
  },
  {
    "id": "current_state.report",
    "group": "MVP-1",
    "label": "положняк",
    "description": "current state",
    "englishName": "polozh",
    "body": "[PLANNING_COMMAND]
Read this whole command body before answering.
Do not ignore `key_reminders`.

command:
  положняк

english_name:
  polozh

command_family:
  `положняк` / `текущий положняк` / `current state`

source_of_truth:
  Start from `planning/planning-use-case-map.md`.
  Then read the owner / linked files for this command route.

route_read_rule:
  If you have not read this command route and its linked owner/example files in this chat, read them before answering.
  If you have read them but do not remember the required behavior, boundaries or key points, reread from `planning/planning-use-case-map.md` before answering.
  Do not rely only on this prompt when command behavior is uncertain.

key_reminders:
  - Report current repo/chat/planning state.
  - Separate known, local, unknown and not checked.
  - Do not edit or archive unless separately requested.

user_target:
  <state target>

[/PLANNING_COMMAND]"
  },
  {
    "id": "plan.now",
    "group": "MVP-1",
    "label": "планируй",
    "description": "plan now",
    "englishName": "plan now",
    "body": "[PLANNING_COMMAND]
Read this whole command body before answering.
Do not ignore `key_reminders`.

command:
  планируй

english_name:
  plan now

command_family:
  `планируй` / `распланируй` / `plan`

source_of_truth:
  Start from `planning/planning-use-case-map.md`.
  Then read the owner / linked files for this command route.

route_read_rule:
  If you have not read this command route and its linked owner/example files in this chat, read them before answering.
  If you have read them but do not remember the required behavior, boundaries or key points, reread from `planning/planning-use-case-map.md` before answering.
  Do not rely only on this prompt when command behavior is uncertain.

key_reminders:
  - Plan the next concrete step now.
  - State scope, boundary, evidence and next action.
  - Do not edit files or create archive unless separately requested.

user_target:
  <what should be planned>

[/PLANNING_COMMAND]"
  },
  {
    "id": "command.create",
    "group": "MVP-1",
    "label": "создай команду",
    "description": "new command",
    "englishName": "create command",
    "body": "[PLANNING_COMMAND]
Read this whole command body before answering.
Do not ignore `key_reminders`.

command:
  создай команду

english_name:
  create command

command_family:
  `создай команду` / `создай новую команду` / `добавь команду` / `new command` / `create command`

source_of_truth:
  Start from `planning/planning-use-case-map.md`.
  Then read the owner / linked files for this command route.

route_read_rule:
  If you have not read this command route and its linked owner/example files in this chat, read them before answering.
  If you have read them but do not remember the required behavior, boundaries or key points, reread from `planning/planning-use-case-map.md` before answering.
  Do not rely only on this prompt when command behavior is uncertain.

key_reminders:
  - Create command semantics in UCM/owner docs first.
  - Tampermonkey is projection, not source of truth.
  - Define family, type, owner files, output and permission boundary.
  - Do not edit/create archive unless separately requested.

user_target:
  <what command should be created or planned>

[/PLANNING_COMMAND]"
  },
  {
    "id": "parallel_workspace.start",
    "group": "MVP-1",
    "label": "начни параллельную работу",
    "description": "parallel workspace",
    "englishName": "start parallel work",
    "body": "[PLANNING_COMMAND]
Read this whole command body before answering.
Do not ignore `key_reminders`.

command:
  начни параллельную работу

english_name:
  start parallel work

command_family:
  `начни параллельную работу` / `старт параллельной работы` / `parallel workspace` / `start parallel workflow`

source_of_truth:
  Start from `planning/planning-use-case-map.md`.
  Then read the owner / linked files for this command route.

route_read_rule:
  If you have not read this command route and its linked owner/example files in this chat, read them before answering.
  If you have read them but do not remember the required behavior, boundaries or key points, reread from `planning/planning-use-case-map.md` before answering.
  Do not rely only on this prompt when command behavior is uncertain.

key_reminders:
  - Start one staging-only workspace only for a concrete target.
  - Do not edit shared canonical docs directly from workspace phase.
  - Do not create aggregate sync until a sync-candidate workspace exists.

user_target:
  <parallel agent/workstream target>

[/PLANNING_COMMAND]"
  },
  {
    "id": "scenario_plan.workspace",
    "group": "MVP-2",
    "label": "план сценария",
    "description": "scenario workspace",
    "englishName": "scenario plan",
    "body": "[PLANNING_COMMAND]
Read this whole command body before answering.
Do not ignore `key_reminders`.

command:
  план сценария

english_name:
  scenario plan

command_family:
  `план сценария` / `scenario plan` / `workspace plan` / `шаблон планирования`

source_of_truth:
  Start from `planning/planning-use-case-map.md`.
  Then read the owner / linked files for this command route.

route_read_rule:
  If you have not read this command route and its linked owner/example files in this chat, read them before answering.
  If you have read them but do not remember the required behavior, boundaries or key points, reread from `planning/planning-use-case-map.md` before answering.
  Do not rely only on this prompt when command behavior is uncertain.

key_reminders:
  - Use OBS planning-system owner docs.
  - Fill only explicit user input by default.
  - Unknown fields are `not provided`.
  - AI assumptions/suggestions must be separate.

user_target:
  <scenario target and provided inputs>

[/PLANNING_COMMAND]"
  },
  {
    "id": "idea.evaluate",
    "group": "MVP-2",
    "label": "оцени идею",
    "description": "idea eval",
    "englishName": "idea eval",
    "body": "[PLANNING_COMMAND]
Read this whole command body before answering.
Do not ignore `key_reminders`.

command:
  оцени идею

english_name:
  idea eval

command_family:
  `оцени идею` / `idea eval` / `оценка идеи`

source_of_truth:
  Start from `planning/planning-use-case-map.md`.
  Then read the owner / linked files for this command route.

route_read_rule:
  If you have not read this command route and its linked owner/example files in this chat, read them before answering.
  If you have read them but do not remember the required behavior, boundaries or key points, reread from `planning/planning-use-case-map.md` before answering.
  Do not rely only on this prompt when command behavior is uncertain.

key_reminders:
  - Evaluate the provided idea against Minimum/Base/Desired/Max.
  - Do not promote idea to Plan Core automatically.
  - Use `not provided` when evidence is missing.

user_target:
  <idea to evaluate>

[/PLANNING_COMMAND]"
  },
  {
    "id": "acceptance.plan",
    "group": "MVP-2",
    "label": "AC план",
    "description": "acceptance criteria",
    "englishName": "acceptance plan",
    "body": "[PLANNING_COMMAND]
Read this whole command body before answering.
Do not ignore `key_reminders`.

command:
  AC план

english_name:
  acceptance plan

command_family:
  `AC план` / `acceptance plan` / `критерии готовности`

source_of_truth:
  Start from `planning/planning-use-case-map.md`.
  Then read the owner / linked files for this command route.

route_read_rule:
  If you have not read this command route and its linked owner/example files in this chat, read them before answering.
  If you have read them but do not remember the required behavior, boundaries or key points, reread from `planning/planning-use-case-map.md` before answering.
  Do not rely only on this prompt when command behavior is uncertain.

key_reminders:
  - Convert explicit user goals into Acceptance Criteria.
  - Do not invent criteria unless user asks for suggestions.
  - AC must have a verifiable result or `not provided`.

user_target:
  <goals to convert into AC>

[/PLANNING_COMMAND]"
  },
  {
    "id": "planning_commands.review",
    "group": "MVP-2",
    "label": "команды планирования",
    "description": "planning commands",
    "englishName": "planning commands",
    "body": "[PLANNING_COMMAND]
Read this whole command body before answering.
Do not ignore `key_reminders`.

command:
  команды планирования

english_name:
  planning commands

command_family:
  `команды планирования` / `planning commands`

source_of_truth:
  Start from `planning/planning-use-case-map.md`.
  Then read the owner / linked files for this command route.

route_read_rule:
  If you have not read this command route and its linked owner/example files in this chat, read them before answering.
  If you have read them but do not remember the required behavior, boundaries or key points, reread from `planning/planning-use-case-map.md` before answering.
  Do not rely only on this prompt when command behavior is uncertain.

key_reminders:
  - Use command-creation workflow before treating a command as accepted.
  - No Tampermonkey projection unless explicitly in scope.
  - Do not edit files/create archive unless separately requested.

user_target:
  <planning command target>

[/PLANNING_COMMAND]"
  }
];

  const WIDGET_ID = 'planning-command-helper-host';
  const DRAG_THRESHOLD_PX = 6;
  const INITIAL_WIDTH_PX = 390;

  let isOpen = false;
  let panelLeft = Math.max(16, window.innerWidth - INITIAL_WIDTH_PX - 24);
  let panelTop = Math.max(16, window.innerHeight - 520);

  const existing = document.getElementById(WIDGET_ID);
  if (existing) {
    existing.remove();
  }

  const host = document.createElement('div');
  host.id = WIDGET_ID;
  document.documentElement.appendChild(host);

  const root = host.attachShadow({ mode: 'open' });

  const style = document.createElement('style');
  style.textContent = `
    :host {
      all: initial;
    }

    .enman-panel {
      position: fixed;
      left: ${panelLeft}px;
      top: ${panelTop}px;
      width: min(${INITIAL_WIDTH_PX}px, calc(100vw - 32px));
      max-height: min(70vh, 720px);
      z-index: 2147483647;
      border: 1px solid rgba(125, 125, 125, 0.35);
      border-radius: 12px;
      background: rgba(24, 24, 27, 0.96);
      color: rgb(245, 245, 245);
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-size: 13px;
      box-shadow: 0 14px 36px rgba(0, 0, 0, 0.35);
      overflow: hidden;
      user-select: none;
    }

    .enman-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 12px;
      cursor: grab;
      background: rgba(39, 39, 42, 0.98);
      border-bottom: 1px solid rgba(125, 125, 125, 0.28);
      font-weight: 700;
      letter-spacing: 0.01em;
    }

    .enman-header:active {
      cursor: grabbing;
    }

    .enman-title {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }

    .enman-title-main {
      font-size: 13px;
      line-height: 1.1;
      white-space: nowrap;
    }

    .enman-title-sub {
      color: rgba(245, 245, 245, 0.65);
      font-size: 11px;
      font-weight: 500;
      line-height: 1.1;
      white-space: nowrap;
    }

    .enman-indicator {
      color: rgba(245, 245, 245, 0.7);
      font-size: 14px;
      line-height: 1;
    }

    .enman-body {
      max-height: calc(min(70vh, 720px) - 44px);
      overflow-y: auto;
      overscroll-behavior: contain;
      padding: 8px;
    }

    .enman-group {
      margin: 4px 0 10px;
    }

    .enman-group-title {
      color: rgba(245, 245, 245, 0.72);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      padding: 6px 6px 4px;
    }

    .enman-command {
      width: 100%;
      display: grid;
      grid-template-columns: 26px minmax(0, 1fr) auto;
      align-items: center;
      gap: 8px;
      padding: 8px 7px;
      margin: 2px 0;
      border: 0;
      border-radius: 8px;
      background: transparent;
      color: inherit;
      text-align: left;
      font: inherit;
      cursor: pointer;
    }

    .enman-command:hover,
    .enman-command:focus-visible {
      outline: none;
      background: rgba(255, 255, 255, 0.09);
    }

    .enman-number {
      color: rgba(245, 245, 245, 0.45);
      font-size: 12px;
      text-align: right;
    }

    .enman-label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 650;
    }

    .enman-description {
      color: rgba(245, 245, 245, 0.58);
      font-size: 12px;
      white-space: nowrap;
    }

    .enman-status {
      margin: 8px;
      padding: 8px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.08);
      color: rgba(245, 245, 245, 0.78);
      line-height: 1.35;
      white-space: pre-wrap;
      user-select: text;
    }

    .enman-closed {
      width: auto;
      min-width: 116px;
    }

    .enman-closed .enman-header {
      border-bottom: 0;
    }

    .enman-closed .enman-body {
      display: none;
    }
  `;

  const panel = document.createElement('div');
  panel.className = 'enman-panel enman-closed';

  root.appendChild(style);
  root.appendChild(panel);

  function render() {
    const bodyHtml = isOpen ? renderCommandList() : '';
    panel.className = `enman-panel${isOpen ? '' : ' enman-closed'}`;
    panel.style.left = `${panelLeft}px`;
    panel.style.top = `${panelTop}px`;
    panel.innerHTML = `
      <div class="enman-header" title="Click to open/close. Drag to move.">
        <div class="enman-title">
          <div class="enman-title-main">${isOpen ? 'ENMAN commands' : 'ENMAN'}</div>
          <div class="enman-title-sub">${isOpen ? 'Click row to insert. Header toggles/drags.' : 'Click or drag header'}</div>
        </div>
        <div class="enman-indicator">${isOpen ? '⇕' : '☰'}</div>
      </div>
      <div class="enman-body">
        ${bodyHtml}
      </div>
    `;

    attachHeaderEvents();
    attachCommandEvents();
  }

  function renderCommandList() {
    const mvp1 = COMMANDS.filter((command) => command.group === 'MVP-1');
    const mvp2 = COMMANDS.filter((command) => command.group === 'MVP-2');

    return `
      ${renderGroup('MVP-1 / high-risk', mvp1, 1)}
      ${renderGroup('MVP-2 / helpers', mvp2, mvp1.length + 1)}
    `;
  }

  function getCommandDisplayLabel(command) {
    return command.englishName ? `${command.englishName} · ${command.label}` : command.label;
  }

  function renderGroup(title, commands, startNumber) {
    const rows = commands.map((command, index) => `
      <button class="enman-command" type="button" data-command-id="${escapeAttribute(command.id)}">
        <span class="enman-number">${startNumber + index}.</span>
        <span class="enman-label">${escapeHtml(getCommandDisplayLabel(command))}</span>
        <span class="enman-description">${escapeHtml(command.description)}</span>
      </button>
    `).join('');

    return `
      <section class="enman-group">
        <div class="enman-group-title">${escapeHtml(title)}</div>
        ${rows}
      </section>
    `;
  }

  function attachHeaderEvents() {
    const header = panel.querySelector('.enman-header');
    if (!header) return;

    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;
    let dragging = false;

    header.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;

      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;

      const rect = panel.getBoundingClientRect();
      startLeft = rect.left;
      startTop = rect.top;
      dragging = false;

      header.setPointerCapture(pointerId);
      event.preventDefault();
    });

    header.addEventListener('pointermove', (event) => {
      if (pointerId !== event.pointerId) return;

      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;
      const movedFarEnough = Math.hypot(deltaX, deltaY) > DRAG_THRESHOLD_PX;

      if (movedFarEnough) {
        dragging = true;
      }

      if (dragging) {
        const width = panel.offsetWidth || INITIAL_WIDTH_PX;
        const height = panel.offsetHeight || 44;
        panelLeft = clamp(startLeft + deltaX, 8, Math.max(8, window.innerWidth - width - 8));
        panelTop = clamp(startTop + deltaY, 8, Math.max(8, window.innerHeight - height - 8));
        panel.style.left = `${panelLeft}px`;
        panel.style.top = `${panelTop}px`;
        event.preventDefault();
      }
    });

    header.addEventListener('pointerup', (event) => {
      if (pointerId !== event.pointerId) return;

      try {
        header.releasePointerCapture(pointerId);
      } catch (error) {
        // Ignore release failures from browser edge cases.
      }

      if (!dragging) {
        isOpen = !isOpen;
        render();
      }

      pointerId = null;
      dragging = false;
      event.preventDefault();
    });

    header.addEventListener('pointercancel', () => {
      pointerId = null;
      dragging = false;
    });
  }

  function attachCommandEvents() {
    panel.querySelectorAll('.enman-command').forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('data-command-id');
        const command = COMMANDS.find((item) => item.id === id);
        if (!command) return;

        const inserted = insertCommandBody(command.body);
        if (inserted) {
          showStatus(`Inserted: ${command.label}`);
        }
      });
    });
  }

  function insertCommandBody(body) {
    const composer = findComposer();
    if (!composer) {
      showStatus('Could not find ChatGPT input.\nClick into the composer and try again.');
      return false;
    }

    const currentText = getComposerText(composer).trim();
    const nextText = currentText ? `${currentText}\n\n${body}` : body;

    setComposerText(composer, nextText);
    composer.focus();
    return true;
  }

  function findComposer() {
    const selectors = [
      'textarea[data-testid="composer-textarea"]',
      'textarea[placeholder]',
      'textarea',
      '#prompt-textarea',
      '[contenteditable="true"][data-testid="composer-textarea"]',
      '[contenteditable="true"][role="textbox"]',
      '[contenteditable="true"]'
    ];

    const candidates = [];
    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        if (!candidates.includes(element) && isUsableComposerCandidate(element)) {
          candidates.push(element);
        }
      });
    });

    candidates.sort((a, b) => b.getBoundingClientRect().bottom - a.getBoundingClientRect().bottom);
    return candidates[0] || null;
  }

  function isUsableComposerCandidate(element) {
    if (!element || host.contains(element)) return false;

    const rect = element.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return false;

    const style = window.getComputedStyle(element);
    if (style.visibility === 'hidden' || style.display === 'none') return false;

    if ('disabled' in element && element.disabled) return false;
    if ('readOnly' in element && element.readOnly) return false;

    return true;
  }

  function getComposerText(element) {
    if (element instanceof HTMLTextAreaElement || element instanceof HTMLInputElement) {
      return element.value || '';
    }

    return element.innerText || element.textContent || '';
  }

  function setComposerText(element, value) {
    if (element instanceof HTMLTextAreaElement || element instanceof HTMLInputElement) {
      const valueSetter = Object.getOwnPropertyDescriptor(element.constructor.prototype, 'value')?.set;
      if (valueSetter) {
        valueSetter.call(element, value);
      } else {
        element.value = value;
      }
      dispatchInputEvents(element);
      return;
    }

    element.textContent = value;
    dispatchInputEvents(element);
  }

  function dispatchInputEvents(element) {
    try {
      element.dispatchEvent(new InputEvent('input', {
        bubbles: true,
        inputType: 'insertText',
        data: null
      }));
    } catch (error) {
      element.dispatchEvent(new Event('input', { bubbles: true }));
    }

    element.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function showStatus(message) {
    const body = panel.querySelector('.enman-body');
    if (!body) return;

    const status = document.createElement('div');
    status.className = 'enman-status';
    status.textContent = message;
    body.prepend(status);

    window.setTimeout(() => {
      status.remove();
    }, 4500);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function escapeAttribute(value) {
    return escapeHtml(value);
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  render();
})();
