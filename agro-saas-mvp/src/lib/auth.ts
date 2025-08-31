
import { cookies } from 'next/headers'
import { verifyJWT } from './jwt'

export async function getSession() {
  const c = cookies()
  const token = c.get('token')?.value
  if (!token) return null
  try {
    const payload = await verifyJWT(token)
    return payload
  } catch {
    return null
  }
}

export async function requireSession() {
  const session = await getSession()
  if (!session) throw new Error('Unauthorized')
  return session
}
