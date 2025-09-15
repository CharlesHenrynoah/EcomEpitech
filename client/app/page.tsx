"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight, Truck, Shield, RotateCcw } from "lucide-react"
import { sneakers, categories } from "@/lib/data"

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredSneakers =
    selectedCategory === "all" ? sneakers : sneakers.filter((sneaker) => sneaker.category === selectedCategory)

  const featuredSneakers = sneakers.filter((sneaker) => sneaker.isNew || sneaker.isBestSeller).slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 animate-pulse"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit bg-accent text-accent-foreground font-semibold px-4 py-2">
                  🔥 Nouvelle Collection 2024
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-balance">
                  Découvrez les
                  <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {" "}
                    Sneakers{" "}
                  </span>
                  de Demain
                </h1>
                <p className="text-xl text-muted-foreground text-pretty">
                  Collection exclusive des plus grandes marques. Style, confort et innovation réunis dans chaque paire.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-lg px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Découvrir la Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  Voir les Nouveautés
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/modern-sneaker-collection-hero-image-with-multiple.jpg"
                  alt="Collection de sneakers premium"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-accent/10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-r from-muted/20 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Livraison Gratuite</h3>
              <p className="text-muted-foreground">Livraison gratuite dès 75€ d'achat partout en France</p>
            </div>
            <div className="text-center space-y-4 group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
                <RotateCcw className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Retours Faciles</h3>
              <p className="text-muted-foreground">30 jours pour changer d'avis, retours gratuits</p>
            </div>
            <div className="text-center space-y-4 group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary via-accent to-primary rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Authenticité Garantie</h3>
              <p className="text-muted-foreground">Toutes nos sneakers sont 100% authentiques</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Produits Vedettes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre sélection des sneakers les plus populaires et les dernières nouveautés
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredSneakers.map((sneaker) => (
              <Card
                key={sneaker.id}
                className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <Image
                      src={sneaker.images[0] || "/placeholder.svg"}
                      alt={sneaker.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {sneaker.isNew && (
                        <Badge className="bg-gradient-to-r from-accent to-accent/80 text-white font-semibold shadow-lg">
                          ✨ Nouveau
                        </Badge>
                      )}
                      {sneaker.isBestSeller && (
                        <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white font-semibold shadow-lg">
                          🔥 Best Seller
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{sneaker.brand}</p>
                      <h3 className="text-xl font-semibold">{sneaker.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm ml-1 font-medium">{sneaker.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({sneaker.reviewCount} avis)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">{sneaker.price}€</span>
                        {sneaker.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">{sneaker.originalPrice}€</span>
                        )}
                      </div>
                      <Link href={`/sneakers/${sneaker.id}`}>
                        <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300">
                          Voir Détails
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-gradient-to-br from-muted/20 via-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
              Toute Notre Collection
            </h2>
            <p className="text-xl text-muted-foreground">Filtrez par catégorie pour trouver vos sneakers parfaites</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-primary to-primary/80 shadow-lg hover:shadow-xl"
                    : "border-2 border-primary/20 hover:border-primary hover:bg-primary/5"
                }`}
              >
                {category.name}
                <Badge
                  variant="secondary"
                  className={`text-xs ${
                    selectedCategory === category.id ? "bg-white/20 text-white" : "bg-accent/10 text-accent"
                  }`}
                >
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSneakers.map((sneaker) => (
              <Card
                key={sneaker.id}
                className="group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 border hover:border-primary/20"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <Image
                      src={sneaker.images[0] || "/placeholder.svg"}
                      alt={sneaker.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {sneaker.isNew && (
                        <Badge className="bg-gradient-to-r from-accent to-accent/80 text-white text-xs font-semibold shadow-md">
                          Nouveau
                        </Badge>
                      )}
                      {sneaker.isBestSeller && (
                        <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white text-xs font-semibold shadow-md">
                          Best Seller
                        </Badge>
                      )}
                      {!sneaker.inStock && (
                        <Badge variant="destructive" className="text-xs font-semibold shadow-md">
                          Rupture
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                        {sneaker.brand}
                      </p>
                      <h3 className="font-semibold text-sm">{sneaker.name}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{sneaker.rating}</span>
                      <span className="text-xs text-muted-foreground">({sneaker.reviewCount})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary">{sneaker.price}€</span>
                        {sneaker.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">{sneaker.originalPrice}€</span>
                        )}
                      </div>
                      <Link href={`/sneakers/${sneaker.id}`}>
                        <Button
                          size="sm"
                          disabled={!sneaker.inStock}
                          className={
                            sneaker.inStock
                              ? "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md hover:shadow-lg transition-all duration-300"
                              : ""
                          }
                        >
                          {sneaker.inStock ? "Voir" : "Rupture"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
