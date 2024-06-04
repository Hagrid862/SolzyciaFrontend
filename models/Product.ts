import { Category } from './Category';
import { Review } from './Review';
import { Tag } from './Tag';

export interface Product {
  id: string;
  name: string;
  description?: string;
  images?: string[];
  price: number;
  createdAt: Date;
  category: Category;
  tags?: Tag[];
  reviews?: Review[];
}