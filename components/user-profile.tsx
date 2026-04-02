"use client"

import { useState } from "react"
import { 
  Mail, 
  Phone, 
  Building2, 
  MapPin, 
  Calendar, 
  Edit2, 
  Save, 
  X, 
  Camera,
  Bell,
  Shield,
  Palette,
  LogOut,
  ChevronRight
} from "lucide-react"

interface UserProfile {
  name: string
  email: string
  phone: string
  role: string
  company: string
  location: string
  joinDate: string
  bio: string
  avatar: string
}

const initialProfile: UserProfile = {
  name: "Emanuele Casero",
  email: "emanuele@humanaiimpact.com",
  phone: "+39 333 456 7890",
  role: "Founder & CEO",
  company: "HumanAImpact",
  location: "Milano, Italia",
  joinDate: "Gennaio 2024",
  bio: "Appassionato di tecnologia e innovazione. Guido il team di HumanAImpact per creare soluzioni AI che migliorano la produttività aziendale.",
  avatar: "EC"
}

const settingsSections = [
  {
    title: "Preferenze",
    items: [
      { icon: Bell, label: "Notifiche", description: "Gestisci le tue notifiche" },
      { icon: Palette, label: "Aspetto", description: "Tema e personalizzazione" },
    ]
  },
  {
    title: "Account",
    items: [
      { icon: Shield, label: "Sicurezza", description: "Password e autenticazione" },
      { icon: LogOut, label: "Esci", description: "Disconnetti da tutti i dispositivi", danger: true },
    ]
  }
]

export function UserProfile() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<UserProfile>(initialProfile)

  const handleSave = () => {
    setProfile(editForm)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm(profile)
    setIsEditing(false)
  }

  return (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: "#F7F8FA" }}>
      {/* Header */}
      <div
        className="px-8 py-6"
        style={{ borderBottom: "1px solid #E5E7EB" }}
      >
        <h1 className="text-[16px] font-semibold" style={{ color: "#1A1F36" }}>
          Profilo Utente
        </h1>
        <p className="mt-1 text-[14px]" style={{ color: "#7C8CA2" }}>
          Gestisci le tue informazioni personali e le impostazioni dell&apos;account
        </p>
      </div>

      <div className="mx-auto max-w-[900px] p-8">
        {/* Profile Card */}
        <div
          className="rounded-xl p-6"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}
        >
          {/* Profile Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className="relative">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full text-[28px] font-bold text-white"
                  style={{ backgroundColor: "#2563EB" }}
                >
                  {profile.avatar}
                </div>
                <button
                  className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white"
                  style={{ backgroundColor: "#E5E7EB" }}
                >
                  <Camera className="h-3.5 w-3.5" style={{ color: "#5E6B81" }} />
                </button>
              </div>

              {/* Name & Role */}
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="mb-1 rounded-lg border px-3 py-1.5 text-[16px] font-semibold"
                    style={{ 
                      color: "#1A1F36", 
                      borderColor: "var(--color-border)",
                      outline: "none"
                    }}
                  />
                ) : (
                  <h2 className="text-[16px] font-semibold" style={{ color: "#1A1F36" }}>
                    {profile.name}
                  </h2>
                )}
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className="rounded-lg border px-3 py-1 text-[14px]"
                    style={{ 
                      color: "#5E6B81", 
                      borderColor: "var(--color-border)",
                      outline: "none"
                    }}
                  />
                ) : (
                  <p className="text-[14px]" style={{ color: "#5E6B81" }}>
                    {profile.role}
                  </p>
                )}
              </div>
            </div>

            {/* Edit Button */}
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-medium transition-colors"
                  style={{ 
                    color: "#5E6B81", 
                    backgroundColor: "#F3F4F6" 
                  }}
                >
                  <X className="h-4 w-4" />
                  Annulla
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-medium text-white transition-colors"
                  style={{ backgroundColor: "#2563EB" }}
                >
                  <Save className="h-4 w-4" />
                  Salva
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-medium transition-colors"
                style={{ 
                  color: "#2563EB", 
                  backgroundColor: "rgba(37, 99, 235, 0.1)" 
                }}
              >
                <Edit2 className="h-4 w-4" />
                Modifica
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="my-6" style={{ borderBottom: "1px solid #E5E7EB" }} />

          {/* Profile Details */}
          <div className="grid grid-cols-2 gap-6">
            {/* Email */}
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: "#F3F4F6" }}
              >
                <Mail className="h-5 w-5" style={{ color: "#5E6B81" }} />
              </div>
              <div>
                <p className="text-[12px] font-medium" style={{ color: "#7C8CA2" }}>
                  Email
                </p>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="rounded border px-2 py-0.5 text-[14px]"
                    style={{ 
                      color: "#1A1F36", 
                      borderColor: "var(--color-border)",
                      outline: "none"
                    }}
                  />
                ) : (
                  <p className="text-[14px]" style={{ color: "#1A1F36" }}>
                    {profile.email}
                  </p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: "#F3F4F6" }}
              >
                <Phone className="h-5 w-5" style={{ color: "#5E6B81" }} />
              </div>
              <div>
                <p className="text-[12px] font-medium" style={{ color: "#7C8CA2" }}>
                  Telefono
                </p>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="rounded border px-2 py-0.5 text-[14px]"
                    style={{ 
                      color: "#1A1F36", 
                      borderColor: "var(--color-border)",
                      outline: "none"
                    }}
                  />
                ) : (
                  <p className="text-[14px]" style={{ color: "#1A1F36" }}>
                    {profile.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Company */}
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: "#F3F4F6" }}
              >
                <Building2 className="h-5 w-5" style={{ color: "#5E6B81" }} />
              </div>
              <div>
                <p className="text-[12px] font-medium" style={{ color: "#7C8CA2" }}>
                  Azienda
                </p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.company}
                    onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                    className="rounded border px-2 py-0.5 text-[14px]"
                    style={{ 
                      color: "#1A1F36", 
                      borderColor: "var(--color-border)",
                      outline: "none"
                    }}
                  />
                ) : (
                  <p className="text-[14px]" style={{ color: "#1A1F36" }}>
                    {profile.company}
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: "#F3F4F6" }}
              >
                <MapPin className="h-5 w-5" style={{ color: "#5E6B81" }} />
              </div>
              <div>
                <p className="text-[12px] font-medium" style={{ color: "#7C8CA2" }}>
                  Posizione
                </p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="rounded border px-2 py-0.5 text-[14px]"
                    style={{ 
                      color: "#1A1F36", 
                      borderColor: "var(--color-border)",
                      outline: "none"
                    }}
                  />
                ) : (
                  <p className="text-[14px]" style={{ color: "#1A1F36" }}>
                    {profile.location}
                  </p>
                )}
              </div>
            </div>

            {/* Join Date */}
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: "#F3F4F6" }}
              >
                <Calendar className="h-5 w-5" style={{ color: "#5E6B81" }} />
              </div>
              <div>
                <p className="text-[12px] font-medium" style={{ color: "#7C8CA2" }}>
                  Membro da
                </p>
                <p className="text-[14px]" style={{ color: "#1A1F36" }}>
                  {profile.joinDate}
                </p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6">
            <p className="mb-2 text-[12px] font-medium" style={{ color: "#7C8CA2" }}>
              Bio
            </p>
            {isEditing ? (
              <textarea
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                className="w-full rounded-lg border bg-white p-3 text-[14px] shadow-sm"
                style={{ 
                  color: "#1A1F36", 
                  borderColor: "var(--color-border)",
                  outline: "none",
                  resize: "none"
                }}
                rows={3}
              />
            ) : (
              <p className="text-[14px] leading-relaxed" style={{ color: "#5E6B81" }}>
                {profile.bio}
              </p>
            )}
          </div>
        </div>

        {/* Settings Sections */}
        <div className="mt-8 space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 
                className="mb-3 text-[12px] font-semibold uppercase tracking-wider"
                style={{ color: "#7C8CA2" }}
              >
                {section.title}
              </h3>
              <div
                className="overflow-hidden rounded-xl"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}
              >
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    className="flex w-full items-center justify-between p-4 transition-colors hover:bg-gray-50"
                    style={{ 
                      borderBottom: itemIndex < section.items.length - 1 ? "1px solid #E5E7EB" : "none" 
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{ backgroundColor: item.danger ? "rgba(220, 38, 38, 0.1)" : "#F3F4F6" }}
                      >
                        <item.icon 
                          className="h-5 w-5" 
                          style={{ color: item.danger ? "#DC2626" : "#5E6B81" }} 
                        />
                      </div>
                      <div className="text-left">
                        <p 
                          className="text-[14px] font-medium" 
                          style={{ color: item.danger ? "#DC2626" : "#1A1F36" }}
                        >
                          {item.label}
                        </p>
                        <p className="text-[12px]" style={{ color: "#7C8CA2" }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5" style={{ color: "#9CA3AF" }} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
