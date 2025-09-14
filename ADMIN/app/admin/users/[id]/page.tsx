import { Suspense } from "react"
import { UserDetails } from "@/components/admin/users/user-details"

interface UserPageProps {
  params: {
    id: string
  }
}

export default function UserPage({ params }: UserPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Détails Utilisateur</h1>
          <p className="text-muted-foreground">Gérez les informations et permissions de l'utilisateur</p>
        </div>
      </div>

      <Suspense fallback={<div>Chargement des détails...</div>}>
        <UserDetails userId={params.id} />
      </Suspense>
    </div>
  )
}
