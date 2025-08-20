# 🤝 Contribuindo para o Dashboard Executivo de Progresso

Primeiramente, obrigado por considerar contribuir para este projeto! É através de pessoas como você
que tornamos este projeto ainda melhor.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Posso Contribuir?](#como-posso-contribuir)
- [Processo de Desenvolvimento](#processo-de-desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Processo de Pull Request](#processo-de-pull-request)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Melhorias](#sugerindo-melhorias)

## 📜 Código de Conduta

Este projeto e todos os participantes são regidos pelo nosso
[Código de Conduta](CODE_OF_CONDUCT.md). Ao participar, você deve seguir este código.

## 🚀 Como Posso Contribuir?

### 🐛 Reportando Bugs

Encontrou um bug? Aqui está como reportá-lo:

1. **Verifique se já foi reportado** - procure em
   [Issues existentes](https://github.com/gb-locacoes/dashboard-executivo/issues)
2. **Use o template de bug** - isso nos ajuda a reproduzir o problema
3. **Seja específico** - inclua versões, sistema operacional, navegador, etc.
4. **Anexe screenshots** - uma imagem vale mais que mil palavras

### 💡 Sugerindo Melhorias

Tem uma ideia para melhorar o projeto?

1. **Verifique se já foi sugerido** - procure em
   [Issues e Discussions](https://github.com/gb-locacoes/dashboard-executivo/discussions)
2. **Use o template de feature request**
3. **Explique o valor** - por que esta melhoria seria útil?
4. **Forneça exemplos** - como funcionaria na prática?

### 🔧 Contribuições de Código

1. **Fork o projeto**
2. **Crie uma branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Faça suas mudanças**
4. **Teste suas mudanças**
5. **Commit suas mudanças** (`git commit -m 'feat: add some AmazingFeature'`)
6. **Push para a branch** (`git push origin feature/AmazingFeature`)
7. **Abra um Pull Request**

## 🔄 Processo de Desenvolvimento

### 🛠️ Setup Local

```bash
# 1. Fork e clone o repositório
git clone https://github.com/seu-usuario/dashboard-executivo.git
cd dashboard-executivo

# 2. Instale dependências
pnpm install

# 3. Execute em modo desenvolvimento
pnpm run dev

# 4. Abra http://localhost:3000
```

### 🧪 Executando Testes

```bash
# Executar todos os testes
pnpm run test

# Executar testes com watch
pnpm run test:watch

# Executar com coverage
pnpm run test:coverage
```

### 🔍 Verificação de Qualidade

```bash
# Verificar qualidade completa
pnpm run quality:check

# Corrigir problemas automaticamente
pnpm run quality:fix
```

## 📝 Padrões de Código

### 💻 Estilo de Código

Seguimos os padrões estabelecidos pelo:

- **ESLint** - para linting de JavaScript/TypeScript
- **Prettier** - para formatação consistente
- **TypeScript** - para tipagem estática

### 📏 Convenções

#### **Commits Convencionais**

Use o formato: `tipo(escopo): descrição`

```bash
feat: adiciona sistema de autenticação
fix: corrige bug no cálculo de porcentagem
docs: atualiza README com novas instruções
style: ajusta espaçamento nos componentes
refactor: reorganiza estrutura de componentes
test: adiciona testes para módulo de PDF
chore: atualiza dependências do projeto
```

#### **Nomenclatura**

```typescript
// Componentes - PascalCase
const DashboardComponent = () => {}

// Funções - camelCase
const calculateProgress = () => {}

// Constantes - UPPER_SNAKE_CASE
const API_ENDPOINTS = {}

// Arquivos - kebab-case
// dashboard-component.tsx
// pdf-export-utils.ts
```

#### **Estrutura de Componentes**

```typescript
import React from 'react'
import { cn } from '@/lib/utils'

// 1. Tipos e interfaces
interface ComponentProps {
  className?: string
  children: React.ReactNode
}

// 2. Componente principal
export const Component: React.FC<ComponentProps> = ({
  className,
  children,
  ...props
}) => {
  // 3. Hooks
  const [state, setState] = useState()

  // 4. Funções
  const handleAction = () => {}

  // 5. Efeitos
  useEffect(() => {}, [])

  // 6. Render
  return (
    <div className={cn("base-styles", className)} {...props}>
      {children}
    </div>
  )
}

// 7. Export default (se necessário)
export default Component
```

## 🔄 Processo de Pull Request

### ✅ Checklist Antes de Enviar

- \[ ] **Branch atualizada** - rebase com main/master
- \[ ] **Testes passando** - `pnpm run test`
- \[ ] **Linting limpo** - `pnpm run lint`
- \[ ] **Build funcionando** - `pnpm run build`
- \[ ] **Documentação atualizada** - se necessário
- \[ ] **Commits limpos** - use squash se necessário

### 📝 Template de Pull Request

```markdown
## 📋 Descrição

Breve descrição das mudanças realizadas.

## 🔄 Tipo de Mudança

- [ ] Bug fix (mudança que corrige um problema)
- [ ] Nova feature (mudança que adiciona funcionalidade)
- [ ] Breaking change (mudança que quebra compatibilidade)
- [ ] Documentação (mudança apenas em documentação)

## 🧪 Como Foi Testado?

Descreva os testes realizados:

- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Testes manuais

## 📷 Screenshots (se aplicável)

Adicione screenshots para mudanças visuais.

## ✅ Checklist

- [ ] Código segue padrões do projeto
- [ ] Self-review do código foi feito
- [ ] Código está comentado adequadamente
- [ ] Documentação foi atualizada
- [ ] Mudanças não geram warnings
- [ ] Testes foram adicionados/atualizados
```

### 👀 Processo de Review

1. **Review Automático** - CI/CD executa verificações
2. **Review Manual** - Maintainer revisa o código
3. **Feedback** - Discussão e ajustes se necessário
4. **Aprovação** - Merge quando aprovado

## 🐛 Reportando Bugs

### 📝 Template de Bug Report

```markdown
**Descreva o bug** Descrição clara e concisa do problema.

**Para Reproduzir** Passos para reproduzir:

1. Vá para '...'
2. Clique em '....'
3. Role para baixo até '....'
4. Veja o erro

**Comportamento Esperado** O que deveria acontecer.

**Screenshots** Adicione screenshots se aplicável.

**Ambiente:**

- OS: [e.g. iOS]
- Browser [e.g. chrome, safari]
- Version [e.g. 22]
- Node.js version
- pnpm version

**Contexto Adicional** Qualquer outro contexto sobre o problema.
```

## 💡 Sugerindo Melhorias

### 📝 Template de Feature Request

```markdown
**A feature está relacionada a um problema?** Descrição clara do problema. Ex: Sempre fico frustrado
quando [...]

**Descreva a solução desejada** Descrição clara do que você gostaria que acontecesse.

**Descreva alternativas consideradas** Descrição de soluções alternativas ou features consideradas.

**Contexto Adicional** Qualquer outro contexto ou screenshots sobre a feature request.
```

## 🏷️ Labels

Usamos labels para organizar issues e PRs:

- **🐛 bug** - Algo não está funcionando
- **💡 enhancement** - Nova feature ou melhoria
- **📚 documentation** - Melhorias na documentação
- **❓ question** - Pergunta ou discussão
- **🚀 feature** - Nova funcionalidade
- **🔧 maintenance** - Manutenção técnica
- **🎨 ui/ux** - Melhorias de interface

## 🎯 Prioridades

- **P1** - Crítico (bugs que quebram a aplicação)
- **P2** - Alto (features importantes)
- **P3** - Médio (melhorias)
- **P4** - Baixo (nice-to-have)

## 📞 Precisa de Ajuda?

- **📖 Documentação**: [docs/README.md](./docs/README.md)
- **💬 Discussions**:
  [GitHub Discussions](https://github.com/gb-locacoes/dashboard-executivo/discussions)
- **📧 Email**: <dev@gb-locacoes.com>

---

**Obrigado por contribuir! 🙏**

Sua ajuda torna este projeto melhor para todos.
