import React from 'react'

import { Layout, Box, Text, Paper } from '../components'

export default (props) => (
  <Layout title={props.title}>
    <Box container bgcolor="rgb(183, 199, 228)" py={8} flexGrow="1">
      <Paper p={4}>
        <Text variant="h3" align="center" paragraph>{props.title}</Text>
        {props.caption && (
          <Box width={{ xs: '100%', md: '75%' }} mx="auto">
            <Text align="justify">
              {props.caption}
            </Text>
          </Box>
        )}
        {props.children}
      </Paper>
    </Box>
  </Layout>
)
