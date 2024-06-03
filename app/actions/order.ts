'use server';

import { cookies } from "next/headers";
import { Order } from "@/models/Order";

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

export async function getOrder(orderId: string): Promise<{isSuccess: boolean, status: string, order: Order | string}>{
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/${orderId}`);
  if (response.ok) {
    const data = await response.json();
    console.log(data)
    var order: Order = {
      id: data.Id,
      products: data.Products,
      address: data.Address,
      address2: data.Address2,
      city: data.City,
      state: data.State,
      zip: data.Zip,
      country: data.Country,
      phone: data.Phone,
      email: data.Email,
      name: data.Name,
      lastName: data.LastName,
      status: data.Status,
      paymentMethod: data.PaymentMethod,
      createdAt: new Date(data.CreatedAt)
    };
    return { isSuccess: true, status: 'SUCCESS', order: order };
  } else if (response.status === 404) {
    return { isSuccess: false, status: 'NOTFOUND', order: ''};
  } else {
    return { isSuccess: false, status: 'ERROR', order: '' };
  }
}