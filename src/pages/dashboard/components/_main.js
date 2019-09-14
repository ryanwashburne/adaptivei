import React from 'react'

import { Layout, Box, Paper, Text, Grid } from '../../../components'

import Deal from './_deal'
import Deals from './_deals'

import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DashboardIcon from '@material-ui/icons/Dashboard'

export default props => {
  const data = props.user ? props.user.app_metadata : {}
  return (
    <Layout title="Dashboard">
      <Box container flexGrow={1} my={6} mx={{ xs: 2, md: 6 }}>
        <Paper p={4}>
          <Box mb={3}>
            <Text
              variant="h4"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <DashboardIcon color="secondary" style={{ fontSize: 30 }} />&nbsp;Dashboard
            </Text>
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Text color="textSecondary">Deal Registration</Text>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ display: 'block' }}>
                  <Deal />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
            {data.roles && data.roles[0] === 'admin' && (
              <Grid item xs={12} md={6}>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Text color="textSecondary">Approve/Deny Deals</Text>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails style={{ display: 'block' }}>
                    <Deals user={props.user} />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Box>
    </Layout>
  )
}
