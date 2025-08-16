#!/bin/bash

# Script para formatação completa de código e Markdown
# Uso: ./scripts/format-all.sh

echo "🚀 Iniciando formatação completa..."

# 1. Formatar código com Prettier
echo "📝 Formatando código com Prettier..."
pnpm run format

# 2. Formatar Markdown com Prettier
echo "📖 Formatando Markdown com Prettier..."
pnpm run format:md

# 3. Formatar Markdown com Remark
echo "🔍 Aplicando regras de estilo Markdown..."
pnpm run lint:md:fix

echo "✅ Formatação completa concluída!"
echo "💡 Use 'pnpm run quality:check' para verificar a qualidade"
