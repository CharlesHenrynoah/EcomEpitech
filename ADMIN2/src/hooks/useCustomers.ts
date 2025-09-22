import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Customer, UserGestion, CustomerFilters } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

export const useCustomers = (filters?: CustomerFilters) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from('customers').select('*');

      // Apply filters
      if (filters?.search) {
        query = query.or(`first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setCustomers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des clients');
      toast({
        title: "Erreur",
        description: "Impossible de charger les clients",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [filters]);

  return {
    customers,
    loading,
    error,
    refetch: fetchCustomers,
  };
};

export const useUsersGestion = (filters?: CustomerFilters) => {
  const [users, setUsers] = useState<UserGestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from('users_gestion').select('*');

      // Apply filters
      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
      }
      
      if (filters?.role) {
        query = query.eq('role', filters.role);
      }
      
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        // Si erreur de permissions, ne pas relancer en boucle
        if (error.code === '42501' || error.message.includes('permission denied')) {
          console.warn('Permission denied for users_gestion table');
          setUsers([]);
          setError('Accès refusé à la gestion des utilisateurs');
          setLoading(false);
          return;
        }
        throw error;
      }

      setUsers(data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des utilisateurs');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [filters?.search, filters?.role, filters?.status]);

  const updateUserRole = async (userId: string, role: string) => {
    try {
      const { data, error } = await supabase
        .from('users_gestion')
        .update({ role })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Rôle utilisateur mis à jour",
      });

      fetchUsers();
      return data;
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le rôle",
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateUserStatus = async (userId: string, status: string) => {
    try {
      const { data, error } = await supabase
        .from('users_gestion')
        .update({ status })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Statut utilisateur mis à jour",
      });

      fetchUsers();
      return data;
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
    updateUserRole,
    updateUserStatus,
  };
};