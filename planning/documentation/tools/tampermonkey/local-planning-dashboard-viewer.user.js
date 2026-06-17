// ==UserScript==
// @name         OBS Local Planning Dashboard Viewer
// @namespace    https://github.com/AlexPastukhh/obs/planning-dashboard
// @version      0.2.1
// @description  Read-only local markdown planning dashboard viewer for OBS time scopes, goal maps and backlog files.
// @author       OBS planning-system
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-idle
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @connect      127.0.0.1
// @connect      localhost
// ==/UserScript==

(function () {
  'use strict';

  const DEFAULT_BASE_URL = 'http://127.0.0.1:8765/';
  const DEFAULT_INDEX_PATH = 'planning/dashboard/index.md';
  const SECTION_NAMES = [
    'Scope', 'Current Target Scenario', 'Plan Core', 'Minimum', 'Base', 'Desired', 'Max / Very Wide',
    'Acceptance Criteria', 'Ideas Inbox', 'Desired Ideas', 'Other Ideas', 'Idea Evaluation',
    'Done / Evidence', 'Done', 'Done By Month', 'Previous Year Review', 'Previous Days / Sessions Done',
    'Sessions', 'Done Today', 'Still Needed', 'Still Needed This Year', 'Still Needed This Week',
    'Still Needed Today', 'Open / Unclear', 'Links', 'Purpose', 'Items', 'Notes'
  ];

  const state = {
    baseUrl: GM_getValue('obsPlanningDashboard.baseUrl', DEFAULT_BASE_URL),
    indexPath: GM_getValue('obsPlanningDashboard.indexPath', DEFAULT_INDEX_PATH),
    indexText: '',
    files: {},
    groups: {},
    activeTab: 'index'
  };

  GM_addStyle(`
    #obs-planning-dashboard-btn {
      position: fixed; right: 18px; bottom: 90px; z-index: 2147483647;
      border: 1px solid rgba(120,120,120,.35); border-radius: 999px;
      padding: 8px 12px; background: #111827; color: white;
      font: 13px/1.2 system-ui, -apple-system, Segoe UI, sans-serif;
      cursor: pointer; box-shadow: 0 6px 18px rgba(0,0,0,.25);
    }
    #obs-planning-dashboard-panel {
      position: fixed; right: 18px; bottom: 135px;
      width: min(860px, calc(100vw - 36px)); height: min(780px, calc(100vh - 170px));
      z-index: 2147483647; display: none; flex-direction: column;
      background: #0b1020; color: #f8fafc; border: 1px solid rgba(148,163,184,.35);
      border-radius: 14px; box-shadow: 0 18px 60px rgba(0,0,0,.45); overflow: hidden;
      font: 13px/1.45 system-ui, -apple-system, Segoe UI, sans-serif;
    }
    #obs-planning-dashboard-panel[data-open="true"] { display: flex; }
    .obs-pd-header { display: flex; align-items: center; gap: 8px; padding: 10px; border-bottom: 1px solid rgba(148,163,184,.25); background: #111827; }
    .obs-pd-title { font-weight: 700; margin-right: auto; }
    .obs-pd-btn { border: 1px solid rgba(148,163,184,.35); background: #1f2937; color: #f8fafc; border-radius: 8px; padding: 5px 8px; cursor: pointer; font: inherit; }
    .obs-pd-btn:hover { background: #334155; }
    .obs-pd-settings { display: grid; grid-template-columns: 90px 1fr; gap: 6px; padding: 10px; border-bottom: 1px solid rgba(148,163,184,.18); background: #0f172a; }
    .obs-pd-input { width: 100%; box-sizing: border-box; background: #020617; color: #f8fafc; border: 1px solid rgba(148,163,184,.35); border-radius: 6px; padding: 5px 7px; font: inherit; }
    .obs-pd-tabs { display: flex; gap: 4px; padding: 8px 10px; border-bottom: 1px solid rgba(148,163,184,.18); background: #0b1020; overflow-x: auto; }
    .obs-pd-tab[data-active="true"] { background: #2563eb; border-color: #60a5fa; }
    .obs-pd-body { padding: 12px; overflow: auto; white-space: normal; }
    .obs-pd-card { border: 1px solid rgba(148,163,184,.24); border-radius: 10px; background: #0f172a; padding: 10px; margin-bottom: 10px; }
    .obs-pd-card h2, .obs-pd-card h3 { margin: 0 0 6px; font-size: 14px; color: #bfdbfe; }
    .obs-pd-pre { margin: 0; padding: 8px; background: #020617; border-radius: 8px; overflow: auto; white-space: pre-wrap; color: #e5e7eb; }
    .obs-pd-error { color: #fecaca; background: #450a0a; border: 1px solid #991b1b; border-radius: 8px; padding: 8px; white-space: pre-wrap; margin-bottom: 10px; }
    .obs-pd-path { color: #93c5fd; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 12px; margin-bottom: 8px; }
  `);

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (key === 'text') node.textContent = value;
      else if (key.startsWith('on') && typeof value === 'function') node.addEventListener(key.slice(2), value);
      else node.setAttribute(key, value);
    }
    for (const child of children) node.appendChild(child);
    return node;
  }

  function normalizeBaseUrl(url) {
    return String(url || DEFAULT_BASE_URL).replace(/\/?$/, '/');
  }

  function fetchText(path) {
    const url = normalizeBaseUrl(state.baseUrl) + String(path || '').replace(/^\/+/, '');
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: 'GET',
        url,
        timeout: 8000,
        onload: (res) => {
          if (res.status >= 200 && res.status < 300) resolve(res.responseText || '');
          else reject(new Error(`HTTP ${res.status} for ${url}`));
        },
        onerror: () => reject(new Error(`Request failed for ${url}`)),
        ontimeout: () => reject(new Error(`Request timed out for ${url}`))
      });
    });
  }

  function getIndexBlock(text) {
    return text.match(/```text\s*([\s\S]*?)```/i)?.[1] || text;
  }

  function parseListAfter(block, key) {
    const lines = String(block || '').split(/\r?\n/);
    const out = [];
    let collecting = false;
    for (const line of lines) {
      if (!collecting) {
        if (line.match(new RegExp(`^${key}:\\s*$`, 'i'))) collecting = true;
        continue;
      }
      if (/^\S/.test(line) && !/^\s*-\s+/.test(line)) break;
      const item = line.match(/^\s*-\s+(.+)\s*$/)?.[1];
      if (item) out.push(item.trim());
    }
    return out;
  }

  function parseScalar(block, key) {
    return String(block || '').match(new RegExp(`^${key}:\\s*(.+)$`, 'mi'))?.[1]?.trim() || '';
  }

  function parseIndex(text) {
    const block = getIndexBlock(text);
    return {
      previousYear: parseScalar(block, 'previous_year'),
      year: parseScalar(block, 'active_year'),
      period: parseScalar(block, 'active_period'),
      week: parseScalar(block, 'active_week'),
      day: parseScalar(block, 'active_day'),
      goalMaps: parseListAfter(block, 'active_goal_maps'),
      deferredWork: parseScalar(block, 'deferred_work'),
      deferredIdeas: parseScalar(block, 'deferred_ideas')
    };
  }

  function extractTitle(md) {
    return (md.match(/^#\s+(.+)$/m)?.[1] || 'Untitled').trim();
  }

  function extractSection(md, sectionName) {
    const escaped = sectionName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`^##\\s+${escaped}\\s*$([\\s\\S]*?)(?=^##\\s+|\\s*$)`, 'm');
    const match = md.match(re);
    return match ? match[1].trim() : '';
  }

  function extractSubsection(md, sectionName) {
    const escaped = sectionName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`^###\\s+${escaped}\\s*$([\\s\\S]*?)(?=^###\\s+|^##\\s+|\\s*$)`, 'm');
    const match = md.match(re);
    return match ? match[1].trim() : '';
  }

  function cleanupMarkdownBody(text) {
    return String(text || '')
      .replace(/^```[a-zA-Z0-9_-]*\s*/m, '')
      .replace(/```\s*$/m, '')
      .trim();
  }

  function firstLines(text, count) {
    return String(text || '').split(/\r?\n/).slice(0, count).join('\n').trim();
  }

  function renderMarkdownSummary(path, md) {
    const wrap = el('div');
    wrap.appendChild(el('div', { class: 'obs-pd-path', text: path || 'not provided' }));
    wrap.appendChild(el('div', { class: 'obs-pd-card' }, [
      el('h2', { text: extractTitle(md) }),
      el('pre', { class: 'obs-pd-pre', text: firstLines(md, 10) })
    ]));

    let hasAny = false;
    for (const name of SECTION_NAMES) {
      const body = extractSection(md, name) || extractSubsection(md, name);
      if (!body) continue;
      hasAny = true;
      wrap.appendChild(el('div', { class: 'obs-pd-card' }, [
        el('h3', { text: name }),
        el('pre', { class: 'obs-pd-pre', text: cleanupMarkdownBody(body) })
      ]));
    }

    if (!hasAny) {
      wrap.appendChild(el('div', { class: 'obs-pd-card' }, [
        el('h3', { text: 'Raw file' }),
        el('pre', { class: 'obs-pd-pre', text: md })
      ]));
    }
    return wrap;
  }

  async function loadOptional(path) {
    if (!path) return null;
    try {
      return { path, text: await fetchText(path), error: null };
    } catch (error) {
      return { path, text: '', error: error.message || String(error) };
    }
  }

  async function refresh() {
    const body = document.querySelector('#obs-planning-dashboard-body');
    body.textContent = 'Loading...';
    try {
      GM_setValue('obsPlanningDashboard.baseUrl', state.baseUrl);
      GM_setValue('obsPlanningDashboard.indexPath', state.indexPath);

      state.indexText = await fetchText(state.indexPath);
      const paths = parseIndex(state.indexText);

      state.files = { index: { path: state.indexPath, text: state.indexText, error: null } };
      state.groups = { goalMaps: [] };

      for (const [key, path] of Object.entries({
        previousYear: paths.previousYear,
        year: paths.year,
        period: paths.period,
        week: paths.week,
        day: paths.day,
        deferredWork: paths.deferredWork,
        deferredIdeas: paths.deferredIdeas
      })) {
        const loaded = await loadOptional(path);
        if (loaded) state.files[key] = loaded;
      }

      for (const path of paths.goalMaps || []) {
        const loaded = await loadOptional(path);
        if (loaded) state.groups.goalMaps.push(loaded);
      }

      render();
    } catch (error) {
      body.innerHTML = '';
      body.appendChild(el('div', { class: 'obs-pd-error', text:
        `Could not load dashboard index.\n\n${error.message}\n\nCheck:\n1. Run: python -m http.server 8765 from repo root.\n2. Confirm base URL and index path.\n3. Confirm planning/dashboard/index.md exists.`
      }));
    }
  }

  function tabDefinitions() {
    return [
      ['index', 'Index', 'file'],
      ['previousYear', 'Previous Year', 'file'],
      ['year', 'Year', 'file'],
      ['period', 'Period', 'file'],
      ['week', 'Week', 'file'],
      ['day', 'Day', 'file'],
      ['goalMaps', 'Goal Maps', 'group'],
      ['deferredWork', 'Deferred Work', 'file'],
      ['deferredIdeas', 'Deferred Ideas', 'file']
    ].filter(([key, , kind]) => kind === 'group' ? (state.groups[key] || []).length : state.files[key]);
  }

  function renderLoadedFile(body, file) {
    if (file.error) {
      body.appendChild(el('div', { class: 'obs-pd-error', text: `Could not load:\n${file.path}\n\n${file.error}` }));
    } else {
      body.appendChild(renderMarkdownSummary(file.path, file.text));
    }
  }

  function render() {
    const tabs = document.querySelector('#obs-planning-dashboard-tabs');
    const body = document.querySelector('#obs-planning-dashboard-body');
    tabs.innerHTML = '';
    body.innerHTML = '';

    const defs = tabDefinitions();
    if (!defs.some(([key]) => key === state.activeTab)) state.activeTab = defs[0]?.[0] || 'index';

    for (const [key, label] of defs) {
      tabs.appendChild(el('button', {
        class: 'obs-pd-btn obs-pd-tab',
        'data-active': String(state.activeTab === key),
        text: label,
        onclick: () => { state.activeTab = key; render(); }
      }));
    }

    const group = state.groups[state.activeTab];
    if (group) {
      if (!group.length) {
        body.appendChild(el('div', { class: 'obs-pd-error', text: 'No files loaded for this group.' }));
      }
      for (const file of group) renderLoadedFile(body, file);
      return;
    }

    const file = state.files[state.activeTab];
    if (!file) {
      body.appendChild(el('div', { class: 'obs-pd-error', text: 'No file loaded.' }));
      return;
    }
    renderLoadedFile(body, file);
  }

  function activeFileOrGroupText() {
    const group = state.groups[state.activeTab];
    if (group && group.length) {
      return group.map((file) => `path: ${file.path}\n\n${file.error ? `LOAD ERROR: ${file.error}` : file.text}`).join('\n\n---\n\n');
    }
    const file = state.files[state.activeTab];
    if (!file) return '';
    return `path: ${file.path}\n\n${file.error ? `LOAD ERROR: ${file.error}` : file.text}`;
  }

  function copyUpdatePrompt() {
    const current = activeFileOrGroupText();
    if (!current) return;
    const prompt = [
      '[PLANNING_DASHBOARD_UPDATE]',
      'Update this local planning dashboard content using the Scenario Planning Workspace Template.',
      'Preserve source-of-truth boundaries.',
      'Do not invent user facts.',
      'Use not provided for unknown fields.',
      'Mark unclear work explicitly instead of treating it as progress.',
      '',
      'current_content:',
      '```markdown',
      current,
      '```',
      '[/PLANNING_DASHBOARD_UPDATE]'
    ].join('\n');
    navigator.clipboard.writeText(prompt).catch(() => {});
  }

  function openSourceUrl() {
    const file = state.files[state.activeTab] || (state.groups[state.activeTab] || [])[0];
    if (!file) return;
    const url = normalizeBaseUrl(state.baseUrl) + file.path.replace(/^\/+/, '');
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function buildUI() {
    if (document.querySelector('#obs-planning-dashboard-btn')) return;

    const button = el('button', { id: 'obs-planning-dashboard-btn', text: 'Planning' });
    const panel = el('div', { id: 'obs-planning-dashboard-panel' }, [
      el('div', { class: 'obs-pd-header' }, [
        el('div', { class: 'obs-pd-title', text: 'OBS Local Planning Dashboard' }),
        el('button', { class: 'obs-pd-btn', text: 'Refresh', onclick: refresh }),
        el('button', { class: 'obs-pd-btn', text: 'Open', onclick: openSourceUrl }),
        el('button', { class: 'obs-pd-btn', text: 'Copy AI prompt', onclick: copyUpdatePrompt }),
        el('button', { class: 'obs-pd-btn', text: 'x', onclick: () => panel.setAttribute('data-open', 'false') })
      ]),
      el('div', { class: 'obs-pd-settings' }, [
        el('label', { text: 'Base URL' }),
        el('input', { class: 'obs-pd-input', value: state.baseUrl, onchange: (event) => { state.baseUrl = event.target.value; } }),
        el('label', { text: 'Index' }),
        el('input', { class: 'obs-pd-input', value: state.indexPath, onchange: (event) => { state.indexPath = event.target.value; } })
      ]),
      el('div', { id: 'obs-planning-dashboard-tabs', class: 'obs-pd-tabs' }),
      el('div', { id: 'obs-planning-dashboard-body', class: 'obs-pd-body' })
    ]);

    button.addEventListener('click', async () => {
      const isOpen = panel.getAttribute('data-open') === 'true';
      panel.setAttribute('data-open', String(!isOpen));
      if (!isOpen && !state.indexText) await refresh();
    });

    document.body.appendChild(button);
    document.body.appendChild(panel);
  }

  buildUI();
})();
