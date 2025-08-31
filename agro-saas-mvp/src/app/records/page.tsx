
'use client'
import { useEffect, useState } from 'react'
import jsPDF from 'jspdf'

type Field = { id: string, name: string }
type Rec = {
  id: string; date: string; type: string; product?: string; dose?: number; units?: string; notes?: string; fieldId: string; field?: Field
}

export default function RecordsPage() {
  const [records, setRecords] = useState<Rec[]>([])
  const [fields, setFields] = useState<Field[]>([])
  const [form, setForm] = useState({ date: new Date().toISOString().slice(0,10), type:'SIEMBRA', product:'', dose:0, units:'', notes:'', fieldId:'' })

  const load = async () => {
    const rr = await fetch('/api/records')
    const rf = await fetch('/api/fields')
    if (rr.ok) setRecords(await rr.json())
    if (rf.ok) {
      const f = await rf.json()
      setFields(f)
      if (!form.fieldId && f[0]) setForm(s => ({...s, fieldId: f[0].id}))
    }
  }
  useEffect(()=>{ load() }, [])

  const submit = async (e:any) => {
    e.preventDefault()
    await fetch('/api/records', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
    setForm(s=>({...s, product:'', dose:0, units:'', notes:''}))
    load()
  }

  const del = async (id:string) => {
    await fetch(`/api/records/${id}`, { method:'DELETE' })
    load()
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Informe de Registros', 14, 20)
    doc.setFontSize(11)
    let y = 30
    records.forEach(r => {
      const line = `${new Date(r.date).toLocaleDateString()} | ${r.type} | ${r.product || '-'} | ${r.dose || '-'} ${r.units||''} | ${r.notes || ''} | Parcela: ${r.field?.name || r.fieldId}`
      doc.text(line, 14, y)
      y += 8
      if (y > 280) { doc.addPage(); y = 20 }
    })
    doc.save('registros.pdf')
  }

  return (
    <div className="mt-6 grid md:grid-cols-2 gap-6">
      <div className="card p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold mb-3">Registros</h2>
          <button className="btn" onClick={exportPDF}>Exportar PDF</button>
        </div>
        <table className="table w-full text-sm">
          <thead><tr><th>Fecha</th><th>Tipo</th><th>Producto</th><th>Dosis</th><th>Notas</th><th>Parcela</th><th></th></tr></thead>
          <tbody>
            {records.map(r=> (
              <tr key={r.id}>
                <td>{new Date(r.date).toLocaleDateString()}</td>
                <td>{r.type}</td>
                <td>{r.product || '-'}</td>
                <td>{r.dose || '-'} {r.units||''}</td>
                <td>{r.notes || '-'}</td>
                <td>{r.field?.name || r.fieldId}</td>
                <td><button className="text-red-300" onClick={()=>del(r.id)}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card p-5">
        <h2 className="text-xl font-semibold mb-3">Nuevo Registro</h2>
        <form onSubmit={submit} className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="label">Parcela</label>
            <select className="input" value={form.fieldId} onChange={e=>setForm({...form, fieldId:e.target.value})}>
              {fields.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Fecha</label>
            <input type="date" className="input" value={form.date} onChange={e=>setForm({...form, date:e.target.value})}/>
          </div>
          <div>
            <label className="label">Tipo</label>
            <select className="input" value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
              {['SIEMBRA','FERTILIZACION','RIEGO','TRATAMIENTO','COSECHA','OTRO'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Producto</label>
            <input className="input" value={form.product} onChange={e=>setForm({...form, product:e.target.value})}/>
          </div>
          <div>
            <label className="label">Dosis</label>
            <input type="number" step="0.01" className="input" value={form.dose} onChange={e=>setForm({...form, dose:Number(e.target.value)})}/>
          </div>
          <div>
            <label className="label">Unidades</label>
            <input className="input" value={form.units} onChange={e=>setForm({...form, units:e.target.value})}/>
          </div>
          <div className="col-span-2">
            <label className="label">Notas</label>
            <input className="input" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})}/>
          </div>
          <button className="btn col-span-2">Guardar</button>
        </form>
      </div>
    </div>
  )
}
