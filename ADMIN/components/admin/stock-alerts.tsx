import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"

const stockAlerts = [
  {
    product: "iPhone 15 Pro",
    sku: "IPH15P-128-BLK",
    stock: 2,
    threshold: 10,
  },
  {
    product: "Samsung Galaxy S24",
    sku: "SGS24-256-WHT",
    stock: 0,
    threshold: 5,
  },
  {
    product: "MacBook Air M3",
    sku: "MBA-M3-512-SLV",
    stock: 1,
    threshold: 3,
  },
]

export function StockAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
          Alertes Stock Bas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stockAlerts.map((alert) => (
          <div key={alert.sku} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">{alert.product}</p>
              <p className="text-sm text-muted-foreground">SKU: {alert.sku}</p>
            </div>
            <div className="text-right">
              <Badge variant={alert.stock === 0 ? "destructive" : "secondary"}>
                {alert.stock === 0 ? "Rupture" : `${alert.stock} restant${alert.stock > 1 ? "s" : ""}`}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">Seuil: {alert.threshold}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
