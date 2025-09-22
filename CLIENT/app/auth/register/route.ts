import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic"; // 🔥 empêche la pré-génération

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 });
    }

    // ⚠️ mot de passe stocké en clair (pour test uniquement)
    const { data, error } = await supabaseServer
      .from("users")
      .insert([{ name, email, phone, password }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ user: data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
