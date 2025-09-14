import { CategoryList } from "@/components/admin/categories/category-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des Catégories</h1>
          <p className="text-muted-foreground">Organisez vos produits par catégories</p>
        </div>
        <Link href="/admin/categories/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle Catégorie
          </Button>
        </Link>
      </div>

      <CategoryList />
    </div>
  )
}
