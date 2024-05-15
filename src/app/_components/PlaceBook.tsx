import dayjs from 'dayjs'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import { simulateDelay } from '@/lib/helpers'
import { db } from '@/server/db'

import BookDelete from './BookDelete'
import BookForm from './BookForm'

const sx = {
  container: {
    p: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
}

const PlaceBook = async ({ id }: { id: number }) => {
  const userId = 1 // get the user id from the session cookie

  await simulateDelay(2000) // 2 second

  // get the price and max guests from the place and also any future bookings from the logged user
  const data = await db.place.findUnique({
    where: { id },
    select: {
      guests: true,
      price: true,
      bookings: {
        where: { userId: userId, checkIn: { gte: dayjs().toISOString() } },
        select: { id: true, checkIn: true, checkOut: true, guests: true },
      },
    },
  })

  const booking = data?.bookings[0] ?? null

  return (
    <>
      <Paper elevation={4} sx={sx.container}>
        <Box sx={{ display: 'flex', alignItems: 'center', pb: 4 }}>
          <Typography variant='h6' sx={{ fontWeight: 'bold', pr: 1 }} data-cy='book-price'>
            ${data?.price ?? 'There is something wrong!'}
          </Typography>
          <Typography variant='subtitle2'> / night</Typography>
        </Box>

        <BookForm bookId={booking?.id} placeId={id} guests={data?.guests} />
      </Paper>

      <BookDelete booking={booking} />
    </>
  )
}

export default PlaceBook
