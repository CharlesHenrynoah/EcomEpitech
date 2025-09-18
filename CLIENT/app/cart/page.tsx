"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart()
  const { toast } = useToast()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const shippingCost = total >= 75 ? 0 : 9.99
  const finalTotal = total + shippingCost - discount

  const handleApplyPromo = () => {
    // Simulation de codes promo
    const promoCodes = {
      WELCOME10: 0.1,
      SNEAKER20: 0.2,
      FIRST15: 0.15,
    }

    const discountRate = promoCodes[promoCode.toUpperCase() as keyof typeof promoCodes]
    if (discountRate) {
      const discountAmount = total * discountRate
      setDiscount(discountAmount)
      toast({
        title: "Code promo appliqué !",
        description: `Vous économisez ${discountAmount.toFixed(2)}€`,
      })
    } else {
      toast({
        title: "Code promo invalide",
        description: "Ce code promo n'existe pas ou a expiré",
        variant: "destructive",
      })
    }
  }

  const handleQuantityChange = (id: string, size: string, color: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id, size, color)
      toast({
        title: "Produit retiré",
        description: "Le produit a été retiré de votre panier",
      })
    } else {
      updateQuantity(id, size, color, newQuantity)
    }
  }

  const handleRemoveItem = (id: string, size: string, color: string, name: string) => {
    removeItem(id, size, color)
    toast({
      title: "Produit retiré",
      description: `${name} a été retiré de votre panier`,
    })
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">Votre panier est vide</h1>
              <p className="text-xl text-muted-foreground max-w-md mx-auto">
                Découvrez notre collection de sneakers et trouvez votre paire parfaite
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="text-lg px-8" style={{ backgroundColor: "#432ec6", color: "#ffffff" }}>
                  Découvrir la Collection
                </Button>
              </Link>
              <Link href="/new">
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  Voir les Nouveautés
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Mon Panier</h1>
            <p className="text-muted-foreground">
              {items.length} article{items.length > 1 ? "s" : ""} dans votre panier
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={`${item.sneaker.id}-${item.size}-${item.color}`}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={item.sneaker.images[0] || "/placeholder.svg"}
                        alt={item.sneaker.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground uppercase tracking-wide">{item.sneaker.brand}</p>
                          <h3 className="font-semibold text-lg">{item.sneaker.name}</h3>
                          <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                            <span>Taille: {item.size}</span>
                            <span>Couleur: {item.color}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.sneaker.id, item.size, item.color, item.sneaker.name)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() =>
                              handleQuantityChange(item.sneaker.id, item.size, item.color, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="font-semibold w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() =>
                              handleQuantityChange(item.sneaker.id, item.size, item.color, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-bold text-lg">{(item.sneaker.price * item.quantity).toFixed(2)}€</p>
                          <p className="text-sm text-muted-foreground">{item.sneaker.price}€ / unité</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  clearCart()
                  toast({
                    title: "Panier vidé",
                    description: "Tous les produits ont été retirés de votre panier",
                  })
                }}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Vider le panier
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Code Promo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Entrez votre code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleApplyPromo} disabled={!promoCode}>
                    Appliquer
                  </Button>
                </div>
                {discount > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Code appliqué</Badge>
                    <span className="text-sm text-green-600">-{discount.toFixed(2)}€</span>
                  </div>
                )}
                <div className="text-xs text-muted-foreground">Codes disponibles: WELCOME10, SNEAKER20, FIRST15</div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{total.toFixed(2)}€</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Réduction</span>
                      <span>-{discount.toFixed(2)}€</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span className={shippingCost === 0 ? "text-green-600" : ""}>
                      {shippingCost === 0 ? "Gratuite" : `${shippingCost.toFixed(2)}€`}
                    </span>
                  </div>

                  {total < 75 && (
                    <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                      Ajoutez {(75 - total).toFixed(2)}€ pour bénéficier de la livraison gratuite
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{finalTotal.toFixed(2)}€</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/checkout" className="w-full">
                    <Button size="lg" className="w-full text-lg h-12">
                      Procéder au Paiement
                    </Button>
                  </Link>

                  <Link href="/" className="w-full">
                    <Button variant="outline" size="lg" className="w-full bg-transparent">
                      Continuer mes Achats
                    </Button>
                  </Link>
                </div>

                {/* Security Info */}
                <div className="text-center text-sm text-muted-foreground space-y-2 pt-4 border-t">
                  <p className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Paiement 100% sécurisé
                  </p>
                  <p>SSL • Visa • Mastercard • PayPal</p>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Informations de Livraison</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Livraison standard: 3-5 jours ouvrés</p>
                    <p>• Livraison express: 24-48h (disponible au checkout)</p>
                    <p>• Retours gratuits sous 30 jours</p>
                    <p>• Suivi de commande par email et SMS</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
