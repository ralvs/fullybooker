import Avatar from '@mui/material/Avatar'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

const sx = {
  navContainer: {
    height: 50,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}

const TopNav = () => {
  return (
    <nav>
      <Container maxWidth='lg' sx={sx.navContainer}>
        <Typography variant='h6' color='primary'>
          Fully Booker
        </Typography>
        <Avatar alt='Renan Alves' src='/api/mockCloud/avatar.jpg' />
      </Container>
      <Divider sx={{ pt: 1 }} />
    </nav>
  )
}

export default TopNav
