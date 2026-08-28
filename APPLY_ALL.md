# Apply archive — four conspects source-fidelity/repeat update v001

Target branch:

```text
ai-processed-conspects-text
```

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-next-four-source-fidelity-v001.zip"

Expand-Archive -LiteralPath $zip -DestinationPath . -Force

git status --short -- `
  "_ai-conspects/headers" `
  "_ai-conspects/injecting into razor" `
  "_ai-conspects/httpcontext items and features" `
  "_ai-conspects/httpcontent,custom one, readasstream buffering, compression directly to network"

git add -A -- `
  "_ai-conspects/headers" `
  "_ai-conspects/injecting into razor" `
  "_ai-conspects/httpcontext items and features" `
  "_ai-conspects/httpcontent,custom one, readasstream buffering, compression directly to network"

git status --short -- `
  "_ai-conspects/headers" `
  "_ai-conspects/injecting into razor" `
  "_ai-conspects/httpcontext items and features" `
  "_ai-conspects/httpcontent,custom one, readasstream buffering, compression directly to network"

git diff --cached --stat

git commit -m "Improve four conspects source fidelity and repeat material"

git push origin ai-processed-conspects-text
```
