"use client"

import { useState } from "react"
import {
  Check,
  AlertCircle,
  Upload,
  Plus,
  Trash2,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  Users,
  Package,
  Palette,
  Globe,
  BookOpen,
  Settings,
  RefreshCw,
} from "lucide-react"

type SectionStatus = "complete" | "partial" | "empty"

interface Section {
  id: string
  title: string
  icon: React.ReactNode
  status: SectionStatus
  description: string
}

// Demo data for Ariadne Coaching School
const projectData = {
  identity: {
    name: "Ariadne Coaching School",
    tagline: "Formiamo i coach del futuro con l'intelligenza artificiale",
    description: `Ariadne Coaching School è una scuola di formazione per coach certificata ICF, con sede a Lugano, Svizzera. La nostra missione è formare coach professionisti capaci di integrare l'intelligenza artificiale nel loro lavoro, mantenendo sempre al centro la relazione umana.

Offriamo percorsi di certificazione riconosciuti a livello internazionale, workshop pratici e webinar gratuiti. Il nostro approccio combina le metodologie di coaching tradizionali con strumenti AI all'avanguardia.

Target principale: coach in formazione, coach certificati che vogliono aggiornarsi, HR manager, consulenti aziendali.`,
    sector: "Formazione",
    primaryMarket: "Svizzera italiana",
    secondaryMarkets: "Svizzera tedesca, Italia nord",
    languages: ["Italiano", "English"],
    location: "Lugano, Ticino, Svizzera",
    foundedYear: "2024",
  },
  brand: {
    logoUploaded: true,
    primaryColor: "#1A3A5C",
    accentColor: "#2E75B6",
    backgroundColor: "#F5F5F5",
    primaryFont: "Inter",
    secondaryFont: "Georgia",
    toneOfVoice: "Autorevole ma empatico. Professionale ma accessibile. Mai gergo tecnico senza spiegazione. Sempre esempi concreti dal mondo del coaching.",
    wordsToUse: ["coaching", "trasformazione", "intelligenza umana", "crescita", "consapevolezza", "potenziale"],
    wordsToAvoid: ["disruptive", "game-changer", "sinergia", "leverage", "scalare"],
  },
  channels: [
    { platform: "LinkedIn personale", url: "https://linkedin.com/in/emanuele-casero", status: "connected", owner: "Emanuele Casero" },
    { platform: "LinkedIn aziendale", url: "https://linkedin.com/company/ariadne-coaching", status: "connected", owner: "Ariadne" },
    { platform: "Newsletter", url: "https://newsletter.ariadne-coaching.ch", status: "connected", owner: "Ariadne" },
    { platform: "Instagram", url: "https://instagram.com/ariadnecoaching", status: "partial", owner: "Ariadne" },
  ],
  integrations: [
    { name: "Buffer", status: "connected", details: "4 profili attivi" },
    { name: "Beehiiv", status: "connected", details: "Newsletter 'AI & Persone'" },
    { name: "Resend", status: "connected", details: "DKIM verificato" },
    { name: "Fireflies.ai", status: "connected", details: "Webhook attivo" },
    { name: "Calendly", status: "connected", details: "Webhook attivo" },
    { name: "Cloudinary", status: "connected", details: "142 asset" },
    { name: "Eventbrite", status: "disconnected", details: "" },
    { name: "Google Calendar", status: "partial", details: "Read-only" },
    { name: "Stripe", status: "disconnected", details: "" },
  ],
  products: [
    { name: "Certificazione Coaching AI — Livello 1", type: "Certificazione", price: "CHF 2'500", duration: "6 sessioni da 90 minuti", status: "Attivo" },
    { name: "Workshop: AI per Coach", type: "Workshop", price: "CHF 350", duration: "1 giorno intensivo", status: "Attivo" },
    { name: "Webinar introduttivo gratuito", type: "Webinar", price: "Gratuito", duration: "90 minuti", status: "Attivo" },
  ],
  documents: [
    { title: "Brand Book Ariadne 2026", category: "Brand", updatedAt: "15 Mar 2026", usedBy: ["Copywriter", "Designer"] },
    { title: "Curriculum Certificazione L1", category: "Formazione", updatedAt: "10 Mar 2026", usedBy: ["Sales", "Copywriter"] },
    { title: "Case Study: Marco R.", category: "Prodotti", updatedAt: "5 Mar 2026", usedBy: ["Sales", "Copywriter"] },
  ],
  rubriche: [
    { code: "R1", name: "Coach del futuro", channel: "LinkedIn personale", frequency: "Settimanale", day: "Lunedì", active: true },
    { code: "R2", name: "Storie di trasformazione", channel: "Newsletter", frequency: "Bisettimanale", day: "Giovedì", active: true },
    { code: "R3", name: "Dietro le quinte", channel: "Instagram", frequency: "Settimanale", day: "Mercoledì", active: true },
    { code: "R4", name: "Una domanda che vale", channel: "LinkedIn personale", frequency: "Settimanale", day: "Venerdì", active: true },
    { code: "R5", name: "Tips & Tools", channel: "LinkedIn aziendale", frequency: "Settimanale", day: "Martedì", active: false },
  ],
  team: [
    { name: "Emanuele Casero", email: "emanuele@ariadne-coaching.ch", role: "Admin", areas: ["Strategia", "Contenuti", "Vendite"], active: true },
  ],
}

export function Workspace() {
  const [activeSection, setActiveSection] = useState("identity")
  const [expandedSections, setExpandedSections] = useState<string[]>(["identity"])

  // Calculate completion percentage
  const completionItems = [
    { id: "identity", label: "Identità progetto", complete: true },
    { id: "brand", label: "Brand & identità visiva", complete: true },
    { id: "channels", label: "Canali collegati", complete: true, partial: "4/7 attivi" },
    { id: "products", label: "Catalogo prodotti", complete: true, partial: "3 prodotti" },
    { id: "documents", label: "Knowledge Base", complete: false, partial: "3 documenti" },
    { id: "rubriche", label: "Rubriche editoriali", complete: true, partial: "5 rubriche" },
    { id: "team", label: "Team", complete: false, partial: "1 persona" },
  ]

  const completedCount = completionItems.filter((item) => item.complete).length
  const completionPercentage = Math.round((completedCount / completionItems.length) * 100)

  const sections: Section[] = [
    { id: "identity", title: "Identità del progetto", icon: <Globe className="h-4 w-4" />, status: "complete", description: "Chi sei e come ti presenti" },
    { id: "brand", title: "Brand & identità visiva", icon: <Palette className="h-4 w-4" />, status: "complete", description: "Loghi, colori, tono di voce" },
    { id: "channels", title: "Canali e profili", icon: <LinkIcon className="h-4 w-4" />, status: "partial", description: "Social e integrazioni API" },
    { id: "products", title: "Prodotti e servizi", icon: <Package className="h-4 w-4" />, status: "complete", description: "Il tuo catalogo" },
    { id: "documents", title: "Knowledge Base", icon: <BookOpen className="h-4 w-4" />, status: "partial", description: "Documenti di riferimento" },
    { id: "rubriche", title: "Rubriche editoriali", icon: <FileText className="h-4 w-4" />, status: "complete", description: "Le tue rubriche di contenuto" },
    { id: "team", title: "Team e collaboratori", icon: <Users className="h-4 w-4" />, status: "partial", description: "Chi lavora al progetto" },
  ]

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    )
    setActiveSection(sectionId)
  }

  const getStatusIcon = (status: SectionStatus) => {
    switch (status) {
      case "complete":
        return <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#22C55E" }} />
      case "partial":
        return <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
      case "empty":
        return <div className="h-2.5 w-2.5 rounded-full border-2" style={{ borderColor: "#D1D5DB" }} />
    }
  }

  const getIntegrationStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "#22C55E"
      case "partial":
        return "#F59E0B"
      case "disconnected":
        return "#D1D5DB"
      default:
        return "#D1D5DB"
    }
  }

  return (
    <div className="flex h-full">
      {/* Left Panel - Navigation */}
      <div
        className="w-[280px] flex-shrink-0 overflow-y-auto border-r p-5"
        style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}
      >
        {/* Completion Progress */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
              Setup progetto
            </span>
            <span className="text-[13px] font-bold" style={{ color: "#2563EB" }}>
              {completionPercentage}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: "#E5E7EB" }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${completionPercentage}%`, backgroundColor: "#2563EB" }}
            />
          </div>
          <p className="mt-2 text-[11px]" style={{ color: "#7C8CA2" }}>
            Completa il setup per migliorare la qualità degli agenti
          </p>
        </div>

        {/* Checklist */}
        <div className="mb-6 space-y-1">
          {completionItems.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleSection(item.id)}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-gray-50"
            >
              {item.complete ? (
                <Check className="h-4 w-4" style={{ color: "#22C55E" }} />
              ) : (
                <AlertCircle className="h-4 w-4" style={{ color: "#F59E0B" }} />
              )}
              <span className="flex-1 text-[12px]" style={{ color: "#1B2B4B" }}>
                {item.label}
              </span>
              {item.partial && (
                <span className="text-[10px]" style={{ color: "#7C8CA2" }}>
                  {item.partial}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Section Navigation */}
        <div className="space-y-1">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#7C8CA2" }}>
            Sezioni
          </p>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => toggleSection(section.id)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors"
              style={{
                backgroundColor: activeSection === section.id ? "#EFF6FF" : "transparent",
                borderLeft: activeSection === section.id ? "3px solid #2563EB" : "3px solid transparent",
              }}
            >
              <span style={{ color: activeSection === section.id ? "#2563EB" : "#7C8CA2" }}>
                {section.icon}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[13px] font-medium"
                    style={{ color: activeSection === section.id ? "#2563EB" : "#1B2B4B" }}
                  >
                    {section.title}
                  </span>
                  {getStatusIcon(section.status)}
                </div>
                <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                  {section.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel - Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-[800px]">
          {/* Identity Section */}
          {activeSection === "identity" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[20px] font-bold" style={{ color: "#1B2B4B" }}>
                  Identità del progetto
                </h2>
                <p className="mt-1 text-[13px]" style={{ color: "#7C8CA2" }}>
                  Questi dati vengono iniettati nel contesto di ogni agente. Più sono ricchi, meglio lavorano gli agenti.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-[12px] font-medium" style={{ color: "#1B2B4B" }}>
                      Nome progetto
                    </label>
                    <input
                      type="text"
                      defaultValue={projectData.identity.name}
                      className="w-full rounded-lg border px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ borderColor: "#E5E7EB" }}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[12px] font-medium" style={{ color: "#1B2B4B" }}>
                      Settore
                    </label>
                    <select
                      defaultValue={projectData.identity.sector}
                      className="w-full rounded-lg border px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ borderColor: "#E5E7EB" }}
                    >
                      <option>Coaching</option>
                      <option>Formazione</option>
                      <option>Consulenza</option>
                      <option>Tech</option>
                      <option>Altro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[12px] font-medium" style={{ color: "#1B2B4B" }}>
                    Tagline
                  </label>
                  <input
                    type="text"
                    defaultValue={projectData.identity.tagline}
                    className="w-full rounded-lg border px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: "#E5E7EB" }}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[12px] font-medium" style={{ color: "#1B2B4B" }}>
                    Descrizione progetto
                  </label>
                  <textarea
                    rows={6}
                    defaultValue={projectData.identity.description}
                    className="w-full rounded-lg border px-3 py-2 text-[14px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: "#E5E7EB" }}
                  />
                  <p className="mt-1 text-[11px]" style={{ color: "#7C8CA2" }}>
                    Questo testo viene iniettato nel contesto di ogni agente. Includi mission, vision, posizionamento e target.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-[12px] font-medium" style={{ color: "#1B2B4B" }}>
                      Mercato primario
                    </label>
                    <input
                      type="text"
                      defaultValue={projectData.identity.primaryMarket}
                      className="w-full rounded-lg border px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ borderColor: "#E5E7EB" }}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[12px] font-medium" style={{ color: "#1B2B4B" }}>
                      Mercati secondari
                    </label>
                    <input
                      type="text"
                      defaultValue={projectData.identity.secondaryMarkets}
                      className="w-full rounded-lg border px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ borderColor: "#E5E7EB" }}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[12px] font-medium" style={{ color: "#1B2B4B" }}>
                    Lingue operative
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Italiano", "English", "Deutsch", "Français"].map((lang) => (
                      <label key={lang} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          defaultChecked={projectData.identity.languages.includes(lang)}
                          className="rounded"
                        />
                        <span className="text-[13px]" style={{ color: "#1B2B4B" }}>
                          {lang}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-[12px] font-medium" style={{ color: "#1B2B4B" }}>
                      Sede
                    </label>
                    <input
                      type="text"
                      defaultValue={projectData.identity.location}
                      className="w-full rounded-lg border px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ borderColor: "#E5E7EB" }}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[12px] font-medium" style={{ color: "#1B2B4B" }}>
                      Anno di fondazione
                    </label>
                    <input
                      type="text"
                      defaultValue={projectData.identity.foundedYear}
                      className="w-full rounded-lg border px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ borderColor: "#E5E7EB" }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  className="rounded-lg px-4 py-2 text-[13px] font-medium text-white"
                  style={{ backgroundColor: "#2563EB" }}
                >
                  Salva modifiche
                </button>
              </div>
            </div>
          )}

          {/* Brand Section */}
          {activeSection === "brand" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[20px] font-bold" style={{ color: "#1B2B4B" }}>
                  Brand & identità visiva
                </h2>
                <p className="mt-1 text-[13px]" style={{ color: "#7C8CA2" }}>
                  Il Designer Agent legge questi dati per generare immagini coerenti. Il Copywriter usa tono e parole chiave.
                </p>
              </div>

              {/* Logo Upload */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="mb-2 block text-[12px] font-medium" style={{ color: "#1B2B4B" }}>
                    Logo principale
                  </label>
                  <div
                    className="flex h-32 flex-col items-center justify-center rounded-lg border-2 border-dashed"
                    style={{ borderColor: "#E5E7EB", backgroundColor: "#FAFAFA" }}
                  >
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-lg text-[24px] font-bold"
                      style={{ backgroundColor: "#1A3A5C", color: "#FFFFFF" }}
                    >
                      A
                    </div>
                    <button className="mt-2 text-[12px] font-medium" style={{ color: "#2563EB" }}>
                      Cambia logo
                    </button>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-[12px] font-medium" style={{ color: "#1B2B4B" }}>
                    Logo secondario / Icona
                  </label>
                  <div
                    className="flex h-32 flex-col items-center justify-center rounded-lg border-2 border-dashed"
                    style={{ borderColor: "#E5E7EB", backgroundColor: "#FAFAFA" }}
                  >
                    <Upload className="h-8 w-8" style={{ color: "#D1D5DB" }} />
                    <span className="mt-2 text-[12px]" style={{ color: "#7C8CA2" }}>
                      Carica immagine
                    </span>
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div>
                <label className="mb-2 block text-[12px] font-medium" style={{ color: "#1B2B4B" }}>
                  Colori brand
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg border p-3" style={{ borderColor: "#E5E7EB" }}>
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-lg"
                        style={{ backgroundColor: projectData.brand.primaryColor }}
                      />
                      <div>
                        <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                          Primario
                        </p>
                        <input
                          type="text"
                          defaultValue={projectData.brand.primaryColor}
                          className="w-20 border-none p-0 text-[13px] font-mono focus:outline-none"
                          style={{ color: "#1B2B4B" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3" style={{ borderColor: "#E5E7EB" }}>
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-lg"
                        style={{ backgroundColor: projectData.brand.accentColor }}
                      />
                      <div>
                        <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                          Accento
                        </p>
                        <input
                          type="text"
                          defaultValue={projectData.brand.accentColor}
                          className="w-20 border-none p-0 text-[13px] font-mono focus:outline-none"
                          style={{ color: "#1B2B4B" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3" style={{ borderColor: "#E5E7EB" }}>
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-lg border"
                        style={{ backgroundColor: projectData.brand.backgroundColor, borderColor: "#E5E7EB" }}
                      />
                      <div>
                        <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                          Sfondo
                        </p>
                        <input
                          type="text"
                          defaultValue={projectData.brand.backgroundColor}
                          className="w-20 border-none p-0 text-[13px] font-mono focus:outline-none"
                          style={{ color: "#1B2B4B" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fonts */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium" style={{ color: "#1B2B4B" }}>
                    Font primario
                  </label>
                  <input
                    type="text"
                    defaultValue={projectData.brand.primaryFont}
                    className="w-full rounded-lg border px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: "#E5E7EB" }}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium" style={{ color: "#1B2B4B" }}>
                    Font secondario
                  </label>
                  <input
                    type="text"
                    defaultValue={projectData.brand.secondaryFont}
                    className="w-full rounded-lg border px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: "#E5E7EB" }}
                  />
                </div>
              </div>

              {/* Tone of Voice */}
              <div>
                <label className="mb-1.5 block text-[12px] font-medium" style={{ color: "#1B2B4B" }}>
                  Tono di voce
                </label>
                <textarea
                  rows={3}
                  defaultValue={projectData.brand.toneOfVoice}
                  className="w-full rounded-lg border px-3 py-2 text-[14px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ borderColor: "#E5E7EB" }}
                />
              </div>

              {/* Words */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium" style={{ color: "#1B2B4B" }}>
                    Parole da usare
                  </label>
                  <div className="flex flex-wrap gap-1.5 rounded-lg border p-2" style={{ borderColor: "#E5E7EB" }}>
                    {projectData.brand.wordsToUse.map((word, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 rounded-full px-2 py-1 text-[11px]"
                        style={{ backgroundColor: "#D1FAE5", color: "#059669" }}
                      >
                        {word}
                        <button className="hover:opacity-70">x</button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="+ Aggiungi"
                      className="flex-1 border-none p-1 text-[12px] focus:outline-none"
                      style={{ minWidth: "80px" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium" style={{ color: "#1B2B4B" }}>
                    Parole da evitare
                  </label>
                  <div className="flex flex-wrap gap-1.5 rounded-lg border p-2" style={{ borderColor: "#E5E7EB" }}>
                    {projectData.brand.wordsToAvoid.map((word, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 rounded-full px-2 py-1 text-[11px]"
                        style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}
                      >
                        {word}
                        <button className="hover:opacity-70">x</button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="+ Aggiungi"
                      className="flex-1 border-none p-1 text-[12px] focus:outline-none"
                      style={{ minWidth: "80px" }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  className="rounded-lg px-4 py-2 text-[13px] font-medium text-white"
                  style={{ backgroundColor: "#2563EB" }}
                >
                  Salva modifiche
                </button>
              </div>
            </div>
          )}

          {/* Channels Section */}
          {activeSection === "channels" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[20px] font-bold" style={{ color: "#1B2B4B" }}>
                  Canali e profili collegati
                </h2>
                <p className="mt-1 text-[13px]" style={{ color: "#7C8CA2" }}>
                  Configura i tuoi profili social e le integrazioni API per la pubblicazione automatica.
                </p>
              </div>

              {/* Social Profiles */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                    Profili social
                  </h3>
                  <button
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium"
                    style={{ backgroundColor: "#EFF6FF", color: "#2563EB" }}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Aggiungi profilo
                  </button>
                </div>
                <div className="space-y-2">
                  {projectData.channels.map((channel, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border p-3"
                      style={{ borderColor: "#E5E7EB" }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: getIntegrationStatusColor(channel.status) }}
                        />
                        <div>
                          <p className="text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                            {channel.platform}
                          </p>
                          <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                            {channel.owner}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={channel.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[12px]"
                          style={{ color: "#2563EB" }}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <button className="text-[12px]" style={{ color: "#7C8CA2" }}>
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* API Integrations */}
              <div>
                <h3 className="mb-3 text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                  Integrazioni API
                </h3>
                <div className="space-y-2">
                  {projectData.integrations.map((integration, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border p-3"
                      style={{ borderColor: "#E5E7EB" }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: getIntegrationStatusColor(integration.status) }}
                        />
                        <div>
                          <p className="text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                            {integration.name}
                          </p>
                          {integration.details && (
                            <p className="text-[11px]" style={{ color: "#7C8CA2" }}>
                              {integration.details}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {integration.status === "connected" ? (
                          <button
                            className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px]"
                            style={{ backgroundColor: "#F3F4F6", color: "#7C8CA2" }}
                          >
                            <RefreshCw className="h-3 w-3" />
                            Testa
                          </button>
                        ) : (
                          <button
                            className="rounded-lg px-2 py-1 text-[11px] font-medium"
                            style={{ backgroundColor: "#EFF6FF", color: "#2563EB" }}
                          >
                            Configura
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Useful Links */}
              <div>
                <h3 className="mb-3 text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                  Link utili
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Sito web", value: "https://www.ariadne-coaching.ch" },
                    { label: "Google Drive", value: "https://drive.google.com/..." },
                    { label: "Notion workspace", value: "" },
                  ].map((link, i) => (
                    <div key={i}>
                      <label className="mb-1 block text-[11px]" style={{ color: "#7C8CA2" }}>
                        {link.label}
                      </label>
                      <input
                        type="text"
                        defaultValue={link.value}
                        placeholder="https://..."
                        className="w-full rounded-lg border px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ borderColor: "#E5E7EB" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Products Section */}
          {activeSection === "products" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[20px] font-bold" style={{ color: "#1B2B4B" }}>
                    Prodotti e servizi
                  </h2>
                  <p className="mt-1 text-[13px]" style={{ color: "#7C8CA2" }}>
                    Il catalogo che gli agenti usano per raccomandazioni e proposte.
                  </p>
                </div>
                <button
                  className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium text-white"
                  style={{ backgroundColor: "#2563EB" }}
                >
                  <Plus className="h-4 w-4" />
                  Nuovo prodotto
                </button>
              </div>

              <div className="space-y-3">
                {projectData.products.map((product, i) => (
                  <div
                    key={i}
                    className="rounded-lg border p-4"
                    style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-[14px] font-semibold" style={{ color: "#1B2B4B" }}>
                            {product.name}
                          </h4>
                          <span
                            className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                            style={{
                              backgroundColor: product.status === "Attivo" ? "#D1FAE5" : "#F3F4F6",
                              color: product.status === "Attivo" ? "#059669" : "#7C8CA2",
                            }}
                          >
                            {product.status}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-4 text-[12px]" style={{ color: "#7C8CA2" }}>
                          <span>{product.type}</span>
                          <span>{product.duration}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[16px] font-bold" style={{ color: "#1B2B4B" }}>
                          {product.price}
                        </p>
                        <button className="mt-1 text-[11px]" style={{ color: "#2563EB" }}>
                          Modifica
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents Section */}
          {activeSection === "documents" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[20px] font-bold" style={{ color: "#1B2B4B" }}>
                    Knowledge Base
                  </h2>
                  <p className="mt-1 text-[13px]" style={{ color: "#7C8CA2" }}>
                    Documenti che gli agenti usano come contesto. Aggiungi almeno 3 documenti.
                  </p>
                </div>
                <button
                  className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium text-white"
                  style={{ backgroundColor: "#2563EB" }}
                >
                  <Upload className="h-4 w-4" />
                  Carica documento
                </button>
              </div>

              {/* Categories */}
              <div className="flex gap-2">
                {["Tutti", "Brand", "Prodotti", "Strategia", "Formazione"].map((cat) => (
                  <button
                    key={cat}
                    className="rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors"
                    style={{
                      backgroundColor: cat === "Tutti" ? "#1B2B4B" : "#F3F4F6",
                      color: cat === "Tutti" ? "#FFFFFF" : "#7C8CA2",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                {projectData.documents.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border p-4"
                    style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{ backgroundColor: "#EFF6FF" }}
                      >
                        <FileText className="h-5 w-5" style={{ color: "#2563EB" }} />
                      </div>
                      <div>
                        <p className="text-[13px] font-medium" style={{ color: "#1B2B4B" }}>
                          {doc.title}
                        </p>
                        <div className="flex items-center gap-2 text-[11px]" style={{ color: "#7C8CA2" }}>
                          <span>{doc.category}</span>
                          <span>•</span>
                          <span>Aggiornato il {doc.updatedAt}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1">
                        {doc.usedBy.map((agent) => (
                          <span
                            key={agent}
                            className="rounded-full px-2 py-0.5 text-[10px]"
                            style={{ backgroundColor: "#F3F4F6", color: "#7C8CA2" }}
                          >
                            {agent}
                          </span>
                        ))}
                      </div>
                      <button className="text-[12px]" style={{ color: "#DC2626" }}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="flex items-center justify-center rounded-lg border-2 border-dashed p-8"
                style={{ borderColor: "#E5E7EB" }}
              >
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8" style={{ color: "#D1D5DB" }} />
                  <p className="mt-2 text-[13px]" style={{ color: "#7C8CA2" }}>
                    Trascina qui i file o clicca per caricare
                  </p>
                  <p className="mt-1 text-[11px]" style={{ color: "#A3A3A3" }}>
                    PDF, DOCX, TXT (max 10MB)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Rubriche Section */}
          {activeSection === "rubriche" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[20px] font-bold" style={{ color: "#1B2B4B" }}>
                    Rubriche editoriali
                  </h2>
                  <p className="mt-1 text-[13px]" style={{ color: "#7C8CA2" }}>
                    Il Planner e il Copywriter usano le rubriche per generare il piano e i contenuti.
                  </p>
                </div>
                <button
                  className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium text-white"
                  style={{ backgroundColor: "#2563EB" }}
                >
                  <Plus className="h-4 w-4" />
                  Nuova rubrica
                </button>
              </div>

              <div className="space-y-2">
                {projectData.rubriche.map((rubrica, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border p-4"
                    style={{
                      borderColor: "#E5E7EB",
                      backgroundColor: rubrica.active ? "#FFFFFF" : "#FAFAFA",
                      opacity: rubrica.active ? 1 : 0.7,
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-[14px] font-bold"
                        style={{ backgroundColor: "#EFF6FF", color: "#2563EB" }}
                      >
                        {rubrica.code}
                      </div>
                      <div>
                        <p className="text-[14px] font-medium" style={{ color: "#1B2B4B" }}>
                          {rubrica.name}
                        </p>
                        <div className="flex items-center gap-2 text-[11px]" style={{ color: "#7C8CA2" }}>
                          <span>{rubrica.channel}</span>
                          <span>•</span>
                          <span>{rubrica.frequency}</span>
                          <span>•</span>
                          <span>{rubrica.day}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked={rubrica.active} className="rounded" />
                        <span className="text-[11px]" style={{ color: "#7C8CA2" }}>
                          Attiva
                        </span>
                      </label>
                      <button className="text-[12px]" style={{ color: "#2563EB" }}>
                        Modifica
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team Section */}
          {activeSection === "team" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[20px] font-bold" style={{ color: "#1B2B4B" }}>
                    Team e collaboratori
                  </h2>
                  <p className="mt-1 text-[13px]" style={{ color: "#7C8CA2" }}>
                    Gestisci chi ha accesso al progetto e con quali permessi.
                  </p>
                </div>
                <button
                  className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium text-white"
                  style={{ backgroundColor: "#2563EB" }}
                >
                  <Plus className="h-4 w-4" />
                  Invita collaboratore
                </button>
              </div>

              <div className="space-y-2">
                {projectData.team.map((member, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border p-4"
                    style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full text-[14px] font-bold text-white"
                        style={{ backgroundColor: "#2563EB" }}
                      >
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-[14px] font-medium" style={{ color: "#1B2B4B" }}>
                            {member.name}
                          </p>
                          <span
                            className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                            style={{ backgroundColor: "#DBEAFE", color: "#2563EB" }}
                          >
                            {member.role}
                          </span>
                        </div>
                        <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                          {member.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {member.areas.map((area) => (
                        <span
                          key={area}
                          className="rounded-full px-2 py-0.5 text-[10px]"
                          style={{ backgroundColor: "#F3F4F6", color: "#7C8CA2" }}
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="rounded-lg border p-4"
                style={{ borderColor: "#FCD34D", backgroundColor: "#FFFBEB" }}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" style={{ color: "#F59E0B" }} />
                  <div>
                    <p className="text-[13px] font-medium" style={{ color: "#92400E" }}>
                      Lavori da solo su questo progetto
                    </p>
                    <p className="mt-1 text-[12px]" style={{ color: "#B45309" }}>
                      Invita un collaboratore per condividere il carico di lavoro e avere backup in caso di assenza.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
