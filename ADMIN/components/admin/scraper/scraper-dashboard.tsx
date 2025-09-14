"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Clock, CheckCircle, Database } from "lucide-react"

export function ScraperDashboard() {
  // Mock data - replace with real API call
  const stats = {
    totalRuns: 156,
    successfulRuns: 142,
    failedRuns: 14,
    lastRunTime: "2024-01-15T14:30:00Z",
    nextScheduledRun: "2024-01-15T18:00:00Z",
    productsScraped: 2847,
    pricesUpdated: 1923,
    stockUpdated: 2156,
    currentStatus: "idle", // idle, running, error
    runProgress: 0,
  }

  const successRate = (stats.successfulRuns / stats.totalRuns) * 100

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">En cours</Badge>
      case "idle":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Inactif</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Erreur</Badge>
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Statut Actuel</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {getStatusBadge(stats.currentStatus)}
            {stats.currentStatus === "running" && (
              <div className="space-y-1">
                <Progress value={stats.runProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">{stats.runProgress}% terminé</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taux de Succès</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{successRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            {stats.successfulRuns}/{stats.totalRuns} runs réussis
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Produits Scrapés</CardTitle>
          <Database className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.productsScraped.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Total depuis le début</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Prochain Run</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-sm font-medium">{new Date(stats.nextScheduledRun).toLocaleString("fr-FR")}</div>
          <p className="text-xs text-muted-foreground">Run automatique programmé</p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Mises à Jour Récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.pricesUpdated.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Prix mis à jour</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.stockUpdated.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Stocks mis à jour</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Runs réussis</span>
              <span className="text-green-600">{stats.successfulRuns}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Runs échoués</span>
              <span className="text-red-600">{stats.failedRuns}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Dernier run</span>
              <span>{new Date(stats.lastRunTime).toLocaleString("fr-FR")}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
