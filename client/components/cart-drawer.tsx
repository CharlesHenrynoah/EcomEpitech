"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, Plus, Minus, X } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

interface CartDrawerProps {
  children: React.ReactNode
}

export function CartDrawer({ children }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, total } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Mon Panier ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="text-center space-y-2">
              <p className="font-semibold">Votre panier est vide</p>
              <p className="text-sm text-muted-foreground">Ajoutez des produits pour commencer vos achats</p>
            </div>
            <Button onClick={() => setIsOpen(false)}>Continuer mes Achats</Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((item) => (
                <div key={`${item.sneaker.id}-${item.size}-${item.color}`} className="flex gap-4 p-4 border rounded-lg">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={item.sneaker.images[0] || "/placeholder.svg"}
                      alt={item.sneaker.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">{item.sneaker.brand}</p>
                        <h4 className="font-semibold text-sm">{item.sneaker.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {item.size} • {item.color}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.sneaker.id, item.size, item.color)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 bg-transparent"
                          onClick={() => updateQuantity(item.sneaker.id, item.size, item.color, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 bg-transparent"
                          onClick={() => updateQuantity(item.sneaker.id, item.size, item.color, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="font-semibold text-sm">{(item.sneaker.price * item.quantity).toFixed(2)}€</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span className="font-semibold">{total.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Livraison</span>
                  <span>{total >= 75 ? "Gratuite" : "9,99€"}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{(total + (total >= 75 ? 0 : 9.99)).toFixed(2)}€</span>
                </div>
              </div>

              <div className="space-y-2">
                <Link href="/cart" className="w-full" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full bg-transparent">
                    Voir le Panier
                  </Button>
                </Link>
                <Link href="/checkout" className="w-full" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Procéder au Paiement</Button>
                </Link>
              </div>

              {total < 75 && (
                <div className="text-xs text-center text-muted-foreground bg-muted p-2 rounded">
                  Ajoutez {(75 - total).toFixed(2)}€ pour la livraison gratuite
                </div>
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
