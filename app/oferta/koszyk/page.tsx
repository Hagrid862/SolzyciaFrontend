'use client'

import { getCart } from '@/app/actions/cart'
import { ICartItem } from '@/models/cart'
import { useCartStore } from '@/store/cartStore'
import { useEffect, useState } from 'react'

export default function CartPage() {
  const cartStore = useCartStore()
  const [cartRaw, setCartRaw] = useState<string[]>([])

  useEffect(() => {
    async function fetchCart() {
      const cardResult = await cartStore.getRawCartItems()
      if (cardResult.isSuccess && cardResult.items) {
        setCartRaw(cardResult.items)
      } else {
        setCartRaw(['error'])
      }
    }

    fetchCart()
  }, [])

  return (
    <div>
      {cartRaw.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  )
}
