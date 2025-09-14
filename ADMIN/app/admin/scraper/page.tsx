import { Suspense } from "react"
import { ScraperDashboard } from "@/components/admin/scraper/scraper-dashboard"
import { ScraperHistory } from "@/components/admin/scraper/scraper-history"
import { ScraperControls } from "@/components/admin/scraper/scraper-controls"

export default function ScraperPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion du Scraper</h1>
          <p className="text-muted-foreground">Orchestrez les runs de scraping et surveillez les performances</p>
        </div>
      </div>

      <Suspense fallback={<div>Chargement du dashboard...</div>}>
        <ScraperDashboard />
      </Suspense>

      <div className="grid gap-6 lg:grid-cols-2">
        <Suspense fallback={<div>Chargement des contrôles...</div>}>
          <ScraperControls />
        </Suspense>

        <Suspense fallback={<div>Chargement de l'historique...</div>}>
          <ScraperHistory />
        </Suspense>
      </div>
    </div>
  )
}
