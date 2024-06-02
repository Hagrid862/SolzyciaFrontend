import { createOrder } from "@/app/actions/order";
import { cookies } from "next/headers";
import { create } from "zustand";

export const useOrderStore = create<IState>((set, get) => ({
  placeOrder: async (products: { id: string, quantity: number, isEvent: boolean }[]) => {
    const response = await createOrder(products);

    if (response.isSuccess) {
      return { isSuccess: true, status: 'SUCCESS', orderId: response.orderId };
    } else {
      return { isSuccess: false, status: response.status, orderId: 0 };
    }
  },
}));

export interface IState {
  placeOrder: (products: { id: string, quantity: number, isEvent: boolean }[]) => Promise<{isSuccess: boolean, status: string, orderId: number}>;
}