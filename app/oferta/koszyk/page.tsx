'use client'

import { getCart } from '@/app/actions/cart'
import { useCartStore } from '@/store/cartStore'
import { useEffect } from 'react'

export default function CartPage() {
  const cartStore = useCartStore()
  const items = cartStore.cartItems

  useEffect(() => {
    async function fetchCart() {
      const response = await getCart()
    }

    fetchCart()
  }, [])

  return (
    <div>
      {/* {cartRaw.map((item, index) => (
        <div key={index}>{item}</div>
      ))} */}
    </div>
  )
}
