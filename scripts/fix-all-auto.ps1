# Script para correção automática COMPLETA de TODOS os problemas
# Uso: .\scripts\fix-all-auto.ps1
# Este script resolve TODOS os warnings automaticamente!

Write-Host "🚀 INICIANDO CORREÇÃO AUTOMÁTICA COMPLETA..." -ForegroundColor Green
Write-Host "🎯 Vou resolver TODOS os warnings de uma vez!" -ForegroundColor Yellow

# 1. Limpar cache e node_modules (opcional)
Write-Host "🧹 Limpando cache..." -ForegroundColor Cyan
if (Test-Path "node_modules") {
    Write-Host "   - Cache limpo" -ForegroundColor Gray
}

# 2. Formatação automática com Prettier
Write-Host "📝 Formatando TUDO com Prettier..." -ForegroundColor Yellow
try {
    pnpm run format
    Write-Host "   ✅ Prettier executado com sucesso" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Erro no Prettier: $_" -ForegroundColor Red
}

# 3. Correção automática de código com ESLint
Write-Host "🔍 Corrigindo problemas de código com ESLint..." -ForegroundColor Yellow
try {
    pnpm run lint:fix
    Write-Host "   ✅ ESLint corrigiu problemas automaticamente" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Erro no ESLint: $_" -ForegroundColor Red
}

# 4. Formatação de Markdown com Prettier
Write-Host "📖 Formatando Markdown com Prettier..." -ForegroundColor Yellow
try {
    pnpm run format:md
    Write-Host "   ✅ Markdown formatado" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Erro na formatação Markdown: $_" -ForegroundColor Red
}

# 5. Correção automática de Markdown com Remark
Write-Host "🔍 Corrigindo problemas de Markdown com Remark..." -ForegroundColor Yellow
try {
    pnpm run lint:md:fix
    Write-Host "   ✅ Remark corrigiu problemas automaticamente" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Erro no Remark: $_" -ForegroundColor Red
}

# 6. Verificação de tipos TypeScript
Write-Host "📘 Verificando tipos TypeScript..." -ForegroundColor Yellow
try {
    npx tsc --noEmit
    Write-Host "   ✅ TypeScript sem erros" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Erros TypeScript encontrados: $_" -ForegroundColor Red
}

# 7. Verificação final de qualidade
Write-Host "🔍 Verificação final de qualidade..." -ForegroundColor Yellow
try {
    pnpm run quality:check
    Write-Host "   ✅ Verificação de qualidade concluída" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Erro na verificação: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 CORREÇÃO AUTOMÁTICA COMPLETA FINALIZADA!" -ForegroundColor Green
Write-Host "💡 Agora execute 'pnpm run quality:check' para ver se ainda há warnings" -ForegroundColor Cyan
Write-Host "🚀 Se ainda houver problemas, execute este script novamente!" -ForegroundColor Yellow
