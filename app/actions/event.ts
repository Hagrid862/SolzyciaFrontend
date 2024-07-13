'use server'

import { cookies } from 'next/headers'

export async function fetchEvents(reviews?: boolean, orderBy?: 'created_at' | 'price' | 'name' | 'rating' | 'popularity', order?: 'desc' | 'asc', page?: number, limit?: number): Promise<{ isSuccess: boolean; status: string; eventsJson: string }> {
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
      const eventsJson = JSON.stringify(data.events)
      return { isSuccess: true, status: 'SUCCESS', eventsJson: eventsJson }
    } else {
      if (response.status === 400) {
        const data = await response.json()
        if (data.Status === 'INVALIDORDERBY') {
          return { isSuccess: false, status: 'INVALIDORDERBY', eventsJson: '[]' }
        } else if (data.Status === 'INVALIDORDER') {
          return { isSuccess: false, status: 'INVALIDORDER', eventsJson: '[]' }
        } else if (data.Status === 'INVALIDPAGE') {
          return { isSuccess: false, status: 'INVALIDPAGE', eventsJson: '[]' }
        } else if (data.Status === 'INVALIDLIMIT') {
          return { isSuccess: false, status: 'INVALIDLIMIT', eventsJson: '[]' }
        } else {
          return { isSuccess: false, status: 'ERROR', eventsJson: '' }
        }
      } else if (response.status === 404) {
        return { isSuccess: true, status: 'NOTFOUND', eventsJson: '[]' }
      } else {
        return { isSuccess: false, status: 'ERROR', eventsJson: '' }
      }
    }
  } catch (e) {
    return { isSuccess: false, status: 'ERROR', eventsJson: '' }
  }
}

export async function fetchEventsByCategory(category: string, reviews?: boolean, orderBy?: 'created_at' | 'price' | 'name' | 'rating' | 'popularity', order?: 'desc' | 'asc', page?: number, limit?: number): Promise<{ isSuccess: boolean; status: string; eventsJson: string }> {
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

    if (response.status === 200) {
      const data = await response.json()
      return { isSuccess: true, status: 'SUCCESS', eventsJson: data.Events }
    } else {
      if (response.status === 400) {
        const data = await response.json()
        if (data.Status === 'INVALIDORDERBY') {
          return { isSuccess: false, status: 'INVALIDORDERBY', eventsJson: '[]' }
        } else if (data.Status === 'INVALIDORDER') {
          return { isSuccess: false, status: 'INVALIDORDER', eventsJson: '[]' }
        } else if (data.Status === 'INVALIDPAGE') {
          return { isSuccess: false, status: 'INVALIDPAGE', eventsJson: '[]' }
        } else if (data.Status === 'INVALIDLIMIT') {
          return { isSuccess: false, status: 'INVALIDLIMIT', eventsJson: '[]' }
        } else {
          return { isSuccess: false, status: 'ERROR', eventsJson: '' }
        }
      } else if (response.status === 404) {
        return { isSuccess: true, status: 'NOTFOUND', eventsJson: '[]' }
      } else {
        return { isSuccess: false, status: 'ERROR', eventsJson: '' }
      }
    }
  } catch (e) {
    return { isSuccess: false, status: "ERROR", eventsJson: '' }
  }
}

export async function fetchEventById(id: string): Promise<{ isSuccess: boolean; status: string, eventJson: string }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      const data = await response.json()
      return { isSuccess: true, status: 'SUCCESS', eventJson: JSON.stringify(data.Event) }
    } else {
      if (response.status === 404) {
        return { isSuccess: true, status: 'NOTFOUND', eventJson: '' }
      } else {
        return { isSuccess: false, status: 'ERROR', eventJson: '' }
      }
    }
  } catch {
    return { isSuccess: false, status: 'ERROR', eventJson: '' }
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
