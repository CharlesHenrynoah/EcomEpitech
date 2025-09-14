import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Eye, Play, Settings } from "lucide-react"

const actions = [
  {
    title: "Créer un Produit",
    description: "Ajouter un nouveau produit au catalogue",
    icon: Plus,
    href: "/admin/products/new",
  },
  {
    title: "Voir Commandes en Attente",
    description: "12 commandes nécessitent votre attention",
    icon: Eye,
    href: "/admin/orders?status=pending",
  },
  {
    title: "Lancer le Scraper",
    description: "Mettre à jour les prix et stocks",
    icon: Play,
    href: "/admin/scraper",
  },
  {
    title: "Paramètres Système",
    description: "Configurer les paramètres généraux",
    icon: Settings,
    href: "/admin/settings",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions Rapides</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((action) => (
          <div key={action.title} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <action.icon className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">{action.title}</p>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Accéder
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
