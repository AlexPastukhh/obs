# Apply archive: Cookies general theory / plain cookie options final coverage transcript v001

Archive type: stage-1 final coverage transcript.

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
C:\Users\alexa\Downloads\ai-conspects-cookies-general-theory-plain-cookie-options-samesite-secure-httponly-stage1-r01r02r03-final-coverage-v001.zip
```

## Apply + stage commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-cookies-general-theory-plain-cookie-options-samesite-secure-httponly-stage1-r01r02r03-final-coverage-v001.zip"
$target = "_ai-conspects\cookies-general-theory-plain-cookie-options-samesite-secure-httponly"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $target

git status --short -- $target
```

## Commit commands after review

```powershell
git commit -m "Complete cookies conspect final coverage"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- _ai-conspects\cookies-general-theory-plain-cookie-options-samesite-secure-httponly
git restore -- _ai-conspects\cookies-general-theory-plain-cookie-options-samesite-secure-httponly
```
