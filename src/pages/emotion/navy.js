import React from 'react'
import { Link } from 'gatsby'
import { ThemeProvider } from 'emotion-theming'
import { BlocksProvider } from 'mdx-blocks'
import Box from './box'

const theme = (args) => {
  console.log(args)
  return {
    color: 'navy'
  }
}

export default props =>
  <ThemeProvider theme={theme}>
    <Box>
      Navy
    </Box>
    <Link to='/emotion'>Tomato</Link>
  </ThemeProvider>
