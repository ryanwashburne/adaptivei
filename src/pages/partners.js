import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import ExtraLayout from '../templates/extraLayout'
import { Text, Dialog, Button, Grid, Link, Divider, Box } from '../components'

import { parseRichText } from '../utils'

const Partner = ({ partner }) => {
  const [modal, toggleModal] = React.useState(false)
  return partner.node.information ? (
    <>
      <div onClick={() => toggleModal(true)} style={{ cursor: 'pointer' }}>
        <Img fluid={partner.node.logo.fluid} alt={partner.node.name} style={{ height: '100%', width: 120 }} />
      </div>
      <Dialog open={modal} title={partner.node.name} onClose={() => toggleModal(false)} actions={[
        <Button onClick={() => toggleModal(false)} key={0}>Close</Button>,
      ]}>
        <Button variant="outlined" className="mb-4" component={Link} href={partner.node.website} target="_blank">Website</Button>
        {parseRichText(partner.node.information.json)}
      </Dialog>
    </>
  ) : (
    <Link href={partner.node.website} target="_blank">
      {partner.node.logo ? (
        <Img fluid={partner.node.logo.fluid} alt={partner.node.name} style={{ height: '100%', width: 120 }} />
      ) : (
        <Text variant="h5">{partner.node.name}</Text>
      )}
    </Link>
  )
}

const caption = `Adaptive Integration is a security and network focused reseller, partnered with the most cutting edge and disruptive technologies. As the glue between our technology partners and our customers, we deliver solutions that solve challenging IT problems and improve day-to-day operations. Below you will find a list of our premier technology partners.`

export default (props) => {
  const technology = props.data.technology.edges
  const service = props.data.service.edges
  return (
    <ExtraLayout title="Partners" caption={caption}>
      <Box mt={8}>
        <Text variant="h5" align="center" paragraph>Technology Partners</Text>
        <Divider />
        <Grid container spacing={2}>
          {technology.map((partner, i) => (
            <Box clone display="flex" justifyContent="center" alignItems="center" key={i}>
              <Grid item xs={6} md={3}>
                <Partner partner={partner} />
              </Grid>
            </Box>
          ))}
        </Grid>
      </Box>
      <Box mt={12}>
        <Text variant="h5" align="center" paragraph>Professional Services Partners</Text>
        <Divider />
        <Grid container spacing={2}>
          {service.map((partner, i) => (
            <Box clone display="flex" justifyContent="center" alignItems="center" key={i}>
              <Grid item xs={6} md={3}>
                <Partner partner={partner} />
              </Grid>
            </Box>
          ))}
        </Grid>
      </Box>
    </ExtraLayout>
  )
}

export const query = graphql`
  query {
    technology: allContentfulPartner(
      filter: { type: { eq: "technology" }},
      sort: { fields: name, order: ASC }
    ) {
      edges {
        node {
          name
          website
          logo {
            fluid(maxHeight: 100) {
              ...GatsbyContentfulFluid
            }
          }
          information {
            json
          }
        }
      }
    }
    service: allContentfulPartner(
      filter: { type: { eq: "service" }},
      sort: { fields: name, order: ASC }
    ) {
      edges {
        node {
          name
          website
          logo {
            fluid(maxHeight: 100) {
              ...GatsbyContentfulFluid
            }
          }
          information {
            json
          }
        }
      }
    }
  }
`