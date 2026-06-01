# Apply archive: BINDING SOURCE ATTRIBUTES stage0 source check

Archive type: per-conspect source-check archive.

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
C:\Users\alexa\Downloads\ai-conspects-binding-source-attributes-stage0-source-check-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-binding-source-attributes-stage0-source-check-v001.zip"

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat -- _ai-conspects/binding-source-attributes

# Copy full diff to clipboard. Do not print it and do not open a pager.
git --no-pager diff -- _ai-conspects/binding-source-attributes | Set-Clipboard
```

## Optional: save full diff to file

```powershell
git --no-pager diff -- _ai-conspects/binding-source-attributes > C:\Users\alexa\Downloads\binding-source-attributes-last-diff.patch
```

## Commit commands

```powershell
git add _ai-conspects/binding-source-attributes
git commit -m "Start Binding Source Attributes conspect processing"
```

## Push command

```powershell
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore -- _ai-conspects/binding-source-attributes
```

## Notes

This archive works only inside:

```text
_ai-conspects/binding-source-attributes/
```

It does not touch:

```text
_ai-conspects/react-query-rquery/
```
