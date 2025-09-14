"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Trash2, Eye, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

// Mock data
const categories = [
  {
    id: "1",
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Baskets lifestyle pour le quotidien et la mode urbaine",
    productCount: 45,
    status: "active",
    parent: null,
  },
  {
    id: "2",
    name: "Basketball",
    slug: "basketball",
    description: "Baskets de basketball pour la performance sur terrain",
    productCount: 32,
    status: "active",
    parent: null,
  },
  {
    id: "3",
    name: "Running",
    slug: "running",
    description: "Chaussures de course pour tous types de coureurs",
    productCount: 28,
    status: "active",
    parent: null,
  },
  {
    id: "4",
    name: "Casual",
    slug: "casual",
    description: "Baskets décontractées pour un usage quotidien",
    productCount: 38,
    status: "active",
    parent: null,
  },
  {
    id: "5",
    name: "Training",
    slug: "training",
    description: "Chaussures d'entraînement et de fitness",
    productCount: 22,
    status: "active",
    parent: null,
  },
  {
    id: "6",
    name: "Skateboarding",
    slug: "skateboarding",
    description: "Baskets spécialement conçues pour le skateboard",
    productCount: 15,
    status: "active",
    parent: null,
  },
]

export function CategoryList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-card-foreground">Liste des Catégories</CardTitle>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher une catégorie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Parent</TableHead>
              <TableHead>Produits</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-card-foreground">{category.name}</p>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">{category.slug}</TableCell>
                <TableCell>
                  {category.parent ? (
                    <Badge variant="outline">{category.parent}</Badge>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{category.productCount} produits</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={category.status === "active" ? "default" : "secondary"}>
                    {category.status === "active" ? "Actif" : "Inactif"}
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
                        <Link href={`/admin/categories/${category.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Voir
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/categories/${category.id}/edit`}>
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
