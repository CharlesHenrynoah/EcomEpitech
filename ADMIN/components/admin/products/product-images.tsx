"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, Star, ArrowUp, ArrowDown } from "lucide-react"

interface ProductImagesProps {
  productId?: string
}

interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
  order: number
}

export function ProductImages({ productId }: ProductImagesProps) {
  const [images, setImages] = useState<ProductImage[]>([
    {
      id: "1",
      url: "/iphone-15-pro-front.jpg",
      alt: "iPhone 15 Pro - Vue de face",
      isPrimary: true,
      order: 1,
    },
    {
      id: "2",
      url: "/iphone-15-pro-back.jpg",
      alt: "iPhone 15 Pro - Vue de dos",
      isPrimary: false,
      order: 2,
    },
    {
      id: "3",
      url: "/iphone-15-pro-side.jpg",
      alt: "iPhone 15 Pro - Vue de côté",
      isPrimary: false,
      order: 3,
    },
  ])

  const handleSetPrimary = (id: string) => {
    setImages(
      images.map((img) => ({
        ...img,
        isPrimary: img.id === id,
      })),
    )
  }

  const handleDeleteImage = (id: string) => {
    setImages(images.filter((img) => img.id !== id))
  }

  const handleMoveImage = (id: string, direction: "up" | "down") => {
    const newImages = [...images]
    const currentIndex = newImages.findIndex((img) => img.id === id)
    if ((direction === "up" && currentIndex === 0) || (direction === "down" && currentIndex === newImages.length - 1)) {
      return
    }

    const targetIndex =
      direction === "up"
        ? currentIndex - 1
        : (currentIndex + 1
    
    // Swap the images
    [newImages[currentIndex], newImages[targetIndex]] = [newImages[targetIndex], newImages[currentIndex]])

    // Update order
    newImages.forEach((img, index) => {
      img.order = index + 1
    })

    setImages(newImages)
  }

  const handleAltTextChange = (id: string, alt: string) => {
    setImages(images.map((img) => (img.id === id ? { ...img, alt } : img)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-card-foreground">Images du Produit</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <div className="space-y-2">
            <p className="text-lg font-medium text-card-foreground">Ajouter des images</p>
            <p className="text-sm text-muted-foreground">Glissez-déposez vos images ici ou cliquez pour parcourir</p>
            <Button variant="outline">Parcourir les fichiers</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Formats acceptés: JPG, PNG, WebP. Taille max: 10MB par image.
          </p>
        </div>

        {/* Images Grid */}
        {images.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-card-foreground">Images actuelles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images
                .sort((a, b) => a.order - b.order)
                .map((image) => (
                  <Card key={image.id} className="relative">
                    <CardContent className="p-4">
                      <div className="relative group">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.alt}
                          className="w-full h-48 object-cover rounded-md"
                        />

                        {/* Primary badge */}
                        {image.isPrimary && (
                          <div className="absolute top-2 left-2">
                            <div className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center">
                              <Star className="h-3 w-3 mr-1" />
                              Principale
                            </div>
                          </div>
                        )}

                        {/* Action buttons */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleMoveImage(image.id, "up")}
                              disabled={image.order === 1}
                            >
                              <ArrowUp className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleMoveImage(image.id, "down")}
                              disabled={image.order === images.length}
                            >
                              <ArrowDown className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteImage(image.id)}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor={`alt-${image.id}`} className="text-sm">
                            Texte alternatif
                          </Label>
                          <Input
                            id={`alt-${image.id}`}
                            value={image.alt}
                            onChange={(e) => handleAltTextChange(image.id, e.target.value)}
                            placeholder="Description de l'image..."
                            className="text-sm"
                          />
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Ordre: {image.order}</span>
                          {!image.isPrimary && (
                            <Button size="sm" variant="outline" onClick={() => handleSetPrimary(image.id)}>
                              <Star className="h-3 w-3 mr-1" />
                              Définir comme principale
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
