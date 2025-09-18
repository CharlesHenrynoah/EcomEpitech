import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl">SneakerHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Votre destination premium pour les sneakers authentiques des plus grandes marques. Style, qualité et
              authenticité garantis.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Liens Rapides</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/sneakers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Toutes les Sneakers
              </Link>
              <Link href="/new" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Nouveautés
              </Link>
              <Link href="/sale" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Promotions
              </Link>
              <Link href="/brands" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Marques
              </Link>
              <Link
                href="/size-guide"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Guide des Tailles
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold">Service Client</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Nous Contacter
              </Link>
              <Link href="/shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Livraison & Retours
              </Link>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
              <Link href="/account" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Mon Compte
              </Link>
              <Link
                href="/track-order"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Suivre ma Commande
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">Recevez nos dernières nouveautés et offres exclusives</p>
            <div className="flex gap-2">
              <Input placeholder="Votre email" className="flex-1" />
              <Button>
                <Mail className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              En vous abonnant, vous acceptez notre{" "}
              <Link href="/privacy" className="text-primary underline">
                politique de confidentialité
              </Link>
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="font-semibold text-sm">Adresse</p>
              <p className="text-sm text-muted-foreground">123 Rue de la Mode, 75001 Paris</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-primary" />
            <div>
              <p className="font-semibold text-sm">Téléphone</p>
              <p className="text-sm text-muted-foreground">01 23 45 67 89</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="font-semibold text-sm">Email</p>
              <p className="text-sm text-muted-foreground">contact@sneakerhub.fr</p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Legal Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-6">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Conditions Générales
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Politique de Confidentialité
            </Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Gestion des Cookies
            </Link>
            <Link href="/legal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Mentions Légales
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 SneakerHub. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
