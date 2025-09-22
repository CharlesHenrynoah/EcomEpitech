import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const { data: user, error } = await supabaseServer
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password) // ⚠️ comparaison directe (pas sécurisé)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 400 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
