# Apply Google reCAPTCHA transcript correction v003

Target branch:

```text
ai-processed-conspects-text
```

## Complete PowerShell application

```powershell
$ErrorActionPreference = "Stop"

function Run-Git {
    param(
        [Parameter(ValueFromRemainingArguments = $true)]
        [string[]] $GitArgs
    )

    & git @GitArgs

    if ($LASTEXITCODE -ne 0) {
        throw "Git command failed: git $($GitArgs -join ' ')"
    }
}

$repo = "C:\Users\alexa\obs"
$zip = "C:\Users\alexa\Downloads\ai-conspects-google-recaptcha-corrected-v003.zip"
$temp = Join-Path $env:TEMP "ai-conspects-google-recaptcha-v003"
$targetPath = "_ai-conspects/google recapcha and recapchas"

Set-Location -LiteralPath $repo

$alreadyStaged = @(git diff --cached --name-only)
if ($alreadyStaged.Count -gt 0) {
    $alreadyStaged | ForEach-Object { Write-Host $_ }
    throw "Staging area is not empty."
}

Run-Git checkout ai-processed-conspects-text
Run-Git pull --ff-only origin ai-processed-conspects-text

if (Test-Path -LiteralPath $temp) {
    Remove-Item -LiteralPath $temp -Recurse -Force
}

Expand-Archive -LiteralPath $zip -DestinationPath $temp -Force

$from = Join-Path $temp "_ai-conspects\google recapcha and recapchas"
$to = Join-Path $repo "_ai-conspects\google recapcha and recapchas"

New-Item -ItemType Directory -Path $to -Force | Out-Null

Copy-Item `
    -Path (Join-Path $from "*") `
    -Destination $to `
    -Recurse `
    -Force

Run-Git add -A -- $targetPath

$staged = @(git diff --cached --name-only)
$unexpected = @(
    $staged | Where-Object {
        $_ -notlike "$targetPath/*"
    }
)

if ($unexpected.Count -gt 0) {
    $unexpected | ForEach-Object { Write-Host $_ }
    throw "Unrelated files are staged."
}

Run-Git diff --cached --name-status
Run-Git diff --cached --stat

Run-Git commit -m "Add source-preserving Google reCAPTCHA transcript"
Run-Git push origin ai-processed-conspects-text

Run-Git status --short -- $targetPath

Remove-Item -LiteralPath $temp -Recurse -Force
```

Do not use `git add .` because unrelated working-tree changes may exist.
