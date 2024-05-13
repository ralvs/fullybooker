// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { db } from '@/server/db'

const sx = {
  container: {
    p: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

const PlaceBook = async ({ id }: { id: number }) => {
  // getting only the needed data for this component
  const data = await db.place.findUnique({
    where: { id },
    select: { price: true },
  })

  return (
    <Paper elevation={4} sx={sx.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='h6' sx={{ fontWeight: 'bold', pr: 1 }}>
            ${data?.price ?? 'There is something wrong!'}
          </Typography>
          <Typography variant='subtitle2'> / night</Typography>
        </Grid>

        <Grid item xs={6}>
          {/* <DatePicker sx={{ width: '100%' }} label='Check-in' defaultValue={dayjs()} /> */}
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
            name='checkin'
            label='Check-in'
            type='date'
            defaultValue={dayjs().add(1, 'day').format('YYYY-MM-DD')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
            name='checkin'
            label='Check-in'
            type='date'
            defaultValue={dayjs().add(1, 'day').format('YYYY-MM-DD')}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='label-id'>Guests</InputLabel>
            <Select name='guests' label='Guests' labelId='label-id'>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(number => (
                <MenuItem key={number} value={number}>
                  {number} guests
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth required name='email' label='Email' />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth required name='name' label='Name' />
        </Grid>
        <Grid item xs={12}>
          <Button color='secondary' variant='contained' fullWidth>
            Book
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default PlaceBook
