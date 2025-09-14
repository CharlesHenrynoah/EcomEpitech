"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Play, Square, RefreshCw, Settings, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ScraperControls() {
  const [isRunning, setIsRunning] = useState(false)
  const [source, setSource] = useState("")
  const [limit, setLimit] = useState("100")
  const [isDryRun, setIsDryRun] = useState(false)
  const [refreshType, setRefreshType] = useState("prices")
  const [productIds, setProductIds] = useState("")
  const { toast } = useToast()

  const handleStartRun = async () => {
    if (!source) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une source",
        variant: "destructive",
      })
      return
    }

    setIsRunning(true)

    // Mock API call
    try {
      console.log("Starting scraper run:", { source, limit, isDryRun })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Run démarré",
        description: `Scraping de ${source} en cours${isDryRun ? " (mode test)" : ""}`,
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de démarrer le run",
        variant: "destructive",
      })
    } finally {
      setIsRunning(false)
    }
  }

  const handleStopRun = () => {
    setIsRunning(false)
    toast({
      title: "Run arrêté",
      description: "Le scraping a été interrompu",
    })
  }

  const handleRefreshStock = async () => {
    if (!productIds.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez spécifier des IDs de produits",
        variant: "destructive",
      })
      return
    }

    try {
      console.log("Refreshing stock:", { type: refreshType, productIds })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Refresh terminé",
        description: `${refreshType === "prices" ? "Prix" : "Stock"} mis à jour pour les produits spécifiés`,
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les données",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Contrôles du Scraper</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Run Configuration */}
        <div className="space-y-4">
          <h3 className="font-medium">Nouveau Run</h3>

          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="amazon">Amazon</SelectItem>
                <SelectItem value="cdiscount">Cdiscount</SelectItem>
                <SelectItem value="fnac">Fnac</SelectItem>
                <SelectItem value="darty">Darty</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="limit">Limite de produits</Label>
            <Input
              id="limit"
              type="number"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              placeholder="100"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="dry-run" checked={isDryRun} onCheckedChange={setIsDryRun} />
            <Label htmlFor="dry-run">Mode test (dry-run)</Label>
          </div>

          {isDryRun && (
            <div className="flex items-start space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium">Mode test activé</p>
                <p>Aucune donnée ne sera modifiée en base</p>
              </div>
            </div>
          )}

          <div className="flex space-x-2">
            <Button onClick={handleStartRun} disabled={isRunning} className="flex-1">
              <Play className="mr-2 h-4 w-4" />
              {isRunning ? "En cours..." : "Démarrer Run"}
            </Button>

            {isRunning && (
              <Button variant="outline" onClick={handleStopRun}>
                <Square className="mr-2 h-4 w-4" />
                Arrêter
              </Button>
            )}
          </div>
        </div>

        <Separator />

        {/* Targeted Refresh */}
        <div className="space-y-4">
          <h3 className="font-medium">Refresh Ciblé</h3>

          <div className="space-y-2">
            <Label htmlFor="refresh-type">Type de refresh</Label>
            <Select value={refreshType} onValueChange={setRefreshType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prices">Prix uniquement</SelectItem>
                <SelectItem value="stock">Stock uniquement</SelectItem>
                <SelectItem value="both">Prix et stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-ids">IDs des produits (séparés par des virgules)</Label>
            <Textarea
              id="product-ids"
              value={productIds}
              onChange={(e) => setProductIds(e.target.value)}
              placeholder="123, 456, 789..."
              rows={3}
            />
          </div>

          <Button onClick={handleRefreshStock} variant="outline" className="w-full bg-transparent">
            <RefreshCw className="mr-2 h-4 w-4" />
            Lancer Refresh Ciblé
          </Button>
        </div>

        <Separator />

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="font-medium">Actions Rapides</h3>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">
              Vérifier robots.txt
            </Button>
            <Button variant="outline" size="sm">
              Test connexion
            </Button>
            <Button variant="outline" size="sm">
              Nettoyer logs
            </Button>
            <Button variant="outline" size="sm">
              Export données
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
