# 🚀 GB Locações - Dashboard Executivo de Progresso

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.12-38B2AC?style=for-the-badge&logo=tailwind-css)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://prettier.io/)
[![Linting: ESLint](https://img.shields.io/badge/linting-eslint-4B32C3.svg?style=for-the-badge)](https://eslint.org/)

## Dashboard Executivo de Progresso

_Uma solução enterprise-grade para acompanhamento de progresso, métricas e roadmap de projetos de
TI_

</div>

---

## 📋 Índice

- [🎯 Visão Geral](#-visão-geral)
- [✨ Funcionalidades](#-funcionalidades)
- [🏗️ Arquitetura](#️-arquitetura)
- [🛠️ Stack Tecnológica](#️-stack-tecnológica)
- [🚀 Quick Start](#-quick-start)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🔧 Scripts Disponíveis](#-scripts-disponíveis)
- [📊 Componentes Principais](#-componentes-principais)
- [🎨 Design System](#-design-system)
- [📱 Responsividade](#-responsividade)
- [🔒 Segurança](#-segurança)
- [📈 Performance](#-performance)
- [🧪 Qualidade de Código](#-qualidade-de-código)
- [📚 Documentação](#-documentação)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

---

## 🎯 Visão Geral

O **GB Locações - Dashboard Executivo de Progresso** é uma aplicação web moderna e sofisticada
desenvolvida para gestores de projetos de TI acompanharem o progresso de desenvolvimento de software
de forma visual, intuitiva e executiva.

### 🎖️ Características Enterprise

- **Dashboard Executivo**: Interface de alto nível para tomada de decisões estratégicas
- **Métricas em Tempo Real**: Indicadores de progresso, custos e cronogramas
- **Roadmap Visual**: Mapeamento completo de etapas e dependências
- **Exportação Profissional**: Geração de relatórios em PDF para apresentações executivas
- **Design System Consistente**: Interface unificada e profissional
- **Arquitetura Escalável**: Base sólida para futuras expansões

---

## ✨ Funcionalidades

### 📊 **Dashboard Executivo**

- **Visão Geral**: Métricas consolidadas de progresso e investimento
- **Indicadores KPI**: Percentual de conclusão, valores recebidos e pendentes
- **Status em Tempo Real**: Estado atual de cada etapa do projeto

### 📈 **Gráficos e Visualizações**

- **Gráfico de Barras**: Progresso por etapa (Pago vs Restante)
- **Gráfico de Linha**: Acumulado planejado vs recebido
- **Gráfico de Pizza**: Distribuição geral de investimentos
- **Comparativo de Mercado**: Benchmark com outras soluções

### 🗺️ **Roadmap Detalhado**

- **8 Etapas Estruturadas**: Desde apresentação funcional até IA avançada
- **Subetapas Detalhadas**: Breakdown completo de cada fase
- **Justificativas Técnicas**: Explicações para cada investimento
- **Status Visual**: Indicadores visuais de progresso

### 📄 **Exportação e Relatórios**

- **PDF Profissional**: Geração de relatórios executivos
- **Alta Qualidade**: Renderização em 2x para máxima nitidez
- **Metadados Completos**: Informações estruturadas do projeto
- **Formatação Executiva**: Layout otimizado para apresentações

---

## 🏗️ Arquitetura

### 🎯 **Padrões Arquiteturais**

- **App Router**: Arquitetura moderna do Next.js 15
- **Component-Based**: Arquitetura baseada em componentes React
- **Type-Safe**: TypeScript em todo o projeto
- **Utility-First**: CSS com abordagem Tailwind CSS

### 🏛️ **Estrutura de Camadas**

```mermaid
┌─────────────────────────────────────┐
│           Presentation Layer        │ ← React Components + Tailwind
├─────────────────────────────────────┤
│           Business Logic            │ ← TypeScript + Custom Hooks
├─────────────────────────────────────┤
│           Data Layer                │ ← Static Data + State Management
├─────────────────────────────────────┤
│           Infrastructure            │ ← Next.js + Build Tools
└─────────────────────────────────────┘
```

### 🔄 **Fluxo de Dados**

1. **Estado Local**: React hooks para gerenciamento de estado
2. **Props Drilling**: Comunicação entre componentes
3. **Event Handlers**: Interações do usuário
4. **Renderização**: Atualização da interface

---

## 🛠️ Stack Tecnológica

### 🎨 **Frontend Framework**

- **Next.js 15.2.4**: Framework React com App Router
- **React 19**: Biblioteca de interface do usuário
- **TypeScript 5**: Tipagem estática e desenvolvimento seguro

### 🎨 **Styling & UI**

- **Tailwind CSS 4.1.12**: Framework CSS utility-first
- **Tailwind CSS Animate**: Animações e transições
- **CSS Variables**: Sistema de design tokens
- **Responsive Design**: Mobile-first approach

### 📊 **Data Visualization**

- **Recharts**: Biblioteca de gráficos React
- **Chart Types**: Barras, linhas, pizza e mais
- **Responsive Charts**: Adaptação automática ao viewport
- **Custom Styling**: Temas e cores personalizados

### 🖨️ **Export & Utilities**

- **html2canvas**: Captura de tela para PDF
- **jsPDF**: Geração de documentos PDF
- **Canvas API**: Manipulação de imagens
- **File Download**: Download automático de relatórios

### 🛠️ **Development Tools**

- **ESLint**: Linting de código JavaScript/TypeScript
- **Prettier**: Formatação automática de código
- **PostCSS**: Processamento de CSS
- **Autoprefixer**: Compatibilidade cross-browser

---

## 🚀 Quick Start

### 📋 **Pré-requisitos**

- **Node.js**: Versão 18.17 ou superior
- **pnpm**: Gerenciador de pacotes (recomendado)
- **Git**: Controle de versão

### ⚡ **Instalação Rápida**

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/dashboard-executivo-de-progresso.git
cd dashboard-executivo-de-progresso

# 2. Instale as dependências
pnpm install

# 3. Execute em modo desenvolvimento
pnpm run dev

# 4. Acesse a aplicação
open http://localhost:3000
```

### 🏗️ **Build de Produção**

```bash
# Build otimizado para produção
pnpm run build

# Iniciar servidor de produção
pnpm run start

# Verificar qualidade do código
pnpm run lint
pnpm run format:check
```

---

## 📁 Estrutura do Projeto

```tree
dashboard-executivo-de-progresso/
├── 📁 app/                          # App Router (Next.js 15)
│   ├── 📄 layout.tsx               # Layout principal da aplicação
│   ├── 📄 page.tsx                 # Página inicial
│   └── 📄 globals.css              # Estilos globais
├── 📁 components/                   # Componentes React reutilizáveis
│   ├── 📄 gb-locacoes-complete.tsx # Dashboard principal
│   └── 📄 theme-provider.tsx       # Provedor de tema
├── 📁 lib/                         # Utilitários e helpers
│   └── 📄 utils.ts                 # Funções utilitárias
├── 📁 public/                      # Assets estáticos
│   ├── 📄 placeholder-logo.png     # Logo placeholder
│   ├── 📄 placeholder-logo.svg     # Logo SVG
│   └── 📄 placeholder-user.jpg     # Avatar placeholder
├── 📁 styles/                      # Estilos adicionais
│   └── 📄 globals.css              # CSS global alternativo
├── 📄 .eslintrc.json               # Configuração ESLint
├── 📄 .prettierrc                  # Configuração Prettier
├── 📄 components.json              # Configuração shadcn/ui
├── 📄 next.config.mjs              # Configuração Next.js
├── 📄 package.json                 # Dependências e scripts
├── 📄 tailwind.config.js           # Configuração Tailwind CSS
└── 📄 tsconfig.json                # Configuração TypeScript
```

---

## 🔧 Scripts Disponíveis

### 🚀 **Desenvolvimento**

```bash
pnpm run dev          # Servidor de desenvolvimento
pnpm run build        # Build de produção
pnpm run start        # Servidor de produção
```

### 🧹 **Qualidade de Código**

```bash
pnpm run lint         # Verificação ESLint
pnpm run format       # Formatação com Prettier
pnpm run format:check # Verificação de formatação
```

### 📊 **Análise e Monitoramento**

```bash
pnpm run analyze      # Análise de bundle (se configurado)
pnpm run test         # Execução de testes (se configurado)
pnpm run test:watch   # Testes em modo watch (se configurado)
```

---

## 📊 Componentes Principais

### 🎯 **GBBudgetPresentation**

Componente principal que renderiza o dashboard executivo completo.

**Características:**

- **Estado Global**: Gerenciamento de estado da aplicação
- **Animações**: Transições suaves e efeitos visuais
- **Responsividade**: Adaptação automática a diferentes dispositivos
- **Interatividade**: Hover effects e feedback visual

**Props e Estado:**

```typescript
interface GBLBudgetPresentationProps {
  // Componente sem props externas
  // Estado interno gerenciado via React hooks
}

interface Module {
  id: number
  key: string
  title: string
  total: number
  paid: number
  substeps: Substep[]
}

interface Substep {
  name: string
  value: number
  justification: string
}
```

### 📈 **Componentes de Gráficos**

- **BarChart**: Progresso por etapa
- **LineChart**: Acumulado planejado vs recebido
- **PieChart**: Distribuição geral
- **ResponsiveContainer**: Adaptação automática ao viewport

### 🎨 **Componentes de UI**

- **Stat**: Cards de métricas principais
- **Section**: Seções organizacionais
- **ChartContainer**: Containers para gráficos
- **Icon Components**: Sistema de ícones SVG

---

## 🎨 Design System

### 🎨 **Paleta de Cores**

```css
/* Cores Principais */
--purple-500: #8b5cf6 /* Primary */ --purple-400: #a78bfa /* Secondary */ --purple-300: #c4b5fd
  /* Tertiary */ --violet-500: #8b5cf6 /* Accent */ --violet-400: #a855f7 /* Accent Secondary */
  /* Cores de Estado */ --green-400: #4ade80 /* Success */ --yellow-400: #facc15 /* Warning */
  --red-400: #f87171 /* Error */ --blue-400: #60a5fa /* Info */;
```

### 🎭 **Tipografia**

- **Fonte Principal**: Geist Sans (moderna e legível)
- **Fonte Mono**: Geist Mono (para código e dados)
- **Hierarquia**: Sistema de tamanhos consistente
- **Responsividade**: Escala automática por dispositivo

### 🎪 **Animações e Transições**

- **Entrada**: Fade-in com translate para elementos
- **Hover**: Efeitos de escala e sombra
- **Transições**: Durações consistentes (300ms, 500ms, 700ms)
- **Easing**: Funções de suavização naturais

---

## 📱 Responsividade

### 📱 **Breakpoints**

```css
/* Mobile First Approach */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

### 📐 **Grid System**

- **Mobile**: 1 coluna
- **Tablet**: 2 colunas
- **Desktop**: 4 colunas para stats, 2 para gráficos
- **Adaptativo**: Layout flexível baseado em conteúdo

### 🎯 **Componentes Responsivos**

- **Cards**: Redimensionamento automático
- **Gráficos**: Adaptação ao container
- **Texto**: Escala automática de tamanho
- **Espaçamento**: Margens e paddings adaptativos

---

## 🔒 Segurança

### 🛡️ **Práticas de Segurança**

- **TypeScript Strict**: Verificação de tipos rigorosa
- **ESLint Rules**: Regras de segurança configuradas
- **Input Validation**: Validação de dados de entrada
- **XSS Prevention**: Sanitização de conteúdo dinâmico

### 🔐 **Configurações de Segurança**

- **Content Security Policy**: Headers de segurança
- **HTTPS Only**: Redirecionamento para HTTPS
- **Secure Headers**: Headers de segurança configurados
- **Dependency Scanning**: Verificação de vulnerabilidades

---

## 📈 Performance

### ⚡ **Otimizações Implementadas**

- **Code Splitting**: Carregamento sob demanda
- **Lazy Loading**: Importação dinâmica de componentes
- **Image Optimization**: Otimização automática de imagens
- **Bundle Analysis**: Análise de tamanho de bundle

### 📊 **Métricas de Performance**

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

### 🚀 **Estratégias de Performance**

- **Static Generation**: Geração estática quando possível
- **Incremental Static Regeneration**: Atualizações incrementais
- **Edge Caching**: Cache na edge para melhor performance
- **Bundle Optimization**: Otimização de dependências

---

## 🧪 Qualidade de Código

### 🔍 **Linting e Formatação**

- **ESLint**: Regras Next.js + TypeScript
- **Prettier**: Formatação automática de código
- **TypeScript**: Verificação de tipos em tempo de compilação
- **Husky**: Hooks de pre-commit (se configurado)

### 📏 **Padrões de Código**

- **Conventional Commits**: Padrão de mensagens de commit
- **Component Structure**: Estrutura consistente de componentes
- **Naming Conventions**: Convenções de nomenclatura
- **File Organization**: Organização lógica de arquivos

### 🧪 **Testes (Recomendado)**

```bash
# Instalar dependências de teste
pnpm add -D jest @testing-library/react @testing-library/jest-dom

# Executar testes
pnpm run test
pnpm run test:watch
pnpm run test:coverage
```

---

## 📚 Documentação

### 📖 **Documentação Técnica**

- **API Reference**: Documentação de componentes
- **Architecture Guide**: Guia de arquitetura
- **Component Library**: Biblioteca de componentes
- **Style Guide**: Guia de estilo e design

### 🎯 **Documentação de Usuário**

- **User Manual**: Manual do usuário
- **Feature Guide**: Guia de funcionalidades
- **Troubleshooting**: Solução de problemas
- **FAQ**: Perguntas frequentes

---

## 🤝 Contribuição

### 🌟 **Como Contribuir**

1. **Fork** o projeto
2. **Clone** seu fork localmente
3. **Crie** uma branch para sua feature
4. **Desenvolva** sua funcionalidade
5. **Teste** suas mudanças
6. **Commit** seguindo Conventional Commits
7. **Push** para sua branch
8. **Abra** um Pull Request

### 📝 **Padrões de Contribuição**

- **Code Style**: Seguir padrões ESLint + Prettier
- **TypeScript**: Usar tipagem adequada
- **Testing**: Incluir testes para novas funcionalidades
- **Documentation**: Atualizar documentação relevante

### 🐛 **Reportando Bugs**

- **Issue Template**: Usar template de issue
- **Reprodução**: Incluir passos para reproduzir
- **Environment**: Especificar ambiente
- **Screenshots**: Incluir capturas de tela quando relevante

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para
detalhes.

### 📋 **Termos da Licença**

- **Uso Comercial**: ✅ Permitido
- **Modificação**: ✅ Permitido
- **Distribuição**: ✅ Permitido
- **Uso Privado**: ✅ Permitido
- **Responsabilidade**: ❌ Não há garantias

---

## 🏆 Reconhecimentos

### 👨‍💻 **Desenvolvedores**

- **Equipe GB Locações**: Visão e requisitos do projeto
- **Arquitetos de Software**: Design da arquitetura
- **Designers UX/UI**: Interface e experiência do usuário
- **QA Engineers**: Garantia de qualidade

### 🛠️ **Tecnologias e Ferramentas**

- **Next.js Team**: Framework React de ponta
- **Vercel**: Plataforma de deploy e hosting
- **Tailwind CSS**: Framework CSS utility-first
- **Recharts**: Biblioteca de gráficos React

---

## 📞 Suporte e Contato

### 🆘 **Canais de Suporte**

- **Issues**:
  [GitHub Issues](https://github.com/seu-usuario/dashboard-executivo-de-progresso/issues)
- **Discussions**:
  [GitHub Discussions](https://github.com/seu-usuario/dashboard-executivo-de-progresso/discussions)
- **Email**: <suporte@gb-locacoes.com>
- **Documentação**:
  [Wiki do Projeto](https://github.com/seu-usuario/dashboard-executivo-de-progresso/wiki)

### 🌐 **Links Úteis**

- **Website**: [gb-locacoes.com](https://gb-locacoes.com)
- **Documentação**: [docs.gb-locacoes.com](https://docs.gb-locacoes.com)
- **Status**: [status.gb-locacoes.com](https://status.gb-locacoes.com)

---

<div align="center">

## ⭐ Se este projeto foi útil, considere dar uma estrela! ⭐

_Construído com ❤️ pela equipe GB Locações_

</div>
