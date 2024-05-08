import { create } from "zustand";
import {removeCategory, updateCategory, fetchCategories} from "@/app/actions/category";

export const useAdminStore = create<IState>((set) => ({
  token: undefined,
  categories: ['loading'],


  fetchCategories: async () => {
    const categories = await fetchCategories();
    if (categories !== 'ERROR') {
      if (categories.length > 0) {
        set({categories: categories})
      } else {
        set({categories: ['none']})
      }
    } else {
      set({categories: ['error']})
    }
  },
  removeCategory: async (id: string) => {
    const response = await removeCategory(id);
    if (response.message === 'SUCCESS') {
      set({categories: ['loading']});
      await fetchCategories();
    }
  },
  updateCategory: async (id: string, formData: FormData) => {
    const response = await updateCategory(id, formData);
    console.log(response)
    if (response.message === 'SUCCESS') {
      set({categories: ['loading']});
      await fetchCategories();
    }
  }
}));

interface IState {
  token: string | undefined;
  categories: any[];
  
  fetchCategories: () => Promise<void>;
  removeCategory: (id: string) => Promise<void>;
  updateCategory: (id: string, formData: FormData) => Promise<void>;
}