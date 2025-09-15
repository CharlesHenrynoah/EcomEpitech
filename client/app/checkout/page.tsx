"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CreditCard, Truck, Shield, Lock, Check } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"

interface CheckoutForm {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  postalCode: string
  country: string
  phone: string
  shippingMethod: string
  paymentMethod: string
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string
  newsletter: boolean
  terms: boolean
  gdprConsent: boolean
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const [form, setForm] = useState<CheckoutForm>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "FR",
    phone: "",
    shippingMethod: "standard",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    newsletter: false,
    terms: false,
    gdprConsent: false,
  })

  const shippingCosts = {
    standard: 0,
    express: 9.99,
    premium: 19.99,
  }

  const shippingCost =
    total >= 75 && form.shippingMethod === "standard"
      ? 0
      : shippingCosts[form.shippingMethod as keyof typeof shippingCosts]
  const finalTotal = total + shippingCost

  const handleInputChange = (field: keyof CheckoutForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          form.email && form.firstName && form.lastName && form.address && form.city && form.postalCode && form.phone
        )
      case 2:
        return form.shippingMethod
      case 3:
        if (form.paymentMethod === "card") {
          return form.cardNumber && form.expiryDate && form.cvv && form.cardName
        }
        return true
      case 4:
        return form.terms && form.gdprConsent
      default:
        return false
    }
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
    } else {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
    }
  }

  const handleSubmitOrder = async () => {
    if (!validateStep(4)) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez accepter les conditions et la politique de confidentialité",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulation du traitement de commande
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      clearCart()
      toast({
        title: "Commande confirmée !",
        description: "Votre commande a été traitée avec succès. Vous recevrez un email de confirmation.",
      })

      router.push("/order-confirmation")
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du traitement de votre commande",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Votre panier est vide</h1>
          <Link href="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/cart">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Finaliser ma Commande</h1>
            <p className="text-muted-foreground">Étape {currentStep} sur 4</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {["Livraison", "Expédition", "Paiement", "Confirmation"].map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    index + 1 <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1 < currentStep ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <span className="ml-2 text-sm font-medium">{step}</span>
                {index < 3 && (
                  <div className={`w-16 h-0.5 mx-4 ${index + 1 < currentStep ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Informations de Livraison
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="votre@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        value={form.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        value={form.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="Jean"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        value={form.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Dupont"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse *</Label>
                    <Input
                      id="address"
                      value={form.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="123 Rue de la Paix"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville *</Label>
                      <Input
                        id="city"
                        value={form.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Paris"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Code Postal *</Label>
                      <Input
                        id="postalCode"
                        value={form.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                        placeholder="75001"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Pays *</Label>
                      <Select value={form.country} onValueChange={(value) => handleInputChange("country", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="FR">France</SelectItem>
                          <SelectItem value="BE">Belgique</SelectItem>
                          <SelectItem value="CH">Suisse</SelectItem>
                          <SelectItem value="LU">Luxembourg</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button onClick={handleNextStep} className="w-full">
                    Continuer vers l'Expédition
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Shipping Method */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Mode de Livraison</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={form.shippingMethod}
                    onValueChange={(value) => handleInputChange("shippingMethod", value)}
                  >
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="standard" id="standard" />
                      <div className="flex-1">
                        <Label htmlFor="standard" className="font-semibold">
                          Livraison Standard
                        </Label>
                        <p className="text-sm text-muted-foreground">3-5 jours ouvrés</p>
                      </div>
                      <span className="font-semibold">{total >= 75 ? "Gratuite" : "Gratuite"}</span>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="express" id="express" />
                      <div className="flex-1">
                        <Label htmlFor="express" className="font-semibold">
                          Livraison Express
                        </Label>
                        <p className="text-sm text-muted-foreground">24-48h</p>
                      </div>
                      <span className="font-semibold">9,99€</span>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="premium" id="premium" />
                      <div className="flex-1">
                        <Label htmlFor="premium" className="font-semibold">
                          Livraison Premium
                        </Label>
                        <p className="text-sm text-muted-foreground">Livraison le jour même (Paris uniquement)</p>
                      </div>
                      <span className="font-semibold">19,99€</span>
                    </div>
                  </RadioGroup>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                      Retour
                    </Button>
                    <Button onClick={handleNextStep} className="flex-1">
                      Continuer vers le Paiement
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Informations de Paiement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup
                    value={form.paymentMethod}
                    onValueChange={(value) => handleInputChange("paymentMethod", value)}
                  >
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1">
                        Carte Bancaire
                      </Label>
                      <div className="flex gap-2">
                        <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                          VISA
                        </div>
                        <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center">
                          MC
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1">
                        PayPal
                      </Label>
                      <div className="w-16 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center">
                        PayPal
                      </div>
                    </div>
                  </RadioGroup>

                  {form.paymentMethod === "card" && (
                    <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Nom sur la carte *</Label>
                        <Input
                          id="cardName"
                          value={form.cardName}
                          onChange={(e) => handleInputChange("cardName", e.target.value)}
                          placeholder="Jean Dupont"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Numéro de carte *</Label>
                        <Input
                          id="cardNumber"
                          value={form.cardNumber}
                          onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Date d'expiration *</Label>
                          <Input
                            id="expiryDate"
                            value={form.expiryDate}
                            onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                            placeholder="MM/AA"
                            maxLength={5}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            value={form.cvv}
                            onChange={(e) => handleInputChange("cvv", e.target.value)}
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                      Retour
                    </Button>
                    <Button onClick={handleNextStep} className="flex-1">
                      Continuer vers la Confirmation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Confirmation et Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="gdprConsent"
                        checked={form.gdprConsent}
                        onCheckedChange={(checked) => handleInputChange("gdprConsent", checked as boolean)}
                      />
                      <Label htmlFor="gdprConsent" className="text-sm leading-relaxed">
                        J'accepte que mes données personnelles soient traitées conformément à la{" "}
                        <Link href="/privacy" className="text-primary underline">
                          politique de confidentialité
                        </Link>{" "}
                        pour le traitement de ma commande. *
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={form.terms}
                        onCheckedChange={(checked) => handleInputChange("terms", checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        J'accepte les{" "}
                        <Link href="/terms" className="text-primary underline">
                          conditions générales de vente
                        </Link>{" "}
                        et les{" "}
                        <Link href="/returns" className="text-primary underline">
                          conditions de retour
                        </Link>
                        . *
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={form.newsletter}
                        onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                      />
                      <Label htmlFor="newsletter" className="text-sm leading-relaxed">
                        Je souhaite recevoir les offres spéciales et nouveautés par email (optionnel)
                      </Label>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Lock className="h-4 w-4" />
                      Paiement 100% sécurisé
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Vos informations de paiement sont cryptées et sécurisées. Nous ne stockons pas vos données
                      bancaires.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep(3)} className="flex-1">
                      Retour
                    </Button>
                    <Button
                      onClick={handleSubmitOrder}
                      className="flex-1"
                      disabled={isProcessing || !form.terms || !form.gdprConsent}
                    >
                      {isProcessing ? "Traitement..." : "Confirmer la Commande"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Récapitulatif de Commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={`${item.sneaker.id}-${item.size}-${item.color}`} className="flex gap-3">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={item.sneaker.images[0] || "/placeholder.svg"}
                          alt={item.sneaker.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{item.sneaker.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.size} • {item.color} • Qté: {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-semibold">{(item.sneaker.price * item.quantity).toFixed(2)}€</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{total.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span>{shippingCost === 0 ? "Gratuite" : `${shippingCost.toFixed(2)}€`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{finalTotal.toFixed(2)}€</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Garanties</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>Authenticité garantie</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-primary" />
                      <span>Livraison suivie</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Retours gratuits 30 jours</span>
                    </div>
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
