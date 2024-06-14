import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from 'axios'
import { cookies } from 'next/headers'

export async function middleware(req: NextRequest) {
  const loginUrl = req.nextUrl.clone()
  loginUrl.pathname = '/admin-area'
  const url = req.nextUrl.clone()

  if (
    url.pathname === '/admin-area' ||
    url.pathname === '/admin-area/verify' ||
    url.pathname === '/admin-area/forgot-password'
  ) {
    return NextResponse.next()
  }

  try {
    const cookieStore = cookies()
    const access = cookieStore.get('access')
    if (!access) {
      console.log('no access token')
      return NextResponse.redirect('/admin-area')
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/token/verify`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access}`
      }
    })

    if (response.status !== 200) {
      return NextResponse.redirect('/admin-area')
    }

    const data = await response.json()

    if (!data.isValid) {
      const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/token/refresh`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access}`
        }
      })

      if (refreshResponse.status !== 200) {
        return NextResponse.redirect('/admin-area')
      }

      const refreshData = await refreshResponse.json()

      if (refreshData.refresh && refreshData.access) {
        cookieStore.set('refresh', refreshData.access, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        })
        cookieStore.set('access', refreshData.access, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        })
        if (
          url.pathname === '/admin-area' ||
          url.pathname === '/admin-area/verify' ||
          url.pathname === '/admin-area/forgot-password'
        ) {
          return NextResponse.redirect('/admin-area/dashboard')
        }
        return NextResponse.next()
      } else {
        return NextResponse.redirect('/admin-area')
      }
    } else {
      if (
        url.pathname === '/admin-area' ||
        url.pathname === '/admin-area/verify' ||
        url.pathname === '/admin-area/forgot-password'
      ) {
        const adminAreaUrl = req.nextUrl.clone()
        adminAreaUrl.pathname = '/admin-area/dashboard'
        return NextResponse.redirect(adminAreaUrl)
      }
      return NextResponse.next()
    }
  } catch (e) {
    console.log(e)
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = '/admin-area'
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: '/admin-area/:path*'
}
