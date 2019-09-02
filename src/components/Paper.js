import React from 'react'

import Paper from '@material-ui/core/Paper'
import Box from './box'

export default (props) => (
  <Box clone {...props}><Paper>{props.children}</Paper></Box>
)