'use server';

import { ICartItem } from "@/models/cart";
import { cookies } from "next/headers";

export async function addToCart(itemId: string): Promise<void> {
  console.log('addToCart', itemId);
  const cookiesStorage = cookies();
  const cart = cookiesStorage.get('cart')?.value || '[]';
  const cartArray = JSON.parse(cart);
  cartArray.push(itemId);
  cookiesStorage.set('cart', JSON.stringify(cartArray));
}

export async function removeFromCart(itemId: string): Promise<void> {
  const cookiesStorage = cookies();
  const cart = cookiesStorage.get('cart')?.value || '[]';
  const cartArray = JSON.parse(cart);
  const newCartArray = cartArray.filter((id: string) => id !== itemId);
  cookiesStorage.set('cart', JSON.stringify(newCartArray));
}

export async function getCart(): Promise<ICartItem[]> {
  const cookiesStorage = cookies();
  const cart = cookiesStorage.get('cart')?.value || '[]';
  const cartArray = JSON.parse(cart);
  
  return [];
}

export async function getRawCart(): Promise<string[]> {
  const cookiesStorage = cookies();
  const cart = cookiesStorage.get('cart')?.value || '[]';
  console.log('cart', cart);
  const cartArray = JSON.parse(cart);
  console.log('cartArray', cartArray);
  
  return cartArray;
}

export async function clearCart(): Promise<void> {
  const cookiesStorage = cookies();
  cookiesStorage.set('cart', '[]');
}