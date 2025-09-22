import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



export type Product = {
  id: string
  name: string
  description: string
  price: number
  color: string
  gender: string
  category_id: string
  created_at: string
  updated_at: string
  created_by: string | null
  images: string[]
}




