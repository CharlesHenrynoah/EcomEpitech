import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Clock, Truck, CheckCircle } from "lucide-react"

const stats = [
  {
    title: "Commandes du Jour",
    value: "23",
    change: "+12%",
    icon: ShoppingCart,
    color: "text-chart-1",
  },
  {
    title: "En Attente",
    value: "8",
    change: "-5%",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    title: "Expédiées",
    value: "15",
    change: "+18%",
    icon: Truck,
    color: "text-chart-2",
  },
  {
    title: "Livrées",
    value: "142",
    change: "+8%",
    icon: CheckCircle,
    color: "text-green-600",
  },
]

export function OrderStats() {
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
              <span className="text-secondary">{stat.change}</span> par rapport à hier
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
