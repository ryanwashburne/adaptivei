import React from 'react'

import { Link as GatsbyLink } from 'gatsby'

import { withStyles } from '@material-ui/core'

const styles = theme => ({
  root: {
    textDecoration: 'none',
    color: 'inherit',
    transition: 'color 0.2s',
    '&:hover': {
      color: theme.palette.primary.dark,
      textDecoration: 'none',
    },
  },
})

export default withStyles(styles)(({ href, children, ...props }) => {
  if (href) {
    return <a className={props.classes.root} {...props} href={href}>{children}</a>
  }
  return (
    <GatsbyLink className={props.classes.root} {...props}>{children}</GatsbyLink>
  )
})