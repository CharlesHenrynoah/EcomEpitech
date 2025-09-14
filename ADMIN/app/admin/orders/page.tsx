import { OrderList } from "@/components/admin/orders/order-list"
import { OrderStats } from "@/components/admin/orders/order-stats"

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestion des Commandes</h1>
        <p className="text-muted-foreground">Gérez toutes les commandes de votre boutique</p>
      </div>

      <OrderStats />
      <OrderList />
    </div>
  )
}
