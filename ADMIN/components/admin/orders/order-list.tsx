"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, MoreHorizontal, Download } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

// Mock data
const orders = [
  {
    id: "ORD-001",
    customer: {
      name: "Jean Dupont",
      email: "jean.dupont@email.com",
    },
    date: "2024-01-15T10:30:00",
    status: "pending",
    paymentStatus: "pending",
    total: 299.99,
    items: 2,
    shippingAddress: "123 Rue de la Paix, Paris",
  },
  {
    id: "ORD-002",
    customer: {
      name: "Marie Martin",
      email: "marie.martin@email.com",
    },
    date: "2024-01-15T09:15:00",
    status: "confirmed",
    paymentStatus: "paid",
    total: 149.5,
    items: 1,
    shippingAddress: "456 Avenue des Champs, Lyon",
  },
  {
    id: "ORD-003",
    customer: {
      name: "Pierre Durand",
      email: "pierre.durand@email.com",
    },
    date: "2024-01-14T16:45:00",
    status: "shipped",
    paymentStatus: "paid",
    total: 89.99,
    items: 3,
    shippingAddress: "789 Boulevard Saint-Germain, Marseille",
  },
  {
    id: "ORD-004",
    customer: {
      name: "Sophie Bernard",
      email: "sophie.bernard@email.com",
    },
    date: "2024-01-14T14:20:00",
    status: "delivered",
    paymentStatus: "paid",
    total: 199.99,
    items: 1,
    shippingAddress: "321 Rue de Rivoli, Toulouse",
  },
  {
    id: "ORD-005",
    customer: {
      name: "Michel Leblanc",
      email: "michel.leblanc@email.com",
    },
    date: "2024-01-13T11:10:00",
    status: "cancelled",
    paymentStatus: "refunded",
    total: 459.99,
    items: 2,
    shippingAddress: "654 Place Bellecour, Nice",
  },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

const statusLabels = {
  pending: "En attente",
  confirmed: "Confirmée",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
}

const paymentStatusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
}

const paymentStatusLabels = {
  pending: "En attente",
  paid: "Payé",
  failed: "Échec",
  refunded: "Remboursé",
}

export function OrderList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter

    return matchesSearch && matchesStatus && matchesPayment
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-card-foreground">Liste des Commandes</CardTitle>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher par ID, nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Statut commande" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="confirmed">Confirmée</SelectItem>
              <SelectItem value="shipped">Expédiée</SelectItem>
              <SelectItem value="delivered">Livrée</SelectItem>
              <SelectItem value="cancelled">Annulée</SelectItem>
            </SelectContent>
          </Select>

          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Statut paiement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les paiements</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="paid">Payé</SelectItem>
              <SelectItem value="failed">Échec</SelectItem>
              <SelectItem value="refunded">Remboursé</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Commande</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Paiement</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-card-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.items} article{order.items > 1 ? "s" : ""}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-card-foreground">{order.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-card-foreground">{new Date(order.date).toLocaleDateString("fr-FR")}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                    {statusLabels[order.status as keyof typeof statusLabels]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={paymentStatusColors[order.paymentStatus as keyof typeof paymentStatusColors]}>
                    {paymentStatusLabels[order.paymentStatus as keyof typeof paymentStatusLabels]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <p className="font-medium text-card-foreground">€{order.total.toFixed(2)}</p>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/orders/${order.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Voir détails
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Télécharger facture
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
