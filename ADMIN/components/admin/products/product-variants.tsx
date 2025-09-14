"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Edit } from "lucide-react"

interface ProductVariantsProps {
  productId?: string
}

interface Variant {
  id: string
  sku: string
  size?: string
  color?: string
  price: number
  stock: number
  image?: string
}

export function ProductVariants({ productId }: ProductVariantsProps) {
  const [variants, setVariants] = useState<Variant[]>([
    {
      id: "1",
      sku: "IPH15P-128-BLK",
      size: "128GB",
      color: "Noir",
      price: 1199.99,
      stock: 25,
    },
    {
      id: "2",
      sku: "IPH15P-256-BLK",
      size: "256GB",
      color: "Noir",
      price: 1299.99,
      stock: 18,
    },
    {
      id: "3",
      sku: "IPH15P-128-WHT",
      size: "128GB",
      color: "Blanc",
      price: 1199.99,
      stock: 12,
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newVariant, setNewVariant] = useState({
    sku: "",
    size: "",
    color: "",
    price: "",
    stock: "",
  })

  const handleAddVariant = () => {
    if (newVariant.sku && newVariant.price) {
      const variant: Variant = {
        id: Date.now().toString(),
        sku: newVariant.sku,
        size: newVariant.size || undefined,
        color: newVariant.color || undefined,
        price: Number.parseFloat(newVariant.price),
        stock: Number.parseInt(newVariant.stock) || 0,
      }

      setVariants([...variants, variant])
      setNewVariant({ sku: "", size: "", color: "", price: "", stock: "" })
      setShowAddForm(false)
    }
  }

  const handleDeleteVariant = (id: string) => {
    setVariants(variants.filter((v) => v.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-card-foreground">Variantes du Produit</CardTitle>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une variante
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {showAddForm && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Nouvelle Variante</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="variantSku">SKU *</Label>
                  <Input
                    id="variantSku"
                    value={newVariant.sku}
                    onChange={(e) => setNewVariant({ ...newVariant, sku: e.target.value })}
                    placeholder="Ex: IPH15P-512-BLU"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="variantSize">Taille</Label>
                  <Input
                    id="variantSize"
                    value={newVariant.size}
                    onChange={(e) => setNewVariant({ ...newVariant, size: e.target.value })}
                    placeholder="Ex: 512GB"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="variantColor">Couleur</Label>
                  <Input
                    id="variantColor"
                    value={newVariant.color}
                    onChange={(e) => setNewVariant({ ...newVariant, color: e.target.value })}
                    placeholder="Ex: Bleu"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="variantPrice">Prix *</Label>
                  <Input
                    id="variantPrice"
                    type="number"
                    step="0.01"
                    value={newVariant.price}
                    onChange={(e) => setNewVariant({ ...newVariant, price: e.target.value })}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="variantStock">Stock</Label>
                  <Input
                    id="variantStock"
                    type="number"
                    value={newVariant.stock}
                    onChange={(e) => setNewVariant({ ...newVariant, stock: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddVariant}>Ajouter</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Taille</TableHead>
              <TableHead>Couleur</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants.map((variant) => (
              <TableRow key={variant.id}>
                <TableCell className="font-mono text-sm">{variant.sku}</TableCell>
                <TableCell>{variant.size || "-"}</TableCell>
                <TableCell>{variant.color || "-"}</TableCell>
                <TableCell>€{variant.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={variant.stock === 0 ? "destructive" : variant.stock < 10 ? "secondary" : "default"}>
                    {variant.stock === 0 ? "Rupture" : `${variant.stock} en stock`}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteVariant(variant.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
