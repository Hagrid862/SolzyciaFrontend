'use server'

import { Product } from '@/models/Product'
import { cookies } from 'next/headers'

export async function fetchProducts(
  reviews?: boolean,
  orderBy?: 'created_at' | 'price' | 'name' | 'rating' | 'popularity',
  order?: 'desc' | 'asc',
  page?: number,
  limit?: number
): Promise<{ isSuccess: boolean; status: string; products: Product[] | null }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product${reviews || orderBy || order || page || limit ? '?' : ''}${reviews ? 'reviews=true' : ''}${orderBy ? `&orderBy=${orderBy}` : ''}${order ? `&order=${order}` : ''}${page ? `&page=${page}` : ''}${limit ? `&limit=${limit}` : ''}`
    )

    const data = await response.json()

    if (response.status === 200) {
      console.log(data)
      if (data.Products) {
        return { isSuccess: true, status: 'SUCCESS', products: data.Products as Product[] }
      } else {
        return { isSuccess: false, status: 'ERROR', products: null }
      }
    } else {
      if (data.Status === 'NOTFOUND') {
        return { isSuccess: false, status: 'NOTFOUND', products: null }
      } else {
        return { isSuccess: false, status: 'ERROR', products: null }
      }
    }
  } catch (e) {
    console.log('ERROR: ' + e)
    return { isSuccess: false, status: 'ERROR', products: null }
  }
}

export async function fetchProductsByCategory(
  category: string,
  reviews?: boolean,
  orderBy?: 'created_at' | 'price' | 'name' | 'rating' | 'popularity',
  order?: 'desc' | 'asc',
  page?: number,
  limit?: number
): Promise<{ isSuccess: boolean; status: string; products: Product[] | null }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/category/${category}${reviews || orderBy || order || page || limit ? '?' : ''}${reviews ? 'reviews=true' : ''}${orderBy ? `&orderBy=${orderBy}` : ''}${order ? `&order=${order}` : ''}${page ? `&page=${page}` : ''}${limit ? `&limit=${limit}` : ''}`
    )

    if (response.status === 200) {
      const data = await response.json()
      if (data.products) {
        return { isSuccess: true, status: 'SUCCESS', products: data.products as Product[] }
      } else {
        return { isSuccess: false, status: 'ERROR', products: null }
      }
    } else {
      return { isSuccess: false, status: 'ERROR', products: null }
    }
  } catch (e) {
    console.log('error: ' + e)
    return { isSuccess: false, status: 'ERROR', products: null }
  }
}

export async function fetchProductById(
  id: string
): Promise<{ isSuccess: boolean; status: string; product: Product[] | null }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
    if (data.Status === 'SUCCESS') {
      console.log(data)
      if (data.Product) {
        return { isSuccess: true, status: 'SUCCESS', product: data.Product as Product[] }
      } else {
        return { isSuccess: false, status: 'ERROR', product: null }
      }
    } else {
      if (data.Status === 'NOTFOUND') {
        return { isSuccess: true, status: 'NOTFOUND', product: null }
      }
      return { isSuccess: false, status: 'ERROR', product: null }
    }
  } catch {
    return { isSuccess: false, status: 'ERROR', product: null }
  }
}

export async function createProduct(formData: FormData): Promise<{ isSuccess: boolean }> {
  try {
    const cookieStorage = cookies()
    const token = cookieStorage.get('access')

    if (token == null) {
      return { isSuccess: false }
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token?.value}`
      },
      body: formData
    })

    if (response.status === 200) {
      return { isSuccess: true }
    } else {
      return { isSuccess: false }
    }
  } catch (e) {
    console.log('error: ' + e)
    return { isSuccess: false }
  }
}

export async function updateProduct(id: string, formData: FormData): Promise<{ isSuccess: boolean }> {
  try {
    const cookieStorage = cookies()
    const token = cookieStorage.get('access')

    if (token == null) {
      return { isSuccess: false }
    }

    console.log('Token: ' + id)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token?.value}`
      },
      body: formData
    })

    console.log(await response.json())
    console.log(response.status)

    if (response.status === 200) {
      return { isSuccess: true }
    } else {
      return { isSuccess: false }
    }
  } catch {
    return { isSuccess: false }
  }
}
