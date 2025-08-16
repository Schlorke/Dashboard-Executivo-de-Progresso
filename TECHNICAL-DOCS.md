# 🔧 Documentação Técnica

## 📋 Visão Geral

Este documento fornece informações técnicas detalhadas para desenvolvedores que trabalham no projeto
**GB Locações - Dashboard Executivo de Progresso**.

***

## 🏗️ Arquitetura do Sistema

### 🎯 **Padrões Arquiteturais**

#### **App Router (Next.js 15)**

* **Estrutura**: Baseada em diretórios e arquivos
* **Roteamento**: Sistema de roteamento automático
* **Layouts**: Layouts aninhados e compartilhados
* **Loading States**: Estados de carregamento automáticos

#### **Component-Based Architecture**

* **Reutilização**: Componentes modulares e reutilizáveis
* **Composição**: Composição de componentes complexos
* **Props Interface**: Interfaces TypeScript bem definidas
* **State Management**: Gerenciamento de estado local

#### **Type-Safe Development**

* **TypeScript Strict**: Configuração rigorosa de tipos
* **Interface Definitions**: Interfaces bem definidas
* **Type Guards**: Verificações de tipo em runtime
* **Generic Types**: Tipos genéricos para reutilização

### 🏛️ **Estrutura de Camadas**

```mermaid
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
├─────────────────────────────────────┤
│           Infrastructure            │
│  ┌─────────────────────────────────┐ │
│  │      Next.js Framework         │ │
│  │     + Build Tools              │ │
│  │     + Development Tools        │ │
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

***

## 🛠️ Stack Tecnológica

### 🎨 **Frontend Framework**

#### **Next.js 15.2.4**

```typescript
// Configuração principal
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
}
```

**Características:**

* **App Router**: Sistema de roteamento moderno
* **Server Components**: Componentes renderizados no servidor
* **Static Generation**: Geração estática otimizada
* **API Routes**: Endpoints de API integrados

#### **React 19**

```typescript
// Hooks principais utilizados
const [isLoaded, setIsLoaded] = useState(false)
const [activeCard, setActiveCard] = useState<number | null>(null)
const dashboardRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  setIsLoaded(true)
}, [])
```

**Funcionalidades:**

* **Hooks**: useState, useEffect, useRef
* **Concurrent Features**: Renderização concorrente
* **Suspense**: Suspensão de componentes
* **Error Boundaries**: Tratamento de erros

#### **TypeScript 5**

```typescript
// Configuração TypeScript
{
  "compilerOptions": {
    "target": "ES6",
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "bundler",
    "forceConsistentCasingInFileNames": true
  }
}
```

**Recursos:**

* **Strict Mode**: Modo rigoroso habilitado
* **Type Inference**: Inferência automática de tipos
* **Generic Types**: Tipos genéricos avançados
* **Utility Types**: Tipos utilitários

### 🎨 **Styling & UI**

#### **Tailwind CSS 4.1.12**

```javascript
// Configuração Tailwind
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Custom colors */
      },
      borderRadius: {
        /* Custom border radius */
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

**Características:**

* **Utility-First**: Abordagem utility-first CSS
* **Custom Design System**: Sistema de design personalizado
* **Responsive Design**: Design responsivo integrado
* **Animation Support**: Suporte a animações

#### **CSS Variables & Custom Properties**

```css
/* Variáveis CSS personalizadas */
:root {
  --purple-500: #8b5cf6;
  --purple-400: #a78bfa;
  --violet-500: #8b5cf6;
  --radius: 0.5rem;
}
```

### 📊 **Data Visualization**

#### **Recharts**

```typescript
// Exemplo de gráfico de barras
<BarChart data={perStageTotals}>
  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#e5e7eb" }} />
  <YAxis hide />
  <Tooltip formatter={(v: number) => brl.format(v)} />
  <Legend wrapperStyle={{ color: "#ffffff" }} />
  <Bar dataKey="Pago" fill="url(#paidGradient)" />
  <Bar dataKey="Restante" fill="url(#remainingGradient)" />
</BarChart>
```

**Tipos de Gráficos:**

* **BarChart**: Gráfico de barras empilhadas
* **LineChart**: Gráfico de linha temporal
* **PieChart**: Gráfico de pizza
* **ResponsiveContainer**: Container responsivo

### 🖨️ **Export & Utilities**

#### **html2canvas**

```typescript
// Captura de tela para PDF
const canvas = await html2canvas(clonedElement, {
  scale: 2,
  useCORS: true,
  allowTaint: true,
  backgroundColor: "#000000",
  width: clonedElement.scrollWidth,
  height: clonedElement.scrollHeight,
})
```

#### **jsPDF**

```typescript
// Geração de PDF
const pdf = new jsPDF("p", "mm", "a4")
pdf.setProperties({
  title: "GB Locações - Dashboard Executivo",
  subject: "Relatório de Progresso do Projeto",
  author: "GB Locações",
  creator: "Dashboard Executivo v2.0",
})
```

***

## 📁 Estrutura do Projeto

### 🗂️ **Organização de Diretórios**

```tree
dashboard-executivo-de-progresso/
├── 📁 app/                          # App Router (Next.js 15)
│   ├── 📄 layout.tsx               # Layout principal
│   ├── 📄 page.tsx                 # Página inicial
│   ├── 📄 globals.css              # Estilos globais
│   └── 📄 dynamic-styles.css       # Estilos dinâmicos
├── 📁 components/                   # Componentes React
│   ├── 📄 gb-locacoes-complete.tsx # Dashboard principal
│   └── 📄 theme-provider.tsx       # Provedor de tema
├── 📁 lib/                         # Utilitários
│   └── 📄 utils.ts                 # Funções utilitárias
├── 📁 public/                      # Assets estáticos
├── 📁 styles/                      # Estilos adicionais
└── 📄 Configurações                # Arquivos de configuração
```

### 🔧 **Arquivos de Configuração**

#### **package.json**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

#### **tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES6",
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "bundler",
    "forceConsistentCasingInFileNames": true
  }
}
```

#### **tailwind.config.js**

```javascript
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      /* Custom theme */
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

***

## 📊 Componentes Principais

### 🎯 **GBBudgetPresentation**

#### **Interface Principal**

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

#### **Estado da Aplicação**

```typescript
// Estados principais
const [isLoaded, setIsLoaded] = useState(false)
const [activeCard, setActiveCard] = useState<number | null>(null)
const dashboardRef = useRef<HTMLDivElement>(null)

// Dados dos módulos
const modules: Module[] = [
  {
    id: 1,
    key: "E1",
    title: "Etapa 1 — Apresentação Funcional (Portfólio)",
    total: 1000,
    paid: 1000,
    substeps: [
      /* ... */
    ],
  },
  // ... mais módulos
]
```

#### **Cálculos e Métricas**

```typescript
// Cálculos principais
const totalPlanned = modules.reduce((s, m) => s + m.total, 0)
const totalPaid = modules.reduce((s, m) => s + m.paid, 0)
const totalRemaining = totalPlanned - totalPaid
const percentPaid = Math.round((totalPaid / totalPlanned) * 100)

// Formatação de moeda
const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
})
```

### 📈 **Componentes de Gráficos**

#### **BarChart - Progresso por Etapa**

```typescript
const perStageTotals = modules.map((m) => ({
  name: m.key,
  Pago: m.paid,
  Restante: Math.max(0, m.total - m.paid)
}))

<BarChart data={perStageTotals}>
  <Bar dataKey="Pago" stackId="a" fill="url(#paidGradient)" />
  <Bar dataKey="Restante" stackId="a" fill="url(#remainingGradient)" />
</BarChart>
```

#### **LineChart - Acumulado**

```typescript
const cumulative = modules.reduce((acc, m) => {
  const prev = acc.length ? acc[acc.length - 1] : { Planejado: 0, Recebido: 0 }
  acc.push({
    name: m.key,
    Planejado: prev.Planejado + m.total,
    Recebido: prev.Recebido + m.paid
  })
  return acc
}, [])

<LineChart data={cumulative}>
  <Line dataKey="Planejado" stroke="#60a5fa" />
  <Line dataKey="Recebido" stroke="#34d399" />
</LineChart>
```

#### **PieChart - Distribuição Geral**

```typescript
const piePaid = [
  { name: "Recebido", value: totalPaid },
  { name: "A Receber", value: totalRemaining }
]

<PieChart>
  <Pie data={piePaid} dataKey="value" nameKey="name">
    {piePaid.map((_, i) => (
      <Cell key={i} fill={pieColors[i % pieColors.length]} />
    ))}
  </Pie>
</PieChart>
```

### 🎨 **Componentes de UI**

#### **Stat - Cards de Métricas**

```typescript
const Stat = ({ label, value, hint, delay = 0 }: {
  label: string
  value: string
  hint?: string
  delay?: number
}) => (
  <div className={`stat-card delay-${delay}`}>
    <div className="label">{label}</div>
    <div className="value">{value}</div>
    {hint && <div className="hint">{hint}</div>}
  </div>
)
```

#### **Section - Seções Organizacionais**

```typescript
const Section = ({ title, children, delay = 0 }: {
  title: string | React.ReactNode
  children: React.ReactNode
  delay?: number
}) => (
  <section className={`section delay-${delay}`}>
    <h2 className="title">{title}</h2>
    {children}
  </section>
)
```

***

## 🎨 Design System

### 🎨 **Paleta de Cores**

#### **Cores Principais**

```css
/* Cores do tema */
--purple-500: #8b5cf6 /* Primary */ --purple-400: #a78bfa /* Secondary */ --purple-300: #c4b5fd
  /* Tertiary */ --violet-500: #8b5cf6 /* Accent */ --violet-400: #a855f7 /* Accent Secondary */
  /* Cores de estado */ --green-400: #4ade80 /* Success */ --yellow-400: #facc15 /* Warning */
  --red-400: #f87171 /* Error */ --blue-400: #60a5fa /* Info */;
```

#### **Gradientes**

```css
/* Gradientes principais */
.bg-gradient-to-br {
  background: linear-gradient(to bottom right, var(--purple-900), var(--violet-900));
}

.bg-gradient-to-r {
  background: linear-gradient(to right, var(--purple-400), var(--violet-400));
}
```

### 🎭 **Tipografia**

#### **Sistema de Fontes**

```typescript
// Fontes do projeto
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

// Aplicação das fontes
<html className={`${GeistSans.variable} ${GeistMono.variable}`}>
```

#### **Hierarquia de Texto**

```css
/* Tamanhos de texto */
.text-4xl {
  font-size: 2.25rem;
} /* Títulos principais */
.text-2xl {
  font-size: 1.5rem;
} /* Subtítulos */
.text-lg {
  font-size: 1.125rem;
} /* Texto destacado */
.text-sm {
  font-size: 0.875rem;
} /* Texto secundário */
.text-xs {
  font-size: 0.75rem;
} /* Texto pequeno */
```

### 🎪 **Animações e Transições**

#### **Sistema de Transições**

```css
/* Classes de transição */
.transition-all {
  transition: all 0.3s ease-out;
}
.transition-opacity {
  transition: opacity 0.5s ease-out;
}
.transition-transform {
  transition: transform 0.7s ease-out;
}

/* Delays de transição */
.delay-100 {
  transition-delay: 100ms;
}
.delay-200 {
  transition-delay: 200ms;
}
.delay-500 {
  transition-delay: 500ms;
}
.delay-1000 {
  transition-delay: 1000ms;
}
```

#### **Animações CSS**

```css
/* Animações personalizadas */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

***

## 📱 Responsividade

### 📱 **Breakpoints**

#### **Sistema de Grid Responsivo**

```css
/* Breakpoints Tailwind */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

#### **Grid System**

```typescript
// Grid responsivo para stats
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <Stat label="Total Planejado" value={brl.format(totalPlanned)} />
  <Stat label="Recebido" value={brl.format(totalPaid)} />
  <Stat label="A Receber" value={brl.format(totalRemaining)} />
  <Stat label="Concluído por Valor" value={`${percentCompletedByValue}%`} />
</div>

// Grid responsivo para gráficos
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <Section title="Progresso por Etapa">{/* ... */}</Section>
  <Section title="Acumulado Planejado vs Recebido">{/* ... */}</Section>
</div>
```

### 🎯 **Componentes Responsivos**

#### **Adaptação de Gráficos**

```typescript
// Container responsivo para gráficos
<ResponsiveContainer width="100%" height="100%">
  <BarChart data={perStageTotals}>
    {/* Gráfico se adapta automaticamente */}
  </BarChart>
</ResponsiveContainer>
```

#### **Texto Responsivo**

```typescript
// Títulos responsivos
<h1 className="text-4xl sm:text-5xl font-black tracking-tight">
  GB Locações
</h1>

<p className="text-lg text-gray-300 font-medium">
  Dashboard Executivo de Progresso
</p>
```

***

## 🔒 Segurança

### 🛡️ **Práticas de Segurança**

#### **TypeScript Strict Mode**

```typescript
// Configuração rigorosa
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

#### **Input Validation**

```typescript
// Validação de entrada
const validateModule = (module: Module): boolean => {
  return (
    typeof module.id === "number" &&
    typeof module.key === "string" &&
    typeof module.total === "number" &&
    module.total >= 0
  )
}
```

#### **XSS Prevention**

```typescript
// Sanitização de conteúdo
const sanitizeContent = (content: string): string => {
  return content
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
}
```

***

## 📈 Performance

### ⚡ **Otimizações Implementadas**

#### **Code Splitting**

```typescript
// Importação dinâmica de dependências pesadas
const html2canvas = (await import("html2canvas")).default
const jsPDF = (await import("jspdf")).default
```

#### **Lazy Loading**

```typescript
// Carregamento sob demanda
const ExportIcon = lazy(() => import("./icons/ExportIcon"))
const BarChartIcon = lazy(() => import("./icons/BarChartIcon"))
```

#### **Image Optimization**

```typescript
// Otimização de imagens
import Image from 'next/image'

<Image
  src="/placeholder-logo.png"
  alt="Logo"
  width={200}
  height={100}
  priority={false}
/>
```

### 📊 **Métricas de Performance**

#### **Core Web Vitals**

```typescript
// Métricas de performance
const performanceMetrics = {
  FCP: "< 1.5s", // First Contentful Paint
  LCP: "< 2.5s", // Largest Contentful Paint
  CLS: "< 0.1", // Cumulative Layout Shift
  FID: "< 100ms", // First Input Delay
}
```

#### **Bundle Analysis**

```bash
# Análise de bundle
pnpm run analyze

# Verificação de tamanho
pnpm run build
# Verificar output/.next/static/chunks/
```

***

## 🧪 Qualidade de Código

### 🔍 **Linting e Formatação**

#### **ESLint Configuration**

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "warn"
  }
}
```

#### **Prettier Configuration**

```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2
}
```

### 📏 **Padrões de Código**

#### **Conventional Commits**

```bash
# Padrão de commits
feat: adiciona nova funcionalidade de exportação
fix: corrige erro de tipagem no componente Stat
docs: atualiza documentação técnica
style: formata código seguindo padrões
refactor: refatora lógica de cálculo de métricas
test: adiciona testes para componente ChartContainer
chore: atualiza dependências do projeto
```

#### **Naming Conventions**

```typescript
// Componentes: PascalCase
const GBLBudgetPresentation = () => {
  /* ... */
}
const Stat = () => {
  /* ... */
}
const Section = () => {
  /* ... */
}

// Funções: camelCase
const exportToPDF = async () => {
  /* ... */
}
const convertOklchToRgb = () => {
  /* ... */
}

// Constantes: UPPER_SNAKE_CASE
const TOTAL_MODULES = 8
const DEFAULT_DELAY = 100
```

***

## 🚀 Deploy e CI/CD

### 🌐 **Deploy**

#### **Vercel (Recomendado)**

```bash
# Deploy automático
vercel --prod

# Configuração de ambiente
vercel env add NEXT_PUBLIC_API_URL
vercel env add DATABASE_URL
```

#### **Build de Produção**

```bash
# Build otimizado
pnpm run build

# Verificação de build
pnpm run start

# Análise de bundle
pnpm run analyze
```

### 🔄 **CI/CD Pipeline**

#### **GitHub Actions**

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: pnpm install
      - run: pnpm run lint
      - run: pnpm run format:check
      - run: pnpm run build
```

#### **Pre-commit Hooks**

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

***

## 📚 Recursos Adicionais

### 🔗 **Links Úteis**

#### **Documentação Oficial**

* [Next.js Documentation](https://nextjs.org/docs)
* [React Documentation](https://react.dev/)
* [TypeScript Handbook](https://www.typescriptlang.org/docs/)
* [Tailwind CSS Documentation](https://tailwindcss.com/docs)

#### **Ferramentas de Desenvolvimento**

* [ESLint](https://eslint.org/)
* [Prettier](https://prettier.io/)
* [Recharts](https://recharts.org/)
* [html2canvas](https://html2canvas.hertzen.com/)

### 📖 **Artigos e Tutoriais**

#### **Performance**

* [Web Vitals](https://web.dev/vitals/)
* [Core Web Vitals](https://web.dev/learn-web-vitals/)
* [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)

#### **TypeScript**

* [TypeScript Best Practices](https://github.com/typescript-eslint/typescript-eslint)
* [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

***

## 🤝 Contribuição

### 🌟 **Como Contribuir**

#### **Processo de Contribuição**

1. **Fork** o projeto
2. **Clone** seu fork localmente
3. **Crie** uma branch para sua feature
4. **Desenvolva** sua funcionalidade
5. **Teste** suas mudanças
6. **Commit** seguindo Conventional Commits
7. **Push** para sua branch
8. **Abra** um Pull Request

#### **Padrões de Contribuição**

* **Code Style**: Seguir padrões ESLint + Prettier
* **TypeScript**: Usar tipagem adequada
* **Testing**: Incluir testes para novas funcionalidades
* **Documentation**: Atualizar documentação relevante

### 🐛 **Reportando Bugs**

#### **Issue Template**

```markdown
## 🐛 Descrição do Bug

Descrição clara e concisa do bug.

## 🔄 Passos para Reproduzir

1. Vá para '...'
2. Clique em '...'
3. Role para baixo até '...'
4. Veja o erro

## 📱 Ambiente

- OS: [ex: Windows 10]
- Browser: [ex: Chrome 120]
- Version: [ex: 0.1.0]

## 📸 Screenshots

Se aplicável, adicione screenshots para explicar o problema.
```

***

## 📞 Suporte e Contato

### 🆘 **Canais de Suporte**

#### **GitHub**

* **Issues**:
  [GitHub Issues](https://github.com/seu-usuario/dashboard-executivo-de-progresso/issues)
* **Discussions**:
  [GitHub Discussions](https://github.com/seu-usuario/dashboard-executivo-de-progresso/discussions)
* **Wiki**: [Wiki do Projeto](https://github.com/seu-usuario/dashboard-executivo-de-progresso/wiki)

#### **Contato Direto**

* **Email**: <suporte@gb-locacoes.com>
* **Website**: [gb-locacoes.com](https://gb-locacoes.com)
* **Documentação**: [docs.gb-locacoes.com](https://docs.gb-locacoes.com)

***

<div align="center">

## 🔧 Para mais informações técnicas

*Construído com ❤️ pela equipe GB Locações*

</div>
