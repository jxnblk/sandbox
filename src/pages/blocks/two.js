import React from 'react'
import { BlocksProvider } from 'mdx-blocks'
import Banner from './banner.mdx'

export default () =>
  <BlocksProvider>
    <Banner />
  </BlocksProvider>
