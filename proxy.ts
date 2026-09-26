import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin')
  const isLoginPath = request.nextUrl.pathname === '/admin/login'

  if (isAdminPath && !isLoginPath) {
    const token = request.cookies.get('admin-token')?.value
    const validToken = process.env.ADMIN_DASHBOARD_PASSWORD

    if (!token || token !== validToken) {
      const url = new URL('/admin/login', request.url)
      return NextResponse.redirect(url)
    }
  }

  if (isLoginPath) {
    const token = request.cookies.get('admin-token')?.value
    const validToken = process.env.ADMIN_DASHBOARD_PASSWORD

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
