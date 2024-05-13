import Link from 'next/link'

import Typography from '@mui/material/Typography'

const Index = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant='body1'>This page is not style because it is not part the requirements.</Typography>
      <Typography variant='body1'>Please, click on the links below to see the properties pages.</Typography>
      <br />

      <Link href='/place/1'>Place 1</Link>
      <Link href='/place/2'>Place 2</Link>
      <Link href='/place/3'>Place 3</Link>
    </div>
  )
}

export default Index
