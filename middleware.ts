'use server';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from 'axios'
import { cookies } from 'next/headers'

export async function middleware(req: NextRequest) {
  const baseUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}`;
  const loginUrl = new URL('/admin-area', baseUrl);
  const url = req.nextUrl.clone();

  if (
    url.pathname === '/admin-area' ||
    url.pathname === '/admin-area/verify' ||
    url.pathname === '/admin-area/forgot-password'
  ) {
    return NextResponse.next();
  }

  try {
    const cookieStore = cookies();
    const access = cookieStore.get('access');
    const refresh = cookieStore.get('refresh');
    if (!access) {
      console.log('no access token');
      return NextResponse.redirect(loginUrl);
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/token/verify`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access}`
      }
    });

    console.log("verify status: " + response.status);

    if (response.status !== 200) {
      console.log('invalid access token');
      return NextResponse.redirect(loginUrl);
    }

    const data = await response.json();

    if (data.Status !== 'VALID') {
      const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/token/refresh`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${refresh}`
        }
      });

      if (refreshResponse.status !== 200) {
        console.log('invalid refresh token');
        return NextResponse.redirect(loginUrl);
      }

      const refreshData = await refreshResponse.json();
      console.log(refreshData);
      if (refreshData.refresh && refreshData.access) {
        cookieStore.set('refresh', refreshData.access, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        });
        cookieStore.set('access', refreshData.access, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        });
        if (
          url.pathname === '/admin-area' ||
          url.pathname === '/admin-area/verify' ||
          url.pathname === '/admin-area/forgot-password'
        ) {
          const adminAreaUrl = new URL('/admin-area/dashboard', baseUrl);
          return NextResponse.redirect(adminAreaUrl);
        }
        return NextResponse.next();
      } else {
        console.log('no refresh token');
        return NextResponse.redirect(loginUrl);
      }
    } else {
      if (
        url.pathname === '/admin-area' ||
        url.pathname === '/admin-area/verify' ||
        url.pathname === '/admin-area/forgot-password'
      ) {
        const adminAreaUrl = new URL('/admin-area/dashboard', baseUrl);
        return NextResponse.redirect(adminAreaUrl);
      }
      return NextResponse.next();
    }
  } catch (e) {
    console.log(e);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: '/admin-area/:path*'
};