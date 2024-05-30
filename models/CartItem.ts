export interface ICartItem {
  itemId: string
  name: string
  price: number
  quantity: number
  image: string
  isEvent: boolean
  isOnSale: boolean
  salePrice?: number
  saleEndDate?: string
  isArchived?: boolean
  isDeleted?: boolean
}
