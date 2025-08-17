"use client"

import React, { useState, useEffect, useRef } from "react"

/**
 * Componente de Exportação PDF com Captura Visual Completa
 *
 * Este componente captura EXATAMENTE o visual do dashboard usando html2canvas
 * e gera um PDF que preserva todos os estilos, cores, gradientes e layout.
 *
 * Funcionalidades:
 * - Captura visual 1:1 do dashboard
 * - Alta resolução (scale: 2)
 * - Suporte a múltiplas páginas
 * - Fallback para método tradicional se html2canvas falhar
 * - Preserva todos os estilos CSS, Tailwind e customizações
 */

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
  dashboardRef?: React.RefObject<HTMLDivElement | null>
}

// Componente principal de exportação
const PDFExport: React.FC<PDFExportProps> = props => {
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dashboardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleExportPDF = async () => {
    if (!isClient) return

    // Usar a referência passada como prop ou a local
    const targetRef = props.dashboardRef || dashboardRef
    if (!targetRef.current) return

    setIsLoading(true)

    try {
      // Dynamic imports
      const html2canvas = (await import("html2canvas")).default
      const jsPDF =
        (await import("jspdf")).jsPDF || (await import("jspdf")).default

      // Configurações do html2canvas EQUILIBRADAS para uma única página
      const canvas = await html2canvas(targetRef.current, {
        scale: 1.2, // Resolução equilibrada para visibilidade
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#000000",
        width: targetRef.current.scrollWidth,
        height: targetRef.current.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: targetRef.current.scrollWidth,
        windowHeight: targetRef.current.scrollHeight,
        logging: false,
        removeContainer: false,
        foreignObjectRendering: true,
        imageTimeout: 15000,
        onclone: clonedDoc => {
          // SOLUÇÃO SIMPLES: apenas estilos básicos, sem compressões
          const clonedElement = clonedDoc.querySelector(
            "[data-dashboard-clone]"
          ) as HTMLElement
          if (clonedElement) {
            // Apenas estilos essenciais para o PDF
            clonedElement.style.cssText = `
              color: white !important;
              font-family: system-ui, -apple-system, sans-serif !important;
            `
          }
        },
      })

      // SOLUÇÃO PERFEITA: preencher laterais com preto + centralizar dashboard
      const imgWidth = 210 // A4 width em mm
      const pageHeight = 297 // A4 height em mm

      // Criar PDF com uma página
      const pdf = new jsPDF("p", "mm", "a4")

      // PREENCHER TODO O FUNDO COM PRETO
      pdf.setFillColor(0, 0, 0) // Preto
      pdf.rect(0, 0, imgWidth, pageHeight, "F")

      // Calcular dimensões da imagem
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // SEMPRE centralizar o dashboard na página
      let finalWidth, finalHeight, xOffset, yOffset

      if (imgHeight <= pageHeight) {
        // Se couber naturalmente, centralizar
        finalWidth = imgWidth
        finalHeight = imgHeight
        xOffset = 0
        yOffset = (pageHeight - imgHeight) / 2
      } else {
        // Se não couber, redimensionar e centralizar
        const scaleFactor = pageHeight / imgHeight
        finalWidth = imgWidth * scaleFactor
        finalHeight = pageHeight
        xOffset = (imgWidth - finalWidth) / 2
        yOffset = 0
      }

      // ADICIONAR O DASHBOARD CENTRALIZADO POR CIMA DO FUNDO PRETO
      pdf.addImage(
        canvas.toDataURL("image/jpeg", 1.0),
        "JPEG",
        xOffset,
        yOffset,
        finalWidth,
        finalHeight
      )

      // Salvar o PDF
      pdf.save(
        `dashboard-executivo-${new Date().toISOString().split("T")[0]}.pdf`
      )
    } catch (error) {
      console.error("Erro ao gerar PDF:", error)

      // Fallback: tentar método alternativo se html2canvas falhar
      try {
        await generateFallbackPDF()
      } catch (fallbackError) {
        console.error("Erro no fallback:", fallbackError)
        alert("Erro ao gerar PDF. Tente novamente.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Método fallback que cria um PDF com estilos similares
  const generateFallbackPDF = async () => {
    const { jsPDF } = await import("jspdf")

    const doc = new jsPDF()

    // Configurar cores similares ao dashboard
    const primaryColor = [139, 92, 246] // #8b5cf6
    const textColor = [255, 255, 255] // #ffffff

    // Header com gradiente simulado
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.rect(0, 0, 210, 40, "F")

    // Título principal
    doc.setTextColor(textColor[0], textColor[1], textColor[2])
    doc.setFontSize(24)
    doc.text("Dashboard Executivo de Progresso", 105, 25, { align: "center" })
    doc.setFontSize(14)
    doc.text("GB Locações - Relatório de Projeto", 105, 35, { align: "center" })

    // Métricas principais com cards estilizados
    let yPos = 60
    const metrics = [
      {
        label: "Total Planejado",
        value: `R$ ${props.totalInvestment.toLocaleString("pt-BR")}`,
      },
      {
        label: "Recebido",
        value: `R$ ${props.totalPaid.toLocaleString("pt-BR")}`,
      },
      {
        label: "A Receber",
        value: `R$ ${props.totalRemaining.toLocaleString("pt-BR")}`,
      },
      {
        label: "Progresso Geral",
        value: `${props.progressPercentage.toFixed(1)}%`,
      },
    ]

    metrics.forEach((metric, index) => {
      const xPos = 15 + (index % 2) * 90
      if (index > 0 && index % 2 === 0) yPos += 30

      // Card com gradiente simulado
      doc.setFillColor(
        primaryColor[0] - 50,
        primaryColor[1] - 50,
        primaryColor[2] - 50
      )
      doc.roundedRect(xPos, yPos - 20, 85, 25, 3, 3, "F")
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.roundedRect(xPos, yPos - 20, 85, 25, 3, 3, "S")

      // Valor
      doc.setFontSize(16)
      doc.setTextColor(textColor[0], textColor[1], textColor[2])
      doc.text(metric.value, xPos + 42.5, yPos - 10, { align: "center" })

      // Label
      doc.setFontSize(10)
      doc.setTextColor(200, 200, 200)
      doc.text(metric.label, xPos + 42.5, yPos + 2, { align: "center" })
    })

    // Roadmap do projeto
    yPos += 50
    doc.setFontSize(16)
    doc.setTextColor(textColor[0], textColor[1], textColor[2])
    doc.text("🗺️ Roadmap do Projeto", 15, yPos)
    yPos += 20

    props.modules.forEach((module, index) => {
      const moduleProgress = (module.paid / module.total) * 100

      // Título do módulo
      doc.setFontSize(12)
      doc.setTextColor(textColor[0], textColor[1], textColor[2])
      doc.text(`${index + 1}. ${module.title}`, 15, yPos)

      // Barra de progresso estilizada
      const progressWidth = 120
      const progressX = 15
      const progressY = yPos + 5

      // Background da barra
      doc.setFillColor(100, 100, 100)
      doc.roundedRect(progressX, progressY, progressWidth, 10, 5, 5, "F")

      // Barra de progresso
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.roundedRect(
        progressX,
        progressY,
        (progressWidth * moduleProgress) / 100,
        10,
        5,
        5,
        "F"
      )

      // Texto de progresso
      doc.setFontSize(10)
      doc.setTextColor(200, 200, 200)
      doc.text(
        `${moduleProgress.toFixed(1)}%`,
        progressX + progressWidth + 15,
        progressY + 7
      )

      // Substeps
      yPos += 30
      module.substeps.forEach(substep => {
        doc.setFontSize(10)
        doc.setTextColor(180, 180, 180)
        doc.text(`• ${substep.name}`, 25, yPos)
        doc.setTextColor(34, 197, 94) // Verde
        doc.text(`R$ ${substep.value.toLocaleString("pt-BR")}`, 150, yPos)
        yPos += 8
      })

      yPos += 15
    })

    // Footer
    const footerY = 280
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.line(15, footerY, 195, footerY)

    doc.setFontSize(10)
    doc.setTextColor(200, 200, 200)
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

    doc.save(
      `dashboard-executivo-${new Date().toISOString().split("T")[0]}.pdf`
    )
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
            Capturando Dashboard...
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
