import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentOrders } from "@/components/admin/recent-orders"
import { QuickActions } from "@/components/admin/quick-actions"
import { StockAlerts } from "@/components/admin/stock-alerts"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Vue d'ensemble de votre boutique en ligne</p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions />
        <StockAlerts />
      </div>

      <RecentOrders />
    </div>
  )
}
