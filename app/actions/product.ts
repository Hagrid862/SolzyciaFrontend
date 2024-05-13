'use server';

import {cookies} from "next/headers";

export async function createProduct(formData: FormData): Promise<{isSuccess: boolean}> {
  try {
    const cookieStorage = cookies();
    const token = cookieStorage.get('access');

    if (token == null) {
      return {isSuccess: false}
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token?.value}`,
      },
      body: formData,
    });

    console.log(response.status)
    console.log(await response.text());

    if (response.status === 200) {
      return {isSuccess: true}
    } else {
      return {isSuccess: false}
    }
  } catch (e) {
    console.log('error: ' + e)
    return {isSuccess: false}
  }
}

export async function fetchProducts(reviews?: boolean, orderBy?: 'created_at' | 'price' | 'name' | 'rating' | 'popularity', order?: 'desc' | 'asc', page?: number, limit?: number): Promise<{isSuccess: boolean, productsJson: string}> {
  try{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product${reviews || orderBy || order || page || limit ? '?' : ''}${reviews ? 'reviews=true' : ''}${orderBy ? `&orderBy=${orderBy}` : ''}${order ? `&order=${order}` : ''}${page ? `&page=${page}` : ''}${limit ? `&limit=${limit}` : ''}`);

    if (response.status === 200) {
      const data = await response.json();
      if (data.products) {
        const productsJson = JSON.stringify(data.products);
        return {isSuccess: true, productsJson: productsJson }
      } else {
        return {isSuccess: false, productsJson: '' }
      }
    } else {
      return {isSuccess: false, productsJson: '' }
    }
  } catch (e) {
    console.log('error: ' + e)
    return {isSuccess: false, productsJson: '' }
  }
}