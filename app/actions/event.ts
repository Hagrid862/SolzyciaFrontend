'use server';

import {cookies} from 'next/headers';

export async function fetchEvents(reviews?: boolean, orderBy?: 'created_at' | 'price' | 'name' | 'rating' | 'popularity', order?: 'desc' | 'asc', page?: number, limit?: number): Promise<{isSuccess: boolean, eventsJson: string}> {
  try{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event${reviews || orderBy || order || page || limit ? '?' : ''}${reviews ? 'reviews=true' : ''}${orderBy ? `&orderBy=${orderBy}` : ''}${order ? `&order=${order}` : ''}${page ? `&page=${page}` : ''}${limit ? `&limit=${limit}` : ''}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      if (data.events) {
        const eventsJson = JSON.stringify(data.events);
        return {isSuccess: true, eventsJson: eventsJson }
      } else {
        return {isSuccess: false, eventsJson: '' }
      }
    } else {
      return {isSuccess: false, eventsJson: '' }
    }
  } catch (e) {
    return {isSuccess: false, eventsJson: '' }
  }
}

export async function createEvent(fromData: FormData): Promise<{isSuccess: boolean, status: string }> {
   try {
    const cookiesStorage = cookies();
    const token = cookiesStorage.get('access');
    if (token == null) {
      return {isSuccess: false, status: 'NOTOKEN'};
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token?.value}`,
      },
      body: fromData,
    });

    if (response.ok) {
      return {isSuccess: true, status: 'SUCCESS'};
    } else {
      return {isSuccess: false, status: 'ERROR'};
    }
   } catch (e: any) {
      return {isSuccess: false, status: 'INTERNALERROR'};
   }
}