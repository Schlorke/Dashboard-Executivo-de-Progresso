# ðŸ› ï¸ Guia de Comandos de FormataÃ§Ã£o e Qualidade

Este documento explica todos os comandos disponÃ­veis para formataÃ§Ã£o, linting e correÃ§Ã£o
automÃ¡tica de cÃ³digo e Markdown.

## ðŸš€ Comandos Principais (pnpm)

### FormataÃ§Ã£o Completa

```bash
# Formatar TODO o projeto (cÃ³digo + Markdown)
pnpm run format:all

# Formatar apenas cÃ³digo
pnpm run format

# Formatar apenas Markdown
pnpm run format:md
```

### CorreÃ§Ã£o AutomÃ¡tica

```bash
# Corrigir TUDO automaticamente (formataÃ§Ã£o + linting + Markdown)
pnpm run fix:all

# Corrigir apenas problemas de cÃ³digo
pnpm run lint:fix

# Corrigir apenas problemas de Markdown
pnpm run lint:md:fix
```

### VerificaÃ§Ã£o de Qualidade

```bash
# Verificar TUDO sem modificar
pnpm run quality:check

# Verificar e corrigir TUDO automaticamente
pnpm run quality:fix

# Verificar apenas cÃ³digo
pnpm run lint

# Verificar apenas Markdown
pnpm run lint:md
```

## ðŸ“ Scripts PowerShell (Windows)

### FormataÃ§Ã£o PowerShell

```powershell
# Executar script de formataÃ§Ã£o
.\scripts\format-all.ps1
```

### CorreÃ§Ã£o PowerShell

```powershell
# Executar script de correÃ§Ã£o
.\scripts\fix-all.ps1
```

### VerificaÃ§Ã£o PowerShell

```powershell
# Executar script de verificaÃ§Ã£o
.\scripts\quality-check.ps1
```

## ðŸ§ Scripts Bash (Linux/Mac)

### FormataÃ§Ã£o Bash

```bash
# Executar script de formataÃ§Ã£o
./scripts/format-all.sh

# Dar permissÃ£o de execuÃ§Ã£o (primeira vez)
chmod +x ./scripts/format-all.sh
```

## ðŸŽ¯ Fluxo de Trabalho Recomendado

### Desenvolvimento DiÃ¡rio

```bash
# Formatar cÃ³digo antes de commitar
pnpm run format:all
```

### Antes do Commit

```bash
# Verificar qualidade
pnpm run quality:check

# Se houver problemas, corrigir automaticamente
pnpm run quality:fix
```

### ManutenÃ§Ã£o do Projeto

```bash
# CorreÃ§Ã£o completa periÃ³dica
pnpm run fix:all
```

## ðŸ”§ Comandos Individuais

### Prettier (FormataÃ§Ã£o)

```bash
# Formatar tudo
npx prettier --write .

# Verificar formataÃ§Ã£o
npx prettier --check .

# Formatar arquivo especÃ­fico
npx prettier --write README.md
```

### ESLint (Linting de CÃ³digo)

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

### TypeScript (VerificaÃ§Ã£o de Tipos)

```bash
# Verificar tipos sem gerar arquivos
npx tsc --noEmit
```

## ðŸ“Š Status dos Comandos

| Comando         | Status | DescriÃ§Ã£o                   |
| --------------- | ------ | ----------------------------- |
| `format:all`    | âœ…    | Formata cÃ³digo + Markdown    |
| `fix:all`       | âœ…    | Corrige tudo automaticamente  |
| `quality:check` | âœ…    | Verifica qualidade completa   |
| `quality:fix`   | âœ…    | Verifica e corrige tudo       |
| `lint:fix`      | âœ…    | Corrige problemas de cÃ³digo  |
| `lint:md:fix`   | âœ…    | Corrige problemas de Markdown |

## ðŸš¨ SoluÃ§Ã£o de Problemas

### Erro de PermissÃ£o (Linux/Mac)

```bash
chmod +x ./scripts/*.sh
```

### Erro de ExecuÃ§Ã£o de Scripts (Windows)

```powershell
# Executar no PowerShell como administrador
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### DependÃªncias Faltando

```bash
pnpm install
```

## ðŸ’¡ Dicas de Uso

1. **Use `format:all`** para formataÃ§Ã£o rÃ¡pida
2. **Use `fix:all`** para correÃ§Ã£o automÃ¡tica completa
3. **Use `quality:check`** antes de commitar
4. **Configure seu editor** para formatar ao salvar
5. **Use os scripts PowerShell/Bash** para automaÃ§Ã£o

## ðŸ”— Links Ãšteis

- [Prettier Documentation](https://prettier.io/)
- [ESLint Documentation](https://eslint.org/)
- [Remark Documentation](https://remark.js.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

**ðŸŽ¯ Agora vocÃª tem um sistema completo de formataÃ§Ã£o e qualidade!**
