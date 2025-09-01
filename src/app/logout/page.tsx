
'use client'
import { useEffect } from 'react'

export default function LogoutPage() {
  useEffect(() => {
    fetch('/api/auth/logout', { method: 'POST' }).then(()=>{
      window.location.href = '/login'
    })
  }, [])
  return <div className="mt-10 text-center">Cerrando sesión...</div>
}
