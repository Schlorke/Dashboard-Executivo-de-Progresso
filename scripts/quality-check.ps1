# Script para verificação completa de qualidade
# Uso: .\scripts\quality-check.ps1

Write-Host "🔍 Iniciando verificação completa de qualidade..." -ForegroundColor Green

# 1. Verificar formatação Prettier
Write-Host "📝 Verificando formatação Prettier..." -ForegroundColor Yellow
pnpm run format:check

# 2. Verificar linting de código
Write-Host "🔍 Verificando linting de código..." -ForegroundColor Yellow
pnpm run lint

# 3. Verificar linting de Markdown
Write-Host "📖 Verificando linting de Markdown..." -ForegroundColor Yellow
pnpm run lint:md

# 4. Verificar tipos TypeScript
Write-Host "📘 Verificando tipos TypeScript..." -ForegroundColor Yellow
npx tsc --noEmit

Write-Host "✅ Verificação de qualidade concluída!" -ForegroundColor Green
Write-Host "💡 Use 'pnpm run quality:fix' para corrigir problemas automaticamente" -ForegroundColor Cyan
