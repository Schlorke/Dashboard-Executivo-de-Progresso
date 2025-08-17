# 📚 Documentação Completa - Dashboard Executivo de Progresso

Bem-vindo à documentação oficial do **Dashboard Executivo de Progresso** da GB Locações. Este
projeto oferece uma solução completa para visualização e acompanhamento de progresso de projetos
executivos.

## 🚀 Quick Start

- **[Instalação](getting-started/installation.md)** - Configure o projeto em minutos
- **[Primeiros Passos](getting-started/quick-start.md)** - Comece a usar rapidamente
- **[Arquitetura](getting-started/architecture.md)** - Entenda a estrutura do sistema

## 📖 Guias Principais

- **[Componentes](components/)** - Explore todos os componentes disponíveis
- **[Deploy](deployment/)** - Guias de implantação e CI/CD
- **[Contribuindo](contributing/)** - Como contribuir para o projeto

## 🛠️ Desenvolvimento e Scripts

### Comandos Principais (pnpm)

\`\`\`bash
# Formatação e Qualidade
pnpm format          # Formatar código
pnpm quality:check   # Verificar qualidade
pnpm quality:fix     # Corrigir automaticamente

# Build e Deploy
pnpm build           # Build de produção
pnpm dev             # Desenvolvimento local
pnpm start           # Servidor de produção
\`\`\`

### Scripts PowerShell (Windows)

\`\`\`powershell
# Formatação
.\scripts\format-all.ps1

# Correção automática
.\scripts\fix-all.ps1

# Verificação de qualidade
.\scripts\quality-check.ps1
\`\`\`

### Scripts Bash (Linux/Mac)

\`\`\`bash
# Formatação
./scripts/format-all.sh

# Dar permissão (primeira vez)
chmod +x ./scripts/*.sh
\`\`\`

## 🔧 Stack Tecnológica

- ⚡ **Next.js 15** - Framework React moderno com App Router
- 🎨 **Tailwind CSS 3.4** - Sistema de design utility-first
- 📊 **Recharts** - Gráficos profissionais e interativos
- 🔒 **TypeScript 5** - Tipagem estática e desenvolvimento seguro
- 📱 **Responsivo** - Design mobile-first para todos os dispositivos

## 🏗️ Arquitetura do Sistema

### Padrões Arquiteturais

- **App Router (Next.js 15)**: Sistema de roteamento moderno baseado em diretórios
- **Component-Based**: Arquitetura baseada em componentes reutilizáveis
- **Type-Safe**: Desenvolvimento com TypeScript rigoroso
- **Mobile-First**: Design responsivo desde o início

### Estrutura de Camadas

\`\`\`
┌─────────────────────────────────────┐
│           Presentation Layer        │
│  ┌─────────────────────────────────┐ │
│  │        React Components         │ │
│  │     + Tailwind CSS             │ │
│  │     + Custom Hooks             │ │
│  └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│           Business Logic            │
│  ┌─────────────────────────────────┐ │
│  │      TypeScript Logic          │ │
│  │     + Data Processing          │ │
│  │     + Business Rules           │ │
│  └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│           Data Layer                │
│  ┌─────────────────────────────────┐ │
│  │      Static Data               │ │
│  │     + State Management         │ │
│  │     + Data Transformations     │ │
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘
\`\`\`

## 🧩 Componentes Principais

### Dashboard Principal (`components/gb-locacoes-complete.tsx`)

- **Renderização responsiva** do dashboard principal
- **Gerenciamento de estado** dos projetos
- **Integração com gráficos** e métricas
- **Suporte a temas** claro/escuro

### Theme Provider (`components/theme-provider.tsx`)

- **Gerenciamento de tema global**
- **Persistência de preferências**
- **Transições suaves** entre temas
- **Integração com CSS variables**

### PDF Export (`components/pdf-export.tsx`)

- **Geração de PDF profissional**
- **Captura de componentes HTML**
- **Renderização em alta resolução**
- **Suporte a múltiplas páginas**

## 🎨 Design System

### Sistema de Cores

- **Primary**: Tons de roxo (#8b5cf6)
- **Secondary**: Tons de violeta (#a855f7)
- **Accent**: Tons de azul (#3b82f6)
- **Neutral**: Escala de cinzas

### Tipografia

- **Heading 1**: 2.5rem (40px)
- **Heading 2**: 2rem (32px)
- **Heading 3**: 1.5rem (24px)
- **Body**: 1rem (16px)
- **Small**: 0.875rem (14px)

### Responsividade

\`\`\`css
/* Mobile (default) */
.container {
  width: 100%;
}

/* Small devices */
@media (min-width: 640px) {
  /* sm */
}

/* Medium devices */
@media (min-width: 768px) {
  /* md */
}

/* Large devices */
@media (min-width: 1024px) {
  /* lg */
}
\`\`\`

## 📊 Data Visualization

### Recharts

\`\`\`typescript
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
\`\`\`

**Tipos de Gráficos:**

- **BarChart**: Gráfico de barras empilhadas
- **LineChart**: Gráfico de linha temporal
- **PieChart**: Gráfico de pizza para distribuição
- **AreaChart**: Gráfico de área para tendências

## 🚀 Deploy e CI/CD

### Ambientes Suportados

- 🏠 **Development**: Ambiente local para desenvolvimento
- 🧪 **Staging**: Ambiente de testes e validação
- 🚀 **Production**: Ambiente de produção
- 🔧 **Preview**: Deploys automáticos para branches

### Plataformas Suportadas

- **Vercel**: Deploy automático do Next.js
- **Netlify**: Deploy com build personalizado
- **AWS Amplify**: Deploy na AWS
- **Docker**: Containerização completa

## 🧪 Qualidade de Código

### Ferramentas

- **ESLint**: Análise estática de código
- **Prettier**: Formatação automática
- **TypeScript**: Verificação de tipos
- **Remark**: Linting de Markdown

### Padrões

- **Conventional Commits**
- **Semantic Versioning**
- **Component naming conventions**
- **File structure standards**

## 📋 Changelog

### \[Unreleased]

#### 🚀 Adicionado

- Sistema de documentação enterprise completo
- README.md com documentação técnica detalhada
- CHANGELOG.md para controle de versões
- Arquivo de estilos dinâmicos para eliminar CSS inline

#### 🔧 Corrigido

- **TypeScript Errors**: Corrigidos todos os erros de compilação
- **CSS Inline Styles**: Substituídos por classes CSS apropriadas
- **ESLint Issues**: Resolvidos todos os warnings e erros

#### 🎨 Melhorado

- **Code Organization**: Melhor organização e estrutura do código
- **Performance**: Otimizações de renderização e transições
- **Developer Experience**: Melhor experiência para desenvolvedores

### \[0.1.0] - 2024-12-19

#### 🎉 Lançamento Inicial

- **Dashboard Executivo**: Interface principal para gestão de projetos
- **Sistema de Gráficos**: Visualizações com Recharts
- **Roadmap Detalhado**: 8 etapas estruturadas do projeto
- **Exportação PDF**: Geração de relatórios executivos

## 🤝 Contribuindo

### Tipos de Contribuição

- 🐛 **Bug Reports**: Reportar bugs e problemas
- 💡 **Feature Requests**: Sugerir novas funcionalidades
- 📝 **Documentation**: Melhorar documentação
- 🔧 **Code**: Implementar funcionalidades ou correções

### Como Contribuir

1. **Fork** o projeto
2. **Crie** uma branch para sua feature
3. **Commit** suas mudanças seguindo Conventional Commits
4. **Push** para a branch
5. **Abra** um Pull Request

### Padrões de Commit

- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Documentação
- **style**: Formatação de código
- **refactor**: Refatoração
- **test**: Testes
- **chore**: Tarefas de manutenção

## 📞 Suporte

- **Issues**:
  [GitHub Issues](https://github.com/seu-usuario/dashboard-executivo-de-progresso/issues)
- **Discussions**:
  [GitHub Discussions](https://github.com/seu-usuario/dashboard-executivo-de-progresso/issues)
- **Email**: suporte@gb-locacoes.com

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](../LICENSE) para
detalhes.

## 🌟 Reconhecimentos

- **Equipe GB Locações** - Visão e requisitos do projeto
- **Next.js Team** - Framework React de ponta
- **Vercel** - Plataforma de deploy e hosting
- **Tailwind CSS** - Framework CSS utility-first
- **Recharts** - Biblioteca de gráficos React

---

<div align="center">

## ⭐ Se este projeto foi útil, considere dar uma estrela! ⭐

_Construído com ❤️ pela equipe GB Locações_

</div>
