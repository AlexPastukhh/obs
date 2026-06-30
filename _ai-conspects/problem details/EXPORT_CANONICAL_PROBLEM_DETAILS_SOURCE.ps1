param(
    [string]$RepoRoot = (Get-Location).Path,
    [string]$OutputZip = (
        Join-Path $HOME
        "Downloads\problem-details-canonical-source-export.zip"
    )
)

$ErrorActionPreference = "Stop"

$target = Join-Path `
    $RepoRoot `
    "_ai-conspects\problem details"

if (-not (Test-Path -LiteralPath $target)) {
    throw "Target folder not found: $target"
}

$images = Join-Path $target "source\images"
$sourceSvg = Join-Path $target "source\problem details.svg"
$imageLedger = Join-Path `
    $target `
    "data\image-uses-stage4-v001.csv"
$textLedger = Join-Path `
    $target `
    "data\svg-text-nodes-stage4-v001.csv"
$regionPlan = Join-Path `
    $target `
    "data\region-plan-stage4-v001.json"

if (-not (Test-Path -LiteralPath $images)) {
    throw "Canonical source/images folder not found: $images"
}

$imageFiles = @(
    Get-ChildItem `
        -LiteralPath $images `
        -File `
        -Filter "S-*.png"
)

if ($imageFiles.Count -ne 86) {
    Write-Warning (
        "Expected 86 physical S-*.png files; found " +
        $imageFiles.Count
    )
}

$uniqueHashes = @(
    $imageFiles |
        Get-FileHash -Algorithm SHA256 |
        Select-Object -ExpandProperty Hash -Unique
)

if ($uniqueHashes.Count -ne 77) {
    Write-Warning (
        "Expected 77 unique PNG contents; found " +
        $uniqueHashes.Count
    )
}

if (Test-Path -LiteralPath $imageLedger) {
    $imageRows = @(
        Import-Csv -LiteralPath $imageLedger
    )

    if ($imageRows.Count -ne 86) {
        Write-Warning (
            "Expected 86 image-ledger rows; found " +
            $imageRows.Count
        )
    }
}

if (Test-Path -LiteralPath $textLedger) {
    $textRows = @(
        Import-Csv -LiteralPath $textLedger
    )

    if ($textRows.Count -ne 118) {
        Write-Warning (
            "Expected 118 text-ledger rows; found " +
            $textRows.Count
        )
    }
}

$stage = Join-Path `
    ([System.IO.Path]::GetTempPath()) `
    ("problem-details-export-" + [guid]::NewGuid())

New-Item -ItemType Directory -Path $stage |
    Out-Null

try {
    $sourceStage = Join-Path $stage "source"
    $dataStage = Join-Path $stage "data"
    $regionsStage = Join-Path $stage "regions"

    New-Item `
        -ItemType Directory `
        -Path $sourceStage, $dataStage, $regionsStage |
        Out-Null

    Copy-Item `
        -LiteralPath $images `
        -Destination $sourceStage `
        -Recurse

    if (Test-Path -LiteralPath $sourceSvg) {
        Copy-Item `
            -LiteralPath $sourceSvg `
            -Destination $sourceStage
    }

    foreach ($file in @(
        $imageLedger,
        $textLedger,
        $regionPlan,
        (Join-Path $target `
            "data\image-review-ledger-stage4-v001.json"),
        (Join-Path $target `
            "data\duplicate-image-use-groups-stage4-v001.json"),
        (Join-Path $target `
            "CURRENT_SOURCE_OF_TRUTH.md"),
        (Join-Path $target `
            "04-stage4-complete-svg-reconciliation.md")
    )) {
        if (Test-Path -LiteralPath $file) {
            Copy-Item `
                -LiteralPath $file `
                -Destination $dataStage
        }
    }

    $regions = Join-Path $target "regions"

    if (Test-Path -LiteralPath $regions) {
        Copy-Item `
            -LiteralPath (Join-Path $regions "*.md") `
            -Destination $regionsStage
    }

    $manifest = [ordered]@{
        generated_utc = (
            Get-Date
        ).ToUniversalTime().ToString("o")
        physical_png_files = $imageFiles.Count
        unique_png_sha256 = $uniqueHashes.Count
        expected_physical_png_files = 86
        expected_unique_png_contents = 77
        source_svg_included = (
            Test-Path -LiteralPath $sourceSvg
        )
        source_folder = $target
    }

    $manifest |
        ConvertTo-Json -Depth 5 |
        Set-Content `
            -LiteralPath (
                Join-Path $stage "EXPORT_MANIFEST.json"
            ) `
            -Encoding UTF8

    if (Test-Path -LiteralPath $OutputZip) {
        Remove-Item `
            -LiteralPath $OutputZip `
            -Force
    }

    Compress-Archive `
        -LiteralPath (Join-Path $stage "*") `
        -DestinationPath $OutputZip `
        -CompressionLevel Optimal

    Write-Host ""
    Write-Host "Created:"
    Write-Host $OutputZip
    Write-Host ""
    Write-Host (
        "Physical PNG files: " +
        $imageFiles.Count
    )
    Write-Host (
        "Unique PNG contents: " +
        $uniqueHashes.Count
    )
    Write-Host (
        "Canonical SVG included: " +
        (Test-Path -LiteralPath $sourceSvg)
    )
}
finally {
    if (Test-Path -LiteralPath $stage) {
        Remove-Item `
            -LiteralPath $stage `
            -Recurse `
            -Force
    }
}
