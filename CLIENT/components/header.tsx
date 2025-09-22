"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, User, Menu, X, Heart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-br from-primary via-secondary to-accent animate-gradient-shift">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl text-white">SneakStreet</span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white/90 hover:text-white transition-colors font-medium">
              Accueil
            </Link>
            <Link href="/femme" className="text-white/90 hover:text-white transition-colors font-medium">
              Femme
            </Link>
            <Link href="/homme" className="text-white/90 hover:text-white transition-colors font-medium">
              Homme
            </Link>
            <Link href="/promotions" className="text-white/90 hover:text-white transition-colors font-medium">
              Promotions
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-2 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher des sneakers..."
                className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/70"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hidden md:flex text-white hover:bg-white/20">
              <Heart className="h-5 w-5" />
            </Button>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

           <Link href="/login">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4 bg-black/20 backdrop-blur-sm">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-white/90 hover:text-white transition-colors font-medium">
                Accueil
              </Link>
              <Link href="/femme" className="text-white/90 hover:text-white transition-colors font-medium">
                Femme
              </Link>
              <Link href="/homme" className="text-white/90 hover:text-white transition-colors font-medium">
                Homme
              </Link>
              <Link href="/promotions" className="text-white/90 hover:text-white transition-colors font-medium">
                Promotions
              </Link>
              <div className="pt-4 border-t border-white/20">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
                  <Input
                    placeholder="Rechercher des sneakers..."
                    className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/70"
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
