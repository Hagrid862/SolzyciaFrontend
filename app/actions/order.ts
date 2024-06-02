'use server';

import { cookies } from "next/headers";

export async function createOrder(products: { id: string, quantity: number, isEvent: boolean }[]): Promise<{isSuccess: boolean, status: string, orderId: number}> {
  if (!products.length) {
    return { isSuccess: false, status: 'NOPRODUCTS', orderId: 0 };
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ products: products }),
  });

  if (response.ok) {
    const data = await response.json();
    const cookiesStorage = cookies();
      const localOrdersStr = cookiesStorage.get('localOrders')?.value;
      if (localOrdersStr) {
        const localOrders = JSON.parse(localOrdersStr)
        localOrders.parse.push(data.orderId);
        cookiesStorage.set('localOrders', JSON.stringify(localOrders));
      } 
    return { isSuccess: true, status: 'SUCCESS', orderId: data.orderId };
  } else {
    return { isSuccess: false, status: 'ERROR', orderId: 0 };
  }
}