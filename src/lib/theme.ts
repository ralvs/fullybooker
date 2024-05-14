'use client'

import { GeistSans } from 'geist/font/sans'

import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: GeistSans.style.fontFamily,
    allVariants: { color: '#444444' },
    fontSize: 12,
  },

  palette: {
    primary: { main: '#2d2aa5' },
    secondary: { main: '#41caa2' },
  },

  shape: { borderRadius: 20 },
})

export default theme
