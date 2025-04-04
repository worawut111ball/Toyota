"use client"

import type { ReactNode } from "react"
import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Listen for custom event from sidebar
  useEffect(() => {
    const handleSidebarToggle = (event: CustomEvent) => {
      setSidebarCollapsed(event.detail.collapsed)
    }

    window.addEventListener("sidebar-toggle", handleSidebarToggle as EventListener)
    return () => window.removeEventListener("sidebar-toggle", handleSidebarToggle as EventListener)
  }, [])

  return (
    <div className="flex min-h-screen">
      <Sidebar onToggleCollapse={(collapsed) => setSidebarCollapsed(collapsed)} />
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "md:ml-20" : "md:ml-64"} pt-4`}>
        {children}
      </div>
    </div>
  )
}