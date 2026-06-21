# APPLY ARCHIVE - three conspects stage0 bundle v001

Target branch: `ai-processed-conspects-text`

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-three-websockets-imemorycache-jsonconverter-stage0-v001.zip"
$targets = @(
  "_ai-conspects\aspnetcore-websockets-client-browser-auth-subprotocols",
  "_ai-conspects\aspnetcore-imemorycache-expiration-invalidation-stampede",
  "_ai-conspects\dotnet-systemtextjson-jsonconverter-optional-activator",
  "_ai-conspects\_bundles\three-conspects-websockets-imemorycache-jsonconverter-stage0-v001"
)

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $targets

git status --short -- $targets
```

## Commit after review

```powershell
git commit -m "Start WebSockets IMemoryCache JsonConverter conspects"
git push origin ai-processed-conspects-text
```
