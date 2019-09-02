import React from 'react'

import { Box as MuiBox } from '@material-ui/core'
import Container from '@material-ui/core/Container'

export default ({ container, children, ...props}) => {
  if (container) {
    return <MuiBox {...props}><Container>{children}</Container></MuiBox>
  }
  return <MuiBox {...props}>{children}</MuiBox>
}