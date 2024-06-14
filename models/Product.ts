import { Category } from './Category'
import { Review } from './Review'
import { Tag } from './Tag'

export interface Product {
  Id: string
  Name: string
  Description?: string
  Images?: string[]
  Price: number
  CreatedAt: Date
  Category: Category
  Tags?: Tag[]
  Reviews?: Review[]
}
