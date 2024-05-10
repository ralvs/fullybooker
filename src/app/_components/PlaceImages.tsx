import Image from 'next/image'

import Grid from '@mui/material/Grid'

const PlaceImages = () => {
  return (
    <Grid container spacing={1} sx={{ borderRadius: 20 }}>
      <Grid item xs={12} sm={6}>
        <Image
          alt='place'
          src={'/api/mockCloud/1.jpg'}
          width={500}
          height={500}
          style={{ width: '100%', height: 'auto', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <Image
          alt='place'
          src={'/api/mockCloud/2.jpg'}
          width={500}
          height={500}
          style={{ width: '100%', height: 'auto' }}
        />
        <Image
          alt='place'
          src={'/api/mockCloud/3.jpg'}
          width={500}
          height={500}
          style={{ width: '100%', height: 'auto' }}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <Image
          alt='place'
          src={'/api/mockCloud/4.jpg'}
          width={500}
          height={500}
          style={{ width: '100%', height: 'auto', borderTopRightRadius: 20 }}
        />
        <Image
          alt='place'
          src={'/api/mockCloud/5.jpg'}
          width={500}
          height={500}
          style={{ width: '100%', height: 'auto', borderBottomRightRadius: 20 }}
        />
      </Grid>
    </Grid>
  )
}

export default PlaceImages
