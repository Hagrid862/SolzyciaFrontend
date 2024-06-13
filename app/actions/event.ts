'use server'

import { cookies } from 'next/headers'

export async function fetchEvents(
  reviews?: boolean,
  orderBy?: 'created_at' | 'price' | 'name' | 'rating' | 'popularity',
  order?: 'desc' | 'asc',
  page?: number,
  limit?: number
): Promise<{ isSuccess: boolean; eventsJson: string }> {
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
      if (data.events) {
        const eventsJson = JSON.stringify(data.events)
        return { isSuccess: true, eventsJson: eventsJson }
      } else {
        return { isSuccess: true, eventsJson: '[]' }
      }
    } else {
      return { isSuccess: false, eventsJson: '' }
    }
  } catch (e) {
    return { isSuccess: false, eventsJson: '' }
  }
}

export async function fetchEventsByCategory(
  category: string,
  reviews?: boolean,
  orderBy?: 'created_at' | 'price' | 'name' | 'rating' | 'popularity',
  order?: 'desc' | 'asc',
  page?: number,
  limit?: number
): Promise<{ isSuccess: boolean; eventsJson: string }> {
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
    console.log((await response.text()) + ', ' + response.status)
    if (response.status === 200) {
      const data = await response.json()
      if (data.events) {
        const eventsJson = JSON.stringify(data.events)
        return { isSuccess: true, eventsJson: eventsJson }
      } else {
        return { isSuccess: false, eventsJson: '' }
      }
    } else {
      if (response.status === 404) {
        return { isSuccess: true, eventsJson: '[]' }
      } else {
        return { isSuccess: false, eventsJson: '' }
      }
    }
  } catch (e) {
    return { isSuccess: false, eventsJson: '' }
  }
}

export async function fetchEventById(id: string): Promise<{ isSuccess: boolean; eventJson: string }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(response.status)

    if (response.status === 200) {
      const data = await response.json()
      if (data.eventDto) {
        const eventJson = JSON.stringify(data.eventDto)
        return { isSuccess: true, eventJson: eventJson }
      } else {
        return { isSuccess: false, eventJson: '' }
      }
    } else {
      if (response.status === 404) {
        return { isSuccess: true, eventJson: '[]' }
      }
      return { isSuccess: false, eventJson: '' }
    }
  } catch {
    return { isSuccess: false, eventJson: '' }
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

    if (response.ok) {
      return { isSuccess: true, status: 'SUCCESS' }
    } else {
      return { isSuccess: false, status: 'ERROR' }
    }
  } catch (e: any) {
    return { isSuccess: false, status: 'INTERNALERROR' }
  }
}
