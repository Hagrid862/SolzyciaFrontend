import { create } from 'zustand'
import { fetchCategories } from '@/app/actions/category'
import { fetchProductById, fetchProducts, fetchProductsByCategory } from '@/app/actions/product'
import { fetchEventById, fetchEvents, fetchEventsByCategory } from '@/app/actions/event'
import { Product } from '@/models/Product'
import { Category } from '@/models/Category'

export const useOfferStore = create<IState>((set, get) => ({
  filterCategory: 'all-categories',
  filterType: 'events',
  filterSearch: '',

  products: ['loading'],
  events: ['loading'],
  categories: ['loading'],

  initFilters: () => {
    const urlParams = new URLSearchParams(window.location.search)
    const category = urlParams.get('category')
    const type = urlParams.get('type')
    const search = urlParams.get('search')

    if (category) {
      set({ filterCategory: category })
      urlParams.delete('category')
      history.replaceState({}, '', `${location.pathname}?${urlParams}`)
    }
    if (type) {
      set({ filterType: type })
      urlParams.delete('type')
      history.replaceState({}, '', `${location.pathname}?${urlParams}`)
    }
    if (search) {
      set({ filterSearch: search })
      urlParams.delete('search')
      history.replaceState({}, '', `${location.pathname}?${urlParams}`)
    }
  },
  setFilterType: (type: string) => {
    set({ filterType: type })
  },
  setFilterCategory: (category: string) => {
    set({ filterCategory: category })
    if (category === 'all-categories') {
      get().fetchProducts()
      get().fetchEvents()
    } else {
      get().fetchProductsByCategory()
      get().fetchEventsByCategory()
    }
  },

  fetchCategories: async (): Promise<{ isSuccess: boolean }> => {
    set({ categories: ['loading'] })
    const response = await fetchCategories()
    if (response !== 'ERROR') {
      if (response.length > 0) {
        set({ categories: response })
        return { isSuccess: true }
      } else {
        set({ categories: ['none'] })
        return { isSuccess: false }
      }
    } else {
      set({ categories: ['error'] })
      return { isSuccess: false }
    }
  },

  fetchProducts: async (
    reviews?: boolean,
    orderBy?: 'created_at' | 'price' | 'name' | 'rating' | 'popularity',
    order?: 'desc' | 'asc',
    page?: number,
    limit?: number
  ): Promise<{ isSuccess: boolean }> => {
    set({ products: ['loading'] })
    const response = await fetchProducts(reviews, orderBy, order, page, limit)
    if (response.isSuccess) {
      if (response.productsJson === '[]') {
        set({ products: ['none'] })
        return { isSuccess: false }
      }
      const products = JSON.parse(response.productsJson)
      if (products && products.length > 0) {
        set({ products: products })
        return { isSuccess: true }
      } else {
        set({ products: ['none'] })
        return { isSuccess: false }
      }
    } else {
      set({ products: ['error'] })
      return { isSuccess: false }
    }
  },
  fetchProductsByCategory: async (
    reviews?: boolean,
    orderBy?: 'created_at' | 'price' | 'name' | 'rating' | 'popularity',
    order?: 'desc' | 'asc',
    page?: number,
    limit?: number
  ) => {
    set({ products: ['loading'] })
    const response = await fetchProductsByCategory(get().filterCategory, reviews, orderBy, order, page, limit)
    if (response.isSuccess) {
      const products = JSON.parse(response.productsJson)
      if (products && products.length > 0) {
        set({ products: products })
        return { isSuccess: true }
      } else {
        set({ products: ['none'] })
        return { isSuccess: false }
      }
    } else {
      set({ products: ['error'] })
      return { isSuccess: false }
    }
  },
  fetchProductById: async (id: string): Promise<{ isSuccess: boolean; product: Product | null }> => {
    set({ products: ['loading'] })
    const response = await fetchProductById(id)
    if (response.isSuccess) {
      const products = JSON.parse(response.productJson)
      if (products && products.length > 0) {
        set({ products: products })
        return { isSuccess: true, product: products[0] } // Assuming you want to return the first product
      } else {
        set({ products: ['none'] })
        return { isSuccess: false, product: null }
      }
    } else {
      set({ products: ['error'] })
      return { isSuccess: false, product: null }
    }
  },

  fetchEvents: async (
    reviews?: boolean,
    orderBy?: 'created_at' | 'price' | 'name' | 'rating' | 'popularity',
    order?: 'desc' | 'asc',
    page?: number,
    limit?: number
  ) => {
    set({ events: ['loading'] })
    const response = await fetchEvents()
    if (response.isSuccess) {
      const events = JSON.parse(response.eventsJson)
      if (events && events.length > 0) {
        set({ events: events })
        return { isSuccess: true }
      } else {
        set({ events: ['none'] })
        return { isSuccess: false }
      }
    } else {
      set({ events: ['error'] })
      return { isSuccess: false }
    }
  },
  fetchEventsByCategory: async (
    reviews?: boolean,
    orderBy?: 'created_at' | 'price' | 'name' | 'rating' | 'popularity',
    order?: 'desc' | 'asc',
    page?: number,
    limit?: number
  ) => {
    set({ events: ['loading'] })
    const response = await fetchEventsByCategory(get().filterCategory, reviews, orderBy, order, page, limit)
    if (response.isSuccess) {
      if (response.eventsJson === '[]') {
        set({ events: ['none'] })
        return { isSuccess: false }
      }
      const events = JSON.parse(response.eventsJson)
      if (events && events.length > 0) {
        set({ events: events })
        return { isSuccess: true }
      } else {
        set({ events: ['none'] })
        return { isSuccess: false }
      }
    } else {
      set({ events: ['error'] })
      return { isSuccess: false }
    }
  },
  fetchEventById: async (id: string) => {
    const response = await fetchEventById(id)
    if (response.isSuccess) {
      const event = JSON.parse(response.eventJson)
      if (event) {
        return { isSuccess: true, event: event }
      } else {
        return { isSuccess: true, event: null }
      }
    } else {
      return { isSuccess: false, event: {} }
    }
  }
}))

export interface IState {
  filterCategory: string
  filterType: string
  filterSearch: string

  products: Product[] | string[]
  events: Event[] | string[]
  categories: Category[] | string[]

  initFilters: () => void
  setFilterType: (type: string) => void
  setFilterCategory: (category: string) => void

  fetchCategories: () => Promise<{ isSuccess: boolean }>

  fetchProducts: (
    reviews?: boolean,
    orderBy?: 'created_at' | 'price' | 'name' | 'rating' | 'popularity',
    order?: 'desc' | 'asc',
    page?: number,
    limit?: number
  ) => Promise<{ isSuccess: boolean }>
  fetchProductsByCategory: (
    reviews?: boolean,
    orderBy?: 'created_at' | 'price' | 'name' | 'rating' | 'popularity',
    order?: 'desc' | 'asc',
    page?: number,
    limit?: number
  ) => Promise<{ isSuccess: boolean }>
  fetchProductById: (id: string) => Promise<{ isSuccess: boolean; product: Product | null }>

  fetchEvents: (
    reviews?: boolean,
    orderBy?: 'created_at' | 'price' | 'name' | 'rating' | 'popularity',
    order?: 'desc' | 'asc',
    page?: number,
    limit?: number
  ) => Promise<{ isSuccess: boolean }>
  fetchEventsByCategory: (
    reviews?: boolean,
    orderBy?: 'created_at' | 'price' | 'name' | 'rating' | 'popularity',
    order?: 'desc' | 'asc',
    page?: number,
    limit?: number
  ) => Promise<{ isSuccess: boolean }>
  fetchEventById: (id: string) => Promise<{ isSuccess: boolean; event: any }>
}
