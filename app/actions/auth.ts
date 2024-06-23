'use server'

import { LoginFormState, LoginFormSchema, VerifyOtpState, VerifyOtpSchema } from '@/app/lib/definitions'
import axios from 'axios'
import { cookies } from 'next/headers'

export async function login(formData: FormData): Promise<{ isSuccess: boolean; status: string }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
      method: 'POST',
      body: formData
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

export async function verifyOtp(formData: FormData): Promise<{ isSuccess: boolean; status: string }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/verify-otp`, {
      method: 'POST',
      body: formData
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

      return { isSuccess: true, status: 'SUCCESS' }
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

export async function logout() {
  const cookieStore = cookies()
  cookieStore.delete('access')
  cookieStore.delete('refresh')
  console.log('logout')
}
