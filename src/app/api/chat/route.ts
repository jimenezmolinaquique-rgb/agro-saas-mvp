
import { NextResponse } from 'next/server'
import { getOpenAI } from '@/lib/openai'
import { requireSession } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    await requireSession()
    const { prompt } = await req.json()
    const openai = getOpenAI()
    if (!openai) {
      // Respuesta simulada para desarrollo sin clave
      const simulated = `Plan básico para ${prompt}:
- Diagnóstico inicial (textura suelo, pH, conductividad).
- Programa de fertilización balanceada (NPK + Ca + Mg + micro).
- Riego por etapas fenológicas y clima.
- Seguimiento quincenal y ajuste por análisis de hoja.
(Para respuesta real, define OPENAI_API_KEY en .env)`
      return NextResponse.json({ answer: simulated })
    }
    const c = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Eres el mejor ingeniero agrónomo y asesor de cultivos. Responde con precisión y estructura.'},
        { role: 'user', content: prompt }
      ]
    })
    const answer = c.choices[0]?.message?.content || 'Sin respuesta'
    return NextResponse.json({ answer })
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
