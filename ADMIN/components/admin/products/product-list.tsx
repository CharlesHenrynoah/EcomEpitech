"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Trash2, Eye, MoreHorizontal, Star } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

const sneakers = [
  {
    id: "1",
    modelName: "Air Jordan 1 Retro High",
    sku: "AJ1-RH-BRD-001",
    genre: "Homme",
    sneakerType: "Basketball",
    price: 179.99,
    rating: 5,
    availableSizes: ["40", "41", "42", "43", "44"],
    status: "active",
    image: "/air-jordan-1-sneaker.jpg",
  },
  {
    id: "2",
    modelName: "Nike Air Max 90",
    sku: "NAM90-WHT-002",
    genre: "Femme",
    sneakerType: "Lifestyle",
    price: 129.99,
    rating: 4,
    availableSizes: ["36", "37", "38", "39"],
    status: "active",
    image: "/nike-air-max-90-white-sneaker.jpg",
  },
  {
    id: "3",
    modelName: "Adidas Stan Smith",
    sku: "ASS-GRN-003",
    genre: "Unisexe",
    sneakerType: "Casual",
    price: 89.99,
    rating: 4,
    availableSizes: [],
    status: "inactive",
    image: "/adidas-stan-smith-green-sneaker.jpg",
  },
]

export function ProductList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [genreFilter, setGenreFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredSneakers = sneakers.filter((sneaker) => {
    const matchesSearch =
      sneaker.modelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sneaker.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || sneaker.status === statusFilter
    const matchesGenre = genreFilter === "all" || sneaker.genre === genreFilter
    const matchesType = typeFilter === "all" || sneaker.sneakerType === typeFilter

    return matchesSearch && matchesStatus && matchesGenre && matchesType
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-slate-900">Catalogue Baskets</CardTitle>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
            <Input
              placeholder="Rechercher par modèle ou SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="inactive">Inactif</SelectItem>
            </SelectContent>
          </Select>

          <Select value={genreFilter} onValueChange={setGenreFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les genres</SelectItem>
              <SelectItem value="Homme">Homme</SelectItem>
              <SelectItem value="Femme">Femme</SelectItem>
              <SelectItem value="Enfant">Enfant</SelectItem>
              <SelectItem value="Unisexe">Unisexe</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="Running">Running</SelectItem>
              <SelectItem value="Basketball">Basketball</SelectItem>
              <SelectItem value="Lifestyle">Lifestyle</SelectItem>
              <SelectItem value="Casual">Casual</SelectItem>
              <SelectItem value="Training">Training</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Modèle</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Tailles</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSneakers.map((sneaker) => (
              <TableRow key={sneaker.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <img
                      src={sneaker.image || "/placeholder.svg"}
                      alt={sneaker.modelName}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium text-slate-900">{sneaker.modelName}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">{sneaker.sku}</TableCell>
                <TableCell>{sneaker.genre}</TableCell>
                <TableCell>{sneaker.sneakerType}</TableCell>
                <TableCell>€{sneaker.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3 w-3 ${
                            star <= sneaker.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate-600">({sneaker.rating})</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={sneaker.availableSizes.length === 0 ? "destructive" : "default"}>
                    {sneaker.availableSizes.length === 0 ? "Rupture" : `${sneaker.availableSizes.length} tailles`}
                  </Badge>
                  {sneaker.availableSizes.length > 0 && (
                    <div className="text-xs text-slate-500 mt-1">
                      {sneaker.availableSizes.slice(0, 3).join(", ")}
                      {sneaker.availableSizes.length > 3 && "..."}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={sneaker.status === "active" ? "default" : "secondary"}>
                    {sneaker.status === "active" ? "Actif" : "Inactif"}
                  </Badge>
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
                        <Link href={`/admin/products/${sneaker.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Voir
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/products/${sneaker.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
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
