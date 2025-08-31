
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) return <div>Acceso denegado</div>
  const farms = await prisma.farm.findMany({ where: { ownerId: session.userId }, include: { fields: true } })
  const totalFields = farms.reduce((acc,f)=>acc + f.fields.length, 0)
  return (
    <div className="grid md:grid-cols-3 gap-4 mt-6">
      <div className="card p-5">
        <h2 className="text-xl font-semibold">Bienvenido</h2>
        <p className="opacity-80 mt-2">Usuario: {session.email}</p>
        <p className="opacity-80">Fincas: {farms.length} · Parcelas: {totalFields}</p>
      </div>
      <div className="card p-5">
        <h2 className="text-xl font-semibold">Siguientes pasos</h2>
        <ul className="list-disc ml-5 mt-2 opacity-90">
          <li>Crear/editar parcelas</li>
          <li>Registrar labores (siembra, fertilización, riego…)</li>
          <li>Probar el Asistente IA</li>
        </ul>
      </div>
      <div className="card p-5">
        <h2 className="text-xl font-semibold">Estado</h2>
        <p className="opacity-80 mt-2">MVP funcional con Auth + CRUD + IA básica.</p>
      </div>
    </div>
  )
}
