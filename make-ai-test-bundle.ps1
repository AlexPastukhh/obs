@'
$notePath = "Canvases/new theory/fw_React/Sheet/react query,rquery.md"

$ErrorActionPreference = "Stop"

Write-Host "Starting bundle for: $notePath"

if (-not (Test-Path $notePath)) {
  throw "MD not found: $notePath"
}

$svgPath = [System.IO.Path]::ChangeExtension($notePath, ".svg")

if (-not (Test-Path $svgPath)) {
  throw "SVG not found: $svgPath"
}

$noteBase = [System.IO.Path]::GetFileNameWithoutExtension($notePath)
$safeBase = $noteBase -replace '[\\/:*?"<>|]', '_'
$bundle = "_ai-test-bundles\$safeBase"

New-Item -ItemType Directory -Force $bundle | Out-Null
New-Item -ItemType Directory -Force "$bundle\images" | Out-Null

Copy-Item $notePath "$bundle\note.md" -Force
Copy-Item $svgPath "$bundle\full.svg" -Force

Write-Host "Copied note.md and full.svg"

$raw = Get-Content $notePath -Raw -Encoding UTF8

$textMatch = [regex]::Match($raw, '(?s)## Text Elements\s*(.*?)(?:\r?\n## Embedded Files|\r?\n%%|\z)')
if ($textMatch.Success) {
  $textMatch.Groups[1].Value.Trim() | Set-Content "$bundle\text-elements-raw.txt" -Encoding UTF8
}

$embeddedMatch = [regex]::Match($raw, '(?s)## Embedded Files\s*(.*?)(?:\r?\n%%|\r?\n## Drawing|\z)')
$embeddedSection = if ($embeddedMatch.Success) { $embeddedMatch.Groups[1].Value } else { "" }

$matches = [regex]::Matches($embeddedSection, '(?m)^\s*([^:\r\n]+):\s*!?\[\[([^\]]+)\]\]\s*$')

Write-Host "Embedded image links found: $($matches.Count)"

$imageExtRegex = '\.(png|jpg|jpeg|webp|gif|bmp)$'

Write-Host "Reading tracked image list from git..."
$allImages = git ls-files |
  Where-Object { $_ -match $imageExtRegex } |
  ForEach-Object {
    [pscustomobject]@{
      Path = $_
      Leaf = Split-Path $_ -Leaf
    }
  }

Write-Host "Tracked images found: $(@($allImages).Count)"

$rows = New-Object System.Collections.Generic.List[object]
$i = 0

foreach ($m in $matches) {
  $i++

  $fileId = $m.Groups[1].Value.Trim()
  $wiki = $m.Groups[2].Value.Trim()

  $target = (($wiki -split '\|')[0] -split '#')[0].Trim()
  $targetNorm = $target.Replace("\", "/")
  $leaf = Split-Path $targetNorm -Leaf

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
    $safeLeaf = $leaf -replace '[\\/:*?"<>|]', '_'
    $outName = "{0:D3}__{1}__{2}" -f $i, $shortId, $safeLeaf
    $outPath = "$bundle\images\$outName"

    Copy-Item $candidates[0].Path $outPath -Force
    $copiedAs = "images/$outName"

    Write-Host "Copied image $i/$($matches.Count): $leaf"
  }
  elseif ($candidates.Count -gt 1) {
    $status = "AMBIGUOUS"
    $resolved = ($candidates.Path -join " | ")
    Write-Host "AMBIGUOUS: $leaf"
  }
  else {
    $status = "NOT_FOUND"
    Write-Host "NOT_FOUND: $leaf"
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

$rows | Export-Csv "$bundle\image-index.csv" -NoTypeInformation -Encoding UTF8

$md = @()
$md += "# Image index"
$md += ""
$md += "Source note: $notePath"
$md += "Source SVG: $svgPath"
$md += ""
$md += "| # | fileId | original wikilink | status | copied image | resolved path |"
$md += "|---:|---|---|---|---|---|"

foreach ($r in $rows) {
  $md += "| $($r.Number) | `$($r.FileId)` | `$($r.WikiLink)` | $($r.Status) | `$($r.CopiedAs)` | `$($r.ResolvedPath)` |"
}

$md -join "`n" | Set-Content "$bundle\image-index.md" -Encoding UTF8

@"
# Task for AI

You are analyzing an Obsidian Excalidraw conspect.

Files:
- note.md: source Excalidraw markdown with text elements and embedded file IDs
- full.svg: visual map of the whole canvas
- image-index.md: mapping from Excalidraw fileId to copied image file
- images/: original embedded images copied from the vault

First do a spatial audit. Do not create study questions yet.

Required output:

1. Overall canvas structure
2. Region-by-region map
3. Image placement audit
4. Understanding check
"@ | Set-Content "$bundle\ai-prompt.md" -Encoding UTF8

Write-Host "Compressing bundle..."
Compress-Archive -Path "$bundle\*" -DestinationPath "$bundle.zip" -Force

Write-Host ""
Write-Host "Created bundle:"
Write-Host $bundle
Write-Host "$bundle.zip"
Write-Host "Images copied: $(@($rows | Where-Object Status -eq 'COPIED').Count) / $($rows.Count)"
Write-Host "Problems:"
$rows | Where-Object { $_.Status -ne "COPIED" } | Format-Table -AutoSize
'@ | Set-Content ".\make-ai-test-bundle-fast.ps1" -Encoding UTF8