'use server'

import { ICartItem } from '@/models/CartItem'
import { ICartItemCookie } from '@/models/CartItemCookie'
import { cookies } from 'next/headers'

export async function addToCart(itemId: string, quantity: number, isEvent: boolean): Promise<{ isSuccess: boolean }> {
  const cookiesStorage = cookies()
  const cart = cookiesStorage.get('cart')?.value || '[]'
  const cartArray = JSON.parse(cart) as ICartItemCookie[]
  if (cartArray.some((c: ICartItemCookie) => c.id === itemId)) {
    return { isSuccess: false }
  }
  cartArray.push({ id: itemId, quantity, isEvent: isEvent })
  cookiesStorage.set('cart', JSON.stringify(cartArray))
  return { isSuccess: true }
}

export async function removeFromCart(itemId: string): Promise<void> {
  const cookiesStorage = cookies()
  const cart = cookiesStorage.get('cart')?.value || '[]'
  const cartArray = JSON.parse(cart)
  const newCartArray = cartArray.filter((id: string) => id !== itemId)
  cookiesStorage.set('cart', JSON.stringify(newCartArray))
}

export async function getCart(): Promise<ICartItem[]> {
  const cookiesStorage = cookies()
  const cart = cookiesStorage.get('cart')?.value || '[]'
  const cartArray = JSON.parse(cart)

  let cartItems: ICartItem[] = []

  await Promise.all(
    cartArray.map(async (item: ICartItemCookie) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/${item.id}?quantity=${item.quantity}&isEvent=${item.isEvent}`
      )

      const data = await response.json()

      console.log('data', data)

      cartItems.push({
        itemId: data.itemId,
        name: data.name,
        price: data.price,
        quantity: item.quantity,
        image: data.image,
        isEvent: data.isEvent,
        isOnSale: data.isOnSale,
        salePrice: data.salePrice,
        saleEndDate: data.saleEndDate,
        isArchived: data.isArchived,
        isDeleted: data.isDeleted
      })
    })
  )

  return cartItems
}

export async function getRawCart(): Promise<string[]> {
  const cookiesStorage = cookies()
  const cart = cookiesStorage.get('cart')?.value || '[]'
  console.log('cart', cart)
  const cartArray = JSON.parse(cart)
  console.log('cartArray', cartArray)

  return cartArray
}

export async function clearCart(): Promise<void> {
  const cookiesStorage = cookies()
  cookiesStorage.set('cart', '[]')
}
