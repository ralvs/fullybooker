'use client'

// import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { type z } from 'zod'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import { PlaceFormSchema } from '@/server/formSchemas'
import { upsertPlace } from '@/server/placeActions'

import Loading from './Loading'

type TypeOfSchema = z.infer<typeof PlaceFormSchema>

const BookForm = ({ bookId = 0, placeId = 0, guests = 1 }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TypeOfSchema>({
    resolver: zodResolver(PlaceFormSchema),
    mode: 'onChange',
    defaultValues: {
      placeId: placeId,
      checkIn: dayjs().add(1, 'day').toDate(),
      checkOut: dayjs().add(2, 'day').toDate(),
      guests: 1,
    },
  })

  const onSubmit = handleSubmit(async (data: TypeOfSchema) => {
    const result = await upsertPlace(data)

    if (result?.success) {
      toast.success('Your booking is successfully saved!')
      reset()
    } else toast.error(result?.error ?? 'There was an error saving your booking')
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component='form' noValidate autoComplete='off' onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={12} lg={6} xl={6}>
            <Controller
              name='checkIn'
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  sx={{ width: '100%' }}
                  label='Check-in'
                  disablePast
                  value={field.value ? dayjs(field.value) : null}
                  onChange={date => field.onChange(dayjs(date).toDate())}
                  slotProps={{
                    textField: {
                      error: !!errors.checkIn,
                      helperText: `${errors.checkIn?.message ?? ''}`,
                      // @ts-expect-error - data-cy is not in the type definition but needed for Cypress
                      'data-cy': 'checkIn',
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={12} lg={6} xl={6}>
            <Controller
              name='checkOut'
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  sx={{ width: '100%' }}
                  label='Check-out'
                  disablePast
                  value={field.value ? dayjs(field.value) : null}
                  onChange={date => field.onChange(dayjs(date).toDate())}
                  slotProps={{
                    textField: {
                      error: !!errors.checkOut,
                      helperText: `${errors.checkOut?.message ?? ''}`,
                      // @ts-expect-error - data-cy is not in the type definition but needed for Cypress
                      'data-cy': 'checkOut',
                    },
                  }}
                />
                // <TextField
                //   {...field}
                //   fullWidth
                //   required
                //   label='Check-out'
                //   type='date'
                //   value={dayjs(field.value).format('YYYY-MM-DD')}
                //   InputLabelProps={{ shrink: true }}
                //   inputProps={{ min: dayjs().format('YYYY-MM-DD') }}
                //   error={!!errors.checkOut}
                //   helperText={errors.checkOut?.message}
                // />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='guests'
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.guests}>
                  <InputLabel id='label-id'>Guests</InputLabel>
                  <Select {...field} label='Guests' labelId='label-id' data-cy='guests'>
                    {[...Array<number>(guests)].map((_, index) => (
                      <MenuItem key={index + 1} value={index + 1}>
                        {index + 1} guests
                      </MenuItem>
                    ))}
                  </Select>
                  {!!errors.guests && <FormHelperText>{errors.guests?.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type='submit'
              color={bookId ? 'warning' : 'secondary'}
              variant='contained'
              fullWidth
              disabled={isSubmitting}
              data-cy='submit-button'
            >
              {isSubmitting ? <Loading /> : bookId ? 'Update your booking' : 'Book'}
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* React Hook Form dev tool for debugging */}
      {/* <DevTool control={control} placement='top-left' /> */}
    </LocalizationProvider>
  )
}

export default BookForm
