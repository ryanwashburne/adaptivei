import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel as Slider } from 'react-responsive-carousel'

import Box from './box'
import Text from './text'
import Background from './background'

const INTERVAL = 8000

const settings = {
  showStatus: false,
  showThumbs: false,
  infiniteLoop: true,
  autoPlay: true,
  interval: INTERVAL,
  showArrows: false,
  stopOnHover: false,
  transitionTime: 800,
}

export default (props) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          file(relativePath: { eq: "bg.jpg" }) {
            childImageSharp {
              fluid(maxHeight: 1200) {
                src
              }
            }
          }
        }
      `}
      render={data => (
        <Background src={data.file.childImageSharp.fluid.src}>
          <Box position="absolute" top={0} left={0} width="100%">
            <Box container textAlign={{ xs: 'center', md: 'left' }} mt={15} fontFamily="Goodtimes">
              <Text variant="h4" color="secondary">IT Simplified...</Text>
            </Box>
          </Box>
          <Slider {...settings}>
            {props.children.map((child, i) => (
              <div key={i}>
                {child}
              </div>
            ))}
          </Slider>
        </Background>
      )}
    />
  )
}