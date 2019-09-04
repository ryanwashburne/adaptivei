import React from 'react'

import Box from './box'
import Text from './text'

import { Dialog as MuiDialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import { AppBar, Toolbar, IconButton, Hidden, useTheme, useMediaQuery } from '@material-ui/core'

import CloseIcon from '@material-ui/icons/Close'

export default (props) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <MuiDialog
      open={props.open}
      onClose={props.onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="xs"
    >
      <Hidden smUp>
        <AppBar style={{ height: 60 }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Box ml={1}>
              <Text variant="h6">
                {props.title}
              </Text>
            </Box>
          </Toolbar>
        </AppBar>
        <Box mb={2} style={{ height: 60 }} />
      </Hidden>
      <Hidden xsDown>
        {props.title && <DialogTitle>{props.title}</DialogTitle>}
      </Hidden>
      <DialogContent>
        {props.children}
      </DialogContent>
      {props.actions && <DialogActions>{props.actions}</DialogActions>}
    </MuiDialog>
  )
}
