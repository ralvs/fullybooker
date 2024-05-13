import Image from 'next/image'

import Grid from '@mui/material/Grid'

import { db } from '@/server/db'

const sx = {
  left: { width: '100%', height: 'auto', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 },
  middle: { width: '100%', height: 'auto' },
  rightTop: { width: '100%', height: 'auto', borderTopRightRadius: 20 },
  rightBottom: { width: '100%', height: 'auto', borderBottomRightRadius: 20 },
}

const PlaceImages = async ({ id }: { id: number }) => {
  // getting only the needed data for this component
  const data = await db.place.findUnique({
    where: { id },
    select: { images: true },
  })

  // The purpose of this section is to display 5 images of the place, which would be mandatory in the registration. When clicked, it would redirect to another page with all the registered images.

  return (
    <Grid container spacing={1} sx={{ borderRadius: 20 }}>
      <Grid item xs={12} sm={6}>
        <Image alt='place' src={data?.images[0]?.url ?? ''} width={500} height={500} style={sx.left} />
      </Grid>
      <Grid item xs={6} sm={3}>
        <Image alt='place' src={data?.images[1]?.url ?? ''} width={500} height={500} style={sx.middle} />
        <Image alt='place' src={data?.images[2]?.url ?? ''} width={500} height={500} style={sx.middle} />
      </Grid>
      <Grid item xs={6} sm={3}>
        <Image alt='place' src={data?.images[3]?.url ?? ''} width={500} height={500} style={sx.rightTop} />
        <Image alt='place' src={data?.images[4]?.url ?? ''} width={500} height={500} style={sx.rightBottom} />
      </Grid>
    </Grid>
  )
}

export default PlaceImages
