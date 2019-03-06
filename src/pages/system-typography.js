import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import styled from '@emotion/styled'
import {
  themeGet,
  compose,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  space,
  color,
  maxWidth,
} from 'styled-system'
import merge from 'lodash.merge'
import flatten from 'lodash.flattendeep'
import pick from 'lodash.pick'
import Docs from './system-typography-docs.mdx'

const typography = compose(
  // pass non-styled-system styles directly to emotion
  props => props,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  space,
  color
)

const tagNames = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'a',
  'p',
  'ol',
  'ul',
  'dl',
  'dd',
  'li',
  'blockquote',
  'hr',
  'img',
  'pre',
  'code',
  'samp',
  'kbd',
  'table',
  'tr',
  'th',
  'td',
  'b',
  'strong',
  'em',
  'i',
  'abbr',
]

const elements = ({
  theme,
  ...props
}) => {
  const styles = {}
  const els = pick(props, tagNames)
  for (const key in els) {
    const rules = typography({ theme, ...els[key] })
    const flat = flatten(rules)
    const style = merge(...flat)
    // console.log(key, rules, style)
    styles[`& ${key}`] = style
  }
  return styles
}

const Root = styled.div(
  space,
  color,
  maxWidth,
  fontFamily,
  elements
)

export const Typography = ({
  children,
  ...props
}) => {
  return (
    <Root {...props}>
      {children}
    </Root>
  )
}

// demo
const theme = {
  fonts: {
    sans: 'system-ui, sans-serif',
    serif: 'Georgia, serif',
  },
  fontSizes: [
    12, 14, 16, 20, 24, 32, 48, 64
  ],
  space: [ 0, 4, 8, 16, 32, 64, 128, 256 ],
  colors: {
    primary: 'hotpink',
  }
}

// Typography component-specific
theme.fonts.body = theme.fonts.sans
theme.fonts.heading = theme.fonts.serif

export default props =>
  <ThemeProvider theme={theme}>
    <Typography
      maxWidth={768}
      mx='auto'
      px={3}
      py={4}
      h1={{
        fontSize: [5, 6],
        lineHeight: 1.25,
        my: [4, 5, 6],
        color: 'primary',
      }}
      h2={{
        fontSize: [4, 5],
        lineHeight: 1.25,
        my: 4,
      }}
      h3={{
        fontSize: 3,
        lineHeight: 1.25,
        my: 3,
      }}
      h4={{
        fontSize: 2,
        lineHeight: 1.25,
        my: 3,
      }}
      p={{
        fontSize: [ 2, 3 ],
        my: [ 3, 4 ],
      }}>
      <h1>@styled-system/typography</h1>
      <Docs />
    </Typography>
  </ThemeProvider>
