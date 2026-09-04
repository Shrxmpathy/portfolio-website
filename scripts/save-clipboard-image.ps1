<#
.SYNOPSIS
  Saves whatever image is currently on the clipboard into public/images/.

.DESCRIPTION
  Snip an image (Win+Shift+S) or copy it, then run this with the filename you
  want. Saves as PNG into the site's images folder.

.EXAMPLE
  .\scripts\save-clipboard-image.ps1 canine-brace-assembly

.NOTES
  Clipboard access needs a single-threaded apartment; the script relaunches
  itself in STA mode automatically if it isn't already running that way.
#>
param(
  [Parameter(Mandatory = $true, Position = 0)]
  [string]$Name
)

# Clipboard image access requires STA. Relaunch if we're not in it.
if ([System.Threading.Thread]::CurrentThread.GetApartmentState() -ne 'STA') {
  $result = & powershell.exe -STA -NoProfile -ExecutionPolicy Bypass -File $PSCommandPath $Name
  $result | ForEach-Object { Write-Host $_ }
  exit $LASTEXITCODE
}

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$image = [System.Windows.Forms.Clipboard]::GetImage()

if ($null -eq $image) {
  Write-Host "No image found on the clipboard."
  Write-Host "Copy an image first (Win+Shift+S to snip, or right-click an image and Copy), then run this again."
  exit 1
}

# public/images sits one level up from scripts/
$imagesDir = Join-Path (Split-Path $PSScriptRoot -Parent) 'public\images'
if (-not (Test-Path $imagesDir)) {
  New-Item -ItemType Directory -Force -Path $imagesDir | Out-Null
}

if ($Name -notmatch '\.(png|jpg|jpeg|webp)$') { $Name = "$Name.png" }
$target = Join-Path $imagesDir $Name

$width = $image.Width
$height = $image.Height

$image.Save($target, [System.Drawing.Imaging.ImageFormat]::Png)
$image.Dispose()

$sizeKb = [math]::Round((Get-Item $target).Length / 1KB)
Write-Host "Saved $Name  (${width}x${height}, $sizeKb KB)"
Write-Host "  -> $target"
