import { ProductForm } from "@/components/admin/products/product-form"

export default function EditProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Modifier le Produit</h1>
        <p className="text-muted-foreground">Modifier les informations du produit #{params.id}</p>
      </div>

      <ProductForm productId={params.id} />
    </div>
  )
}
