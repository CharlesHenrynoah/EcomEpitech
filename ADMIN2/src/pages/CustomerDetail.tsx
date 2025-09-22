import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Trash2, Edit, User, ShoppingCart, Package, Shield, Calendar, Euro } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useCustomerDetail } from '@/hooks/useCustomerDetail';
import { usePermissions } from '@/hooks/usePermissions';

export default function CustomerDetail() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { isAdmin, canDeactivateUsers } = usePermissions();
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    customer,
    gdprData,
    loading,
    error,
    exportCustomerData,
    deleteCustomerData,
    updateGDPRConsent,
  } = useCustomerDetail(customerId || '');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">Chargement des détails client...</div>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-destructive">
          Erreur lors du chargement du client
        </div>
      </div>
    );
  }

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const jsonData = await exportCustomerData();
      
      // Download as file
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `client-${customer.email}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteCustomerData();
      navigate('/customers');
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'secondary',
      confirmed: 'default',
      shipped: 'default',
      delivered: 'default',
      cancelled: 'destructive',
      paid: 'default',
      failed: 'destructive',
      refunded: 'secondary',
    } as const;

    return variants[status as keyof typeof variants] || 'outline';
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: 'En attente',
      confirmed: 'Confirmée',
      shipped: 'Expédiée',
      delivered: 'Livrée',
      cancelled: 'Annulée',
      paid: 'Payé',
      failed: 'Échoué',
      refunded: 'Remboursé',
    } as const;

    return texts[status as keyof typeof texts] || status;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/customers')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {customer.first_name} {customer.last_name}
            </h1>
            <p className="text-muted-foreground">{customer.email}</p>
          </div>
        </div>

        {isAdmin && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport} disabled={isExporting}>
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? 'Export...' : 'Exporter données'}
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isDeleting}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Supprimer définitivement ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action supprimera définitivement toutes les données de ce client.
                    Cette action ne peut pas être annulée.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Supprimer définitivement
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes totales</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customer.stats.totalOrders}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total dépensé</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customer.stats.totalSpent.toFixed(2)} €</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dernière commande</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              {customer.stats.lastOrderDate 
                ? new Date(customer.stats.lastOrderDate).toLocaleDateString('fr-FR')
                : 'Aucune commande'
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Panier actif</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              {customer.activeCart 
                ? `${customer.activeCart.items.length} articles`
                : 'Aucun panier'
              }
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">Informations</TabsTrigger>
          <TabsTrigger value="orders">Commandes</TabsTrigger>
          <TabsTrigger value="cart">Panier</TabsTrigger>
          <TabsTrigger value="gdpr">RGPD</TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Données personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Prénom</label>
                  <p>{customer.first_name || 'Non renseigné'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Nom</label>
                  <p>{customer.last_name || 'Non renseigné'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p>{customer.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Téléphone</label>
                  <p>{customer.phone || 'Non renseigné'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Créé le</label>
                  <p>{new Date(customer.created_at).toLocaleDateString('fr-FR')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Créé par</label>
                  <Badge variant="outline">
                    {customer.created_by ? 'Staff' : 'Auto-inscription'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders History */}
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des commandes</CardTitle>
            </CardHeader>
            <CardContent>
              {customer.orders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Aucune commande pour ce client
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Numéro</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Paiement</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Articles</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customer.orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-sm">
                          #{order.id.slice(-8)}
                        </TableCell>
                        <TableCell>
                          {new Date(order.created_at).toLocaleDateString('fr-FR')}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadge(order.status)}>
                            {getStatusText(order.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadge(order.payment_status)}>
                            {getStatusText(order.payment_status)}
                          </Badge>
                        </TableCell>
                        <TableCell>{Number(order.total_amount).toFixed(2)} €</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {order.items.map((item, index) => (
                              <div key={index} className="text-sm">
                                {item.product.brand} {item.product.model_name}
                                {item.variant && ` (${item.variant.size})`}
                                <span className="text-muted-foreground"> × {item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Cart */}
        <TabsContent value="cart" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Panier actuel</CardTitle>
            </CardHeader>
            <CardContent>
              {!customer.activeCart || customer.activeCart.items.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Aucun panier actif pour ce client
                </div>
              ) : (
                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produit</TableHead>
                        <TableHead>Variante</TableHead>
                        <TableHead>Quantité</TableHead>
                        <TableHead>Prix unitaire</TableHead>
                        <TableHead>Sous-total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customer.activeCart.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {item.product.brand} {item.product.model_name}
                          </TableCell>
                          <TableCell>
                            {item.variant?.size || 'Standard'}
                          </TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{Number(item.product.price).toFixed(2)} €</TableCell>
                          <TableCell>
                            {(item.quantity * Number(item.product.price)).toFixed(2)} €
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total du panier :</span>
                    <span className="text-lg font-bold">
                      {customer.activeCart.items
                        .reduce((sum, item) => sum + (item.quantity * Number(item.product.price)), 0)
                        .toFixed(2)} €
                    </span>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Panier créé le {new Date(customer.activeCart.created_at).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* GDPR */}
        <TabsContent value="gdpr" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Gestion RGPD
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Consentements */}
              <div>
                <h4 className="font-medium mb-4">Consentements</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Cookies</p>
                      <p className="text-sm text-muted-foreground">
                        Consentement pour l'utilisation des cookies
                      </p>
                    </div>
                    <Switch
                      checked={gdprData.consentCookies}
                      onCheckedChange={(checked) => updateGDPRConsent('cookies', checked)}
                      disabled={!isAdmin}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing</p>
                      <p className="text-sm text-muted-foreground">
                        Consentement pour recevoir des emails marketing
                      </p>
                    </div>
                    <Switch
                      checked={gdprData.consentMarketing}
                      onCheckedChange={(checked) => updateGDPRConsent('marketing', checked)}
                      disabled={!isAdmin}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Historique des droits exercés */}
              <div>
                <h4 className="font-medium mb-4">Droits exercés</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Droit d'accès (export des données)</span>
                    <span className="text-sm text-muted-foreground">
                      {gdprData.dataExported 
                        ? `Exercé le ${new Date(gdprData.dataExported).toLocaleDateString('fr-FR')}`
                        : 'Jamais exercé'
                      }
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Droit de rectification</span>
                    <span className="text-sm text-muted-foreground">
                      {gdprData.dataRectified 
                        ? `Exercé le ${new Date(gdprData.dataRectified).toLocaleDateString('fr-FR')}`
                        : 'Jamais exercé'
                      }
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Droit à l'effacement</span>
                    <span className="text-sm text-muted-foreground">
                      {gdprData.dataDeleted 
                        ? `Exercé le ${new Date(gdprData.dataDeleted).toLocaleDateString('fr-FR')}`
                        : 'Jamais exercé'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}