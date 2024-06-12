'use server'

import { ICartItem } from '@/models/CartItem'
import { ICartItemCookie } from '@/models/CartItemCookie'
import { cookies } from 'next/headers'

export async function addToCart(itemId: string, quantity: number, isEvent: boolean): Promise<{ isSuccess: boolean }> {
  const cookiesStorage = cookies()
  const cart = cookiesStorage.get('cart')?.value || '[]'
  const cartArray = JSON.parse(cart) as ICartItemCookie[]
  if (cartArray.some((c: ICartItemCookie) => c.Id === itemId)) {
    return { isSuccess: false }
  }
  cartArray.push({ Id: itemId, Quantity: quantity, IsEvent: isEvent })
  cookiesStorage.set('cart', JSON.stringify(cartArray))
  return { isSuccess: true }
}

export async function removeFromCart(itemId: string): Promise<void> {
  console.log('removeFromCart', itemId)
  const cookiesStorage = cookies()
  const cart = cookiesStorage.get('cart')?.value || '[]'
  const cartArray = JSON.parse(cart) as ICartItemCookie[]
  const index = cartArray.findIndex((c: ICartItemCookie) => c.Id === itemId)
  if (index !== -1) {
    cartArray.splice(index, 1)
  }
  cookiesStorage.set('cart', JSON.stringify(cartArray))

  return
}

export async function getCart(): Promise<ICartItem[]> {
  // clearCart()
  getRawCart()
  const cookiesStorage = cookies()
  const cart = cookiesStorage.get('cart')?.value || '[]'
  const cartArray = JSON.parse(cart)

  let cartItems: ICartItem[] = []

  console.log('cartArray', cartArray)

  await Promise.all(
    cartArray.map(async (item: ICartItemCookie) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/${item.Id}?quantity=${item.Quantity}&isEvent=${item.IsEvent}`
      )

      const data = await response.json()

      console.log('data', data)

      cartItems.push({
        ItemId: data.itemId,
        Name: data.name,
        Price: data.Price,
        Quantity: item.Quantity,
        Image: data.image,
        IsEvent: data.isEvent,
        IsOnSale: data.isOnSale,
        SalePrice: data.salePrice,
        SaleEndDate: data.saleEndDate,
        IsArchived: data.isArchived,
        IsDeleted: data.isDeleted
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
