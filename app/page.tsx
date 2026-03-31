import { SidebarNav } from "@/components/sidebar-nav"

export default function Home() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarNav />

      {/* Main Content Area */}
      <main
        className="flex flex-1 items-center justify-center p-[18px]"
        style={{ backgroundColor: "#F7F8FA" }}
      >
        <p className="text-[14px] text-gray-500">
          Seleziona una pagina dalla sidebar
        </p>
      </main>
    </div>
  )
}
