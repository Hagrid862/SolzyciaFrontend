import { Category } from './Category';
import { EventDate } from './EventDate';
import { Review } from './Review';
import { Tag } from './Tag';

export interface Event {
  id: string;
  name: string;
  description?: string;
  time: number;
  price: number;
  category: Category;
  images?: string[];
  dates: EventDate[];
  tags: Tag[];
  reviews: Review[];
  createdAt: Date;
}