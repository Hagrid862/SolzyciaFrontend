import { create } from 'zustand'
import { removeCategory, updateCategory, fetchCategories } from '@/app/actions/category'
import { createProduct, fetchProducts, updateProduct } from '@/app/actions/product'
import { login, logout, verifyOtp } from '@/app/actions/auth'
import { createEvent, fetchEvents } from '@/app/actions/event'
import ProductsLayout from '@/app/admin-area/dashboard/products/layout'
import {EventLocation} from "@/models/EventLocation";

export const useAdminStore = create<IState>((set) => ({
  token: undefined,
  categories: ['loading'],
  products: ['loading'],
  events: ['loading'],

  login: async (username: string, password: string, remember: boolean): Promise<{isSuccess: boolean, status: string}> => {
    const result = await login(username, password, remember)

    if (result.isSuccess) {
      return { isSuccess: true, status: '2FASENT' }
    } else {
      if (result.status === 'INVALID') {
        return { isSuccess: false, status: 'INVALID' }
      } else {
        return { isSuccess: false, status: 'ERROR' }
      }
    }
  },
  verifyOtp: async (code: string): Promise<{ isSuccess: boolean; status: string }> => {
    const result = await verifyOtp(code)
    console.log(result)

    if (result.isSuccess && result.token) {
      set({ token: result.token })
      return { isSuccess: true, status: 'SUCCESS' }
    } else {
      if (result.status === 'INVALID') {
        return { isSuccess: false, status: 'INVALID' }
      } else {
        return { isSuccess: false, status: 'ERROR' }
      }
    }
  },
  logout: () => {
    logout()
    set({ token: undefined })
  },

  fetchCategories: async () => {
    set({ categories: ['loading'] })
    const categories = await fetchCategories()
    if (categories.status !== 'ERROR') {
      if (categories.data.length > 0) {
        set({ categories: categories.data })
      } else {
        set({ categories: ['none'] })
      }
    } else {
      set({ categories: ['error'] })
    }
  },
  removeCategory: async (id: string) => {
    const response = await removeCategory(id)
    if (response.status === 'SUCCESS') {
      set({ categories: ['loading'] })
      await fetchCategories()
    }
  },
  updateCategory: async (id: string, formData: FormData) => {
    const response = await updateCategory(id, formData)
    if (response.status === 'SUCCESS') {
      set({ categories: ['loading'] })
      await fetchCategories()
    }
  },

  fetchProducts: async () => {
    const response = await fetchProducts()

    console.log('RESPONSE')
    console.log(response)

    if (response.isSuccess) {
      if (response.products && response.products.length > 0) {
        set({ products: response.products })
        return { isSuccess: true }
      } else {
        set({ products: ['error'] })
        return { isSuccess: false }
      }
    } else {
      if (response.status === "NOTFOUND") {
        set({ products: ['none'] })
        return { isSuccess: false }
      } else {
        set({ products: ['error'] })
        return { isSuccess: false }
      }
    }
  },
  addProduct: async (name: string, price: number, description: string, title?: string, category?: string, tags?: string[], images?: File[]): Promise<{ isSuccess: boolean }> => {
    const formData = new FormData()

    formData.append('name', name)
    formData.append('price', price.toString())
    formData.append('description', description)

    console.log('CID ' + category)

    if (title) {
      formData.append('title', title)
    }
    if (category) {
      formData.append('categoryId', category)
    }
    if (tags) {
      formData.append('tags', tags.join(','))
    }
    if (images) {
      images.forEach((image, index) => {
        formData.append(`image${index}`, image, image.name)
      })
    }

    const response = await createProduct(formData)
    return response
  },
  updateProduct: async (id: string, name?: string, description?: string, images?: File[], removedImages?: string[], price?: number, category?: string, tags?: string[]) => {
    try {
      if (id === 'noid') {
        return { isSuccess: false, status: 'error' }
      }
      const formData = new FormData()

      if (name) {
        formData.append('Name', name)
      }
      if (description) {
        formData.append('Description', description)
      }
      if (price) {
        formData.append('Price', price.toString())
      }
      if (category) {
        formData.append('CategoryId', category)
      }
      if (tags) {
        formData.append('Tags', tags.join(','))
      }
      if (images) {
        images.forEach((image, index) => {
          formData.append(`image${index}`, image, image.name)
        })
      }
      if (removedImages && removedImages.length > 0) {
        formData.append(`RemovedImages`, removedImages.join(','))
      }
      const response = await updateProduct(id, formData)
      console.log('RESPONSE')
      console.log(response)
      if (response.isSuccess) {
        return { isSuccess: true, status: 'success' }
      } else {
        return { isSuccess: false, status: 'error' }
      }
    } catch {
      return { isSuccess: false, status: 'error' }
    }
  },

  fetchEvents: async () => {
    const response = await fetchEvents()
    console.log('RESPONSE')
    console.log(response)
    if (response.isSuccess) {
      const events = response.events
      console.log('EVENTS')
      console.log(events)
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
  addEvent: async (name: string, price: number, description: string, time?: number, dates?: { date: Date; seats: number, location: EventLocation }[], category?: string, tags?: string[], images?: File[]) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price.toString());
    formData.append('description', description);
    if (time) {
      formData.append('time', time.toString());
    }
    if (dates) {
      const datesString = JSON.stringify(dates.map(date => ({
        dateIso: date.date.toISOString(),
        seats: date.seats,
        location: date.location
      })));
      formData.append('dates', datesString);
    }
    if (category) {
      formData.append('categoryId', category);
    }
    if (tags) {
      formData.append('tags', tags.join(','));
    }
    if (images) {
      images.forEach((image, index) => {
        formData.append(`image${index}`, image, image.name);
      });
    }
    console.log('FORMDATA');
    console.log(formData.get('dates'));
    const response = await createEvent(formData);
    return { isSuccess: response.isSuccess };
  }
}))

interface IState {
  token: string | undefined
  categories: any[]
  products: any[]
  events: any[]


  login: (username: string, password: string, remember: boolean) => Promise<{isSuccess: boolean, status: string}>
  verifyOtp: (code: string) => Promise<{ isSuccess: boolean; status: string }>
  logout: () => void

  fetchCategories: () => Promise<void>
  removeCategory: (id: string) => Promise<void>
  updateCategory: (id: string, formData: FormData) => Promise<void>

  fetchProducts: () => Promise<{ isSuccess: boolean; products?: any }>
  addProduct: (name: string, price: number, description: string, title?: string, categoryId?: string, tags?: string[], images?: File[]) => Promise<{ isSuccess: boolean }>
  updateProduct: ( id: string, name?: string, description?: string, images?: File[], removedImages?: string[], price?: number, category?: string, tags?: string[]) => Promise<{ isSuccess: boolean; status: string }>

  fetchEvents: () => Promise<{ isSuccess: boolean }>
  addEvent: (name: string, price: number, description: string, time?: number, dates?: { date: Date; seats: number, location: EventLocation }[], category?: string, tags?: string[], images?: File[]) => Promise<{ isSuccess: boolean }>
}
