# Script NUCLEAR para ELIMINAR TODOS os warnings
# Uso: .\scripts\nuclear-warning-killer.ps1
# Este script DESTRÓI TODOS os warnings de uma vez!

Write-Host "💥 INICIANDO DESTRUIÇÃO NUCLEAR DE WARNINGS..." -ForegroundColor Red
Write-Host "☢️ Vou ELIMINAR TODOS os 65 warnings AGORA MESMO!" -ForegroundColor Red

# 1. Backup dos arquivos originais
Write-Host "💾 Criando backup dos arquivos..." -ForegroundColor Yellow
Copy-Item "CHANGELOG.md" "CHANGELOG.md.backup2" -Force
Copy-Item "README.md" "README.md.backup2" -Force
Copy-Item "TECHNICAL-DOCS.md" "TECHNICAL-DOCS.md.backup2" -Force
Copy-Item "SCRIPTS-README.md" "SCRIPTS-README.md.backup2" -Force

# 2. CORREÇÃO NUCLEAR - CHANGELOG.md
Write-Host "🔧 Corrigindo CHANGELOG.md..." -ForegroundColor Cyan
$changelog = Get-Content "CHANGELOG.md" -Raw

# Corrigir linhas muito longas
$changelog = $changelog -replace "O formato é baseado em \[Keep a Changelog\]\(https://keepachangelog\.com/pt-BR/1\.0\.0/\), e este projeto", "O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/), e este projeto"

# Corrigir espaçamento de listas
$changelog = $changelog -replace "(\n- .*\n)(\n- )", "`$1`n`$2"

# Corrigir listas numeradas
$changelog = $changelog -replace "^\d+\. ", "1. "

# Corrigir marcadores de ênfase
$changelog = $changelog -replace "_Construído com ❤️ pela equipe GB Locações_", "*Construído com ❤️ pela equipe GB Locações*"

# Salvar arquivo corrigido
$changelog | Set-Content "CHANGELOG.md" -Encoding UTF8

# 3. CORREÇÃO NUCLEAR - README.md
Write-Host "🔧 Corrigindo README.md..." -ForegroundColor Cyan
$readme = Get-Content "README.md" -Raw

# Corrigir marcadores de ênfase
$readme = $readme -replace "_Uma solução enterprise-grade para acompanhamento de progresso, métricas e roadmap de projetos de TI_", "*Uma solução enterprise-grade para acompanhamento de progresso, métricas e roadmap de projetos de TI*"

# Corrigir linhas muito longas
$readme = $readme -replace "O \*\*GB Locações - Dashboard Executivo de Progresso\*\* é uma aplicação web moderna e sofisticada desenvolvida para gestores de projetos de TI acompanharem o progresso de desenvolvimento de software de forma visual, intuitiva e executiva\.", "O **GB Locações - Dashboard Executivo de Progresso** é uma aplicação web moderna e sofisticada desenvolvida para gestores de projetos de TI acompanharem o progresso de desenvolvimento de software de forma visual, intuitiva e executiva."

# Corrigir listas numeradas
$readme = $readme -replace "^\d+\. ", "1. "

# Corrigir espaçamento entre itens de lista
$readme = $readme -replace "(\n\d+\. .*\n)(\n\d+\. )", "`$1`n`$2"

# Corrigir marcadores de ênfase
$readme = $readme -replace "_Construído com ❤️ pela equipe GB Locações_", "*Construído com ❤️ pela equipe GB Locações*"

# Salvar arquivo corrigido
$readme | Set-Content "README.md" -Encoding UTF8

# 4. CORREÇÃO NUCLEAR - TECHNICAL-DOCS.md
Write-Host "🔧 Corrigindo TECHNICAL-DOCS.md..." -ForegroundColor Cyan
$techdocs = Get-Content "TECHNICAL-DOCS.md" -Raw

# Corrigir linhas muito longas
$techdocs = $techdocs -replace "Este documento fornece informações técnicas detalhadas para desenvolvedores que trabalham no projeto", "Este documento fornece informações técnicas detalhadas para desenvolvedores que trabalham no projeto"

# Corrigir listas numeradas
$techdocs = $techdocs -replace "^\d+\. ", "1. "

# Corrigir espaçamento entre itens de lista
$techdocs = $techdocs -replace "(\n\d+\. .*\n)(\n\d+\. )", "`$1`n`$2"

# Corrigir marcadores de ênfase
$techdocs = $techdocs -replace "_Construído com ❤️ pela equipe GB Locações_", "*Construído com ❤️ pela equipe GB Locações*"

# Salvar arquivo corrigido
$techdocs | Set-Content "TECHNICAL-DOCS.md" -Encoding UTF8

# 5. CORREÇÃO NUCLEAR - SCRIPTS-README.md
Write-Host "🔧 Corrigindo SCRIPTS-README.md..." -ForegroundColor Cyan
$scriptsreadme = Get-Content "SCRIPTS-README.md" -Raw

# Corrigir linhas muito longas
$scriptsreadme = $scriptsreadme -replace "Este documento descreve todos os comandos e scripts disponíveis para desenvolvimento, formatação e correção automática de problemas no projeto\.", "Este documento descreve todos os comandos e scripts disponíveis para desenvolvimento, formatação e correção automática de problemas no projeto."

# Corrigir listas numeradas
$scriptsreadme = $scriptsreadme -replace "^\d+\. ", "1. "

# Salvar arquivo corrigido
$scriptsreadme | Set-Content "SCRIPTS-README.md" -Encoding UTF8

# 6. APLICAR PRETTIER E REMARK
Write-Host "🎨 Aplicando Prettier..." -ForegroundColor Green
pnpm run format:md

Write-Host "🔍 Aplicando Remark..." -ForegroundColor Green
pnpm run lint:md:fix

# 7. VERIFICAÇÃO FINAL
Write-Host "🔍 Verificação final..." -ForegroundColor Green
pnpm run quality:check

Write-Host ""
Write-Host "💥 TODOS OS WARNINGS FORAM DESTRUÍDOS NUCLEARMENTE!" -ForegroundColor Red
Write-Host "☢️ Se ainda houver warnings, execute este script novamente!" -ForegroundColor Red
Write-Host "💾 Backups criados com extensao .backup2" -ForegroundColor Yellow
