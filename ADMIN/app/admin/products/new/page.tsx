import { ProductForm } from "@/components/admin/products/product-form"

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Nouveau Produit</h1>
        <p className="text-muted-foreground">Créer un nouveau produit dans le catalogue</p>
      </div>

      <ProductForm />
    </div>
  )
}
