# Apply archive: HttpClient R06/R07 final config/handlers transcript v001

Archive type: stage-4 final combined transcript + coverage audit.

Target branch:

```text
ai-processed-conspects-text
```

Apply from repository root:

```powershell
PS C:\Users\alexa\obs>
```

## Expected download path

```powershell
C:\Users\alexa\Downloads\ai-conspects-httpclient,summary,theory,base usage,jsonoptions wrapper,handlers-stage4-r06r07-final-coverage-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-httpclient,summary,theory,base usage,jsonoptions wrapper,handlers-stage4-r06r07-final-coverage-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-httpclient-stage4-r06r07-final-coverage.diff"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

if ((git status --short -- _ai-conspects/httpclient,summary,theory,base usage,jsonoptions wrapper,handlers) -match '^\?\?') {
  git add -N -- _ai-conspects/httpclient,summary,theory,base usage,jsonoptions wrapper,handlers
}

git status --short
git diff --stat -- _ai-conspects/httpclient,summary,theory,base usage,jsonoptions wrapper,handlers

git --no-pager diff -- _ai-conspects/httpclient,summary,theory,base usage,jsonoptions wrapper,handlers > $diffPath
Get-Content $diffPath -Raw | Set-Clipboard
Write-Host "Full diff saved to $diffPath and copied to clipboard."
Write-Host "Clipboard length:" (Get-Content $diffPath -Raw).Length
```

## Commit commands

```powershell
git add _ai-conspects/httpclient,summary,theory,base usage,jsonoptions wrapper,handlers
git commit -m "Complete HttpClient config handlers coverage"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore -- _ai-conspects/httpclient,summary,theory,base usage,jsonoptions wrapper,handlers
```
