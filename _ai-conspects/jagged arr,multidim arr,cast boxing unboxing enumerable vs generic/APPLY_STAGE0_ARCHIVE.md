# Apply combined Stage0 archive

Copy this single physical line into PowerShell and press Enter once:

```powershell
& { $ErrorActionPreference = "Stop"; Set-Location "C:\Users\alexa\obs"; git checkout ai-processed-conspects-text; $zip = (Resolve-Path (Join-Path $HOME "Downloads\ai-conspects-five-dotnet-react-typescript-stage0-v001.zip")).Path; $targets = @("_ai-conspects/expandoobject", "_ai-conspects/explicit interface inplementation", "_ai-conspects/react root error, trigger useeffect on route change", "_ai-conspects/jagged arr,multidim arr,cast boxing unboxing enumerable vs generic", "_ai-conspects/never type, exhaustion check with discriminated union"); Expand-Archive -LiteralPath $zip -DestinationPath . -Force; git add -A -- $targets; git status --short -- $targets; git commit -m "Add five .NET React and TypeScript conspect Stage0 inventories"; git push origin ai-processed-conspects-text }
```
