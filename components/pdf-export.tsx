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
      const { jsPDF } = await import("jspdf")

      // Criar o PDF usando jsPDF
      const doc = new jsPDF()

      // Configurar fonte e tamanhos
      doc.setFont("helvetica")
      doc.setFontSize(24)

      // Título principal
      doc.text("Dashboard Executivo de Progresso", 105, 30, { align: "center" })
      doc.setFontSize(14)
      doc.setTextColor(107, 114, 128)
      doc.text("GB Locações - Relatório de Projeto", 105, 45, {
        align: "center",
      })

      // Métricas principais
      doc.setFontSize(16)
      doc.setTextColor(31, 41, 55)
      doc.text("📊 Métricas Executivas", 20, 70)

      // Grid de métricas
      const metrics = [
        {
          label: "Investimento Total",
          value: `R$ ${props.totalInvestment.toLocaleString("pt-BR")}`,
        },
        {
          label: "Valor Pago",
          value: `R$ ${props.totalPaid.toLocaleString("pt-BR")}`,
        },
        {
          label: "Valor Pendente",
          value: `R$ ${props.totalRemaining.toLocaleString("pt-BR")}`,
        },
        {
          label: "Progresso Geral",
          value: `${props.progressPercentage.toFixed(1)}%`,
        },
      ]

      let yPos = 85
      metrics.forEach((metric, index) => {
        const xPos = 20 + (index % 2) * 85
        if (index > 0 && index % 2 === 0) yPos += 25

        doc.setFillColor(249, 250, 251)
        doc.rect(xPos, yPos - 15, 80, 20, "F")
        doc.setDrawColor(229, 231, 235)
        doc.rect(xPos, yPos - 15, 80, 20, "S")

        doc.setFontSize(16)
        doc.setTextColor(31, 41, 55)
        doc.text(metric.value, xPos + 40, yPos - 5, { align: "center" })
        doc.setFontSize(10)
        doc.setTextColor(107, 114, 128)
        doc.text(metric.label, xPos + 40, yPos + 5, { align: "center" })
      })

      // Roadmap do projeto
      yPos += 40
      doc.setFontSize(16)
      doc.setTextColor(31, 41, 55)
      doc.text("🗺️ Roadmap do Projeto", 20, yPos)
      yPos += 20

      props.modules.forEach((module, index) => {
        const moduleProgress = (module.paid / module.total) * 100

        // Título do módulo
        doc.setFontSize(12)
        doc.setTextColor(31, 41, 55)
        doc.text(`${index + 1}. ${module.title}`, 20, yPos)

        // Barra de progresso
        const progressWidth = 100
        const progressX = 20
        const progressY = yPos + 5

        doc.setFillColor(229, 231, 235)
        doc.rect(progressX, progressY, progressWidth, 8, "F")
        doc.setFillColor(139, 92, 246)
        doc.rect(
          progressX,
          progressY,
          (progressWidth * moduleProgress) / 100,
          8,
          "F"
        )

        // Texto de progresso
        doc.setFontSize(10)
        doc.setTextColor(107, 114, 128)
        doc.text(
          `${moduleProgress.toFixed(1)}%`,
          progressX + progressWidth + 10,
          progressY + 6
        )

        // Substeps
        yPos += 25
        module.substeps.forEach(substep => {
          doc.setFontSize(10)
          doc.setTextColor(55, 65, 81)
          doc.text(`• ${substep.name}`, 30, yPos)
          doc.setTextColor(5, 150, 105)
          doc.text(`R$ ${substep.value.toLocaleString("pt-BR")}`, 150, yPos)
          yPos += 8
        })

        yPos += 10
      })

      // Footer
      const footerY = 280
      doc.setDrawColor(229, 231, 235)
      doc.line(20, footerY, 190, footerY)

      doc.setFontSize(10)
      doc.setTextColor(107, 114, 128)
      doc.text(
        `Relatório gerado em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}`,
        105,
        footerY + 10,
        { align: "center" }
      )
      doc.text(
        "GB Locações - Dashboard Executivo de Progresso",
        105,
        footerY + 20,
        { align: "center" }
      )

      // Salvar o PDF
      doc.save(
        `dashboard-executivo-${new Date().toISOString().split("T")[0]}.pdf`
      )
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
        className="group relative overflow-hidden rounded-2xl border border-purple-300/25 bg-gradient-to-r from-purple-900/40 to-violet-900/30 px-6 py-3 text-sm font-medium text-white backdrop-blur-3xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-400/20"
        disabled
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/15 to-violet-400/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="relative z-10 flex items-center gap-2">
          <svg
            className="h-4 w-4 animate-spin text-white"
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
          Carregando...
        </span>
      </button>
    )
  }

  // Se estiver no cliente, mostrar o botão de exportação
  return (
    <button
      onClick={handleExportPDF}
      disabled={isLoading}
      className="group relative overflow-hidden rounded-2xl border border-purple-300/25 bg-gradient-to-r from-purple-900/40 to-violet-900/30 px-6 py-3 text-sm font-medium text-white backdrop-blur-3xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-400/20"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/15 to-violet-400/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative z-10 flex items-center gap-2">
        {isLoading ? (
          <>
            <svg
              className="h-4 w-4 animate-spin text-white"
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
            Gerando PDF...
          </>
        ) : (
          <>
            <svg
              className="h-4 w-4"
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
            Exportar PDF
          </>
        )}
      </span>
    </button>
  )
}

export default PDFExport
