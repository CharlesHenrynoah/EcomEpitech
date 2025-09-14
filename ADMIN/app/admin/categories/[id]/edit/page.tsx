import { CategoryForm } from "@/components/admin/categories/category-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface EditCategoryPageProps {
  params: {
    id: string
  }
}

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
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
          <h1 className="text-3xl font-bold text-foreground">Modifier la Catégorie</h1>
          <p className="text-muted-foreground">Modifiez les informations de la catégorie</p>
        </div>
      </div>

      <CategoryForm categoryId={params.id} mode="edit" />
    </div>
  )
}
