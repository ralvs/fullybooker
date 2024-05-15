'use client'

import { useFormStatus } from 'react-dom'

import Button from '@mui/material/Button'

import Loading from './Loading'

const BookDeleteButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      variant='outlined'
      color='error'
      sx={{ mt: 2, width: 140 }}
      disabled={pending}
      data-cy='cancel-button'
    >
      {pending ? <Loading /> : 'Cancel Booking'}
    </Button>
  )
}

export default BookDeleteButton
