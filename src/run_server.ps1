Write-Host "Starte Enshrouded Dedicated Server..."
$serverPath = "$PSScriptRoot\..\..\enshrouded_dedicated_server\enshrouded_server.exe"
if (-not (Test-Path $serverPath)) {
    Write-Host "Server executable not found at $serverPath"
    exit 1
}
$process = Start-Process -FilePath $serverPath -PassThru -NoNewWindow

Register-EngineEvent PowerShell.Exiting -Action {
    Write-Host "Sende Ctrl+C an Serverprozess..."
    $encodedCommand = [Convert]::ToBase64String([System.Text.Encoding]::Unicode.GetBytes("Add-Type -Names 'w' -Name 'k' -M '[DllImport(""kernel32.dll"")]public static extern bool FreeConsole();[DllImport(""kernel32.dll"")]public static extern bool AttachConsole(uint p);[DllImport(""kernel32.dll"")]public static extern bool SetConsoleCtrlHandler(uint h, bool a);[DllImport(""kernel32.dll"")]public static extern bool GenerateConsoleCtrlEvent(uint e, uint p);public static void SendCtrlC(uint p){FreeConsole();AttachConsole(p);GenerateConsoleCtrlEvent(0, 0);}';[w.k]::SendCtrlC($ProcessID)"))
    Start-process powershell.exe -argument "-nologo -noprofile -executionpolicy bypass -EncodedCommand $encodedCommand"
}
Wait-Process -Id $process.Id
