import React from 'react'
import { BlocksProvider } from 'mdx-blocks'
import themes from 'mdx-blocks/themes'
import Banner from './banner.mdx'

export default props =>
<BlocksProvider
  {...themes.funk}>
  <Banner />
</BlocksProvider>
