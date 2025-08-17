# 🏗️ Arquitetura do Sistema

Este documento descreve a arquitetura técnica do Dashboard Executivo de Progresso, incluindo
decisões de design, padrões utilizados e estrutura do código.

## 🎯 Visão Geral da Arquitetura

O sistema é construído seguindo princípios de **arquitetura moderna**, **escalabilidade** e
**manutenibilidade**, utilizando as melhores práticas da indústria.

### Princípios de Design

* **Component-Based**: Arquitetura baseada em componentes reutilizáveis
* **Type-Safe**: Desenvolvimento com TypeScript rigoroso
* **Performance-First**: Otimização para velocidade e eficiência
* **Mobile-First**: Design responsivo desde o início
* **Accessibility**: Acessibilidade integrada em todos os componentes

## 🏛️ Estrutura de Camadas

### **Frontend Layer (React + Next.js)**

```
┌─────────────────────────────────────┐
│           User Interface            │ ← Componentes React
├─────────────────────────────────────┤
│         Business Logic              │ ← Hooks e Lógica de Negócio
├─────────────────────────────────────┤
│         Data Management             │ ← Estado e Gerenciamento de Dados
├─────────────────────────────────────┤
│         API Integration             │ ← Comunicação com Backend
└─────────────────────────────────────┘
```

### **Backend Layer (Next.js API Routes)**

```
┌─────────────────────────────────────┐
│         API Endpoints               │ ← Rotas da API
├─────────────────────────────────────┤
│         Business Services           │ ← Serviços de Negócio
├─────────────────────────────────────┤
│         Data Access Layer          │ ← Acesso a Dados
├─────────────────────────────────────┤
│         External Integrations      │ ← Integrações Externas
└─────────────────────────────────────┘
```

## 🚀 Stack Tecnológica

### **Framework Principal**

#### **Next.js 15**

**Características:**

* **App Router**: Sistema de roteamento moderno
* **Server Components**: Componentes renderizados no servidor
* **Static Generation**: Geração estática otimizada
* **API Routes**: Endpoints de API integrados

**Vantagens:**

* Performance otimizada com SSR/SSG
* Roteamento automático baseado em arquivos
* Suporte nativo a TypeScript
* Otimizações automáticas de imagem e CSS

#### **React 19**

**Funcionalidades:**

* **Hooks**: useState, useEffect, useRef
* **Concurrent Features**: Renderização concorrente
* **Suspense**: Suspensão de componentes
* **Error Boundaries**: Tratamento de erros

**Benefícios:**

* Renderização mais eficiente
* Melhor experiência do usuário
* Suporte a recursos modernos do navegador

#### **TypeScript 5**

**Recursos:**

* **Strict Mode**: Modo rigoroso habilitado
* **Type Inference**: Inferência automática de tipos
* **Generic Types**: Tipos genéricos avançados
* **Utility Types**: Tipos utilitários

**Vantagens:**

* Detecção de erros em tempo de compilação
* Melhor IntelliSense e autocomplete
* Refatoração mais segura
* Documentação viva do código

### **Styling & UI**

#### **Tailwind CSS 3.4**

**Características:**

* **Utility-First**: Abordagem utility-first CSS
* **Custom Design System**: Sistema de design personalizado
* **Responsive Design**: Design responsivo integrado
* **Animation Support**: Suporte a animações

**Benefícios:**

* Desenvolvimento mais rápido
* Consistência visual
* Otimização automática de CSS
* Sistema de design escalável

#### **CSS Variables & Custom Properties**

**Implementação:**

```css
:root {
  --primary: oklch(0.205 0 0);
  --secondary: oklch(0.97 0 0);
  --accent: oklch(0.97 0 0);
}
```

**Vantagens:**

* Temas dinâmicos (claro/escuro)
* Consistência de cores
* Fácil manutenção
* Personalização em runtime

### **Data Visualization**

#### **Recharts**

**Tipos de Gráficos:**

* **BarChart**: Gráfico de barras empilhadas
* **LineChart**: Gráfico de linha temporal
* **PieChart**: Gráfico de pizza
* **ResponsiveContainer**: Container responsivo

**Características:**

* Componentes React nativos
* Animações suaves
* Responsividade automática
* Customização avançada

### **Export & Utilities**

#### **jsPDF + html2canvas**

**Funcionalidades:**

* **PDF Generation**: Geração de relatórios PDF
* **Image Capture**: Captura de componentes
* **Custom Styling**: Estilos personalizados
* **Multi-page Support**: Suporte a múltiplas páginas

## 📁 Estrutura do Projeto

```
dashboard-executivo-de-progresso/
├── app/                          # App Router (Next.js 15)
│   ├── globals.css              # Estilos globais
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página inicial
├── components/                   # Componentes React
│   ├── gb-locacoes-complete.tsx # Dashboard principal
│   ├── pdf-export.tsx           # Exportação PDF
│   └── theme-provider.tsx       # Provedor de tema
├── lib/                         # Utilitários e helpers
│   └── utils.ts                 # Funções utilitárias
├── public/                      # Assets estáticos
├── styles/                      # Estilos adicionais
├── docs/                        # Documentação
└── scripts/                     # Scripts de automação
```

## 📊 Componentes Principais

### **Dashboard Component**

**Responsabilidades:**

* Renderização do dashboard principal
* Gerenciamento de estado dos projetos
* Integração com gráficos e métricas
* Responsividade e adaptação mobile

**Arquitetura:**

```typescript
interface DashboardProps {
  data: ProjectData[]
  theme: "light" | "dark"
  onExport: () => void
}
```

### **Chart Components**

**Estrutura:**

* **ResponsiveContainer**: Wrapper responsivo
* **Chart Components**: Componentes específicos de gráfico
* **Customization**: Props para personalização
* **Animation**: Animações e transições

### **Theme Provider**

**Funcionalidades:**

* Gerenciamento de tema global
* Persistência de preferências
* Transições suaves entre temas
* Integração com CSS variables

## 🎨 Design System

### **Sistema de Cores**

**Paleta Principal:**

* **Primary**: Tons de roxo (#8b5cf6)
* **Secondary**: Tons de violeta (#a855f7)
* **Accent**: Tons de azul (#3b82f6)
* **Neutral**: Escala de cinzas

**Variáveis CSS:**

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
}
```

### **Tipografia**

**Hierarquia:**

* **Heading 1**: 2.5rem (40px)
* **Heading 2**: 2rem (32px)
* **Heading 3**: 1.5rem (24px)
* **Body**: 1rem (16px)
* **Small**: 0.875rem (14px)

**Fontes:**

* **Primary**: GeistSans (sans-serif)
* **Monospace**: GeistMono (monospace)
* **Fallbacks**: System fonts

### **Espaçamento**

**Sistema de Grid:**

* **Base Unit**: 0.25rem (4px)
* **Spacing Scale**: 0.25, 0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16
* **Container Max Widths**: sm, md, lg, xl, 2xl, 7xl

## 📱 Responsividade

### **Breakpoints**

**Mobile-First Approach:**

```css
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

/* Extra large devices */
@media (min-width: 1280px) {
  /* xl */
}
```

### **Componentes Responsivos**

**Adaptação Automática:**

* Grid layouts flexíveis
* Imagens responsivas
* Texto adaptativo
* Navegação mobile-friendly

## 🔒 Segurança

### **Práticas Implementadas**

**Frontend:**

* Sanitização de inputs
* Validação de dados
* Proteção contra XSS
* HTTPS enforcement

**Backend:**

* Validação de API
* Rate limiting
* CORS configuration
* Input sanitization

## 📈 Performance

### **Otimizações**

**Next.js:**

* Code splitting automático
* Lazy loading de componentes
* Otimização de imagens
* Bundle analysis

**React:**

* Memoização de componentes
* Lazy loading
* Virtual scrolling
* Performance monitoring

**CSS:**

* PurgeCSS para Tailwind
* Minificação automática
* Critical CSS inlining
* Font optimization

## 🧪 Qualidade de Código

### **Ferramentas**

**Linting & Formatting:**

* **ESLint**: Análise estática de código
* **Prettier**: Formatação automática
* **TypeScript**: Verificação de tipos
* **Husky**: Git hooks

**Testing:**

* **Jest**: Framework de testes
* **React Testing Library**: Testes de componentes
* **Cypress**: Testes E2E
* **Coverage**: Relatórios de cobertura

### **Padrões de Código**

**Convenções:**

* Conventional Commits
* Semantic Versioning
* Component naming conventions
* File structure standards

## 🚀 Deploy e CI/CD

### **Pipeline de Deploy**

**Stages:**

1. **Build**: Compilação e otimização
2. **Test**: Execução de testes automatizados
3. **Quality**: Verificação de qualidade
4. **Deploy**: Implantação em produção

**Ferramentas:**

* **GitHub Actions**: CI/CD automation
* **Vercel**: Deploy automático
* **Docker**: Containerização
* **Monitoring**: Performance tracking

## 📚 Recursos Adicionais

### **Documentação Oficial**

* [Next.js Documentation](https://nextjs.org/docs)
* [React Documentation](https://react.dev/)
* [TypeScript Handbook](https://www.typescriptlang.org/docs/)
* [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### **Ferramentas de Desenvolvimento**

* [ESLint](https://eslint.org/)
* [Prettier](https://prettier.io/)
* [Recharts](https://recharts.org/)
* [html2canvas](https://html2canvas.hertzen.com/)

***

**Anterior**: [Primeiros Passos](quick-start.md) | **Próximo**: [Componentes](../components/) →
