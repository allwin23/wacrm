import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Bypass auth: redirect auth pages directly to /dashboard
  if (
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname === '/signup' ||
    request.nextUrl.pathname === '/forgot-password'
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return NextResponse.next({ request })
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
