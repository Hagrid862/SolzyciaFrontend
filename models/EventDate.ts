import { EventLocation } from './EventLocation'

export interface EventDate {
  Id: string
  Date: Date
  Seats: number,
  Location?: EventLocation
}
