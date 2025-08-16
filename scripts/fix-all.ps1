# Script para correção automática de código e Markdown
# Uso: .\scripts\fix-all.ps1

Write-Host "🔧 Iniciando correção automática completa..." -ForegroundColor Green

# 1. Formatar código com Prettier
Write-Host "📝 Formatando código com Prettier..." -ForegroundColor Yellow
pnpm run format

# 2. Corrigir problemas de código com ESLint
Write-Host "🔍 Corrigindo problemas de código com ESLint..." -ForegroundColor Yellow
pnpm run lint:fix

# 3. Formatar Markdown com Prettier
Write-Host "📖 Formatando Markdown com Prettier..." -ForegroundColor Yellow
pnpm run format:md

# 4. Corrigir problemas de Markdown com Remark
Write-Host "🔍 Corrigindo problemas de Markdown com Remark..." -ForegroundColor Yellow
pnpm run lint:md:fix

Write-Host "✅ Correção automática completa concluída!" -ForegroundColor Green
Write-Host "💡 Use 'pnpm run quality:check' para verificar se tudo está correto" -ForegroundColor Cyan
