
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireSession } from '@/lib/auth'

export async function GET() {
  try {
    const session = await requireSession()
    const farms = await prisma.farm.findMany({ where: { ownerId: session.userId }, include: { fields: true } })
    const fieldIds = farms.flatMap(f => f.fields.map(ff=>ff.id))
    const records = await prisma.record.findMany({ where: { fieldId: { in: fieldIds } }, include: { field: true }, orderBy: { date: 'desc' } })
    return NextResponse.json(records)
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 401 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireSession()
    const b = await req.json()
    // Validate field belongs to user
    const field = await prisma.field.findUnique({ where: { id: b.fieldId }, include: { farm: true } })
    if (!field || field.farm.ownerId !== session.userId) throw new Error('Parcela inválida')
    const rec = await prisma.record.create({
      data: {
        date: new Date(b.date || Date.now()),
        type: b.type,
        product: b.product || null,
        dose: b.dose !== undefined ? Number(b.dose) : null,
        units: b.units || null,
        notes: b.notes || null,
        fieldId: field.id
      }
    })
    return NextResponse.json(rec)
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
