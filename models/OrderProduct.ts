import {Product} from "@/models/Product";
import {EventDate} from "@/models/EventDate";

export interface OrderProduct {
  Id: string
  Quantity: number
  IsEvent: boolean
  EventProperties?: {
    Event: Event,
    EventDate: EventDate
  }
}
