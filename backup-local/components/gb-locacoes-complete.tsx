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

const convertOklchToRgb = (element: HTMLElement) => {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_ELEMENT,
    null,
    false
  )

  const elements: HTMLElement[] = []
  let node = walker.nextNode()
  while (node) {
    elements.push(node as HTMLElement)
    node = walker.nextNode()
  }

  elements.forEach(el => {
    const computedStyle = window.getComputedStyle(el)
    const properties = [
      "color",
      "backgroundColor",
      "borderColor",
      "borderTopColor",
      "borderRightColor",
      "borderBottomColor",
      "borderLeftColor",
    ]

    properties.forEach(prop => {
      const value = computedStyle.getPropertyValue(prop)
      if (value && value.includes("oklch")) {
        // Convert common oklch colors to RGB equivalents
        const oklchToRgb: { [key: string]: string } = {
          "oklch(0.7 0.15 270)": "#8b5cf6", // purple-500
          "oklch(0.75 0.12 270)": "#a78bfa", // purple-400
          "oklch(0.8 0.1 270)": "#c4b5fd", // purple-300
          "oklch(0.85 0.08 270)": "#ddd6fe", // purple-200
          "oklch(0.9 0.05 270)": "#ede9fe", // purple-100
          "oklch(0.95 0.02 270)": "#f3f4f6", // gray-100
          "oklch(1 0 0)": "#ffffff", // white
          "oklch(0 0 0)": "#000000", // black
        }

        let rgbValue = value
        Object.entries(oklchToRgb).forEach(([oklch, rgb]) => {
          rgbValue = rgbValue.replace(
            new RegExp(oklch.replace(/[()]/g, "\\$&"), "g"),
            rgb
          )
        })

        if (rgbValue !== value) {
          ;(el as any).style[prop] = rgbValue
        }
      }
    })
  })
}

const exportToPDF = async (elementRef: React.RefObject<HTMLDivElement>) => {
  let loadingDiv: HTMLElement | null = null
  try {
    const html2canvas = (await import("html2canvas")).default
    const jsPDF = (await import("jspdf")).default

    if (!elementRef.current) return

    loadingDiv = document.createElement("div")
    loadingDiv.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 9999; color: white; font-family: system-ui;">
        <div style="text-align: center;">
          <div style="width: 40px; height: 40px; border: 4px solid #8b5cf6; border-top: 4px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 16px;"></div>
          <div>Gerando PDF com alta qualidade...</div>
        </div>
      </div>
      <style>
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      </style>
    `
    document.body.appendChild(loadingDiv)

    const clonedElement = elementRef.current.cloneNode(true) as HTMLElement
    clonedElement.style.position = "absolute"
    clonedElement.style.left = "-9999px"
    clonedElement.style.top = "0"
    document.body.appendChild(clonedElement)

    // Convert oklch colors to RGB
    convertOklchToRgb(clonedElement)

    const canvas = await html2canvas(clonedElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#000000",
      width: clonedElement.scrollWidth,
      height: clonedElement.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: 1920,
      windowHeight: 1080,
    })

    if (clonedElement.parentNode) {
      clonedElement.parentNode.removeChild(clonedElement)
    }

    const pdf = new jsPDF("p", "mm", "a4")
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    const ratio = canvasWidth / canvasHeight

    const imgWidth = pdfWidth - 20
    const imgHeight = imgWidth / ratio

    const maxHeight = pdfHeight - 20

    if (imgHeight <= maxHeight) {
      const imgData = canvas.toDataURL("image/png", 1.0)
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight)
    } else {
      const pageHeight = maxHeight
      const totalPages = Math.ceil(imgHeight / pageHeight)

      for (let i = 0; i < totalPages; i++) {
        if (i > 0) pdf.addPage()

        const pageCanvas = document.createElement("canvas")
        const pageCtx = pageCanvas.getContext("2d")

        const sourceY = (i * pageHeight * canvasHeight) / imgHeight
        const sourceHeight = Math.min(
          (pageHeight * canvasHeight) / imgHeight,
          canvasHeight - sourceY
        )

        pageCanvas.width = canvasWidth
        pageCanvas.height = sourceHeight

        if (pageCtx) {
          pageCtx.drawImage(
            canvas,
            0,
            sourceY,
            canvasWidth,
            sourceHeight,
            0,
            0,
            canvasWidth,
            sourceHeight
          )
          const pageImgData = pageCanvas.toDataURL("image/png", 1.0)
          const actualPageHeight = (sourceHeight * imgWidth) / canvasWidth
          pdf.addImage(pageImgData, "PNG", 10, 10, imgWidth, actualPageHeight)
        }
      }
    }

    pdf.setProperties({
      title: "GB Locações - Dashboard Executivo",
      subject: "Relatório de Progresso do Projeto",
      author: "GB Locações",
      creator: "Dashboard Executivo v2.0",
      keywords: "dashboard, progresso, orçamento, desenvolvimento",
    })

    const fileName = `GB_Locacoes_Dashboard_${new Date().toISOString().split("T")[0]}.pdf`
    pdf.save(fileName)

    if (loadingDiv && loadingDiv.parentNode) {
      loadingDiv.parentNode.removeChild(loadingDiv)
    }
  } catch (error) {
    console.error("Erro ao gerar PDF:", error)
    alert("Erro ao gerar PDF. Tente novamente.")

    if (loadingDiv && loadingDiv.parentNode) {
      loadingDiv.parentNode.removeChild(loadingDiv)
    }
  }
}

const BarChartIcon = () => (
  <svg
    className="w-6 h-6 text-purple-300"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M3 3v14h14V3H3zm2 12V9h2v6H5zm4 0V9h2v8H9zm4 0V5h2v10h-2z" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg
    className="w-6 h-6 text-purple-300"
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
    className="w-6 h-6 text-purple-300"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6v6h6c0 3.31-2.69 6-6 6z" />
  </svg>
)

const DollarSignIcon = () => (
  <svg
    className="w-6 h-6 text-purple-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
    />
  </svg>
)

const MapIcon = () => (
  <svg
    className="w-6 h-6 text-purple-300"
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
    className="w-6 h-6 text-purple-300"
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
    className="w-5 h-5 text-green-400"
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
    className="w-5 h-5 text-yellow-400"
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

const TargetIcon = () => (
  <svg
    className="w-5 h-5 text-purple-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4z"
    />
  </svg>
)

const RocketIcon = () => (
  <svg
    className="w-5 h-5 text-purple-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
)

const ExportIcon = () => (
  <svg
    className="w-4 h-4 text-purple-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const BuildingIcon = () => (
  <svg
    className="w-6 h-6 text-purple-300"
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

export default function GBLBudgetPresentation() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const dashboardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

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

  const totalPlanned = modules.reduce((s, m) => s + m.total, 0)
  const totalPaid = modules.reduce((s, m) => s + m.paid, 0)
  const totalRemaining = totalPlanned - totalPaid

  const completedValue = modules
    .filter(m => m.paid >= m.total)
    .reduce((s, m) => s + m.total, 0)

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

  const perStageTotals = modules.map(m => ({
    name: m.key,
    Pago: m.paid,
    Restante: Math.max(0, m.total - m.paid),
  }))

  const cumulative = modules.reduce(
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
  )

  const piePaid = [
    { name: "Recebido", value: totalPaid },
    { name: "A Receber", value: totalRemaining },
  ]

  const pieColors = ["#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe"]

  const Progress = ({
    value,
    className = "",
  }: {
    value: number
    className?: string
  }) => (
    <div
      className={`relative h-3 w-full rounded-full bg-gradient-to-r from-gray-800 to-gray-700 overflow-hidden shadow-inner ${className}`}
    >
      <div
        className="h-full bg-gradient-to-r from-purple-300 via-purple-400 to-violet-400 transition-all duration-1000 ease-out shadow-lg relative"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          transform: isLoaded ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
      </div>
    </div>
  )

  const Stat = ({
    label,
    value,
    hint,
    delay = 0,
  }: {
    label: string
    value: string
    hint?: string
    delay?: number
  }) => (
    <div
      className={`group relative rounded-3xl border border-purple-300/15 p-6 shadow-2xl bg-gradient-to-br from-purple-900/30 via-violet-900/20 to-purple-800/15 backdrop-blur-3xl hover:shadow-3xl hover:shadow-purple-400/20 hover:scale-105 transition-all duration-500 ease-out cursor-pointer overflow-hidden ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/8 via-transparent to-violet-400/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="text-sm font-medium text-purple-200 mb-2">{label}</div>
        <div className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-violet-200 bg-clip-text text-transparent mb-1">
          {value}
        </div>
        {hint && (
          <div className="text-xs text-purple-300 opacity-80">{hint}</div>
        )}
      </div>
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-300/15 to-violet-300/15 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
    </div>
  )

  const Section = ({
    title,
    children,
    delay = 0,
  }: {
    title: string | React.ReactNode
    children: React.ReactNode
    delay?: number
  }) => (
    <section
      className={`space-y-6 transition-all duration-700 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-violet-200 bg-clip-text text-transparent">
        {title}
      </h2>
      {children}
    </section>
  )

  const ChartContainer = ({
    children,
    className = "",
  }: {
    children: React.ReactNode
    className?: string
  }) => (
    <div
      className={`relative h-80 rounded-3xl border border-purple-300/15 p-6 shadow-2xl bg-gradient-to-br from-purple-900/30 via-violet-900/20 to-purple-800/15 backdrop-blur-3xl hover:shadow-3xl hover:shadow-purple-400/20 transition-all duration-500 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-transparent to-violet-400/5" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )

  return (
    <div
      ref={dashboardRef}
      className="min-h-screen w-full bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-violet-500/15 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-violet-400/15 to-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-300/12 to-violet-300/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-20 left-20 w-60 h-60 bg-gradient-to-br from-violet-500/18 to-purple-400/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-br from-violet-500/15 to-purple-400/12 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <header className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-8">
        <div
          className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-400/15 to-violet-400/15 border border-purple-300/25 backdrop-blur-2xl">
              <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-purple-200">
                Projeto em Andamento
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-purple-200 to-violet-300 bg-clip-text text-transparent">
              GB Locações
            </h1>
            <p className="text-lg text-gray-300 font-medium">
              Dashboard Executivo de Progresso
            </p>
            <p className="text-sm text-gray-400">
              Atualizado em {new Date().toLocaleDateString("pt-BR")} • Versão
              2.0
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className="group relative px-6 py-3 rounded-2xl border border-purple-300/25 bg-gradient-to-r from-purple-900/40 to-violet-900/30 backdrop-blur-3xl text-sm font-medium text-white hover:shadow-xl hover:shadow-purple-400/20 hover:scale-105 transition-all duration-300 overflow-hidden"
              onClick={() => exportToPDF(dashboardRef)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/15 to-violet-400/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                <ExportIcon />
                Exportar PDF
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-20 space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Stat
            label="Total Planejado"
            value={brl.format(totalPlanned)}
            hint="Soma das 8 etapas"
            delay={100}
          />
          <Stat
            label="Recebido"
            value={brl.format(totalPaid)}
            hint={`${percentPaid}% do total`}
            delay={200}
          />
          <Stat
            label="A Receber"
            value={brl.format(totalRemaining)}
            hint={`${100 - percentPaid}% pendente`}
            delay={300}
          />
          <Stat
            label="Concluído por Valor"
            value={`${percentCompletedByValue}%`}
            hint="Etapas quitadas vs total"
            delay={400}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Section
            title={
              <div className="flex items-center gap-2">
                <BarChartIcon /> Progresso por Etapa
              </div>
            }
            delay={500}
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
            delay={600}
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
            delay={700}
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
            delay={800}
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

        <Section
          title={
            <div className="flex items-center gap-2">
              <MapIcon /> Roadmap Detalhado — Etapas & Investimento
            </div>
          }
          delay={900}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modules.map((m, index) => {
              const progress = Math.round((m.paid / m.total) * 100)
              const isCompleted = m.paid >= m.total
              const isActive = m.paid > 0 && m.paid < m.total

              return (
                <div
                  key={m.id}
                  className={`group relative rounded-3xl border border-purple-300/15 p-8 shadow-2xl bg-gradient-to-br from-purple-900/30 via-violet-900/20 to-purple-800/15 backdrop-blur-3xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 cursor-pointer overflow-hidden ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${1000 + index * 100}ms` }}
                  onMouseEnter={() => setActiveCard(m.id)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div className="absolute top-6 right-6 z-20">
                    {isCompleted ? (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-400/25 to-violet-500/25 border border-purple-300/35 backdrop-blur-xl">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs font-medium text-white">
                          Concluída
                        </span>
                      </div>
                    ) : isActive ? (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-violet-400/25 to-purple-500/25 border border-violet-300/35 backdrop-blur-xl">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        <span className="text-xs font-medium text-white">
                          Em Andamento
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-gray-500/25 to-gray-600/25 border border-gray-400/35 backdrop-blur-xl">
                        <div className="w-2 h-2 bg-red-400 rounded-full" />
                        <span className="text-xs font-medium text-white">
                          Pendente
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br transition-opacity duration-500">
                    {activeCard === m.id && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 ${
                          isCompleted
                            ? "from-purple-400/12 via-transparent to-purple-400/8 opacity-100"
                            : isActive
                              ? "from-violet-400/12 via-transparent to-violet-400/8 opacity-100"
                              : "from-purple-400/8 via-transparent to-violet-400/8 opacity-100"
                        }`}
                      />
                    )}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4 mb-6 pr-32">
                      <div className="space-y-2 flex-1">
                        <div className="text-sm font-bold text-purple-300 tracking-wider">
                          {m.key}
                        </div>
                        <h3 className="text-xl font-bold tracking-tight leading-tight text-white pr-4">
                          {m.title}
                        </h3>
                      </div>
                    </div>

                    <div className="absolute top-8 right-6 z-10">
                      <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                          {brl.format(m.total)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="rounded-2xl bg-gradient-to-br from-purple-800/30 to-purple-700/20 p-4 border border-purple-400/25 backdrop-blur-2xl">
                        <div className="text-xs text-purple-200 font-medium mb-1">
                          Recebido
                        </div>
                        <div className="text-lg font-bold text-white">
                          {brl.format(m.paid)}
                        </div>
                      </div>
                      <div className="rounded-2xl bg-gradient-to-br from-violet-800/30 to-violet-700/20 p-4 border border-violet-400/25 backdrop-blur-2xl">
                        <div className="text-xs text-violet-200 font-medium mb-1">
                          Restante
                        </div>
                        <div className="text-lg font-bold text-white">
                          {brl.format(Math.max(0, m.total - m.paid))}
                        </div>
                      </div>
                      <div className="rounded-2xl bg-gradient-to-br from-purple-800/30 to-purple-800/30 p-4 border border-purple-400/25 backdrop-blur-xl">
                        <div className="text-xs text-purple-200 font-medium mb-1">
                          Progresso
                        </div>
                        <div className="text-lg font-bold text-white">
                          {progress}%
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {m.substeps.map((s, i) => (
                        <div
                          key={i}
                          className="group/substep flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-800/15 to-transparent hover:from-purple-700/25 hover:to-violet-800/15 transition-all duration-300 border border-transparent hover:border-purple-400/25 backdrop-blur-xl"
                        >
                          <div
                            className="mt-2 w-3 h-3 rounded-full shadow-lg flex-shrink-0"
                            style={{
                              background: `linear-gradient(135deg, ${["#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe"][i % 4]}, ${["#8b5cf6", "#a855f7", "#c4b5fd", "#ddd6fe"][i % 4]})`,
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-white mb-1">
                              {s.name}
                            </div>
                            <p className="text-xs text-purple-200 leading-relaxed">
                              {s.justification}
                            </p>
                          </div>
                          <div className="text-sm font-bold text-white whitespace-nowrap bg-gradient-to-r from-purple-800/50 to-violet-800/50 px-3 py-1 rounded-full border border-purple-400/25 backdrop-blur-xl">
                            {brl.format(s.value)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-300/12 to-violet-300/12 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                </div>
              )
            })}
          </div>
        </Section>

        <Section
          title={
            <div className="flex items-center gap-2">
              <ClipboardListIcon /> Resumo Executivo & Insights
            </div>
          }
          delay={1800}
        >
          <div className="rounded-3xl border border-purple-300/15 p-8 shadow-2xl bg-gradient-to-br from-purple-900/30 via-violet-900/20 to-purple-800/15 backdrop-blur-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-transparent to-violet-400/5" />
            <div className="relative z-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-300 rounded-full animate-pulse" />
                    Status Atual
                  </h3>
                  <ul className="space-y-3 text-sm leading-relaxed">
                    <li className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="text-white">
                        <span className="font-semibold">Etapa 1 concluída</span>{" "}
                        — Portfólio funcional entregue e aprovado
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ZapIcon />
                      <span className="text-white">
                        <span className="font-semibold">
                          Etapa 2 em andamento
                        </span>{" "}
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
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-violet-300 rounded-full animate-pulse" />
                    Vantagem Competitiva
                  </h3>
                  <ul className="space-y-3 text-sm leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="text-lg">💰</span>
                      <span className="text-white">
                        <span className="font-semibold">
                          Preço competitivo:
                        </span>{" "}
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
                        <span className="font-semibold">
                          Tecnologia moderna:
                        </span>{" "}
                        Next.js, TypeScript, arquitetura escalável
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>
    </div>
  )
}
