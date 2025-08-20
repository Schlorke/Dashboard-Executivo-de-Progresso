"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts"
import PDFExport from "./pdf-export"

const BarChartIcon = () => (
  <svg
    className="h-6 w-6 text-purple-300"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M3 3v14h14V3H3zm2 12V9h2v6H5zm4 0V9h2v8H9zm4 0V5h2v10h-2z" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg
    className="h-6 w-6 text-purple-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
)

const PieChartIcon = () => (
  <svg
    className="h-6 w-6 text-purple-300"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6v6h6c0 3.31-2.69 6-6 6z" />
  </svg>
)

const MapIcon = () => (
  <svg
    className="h-6 w-6 text-purple-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
    />
  </svg>
)

const ClipboardListIcon = () => (
  <svg
    className="h-6 w-6 text-purple-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    />
  </svg>
)

const CheckIcon = () => (
  <svg
    className="h-5 w-5 text-green-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
)

const ZapIcon = () => (
  <svg
    className="h-5 w-5 text-yellow-400"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
      clipRule="evenodd"
    />
  </svg>
)

const BuildingIcon = () => (
  <svg
    className="h-6 w-6 text-purple-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
)

// Hook otimizado para detectar elementos na viewport (mobile-first) - SEM DEPENDÊNCIAS PROBLEMÁTICAS
const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || hasBeenVisible) return

    // Detectar viewport mobile para ajustar threshold dinamicamente
    const isMobile = window.innerWidth < 768
    const defaultThreshold = isMobile ? 0.15 : 0.6
    const defaultRootMargin = isMobile ? "50px 0px" : "0px"

    observerRef.current = new IntersectionObserver(
      entries => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setHasBeenVisible(true)
          // Parar de observar após primeira intersecção
          observerRef.current?.unobserve(element)
        }
      },
      {
        threshold: defaultThreshold,
        rootMargin: defaultRootMargin,
        ...options,
      }
    )

    observerRef.current.observe(element)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [hasBeenVisible, options]) // Adicionando dependências necessárias

  return [ref, hasBeenVisible] as const
}

export default function GBLBudgetPresentation() {
  const dashboardRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Observer SIMPLES apenas para adicionar classe CSS quando no centro
  useEffect(() => {
    if (!isClient) return

    const titleElement = document.querySelector(".roadmap-title-css-animation")
    if (!titleElement) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          titleElement.classList.add("in-view")
          observer.unobserve(titleElement)
        }
      },
      { threshold: 0.3, rootMargin: "50px 0px" }
    )

    observer.observe(titleElement)
    return () => observer.disconnect()
  }, [isClient])

  type Substep = { name: string; value: number; justification: string }
  type Module = {
    id: number
    key: string
    title: string
    total: number
    paid: number
    substeps: Substep[]
  }

  const modules: Module[] = [
    {
      id: 1,
      key: "E1",
      title: "Etapa 1 — Apresentação Funcional (Portfólio)",
      total: 1000,
      paid: 1000,
      substeps: [
        {
          name: "Setup & Arquitetura",
          value: 200,
          justification:
            "Configuração (Next.js + TS), estrutura, lint, rotas públicas, CI/CD e deploy inicial.",
        },
        {
          name: "Catálogo Básico + CMS",
          value: 500,
          justification:
            "Modelos Category/Equipment, cadastro/edição, listagem pública e imagens.",
        },
        {
          name: "UI/UX & Responsividade",
          value: 200,
          justification:
            "Aplicação do design system, tipografia, grid responsivo e acessibilidade (WCAG 2.2).",
        },
        {
          name: "Deploy & SEO Básico",
          value: 100,
          justification:
            "Build, metas/OG, sitemap/robots e setup inicial de analytics.",
        },
      ],
    },
    {
      id: 2,
      key: "E2",
      title: "Etapa 2 — Painel Administrativo Completo",
      total: 1200,
      paid: 800,
      substeps: [
        {
          name: "Autenticação & Proteção",
          value: 350,
          justification:
            "NextAuth + 2FA, RBAC (ADMIN/CLIENT), middleware e hardening (OWASP).",
        },
        {
          name: "CRUD Cat./Equip.",
          value: 400,
          justification:
            "CRUD completo (Zod/RHF), uploads (Vercel Blob), toasts e estados de erro/sucesso.",
        },
        {
          name: "Configurações Globais",
          value: 250,
          justification:
            "Logo, telefone, dados institucionais e opções de layout aplicadas no site.",
        },
        {
          name: "QA & Auditoria",
          value: 200,
          justification:
            "Logs essenciais, testes de fluxo crítico, permissões e micro-otimizações.",
        },
      ],
    },
    {
      id: 3,
      key: "E3",
      title: "Etapa 3 — Cadastro/Login de Clientes",
      total: 1000,
      paid: 0,
      substeps: [
        {
          name: "Cadastro & Validação",
          value: 300,
          justification:
            "Criação de contas, confirmação de e-mail, regras de senha e políticas.",
        },
        {
          name: "Login Social & Recuperação",
          value: 400,
          justification:
            "OAuth (Google), recuperação de senha e limitação de tentativas.",
        },
        {
          name: "Painel do Cliente",
          value: 300,
          justification: "Histórico de pedidos, dados pessoais e preferências.",
        },
      ],
    },
    {
      id: 4,
      key: "E4",
      title: "Etapa 4 — Orçamentos + Notificações",
      total: 900,
      paid: 0,
      substeps: [
        {
          name: "Formulário Inteligente",
          value: 350,
          justification:
            "Orçamentos com validações contextuais, máscaras e UX guiada.",
        },
        {
          name: "Notificações (E-mail/Queue)",
          value: 300,
          justification:
            "Integração transactional (Resend/SendGrid), templates e filas.",
        },
        {
          name: "Pipeline no Admin",
          value: 250,
          justification: "Visualização de status, filtros e ações rápidas.",
        },
      ],
    },
    {
      id: 5,
      key: "E5",
      title: "Etapa 5 — Contratos Digitais (ZapSign)",
      total: 800,
      paid: 0,
      substeps: [
        {
          name: "Templates & Merge",
          value: 300,
          justification:
            "Templates dinâmicos, merge de dados de locação e versionamento de termos.",
        },
        {
          name: "Integração ZapSign/Webhooks",
          value: 300,
          justification:
            "Criação, assinatura eletrônica e processamento de webhooks.",
        },
        {
          name: "Status & Auditoria",
          value: 200,
          justification:
            "UI de status, trilha de auditoria e reenvio de convites.",
        },
      ],
    },
    {
      id: 6,
      key: "E6",
      title: "Etapa 6 — Pagamentos Online (Stripe/Mercado Pago)",
      total: 1200,
      paid: 0,
      substeps: [
        {
          name: "Checkout Seguro",
          value: 500,
          justification:
            "Sessões de pagamento, itens de locação e impostos/taxas.",
        },
        {
          name: "Webhooks & Antifraude",
          value: 400,
          justification:
            "Verificação de assinatura, eventos e medidas antifraude.",
        },
        {
          name: "Recibos & Confirmações",
          value: 300,
          justification: "Recibos, e-mails de confirmação e UI pós-pagamento.",
        },
      ],
    },
    {
      id: 7,
      key: "E7",
      title: "Etapa 7 — Logística de Entrega/Retirada (Opcional)",
      total: 900,
      paid: 0,
      substeps: [
        {
          name: "Endereços & Agendamentos",
          value: 400,
          justification:
            "CRUD de endereços, janelas e regras de disponibilidade.",
        },
        {
          name: "Integração Melhor Envio",
          value: 300,
          justification: "Cotações, etiquetas e tracking (quando aplicável).",
        },
        {
          name: "UI Agenda/Rotas",
          value: 200,
          justification:
            "Agenda operacional e visão de rotas/otimização básica.",
        },
      ],
    },
    {
      id: 8,
      key: "E8",
      title: "Etapa 8 — IA de Recomendação + SEO Avançado",
      total: 1000,
      paid: 0,
      substeps: [
        {
          name: "Recomendação IA",
          value: 600,
          justification:
            "Heurística/ML leve para sugerir equipamentos relevantes.",
        },
        {
          name: "SEO Técnico Avançado",
          value: 400,
          justification: "Schemas, metas, otimização LCP/CLS e pré-render.",
        },
      ],
    },
  ]

  const brl = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  })

  const totalPlanned = modules?.reduce((s, m) => s + m.total, 0) || 0
  const totalPaid = modules?.reduce((s, m) => s + m.paid, 0) || 0
  const totalRemaining = totalPlanned - totalPaid

  const completedValue =
    modules?.filter(m => m.paid >= m.total)?.reduce((s, m) => s + m.total, 0) ||
    0

  const percentPaid = Math.round((totalPaid / totalPlanned) * 100)
  const percentCompletedByValue = Math.round(
    (completedValue / totalPlanned) * 100
  )

  const market = [
    { label: "Seu Orçamento (8 etapas)", value: totalPlanned },
    { label: "Freelancer (mediana)", value: 12000 },
    { label: "Pequena Agência", value: 20000 },
    { label: "Software House", value: 40000 },
  ]

  const perStageTotals =
    modules?.map(m => ({
      name: m.key,
      Pago: m.paid,
      Restante: Math.max(0, m.total - m.paid),
    })) || []

  const cumulative =
    modules?.reduce(
      (acc: { name: string; Planejado: number; Recebido: number }[], m) => {
        const prev = acc.length
          ? acc[acc.length - 1]
          : { Planejado: 0, Recebido: 0 }
        acc.push({
          name: m.key,
          Planejado: prev.Planejado + m.total,
          Recebido: prev.Recebido + m.paid,
        })
        return acc
      },
      []
    ) || []

  const piePaid = [
    { name: "Recebido", value: totalPaid },
    { name: "A Receber", value: totalRemaining },
  ]

  const pieColors = ["#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe"]

  // Componente Header com animação
  const HeaderContent = ({
    modules,
    totalPlanned,
    totalPaid,
    totalRemaining,
    percentPaid,
    dashboardRef,
  }: {
    modules: Module[]
    totalPlanned: number
    totalPaid: number
    totalRemaining: number
    percentPaid: number
    dashboardRef: React.RefObject<HTMLDivElement | null>
  }) => {
    const [ref, hasBeenVisible] = useIntersectionObserver({ threshold: 0.3 })

    return (
      <div
        ref={ref}
        className={`scroll-reveal-element flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between ${
          hasBeenVisible ? "lens-focus-visible" : "lens-focus-initial"
        }`}
      >
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-300/25 bg-gradient-to-r from-purple-400/15 to-violet-400/15 px-4 py-2 backdrop-blur-2xl">
            <div className="h-2 w-2 animate-pulse rounded-full bg-purple-300" />
            <span className="text-sm font-medium text-purple-200">
              Projeto em Andamento
            </span>
          </div>
          <h1 className="bg-gradient-to-r from-white via-purple-200 to-violet-300 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
            GB Locações
          </h1>
          <p className="text-lg font-medium text-gray-300">
            Dashboard Executivo de Progresso
          </p>
          <p className="text-sm text-gray-400">
            Atualizado em {new Date().toLocaleDateString("pt-BR")} • Versão 2.0
          </p>
        </div>
        <div className="flex gap-3">
          <PDFExport
            modules={modules}
            totalInvestment={totalPlanned}
            totalPaid={totalPaid}
            totalRemaining={totalRemaining}
            progressPercentage={percentPaid}
            dashboardRef={dashboardRef}
          />
        </div>
      </div>
    )
  }

  const Stat = ({
    label,
    value,
    hint,
  }: {
    label: string
    value: string
    hint?: string
  }) => {
    const [ref, hasBeenVisible] = useIntersectionObserver({ threshold: 0.5 })

    return (
      <div
        ref={ref}
        className={`scroll-reveal-element hover:shadow-3xl hover-scale-smooth duration-600 group relative cursor-pointer overflow-hidden rounded-3xl border border-purple-300/15 bg-gradient-to-br from-purple-900/30 via-violet-900/20 to-purple-800/15 p-6 shadow-2xl backdrop-blur-3xl transition-all ease-in-out will-change-transform hover:shadow-purple-400/20 ${
          hasBeenVisible ? "lens-focus-visible" : "lens-focus-initial"
        }`}
      >
        <div className="from-purple-400/8 to-violet-400/8 duration-600 absolute inset-0 bg-gradient-to-br via-transparent opacity-0 transition-all ease-in-out group-hover:opacity-100" />
        <div className="relative z-10">
          <div className="mb-2 text-sm font-medium text-purple-200">
            {label}
          </div>
          <div className="mb-1 bg-gradient-to-r from-white via-purple-100 to-violet-200 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
            {value}
          </div>
          {hint && (
            <div className="text-xs text-purple-300 opacity-80">{hint}</div>
          )}
        </div>
        <div className="hover-scale-smooth duration-600 animate-slow-pulse absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-purple-300/30 to-violet-300/30 blur-xl transition-all ease-in-out will-change-transform group-hover:scale-150" />
      </div>
    )
  }

  const Section = ({
    title,
    children,
  }: {
    title: string | React.ReactNode
    children: React.ReactNode
  }) => {
    const [ref, hasBeenVisible] = useIntersectionObserver({ threshold: 0.3 })

    return (
      <section
        ref={ref}
        className={`scroll-reveal-element space-y-6 ${
          hasBeenVisible ? "lens-focus-visible" : "lens-focus-initial"
        }`}
      >
        <h2 className="bg-gradient-to-r from-white via-purple-100 to-violet-200 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
          {title}
        </h2>
        {children}
      </section>
    )
  }

  const ChartContainer = ({
    children,
    className = "",
  }: {
    children: React.ReactNode
    className?: string
  }) => {
    const [ref, hasBeenVisible] = useIntersectionObserver({ threshold: 0.5 })

    return (
      <div
        ref={ref}
        className={`scroll-reveal-element hover:shadow-3xl will-change-shadow duration-600 relative h-80 overflow-hidden rounded-3xl border border-purple-300/15 bg-gradient-to-br from-purple-900/30 via-violet-900/20 to-purple-800/15 p-6 shadow-2xl backdrop-blur-3xl transition-all ease-in-out hover:shadow-purple-400/20 ${className} ${
          hasBeenVisible ? "lens-focus-visible" : "lens-focus-initial"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-transparent to-violet-400/5" />
        <div className="relative z-10 h-full">{children}</div>
      </div>
    )
  }

  // Componente ModuleCard com animação
  const ModuleCard = ({
    module: m,
    progress,
    isCompleted,
    isActive,
    brl,
  }: {
    module: Module
    progress: number
    isCompleted: boolean
    isActive: boolean
    brl: Intl.NumberFormat
  }) => {
    const [ref, hasBeenVisible] = useIntersectionObserver()

    return (
      <div
        ref={ref}
        className={`scroll-reveal-element hover:shadow-3xl hover-scale-smooth duration-600 group relative cursor-pointer overflow-hidden rounded-2xl border border-purple-300/15 bg-gradient-to-br from-purple-900/30 via-violet-900/20 to-purple-800/15 p-6 shadow-2xl backdrop-blur-3xl transition-all ease-in-out will-change-transform hover:scale-[1.02] sm:rounded-3xl sm:p-8 ${
          hasBeenVisible ? "lens-focus-visible" : "lens-focus-initial"
        }`}
      >
        <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
          {isCompleted ? (
            <div className="flex items-center gap-2 rounded-full border border-purple-300/35 bg-gradient-to-br from-purple-400/25 to-violet-500/25 px-3 py-1 backdrop-blur-xl">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              <span className="text-xs font-medium text-white">Concluída</span>
            </div>
          ) : isActive ? (
            <div className="flex items-center gap-2 rounded-full border border-violet-300/35 bg-gradient-to-br from-violet-400/25 to-purple-500/25 px-3 py-1 backdrop-blur-xl">
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
              <span className="text-xs font-medium text-white">
                Em Andamento
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-full border border-gray-400/35 bg-gradient-to-br from-gray-500/25 to-gray-600/25 px-3 py-1 backdrop-blur-xl">
              <div className="h-2 w-2 rounded-full bg-red-400" />
              <span className="text-xs font-medium text-white">Pendente</span>
            </div>
          )}
        </div>

        <div className="duration-600 absolute inset-0 bg-gradient-to-br opacity-0 transition-all ease-in-out group-hover:opacity-100">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${
              isCompleted
                ? "from-purple-400/12 to-purple-400/8 via-transparent"
                : isActive
                  ? "from-violet-400/12 to-violet-400/8 via-transparent"
                  : "from-purple-400/8 to-violet-400/8 via-transparent"
            }`}
          />
        </div>

        <div className="relative z-10">
          <div className="mb-6 flex items-start justify-between gap-4 pr-32">
            <div className="flex-1 space-y-2">
              <div className="text-sm font-bold tracking-wider text-purple-300">
                {m.key}
              </div>
              <h3 className="pr-4 text-xl font-bold leading-tight tracking-tight text-white">
                {m.title}
              </h3>
            </div>
          </div>

          <div className="absolute right-4 top-12 z-10 sm:right-6 sm:top-8">
            <div className="text-right">
              <div className="bg-gradient-to-r from-white to-purple-100 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                {brl.format(m.total)}
              </div>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <div className="rounded-xl border border-purple-400/25 bg-gradient-to-br from-purple-800/30 to-purple-700/20 p-3 backdrop-blur-2xl sm:rounded-2xl sm:p-4">
              <div className="mb-1 text-xs font-medium text-purple-200">
                Recebido
              </div>
              <div className="text-lg font-bold text-white">
                {brl.format(m.paid)}
              </div>
            </div>
            <div className="rounded-2xl border border-violet-400/25 bg-gradient-to-br from-violet-800/30 to-violet-700/20 p-4 backdrop-blur-2xl">
              <div className="mb-1 text-xs font-medium text-violet-200">
                Restante
              </div>
              <div className="text-lg font-bold text-white">
                {brl.format(Math.max(0, m.total - m.paid))}
              </div>
            </div>
            <div className="rounded-2xl border border-purple-400/25 bg-gradient-to-br from-purple-800/30 to-purple-800/30 p-4 backdrop-blur-xl">
              <div className="mb-1 text-xs font-medium text-purple-200">
                Progresso
              </div>
              <div className="text-lg font-bold text-white">{progress}%</div>
            </div>
          </div>

          <div className="space-y-4">
            {m.substeps.map((s, i) => (
              <div
                key={i}
                className="group/substep duration-600 flex items-start gap-4 rounded-2xl border border-transparent bg-gradient-to-r from-purple-800/15 to-transparent p-4 backdrop-blur-xl transition-all ease-in-out hover:border-purple-400/25 hover:from-purple-700/25 hover:to-violet-800/15"
              >
                <div
                  className={`mt-2 h-3 w-3 flex-shrink-0 rounded-full bg-gradient-to-br shadow-lg ${
                    [
                      "from-purple-400 to-purple-600",
                      "from-violet-400 to-violet-600",
                      "from-purple-300 to-purple-500",
                      "from-violet-300 to-violet-500",
                    ][i % 4]
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <div className="mb-1 text-sm font-semibold text-white">
                    {s.name}
                  </div>
                  <p className="text-xs leading-relaxed text-purple-200">
                    {s.justification}
                  </p>
                </div>
                <div className="whitespace-nowrap rounded-full border border-purple-400/25 bg-gradient-to-r from-purple-800/50 to-violet-800/50 px-3 py-1 text-sm font-bold text-white backdrop-blur-xl">
                  {brl.format(s.value)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hover-scale-smooth duration-600 animate-slow-pulse absolute -right-6 -top-6 z-0 h-32 w-32 rounded-full bg-gradient-to-br from-purple-300/30 to-violet-300/30 blur-2xl transition-all ease-in-out will-change-transform group-hover:scale-150" />
      </div>
    )
  }

  // Componente ExecutiveSummary com animação
  const ExecutiveSummary = ({ percentPaid }: { percentPaid: number }) => {
    const [ref, hasBeenVisible] = useIntersectionObserver({ threshold: 0.5 })

    return (
      <div
        ref={ref}
        className={`scroll-reveal-element relative overflow-hidden rounded-3xl border border-purple-300/15 bg-gradient-to-br from-purple-900/30 via-violet-900/20 to-purple-800/15 p-8 shadow-2xl backdrop-blur-3xl ${
          hasBeenVisible ? "lens-focus-visible" : "lens-focus-initial"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-transparent to-violet-400/5" />
        <div className="relative z-10 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                <span className="h-2 w-2 animate-pulse rounded-full bg-purple-300" />
                Status Atual
              </h3>
              <ul className="space-y-3 text-sm leading-relaxed">
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-white">
                    <span className="font-semibold">Etapa 1 concluída</span> —
                    Portfólio funcional entregue e aprovado
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ZapIcon />
                  <span className="text-white">
                    <span className="font-semibold">Etapa 2 em andamento</span>{" "}
                    — Painel administrativo (67% concluído)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">📊</span>
                  <span className="text-white">
                    <span className="font-semibold">Progresso geral:</span>{" "}
                    {percentPaid}% do investimento total recebido
                  </span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                <span className="h-2 w-2 animate-pulse rounded-full bg-violet-300" />
                Vantagem Competitiva
              </h3>
              <ul className="space-y-3 text-sm leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-lg">💰</span>
                  <span className="text-white">
                    <span className="font-semibold">Preço competitivo:</span>{" "}
                    50% menor que agências tradicionais
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">🎯</span>
                  <span className="text-white">
                    <span className="font-semibold">Entrega modular:</span>{" "}
                    Valor incremental a cada etapa
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">🚀</span>
                  <span className="text-white">
                    <span className="font-semibold">Tecnologia moderna:</span>{" "}
                    Next.js, TypeScript, arquitetura escalável
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!isClient) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black">
        <div className="text-lg text-white">Carregando dashboard...</div>
      </div>
    )
  }

  return (
    <div
      ref={dashboardRef}
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Luz superior direita - GRANDE */}
        <div className="animate-very-slow-pulse absolute -right-40 -top-40 z-0 h-80 w-80 rounded-full bg-gradient-to-br from-purple-400/50 to-violet-500/40 blur-3xl" />
        {/* Luz inferior esquerda - GRANDE */}
        <div className="animate-very-slow-pulse absolute -bottom-40 -left-40 z-0 h-80 w-80 rounded-full bg-gradient-to-br from-violet-400/40 to-purple-500/50 blur-3xl" />
        {/* Luz central - MUITO GRANDE */}
        <div className="animate-very-slow-pulse absolute left-1/2 top-1/2 z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-br from-purple-300/40 to-violet-300/35 blur-3xl" />
        {/* Luz superior esquerda - MÉDIA */}
        <div className="animate-very-slow-pulse absolute left-20 top-20 z-0 h-60 w-60 rounded-full bg-gradient-to-br from-violet-500/40 to-purple-400/35 blur-2xl" />
        {/* Luz inferior direita - MÉDIA */}
        <div className="animate-very-slow-pulse absolute bottom-20 right-20 z-0 h-60 w-60 rounded-full bg-gradient-to-br from-purple-400/35 to-violet-500/40 blur-2xl" />

        {/* Luzes adicionais para mais atmosfera */}
        <div className="animate-very-slow-pulse absolute left-1/4 top-1/4 z-0 h-40 w-40 rounded-full bg-gradient-to-br from-purple-400/30 to-violet-400/25 blur-2xl" />
        <div className="animate-very-slow-pulse absolute bottom-1/4 right-1/4 z-0 h-40 w-40 rounded-full bg-gradient-to-br from-violet-400/30 to-purple-400/25 blur-2xl" />
        <div className="animate-very-slow-pulse absolute bottom-1/3 left-1/3 z-0 h-32 w-32 rounded-full bg-gradient-to-br from-purple-300/35 to-violet-300/30 blur-xl" />
        <div className="animate-very-slow-pulse absolute right-1/3 top-1/3 z-0 h-32 w-32 rounded-full bg-gradient-to-br from-violet-300/35 to-purple-300/30 blur-xl" />
      </div>

      <header className="relative z-10 mx-auto max-w-7xl px-6 pb-8 pt-12">
        <HeaderContent
          modules={modules}
          totalPlanned={totalPlanned}
          totalPaid={totalPaid}
          totalRemaining={totalRemaining}
          percentPaid={percentPaid}
          dashboardRef={dashboardRef}
        />
      </header>

      <main className="relative z-10 mx-auto max-w-7xl space-y-12 px-6 pb-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            label="Total Planejado"
            value={brl.format(totalPlanned)}
            hint="Soma das 8 etapas"
          />
          <Stat
            label="Recebido"
            value={brl.format(totalPaid)}
            hint={`${percentPaid}% do total`}
          />
          <Stat
            label="A Receber"
            value={brl.format(totalRemaining)}
            hint={`${100 - percentPaid}% pendente`}
          />
          <Stat
            label="Concluído por Valor"
            value={`${percentCompletedByValue}%`}
            hint="Etapas quitadas vs total"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Section
            title={
              <div className="flex items-center gap-2">
                <BarChartIcon /> Progresso por Etapa
              </div>
            }
          >
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={perStageTotals}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#e5e7eb" }}
                  />
                  <YAxis hide />
                  <Tooltip
                    formatter={(v: number) => brl.format(v)}
                    contentStyle={{
                      backgroundColor: "rgba(139, 92, 246, 0.05)",
                      border: "1px solid rgba(196, 181, 253, 0.15)",
                      borderRadius: "16px",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      backdropFilter: "blur(60px)",
                      color: "#ffffff",
                    }}
                    labelStyle={{ color: "#ffffff" }}
                    itemStyle={{ color: "#ffffff" }}
                  />
                  <Legend wrapperStyle={{ color: "#ffffff" }} iconType="rect" />
                  <Bar
                    dataKey="Pago"
                    stackId="a"
                    fill="url(#paidGradient)"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="Restante"
                    stackId="a"
                    fill="url(#remainingGradient)"
                    radius={[8, 8, 0, 0]}
                  />
                  <defs>
                    <linearGradient
                      id="paidGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <linearGradient
                      id="remainingGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#c4b5fd" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Section>

          <Section
            title={
              <div className="flex items-center gap-2">
                <TrendingUpIcon /> Acumulado Planejado vs Recebido
              </div>
            }
          >
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cumulative}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#e5e7eb" }}
                  />
                  <YAxis
                    tickFormatter={v => brl.format(v)}
                    tick={{ fontSize: 12, fill: "#e5e7eb" }}
                  />
                  <Tooltip
                    formatter={(v: number) => brl.format(v)}
                    contentStyle={{
                      backgroundColor: "rgba(139, 92, 246, 0.05)",
                      border: "1px solid rgba(196, 181, 253, 0.15)",
                      borderRadius: "16px",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      backdropFilter: "blur(60px)",
                      color: "#ffffff",
                    }}
                    labelStyle={{ color: "#ffffff" }}
                    itemStyle={{ color: "#ffffff" }}
                  />
                  <Legend wrapperStyle={{ color: "#ffffff" }} iconType="rect" />
                  <Line
                    type="monotone"
                    dataKey="Planejado"
                    stroke="#60a5fa"
                    strokeWidth={3}
                    dot={{ fill: "#60a5fa", strokeWidth: 2, r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Recebido"
                    stroke="#34d399"
                    strokeWidth={3}
                    dot={{ fill: "#34d399", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Section>

          <Section
            title={
              <div className="flex items-center gap-2">
                <PieChartIcon /> Distribuição Geral
              </div>
            }
          >
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={piePaid}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={110}
                    label
                    stroke="none"
                  >
                    {piePaid.map((_, i) => (
                      <Cell key={i} fill={pieColors[i % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: number) => brl.format(v)}
                    contentStyle={{
                      backgroundColor: "rgba(139, 92, 246, 0.05)",
                      border: "1px solid rgba(196, 181, 253, 0.15)",
                      borderRadius: "16px",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      backdropFilter: "blur(60px)",
                      color: "#ffffff",
                    }}
                    labelStyle={{ color: "#ffffff" }}
                    itemStyle={{ color: "#ffffff" }}
                  />
                  <Legend wrapperStyle={{ color: "#ffffff" }} iconType="rect" />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Section>

          <Section
            title={
              <div className="flex items-center gap-2">
                <BuildingIcon /> Comparativo de Mercado
              </div>
            }
          >
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={market}>
                  <defs>
                    <linearGradient
                      id="marketGradient0"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <linearGradient
                      id="marketGradient1"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#c4b5fd" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                    <linearGradient
                      id="marketGradient2"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#9333ea" />
                    </linearGradient>
                    <linearGradient
                      id="marketGradient3"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#9333ea" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis
                    dataKey="label"
                    interval={0}
                    angle={-12}
                    textAnchor="end"
                    height={60}
                    tick={{ fontSize: 11, fill: "#e5e7eb" }}
                  />
                  <YAxis
                    tickFormatter={v => brl.format(v)}
                    tick={{ fontSize: 12, fill: "#e5e7eb" }}
                  />
                  <Tooltip
                    formatter={(v: number) => brl.format(v)}
                    contentStyle={{
                      backgroundColor: "rgba(139, 92, 246, 0.05)",
                      border: "1px solid rgba(196, 181, 253, 0.15)",
                      borderRadius: "16px",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      backdropFilter: "blur(60px)",
                      color: "#ffffff",
                    }}
                    labelStyle={{ color: "#ffffff" }}
                    itemStyle={{ color: "#ffffff" }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {market.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#marketGradient${index})`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Section>
        </div>

        {/* Título COM ANIMAÇÃO CSS PURA - SEM JS */}
        <div className="roadmap-title-css-animation mb-8">
          <h2 className="bg-gradient-to-r from-white via-purple-100 to-violet-200 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
            <div className="flex items-center gap-2">
              <MapIcon /> Roadmap Detalhado — Etapas & Investimento (
              {modules?.length || 0} etapas)
            </div>
          </h2>
        </div>

        {/* Grid dos cards SEPARADO do título */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 xl:grid-cols-2">
          {modules && modules.length > 0 ? (
            modules.map(m => {
              const progress = Math.round((m.paid / m.total) * 100)
              const isCompleted = m.paid >= m.total
              const isActive = m.paid > 0 && m.paid < m.total

              return (
                <ModuleCard
                  key={m.id}
                  module={m}
                  progress={progress}
                  isCompleted={isCompleted}
                  isActive={isActive}
                  brl={brl}
                />
              )
            })
          ) : (
            <div className="col-span-2 p-8 text-center text-white">
              <p>⚠️ Nenhum módulo encontrado. Verificando dados...</p>
            </div>
          )}
        </div>

        <Section
          title={
            <div className="flex items-center gap-2">
              <ClipboardListIcon /> Resumo Executivo & Insights
            </div>
          }
        >
          <ExecutiveSummary percentPaid={percentPaid} />
        </Section>
      </main>
    </div>
  )
}
