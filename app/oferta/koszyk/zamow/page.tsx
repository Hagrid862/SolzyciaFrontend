'use client'

import { ICartItem } from '@/models/CartItem'
import { useEffect, useState } from 'react'

export default function OrderPage() {
  const [order, setOrder] = useState<ICartItem>()

  useEffect(() => {
    async function initOrder() {}

    initOrder()
  }, [])

  return <div>order page</div>
}
