"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Line,
  Area,
  AreaChart,
} from "recharts"
import { CheckCircle, Clock, TrendingUp, Target, FileText, Sparkles } from "lucide-react"

// Dados exatos conforme especificação
const etapasData = [
  { etapa: "E1", nome: "Portfólio", valor: 1000, pago: 1000, status: "concluida" },
  { etapa: "E2", nome: "Painel Admin", valor: 1200, pago: 800, status: "em_andamento" },
  { etapa: "E3", nome: "Cadastro/Login", valor: 1000, pago: 0, status: "planejada" },
  { etapa: "E4", nome: "Orçamentos", valor: 900, pago: 0, status: "planejada" },
  { etapa: "E5", nome: "Contratos", valor: 800, pago: 0, status: "planejada" },
  { etapa: "E6", nome: "Pagamentos", valor: 1200, pago: 0, status: "planejada" },
  { etapa: "E7", nome: "Logística", valor: 900, pago: 0, status: "planejada" },
  { etapa: "E8", nome: "IA + SEO", valor: 1000, pago: 0, status: "planejada" },
]

const resumoFinanceiro = {
  totalPlanejado: 8000,
  totalRecebido: 1800,
  totalRestante: 6200,
  percentualPago: 23,
}

const cumulativeData = etapasData.map((_, index) => ({
  etapa: `E${index + 1}`,
  acumulado: etapasData.slice(0, index + 1).reduce((sum, item) => sum + item.valor, 0),
}))

const donutData = [
  { name: "Recebido", value: resumoFinanceiro.totalRecebido, color: "#16A34A" },
  { name: "A Receber", value: resumoFinanceiro.totalRestante, color: "#E6EEF9" },
]

const roadmapDetalhado = {
  E1: {
    nome: "Apresentação Funcional (Portfólio)",
    valor: 1000,
    status: "CONCLUÍDA",
    subetapas: [
      {
        nome: "Setup & Arquitetura",
        valor: 200,
        descricao: "Configuração Next.js + TS, estrutura, lint, CI/CD e deploy",
      },
      { nome: "Catálogo Básico + CMS", valor: 500, descricao: "Models Category/Equipment, CRUD básico, imagens" },
      { nome: "UI/UX Responsivo", valor: 200, descricao: "Design system aplicado, acessibilidade básica (WCAG)" },
      { nome: "Deploy & SEO básico", valor: 100, descricao: "Metadados, sitemap, analytics" },
    ],
  },
  E2: {
    nome: "Painel Admin Completo",
    valor: 1200,
    status: "SINAL R$ 800",
    subetapas: [
      { nome: "Autenticação & Proteção", valor: 350, descricao: "NextAuth + 2FA, RBAC, middleware e hardening" },
      { nome: "CRUD Cat./Equip.", valor: 400, descricao: "Validação (Zod), uploads (Vercel Blob/Supabase), toasts" },
      { nome: "Configurações Globais", valor: 250, descricao: "Logo, telefone, textos, temas" },
      { nome: "QA & Auditoria", valor: 200, descricao: "Logs, testes de fluxo e correções de permissão" },
    ],
  },
}

export function GBLocacoesDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-6">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto space-y-6 md:space-y-8">
        <div className="text-center space-y-6 py-8 md:py-12">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
            <div className="relative">
              <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full animate-ping opacity-75"></div>
            </div>
            <span className="font-bold text-white text-lg tracking-wide">GB Locações</span>
            <Sparkles className="w-5 h-5 text-purple-300 animate-pulse" />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent leading-tight">
              Apresentação Executiva do Projeto
            </h1>
            <p className="text-lg md:text-xl text-purple-100/90 max-w-4xl mx-auto leading-relaxed">
              Roadmap modular: Etapa 1 entregue por R$ 1.000, Etapa 2 com sinal R$ 800; total planejado R$ 8.000;
              recebido R$ 1.800 (23%)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:bg-white/15 hover:scale-105 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100/80">Total Planejado</CardTitle>
              <Target className="h-5 w-5 text-purple-300 group-hover:text-purple-200 transition-colors duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-white">R$ 8.000</div>
              <p className="text-xs text-purple-200/70 mt-1">8 etapas modulares</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:bg-white/15 hover:scale-105 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100/80">Recebido</CardTitle>
              <CheckCircle className="h-5 w-5 text-emerald-300 group-hover:text-emerald-200 transition-colors duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-emerald-300">R$ 1.800</div>
              <p className="text-xs text-purple-200/70 mt-1">23% do total</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:bg-white/15 hover:scale-105 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100/80">A Receber</CardTitle>
              <Clock className="h-5 w-5 text-amber-300 group-hover:text-amber-200 transition-colors duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-amber-300">R$ 6.200</div>
              <p className="text-xs text-purple-200/70 mt-1">77% restante</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:bg-white/15 hover:scale-105 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100/80">Progresso</CardTitle>
              <TrendingUp className="h-5 w-5 text-purple-300 group-hover:text-purple-200 transition-colors duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-purple-300">23%</div>
              <div className="w-full bg-white/20 rounded-full h-3 mt-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-400 to-violet-400 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                  style={{ width: "23%" }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
          {/* 1. Distribuição por Etapa */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl font-semibold text-white">
                Distribuição do Investimento por Módulo
              </CardTitle>
              <CardDescription className="text-purple-200/70">
                Demonstra concentração de esforço técnico por módulo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  valor: {
                    label: "Valor",
                    color: "#A855F7",
                  },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={etapasData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="etapa" stroke="#E9D5FF" fontSize={12} />
                    <YAxis stroke="#E9D5FF" fontSize={12} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent className="bg-slate-800/90 backdrop-blur-sm border-purple-500/30 text-white" />
                      }
                    />
                    <Bar
                      dataKey="valor"
                      radius={[6, 6, 0, 0]}
                      fill={(entry: any) => {
                        if (entry.status === "concluida") return "#10B981"
                        if (entry.status === "em_andamento") return "#F59E0B"
                        return "#A855F7"
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* 2. Pago vs Restante */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl font-semibold text-white">Pago vs Restante por Etapa</CardTitle>
              <CardDescription className="text-purple-200/70">Controle financeiro por entrega</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  pago: {
                    label: "Pago",
                    color: "#10B981",
                  },
                  restante: {
                    label: "Restante",
                    color: "#ffffff30",
                  },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={etapasData.map((item) => ({
                      ...item,
                      restante: item.valor - item.pago,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="etapa" stroke="#E9D5FF" fontSize={12} />
                    <YAxis stroke="#E9D5FF" fontSize={12} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent className="bg-slate-800/90 backdrop-blur-sm border-purple-500/30 text-white" />
                      }
                    />
                    <Bar dataKey="pago" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="restante" stackId="a" fill="#ffffff30" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* 3. Donut Resumo */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl font-semibold text-white">Progresso Financeiro</CardTitle>
              <CardDescription className="text-purple-200/70">Visão geral do status de pagamentos</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  recebido: {
                    label: "Recebido",
                    color: "#10B981",
                  },
                  aReceber: {
                    label: "A Receber",
                    color: "#ffffff30",
                  },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData.map((item) => ({
                        ...item,
                        color: item.name === "Recebido" ? "#10B981" : "#ffffff30",
                      }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {donutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.name === "Recebido" ? "#10B981" : "#ffffff30"} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={
                        <ChartTooltipContent className="bg-slate-800/90 backdrop-blur-sm border-purple-500/30 text-white" />
                      }
                    />
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-white text-2xl font-bold"
                    >
                      23% Pago
                    </text>
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* 4. Custo Acumulado */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl font-semibold text-white">Custo Acumulado vs Mercado</CardTitle>
              <CardDescription className="text-purple-200/70">Comparativo com benchmarks de mercado</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  acumulado: {
                    label: "Acumulado",
                    color: "#A855F7",
                  },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cumulativeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="etapa" stroke="#E9D5FF" fontSize={12} />
                    <YAxis stroke="#E9D5FF" fontSize={12} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent className="bg-slate-800/90 backdrop-blur-sm border-purple-500/30 text-white" />
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="acumulado"
                      stroke="#A855F7"
                      fill="url(#purpleGradient)"
                      fillOpacity={0.4}
                    />
                    <Line type="monotone" dataKey="acumulado" stroke="#A855F7" strokeWidth={3} />
                    <defs>
                      <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#A855F7" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#A855F7" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-4 space-y-2 text-sm text-purple-200/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400/60 rounded"></div>
                  <span>Freelancer mediano: R$ 10.000-15.000</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400/60 rounded"></div>
                  <span>Pequenas agências: R$ 20.000</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500/60 rounded"></div>
                  <span>Software house: R$ 40.000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-semibold text-white flex items-center gap-3">
              <FileText className="h-6 w-6 text-purple-300" />
              Roadmap Detalhado - Subetapas e Justificativas
            </CardTitle>
            <CardDescription className="text-purple-200/70">
              Breakdown técnico das etapas principais com critérios de aceite
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(roadmapDetalhado).map(([etapa, dados]) => (
              <div
                key={etapa}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                      {etapa} — {dados.nome}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge
                        variant={dados.status.includes("CONCLUÍDA") ? "default" : "secondary"}
                        className={
                          dados.status.includes("CONCLUÍDA")
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30"
                            : "bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30"
                        }
                      >
                        {dados.status}
                      </Badge>
                      <span className="text-lg md:text-xl font-bold text-purple-300">
                        R$ {dados.valor.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {dados.subetapas.map((sub, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-purple-100">{sub.nome}</h4>
                        <span className="text-sm font-semibold text-purple-300">R$ {sub.valor}</span>
                      </div>
                      <p className="text-sm text-purple-200/70">{sub.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500/20 to-violet-500/20 backdrop-blur-md border border-purple-300/30 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-semibold text-white">Recomendações Comerciais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-l-4 border-purple-400 hover:bg-white/15 transition-all duration-300">
              <h4 className="font-semibold text-white mb-3 text-lg">Próximos Passos</h4>
              <p className="text-purple-100/90 leading-relaxed">
                A estratégia modular valida valor a cada entrega. Recomendamos liberação do restante da Etapa 2 (R$ 400)
                antes da publicação final dessa etapa para manter o cronograma otimizado.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-l-4 border-emerald-400 hover:bg-white/15 transition-all duration-300">
              <h4 className="font-semibold text-white mb-3 text-lg">Modelo de Contrato</h4>
              <p className="text-purple-100/90 leading-relaxed">
                Contrato modular por etapas permite flexibilidade e controle de qualidade. Cada módulo é independente e
                pode ser validado antes do próximo.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-l-4 border-amber-400 hover:bg-white/15 transition-all duration-300">
              <h4 className="font-semibold text-white mb-3 text-lg">Manutenção</h4>
              <p className="text-purple-100/90 leading-relaxed">
                Após conclusão, recomendamos plano de manutenção mensal (R$ 400/mês) para atualizações, correções e
                melhorias contínuas.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center py-8 border-t border-white/20">
          <p className="text-purple-200/80 text-lg">
            GB Locações - Plataforma de Locação de Equipamentos para Construção Civil
          </p>
          <p className="text-sm text-purple-300/60 mt-2">
            Apresentação executiva gerada em {new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>
    </div>
  )
}
