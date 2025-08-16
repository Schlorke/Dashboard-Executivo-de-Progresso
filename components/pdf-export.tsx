"use client"

import React, { useState, useEffect } from "react"

// Interface para os dados do dashboard
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

interface PDFExportProps {
  modules: Module[]
  totalInvestment: number
  totalPaid: number
  totalRemaining: number
  progressPercentage: number
}

// Componente principal de exportação
const PDFExport: React.FC<PDFExportProps> = props => {
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleExportPDF = async () => {
    if (!isClient) return

    setIsLoading(true)

    try {
      // Dynamic import apenas quando necessário
      const { Document, Page, Text, View, StyleSheet, Font, renderToStream } =
        await import("@react-pdf/renderer")

      // Registrar fontes
      Font.register({
        family: "Inter",
        src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
      })

      // Estilos para o PDF
      const styles = StyleSheet.create({
        page: {
          flexDirection: "column",
          backgroundColor: "#ffffff",
          padding: 30,
          fontSize: 10,
          fontFamily: "Inter",
        },
        header: {
          marginBottom: 20,
          textAlign: "center",
        },
        title: {
          fontSize: 24,
          marginBottom: 10,
          color: "#1f2937",
          fontWeight: "bold",
        },
        subtitle: {
          fontSize: 14,
          color: "#6b7280",
          marginBottom: 20,
        },
        section: {
          marginBottom: 20,
        },
        sectionTitle: {
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 10,
          color: "#1f2937",
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: 5,
        },
        statsGrid: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        },
        statCard: {
          flex: 1,
          margin: 5,
          padding: 15,
          backgroundColor: "#f9fafb",
          borderRadius: 8,
          border: "1px solid #e5e7eb",
        },
        statValue: {
          fontSize: 20,
          fontWeight: "bold",
          color: "#1f2937",
          marginBottom: 5,
        },
        statLabel: {
          fontSize: 12,
          color: "#6b7280",
        },
        roadmapSection: {
          marginBottom: 20,
        },
        roadmapItem: {
          marginBottom: 15,
          padding: 15,
          backgroundColor: "#f9fafb",
          borderRadius: 8,
          border: "1px solid #e5e7eb",
        },
        roadmapTitle: {
          fontSize: 14,
          fontWeight: "bold",
          marginBottom: 8,
          color: "#1f2937",
        },
        roadmapProgress: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 8,
        },
        progressBar: {
          flex: 1,
          height: 8,
          backgroundColor: "#e5e7eb",
          borderRadius: 4,
          marginRight: 10,
        },
        progressFill: {
          height: "100%",
          backgroundColor: "#8b5cf6",
          borderRadius: 4,
        },
        progressText: {
          fontSize: 10,
          color: "#6b7280",
          minWidth: 60,
        },
        substepsList: {
          marginLeft: 20,
        },
        substepItem: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
          paddingVertical: 3,
        },
        substepName: {
          fontSize: 10,
          color: "#374151",
          flex: 1,
        },
        substepValue: {
          fontSize: 10,
          color: "#059669",
          fontWeight: "bold",
          marginLeft: 10,
        },
        footer: {
          position: "absolute",
          bottom: 30,
          left: 30,
          right: 30,
          textAlign: "center",
          borderTop: "1px solid #e5e7eb",
          paddingTop: 15,
        },
        footerText: {
          fontSize: 10,
          color: "#6b7280",
        },
      })

      // Componente PDF
      const DashboardPDF = () => (
        <Document>
          <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Dashboard Executivo de Progresso</Text>
              <Text style={styles.subtitle}>
                GB Locações - Relatório de Projeto
              </Text>
            </View>

            {/* Métricas Principais */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📊 Métricas Executivas</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>
                    R$ {props.totalInvestment.toLocaleString("pt-BR")}
                  </Text>
                  <Text style={styles.statLabel}>Investimento Total</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>
                    R$ {props.totalPaid.toLocaleString("pt-BR")}
                  </Text>
                  <Text style={styles.statLabel}>Valor Pago</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>
                    R$ {props.totalRemaining.toLocaleString("pt-BR")}
                  </Text>
                  <Text style={styles.statLabel}>Valor Pendente</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>
                    {props.progressPercentage.toFixed(1)}%
                  </Text>
                  <Text style={styles.statLabel}>Progresso Geral</Text>
                </View>
              </View>
            </View>

            {/* Roadmap Detalhado */}
            <View style={styles.roadmapSection}>
              <Text style={styles.sectionTitle}>🗺️ Roadmap do Projeto</Text>
              {props.modules.map((module, index) => {
                const moduleProgress = (module.paid / module.total) * 100
                const progressWidth = `${Math.min(moduleProgress, 100)}%`

                return (
                  <View key={module.id} style={styles.roadmapItem}>
                    <Text style={styles.roadmapTitle}>
                      {index + 1}. {module.title}
                    </Text>

                    <View style={styles.roadmapProgress}>
                      <View style={styles.progressBar}>
                        <View
                          style={[
                            styles.progressFill,
                            { width: progressWidth },
                          ]}
                        />
                      </View>
                      <Text style={styles.progressText}>
                        {moduleProgress.toFixed(1)}%
                      </Text>
                    </View>

                    <View style={styles.substepsList}>
                      {module.substeps.map((substep, subIndex) => (
                        <View key={subIndex} style={styles.substepItem}>
                          <Text style={styles.substepName}>
                            • {substep.name}
                          </Text>
                          <Text style={styles.substepValue}>
                            R$ {substep.value.toLocaleString("pt-BR")}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )
              })}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Relatório gerado em {new Date().toLocaleDateString("pt-BR")} às{" "}
                {new Date().toLocaleTimeString("pt-BR")}
              </Text>
              <Text style={styles.footerText}>
                GB Locações - Dashboard Executivo de Progresso
              </Text>
            </View>
          </Page>
        </Document>
      )

      // Criar o link de download
      const stream = await renderToStream(<DashboardPDF />)
      const chunks: Uint8Array[] = []

      for await (const chunk of stream) {
        chunks.push(chunk as Uint8Array)
      }

      const buffer = Buffer.concat(chunks)
      const blob = new Blob([buffer], { type: "application/pdf" })
      const downloadLink = document.createElement("a")
      downloadLink.href = URL.createObjectURL(blob)
      downloadLink.download = `dashboard-executivo-${new Date().toISOString().split("T")[0]}.pdf`
      downloadLink.click()
    } catch (error) {
      console.error("Erro ao gerar PDF:", error)
      alert("Erro ao gerar PDF. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  // Se não estiver no cliente, mostrar botão de carregamento
  if (!isClient) {
    return (
      <button
        className="inline-flex transform items-center justify-center rounded-md border border-transparent bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-xl focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none"
        disabled
      >
        <div className="flex items-center space-x-2">
          <svg
            className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Carregando...</span>
        </div>
      </button>
    )
  }

  // Se estiver no cliente, mostrar o botão de exportação
  return (
    <button
      onClick={handleExportPDF}
      disabled={isLoading}
      className="inline-flex transform items-center justify-center rounded-md border border-transparent bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-xl focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
    >
      <div className="flex items-center space-x-2">
        {isLoading ? (
          <>
            <svg
              className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Gerando PDF...</span>
          </>
        ) : (
          <>
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Exportar PDF</span>
          </>
        )}
      </div>
    </button>
  )
}

export default PDFExport
