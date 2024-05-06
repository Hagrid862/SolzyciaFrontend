'use server';

import {CreateCategoryFormSchema, CreateCategoryFormState} from "@/app/lib/definitions";
import axios from "axios";
import {cookies} from "next/headers";

export async function createCategory(state: CreateCategoryFormState, action: FormData) {
  const validatedFields = CreateCategoryFormSchema.safeParse({
    name: action.get('name'),
    description: action.get('description'),
    icon: action.get('icon'),
  });

  if (!validatedFields.success) {
    return {
      errors: {
        name: validatedFields.error.errors.filter((e) => e.path[0] == 'name').map((e) => e.message),
        description: validatedFields.error.errors.filter((e) => e.path[0] == 'description').map((e) => e.message),
        icon: validatedFields.error.errors.filter((e) => e.path[0] == 'icon').map((e) => e.message),
      },
      message: undefined,
    }
  }

  try {
    const cookieStorage = cookies();

    const token = cookieStorage.get('access');

    if (token === null) {
      return {
        errors: undefined,
        message: 'NO_TOKEN',
      }
    }

    // Convert FormData to JSON
    let object: {} = {
      name: action.get('name'),
      description: action.get('description'),
      icon: action.get('icon'),
    };
    const json = JSON.stringify(object);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token?.value}`,
        'Content-Type': 'application/json'
      },
      body: json
    });

    console.log('category: ', await response.text())

    if (response.status == 200) {
      return {
        errors: undefined,
        message: 'SUCCESS',
      }
    } else {
      return {
        errors: undefined,
        message: 'ERROR',
      }
    }
  } catch (e: any) {
    console.log(e)
    return {
      errors: undefined,
      message: 'ERROR',
    }
  }
}

export async function fetchCategories() {
  try {
    const cookiesStorage = cookies();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookiesStorage.get('access')?.value}`
      }
    });


    if (response.status == 200) {
      return await response.json();
    } else {
      return 'ERROR'
    }
  } catch (e: any) {
    return 'ERROR';
  }
}