import { createOrder, getOrder } from "@/app/actions/order";
import { cookies } from "next/headers";
import { create } from "zustand";
import { Order } from "@/models/Order";

export const useOrderStore = create<IState>((set, get) => ({
  placeOrder: async (products: { id: string, quantity: number, isEvent: boolean }[]) => {
    const response = await createOrder(products);

    if (response.isSuccess) {
      return { isSuccess: true, status: 'SUCCESS', orderId: response.orderId };
    } else {
      return { isSuccess: false, status: response.status, orderId: 0 };
    }
  },
  getOrder: async (orderId: string) => {
    const response = await getOrder(orderId);

    console.log(response)

    if (response.status === 'SUCCESS') {
      return { isSuccess: true, status: 'SUCCESS', order: response.order as Order };
    } else if (response.status === 'NOTFOUND') {
      return { isSuccess: false, status: 'NOTFOUND', order: undefined };
    } else {
      return { isSuccess: false, status: response.status, order: undefined };
    }
  }
}));

export interface IState {
  placeOrder: (products: { id: string, quantity: number, isEvent: boolean }[]) => Promise<{isSuccess: boolean, status: string, orderId: number}>;
  getOrder: (orderId: string) => Promise<{isSuccess: boolean, status: string, order?: Order}>;
}