"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, Share2, Truck, RotateCcw, Shield, ChevronLeft, Plus, Minus, Check } from "lucide-react"
import { sneakers } from "@/lib/data"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"

export default function ProductPage() {
  const params = useParams()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const sneaker = sneakers.find((s) => s.id === params.id)

  if (!sneaker) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
        <Link href="/">
          <Button>Retour à l'accueil</Button>
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Taille requise",
        description: "Veuillez sélectionner une taille",
        variant: "destructive",
      })
      return
    }
    if (!selectedColor) {
      toast({
        title: "Couleur requise",
        description: "Veuillez sélectionner une couleur",
        variant: "destructive",
      })
      return
    }

    addItem(sneaker, selectedSize, selectedColor, quantity)
    toast({
      title: "Ajouté au panier",
      description: `${sneaker.name} ajouté à votre panier`,
    })
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Accueil
          </Link>
          <span>/</span>
          <Link href="/sneakers" className="hover:text-foreground">
            Sneakers
          </Link>
          <span>/</span>
          <span className="text-foreground">{sneaker.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
              <Image
                src={sneaker.images[selectedImageIndex] || "/placeholder.svg"}
                alt={sneaker.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {sneaker.isNew && <Badge className="bg-accent text-accent-foreground">Nouveau</Badge>}
                {sneaker.isBestSeller && <Badge variant="secondary">Best Seller</Badge>}
                {!sneaker.inStock && <Badge variant="destructive">Rupture de stock</Badge>}
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-background/80 backdrop-blur"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full bg-background/80 backdrop-blur">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-4 overflow-x-auto">
              {sneaker.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                    selectedImageIndex === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${sneaker.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <ChevronLeft className="h-4 w-4" />
                  Retour
                </Link>
              </div>

              <div>
                <p className="text-muted-foreground uppercase tracking-wide text-sm">{sneaker.brand}</p>
                <h1 className="text-3xl lg:text-4xl font-bold text-balance">{sneaker.name}</h1>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(sneaker.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm">{sneaker.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({sneaker.reviewCount} avis)</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">{sneaker.price}€</span>
                {sneaker.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">{sneaker.originalPrice}€</span>
                )}
                {sneaker.originalPrice && (
                  <Badge variant="destructive">
                    -{Math.round(((sneaker.originalPrice - sneaker.price) / sneaker.originalPrice) * 100)}%
                  </Badge>
                )}
              </div>
            </div>

            <Separator />

            {/* Size Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Taille</h3>
              <div className="grid grid-cols-4 gap-3">
                {sneaker.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className="h-12"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Couleur</h3>
              <div className="space-y-2">
                {sneaker.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    onClick={() => setSelectedColor(color)}
                    className="w-full justify-start h-12"
                  >
                    {selectedColor === color && <Check className="h-4 w-4 mr-2" />}
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quantité</h3>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button size="lg" className="w-full text-lg h-14" onClick={handleAddToCart} disabled={!sneaker.inStock}>
                {sneaker.inStock ? "Ajouter au Panier" : "Rupture de Stock"}
              </Button>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <Truck className="h-6 w-6 mx-auto text-primary" />
                  <p className="text-sm text-muted-foreground">Livraison gratuite dès 75€</p>
                </div>
                <div className="space-y-2">
                  <RotateCcw className="h-6 w-6 mx-auto text-primary" />
                  <p className="text-sm text-muted-foreground">Retours 30 jours</p>
                </div>
                <div className="space-y-2">
                  <Shield className="h-6 w-6 mx-auto text-primary" />
                  <p className="text-sm text-muted-foreground">Authenticité garantie</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-20">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Caractéristiques</TabsTrigger>
              <TabsTrigger value="reviews">Avis ({sneaker.reviewCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <div className="prose max-w-none">
                    <p className="text-lg leading-relaxed">{sneaker.description}</p>
                    <p className="mt-4 text-muted-foreground">
                      Cette sneaker {sneaker.brand} allie parfaitement style et performance. Conçue avec des matériaux
                      de haute qualité, elle offre un confort exceptionnel pour un usage quotidien ou sportif. Son
                      design intemporel s'adapte à toutes les occasions et tous les styles.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Informations Produit</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Marque:</span>
                          <span>{sneaker.brand}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Catégorie:</span>
                          <span className="capitalize">{sneaker.category.replace("-", " ")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tailles disponibles:</span>
                          <span>{sneaker.sizes.join(", ")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Couleurs:</span>
                          <span>{sneaker.colors.length} options</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Matériaux & Entretien</h4>
                      <div className="space-y-2 text-muted-foreground">
                        <p>• Tige en cuir synthétique et textile</p>
                        <p>• Semelle intermédiaire en mousse EVA</p>
                        <p>• Semelle extérieure en caoutchouc</p>
                        <p>• Nettoyage avec un chiffon humide</p>
                        <p>• Séchage à l'air libre uniquement</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-8">
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-6 w-6 ${
                                i < Math.floor(sneaker.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-2xl font-bold">{sneaker.rating}</span>
                      </div>
                      <p className="text-muted-foreground">Basé sur {sneaker.reviewCount} avis clients</p>
                    </div>

                    <div className="space-y-6">
                      {/* Sample Reviews */}
                      <div className="border-b pb-6">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="font-semibold">Marie L.</span>
                          <span className="text-sm text-muted-foreground">Achat vérifié</span>
                        </div>
                        <p className="text-muted-foreground">
                          Excellente qualité, très confortable. Je recommande vivement !
                        </p>
                      </div>

                      <div className="border-b pb-6">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            <Star className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <span className="font-semibold">Thomas D.</span>
                          <span className="text-sm text-muted-foreground">Achat vérifié</span>
                        </div>
                        <p className="text-muted-foreground">Très belles sneakers, taille bien. Livraison rapide.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">Produits Similaires</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sneakers
              .filter((s) => s.id !== sneaker.id && s.category === sneaker.category)
              .slice(0, 4)
              .map((relatedSneaker) => (
                <Card key={relatedSneaker.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <Image
                        src={relatedSneaker.images[0] || "/placeholder.svg"}
                        alt={relatedSneaker.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <p className="text-xs text-muted-foreground uppercase">{relatedSneaker.brand}</p>
                      <h3 className="font-semibold text-sm">{relatedSneaker.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{relatedSneaker.price}€</span>
                        <Link href={`/sneakers/${relatedSneaker.id}`}>
                          <Button size="sm">Voir</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
