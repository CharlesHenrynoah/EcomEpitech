"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Calendar, Clock, Shield, Settings, Activity, ShoppingBag } from "lucide-react"

interface UserDetailsProps {
  userId: string
}

export function UserDetails({ userId }: UserDetailsProps) {
  const [userRole, setUserRole] = useState("customer")
  const [isActive, setIsActive] = useState(true)

  // Mock data - replace with real API call
  const user = {
    id: userId,
    name: "Marie Dubois",
    email: "marie.dubois@example.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-15T10:30:00Z",
    createdAt: "2023-06-15T09:00:00Z",
    avatar: "/admin-avatar.png",
    phone: "+33 1 23 45 67 89",
    address: "123 Rue de la Paix, 75001 Paris",
    totalOrders: 24,
    totalSpent: 1250.5,
    permissions: {
      canViewProducts: true,
      canEditProducts: true,
      canDeleteProducts: false,
      canViewOrders: true,
      canEditOrders: true,
      canViewUsers: true,
      canEditUsers: false,
      canAccessScraper: true,
      canViewLogs: true,
    },
  }

  const recentActivity = [
    {
      id: "1",
      action: "Connexion au système",
      timestamp: "2024-01-15T10:30:00Z",
      details: "Connexion depuis 192.168.1.100",
    },
    {
      id: "2",
      action: "Modification produit",
      timestamp: "2024-01-15T09:45:00Z",
      details: 'Produit "iPhone 15 Case" modifié',
    },
    {
      id: "3",
      action: "Changement de statut commande",
      timestamp: "2024-01-15T09:30:00Z",
      details: 'Commande #12345 passée en "shipped"',
    },
  ]

  const handleSaveChanges = () => {
    // API call to save user changes
    console.log("Saving user changes:", { role: userRole, active: isActive })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="text-lg">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant={user.status === "active" ? "default" : "secondary"}>
                  {user.status === "active" ? "Actif" : "Inactif"}
                </Badge>
                <Badge variant="outline">
                  {user.role === "admin" ? "Administrateur" : user.role === "moderator" ? "Modérateur" : "Client"}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">Informations</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activité</TabsTrigger>
          <TabsTrigger value="orders">Commandes</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Informations Personnelles</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Inscrit le {new Date(user.createdAt).toLocaleDateString("fr-FR")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Dernière connexion: {new Date(user.lastLogin).toLocaleDateString("fr-FR")}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Paramètres du Compte</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Rôle</Label>
                  <Select value={userRole} onValueChange={setUserRole}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Client</SelectItem>
                      <SelectItem value="moderator">Modérateur</SelectItem>
                      <SelectItem value="admin">Administrateur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="active" checked={isActive} onCheckedChange={setIsActive} />
                  <Label htmlFor="active">Compte actif</Label>
                </div>
                <Button onClick={handleSaveChanges} className="w-full">
                  Sauvegarder les modifications
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Permissions Détaillées</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-medium">Gestion des Produits</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Voir les produits</Label>
                      <Switch checked={user.permissions.canViewProducts} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Modifier les produits</Label>
                      <Switch checked={user.permissions.canEditProducts} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Supprimer les produits</Label>
                      <Switch checked={user.permissions.canDeleteProducts} />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Gestion des Commandes</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Voir les commandes</Label>
                      <Switch checked={user.permissions.canViewOrders} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Modifier les commandes</Label>
                      <Switch checked={user.permissions.canEditOrders} />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Gestion des Utilisateurs</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Voir les utilisateurs</Label>
                      <Switch checked={user.permissions.canViewUsers} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Modifier les utilisateurs</Label>
                      <Switch checked={user.permissions.canEditUsers} />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Outils Avancés</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Accès au scraper</Label>
                      <Switch checked={user.permissions.canAccessScraper} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Voir les logs</Label>
                      <Switch checked={user.permissions.canViewLogs} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Activité Récente</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={activity.id}>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.details}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString("fr-FR")}
                        </p>
                      </div>
                    </div>
                    {index < recentActivity.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5" />
                <span>Historique des Commandes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{user.totalOrders}</div>
                  <div className="text-sm text-muted-foreground">Commandes totales</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{user.totalSpent.toFixed(2)}€</div>
                  <div className="text-sm text-muted-foreground">Montant total dépensé</div>
                </div>
              </div>
              <p className="text-muted-foreground">L'historique détaillé des commandes sera affiché ici.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
