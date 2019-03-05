import React, { useState } from 'react'
import { Global } from '@emotion/core'
import { width, color } from 'styled-system'
import Lorem from './lorem.mdx'

// styletype
import merge from 'lodash.merge'

const px = n => typeof n === 'number' ? n + 'px' : n

const addStyle = styles => (style, ...elements) => {
  elements.forEach(el => {
    styles[el] = Object.assign({}, styles[el], style)
  })
}

const createStyles = ({
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  space,
  fontSizes,
  margin,
  bold,
  heading,
  monospace,
}) => {
  const styles = {}
  const sx = addStyle(styles)
  styles.body = {
    fontFamily,
    fontSize: px(fontSize),
    lineHeight,
    fontWeight,
    margin: 0,
  }

  sx({
    marginTop: space[margin],
    marginBottom: space[margin],
  }, ...blockElements)

  sx(heading, 'h1', 'h2', 'h3', 'h4', 'h5', 'h6')
  sx(monospace, 'pre', 'code', 'samp', 'kbd')

  sx({ fontSize: fontSizes[5] }, 'h1')
  sx({ fontSize: fontSizes[4] }, 'h2')
  sx({ fontSize: fontSizes[3] }, 'h3')
  sx({ fontSize: fontSizes[2] }, 'h4')
  sx({ fontSize: fontSizes[1] }, 'h5')
  sx({ fontSize: fontSizes[0] }, 'h6')

  return styles
}

const tx = (opts = {}) => {
  const options = merge({
    fontFamily: 'system-ui, sans-serif',
    fontSize: 16,
    lineHeight: 1.5,
    fontWeight: 400,
    ratio: 2,
    margin: 4,
    heading: {
      lineHeight: 1.25,
      fontWeight: 700,
    },
    monospace: {}
  }, opts)

  const {
    fontFamily,
    fontSize,
    lineHeight,
    fontWeight,
    ratio,
    margin,
    bold,
    heading = {},
    monospace = {},
  } = options

  const x = ratio => n => Math.pow(ratio, n)
  // do i even want this
  const rhythm = n => {
    // 3 works because 1.5 line height
    const x = n * fontSize * lineHeight // / 3
    return parseFloat(x.toFixed(5))
  }
  const scale = [2, 3, 4, 5, 6, 7, 8].map(n => Math.pow(2, n))
  const space = [ 0, ...scale ].map(n => n * fontSize / 16)
  // should space be connected to lineHeight
  // const space2 = [ 0, 1, 2, ...scale ].map(rhythm)

  const distance = ratio - 1
  const fontSizes = [
    (1 - distance / 4),
    (1 - distance / 8),
    1, // base fontSize
    (1 + distance / 4),
    (1 + distance / 2),
    ratio,
    ratio * 3/2,
    ratio * 2,
  ].map(n => n * fontSize) // .map(x(ratio))

  const theme = {
    space,
    fontSizes,
    rhythm,
  }

  const styles = createStyles({
    ...theme,
    ...options,
  })

  return {
    rhythm,
    theme,
    styles,
  }
}

const Flex = props =>
  <div
    {...props}
    css={{
      display: 'flex',
      flexWrap: 'wrap',
    }}
  />

const Box = props =>
  <div
    {...props}
    css={[
      { padding: 32 },
      width(props),
      color(props),
    ]}
  />

export default props => {
  const [state, setState] = useState({
    fontSize: 16,
    lineHeight: 1.5,
    ratio: 2
  })
  const x = tx(state)
  console.log(x)
  return (
    <>
      <Global styles={x.styles} />
      <Flex>
        <Box width={[1, 3/4]}>
          <h1>Type System 2</h1>
          {false && <pre children={JSON.stringify(x, null, 2)} />}
          <div>
            {x.theme.fontSizes.length}
            {x.theme.fontSizes.map((fontSize, i) => (
              <div
                key={i + fontSize}
                style={{ fontSize }}>
                Hello {fontSize}
              </div>
            ))}
          </div>
          <Lorem />
        </Box>
        <Box
          width={[1, 1/4]}
          bg='tomato'>
          <div>
            <label htmlFor='fontSize'>fontSize</label>
            <input
              type='number'
              id='fontSize'
              name='fontSize'
              value={state.fontSize}
              onChange={e => {
                setState({
                  ...state,
                  fontSize: parseFloat(e.target.value)
                })
              }}
            />
          </div>
          <div>
            <label htmlFor='lineHeight'>lineHeight</label>
            <input
              type='number'
              id='lineHeight'
              name='lineHeight'
              min='1'
              max='3'
              step={1/16}
              value={state.lineHeight}
              onChange={e => {
                setState({
                  ...state,
                  lineHeight: parseFloat(e.target.value)
                })
              }}
            />
          </div>
          <div>
            <label htmlFor='ratio'>ratio</label>
            <input
              type='number'
              id='ratio'
              name='ratio'
              min='1.5'
              max='3'
              step={1/8}
              value={state.ratio}
              onChange={e => {
                setState({
                  ...state,
                  ratio: parseFloat(e.target.value)
                })
              }}
            />
          </div>
        </Box>
      </Flex>
    </>
  )
}

const blockElements = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'ul',
  'ol',
  'dl',
  'dd',
  'p',
  'figure',
  'pre',
  'table',
  'fieldset',
  'blockquote',
  'form',
  'iframe',
  'img',
  'hr',
  'address',
]
