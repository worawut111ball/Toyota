"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Package,
  LayoutDashboard,
  MapPin,
  Boxes,
  ListTodo,
  BotIcon as Robot,
  Settings,
  Menu,
  X,
  Users,
  BarChart3,
  Database,
  ChevronDown,
  ChevronRight,
  Box,
  User,
  PackageCheck,
  Building2,
  Building,
  PanelLeftClose,
  PanelLeftOpen,
  Clock,
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  onToggleCollapse?: (collapsed: boolean) => void
}

export function Sidebar({ className, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [masterDataOpen, setMasterDataOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [reportsOpen, setReportsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleMasterData = () => {
    setMasterDataOpen(!masterDataOpen)
  }

  const toggleCollapse = () => {
    const newCollapsedState = !isCollapsed
    setIsCollapsed(newCollapsedState)

    // Notify parent component
    if (onToggleCollapse) {
      onToggleCollapse(newCollapsedState)
    }

    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent("sidebar-toggle", { detail: { collapsed: newCollapsedState } }))
  }

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen)
  }

  const toggleReports = () => {
    setReportsOpen(!reportsOpen)
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Inventory",
      href: "/inventory",
      icon: <Boxes className="h-5 w-5" />,
    },
    {
      title: "Inbound",
      href: "/inbound",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Outbound",
      href: "/outbound",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Tasks",
      href: "/tasks",
      icon: <ListTodo className="h-5 w-5" />,
    },
    {
      title: "Robots",
      href: "/robots",
      icon: <Robot className="h-5 w-5" />,
    },
    {
      title: "Operator Console",
      href: "/operator",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Reports",
      href: "/reports",
      icon: <BarChart3 className="h-5 w-5" />,
      submenu: [
        {
          title: "Dashboard",
          href: "/reports",
          icon: <LayoutDashboard className="h-4 w-4" />,
        },
        // {
        //   title: "Inventory Report",
        //   href: "/reports/inventory",
        //   icon: <Boxes className="h-4 w-4" />,
        // },
        {
          title: "Movement Report",
          href: "/reports/movement",
          icon: <Package className="h-4 w-4" />,
        },
        // {
        //   title: "Aging Report",
        //   href: "/reports/aging",
        //   icon: <Clock className="h-4 w-4" />,
        // },
      ]
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
      submenu: [
        {
          title: "Manual Control",
          href: "manual-control", // แก้ไขจาก "manual-control" เป็น "/settings/manual-control"
          icon: <Robot className="h-4 w-4" />,
        }
      ]
    },
  ]

  const masterDataItems = [
    {
      title: "Item Master",
      href: "/master/item",
      icon: <Box className="h-4 w-4" />,
    },
    {
      title: "Location Master",
      href: "/locations",
      icon: <MapPin className="h-4 w-4" />,
    },
    {
      title: "User / Credential Master",
      href: "/master/user",
      icon: <User className="h-4 w-4" />,
    },
    {
      title: "Packing Standard",
      href: "/master/packing",
      icon: <PackageCheck className="h-4 w-4" />,
    },
    {
      title: "Pallet Standard",
      href: "/master/pallet", // Updated from /master/pallet-size
      icon: <Package className="h-4 w-4" />,
    },
    {
      title: "Supplier/Customer Master",
      href: "/master/supplier",
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      title: "Department Master",
      href: "/master/department",
      icon: <Building className="h-4 w-4" />,
    },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile toggle button */}
      <Button variant="outline" size="icon" className="fixed left-4 top-4 z-50 md:hidden" onClick={toggleSidebar}>
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r bg-background transition-all duration-300 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-20" : "w-64",
          className,
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/" className="flex items-center gap-3">
            <Package className="h-6 w-6" />
            {!isCollapsed && <span className="text-xl font-bold">IMS System</span>}
          </Link>
          <Button variant="ghost" size="sm" onClick={toggleCollapse} className={isCollapsed ? "ml-auto" : ""}>
            {isCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </Button>
        </div>

        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            {navItems.slice(0, 5).map((item, index) => (
              <Link key={index} href={item.href} onClick={() => setIsOpen(false)}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start px-4"}`}
                  title={isCollapsed ? item.title : undefined}
                >
                  {item.icon}
                  {!isCollapsed && <span className="ml-3">{item.title}</span>}
                </Button>
              </Link>
            ))}

            {/* Master Data dropdown */}
            <div className="relative">
              <Button
                variant={pathname.startsWith("/master") || pathname === "/locations" ? "secondary" : "ghost"}
                className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start px-4"}`}
                onClick={toggleMasterData}
                title={isCollapsed ? "Master Data" : undefined}
              >
                <Database className="h-5 w-5" />
                {!isCollapsed && (
                  <>
                    <span className="ml-3">Master Data</span>
                    {masterDataOpen ? (
                      <ChevronDown className="ml-auto h-4 w-4" />
                    ) : (
                      <ChevronRight className="ml-auto h-4 w-4" />
                    )}
                  </>
                )}
              </Button>

              {masterDataOpen && (
                <div className={`mt-1 grid gap-1 border-l border-muted ${isCollapsed ? "ml-2 pl-1" : "ml-4 pl-2"}`}>
                  {masterDataItems.map((item, index) => (
                    <Link key={index} href={item.href} onClick={() => setIsOpen(false)}>
                      <Button
                        variant={pathname === item.href ? "secondary" : "ghost"}
                        className={`w-full ${isCollapsed ? "justify-center px-1 py-1" : "justify-start px-3 py-1.5"} h-auto text-sm`}
                        size="sm"
                        title={isCollapsed ? item.title : undefined}
                      >
                        {item.icon}
                        {!isCollapsed && <span className="ml-2">{item.title}</span>}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navItems.slice(5).map((item, index) => (
              <div key={index + 5}>
                {item.submenu ? (
                  <div className="relative">
                    <Button
                      variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
                      className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start px-4"}`}
                      onClick={item.title === "Settings" ? toggleSettings : toggleReports}
                      title={isCollapsed ? item.title : undefined}
                    >
                      {item.icon}
                      {!isCollapsed && (
                        <>
                          <span className="ml-3">{item.title}</span>
                          {(item.title === "Settings" ? settingsOpen : reportsOpen) ? (
                            <ChevronDown className="ml-auto h-4 w-4" />
                          ) : (
                            <ChevronRight className="ml-auto h-4 w-4" />
                          )}
                        </>
                      )}
                    </Button>
                    {((item.title === "Settings" && settingsOpen) || 
                      (item.title === "Reports" && reportsOpen)) && (
                      <div className={`mt-1 grid gap-1 border-l border-muted ${
                        isCollapsed ? "ml-2 pl-1" : "ml-4 pl-2"
                      }`}>
                        {item.submenu.map((subItem, subIndex) => (
                          <Link 
                            key={subIndex} 
                            href={item.title === "Settings" ? `/settings/${subItem.href}` : subItem.href} 
                            onClick={() => setIsOpen(false)}
                          >
                            <Button
                              variant={pathname === subItem.href ? "secondary" : "ghost"}
                              className={`w-full ${
                                isCollapsed ? "justify-center px-1 py-1" : "justify-start px-3 py-1.5"
                              } h-auto text-sm`}
                              size="sm"
                              title={isCollapsed ? subItem.title : undefined}
                            >
                              {subItem.icon}
                              {!isCollapsed && <span className="ml-2">{subItem.title}</span>}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href={item.href} onClick={() => setIsOpen(false)}>
                    <Button
                      variant={pathname === item.href ? "secondary" : "ghost"}
                      className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start px-4"}`}
                      title={isCollapsed ? item.title : undefined}
                    >
                      {item.icon}
                      {!isCollapsed && <span className="ml-3">{item.title}</span>}
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </ScrollArea>

        <div className={`border-t p-4 ${isCollapsed ? "hidden" : ""}`}>
          <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              A
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

