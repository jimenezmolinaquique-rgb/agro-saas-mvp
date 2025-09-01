
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const pathname = req.nextUrl.pathname
  const publicPaths = ['/login','/api/auth/login','/api/auth/logout','/favicon.ico']
  const isPublic = publicPaths.some(p => pathname.startsWith(p)) || pathname === '/'
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return NextResponse.next()
}
export const config = { matcher: ['/((?!_next/static|_next/image|images|favicon.ico).*)'] }
