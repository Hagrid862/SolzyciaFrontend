'use server'

import { Category } from '@/models/Category';
import { cookies } from 'next/headers'

export async function createCategory(formData: FormData): Promise<{ isSuccess: boolean; message: string }> {
  try {
    const cookiesStorage = cookies()

    const token = cookiesStorage.get('access')

    if (token === null) {
      return {
        isSuccess: false,
        message: 'NOTOKEN'
      }
    }

    let object: {} = {
      name: formData.get('name'),
      description: formData.get('description'),
      icon: formData.get('icon')
    }
    const json = JSON.stringify(object)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token!.value}`
      },
      body: json
    })

    if (response.status == 200) {
      return {
        isSuccess: true,
        message: 'SUCCESS'
      }
    } else {
      return {
        isSuccess: false,
        message: 'ERROR'
      }
    }
  } catch (e: any) {
    return {
      isSuccess: false,
      message: 'ERROR'
    }
  }
}

export async function fetchCategories(): Promise<{isSuccess: boolean, status: string, data: Category[]}> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status == 200) {
      const data = await response.json()
      return {
        isSuccess: true,
        status: 'SUCCESS',
        data: data.Categories
      }
    } else {
      return {
        isSuccess: false,
        status: 'ERROR',
        data: []
      }
    }
  } catch (e: any) {
    return {
      isSuccess: false,
      status: 'ERROR',
      data: []
    }
  }
}

export async function updateCategory(categoryId: string, formData: FormData): Promise<{ isSuccess: boolean; status: string }> {
  try {
    const cookiesStorage = cookies()

    const token = cookiesStorage.get('access')

    if (token === null) {
      return {
        isSuccess: false,
        status: 'NOTOKEN'
      }
    }

    let object: {} = {
      id: categoryId,
      name: formData.get('name'),
      description: formData.get('description'),
      icon: formData.get('icon')
    }
    const json = JSON.stringify(object)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token!.value}`
      },
      body: json
    })

    if (response.status == 200) {
      return {
        isSuccess: true,
        status: 'SUCCESS'
      }
    } else {
      return {
        isSuccess: false,
        status: 'ERROR'
      }
    }
  }
  catch (e: any) {
    return {
      isSuccess: false,
      status: 'ERROR'
    }
  }
}

export async function removeCategory(categoryId: string): Promise<{ isSuccess: boolean, status: string }> {
  try {
    const cookiesStorage = cookies()

    const token = cookiesStorage.get('access')

    if (token === null) {
      return {
        isSuccess: false,
        status: 'NOTOKEN'
      }
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${categoryId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token!.value}`
      }
    })

    if (response.status == 200) {
      return {
        isSuccess: true,
        status: 'SUCCESS'
      }
    } else {
      return {
        isSuccess: false,
        status: 'ERROR'
      }
    }
  } catch (e: any) {
    return {
      isSuccess: false,
      status: 'ERROR'
    }
  }
}
