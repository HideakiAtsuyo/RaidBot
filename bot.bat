@echo off
:1
cls
IF EXIST node_modules (
node index.js
pause
) ELSE (
npm i
)
goto 1
