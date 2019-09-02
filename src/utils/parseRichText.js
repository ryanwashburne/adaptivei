import React from 'react'

import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import { Text } from '../components'

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text paragraph>{children}</Text>,
  },
}

export default (json) => documentToReactComponents(json, options)