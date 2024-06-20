'use server'

import { cookies } from 'next/headers'

export async function fetchProducts(
  reviews?: boolean,
  orderBy?: 'created_at' | 'price' | 'name' | 'rating' | 'popularity',
  order?: 'desc' | 'asc',
  page?: number,
  limit?: number
): Promise<{ isSuccess: boolean; productsJson: string }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product${reviews || orderBy || order || page || limit ? '?' : ''}${reviews ? 'reviews=true' : ''}${orderBy ? `&orderBy=${orderBy}` : ''}${order ? `&order=${order}` : ''}${page ? `&page=${page}` : ''}${limit ? `&limit=${limit}` : ''}`
    )

    console.log(response.status)

    if (response.status === 200) {
      const data = await response.json()
      console.log(data)
      if (data.products) {
        const productsJson = JSON.stringify(data.products)
        return { isSuccess: true, productsJson: productsJson }
      } else {
        return { isSuccess: false, productsJson: '' }
      }
    } else {
      console.log(await response.json())
      return { isSuccess: false, productsJson: '' }
    }
  } catch (e) {
    console.log('error: ' + e)
    return { isSuccess: false, productsJson: '' }
  }
}

export async function fetchProductsByCategory(
  category: string,
  reviews?: boolean,
  orderBy?: 'created_at' | 'price' | 'name' | 'rating' | 'popularity',
  order?: 'desc' | 'asc',
  page?: number,
  limit?: number
): Promise<{ isSuccess: boolean; productsJson: string }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/category/${category}${reviews || orderBy || order || page || limit ? '?' : ''}${reviews ? 'reviews=true' : ''}${orderBy ? `&orderBy=${orderBy}` : ''}${order ? `&order=${order}` : ''}${page ? `&page=${page}` : ''}${limit ? `&limit=${limit}` : ''}`
    )
    console.log(response.status)

    if (response.status === 200) {
      const data = await response.json()
      if (data.products) {
        const productsJson = JSON.stringify(data.products)
        return { isSuccess: true, productsJson: productsJson }
      } else {
        return { isSuccess: true, productsJson: '[]' }
      }
    } else {
      return { isSuccess: false, productsJson: '' }
    }
  } catch (e) {
    console.log('error: ' + e)
    return { isSuccess: false, productsJson: '' }
  }
}

export async function fetchProductById(id: string): Promise<{ isSuccess: boolean; productJson: string }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.status === 200) {
      const data = await response.json()
      console.log(data)
      if (data.product) {
        const productJson = JSON.stringify(data.product)
        return { isSuccess: true, productJson: productJson }
      } else {
        return { isSuccess: false, productJson: '' }
      }
    } else {
      if (response.status === 404) {
        return { isSuccess: true, productJson: '[]' }
      }
      return { isSuccess: false, productJson: '' }
    }
  } catch {
    return { isSuccess: false, productJson: '' }
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
