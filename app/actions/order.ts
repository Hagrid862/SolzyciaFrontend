'use server'

import { cookies } from 'next/headers'
import { Order } from '@/models/Order'
import { Product } from '@/models/Product'
import { Event } from '@/models/Event'
import { Tag } from '@/models/Tag'

export async function createOrder(
  products: { id: string; quantity: number; isEvent: boolean }[]
): Promise<{ isSuccess: boolean; status: string; orderId: number }> {
  if (!products.length) {
    return { isSuccess: false, status: 'NOPRODUCTS', orderId: 0 }
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ products: products })
  })

  if (response.ok) {
    const data = await response.json()
    const cookiesStorage = cookies()
    const localOrdersStr = cookiesStorage.get('localOrders')?.value
    if (localOrdersStr) {
      const localOrders = JSON.parse(localOrdersStr)
      localOrders.parse.push(data.OrderId)
      cookiesStorage.set('localOrders', JSON.stringify(localOrders))
    }
    return { isSuccess: true, status: 'SUCCESS', orderId: data.OrderId }
  } else {
    return { isSuccess: false, status: 'ERROR', orderId: 0 }
  }
}

export async function getOrder(
  orderId: string
): Promise<{ isSuccess: boolean; status: string; order: Order | string }> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/${orderId}`)
  if (response.ok) {
    const data = await response.json()
    console.log(data)
    return { isSuccess: true, status: 'SUCCESS', order: data.Order }
  } else if (response.status === 404) {
    return { isSuccess: false, status: 'NOTFOUND', order: '' }
  } else {
    return { isSuccess: false, status: 'ERROR', order: '' }
  }
}

export async function getOrderProducts(
  orderId: string
): Promise<{ isSuccess: boolean; status: string; products: Product[]; events: Event[] }> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/${orderId}/products`)
  const data = await response.json()
  console.log(data)
  if (data.Status === 'SUCCESS') {
    if (data.Products || data.Events) {
      let products: Product[] = []
      let events: Event[] = []

      if (data.Products) {
        const productsObj = data.Products
        if (productsObj.length > 0) {
          productsObj.forEach((product: Product) => {
            let tags: Tag[] = []
            if (product.Tags && product.Tags.length > 0) {
              product.Tags?.forEach((tag: any) => {})
            }
          })
        }
      }

      if (data.Events) {
        const eventsObj = data.Events
        if (eventsObj.length > 0) {
          eventsObj.forEach((event: Event) => {
            let tags: Tag[] = []
            if (event.Tags && event.Tags.length > 0) {
              event.Tags?.forEach((tag: any) => {})
            }
          })
        }
        events = eventsObj
      }
      console.log(events)
      return { isSuccess: true, status: 'SUCCESS', products: products, events: events }
    }
  }
  return { isSuccess: false, status: 'ERROR', products: [], events: [] }
}
