import dayjs from 'dayjs'
import Link from 'next/link'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import ChevronLeft from '@mui/icons-material/ChevronLeft'
import Favorite from '@mui/icons-material/Favorite'
import KingBedIcon from '@mui/icons-material/KingBed'
import LuggageIcon from '@mui/icons-material/Luggage'
import ShowerIcon from '@mui/icons-material/Shower'

import { simulateDelay } from '@/lib/helpers'
import { db } from '@/server/db'

// It's possible to use styled-components with MUI but they only work with 'use clients' components. I'm trying to use client components only where it's absolute necessary.
// const ContentBox = styled(Box)({
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   gap: 4,
// });

// styles fot this component
const sx = {
  nav: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    pb: 2,
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 6,
  },

  gridItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  withBorder: { borderRight: '1px solid #ccc' },
}

const PlaceDetails = async ({ id }: { id: number }) => {
  await simulateDelay(1000) // 1 second

  // getting only the needed data for this component
  const data = await db.place.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      shortDesc: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
    },
  })

  // ################################################
  // getting the unavailable dates just for the user test the overlapping
  const unavailable = await db.booking.findMany({
    where: { placeId: id, checkIn: { gte: dayjs().toISOString() }, userId: { not: 1 } },
    select: { checkIn: true, checkOut: true },
  })
  // ################################################

  return (
    <>
      {/* Navigation */}
      <Box sx={sx.nav}>
        <Link href='/'>
          <Button variant='text' color='primary' startIcon={<ChevronLeft />}>
            Back
          </Button>
        </Link>
        <Tooltip placement='top' title='Add to favorites'>
          <IconButton>
            <Favorite />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Place descriptions */}
      <Box sx={sx.content}>
        <Typography variant='h4'>{data?.name}</Typography>

        <Typography variant='subtitle1' color='text.secondary' align='justify'>
          {data?.shortDesc}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3.5} sx={{ ...sx.gridItem, ...sx.withBorder }}>
            <LuggageIcon fontSize='large' color='action' />
            <div>
              <Typography variant='h3'>{data?.guests}</Typography>
              <Typography variant='body1'>Guests</Typography>
            </div>
          </Grid>
          <Grid item xs={4} sx={{ ...sx.gridItem, ...sx.withBorder }}>
            <KingBedIcon fontSize='large' color='action' />
            <div>
              <Typography variant='h3'>{data?.bedrooms}</Typography>
              <Typography variant='body1'>Bedsrooms</Typography>
            </div>
          </Grid>
          <Grid item xs={4} sx={sx.gridItem}>
            <ShowerIcon fontSize='large' color='action' />
            <div>
              <Typography variant='h3'>{data?.bathrooms}</Typography>
              <Typography variant='body1'>Bathrooms</Typography>
            </div>
          </Grid>
        </Grid>

        <Typography variant='body1' align='justify'>
          {data?.description}
        </Typography>
      </Box>

      {/* To employer test the overlaping */}
      <Paper sx={{ p: 2, mt: 6, backgroundColor: '#ccc' }}>
        <Typography variant='subtitle2'>
          * This is not part of the project. Just to make easier for the employer test the overlap control. *
        </Typography>
        <Typography variant='subtitle2'>Unavailable dates:</Typography>
        <pre>{JSON.stringify(unavailable, null, 2)}</pre>
      </Paper>
    </>
  )
}

export default PlaceDetails
