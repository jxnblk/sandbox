import React from 'react'
import { Link } from 'gatsby'
import { ThemeProvider } from 'emotion-theming'
import { BlocksProvider } from 'mdx-blocks'
import Box from './box'

const theme = (args) => {
  console.log(args)
  return {
    color: 'tomato'
  }
}

export default props =>
  <ThemeProvider theme={theme}>
    <Box>
      Tomato
    </Box>
    <Link to='/emotion/navy'>Navy</Link>
  </ThemeProvider>
