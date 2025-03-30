@echo off
cd /d "%~dp0"
start /B npm start
:check
curl -s http://localhost:3000 >nul 2>&1
if errorlevel 1 (
    timeout /t 1 /nobreak >nul
    goto check
)
start http://localhost:3000 