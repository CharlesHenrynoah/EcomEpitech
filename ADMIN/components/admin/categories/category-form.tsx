"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Save, Upload, X, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface CategoryFormProps {
  categoryId?: string
  mode?: "create" | "edit" | "view"
}

interface Category {
  id: string
  name: string
  slug: string
  description: string
  isActive: boolean
  metaTitle: string
  metaDescription: string
  image: string
  createdAt: string
  updatedAt: string
}

// Storage functions for categories
const getStoredCategories = (): Category[] => {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("admin-categories")
  return stored
    ? JSON.parse(stored)
    : [
        {
          id: "1",
          name: "Lifestyle",
          slug: "lifestyle",
          description: "Baskets lifestyle pour tous les styles et occasions",
          isActive: true,
          metaTitle: "Lifestyle - Baskets Premium",
          metaDescription: "Découvrez notre collection de baskets lifestyle avec les meilleures marques",
          image: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Basketball",
          slug: "basketball",
          description: "Baskets basketball pour tous les styles et occasions",
          isActive: true,
          metaTitle: "Basketball - Baskets Premium",
          metaDescription: "Découvrez notre collection de baskets basketball avec les meilleures marques",
          image: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "3",
          name: "Running",
          slug: "running",
          description: "Baskets running pour tous les styles et occasions",
          isActive: true,
          metaTitle: "Running - Baskets Premium",
          metaDescription: "Découvrez notre collection de baskets running avec les meilleures marques",
          image: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]
}

const saveCategories = (categories: Category[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("admin-categories", JSON.stringify(categories))
  }
}

export function CategoryForm({ categoryId, mode = "create" }: CategoryFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    isActive: true,
    metaTitle: "",
    metaDescription: "",
    image: "",
  })

  const isReadOnly = mode === "view"

  useEffect(() => {
    if (categoryId && mode !== "create") {
      const categories = getStoredCategories()
      const category = categories.find((c) => c.id === categoryId)
      if (category) {
        setFormData({
          name: category.name,
          slug: category.slug,
          description: category.description,
          isActive: category.isActive,
          metaTitle: category.metaTitle,
          metaDescription: category.metaDescription,
          image: category.image,
        })
      }
    }
  }, [categoryId, mode])

  // Générer automatiquement le slug à partir du nom
  const handleNameChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!formData.name.trim()) {
      alert("Le nom de la catégorie est requis")
      setIsLoading(false)
      return
    }

    try {
      // Simuler l'API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const categories = getStoredCategories()

      if (mode === "create") {
        // Create new category
        const newCategory: Category = {
          id: Date.now().toString(),
          name: formData.name,
          slug: formData.slug,
          description: formData.description,
          isActive: formData.isActive,
          metaTitle: formData.metaTitle,
          metaDescription: formData.metaDescription,
          image: formData.image,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        categories.push(newCategory)
        console.log("[v0] New category created:", newCategory)
      } else if (mode === "edit" && categoryId) {
        // Update existing category
        const categoryIndex = categories.findIndex((c) => c.id === categoryId)
        if (categoryIndex !== -1) {
          categories[categoryIndex] = {
            ...categories[categoryIndex],
            name: formData.name,
            slug: formData.slug,
            description: formData.description,
            isActive: formData.isActive,
            metaTitle: formData.metaTitle,
            metaDescription: formData.metaDescription,
            image: formData.image,
            updatedAt: new Date().toISOString(),
          }
          console.log("[v0] Category updated:", categories[categoryIndex])
        }
      }

      saveCategories(categories)

      // Show success message
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        router.push("/admin/categories")
      }, 1500)
    } catch (error) {
      console.error("[v0] Error saving category:", error)
      alert("Erreur lors de l'enregistrement de la catégorie")
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Simuler l'upload d'image
      const imageUrl = URL.createObjectURL(file)
      setFormData((prev) => ({ ...prev, image: imageUrl }))
    }
  }

  const handleClearForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      isActive: true,
      metaTitle: "",
      metaDescription: "",
      image: "",
    })
  }

  if (showSuccess) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="text-2xl font-bold text-foreground">
            {mode === "create" ? "Catégorie créée avec succès!" : "Catégorie mise à jour avec succès!"}
          </h2>
          <p className="text-muted-foreground">Redirection en cours...</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-card-foreground">Informations Générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom de la catégorie *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="ex: Basketball"
                    required
                    disabled={isReadOnly}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                    placeholder="basketball"
                    disabled={isReadOnly}
                    className="bg-background"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Description de la catégorie..."
                  rows={3}
                  disabled={isReadOnly}
                  className="bg-background"
                />
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle className="text-card-foreground">Référencement (SEO)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Titre Meta</Label>
                <Input
                  id="metaTitle"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData((prev) => ({ ...prev, metaTitle: e.target.value }))}
                  placeholder="Titre pour les moteurs de recherche"
                  disabled={isReadOnly}
                  className="bg-background"
                />
                <p className="text-sm text-muted-foreground">{formData.metaTitle.length}/60 caractères recommandés</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaDescription">Description Meta</Label>
                <Textarea
                  id="metaDescription"
                  value={formData.metaDescription}
                  onChange={(e) => setFormData((prev) => ({ ...prev, metaDescription: e.target.value }))}
                  placeholder="Description pour les moteurs de recherche"
                  rows={3}
                  disabled={isReadOnly}
                  className="bg-background"
                />
                <p className="text-sm text-muted-foreground">
                  {formData.metaDescription.length}/160 caractères recommandés
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Statut */}
          <Card>
            <CardHeader>
              <CardTitle className="text-card-foreground">Statut</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="isActive">Catégorie active</Label>
                  <p className="text-sm text-muted-foreground">
                    Les catégories inactives ne sont pas visibles sur le site
                  </p>
                </div>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
                  disabled={isReadOnly}
                />
              </div>

              <div className="pt-2">
                <Badge variant={formData.isActive ? "default" : "secondary"}>
                  {formData.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Image */}
          <Card>
            <CardHeader>
              <CardTitle className="text-card-foreground">Image de la catégorie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.image ? (
                <div className="relative">
                  <img
                    src={formData.image || "/placeholder.svg"}
                    alt="Aperçu"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  {!isReadOnly && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ) : (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Aucune image sélectionnée</p>
                </div>
              )}

              {!isReadOnly && (
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <Button type="button" variant="outline" className="w-full bg-transparent" asChild>
                      <span>
                        <Upload className="mr-2 h-4 w-4" />
                        Choisir une image
                      </span>
                    </Button>
                  </Label>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          {!isReadOnly && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? "Enregistrement..." : mode === "create" ? "Créer la catégorie" : "Mettre à jour"}
                  </Button>
                  {mode === "create" && (
                    <Button type="button" variant="outline" className="w-full bg-transparent" onClick={handleClearForm}>
                      Effacer le formulaire
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => router.push("/admin/categories")}
                  >
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </form>
  )
}
