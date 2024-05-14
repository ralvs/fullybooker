import dayjs from 'dayjs'

export const isOverlapping = (
  newBooking: { checkIn: Date; checkOut: Date },
  used: { checkIn: Date; checkOut: Date }[],
) => {
  const newCheckIn = dayjs(newBooking.checkIn).startOf('day')
  const newCheckOut = dayjs(newBooking.checkOut).startOf('day')

  for (const booking of used) {
    const checkIn = dayjs(booking.checkIn).startOf('day')
    const checkOut = dayjs(booking.checkOut).startOf('day')

    if (
      (newCheckIn.isSame(checkOut) || newCheckIn.isBefore(checkOut)) &&
      (newCheckOut.isSame(checkIn) || newCheckOut.isAfter(checkIn))
    ) {
      return true
    }
  }

  return false
}

export const simulateDelay = (duration: number) => new Promise(resolve => setTimeout(resolve, duration))
