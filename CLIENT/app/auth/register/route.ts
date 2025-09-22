import { NextResponse } from "next/server"
import { supabaseClient } from "@/lib/supabaseClient"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, phone, password } = body

  const hashedPassword = await bcrypt.hash(password, 10)

  const { data, error } = await supabaseClient
    .from("users")
    .insert([{ name, email, phone, password: hashedPassword }])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ user: data })
}
