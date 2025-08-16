"use client"
import type React from "react"
import { useState, useEffect } from "react"
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

export default function GBLBudgetPresentation() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // ====== TIPOS ======
  type Substep = { name: string; value: number; justification: string }
  type Module = {
    id: number
    key: string
    title: string
    total: number
    paid: number
    substeps: Substep[]
  }

  // ====== DADOS (ATUALIZADOS) ======
  // Etapa 1 concluída (R$ 1.000), Etapa 2 em andamento com R$ 800 de sinal.
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
          justification: "Configuração (Next.js + TS), estrutura, lint, rotas públicas, CI/CD e deploy inicial.",
        },
        {
          name: "Catálogo Básico + CMS",
          value: 500,
          justification: "Modelos Category/Equipment, cadastro/edição, listagem pública e imagens.",
        },
        {
          name: "UI/UX & Responsividade",
          value: 200,
          justification: "Aplicação do design system, tipografia, grid responsivo e acessibilidade (WCAG 2.2).",
        },
        {
          name: "Deploy & SEO Básico",
          value: 100,
          justification: "Build, metas/OG, sitemap/robots e setup inicial de analytics.",
        },
      ],
    },
    {
      id: 2,
      key: "E2",
      title: "Etapa 2 — Painel Administrativo Completo",
      total: 1200,
      paid: 800, // sinal já recebido
      substeps: [
        {
          name: "Autenticação & Proteção",
          value: 350,
          justification: "NextAuth + 2FA, RBAC (ADMIN/CLIENT), middleware e hardening (OWASP).",
        },
        {
          name: "CRUD Cat./Equip.",
          value: 400,
          justification: "CRUD completo (Zod/RHF), uploads (Vercel Blob), toasts e estados de erro/sucesso.",
        },
        {
          name: "Configurações Globais",
          value: 250,
          justification: "Logo, telefone, dados institucionais e opções de layout aplicadas no site.",
        },
        {
          name: "QA & Auditoria",
          value: 200,
          justification: "Logs essenciais, testes de fluxo crítico, permissões e micro-otimizações.",
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
          justification: "Criação de contas, confirmação de e-mail, regras de senha e políticas.",
        },
        {
          name: "Login Social & Recuperação",
          value: 400,
          justification: "OAuth (Google), recuperação de senha e limitação de tentativas.",
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
          justification: "Orçamentos com validações contextuais, máscaras e UX guiada.",
        },
        {
          name: "Notificações (E-mail/Queue)",
          value: 300,
          justification: "Integração transactional (Resend/SendGrid), templates e filas.",
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
          justification: "Templates dinâmicos, merge de dados de locação e versionamento de termos.",
        },
        {
          name: "Integração ZapSign/Webhooks",
          value: 300,
          justification: "Criação, assinatura eletrônica e processamento de webhooks.",
        },
        {
          name: "Status & Auditoria",
          value: 200,
          justification: "UI de status, trilha de auditoria e reenvio de convites.",
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
          justification: "Sessões de pagamento, itens de locação e impostos/taxas.",
        },
        {
          name: "Webhooks & Antifraude",
          value: 400,
          justification: "Verificação de assinatura, eventos e medidas antifraude.",
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
          justification: "CRUD de endereços, janelas e regras de disponibilidade.",
        },
        {
          name: "Integração Melhor Envio",
          value: 300,
          justification: "Cotações, etiquetas e tracking (quando aplicável).",
        },
        {
          name: "UI Agenda/Rotas",
          value: 200,
          justification: "Agenda operacional e visão de rotas/otimização básica.",
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
          justification: "Heurística/ML leve para sugerir equipamentos relevantes.",
        },
        {
          name: "SEO Técnico Avançado",
          value: 400,
          justification: "Schemas, metas, otimização LCP/CLS e pré-render.",
        },
      ],
    },
  ]

  // ====== AGREGAÇÕES ======
  const brl = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  })

  const totalPlanned = modules.reduce((s, m) => s + m.total, 0)
  const totalPaid = modules.reduce((s, m) => s + m.paid, 0)
  const totalRemaining = totalPlanned - totalPaid

  const completedValue = modules.filter((m) => m.paid >= m.total).reduce((s, m) => s + m.total, 0)

  const percentPaid = Math.round((totalPaid / totalPlanned) * 100)
  const percentCompletedByValue = Math.round((completedValue / totalPlanned) * 100)

  // Benchmarks (comparativo de mercado)
  const market = [
    { label: "Seu Orçamento (8 etapas)", value: totalPlanned },
    { label: "Freelancer (mediana)", value: 12000 },
    { label: "Pequena Agência", value: 20000 },
    { label: "Software House", value: 40000 },
  ]

  // Dados para gráficos
  const perStageTotals = modules.map((m) => ({
    name: m.key,
    Pago: m.paid,
    Restante: Math.max(0, m.total - m.paid),
  }))

  const cumulative = modules.reduce((acc: { name: string; Planejado: number; Recebido: number }[], m) => {
    const prev = acc.length ? acc[acc.length - 1] : { Planejado: 0, Recebido: 0 }
    acc.push({
      name: m.key,
      Planejado: prev.Planejado + m.total,
      Recebido: prev.Recebido + m.paid,
    })
    return acc
  }, [])

  const piePaid = [
    { name: "Recebido", value: totalPaid },
    { name: "A Receber", value: totalRemaining },
  ]

  // Stacked por subetapa (até 4 subetapas)
  const stacked = modules.map((m) => {
    const [s1, s2, s3, s4] = [0, 1, 2, 3].map((i) => m.substeps[i]?.value || 0)
    return { name: m.key, s1, s2, s3, s4 }
  })

  const pieColors = ["#10b981", "#f59e0b", "#3b82f6", "#ef4444"]

  const Progress = ({ value, className = "" }: { value: number; className?: string }) => (
    <div
      className={`relative h-3 w-full rounded-full bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 overflow-hidden shadow-inner ${className}`}
    >
      <div
        className="h-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 transition-all duration-1000 ease-out shadow-lg relative"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          transform: isLoaded ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
      </div>
    </div>
  )

  const Stat = ({ label, value, hint, delay = 0 }: { label: string; value: string; hint?: string; delay?: number }) => (
    <div
      className={`group relative rounded-3xl border border-white/20 dark:border-white/10 p-6 shadow-2xl bg-gradient-to-br from-white/80 via-white/60 to-white/40 dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900/40 backdrop-blur-xl hover:shadow-3xl hover:scale-105 transition-all duration-500 ease-out cursor-pointer overflow-hidden ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        transitionDelay: `${delay}ms`,
        background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">{label}</div>
        <div className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent mb-1">
          {value}
        </div>
        {hint && <div className="text-xs text-slate-500 dark:text-slate-400 opacity-80">{hint}</div>}
      </div>
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
    </div>
  )

  const Section = ({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) => (
    <section
      className={`space-y-6 transition-all duration-700 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
        {title}
      </h2>
      {children}
    </section>
  )

  const ChartContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div
      className={`relative h-80 rounded-3xl border border-white/20 dark:border-white/10 p-6 shadow-2xl bg-gradient-to-br from-white/80 via-white/60 to-white/40 dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900/40 backdrop-blur-xl hover:shadow-3xl transition-all duration-500 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )

  // ====== RENDER ======
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <header className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-8">
        <div
          className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-white/20 backdrop-blur-sm">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Projeto em Andamento</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-emerald-600 to-blue-600 dark:from-white dark:via-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
              GB Locações
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">Dashboard Executivo de Progresso</p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Atualizado em {new Date().toLocaleDateString("pt-BR")} • Versão 2.0
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className="group relative px-6 py-3 rounded-2xl border border-white/20 dark:border-white/10 bg-gradient-to-r from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-800/60 backdrop-blur-xl text-sm font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
              onClick={() => window.print()}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">📊 Exportar PDF</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-20 space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Stat label="Total Planejado" value={brl.format(totalPlanned)} hint="Soma das 8 etapas" delay={100} />
          <Stat label="Recebido" value={brl.format(totalPaid)} hint={`${percentPaid}% do total`} delay={200} />
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
          <Section title="📊 Progresso por Etapa" delay={500}>
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={perStageTotals}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis hide />
                  <Tooltip
                    formatter={(v: number) => brl.format(v)}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Pago" stackId="a" fill="url(#paidGradient)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="Restante" stackId="a" fill="url(#remainingGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="paidGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="remainingGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Section>

          <Section title="📈 Acumulado Planejado vs Recebido" delay={600}>
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cumulative}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => brl.format(v)} tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(v: number) => brl.format(v)}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Planejado"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Recebido"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Section>

          <Section title="🥧 Distribuição Geral" delay={700}>
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={piePaid} dataKey="value" nameKey="name" outerRadius={110} label stroke="none">
                    {piePaid.map((_, i) => (
                      <Cell key={i} fill={pieColors[i % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: number) => brl.format(v)}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Section>

          <Section title="💰 Comparativo de Mercado" delay={800}>
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={market}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis
                    dataKey="label"
                    interval={0}
                    angle={-12}
                    textAnchor="end"
                    height={60}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis tickFormatter={(v) => brl.format(v)} tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(v: number) => brl.format(v)}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  />
                  <Bar dataKey="value" fill="url(#marketGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Section>
        </div>

        <Section title="🗺️ Roadmap Detalhado — Etapas & Investimento" delay={900}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modules.map((m, index) => {
              const progress = Math.round((m.paid / m.total) * 100)
              const isCompleted = m.paid >= m.total
              const isActive = m.paid > 0 && m.paid < m.total

              return (
                <div
                  key={m.id}
                  className={`group relative rounded-3xl border border-white/20 dark:border-white/10 p-8 shadow-2xl bg-gradient-to-br from-white/80 via-white/60 to-white/40 dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900/40 backdrop-blur-xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 cursor-pointer overflow-hidden ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${1000 + index * 100}ms` }}
                  onMouseEnter={() => setActiveCard(m.id)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div className="absolute top-6 right-6">
                    {isCompleted ? (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Concluída</span>
                      </div>
                    ) : isActive ? (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30">
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                        <span className="text-xs font-medium text-amber-700 dark:text-amber-300">Em Andamento</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-slate-500/20 to-slate-600/20 border border-slate-500/30">
                        <div className="w-2 h-2 bg-slate-500 rounded-full" />
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Pendente</span>
                      </div>
                    )}
                  </div>

                  <div
                    className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 ${
                      activeCard === m.id
                        ? isCompleted
                          ? "from-emerald-500/10 via-transparent to-emerald-500/5 opacity-100"
                          : isActive
                            ? "from-amber-500/10 via-transparent to-amber-500/5 opacity-100"
                            : "from-blue-500/10 via-transparent to-blue-500/5 opacity-100"
                        : "opacity-0"
                    }`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="space-y-2">
                        <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
                          {m.key}
                        </div>
                        <h3 className="text-xl font-bold tracking-tight leading-tight text-slate-900 dark:text-slate-100">
                          {m.title}
                        </h3>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-xs text-slate-500 dark:text-slate-400">Investimento</div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                          {brl.format(m.total)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-4 border border-emerald-200/50 dark:border-emerald-700/30">
                        <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-1">Recebido</div>
                        <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                          {brl.format(m.paid)}
                        </div>
                      </div>
                      <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-4 border border-amber-200/50 dark:border-amber-700/30">
                        <div className="text-xs text-amber-600 dark:text-amber-400 font-medium mb-1">Restante</div>
                        <div className="text-lg font-bold text-amber-700 dark:text-amber-300">
                          {brl.format(Math.max(0, m.total - m.paid))}
                        </div>
                      </div>
                      <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 border border-blue-200/50 dark:border-blue-700/30">
                        <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">Progresso</div>
                        <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{progress}%</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <Progress value={progress} />
                    </div>

                    <div className="space-y-4">
                      {m.substeps.map((s, i) => (
                        <div
                          key={i}
                          className="group/substep flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-50/50 to-transparent dark:from-slate-800/30 dark:to-transparent hover:from-slate-100/80 hover:to-slate-50/40 dark:hover:from-slate-700/40 dark:hover:to-slate-800/20 transition-all duration-300 border border-transparent hover:border-slate-200/50 dark:hover:border-slate-700/50"
                        >
                          <div
                            className="mt-2 w-3 h-3 rounded-full shadow-lg flex-shrink-0"
                            style={{
                              background: `linear-gradient(135deg, ${["#3b82f6", "#10b981", "#f59e0b", "#ef4444"][i % 4]}, ${["#1d4ed8", "#059669", "#d97706", "#dc2626"][i % 4]})`,
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                              {s.name}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                              {s.justification}
                            </p>
                          </div>
                          <div className="text-sm font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 px-3 py-1 rounded-full">
                            {brl.format(s.value)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-blue-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                </div>
              )
            })}
          </div>
        </Section>

        <Section title="📋 Resumo Executivo & Insights" delay={1800}>
          <div className="rounded-3xl border border-white/20 dark:border-white/10 p-8 shadow-2xl bg-gradient-to-br from-white/80 via-white/60 to-white/40 dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900/40 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />
            <div className="relative z-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    Status Atual
                  </h3>
                  <ul className="space-y-3 text-sm leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>
                        <span className="font-semibold">Etapa 1 concluída</span> — Portfólio funcional entregue e
                        aprovado
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-500 font-bold">⚡</span>
                      <span>
                        <span className="font-semibold">Etapa 2 em andamento</span> — Painel administrativo (67%
                        concluído)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 font-bold">📊</span>
                      <span>
                        <span className="font-semibold">Progresso geral:</span> {percentPaid}% do investimento total
                        recebido
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    Vantagem Competitiva
                  </h3>
                  <ul className="space-y-3 text-sm leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-500 font-bold">💰</span>
                      <span>
                        <span className="font-semibold">Preço competitivo:</span> 50% menor que agências tradicionais
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 font-bold">🎯</span>
                      <span>
                        <span className="font-semibold">Entrega modular:</span> Valor incremental a cada etapa
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-500 font-bold">🚀</span>
                      <span>
                        <span className="font-semibold">Tecnologia moderna:</span> Next.js, TypeScript, arquitetura
                        escalável
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
