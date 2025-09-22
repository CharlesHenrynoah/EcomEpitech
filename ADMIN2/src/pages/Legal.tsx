import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, FileText, Shield, Users, ShoppingCart, BookOpen, Gavel, Cookie } from 'lucide-react';
import { useLegalDocuments } from '@/hooks/useLegalDocuments';
import { usePermissions } from '@/hooks/usePermissions';
import { LegalDocument } from '@/types/database';

const getDocumentIcon = (type: string) => {
  switch (type) {
    case 'mentions': return <FileText className="w-4 h-4" />;
    case 'privacy': return <Shield className="w-4 h-4" />;
    case 'cookies': return <Cookie className="w-4 h-4" />;
    case 'terms': return <BookOpen className="w-4 h-4" />;
    case 'dpo': return <Gavel className="w-4 h-4" />;
    default: return <FileText className="w-4 h-4" />;
  }
};

const getDocumentLabel = (type: string) => {
  switch (type) {
    case 'mentions': return 'Mentions Légales';
    case 'privacy': return 'Politique de Confidentialité';
    case 'cookies': return 'Politique des Cookies';
    case 'terms': return 'Conditions d\'Utilisation';
    case 'dpo': return 'Contact DPO';
    default: return type;
  }
};

function DocumentEditor({ document, onSave, canEdit }: {
  document: LegalDocument;
  onSave: (id: string, updates: Partial<LegalDocument>) => Promise<void>;
  canEdit: boolean;
}) {
  const [title, setTitle] = useState(document.title);
  const [content, setContent] = useState(document.content || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave(document.id, { title, content });
    setSaving(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        {getDocumentIcon(document.document_type)}
        <Badge variant="secondary">{getDocumentLabel(document.document_type)}</Badge>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 block">Titre</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={!canEdit}
          placeholder="Titre du document"
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Contenu</label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={!canEdit}
          placeholder="Contenu du document légal..."
          className="min-h-[400px]"
        />
      </div>

      {canEdit && (
        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </Button>
      )}

      <div className="text-xs text-muted-foreground">
        Dernière mise à jour: {new Date(document.updated_at).toLocaleString('fr-FR')}
      </div>
    </div>
  );
}

export default function Legal() {
  const { documents, loading, updateDocument } = useLegalDocuments();
  const { canEditLegal } = usePermissions();

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  const mentions = documents.find(d => d.document_type === 'mentions');
  const privacy = documents.find(d => d.document_type === 'privacy');
  const cookies = documents.find(d => d.document_type === 'cookies');
  const terms = documents.find(d => d.document_type === 'terms');
  const dpo = documents.find(d => d.document_type === 'dpo');

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold">Gestion Légale & RGPD</h1>
        </div>
        <p className="text-muted-foreground">
          Gérez vos documents légaux et votre conformité RGPD
        </p>
        {!canEditLegal && (
          <Badge variant="outline" className="mt-2">
            Lecture seule - Seuls les administrateurs peuvent modifier
          </Badge>
        )}
      </div>

      <Tabs defaultValue="mentions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="mentions" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Mentions
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Confidentialité
          </TabsTrigger>
          <TabsTrigger value="cookies" className="flex items-center gap-2">
            <Cookie className="w-4 h-4" />
            Cookies
          </TabsTrigger>
          <TabsTrigger value="terms" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            CGU
          </TabsTrigger>
          <TabsTrigger value="dpo" className="flex items-center gap-2">
            <Gavel className="w-4 h-4" />
            DPO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mentions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Mentions Légales
              </CardTitle>
              <CardDescription>
                Informations légales obligatoires sur votre site web
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mentions && (
                <DocumentEditor
                  document={mentions}
                  onSave={updateDocument}
                  canEdit={canEditLegal}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Politique de Confidentialité
              </CardTitle>
              <CardDescription>
                Politique de protection des données personnelles
              </CardDescription>
            </CardHeader>
            <CardContent>
              {privacy && (
                <DocumentEditor
                  document={privacy}
                  onSave={updateDocument}
                  canEdit={canEditLegal}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cookies">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="w-5 h-5" />
                Politique des Cookies
              </CardTitle>
              <CardDescription>
                Gestion et utilisation des cookies sur votre site
              </CardDescription>
            </CardHeader>
            <CardContent>
              {cookies && (
                <DocumentEditor
                  document={cookies}
                  onSave={updateDocument}
                  canEdit={canEditLegal}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="terms">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Conditions Générales d'Utilisation
              </CardTitle>
              <CardDescription>
                Règles d'utilisation de votre service
              </CardDescription>
            </CardHeader>
            <CardContent>
              {terms && (
                <DocumentEditor
                  document={terms}
                  onSave={updateDocument}
                  canEdit={canEditLegal}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dpo">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="w-5 h-5" />
                Contact DPO
              </CardTitle>
              <CardDescription>
                Informations de contact du Délégué à la Protection des Données
              </CardDescription>
            </CardHeader>
            <CardContent>
              {dpo && (
                <DocumentEditor
                  document={dpo}
                  onSave={updateDocument}
                  canEdit={canEditLegal}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}