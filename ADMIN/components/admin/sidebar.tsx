"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, Bot, FileText, Activity } from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Catalogue",
    icon: Package,
    children: [
      { name: "Produits", href: "/admin/products" },
      { name: "Catégories", href: "/admin/categories" },
    ],
  },
  {
    name: "Commandes",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Clients",
    href: "/admin/customers",
    icon: Users,
  },
  {
    name: "Scraper",
    href: "/admin/scraper",
    icon: Bot,
  },
  {
    name: "Paramètres légaux",
    href: "/admin/legal",
    icon: FileText,
  },
  {
    name: "Logs & Audit",
    href: "/admin/logs",
    icon: Activity,
  },
  {
    name: "Paramètres",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border">
      <div className="p-6">
        <h1 className="text-xl font-bold text-sidebar-primary">Admin Panel</h1>
      </div>

      <nav className="px-4 space-y-2">
        {navigation.map((item) => {
          if (item.children) {
            return (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center px-3 py-2 text-sm font-medium text-sidebar-foreground">
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </div>
                <div className="ml-6 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md transition-colors",
                        pathname === child.href
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                      )}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            )
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                pathname === item.href
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50",
              )}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
