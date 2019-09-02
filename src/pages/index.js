import React from 'react'
import { withPrefix } from 'gatsby'

import Carousel from '../components/carousel'

import { Layout, Link, Box, Text, Button, Paper, Grid } from '../components'

const Lock = withPrefix('svg/lock-alt.svg')
const Radio = withPrefix('svg/radio-big.svg')
const Chart = withPrefix('svg/line-chart.svg')
const People = withPrefix('svg/people-big.svg')

const CAROUSEL_HEIGHT = 550
const tagline = 'Our business is built on long-term relationships. Our customers trust us to deliver state-of-the-art solutions tailored to the needs of their enterprise.'

export default () => {
  const Slide = ({ title, children }) => (
    <Box 
      style={{ height: CAROUSEL_HEIGHT }}
      textAlign={{ xs: 'center', md: 'left' }}
      color="white"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Box container>
        <Text variant="h2" gutterBottom>{title}</Text>
        <Text variant="h5">{children}</Text>
      </Box>
    </Box>
  )

  const Item = ({ icon, title, to, children }) => (
    <Paper py={3} px={2} display="flex" flexDirection="column" textAlign="center" height="100%">
      <Box mb={{ xs: 0, md: 2 }}>
        <img src={icon} alt="icon" />
      </Box>
      <Text variant="h5" gutterBottom>
        <Link to={to}>{title}</Link>
      </Text>
      <Text paragraph align="left" color="textSecondary" variant="subtitle1" style={{ flexGrow: 1 }}>{children}</Text>
      <Button variant="outlined" color="primary" component={Link} to={to}>Learn More</Button>
    </Paper>
  )

  return (
    <Layout title="Home">
      <Carousel>
        <Slide title="Product Expertise">
          Proven experience to gracefully integrate IT solutions into the most complex networks
        </Slide>
        <Slide title="Innovative Technologies">
          Carefully selected technologies to enable fast and secure delivery of your business critical assets
        </Slide>
        <Slide title="Professional Services">
          From design to deployment to fully managed services, our deep bench of experts help you get it done
        </Slide>
      </Carousel>

      <Box py={6} container>
        <Text variant="h5" align="justify">{tagline}</Text>
      </Box>

      <Box container bgcolor="#f5f5f5" py={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Item
              to="/solutions/information-security/"
              icon={Lock}
              title="Information Security"
            >
              Endpoint and perimeter protection, multiple threat detection modes, and managed services.
            </Item>
          </Grid>
          <Grid item xs={12} md={3}>
            <Item
              to="/solutions/optimized-networks/"
              icon={Radio}
              title="Optimized Networks"
            >
              Enterprise-wide WAN architecture, design and deployment, SD-WAN value assessment, Bandwidth procurement and management.
            </Item>
          </Grid>
          <Grid item xs={12} md={3}>
            <Item
              title="Application Delivery Infrastructure"
              to="/solutions/application-delivery-infrastructure/"
              icon={Chart}
            >
              Application delivery, whole enterprise visibility, packet distribution and delivery.
            </Item>
          </Grid>
          <Grid item xs={12} md={3}>
            <Item
              title="Professional Services"
              to="/services/professional/"
              icon={People}
            >
              Product engineering expertise, Design, Architecture, Deployment, and Management.
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}