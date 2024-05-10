import Grid from '@mui/material/Grid'

// import { CreatePost } from '@/app/_components/create-post'
// import { api } from '@/trpc/server'

import PlaceBook from './_components/PlaceBook'
import PlaceDetails from './_components/PlaceDetails'
import PlaceImages from './_components/PlaceImages'

export default async function Home() {
  // const hello = await api.post.hello({ text: 'from tRPC' })

  return (
    <Grid container rowSpacing={8} columnSpacing={6}>
      <Grid item xs={12}>
        <PlaceImages />
      </Grid>
      <Grid item xs={12} md={8}>
        <PlaceDetails />
      </Grid>
      <Grid item xs={12} md={4}>
        <PlaceBook />
      </Grid>
    </Grid>
  )
}

// async function CrudShowcase() {
//   const latestPost = await api.post.getLatest()

//   return (
//     <div>
//       {latestPost ? <p>Your most recent post: {latestPost.name}</p> : <p>You have no posts yet.</p>}

//       <CreatePost />
//     </div>
//   )
// }
