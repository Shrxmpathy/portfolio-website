<#
.SYNOPSIS
  Builds the Open Graph card (public/og-image.jpg), the 1200x630 preview shown
  when the site is linked on LinkedIn, in messages, or from a resume.

.DESCRIPTION
  Composes the card in the site's own visual language: blueprint paper with a
  minor/major grid, navy ink, one dark-red accent rule, the ck mark, and a
  photo panel on the right.

  ASCII only: PowerShell 5.1 reads .ps1 as ANSI unless the file has a BOM.

.EXAMPLE
  .\scripts\make-og-image.ps1
#>
param(
  [string]$Root = (Split-Path $PSScriptRoot -Parent)
)

Add-Type -AssemblyName System.Drawing

$W = 1200
$H = 630
$SPLIT = 690           # where the text column ends and the photo begins

# Site palette
$paper      = [System.Drawing.ColorTranslator]::FromHtml('#edf1f5')
$ink        = [System.Drawing.ColorTranslator]::FromHtml('#17222e')
$inkSoft    = [System.Drawing.ColorTranslator]::FromHtml('#45525f')
$accent     = [System.Drawing.ColorTranslator]::FromHtml('#8c2f2a')
$gridMinor  = [System.Drawing.Color]::FromArgb(38, 168, 186, 203)
$gridMajor  = [System.Drawing.Color]::FromArgb(85, 168, 186, 203)
$ruleStrong = [System.Drawing.ColorTranslator]::FromHtml('#a8bacb')

$bmp = New-Object System.Drawing.Bitmap($W, $H, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

$g.Clear($paper)

# ---------------------------------------------------------------- grid ----
$penMinor = New-Object System.Drawing.Pen($gridMinor, 1)
$penMajor = New-Object System.Drawing.Pen($gridMajor, 1)
for ($x = 0; $x -lt $W; $x += 32) { $g.DrawLine($penMinor, $x, 0, $x, $H) }
for ($y = 0; $y -lt $H; $y += 32) { $g.DrawLine($penMinor, 0, $y, $W, $y) }
for ($x = 0; $x -lt $W; $x += 160) { $g.DrawLine($penMajor, $x, 0, $x, $H) }
for ($y = 0; $y -lt $H; $y += 160) { $g.DrawLine($penMajor, 0, $y, $W, $y) }

# --------------------------------------------------------- photo panel ----
$photo = Join-Path $Root 'public\microscope-poster.jpg'
if (Test-Path $photo) {
  $src = [System.Drawing.Bitmap]::FromFile($photo)
  $panelW = $W - $SPLIT
  # cover-crop the source into the panel
  $scale = [Math]::Max($panelW / $src.Width, $H / $src.Height)
  $sw = [int]($panelW / $scale)
  $sh = [int]($H / $scale)
  $sx = [int](($src.Width - $sw) / 2)
  $sy = [int](($src.Height - $sh) / 2)
  $dest = New-Object System.Drawing.Rectangle($SPLIT, 0, $panelW, $H)
  $from = New-Object System.Drawing.Rectangle($sx, $sy, $sw, $sh)
  $g.DrawImage($src, $dest, $from, [System.Drawing.GraphicsUnit]::Pixel)
  $src.Dispose()
  # hairline between the columns
  $g.DrawLine((New-Object System.Drawing.Pen($ruleStrong, 2)), $SPLIT, 0, $SPLIT, $H)
}

# ---------------------------------------------------------------- logo ----
$logoPath = Join-Path $Root 'public\images\logo.png'
$textTop = 96
if (Test-Path $logoPath) {
  $logo = [System.Drawing.Bitmap]::FromFile($logoPath)
  $logoH = 78
  $logoW = [int]($logo.Width * ($logoH / $logo.Height))
  $lx = 72
  $ly = 74
  $g.DrawImage($logo, (New-Object System.Drawing.Rectangle($lx, $ly, $logoW, $logoH)))
  # square-ish outline hugging the mark, as in the site header
  $g.DrawRectangle((New-Object System.Drawing.Pen($ruleStrong, 2)), ($lx - 8), ($ly - 8), ($logoW + 16), ($logoH + 16))
  $logo.Dispose()
  $textTop = $ly + $logoH + 78
}

# ---------------------------------------------------------------- text ----
$fmt = New-Object System.Drawing.StringFormat
$fmt.FormatFlags = [System.Drawing.StringFormatFlags]::NoWrap

$brushInk    = New-Object System.Drawing.SolidBrush($ink)
$brushSoft   = New-Object System.Drawing.SolidBrush($inkSoft)
$brushAccent = New-Object System.Drawing.SolidBrush($accent)

# Eyebrow, letter-spaced by hand since GDI+ has no tracking.
# Uses typographic measurement (no bearing padding) plus a fixed advance, and
# gives spaces their own width so words do not run together.
$eyebrow = 'MECHANICAL ENGINEERING PORTFOLIO'
$fontEyebrow = New-Object System.Drawing.Font('Consolas', 15, [System.Drawing.FontStyle]::Regular)
$typo = [System.Drawing.StringFormat]::GenericTypographic
$tracking = 3.0
$cx = 72.0
foreach ($ch in $eyebrow.ToCharArray()) {
  $s = [string]$ch
  if ($s -eq ' ') {
    $cx += $g.MeasureString('M', $fontEyebrow, [System.Drawing.PointF]::Empty, $typo).Width + $tracking
    continue
  }
  $g.DrawString($s, $fontEyebrow, $brushSoft, $cx, $textTop, $typo)
  $cx += $g.MeasureString($s, $fontEyebrow, [System.Drawing.PointF]::Empty, $typo).Width + $tracking
}

# Name, auto-fitted to the column
$name = 'Christian Keough'
$maxW = $SPLIT - 72 - 56
$size = 74
do {
  $fontName = New-Object System.Drawing.Font('Georgia', $size, [System.Drawing.FontStyle]::Regular)
  $measured = $g.MeasureString($name, $fontName).Width
  if ($measured -le $maxW) { break }
  $fontName.Dispose()
  $size -= 2
} while ($size -gt 30)
$nameY = $textTop + 46
$g.DrawString($name, $fontName, $brushInk, 68, $nameY)

# Accent rule
$ruleY = $nameY + $g.MeasureString($name, $fontName).Height + 30
$g.FillRectangle($brushAccent, 72, $ruleY, 92, 4)

# Sub-line, auto-fitted so it cannot run into the photo panel
$sub = 'Prosthetics  .  Biomechanics  .  SolidWorks  .  Python'
$subSize = 21
do {
  $fontSub = New-Object System.Drawing.Font('Georgia', $subSize, [System.Drawing.FontStyle]::Regular)
  if ($g.MeasureString($sub, $fontSub).Width -le $maxW) { break }
  $fontSub.Dispose()
  $subSize -= 1
} while ($subSize -gt 12)
$g.DrawString($sub, $fontSub, $brushSoft, 68, ($ruleY + 32))

# Footer line
$fontFoot = New-Object System.Drawing.Font('Consolas', 14, [System.Drawing.FontStyle]::Regular)
$g.DrawString('University of Florida  |  B.S. Mechanical Engineering', $fontFoot, $brushSoft, 70, ($H - 84))

# --------------------------------------------------------------- save ----
$g.Dispose()

$out = Join-Path $Root 'public\og-image.jpg'
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters(1)
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 90)
$bmp.Save($out, $codec, $params)
$bmp.Dispose()

$kb = [math]::Round((Get-Item $out).Length / 1KB)
Write-Host "og-image.jpg written: ${W}x${H}, ${kb} KB"
