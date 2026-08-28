# Apply all four conspect corrections

Archive:

```text
ai-conspects-four-conspects-source-fidelity-complete-v001.zip
```

Target branch:

```text
ai-processed-conspects-text
```

Run in PowerShell:

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text
git config core.longpaths true

$zip = "C:\Users\alexa\Downloads\ai-conspects-four-conspects-source-fidelity-complete-v001.zip"

# The conventions source-image set is rebuilt from the cleaned current SVG.
Remove-Item -LiteralPath "_ai-conspects\conventions\source\images" `
    -Recurse -Force -ErrorAction SilentlyContinue

Expand-Archive -LiteralPath $zip -DestinationPath . -Force

$targets = @(
    "_ai-conspects/conventions",
    "_ai-conspects/cors vs anti forgery",
    "_ai-conspects/CONCATENATE MULT ROWS AS AGGR,STUFF,STRING_AGG",
    "_ai-conspects/CONTAINS STARTSWITH ENDSWITH"
)

git status --short -- $targets
git add -A -- $targets
git status --short -- $targets

git commit -m "Complete four source-fidelity conspect transcripts"
git push origin ai-processed-conspects-text
```

Expected result:

```text
conventions:
  cleaned current source: 50 relevant screenshots
  2 unrelated SqlBulkCopy screenshots excluded
  final near-literal transcript and questions added

cors vs anti forgery:
  20/20 source-specific transcript
  code/examples/questions added

CONCATENATE MULT ROWS:
  4/4 transcript completed
  7/7 canvas text elements covered

CONTAINS STARTSWITH ENDSWITH:
  exact screenshot code restored
  inaccurate source comment separated from correction
```
