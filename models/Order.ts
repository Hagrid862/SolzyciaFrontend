import { OrderProduct } from './OrderProduct'

export interface Order {
  Id: string
  Products: OrderProduct[]
  Phone?: string
  Email?: string
  Name?: string
  LastName?: string
  Status?: string
  PaymentMethod?: string
  CreatedAt: Date
}
