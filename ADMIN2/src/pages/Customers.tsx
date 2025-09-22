import { useState, useMemo } from 'react';
import { Search, UserCheck, UserX, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCustomers, useUsersGestion } from '@/hooks/useCustomers';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import { CustomerFilters, UserRole } from '@/types/database';
export default function Customers() {
  const navigate = useNavigate();
  const {
    userGestion
  } = useAuth();
  const {
    canEditUserRoles,
    canDeactivateUsers,
    isAdmin
  } = usePermissions();
  const [filters, setFilters] = useState<CustomerFilters>({});
  const memoizedFilters = useMemo(() => filters, [filters.search, filters.role, filters.status]);
  const {
    customers,
    loading: customersLoading
  } = useCustomers(memoizedFilters);
  const {
    users,
    loading: usersLoading,
    updateUserRole,
    updateUserStatus
  } = useUsersGestion(memoizedFilters);
  const handleRoleChange = async (userId: string, role: string) => {
    if (canEditUserRoles) {
      await updateUserRole(userId, role);
    }
  };
  const handleStatusToggle = async (userId: string, currentStatus: string) => {
    if (canDeactivateUsers) {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await updateUserStatus(userId, newStatus);
    }
  };
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'moderator':
        return 'secondary';
      default:
        return 'outline';
    }
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Utilisateurs</h1>
          <p className="text-muted-foreground">Gérer les clients et utilisateurs du système</p>
        </div>
      </div>

      

      

      <Card>
        <CardHeader>
          <CardTitle>
            Clients (e-commerce)
            <Badge variant="secondary" className="ml-2">
              {customers.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {customersLoading ? <div className="text-center py-4">Chargement...</div> : <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Créé le</TableHead>
                  <TableHead>Créé par</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map(customer => <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {customer.avatar_url && <img src={customer.avatar_url} alt="Avatar" className="w-8 h-8 rounded-full" />}
                        <div>
                          <div className="font-medium">
                            {customer.first_name} {customer.last_name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {customer.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {customer.phone || 'Non renseigné'}
                    </TableCell>
                    <TableCell>
                      {new Date(customer.created_at).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {customer.created_by ? 'Staff' : 'Auto-inscription'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/customers/${customer.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Voir détails
                      </Button>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>}
        </CardContent>
      </Card>
    </div>;
}