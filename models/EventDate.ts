import { EventLocation } from './EventLocation'
import {EventLocationWithoutId} from "@/models/EventLocationWithoutId";

export interface EventDate {
  Id: string
  Date: Date
  Seats: number
  Location?: EventLocationWithoutId
}
