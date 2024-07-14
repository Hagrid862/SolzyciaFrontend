'use server'

import { cookies } from 'next/headers'
import { Event } from '@/models/Event'

export async function fetchEvents(
  reviews?: boolean,
  orderBy?: 'created_at' | 'price' | 'name' | 'rating' | 'popularity',
  order?: 'desc' | 'asc',
  page?: number,
  limit?: number
): Promise<{ isSuccess: boolean; status: string; events: Event[] | null }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/event${reviews || orderBy || order || page || limit ? '?' : ''}${reviews ? 'reviews=true' : ''}${orderBy ? `&orderBy=${orderBy}` : ''}${order ? `&order=${order}` : ''}${page ? `&page=${page}` : ''}${limit ? `&limit=${limit}` : ''}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.status === 200) {
      const data = await response.json()
      console.log(data)
      return { isSuccess: true, status: 'SUCCESS', events: data.Events as Event[] }
    } else {
      if (response.status === 400) {
        const data = await response.json()
        if (data.Status === 'INVALIDORDERBY') {
          return { isSuccess: false, status: 'INVALIDORDERBY', events: null }
        } else if (data.Status === 'INVALIDORDER') {
          return { isSuccess: false, status: 'INVALIDORDER', events: null }
        } else if (data.Status === 'INVALIDPAGE') {
          return { isSuccess: false, status: 'INVALIDPAGE', events: null }
        } else if (data.Status === 'INVALIDLIMIT') {
          return { isSuccess: false, status: 'INVALIDLIMIT', events: null }
        } else {
          return { isSuccess: false, status: 'ERROR', events: null }
        }
      } else if (response.status === 404) {
        return { isSuccess: true, status: 'NOTFOUND', events: null }
      } else {
        return { isSuccess: false, status: 'ERROR', events: null }
      }
    }
  } catch (e) {
    return { isSuccess: false, status: 'ERROR', events: null }
  }
}

export async function fetchEventsByCategory(
  category: string,
  reviews?: boolean,
  orderBy?: 'created_at' | 'price' | 'name' | 'rating' | 'popularity',
  order?: 'desc' | 'asc',
  page?: number,
  limit?: number
): Promise<{ isSuccess: boolean; status: string; events: Event[] | null }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/event/category/${category}${reviews || orderBy || order || page || limit ? '?' : ''}${reviews ? 'reviews=true' : ''}${orderBy ? `&orderBy=${orderBy}` : ''}${order ? `&order=${order}` : ''}${page ? `&page=${page}` : ''}${limit ? `&limit=${limit}` : ''}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    console.log(response.status)

    if (response.status === 200) {
      const data = await response.json()
      return { isSuccess: true, status: 'SUCCESS', events: data.Events as Event[] }
    } else {
      if (response.status === 400) {
        const data = await response.json()
        if (data.Status === 'INVALIDORDERBY') {
          return { isSuccess: false, status: 'INVALIDORDERBY', events: null }
        } else if (data.Status === 'INVALIDORDER') {
          return { isSuccess: false, status: 'INVALIDORDER', events: null }
        } else if (data.Status === 'INVALIDPAGE') {
          return { isSuccess: false, status: 'INVALIDPAGE', events: null }
        } else if (data.Status === 'INVALIDLIMIT') {
          return { isSuccess: false, status: 'INVALIDLIMIT', events: null }
        } else {
          return { isSuccess: false, status: 'ERROR', events: null }
        }
      } else if (response.status === 404) {
        return { isSuccess: false, status: 'NOTFOUND', events: null }
      } else {
        return { isSuccess: false, status: 'ERROR', events: null }
      }
    }
  } catch (e) {
    return { isSuccess: false, status: 'ERROR', events: null }
  }
}

export async function fetchEventById(id: string): Promise<{ isSuccess: boolean; status: string; event: Event | null }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      const data = await response.json()
      console.log(data.Event as Event)
      return { isSuccess: true, status: 'SUCCESS', event: data.Event as Event }
    } else {
      if (response.status === 404) {
        return { isSuccess: false, status: 'NOTFOUND', event: null }
      } else {
        return { isSuccess: false, status: 'ERROR', event: null }
      }
    }
  } catch {
    return { isSuccess: false, status: 'ERROR', event: null }
  }
}

export async function createEvent(fromData: FormData): Promise<{ isSuccess: boolean; status: string }> {
  try {
    const cookiesStorage = cookies()
    const token = cookiesStorage.get('access')
    if (token == null) {
      return { isSuccess: false, status: 'NOTOKEN' }
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token?.value}`
      },
      body: fromData
    })

    console.log(await response.text())

    if (response.status === 201) {
      return { isSuccess: true, status: 'SUCCESS' }
    } else {
      return { isSuccess: false, status: 'ERROR' }
    }
  } catch (e: any) {
    return { isSuccess: false, status: 'INTERNALERROR' }
  }
}
