
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireSession } from '@/lib/auth'

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireSession()
    const rec = await prisma.record.findUnique({ where: { id: params.id }, include: { field: { include: { farm: true } } } })
    if (!rec || rec.field.farm.ownerId !== session.userId) throw new Error('No permitido')
    await prisma.record.delete({ where: { id: rec.id } })
    return NextResponse.json({ ok: true })
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
