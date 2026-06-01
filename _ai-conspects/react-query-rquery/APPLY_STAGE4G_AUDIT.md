# Apply archive: React Query existing transcripts boundary audit v001

Archive type: audit checkpoint.

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
C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage4g-existing-transcripts-audit-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-react-query-rquery-stage4g-existing-transcripts-audit-v001.zip"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat -- _ai-conspects/react-query-rquery

# Copy full diff to clipboard. Do not print it and do not open a pager.
git --no-pager diff -- _ai-conspects/react-query-rquery | Set-Clipboard
```

## Commit commands

```powershell
git add _ai-conspects/react-query-rquery
git commit -m "Audit React Query transcript boundaries"
git push origin ai-processed-conspects-text
```

## Notes

This archive does not fix the old transcripts. It records what must be corrected.

Next correction archive should be R05 v002.
