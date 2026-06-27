# Apply supplemental screenshot final coverage archive

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-OIDC-OAUTH-IDENTITY-SERVER-BFF-supplemental-screenshots-stage1-final-coverage-v001.zip"
$target = "_ai-conspects\OIDC,OAUTH, IDENTITY SERVER,BFF,authtoken, authproperties"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $target
git status --short -- $target
```
