# Handoff: продолжение knowledge migration

Этот файл можно целиком передать новому чату. Он описывает не общую обработку заметок, а текущую production migration из source-preserving conspects в knowledge layer.

## Готовый стартовый промпт для нового чата

```text
Продолжай knowledge migration в репозитории AlexPastukhh/obs.

Локальный репозиторий: C:\Users\alexa\obs
Remote: https://github.com/AlexPastukhh/obs.git
Рабочая ветка: ai-processed-conspects-text

Перед любой работой полностью прочитай:
- _ai-conspects/KNOWLEDGE_LAYER_RULES.md
- _ai-conspects/CONSPECT_PROCESSING_RULES.md
- этот handoff-файл

Главная задача: постепенно переносить authoritative learning content из
_ai-conspects/<workspace>/ в независимые knowledge units под
_ai-conspects/_knowledge/, ничего содержательно не теряя.

Это semantic partition, а не summarization. Union knowledge units одного
workspace должен сохранять практически все meaningful learning claims,
причинные связи, caveats, failure modes, lifecycle, API mechanics,
performance details и representative examples authoritative source.

Обычный рабочий ритм: брать следующий явно запрошенный пользователем batch
(часто 10 небольших workspaces), каждый workspace проверять отдельно,
обновлять units, topic indexes и per-workspace KNOWLEDGE_REGISTRY.md,
проверять diff и копировать scoped cumulative diff в буфер для ревью.

Не коммить и не пушь автоматически. Делай commit/push только после явной
команды пользователя. Не трогай repetition layer и исходные source/evidence
файлы. Не добавляй знания от себя без source attribution.
```

## 1. Репозиторий и текущее состояние

```text
Repository: AlexPastukhh/obs
Local path: C:\Users\alexa\obs
Remote: https://github.com/AlexPastukhh/obs.git
Branch: ai-processed-conspects-text
```

Снимок на 2026-08-28 после последнего push:

```text
HEAD: 477a7ab6ffe69869d97c772062838fd29b66af32
Commit: Sync pending knowledge migrations and notes
Local HEAD == origin/ai-processed-conspects-text
Worktree был чистым до создания этого handoff-файла
```

Сначала всегда проверять реальное состояние:

```powershell
git status -sb
git branch --show-current
git remote -v
git log -5 --oneline --decorate
```

Репозиторий может содержать пользовательские изменения вне `_ai-conspects`. Они принадлежат пользователю. Не исправлять, не удалять и не включать их в scoped migration без прямого запроса.

## 2. Главные файлы правил

Перед продолжением обязательно полностью прочитать:

```text
_ai-conspects/KNOWLEDGE_LAYER_RULES.md
_ai-conspects/CONSPECT_PROCESSING_RULES.md
```

Если правила и этот handoff расходятся, актуальный `KNOWLEDGE_LAYER_RULES.md` имеет приоритет. Пользовательская команда имеет приоритет над обычным размером batch.

Основная работа сейчас — knowledge migration. Не путать её с первичной расшифровкой Excalidraw/SVG. Source-processing rules нужны для понимания provenance и статусов, но не дают права переписывать исходный workspace.

## 3. Архитектура данных

```text
source SVG / screenshots
    -> _ai-conspects/<workspace>/
       source-preserving transcript, regions, corrections, audits, evidence
    -> _ai-conspects/_knowledge/<topic>/<unit>.md
       independently reviewable knowledge unit
    -> _ai-conspects/_knowledge/<topic>/INDEX.md
       topic registry
    -> _ai-conspects/_knowledge/INDEX.md
       root list of topics only
```

В каждом мигрированном source workspace должен появиться:

```text
_ai-conspects/<workspace>/KNOWLEDGE_REGISTRY.md
```

Назначение слоёв:

- source workspace остаётся evidence/provenance layer и source of truth;
- knowledge unit — самостоятельная учебная единица;
- topic index — навигация по units одного topic;
- root index — только список topics;
- workspace registry — claim-level доказательство, куда ушло знание source.

Нельзя удалять, переименовывать или переписывать source SVG, transcript, regions, audit, manifest, screenshot/evidence files ради migration.

## 4. Главный инвариант качества

Knowledge migration — это смысловое разрезание authoritative content, не краткий пересказ.

Допустимые операции:

```text
CUT material по смыслу
MOVE в подходящий unit/topic
CONSOLIDATE только реальное повторение
REORDER для цельного объяснения
LIGHTLY NORMALIZE wording/formatting
```

Недопустимо:

- превращать богатый transcript в короткую summary-card;
- заменять механику списком названий API;
- удалять пример, если он показывает state/lifecycle/control flow/object shape/failure;
- переносить только основной тезис, теряя caveats и объяснение «почему»;
- делать правило `one region/heading -> one file`;
- дополнять source общими знаниями модели без отдельного authoritative source;
- считать короткий unit автоматически лучшим.

Unit может занимать 30, 80 или 150+ строк. Размер определяется смысловой границей и no-loss требованием.

Проверочная формула:

```text
authoritative source learning content
≈
union(all new and legitimately merged destination units)
```

Learner не должен возвращаться к полному transcript, чтобы восстановить существенный claim, limitation, failure mode, lifecycle step или уникальную механику примера.

## 5. Как выбирать следующий workspace или batch

Пользователь обычно говорит:

```text
след
след 10
след 10 небольших
```

Интерпретация:

- выбрать ещё не мигрированные workspaces;
- при запросе «небольших» сортировать кандидатов по объёму authoritative material, но не считать размер единственным критерием;
- брать только те, у которых физически разрешается trustworthy authoritative source;
- если source сложный, overlapping или unresolved, уменьшить batch и сказать об этом;
- batch не объединяет аудиты: каждый workspace проходит полный workflow отдельно.

Рабочий индикатор «ещё не мигрирован»:

```text
есть CURRENT_SOURCE_OF_TRUTH.md
нет KNOWLEDGE_REGISTRY.md
```

Это эвристика, не абсолютная истина. Нужно открыть `CURRENT_SOURCE_OF_TRUTH.md` и проверить, что названные authority-файлы реально существуют и завершены.

Снимок на момент создания handoff:

```text
верхнеуровневых workspace directories: 321
с KNOWLEDGE_REGISTRY.md: 267
с CURRENT_SOURCE_OF_TRUTH.md, но без KNOWLEDGE_REGISTRY.md: 48
```

Первые кандидаты по приблизительному объёму Markdown на этот момент:

```text
linq-join-groupjoin-groupby-selectmany-selectmany-second-callback
routing-route-params-tech-info-custom-constraints-router-matching
server-resources-multipleinstances-microservices
pipethrough,transformstream,pipeto,writablestream, readablestream
axios
Rhf react hook form
scopes and idisposable
hybrydcache
EXCEPTIONHANDLERS
working with bytes, streams to bytes, to array readexactly,readatleast
```

Перед использованием пересчитать кандидатов, потому что список быстро устаревает:

```powershell
$root = Resolve-Path '_ai-conspects'
$rows = foreach ($d in (Get-ChildItem -LiteralPath $root -Directory |
  Where-Object { $_.Name -notlike '_*' })) {
  $registry = Join-Path $d.FullName 'KNOWLEDGE_REGISTRY.md'
  $sot = Join-Path $d.FullName 'CURRENT_SOURCE_OF_TRUTH.md'
  if (-not (Test-Path -LiteralPath $registry) -and (Test-Path -LiteralPath $sot)) {
    $md = Get-ChildItem -LiteralPath $d.FullName -File -Recurse -Filter '*.md'
    $lines = ($md | Get-Content -ErrorAction SilentlyContinue |
      Measure-Object -Line).Lines
    [pscustomobject]@{ Name = $d.Name; MdFiles = $md.Count; Lines = $lines }
  }
}
$rows | Sort-Object Lines, Name | Format-Table -AutoSize
```

Не выбирать `_knowledge`, `_batches`, `_bundles`, временные каталоги и другие служебные директории как source workspace.

## 6. Workflow для каждого workspace

### Шаг 1. Разрешить authority chain

Открыть:

```text
_ai-conspects/<workspace>/CURRENT_SOURCE_OF_TRUTH.md
```

Затем проверить каждый названный authoritative transcript, region, technical correction и audit:

```powershell
Test-Path -LiteralPath '<exact path>'
Get-Content -LiteralPath '<exact path>' -Raw
```

Не доверять только тексту `CURRENT_SOURCE_OF_TRUTH.md`: в прошлых batch встречались ссылки на отсутствующие reconstructed/final transcripts. Нельзя ставить `UNRESOLVED = 0`, если authority chain физически не резолвится.

Если status file устарел, это нужно доказать существующими файлами и согласованно исправить status/provenance; одной фразы «status stale» в registry недостаточно.

Если source неполный, противоречивый или неподтверждённый:

- не угадывать;
- не переносить утверждение как verified knowledge;
- записать его как `UNRESOLVED` с причиной;
- либо сначала получить/восстановить authoritative source, если это входит в запрос.

### Шаг 2. Прочитать source целиком и составить claim inventory

До создания units выписать meaningful claims, включая:

- central models и distinctions;
- причинные цепочки и timelines;
- точные API names, options, defaults и return semantics;
- status codes, numeric mappings и concrete values;
- state transitions, ownership и cleanup;
- null/error/concurrency/security boundaries;
- performance/time/memory complexity;
- compatibility/provider/runtime caveats;
- representative examples и то, какую механику каждый доказывает;
- спорные, ошибочные или неоднозначные source statements.

Region/section — только ссылка на evidence. Coverage должна быть claim-level, особенно для богатых sections.

### Шаг 3. Найти overlaps до создания файлов

Искать по ID, словам и семантике во всех units/indexes:

```powershell
rg -n "<concept|API|candidate-id>" _ai-conspects/_knowledge
rg -n "Knowledge ID:" _ai-conspects/_knowledge
```

Решение:

- новый центральный model -> новый unit (`MAPPED`);
- тот же model уже существует -> дополнить существующий unit source-grounded content (`MERGED`);
- related, но самостоятельный model -> отдельный unit + `Related knowledge`;
- не создавать `concept-2` или numbered duplicate.

При `MERGED` фактически проверить body destination. Добавление одной Sources-строки не считается merge, если нового source claim там всё ещё нет. Registry не должен заявлять то, чего destination не учит.

### Шаг 4. Выбрать semantic boundaries и topics

Возможны все варианты:

```text
один source region -> один unit
несколько regions/sections -> один unit
один region -> несколько units
один workspace -> несколько topics
```

Topic определяется durable knowledge area, а не названием source. Примеры существующих topics:

```text
aspnet-core, architecture, css, dotnet, ef-core, http, javascript,
redux, redis, sql, sql-server, typescript, react, testing,
react-query, algorithms, security
```

Не создавать новый topic заранее «на будущее». Сначала искать подходящий существующий.

### Шаг 5. Создать или расширить knowledge units

Путь:

```text
_ai-conspects/_knowledge/<topic>/<semantic-file-name>.md
```

Минимальный contract:

```md
# Human-readable title

Knowledge ID: `<topic>.<stable-semantic-name>`

Topic: `<topic>`

## <coherent learning sections>

...source-preserving explanation and representative mechanics...

## What should be recallable

- ...

## Related knowledge

- `other.topic-id` when useful

## Sources

- Workspace: `_ai-conspects/<workspace>/`
- Authoritative processed source: `<exact file and exact regions/sections>`
- Original SVG: `<path only when reliably established>`
```

Требования:

- Knowledge ID lowercase, unique, stable и не зависит от R01/heading/file location;
- filename согласован с semantic part ID;
- unit понятен самостоятельно;
- каждый recall item полностью отвечается body этого же unit;
- Sources range точный: не пропускать использованный region и не включать лишний;
- cross-source addition допустим только с отдельной provenance entry;
- если существующий unit расширен новым workspace, добавить этот workspace в Sources.

### Шаг 6. Создать claim-level KNOWLEDGE_REGISTRY.md

Путь:

```text
_ai-conspects/<workspace>/KNOWLEDGE_REGISTRY.md
```

Обязательные поля:

```md
# Knowledge Registry

Source workspace: `_ai-conspects/<workspace>/`

Authoritative processed sources: `<exact physical files>`

Original SVG: `<reliable path>`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| <concrete verifiable claims> | `<id>` | `<topic>` | `../_knowledge/...md` | MAPPED |

## Boundary decisions

- ...

| Status | Count |
|---|---:|
| MAPPED | ... |
| MERGED | ... |
| NON_LEARNING | ... |
| UNRESOLVED | ... |
```

Статусы:

```text
MAPPED       новый unit
MERGED       реально внесено/уже полно присутствует в существующем unit
NON_LEARNING processing/evidence/audit metadata, не учебный material
UNRESOLVED   meaningful claim нельзя безопасно классифицировать/перенести
```

Правила registry:

- обязательно указывать topic и destination file;
- строки должны перечислять concrete content, а не просто «R03 mapped»;
- одна строка допустима для closely related claims, если её можно проверить;
- counts должны арифметически совпадать со строками;
- любое сознательное исключение существенного claim фиксируется явно;
- disputed/incorrect/unsupported claim нельзя прятать в `NON_LEARNING`;
- `UNRESOLVED = 0` — результат аудита, не цель любой ценой;
- registry wording не должен overclaim examples/mechanics, отсутствующие в unit.

### Шаг 7. Обновить indexes

Для каждого затронутого topic обновить:

```text
_ai-conspects/_knowledge/<topic>/INDEX.md
```

Формат строки:

```md
| `<topic>.<id>` | Human title | [[file-name]] |
```

Даже при большом batch нельзя забывать topic registration. В прошлых ревью это была повторяющаяся структурная ошибка.

Root index:

```text
_ai-conspects/_knowledge/INDEX.md
```

обновляется только при появлении нового topic. Он не содержит все unit IDs.

Проверить, что:

- новый unit есть ровно в нужном topic index;
- новый topic имеет собственный `INDEX.md`;
- новый topic зарегистрирован в root index;
- ссылки и filenames физически разрешаются;
- нет duplicate Knowledge IDs.

## 7. Loss audit: что проверять особенно строго

Прошлые внешние ревью регулярно находили не ошибки taxonomy, а слишком сильную compression. Поэтому для каждого destination сравнить source и body claim-by-claim.

Обязательно сохранять, когда они есть в source:

1. **Causal explanations**
   - не только «делай X», но почему Y ломается;
   - например race, modulo bias, cache-key variance, stale closure, ownership failure.

2. **Integrated mechanics**
   - цепочки вида parse -> state update -> loop -> cleanup;
   - controller/query flow;
   - transport lifecycle;
   - code, где ценность в композиции нескольких API.

3. **Representative examples**
   - before/after output;
   - named groups/options/timeout;
   - state timeline;
   - two-copy algorithm;
   - concrete mask/subset mapping.

4. **Exact semantics**
   - return values;
   - numeric state/status mapping;
   - `O(1)` versus `O(n)`;
   - mutation versus copying;
   - null/default behavior;
   - option/property/method names;
   - header/status/media-type distinctions.

5. **Operational boundaries**
   - restarts and multi-instance persistence;
   - routing/proxy/browser/provider behavior;
   - cancellation and concurrent use;
   - storage lifetime and security tradeoffs.

6. **Decision rules**
   - когда выбирать A/B/C;
   - не заменять selection guide одним перечнем технологий.

Допустимо убрать duplicate example, только если другой сохранённый example действительно учит ту же механику. Если source-rich topic стал двумя абзацами prose без examples, это почти наверняка требует повторного аудита.

## 8. Source-purity и technical corrections

Не добавлять технически верные, но отсутствующие в authoritative source фразы «для полноты». Это уже cross-source expansion.

Если полезное утверждение пришло из другого source:

- добавить точную Sources entry;
- добавить registry mapping из того workspace;
- либо оформить отдельную authoritative technical correction;
- иначе убрать утверждение.

Не переносить source ошибку как истину. Возможные действия:

- сохранить historical source claim в source layer;
- использовать существующую authoritative correction;
- пометить claim `UNRESOLVED`;
- не исправлять его знаниями модели молча.

Проверять technical correctness формулировок. Даже source-preserving rewrite может случайно изменить смысл, например спутать inline storage struct с boxing или потерять `by reference` у `in`.

## 9. Проверки после batch

### Scope и clean-source check

До изменений сохранить список/статус, после — убедиться, что изменены только:

```text
new/extended knowledge units
affected topic INDEX.md files
root _knowledge/INDEX.md only for a new topic
selected workspaces' KNOWLEDGE_REGISTRY.md
explicitly required source/provenance corrections
```

Не менять source/evidence случайно.

### Duplicate IDs

```powershell
$ids = rg -o --no-filename 'Knowledge ID: `[^`]+`' _ai-conspects/_knowledge |
  ForEach-Object { $_ -replace '^Knowledge ID: `|`$','' }
$ids | Group-Object | Where-Object Count -gt 1
```

### Registry/status/encoding checks

```powershell
rg -n "UNRESOLVED|MAPPED|MERGED|NON_LEARNING" <selected workspace paths>
$badMarkers = @(('в' + 'Ђ'), ('пї' + 'Ѕ'), [string][char]0xFFFD)
Select-String -Path <changed files> -Pattern $badMarkers
git diff --check -- <scoped paths>
git status --short
git diff --stat -- <scoped paths>
```

Encoding scan делать по changed/scoped files: в старой истории repository уже встречается legacy mojibake, которое не относится к текущему batch. Новое повреждение punctuation недопустимо.

### Link/source resolution

Для каждого нового/изменённого unit и registry проверить:

- destination file существует;
- topic index содержит ID;
- Sources file существует;
- указанный region/section действительно содержит claim;
- recall contract полностью поддержан body;
- `MERGED` claim фактически присутствует.

### Финальный semantic pass

Для каждого workspace ответить:

```text
Какие source claims были?
Куда ушёл каждый claim?
Что было consolidated и почему это exact redundancy?
Есть ли intentional exclusion и записан ли он?
Может ли learner восстановить source learning content из union units?
```

## 10. Diff и внешний review workflow

Пользователь часто передаёт diff другому чату для strict no-loss review.

Не печатать огромный diff в консоль/чат. Копировать в Windows clipboard:

```powershell
git --no-pager diff -- <scoped paths> | Set-Clipboard
```

Если нужно всё незакоммиченное knowledge work:

```powershell
git --no-pager diff -- _ai-conspects | Set-Clipboard
```

Если изменения staged:

```powershell
git --no-pager diff --cached -- _ai-conspects | Set-Clipboard
```

Важно: untracked files обычный `git diff` не показывает. Перед копированием проверить `git status --short`. Для review новых untracked files можно сначала безопасно stage только scoped migration files, затем использовать `git diff --cached`; не stage чужие изменения.

Опционально сохранить patch:

```powershell
git --no-pager diff -- _ai-conspects > C:\Users\alexa\Downloads\ai-conspects-last-diff.patch
```

Обычный цикл:

```text
implement batch
-> local loss/structure checks
-> copy cumulative scoped diff to clipboard
-> user sends review from another chat
-> apply only source-supported corrections
-> copy updated cumulative diff again
-> repeat until PASS
-> commit/push only when explicitly asked
```

Review verdict не принимать механически. Проверить каждый comment против physical authoritative source и actual destination. Если review ошибается, показать конкретное evidence вместо слепой правки.

## 11. Commit и push workflow

Коммитить/пушить только по прямой команде пользователя, например:

```text
комит пуш
закомить и запушь всё
```

Перед commit:

```powershell
git status -sb
git diff --stat
git diff --check
git diff --cached --check
```

Обычный knowledge batch следует stage по scoped paths, чтобы не захватить unrelated user work:

```powershell
git add -- <explicit selected workspace registries> <knowledge units> <indexes>
git diff --cached --stat
git commit -m "Migrate next knowledge batch"
git push origin ai-processed-conspects-text
```

Если пользователь явно говорит «всё, что не закоммичено и не запушено», тогда сначала показать/оценить полный status и можно использовать `git add -A`, но только после понимания, что это действительно его намерение.

После push проверить:

```powershell
git status -sb
git rev-parse HEAD
git rev-parse origin/ai-processed-conspects-text
git rev-list --left-right --count origin/ai-processed-conspects-text...HEAD
```

Ожидаемый финал:

```text
worktree clean
local HEAD == remote branch HEAD
ahead/behind = 0/0
```

Не делать force-push, reset, checkout чужих файлов или destructive cleanup без прямого разрешения.

## 12. Как отвечать пользователю

Пользователь предпочитает короткие ответы на русском.

Во время длинной работы давать компактные статусы, особенно если команда выполняется больше минуты. В финале сообщать результат, а не длинный процесс.

После migration batch полезно сообщить:

```text
- какие workspaces обработаны;
- сколько units создано/расширено;
- какие topics затронуты;
- unresolved count;
- что source/evidence не менялись;
- что diff скопирован в буфер, если это было запрошено;
- что commit/push не выполнялся без команды.
```

После commit/push:

```text
- commit hash/message;
- branch;
- push result;
- clean/synchronized status.
```

## 13. Короткий completion checklist

```text
[ ] Прочитаны оба rule-файла.
[ ] Branch/status проверены; unrelated changes сохранены.
[ ] Каждый selected workspace имеет физически доступный authority chain.
[ ] Source прочитан целиком; meaningful claims инвентаризированы.
[ ] Existing units/topics проверены на duplicate/overlap.
[ ] Boundaries выбраны по смыслу, не по headings.
[ ] Units сохраняют causes, caveats, mechanics, examples и tradeoffs.
[ ] Нет несourced model additions.
[ ] Recall items полностью отвечаются body.
[ ] Sources exact и физически разрешаются.
[ ] У каждого workspace claim-level KNOWLEDGE_REGISTRY.md.
[ ] MAPPED/MERGED/NON_LEARNING/UNRESOLVED честны; counts сходятся.
[ ] Все affected topic indexes обновлены.
[ ] Root index обновлён только при новом topic.
[ ] Knowledge IDs уникальны; links разрешаются.
[ ] Source/evidence и repetition layer не изменены.
[ ] Scoped diff прошёл loss audit, diff check и encoding check.
[ ] Diff скопирован в clipboard, если пользователь просил review.
[ ] Commit/push выполнены только по явной команде.
```

## 14. Самая важная установка

Не оптимизировать эту работу под количество закрытых workspaces. Оптимизировать её под проверяемое сохранение знания.

```text
source structure != knowledge structure
batch size != ослабление аудита
registry row != доказательство без содержимого destination
короткий unit != хороший unit
технически верная фраза != source-grounded фраза
```

Если приходится выбирать между компактностью и сохранением meaningful learning content, выбирать сохранение content.
