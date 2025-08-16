# Script para formatação completa de código e Markdown
# Uso: .\scripts\format-all.ps1

Write-Host "🚀 Iniciando formatação completa..." -ForegroundColor Green

# 1. Formatar código com Prettier
Write-Host "📝 Formatando código com Prettier..." -ForegroundColor Yellow
pnpm run format

# 2. Formatar Markdown com Prettier
Write-Host "📖 Formatando Markdown com Prettier..." -ForegroundColor Yellow
pnpm run format:md

# 3. Formatar Markdown com Remark
Write-Host "🔍 Aplicando regras de estilo Markdown..." -ForegroundColor Yellow
pnpm run lint:md:fix

Write-Host "✅ Formatação completa concluída!" -ForegroundColor Green
Write-Host "💡 Use 'pnpm run quality:check' para verificar a qualidade" -ForegroundColor Cyan
