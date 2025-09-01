
'use client'
import { useEffect, useState } from 'react'

type Field = {
  id: string; name: string; crop: string; areaHa: number; location?: string
}

export default function ParcelsPage() {
  const [fields, setFields] = useState<Field[]>([])
  const [form, setForm] = useState({ name: '', crop: '', areaHa: 1, location: '' })
  const [loading, setLoading] = useState(false)
  const load = async () => {
    const r = await fetch('/api/fields')
    if (r.ok) setFields(await r.json())
  }
  useEffect(() => { load() }, [])

  const submit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/fields', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
    setForm({ name:'', crop:'', areaHa:1, location:'' })
    setLoading(false)
    load()
  }

  const del = async (id: string) => {
    await fetch(`/api/fields/${id}`, { method:'DELETE' })
    load()
  }

  return (
    <div className="mt-6 grid md:grid-cols-2 gap-6">
      <div className="card p-5">
        <h2 className="text-xl font-semibold mb-3">Tus Parcelas</h2>
        <table className="table w-full text-sm">
          <thead><tr><th>Nombre</th><th>Crop</th><th>Ha</th><th>Ubicación</th><th></th></tr></thead>
          <tbody>
            {fields.map(f => (
              <tr key={f.id}>
                <td>{f.name}</td><td>{f.crop}</td><td>{f.areaHa}</td><td>{f.location || '-'}</td>
                <td><button className="text-red-300" onClick={()=>del(f.id)}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card p-5">
        <h2 className="text-xl font-semibold mb-3">Nueva Parcela</h2>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="label">Nombre</label>
            <input className="input" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required/>
          </div>
          <div>
            <label className="label">Cultivo</label>
            <input className="input" value={form.crop} onChange={e=>setForm({...form, crop:e.target.value})} required/>
          </div>
          <div>
            <label className="label">Área (ha)</label>
            <input type="number" step="0.01" className="input" value={form.areaHa} onChange={e=>setForm({...form, areaHa:Number(e.target.value)})} required/>
          </div>
          <div>
            <label className="label">Ubicación</label>
            <input className="input" value={form.location} onChange={e=>setForm({...form, location:e.target.value})}/>
          </div>
          <button className="btn" disabled={loading}>{loading?'Guardando...':'Crear'}</button>
        </form>
      </div>
    </div>
  )
}
