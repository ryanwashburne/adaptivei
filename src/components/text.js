import React from 'react'

import Typography from '@material-ui/core/Typography'

export default (props) => (
  <Typography {...props} style={{ fontFamily: 'inherit', lineHeight: 'inherit', ...props.style }} />
)