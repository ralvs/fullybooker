'use server'

import dayjs from 'dayjs'
import { revalidatePath } from 'next/cache'
import { type z } from 'zod'

import { isOverlapping, simulateDelay } from '@/lib/helpers'
import { PlaceFormSchema } from '@/server/formSchemas'

import { db } from './db'

type TypeOfSchema = z.infer<typeof PlaceFormSchema>

export const upsertPlace = async (data: TypeOfSchema) => {
  await simulateDelay(2000)

  // get the logged user id from the session cookie
  const userId = 1

  // ################################################
  // validate the data again
  const result = PlaceFormSchema.safeParse(data)

  if (result.error) {
    console.log(`${Date()} --->>>`, result.error.format())
    return { success: false, error: 'There was an error in the data sent. Please try again.' }
  }

  const { placeId, ...fields } = result.data

  // ################################################
  // verify overlapping bookings of other users
  const unavailable = await db.booking.findMany({
    where: { placeId: placeId, checkIn: { gte: dayjs().toISOString() }, userId: { not: userId } },
    select: { checkIn: true, checkOut: true },
  })

  if (isOverlapping({ checkIn: fields.checkIn, checkOut: fields.checkOut }, unavailable))
    return { success: false, error: 'Sorry, the place is already booked for the selected dates.' }

  // ################################################
  // save the booking

  const userBook = await db.booking.findFirst({
    where: { placeId, userId, checkIn: { gte: dayjs().toISOString() } },
    select: { id: true },
  })

  try {
    const upsert = await db.booking.upsert({
      where: { id: userBook?.id ?? 0 },
      update: { ...fields },
      create: {
        ...fields,
        user: { connect: { id: userId } },
        place: { connect: { id: placeId } },
      },
    })

    revalidatePath('/place')
    return { success: true, bookId: upsert.id }
  } catch (err) {
    console.log(`${Date()} --->>>`, err)
    return { success: false, error: 'Error saving your booking. Please try again.' }
  }
}

//
// ##########################################################################################
//

export const deletePlace = async (id: number) => {
  await simulateDelay(1000)

  try {
    await db.booking.delete({ where: { id } })
    revalidatePath('/place')
    return { success: true }
  } catch (err) {
    console.log(`${Date()} --->>>`, err)
    return { success: false, error: 'Error deleting your booking. Please try again.' }
  }
}
