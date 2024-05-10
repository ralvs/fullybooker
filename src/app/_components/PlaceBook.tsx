'use client'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'

import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const sx = {
  container: {
    p: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

const PlaceBook = () => {
  return (
    <Paper elevation={4} sx={sx.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='h6' sx={{ fontWeight: 'bold', pr: 1 }}>
            $350
          </Typography>
          <Typography variant='subtitle2'> / night</Typography>
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item xs={6}>
            <DatePicker sx={{ width: '100%' }} label='Check-in' defaultValue={dayjs()} />
          </Grid>
          <Grid item xs={6}>
            <DatePicker sx={{ width: '100%' }} label='Check-out' defaultValue={dayjs()} />
          </Grid>
        </LocalizationProvider>
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
