"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Save } from "lucide-react"

interface Slider {
  id: string
  name: string
  leftLabel: string
  rightLabel: string
  value: number
  description: string
}

interface HistoryEntry {
  date: string
  slider: string
  from: number
  to: number
  reason: string
}

const initialSliders: Slider[] = [
  {
    id: "brand-conversion",
    name: "Brand ↔ Conversion",
    leftLabel: "Brand",
    rightLabel: "Conversion",
    value: 35,
    description: "Al 35%: il sistema favorisce contenuti educativi e brand. Il Copywriter genera più R1/R2 riflessivi. CTA solo per eventi gratuiti.",
  },
  {
    id: "organic-paid",
    name: "Organico ↔ Paid",
    leftLabel: "Organico",
    rightLabel: "Paid",
    value: 20,
    description: "Al 20%: il sistema massimizza contenuto organico. Non pianifica slot di supporto ads. Più post LinkedIn, Medium, Telegram.",
  },
  {
    id: "volume-depth",
    name: "Volume ↔ Profondita",
    leftLabel: "Volume",
    rightLabel: "Profondita",
    value: 60,
    description: "Al 60%: il sistema bilancia frequenza e qualità. 3-4 post settimanali per canale. Newsletter settimanale. Ogni contenuto ha tempo di produzione adeguato.",
  },
  {
    id: "education-promo",
    name: "Educazione ↔ Promozione",
    leftLabel: "Educazione",
    rightLabel: "Promozione",
    value: 30,
    description: "Al 30%: la maggioranza dei contenuti è educativa. Max 1 post promozionale a settimana. Rubriche R1-R4 attive. R5 solo per approfondimenti.",
  },
]

const history: HistoryEntry[] = [
  {
    date: "15 marzo",
    slider: "Brand→Conversion",
    from: 50,
    to: 35,
    reason: "fase fondazione, priorità brand",
  },
  {
    date: "1 marzo",
    slider: "Volume→Profondità",
    from: 40,
    to: 60,
    reason: "primi risultati, possiamo aumentare",
  },
]

export function Orientamento() {
  const [sliders, setSliders] = useState(initialSliders)
  const [originalValues] = useState(initialSliders.map((s) => s.value))
  const [historyOpen, setHistoryOpen] = useState(false)

  const hasChanges = sliders.some((s, i) => s.value !== originalValues[i])

  const handleSliderChange = (id: string, newValue: number) => {
    setSliders((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          // Update description based on value
          let description = s.description
          if (id === "brand-conversion") {
            if (newValue < 30) {
              description = `Al ${newValue}%: focus quasi esclusivo su brand awareness. Contenuti riflessivi, zero CTA dirette. Il Copywriter evita qualsiasi tono promozionale.`
            } else if (newValue < 50) {
              description = `Al ${newValue}%: il sistema favorisce contenuti educativi e brand. Il Copywriter genera più R1/R2 riflessivi. CTA solo per eventi gratuiti.`
            } else if (newValue < 70) {
              description = `Al ${newValue}%: equilibrio tra brand e conversion. CTA presenti ma non aggressive. Mix di contenuti riflessivi e promozionali.`
            } else {
              description = `Al ${newValue}%: focus su conversion. Più CTA, più contenuti promozionali. Il Copywriter spinge offerte e eventi a pagamento.`
            }
          } else if (id === "organic-paid") {
            if (newValue < 30) {
              description = `Al ${newValue}%: il sistema massimizza contenuto organico. Non pianifica slot di supporto ads. Più post LinkedIn, Medium, Telegram.`
            } else if (newValue < 50) {
              description = `Al ${newValue}%: principalmente organico con occasionale supporto paid. Budget ads minimo per eventi importanti.`
            } else if (newValue < 70) {
              description = `Al ${newValue}%: mix bilanciato. Campagne ads per ogni evento. Budget allocato per promozione contenuti top.`
            } else {
              description = `Al ${newValue}%: strategia paid-first. Ogni contenuto importante ha budget ads. Retargeting attivo su tutti i canali.`
            }
          } else if (id === "volume-depth") {
            if (newValue < 30) {
              description = `Al ${newValue}%: alta frequenza, contenuti più brevi. 5-6 post/settimana per canale. Newsletter breve. Velocità sopra perfezione.`
            } else if (newValue < 50) {
              description = `Al ${newValue}%: buona frequenza con qualità media. 4-5 post/settimana. Newsletter standard.`
            } else if (newValue < 70) {
              description = `Al ${newValue}%: bilancia frequenza e qualità. 3-4 post settimanali per canale. Newsletter settimanale. Ogni contenuto ha tempo di produzione adeguato.`
            } else {
              description = `Al ${newValue}%: focus su profondità. 2-3 post/settimana ma più lunghi e ricercati. Long-form preferito. Newsletter approfondita.`
            }
          } else if (id === "education-promo") {
            if (newValue < 30) {
              description = `Al ${newValue}%: la maggioranza dei contenuti è educativa. Max 1 post promozionale a settimana. Rubriche R1-R4 attive. R5 solo per approfondimenti.`
            } else if (newValue < 50) {
              description = `Al ${newValue}%: prevalenza educativa con promozione occasionale. 2-3 post promo/settimana. Eventi gratuiti promossi attivamente.`
            } else if (newValue < 70) {
              description = `Al ${newValue}%: mix equilibrato. Ogni contenuto educativo ha un follow-up promozionale. Funnel attivi su tutti i canali.`
            } else {
              description = `Al ${newValue}%: focus promozionale. Ogni contenuto porta a una CTA. Eventi e prodotti in primo piano.`
            }
          }
          return { ...s, value: newValue, description }
        }
        return s
      })
    )
  }

  return (
    <div className="flex h-full items-start justify-center overflow-y-auto p-8">
      <div className="w-full max-w-[700px]">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-3 text-[18px] font-bold" style={{ color: "#1B2B4B" }}>
            Orientamento strategico
          </h1>
          <p className="text-[14px] leading-relaxed" style={{ color: "#7C8CA2" }}>
            Questi cursori guidano tutti gli agenti. Modificali per cambiare la direzione
            operativa dell&apos;intero sistema.
          </p>
        </div>

        {/* Sliders */}
        <div className="mb-8 space-y-6">
          {sliders.map((slider) => (
            <div
              key={slider.id}
              className="rounded-xl border p-5"
              style={{ borderColor: "#E5E7EB" }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-[15px] font-bold" style={{ color: "#1B2B4B" }}>
                  {slider.name}
                </h3>
                <span
                  className="text-[16px] font-bold"
                  style={{ color: "#2563EB" }}
                >
                  {slider.value}%
                </span>
              </div>

              {/* Slider */}
              <div className="mb-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={slider.value}
                  onChange={(e) => handleSliderChange(slider.id, parseInt(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full"
                  style={{
                    background: `linear-gradient(to right, #2563EB 0%, #2563EB ${slider.value}%, #E5E7EB ${slider.value}%, #E5E7EB 100%)`,
                  }}
                />
                <div className="mt-1 flex justify-between">
                  <span className="text-[12px]" style={{ color: "#9CA3AF" }}>
                    {slider.leftLabel}
                  </span>
                  <span className="text-[12px]" style={{ color: "#9CA3AF" }}>
                    {slider.rightLabel}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div
                className="rounded-lg p-3"
                style={{ backgroundColor: "#F9FAFB" }}
              >
                <p className="text-[12px] leading-relaxed" style={{ color: "#374151" }}>
                  {slider.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* History */}
        <div className="mb-6">
          <button
            onClick={() => setHistoryOpen(!historyOpen)}
            className="flex w-full items-center justify-between rounded-lg border p-3 transition-colors hover:bg-gray-50"
            style={{ borderColor: "#E5E7EB" }}
          >
            <span className="text-[13px] font-medium" style={{ color: "#6B7280" }}>
              Storico modifiche
            </span>
            {historyOpen ? (
              <ChevronUp className="h-4 w-4" style={{ color: "#9CA3AF" }} />
            ) : (
              <ChevronDown className="h-4 w-4" style={{ color: "#9CA3AF" }} />
            )}
          </button>

          {historyOpen && (
            <div className="mt-2 space-y-2 rounded-lg border p-3" style={{ borderColor: "#E5E7EB" }}>
              {history.map((entry, idx) => (
                <div key={idx} className="text-[12px]" style={{ color: "#6B7280" }}>
                  <span className="font-medium">{entry.date}:</span> {entry.slider} da {entry.from}% a {entry.to}% — <span className="italic">Motivo: {entry.reason}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Save button */}
        <div className="text-center">
          <button
            disabled={!hasChanges}
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-[14px] font-medium text-white transition-opacity"
            style={{
              backgroundColor: "#2563EB",
              opacity: hasChanges ? 1 : 0.5,
              cursor: hasChanges ? "pointer" : "not-allowed",
            }}
          >
            <Save className="h-4 w-4" /> Salva modifiche
          </button>
          <p className="mt-2 text-[12px]" style={{ color: "#9CA3AF" }}>
            Le modifiche vengono applicate al prossimo checkpoint dell&apos;orchestrator (ogni 6 ore).
          </p>
        </div>
      </div>
    </div>
  )
}
