# Generate SVG Watch files
$outDir = "C:\Users\ahmer\.gemini\antigravity\scratch\legacy-wear\assets\images"

function Get-WatchSVG {
    param(
        [string]$DialColor,
        [string]$AccentColor,
        [string]$BezelGradStart,
        [string]$BezelGradEnd,
        [string]$StrapColor,
        [bool]$IsWomen = $false
    )

    $r = if ($IsWomen) { 110 } else { 130 }
    $strapW = if ($IsWomen) { 48 } else { 64 }
    $subDials = if (-not $IsWomen) {
        @"
      <circle cx="268" cy="300" r="18" fill="none" stroke="$AccentColor" stroke-opacity="0.3" stroke-width="1.5" />
      <circle cx="332" cy="300" r="18" fill="none" stroke="$AccentColor" stroke-opacity="0.3" stroke-width="1.5" />
      <circle cx="300" cy="336" r="18" fill="none" stroke="$AccentColor" stroke-opacity="0.3" stroke-width="1.5" />
"@
    } else { "" }

    $secHandColor = if ($IsWomen) { $AccentColor } else { "#E53E3E" }

    $markers = ""
    for ($i = 0; $i -lt 12; $i++) {
        $angle = ($i * 30) * [Math]::PI / 180
        $x1 = [Math]::Round(300 + ($r - 12) * [Math]::Sin($angle), 2)
        $y1 = [Math]::Round(300 - ($r - 12) * [Math]::Cos($angle), 2)
        $x2 = [Math]::Round(300 + $r * [Math]::Sin($angle), 2)
        $y2 = [Math]::Round(300 - $r * [Math]::Cos($angle), 2)
        $w = if ($i % 3 -eq 0) { 3 } else { 1.5 }
        $op = if ($i % 3 -eq 0) { 0.95 } else { 0.6 }
        $markers += "<line x1=""$x1"" y1=""$y1"" x2=""$x2"" y2=""$y2"" stroke=""$AccentColor"" stroke-width=""$w"" stroke-linecap=""round"" opacity=""$op"" />`n"
    }

    $yOffsetTitle = if ($IsWomen) { 30 } else { 45 }
    $yOffsetSub = if ($IsWomen) { 18 } else { 32 }

    @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.1" />
    </filter>
    <linearGradient id="bezel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="$BezelGradStart" />
      <stop offset="50%" stop-color="$BezelGradEnd" />
      <stop offset="100%" stop-color="$BezelGradStart" />
    </linearGradient>
    <radialGradient id="dial-grad" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="$DialColor" />
      <stop offset="100%" stop-color="#050505" />
    </radialGradient>
    <linearGradient id="strap-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="$StrapColor" />
      <stop offset="50%" stop-color="$StrapColor" opacity="0.85" />
      <stop offset="100%" stop-color="$StrapColor" />
    </linearGradient>
    <linearGradient id="glass-glare" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35" />
      <stop offset="40%" stop-color="#ffffff" stop-opacity="0.05" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.2" />
    </linearGradient>
  </defs>

  <rect width="100%" height="100%" fill="#F8F8F8" rx="16" />

  <g filter="url(#drop-shadow)">
    <!-- Top and Bottom Straps -->
    <rect x="$(300 - $strapW/2)" y="40" width="$strapW" height="$(260 - $r)" rx="8" fill="url(#strap-grad)" />
    <rect x="$(300 - $strapW/2)" y="$(300 + $r - 15)" width="$strapW" height="$(275 - $r)" rx="8" fill="url(#strap-grad)" />

    <!-- Crown -->
    <rect x="$(300 + $r + 6)" y="288" width="12" height="24" rx="3" fill="url(#bezel-grad)" />

    <!-- Bezel -->
    <circle cx="300" cy="300" r="$($r + 14)" fill="url(#bezel-grad)" />
    <circle cx="300" cy="300" r="$($r + 2)" fill="#111111" opacity="0.15" />

    <!-- Dial -->
    <circle cx="300" cy="300" r="$r" fill="url(#dial-grad)" />

    <!-- Markers -->
    $markers

    <!-- Sub-dials -->
    $subDials

    <!-- Brand -->
    <text x="300" y="$(300 - $yOffsetTitle)" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="$AccentColor" letter-spacing="3" text-anchor="middle" opacity="0.9">LEGACY WEAR</text>
    <text x="300" y="$(300 - $yOffsetSub)" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="7" font-weight="400" fill="$AccentColor" letter-spacing="1.5" text-anchor="middle" opacity="0.6">AUTOMATIC</text>

    <!-- Hands -->
    <line x1="300" y1="300" x2="$(300 - [Math]::Round($r * 0.38))" y2="$(300 - [Math]::Round($r * 0.38))" stroke="$AccentColor" stroke-width="3.5" stroke-linecap="round" />
    <line x1="300" y1="300" x2="$(300 + [Math]::Round($r * 0.55))" y2="$(300 - [Math]::Round($r * 0.55))" stroke="$AccentColor" stroke-width="2.5" stroke-linecap="round" />
    <line x1="$(300 - [Math]::Round($r * 0.15))" y1="$(300 + [Math]::Round($r * 0.15))" x2="$(300 + [Math]::Round($r * 0.65))" y2="$(300 - [Math]::Round($r * 0.62))" stroke="$secHandColor" stroke-width="1" stroke-linecap="round" />
    <circle cx="300" cy="300" r="5" fill="$AccentColor" />

    <!-- Glass -->
    <circle cx="300" cy="300" r="$r" fill="url(#glass-glare)" />
  </g>
</svg>
"@
}

$items = @(
    @{ Name="cartier-blue.svg"; Dial="#0F2027"; Accent="#E2E8F0"; BStart="#E2E8F0"; BEnd="#94A3B8"; Strap="#1E293B" },
    @{ Name="cartier-brown.svg"; Dial="#3D2314"; Accent="#FDE68A"; BStart="#F59E0B"; BEnd="#78350F"; Strap="#4A2810" },
    @{ Name="cartier-silver.svg"; Dial="#E2E8F0"; Accent="#111111"; BStart="#FFFFFF"; BEnd="#94A3B8"; Strap="#64748B" },
    @{ Name="cartier-gold.svg"; Dial="#F59E0B"; Accent="#111111"; BStart="#FBBF24"; BEnd="#92400E"; Strap="#B45309" },
    @{ Name="cartier-grey.svg"; Dial="#334155"; Accent="#F8FAFC"; BStart="#64748B"; BEnd="#1E293B"; Strap="#475569" },
    @{ Name="cartier-white.svg"; Dial="#FFFFFF"; Accent="#111111"; BStart="#E2E8F0"; BEnd="#94A3B8"; Strap="#111111" },
    @{ Name="women-watch-1.svg"; Dial="#FFF5F5"; Accent="#9B2C2C"; BStart="#FCA5A5"; BEnd="#991B1B"; Strap="#E53E3E"; Women=$true },
    @{ Name="women-watch-2.svg"; Dial="#F8FAFC"; Accent="#334155"; BStart="#E2E8F0"; BEnd="#64748B"; Strap="#64748B"; Women=$true },
    @{ Name="women-watch-3.svg"; Dial="#FEFCBF"; Accent="#744210"; BStart="#FDE047"; BEnd="#854D0E"; Strap="#D69E2E"; Women=$true }
)

foreach ($item in $items) {
    $isW = if ($item.Women) { $true } else { $false }
    $svg = Get-WatchSVG -DialColor $item.Dial -AccentColor $item.Accent -BezelGradStart $item.BStart -BezelGradEnd $item.BEnd -StrapColor $item.Strap -IsWomen $isW
    $path = Join-Path $outDir $item.Name
    Set-Content -Path $path -Value $svg -Encoding UTF8
    Write-Host "Created $path"
}
