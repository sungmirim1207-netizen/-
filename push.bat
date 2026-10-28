@echo off
chcp 65001 > nul
echo ========================================================
echo  KeepIn Cool - GitHub 원격 저장소 푸시 (Push to GitHub)
echo ========================================================
echo.
cd /d "%~dp0"
echo 현재 브랜치: main
echo 원격 저장소: https://github.com/sungmirim1207-netizen/-.git
echo.
echo GitHub 인증 창(브라우저)이 열리면 'Sign in with your browser'를 눌러 승인해주세요.
echo.
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo  [성공] GitHub에 정상적으로 푸시되었습니다!
    echo  저장소: https://github.com/sungmirim1207-netizen/-
    echo ========================================================
) else (
    echo ========================================================
    echo  [안내] 푸시 도중 오류가 발생했습니다.
    echo ========================================================
)
echo.
pause
