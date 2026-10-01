param(
  [switch]$Production
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$backend = Join-Path $root 'backend'
$frontend = Join-Path $root 'frontend'
$logs = Join-Path $root 'logs'
New-Item -ItemType Directory -Force -Path $logs | Out-Null

function Start-ServiceProcess {
  param(
    [string]$Name,
    [string]$WorkingDirectory,
    [string]$Command,
    [string]$LogFile
  )

  $childCommand = "Set-Location -LiteralPath '$WorkingDirectory'; $Command *>> '$LogFile'"
  $process = Start-Process powershell.exe -ArgumentList @(
    '-NoProfile',
    '-ExecutionPolicy', 'Bypass',
    '-Command', $childCommand
  ) -PassThru -WindowStyle Minimized

  Write-Host "$Name iniciado (PID $($process.Id))."
  return $process
}

function Test-PortListening {
  param([int]$Port)
  return $null -ne (Get-NetTCPConnection -State Listen -LocalPort $Port -ErrorAction SilentlyContinue)
}

if ($Production) {
  $backendCommand = 'npm run build; npm run start'
  $frontendCommand = 'npm run build; npm run preview -- --host 0.0.0.0'
} else {
  $backendCommand = 'npm run dev'
  $frontendCommand = '$env:PUBLIC_API_URL="http://localhost:3000"; npm run dev -- --host 0.0.0.0'
}

$services = @(
  [pscustomobject]@{ Name = 'Backend'; Directory = $backend; Command = $backendCommand; Log = (Join-Path $logs 'backend.log'); Port = 3000; Process = $null; StartedAt = $null },
  [pscustomobject]@{ Name = 'Frontend'; Directory = $frontend; Command = $frontendCommand; Log = (Join-Path $logs 'frontend.log'); Port = 4321; Process = $null; StartedAt = $null }
)

foreach ($service in $services) {
  if (Test-PortListening -Port $service.Port) {
    Write-Host "$($service.Name) ya está activo en el puerto $($service.Port)."
    $service.Process = $null
  } else {
    $service.Process = Start-ServiceProcess -Name $service.Name -WorkingDirectory $service.Directory -Command $service.Command -LogFile $service.Log
  }
  $service.StartedAt = Get-Date
}

Write-Host 'Supervisor activo. Presiona Ctrl+C para cerrar el supervisor; los servicios continuarán ejecutándose.'
while ($true) {
  Start-Sleep -Seconds 5
  foreach ($service in $services) {
    $startupGracePeriod = ((Get-Date) - $service.StartedAt).TotalSeconds -lt 20
    if (-not $startupGracePeriod -and -not (Test-PortListening -Port $service.Port)) {
      Write-Host "$($service.Name) se detuvo; reiniciando..."
      if ($service.Process -and -not $service.Process.HasExited) {
        Stop-Process -Id $service.Process.Id -Force -ErrorAction SilentlyContinue
      }
      $service.Process = Start-ServiceProcess -Name $service.Name -WorkingDirectory $service.Directory -Command $service.Command -LogFile $service.Log
      $service.StartedAt = Get-Date
    }
  }
}
