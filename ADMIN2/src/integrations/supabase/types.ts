export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string
          details: string | null
          id: string
          ip_address: unknown | null
          severity: string
          target: string
          user_email: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: string | null
          id?: string
          ip_address?: unknown | null
          severity?: string
          target: string
          user_email: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: string | null
          id?: string
          ip_address?: unknown | null
          severity?: string
          target?: string
          user_email?: string
          user_id?: string | null
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          cart_id: string
          created_at: string
          id: number
          product_id: string
          quantity: number
          variant_id: string | null
        }
        Insert: {
          cart_id: string
          created_at?: string
          id?: number
          product_id: string
          quantity: number
          variant_id?: string | null
        }
        Update: {
          cart_id?: string
          created_at?: string
          id?: number
          product_id?: string
          quantity?: number
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      carts: {
        Row: {
          created_at: string
          created_by: string | null
          customer_id: string | null
          id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          id?: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "carts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          image: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          avatar_url: string | null
          created_at: string
          created_by: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          password: string | null
          phone: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          created_by?: string | null
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          password?: string | null
          phone?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          created_by?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          password?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      legal_documents: {
        Row: {
          content: string | null
          created_at: string
          document_type: string
          id: string
          last_updated_by: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          document_type: string
          id?: string
          last_updated_by: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          document_type?: string
          id?: string
          last_updated_by?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: number
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          variant_id: string | null
        }
        Insert: {
          id?: number
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          variant_id?: string | null
        }
        Update: {
          id?: number
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          cart_id: string | null
          created_at: string
          created_by: string | null
          customer_id: string | null
          id: string
          payment_status: Database["public"]["Enums"]["payment_status_enum"]
          status: Database["public"]["Enums"]["order_status_enum"]
          total_amount: number
          updated_at: string
        }
        Insert: {
          cart_id?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          id?: string
          payment_status?: Database["public"]["Enums"]["payment_status_enum"]
          status?: Database["public"]["Enums"]["order_status_enum"]
          total_amount?: number
          updated_at?: string
        }
        Update: {
          cart_id?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          id?: string
          payment_status?: Database["public"]["Enums"]["payment_status_enum"]
          status?: Database["public"]["Enums"]["order_status_enum"]
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          created_at: string
          id: number
          position: number
          product_id: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: number
          position?: number
          product_id: string
          url: string
        }
        Update: {
          created_at?: string
          id?: number
          position?: number
          product_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          created_at: string
          id: string
          product_id: string
          size: string
          stock: number
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          size: string
          stock?: number
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          size?: string
          stock?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand: string
          category_id: string
          color: string | null
          created_at: string
          created_by: string | null
          description: string | null
          gender: Database["public"]["Enums"]["gender_enum"] | null
          id: string
          model_name: string
          price: number
          updated_at: string
        }
        Insert: {
          brand?: string
          category_id: string
          color?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          id?: string
          model_name: string
          price: number
          updated_at?: string
        }
        Update: {
          brand?: string
          category_id?: string
          color?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          id?: string
          model_name?: string
          price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      produits_valides: {
        Row: {
          brand: string | null
          category_name: string | null
          color: string | null
          created_at: string
          description: string | null
          gender: Database["public"]["Enums"]["gender_valid"]
          id: string
          model_name: string
          price: number
          source_domain: string
          source_url: string
          updated_at: string
          validated_at: string
        }
        Insert: {
          brand?: string | null
          category_name?: string | null
          color?: string | null
          created_at?: string
          description?: string | null
          gender?: Database["public"]["Enums"]["gender_valid"]
          id?: string
          model_name: string
          price?: number
          source_domain: string
          source_url: string
          updated_at?: string
          validated_at?: string
        }
        Update: {
          brand?: string | null
          category_name?: string | null
          color?: string | null
          created_at?: string
          description?: string | null
          gender?: Database["public"]["Enums"]["gender_valid"]
          id?: string
          model_name?: string
          price?: number
          source_domain?: string
          source_url?: string
          updated_at?: string
          validated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          customer_id: string | null
          id: number
          product_id: string
          rating: number
        }
        Insert: {
          comment?: string | null
          created_at?: string
          customer_id?: string | null
          id?: number
          product_id: string
          rating: number
        }
        Update: {
          comment?: string | null
          created_at?: string
          customer_id?: string | null
          id?: number
          product_id?: string
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      scraper_runs: {
        Row: {
          completed_at: string | null
          created_at: string
          duration_seconds: number | null
          error_message: string | null
          id: string
          is_dry_run: boolean | null
          limit_set: number | null
          products_added: number | null
          products_found: number | null
          source_domain: string
          started_at: string
          status: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          duration_seconds?: number | null
          error_message?: string | null
          id?: string
          is_dry_run?: boolean | null
          limit_set?: number | null
          products_added?: number | null
          products_found?: number | null
          source_domain: string
          started_at?: string
          status?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          duration_seconds?: number | null
          error_message?: string | null
          id?: string
          is_dry_run?: boolean | null
          limit_set?: number | null
          products_added?: number | null
          products_found?: number | null
          source_domain?: string
          started_at?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          id: number
          motdepasse: string | null
          name: string | null
          number: number | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          motdepasse?: string | null
          name?: string | null
          number?: number | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          motdepasse?: string | null
          name?: string | null
          number?: number | null
        }
        Relationships: []
      }
      users_gestion: {
        Row: {
          created_at: string
          email: string
          id: number
          last_login: string | null
          motdepasse: string | null
          name: string | null
          role: string
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          last_login?: string | null
          motdepasse?: string | null
          name?: string | null
          role: string
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          last_login?: string | null
          motdepasse?: string | null
          name?: string | null
          role?: string
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_customer_cascade: {
        Args: { p_customer_id: string }
        Returns: undefined
      }
      get_user_real_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_moderator_or_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_real_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      log_audit_action: {
        Args: {
          p_action: string
          p_details?: string
          p_severity?: string
          p_target: string
        }
        Returns: undefined
      }
    }
    Enums: {
      gender_enum: "homme" | "femme" | "enfant" | "unisexe"
      gender_valid: "homme" | "femme" | "enfant" | "unisexe"
      order_status_enum:
        | "pending"
        | "confirmed"
        | "shipped"
        | "delivered"
        | "cancelled"
      payment_status_enum: "pending" | "paid" | "refunded"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      gender_enum: ["homme", "femme", "enfant", "unisexe"],
      gender_valid: ["homme", "femme", "enfant", "unisexe"],
      order_status_enum: [
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
      ],
      payment_status_enum: ["pending", "paid", "refunded"],
    },
  },
} as const
