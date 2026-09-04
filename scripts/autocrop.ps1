<#
.SYNOPSIS
  Trims flat background margins off a PNG, keeping all real content.

.DESCRIPTION
  Scans for pixels that differ from the light background - either dark enough
  (the model, black outlines) or saturated enough (blue axis labels, orange
  splines) - and crops to that bounding box plus a margin.

  -TopSkip crops a fixed strip off the top first, for removing an application
  title bar before the content scan runs.

  ASCII only: PowerShell 5.1 reads .ps1 as ANSI unless the file has a BOM,
  so non-ASCII characters here would be mangled.

.EXAMPLE
  .\scripts\autocrop.ps1 -Path public\images\foo.png -TopSkip 34 -Margin 16
#>
param(
  [Parameter(Mandatory = $true)][string]$Path,
  [int]$TopSkip = 0,
  [int]$Margin = 14,
  [int]$LumaThreshold = 205,
  [int]$SatThreshold = 26,
  [string]$OutPath
)

Add-Type -AssemblyName System.Drawing

$full = (Resolve-Path $Path).Path
$src = [System.Drawing.Bitmap]::FromFile($full)
$w = $src.Width
$h = $src.Height

# Read all pixels at once - GetPixel per-pixel is far too slow at this size.
$rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$data = $src.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$stride = $data.Stride
$bytes = New-Object byte[] ($stride * $h)
[System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)
$src.UnlockBits($data)

$minX = $w
$minY = $h
$maxX = -1
$maxY = -1

for ($y = $TopSkip; $y -lt $h; $y++) {
  $row = $y * $stride
  for ($x = 0; $x -lt $w; $x++) {
    $i = $row + $x * 4
    $b = $bytes[$i]
    $g = $bytes[$i + 1]
    $r = $bytes[$i + 2]

    $luma = (0.299 * $r) + (0.587 * $g) + (0.114 * $b)
    $mx = [Math]::Max($r, [Math]::Max($g, $b))
    $mn = [Math]::Min($r, [Math]::Min($g, $b))
    $sat = $mx - $mn

    if ($luma -lt $LumaThreshold -or $sat -gt $SatThreshold) {
      if ($x -lt $minX) { $minX = $x }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }
}

if ($maxX -lt 0) {
  Write-Host "No content detected - nothing cropped."
  $src.Dispose()
  exit 1
}

$x0 = [Math]::Max(0, $minX - $Margin)
$y0 = [Math]::Max($TopSkip, $minY - $Margin)
$x1 = [Math]::Min($w - 1, $maxX + $Margin)
$y1 = [Math]::Min($h - 1, $maxY + $Margin)
$cw = $x1 - $x0 + 1
$ch = $y1 - $y0 + 1

$cropRect = New-Object System.Drawing.Rectangle($x0, $y0, $cw, $ch)
$dst = New-Object System.Drawing.Bitmap($cw, $ch)
$gfx = [System.Drawing.Graphics]::FromImage($dst)
$destRect = New-Object System.Drawing.Rectangle(0, 0, $cw, $ch)
$gfx.DrawImage($src, $destRect, $cropRect, [System.Drawing.GraphicsUnit]::Pixel)
$gfx.Dispose()
$src.Dispose()

if (-not $OutPath) { $OutPath = $full }
$dst.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
$dst.Dispose()

$name = Split-Path $full -Leaf
Write-Host "$name : ${w}x${h} -> ${cw}x${ch} (offset $x0,$y0)"
