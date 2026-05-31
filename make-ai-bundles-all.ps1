param(
  [string]$TargetsFile = "excalidraw-export-targets.txt",
  [string]$OutputRoot = "_ai-test-bundles",
  [int]$Limit = 0,
  [switch]$SkipExisting
)

$ErrorActionPreference = "Stop"

function Say($msg) {
  Write-Host ("[{0}] {1}" -f (Get-Date -Format "HH:mm:ss"), $msg)
}

function SafeNameFromPath($path) {
  $s = $path -replace '^Canvases/new theory/', ''
  $s = $s -replace '\.md$', ''
  $s = $s -replace '[\\/:*?"<>|]', '__'
  return $s
}

function ShortSafeLeaf($leaf) {
  $safe = $leaf -replace '[\\/:*?"<>|]', '_'
  $ext = [System.IO.Path]::GetExtension($safe)
  $base = [System.IO.Path]::GetFileNameWithoutExtension($safe)

  if ($base.Length -gt 90) {
    $base = $base.Substring(0, 90)
  }

  return "$base$ext"
}

if (-not (Test-Path -LiteralPath $TargetsFile)) {
  throw "Targets file not found: $TargetsFile"
}

New-Item -ItemType Directory -Force -Path $OutputRoot | Out-Null

Say "Reading targets: $TargetsFile"

$targets = Get-Content -LiteralPath $TargetsFile -Encoding UTF8 |
  ForEach-Object { $_.Trim() } |
  Where-Object { $_ -ne "" } |
  Select-Object -Unique

if ($Limit -gt 0) {
  $targets = @($targets | Select-Object -First $Limit)
}

Say "Targets to process: $(@($targets).Count)"

Say "Reading tracked image list from git..."
$gitFiles = @(git ls-files)
if ($LASTEXITCODE -ne 0) {
  throw "git ls-files failed. Run from repo root."
}

$imageExtRegex = '\.(png|jpg|jpeg|webp|gif|bmp)$'

$allImages = @(
  $gitFiles |
    Where-Object { $_ -match $imageExtRegex } |
    ForEach-Object {
      [pscustomobject]@{
        Path = $_
        Leaf = ($_ -split '/|\\')[-1]
      }
    }
)

Say "Tracked images found: $($allImages.Count)"

$summary = New-Object System.Collections.Generic.List[object]
$processed = 0

foreach ($notePath in $targets) {
  $processed++

  $safeBase = SafeNameFromPath $notePath
  $bundle = Join-Path $OutputRoot $safeBase

  Say "[$processed/$(@($targets).Count)] $notePath"

  if ($SkipExisting -and (Test-Path -LiteralPath $bundle)) {
    Say "  skipped existing: $bundle"
    $summary.Add([pscustomobject]@{
      NotePath = $notePath
      Bundle = $bundle
      Status = "SKIPPED_EXISTING"
      ImagesTotal = 0
      ImagesCopied = 0
      Problems = 0
    })
    continue
  }

  if (-not (Test-Path -LiteralPath $notePath)) {
    Say "  ERROR: note not found"
    $summary.Add([pscustomobject]@{
      NotePath = $notePath
      Bundle = $bundle
      Status = "NOTE_NOT_FOUND"
      ImagesTotal = 0
      ImagesCopied = 0
      Problems = 1
    })
    continue
  }

  $svgPath = [System.IO.Path]::ChangeExtension($notePath, ".svg")

  if (-not (Test-Path -LiteralPath $svgPath)) {
    Say "  ERROR: svg not found"
    $summary.Add([pscustomobject]@{
      NotePath = $notePath
      Bundle = $bundle
      Status = "SVG_NOT_FOUND"
      ImagesTotal = 0
      ImagesCopied = 0
      Problems = 1
    })
    continue
  }

  New-Item -ItemType Directory -Force -Path $bundle | Out-Null
  New-Item -ItemType Directory -Force -Path (Join-Path $bundle "images") | Out-Null

  Copy-Item -LiteralPath $notePath -Destination (Join-Path $bundle "note.md") -Force
  Copy-Item -LiteralPath $svgPath -Destination (Join-Path $bundle "full.svg") -Force

  $raw = Get-Content -LiteralPath $notePath -Raw -Encoding UTF8

  $textMatch = [regex]::Match($raw, '(?s)## Text Elements\s*(.*?)(?:\r?\n## Embedded Files|\r?\n%%|\z)')
  if ($textMatch.Success) {
    $textMatch.Groups[1].Value.Trim() |
      Set-Content -LiteralPath (Join-Path $bundle "text-elements-raw.txt") -Encoding UTF8
  }

  $embeddedMatch = [regex]::Match($raw, '(?s)## Embedded Files\s*(.*?)(?:\r?\n%%|\r?\n## Drawing|\z)')
  $embeddedSection = if ($embeddedMatch.Success) { $embeddedMatch.Groups[1].Value } else { "" }

  $matches = [regex]::Matches($embeddedSection, '(?m)^\s*([^:\r\n]+):\s*!?\[\[([^\]]+)\]\]\s*$')

  $rows = New-Object System.Collections.Generic.List[object]
  $i = 0

  foreach ($m in $matches) {
    $i++

    $fileId = $m.Groups[1].Value.Trim()
    $wiki = $m.Groups[2].Value.Trim()

    $target = (($wiki -split '\|')[0] -split '#')[0].Trim()
    $targetNorm = $target.Replace("\", "/")
    $leaf = ($targetNorm -split '/')[-1]

    $candidates = @()

    if ($targetNorm.Contains("/")) {
      $candidates = @($allImages | Where-Object { $_.Path -ieq $targetNorm })
    }

    if ($candidates.Count -eq 0) {
      $candidates = @($allImages | Where-Object { $_.Leaf -ieq $leaf })
    }

    $status = ""
    $resolved = ""
    $copiedAs = ""

    if ($candidates.Count -eq 1) {
      $status = "COPIED"
      $resolved = $candidates[0].Path

      $shortId = if ($fileId.Length -gt 10) { $fileId.Substring(0, 10) } else { $fileId }
      $safeLeaf = ShortSafeLeaf $leaf
      $outName = "{0:D3}__{1}__{2}" -f $i, $shortId, $safeLeaf
      $outPath = Join-Path (Join-Path $bundle "images") $outName

      Copy-Item -LiteralPath $candidates[0].Path -Destination $outPath -Force
      $copiedAs = "images/$outName"
    }
    elseif ($candidates.Count -gt 1) {
      $status = "AMBIGUOUS"
      $resolved = ($candidates.Path -join " | ")
    }
    else {
      $status = "NOT_FOUND"
    }

    $rows.Add([pscustomobject]@{
      Number = $i
      FileId = $fileId
      WikiLink = $wiki
      TargetName = $target
      Status = $status
      ResolvedPath = $resolved
      CopiedAs = $copiedAs
    })
  }

  $rows | Export-Csv -LiteralPath (Join-Path $bundle "image-index.csv") -NoTypeInformation -Encoding UTF8

  $md = @()
  $md += "# Image index"
  $md += ""
  $md += "Source note: $notePath"
  $md += "Source SVG: $svgPath"
  $md += ""
  $md += "Use full.svg as the visual map. Use note.md for exact Excalidraw text and Embedded Files mapping."
  $md += ""
  $md += "| # | fileId | original wikilink | status | copied image | resolved path |"
  $md += "|---:|---|---|---|---|---|"

  foreach ($r in $rows) {
    $md += "| $($r.Number) | `$($r.FileId)` | `$($r.WikiLink)` | $($r.Status) | `$($r.CopiedAs)` | `$($r.ResolvedPath)` |"
  }

  $md -join "`n" | Set-Content -LiteralPath (Join-Path $bundle "image-index.md") -Encoding UTF8

@"
# Task for AI

You are analyzing an Obsidian Excalidraw conspect.

Repository:
AlexPastukhh/obs

Branch:
ai-processing-excalidraw-conspects

Source note:
$notePath

Files in this bundle:
- note.md
- full.svg
- text-elements-raw.txt
- image-index.md
- image-index.csv
- images/

Important context:
This conspect may be mostly screenshots plus short labels/captions. The labels are navigation/structure. The main knowledge may be inside screenshots.

Do not modify the repository.
Do not create, edit, delete, commit, or push files.
Only read/analyze existing files and answer in chat.

First do a spatial and semantic audit before generating questions.
"@ | Set-Content -LiteralPath (Join-Path $bundle "ai-prompt.md") -Encoding UTF8

  $copied = @($rows | Where-Object Status -eq "COPIED").Count
  $problems = @($rows | Where-Object Status -ne "COPIED").Count

  Say "  images copied: $copied / $($rows.Count); problems: $problems"

  $summary.Add([pscustomobject]@{
    NotePath = $notePath
    Bundle = $bundle
    Status = "OK"
    ImagesTotal = $rows.Count
    ImagesCopied = $copied
    Problems = $problems
  })
}

$summaryCsv = Join-Path $OutputRoot "bundles-index.csv"
$summaryMd = Join-Path $OutputRoot "bundles-index.md"

$summary | Export-Csv -LiteralPath $summaryCsv -NoTypeInformation -Encoding UTF8

$lines = @()
$lines += "# AI test bundles index"
$lines += ""
$lines += "| Status | Images | Problems | Note | Bundle |"
$lines += "|---|---:|---:|---|---|"

foreach ($s in $summary) {
  $lines += "| $($s.Status) | $($s.ImagesCopied)/$($s.ImagesTotal) | $($s.Problems) | `$($s.NotePath)` | `$($s.Bundle)` |"
}

$lines -join "`n" | Set-Content -LiteralPath $summaryMd -Encoding UTF8

Say "Done."
Say "Summary:"
Say $summaryCsv
Say $summaryMd
