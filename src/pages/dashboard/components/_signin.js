import React from 'react'
import { navigate } from 'gatsby'

import { Layout, Box, Paper, Text, Button } from '../../../components'

import { handleLogin } from '../../../utils'

export default () => (
  <Layout title="Sign In">
    <Box flexGrow={1} m={6}>
      <Paper p={4}>
        <Text variant="h5">Sign In</Text>
        <Button onClick={() => handleLogin(() => navigate('/dashboard/'))}>Click Here</Button>
      </Paper>
    </Box>
  </Layout>
)