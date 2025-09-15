"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-balance">Commande Confirmée !</h1>
            <p className="text-xl text-muted-foreground">
              Merci pour votre achat. Votre commande a été traitée avec succès.
            </p>
          </div>

          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle>Détails de votre Commande</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <Package className="h-8 w-8 mx-auto text-primary" />
                  <h3 className="font-semibold">Numéro de Commande</h3>
                  <p className="text-muted-foreground">#SH-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                </div>
                <div className="space-y-2">
                  <Truck className="h-8 w-8 mx-auto text-primary" />
                  <h3 className="font-semibold">Livraison Estimée</h3>
                  <p className="text-muted-foreground">3-5 jours ouvrés</p>
                </div>
                <div className="space-y-2">
                  <Mail className="h-8 w-8 mx-auto text-primary" />
                  <h3 className="font-semibold">Confirmation</h3>
                  <p className="text-muted-foreground">Email envoyé</p>
                </div>
              </div>

              <div className="bg-muted p-6 rounded-lg text-left">
                <h4 className="font-semibold mb-3">Prochaines Étapes :</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Vous recevrez un email de confirmation avec tous les détails</li>
                  <li>• Votre commande sera préparée dans les 24h</li>
                  <li>• Un numéro de suivi vous sera envoyé dès l'expédition</li>
                  <li>• Vous pouvez suivre votre commande dans votre compte</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="text-lg px-8">
                Continuer mes Achats
              </Button>
            </Link>
            <Link href="/account/orders">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                Suivre ma Commande
              </Button>
            </Link>
          </div>

          {/* Support */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Une question ? Contactez notre{" "}
              <Link href="/support" className="text-primary underline">
                service client
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
