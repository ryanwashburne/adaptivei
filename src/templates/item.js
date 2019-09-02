import React from 'react'
import Img from 'gatsby-image'

import Text from '../components/text'
import Box from '../components/box'
import Grid from '../components/grid'
import Paper from '../components/paper'
import Divider from '../components/divider'

import Fade from 'react-reveal/Fade'

import { Hidden } from '@material-ui/core'

export default (props) => {
  const Body = () => (
    <Grid item xs={12} md={7}>
      <Paper p={4}>
        <Text variant="h5" align="center">{props.title}</Text>
        <Divider />
        <Fade up distance="30px" duration={1100}>
          <>{props.children}</>
        </Fade>
      </Paper>
    </Grid>
  )
  return (
    <Box my={{ xs: 3, md: 8 }}>
      <Grid container spacing={4}>
        {props.right && <Body />}
        <Hidden xsDown>
          <Grid item xs={12} md={5}>
            <Img fluid={props.src} style={{ height: 300 }} />
          </Grid>
        </Hidden>
        {!props.right && <Body />}
      </Grid>
    </Box>
  )
}