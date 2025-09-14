"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, X, Save, Star } from "lucide-react"

interface ProductFormProps {
  productId?: string
}

export function ProductForm({ productId }: ProductFormProps) {
  const [formData, setFormData] = useState({
    // Informations générales baskets
    modelName: "",
    genre: "",
    sneakerType: "",
    price: "",
    rating: 5,
    details: "",

    // Images (4 photos)
    images: {
      photo1: "",
      photo2: "",
      photo3: "",
      photo4: "",
    },

    // Tailles disponibles
    availableSizes: [] as string[],

    // Revues
    reviews: [] as Array<{
      id: string
      user: string
      rating: number
      comment: string
      date: string
    }>,

    // Champs techniques
    sku: "",
    status: "active",
    trackQuantity: true,
    seoTitle: "",
    seoDescription: "",
  })

  const [newSize, setNewSize] = useState("")

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addSize = () => {
    if (newSize.trim() && !formData.availableSizes.includes(newSize.trim())) {
      setFormData((prev) => ({
        ...prev,
        availableSizes: [...prev.availableSizes, newSize.trim()],
      }))
      setNewSize("")
    }
  }

  const removeSize = (sizeToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      availableSizes: prev.availableSizes.filter((size) => size !== sizeToRemove),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sneaker data:", formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="sizes">Tailles</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="reviews">Avis</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900">Informations Basket</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="modelName">Nom du modèle *</Label>
                  <Input
                    id="modelName"
                    value={formData.modelName}
                    onChange={(e) => handleInputChange("modelName", e.target.value)}
                    placeholder="Ex: Air Jordan 1 Retro High"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sku">SKU *</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => handleInputChange("sku", e.target.value)}
                    placeholder="Ex: AJ1-RH-BRD-42"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre *</Label>
                  <Select value={formData.genre} onValueChange={(value) => handleInputChange("genre", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homme">Homme</SelectItem>
                      <SelectItem value="femme">Femme</SelectItem>
                      <SelectItem value="enfant">Enfant</SelectItem>
                      <SelectItem value="unisexe">Unisexe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sneakerType">Type de Basket *</Label>
                  <Select
                    value={formData.sneakerType}
                    onValueChange={(value) => handleInputChange("sneakerType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="basketball">Basketball</SelectItem>
                      <SelectItem value="running">Running</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="skateboarding">Skateboarding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Prix *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating">Note (sur 5) *</Label>
                  <div className="flex items-center space-x-2">
                    <Select
                      value={formData.rating.toString()}
                      onValueChange={(value) => handleInputChange("rating", Number.parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 étoile</SelectItem>
                        <SelectItem value="2">2 étoiles</SelectItem>
                        <SelectItem value="3">3 étoiles</SelectItem>
                        <SelectItem value="4">4 étoiles</SelectItem>
                        <SelectItem value="5">5 étoiles</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= formData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Détails</Label>
                <Textarea
                  id="details"
                  value={formData.details}
                  onChange={(e) => handleInputChange("details", e.target.value)}
                  placeholder="Description détaillée de la basket, matériaux, technologies..."
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={formData.status === "active"}
                  onCheckedChange={(checked) => handleInputChange("status", checked ? "active" : "inactive")}
                />
                <Label htmlFor="status">Produit actif</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sizes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900">Tailles Disponibles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tailles en stock</Label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.availableSizes.map((size) => (
                    <Badge key={size} variant="secondary" className="flex items-center gap-1">
                      {size}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeSize(size)} />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    placeholder="Ex: 42, 42.5, 43..."
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSize())}
                  />
                  <Button type="button" variant="outline" onClick={addSize}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mt-4">
                <p className="col-span-full text-sm text-slate-600 mb-2">Tailles courantes :</p>
                {["35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"].map((size) => (
                  <Button
                    key={size}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (!formData.availableSizes.includes(size)) {
                        setFormData((prev) => ({
                          ...prev,
                          availableSizes: [...prev.availableSizes, size],
                        }))
                      }
                    }}
                    className={formData.availableSizes.includes(size) ? "bg-cyan-100" : ""}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900">Photos du Produit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((photoNum) => (
                  <div key={photoNum} className="space-y-2">
                    <Label htmlFor={`photo${photoNum}`}>Photo {photoNum}</Label>
                    <Input
                      id={`photo${photoNum}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          // Handle file upload
                          console.log(`Photo ${photoNum}:`, file)
                        }
                      }}
                    />
                    {formData.images[`photo${photoNum}` as keyof typeof formData.images] && (
                      <div className="mt-2">
                        <img
                          src={
                            formData.images[`photo${photoNum || "/placeholder.svg"}` as keyof typeof formData.images]
                          }
                          alt={`Photo ${photoNum}`}
                          className="w-full h-32 object-cover rounded border"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900">Avis Clients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.reviews.length === 0 ? (
                <p className="text-slate-600">Aucun avis pour le moment.</p>
              ) : (
                <div className="space-y-4">
                  {formData.reviews.map((review) => (
                    <div key={review.id} className="border rounded p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{review.user}</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-slate-500">{review.date}</span>
                      </div>
                      <p className="text-slate-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900">Optimisation SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">Titre SEO</Label>
                <Input
                  id="seoTitle"
                  value={formData.seoTitle}
                  onChange={(e) => handleInputChange("seoTitle", e.target.value)}
                  placeholder="Titre optimisé pour les moteurs de recherche"
                />
                <p className="text-sm text-slate-600">{formData.seoTitle.length}/60 caractères recommandés</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoDescription">Description SEO</Label>
                <Textarea
                  id="seoDescription"
                  value={formData.seoDescription}
                  onChange={(e) => handleInputChange("seoDescription", e.target.value)}
                  placeholder="Description optimisée pour les moteurs de recherche"
                  rows={3}
                />
                <p className="text-sm text-slate-600">{formData.seoDescription.length}/160 caractères recommandés</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline">
          Annuler
        </Button>
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          {productId ? "Mettre à jour" : "Créer"} la basket
        </Button>
      </div>
    </form>
  )
}
