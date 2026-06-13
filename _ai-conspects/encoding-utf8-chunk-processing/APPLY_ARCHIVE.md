# Apply archive: Encoding UTF8 Chunk Processing Stage2 transcript

Archive type: source-level semantic transcript.

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
C:\Users\alexa\Downloads\ai-conspects-encoding-utf8-chunk-processing-stage2-r02-transcript-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$target = "_ai-conspects\encoding-utf8-chunk-processing"
$zip = "C:\Users\alexa\Downloads\ai-conspects-encoding-utf8-chunk-processing-stage2-r02-transcript-v001.zip"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short

Expand-Archive -Path $zip -DestinationPath . -Force

# Stage ONLY this target folder.
git add -A -- $target

# Review staged file list/status.
git status --short -- $target
```

## Commit commands

```powershell
git commit -m "Add Encoding UTF8 Chunk Stage2 transcript"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- _ai-conspects/encoding-utf8-chunk-processing
git restore -- _ai-conspects/encoding-utf8-chunk-processing
git clean -fd -- _ai-conspects/encoding-utf8-chunk-processing
```

## Notes

This archive processes ENC-R02 and leaves no Encoding UTF8 Chunk transcript candidates pending. Next archive should be closure audit.
