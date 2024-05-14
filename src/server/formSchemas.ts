import { z } from 'zod'

export const PlaceFormSchema = z
  .object({
    placeId: z.number(),
    checkIn: z.date({ message: 'Please select a date for check-in' }),
    checkOut: z.date({ message: 'Please select a date for check-out' }),
    guests: z.number().min(1, { message: 'Must have at least one guest' }),
  })
  .refine(data => data.checkIn < data.checkOut, {
    path: ['checkOut'],
    message: 'Check-out must be after check-in',
  })
