## Что такое `webServer approach`

`webServer` в Playwright config — это способ сказать Playwright:

> Перед запуском E2E-тестов сам запусти нужный dev/server process, дождись, пока он станет доступен по URL, потом запускай тесты.

Официальная документация описывает `webServer` именно как механизм запуска локального dev server перед тестами; можно указать `command`, `url`, `timeout`, `reuseExistingServer`, `stdout/stderr`. Также Playwright поддерживает **несколько web servers одновременно**, например frontend и backend.

Примерно так:
![[Pasted image 20260509213610.png]]
![[Pasted image 20260509213616.png]]

Суть: ты запускаешь не руками “сначала backend, потом frontend, потом npx playwright test”, а одной командой:

```
npx playwright test
```

Playwright сам поднимет приложения, дождётся доступности URL и потом пойдёт по сценариям.

## Как это отличается от ручного запуска

Ручной подход:

```
1. dotnet run backend2. npm run dev frontend3. npx playwright test
```

Проблемы:

```
- легко забыть запустить один сервер;- легко запустить не тот порт;- CI сложнее;- тесты зависят от состояния локальной машины;- менее воспроизводимо.
```

`webServer` approach:

```
1. npx playwright test2. Playwright запускает backend/frontend3. Playwright ждёт ready URLs4. Playwright запускает тесты5. Playwright завершает процессы после тестов
```

Для L1 это лучше, потому что E2E becomes reproducible.

### 2. Нужен способ reset/seed DB перед тестами

Вот это ключевой вопрос. Playwright проверяет реальные сценарии, но тебе всё равно нужна контролируемая база.

Варианты:

#### Вариант A — reset DB в setup project

Playwright рекомендует для setup/teardown использовать **project dependencies** как более интегрированный подход, чем `globalSetup`: setup-проект виден в HTML report, поддерживает traces и fixtures.

Можно сделать:

![[Pasted image 20260509213749.png]]
И в config:

![[Pasted image 20260509213805.png]]

#### Вариант B — test-only backend endpoint

Например:

```
POST /api/e2e/resetPOST /api/e2e/seed
```

Но только в `E2E` environment.

Плюсы:

```
- проще из Playwright;
- не надо подключаться к DB из Node;
- вся логика reset/seed в backend/.NET.
```

Минусы:

```
- нужно очень строго запретить эти endpoints вне E2E;
- надо не забыть покрыть env guard.
```

Для твоего проекта я бы выбрал **test-only endpoint или .NET CLI seed tool**, потому что DB у тебя SQL Server/EF, а из Node лезть в SQL Server ради reset-а будет менее удобно.

### 3. Frontend должен проксировать `/api` на E2E backend

Сейчас Vite уже проксирует `/api` на backend, судя по твоим прошлым логам. Для Playwright важно, чтобы:

```
frontend baseURL = https://localhost:5173frontend /api -> backend E2E URL
```

То есть backend и frontend должны договориться по портам.