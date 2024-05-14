import dayjs from 'dayjs'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import { deletePlace } from '@/server/placeActions'

import BookDeleteButton from './BookDeleteButton'

const sx = {
  container: {
    p: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    mt: 2,
  },
}

type BookDeleteProps = {
  id: number
  checkIn: Date
  checkOut: Date
  guests: number
} | null

const BookDelete = ({ booking }: { booking: BookDeleteProps }) => {
  return (
    <>
      {booking ? (
        <Paper elevation={2} sx={sx.container}>
          <Typography variant='h6'>You have a booking here:</Typography>
          <Typography variant='body2'>
            From {dayjs(booking?.checkIn).format('MMM D, YYYY')} to{' '}
            {dayjs(booking?.checkOut).format('MMM D, YYYY')} for {booking?.guests} guests.
          </Typography>

          <form action={deletePlace.bind(null, booking?.id ?? 0)}>
            <BookDeleteButton />
          </form>
        </Paper>
      ) : null}
    </>
  )
}

export default BookDelete
