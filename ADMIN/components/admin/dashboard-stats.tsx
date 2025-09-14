import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Modèles Baskets",
    value: "156",
    change: "+8%",
    icon: Package,
    color: "text-cyan-600",
  },
  {
    title: "Commandes du Jour",
    value: "43",
    change: "+18%",
    icon: ShoppingCart,
    color: "text-emerald-600",
  },
  {
    title: "Clients Actifs",
    value: "1,247",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "CA Baskets",
    value: "€28,450",
    change: "+22%",
    icon: TrendingUp,
    color: "text-green-600",
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{stat.change}</span> par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
