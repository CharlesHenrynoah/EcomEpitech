"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { FileText, Save, Eye, Edit, Calendar, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface LegalDocument {
  id: string
  title: string
  type: "mentions" | "privacy" | "cookies" | "terms" | "cgv"
  content: string
  lastUpdated: string
  updatedBy: string
  isPublished: boolean
  version: string
}

export function LegalDocuments() {
  const [activeDocument, setActiveDocument] = useState<string>("mentions")
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  // Mock data - replace with real API call
  const documents: LegalDocument[] = [
    {
      id: "mentions",
      title: "Mentions Légales",
      type: "mentions",
      content: `# Mentions Légales

## Éditeur du site
Nom de l'entreprise : [Votre Entreprise]
Forme juridique : [SARL/SAS/etc.]
Capital social : [Montant]
Siège social : [Adresse complète]
RCS : [Numéro RCS]
SIRET : [Numéro SIRET]
TVA : [Numéro TVA]

## Directeur de publication
[Nom du directeur de publication]

## Hébergement
Hébergeur : [Nom de l'hébergeur]
Adresse : [Adresse de l'hébergeur]`,
      lastUpdated: "2024-01-10T14:30:00Z",
      updatedBy: "Marie Dubois",
      isPublished: true,
      version: "1.2",
    },
    {
      id: "privacy",
      title: "Politique de Confidentialité",
      type: "privacy",
      content: `# Politique de Confidentialité

## Collecte des données
Nous collectons les données suivantes :
- Données d'identification (nom, prénom, email)
- Données de navigation (cookies, logs)
- Données de commande (historique d'achat)

## Utilisation des données
Vos données sont utilisées pour :
- Traitement des commandes
- Amélioration de nos services
- Communication commerciale (avec votre accord)

## Vos droits
Conformément au RGPD, vous disposez des droits suivants :
- Droit d'accès
- Droit de rectification
- Droit à l'effacement
- Droit à la portabilité`,
      lastUpdated: "2024-01-08T10:15:00Z",
      updatedBy: "Pierre Martin",
      isPublished: true,
      version: "2.1",
    },
    {
      id: "cookies",
      title: "Politique des Cookies",
      type: "cookies",
      content: `# Politique des Cookies

## Qu'est-ce qu'un cookie ?
Un cookie est un petit fichier texte stocké sur votre appareil lors de votre visite sur notre site.

## Types de cookies utilisés
- **Cookies essentiels** : Nécessaires au fonctionnement du site
- **Cookies analytiques** : Pour mesurer l'audience
- **Cookies publicitaires** : Pour personnaliser les publicités

## Gestion des cookies
Vous pouvez gérer vos préférences de cookies via notre centre de préférences.`,
      lastUpdated: "2024-01-05T16:45:00Z",
      updatedBy: "Sophie Laurent",
      isPublished: false,
      version: "1.0",
    },
    {
      id: "terms",
      title: "Conditions Générales d'Utilisation",
      type: "terms",
      content: `# Conditions Générales d'Utilisation

## Objet
Les présentes conditions générales d'utilisation régissent l'utilisation du site.

## Accès au site
L'accès au site est gratuit et ouvert à tous les utilisateurs.

## Responsabilités
L'utilisateur s'engage à utiliser le site de manière conforme à la loi.`,
      lastUpdated: "2024-01-12T09:20:00Z",
      updatedBy: "Jean Moreau",
      isPublished: true,
      version: "1.5",
    },
    {
      id: "cgv",
      title: "Conditions Générales de Vente",
      type: "cgv",
      content: `# Conditions Générales de Vente

## Article 1 - Objet
Les présentes conditions générales de vente régissent les relations contractuelles entre le vendeur et l'acheteur.

## Article 2 - Prix
Les prix sont indiqués en euros TTC.

## Article 3 - Commandes
Toute commande implique l'acceptation des présentes conditions.`,
      lastUpdated: "2024-01-15T11:30:00Z",
      updatedBy: "Marie Dubois",
      isPublished: true,
      version: "3.0",
    },
  ]

  const [editedContent, setEditedContent] = useState("")
  const [editedTitle, setEditedTitle] = useState("")

  const currentDocument = documents.find((doc) => doc.id === activeDocument)

  const handleEdit = () => {
    if (currentDocument) {
      setEditedContent(currentDocument.content)
      setEditedTitle(currentDocument.title)
      setIsEditing(true)
    }
  }

  const handleSave = () => {
    // API call to save document
    console.log("Saving document:", { id: activeDocument, title: editedTitle, content: editedContent })

    toast({
      title: "Document sauvegardé",
      description: "Les modifications ont été enregistrées avec succès",
    })

    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedContent("")
    setEditedTitle("")
  }

  const handlePublish = (documentId: string, publish: boolean) => {
    // API call to publish/unpublish document
    console.log("Toggle publish:", { documentId, publish })

    toast({
      title: publish ? "Document publié" : "Document dépublié",
      description: publish
        ? "Le document est maintenant visible publiquement"
        : "Le document n'est plus visible publiquement",
    })
  }

  const getDocumentIcon = (type: string) => {
    return <FileText className="h-4 w-4" />
  }

  if (!currentDocument) return null

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {/* Document List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg">Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {documents.map((doc) => (
            <Button
              key={doc.id}
              variant={activeDocument === doc.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveDocument(doc.id)}
            >
              {getDocumentIcon(doc.type)}
              <span className="ml-2 truncate">{doc.title}</span>
              {doc.isPublished && (
                <Badge variant="outline" className="ml-auto text-xs">
                  Publié
                </Badge>
              )}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Document Editor */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center space-x-2">
                {getDocumentIcon(currentDocument.type)}
                <span>{currentDocument.title}</span>
                <Badge variant={currentDocument.isPublished ? "default" : "secondary"}>
                  {currentDocument.isPublished ? "Publié" : "Brouillon"}
                </Badge>
              </CardTitle>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>Modifié le {new Date(currentDocument.lastUpdated).toLocaleDateString("fr-FR")}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>par {currentDocument.updatedBy}</span>
                </div>
                <Badge variant="outline">v{currentDocument.version}</Badge>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!isEditing ? (
                <>
                  <Button variant="outline" size="sm" onClick={handleEdit}>
                    <Edit className="mr-2 h-4 w-4" />
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Prévisualiser
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    Annuler
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre du document</Label>
                <Input id="title" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Contenu (Markdown supporté)</Label>
                <Textarea
                  id="content"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  rows={20}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-md">{currentDocument.content}</pre>
              </div>
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="publish"
                checked={currentDocument.isPublished}
                onCheckedChange={(checked) => handlePublish(currentDocument.id, checked)}
              />
              <Label htmlFor="publish">Publier ce document</Label>
            </div>
            <div className="text-sm text-muted-foreground">Version {currentDocument.version}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
