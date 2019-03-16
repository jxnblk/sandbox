import React from 'react'
import { Link } from 'gatsby'
import { ThemeProvider } from 'emotion-theming'
import { BlocksProvider } from 'mdx-blocks'
import Box from './box'

export default props =>
  <ThemeProvider
    theme={{
      color: 'navy',
    }}>
    <Box>
      Navy
    </Box>
    <Link to='/emotion'>Tomato</Link>
  </ThemeProvider>
