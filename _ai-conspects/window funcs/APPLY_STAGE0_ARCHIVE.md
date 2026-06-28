# Apply combined Stage0 archive

Copy this single physical line into PowerShell and press Enter once:

```powershell
& { $ErrorActionPreference = "Stop"; Set-Location "C:\Users\alexa\obs"; git checkout ai-processed-conspects-text; $zip = (Resolve-Path (Join-Path $HOME "Downloads\ai-conspects-ten-js-ts-css-sql-testing-stage0-v001.zip")).Path; $targets = @("_ai-conspects/FLAT FLATMAP", "_ai-conspects/date", "_ai-conspects/usecontext", "_ai-conspects/window funcs", "_ai-conspects/symbol", "_ai-conspects/inline flags sharp", "_ai-conspects/viTst existance assert test", "_ai-conspects/typescript explicit type annotations vs satisfies", "_ai-conspects/CASE INSENS,collate", "_ai-conspects/flex item ,flex shrinking"); Expand-Archive -LiteralPath $zip -DestinationPath . -Force; git add -A -- $targets; git status --short -- $targets; git commit -m "Add ten JS TypeScript CSS SQL and testing Stage0 inventories"; git push origin ai-processed-conspects-text }
```
