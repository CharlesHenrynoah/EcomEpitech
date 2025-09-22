-- Fix RLS policies for customers table to allow admin access
DROP POLICY IF EXISTS "p_select_auth" ON public.customers;
DROP POLICY IF EXISTS "p_insert_auth" ON public.customers;
DROP POLICY IF EXISTS "p_update_auth" ON public.customers;
DROP POLICY IF EXISTS "p_delete_auth" ON public.customers;

-- Create new policies that allow admin and moderator access
CREATE POLICY "Real admins and moderators can manage customers" 
ON public.customers 
FOR ALL 
USING (is_moderator_or_admin());

CREATE POLICY "Real admins and moderators can insert customers" 
ON public.customers 
FOR INSERT 
WITH CHECK (is_moderator_or_admin());