import React from 'react'
import clsx from 'clsx'

import { withStyles } from '@material-ui/core'

const styles = theme => ({
  divider: {
    width: 160,
    borderColor: theme.palette.secondary.main,
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(1),
  }
})

export default withStyles(styles)(({ className, ...props}) => {
  return (
    <hr className={clsx(props.classes.divider, className)} {...props} />
  )
})