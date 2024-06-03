'use client';

import { Order } from "@/models/Order";
import { useOrderStore } from "@/store/orderStore";
import { stat } from "fs";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [status, setStatus] = useState<string>('loading')

  const store = useOrderStore()

  useEffect(() => {
    store.getOrder(params.orderId).then(response => {
      if (response.isSuccess && response.order) {
        setOrder(response.order)
        setStatus('success')
        console.log(response.order)
      } else {
        setStatus(response.status.toLowerCase())
      }
    })
  }, [])

  return (
    <div>
      {
        status === 'loading' && <p>Loading...</p>
      }
      {
        status === 'success' && order && (
          <div>first product id: {order.id}</div>
        )
      }
      {
        status === 'notfound' && <p>Order not found</p>
      }
      {
        status === 'error' && <p>Error</p>
      }
    </div>
  );
}