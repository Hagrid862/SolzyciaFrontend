'use server'

import { CreateCategoryFormSchema, CreateCategoryFormState } from '@/app/lib/definitions'
import { cookies } from 'next/headers'

export async function createCategory(state: CreateCategoryFormState, action: FormData) {
  const validatedFields = CreateCategoryFormSchema.safeParse({
    name: action.get('name'),
    description: action.get('description'),
    icon: action.get('icon')
  })

  if (!validatedFields.success) {
    return {
      errors: {
        name: validatedFields.error.errors.filter((e) => e.path[0] == 'name').map((e) => e.message),
        description: validatedFields.error.errors.filter((e) => e.path[0] == 'description').map((e) => e.message),
        icon: validatedFields.error.errors.filter((e) => e.path[0] == 'icon').map((e) => e.message)
      },
      message: undefined
    }
  }

  try {
    const cookieStorage = cookies()

    const token = cookieStorage.get('access')

    if (token === null) {
      return {
        errors: undefined,
        message: 'NO_TOKEN'
      }
    }

    let object: {} = {
      name: action.get('name'),
      description: action.get('description'),
      icon: action.get('icon')
    }
    const json = JSON.stringify(object)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json'
      },
      body: json
    })

    if (response.status == 200) {
      return {
        errors: undefined,
        message: 'SUCCESS'
      }
    } else {
      return {
        errors: undefined,
        message: 'ERROR'
      }
    }
  } catch (e: any) {
    return {
      errors: undefined,
      message: 'ERROR'
    }
  }
}

export async function fetchCategories() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log(response.status)

    if (response.status == 200) {
      const data = await response.json()
      console.log(data)
      return data
    } else {
      return 'ERROR'
    }
  } catch (e: any) {
    return 'ERROR'
  }
}

export async function updateCategory(categoryId: string, formData: FormData) {
  try {
    const cookiesStorage = cookies()

    const token = cookiesStorage.get('access')

    if (token === null) {
      return {
        message: 'NO_TOKEN'
      }
    }

    let object: {} = {
      id: categoryId,
      name: formData.get('name'),
      description: formData.get('description'),
      icon: formData.get('icon')
    }
    const json = JSON.stringify(object)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token!.value}`
      },
      body: json
    })

    console.log(response.status)
    console.log(await response.text())

    if (response.status == 200) {
      return {
        message: 'SUCCESS'
      }
    } else {
      return {
        message: 'ERROR'
      }
    }
  } catch (e: any) {
    return {
      message: 'ERROR'
    }
  }
}

export async function removeCategory(categoryId: string) {
  try {
    const cookiesStorage = cookies()

    const token = cookiesStorage.get('access')

    if (token === null) {
      return {
        message: 'NO_TOKEN'
      }
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${categoryId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token!.value}`
      }
    })

    if (response.status == 200) {
      return {
        message: 'SUCCESS'
      }
    } else {
      return {
        message: 'ERROR'
      }
    }
  } catch (e: any) {
    return {
      message: 'ERROR'
    }
  }
}
