# Apply four-conspect near-literal correction v001

Target branch:

```text
ai-processed-conspects-text
```

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = Get-ChildItem `
    "$env:USERPROFILE\Downloads" `
    -Filter "ai-conspects-four-conspects-near-literal-correction-v001*.zip" |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 1

if (-not $zip) {
    throw "Correction archive not found in Downloads"
}

Expand-Archive `
    -LiteralPath $zip.FullName `
    -DestinationPath . `
    -Force

$targets = @(
    "_ai-conspects\valuetask",
    "_ai-conspects\hexadecimal base16 how  to convert to bytes easily",
    "_ai-conspects\statuscodepages",
    "_ai-conspects\base-mvc-razor-views-example-tempdata-viewdata-viewbag-cache-tag-helper"
)

git add -f -- `
    "_ai-conspects\valuetask\source\valuetask.svg" `
    "_ai-conspects\hexadecimal base16 how  to convert to bytes easily\source\hexadecimal base16 how  to convert to bytes easily.svg" `
    "_ai-conspects\statuscodepages\source\statuscodepages.svg" `
    "_ai-conspects\base-mvc-razor-views-example-tempdata-viewdata-viewbag-cache-tag-helper\source\base-mvc-razor-views-example-tempdata-viewdata-viewbag-cache-tag-helper.svg"

foreach ($target in $targets) {
    git add -A -- $target
}

git diff --cached --stat -- $targets
git diff --cached --name-status -- $targets

git commit -m "Complete four conspects near literal transcripts"
git push origin ai-processed-conspects-text
```

Expected:

```text
valuetask: 18 / 18
hexadecimal: 14 / 14 unique, 15 / 15 placements
statuscodepages: 12 / 12 + 77 native text lines
base MVC Razor: 43 / 43 (old package was 41)
all four: READY_NEAR_LITERAL_NORMALIZED
```
