import { create } from "zustand";
import {fetchCategories} from "@/app/actions/category";

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
  }
}));

interface IState {
  token: string | undefined;
  categories: any[]; // replace any with the actual type of your categories
  fetchCategories: () => Promise<void>;
}