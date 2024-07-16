import { Category } from './Category'
import { EventDate } from './EventDate'
import { Image } from './Image'
import { Review } from './Review'
import { Tag } from './Tag'

export interface Event {
  Id: string
  Name: string
  Description?: string
  Time: number
  Price: number
  Category: Category
  Images?: Image[]
  Dates: EventDate[]
  Tags: Tag[]
  Reviews: Review[]
  CreatedAt: Date
}
