<#
.SYNOPSIS
  Prepares a logo PNG for use in the nav: knocks out a white background,
  crops to the artwork, and scales it down.

.DESCRIPTION
  The source export has an opaque white background, which would show as a
  white rectangle against the site's tinted paper. Near-white pixels are made
  transparent, with a soft band so anti-aliased letter edges do not turn
  jagged. The result is then cropped to the remaining artwork and resized.

  ASCII only: PowerShell 5.1 reads .ps1 as ANSI unless the file has a BOM.

.EXAMPLE
  .\scripts\prep-logo.ps1 -Path public\images\logo.png -Height 220
#>
param(
  [Parameter(Mandatory = $true)][string]$Path,
  [int]$Height = 220,
  [int]$SolidBelow = 225,
  [int]$ClearAbove = 245
)

Add-Type -AssemblyName System.Drawing

$full = (Resolve-Path $Path).Path
$src = [System.Drawing.Bitmap]::FromFile($full)
$w = $src.Width
$h = $src.Height

$rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$data = $src.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$stride = $data.Stride
$bytes = New-Object byte[] ($stride * $h)
[System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)

$minX = $w; $minY = $h; $maxX = -1; $maxY = -1

for ($y = 0; $y -lt $h; $y++) {
  $row = $y * $stride
  for ($x = 0; $x -lt $w; $x++) {
    $i = $row + $x * 4
    $b = $bytes[$i]; $g = $bytes[$i + 1]; $r = $bytes[$i + 2]
    $mn = [Math]::Min($r, [Math]::Min($g, $b))

    if ($mn -ge $ClearAbove) {
      $alpha = 0
    } elseif ($mn -ge $SolidBelow) {
      # Soft band so anti-aliased edges stay smooth.
      $alpha = [int](255 * ($ClearAbove - $mn) / ($ClearAbove - $SolidBelow))
    } else {
      $alpha = 255
    }

    $bytes[$i + 3] = [byte]$alpha

    if ($alpha -gt 24) {
      if ($x -lt $minX) { $minX = $x }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }
}

[System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $data.Scan0, $bytes.Length)
$src.UnlockBits($data)

if ($maxX -lt 0) { Write-Host "No artwork found."; $src.Dispose(); exit 1 }

$cw = $maxX - $minX + 1
$ch = $maxY - $minY + 1

$scale = $Height / $ch
$outW = [int][Math]::Round($cw * $scale)
$outH = $Height

$dst = New-Object System.Drawing.Bitmap($outW, $outH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gfx = [System.Drawing.Graphics]::FromImage($dst)
$gfx.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gfx.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$gfx.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$gfx.Clear([System.Drawing.Color]::Transparent)
$srcRect = New-Object System.Drawing.Rectangle($minX, $minY, $cw, $ch)
$dstRect = New-Object System.Drawing.Rectangle(0, 0, $outW, $outH)
$gfx.DrawImage($src, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$gfx.Dispose()
$src.Dispose()

$dst.Save($full, [System.Drawing.Imaging.ImageFormat]::Png)
$dst.Dispose()

$kb = [math]::Round((Get-Item $full).Length / 1KB)
Write-Host "logo: ${w}x${h} -> cropped ${cw}x${ch} -> saved ${outW}x${outH} (${kb} KB), background transparent"
