# Apply archive: Binding Source Attributes Stage 1

Archive type: stage-1 bundle map and region scaffold.

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
C:\Users\alexa\Downloads\ai-conspects-binding-source-attributes-stage1-bundle-map-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-binding-source-attributes-stage1-bundle-map-v001.zip"

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat -- _ai-conspects/binding-source-attributes

# Copy full diff to clipboard. Do not print it and do not open a pager.
git --no-pager diff -- _ai-conspects/binding-source-attributes | Set-Clipboard
```

## Optional: save full diff to file

```powershell
git --no-pager diff -- _ai-conspects/binding-source-attributes > C:\Users\alexa\Downloads\ai-conspects-last-diff.patch
```

## Commit commands

```powershell
git add _ai-conspects/binding-source-attributes
git commit -m "Map Binding Source Attributes source bundle"
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

This archive does not edit React Query output.

It does not mark screenshots as verified. The next archive should visually inspect the three copied images and add exact transcript.
