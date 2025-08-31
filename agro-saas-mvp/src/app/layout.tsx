
import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Agro SaaS MVP',
  description: 'Gestión agrícola con IA - MVP'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <nav className="w-full border-b border-gray-700 bg-[#0f172a]/60 sticky top-0 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg">🌱 {process.env.NEXT_PUBLIC_APP_NAME || 'Agro SaaS'}</Link>
            <div className="flex gap-4 text-sm">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/parcels">Parcelas</Link>
              <Link href="/records">Registros</Link>
              <Link href="/assistant">Asistente IA</Link>
              <Link href="/logout">Salir</Link>
            </div>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  )
}
