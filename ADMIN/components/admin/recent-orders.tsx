import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

const recentOrders = [
  {
    id: "#ORD-001",
    customer: "Jean Dupont",
    amount: "€299.99",
    status: "pending",
    date: "2024-01-15",
  },
  {
    id: "#ORD-002",
    customer: "Marie Martin",
    amount: "€149.50",
    status: "confirmed",
    date: "2024-01-15",
  },
  {
    id: "#ORD-003",
    customer: "Pierre Durand",
    amount: "€89.99",
    status: "shipped",
    date: "2024-01-14",
  },
  {
    id: "#ORD-004",
    customer: "Sophie Bernard",
    amount: "€199.99",
    status: "delivered",
    date: "2024-01-14",
  },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
}

const statusLabels = {
  pending: "En attente",
  confirmed: "Confirmée",
  shipped: "Expédiée",
  delivered: "Livrée",
}

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Commandes Récentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                </div>
                <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                  {statusLabels[order.status as keyof typeof statusLabels]}
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium">{order.amount}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Voir
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
