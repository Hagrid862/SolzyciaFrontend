import { Image } from './Image'

export interface ICartItem {
  ItemId: string
  Name: string
  Price: number
  Quantity: number
  Image: Image
  IsEvent: boolean
  IsOnSale: boolean
  SalePrice?: number
  SaleEndDate?: string
  IsArchived?: boolean
  IsDeleted?: boolean
}
