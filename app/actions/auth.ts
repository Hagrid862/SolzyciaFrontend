'use server'

import { LoginFormState, LoginFormSchema, VerifyOtpState, VerifyOtpSchema } from '@/app/lib/definitions'
import axios from 'axios'
import { cookies } from 'next/headers'

export async function login(state: LoginFormState, action: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    username: action.get('username'),
    password: action.get('password')
  })

  if (!validatedFields.success) {
    return {
      errors: {
        username: validatedFields.error.errors.filter((e) => e.path[0] == 'username').map((e) => e.message),
        password: validatedFields.error.errors.filter((e) => e.path[0] == 'password').map((e) => e.message)
      },
      message: undefined
    }
  }

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
      username: action.get('username'),
      password: action.get('password'),
      remember: action.get('remember') == '1'
    })

    if (response.status == 200) {
      return {
        errors: undefined,
        message: 'SUCCESS'
      }
    } else {
      return {
        errors: undefined,
        message: 'ERROR'
      }
    }
  } catch (e: any) {
    const data = e.response.data
    if (data.message == 'Invalid username or password') {
      return {
        errors: undefined,
        message: 'INVALID_CREDENTIALS'
      }
    } else {
      return {
        errors: undefined,
        message: 'ERROR'
      }
    }
  }
}

// export async function verifyOtp(state: VerifyOtpState, action: FormData) {
export async function verifyOtp(state: VerifyOtpState, action: FormData) {
  const validatedFields = VerifyOtpSchema.safeParse({
    otp: action.get('otp')
  })

  if (!validatedFields.success) {
    return {
      errors: {
        otp: validatedFields.error.errors.filter((e) => e.path[0] == 'otp').map((e) => e.message)
      },
      message: undefined
    }
  }
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/verify-otp`, {
      code: action.get('otp')
    })

    if (response.status == 200) {
      const data = response.data

      const cookieStore = cookies()

      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() + 30)

      if (data.refresh) {
        cookieStore.set('refresh', data.access, {
          expires: expiryDate,
          path: '/',
          httpOnly: true
        })
      }

      cookieStore.set('access', data.access, {
        expires: expiryDate,
        path: '/',
        httpOnly: true
      })

      return {
        errors: undefined,
        message: 'SUCCESS'
      }
    } else {
      return {
        errors: undefined,
        message: 'ERROR'
      }
    }
  } catch (e: any) {
    const data = e.response.data
    if (data.message == 'Invalid code') {
      return {
        errors: undefined,
        message: 'INVALID_CODE'
      }
    } else {
      return {
        errors: undefined,
        message: 'ERROR'
      }
    }
  }
}

export async function logout() {
  const cookieStore = cookies()
  cookieStore.delete('access')
  cookieStore.delete('refresh')
  console.log('logout')
}
