import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

import ContentLayout from './contentLayout'
import Item from './item'

import { parseRichText } from '../utils'

export default ({ data }) => {
  const { title, description, cover, sections, learnMore } = data.contentfulSolution
  return (
    <Layout title={title}>
      <ContentLayout
        title={title}
        caption={description}
        src={cover.fluid.src}
      >
        {sections.map((section, i) => (
            <Item
              key={i}
              src={section.image.fluid}
              title={section.title}
              right={i % 2 !== 0}
            >{parseRichText(section.body.json)}</Item>
        ))}
        {parseRichText(learnMore.json)}
      </ContentLayout>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Solution($slug: String!) {
    contentfulSolution(slug: { eq: $slug }) {
      title
      description
      cover {
        fluid(maxHeight: 600) {
          ...GatsbyContentfulFluid
        }
      }
      sections {
        title
        image {
          fluid(maxHeight: 600) {
            ...GatsbyContentfulFluid
          }
        }
        body {
          json
        }
      }
      learnMore {
        json
      }
    }
  }
`