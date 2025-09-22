import { Tables, TablesInsert, TablesUpdate, Enums } from '@/integrations/supabase/types';

// Core Database Types
export type Product = Tables<'products'> & {
  category: Category;
  variants: ProductVariant[];
  images: ProductImage[];
  reviews: Review[];
};

export type Category = Tables<'categories'>;
export type ProductVariant = Tables<'product_variants'>;
export type ProductImage = Tables<'product_images'>;
export type Review = Tables<'reviews'>;

// Order Management
export type Cart = Tables<'carts'> & {
  items: CartItem[];
  customer?: Customer;
};

export type CartItem = Tables<'cart_items'> & {
  product: Product;
  variant?: ProductVariant;
};

export type Order = Tables<'orders'> & {
  items: OrderItem[];
  customer?: Customer;
  cart?: Cart;
};

export type OrderItem = Tables<'order_items'> & {
  product: Product;
  variant?: ProductVariant;
};

export type Customer = Tables<'customers'>;

// User Management
export type Profile = Tables<'profiles'>;
export type UserGestion = Tables<'users_gestion'>;

// Content Management
export type LegalDocument = Tables<'legal_documents'>;
export type AuditLog = Tables<'audit_logs'>;

// Scraper System
export type ScraperRun = Tables<'scraper_runs'>;
export type ProduitsValides = Tables<'produits_valides'>;

// Insert/Update Types
export type ProductInsert = TablesInsert<'products'>;
export type ProductUpdate = TablesUpdate<'products'>;
export type CategoryInsert = TablesInsert<'categories'>;
export type CategoryUpdate = TablesUpdate<'categories'>;
export type OrderInsert = TablesInsert<'orders'>;
export type OrderUpdate = TablesUpdate<'orders'>;
export type CustomerInsert = TablesInsert<'customers'>;
export type CustomerUpdate = TablesUpdate<'customers'>;

// Enums
export type GenderEnum = Enums<'gender_enum'>;
export type OrderStatusEnum = Enums<'order_status_enum'>;
export type PaymentStatusEnum = Enums<'payment_status_enum'>;

// User Role Type from users_gestion
export type UserRole = 'admin' | 'moderator' | 'customer';

// Filter Types
export interface ProductFilters {
  search?: string;
  category_id?: string;
  gender?: GenderEnum;
  min_price?: number;
  max_price?: number;
  in_stock?: boolean;
}

export interface OrderFilters {
  status?: OrderStatusEnum;
  payment_status?: PaymentStatusEnum;
  customer_id?: string;
  date_from?: string;
  date_to?: string;
}

export interface CustomerFilters {
  search?: string;
  role?: UserRole;
  status?: 'active' | 'inactive';
}

// Dashboard Stats
export interface DashboardStats {
  totalProducts: number;
  lowStockProducts: number;
  todayOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  monthlyRevenue: number;
}