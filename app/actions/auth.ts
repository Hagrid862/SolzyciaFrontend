'use server'

import { cookies } from 'next/headers'
import { json } from 'stream/consumers'

export async function login(
  username: string,
  password: string,
  remember: boolean
): Promise<{ isSuccess: boolean; status: string }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        remember: remember
      })
    })

    const data = await response.json()
    if (response.ok) {
      if (data.Status == '2FASENT') {
        return { isSuccess: true, status: 'SUCCESS' }
      } else {
        return { isSuccess: false, status: 'ERROR' }
      }
    } else {
      if (data.Status == 'INVALID') {
        return { isSuccess: false, status: 'INVALID' }
      } else {
        return { isSuccess: false, status: 'ERROR' }
      }
    }
  } catch {
    return { isSuccess: false, status: 'ERROR' }
  }
}

export async function verifyOtp(code: string): Promise<{ isSuccess: boolean; status: string; token?: string }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code: code })
    })

    const data = await response.json()
    if (response.ok && data.Access) {
      const cookieStore = cookies()

      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() + 30)
      cookieStore.set('access', data.Access, {
        expires: expiryDate,
        path: '/',
        httpOnly: true
      })

      if (data.Refresh) {
        cookieStore.set('refresh', data.Refresh, {
          expires: expiryDate,
          path: '/',
          httpOnly: true
        })
      }

      return { isSuccess: true, status: 'LOGGEDIN', token: data.Access }
    } else {
      if (data.Status == 'INVALID' || data.Status == 'NOTFOUND') {
        return { isSuccess: false, status: 'INVALID' }
      } else {
        return { isSuccess: false, status: 'ERROR' }
      }
    }
  } catch {
    return { isSuccess: false, status: 'ERROR' }
  }
}

export async function logout() {
  const cookieStore = cookies()
  cookieStore.delete('access')
  cookieStore.delete('refresh')
  console.log('logout')
}
