import { OrderProduct } from "./OrderProduct";

export interface Order {
  id: string;
  products: OrderProduct[];
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  email?: string;
  name?: string;
  lastName?: string;
  status?: string;
  paymentMethod?: string;
  createdAt: Date;
}