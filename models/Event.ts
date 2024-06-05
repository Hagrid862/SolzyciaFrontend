import { Category } from './Category'
import { EventDate } from './EventDate'
import { Review } from './Review'
import { Tag } from './Tag'

export interface Event {
  Id: string
  Name: string
  Description?: string
  Time: number
  Price: number
  Category: Category
  Images?: string[]
  Dates: EventDate[]
  Tags: Tag[]
  Reviews: Review[]
  CreatedAt: Date
}
