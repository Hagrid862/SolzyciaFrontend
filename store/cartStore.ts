import { addToCart, getCart, getRawCart, removeFromCart } from '@/app/actions/cart'
import { ICartItem } from '@/models/CartItem'
import { ICartItemCookie } from '@/models/CartItemCookie'
import { create } from 'zustand'

export const useCartStore = create<IState>((set, get) => ({
  cartItems: [],
  rawCart: [],

  getCartItems: async () => {
    const cart = await getCart()
    set({ cartItems: cart.items })
    console.log(cart)
    return { isSuccess: true }
  },
  getRawCartItems: async () => {
    const rawCart = await getRawCart()
    set({ rawCart: rawCart.items })
    console.log('rawCart')
    console.log(rawCart)
    return { isSuccess: true }
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
  rawCart: ICartItemCookie[]

  getCartItems(): Promise<{ isSuccess: boolean }>
  getRawCartItems(): Promise<{ isSuccess: boolean }>
  addToCart(itemId: string, isEvent: boolean): Promise<{ isSuccess: boolean }>
  removeFromCart(itemId: string): Promise<{ isSuccess: boolean }>
  clearCart(): Promise<{ isSuccess: boolean }>
}
