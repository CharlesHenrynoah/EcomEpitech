"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight, Truck, Shield, RotateCcw, Zap, Sparkles, TrendingUp } from "lucide-react"
import { sneakers } from "@/lib/data"
  import { supabaseClient } from "@/lib/supabaseClient";

export default async function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")




  const { data: products } = await supabaseClient.from('products').select()
 console.log( "products", products)
  const trendingSneakers = sneakers.filter((sneaker) => sneaker.isNew).slice(0, 6)
  const mostWantedSneakers = sneakers.filter((sneaker) => sneaker.isBestSeller).slice(0, 8)

  return (
    <div className="min-h-screen overflow-hidden">
      <section className="relative bg-gradient-to-br from-primary via-secondary to-accent animate-gradient-shift py-16 lg:py-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-bounce-in">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse-glow"></div>
                  <span className="text-white/90 font-bold tracking-wider text-sm">SNEAKSTREET</span>
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse-glow"></div>
                </div>
                <h1 className="text-6xl lg:text-8xl font-black uppercase tracking-tight text-white drop-shadow-2xl">
                  STREET
                  <br />
                  <span className="text-accent animate-pulse-glow">VIBES</span>
                  <br />
                  <span className="text-2xl lg:text-4xl">ONLY</span>
                </h1>
                <p className="text-xl text-white/90 max-w-lg font-medium">
                  🔥 La révolution sneakers commence ici. Style urbain, tech premium, authenticité 100% garantie.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-lg px-8 bg-accent hover:bg-accent/90 text-accent-foreground hover-glow animate-float"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  EXPLORER MAINTENANT
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary bg-transparent"
                >
                  <TrendingUp className="mr-2 h-5 w-5" />
                  TENDANCES
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden hover-lift">
                  <Image
                    src="/lifestyle-sneaker-photo-urban-street-style.jpg"
                    alt="Style urbain sneakers"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"></div>
                </div>
                <div
                  className="aspect-square relative rounded-2xl overflow-hidden hover-lift animate-float"
                  style={{ animationDelay: "0.5s" }}
                >
                  <Image
                    src="/close-up-sneaker-detail-premium-materials.jpg"
                    alt="Détail sneaker premium"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent"></div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div
                  className="aspect-square relative rounded-2xl overflow-hidden hover-lift animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <Image
                    src="/colorful-sneakers-collection-display.jpg"
                    alt="Collection sneakers colorées"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/50 to-transparent"></div>
                </div>
                <div
                  className="aspect-[3/4] relative rounded-2xl overflow-hidden hover-lift animate-float"
                  style={{ animationDelay: "1.5s" }}
                >
                  <Image
                    src="/person-wearing-sneakers-lifestyle-photo.jpg"
                    alt="Lifestyle sneakers"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-muted/30 to-card/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto animate-pulse-glow">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-primary">⚡ Livraison Express</h3>
              <p className="text-muted-foreground font-medium">Dès 75€ d'achat - 24h chrono</p>
            </div>
            <div className="text-center space-y-4 hover-lift">
              <div
                className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mx-auto animate-pulse-glow"
                style={{ animationDelay: "0.5s" }}
              >
                <RotateCcw className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-secondary">🔄 Retours 30 jours</h3>
              <p className="text-muted-foreground font-medium">Gratuits et ultra-faciles</p>
            </div>
            <div className="text-center space-y-4 hover-lift">
              <div
                className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto animate-pulse-glow"
                style={{ animationDelay: "1s" }}
              >
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-accent">✨ 100% Authentique</h3>
              <p className="text-muted-foreground font-medium">Garantie d'authenticité absolue</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-accent via-primary to-secondary animate-gradient-shift">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-bounce-in">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="h-6 w-6 text-white animate-pulse" />
                  <span className="text-white/90 font-bold tracking-wider text-sm">FLASH SALES</span>
                  <Zap className="h-6 w-6 text-white animate-pulse" />
                </div>
                <h2 className="text-5xl lg:text-7xl font-black text-white drop-shadow-2xl">
                  MEGA
                  <br />
                  PROMOS
                </h2>
                <div className="flex flex-wrap gap-3">
                  <span className="text-3xl lg:text-5xl font-black text-white animate-pulse-glow bg-black/20 px-4 py-2 rounded-2xl">
                    -50%
                  </span>
                  <span
                    className="text-3xl lg:text-5xl font-black text-white animate-pulse-glow bg-black/20 px-4 py-2 rounded-2xl"
                    style={{ animationDelay: "0.5s" }}
                  >
                    -40%
                  </span>
                  <span
                    className="text-3xl lg:text-5xl font-black text-white animate-pulse-glow bg-black/20 px-4 py-2 rounded-2xl"
                    style={{ animationDelay: "1s" }}
                  >
                    -60%
                  </span>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-white text-accent hover:bg-white/90 font-black text-xl px-8 py-4 hover-glow"
              >
                <Sparkles className="mr-2 h-6 w-6" />
                VOIR LES PROMOS
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square relative rounded-2xl overflow-hidden hover-lift animate-float">
                <Image
                  src="/nike-air-max-sneakers-promotion-sale.jpg"
                  alt="Nike Air Max promo"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-accent text-accent-foreground font-black text-sm px-3 py-1 animate-pulse-glow">
                    🔥 NIKE AIR MAX
                  </Badge>
                </div>
              </div>
              <div
                className="aspect-square relative rounded-2xl overflow-hidden hover-lift animate-float"
                style={{ animationDelay: "0.5s" }}
              >
                <Image
                  src="/adidas-superstar-sneakers-white-classic.jpg"
                  alt="Adidas Superstar"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-primary text-primary-foreground font-black text-sm px-3 py-1 animate-pulse-glow">
                    ⚡ ADIDAS SUPERSTAR
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-white to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12 animate-bounce-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="h-8 w-8 text-accent animate-pulse" />
              <span className="text-accent font-black tracking-wider text-lg">HOT TRENDS</span>
              <TrendingUp className="h-8 w-8 text-accent animate-pulse" />
            </div>
            <h2 className="text-5xl lg:text-6xl font-black uppercase bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              TENDANCES DU MOMENT
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full animate-pulse-glow"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingSneakers.map((sneaker, index) => (
              <Card
                key={sneaker.id}
                className="group hover-lift border-0 bg-card/80 backdrop-blur-sm animate-bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                    <Image
                      src={sneaker.images[0] || "/placeholder.svg"}
                      alt={sneaker.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-accent to-primary text-white font-black text-xs px-3 py-1 animate-pulse-glow">
                        🔥 NOUVEAU
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div>
                      <p className="text-xs text-secondary uppercase font-black tracking-wider">{sneaker.brand}</p>
                      <h3 className="font-black text-lg text-primary">{sneaker.name}</h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {sneaker.price} €
                      </span>
                      <Link href={`/sneakers/${sneaker.id}`}>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-white font-black hover-glow"
                        >
                          <Sparkles className="mr-1 h-4 w-4" />
                          VOIR
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

      <section className="py-20 bg-gradient-to-r from-muted/20 to-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12 animate-bounce-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Star className="h-8 w-8 text-accent animate-pulse fill-accent" />
              <span className="text-accent font-black tracking-wider text-lg">MOST WANTED</span>
              <Star className="h-8 w-8 text-accent animate-pulse fill-accent" />
            </div>
            <h2 className="text-5xl lg:text-6xl font-black uppercase bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
              MOST WANTED
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-secondary via-accent to-primary mx-auto rounded-full animate-pulse-glow"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mostWantedSneakers.map((sneaker, index) => (
              <Card
                key={sneaker.id}
                className="group hover-lift border-0 bg-white/90 backdrop-blur-sm animate-bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                    <Image
                      src={sneaker.images[0] || "/placeholder.svg"}
                      alt={sneaker.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-xs text-secondary uppercase font-black tracking-wider">{sneaker.brand}</p>
                      <h3 className="font-black text-sm text-primary">{sneaker.name}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(sneaker.rating) ? "fill-accent text-accent" : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground font-semibold">({sneaker.reviewCount})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-black text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          {sneaker.price} €
                        </span>
                        {sneaker.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            {sneaker.originalPrice} €
                          </span>
                        )}
                      </div>
                    </div>
                    <Link href={`/sneakers/${sneaker.id}`} className="block">
                      <Button className="w-full bg-gradient-to-r from-secondary to-accent hover:from-accent hover:to-primary text-white font-black hover-glow">
                        <Sparkles className="mr-2 h-4 w-4" />
                        VOIR DÉTAILS
                      </Button>
                    </Link>
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
