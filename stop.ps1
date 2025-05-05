# Get all running cmd.exe processes
$cmdProcesses = Get-Process -Name "enshrouded_server" -ErrorAction SilentlyContinue

if ($cmdProcesses) {
    foreach ($process in $cmdProcesses) {
        try {
            # Attempt to close the cmd window gracefully
            # be sure to set $ProcessID properly. Sending CTRL_C_EVENT signal can disrupt or terminate a process
            $ProcessID = $process.Id
            $encodedCommand = [Convert]::ToBase64String([System.Text.Encoding]::Unicode.GetBytes("Add-Type -Names 'w' -Name 'k' -M '[DllImport(""kernel32.dll"")]public static extern bool FreeConsole();[DllImport(""kernel32.dll"")]public static extern bool AttachConsole(uint p);[DllImport(""kernel32.dll"")]public static extern bool SetConsoleCtrlHandler(uint h, bool a);[DllImport(""kernel32.dll"")]public static extern bool GenerateConsoleCtrlEvent(uint e, uint p);public static void SendCtrlC(uint p){FreeConsole();AttachConsole(p);GenerateConsoleCtrlEvent(0, 0);}';[w.k]::SendCtrlC($ProcessID)"))
            start-process powershell.exe -argument "-nologo -noprofile -executionpolicy bypass -EncodedCommand $encodedCommand"
        
            Write-Host "Closed cmd window with PID $($process.Id)" -ForegroundColor Green
        }
        catch {
            Write-Host "Failed to close cmd window with PID $($process.Id): $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}
else {
    Write-Host "No running cmd windows found." -ForegroundColor Yellow
}