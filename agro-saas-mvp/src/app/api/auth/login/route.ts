
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import { signJWT } from '@/lib/jwt'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 401 })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 })
    const token = await signJWT({ userId: user.id, email: user.email, role: user.role as any })
    const res = NextResponse.json({ ok: true })
    res.headers.set('Set-Cookie', `token=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${7*24*3600}`)
    return res
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
