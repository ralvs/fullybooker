import Image from 'next/image'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import { db } from '@/server/db'

const sx = {
  gridHeigth: {
    '@media (min-width: 600px)': { height: '30vh' },
    '@media (max-width: 599px)': { height: '25vh' },
  },

  imageContainer: {
    position: 'relative',
    height: 'calc(50% - 4px)',
  },

  imageContainerMargin: {
    position: 'relative',
    height: 'calc(50% - 4px)',
    marginBottom: 1,
  },
}

const PlaceImages = async ({ id }: { id: number }) => {
  // getting only the needed data for this component
  const data = await db.place.findUnique({
    where: { id },
    select: { images: true },
  })

  // The idea of this section is to display 5 images of the place, which would be mandatory in the registration. When clicked, it would redirect to another page with all the registered images.

  // The Next.js Image component is an extreme powerfull tool for image optimization and performance. But it needs some tricky config and containers to provide a super fluid experience.

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} sx={sx.gridHeigth}>
        <Box sx={{ position: 'relative', height: '100%' }}>
          <ImageCustom src={data?.images[0]?.url ?? ''} />
        </Box>
      </Grid>
      <Grid item xs={6} sm={3} sx={sx.gridHeigth}>
        <Box sx={sx.imageContainerMargin}>
          <ImageCustom src={data?.images[1]?.url ?? ''} />
        </Box>
        <Box sx={sx.imageContainer}>
          <ImageCustom src={data?.images[2]?.url ?? ''} />
        </Box>
      </Grid>
      <Grid item xs={6} sm={3} sx={sx.gridHeigth}>
        <Box sx={sx.imageContainerMargin}>
          <ImageCustom src={data?.images[3]?.url ?? ''} />
        </Box>
        <Box sx={sx.imageContainer}>
          <ImageCustom src={data?.images[4]?.url ?? ''} />
        </Box>
      </Grid>
    </Grid>
  )
}

export default PlaceImages

const ImageCustom = ({ src }: { src: string }) => {
  return <Image alt='place' src={src} fill style={{ objectFit: 'cover', borderRadius: 20 }} />
}
