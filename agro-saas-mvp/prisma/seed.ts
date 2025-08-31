
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: { email: 'admin@example.com', name: 'Admin', passwordHash, role: 'ADMIN' }
  })
  const farm = await prisma.farm.create({
    data: { name: 'Finca Demo', ownerId: admin.id }
  })
  const field = await prisma.field.create({
    data: { name: 'Parcela 1', crop: 'Ajo', areaHa: 3.5, location: 'Albacete', farmId: farm.id }
  })
  await prisma.record.createMany({
    data: [
      { date: new Date(), type: 'SIEMBRA', product: 'Semilla Ajo', dose: 120, units: 'kg/ha', notes: 'Uniforme', fieldId: field.id },
      { date: new Date(), type: 'FERTILIZACION', product: 'Humiagrar V', dose: 30, units: 'L/ha', notes: 'Fondo', fieldId: field.id },
    ]
  })
  console.log('Seed completado. Usuario: admin@example.com / admin123')
}

main().finally(async () => prisma.$disconnect())
