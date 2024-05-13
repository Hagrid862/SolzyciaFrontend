import {create} from "zustand";
import {removeCategory, updateCategory, fetchCategories} from "@/app/actions/category";
import {image} from "@nextui-org/react";
import {createProduct, fetchProducts} from "@/app/actions/product";
import {logout} from "@/app/actions/auth";

export const useAdminStore = create<IState>((set) => ({
  token: undefined,
  categories: ['loading'],
  products: ['loading'],

  logout: () => {
    logout();
    set({token: undefined});
  },

  fetchCategories: async () => {
    set({categories: ['loading']});
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
    if (response.message === 'SUCCESS') {
      set({categories: ['loading']});
      await fetchCategories();
    }
  },

  fetchProducts: async () => {
    const response = await fetchProducts();

    if (response.isSuccess) {
      const products = JSON.parse(response.productsJson);
      if (products && products.length > 0) {
        set({products: products});
        return {isSuccess: true};
      } else {
        set({products: ['none']});
        return {isSuccess: false};
      }
    } else {
      set({products: ['error']});
      return {isSuccess: false};
    }
  },
  addProduct: async (name: string, price: number, description: string, title?: string, categoryId?: string, tags?: string[], images?: File[]): Promise<{ isSuccess: boolean }> => {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('price', price.toString());
    formData.append('description', description);

    if (title) {
      formData.append('title', title);
    }
    if (categoryId) {
      formData.append('category', categoryId);
    }
    if (tags) {
      formData.append('tags', tags.join(','));
    }
    if (images) {
      images.forEach((image, index) => {
        formData.append(`image${index}`, image, image.name);
      });
    }

    const response = await createProduct(formData);
    return response;
  }
}));

interface IState {
  token: string | undefined;
  categories: any[];
  products: any[];

  logout: () => void;

  fetchCategories: () => Promise<void>;
  removeCategory: (id: string) => Promise<void>;
  updateCategory: (id: string, formData: FormData) => Promise<void>;

  fetchProducts: () => Promise<{ isSuccess: boolean, products?: any }>;
  addProduct: (name: string, price: number, description: string, title?: string, categoryId?: string, tags?: string[], images?: File[]) => Promise<{ isSuccess: boolean }>;
}