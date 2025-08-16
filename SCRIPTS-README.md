# 🛠️ Guia de Comandos de Formatação e Qualidade

Este documento explica todos os comandos disponíveis para formatação, linting e correção automática
de código e Markdown.

## 🚀 Comandos Principais (pnpm)

### Formatação Completa

```bash
# Formatar TODO o projeto (código + Markdown)
pnpm run format:all

# Formatar apenas código
pnpm run format

# Formatar apenas Markdown
pnpm run format:md
```

### Correção Automática

```bash
# Corrigir TUDO automaticamente (formatação + linting + Markdown)
pnpm run fix:all

# Corrigir apenas problemas de código
pnpm run lint:fix

# Corrigir apenas problemas de Markdown
pnpm run lint:md:fix
```

### Verificação de Qualidade

```bash
# Verificar TUDO sem modificar
pnpm run quality:check

# Verificar e corrigir TUDO automaticamente
pnpm run quality:fix

# Verificar apenas código
pnpm run lint

# Verificar apenas Markdown
pnpm run lint:md
```

## 📁 Scripts PowerShell (Windows)

### Formatação PowerShell

```powershell
# Executar script de formatação
.\scripts\format-all.ps1
```

### Correção PowerShell

```powershell
# Executar script de correção
.\scripts\fix-all.ps1
```

### Verificação PowerShell

```powershell
# Executar script de verificação
.\scripts\quality-check.ps1
```

## 🐧 Scripts Bash (Linux/Mac)

### Formatação Bash

```bash
# Executar script de formatação
./scripts/format-all.sh

# Dar permissão de execução (primeira vez)
chmod +x ./scripts/format-all.sh
```

## 🎯 Fluxo de Trabalho Recomendado

### Desenvolvimento Diário

```bash
# Formatar código antes de commitar
pnpm run format:all
```

### Antes do Commit

```bash
# Verificar qualidade
pnpm run quality:check

# Se houver problemas, corrigir automaticamente
pnpm run quality:fix
```

### Manutenção do Projeto

```bash
# Correção completa periódica
pnpm run fix:all
```

## 🔧 Comandos Individuais

### Prettier (Formatação)

```bash
# Formatar tudo
npx prettier --write .

# Verificar formatação
npx prettier --check .

# Formatar arquivo específico
npx prettier --write README.md
```

### ESLint (Linting de Código)

```bash
# Verificar problemas
npx next lint

# Corrigir automaticamente
npx next lint --fix
```

### Remark (Linting de Markdown)

```bash
# Verificar problemas
npx remark . --output

# Aplicar regras de estilo
npx remark . --output --use remark-preset-prettier
```

### TypeScript (Verificação de Tipos)

```bash
# Verificar tipos sem gerar arquivos
npx tsc --noEmit
```

## 📊 Status dos Comandos

| Comando         | Status | Descrição                     |
| --------------- | ------ | ----------------------------- |
| `format:all`    | ✅     | Formata código + Markdown     |
| `fix:all`       | ✅     | Corrige tudo automaticamente  |
| `quality:check` | ✅     | Verifica qualidade completa   |
| `quality:fix`   | ✅     | Verifica e corrige tudo       |
| `lint:fix`      | ✅     | Corrige problemas de código   |
| `lint:md:fix`   | ✅     | Corrige problemas de Markdown |

## 🚨 Solução de Problemas

### Erro de Permissão (Linux/Mac)

```bash
chmod +x ./scripts/*.sh
```

### Erro de Execução de Scripts (Windows)

```powershell
# Executar no PowerShell como administrador
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Dependências Faltando

```bash
pnpm install
```

## 💡 Dicas de Uso

1. **Use `format:all`** para formatação rápida
2. **Use `fix:all`** para correção automática completa
3. **Use `quality:check`** antes de commitar
4. **Configure seu editor** para formatar ao salvar
5. **Use os scripts PowerShell/Bash** para automação

## 🔗 Links Úteis

- [Prettier Documentation](https://prettier.io/)
- [ESLint Documentation](https://eslint.org/)
- [Remark Documentation](https://remark.js.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

**🎯 Agora você tem um sistema completo de formatação e qualidade!**
