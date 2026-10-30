$pgBin = "C:\Users\ashjx\pgsql\pgsql\bin"
if (-not (Test-Path $pgBin)) {
    $pgBin = "C:\Users\ashjx\pgsql\bin"
}

$pgData = "C:\Users\ashjx\pgsql\data"
$logFile = "C:\Users\ashjx\pgsql\logfile.log"

# Check if postgres is already running
$status = & "$pgBin\pg_ctl.exe" status -D $pgData 2>&1
if ($status -notmatch "server is running") {
    Write-Host "Starting PostgreSQL on port 5432..."
    & "$pgBin\pg_ctl.exe" -D $pgData -l $logFile start
    Start-Sleep -Seconds 2
} else {
    Write-Host "PostgreSQL is already running."
}

# Ensure prestige_one database exists
$dbExists = & "$pgBin\psql.exe" -U postgres -p 5432 -h localhost -tAc "SELECT 1 FROM pg_database WHERE datname = 'prestige_one'" 2>&1
if ($dbExists -ne "1") {
    Write-Host "Creating database prestige_one..."
    & "$pgBin\psql.exe" -U postgres -p 5432 -h localhost -c "CREATE DATABASE prestige_one;"
}

Write-Host "PostgreSQL is ready and prestige_one database verified!"
