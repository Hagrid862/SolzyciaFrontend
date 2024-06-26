import { create } from 'zustand'
import { removeCategory, updateCategory, fetchCategories } from '@/app/actions/category'
import { image } from '@nextui-org/react'
import { createProduct, fetchProducts, updateProduct } from '@/app/actions/product'
import { logout } from '@/app/actions/auth'
import { createEvent, fetchEvents } from '@/app/actions/event'
import { Tag } from '@/models/Tag'

export const useAdminStore = create<IState>((set) => ({
  token: undefined,
  categories: ['loading'],
  products: ['loading'],
  events: ['loading'],

  logout: () => {
    logout()
    set({ token: undefined })
  },

  fetchCategories: async () => {
    set({ categories: ['loading'] })
    const categories = await fetchCategories()
    if (categories !== 'ERROR') {
      if (categories.length > 0) {
        set({ categories: categories })
      } else {
        set({ categories: ['none'] })
      }
    } else {
      set({ categories: ['error'] })
    }
  },
  removeCategory: async (id: string) => {
    const response = await removeCategory(id)
    if (response.message === 'SUCCESS') {
      set({ categories: ['loading'] })
      await fetchCategories()
    }
  },
  updateCategory: async (id: string, formData: FormData) => {
    const response = await updateCategory(id, formData)
    if (response.message === 'SUCCESS') {
      set({ categories: ['loading'] })
      await fetchCategories()
    }
  },

  fetchProducts: async () => {
    const response = await fetchProducts()

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
  addProduct: async (
    name: string,
    price: number,
    description: string,
    title?: string,
    category?: string,
    tags?: string[],
    images?: File[]
  ): Promise<{ isSuccess: boolean }> => {
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
  updateProduct: async (
    id: string,
    name?: string,
    description?: string,
    images?: File[],
    removedImages?: string[],
    price?: number,
    category?: string,
    tags?: string[]
  ) => {
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
      const events = JSON.parse(response.eventsJson)
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
  addEvent: async (
    name: string,
    price: number,
    description: string,
    time?: number,
    dates?: { date: Date; seats: number }[],
    category?: string,
    tags?: string[],
    images?: File[]
  ) => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', price.toString())
    formData.append('description', description)
    if (time) {
      formData.append('time', time.toString())
    }
    if (dates) {
      let datesObj: { dateIso: string; seats: number }[] = []
      dates.map((date, index) => {
        const dateString = date.date.toISOString()
        datesObj.push({ dateIso: dateString, seats: date.seats })
      })
      console.log(datesObj)
      formData.append(`dates`, JSON.stringify(datesObj))
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
    const response = await createEvent(formData)
    if (response.isSuccess) {
      return { isSuccess: true }
    } else {
      return { isSuccess: false }
    }
  }
}))

interface IState {
  token: string | undefined
  categories: any[]
  products: any[]
  events: any[]

  logout: () => void

  fetchCategories: () => Promise<void>
  removeCategory: (id: string) => Promise<void>
  updateCategory: (id: string, formData: FormData) => Promise<void>

  fetchProducts: () => Promise<{ isSuccess: boolean; products?: any }>
  addProduct: (
    name: string,
    price: number,
    description: string,
    title?: string,
    categoryId?: string,
    tags?: string[],
    images?: File[]
  ) => Promise<{ isSuccess: boolean }>
  updateProduct: (
    id: string,
    name?: string,
    description?: string,
    images?: File[],
    removedImages?: string[],
    price?: number,
    category?: string,
    tags?: string[]
  ) => Promise<{ isSuccess: boolean; status: string }>

  fetchEvents: () => Promise<{ isSuccess: boolean }>
  addEvent: (
    name: string,
    price: number,
    description: string,
    time?: number,
    dates?: { date: Date; seats: number }[],
    category?: string,
    tags?: string[],
    images?: File[]
  ) => Promise<{ isSuccess: boolean }>
}
