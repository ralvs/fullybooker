import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { GeistSans } from 'geist/font/sans'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'react-hot-toast'

import Container from '@mui/material/Container'
import { ThemeProvider } from '@mui/material/styles'

import theme from '@/lib/theme'

import TopNav from './_components/TopNav'

export const metadata = {
  title: 'Fully Booker',
  description: 'Renan Alves interview project',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={GeistSans.className}>
        <NextTopLoader color='#41caa2' />
        <Toaster
          position='top-center'
          toastOptions={{
            duration: 3000,
            style: { padding: '16px' },
            // like the notistack package
            success: {
              style: { color: 'white', background: '#43a047' },
              iconTheme: { primary: 'white', secondary: '#43a047' },
            },
            error: {
              style: { color: 'white', background: '#d32f2f' },
              iconTheme: { primary: 'white', secondary: '#d32f2f' },
            },
          }}
        />

        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <TopNav />

            <Container maxWidth='lg' component='main' sx={{ pt: 4 }}>
              {children}
            </Container>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
