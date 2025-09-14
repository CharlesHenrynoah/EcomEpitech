import { CategoryForm } from "@/components/admin/categories/category-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/categories">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Nouvelle Catégorie</h1>
          <p className="text-muted-foreground">Créez une nouvelle catégorie de baskets</p>
        </div>
      </div>

      <CategoryForm />
    </div>
  )
}
