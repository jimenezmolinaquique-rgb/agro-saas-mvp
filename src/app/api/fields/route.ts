
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireSession } from '@/lib/auth'

export async function GET() {
  try {
    const session = await requireSession()
    const farms = await prisma.farm.findMany({ where: { ownerId: session.userId }, include: { fields: true } })
    const fields = farms.flatMap(f => f.fields)
    return NextResponse.json(fields)
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 401 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireSession()
    const farm = await prisma.farm.findFirst({ where: { ownerId: session.userId } })
    if (!farm) throw new Error('Crea una finca primero (seed crea una por defecto)')
    const body = await req.json()
    const field = await prisma.field.create({
      data: { name: body.name, crop: body.crop, areaHa: Number(body.areaHa || 0), location: body.location || null, farmId: farm.id }
    })
    return NextResponse.json(field)
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
