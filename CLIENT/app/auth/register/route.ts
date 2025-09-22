import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"

export const dynamic = "force-dynamic" // évite que Next.js essaie de pré-générer

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const supabase = createRouteHandlerClient({ cookies })

    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, phone, password: hashedPassword }])
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({ user: data }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
