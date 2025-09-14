import { Suspense } from "react"
import { UserList } from "@/components/admin/users/user-list"
import { UserStats } from "@/components/admin/users/user-stats"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Utilisateurs</h1>
          <p className="text-muted-foreground">Gérez les utilisateurs, leurs rôles et permissions</p>
        </div>
      </div>

      <Suspense fallback={<div>Chargement des statistiques...</div>}>
        <UserStats />
      </Suspense>

      <Suspense fallback={<div>Chargement des utilisateurs...</div>}>
        <UserList />
      </Suspense>
    </div>
  )
}
