import Grid from '@mui/material/Grid'

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
        <PlaceImages id={id} />
      </Grid>
      <Grid item xs={12} md={8}>
        <PlaceDetails id={id} />
      </Grid>
      <Grid item xs={12} md={4}>
        <PlaceBook id={id} />
      </Grid>
    </Grid>
  )
}

export default Place
