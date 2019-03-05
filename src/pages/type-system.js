import React, { useState } from 'react'
import { Global } from '@emotion/core'
import merge from 'lodash.merge'
import Lorem from './lorem.mdx'

const Input = ({
  name,
  value,
  onChange,
  ...props
}) =>
  <input
    {...props}
    id={name}
    name={name}
    value={value}
    onChange={e => {
      const { value } = e.target
      onChange({ [name]: parseFloat(value) })
    }}
    css={{
      fontSize: 'inherit',
      display: 'block',
      width: '100%',
    }}
  />

const Field = props =>
  <div>
    <label htmlFor={props.name}>{props.name}</label>
    <Input {...props} />
  </div>

const Container = props =>
  <div
    {...props}
    css={{
      maxWidth: 768,
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: 32,
    }}
  />

const Headings = ({
  fontSizes = [],
}) => (
  <>
    {[...fontSizes]
      .reverse()
      .map(fontSize => (
      <h2
        key={fontSize}
        style={{ fontSize }}>
        {fontSize}
        Hamburger
      </h2>
    ))}
  </>
)

export default () => {
  const [state, setState] = useState({
    fontSize: 16,
    lineHeight: 1.5,
    ratio: 2,
  })

  const handleChange = next => setState({ ...state, ...next })

  const t = styletype({
    ...state,
    heading: {
      lineHeight: 1.25,
    }
  })

  return (
    <>
      <Global styles={t.styles} />
      <Container>
        <h1>type-system</h1>
        <p>
          This is an experimental abstraction and module for generating
          typographic styles, similar to the Typography.js API, but with a different algorithm and different opinions.
        </p>
        <div>
          <Field
            type='number'
            name='fontSize'
            min='10'
            max='64'
            value={state.fontSize}
            onChange={handleChange}
          />
          <Field
            type='number'
            name='lineHeight'
            step='0.03125'
            min='1'
            max='3'
            value={state.lineHeight}
            onChange={handleChange}
          />
          <Field
            type='number'
            name='ratio'
            min='1.25'
            max='4'
            step='0.125'
            value={state.ratio}
            onChange={handleChange}
          />
        </div>
        <Headings {...t.theme} />
        <Lorem />
      </Container>
      <pre children={JSON.stringify(t, null, 2)} />
    </>
  )
}


// experimental module
// inspired by typography.js but with a different algorithm and different opinions

const defaults = {
  fontFamily: 'system-ui, sans-serif',
  fontSize: 16,
  lineHeight: 1.5,
  fontWeight: 'normal',
  boldWeight: 'bold',
  ratio: 2, // currently unused
  blockMargin: 1,
  heading: {},
  monospace: {},
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

const num = n => typeof n === 'number'
const px = n => num(n) ? n + 'px' : n

// modularscale package reference
// const ms = (n, ratio) => Math.pow(ratio, n)
// const scale = n => ms(n, ratio) * fontSize

const applyStyles = styles => (keys = [], style = {}) => {
  keys.forEach(key => {
    styles[key] = { ...styles[key], ...style }
  })
}

const convertTypographyTheme = base => {
  const fontKeywords = [
    'inherit',
    'default',
    'sans-serif',
    'serif',
    'monospace',
    'fantasy',
    'cursive',
    'system-ui',
  ]
  const fontStack = (fonts) => fonts
    .map(font => fontKeywords.includes(font)
      ? font
      : `"${font}"`
    ).join(', ')
  return {
    fontSize: parseInt(base.baseFontSize, 10),
    fontFamily: fontStack(base.bodyFontFamily),
    lineHeight: base.baseLineHeight,
    fontWeight: base.bodyWeight,
    ratio: base.scaleRatio,
    blockMargin: base.blockMarginBottom,
    boldWeight: base.boldWeight,
    heading: {
      fontFamily: fontStack(base.headerFontFamily),
      lineHeight: base.headerLineHeight,
      fontWeight: base.headerWeight,
    },
  }
}

const styletype = (config = {}) => {
  const {
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    ratio,
    blockMargin, // mt and mb for block-level typographic elements
    boldWeight,
    heading,
    monospace,
  } = merge(defaults, config)

  // mimick compass-vertical-rhythm
  // todo: use config.scale
  const rhythm = (n) => {
    const length = n * fontSize
    return parseFloat(length.toFixed(5))
  }

  const fontSizes = [
    // bespoke scale (jordan-polya)
    3/4,
    7/8,
    1,
    5/4,
    3/2,
    2,
    3,
    4,
  ].map(rhythm)

  const space = [
    0,
    1/4,
    1/2,
    1,
    2,
    4,
    8,
    16,
    32,
  ].map(rhythm)

  const theme = {
    fontSizes,
    space,
  }

  const styles = {}

  styles.body = {
    fontFamily,
    fontSize: px(fontSize),
    lineHeight: lineHeight + '',
    fontWeight,
    boxSizing: 'border-box',
    margin: 0,
  }

  // reset stuff
  // adding because typography.js includes some of this stuff
  styles.img = { maxWidth: '100%', height: 'auto' }

  const my = px(rhythm(blockMargin))
  const sx = applyStyles(styles)
  sx(blockElements, {
    marginTop: my,
    marginBottom: my,
  })

  sx(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', ], {
    ...heading,
  })
  sx(['h1'], { fontSize: fontSizes[5] })
  sx(['h2'], { fontSize: fontSizes[4] })
  sx(['h3'], { fontSize: fontSizes[3] })
  sx(['h4'], { fontSize: fontSizes[2] })
  sx(['h5'], { fontSize: fontSizes[1] })
  sx(['h6'], { fontSize: fontSizes[0] })

  styles.blockquote = {
    marginLeft: px(rhythm(1)),
    marginRight: px(rhythm(1)),
  }
  sx([ 'b', 'strong', 'dt', 'th' ], {
    fontWeight: boldWeight,
  })

  sx([ 'ol', 'ul' ], {
    listStylePosition: 'outside',
    listStyleImage: 'none',
    marginLeft: px(rhythm(1)),
  })

  styles.li = {
    // from typography.js
    // marginBottom: `calc(${my} / 2)`
    paddingLeft: 0,
  }
  sx(['li > ol', 'li > ul'], {
    marginLeft: px(rhythm(1)),
    // marginTop: `calc(${my} / 2)`
    // marginBottom: `calc(${my} / 2)`
  })
  sx(['li > p'], {
    marginTop: 0,
    marginBottom: 0,
  })
  sx([ 'code', 'pre', 'kbd', 'samp' ], {
    fontSize: '85%',
    ...monospace,
  })

  // extras
  // abbr acronym
  // table, thead, td, th,
  return {
    // theme object
    theme,
    // components
    // style object
    styles,
    // rhythm
    rhythm,
  }
}
