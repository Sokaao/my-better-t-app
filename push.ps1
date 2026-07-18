<#
.SYNOPSIS
    Commit et push les changements vers GitHub (declenche le deploiement Vercel).

.USAGE
    .\push.ps1 "Message de commit"
    .\push.ps1                          (message par defaut horodate)
#>

param(
	[string]$Message = "Mise a jour du site - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
)

$ErrorActionPreference = "Stop"

Write-Host "== Etat actuel du depot ==" -ForegroundColor Cyan
git status --short

$changes = git status --porcelain
if (-not $changes) {
	Write-Host "Rien a committer, le depot est deja a jour." -ForegroundColor Yellow
	exit 0
}

Write-Host "`n== Ajout des fichiers ==" -ForegroundColor Cyan
git add -A

Write-Host "`n== Commit ==" -ForegroundColor Cyan
git commit -m $Message

Write-Host "`n== Push vers origin/main ==" -ForegroundColor Cyan
git push origin main

Write-Host "`nTermine. Vercel va detecter le push et deployer automatiquement." -ForegroundColor Green
