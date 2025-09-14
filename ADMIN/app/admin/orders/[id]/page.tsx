import { OrderDetails } from "@/components/admin/orders/order-details"

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Commande #{params.id}</h1>
        <p className="text-muted-foreground">Détails et gestion de la commande</p>
      </div>

      <OrderDetails orderId={params.id} />
    </div>
  )
}
