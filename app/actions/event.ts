'use server';

import {cookies} from 'next/headers';

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

    console.log(await response.text())

    if (response.ok) {
      return {isSuccess: true, status: 'SUCCESS'};
    } else {
      return {isSuccess: false, status: 'ERROR'};
    }
   } catch (e: any) {
      console.log('error: ' + e);
      return {isSuccess: false, status: 'INTERNALERROR'};
   }
}