import { OrderProduct } from './OrderProduct'

export interface Order {
  Id: string
  Products: OrderProduct[]
  Address?: string
  Address2?: string
  City?: string
  State?: string
  Zip?: string
  Country?: string
  Phone?: string
  Email?: string
  Name?: string
  LastName?: string
  Status?: string
  PaymentMethod?: string
  CreatedAt: Date
}
