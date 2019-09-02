import React from 'react'
import { withPrefix } from 'gatsby'

import ExtraLayout from '../templates/extraLayout'
import { Text, Grid, Box } from '../components'

const Phone = withPrefix('svg/phone.svg')
const Mail = withPrefix('svg/envelope-alt.svg')

export default () => (
  <ExtraLayout title="Contact Us">
    <Text align="center">
      We’re eager to speak with you. Please give us a call or send us an email.
    </Text>
    <Box mt={6}>
      <Grid container>
        <Grid item xs={6}>
          <Box display="flex" alignItems="center" justifyContent="flex-end" mr={3}>
            <img src={Phone} alt="phone" />
            <Box ml={2}>
              <Text align="right">(503) 670-7027</Text>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" alignItems="center" ml={3}>
            <img src={Mail} alt="mail" />
            <Box ml={2}>
              <a href="mailto:sales@adaptivei.net">sales@adaptivei.net</a>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  </ExtraLayout>
)
