
import { SignJWT, jwtVerify } from 'jose'
const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'devsecret')
export type JWTPayload = { userId: string, email: string, role: 'USER' | 'ADMIN' }

export async function signJWT(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
}

export async function verifyJWT(token: string) {
  const { payload } = await jwtVerify(token, secret)
  return payload as JWTPayload
}
