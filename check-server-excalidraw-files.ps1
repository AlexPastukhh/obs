param(
  [string]$NamesFile = "server-topic-names.txt",
  [string[]]$SearchRoots = @("Canvases/new theory"),
  [string]$ReportCsv = "server-topic-file-check.csv",
  [string]$TargetsFile = "server-excalidraw-export-targets.txt"
)

$ErrorActionPreference = "Stop"

function NormalizeName($s) {
  if ($null -eq $s) { return "" }
  return ($s.Trim() -replace '\s+', ' ')
}

function RemoveOuterQuotes($s) {
  $x = $s.Trim()
  if (($x.StartsWith('"') -and $x.EndsWith('"')) -or ($x.StartsWith("'") -and $x.EndsWith("'"))) {
    if ($x.Length -ge 2) { return $x.Substring(1, $x.Length - 2).Trim() }
  }
  return $x
}

if (-not (Test-Path -LiteralPath $NamesFile)) {
  throw "Names file not found: $NamesFile. Put server-topic-names.txt in repo root or pass -NamesFile."
}

$names = Get-Content -LiteralPath $NamesFile -Encoding UTF8 |
  ForEach-Object { NormalizeName $_ } |
  Where-Object { $_ -ne "" } |
  Select-Object -Unique

Write-Host "Names to check: $(@($names).Count)"
Write-Host "Search roots: $($SearchRoots -join ', ')"

$files = @(
  git ls-files |
    Where-Object {
      $p = $_
      if ($p -notmatch '\.md$') { return $false }
      foreach ($root in $SearchRoots) {
        $prefix = ($root.TrimEnd('/','\') -replace '\\','/')
        if ($p -like "$prefix/*") { return $true }
      }
      return $false
    } |
    ForEach-Object {
      $path = $_
      $leaf = ($path -split '/|\\')[-1]
      $base = if ($leaf.EndsWith(".md", [System.StringComparison]::OrdinalIgnoreCase)) {
        $leaf.Substring(0, $leaf.Length - 3)
      } else {
        $leaf
      }

      [pscustomobject]@{
        Name = $base
        NameNorm = NormalizeName $base
        NameNormNoOuterQuotes = NormalizeName (RemoveOuterQuotes $base)
        Path = $path
      }
    }
)

Write-Host "Candidate .md files: $($files.Count)"

$report = foreach ($name in $names) {
  $nameNorm = NormalizeName $name
  $nameNoOuterQuotes = NormalizeName (RemoveOuterQuotes $name)

  $exact = @($files | Where-Object { $_.Name -ceq $name })
  $normExact = @()
  $caseOnly = @()
  $quoteVariant = @()
  $contains = @()

  if ($exact.Count -eq 0) {
    $normExact = @($files | Where-Object { $_.NameNorm -ceq $nameNorm })
  }

  if ($exact.Count -eq 0 -and $normExact.Count -eq 0) {
    $caseOnly = @($files | Where-Object { $_.NameNorm -ieq $nameNorm })
  }

  if ($exact.Count -eq 0 -and $normExact.Count -eq 0 -and $caseOnly.Count -eq 0 -and $nameNoOuterQuotes -ne $nameNorm) {
    $quoteVariant = @($files | Where-Object { $_.NameNorm -ieq $nameNoOuterQuotes -or $_.NameNormNoOuterQuotes -ieq $nameNoOuterQuotes })
  }

  if ($exact.Count -eq 0 -and $normExact.Count -eq 0 -and $caseOnly.Count -eq 0 -and $quoteVariant.Count -eq 0) {
    # soft hint only; not a match
    $needle = $nameNoOuterQuotes.ToLowerInvariant()
    if ($needle.Length -ge 4) {
      $contains = @($files | Where-Object { $_.NameNorm.ToLowerInvariant().Contains($needle) -or $needle.Contains($_.NameNorm.ToLowerInvariant()) } | Select-Object -First 10)
    }
  }

  $status =
    if ($exact.Count -eq 1) { "FOUND" }
    elseif ($exact.Count -gt 1) { "AMBIGUOUS_EXACT" }
    elseif ($normExact.Count -eq 1) { "FOUND_NORMALIZED_SPACES" }
    elseif ($normExact.Count -gt 1) { "AMBIGUOUS_NORMALIZED_SPACES" }
    elseif ($caseOnly.Count -eq 1) { "CASE_MISMATCH" }
    elseif ($caseOnly.Count -gt 1) { "AMBIGUOUS_CASE_MISMATCH" }
    elseif ($quoteVariant.Count -eq 1) { "QUOTE_VARIANT_FOUND" }
    elseif ($quoteVariant.Count -gt 1) { "AMBIGUOUS_QUOTE_VARIANT" }
    else { "NOT_FOUND" }

  $matched =
    if ($exact.Count -gt 0) { $exact }
    elseif ($normExact.Count -gt 0) { $normExact }
    elseif ($caseOnly.Count -gt 0) { $caseOnly }
    elseif ($quoteVariant.Count -gt 0) { $quoteVariant }
    else { @() }

  [pscustomobject]@{
    Status = $status
    TopicName = $name
    MatchedPath = ($matched.Path -join " | ")
    PossiblePaths = ($contains.Path -join " | ")
  }
}

$report | Export-Csv -LiteralPath $ReportCsv -NoTypeInformation -Encoding UTF8

$targets = @(
  $report |
    Where-Object { $_.Status -in @("FOUND","FOUND_NORMALIZED_SPACES","QUOTE_VARIANT_FOUND") } |
    ForEach-Object { $_.MatchedPath }
) | Sort-Object -Unique

$targets | Set-Content -LiteralPath $TargetsFile -Encoding UTF8

"`nSummary:"
"TOTAL_NAMES: $($names.Count)"
"FOUND: $(@($report | Where-Object Status -eq 'FOUND').Count)"
"FOUND_NORMALIZED_SPACES: $(@($report | Where-Object Status -eq 'FOUND_NORMALIZED_SPACES').Count)"
"QUOTE_VARIANT_FOUND: $(@($report | Where-Object Status -eq 'QUOTE_VARIANT_FOUND').Count)"
"AMBIGUOUS: $(@($report | Where-Object { $_.Status -like 'AMBIGUOUS*' }).Count)"
"CASE_MISMATCH: $(@($report | Where-Object Status -eq 'CASE_MISMATCH').Count)"
"NOT_FOUND: $(@($report | Where-Object Status -eq 'NOT_FOUND').Count)"
"TARGETS_WRITTEN: $($targets.Count)"
"`nWritten:"
$ReportCsv
$TargetsFile
"`nProblems:"
$report | Where-Object { $_.Status -notin @("FOUND","FOUND_NORMALIZED_SPACES","QUOTE_VARIANT_FOUND") } | Format-Table -AutoSize
