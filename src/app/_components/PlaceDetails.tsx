import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import KingBedIcon from '@mui/icons-material/KingBed'
import LuggageIcon from '@mui/icons-material/Luggage'
import ShowerIcon from '@mui/icons-material/Shower'

// It's possible to use styled-components with MUI but it only works with 'use clients'
// const ContentBox = styled(Box)({
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   gap: 4,
// });

const sx = {
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

const PlaceDetails = async () => {
  return (
    <Box sx={sx.content}>
      <Typography variant='h4'>Bethel Woods Serenity: Your Autumn Escape</Typography>
      <Typography variant='subtitle1' color='text.secondary' align='justify'>
        The Hemlock House at Bethel Woods: Stunning A-Frame 5 Mins From Bethel Woods Center
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={3.5} sx={{ ...sx.gridItem, ...sx.withBorder }}>
          <LuggageIcon fontSize='large' color='action' />
          <div>
            <Typography variant='h3'>8</Typography>
            <Typography variant='body1'>Guests</Typography>
          </div>
        </Grid>
        <Grid item xs={4} sx={{ ...sx.gridItem, ...sx.withBorder }}>
          <KingBedIcon fontSize='large' color='action' />
          <div>
            <Typography variant='h3'>3</Typography>
            <Typography variant='body1'>Bedsrooms</Typography>
          </div>
        </Grid>
        <Grid item xs={4} sx={sx.gridItem}>
          <ShowerIcon fontSize='large' color='action' />
          <div>
            <Typography variant='h3'>3</Typography>
            <Typography variant='body1'>Bathrooms</Typography>
          </div>
        </Grid>
      </Grid>

      <Typography variant='body1' align='justify'>
        Welcome to The Hemlock House at Bethel Woods – a gorgeous modern home surrounded by woodlands of
        Eastern pine and hemlock trees. In 1969 Bethel Woods was home to the notorious Woodstock festival.
        Located in the country hills of the Sullivan Catskills, Bethel Woods is an amazing place to explore,
        hike, and listen to live music. Just 5 minutes away from Bethel Woods Center of the Arts, you will
        find a stunning A-Frame home waiting to host your next adventure.
      </Typography>
    </Box>
  )
}

export default PlaceDetails
