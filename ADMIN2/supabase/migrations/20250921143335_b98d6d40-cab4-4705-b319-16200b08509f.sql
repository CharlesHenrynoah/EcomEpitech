-- Add password field to customers table
ALTER TABLE public.customers 
ADD COLUMN password text NULL;