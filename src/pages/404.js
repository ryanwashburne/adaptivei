import React from "react"

import Layout from '../components/layout'
import Box from '../components/box'
import Paper from '../components/paper'
import Text from '../components/text'

export default () => (
  <Layout title="404: Page Not Found">
    <Box container flexGrow={1} m={6}>
      <Paper p={4}>
        <Text variant="h3">NOT FOUND</Text>
        <Text>You just hit a route that doesn&#39;t exist... the sadness.</Text>
      </Paper>
    </Box>
  </Layout>
)
