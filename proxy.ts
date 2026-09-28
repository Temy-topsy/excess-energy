import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin')
  const isLoginPath = request.nextUrl.pathname === '/admin/login'

  const INACTIVITY_TIMEOUT_MS = 60 * 1000

  if (isAdminPath && !isLoginPath) {
    const token = request.cookies.get('admin-token')?.value
    const validToken = process.env.ADMIN_DASHBOARD_PASSWORD

    if (!token || token !== validToken) {
      const url = new URL('/admin/login', request.url)
      return NextResponse.redirect(url)
    }

    const lastActive = request.cookies.get('admin-last-active')?.value
    if (lastActive) {
      const elapsed = Date.now() - Number(lastActive)
      if (elapsed > INACTIVITY_TIMEOUT_MS) {
        const url = new URL('/admin/login?reason=inactivity', request.url)
        const response = NextResponse.redirect(url)
        response.cookies.delete('admin-token')
        response.cookies.delete('admin-last-active')
        return response
      }
    }
  }

  if (isLoginPath) {
    const token = request.cookies.get('admin-token')?.value
    const validToken = process.env.ADMIN_DASHBOARD_PASSWORD
    const lastActive = request.cookies.get('admin-last-active')?.value

    if (lastActive && Date.now() - Number(lastActive) > INACTIVITY_TIMEOUT_MS) {
      const response = NextResponse.next()
      response.cookies.delete('admin-token')
      response.cookies.delete('admin-last-active')
      return response
    }

    if (token && token === validToken) {
      const url = new URL('/admin/packages', request.url)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
