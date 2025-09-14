"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { User, Package, Truck, MessageSquare, Download, Mail } from "lucide-react"

interface OrderDetailsProps {
  orderId: string
}

// Mock data - in real app this would come from API
const orderData = {
  id: "ORD-001",
  date: "2024-01-15T10:30:00",
  status: "pending",
  paymentStatus: "pending",
  customer: {
    id: "CUST-123",
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    phone: "+33 1 23 45 67 89",
  },
  billingAddress: {
    name: "Jean Dupont",
    company: "Entreprise SARL",
    address1: "123 Rue de la Paix",
    address2: "Appartement 4B",
    city: "Paris",
    postalCode: "75001",
    country: "France",
  },
  shippingAddress: {
    name: "Jean Dupont",
    company: "",
    address1: "123 Rue de la Paix",
    address2: "Appartement 4B",
    city: "Paris",
    postalCode: "75001",
    country: "France",
  },
  items: [
    {
      id: "1",
      name: "iPhone 15 Pro",
      sku: "IPH15P-128-BLK",
      variant: "128GB - Noir",
      quantity: 1,
      price: 1199.99,
      image: "/iphone-15-pro-hands.png",
    },
    {
      id: "2",
      name: "Coque iPhone 15 Pro",
      sku: "CASE-IPH15P-BLK",
      variant: "Noir",
      quantity: 1,
      price: 29.99,
      image: "/iphone-case.jpg",
    },
  ],
  subtotal: 1229.98,
  shipping: 9.99,
  tax: 49.2,
  total: 1289.17,
  notes: "Livraison rapide demandée par le client",
  timeline: [
    {
      date: "2024-01-15T10:30:00",
      status: "pending",
      description: "Commande créée",
      user: "Système",
    },
  ],
}

const statusOptions = [
  { value: "pending", label: "En attente", color: "bg-yellow-100 text-yellow-800" },
  { value: "confirmed", label: "Confirmée", color: "bg-blue-100 text-blue-800" },
  { value: "shipped", label: "Expédiée", color: "bg-purple-100 text-purple-800" },
  { value: "delivered", label: "Livrée", color: "bg-green-100 text-green-800" },
  { value: "cancelled", label: "Annulée", color: "bg-red-100 text-red-800" },
]

const paymentStatusOptions = [
  { value: "pending", label: "En attente", color: "bg-yellow-100 text-yellow-800" },
  { value: "paid", label: "Payé", color: "bg-green-100 text-green-800" },
  { value: "failed", label: "Échec", color: "bg-red-100 text-red-800" },
  { value: "refunded", label: "Remboursé", color: "bg-gray-100 text-gray-800" },
]

export function OrderDetails({ orderId }: OrderDetailsProps) {
  const [order, setOrder] = useState(orderData)
  const [notes, setNotes] = useState(order.notes)

  const handleStatusChange = (newStatus: string) => {
    setOrder((prev) => ({
      ...prev,
      status: newStatus,
      timeline: [
        ...prev.timeline,
        {
          date: new Date().toISOString(),
          status: newStatus,
          description: `Statut changé vers ${statusOptions.find((s) => s.value === newStatus)?.label}`,
          user: "Admin",
        },
      ],
    }))
  }

  const handlePaymentStatusChange = (newStatus: string) => {
    setOrder((prev) => ({
      ...prev,
      paymentStatus: newStatus,
    }))
  }

  const currentStatus = statusOptions.find((s) => s.value === order.status)
  const currentPaymentStatus = paymentStatusOptions.find((s) => s.value === order.paymentStatus)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Order Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-card-foreground">
              <Package className="mr-2 h-5 w-5" />
              Articles Commandés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Prix unitaire</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-12 w-12 rounded-md object-cover"
                        />
                        <div>
                          <p className="font-medium text-card-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.variant}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>€{item.price.toFixed(2)}</TableCell>
                    <TableCell>€{(item.price * item.quantity).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sous-total</span>
                <span className="text-card-foreground">€{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expédition</span>
                <span className="text-card-foreground">€{order.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">TVA</span>
                <span className="text-card-foreground">€{order.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-card-foreground">Total</span>
                <span className="text-card-foreground">€{order.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-card-foreground">
              <User className="mr-2 h-5 w-5" />
              Informations Client
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-card-foreground mb-2">Contact</h4>
              <div className="space-y-1 text-sm">
                <p className="text-card-foreground">{order.customer.name}</p>
                <p className="text-muted-foreground">{order.customer.email}</p>
                <p className="text-muted-foreground">{order.customer.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-card-foreground mb-2">Adresse de facturation</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>{order.billingAddress.name}</p>
                  {order.billingAddress.company && <p>{order.billingAddress.company}</p>}
                  <p>{order.billingAddress.address1}</p>
                  {order.billingAddress.address2 && <p>{order.billingAddress.address2}</p>}
                  <p>
                    {order.billingAddress.postalCode} {order.billingAddress.city}
                  </p>
                  <p>{order.billingAddress.country}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-card-foreground mb-2">Adresse de livraison</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>{order.shippingAddress.name}</p>
                  {order.shippingAddress.company && <p>{order.shippingAddress.company}</p>}
                  <p>{order.shippingAddress.address1}</p>
                  {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
                  <p>
                    {order.shippingAddress.postalCode} {order.shippingAddress.city}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-card-foreground">Historique de la Commande</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.timeline.map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-card-foreground">{event.description}</p>
                      <p className="text-xs text-muted-foreground">{new Date(event.date).toLocaleString("fr-FR")}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Par {event.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Order Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-card-foreground">Statut de la Commande</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Statut de la commande</Label>
              <Select value={order.status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {currentStatus && <Badge className={currentStatus.color}>{currentStatus.label}</Badge>}
            </div>

            <div className="space-y-2">
              <Label>Statut du paiement</Label>
              <Select value={order.paymentStatus} onValueChange={handlePaymentStatusChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {paymentStatusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {currentPaymentStatus && (
                <Badge className={currentPaymentStatus.color}>{currentPaymentStatus.label}</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-card-foreground">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full bg-transparent" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Télécharger Facture
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Envoyer Email Client
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              <Truck className="mr-2 h-4 w-4" />
              Créer Étiquette Expédition
            </Button>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-card-foreground">
              <MessageSquare className="mr-2 h-5 w-5" />
              Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Notes internes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ajouter des notes sur cette commande..."
                rows={4}
              />
            </div>
            <Button size="sm">Sauvegarder Notes</Button>
          </CardContent>
        </Card>

        {/* Order Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-card-foreground">Informations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID Commande</span>
              <span className="font-mono text-card-foreground">{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date</span>
              <span className="text-card-foreground">{new Date(order.date).toLocaleDateString("fr-FR")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Heure</span>
              <span className="text-card-foreground">
                {new Date(order.date).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
