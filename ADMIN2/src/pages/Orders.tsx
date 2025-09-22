import { useState } from 'react';
import { Eye, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useOrders } from '@/hooks/useOrders';
import { OrderFilters, OrderStatusEnum, PaymentStatusEnum } from '@/types/database';

const statusLabels: Record<OrderStatusEnum, string> = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
};

const statusColors: Record<OrderStatusEnum, string> = {
  pending: 'warning',
  confirmed: 'info',
  shipped: 'success',
  delivered: 'success',
  cancelled: 'destructive',
};

const paymentStatusLabels: Record<PaymentStatusEnum, string> = {
  pending: 'En attente',
  paid: 'Payé',
  refunded: 'Remboursé',
};

const paymentStatusColors: Record<PaymentStatusEnum, string> = {
  pending: 'warning',
  paid: 'success',
  refunded: 'destructive',
};

export default function Orders() {
  const [filters, setFilters] = useState<OrderFilters>({
    status: undefined,
    payment_status: undefined,
    date_from: undefined,
    date_to: undefined,
  });
  const { orders, loading, updateOrderStatus, updatePaymentStatus } = useOrders(filters);

  const handleStatusChange = async (orderId: string, status: OrderStatusEnum) => {
    await updateOrderStatus(orderId, status);
  };

  const handlePaymentStatusChange = async (orderId: string, paymentStatus: PaymentStatusEnum) => {
    await updatePaymentStatus(orderId, paymentStatus);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Commandes</h1>
          <p className="text-muted-foreground">Gérer toutes les commandes clients</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select
              value={filters.status || 'all'}
              onValueChange={(value) => 
                setFilters({ ...filters, status: value === 'all' ? undefined : value as OrderStatusEnum })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Statut commande" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                {Object.entries(statusLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.payment_status || 'all'}
              onValueChange={(value) => 
                setFilters({ ...filters, payment_status: value === 'all' ? undefined : value as PaymentStatusEnum })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Statut paiement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les paiements</SelectItem>
                {Object.entries(paymentStatusLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="date"
              placeholder="Date début"
              value={filters.date_from || ''}
              onChange={(e) => setFilters({ ...filters, date_from: e.target.value })}
            />

            <Input
              type="date"
              placeholder="Date fin"
              value={filters.date_to || ''}
              onChange={(e) => setFilters({ ...filters, date_to: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Liste des commandes
            <Badge variant="secondary" className="ml-2">
              {orders.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Chargement...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N° Commande</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Paiement</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono">
                      #{order.id.slice(-8)}
                    </TableCell>
                    <TableCell>
                      {order.customer ? (
                        <div>
                          <div className="font-medium">
                            {order.customer.first_name} {order.customer.last_name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {order.customer.email}
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Client supprimé</span>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatPrice(order.total_amount)}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value as OrderStatusEnum)}
                      >
                        <SelectTrigger className="w-32">
                          <Badge variant={statusColors[order.status] as any}>
                            {statusLabels[order.status]}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(statusLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.payment_status}
                        onValueChange={(value) => handlePaymentStatusChange(order.id, value as PaymentStatusEnum)}
                      >
                        <SelectTrigger className="w-32">
                          <Badge variant={paymentStatusColors[order.payment_status] as any}>
                            {paymentStatusLabels[order.payment_status]}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(paymentStatusLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}