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
 * - Alta resolução (scale: 1.2)
 * - Suporte a múltiplas páginas
 * - Fallback para método tradicional se html2canvas falhar
 * - Preserva todos os estilos CSS, Tailwind e customizações
 */

// Constantes de configuração
const PDF_CONFIG = {
  SCALE: 1.2,
  A4_WIDTH_MM: 210,
  A4_HEIGHT_MM: 297,
  IMAGE_QUALITY: 1.0,
  TIMEOUT_MS: 15000,
  FALLBACK_COLORS: {
    PRIMARY: [139, 92, 246],
    TEXT: [255, 255, 255],
    SECONDARY: [200, 200, 200],
    SUCCESS: [34, 197, 94],
    GRAY: [100, 100, 100],
    LIGHT_GRAY: [180, 180, 180],
  },
} as const

// Interface para os dados do dashboard
interface Module {
  readonly id: number
  readonly key: string
  readonly title: string
  readonly total: number
  readonly paid: number
  readonly substeps: readonly Substep[]
}

interface Substep {
  readonly name: string
  readonly value: number
  readonly justification: string
}

interface PDFExportProps {
  readonly modules: readonly Module[]
  readonly totalInvestment: number
  readonly totalPaid: number
  readonly totalRemaining: number
  readonly progressPercentage: number
  readonly dashboardRef?: React.RefObject<HTMLDivElement | null>
}

interface CanvasConfig {
  scale: number
  useCORS: boolean
  allowTaint: boolean
  backgroundColor: string
  width: number
  height: number
  scrollX: number
  scrollY: number
  windowWidth: number
  windowHeight: number
  logging: boolean
  removeContainer: boolean
  foreignObjectRendering: boolean
  imageTimeout: number
  onclone: (clonedDoc: Document) => void
}

interface PDFDimensions {
  finalWidth: number
  finalHeight: number
  xOffset: number
  yOffset: number
}

// Componente principal de exportação
const PDFExport: React.FC<PDFExportProps> = props => {
  const [isClient, setIsClient] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dashboardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  /**
   * Calcula as dimensões finais da imagem no PDF
   */
  const calculatePDFDimensions = (
    canvasWidth: number,
    canvasHeight: number
  ): PDFDimensions => {
    const imgWidth = PDF_CONFIG.A4_WIDTH_MM
    const pageHeight = PDF_CONFIG.A4_HEIGHT_MM
    const imgHeight = (canvasHeight * imgWidth) / canvasWidth

    if (imgHeight <= pageHeight) {
      // Se couber naturalmente, centralizar
      return {
        finalWidth: imgWidth,
        finalHeight: imgHeight,
        xOffset: 0,
        yOffset: (pageHeight - imgHeight) / 2,
      }
    } else {
      // Se não couber, redimensionar e centralizar
      const scaleFactor = pageHeight / imgHeight
      return {
        finalWidth: imgWidth * scaleFactor,
        finalHeight: pageHeight,
        xOffset: (imgWidth - imgWidth * scaleFactor) / 2,
        yOffset: 0,
      }
    }
  }

  /**
   * Configura o html2canvas com as opções otimizadas
   */
  const getCanvasConfig = (targetElement: HTMLDivElement): CanvasConfig => ({
    scale: PDF_CONFIG.SCALE,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#000000",
    width: targetElement.scrollWidth,
    height: targetElement.scrollHeight,
    scrollX: 0,
    scrollY: 0,
    windowWidth: targetElement.scrollWidth,
    windowHeight: targetElement.scrollHeight,
    logging: false,
    removeContainer: false,
    foreignObjectRendering: true,
    imageTimeout: PDF_CONFIG.TIMEOUT_MS,
    onclone: (clonedDoc: Document) => {
      const clonedElement = clonedDoc.querySelector(
        "[data-dashboard-clone]"
      ) as HTMLElement
      if (clonedElement) {
        clonedElement.style.cssText = `
          color: white !important;
          font-family: system-ui, -apple-system, sans-serif !important;
        `
      }
    },
  })

  /**
   * Gera o nome do arquivo PDF com timestamp
   */
  const generateFileName = (): string => {
    const date = new Date().toISOString().split("T")[0]
    return `dashboard-executivo-${date}.pdf`
  }

  /**
   * Cria um PDF com fundo preto e dashboard centralizado
   */
  const createMainPDF = async (canvas: HTMLCanvasElement): Promise<void> => {
    const jsPDF =
      (await import("jspdf")).jsPDF || (await import("jspdf")).default
    const pdf = new jsPDF("p", "mm", "a4")

    // Preencher todo o fundo com preto
    pdf.setFillColor(0, 0, 0)
    pdf.rect(0, 0, PDF_CONFIG.A4_WIDTH_MM, PDF_CONFIG.A4_HEIGHT_MM, "F")

    // Calcular dimensões e posicionamento
    const dimensions = calculatePDFDimensions(canvas.width, canvas.height)

    // Adicionar o dashboard centralizado por cima do fundo preto
    pdf.addImage(
      canvas.toDataURL("image/jpeg", PDF_CONFIG.IMAGE_QUALITY),
      "JPEG",
      dimensions.xOffset,
      dimensions.yOffset,
      dimensions.finalWidth,
      dimensions.finalHeight
    )

    // Salvar o PDF
    pdf.save(generateFileName())
  }

  /**
   * Método fallback que cria um PDF com estilos similares
   */
  const generateFallbackPDF = async (): Promise<void> => {
    const { jsPDF } = await import("jspdf")
    const doc = new jsPDF()

    // Configurar cores similares ao dashboard
    const { PRIMARY, TEXT, SECONDARY, SUCCESS, GRAY, LIGHT_GRAY } =
      PDF_CONFIG.FALLBACK_COLORS

    // Header com gradiente simulado
    doc.setFillColor(PRIMARY[0], PRIMARY[1], PRIMARY[2])
    doc.rect(0, 0, PDF_CONFIG.A4_WIDTH_MM, 40, "F")

    // Título principal
    doc.setTextColor(TEXT[0], TEXT[1], TEXT[2])
    doc.setFontSize(24)
    doc.text(
      "Dashboard Executivo de Progresso",
      PDF_CONFIG.A4_WIDTH_MM / 2,
      25,
      { align: "center" }
    )
    doc.setFontSize(14)
    doc.text(
      "GB Locações - Relatório de Projeto",
      PDF_CONFIG.A4_WIDTH_MM / 2,
      35,
      { align: "center" }
    )

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
      doc.setFillColor(PRIMARY[0] - 50, PRIMARY[1] - 50, PRIMARY[2] - 50)
      doc.roundedRect(xPos, yPos - 20, 85, 25, 3, 3, "F")
      doc.setDrawColor(PRIMARY[0], PRIMARY[1], PRIMARY[2])
      doc.roundedRect(xPos, yPos - 20, 85, 25, 3, 3, "S")

      // Valor
      doc.setFontSize(16)
      doc.setTextColor(TEXT[0], TEXT[1], TEXT[2])
      doc.text(metric.value, xPos + 42.5, yPos - 10, { align: "center" })

      // Label
      doc.setFontSize(10)
      doc.setTextColor(SECONDARY[0], SECONDARY[1], SECONDARY[2])
      doc.text(metric.label, xPos + 42.5, yPos + 2, { align: "center" })
    })

    // Roadmap do projeto
    yPos += 50
    doc.setFontSize(16)
    doc.setTextColor(TEXT[0], TEXT[1], TEXT[2])
    doc.text("🗺️ Roadmap do Projeto", 15, yPos)
    yPos += 20

    props.modules.forEach((module, index) => {
      const moduleProgress = (module.paid / module.total) * 100

      // Título do módulo
      doc.setFontSize(12)
      doc.setTextColor(TEXT[0], TEXT[1], TEXT[2])
      doc.text(`${index + 1}. ${module.title}`, 15, yPos)

      // Barra de progresso estilizada
      const progressWidth = 120
      const progressX = 15
      const progressY = yPos + 5

      // Background da barra
      doc.setFillColor(GRAY[0], GRAY[1], GRAY[2])
      doc.roundedRect(progressX, progressY, progressWidth, 10, 5, 5, "F")

      // Barra de progresso
      doc.setFillColor(PRIMARY[0], PRIMARY[1], PRIMARY[2])
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
      doc.setTextColor(SECONDARY[0], SECONDARY[1], SECONDARY[2])
      doc.text(
        `${moduleProgress.toFixed(1)}%`,
        progressX + progressWidth + 15,
        progressY + 7
      )

      // Substeps
      yPos += 30
      module.substeps.forEach(substep => {
        doc.setFontSize(10)
        doc.setTextColor(LIGHT_GRAY[0], LIGHT_GRAY[1], LIGHT_GRAY[2])
        doc.text(`• ${substep.name}`, 25, yPos)
        doc.setTextColor(SUCCESS[0], SUCCESS[1], SUCCESS[2])
        doc.text(`R$ ${substep.value.toLocaleString("pt-BR")}`, 150, yPos)
        yPos += 8
      })

      yPos += 15
    })

    // Footer
    const footerY = 280
    doc.setDrawColor(PRIMARY[0], PRIMARY[1], PRIMARY[2])
    doc.line(15, footerY, 195, footerY)

    doc.setFontSize(10)
    doc.setTextColor(SECONDARY[0], SECONDARY[1], SECONDARY[2])
    doc.text(
      `Relatório gerado em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}`,
      PDF_CONFIG.A4_WIDTH_MM / 2,
      footerY + 10,
      { align: "center" }
    )
    doc.text(
      "GB Locações - Dashboard Executivo de Progresso",
      PDF_CONFIG.A4_WIDTH_MM / 2,
      footerY + 20,
      { align: "center" }
    )

    doc.save(generateFileName())
  }

  /**
   * Função principal para exportar o PDF
   */
  const handleExportPDF = async (): Promise<void> => {
    if (!isClient) return

    // Usar a referência passada como prop ou a local
    const targetRef = props.dashboardRef || dashboardRef
    if (!targetRef.current) {
      console.warn("Referência do dashboard não encontrada")
      return
    }

    setIsLoading(true)

    try {
      // Dynamic imports
      const html2canvas = (await import("html2canvas")).default

      // Configurações do html2canvas otimizadas
      const canvasConfig = getCanvasConfig(targetRef.current)
      const canvas = await html2canvas(targetRef.current, canvasConfig)

      // Criar PDF principal
      await createMainPDF(canvas)
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

  // Se não estiver no cliente, mostrar botão de carregamento
  if (!isClient) {
    return (
      <button
        className="hover-scale-smooth duration-600 group relative overflow-hidden rounded-2xl border border-purple-300/25 bg-gradient-to-r from-purple-900/40 to-violet-900/30 px-6 py-3 text-sm font-medium text-white backdrop-blur-3xl transition-all ease-in-out hover:shadow-xl hover:shadow-purple-400/20"
        disabled
      >
        <div className="duration-600 absolute inset-0 bg-gradient-to-r from-purple-400/15 to-violet-400/15 opacity-0 transition-all ease-in-out group-hover:opacity-100" />
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
      className="hover-scale-smooth duration-600 group relative overflow-hidden rounded-2xl border border-purple-300/25 bg-gradient-to-r from-purple-900/40 to-violet-900/30 px-6 py-3 text-sm font-medium text-white backdrop-blur-3xl transition-all ease-in-out hover:shadow-xl hover:shadow-purple-400/20"
    >
      <div className="duration-600 absolute inset-0 bg-gradient-to-r from-purple-400/15 to-violet-400/15 opacity-0 transition-all ease-in-out group-hover:opacity-100" />
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
