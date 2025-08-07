@echo off
echo ========================================
echo    Navbar Page Converter
echo ========================================
echo.
echo This script will convert all HTML pages to use the new navbar system.
echo.
echo Files that will be created/modified:
echo - js/navbar-loader.js (navbar loading script)
echo - All HTML files will be updated to use the new navbar system
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause >nul

echo.
echo Converting pages...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Run the conversion script
node convert-pages.js

echo.
echo Conversion complete!
echo.
echo Next steps:
echo 1. Test your pages in a web browser
echo 2. Check that the navbar appears correctly
echo 3. Test mobile menu functionality
echo 4. Verify all links work properly
echo.
echo If you encounter any issues, check the NAVBAR-SETUP.md file for troubleshooting.
echo.
pause
