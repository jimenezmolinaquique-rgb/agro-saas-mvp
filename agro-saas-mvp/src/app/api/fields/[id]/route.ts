
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireSession } from '@/lib/auth'

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireSession()
    // Ensure field belongs to user
    const field = await prisma.field.findUnique({ where: { id: params.id }, include: { farm: true } })
    if (!field || field.farm.ownerId !== session.userId) throw new Error('No permitido')
    await prisma.record.deleteMany({ where: { fieldId: field.id } })
    await prisma.field.delete({ where: { id: field.id } })
    return NextResponse.json({ ok: true })
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
