
'use client'
import { useState } from 'react'

export default function AssistantPage() {
  const [q, setQ] = useState('Diseña un plan de fertilización para ajo (3.5 ha) en Albacete.')
  const [a, setA] = useState('')
  const [loading, setLoading] = useState(false)
  const ask = async () => {
    setLoading(true); setA('')
    const r = await fetch('/api/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ prompt: q }) })
    const j = await r.json()
    setA(j.answer)
    setLoading(false)
  }
  return (
    <div className="max-w-3xl mx-auto mt-8 card p-6">
      <h1 className="text-2xl font-bold mb-3">Asistente IA</h1>
      <textarea className="input h-28" value={q} onChange={e=>setQ(e.target.value)} />
      <div className="mt-3">
        <button className="btn" onClick={ask} disabled={loading}>{loading?'Pensando...':'Preguntar'}</button>
      </div>
      {a && <pre className="mt-4 bg-black/30 p-3 rounded text-sm whitespace-pre-wrap">{a}</pre>}
    </div>
  )
}
