'use server'

import { ICartItem } from '@/models/CartItem'
import { ICartItemCookie } from '@/models/CartItemCookie'
import { cookies } from 'next/headers'

export async function addToCart( itemId: string, quantity: number, isEvent: boolean ): Promise<{ isSuccess: boolean; status: string }> {
  try {
    const cookiesStorage = cookies()
    const cart = cookiesStorage.get('cart')?.value || '[]'
    const cartArray = JSON.parse(cart) as ICartItemCookie[]
    if (cartArray.some((c: ICartItemCookie) => c.Id === itemId)) {
      return { isSuccess: false, status: 'ALREADYEXISTS' }
    }
    cartArray.push({ Id: itemId, Quantity: quantity, IsEvent: isEvent })
    cookiesStorage.set('cart', JSON.stringify(cartArray))
    return { isSuccess: true, status: 'SUCCESS' }
  } catch {
    return { isSuccess: false, status: 'ERROR' }
  }
}

export async function removeFromCart(itemId: string): Promise<{ isSuccess: boolean; status: string }> {
  try {
    const cookiesStorage = cookies()
    const cart = cookiesStorage.get('cart')?.value || '[]'
    const cartArray = JSON.parse(cart) as ICartItemCookie[]
    const index = cartArray.findIndex((c: ICartItemCookie) => c.Id === itemId)
    if (index !== -1) {
      cartArray.splice(index, 1)
    }
    cookiesStorage.set('cart', JSON.stringify(cartArray))
    return { isSuccess: true, status: 'SUCCESS' }
  } catch {
    return { isSuccess: false, status: 'ERROR' }
  }
}

export async function getCart(): Promise<{ isSuccess: boolean; status: string; items: ICartItem[] }> {
  try {
    const cartItems: ICartItem[] = []
    const rawCart = (await getRawCart()).items

    await Promise.all(
      rawCart.map(async (item: ICartItemCookie) => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/cart/${item.Id}?quantity=${item.Quantity}&isEvent=${item.IsEvent}`
        )

        if (response.status !== 200) {
          return { isSuccess: false, status: 'ERROR', items: [] }
        }

        const data = await response.json()
        cartItems.push(data.Item)
      })
    )

    return { isSuccess: true, status: 'SUCCESS', items: cartItems }
  } catch {
    return { isSuccess: false, status: 'ERROR', items: [] }
  }
}

export async function getRawCart(): Promise<{ isSuccess: boolean; status: string; items: ICartItemCookie[] }> {
  try {
    const cookiesStorage = cookies()
    const cart = cookiesStorage.get('cart')?.value || '[]'
    const cartArray = JSON.parse(cart)

    return { isSuccess: true, status: 'SUCCESS', items: cartArray }
  } catch {
    return { isSuccess: false, status: 'ERROR', items: [] }
  }
}

export async function clearCart(): Promise<{ isSuccess: boolean; status: string }> {
  try {
    const cookiesStorage = cookies()
    cookiesStorage.set('cart', '[]')
    return { isSuccess: true, status: 'SUCCESS' }
  } catch {
    return { isSuccess: false, status: 'ERROR' }
  }
}
