import React from 'react'

import Text from '../components/text'
import Background from '../components/background'
import Box from '../components/box'

const SLIDE_HEIGHT = 400

export default (props) => {
  return (
    <>
      <Background src={props.src}>
        <Box
          style={{ height: SLIDE_HEIGHT }}
          textAlign={{ xs: 'center', md: 'left' }}
          color="white"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box container>
            <Box fontFamily="Goodtimes">
              <Text color="secondary" variant="h4" paragraph>IT Simplified...</Text>
            </Box>
            <Text variant="h2" paragraph>{props.title}</Text>
            <Text variant="h5">{props.caption}</Text>
          </Box>
        </Box>
      </Background>

      <Box container mb={6}>
        <Box mb={4}>
          {props.children}
        </Box>
        <hr />
        <Box mt={2}>
          <Text color="textSecondary" variant="body2">
            Adaptive Integration works with innovative IT solution providers who are carefully selected. We pride ourselves on comprehensive knowledge of our solutions.
            &nbsp;<a href="/contact/">Contact us today</a> to talk about your specific requirements.
          </Text>
        </Box>
      </Box>
    </>
  )
}