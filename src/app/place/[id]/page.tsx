import { Suspense } from 'react'

import Grid from '@mui/material/Grid'

import Loading from '@/app/_components/Loading'
import PlaceBook from '@/app/_components/PlaceBook'
import PlaceDetails from '@/app/_components/PlaceDetails'
import PlaceImages from '@/app/_components/PlaceImages'

const Place = ({ params: { id } }: { params: { id: number } }) => {
  id = Number(id)

  // I could query the data here and pass it as props to the components, but I'm trying to use the server-side rendering as much as possible. And also, quering inside each component makes it more reusable and the Next.js Cache will take care of the rest.
  // const data = await db.place.findUnique({ where: { id } })

  return (
    <Grid container rowSpacing={8} columnSpacing={6}>
      <Grid item xs={12}>
        <Suspense
          fallback={
            // As the images are on the top and usually take more time to load, I'm using a fixed height to avoid the layout shift.
            <div style={{ height: '25vw' }}>
              <Loading contained />
            </div>
          }
        >
          <PlaceImages id={id} />
        </Suspense>
      </Grid>
      <Grid item xs={12} md={8}>
        <Suspense fallback={<Loading contained />}>
          <PlaceDetails id={id} />
        </Suspense>
      </Grid>
      <Grid item xs={12} md={4}>
        <Suspense fallback={<Loading contained />}>
          <PlaceBook id={id} />
        </Suspense>
      </Grid>
    </Grid>
  )
}

export default Place
