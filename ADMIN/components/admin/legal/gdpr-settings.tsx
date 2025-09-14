"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Cookie, Download, Trash2, User, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UserRequest {
  id: string
  userId: string
  userName: string
  email: string
  type: "access" | "rectification" | "deletion" | "portability"
  status: "pending" | "processing" | "completed" | "rejected"
  requestDate: string
  completedDate?: string
  notes?: string
}

export function GdprSettings() {
  const [dpoEmail, setDpoEmail] = useState("dpo@example.com")
  const [cookieBannerEnabled, setCookieBannerEnabled] = useState(true)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true)
  const [marketingEnabled, setMarketingEnabled] = useState(false)
  const { toast } = useToast()

  // Mock data for user requests
  const userRequests: UserRequest[] = [
    {
      id: "req-001",
      userId: "user-123",
      userName: "Marie Dubois",
      email: "marie.dubois@example.com",
      type: "access",
      status: "pending",
      requestDate: "2024-01-15T10:30:00Z",
      notes: "Demande d'accès aux données personnelles",
    },
    {
      id: "req-002",
      userId: "user-456",
      userName: "Pierre Martin",
      email: "pierre.martin@example.com",
      type: "deletion",
      status: "processing",
      requestDate: "2024-01-14T14:20:00Z",
      notes: "Demande de suppression de compte",
    },
    {
      id: "req-003",
      userId: "user-789",
      userName: "Sophie Laurent",
      email: "sophie.laurent@example.com",
      type: "portability",
      status: "completed",
      requestDate: "2024-01-12T09:15:00Z",
      completedDate: "2024-01-13T16:30:00Z",
      notes: "Export des données effectué",
    },
  ]

  const getRequestTypeBadge = (type: string) => {
    const variants = {
      access: "bg-blue-100 text-blue-800 border-blue-200",
      rectification: "bg-yellow-100 text-yellow-800 border-yellow-200",
      deletion: "bg-red-100 text-red-800 border-red-200",
      portability: "bg-green-100 text-green-800 border-green-200",
    }

    const labels = {
      access: "Accès",
      rectification: "Rectification",
      deletion: "Suppression",
      portability: "Portabilité",
    }

    return (
      <Badge variant="outline" className={variants[type as keyof typeof variants]}>
        {labels[type as keyof typeof labels]}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-orange-100 text-orange-800 border-orange-200",
      processing: "bg-blue-100 text-blue-800 border-blue-200",
      completed: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
    }

    const labels = {
      pending: "En attente",
      processing: "En cours",
      completed: "Terminé",
      rejected: "Rejeté",
    }

    return (
      <Badge variant="outline" className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  const handleSaveSettings = () => {
    // API call to save GDPR settings
    console.log("Saving GDPR settings:", {
      dpoEmail,
      cookieBannerEnabled,
      analyticsEnabled,
      marketingEnabled,
    })

    toast({
      title: "Paramètres sauvegardés",
      description: "Les paramètres RGPD ont été mis à jour",
    })
  }

  const handleProcessRequest = (requestId: string, action: string) => {
    // API call to process user request
    console.log("Processing request:", { requestId, action })

    toast({
      title: "Demande traitée",
      description: `La demande a été ${action === "approve" ? "approuvée" : "rejetée"}`,
    })
  }

  const handleExportUserData = (userId: string) => {
    // API call to export user data
    console.log("Exporting data for user:", userId)

    toast({
      title: "Export en cours",
      description: "Les données utilisateur sont en cours d'export",
    })
  }

  return (
    <div className="space-y-6">
      {/* GDPR Configuration */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Configuration RGPD</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dpo-email">Email du DPO (Délégué à la Protection des Données)</Label>
              <Input
                id="dpo-email"
                type="email"
                value={dpoEmail}
                onChange={(e) => setDpoEmail(e.target.value)}
                placeholder="dpo@example.com"
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium">Paramètres de Consentement</h4>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bannière de cookies</Label>
                  <p className="text-sm text-muted-foreground">Afficher la bannière de consentement</p>
                </div>
                <Switch checked={cookieBannerEnabled} onCheckedChange={setCookieBannerEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cookies analytiques par défaut</Label>
                  <p className="text-sm text-muted-foreground">Activer les cookies d'analyse par défaut</p>
                </div>
                <Switch checked={analyticsEnabled} onCheckedChange={setAnalyticsEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cookies marketing par défaut</Label>
                  <p className="text-sm text-muted-foreground">Activer les cookies marketing par défaut</p>
                </div>
                <Switch checked={marketingEnabled} onCheckedChange={setMarketingEnabled} />
              </div>
            </div>

            <Button onClick={handleSaveSettings} className="w-full">
              Sauvegarder les paramètres
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Cookie className="h-5 w-5" />
              <span>Centre de Préférences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="banner-text">Texte de la bannière</Label>
              <Textarea
                id="banner-text"
                rows={3}
                defaultValue="Nous utilisons des cookies pour améliorer votre expérience sur notre site. Vous pouvez accepter tous les cookies ou gérer vos préférences."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="privacy-link">Lien vers la politique de confidentialité</Label>
              <Input id="privacy-link" defaultValue="/legal/privacy-policy" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cookie-link">Lien vers la politique des cookies</Label>
              <Input id="cookie-link" defaultValue="/legal/cookie-policy" />
            </div>

            <Button variant="outline" className="w-full bg-transparent">
              Prévisualiser la bannière
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* User Rights Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Demandes de Droits Utilisateurs</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Type de demande</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date de demande</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{request.userName}</div>
                      <div className="text-sm text-muted-foreground">{request.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getRequestTypeBadge(request.type)}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{new Date(request.requestDate).toLocaleDateString("fr-FR")}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{request.notes}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {request.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleProcessRequest(request.id, "approve")}
                          >
                            Approuver
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleProcessRequest(request.id, "reject")}
                          >
                            Rejeter
                          </Button>
                        </>
                      )}
                      {request.type === "access" && (
                        <Button size="sm" variant="outline" onClick={() => handleExportUserData(request.userId)}>
                          <Download className="mr-1 h-3 w-3" />
                          Export
                        </Button>
                      )}
                      {request.type === "deletion" && request.status === "completed" && (
                        <Button size="sm" variant="outline" onClick={() => handleExportUserData(request.userId)}>
                          <Trash2 className="mr-1 h-3 w-3" />
                          Supprimer
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
