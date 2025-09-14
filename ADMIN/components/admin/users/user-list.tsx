"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, UserCheck, UserX, Shield, Eye } from "lucide-react"
import Link from "next/link"

interface User {
  id: string
  name: string
  email: string
  role: "customer" | "moderator" | "admin"
  status: "active" | "inactive"
  lastLogin: string
  createdAt: string
  avatar?: string
}

export function UserList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Mock data - replace with real API call
  const users: User[] = [
    {
      id: "1",
      name: "Marie Dubois",
      email: "marie.dubois@example.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-15T10:30:00Z",
      createdAt: "2023-06-15T09:00:00Z",
      avatar: "/admin-avatar.png",
    },
    {
      id: "2",
      name: "Pierre Martin",
      email: "pierre.martin@example.com",
      role: "moderator",
      status: "active",
      lastLogin: "2024-01-14T16:45:00Z",
      createdAt: "2023-08-20T14:30:00Z",
    },
    {
      id: "3",
      name: "Sophie Laurent",
      email: "sophie.laurent@example.com",
      role: "customer",
      status: "inactive",
      lastLogin: "2024-01-10T08:15:00Z",
      createdAt: "2023-12-01T11:20:00Z",
    },
    {
      id: "4",
      name: "Jean Moreau",
      email: "jean.moreau@example.com",
      role: "customer",
      status: "active",
      lastLogin: "2024-01-15T12:00:00Z",
      createdAt: "2024-01-05T16:45:00Z",
    },
  ]

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: "bg-red-100 text-red-800 border-red-200",
      moderator: "bg-blue-100 text-blue-800 border-blue-200",
      customer: "bg-gray-100 text-gray-800 border-gray-200",
    }

    const labels = {
      admin: "Administrateur",
      moderator: "Modérateur",
      customer: "Client",
    }

    return (
      <Badge variant="outline" className={variants[role as keyof typeof variants]}>
        {labels[role as keyof typeof labels]}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
        Actif
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
        Inactif
      </Badge>
    )
  }

  const handleToggleStatus = (userId: string, currentStatus: string) => {
    // API call to toggle user status
    console.log(`Toggle status for user ${userId} from ${currentStatus}`)
  }

  const handleChangeRole = (userId: string, newRole: string) => {
    // API call to change user role
    console.log(`Change role for user ${userId} to ${newRole}`)
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des Utilisateurs</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les rôles</SelectItem>
              <SelectItem value="admin">Administrateur</SelectItem>
              <SelectItem value="moderator">Modérateur</SelectItem>
              <SelectItem value="customer">Client</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="inactive">Inactif</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Dernière connexion</TableHead>
              <TableHead>Date d'inscription</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>{new Date(user.lastLogin).toLocaleDateString("fr-FR")}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString("fr-FR")}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/users/${user.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Voir détails
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleToggleStatus(user.id, user.status)}>
                        {user.status === "active" ? (
                          <>
                            <UserX className="mr-2 h-4 w-4" />
                            Désactiver
                          </>
                        ) : (
                          <>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Activer
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleChangeRole(user.id, "admin")}
                        disabled={user.role === "admin"}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Promouvoir Admin
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
