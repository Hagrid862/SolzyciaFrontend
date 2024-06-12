import { addToCart, getCart, getRawCart, removeFromCart } from '@/app/actions/cart'
import { ICartItem } from '@/models/CartItem'
import { create } from 'zustand'

export const useCartStore = create<IState>((set, get) => ({
  cartItems: [],

  getCartItems: async () => {
    const cart = await getCart()
    set({ cartItems: cart })
    console.log(cart)
    return { isSuccess: true }
  },
  getRawCartItems: async () => {
    const rawCart = await getRawCart()
    return { isSuccess: true, items: rawCart }
  },
  addToCart: async (itemId: string, isEvent: boolean) => {
    addToCart(itemId, 1, isEvent)
    return { isSuccess: true }
  },
  removeFromCart: async (itemId: string) => {
    removeFromCart(itemId)
    get().getCartItems()
    return { isSuccess: true }
  },
  clearCart: async () => {
    return { isSuccess: true }
  }
}))

interface IState {
  cartItems: ICartItem[]

  getCartItems(): Promise<{ isSuccess: boolean }>
  getRawCartItems(): Promise<{ isSuccess: boolean; items?: string[] }>
  addToCart(itemId: string, isEvent: boolean): Promise<{ isSuccess: boolean }>
  removeFromCart(itemId: string): Promise<{ isSuccess: boolean }>
  clearCart(): Promise<{ isSuccess: boolean }>
}
